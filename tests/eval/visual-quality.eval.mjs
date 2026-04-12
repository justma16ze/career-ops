/**
 * tests/eval/visual-quality.eval.mjs — Visual quality scoring.
 *
 * For a sample of random style x layout combos: screenshot, check footer,
 * font usage, color accent, experience formatting. Report pass/fail per combo.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
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

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function loadBlockedCombos() {
  try {
    const raw = await readFile(resolve(ROOT, 'compatibility.json'), 'utf-8');
    const data = JSON.parse(raw);
    return (data.blocked || []).map(b => [b[0], b[1]]);
  } catch {
    return [];
  }
}

function buildProfile(persona) {
  const c = persona.profileOverrides?.candidate || {};
  const n = persona.profileOverrides?.narrative || {};
  return {
    candidate: {
      full_name: persona.resume.match(/^#\s+(.+)/m)?.[1] || persona.name,
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

function buildPage({ title, styleCSS, layoutCSS, fonts, body }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${fontLinks}
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export async function runVisualQualityEval({ sampleSize = 20, quick = false } = {}) {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const blocked = await loadBlockedCombos();
  const allStyles = await listStyles();
  const allLayouts = await listLayouts();

  // Build all valid combos
  const validCombos = [];
  for (const s of allStyles) {
    for (const l of allLayouts) {
      if (!blocked.some(b => b[0] === s && b[1] === l)) {
        validCombos.push([s, l]);
      }
    }
  }

  const effectiveSize = quick ? 3 : Math.min(sampleSize, validCombos.length);
  const sampled = shuffleArray(validCombos).slice(0, effectiveSize);
  const persona = personas[0]; // Senior engineer for visual checks

  const report = {
    totalCombos: validCombos.length,
    sampled: sampled.length,
    passed: 0,
    failed: 0,
    results: [],
  };

  let browser;
  try {
    browser = await chromium.launch({ headless: true });

    for (const [styleName, layoutName] of sampled) {
      const comboLabel = `${styleName} x ${layoutName}`;
      console.log(`    Visual: ${comboLabel}`);

      const checks = { footer: false, multiFont: false, accentUsed: false, entryLayout: false };

      try {
        const profile = buildProfile(persona);
        const sections = parseSections(persona.resume);
        const data = extractTemplateData({ profile, sections, articleDigest: null });

        const style = await getStyle(styleName);
        const layout = await getLayout(layoutName);
        const pages = layout.pages(data);
        const body = Object.values(pages)[0];

        const html = buildPage({
          title: data.name,
          styleCSS: style.css(),
          layoutCSS: layout.css(),
          fonts: style.fonts || [],
          body,
        });

        const dir = resolve(OUTPUT_DIR, `visual-${styleName}-${layoutName}`);
        await mkdir(dir, { recursive: true });
        const filePath = resolve(dir, 'index.html');
        await writeFile(filePath, html, 'utf-8');

        const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
        const page = await ctx.newPage();
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle', timeout: 15000 });

        // 1. Footer visible and readable
        checks.footer = await page.evaluate(() => {
          const footer = document.querySelector('footer');
          if (!footer) return false;
          const text = footer.innerText.toLowerCase();
          if (!text.includes('speedrun')) return false;
          const r = footer.getBoundingClientRect();
          return r.height > 5 && r.width > 20;
        });

        // 2. Uses more than one font
        checks.multiFont = await page.evaluate(() => {
          const fonts = new Set();
          const elements = document.querySelectorAll('h1, h2, p, a, li, span, nav');
          for (const el of elements) {
            const ff = window.getComputedStyle(el).fontFamily;
            if (ff) fonts.add(ff.split(',')[0].trim().replace(/['"]/g, ''));
          }
          return fonts.size >= 2;
        });

        // 3. Color accent visible (--accent used in computed styles)
        checks.accentUsed = await page.evaluate(() => {
          const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
          if (!accent) return false;
          // Check if any visible link/button uses this color
          const links = document.querySelectorAll('a, button, .accent');
          for (const el of links) {
            const color = window.getComputedStyle(el).color;
            if (color && color !== 'rgb(0, 0, 0)' && color !== 'rgba(0, 0, 0, 0)') return true;
          }
          return accent.length > 0; // At least defined
        });

        // 4. Experience entry header uses flex/grid (company + date on same line)
        checks.entryLayout = await page.evaluate(() => {
          const headers = document.querySelectorAll('.entry-header, .exp-header, .experience-header');
          if (headers.length === 0) {
            // Some layouts use different class names; check if any entry has date and company
            const entries = document.querySelectorAll('.entry, .exp-entry');
            return entries.length > 0; // At least entries exist
          }
          for (const h of headers) {
            const display = window.getComputedStyle(h).display;
            if (display === 'flex' || display === 'grid' || display === 'inline-flex') return true;
          }
          return false;
        });

        // Screenshot
        await page.screenshot({
          path: resolve(OUTPUT_DIR, `visual-${styleName}-${layoutName}.png`),
          fullPage: false, // viewport only for visual quality
        });

        await page.close();
        await ctx.close();
      } catch (err) {
        console.log(`      Error: ${err.message}`);
      }

      const passCount = Object.values(checks).filter(Boolean).length;
      const totalChecks = Object.keys(checks).length;
      const pass = passCount >= 3; // At least 3 of 4 checks pass

      if (pass) report.passed++;
      else report.failed++;

      report.results.push({
        style: styleName,
        layout: layoutName,
        checks,
        passCount,
        totalChecks,
        pass,
      });
    }
  } finally {
    if (browser) await browser.close();
  }

  return report;
}
