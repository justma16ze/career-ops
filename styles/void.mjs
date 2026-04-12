/** styles/void.mjs — Hacker-Minimal style */
export const name = 'void';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #050505;
  --bg-alt: #0a0a0a;
  --bg-card: #0f0f0f;
  --bg-nav: rgba(5,5,5,0.92);
  --bg-sidebar: transparent;

  /* Text */
  --text: #aaa;
  --text-muted: #666;
  --text-faint: #444;

  /* Accent */
  --accent: #999;
  --accent-hover: #ccc;

  /* Borders */
  --border: #1a1a1a;
  --border-light: #111;

  /* Typography */
  --font-display: 'JetBrains Mono', ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;
  --font-body: 'JetBrains Mono', ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;
  --font-mono: 'JetBrains Mono', ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;

  /* Spacing */
  --wrap-width: 620px;
  --nav-height: 48px;

  /* Footer — dark bg: use readable light color for link */
  --footer-text: #aaa;
  --footer-link: #bbb;
  --footer-link-hover: #ccc;
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: #888; background: var(--bg); line-height: 1.6; font-size: 14px; }
a { color: var(--accent); text-decoration: none; transition: color 0.15s ease; }
a:hover { color: var(--accent-hover); }
h1 { font-family: var(--font-display); font-weight: 500; color: #ccc; letter-spacing: -0.02em; }
h2 { font-family: var(--font-display); font-size: 13px; font-weight: 500; color: #555; margin: 40px 0 16px; text-transform: lowercase; letter-spacing: 0.05em; }
.site-name { font-family: var(--font-display); font-size: 16px; font-weight: 500; color: #ccc; text-decoration: none; letter-spacing: -0.02em; }

/* ---- RADIAL GLOW ---- */
body::before { content: ''; position: fixed; top: 35%; left: 50%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,210,180,0.045) 0%, rgba(0,180,160,0.015) 40%, rgba(0,210,180,0) 70%); transform: translate(-50%, -50%); pointer-events: none; z-index: 0; }
.wrap { position: relative; z-index: 1; }

/* ---- NAV ---- */
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; margin-bottom: 48px; font-size: 13px; }
nav .site-name { margin-right: auto; }
nav a { color: #555; text-decoration: none; }
nav a:hover { color: #999; }
nav .active { color: #888; }

/* ---- INTRO/BIO ---- */
.intro { font-size: 14px; color: #888; line-height: 1.75; margin-bottom: 32px; }
.intro p { margin-bottom: 12px; }
.intro a { color: #999; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.intro a:hover { color: #ccc; text-decoration-color: #666; }
.home-bio { font-size: 14px; color: #888; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: #999; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.home-bio a:hover { color: #ccc; text-decoration-color: #666; }

/* ---- LINK LIST ---- */
.link-list { list-style: none; padding: 0; margin: 24px 0 0; }
.link-list li { padding: 8px 0; }
.link-list li a { color: #888; font-size: 14px; }
.link-list li a:hover { color: #ccc; }

/* ---- ENTRIES ---- */
.entry { padding: 16px 0; border-bottom: 1px solid var(--border); }
.entry:last-child { border-bottom: none; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 500; font-size: 14px; color: var(--text); }
.entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: #333; text-underline-offset: 3px; }
.entry-title a:hover { color: #ccc; text-decoration-color: #666; }
.entry-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 13px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
.entry-desc a { color: #888; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 3px; }
.entry-desc a:hover { color: #ccc; }
.entry ul { margin: 6px 0 0 0; padding-left: 0 !important; font-size: 13px; color: var(--text-muted); list-style: none !important; }
.entry li { margin-bottom: 3px; line-height: 1.5; padding-left: 16px; text-indent: -16px; }
.entry li::before { content: '-'; margin-right: 8px; color: #333; display: inline; }

/* ---- SUB-ENTRIES ---- */
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 500; font-style: normal; font-size: 13px; color: #888; }
.sub-entry .entry-date { font-size: 12px; }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* ---- ABOUT ---- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 13px; color: #777; padding: 4px 0 4px 20px; position: relative; }
.strengths-list li::before { content: '-'; color: #333; position: absolute; left: 0; }
.skills-list { font-size: 13px; color: #555; line-height: 1.4; }
.skills-grid { font-size: 13px; color: #555; line-height: 1.4; column-count: 2; column-gap: 32px; }
.skills-grid span { display: block; padding: 2px 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; color: #888; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.contact-line a:hover { color: #ccc; text-decoration-color: #666; }

/* ---- CARDS PILL OVERRIDE ---- */
.skills-list span { border-color: #333 !important; }

/* ---- CARD BORDER OVERRIDE ---- */
.card, .hero { border-color: #222 !important; }

/* ---- FOOTER ---- */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-decoration-color: #444; text-underline-offset: 3px; }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } body { background: #fff; color: #1a1a1a; } body::before { display: none; } .wrap { padding: 1rem; max-width: none; } .entry-title { color: #1a1a1a; } .entry-date { color: #666; } .entry-role { color: #444; } .entry-desc { color: #333; } .entry ul { color: #333; } .entry li::before { color: #999; } h2 { color: #444; } .home-bio { color: #333; } .home-bio a { color: #1a1a1a; } .strengths-list li { color: #333; } .skills-grid { color: #333; } .contact-line a { color: #1a1a1a; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  nav { font-size: 12px; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
  .entry { padding: 12px 0; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid { column-count: 1; }
  .home-bio { font-size: 13px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav .site-name { font-size: 14px; }
  h2 { font-size: 12px; }
  nav { font-size: 12px; gap: 8px; }
  .entry-title { font-size: 13px; }
  .entry-desc { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 12px; }
  .strengths-list li { font-size: 12px; }
}`;
}
