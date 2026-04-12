#!/usr/bin/env node

/**
 * serve-picker.mjs — Premium template picker for speedrun-career-ops.
 *
 * On startup:
 *   1. Takes Playwright full-page screenshots of each combo at 1280px wide
 *   2. Serves a Squarespace-quality horizontal carousel gallery at localhost:3849
 *
 * Usage:
 *   node serve-picker.mjs ink-spread void-scroll coral-multipage
 *
 * The user picks a template; selection is written to /tmp/speedrun-template-choice.txt.
 */

import { createServer } from 'http';
import { readFile, writeFile } from 'fs/promises';
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
// Style + Layout metadata
// ---------------------------------------------------------------------------

const STYLE_META = {
  almanac: { desc: 'Vintage reference book aesthetic', accent: '#A08060' },
  bare:    { desc: 'Clean and minimal, content-first', accent: '#fff' },
  blush:   { desc: 'Soft warm tones, gentle palette', accent: '#D4918F' },
  caps:    { desc: 'Bold uppercase headings, strong type', accent: '#fff' },
  coral:   { desc: 'Warm coral accent, modern feel', accent: '#FF6B6B' },
  dusk:    { desc: 'Dark muted tones, evening palette', accent: '#9B8AAE' },
  ember:   { desc: 'Warm ember glow, rich darks', accent: '#E07D42' },
  folio:   { desc: 'Portfolio-forward, showcase layout', accent: '#3D7A37' },
  garden:  { desc: 'Digital garden, editorial warmth', accent: '#6BA85B' },
  gradient:{ desc: 'Gradient accents, modern depth', accent: '#818CF8' },
  grid:    { desc: 'Grid-based structure, precise alignment', accent: '#3B8BEB' },
  ink:     { desc: 'Warm editorial, serif-led typography', accent: '#B5714D' },
  lab:     { desc: 'Technical and precise, lab notebook', accent: '#5B8DEF' },
  patrol:  { desc: 'Bold and structured, high contrast', accent: '#EF4444' },
  press:   { desc: 'Newspaper editorial, classic print', accent: '#fff' },
  prose:   { desc: 'Long-form reading, literary feel', accent: '#7B8BA0' },
  statement:{ desc: 'Serif statement, confident authority', accent: '#fff' },
  tactical:{ desc: 'Tactical and utilitarian, mission-ready', accent: '#6B7B30' },
  terminal:{ desc: 'Monospace terminal, developer aesthetic', accent: '#22D953' },
  void:    { desc: 'Dark void, high-contrast minimalism', accent: '#fff' },
  volt:    { desc: 'Electric accent, energetic and modern', accent: '#FACC15' },
};

const LAYOUT_META = {
  bands: 'Full-bleed alternating sections',
  cards: 'Card grid with bordered tiles',
  centered: 'Centered vertical scroll',
  multipage: 'Multiple pages with navigation',
  scroll: 'Single-page smooth scroll',
  sidebar: 'Sticky left sidebar',
  'sidebar-right': 'Content left, right sidebar',
  spread: 'Two-column magazine spread',
};

const KNOWN_LAYOUTS = Object.keys(LAYOUT_META).sort((a, b) => b.length - a.length);

function parseCombo(name) {
  for (const layout of KNOWN_LAYOUTS) {
    if (name.endsWith(`-${layout}`)) {
      const style = name.slice(0, name.length - layout.length - 1);
      const meta = STYLE_META[style] || { desc: style, accent: '#fff' };
      const layoutDesc = LAYOUT_META[layout] || layout;
      const isLight = ['#fff', '#FACC15', '#22D953'].includes(meta.accent);
      return {
        style, layout,
        styleDesc: meta.desc,
        layoutDesc,
        accent: meta.accent,
        btnTextColor: isLight ? '#111' : '#fff',
      };
    }
  }
  return { style: name, layout: '', styleDesc: name, layoutDesc: '', accent: '#fff', btnTextColor: '#111' };
}

// ---------------------------------------------------------------------------
// MIME types
// ---------------------------------------------------------------------------

const MIME = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.mjs': 'application/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.gif': 'image/gif', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
};

// ---------------------------------------------------------------------------
// Screenshot capture via Playwright
// ---------------------------------------------------------------------------

async function captureScreenshots() {
  console.log('  Capturing template screenshots...\n');
  const { chromium } = await import('playwright');
  const browser = await chromium.launch();

  for (const combo of combos) {
    const htmlPath = resolve(COMBOS_DIR, combo, 'index.html');
    if (!existsSync(htmlPath)) {
      console.error(`    WARNING: ${htmlPath} not found, skipping`);
      continue;
    }
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    const out = `/tmp/picker-${combo}.png`;
    await page.screenshot({ path: out, fullPage: true });
    await page.close();
    console.log(`    ${combo} -> ${out}`);
  }

  await browser.close();
  console.log('\n  Screenshots ready.\n');
}

// ---------------------------------------------------------------------------
// Gallery HTML
// ---------------------------------------------------------------------------

function buildGalleryHTML() {
  const templates = combos.map((combo, i) => ({ combo, index: i, ...parseCombo(combo) }));
  const dataJSON = JSON.stringify(templates.map(t => ({
    combo: t.combo, style: t.style, layout: t.layout,
  })));

  const slides = templates.map((t) => `
    <div class="slide">
      <div class="browser-frame">
        <div class="chrome">
          <div class="traffic"><span></span><span></span><span></span></div>
          <div class="url-bar">
            <svg class="lock" viewBox="0 0 12 14" fill="currentColor"><path d="M10 5V4a4 4 0 00-8 0v1a2 2 0 00-2 2v5a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2zM4 4a2 2 0 014 0v1H4V4z"/></svg>
            yourname.dev
          </div>
          <div class="chrome-spacer"></div>
        </div>
        <div class="preview-scroll">
          <img src="/screenshots/${t.combo}.png" alt="${t.combo} template preview" />
        </div>
      </div>
      <div class="info">
        <h2 class="tname">${t.style} <span class="ltag">${t.layout}</span></h2>
        <p class="tdesc">${t.styleDesc}. ${t.layoutDesc}.</p>
        <button class="use-btn" style="background:${t.accent};color:${t.btnTextColor};" onclick="pick('${t.combo}')">Use this template</button>
      </div>
    </div>`).join('');

  const dotHTML = templates.map((_, i) =>
    `<button class="dot${i === 0 ? ' active' : ''}" onclick="go(${i})"></button>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Choose your template</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
html,body{height:100%;overflow:hidden;font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#0e0e0e;color:#e0e0e0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
.hdr{position:fixed;top:0;left:0;right:0;z-index:50;padding:18px 40px 14px;background:linear-gradient(to bottom,#0e0e0e 70%,transparent);text-align:center;pointer-events:none}
.hdr h1{font-size:12px;font-weight:600;color:#555;letter-spacing:.14em;text-transform:uppercase}
.vp{position:fixed;inset:0;overflow:hidden}
.track{display:flex;height:100%;transition:transform .5s cubic-bezier(.4,0,.2,1);will-change:transform}
.slide{flex:0 0 100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 40px 100px}
.browser-frame{width:min(76vw,900px);height:calc(100vh - 290px);min-height:300px;background:#1a1a1a;border-radius:12px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 0 0 1px rgba(255,255,255,.05),0 20px 60px rgba(0,0,0,.55),0 8px 24px rgba(0,0,0,.3);transition:box-shadow .3s ease}
.browser-frame:hover{box-shadow:0 0 0 1px rgba(255,255,255,.08),0 28px 80px rgba(0,0,0,.6),0 12px 32px rgba(0,0,0,.4)}
.chrome{flex:0 0 auto;height:44px;background:#232323;border-bottom:1px solid rgba(255,255,255,.04);display:flex;align-items:center;padding:0 16px;gap:12px}
.traffic{display:flex;gap:7px;flex-shrink:0}
.traffic span{width:11px;height:11px;border-radius:50%}
.traffic span:nth-child(1){background:#ff5f57}
.traffic span:nth-child(2){background:#febc2e}
.traffic span:nth-child(3){background:#28c840}
.url-bar{flex:1;max-width:420px;margin:0 auto;height:28px;background:#1a1a1a;border-radius:7px;display:flex;align-items:center;justify-content:center;padding:0 14px;font-size:12px;color:#4a4a4a;font-family:'Inter',sans-serif}
.lock{width:10px;height:10px;margin-right:6px;opacity:.45}
.chrome-spacer{width:52px;flex-shrink:0}
.preview-scroll{flex:1;overflow-y:auto;overflow-x:hidden;background:#fff;scroll-behavior:smooth}
.preview-scroll::-webkit-scrollbar{width:5px}
.preview-scroll::-webkit-scrollbar-track{background:transparent}
.preview-scroll::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:3px}
.preview-scroll::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.3)}
.preview-scroll img{display:block;width:100%;height:auto}
.info{margin-top:18px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:6px}
.tname{font-size:22px;font-weight:700;color:#fff;text-transform:capitalize;letter-spacing:-.02em}
.ltag{font-weight:400;font-size:16px;color:#666;margin-left:2px}
.tdesc{font-size:13px;color:#555;max-width:420px;line-height:1.5}
.use-btn{margin-top:10px;padding:13px 38px;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;letter-spacing:-.01em;transition:transform .15s ease,box-shadow .15s ease,filter .15s ease}
.use-btn:hover{transform:translateY(-1px);box-shadow:0 6px 24px rgba(0,0,0,.35);filter:brightness(1.1)}
.use-btn:active{transform:translateY(0)}
.arr{position:fixed;top:50%;z-index:40;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;border:1px solid rgba(255,255,255,.1);background:rgba(20,20,20,.85);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);color:#aaa;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .25s ease}
.arr:hover{background:rgba(55,55,55,.95);border-color:rgba(255,255,255,.25);color:#fff;transform:translateY(-50%) scale(1.06)}
.arr.off{opacity:.12;pointer-events:none}
.arr.left{left:20px}
.arr.right{right:20px}
.arr svg{width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}
.bbar{position:fixed;bottom:0;left:0;right:0;z-index:40;text-align:center;padding:0 0 24px;background:linear-gradient(to top,#0e0e0e 40%,transparent);pointer-events:none}
.see-all-link{pointer-events:auto;display:inline-block;margin-bottom:12px;font-size:12px;color:#3a3a3a;background:none;border:none;cursor:pointer;font-family:'Inter',sans-serif;letter-spacing:.04em;transition:color .2s}
.see-all-link:hover{color:#888;text-decoration:underline;text-underline-offset:3px}
.pager{display:flex;align-items:center;justify-content:center;gap:10px;pointer-events:auto}
.dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.15);border:none;cursor:pointer;padding:0;transition:background .3s,transform .3s}
.dot.active{background:#fff;transform:scale(1.3)}
.dot:hover:not(.active){background:rgba(255,255,255,.35)}
.ctr{font-size:11px;color:#444;margin-left:12px;font-variant-numeric:tabular-nums;letter-spacing:.02em}
.sov{display:none;position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.75);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);justify-content:center;align-items:center}
.sov.vis{display:flex}
.scard{background:#1a1a1a;border:1px solid rgba(255,255,255,.07);border-radius:20px;padding:52px 60px;text-align:center;max-width:420px;box-shadow:0 24px 80px rgba(0,0,0,.6)}
.chk{width:64px;height:64px;border-radius:50%;background:#22c55e;display:flex;align-items:center;justify-content:center;margin:0 auto 24px;animation:popIn .4s cubic-bezier(.34,1.56,.64,1) forwards;opacity:0}
@keyframes popIn{0%{transform:scale(0);opacity:0}100%{transform:scale(1);opacity:1}}
.chk svg{width:28px;height:28px;stroke:#fff;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:40;stroke-dashoffset:40;animation:drawChk .4s .3s ease-out forwards}
@keyframes drawChk{to{stroke-dashoffset:0}}
.scard h2{font-size:22px;font-weight:700;color:#fff;margin-bottom:8px;letter-spacing:-.02em}
.scard p{font-size:15px;color:#666;line-height:1.6}
.ld{position:fixed;inset:0;z-index:300;background:#0e0e0e;display:flex;flex-direction:column;align-items:center;justify-content:center;transition:opacity .6s ease}
.ld.gone{opacity:0;pointer-events:none}
.ldsp{width:28px;height:28px;border:2px solid rgba(255,255,255,.07);border-top-color:rgba(255,255,255,.5);border-radius:50%;animation:spin .7s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
.ldtx{margin-top:16px;font-size:13px;color:#444;letter-spacing:.02em}
.vp,.hdr,.arr,.bbar{opacity:0;transition:opacity .45s ease}
.vp.show,.hdr.show,.arr.show,.bbar.show{opacity:1}
.arr.show.off{opacity:.12}
@media(max-width:768px){.browser-frame{width:95vw}.slide{padding:52px 10px 100px}.arr{display:none}.tname{font-size:18px}}
</style>
</head><body>
<div class="ld" id="ld"><div class="ldsp"></div><div class="ldtx">Preparing previews</div></div>
<div class="hdr" id="hdr"><h1>Choose your template</h1></div>
<button class="arr left off" id="al" aria-label="Previous"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
<button class="arr right" id="ar" aria-label="Next"><svg viewBox="0 0 24 24"><polyline points="9 6 15 12 9 18"></polyline></svg></button>
<div class="vp" id="vp"><div class="track" id="trk">${slides}</div></div>
<div class="bbar" id="bb">
  <button class="see-all-link" onclick="seeAll()">See all templates</button>
  <div class="pager">${dotHTML}<span class="ctr" id="ctr">1 / ${templates.length}</span></div>
</div>
<div class="sov" id="sov"><div class="scard"><div class="chk"><svg viewBox="0 0 24 24"><polyline points="6 12 10 16 18 8"></polyline></svg></div><h2 id="sh">Great choice!</h2><p id="sm">Head back to your terminal.</p></div></div>
<script>
(function(){var T=${dataJSON};var N=T.length;var cur=0,picked=false;var trk=document.getElementById('trk');var al=document.getElementById('al');var ar=document.getElementById('ar');var dots=document.querySelectorAll('.dot');var ctr=document.getElementById('ctr');function upd(){trk.style.transform='translateX('+(-cur*100)+'vw)';for(var i=0;i<dots.length;i++){if(i===cur)dots[i].classList.add('active');else dots[i].classList.remove('active')}if(cur===0)al.classList.add('off');else al.classList.remove('off');if(cur===N-1)ar.classList.add('off');else ar.classList.remove('off');ctr.textContent=(cur+1)+' / '+N}window.go=function(i){if(i>=0&&i<N){cur=i;upd()}};al.addEventListener('click',function(){go(cur-1)});ar.addEventListener('click',function(){go(cur+1)});document.addEventListener('keydown',function(e){if(picked)return;if(e.key==='ArrowLeft')go(cur-1);if(e.key==='ArrowRight')go(cur+1);if(e.key==='Enter')pick(T[cur].combo)});var tx=0,ty=0;document.addEventListener('touchstart',function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY},{passive:true});document.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-tx;var dy=e.changedTouches[0].clientY-ty;if(Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>60){dx<0?go(cur+1):go(cur-1)}},{passive:true});window.pick=function(combo){if(picked)return;picked=true;fetch('/api/pick',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({combo:combo})}).catch(function(e){console.error(e)});document.getElementById('sov').classList.add('vis')};window.seeAll=function(){fetch('/api/pick',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({combo:'more'})}).catch(function(e){console.error(e)});document.getElementById('sh').textContent='Got it!';document.getElementById('sm').textContent='Head back to your terminal for more options.';document.getElementById('sov').classList.add('vis')};var imgs=document.querySelectorAll('.preview-scroll img');var loaded=0;function chk(){loaded++;if(loaded>=imgs.length)reveal()}for(var j=0;j<imgs.length;j++){if(imgs[j].complete)chk();else{imgs[j].addEventListener('load',chk);imgs[j].addEventListener('error',chk)}}setTimeout(reveal,4000);var revealed=false;function reveal(){if(revealed)return;revealed=true;document.getElementById('ld').classList.add('gone');setTimeout(function(){document.getElementById('vp').classList.add('show');document.getElementById('hdr').classList.add('show');al.classList.add('show');ar.classList.add('show');document.getElementById('bb').classList.add('show')},100)}})();
</script>
</body></html>`;
}

// ---------------------------------------------------------------------------
// HTTP Server
// ---------------------------------------------------------------------------

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (req.method === 'POST' && url.pathname === '/api/pick') {
    let body = '';
    for await (const chunk of req) body += chunk;
    try {
      const { combo } = JSON.parse(body);
      await writeFile(CHOICE_FILE, combo, 'utf-8');
      console.log(`  Selection: ${combo}`);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ ok: true }));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: e.message }));
    }
    return;
  }
  if (url.pathname === '/' || url.pathname === '/index.html') {
    res.writeHead(200, { 'Content-Type': 'text/html', 'Cache-Control': 'no-cache' });
    res.end(buildGalleryHTML());
    return;
  }
  if (url.pathname.startsWith('/screenshots/')) {
    const filename = url.pathname.replace('/screenshots/', '');
    try {
      const data = await readFile(`/tmp/picker-${filename}`);
      res.writeHead(200, { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=3600' });
      res.end(data);
    } catch {
      res.writeHead(404); res.end('Screenshot not found');
    }
    return;
  }
  if (url.pathname.startsWith('/preview/')) {
    const parts = url.pathname.replace('/preview/', '').split('/');
    const fullPath = resolve(COMBOS_DIR, parts[0], parts.slice(1).join('/') || 'index.html');
    if (!fullPath.startsWith(COMBOS_DIR)) { res.writeHead(403); res.end('Forbidden'); return; }
    try {
      const data = await readFile(fullPath);
      res.writeHead(200, { 'Content-Type': MIME[extname(fullPath).toLowerCase()] || 'application/octet-stream' });
      res.end(data);
    } catch {
      res.writeHead(404); res.end('Not found');
    }
    return;
  }
  res.writeHead(404); res.end('Not found');
});

async function main() {
  await captureScreenshots();
  server.listen(PORT, () => {
    console.log(`\n  Template picker running at:\n`);
    console.log(`    http://localhost:${PORT}\n`);
    console.log(`  Templates: ${combos.join(', ')}`);
    console.log(`  Selection -> ${CHOICE_FILE}\n`);
  });
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
