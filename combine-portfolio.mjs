#!/usr/bin/env node

/**
 * combine-portfolio.mjs — Style x Layout combinator for portfolio generation.
 *
 * Merges a style module (colors, typography, fonts) with a layout module
 * (page structure, HTML generation) to produce a complete portfolio site.
 *
 * Usage:
 *   node combine-portfolio.mjs --style=bare --layout=scroll
 *   node combine-portfolio.mjs --style=bare --layout=scroll --output=dist
 *   node combine-portfolio.mjs --list-styles
 *   node combine-portfolio.mjs --list-layouts
 *   node combine-portfolio.mjs --all          # every combination -> dist-combos/STYLE-LAYOUT/
 *
 * No external dependencies beyond js-yaml (already in package.json).
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
  const args = {
    style: null,
    layout: null,
    output: 'dist',
    listStyles: false,
    listLayouts: false,
    all: false,
    help: false,
    demo: false,
  };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--style=')) args.style = arg.split('=').slice(1).join('=').toLowerCase();
    else if (arg.startsWith('--layout=')) args.layout = arg.split('=').slice(1).join('=').toLowerCase();
    else if (arg.startsWith('--output=')) args.output = arg.split('=').slice(1).join('=');
    else if (arg === '--list-styles') args.listStyles = true;
    else if (arg === '--list-layouts') args.listLayouts = true;
    else if (arg === '--all') args.all = true;
    else if (arg === '--demo') args.demo = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

// ---------------------------------------------------------------------------
// File readers (copied from generate-portfolio.mjs)
// ---------------------------------------------------------------------------

async function readProfile(demo = false) {
  const path = demo
    ? resolve(__dirname, 'demo/demo-profile.yml')
    : resolve(__dirname, 'config/profile.yml');
  try {
    const raw = await readFile(path, 'utf-8');
    return yaml.load(raw);
  } catch {
    console.error(`ERROR: ${demo ? 'demo/demo-profile.yml' : 'config/profile.yml'} not found.${demo ? '' : ' Run onboarding first.'}`);
    process.exit(1);
  }
}

async function readCV(demo = false) {
  const path = demo
    ? resolve(__dirname, 'demo/demo-cv.md')
    : resolve(__dirname, 'cv.md');
  try {
    return await readFile(path, 'utf-8');
  } catch {
    console.error(`ERROR: ${demo ? 'demo/demo-cv.md' : 'cv.md'} not found.${demo ? '' : ' Run onboarding first.'}`);
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
// Compatibility matrix
// ---------------------------------------------------------------------------

let _blockedCombos = null;
async function loadBlockedCombos() {
  if (_blockedCombos) return _blockedCombos;
  try {
    const raw = await readFile(resolve(__dirname, 'compatibility.json'), 'utf-8');
    const data = JSON.parse(raw);
    _blockedCombos = (data.blocked || []).map(b => [b[0], b[1], b[2] || '']);
    return _blockedCombos;
  } catch {
    _blockedCombos = [];
    return _blockedCombos;
  }
}

function isBlocked(blocked, styleName, layoutName) {
  return blocked.find(b => b[0] === styleName && b[1] === layoutName);
}

// ---------------------------------------------------------------------------
// Page builder — wraps layout HTML in a full document with style
// ---------------------------------------------------------------------------

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort, ogImage }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  const ogImageTag = ogImage ? `<meta property="og:image" content="${esc(ogImage)}">` : '';
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
${ogImageTag}
${fontLinks}
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Generate one style x layout combination
// ---------------------------------------------------------------------------

async function generateCombo({ style, layout, data, outputDir }) {
  const styleCSS = style.css();
  const layoutCSS = layout.css();
  const fonts = style.fonts || [];
  const pages = layout.pages(data);

  await mkdir(outputDir, { recursive: true });
  let total = 0;
  const fileCount = Object.keys(pages).length;

  for (const [filename, body] of Object.entries(pages)) {
    // Determine page title from filename
    const pageName = filename.replace('.html', '');
    const pageTitle = pageName === 'index'
      ? data.name
      : `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} — ${data.name}`;

    const html = buildPage({
      title: pageTitle,
      styleCSS,
      layoutCSS,
      fonts,
      body,
      summaryShort: data.summaryShort,
    });

    await writeFile(resolve(outputDir, filename), html, 'utf-8');
    const sz = Buffer.byteLength(html, 'utf-8');
    total += sz;
    console.log(`    ${filename} (${(sz / 1024).toFixed(1)} KB)`);
  }

  return { fileCount, totalBytes: total };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);

  // --help
  if (args.help) {
    console.log(`Usage: node combine-portfolio.mjs [options]

Options:
  --style=NAME       Style module to use (from styles/)
  --layout=NAME      Layout module to use (from layouts/)
  --output=DIR       Output directory (default: dist)
  --list-styles      List available style modules
  --list-layouts     List available layout modules
  --all              Generate every style x layout combination into dist-combos/
  -h, --help         Show this help`);
    process.exit(0);
  }

  // --list-styles
  if (args.listStyles) {
    let styles;
    try {
      styles = await listStyles();
    } catch (err) {
      console.error(`ERROR loading styles: ${err.message}`);
      process.exit(1);
    }
    if (styles.length === 0) {
      console.log('No style modules found in styles/');
    } else {
      console.log('Available styles:');
      for (const s of styles) console.log(`  ${s}`);
    }
    process.exit(0);
  }

  // --list-layouts
  if (args.listLayouts) {
    let layouts;
    try {
      layouts = await listLayouts();
    } catch (err) {
      console.error(`ERROR loading layouts: ${err.message}`);
      process.exit(1);
    }
    if (layouts.length === 0) {
      console.log('No layout modules found in layouts/');
    } else {
      console.log('Available layouts:');
      for (const l of layouts) console.log(`  ${l}`);
    }
    process.exit(0);
  }

  // --demo mode: generate 3 showcase combos with demo data
  if (args.demo) {
    console.log('Combine Portfolio — DEMO MODE\n');
    const [profile, cvRaw] = await Promise.all([readProfile(true), readCV(true)]);
    const sections = parseSections(cvRaw);
    const data = extractTemplateData({ profile, sections, articleDigest: null });

    const demoCombos = [
      ['bare', 'multipage'],
      ['void', 'scroll'],
      ['press', 'cards'],
    ];
    const demosDir = resolve(__dirname, 'dist-demo');
    for (const [sName, lName] of demoCombos) {
      const style = await getStyle(sName);
      const layout = await getLayout(lName);
      const outDir = resolve(demosDir, `${sName}-${lName}`);
      console.log(`  [${sName} x ${lName}]`);
      const { fileCount, totalBytes } = await generateCombo({ style, layout, data, outputDir: outDir });
      console.log(`    ${fileCount} pages, ${(totalBytes / 1024).toFixed(1)} KB\n`);
    }
    console.log(`  3 demo combos generated in ${demosDir}/`);
    console.log(`\n  open ${resolve(demosDir, 'bare-multipage/index.html')}`);
    process.exit(0);
  }

  // Load candidate data
  console.log('Combine Portfolio (style x layout combinator)\n');
  const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
  const sections = parseSections(cvRaw);
  console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
  console.log(`  article-digest.md: ${articleDigest ? 'found' : 'not found (skipping)'}\n`);
  const data = extractTemplateData({ profile, sections, articleDigest });

  // --all: generate every combination
  if (args.all) {
    let styleNames, layoutNames;
    try {
      styleNames = await listStyles();
    } catch (err) {
      console.error(`ERROR loading styles: ${err.message}`);
      process.exit(1);
    }
    try {
      layoutNames = await listLayouts();
    } catch (err) {
      console.error(`ERROR loading layouts: ${err.message}`);
      process.exit(1);
    }

    if (styleNames.length === 0) {
      console.error('ERROR: No style modules found in styles/. Create at least one style .mjs file.');
      process.exit(1);
    }
    if (layoutNames.length === 0) {
      console.error('ERROR: No layout modules found in layouts/. Create at least one layout .mjs file.');
      process.exit(1);
    }

    const combosDir = resolve(__dirname, 'dist-combos');
    const blocked = await loadBlockedCombos();
    const maxCombos = styleNames.length * layoutNames.length;
    console.log(`  Generating up to ${maxCombos} combinations (${blocked.length} blocked)\n`);

    let totalCombos = 0;
    let skipped = 0;
    for (const sName of styleNames) {
      const style = await getStyle(sName);
      for (const lName of layoutNames) {
        const block = isBlocked(blocked, sName, lName);
        if (block) {
          skipped++;
          continue;
        }
        const layout = await getLayout(lName);
        const outDir = resolve(combosDir, `${sName}-${lName}`);
        console.log(`  [${sName} x ${lName}]`);
        const { fileCount, totalBytes } = await generateCombo({ style, layout, data, outputDir: outDir });
        console.log(`    ${fileCount} pages, ${(totalBytes / 1024).toFixed(1)} KB\n`);
        totalCombos++;
      }
    }

    console.log(`  ${totalCombos} combinations generated, ${skipped} blocked combos skipped`);
    console.log(`  Output: ${combosDir}/`);
    process.exit(0);
  }

  // Single combination: require both --style and --layout
  if (!args.style || !args.layout) {
    console.error('ERROR: Both --style and --layout are required.\n');
    console.error('Usage: node combine-portfolio.mjs --style=NAME --layout=NAME');
    console.error('       node combine-portfolio.mjs --list-styles');
    console.error('       node combine-portfolio.mjs --list-layouts');
    console.error('       node combine-portfolio.mjs --all');
    process.exit(1);
  }

  // Check compatibility
  const blocked = await loadBlockedCombos();
  const block = isBlocked(blocked, args.style, args.layout);
  if (block) {
    console.warn(`  WARNING: ${args.style} x ${args.layout} is a blocked combination.`);
    console.warn(`  Reason: ${block[2]}`);
    console.warn(`  Suggested alternatives: bare, ink, or volt with multipage or scroll\n`);
  }

  // Load style
  let style;
  try {
    style = await getStyle(args.style);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }

  // Load layout
  let layout;
  try {
    layout = await getLayout(args.layout);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }

  const outputDir = resolve(__dirname, args.output);
  console.log(`  Style: ${args.style}`);
  console.log(`  Layout: ${args.layout}`);
  console.log(`  Output: ${outputDir}/\n`);

  const { fileCount, totalBytes } = await generateCombo({ style, layout, data, outputDir });

  console.log(`\n  ${fileCount} pages, ${(totalBytes / 1024).toFixed(1)} KB total`);
  console.log(`  Style: ${args.style} | Layout: ${args.layout}`);
  console.log(`\n  open ${resolve(outputDir, 'index.html')}`);
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
