#!/usr/bin/env node

/**
 * qa-all-combos.mjs — Full QA pass on all 140 valid portfolio combinations.
 *
 * For each combo:
 * 1. Generate HTML with real data (cv.md + profile.yml)
 * 2. Screenshot at 1280x900 (desktop) and 375x812 (mobile)
 * 3. Automated checks: footer visible, name present, horizontal scroll, text size
 *
 * Usage: node qa-all-combos.mjs [--fix] [--combo=style-layout]
 */

import { readFile, writeFile, mkdir, readdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { getStyle, listStyles } from './styles/registry.mjs';
import { getLayout, listLayouts } from './layouts/registry.mjs';
import {
  parseSections, extractTemplateData, esc,
} from './lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load blocked combos
async function loadBlocked() {
  const raw = await readFile(resolve(__dirname, 'compatibility.json'), 'utf-8');
  const data = JSON.parse(raw);
  return new Set(data.blocked.map(b => `${b[0]}-${b[1]}`));
}

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
${fontLinks}
<style>
/* === LAYOUT === */
${layoutCSS}
/* === STYLE === */
${styleCSS}
</style>
</head>
<body>
${body}
</body>
</html>`;
}

async function main() {
  const singleCombo = process.argv.find(a => a.startsWith('--combo='))?.split('=')[1];

  console.log('=== Full QA Pass: All 140 Valid Portfolio Combinations ===\n');

  // Load real data
  const [profileRaw, cvRaw, articleDigestRaw] = await Promise.all([
    readFile(resolve(__dirname, 'config/profile.yml'), 'utf-8'),
    readFile(resolve(__dirname, 'cv.md'), 'utf-8'),
    readFile(resolve(__dirname, 'article-digest.md'), 'utf-8').catch(() => null),
  ]);
  const profile = yaml.load(profileRaw);
  const sections = parseSections(cvRaw);
  const data = extractTemplateData({ profile, sections, articleDigest: articleDigestRaw });

  const styles = await listStyles();
  const layouts = await listLayouts();
  const blocked = await loadBlocked();

  // Build valid combos list
  let combos = [];
  for (const s of styles) {
    for (const l of layouts) {
      if (!blocked.has(`${s}-${l}`)) combos.push({ style: s, layout: l });
    }
  }

  if (singleCombo) {
    combos = combos.filter(c => `${c.style}-${c.layout}` === singleCombo);
    if (combos.length === 0) {
      console.error(`Combo "${singleCombo}" not found or blocked.`);
      process.exit(1);
    }
  }

  console.log(`Valid combos: ${combos.length}`);
  console.log(`Styles: ${styles.length} | Layouts: ${layouts.length} | Blocked: ${blocked.size}\n`);

  // Generate all HTML
  const qaDir = resolve(__dirname, 'dist-qa');
  const ssDir = resolve(qaDir, 'screenshots');
  await mkdir(qaDir, { recursive: true });
  await mkdir(ssDir, { recursive: true });

  console.log('Phase 1: Generating HTML for all combos...');
  const htmlPaths = [];
  let genErrors = 0;
  for (const { style: styleName, layout: layoutName } of combos) {
    const comboKey = `${styleName}-${layoutName}`;
    try {
      const style = await getStyle(styleName);
      const layout = await getLayout(layoutName);
      const pages = layout.pages(data);
      const styleCSS = style.css();
      const layoutCSS = layout.css();
      const fonts = style.fonts || [];
      const body = pages['index.html'];
      const html = buildPage({
        title: `${data.name} -- ${comboKey}`,
        styleCSS,
        layoutCSS,
        fonts,
        body,
        summaryShort: data.summaryShort,
      });
      const htmlPath = resolve(qaDir, `${comboKey}.html`);
      await writeFile(htmlPath, html, 'utf-8');
      htmlPaths.push({ comboKey, htmlPath, styleName, layoutName });
    } catch (err) {
      genErrors++;
      console.error(`  GEN ERROR: ${comboKey}: ${err.message}`);
    }
  }
  console.log(`  Generated: ${htmlPaths.length}/${combos.length} (${genErrors} errors)\n`);

  // Screenshot and check all combos
  console.log('Phase 2: Screenshots + automated checks...\n');
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();

  const VIEWPORTS = [
    { name: 'desktop', width: 1280, height: 900 },
    { name: 'mobile', width: 375, height: 812 },
  ];

  const results = [];
  let done = 0;

  for (const { comboKey, htmlPath, styleName, layoutName } of htmlPaths) {
    const comboResult = { comboKey, styleName, layoutName, issues: [], pass: true };

    for (const vp of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 2,
      });
      const page = await context.newPage();

      try {
        await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle', timeout: 10000 });
        await page.waitForTimeout(800);

        const ssPath = resolve(ssDir, `${comboKey}-${vp.name}.png`);
        await page.screenshot({ path: ssPath, fullPage: true, type: 'png' });

        // === AUTOMATED CHECKS ===

        // 1. Name present in rendered text
        const bodyText = await page.evaluate(() => document.body.innerText);
        if (!bodyText.includes('Jordan') && !bodyText.includes('Mazer')) {
          comboResult.issues.push(`[${vp.name}] Name not visible in rendered text`);
          comboResult.pass = false;
        }

        // 2. Footer visible (check if a footer or last section exists and is rendered)
        const hasFooter = await page.evaluate(() => {
          const footer = document.querySelector('footer, .footer, [class*="footer"], .contact-section, [class*="contact"]');
          if (!footer) return 'no-footer-element';
          const rect = footer.getBoundingClientRect();
          if (rect.height < 5) return 'footer-zero-height';
          return 'ok';
        });
        if (hasFooter === 'no-footer-element') {
          // Not necessarily a failure — some layouts might not have a dedicated footer
          // Check if contact info (email) appears anywhere
          if (!bodyText.includes('jmazer') && !bodyText.includes('linkedin.com/in/jordanmazer')) {
            comboResult.issues.push(`[${vp.name}] No footer/contact section and no contact info visible`);
            comboResult.pass = false;
          }
        } else if (hasFooter === 'footer-zero-height') {
          comboResult.issues.push(`[${vp.name}] Footer exists but has zero height (invisible)`);
          comboResult.pass = false;
        }

        // 3. Horizontal scroll check
        const hasHScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
        });
        if (hasHScroll) {
          comboResult.issues.push(`[${vp.name}] Horizontal scroll detected (scrollWidth > clientWidth)`);
          comboResult.pass = false;
        }

        // 4. Check for clipped or invisible text content
        const clipCheck = await page.evaluate(() => {
          const issues = [];
          // Check that key headings (h1, h2) are not clipped by overflow:hidden
          const headings = document.querySelectorAll('h1, h2');
          for (const h of headings) {
            const rect = h.getBoundingClientRect();
            const style = window.getComputedStyle(h);
            if (rect.width < 10 && h.innerText.trim().length > 0) {
              issues.push(`Heading "${h.innerText.trim().slice(0, 30)}" has zero/tiny width (${Math.round(rect.width)}px)`);
            }
            if (rect.height < 5 && h.innerText.trim().length > 0) {
              issues.push(`Heading "${h.innerText.trim().slice(0, 30)}" has zero/tiny height (${Math.round(rect.height)}px)`);
            }
          }
          // Check that experience entry titles are not squished to zero
          const titles = document.querySelectorAll('.entry-title, .entry-role');
          let zeroTitles = 0;
          for (const t of titles) {
            const rect = t.getBoundingClientRect();
            if (rect.height < 3 && t.innerText.trim().length > 0) zeroTitles++;
          }
          if (zeroTitles > 2) {
            issues.push(`${zeroTitles} entry titles have zero height (invisible)`);
          }
          return issues;
        });
        for (const cl of clipCheck) {
          comboResult.issues.push(`[${vp.name}] ${cl}`);
          comboResult.pass = false;
        }

        // 5. Mobile text readability (font size >= 12px for body text)
        if (vp.name === 'mobile') {
          const smallText = await page.evaluate(() => {
            const problems = [];
            const textEls = document.querySelectorAll('p, li, span, td, dd, .desc, .summary');
            let tooSmallCount = 0;
            for (const el of textEls) {
              const style = window.getComputedStyle(el);
              const fontSize = parseFloat(style.fontSize);
              if (fontSize < 11 && el.innerText.trim().length > 5) {
                tooSmallCount++;
              }
            }
            if (tooSmallCount > 3) {
              problems.push(`${tooSmallCount} text elements have font-size < 11px`);
            }
            return problems;
          });
          for (const st of smallText) {
            comboResult.issues.push(`[mobile] ${st}`);
            comboResult.pass = false;
          }
        }

        // 6. Experience entries formatted correctly (check bullet structure)
        const expCheck = await page.evaluate(() => {
          const issues = [];
          // Look for bullet lists within experience sections
          const bullets = document.querySelectorAll('li, .bullet, .exp-bullet');
          let mergedBullets = 0;
          for (const b of bullets) {
            const text = b.innerText.trim();
            // A "merged" bullet would be very long (multiple sentences jammed together)
            // or contain multiple distinct bullet-like items
            if (text.length > 500) {
              mergedBullets++;
            }
          }
          if (mergedBullets > 2) {
            issues.push(`${mergedBullets} bullet items seem merged (> 500 chars each)`);
          }
          return issues;
        });
        for (const ec of expCheck) {
          comboResult.issues.push(`[${vp.name}] ${ec}`);
          comboResult.pass = false;
        }

        // 7. Check body has meaningful content (not blank)
        const contentLen = bodyText.replace(/\s+/g, '').length;
        if (contentLen < 100) {
          comboResult.issues.push(`[${vp.name}] Page appears mostly blank (${contentLen} chars of text)`);
          comboResult.pass = false;
        }

      } catch (err) {
        comboResult.issues.push(`[${vp.name}] Playwright error: ${err.message.split('\n')[0]}`);
        comboResult.pass = false;
      }

      await context.close();
    }

    results.push(comboResult);
    done++;
    const status = comboResult.pass ? 'PASS' : 'FAIL';
    const issueCount = comboResult.issues.length;
    if (!comboResult.pass) {
      console.log(`  ${done}/${htmlPaths.length} ${comboKey}: ${status} (${issueCount} issues)`);
      for (const iss of comboResult.issues) {
        console.log(`    - ${iss}`);
      }
    } else {
      process.stdout.write(`  ${done}/${htmlPaths.length} ${comboKey}: ${status}\n`);
    }
  }

  await browser.close();

  // Summary
  const passing = results.filter(r => r.pass).length;
  const failing = results.filter(r => !r.pass).length;

  console.log('\n=== QA SUMMARY ===');
  console.log(`Total: ${results.length}`);
  console.log(`Pass:  ${passing}`);
  console.log(`Fail:  ${failing}`);

  if (failing > 0) {
    console.log('\n--- FAILURES ---');
    for (const r of results.filter(r => !r.pass)) {
      console.log(`\n${r.comboKey}:`);
      for (const iss of r.issues) {
        console.log(`  - ${iss}`);
      }
    }
  }

  // Write JSON report
  const report = {
    timestamp: new Date().toISOString(),
    total: results.length,
    passing,
    failing,
    results: results.map(r => ({
      combo: r.comboKey,
      style: r.styleName,
      layout: r.layoutName,
      pass: r.pass,
      issues: r.issues,
    })),
  };
  await writeFile(resolve(qaDir, 'qa-report.json'), JSON.stringify(report, null, 2), 'utf-8');
  console.log(`\nReport written to dist-qa/qa-report.json`);
  console.log(`Screenshots in dist-qa/screenshots/`);
}

main().catch(e => {
  console.error('Failed:', e.message);
  process.exit(1);
});
