#!/usr/bin/env node

/**
 * serve-picker.mjs — Premium template picker gallery for speedrun-career-ops.
 *
 * On startup, takes Playwright screenshots of each combo template at full width,
 * then serves a Squarespace-quality horizontal carousel gallery.
 *
 * Usage:
 *   node serve-picker.mjs ink-spread void-scroll coral-multipage
 *
 * Serves on http://localhost:3849
 */

import { createServer } from 'http';
import { readFile, writeFile, stat } from 'fs/promises';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';

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
  console.error('Example: node serve-picker.mjs ink-spread void-scroll coral-multipage');
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
  centered: 'Centered vertical scroll',
  multipage: 'Multiple pages with navigation',
  scroll: 'Single-page smooth scroll',
  sidebar: 'Sticky left sidebar',
  'sidebar-right': 'Content left, right sidebar',
  spread: 'Two-column magazine spread',
};

// Accent colors per style for the "Use this template" button
const STYLE_ACCENTS = {
  almanac: '#8B7355',
  bare: '#333333',
  blush: '#D4918F',
  caps: '#222222',
  coral: '#FF6B6B',
  dusk: '#7C6E8A',
  ember: '#D4713B',
  folio: '#2D5A27',
  garden: '#5B8C51',
  gradient: '#6366F1',
  grid: '#0066CC',
  ink: '#8B4513',
  lab: '#2563EB',
  patrol: '#DC2626',
  press: '#1A1A1A',
  prose: '#4A5568',
  statement: '#1B1B1B',
  tactical: '#4B5320',
  terminal: '#00FF41',
  void: '#E0E0E0',
  volt: '#FACC15',
};

function getComboDescription(comboName) {
  const knownLayouts = Object.keys(LAYOUT_DESCRIPTIONS).sort((a, b) => b.length - a.length);
  for (const layout of knownLayouts) {
    if (comboName.endsWith(`-${layout}`)) {
      const style = comboName.slice(0, comboName.length - layout.length - 1);
      const styleName = STYLE_DESCRIPTIONS[style] || style;
      const layoutName = LAYOUT_DESCRIPTIONS[layout] || layout;
      const accent = STYLE_ACCENTS[style] || '#FFFFFF';
      return { style, layout, styleDesc: styleName, layoutDesc: layoutName, accent };
    }
  }
  return { style: comboName, layout: '', styleDesc: comboName, layoutDesc: '', accent: '#FFFFFF' };
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
// Screenshot generation with Playwright
// ---------------------------------------------------------------------------

async function captureScreenshots() {
  console.log('  Capturing template screenshots...\n');
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();

  for (const combo of combos) {
    const htmlPath = resolve(COMBOS_DIR, combo, 'index.html');
    if (!existsSync(htmlPath)) {
      console.error(`    WARNING: ${htmlPath} not found, skipping screenshot`);
      continue;
    }

    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);

    const screenshotPath = `/tmp/picker-${combo}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await page.close();
    console.log(`    ${combo} -> ${screenshotPath}`);
  }

  await browser.close();
  console.log('\n  Screenshots captured.\n');
}

// ---------------------------------------------------------------------------
// Gallery HTML — Premium carousel design
// ---------------------------------------------------------------------------

function buildGalleryHTML() {
  const templateData = combos.map((combo, i) => {
    const info = getComboDescription(combo);
    return { combo, index: i, ...info };
  });

  // Build template data as JSON for JS consumption
  const templateJSON = JSON.stringify(templateData.map(t => ({
    combo: t.combo,
    style: t.style,
    layout: t.layout,
    styleDesc: t.styleDesc,
    layoutDesc: t.layoutDesc,
    accent: t.accent,
  })));

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Choose your template</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  html, body {
    height: 100%;
    overflow: hidden;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #111;
    color: #e0e0e0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* ---- Top header ---- */
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    padding: 24px 40px 20px;
    background: linear-gradient(to bottom, #111 60%, transparent);
    pointer-events: none;
    text-align: center;
  }
  .header h1 {
    font-size: 15px;
    font-weight: 500;
    color: #888;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    pointer-events: auto;
  }

  /* ---- Carousel wrapper ---- */
  .carousel-viewport {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: transform;
  }

  .carousel-slide {
    flex: 0 0 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px 120px;
    height: 100vh;
  }

  /* ---- Browser frame mockup ---- */
  .browser-frame {
    width: min(80vw, 960px);
    height: calc(100vh - 280px);
    background: #1a1a1a;
    border-radius: 12px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.06),
      0 20px 60px rgba(0,0,0,0.5),
      0 8px 24px rgba(0,0,0,0.3);
    display: flex;
    flex-direction: column;
    transition: box-shadow 0.3s ease;
  }
  .browser-frame:hover {
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.1),
      0 24px 80px rgba(0,0,0,0.6),
      0 12px 32px rgba(0,0,0,0.4);
  }

  /* Browser chrome / address bar */
  .browser-chrome {
    flex: 0 0 auto;
    height: 40px;
    background: #252525;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 8px;
  }
  .browser-dots {
    display: flex;
    gap: 6px;
  }
  .browser-dots span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #333;
  }
  .browser-dots span:nth-child(1) { background: #ff5f57; }
  .browser-dots span:nth-child(2) { background: #febc2e; }
  .browser-dots span:nth-child(3) { background: #28c840; }

  .browser-url {
    flex: 1;
    height: 26px;
    background: #1a1a1a;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding: 0 12px;
    font-size: 12px;
    color: #666;
    font-family: 'Inter', monospace;
    letter-spacing: 0.01em;
  }
  .browser-url .lock {
    color: #28c840;
    margin-right: 6px;
    font-size: 10px;
  }

  /* Screenshot container — scrollable */
  .screenshot-container {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff;
    scroll-behavior: smooth;
  }
  .screenshot-container::-webkit-scrollbar {
    width: 6px;
  }
  .screenshot-container::-webkit-scrollbar-track {
    background: transparent;
  }
  .screenshot-container::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,0.2);
    border-radius: 3px;
  }
  .screenshot-container::-webkit-scrollbar-thumb:hover {
    background: rgba(0,0,0,0.35);
  }

  .screenshot-container img {
    display: block;
    width: 100%;
    height: auto;
  }

  /* ---- Template info below frame ---- */
  .template-info {
    margin-top: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .template-name {
    font-size: 20px;
    font-weight: 600;
    color: #fff;
    text-transform: capitalize;
    letter-spacing: -0.01em;
  }
  .template-desc {
    font-size: 14px;
    color: #777;
    font-weight: 400;
    max-width: 400px;
    line-height: 1.5;
  }

  /* Use this template button */
  .use-btn {
    margin-top: 4px;
    padding: 12px 32px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
    letter-spacing: -0.01em;
  }
  .use-btn:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
  }
  .use-btn:active {
    transform: translateY(0);
  }

  /* ---- Navigation arrows ---- */
  .nav-arrow {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    z-index: 40;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.12);
    background: rgba(30,30,30,0.8);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    color: #ccc;
    font-size: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, border-color 0.2s, color 0.2s, opacity 0.2s;
  }
  .nav-arrow:hover {
    background: rgba(50,50,50,0.9);
    border-color: rgba(255,255,255,0.2);
    color: #fff;
  }
  .nav-arrow.disabled {
    opacity: 0.2;
    pointer-events: none;
  }
  .nav-arrow.left { left: 24px; }
  .nav-arrow.right { right: 24px; }

  .nav-arrow svg {
    width: 20px;
    height: 20px;
    stroke: currentColor;
    fill: none;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* ---- Dot indicators ---- */
  .dots {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    z-index: 40;
  }
  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    cursor: pointer;
    transition: background 0.3s, transform 0.3s;
  }
  .dot.active {
    background: #fff;
    transform: scale(1.25);
  }
  .dot:hover:not(.active) {
    background: rgba(255,255,255,0.4);
  }

  /* ---- "See all templates" link ---- */
  .see-all {
    position: fixed;
    bottom: 62px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 40;
    font-size: 13px;
    color: #555;
    text-decoration: none;
    cursor: pointer;
    border: none;
    background: none;
    font-family: 'Inter', sans-serif;
    transition: color 0.2s;
    letter-spacing: 0.02em;
  }
  .see-all:hover {
    color: #999;
  }

  /* ---- Success overlay ---- */
  .success-overlay {
    display: none;
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    justify-content: center;
    align-items: center;
  }
  .success-overlay.visible {
    display: flex;
  }

  .success-card {
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 48px 56px;
    text-align: center;
    max-width: 420px;
    box-shadow: 0 24px 80px rgba(0,0,0,0.6);
  }

  /* Checkmark animation */
  .check-circle {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #22c55e;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 24px;
    animation: scaleIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    opacity: 0;
  }
  @keyframes scaleIn {
    0% { transform: scale(0); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  .check-circle svg {
    width: 28px;
    height: 28px;
    stroke: #fff;
    fill: none;
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 40;
    stroke-dashoffset: 40;
    animation: drawCheck 0.4s 0.3s ease-out forwards;
  }
  @keyframes drawCheck {
    to { stroke-dashoffset: 0; }
  }

  .success-card h2 {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }
  .success-card p {
    font-size: 15px;
    color: #777;
    line-height: 1.6;
  }
  .success-card .chosen {
    color: #fff;
    font-weight: 600;
  }

  /* ---- Loading state ---- */
  .loading-overlay {
    position: fixed;
    inset: 0;
    z-index: 300;
    background: #111;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: opacity 0.5s ease;
  }
  .loading-overlay.hidden {
    opacity: 0;
    pointer-events: none;
  }
  .loading-spinner {
    width: 32px;
    height: 32px;
    border: 2px solid rgba(255,255,255,0.1);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  .loading-text {
    margin-top: 16px;
    font-size: 14px;
    color: #666;
    font-weight: 400;
  }

  /* ---- Responsive ---- */
  @media (max-width: 768px) {
    .browser-frame {
      width: 95vw;
    }
    .carousel-slide {
      padding: 70px 12px 120px;
    }
    .nav-arrow { display: none; }
    .template-name { font-size: 18px; }
  }
</style>
</head>
<body>

<div class="loading-overlay" id="loading">
  <div class="loading-spinner"></div>
  <div class="loading-text">Preparing previews...</div>
</div>

<div class="header">
  <h1>Choose your template</h1>
</div>

<!-- Nav arrows -->
<button class="nav-arrow left disabled" id="arrow-left" aria-label="Previous template">
  <svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>
</button>
<button class="nav-arrow right" id="arrow-right" aria-label="Next template">
  <svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"></polyline></svg>
</button>

<!-- Carousel -->
<div class="carousel-viewport">
  <div class="carousel-track" id="track">
    ${templateData.map((t, i) => {
      // Determine button style: light text on dark accent, or dark text on light accent
      const accent = t.accent;
      const isLightAccent = ['#FACC15', '#E0E0E0', '#28c840', '#00FF41'].includes(accent);
      const btnColor = isLightAccent ? '#111' : '#fff';
      return `
    <div class="carousel-slide" data-index="${i}">
      <div class="browser-frame">
        <div class="browser-chrome">
          <div class="browser-dots"><span></span><span></span><span></span></div>
          <div class="browser-url">
            <span class="lock">&#x1f512;</span>
            yourname.dev &mdash; ${t.style} ${t.layout}
          </div>
        </div>
        <div class="screenshot-container" id="sc-${i}">
          <img src="/screenshots/${t.combo}.png" alt="${t.combo} template preview" loading="eager">
        </div>
      </div>
      <div class="template-info">
        <div class="template-name">${t.style} ${t.layout}</div>
        <div class="template-desc">${t.styleDesc}. ${t.layoutDesc}.</div>
        <button class="use-btn"
                style="background: ${accent}; color: ${btnColor};"
                onclick="pickTemplate('${t.combo}')">
          Use this template
        </button>
      </div>
    </div>`;
    }).join('')}
  </div>
</div>

<!-- Dots -->
<button class="see-all" id="see-all" onclick="showMore()">See all templates</button>
<div class="dots" id="dots">
  ${templateData.map((_, i) => `<div class="dot${i === 0 ? ' active' : ''}" data-index="${i}" onclick="goTo(${i})"></div>`).join('')}
</div>

<!-- Success overlay -->
<div class="success-overlay" id="success">
  <div class="success-card">
    <div class="check-circle">
      <svg viewBox="0 0 24 24"><polyline points="6 12 10 16 18 8"></polyline></svg>
    </div>
    <h2>Great choice!</h2>
    <p>Head back to your terminal.</p>
  </div>
</div>

<script>
  const templates = ${templateJSON};
  const total = templates.length;
  let current = 0;
  let picked = false;

  const track = document.getElementById('track');
  const arrowL = document.getElementById('arrow-left');
  const arrowR = document.getElementById('arrow-right');
  const dots = document.querySelectorAll('.dot');

  function updateCarousel() {
    track.style.transform = 'translateX(' + (-current * 100) + 'vw)';
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
    arrowL.classList.toggle('disabled', current === 0);
    arrowR.classList.toggle('disabled', current === total - 1);
  }

  function goTo(index) {
    if (index < 0 || index >= total) return;
    current = index;
    updateCarousel();
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  arrowL.addEventListener('click', prev);
  arrowR.addEventListener('click', next);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (picked) return;
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'Enter') pickTemplate(templates[current].combo);
  });

  // Touch/swipe support
  let touchStartX = 0;
  let touchStartY = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 60) {
      if (dx < 0) next(); else prev();
    }
  }, { passive: true });

  async function pickTemplate(combo) {
    if (picked) return;
    picked = true;
    try {
      await fetch('/api/pick', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ combo }),
      });
    } catch (e) {
      console.error('Failed to write selection:', e);
    }
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
    const card = document.querySelector('.success-card');
    card.querySelector('h2').textContent = 'Got it!';
    card.querySelector('p').textContent = 'Head back to your terminal for more options.';
    document.getElementById('success').classList.add('visible');
  }

  // Hide loading overlay after images load
  const imgs = document.querySelectorAll('.screenshot-container img');
  let loaded = 0;
  function checkAllLoaded() {
    loaded++;
    if (loaded >= imgs.length) {
      setTimeout(() => {
        document.getElementById('loading').classList.add('hidden');
      }, 200);
    }
  }
  imgs.forEach(img => {
    if (img.complete) checkAllLoaded();
    else {
      img.addEventListener('load', checkAllLoaded);
      img.addEventListener('error', checkAllLoaded);
    }
  });
  // Fallback: hide loading after 3s no matter what
  setTimeout(() => {
    document.getElementById('loading').classList.add('hidden');
  }, 3000);
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

  // GET /screenshots/COMBO.png — serve captured screenshots
  if (url.pathname.startsWith('/screenshots/')) {
    const filename = url.pathname.replace('/screenshots/', '');
    const screenshotPath = `/tmp/picker-${filename}`;
    try {
      const data = await readFile(screenshotPath);
      res.writeHead(200, {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end('Screenshot not found');
    }
    return;
  }

  // GET /preview/COMBO-NAME/... — serve combo static files (for full preview links)
  if (url.pathname.startsWith('/preview/')) {
    const parts = url.pathname.replace('/preview/', '').split('/');
    const comboName = parts[0];
    const filePath = parts.slice(1).join('/') || 'index.html';
    const fullPath = resolve(COMBOS_DIR, comboName, filePath);

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

// ---------------------------------------------------------------------------
// Startup: capture screenshots then serve
// ---------------------------------------------------------------------------

async function main() {
  await captureScreenshots();

  server.listen(PORT, () => {
    console.log(`\n  Template picker gallery running at:\n`);
    console.log(`    http://localhost:${PORT}\n`);
    console.log(`  Showing ${combos.length} templates: ${combos.join(', ')}`);
    console.log(`  Selection will be written to ${CHOICE_FILE}\n`);
    console.log(`  Press Ctrl+C to stop.\n`);
  });
}

main().catch(e => {
  console.error('Failed to start picker:', e.message);
  process.exit(1);
});
