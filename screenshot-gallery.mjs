#!/usr/bin/env node

/**
 * screenshot-gallery.mjs — Generate portfolio screenshots for README gallery.
 *
 * Generates 6 demo portfolios and takes Playwright screenshots at 1280x900.
 * Uses demo data (Alex Rivera) so no personal information is exposed.
 *
 * Usage: node screenshot-gallery.mjs
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { getStyle } from './styles/registry.mjs';
import { getLayout } from './layouts/registry.mjs';
import {
  parseSections, extractTemplateData, esc,
} from './lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// The 6 combos to screenshot for the README gallery
const COMBOS = [
  ['bare', 'multipage', 'Clean & Minimal'],
  ['void', 'scroll', 'Dark & Technical'],
  ['ink', 'spread', 'Warm & Editorial'],
  ['press', 'cards', 'Bold & Confident'],
  ['garden', 'multipage', 'Warm & Editorial (alt)'],
  ['terminal', 'sidebar', 'Dark & Technical (alt)'],
];

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

async function main() {
  console.log('Screenshot Gallery Generator\n');

  // Load demo data
  const [profileRaw, cvRaw] = await Promise.all([
    readFile(resolve(__dirname, 'demo/demo-profile.yml'), 'utf-8'),
    readFile(resolve(__dirname, 'demo/demo-cv.md'), 'utf-8'),
  ]);
  const profile = yaml.load(profileRaw);
  const sections = parseSections(cvRaw);
  const data = extractTemplateData({ profile, sections, articleDigest: null });

  // Generate HTML for each combo
  const tmpDir = resolve(__dirname, '.screenshot-tmp');
  const screenshotsDir = resolve(__dirname, 'screenshots');
  await mkdir(tmpDir, { recursive: true });
  await mkdir(screenshotsDir, { recursive: true });

  const htmlFiles = [];

  for (const [styleName, layoutName, label] of COMBOS) {
    const style = await getStyle(styleName);
    const layout = await getLayout(layoutName);
    const pages = layout.pages(data);
    const styleCSS = style.css();
    const layoutCSS = layout.css();
    const fonts = style.fonts || [];

    // We only screenshot index.html
    const body = pages['index.html'];
    const html = buildPage({
      title: `${data.name} — ${label}`,
      styleCSS,
      layoutCSS,
      fonts,
      body,
      summaryShort: data.summaryShort,
    });

    const filename = `${styleName}-${layoutName}.html`;
    const htmlPath = resolve(tmpDir, filename);
    await writeFile(htmlPath, html, 'utf-8');
    htmlFiles.push({
      styleName,
      layoutName,
      label,
      htmlPath,
      screenshotPath: resolve(screenshotsDir, `${styleName}-${layoutName}.png`),
    });
    console.log(`  Generated ${filename}`);
  }

  // Take screenshots with Playwright
  console.log('\nTaking screenshots...\n');

  const { chromium } = await import('playwright');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
  });

  for (const { styleName, layoutName, label, htmlPath, screenshotPath } of htmlFiles) {
    const page = await context.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
    // Wait a bit for fonts to load
    await page.waitForTimeout(1500);
    await page.screenshot({ path: screenshotPath, type: 'png' });
    await page.close();
    console.log(`  ${styleName}-${layoutName}.png  (${label})`);
  }

  await browser.close();

  // Clean up temp HTML files
  const { rm } = await import('fs/promises');
  await rm(tmpDir, { recursive: true, force: true });

  console.log(`\n  6 screenshots saved to screenshots/`);
  console.log('  Reference them in README.md as: ![alt](screenshots/bare-multipage.png)');
}

main().catch(e => {
  console.error('Failed:', e.message);
  process.exit(1);
});
