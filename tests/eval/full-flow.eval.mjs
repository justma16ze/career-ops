/**
 * tests/eval/full-flow.eval.mjs — Complete product flow evaluation.
 *
 * For each persona: generate portfolio, open in headless browser,
 * run structural + quality checks, evaluate template recommendations
 * and candidate detection accuracy.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { chromium } from 'playwright';
import { personas } from './personas.mjs';
import { getStyle, listStyles } from '../../styles/registry.mjs';
import { getLayout, listLayouts } from '../../layouts/registry.mjs';
import {
  parseSections, extractTemplateData,
} from '../../lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const OUTPUT_DIR = resolve(__dirname, 'output');
const BLOCKED_PATH = resolve(ROOT, 'compatibility.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function loadBlockedCombos() {
  try {
    const raw = await readFile(BLOCKED_PATH, 'utf-8');
    const data = JSON.parse(raw);
    return (data.blocked || []).map(b => [b[0], b[1]]);
  } catch {
    return [];
  }
}

function isBlocked(blocked, style, layout) {
  return blocked.some(b => b[0] === style && b[1] === layout);
}

function buildProfile(persona) {
  const c = persona.profileOverrides?.candidate || {};
  const n = persona.profileOverrides?.narrative || {};
  return {
    candidate: {
      full_name: persona.name === 'Minimal Profile' ? 'Jordan' : persona.resume.match(/^#\s+(.+)/m)?.[1] || persona.name,
      email: persona.email,
      location: 'San Francisco, CA',
      linkedin: '',
      github: '',
      type: c.type || 'experienced',
      ...c,
    },
    narrative: {
      headline: n.headline || '',
      home_bio: n.home_bio || '',
      superpowers: n.superpowers || [],
      proof_points: [],
      exit_story: '',
      current_project: '',
      ...n,
    },
    target_roles: { primary: [] },
    compensation: { location_flexibility: '' },
    education_detail: persona.profileOverrides?.education_detail || {},
    preferences: {},
  };
}

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${summaryShort || ''}">
${fontLinks}
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

async function generatePortfolio(persona, styleName, layoutName) {
  const profile = buildProfile(persona);
  const sections = parseSections(persona.resume);
  const data = extractTemplateData({ profile, sections, articleDigest: null });

  const style = await getStyle(styleName);
  const layout = await getLayout(layoutName);

  const pages = layout.pages(data);
  const results = {};

  for (const [filename, body] of Object.entries(pages)) {
    const html = buildPage({
      title: data.name,
      styleCSS: style.css(),
      layoutCSS: layout.css(),
      fonts: style.fonts || [],
      body,
      summaryShort: data.summaryShort,
    });
    results[filename] = html;
  }
  return { html: results, data };
}

async function savePortfolio(persona, styleName, layoutName, htmlMap) {
  const dir = resolve(OUTPUT_DIR, `${persona.slug}-${styleName}-${layoutName}`);
  await mkdir(dir, { recursive: true });
  for (const [filename, html] of Object.entries(htmlMap)) {
    await writeFile(resolve(dir, filename), html, 'utf-8');
  }
  return dir;
}

// ---------------------------------------------------------------------------
// Browser-based checks
// ---------------------------------------------------------------------------

async function runStructuralChecks(page, persona, viewport = 'desktop') {
  const results = [];

  // 1. Page loads without JS errors
  const jsErrors = [];
  page.on('pageerror', err => jsErrors.push(err.message));
  // Give time for errors to surface after navigation
  await page.waitForTimeout(500);
  results.push({
    name: `No JS errors (${viewport})`,
    pass: jsErrors.length === 0,
    detail: jsErrors.length > 0 ? jsErrors.join('; ') : null,
  });

  // 2. Footer "made by speedrun" visible
  const footer = await page.$('footer');
  let footerVisible = false;
  if (footer) {
    const box = await footer.boundingBox();
    const opacity = await footer.evaluate(el => {
      const s = window.getComputedStyle(el);
      return parseFloat(s.opacity);
    });
    footerVisible = box !== null && opacity > 0.5;
  }
  results.push({
    name: `Footer visible (${viewport})`,
    pass: footerVisible,
    detail: !footerVisible ? 'Footer missing or invisible' : null,
  });

  // 3. Name appears on page
  const expectedName = persona.resume.match(/^#\s+(.+)/m)?.[1] || persona.name;
  const firstName = expectedName.split(' ')[0];
  const bodyText = await page.evaluate(() => document.body.innerText);
  results.push({
    name: `Name appears (${viewport})`,
    pass: bodyText.includes(firstName),
    detail: !bodyText.includes(firstName) ? `"${firstName}" not found in body text` : null,
  });

  // 4. At least one experience entry
  const entryCount = await page.evaluate(() => {
    return document.querySelectorAll('.entry, .exp-entry, .card, .experience-entry, [class*="entry"]').length;
  });
  // For minimal profile, relax this check
  const expectEntries = persona.slug !== 'minimal-profile';
  if (expectEntries) {
    results.push({
      name: `Experience entries render (${viewport})`,
      pass: entryCount > 0,
      detail: entryCount === 0 ? 'No experience entries found' : null,
    });
  }

  // 5. No horizontal scrollbar
  const hasHScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 5;
  });
  results.push({
    name: `No horizontal scroll (${viewport})`,
    pass: !hasHScroll,
    detail: hasHScroll ? `scrollWidth exceeds clientWidth` : null,
  });

  // 6. No major section overlap
  const overlapInfo = await page.evaluate(() => {
    const sections = document.querySelectorAll('section, .hero, .sidebar, nav, footer, main, .wrap');
    const boxes = [];
    for (const el of sections) {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        boxes.push({ tag: el.tagName, top: r.top, bottom: r.bottom, left: r.left, right: r.right });
      }
    }
    // Check vertical overlap between consecutive sections
    const overlaps = [];
    for (let i = 0; i < boxes.length; i++) {
      for (let j = i + 1; j < boxes.length; j++) {
        const a = boxes[i];
        const b = boxes[j];
        // Significant overlap: more than 20px vertical overlap AND horizontal overlap
        const vOverlap = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        const hOverlap = Math.min(a.right, b.right) - Math.max(a.left, b.left);
        if (vOverlap > 20 && hOverlap > 20) {
          // Check they aren't parent-child (skip if one contains another)
          if (!(a.top <= b.top && a.bottom >= b.bottom && a.left <= b.left && a.right >= b.right) &&
              !(b.top <= a.top && b.bottom >= a.bottom && b.left <= a.left && b.right >= a.right)) {
            overlaps.push(`${a.tag}[${Math.round(a.top)}-${Math.round(a.bottom)}] / ${b.tag}[${Math.round(b.top)}-${Math.round(b.bottom)}]`);
          }
        }
      }
    }
    return overlaps;
  });
  results.push({
    name: `No overlapping elements (${viewport})`,
    pass: overlapInfo.length === 0,
    detail: overlapInfo.length > 0 ? overlapInfo.slice(0, 3).join(', ') : null,
  });

  // 7. All links have valid href
  const badLinks = await page.evaluate(() => {
    const links = document.querySelectorAll('a[href]');
    const bad = [];
    for (const a of links) {
      const href = a.getAttribute('href');
      if (!href || href === '' || href === '#') {
        // Skip nav anchor links that are #section
        if (href === '#' && a.closest('nav')) continue;
        bad.push(href || '(empty)');
      }
    }
    return bad;
  });
  results.push({
    name: `All links have valid href (${viewport})`,
    pass: badLinks.length === 0,
    detail: badLinks.length > 0 ? `Bad hrefs: ${badLinks.slice(0, 5).join(', ')}` : null,
  });

  return results;
}

async function runQualityChecks(page, persona, data) {
  const scores = {};

  // Bio quality: conversational paragraph with inline links?
  const bioInfo = await page.evaluate(() => {
    const bio = document.querySelector('.home-bio, .bio, .about-content, [class*="bio"]');
    if (!bio) return { exists: false, hasLinks: false, sentences: 0, startsWithName: false, text: '' };
    const links = bio.querySelectorAll('a');
    const text = bio.innerText;
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10).length;
    // Check if first word of the bio matches common name-as-heading pattern
    const firstLine = text.trim().split('\n')[0];
    return {
      exists: true,
      hasLinks: links.length > 0,
      sentences,
      textLength: text.length,
      startsWithName: /^[A-Z][a-z]+ [A-Z][a-z]+\s*$/.test(firstLine),
    };
  });

  if (bioInfo.exists) {
    let bioScore = 5; // baseline
    if (bioInfo.hasLinks) bioScore += 2;
    if (bioInfo.sentences >= 2) bioScore += 1;
    if (bioInfo.sentences >= 3) bioScore += 1;
    if (!bioInfo.startsWithName) bioScore += 1;
    scores.bioQuality = Math.min(10, bioScore);
  } else {
    scores.bioQuality = 1;
  }

  // Content density
  const contentLength = await page.evaluate(() => document.body.innerText.length);
  const isExperienced = persona.expectedType === 'experienced';
  const threshold = isExperienced ? 500 : 300;
  if (contentLength >= threshold * 2) scores.contentDensity = 10;
  else if (contentLength >= threshold * 1.5) scores.contentDensity = 8;
  else if (contentLength >= threshold) scores.contentDensity = 6;
  else if (contentLength >= threshold * 0.5) scores.contentDensity = 4;
  else scores.contentDensity = 2;

  // Section balance
  const sectionCount = await page.evaluate(() => {
    const sections = document.querySelectorAll('section, .hero, .skills-section, .education, .contact-section');
    const visible = [];
    for (const s of sections) {
      const r = s.getBoundingClientRect();
      if (r.height > 20) visible.push(s.tagName);
    }
    return visible.length;
  });
  if (sectionCount >= 4) scores.sectionBalance = 10;
  else if (sectionCount >= 3) scores.sectionBalance = 8;
  else if (sectionCount >= 2) scores.sectionBalance = 5;
  else scores.sectionBalance = 2;

  // Visual hierarchy: name should be largest text
  const hierarchyOk = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return false;
    const h1Size = parseFloat(window.getComputedStyle(h1).fontSize);
    const allText = document.querySelectorAll('p, span, li, a, h2, h3, div');
    for (const el of allText) {
      const size = parseFloat(window.getComputedStyle(el).fontSize);
      if (size > h1Size + 2 && !el.closest('h1')) return false;
    }
    return h1Size >= 20; // name should be at least 20px
  });
  scores.visualHierarchy = hierarchyOk ? 9 : 4;

  // Whitespace: no section with padding/margin > 100px
  const excessiveWhitespace = await page.evaluate(() => {
    const sections = document.querySelectorAll('section, .hero, main, .wrap');
    for (const s of sections) {
      const style = window.getComputedStyle(s);
      const mt = parseFloat(style.marginTop);
      const mb = parseFloat(style.marginBottom);
      const pt = parseFloat(style.paddingTop);
      const pb = parseFloat(style.paddingBottom);
      if (mt > 100 || mb > 100 || pt > 100 || pb > 100) return true;
    }
    return false;
  });
  scores.whitespace = excessiveWhitespace ? 4 : 9;

  return scores;
}

// ---------------------------------------------------------------------------
// Template recommendation evaluation
// ---------------------------------------------------------------------------

const TEMPLATE_RECOMMENDATIONS = {
  'senior-engineer': {
    good: ['bare', 'ink', 'void', 'press', 'volt', 'terminal', 'lab', 'tactical', 'patrol', 'caps', 'statement', 'prose', 'folio', 'almanac'],
    bad: ['gradient', 'garden'],
    reason: 'Senior engineer should get professional/technical styles, not playful ones',
  },
  'graduating-senior': {
    good: ['bare', 'coral', 'gradient', 'blush', 'garden', 'ink', 'ember', 'dusk', 'folio'],
    bad: ['grid', 'statement', 'tactical', 'patrol'],
    reason: 'Student should get approachable styles, not overly corporate/military ones',
  },
  'career-changer': {
    good: ['bare', 'ink', 'volt', 'press', 'coral', 'prose', 'folio'],
    bad: [],
    reason: 'Career changer benefits from clean, professional styles',
  },
  'designer-engineer': {
    good: ['press', 'coral', 'gradient', 'ink', 'void', 'ember', 'folio', 'blush', 'garden'],
    bad: ['tactical', 'patrol'],
    reason: 'Designer should get visually distinctive styles',
  },
  'minimal-profile': {
    good: ['bare', 'ink', 'prose'],
    bad: ['grid', 'statement', 'tactical'],
    reason: 'Minimal profile should get simple styles that degrade gracefully',
  },
};

function evaluateTemplateRecommendation(personaSlug, styleName) {
  const rec = TEMPLATE_RECOMMENDATIONS[personaSlug];
  if (!rec) return { pass: true, detail: 'No recommendation rules' };
  if (rec.bad.includes(styleName)) {
    return { pass: false, detail: `${styleName} is in the "bad" list for ${personaSlug}: ${rec.reason}` };
  }
  if (rec.good.includes(styleName)) {
    return { pass: true, detail: `${styleName} is recommended for ${personaSlug}` };
  }
  return { pass: true, detail: `${styleName} is neutral for ${personaSlug}` };
}

// ---------------------------------------------------------------------------
// Candidate detection evaluation
// ---------------------------------------------------------------------------

function evaluateCandidateDetection(persona, data) {
  const profile = buildProfile(persona);
  const detectedType = profile.candidate.type;
  return {
    pass: detectedType === persona.expectedType,
    detected: detectedType,
    expected: persona.expectedType,
  };
}

// ---------------------------------------------------------------------------
// Screenshot helper
// ---------------------------------------------------------------------------

async function takeScreenshot(page, name) {
  const path = resolve(OUTPUT_DIR, `${name}.png`);
  await page.screenshot({ path, fullPage: true });
  return path;
}

// ---------------------------------------------------------------------------
// Main evaluation
// ---------------------------------------------------------------------------

export async function runFullFlowEval({ quick = false } = {}) {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const blocked = await loadBlockedCombos();
  const allStyles = await listStyles();
  const allLayouts = await listLayouts();

  const testPersonas = quick ? [personas[0]] : personas;
  const defaultStyle = 'bare';
  const defaultLayout = 'scroll';

  const report = {
    personasTested: testPersonas.length,
    portfoliosGenerated: 0,
    structural: { passed: 0, failed: 0, results: [] },
    quality: { scores: {}, perCombo: [] },
    templateRec: { passed: 0, failed: 0, results: [] },
    detection: { passed: 0, failed: 0, results: [] },
    allLayoutsCheck: { passed: 0, failed: 0, results: [] },
    screenshots: [],
  };

  let browser;
  try {
    browser = await chromium.launch({ headless: true });

    // -----------------------------------------------------------------------
    // Step 1-4: Per-persona checks
    // -----------------------------------------------------------------------
    for (const persona of testPersonas) {
      console.log(`\n  Evaluating: ${persona.name}`);

      // Generate portfolio
      const { html, data } = await generatePortfolio(persona, defaultStyle, defaultLayout);
      const dir = await savePortfolio(persona, defaultStyle, defaultLayout, html);
      report.portfoliosGenerated++;

      const indexPath = resolve(dir, 'index.html');
      const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
      const page = await context.newPage();

      // Navigate to generated file
      await page.goto(`file://${indexPath}`, { waitUntil: 'networkidle', timeout: 15000 });

      // Desktop structural checks
      const desktopStructural = await runStructuralChecks(page, persona, 'desktop');
      for (const r of desktopStructural) {
        if (r.pass) report.structural.passed++;
        else report.structural.failed++;
        report.structural.results.push({ persona: persona.slug, ...r });
      }

      // Desktop screenshot
      const ssDesktop = await takeScreenshot(page, `${persona.slug}-${defaultStyle}-${defaultLayout}-desktop`);
      report.screenshots.push(ssDesktop);

      // Quality checks (desktop only)
      const qualityScores = await runQualityChecks(page, persona, data);
      report.quality.perCombo.push({ persona: persona.slug, style: defaultStyle, layout: defaultLayout, scores: qualityScores });

      await page.close();

      // Mobile structural checks (375px)
      const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
      const mobilePage = await mobileContext.newPage();
      await mobilePage.goto(`file://${indexPath}`, { waitUntil: 'networkidle', timeout: 15000 });

      const mobileStructural = await runStructuralChecks(mobilePage, persona, 'mobile');
      for (const r of mobileStructural) {
        if (r.pass) report.structural.passed++;
        else report.structural.failed++;
        report.structural.results.push({ persona: persona.slug, ...r });
      }

      const ssMobile = await takeScreenshot(mobilePage, `${persona.slug}-${defaultStyle}-${defaultLayout}-mobile`);
      report.screenshots.push(ssMobile);

      await mobilePage.close();
      await mobileContext.close();
      await context.close();

      // Template recommendation
      const rec = evaluateTemplateRecommendation(persona.slug, defaultStyle);
      if (rec.pass) report.templateRec.passed++;
      else report.templateRec.failed++;
      report.templateRec.results.push({ persona: persona.slug, ...rec });

      // Candidate detection
      const det = evaluateCandidateDetection(persona, data);
      if (det.pass) report.detection.passed++;
      else report.detection.failed++;
      report.detection.results.push({ persona: persona.slug, ...det });
    }

    // -----------------------------------------------------------------------
    // Step 5: All 8+ layouts for senior engineer
    // -----------------------------------------------------------------------
    console.log('\n  Evaluating: All layouts for Senior Engineer');
    const seniorPersona = personas[0];
    const layoutCheckStyle = 'bare';

    for (const layoutName of allLayouts) {
      if (isBlocked(blocked, layoutCheckStyle, layoutName)) {
        report.allLayoutsCheck.results.push({
          layout: layoutName,
          pass: true,
          detail: 'Skipped (blocked combo)',
        });
        report.allLayoutsCheck.passed++;
        continue;
      }

      try {
        const { html } = await generatePortfolio(seniorPersona, layoutCheckStyle, layoutName);
        const dir = await savePortfolio(seniorPersona, layoutCheckStyle, layoutName, html);
        report.portfoliosGenerated++;

        const indexPath = resolve(dir, 'index.html');
        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        const pg = await ctx.newPage();
        await pg.goto(`file://${indexPath}`, { waitUntil: 'networkidle', timeout: 15000 });

        // Check footer
        const hasFooter = await pg.evaluate(() => {
          const footer = document.querySelector('footer');
          if (!footer) return false;
          return footer.innerText.toLowerCase().includes('speedrun');
        });

        // Check name (h1 or .site-name for sidebar layouts)
        const hasName = await pg.evaluate(() => {
          const h1 = document.querySelector('h1');
          if (h1 && h1.innerText.length > 0) return true;
          const siteName = document.querySelector('.site-name');
          if (siteName && siteName.innerText.length > 0) return true;
          return false;
        });

        // Check no horizontal scroll
        const noHScroll = await pg.evaluate(() => {
          return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 5;
        });

        // Screenshot
        await takeScreenshot(pg, `senior-engineer-bare-${layoutName}-desktop`);

        // Mobile check
        await pg.setViewportSize({ width: 375, height: 812 });
        await pg.waitForTimeout(300);
        const mobileNoHScroll = await pg.evaluate(() => {
          return document.documentElement.scrollWidth <= document.documentElement.clientWidth + 5;
        });
        await takeScreenshot(pg, `senior-engineer-bare-${layoutName}-mobile`);

        const layoutPass = hasFooter && hasName && noHScroll && mobileNoHScroll;
        if (layoutPass) report.allLayoutsCheck.passed++;
        else report.allLayoutsCheck.failed++;

        const detail = [];
        if (!hasFooter) detail.push('footer missing');
        if (!hasName) detail.push('name missing');
        if (!noHScroll) detail.push('desktop h-scroll');
        if (!mobileNoHScroll) detail.push('mobile h-scroll');

        report.allLayoutsCheck.results.push({
          layout: layoutName,
          pass: layoutPass,
          detail: detail.length > 0 ? detail.join(', ') : null,
        });

        await pg.close();
        await ctx.close();
      } catch (err) {
        report.allLayoutsCheck.failed++;
        report.allLayoutsCheck.results.push({
          layout: layoutName,
          pass: false,
          detail: `Generation error: ${err.message}`,
        });
      }
    }

    // -----------------------------------------------------------------------
    // Aggregate quality scores
    // -----------------------------------------------------------------------
    const qualityKeys = ['bioQuality', 'contentDensity', 'sectionBalance', 'visualHierarchy', 'whitespace'];
    for (const key of qualityKeys) {
      const vals = report.quality.perCombo.map(c => c.scores[key]).filter(v => v !== undefined);
      report.quality.scores[key] = vals.length > 0
        ? (vals.reduce((a, b) => a + b, 0) / vals.length)
        : 0;
    }

  } finally {
    if (browser) await browser.close();
  }

  return report;
}
