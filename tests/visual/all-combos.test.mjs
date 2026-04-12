#!/usr/bin/env node

/**
 * tests/visual/all-combos.test.mjs — Full 140-combo visual check
 *
 * Generates every valid style x layout combo, screenshots at 1280x900,
 * and checks for common rendering issues:
 *   - Page renders (not blank)
 *   - No horizontal scrollbar at desktop
 *   - Footer element exists
 *   - Name appears on page
 *   - No JS errors
 *
 * Optional flags:
 *   --mobile        Also screenshot at 375x812 and check mobile
 *   --update-baselines  Regenerate baselines for all combos
 */

import { Suite } from '../helpers.mjs';
import { chromium } from 'playwright';
import { writeFile, readFile, mkdir, access } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getStyle, listStyles, resetCache as resetStyleCache } from '../../styles/registry.mjs';
import { getLayout, listLayouts, resetCache as resetLayoutCache } from '../../layouts/registry.mjs';
import { esc, renderInlineMarkdown } from '../../lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = resolve(__dirname, '..', 'screenshots', 'all-combos');
const s = new Suite('visual:all-combos');

const doMobile = process.argv.includes('--mobile');
const updateBaselines = process.argv.includes('--update-baselines');

// -------------------------------------------------------------------------
// Mock data (same as regression.test.mjs for consistency)
// -------------------------------------------------------------------------

const mockData = {
  name: 'Alex Rivera',
  headline: 'Full-stack engineer building infrastructure for teams.',
  location: 'Seattle, WA',
  email: 'alex@example.com',
  linkedin: 'https://linkedin.com/in/alexrivera',
  github: 'https://github.com/alexrivera',
  summaryText: 'Full-stack engineer with 6 years of experience building high-traffic web applications.',
  summaryShort: 'Full-stack engineer with 6 years...',
  exitStory: 'Looking for a senior role at a startup.',
  currentProject: 'Building an open-source feature flag SDK.',
  homeBio: '<p>Full-stack engineer who loves distributed systems. Over the past 6 years I have built real-time collaboration engines, API gateways handling 10K req/s, and developer tools that cut onboarding from weeks to days.</p>',
  superpowers: ['Distributed systems', 'Developer experience', 'Performance optimization'],
  proofPoints: [],
  targetRoles: ['Senior Software Engineer', 'Staff Engineer'],
  locationFlex: 'Remote or Seattle hybrid',
  experience: [
    { company: 'Wavelength Labs', location: '', role: 'Senior Software Engineer', dateRange: 'March 2022 - Present', bullets: ['Led platform team of 4 engineers', 'Built collaboration engine with CRDTs'] },
    { company: 'Wavelength Labs', location: '', role: 'Software Engineer', dateRange: 'June 2020 - March 2022', bullets: ['Built API gateway at 10K req/s', 'Migrated auth to JWT'] },
    { company: 'Nimbus Technologies', location: '', role: 'Backend Engineer', dateRange: 'January 2018 - May 2020', bullets: ['Built data pipeline for 500M events/month'] },
  ],
  education: ['BS Computer Science, University of Washington, 2017'],
  skills: ['TypeScript', 'Go', 'Python', 'Rust', 'SQL', 'Kubernetes', 'Terraform', 'AWS'],
  projects: [
    { name: 'feature-flags-sdk', description: 'Open-source feature flag SDK with edge evaluation', heroMetric: '1.2K stars', url: 'https://github.com/test/sdk' },
    { name: 'DevPortal', description: 'Internal developer portal', heroMetric: '', url: '' },
  ],
  experienceGroups: [
    { company: 'Wavelength Labs', location: '', roles: [
      { role: 'Senior Software Engineer', dateRange: 'March 2022 - Present', bullets: ['Led platform team of 4 engineers', 'Built collaboration engine with CRDTs'] },
      { role: 'Software Engineer', dateRange: 'June 2020 - March 2022', bullets: ['Built API gateway at 10K req/s', 'Migrated auth to JWT'] },
    ]},
    { company: 'Nimbus Technologies', location: '', roles: [
      { role: 'Backend Engineer', dateRange: 'January 2018 - May 2020', bullets: ['Built data pipeline for 500M events/month'] },
    ]},
  ],
  educationDetail: {},
  activities: [],
  research: [],
  profileProjects: [],
  testimonials: [],
  values: [],
  nowText: '',
  talks: [],
  tools: [],
  gallery: [],
  reading: [],
  showEducationDetail: false,
  sectionOrder: null,
  esc,
  renderInlineMarkdown,
};

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function buildPage({ title, styleCSS, layoutCSS, fonts, body }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
${fontLinks}
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// -------------------------------------------------------------------------
// Load blocked combos
// -------------------------------------------------------------------------

async function loadBlocked() {
  const raw = await readFile(resolve(__dirname, '..', '..', 'compatibility.json'), 'utf-8');
  const data = JSON.parse(raw);
  return new Set((data.blocked || []).map(b => `${b[0]}-${b[1]}`));
}

// -------------------------------------------------------------------------
// Main
// -------------------------------------------------------------------------

resetStyleCache();
resetLayoutCache();

console.log('\n--- All-Combos Visual Check ---');

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch (e) {
  s.skip('all visual tests', `Playwright not available: ${e.message}`);
  s.report();
  process.exit(0);
}

await mkdir(SCREENSHOTS_DIR, { recursive: true });

const blocked = await loadBlocked();
const styleNames = await listStyles();
const layoutNames = await listLayouts();

let checked = 0;
let issues = [];

for (const styleName of styleNames) {
  for (const layoutName of layoutNames) {
    const comboName = `${styleName}-${layoutName}`;
    if (blocked.has(comboName)) continue;

    let style, layout;
    try {
      style = await getStyle(styleName);
      layout = await getLayout(layoutName);
    } catch (e) {
      s.fail(`${comboName}: load`, e.message);
      continue;
    }

    const pages = layout.pages(mockData);
    const html = buildPage({
      title: mockData.name,
      styleCSS: style.css(),
      layoutCSS: layout.css(),
      fonts: [],
      body: pages['index.html'],
    });

    const tmpPath = resolve(SCREENSHOTS_DIR, `${comboName}.html`);
    await writeFile(tmpPath, html, 'utf-8');

    // Desktop check (1280x900)
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    const page = await context.newPage();

    const jsErrors = [];
    page.on('pageerror', err => jsErrors.push(err.message));

    try {
      await page.goto(`file://${tmpPath}`, { waitUntil: 'networkidle', timeout: 10000 });

      // Check page rendered
      const bodyText = await page.evaluate(() => document.body.innerText.trim());
      if (!bodyText || bodyText.length < 10) {
        s.fail(`${comboName}: blank page`, `body text length = ${bodyText.length}`);
        issues.push({ combo: comboName, issue: 'blank page' });
        await context.close();
        continue;
      }

      // Check horizontal overflow
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      if (scrollWidth > clientWidth + 2) {
        s.fail(`${comboName}: horizontal overflow`, `scroll=${scrollWidth} > client=${clientWidth}`);
        issues.push({ combo: comboName, issue: 'horizontal overflow', detail: `${scrollWidth} > ${clientWidth}` });
      }

      // Check footer exists
      const hasFooter = await page.evaluate(() => !!document.querySelector('footer'));
      if (!hasFooter) {
        // Some layouts may not have a <footer> tag — check for footer class
        const hasFooterClass = await page.evaluate(() => !!document.querySelector('.footer, [class*="footer"]'));
        if (!hasFooterClass) {
          s.fail(`${comboName}: no footer`, 'no footer element found');
          issues.push({ combo: comboName, issue: 'no footer' });
        }
      }

      // Check name appears (case-insensitive, handles CSS text-transform and line breaks)
      const hasName = await page.evaluate((name) => {
        const bodyText = document.body.innerText.toLowerCase().replace(/\n/g, ' ');
        return bodyText.includes(name.toLowerCase());
      }, mockData.name);
      if (!hasName) {
        s.fail(`${comboName}: name missing`, `"${mockData.name}" not found`);
        issues.push({ combo: comboName, issue: 'name missing' });
      }

      // Check for JS errors
      if (jsErrors.length > 0) {
        s.fail(`${comboName}: JS errors`, jsErrors.join('; '));
        issues.push({ combo: comboName, issue: 'JS errors', detail: jsErrors.join('; ') });
      }

      // Screenshot
      await page.screenshot({ path: resolve(SCREENSHOTS_DIR, `${comboName}.png`), fullPage: true });

      // If no failures recorded for this combo, pass
      const comboFails = issues.filter(i => i.combo === comboName);
      if (comboFails.length === 0) {
        s.pass(`${comboName}: OK`);
      }

      checked++;
    } catch (e) {
      s.fail(`${comboName}: render`, e.message);
      issues.push({ combo: comboName, issue: 'render error', detail: e.message });
    }

    await context.close();

    // Mobile check (375x812) if requested
    if (doMobile) {
      const mCtx = await browser.newContext({ viewport: { width: 375, height: 812 } });
      const mPage = await mCtx.newPage();
      try {
        await mPage.goto(`file://${tmpPath}`, { waitUntil: 'networkidle', timeout: 10000 });
        const { scrollWidth: mSW, clientWidth: mCW } = await mPage.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));
        if (mSW > mCW + 2) {
          s.fail(`${comboName}: mobile horizontal overflow`, `scroll=${mSW} > client=${mCW}`);
          issues.push({ combo: comboName, issue: 'mobile horizontal overflow', detail: `${mSW} > ${mCW}` });
        } else {
          s.pass(`${comboName}: mobile OK`);
        }
        await mPage.screenshot({ path: resolve(SCREENSHOTS_DIR, `${comboName}-mobile.png`), fullPage: true });
      } catch (e) {
        s.fail(`${comboName}: mobile render`, e.message);
      }
      await mCtx.close();
    }
  }
}

await browser.close();

console.log(`\n  ${checked} combos checked, ${issues.length} issues found.`);

if (issues.length > 0) {
  console.log('\n  Issues summary:');
  for (const { combo, issue, detail } of issues) {
    console.log(`    ${combo}: ${issue}${detail ? ` (${detail})` : ''}`);
  }
}

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
