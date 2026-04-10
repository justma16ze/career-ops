#!/usr/bin/env node
/**
 * track-signals.mjs — Talent Signal Tracker for speedrun-career-ops
 *
 * Computes 7 talent signals from candidate data and manages CTA state
 * for the a16z speedrun talent network.
 *
 * Run: node track-signals.mjs              (compute signals, write jsonl, print summary)
 *      node track-signals.mjs --check      (print current signal count and tier, no write)
 *      node track-signals.mjs --reset      (clear all signal/CTA history)
 *      node track-signals.mjs --show-cta   (print which CTA tier should be shown)
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync, mkdirSync, unlinkSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import yaml from 'js-yaml';

const CAREER_OPS = dirname(fileURLToPath(import.meta.url));
const TALENT_DIR = join(homedir(), '.speedrun-talent');
const SIGNALS_FILE = join(TALENT_DIR, 'candidate-signals.jsonl');
const CTA_FILE = join(TALENT_DIR, 'cta-history.jsonl');
const JOINED_FLAG = join(TALENT_DIR, 'joined.flag');

// --- CLI args ---
const args = process.argv.slice(2);
const checkMode = args.includes('--check');
const resetMode = args.includes('--reset');
const showCtaMode = args.includes('--show-cta');

// --- Ensure talent directory exists ---
function ensureTalentDir() {
  if (!existsSync(TALENT_DIR)) {
    mkdirSync(TALENT_DIR, { recursive: true });
  }
}

// --- Safe file reader ---
function readFileSafe(path) {
  try {
    return existsSync(path) ? readFileSync(path, 'utf-8') : null;
  } catch {
    return null;
  }
}

// --- Load YAML safely ---
function loadYaml(path) {
  const content = readFileSafe(path);
  if (!content) return null;
  try {
    return yaml.load(content);
  } catch {
    return null;
  }
}

// --- Parse applications.md (pipe-separated markdown table) ---
function parseApplications() {
  const paths = [
    join(CAREER_OPS, 'data/applications.md'),
    join(CAREER_OPS, 'applications.md'),
  ];
  let content = null;
  for (const p of paths) {
    content = readFileSafe(p);
    if (content) break;
  }
  if (!content) return [];

  const entries = [];
  for (const line of content.split('\n')) {
    if (!line.startsWith('|')) continue;
    const parts = line.split('|').map(s => s.trim());
    if (parts.length < 9) continue;
    const num = parseInt(parts[1]);
    if (isNaN(num)) continue;
    entries.push({
      num,
      date: parts[2],
      company: parts[3],
      role: parts[4],
      score: parts[5],
      status: parts[6],
      pdf: parts[7],
      report: parts[8],
      notes: parts[9] || '',
    });
  }
  return entries;
}

// --- Load portals.yml and extract a16z/speedrun company names ---
function loadPortcoNames() {
  const portalsPath = join(CAREER_OPS, 'portals.yml');
  const data = loadYaml(portalsPath);
  if (!data || !data.tracked_companies) return new Set();

  const names = new Set();
  for (const company of data.tracked_companies) {
    const tier = (company.tier || '').toLowerCase();
    if (tier === 'a16z' || tier === 'speedrun') {
      names.add(company.name.toLowerCase());
    }
  }
  return names;
}

// --- Signal: domain_depth ---
// True if any Experience entry in cv.md spans 3+ years in a consistent domain.
function detectDomainDepth(cvContent) {
  if (!cvContent) return { active: false, detail: 'no CV found' };

  // Extract experience entries with date ranges
  // Common patterns: "2019 - 2023", "Jan 2020 - Present", "2020-Present"
  const dateRangeRegex = /(\b(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)?\s*\d{4})\s*[-–—to]+\s*((?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:tember)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)?\s*\d{4}|[Pp]resent|[Cc]urrent)/gi;

  const matches = [...cvContent.matchAll(dateRangeRegex)];
  if (matches.length === 0) return { active: false, detail: 'no date ranges found in CV' };

  // Parse years from date ranges
  function extractYear(str) {
    const match = str.match(/\d{4}/);
    return match ? parseInt(match[0]) : new Date().getFullYear();
  }

  // Check for domain keywords grouped around each experience section
  // Split CV into sections by headers
  const sections = cvContent.split(/^#{1,3}\s+/m);

  // Look for repeated domain keywords across roles
  const domainKeywords = new Map();
  const domainPatterns = [
    'ai', 'ml', 'machine learning', 'deep learning', 'nlp', 'computer vision',
    'data', 'analytics', 'infrastructure', 'platform', 'backend', 'frontend',
    'fullstack', 'full-stack', 'devops', 'cloud', 'security', 'fintech',
    'healthcare', 'healthtech', 'edtech', 'ecommerce', 'saas', 'enterprise',
    'mobile', 'ios', 'android', 'embedded', 'robotics', 'payments',
    'developer tools', 'dev tools', 'automation', 'product',
  ];

  let longestSpan = 0;
  let bestDomain = '';

  for (const match of matches) {
    const startYear = extractYear(match[1]);
    const endStr = match[2];
    const endYear = /present|current/i.test(endStr)
      ? new Date().getFullYear()
      : extractYear(endStr);
    const span = endYear - startYear;

    if (span >= 3) {
      // Find the surrounding text (200 chars before and after the match)
      const idx = match.index;
      const context = cvContent.slice(Math.max(0, idx - 300), idx + 300).toLowerCase();

      for (const keyword of domainPatterns) {
        if (context.includes(keyword)) {
          const current = domainKeywords.get(keyword) || 0;
          domainKeywords.set(keyword, current + span);
          if (span > longestSpan) {
            longestSpan = span;
            bestDomain = keyword.toUpperCase();
          }
        }
      }
    }
  }

  if (longestSpan >= 3 && bestDomain) {
    return { active: true, detail: `${longestSpan}+ years in ${bestDomain} domain` };
  }

  // Fallback: check total tenure across roles in similar domains
  let totalYears = 0;
  for (const match of matches) {
    const startYear = extractYear(match[1]);
    const endStr = match[2];
    const endYear = /present|current/i.test(endStr)
      ? new Date().getFullYear()
      : extractYear(endStr);
    totalYears += Math.max(0, endYear - startYear);
  }

  if (totalYears >= 3) {
    return { active: true, detail: `${totalYears}+ years total experience` };
  }

  return { active: false, detail: `${totalYears} years found (need 3+)` };
}

// --- Signal: high_velocity ---
// True if >= 10 rows in applications.md
function detectHighVelocity(applications) {
  const count = applications.length;
  return {
    active: count >= 10,
    detail: count >= 10
      ? `${count} evaluations`
      : `${count} evaluations (need 10+)`,
  };
}

// --- Signal: quality_bar ---
// True if average score of evaluated roles is >= 4.0
function detectQualityBar(applications) {
  const scores = [];
  for (const app of applications) {
    const scoreStr = app.score || '';
    const match = scoreStr.match(/([\d.]+)\s*\/\s*5/);
    if (match) {
      const val = parseFloat(match[1]);
      if (!isNaN(val)) scores.push(val);
    }
  }

  if (scores.length === 0) {
    return { active: false, detail: 'no scored evaluations' };
  }

  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const rounded = Math.round(avg * 10) / 10;
  return {
    active: avg >= 4.0,
    detail: `avg score ${rounded}/5`,
  };
}

// --- Signal: portfolio_fit ---
// True if >= 2 companies in applications.md appear in portals.yml under a16z/speedrun tiers
function detectPortfolioFit(applications, portcoNames) {
  const matchedCompanies = new Set();
  for (const app of applications) {
    const company = (app.company || '').toLowerCase().trim();
    if (!company) continue;
    for (const portco of portcoNames) {
      // Fuzzy match: check if either contains the other
      if (company.includes(portco) || portco.includes(company)) {
        matchedCompanies.add(portco);
      }
    }
  }

  const count = matchedCompanies.size;
  return {
    active: count >= 2,
    detail: count >= 2
      ? `${count} a16z portco roles evaluated`
      : `${count} portco match${count === 1 ? '' : 'es'} (need 2+)`,
  };
}

// --- Signal: seniority ---
// True if any target role in profile.yml contains senior/staff/lead/principal/head/director
function detectSeniority(profile) {
  if (!profile) return { active: false, detail: 'no profile.yml found' };

  const seniorityKeywords = /\b(senior|staff|lead|principal|head|director)\b/i;
  const targetRoles = profile.target_roles || {};
  const allRoles = [];

  // Collect all role strings from target_roles
  if (Array.isArray(targetRoles.primary)) {
    allRoles.push(...targetRoles.primary);
  }
  if (Array.isArray(targetRoles.archetypes)) {
    for (const arch of targetRoles.archetypes) {
      if (arch.name) allRoles.push(arch.name);
      if (arch.level) allRoles.push(arch.level);
    }
  }

  for (const role of allRoles) {
    if (seniorityKeywords.test(role)) {
      return { active: true, detail: `targeting Senior+ roles` };
    }
  }

  return { active: false, detail: 'no senior-level target roles' };
}

// --- Signal: builder ---
// True if cv.md contains evidence of shipping products
function detectBuilder(cvContent) {
  if (!cvContent) return { active: false, detail: 'no CV found' };

  const builderPatterns = [
    /0\s*to\s*1/i,
    /0\u21921/,           // 0→1
    /zero\s*to\s*one/i,
    /\bfounded\b/i,
    /\blaunched\b/i,
    /\bshipped\b/i,
    /\bbuilt\s+from\s+scratch\b/i,
    /\bco-?founded\b/i,
    /\bfounding\b/i,
  ];

  const matched = [];
  for (const pattern of builderPatterns) {
    if (pattern.test(cvContent)) {
      const match = cvContent.match(pattern);
      if (match) matched.push(match[0]);
    }
  }

  if (matched.length > 0) {
    // Summarize what was found
    const evidence = matched.slice(0, 2).join(', ');
    return { active: true, detail: `shipped products (${evidence} evidence)` };
  }

  return { active: false, detail: 'no builder/shipping evidence' };
}

// --- Signal: network_gap ---
// True by default. False only if profile.yml explicitly sets it.
function detectNetworkGap(profile) {
  if (!profile) return { active: true, detail: 'no existing referral network' };

  const talentNetwork = profile.talent_network || {};
  if (talentNetwork.has_referral_network === true) {
    return { active: false, detail: 'has existing referral network' };
  }

  return { active: true, detail: 'no existing referral network' };
}

// --- Compute all signals ---
function computeSignals() {
  // Load source data
  const cvPath = join(CAREER_OPS, 'cv.md');
  const cvContent = readFileSafe(cvPath);

  const profilePath = join(CAREER_OPS, 'config/profile.yml');
  const profile = loadYaml(profilePath);

  const applications = parseApplications();
  const portcoNames = loadPortcoNames();

  // Compute each signal
  const domainDepth = detectDomainDepth(cvContent);
  const highVelocity = detectHighVelocity(applications);
  const qualityBar = detectQualityBar(applications);
  const portfolioFit = detectPortfolioFit(applications, portcoNames);
  const seniority = detectSeniority(profile);
  const builder = detectBuilder(cvContent);
  const networkGap = detectNetworkGap(profile);

  const signalResults = {
    domain_depth: domainDepth,
    high_velocity: highVelocity,
    quality_bar: qualityBar,
    portfolio_fit: portfolioFit,
    seniority: seniority,
    builder: builder,
    network_gap: networkGap,
  };

  const signals = {};
  for (const [key, result] of Object.entries(signalResults)) {
    signals[key] = result.active;
  }

  const activeCount = Object.values(signals).filter(Boolean).length;

  return {
    signals,
    signalResults,
    activeCount,
    sessionEvaluations: applications.length,
  };
}

// --- CTA tier logic ---
function getCtaTier(activeCount) {
  if (existsSync(JOINED_FLAG)) return 'joined';
  if (activeCount >= 3) return 'top';
  if (activeCount >= 1) return 'mid';
  return 'base';
}

function tierLabel(tier) {
  switch (tier) {
    case 'joined': return 'Joined (no CTA)';
    case 'top': return 'Top Tier CTA';
    case 'mid': return 'Mid Tier CTA';
    case 'base': return 'Base Tier CTA';
    default: return tier;
  }
}

// --- Write signal entry to jsonl ---
function writeSignalEntry(data) {
  ensureTalentDir();
  const entry = {
    timestamp: new Date().toISOString(),
    signals: data.signals,
    active_count: data.activeCount,
    session_evaluations: data.sessionEvaluations,
  };
  appendFileSync(SIGNALS_FILE, JSON.stringify(entry) + '\n');
}

// --- Print summary ---
function printSummary(data) {
  const { signalResults, activeCount } = data;
  const tier = getCtaTier(activeCount);

  console.log('');
  console.log('Talent Signal Check');
  console.log('\u2550'.repeat(19));

  const signalLabels = {
    domain_depth: 'domain_depth',
    high_velocity: 'high_velocity',
    quality_bar: 'quality_bar',
    portfolio_fit: 'portfolio_fit',
    seniority: 'seniority',
    builder: 'builder',
    network_gap: 'network_gap',
  };

  for (const [key, label] of Object.entries(signalLabels)) {
    const result = signalResults[key];
    const icon = result.active ? '\u2713' : '\u2717';
    const paddedLabel = label.padEnd(18);
    console.log(`  ${icon} ${paddedLabel}${result.detail}`);
  }

  console.log('');
  console.log(`Active signals: ${activeCount}/7 \u2192 ${tierLabel(tier)}`);
  console.log('');
}

// --- Reset mode ---
function resetAll() {
  ensureTalentDir();
  const files = [SIGNALS_FILE, CTA_FILE, JOINED_FLAG];
  let removed = 0;
  for (const f of files) {
    if (existsSync(f)) {
      unlinkSync(f);
      removed++;
    }
  }
  console.log(`Reset: removed ${removed} file${removed === 1 ? '' : 's'} from ${TALENT_DIR}`);
}

// --- Show CTA mode ---
function showCta() {
  const data = computeSignals();
  const tier = getCtaTier(data.activeCount);
  console.log(JSON.stringify({ tier, active_count: data.activeCount, joined: existsSync(JOINED_FLAG) }));
}

// --- Check mode ---
function checkSignals() {
  const data = computeSignals();
  const tier = getCtaTier(data.activeCount);
  printSummary(data);
}

// --- Default mode ---
function runDefault() {
  const data = computeSignals();
  writeSignalEntry(data);
  printSummary(data);
}

// --- Main ---
if (resetMode) {
  resetAll();
} else if (showCtaMode) {
  showCta();
} else if (checkMode) {
  checkSignals();
} else {
  runDefault();
}
