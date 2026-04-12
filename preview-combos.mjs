#!/usr/bin/env node

/**
 * preview-combos.mjs — Generate a preview matrix of all style x layout combinations
 *
 * Generates a single HTML page that iframes each combo for visual browsing.
 * Usage: node preview-combos.mjs [--generate] [--port=3847]
 *
 * --generate: Actually generate all combo HTML files into dist-preview/
 * Without --generate: Just builds the preview page pointing to pre-generated combos.
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { listStyles } from './styles/registry.mjs';
import { listLayouts } from './layouts/registry.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const shouldGenerate = process.argv.includes('--generate');

async function main() {
  const styles = await listStyles();
  const layouts = await listLayouts();

  console.log(`Styles: ${styles.length}`);
  console.log(`Layouts: ${layouts.length}`);
  console.log(`Total combos: ${styles.length * layouts.length}`);

  const previewDir = resolve(__dirname, 'dist-preview');
  await mkdir(previewDir, { recursive: true });

  if (shouldGenerate) {
    console.log('\nGenerating all combos...');
    let generated = 0;
    let errors = 0;
    for (const style of styles) {
      for (const layout of layouts) {
        const comboDir = resolve(previewDir, `${style}-${layout}`);
        try {
          execSync(`node generate-portfolio.mjs --style=${style} --layout=${layout} --output=${comboDir}`, {
            cwd: __dirname,
            timeout: 15000,
            stdio: 'pipe',
          });
          generated++;
          process.stdout.write('.');
        } catch (err) {
          errors++;
          console.error(`\n  ERROR: ${style} x ${layout}: ${err.message.split('\n')[0]}`);
        }
      }
    }
    console.log(`\n\nGenerated: ${generated}/${styles.length * layouts.length} (${errors} errors)`);
  }

  // Build preview HTML
  const comboCards = [];
  for (const style of styles) {
    for (const layout of layouts) {
      const path = `${style}-${layout}/index.html`;
      comboCards.push({ style, layout, path });
    }
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Portfolio Preview Matrix — ${styles.length} styles x ${layouts.length} layouts</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #0a0a0a; color: #ddd; padding: 24px; }
  h1 { font-size: 24px; font-weight: 700; margin-bottom: 4px; color: #fff; }
  .subtitle { font-size: 14px; color: #888; margin-bottom: 24px; }
  .filters { display: flex; gap: 12px; margin-bottom: 24px; flex-wrap: wrap; align-items: center; }
  .filters label { font-size: 13px; color: #aaa; }
  .filters select { background: #1a1a1a; color: #ddd; border: 1px solid #333; padding: 6px 12px; border-radius: 4px; font-size: 13px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); gap: 16px; }
  .card { background: #111; border: 1px solid #222; border-radius: 8px; overflow: hidden; transition: border-color 0.2s; }
  .card:hover { border-color: #444; }
  .card-header { padding: 10px 14px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; }
  .card-style { font-size: 13px; font-weight: 600; color: #e8c473; }
  .card-layout { font-size: 12px; color: #888; }
  .card-frame { width: 100%; height: 300px; border: none; background: #fff; }
  .card-actions { padding: 8px 14px; display: flex; gap: 8px; border-top: 1px solid #222; }
  .card-actions a { font-size: 12px; color: #888; text-decoration: none; padding: 4px 10px; border: 1px solid #333; border-radius: 4px; }
  .card-actions a:hover { color: #fff; border-color: #555; }
  .hidden { display: none !important; }
  .count { font-size: 13px; color: #666; margin-left: auto; }
</style>
</head>
<body>
<h1>Portfolio Preview Matrix</h1>
<p class="subtitle">${styles.length} styles x ${layouts.length} layouts = ${styles.length * layouts.length} combinations</p>

<div class="filters">
  <label>Style: <select id="style-filter">
    <option value="all">All styles (${styles.length})</option>
    ${styles.map(s => `<option value="${s}">${s}</option>`).join('\n    ')}
  </select></label>
  <label>Layout: <select id="layout-filter">
    <option value="all">All layouts (${layouts.length})</option>
    ${layouts.map(l => `<option value="${l}">${l}</option>`).join('\n    ')}
  </select></label>
  <span class="count" id="count">${comboCards.length} shown</span>
</div>

<div class="grid" id="grid">
${comboCards.map(c => `  <div class="card" data-style="${c.style}" data-layout="${c.layout}">
    <div class="card-header">
      <span class="card-style">${c.style}</span>
      <span class="card-layout">${c.layout}</span>
    </div>
    <iframe class="card-frame" loading="lazy" src="${c.path}"></iframe>
    <div class="card-actions">
      <a href="${c.path}" target="_blank">Open</a>
    </div>
  </div>`).join('\n')}
</div>

<script>
const styleFilter = document.getElementById('style-filter');
const layoutFilter = document.getElementById('layout-filter');
const grid = document.getElementById('grid');
const count = document.getElementById('count');
function filter() {
  const s = styleFilter.value;
  const l = layoutFilter.value;
  let shown = 0;
  for (const card of grid.children) {
    const matchStyle = s === 'all' || card.dataset.style === s;
    const matchLayout = l === 'all' || card.dataset.layout === l;
    if (matchStyle && matchLayout) { card.classList.remove('hidden'); shown++; }
    else { card.classList.add('hidden'); }
  }
  count.textContent = shown + ' shown';
}
styleFilter.addEventListener('change', filter);
layoutFilter.addEventListener('change', filter);
</script>
</body>
</html>`;

  await writeFile(resolve(previewDir, 'index.html'), html, 'utf-8');
  console.log(`\nPreview page: ${resolve(previewDir, 'index.html')}`);
  console.log(`\nTo generate all combos: node preview-combos.mjs --generate`);
  console.log(`Then open: open ${resolve(previewDir, 'index.html')}`);
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
