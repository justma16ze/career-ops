#!/usr/bin/env node

/**
 * serve-picker.mjs — Self-contained template picker gallery for speedrun-career-ops.
 *
 * Serves a single HTML gallery page showing 3 portfolio templates side-by-side
 * with "Pick this one" buttons. The selection is written to /tmp/speedrun-template-choice.txt
 * so the calling script can read it.
 *
 * Usage:
 *   node serve-picker.mjs ink-spread garden-multipage statement-multipage
 *
 * Serves on http://localhost:3849
 */

import { createServer } from 'http';
import { readFile, writeFile, stat } from 'fs/promises';
import { resolve, dirname, extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = 3849;
const CHOICE_FILE = '/tmp/speedrun-template-choice.txt';
const COMBOS_DIR = resolve(__dirname, 'dist-combos');

// ---------------------------------------------------------------------------
// Parse CLI arguments
// ---------------------------------------------------------------------------

const combos = process.argv.slice(2).filter(a => !a.startsWith('--'));
if (combos.length === 0) {
  console.error('Usage: node serve-picker.mjs COMBO1 COMBO2 COMBO3');
  console.error('Example: node serve-picker.mjs ink-spread garden-multipage statement-multipage');
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Derive descriptions from combo names
// ---------------------------------------------------------------------------

const STYLE_DESCRIPTIONS = {
  almanac: 'Vintage reference book aesthetic',
  bare: 'Clean and minimal, content-first',
  blush: 'Soft warm tones, gentle palette',
  caps: 'Bold uppercase headings, strong type',
  coral: 'Warm coral accent, modern feel',
  dusk: 'Dark muted tones, evening palette',
  ember: 'Warm ember glow, rich darks',
  folio: 'Portfolio-forward, showcase layout',
  garden: 'Digital garden, editorial warmth',
  gradient: 'Gradient accents, modern depth',
  grid: 'Grid-based structure, precise alignment',
  ink: 'Warm editorial, serif-led typography',
  lab: 'Technical and precise, lab notebook',
  patrol: 'Bold and structured, high contrast',
  press: 'Newspaper editorial, classic print',
  prose: 'Long-form reading, literary feel',
  statement: 'Serif statement, confident authority',
  tactical: 'Tactical and utilitarian, mission-ready',
  terminal: 'Monospace terminal, developer aesthetic',
  void: 'Dark void, high-contrast minimalism',
  volt: 'Electric accent, energetic and modern',
};

const LAYOUT_DESCRIPTIONS = {
  bands: 'Full-bleed alternating sections',
  cards: 'Card grid with bordered tiles',
  centered: 'Centered vertical scroll, no nav',
  multipage: 'Multiple pages with top nav',
  scroll: 'Single-page with sticky anchor nav',
  sidebar: 'Sticky left sidebar, scrolling content',
  'sidebar-right': 'Content left, sticky right sidebar',
  spread: 'Two-column magazine spread',
};

function getComboDescription(comboName) {
  // Parse style and layout from combo name (e.g., "ink-spread" -> style=ink, layout=spread)
  // Handle multi-word layout names like "sidebar-right"
  const knownLayouts = Object.keys(LAYOUT_DESCRIPTIONS).sort((a, b) => b.length - a.length);
  for (const layout of knownLayouts) {
    if (comboName.endsWith(`-${layout}`)) {
      const style = comboName.slice(0, comboName.length - layout.length - 1);
      const styleName = STYLE_DESCRIPTIONS[style] || style;
      const layoutName = LAYOUT_DESCRIPTIONS[layout] || layout;
      return { style, layout, styleDesc: styleName, layoutDesc: layoutName };
    }
  }
  return { style: comboName, layout: '', styleDesc: comboName, layoutDesc: '' };
}

// ---------------------------------------------------------------------------
// MIME types
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

// ---------------------------------------------------------------------------
// Gallery HTML
// ---------------------------------------------------------------------------

function buildGalleryHTML() {
  const cards = combos.map((combo, i) => {
    const info = getComboDescription(combo);
    return `
      <div class="template-card" id="card-${i}" data-combo="${combo}">
        <div class="card-header">
          <h2 class="card-title">${info.style} <span class="card-layout-tag">${info.layout}</span></h2>
          <p class="card-desc">${info.styleDesc}. ${info.layoutDesc}.</p>
        </div>
        <div class="card-frame">
          <iframe src="/preview/${combo}/index.html" loading="eager"></iframe>
        </div>
        <button class="pick-btn" onclick="pickTemplate('${combo}', ${i})">
          Pick this one
        </button>
      </div>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Pick your portfolio template</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background: #0f0f0f;
    color: #e0e0e0;
    min-height: 100vh;
  }

  /* Header */
  .top-bar {
    background: #161616;
    border-bottom: 1px solid #2a2a2a;
    padding: 20px 32px;
    text-align: center;
  }
  .top-bar h1 {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.3px;
  }
  .top-bar p {
    font-size: 14px;
    color: #888;
    margin-top: 4px;
  }

  /* Grid */
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    padding: 32px;
    max-width: 1600px;
    margin: 0 auto;
  }

  @media (max-width: 1100px) {
    .gallery { grid-template-columns: 1fr; max-width: 700px; }
  }

  /* Card */
  .template-card {
    background: #1a1a1a;
    border: 2px solid #2a2a2a;
    border-radius: 12px;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
    display: flex;
    flex-direction: column;
  }
  .template-card:hover {
    border-color: #444;
  }
  .template-card.selected {
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.25);
  }

  .card-header {
    padding: 16px 20px 12px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    text-transform: capitalize;
  }
  .card-layout-tag {
    font-weight: 400;
    font-size: 13px;
    color: #888;
    margin-left: 4px;
  }
  .card-desc {
    font-size: 13px;
    color: #777;
    margin-top: 4px;
    line-height: 1.4;
  }

  /* iframe container */
  .card-frame {
    height: 380px;
    overflow: hidden;
    background: #000;
    border-top: 1px solid #2a2a2a;
    border-bottom: 1px solid #2a2a2a;
    position: relative;
  }
  .card-frame iframe {
    border: none;
    transform-origin: 0 0;
    transform: scale(0.4);
    width: 250%;
    height: 950px;
    pointer-events: none;
  }

  /* Pick button */
  .pick-btn {
    display: block;
    width: calc(100% - 32px);
    margin: 16px auto;
    padding: 14px 0;
    background: #fff;
    color: #111;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s, transform 0.1s;
  }
  .pick-btn:hover {
    background: #e8e8e8;
    transform: translateY(-1px);
  }
  .pick-btn:active {
    transform: translateY(0);
  }
  .pick-btn.picked {
    background: #38bdf8;
    color: #000;
    cursor: default;
  }

  /* Success message */
  .success-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.75);
    backdrop-filter: blur(6px);
    justify-content: center;
    align-items: center;
  }
  .success-overlay.visible {
    display: flex;
  }
  .success-box {
    background: #1a1a1a;
    border: 1px solid #333;
    border-radius: 16px;
    padding: 40px 48px;
    text-align: center;
    max-width: 440px;
  }
  .success-box .check {
    font-size: 48px;
    margin-bottom: 16px;
  }
  .success-box h2 {
    font-size: 20px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
  }
  .success-box p {
    font-size: 15px;
    color: #999;
    line-height: 1.5;
  }
  .success-box .chosen-name {
    color: #38bdf8;
    font-weight: 600;
  }

  /* Show more */
  .footer {
    text-align: center;
    padding: 8px 32px 40px;
  }
  .more-btn {
    padding: 12px 32px;
    background: transparent;
    color: #888;
    border: 1px solid #333;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    transition: color 0.15s, border-color 0.15s;
  }
  .more-btn:hover {
    color: #fff;
    border-color: #666;
  }
</style>
</head>
<body>

<div class="top-bar">
  <h1>Pick your portfolio template</h1>
  <p>Click a template to preview it, then hit "Pick this one" to lock it in.</p>
</div>

<div class="gallery">
${cards}
</div>

<div class="footer">
  <button class="more-btn" onclick="showMore()">Show me more options</button>
</div>

<div class="success-overlay" id="success">
  <div class="success-box">
    <div class="check">&#10003;</div>
    <h2>Great choice!</h2>
    <p>You picked <span class="chosen-name" id="chosen-name"></span>.</p>
    <p style="margin-top: 12px;">Go back to your terminal.</p>
  </div>
</div>

<script>
  let picked = false;

  // Allow clicking iframe area to open full preview
  document.querySelectorAll('.card-frame').forEach(frame => {
    frame.style.cursor = 'pointer';
    frame.addEventListener('click', () => {
      const card = frame.closest('.template-card');
      const combo = card.dataset.combo;
      window.open('/preview/' + combo + '/index.html', '_blank');
    });
  });

  async function pickTemplate(combo, index) {
    if (picked) return;
    picked = true;

    // Highlight the selected card
    document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
    document.getElementById('card-' + index).classList.add('selected');

    // Update button
    document.querySelectorAll('.pick-btn').forEach(btn => {
      btn.classList.remove('picked');
      btn.textContent = 'Pick this one';
    });
    const btn = document.getElementById('card-' + index).querySelector('.pick-btn');
    btn.classList.add('picked');
    btn.textContent = 'Selected';

    // POST to server
    try {
      await fetch('/api/pick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo }),
      });
    } catch (e) {
      console.error('Failed to write selection:', e);
    }

    // Show success overlay
    document.getElementById('chosen-name').textContent = combo;
    document.getElementById('success').classList.add('visible');
  }

  async function showMore() {
    try {
      await fetch('/api/pick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo: 'more' }),
      });
    } catch (e) {
      console.error('Failed to write selection:', e);
    }
    // Show brief feedback
    const btn = document.querySelector('.more-btn');
    btn.textContent = 'Loading more options...';
    btn.style.color = '#38bdf8';
    btn.style.borderColor = '#38bdf8';
    setTimeout(() => {
      document.getElementById('chosen-name').textContent = 'more options';
      document.querySelector('.success-box h2').textContent = 'Got it!';
      document.querySelector('.success-box p:last-child').textContent = 'Go back to your terminal for more choices.';
      document.getElementById('success').classList.add('visible');
    }, 300);
  }
</script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// HTTP Server
// ---------------------------------------------------------------------------

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);

  // POST /api/pick — write the user's selection
  if (req.method === 'POST' && url.pathname === '/api/pick') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { combo } = JSON.parse(body);
      await writeFile(CHOICE_FILE, combo, 'utf-8');
      console.log(`  Selection written: ${combo}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }

  // GET / — gallery page
  if (url.pathname === '/' || url.pathname === '/index.html') {
    const html = buildGalleryHTML();
    res.writeHead(200, {
      'Content-Type': 'text/html',
      'Cache-Control': 'no-cache',
    });
    res.end(html);
    return;
  }

  // GET /preview/COMBO-NAME/... — serve combo static files
  if (url.pathname.startsWith('/preview/')) {
    const parts = url.pathname.replace('/preview/', '').split('/');
    const comboName = parts[0];
    const filePath = parts.slice(1).join('/') || 'index.html';
    const fullPath = resolve(COMBOS_DIR, comboName, filePath);

    // Security: ensure we don't escape the combos dir
    if (!fullPath.startsWith(COMBOS_DIR)) {
      res.writeHead(403);
      res.end('Forbidden');
      return;
    }

    try {
      const data = await readFile(fullPath);
      const ext = extname(fullPath).toLowerCase();
      const contentType = MIME[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Not found');
    }
    return;
  }

  // Fallback: 404
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`\n  Template picker gallery running at:\n`);
  console.log(`    http://localhost:${PORT}\n`);
  console.log(`  Showing ${combos.length} templates: ${combos.join(', ')}`);
  console.log(`  Selection will be written to ${CHOICE_FILE}\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
