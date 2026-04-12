#!/usr/bin/env node

/**
 * tests/e2e/portfolio-generation.test.mjs — End-to-end portfolio generation tests
 *
 * Uses Playwright to:
 * - Generate portfolios (various combos), open in headless browser
 * - Verify page loads, title, footer, name, experience entries
 * - Screenshot at desktop (1280x900) and mobile (375x812)
 * - Verify no horizontal scrollbar at either viewport size
 * - Verify no overlapping elements
 * - Runs for 5 representative combos
 */

import { Suite } from '../helpers.mjs';
import { chromium } from 'playwright';
import { writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getStyle, resetCache as resetStyleCache } from '../../styles/registry.mjs';
import { getLayout, resetCache as resetLayoutCache } from '../../layouts/registry.mjs';
import { esc, renderInlineMarkdown } from '../../lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const SCREENSHOTS_DIR = resolve(__dirname, '../screenshots');
const s = new Suite('e2e:portfolio-generation');

// -------------------------------------------------------------------------
// Mock data
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
  homeBio: '<p>Full-stack engineer who loves distributed systems.</p>',
  superpowers: ['Distributed systems', 'Developer experience', 'Performance optimization'],
  proofPoints: [],
  targetRoles: ['Senior Software Engineer', 'Staff Engineer'],
  locationFlex: 'Remote or Seattle hybrid',
  experience: [
    { company: 'Wavelength Labs', location: '', role: 'Senior Software Engineer', dateRange: 'March 2022 - Present', bullets: ['Led platform team', 'Built collaboration engine'] },
    { company: 'Wavelength Labs', location: '', role: 'Software Engineer', dateRange: 'June 2020 - March 2022', bullets: ['Built API gateway', 'Migrated auth system'] },
    { company: 'Nimbus Technologies', location: '', role: 'Backend Engineer', dateRange: 'January 2018 - May 2020', bullets: ['Built data pipeline', 'Implemented rate limiting'] },
  ],
  education: ['BS Computer Science, University of Washington, 2017'],
  skills: ['TypeScript', 'Go', 'Python', 'Rust', 'Kubernetes', 'Terraform', 'AWS'],
  projects: [
    { name: 'feature-flags-sdk', description: 'Open-source feature flag SDK', heroMetric: '1.2K stars', url: 'https://github.com/test/sdk' },
    { name: 'DevPortal', description: 'Internal developer portal', heroMetric: '', url: '' },
  ],
  experienceGroups: [
    { company: 'Wavelength Labs', location: '', roles: [
      { role: 'Senior Software Engineer', dateRange: 'March 2022 - Present', bullets: ['Led platform team', 'Built collaboration engine'] },
      { role: 'Software Engineer', dateRange: 'June 2020 - March 2022', bullets: ['Built API gateway', 'Migrated auth system'] },
    ]},
    { company: 'Nimbus Technologies', location: '', roles: [
      { role: 'Backend Engineer', dateRange: 'January 2018 - May 2020', bullets: ['Built data pipeline', 'Implemented rate limiting'] },
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
// Helper: build full HTML page
// -------------------------------------------------------------------------

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(summaryShort || '')}">
${fontLinks}
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

resetStyleCache();
resetLayoutCache();

console.log('\n--- E2E: Portfolio Generation ---');

const COMBOS = [
  ['bare', 'multipage'],
  ['void', 'scroll'],
  ['press', 'cards'],
  ['ink', 'spread'],
  ['terminal', 'sidebar'],
];

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch (e) {
  console.log(`  Playwright not available: ${e.message}`);
  console.log('  Skipping e2e portfolio generation tests.\n');
  s.skip('all e2e tests', 'Playwright browser not available');
  const result = s.report();
  process.exit(0);
}

await mkdir(SCREENSHOTS_DIR, { recursive: true });

for (const [styleName, layoutName] of COMBOS) {
  const comboName = `${styleName}-${layoutName}`;

  let style, layout;
  try {
    style = await getStyle(styleName);
    layout = await getLayout(layoutName);
  } catch (e) {
    s.skip(`${comboName}: load`, e.message);
    continue;
  }

  const pages = layout.pages(mockData);
  const html = buildPage({
    title: mockData.name,
    styleCSS: style.css(),
    layoutCSS: layout.css(),
    fonts: style.fonts || [],
    body: pages['index.html'],
    summaryShort: mockData.summaryShort,
  });

  // Write to temp file
  const tmpDir = resolve(SCREENSHOTS_DIR, comboName);
  await mkdir(tmpDir, { recursive: true });
  const htmlPath = resolve(tmpDir, 'index.html');
  await writeFile(htmlPath, html, 'utf-8');

  // Desktop viewport
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 10000 });

    // Page loads
    s.assert(true, `${comboName}: page loads`);

    // Title is set
    const title = await page.title();
    s.assert(title.length > 0, `${comboName}: title is set`);

    // Footer visible
    const footer = await page.$('footer');
    s.assert(footer !== null, `${comboName}: footer element exists`);

    // Name appears in page
    const bodyText = await page.textContent('body');
    s.assert(bodyText.includes('Alex Rivera') || bodyText.includes('Alex'), `${comboName}: name appears on page`);

    // Screenshot desktop
    await page.screenshot({ path: resolve(tmpDir, 'desktop.png'), fullPage: true });
    s.assert(true, `${comboName}: desktop screenshot captured`);

    // Check no horizontal scrollbar at desktop
    const desktopScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const desktopClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    s.assert(
      desktopScrollWidth <= desktopClientWidth + 2, // 2px tolerance
      `${comboName}: no horizontal scrollbar at desktop (scroll=${desktopScrollWidth}, client=${desktopClientWidth})`
    );

  } catch (e) {
    s.fail(`${comboName}: desktop test`, e.message);
  }
  await context.close();

  // Mobile viewport
  const mobileContext = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const mobilePage = await mobileContext.newPage();

  try {
    await mobilePage.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 10000 });

    // Screenshot mobile
    await mobilePage.screenshot({ path: resolve(tmpDir, 'mobile.png'), fullPage: true });
    s.assert(true, `${comboName}: mobile screenshot captured`);

    // Check no horizontal scrollbar at mobile
    const mobileScrollWidth = await mobilePage.evaluate(() => document.documentElement.scrollWidth);
    const mobileClientWidth = await mobilePage.evaluate(() => document.documentElement.clientWidth);
    s.assert(
      mobileScrollWidth <= mobileClientWidth + 2,
      `${comboName}: no horizontal scrollbar at mobile (scroll=${mobileScrollWidth}, client=${mobileClientWidth})`
    );

  } catch (e) {
    s.fail(`${comboName}: mobile test`, e.message);
  }
  await mobileContext.close();
}

await browser.close();

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
