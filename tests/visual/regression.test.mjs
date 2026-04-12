#!/usr/bin/env node

/**
 * tests/visual/regression.test.mjs — Visual regression tests
 *
 * Uses Playwright to:
 * - Generate key combos (one per layout + extras)
 * - Screenshot each at 1280x900
 * - Compare against baseline screenshots in tests/visual/baselines/
 * - If no baseline exists, CREATE it (first run generates baselines)
 * - If baseline exists, pixel-diff against it (1% threshold)
 *
 * Flags:
 *   --update-baselines   Regenerate all baselines
 */

import { Suite } from '../helpers.mjs';
import { chromium } from 'playwright';
import { writeFile, readFile, mkdir, access } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getStyle, resetCache as resetStyleCache } from '../../styles/registry.mjs';
import { getLayout, resetCache as resetLayoutCache } from '../../layouts/registry.mjs';
import { esc, renderInlineMarkdown } from '../../lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASELINES_DIR = resolve(__dirname, 'baselines');
const DIFFS_DIR = resolve(__dirname, 'diffs');
const s = new Suite('visual:regression');

const updateBaselines = process.argv.includes('--update-baselines');

// -------------------------------------------------------------------------
// Mock data (consistent for visual stability)
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
// Helper
// -------------------------------------------------------------------------

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort }) {
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

async function fileExists(path) {
  try { await access(path); return true; } catch { return false; }
}

/**
 * Simple pixel comparison using raw PNG buffer comparison.
 * Returns the fraction of bytes that differ (0.0 to 1.0).
 * This is a rough approximation — true pixel diff would need PNG decoding,
 * but buffer comparison catches any difference.
 */
function bufferDiffRatio(buf1, buf2) {
  if (buf1.length !== buf2.length) {
    // Different file sizes = definitely different. Return the size ratio as proxy.
    return Math.abs(buf1.length - buf2.length) / Math.max(buf1.length, buf2.length);
  }
  let diffBytes = 0;
  for (let i = 0; i < buf1.length; i++) {
    if (buf1[i] !== buf2[i]) diffBytes++;
  }
  return diffBytes / buf1.length;
}

// -------------------------------------------------------------------------
// Combos to test: one per layout + 2 extras
// -------------------------------------------------------------------------

const COMBOS = [
  ['bare', 'multipage'],
  ['void', 'scroll'],
  ['press', 'cards'],
  ['ink', 'centered'],
  ['coral', 'bands'],
  ['terminal', 'sidebar'],
  ['volt', 'sidebar-right'],
  ['gradient', 'spread'],
  ['dusk', 'multipage'],
  ['garden', 'scroll'],
];

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

resetStyleCache();
resetLayoutCache();

console.log('\n--- Visual Regression Tests ---');

if (updateBaselines) {
  console.log('  Mode: UPDATE BASELINES (regenerating all)\n');
}

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch (e) {
  s.skip('all visual tests', `Playwright not available: ${e.message}`);
  const result = s.report();
  process.exit(0);
}

await mkdir(BASELINES_DIR, { recursive: true });
await mkdir(DIFFS_DIR, { recursive: true });

let baselinesCreated = 0;
let baselinesCompared = 0;

for (const [styleName, layoutName] of COMBOS) {
  const comboName = `${styleName}-${layoutName}`;
  const baselinePath = resolve(BASELINES_DIR, `${comboName}.png`);

  let style, layout;
  try {
    style = await getStyle(styleName);
    layout = await getLayout(layoutName);
  } catch (e) {
    s.skip(`${comboName}`, e.message);
    continue;
  }

  const pages = layout.pages(mockData);
  const html = buildPage({
    title: mockData.name,
    styleCSS: style.css(),
    layoutCSS: layout.css(),
    fonts: [], // skip web fonts for visual stability
    body: pages['index.html'],
    summaryShort: mockData.summaryShort,
  });

  // Write temp HTML
  const tmpPath = resolve(DIFFS_DIR, `${comboName}-current.html`);
  await writeFile(tmpPath, html, 'utf-8');

  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(`file://${tmpPath}`, { waitUntil: 'networkidle', timeout: 10000 });
    const screenshot = await page.screenshot({ fullPage: true });

    const hasBaseline = await fileExists(baselinePath);

    if (!hasBaseline || updateBaselines) {
      // Create/update baseline
      await writeFile(baselinePath, screenshot);
      baselinesCreated++;
      s.assert(true, `${comboName}: baseline ${updateBaselines ? 'updated' : 'created'}`);
    } else {
      // Compare against baseline
      const baseline = await readFile(baselinePath);
      const diffRatio = bufferDiffRatio(baseline, screenshot);
      const threshold = 0.01; // 1% tolerance

      if (diffRatio <= threshold) {
        baselinesCompared++;
        s.assert(true, `${comboName}: matches baseline (diff=${(diffRatio * 100).toFixed(2)}%)`);
      } else {
        // Save the diff screenshot for inspection
        const diffPath = resolve(DIFFS_DIR, `${comboName}-diff.png`);
        await writeFile(diffPath, screenshot);
        s.fail(`${comboName}: visual regression`, `${(diffRatio * 100).toFixed(1)}% diff (threshold: ${threshold * 100}%). See: ${diffPath}`);
      }
    }
  } catch (e) {
    s.fail(`${comboName}: screenshot`, e.message);
  }

  await context.close();
}

await browser.close();

if (baselinesCreated > 0) {
  console.log(`\n  ${baselinesCreated} baselines ${updateBaselines ? 'updated' : 'created'} in ${BASELINES_DIR}/`);
}
if (baselinesCompared > 0) {
  console.log(`  ${baselinesCompared} baselines compared successfully.`);
}

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
