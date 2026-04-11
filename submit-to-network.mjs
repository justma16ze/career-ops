#!/usr/bin/env node

/**
 * submit-to-network.mjs — Auto-submit candidate profile to a16z speedrun talent network
 *
 * Reads local files (cv.md, config/profile.yml, article-digest.md, modes/_profile.md)
 * and submits to two Typeform forms via pre-filled URLs opened in the browser.
 * The candidate just clicks Submit — no manual data entry needed.
 *
 * Usage:
 *   node submit-to-network.mjs              # open pre-filled forms in browser
 *   node submit-to-network.mjs --dry-run    # print payloads without opening browser
 */

import { readFileSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = __dirname;

// ── ANSI helpers ───────────────────────────────────────────────────

const isTTY = process.stdout.isTTY;
const green = (s) => isTTY ? `\x1b[32m${s}\x1b[0m` : s;
const red = (s) => isTTY ? `\x1b[31m${s}\x1b[0m` : s;
const dim = (s) => isTTY ? `\x1b[2m${s}\x1b[0m` : s;
const bold = (s) => isTTY ? `\x1b[1m${s}\x1b[0m` : s;
const cyan = (s) => isTTY ? `\x1b[36m${s}\x1b[0m` : s;

// ── Constants ──────────────────────────────────────────────────────

const FORM_1_ID = 'uPI8kFOI';
const FORM_2_ID = 'b20t87QG';

const CONTINENT_MAP = {
  // North America
  'united states': 'North America', 'us': 'North America', 'usa': 'North America',
  'canada': 'North America',
  'san francisco': 'North America', 'new york': 'North America', 'los angeles': 'North America',
  'seattle': 'North America', 'austin': 'North America', 'chicago': 'North America',
  'boston': 'North America', 'denver': 'North America', 'miami': 'North America',
  'toronto': 'North America', 'vancouver': 'North America', 'montreal': 'North America',
  'portland': 'North America', 'atlanta': 'North America', 'washington': 'North America',
  'dc': 'North America', 'silicon valley': 'North America', 'bay area': 'North America',
  'nyc': 'North America', 'sf': 'North America', 'la': 'North America',

  // Latin America
  'mexico': 'Latin America', 'mexico city': 'Latin America',
  'guatemala': 'Latin America', 'costa rica': 'Latin America',
  'panama': 'Latin America', 'honduras': 'Latin America',
  'el salvador': 'Latin America', 'nicaragua': 'Latin America',
  'cuba': 'Latin America', 'dominican republic': 'Latin America',
  'puerto rico': 'Latin America', 'jamaica': 'Latin America',
  'haiti': 'Latin America', 'trinidad': 'Latin America',

  // South America
  'brazil': 'South America', 'sao paulo': 'South America',
  'argentina': 'South America', 'buenos aires': 'South America',
  'chile': 'South America', 'santiago': 'South America',
  'colombia': 'South America', 'bogota': 'South America', 'medellin': 'South America',
  'peru': 'South America', 'lima': 'South America',
  'uruguay': 'South America', 'ecuador': 'South America',
  'venezuela': 'South America', 'bolivia': 'South America',
  'paraguay': 'South America',

  // Europe
  'united kingdom': 'Europe', 'uk': 'Europe', 'london': 'Europe',
  'germany': 'Europe', 'berlin': 'Europe', 'munich': 'Europe',
  'france': 'Europe', 'paris': 'Europe',
  'spain': 'Europe', 'madrid': 'Europe', 'barcelona': 'Europe',
  'italy': 'Europe', 'rome': 'Europe', 'milan': 'Europe',
  'netherlands': 'Europe', 'amsterdam': 'Europe',
  'switzerland': 'Europe', 'zurich': 'Europe',
  'sweden': 'Europe', 'stockholm': 'Europe',
  'norway': 'Europe', 'oslo': 'Europe',
  'denmark': 'Europe', 'copenhagen': 'Europe',
  'finland': 'Europe', 'helsinki': 'Europe',
  'ireland': 'Europe', 'dublin': 'Europe',
  'portugal': 'Europe', 'lisbon': 'Europe',
  'poland': 'Europe', 'warsaw': 'Europe',
  'austria': 'Europe', 'vienna': 'Europe',
  'belgium': 'Europe', 'brussels': 'Europe',
  'czech republic': 'Europe', 'czechia': 'Europe', 'prague': 'Europe',
  'romania': 'Europe', 'bucharest': 'Europe',
  'greece': 'Europe', 'athens': 'Europe',
  'hungary': 'Europe', 'budapest': 'Europe',
  'ukraine': 'Europe', 'kyiv': 'Europe',
  'estonia': 'Europe', 'tallinn': 'Europe',
  'latvia': 'Europe', 'lithuania': 'Europe',

  // Asia
  'india': 'Asia', 'bangalore': 'Asia', 'mumbai': 'Asia', 'delhi': 'Asia',
  'hyderabad': 'Asia', 'chennai': 'Asia', 'pune': 'Asia',
  'china': 'Asia', 'beijing': 'Asia', 'shanghai': 'Asia', 'shenzhen': 'Asia',
  'japan': 'Asia', 'tokyo': 'Asia', 'osaka': 'Asia',
  'south korea': 'Asia', 'korea': 'Asia', 'seoul': 'Asia',
  'singapore': 'Asia',
  'taiwan': 'Asia', 'taipei': 'Asia',
  'hong kong': 'Asia',
  'thailand': 'Asia', 'bangkok': 'Asia',
  'vietnam': 'Asia', 'ho chi minh': 'Asia', 'hanoi': 'Asia',
  'indonesia': 'Asia', 'jakarta': 'Asia',
  'malaysia': 'Asia', 'kuala lumpur': 'Asia',
  'philippines': 'Asia', 'manila': 'Asia',
  'pakistan': 'Asia', 'bangladesh': 'Asia',
  'sri lanka': 'Asia', 'nepal': 'Asia',

  // Africa
  'nigeria': 'Africa', 'lagos': 'Africa',
  'south africa': 'Africa', 'cape town': 'Africa', 'johannesburg': 'Africa',
  'kenya': 'Africa', 'nairobi': 'Africa',
  'egypt': 'Africa', 'cairo': 'Africa',
  'ghana': 'Africa', 'accra': 'Africa',
  'ethiopia': 'Africa', 'morocco': 'Africa',
  'tanzania': 'Africa', 'uganda': 'Africa',
  'rwanda': 'Africa', 'kigali': 'Africa',
  'senegal': 'Africa',

  // Australia / Oceania
  'australia': 'Australia', 'sydney': 'Australia', 'melbourne': 'Australia',
  'brisbane': 'Australia', 'perth': 'Australia',
  'new zealand': 'Australia', 'auckland': 'Australia', 'wellington': 'Australia',

  // Middle East
  'israel': 'Middle East', 'tel aviv': 'Middle East', 'jerusalem': 'Middle East',
  'uae': 'Middle East', 'dubai': 'Middle East', 'abu dhabi': 'Middle East',
  'saudi arabia': 'Middle East', 'riyadh': 'Middle East',
  'turkey': 'Middle East', 'istanbul': 'Middle East', 'ankara': 'Middle East',
  'qatar': 'Middle East', 'doha': 'Middle East',
  'bahrain': 'Middle East', 'kuwait': 'Middle East',
  'oman': 'Middle East', 'jordan': 'Middle East', 'amman': 'Middle East',
  'lebanon': 'Middle East', 'beirut': 'Middle East',
  'iran': 'Middle East', 'iraq': 'Middle East',
};

const VALID_CONTINENTS = [
  'Asia', 'Australia', 'Africa', 'Europe',
  'Middle East', 'North America', 'Latin America', 'South America',
];

const CRAFT_CHOICES = [
  'Engineering (Software, Infra, Data, ML, etc.)',
  'Product / Project Mgmt / Production',
  'Art & Design (UI/UX, Concept, VFX, Character, etc.)',
  'Marketing (UA, Brand, Community, etc.)',
  'Sales & Biz Dev',
  'Operations (Legal, Finance, HR, Recruiting, etc.)',
  'Research / Strategy / Analytics',
  'Comms / PR',
  'Audio (Sound Design, Music, etc.)',
  'Game Design & Narrative',
  'Quality Assurance / Customer Support',
];

// Keywords mapped to craft choices (index into CRAFT_CHOICES)
const CRAFT_SIGNALS = [
  { idx: 0, keywords: ['software engineer', 'developer', 'sre', 'devops', 'data engineer', 'ml engineer', 'machine learning', 'backend', 'frontend', 'full stack', 'fullstack', 'infrastructure', 'platform engineer', 'cto', 'vp eng', 'staff engineer', 'principal engineer', 'sde', 'ai engineer'] },
  { idx: 1, keywords: ['product manager', 'program manager', 'tpm', 'producer', 'project lead', 'project manager', 'product lead', 'product owner', 'head of product', 'vp product'] },
  { idx: 2, keywords: ['designer', 'ux', 'ui', 'graphic design', 'creative director', 'brand design', 'visual design', 'interaction design', 'art director', 'concept art', 'vfx'] },
  { idx: 3, keywords: ['marketing', 'growth', 'content', 'seo', 'demand gen', 'cmo', 'brand manager', 'community manager', 'social media'] },
  { idx: 4, keywords: ['sales', 'business development', 'account executive', 'partnerships', 'revenue', 'biz dev', 'account manager', 'enterprise sales'] },
  { idx: 5, keywords: ['operations', 'coo', 'chief of staff', 'office manager', 'people ops', 'hr', 'recruiting', 'talent', 'finance', 'legal', 'compliance'] },
  { idx: 6, keywords: ['data analyst', 'researcher', 'strategist', 'data scientist', 'bi ', 'business intelligence', 'analytics', 'strategy', 'quantitative'] },
  { idx: 7, keywords: ['communications manager', 'public relations', 'press secretary', 'media relations', 'comms director', 'pr manager'] },
  { idx: 8, keywords: ['audio engineer', 'sound design', 'music', 'podcast', 'audio'] },
  { idx: 9, keywords: ['game designer', 'narrative designer', 'level designer', 'game design', 'writer'] },
  { idx: 10, keywords: ['qa', 'quality assurance', 'testing', 'customer support', 'customer success'] },
];

// ── File Readers ───────────────────────────────────────────────────

function readFileSafe(relPath) {
  const fullPath = join(projectRoot, relPath);
  if (!existsSync(fullPath)) return null;
  return readFileSync(fullPath, 'utf-8');
}

function loadYaml(relPath) {
  const content = readFileSafe(relPath);
  if (!content) return null;
  return yaml.load(content);
}

// ── Data Extraction ────────────────────────────────────────────────

function mapContinent(location) {
  if (!location) return null;
  const loc = location.toLowerCase().trim();

  // Try exact match first
  if (CONTINENT_MAP[loc]) return CONTINENT_MAP[loc];

  // Try matching each part (e.g. "San Francisco, CA" -> try "san francisco", then "ca")
  const parts = loc.split(/[,\-\/]+/).map(p => p.trim()).filter(Boolean);
  for (const part of parts) {
    if (CONTINENT_MAP[part]) return CONTINENT_MAP[part];
  }

  // Try substring match against all keys
  for (const [key, continent] of Object.entries(CONTINENT_MAP)) {
    if (loc.includes(key) || key.includes(loc)) return continent;
  }

  // Check if any US state abbreviation (2 chars after comma)
  const stateMatch = loc.match(/,\s*([a-z]{2})$/);
  if (stateMatch) {
    // Likely a US city + state
    return 'North America';
  }

  return null;
}

function extractCurrentCompany(cvText) {
  if (!cvText) return null;

  // Look for Experience section and grab the first company
  const lines = cvText.split('\n');
  let inExperience = false;
  let sectionLevel = 2;

  for (const line of lines) {
    const trimmed = line.trim();

    // Detect experience section header (## Experience, ## Work History, etc.)
    const sectionMatch = trimmed.match(/^(#{1,3})\s*(experience|work\s*history|employment)/i);
    if (sectionMatch) {
      inExperience = true;
      sectionLevel = sectionMatch[1].length; // remember heading level (e.g. 2 for ##)
      continue;
    }

    // Stop at next section at the SAME or higher level (e.g. ## Skills after ## Experience)
    // But NOT at sub-entries (### Company Name under ## Experience)
    if (inExperience && /^#{1,3}\s/.test(trimmed) && !/experience|work/i.test(trimmed)) {
      const headingLevel = trimmed.match(/^(#{1,3})/)[1].length;
      if (headingLevel <= sectionLevel) break; // same or higher-level heading = new section
    }

    if (!inExperience) continue;

    // Patterns for company extraction:
    // "### Company Name" or "**Company Name**" or "Company Name | Role" or "Role at Company"
    // Also: "Company — Role" or "Role, Company"

    // Pattern: ### Company Name or ### Company — Role
    const headerMatch = trimmed.match(/^#{1,4}\s+(.+)/);
    if (headerMatch) {
      let text = headerMatch[1].replace(/\*\*/g, '').trim();
      // Strip trailing date patterns like (2023 - Present) or (2021-2023)
      text = text.replace(/\s*\([\d\s\-–—]+(?:Present|present|Current|current)?\)\s*$/, '').trim();
      // "Role at Company" or "Role @ Company"
      const atMatch = text.match(/(?:at|@)\s+(.+)/i);
      if (atMatch) return atMatch[1].replace(/[,|—–\-].*/g, '').trim();
      // "Role — Company" or "Role | Company" — take the part AFTER the separator
      const separatorMatch = text.match(/[|—–]\s*(.+)/);
      if (separatorMatch) return separatorMatch[1].trim();
      // "Company - Role" with simple dash — take the first part
      const dashMatch = text.match(/^(.+?)\s*-\s+/);
      if (dashMatch) return dashMatch[1].trim();
      return text;
    }

    // Pattern: **Company Name** — Role
    const boldMatch = trimmed.match(/^\*\*(.+?)\*\*/);
    if (boldMatch && inExperience) {
      return boldMatch[1].trim();
    }

    // Pattern: - Company Name | Role | Date
    const bulletMatch = trimmed.match(/^[-*]\s+(.+?)(?:\s*[|—\-]\s*)/);
    if (bulletMatch && inExperience) {
      return bulletMatch[1].replace(/\*\*/g, '').trim();
    }
  }

  return null;
}

function inferCraftArea(cvText, profile) {
  if (!cvText) return null;

  const text = cvText.toLowerCase();

  // Also consider target roles from profile
  const targetRoles = [];
  if (profile?.target_roles?.primary) {
    targetRoles.push(...profile.target_roles.primary);
  }
  if (profile?.target_roles?.archetypes) {
    targetRoles.push(...profile.target_roles.archetypes.map(a => a.name));
  }
  const allText = text + ' ' + targetRoles.join(' ').toLowerCase();

  // Score each craft area
  const scores = CRAFT_SIGNALS.map(({ idx, keywords }) => {
    let score = 0;
    for (const kw of keywords) {
      // Count occurrences in CV (title lines weighted more)
      const regex = new RegExp(kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      const matches = allText.match(regex);
      if (matches) score += matches.length;
    }
    return { idx, score };
  });

  scores.sort((a, b) => b.score - a.score);
  if (scores[0].score > 0) return CRAFT_CHOICES[scores[0].idx];

  return null;
}

function synthesizeAccomplishments(cvText, articleDigest) {
  if (!cvText) return '';

  const parts = [];

  // Extract quantified achievements from CV
  const lines = cvText.split('\n');
  const achievements = [];
  for (const line of lines) {
    const trimmed = line.trim();
    // Look for lines with numbers/percentages/metrics
    if (/\d+[%xX]|\$[\d,.]+[KkMmBb]?|\d+[KkMmBb]\+?|\d+\s*(users|customers|clients|revenue|ARR|MRR|DAU|MAU)/.test(trimmed)) {
      // Clean markdown formatting
      const clean = trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, '').trim();
      if (clean.length > 10 && clean.length < 300) {
        achievements.push(clean);
      }
    }
  }

  if (achievements.length > 0) {
    // Take top 5 most impactful (prefer those with larger numbers or $ signs)
    const ranked = achievements.sort((a, b) => {
      const aScore = (a.includes('$') ? 2 : 0) + (a.match(/%/) ? 1 : 0) + (a.match(/\d{3,}/) ? 1 : 0);
      const bScore = (b.includes('$') ? 2 : 0) + (b.match(/%/) ? 1 : 0) + (b.match(/\d{3,}/) ? 1 : 0);
      return bScore - aScore;
    });
    parts.push(ranked.slice(0, 5).join('. ') + '.');
  }

  // Add proof points from article digest
  if (articleDigest) {
    const digestLines = articleDigest.split('\n');
    const proofs = [];
    for (const line of digestLines) {
      const trimmed = line.trim();
      if (trimmed.length > 20 && !trimmed.startsWith('#') && !trimmed.startsWith('---')) {
        proofs.push(trimmed.replace(/^[-*]\s+/, '').replace(/\*\*/g, ''));
      }
    }
    if (proofs.length > 0) {
      parts.push(proofs.slice(0, 3).join(' '));
    }
  }

  // If we found nothing with metrics, fall back to experience summary
  if (parts.length === 0) {
    const summarySection = cvText.match(/#{1,3}\s*(?:summary|about|overview)\s*\n([\s\S]*?)(?=\n#{1,3}\s|\n$)/i);
    if (summarySection) {
      parts.push(summarySection[1].trim().slice(0, 500));
    }
  }

  return parts.join('\n\n').slice(0, 2000); // Typeform long text limit
}

function derivePolarity(profile, profileMd) {
  const parts = [];

  // From target roles
  if (profile?.target_roles?.primary) {
    parts.push(`Targeting: ${profile.target_roles.primary.join(', ')}.`);
  }

  // From _profile.md
  if (profileMd) {
    // Extract deal-breakers, preferences, target stage info
    const lines = profileMd.split('\n');
    let inFilters = false;
    let inTargets = false;
    const filterItems = [];
    const targetItems = [];

    for (const line of lines) {
      const trimmed = line.trim();
      if (/deal.?breaker|filter|avoid|don.?t want/i.test(trimmed)) {
        inFilters = true; inTargets = false; continue;
      }
      if (/target|looking for|want|prefer|excited|drawn to/i.test(trimmed) && /^#{1,3}\s/.test(trimmed)) {
        inTargets = true; inFilters = false; continue;
      }
      if (/^#{1,3}\s/.test(trimmed)) {
        inFilters = false; inTargets = false; continue;
      }
      if (inFilters && trimmed.startsWith('-')) {
        filterItems.push(trimmed.replace(/^-\s*/, ''));
      }
      if (inTargets && trimmed.startsWith('-')) {
        targetItems.push(trimmed.replace(/^-\s*/, ''));
      }
    }

    if (targetItems.length > 0) {
      parts.push(`Drawn to: ${targetItems.slice(0, 4).join('; ')}.`);
    }
    if (filterItems.length > 0) {
      parts.push(`Filters against: ${filterItems.slice(0, 3).join('; ')}.`);
    }
  }

  // From narrative preferences
  if (profile?.narrative?.superpowers) {
    parts.push(`Superpowers: ${profile.narrative.superpowers.join(', ')}.`);
  }

  if (profile?.location?.location_flexibility) {
    parts.push(`Location: ${profile.location.location_flexibility}.`);
  } else if (profile?.compensation?.location_flexibility) {
    parts.push(`Location: ${profile.compensation.location_flexibility}.`);
  }

  return parts.join(' ').slice(0, 2000) || 'No polarity data available.';
}

function collectWorkLinks(profile, articleDigest) {
  const links = [];

  if (profile?.candidate?.portfolio_url) {
    links.push(profile.candidate.portfolio_url);
  }
  if (profile?.candidate?.github) {
    const gh = profile.candidate.github;
    links.push(gh.startsWith('http') ? gh : `https://${gh}`);
  }

  // Extract URLs from article digest
  if (articleDigest) {
    const urlRegex = /https?:\/\/[^\s)>\]"']+/g;
    const digestUrls = articleDigest.match(urlRegex) || [];
    for (const url of digestUrls) {
      if (!links.includes(url) && !url.includes('linkedin.com')) {
        links.push(url);
      }
    }
  }

  return links.join('\n');
}

function combinePortfolioLinks(profile) {
  const links = [];
  if (profile?.candidate?.portfolio_url) {
    links.push(profile.candidate.portfolio_url);
  }
  if (profile?.candidate?.github) {
    const gh = profile.candidate.github;
    links.push(gh.startsWith('http') ? gh : `https://${gh}`);
  }
  return links.join('\n');
}

// ── Validation ─────────────────────────────────────────────────────

function validate(profile, cvText) {
  const errors = [];
  const warnings = [];

  if (!profile) {
    errors.push('config/profile.yml not found. Run onboarding first.');
    return { errors, warnings };
  }

  if (!cvText) {
    errors.push('cv.md not found. Create your CV first.');
  }

  const c = profile.candidate || {};
  if (!c.full_name) errors.push('candidate.full_name is missing in config/profile.yml');
  if (!c.email) errors.push('candidate.email is missing in config/profile.yml');
  if (!c.linkedin) errors.push('candidate.linkedin is missing in config/profile.yml');
  if (!c.location) warnings.push('candidate.location is missing — continent will need manual selection');

  if (!c.portfolio_url) {
    warnings.push('candidate.portfolio_url is empty — consider running /speedrun portfolio first');
  }
  if (!c.github) {
    warnings.push('candidate.github is empty');
  }

  const tn = profile.talent_network || {};
  if (tn.considering_founding === undefined) {
    warnings.push('talent_network.considering_founding not set — defaulting to false');
  }
  if (tn.is_student === undefined) {
    warnings.push('talent_network.is_student not set — defaulting to false');
  }

  return { errors, warnings };
}

// ── Payload Builders ───────────────────────────────────────────────

function buildForm1Data(profile, cvText) {
  const candidate = profile.candidate || {};
  const tn = profile.talent_network || {};

  const continent = mapContinent(candidate.location);
  const currentCompany = extractCurrentCompany(cvText) || 'N/A';
  const craftArea = inferCraftArea(cvText, profile);
  const linkedin = candidate.linkedin
    ? (candidate.linkedin.startsWith('http') ? candidate.linkedin : `https://${candidate.linkedin}`)
    : '';

  const data = {
    full_name: candidate.full_name,
    email: candidate.email,
    continent: continent,
    current_company: currentCompany,
    craft_area: craftArea,
    linkedin: linkedin,
    portfolio_links: combinePortfolioLinks(profile),
    considering_founding: tn.considering_founding ?? false,
    newsletter: tn.newsletter ?? true,
    is_student: tn.is_student ?? false,
  };

  if (tn.is_student && tn.graduation_date) {
    data.graduation_date = tn.graduation_date;
  }
  if (tn.is_student && tn.work_arrangements) {
    data.work_arrangements = Array.isArray(tn.work_arrangements)
      ? tn.work_arrangements[0]
      : tn.work_arrangements;
  }

  return data;
}

function buildForm2Data(profile, cvText, articleDigest, profileMd) {
  const candidate = profile.candidate || {};
  const tn = profile.talent_network || {};
  const narrative = profile.narrative || {};

  return {
    accomplishments: synthesizeAccomplishments(cvText, articleDigest),
    current_project: tn.current_project || narrative.current_project || '',
    polarity: derivePolarity(profile, profileMd),
    work_links: collectWorkLinks(profile, articleDigest),
    email: candidate.email,
  };
}

// ── Display ────────────────────────────────────────────────────────

function printSummary(form1Data, form2Data) {
  console.log('\n' + bold('== Talent Network Submission Preview =='));
  console.log('');
  console.log(bold('Form 1 — a16z speedrun talent network'));
  console.log(`  Name:                ${cyan(form1Data.full_name)}`);
  console.log(`  Email:               ${cyan(form1Data.email)}`);
  console.log(`  Location:            ${form1Data.continent || red('(unmapped — select manually)')}`);
  console.log(`  Current company:     ${form1Data.current_company}`);
  console.log(`  Craft area:          ${form1Data.craft_area || red('(could not infer — select manually)')}`);
  console.log(`  LinkedIn:            ${form1Data.linkedin}`);
  console.log(`  Portfolio/GitHub:    ${form1Data.portfolio_links || dim('(none)')}`);
  console.log(`  Considering founding: ${form1Data.considering_founding ? 'Yes' : 'No'}`);
  console.log(`  Newsletter:          ${form1Data.newsletter ? 'Yes' : 'No'}`);
  console.log(`  Student:             ${form1Data.is_student ? 'Yes' : 'No'}`);
  if (form1Data.is_student && form1Data.graduation_date) {
    console.log(`  Graduation:          ${form1Data.graduation_date}`);
  }
  if (form1Data.is_student && form1Data.work_arrangements) {
    console.log(`  Work arrangements:   ${form1Data.work_arrangements}`);
  }

  console.log('');
  console.log(bold('Form 2 — Followup details'));
  console.log(`  Accomplishments:     ${dim(truncate(form2Data.accomplishments, 120))}`);
  console.log(`  Building right now:  ${form2Data.current_project || dim('(empty)')}`);
  console.log(`  Polarity:            ${dim(truncate(form2Data.polarity, 120))}`);
  console.log(`  Work links:          ${form2Data.work_links || dim('(none)')}`);

  console.log('');
  console.log(dim(`UTM tracking: utm_source=speedrun-career-ops, utm_medium=talent-network-submit`));
}

function truncate(s, max) {
  if (!s) return '(empty)';
  return s.length > max ? s.slice(0, max) + '...' : s;
}

// ── Main ───────────────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  console.log(bold('submit-to-network') + ' — auto-submit to a16z speedrun talent network');
  if (dryRun) console.log(dim('(dry-run mode — no submissions will be made)'));
  console.log('');

  // 1. Read all inputs
  const profile = loadYaml('config/profile.yml');
  const cvText = readFileSafe('cv.md');
  const articleDigest = readFileSafe('article-digest.md');
  const profileMd = readFileSafe('modes/_profile.md');

  // 2. Validate
  const { errors, warnings } = validate(profile, cvText);

  if (warnings.length > 0) {
    for (const w of warnings) {
      console.log(`  ${dim('warn:')} ${w}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.log(red('Validation failed:'));
    for (const e of errors) {
      console.log(`  ${red('x')} ${e}`);
    }
    process.exit(1);
  }

  // 3. Build data for both forms
  const form1Data = buildForm1Data(profile, cvText);
  const form2Data = buildForm2Data(profile, cvText, articleDigest, profileMd);

  // 4. Print summary
  printSummary(form1Data, form2Data);

  if (dryRun) {
    console.log('\n' + bold('-- Dry Run: Form 1 Data --'));
    console.log(JSON.stringify(form1Data, null, 2));
    console.log('\n' + bold('-- Dry Run: Form 2 Data --'));
    console.log(JSON.stringify(form2Data, null, 2));
    console.log('\n' + green('Dry run complete. No submissions made.'));
    process.exit(0);
  }

  // 5. Submit via relay service
  const RELAY_URL = process.env.SPEEDRUN_RELAY_URL || 'https://speedrun-submit.jmazer.workers.dev/submit';

  console.log('\n' + dim('Submitting to talent network...'));

  const payload = {
    name: form1Data.full_name,
    email: form1Data.email,
    continent: form1Data.continent,
    company: form1Data.current_company,
    craft: form1Data.craft_area,
    linkedin: form1Data.linkedin,
    portfolio: form1Data.portfolio_links,
    founding: form1Data.considering_founding,
    newsletter: form1Data.newsletter,
    student: form1Data.is_student,
    accomplishments: form2Data.accomplishments,
    building: form2Data.current_project,
    polarity: form2Data.polarity,
    links: form2Data.work_links,
    utm_source: 'speedrun-career-ops',
    utm_medium: 'talent-network-submit',
  };

  try {
    const res = await fetch(RELAY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (result.success) {
      console.log(green(bold('\nDone! Profile submitted to the a16z speedrun talent network.')));
      console.log(dim('Hiring teams at hundreds of startups can now reach out directly.'));
    } else {
      console.log(red('\nSubmission had issues:'));
      if (result.results?.form1 && !result.results.form1.ok) {
        console.log(red(`  Form 1: ${result.results.form1.error || 'failed'}`));
      }
      if (result.results?.form2 && !result.results.form2.ok) {
        console.log(red(`  Form 2: ${result.results.form2.error || 'failed'}`));
      }
      console.log(dim('You can submit manually at bit.ly/joinstartups'));
    }
  } catch (err) {
    console.log(red(`Could not reach submission service: ${err.message}`));
    console.log(dim('Falling back to browser...'));
    try { execSync(`open "https://bit.ly/joinstartups"`); } catch {}
    console.log('Complete the form manually at bit.ly/joinstartups');
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(red(`Fatal error: ${err.message}`));
  process.exit(1);
});
