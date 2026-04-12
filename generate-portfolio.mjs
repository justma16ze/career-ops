#!/usr/bin/env node

/**
 * generate-portfolio.mjs — Static portfolio site generator
 *
 * Reads candidate data files and generates a multi-page portfolio
 * website with all CSS inlined. Supports 8 templates.
 * No external dependencies beyond js-yaml (already in package.json).
 *
 * Usage:
 *   node generate-portfolio.mjs [--output=dist] [--template=ink] [--theme=dark|light]
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { getStyle, listStyles } from './styles/registry.mjs';
import { getLayout, listLayouts } from './layouts/registry.mjs';
import {
  parseSections, parseExperience, parseEducation, parseSkills,
  parseProjects, groupByCompany, extractTemplateData,
  renderInlineMarkdown, esc,
} from './lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { output: 'dist', theme: 'light', template: 'ink', style: '', layout: '' };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--output=')) args.output = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--theme=')) args.theme = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--template=')) args.template = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--style=')) args.style = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--layout=')) args.layout = arg.split('=')[1].toLowerCase();
    else if (arg === '--help' || arg === '-h') {
      console.log('Usage: node generate-portfolio.mjs [--output=dist] [--template=ink]');
      console.log('       node generate-portfolio.mjs --style=ink --layout=multipage [--output=dist]');
      console.log('\nStyle x Layout combinatorial system:');
      console.log('  --style=X    Visual style (colors, fonts, spacing)');
      console.log('  --layout=Y   HTML structure (multipage, sidebar, scroll, bands, centered, cards, sidebar-right, spread)');
      console.log('  --template=X Backward-compat: uses monolithic template from templates/');
      process.exit(0);
    }
  }
  if (!['dark', 'light'].includes(args.theme)) {
    console.error(`Invalid theme "${args.theme}". Use: dark, light`);
    process.exit(1);
  }
  return args;
}

// ---------------------------------------------------------------------------
// File readers
// ---------------------------------------------------------------------------

async function readProfile() {
  const path = resolve(__dirname, 'config/profile.yml');
  try {
    const raw = await readFile(path, 'utf-8');
    return yaml.load(raw);
  } catch {
    console.error('ERROR: config/profile.yml not found. Run onboarding first.');
    process.exit(1);
  }
}

async function readCV() {
  const path = resolve(__dirname, 'cv.md');
  try {
    return await readFile(path, 'utf-8');
  } catch {
    console.error('ERROR: cv.md not found. Run onboarding first.');
    process.exit(1);
  }
}

async function readArticleDigest() {
  const path = resolve(__dirname, 'article-digest.md');
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null; // optional file
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Style x Layout combinator: wraps layout HTML with style CSS + fonts
// ---------------------------------------------------------------------------

function buildComboPage({ title, body, summaryShort, styleFonts, styleCss, layoutCss }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fontLinks = styleFonts.map(f =>
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${f}" rel="stylesheet">`
  ).join('\n');
  // Layout CSS first (structural), then style CSS (visual overrides)
  const combinedCss = `/* === LAYOUT === */\n${layoutCss}\n/* === STYLE === */\n${styleCss}`;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(summaryShort)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(summaryShort)}">
<meta property="og:type" content="website">
${fontLinks}
<style>${combinedCss}</style>
</head>
<body>
${body}
</body>
</html>`;
}

async function main() {
  const args = parseArgs(process.argv);
  const outputDir = resolve(__dirname, args.output);

  // Determine mode: style+layout combo vs monolithic template
  const useCombo = !!(args.style || args.layout);

  if (useCombo) {
    // ---------- STYLE x LAYOUT MODE ----------
    const styleName = args.style || 'ink';
    const layoutName = args.layout || 'multipage';

    console.log('Portfolio generator (style x layout combinatorial system)');
    console.log(`  Style: ${styleName}`);
    console.log(`  Layout: ${layoutName}`);
    console.log(`  Output: ${outputDir}/\n`);

    let style, layout;
    try {
      style = await getStyle(styleName);
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
      const available = await listStyles();
      console.error(`Available styles: ${available.join(', ')}`);
      process.exit(1);
    }
    try {
      layout = await getLayout(layoutName);
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
      const available = await listLayouts();
      console.error(`Available layouts: ${available.join(', ')}`);
      process.exit(1);
    }

    const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
    const sections = parseSections(cvRaw);
    console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
    console.log(`  article-digest.md: ${articleDigest ? 'found' : 'not found (skipping)'}\n`);

    const data = extractTemplateData({ profile, sections, articleDigest });

    // Layout generates raw HTML body fragments (keyed by filename)
    const rawPages = layout.pages(data);
    const styleCss = style.css();
    const layoutCss = layout.css();

    await mkdir(outputDir, { recursive: true });
    let total = 0;
    for (const [f, bodyHtml] of Object.entries(rawPages)) {
      const pageTitle = f === 'index.html' ? data.name : `${f.replace('.html', '').replace(/^./, c => c.toUpperCase())} \u2014 ${data.name}`;
      const html = buildComboPage({
        title: pageTitle,
        body: bodyHtml,
        summaryShort: data.summaryShort,
        styleFonts: style.fonts,
        styleCss,
        layoutCss,
      });
      await writeFile(resolve(outputDir, f), html, 'utf-8');
      const sz = Buffer.byteLength(html, 'utf-8');
      total += sz;
      console.log(`  ${f} (${(sz / 1024).toFixed(1)} KB)`);
    }
    console.log(`\n  ${Object.keys(rawPages).length} pages, ${(total / 1024).toFixed(1)} KB total`);
    console.log(`  Style: ${styleName} | Layout: ${layoutName}`);
    console.log(`\n  open ${resolve(outputDir, 'index.html')}`);

  } else {
    // ---------- TEMPLATE MODE (backward compat — redirects to style + multipage) ----------
    const templateName = args.template;

    console.log('Portfolio generator');
    console.log(`  Template: ${templateName} (mapped to style + multipage layout)`);
    console.log(`  Output: ${outputDir}/\n`);

    let style;
    try {
      style = await getStyle(templateName);
    } catch {
      const styles = await listStyles();
      console.error(`Unknown style "${templateName}".`);
      console.error(`Available styles: ${styles.join(', ')}`);
      process.exit(1);
    }
    const layout = await getLayout('multipage');

    const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
    const sections = parseSections(cvRaw);
    console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}\n`);
    const data = extractTemplateData({ profile, sections, articleDigest });
    const rawPages = layout.pages(data);
    const styleCss = style.css();
    const layoutCss = layout.css();
    await mkdir(outputDir, { recursive: true });
    let total = 0;
    for (const [f, bodyHtml] of Object.entries(rawPages)) {
      const pageTitle = f === 'index.html' ? data.name : `${f.replace('.html', '').replace(/^./, c => c.toUpperCase())} \u2014 ${data.name}`;
      const html = buildComboPage({ title: pageTitle, body: bodyHtml, summaryShort: data.summaryShort, styleFonts: style.fonts, styleCss, layoutCss });
      await writeFile(resolve(outputDir, f), html, 'utf-8');
      const sz = Buffer.byteLength(html, 'utf-8');
      total += sz;
      console.log(`  ${f} (${(sz / 1024).toFixed(1)} KB)`);
    }
    console.log(`\n  ${Object.keys(rawPages).length} pages, ${(total / 1024).toFixed(1)} KB total`);
    console.log(`  Style: ${templateName} | Layout: multipage`);
    console.log(`\n  open ${resolve(outputDir, 'index.html')}`);
  }
}

// Export data extraction utilities for use in templates and tests
export {
  parseSections, parseExperience, parseEducation, parseSkills,
  parseProjects, groupByCompany, renderInlineMarkdown, esc,
  extractTemplateData,
};

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
