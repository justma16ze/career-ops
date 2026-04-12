/** styles/ink.mjs — Warm Editorial style */
export const name = 'ink';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@300;400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #faf6f0;
  --bg-alt: #f3ede4;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #1a1a1a;
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #c1553d;
  --accent-hover: #a3432e;

  /* Borders */
  --border: #d8d0c4;
  --border-light: #e8e0d4;

  /* Typography */
  --font-display: 'Instrument Serif', serif;
  --font-body: 'Source Sans 3', 'Source Sans Pro', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;

  /* Spacing */
  --wrap-width: 740px;
  --nav-height: 48px;

  /* Footer */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: var(--accent);
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.72; font-size: 17px; }
a { color: var(--accent); text-decoration: underline; text-decoration-color: rgba(193,85,61,0.3); text-underline-offset: 3px; transition: text-decoration-color 0.15s; }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent); }
h2 { font-family: var(--font-display); font-size: 22px; font-weight: 400; margin: 32px 0 14px; padding-top: 24px; border-top: 1px solid var(--border); line-height: 1.3; color: var(--text); }
h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
.site-name { font-family: var(--font-display); font-size: 20px; color: var(--text); text-decoration: none; font-weight: 400; letter-spacing: 0; }

/* ---- NAV ---- */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 32px; border-bottom: 1px solid var(--border); font-size: 14px; font-family: var(--font-mono); letter-spacing: 0.01em; }
nav a { color: var(--text-faint); text-decoration: none; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 500; }

/* ---- HEADINGS ---- */
h1 { font-family: var(--font-display); font-size: 38px; font-weight: 400; line-height: 1.15; margin-bottom: 8px; letter-spacing: -0.01em; }
h3 { font-family: var(--font-body); font-size: 16px; font-weight: 600; margin-bottom: 2px; line-height: 1.4; }
h3 a { color: var(--text); text-decoration: underline; text-decoration-color: var(--border); text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: var(--text); }

/* ---- BODY TEXT ---- */
p { margin-bottom: 10px; font-size: 16px; }
p:last-child { margin-bottom: 0; }

/* ---- HOME HERO ---- */
.hero { display: grid; grid-template-columns: 1fr 260px; gap: 40px; margin-bottom: 36px; padding-bottom: 36px; border-bottom: 1px solid var(--border); align-items: start; }
.hero-left .headline { font-family: var(--font-display); font-size: 19px; font-weight: 400; font-style: italic; color: var(--text-muted); margin: 6px 0 16px; line-height: 1.55; }
.hero-left .meta-line { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); line-height: 1.9; }
.hero-left .links { margin-top: 16px; font-size: 14px; }
.hero-left .links a { margin-right: 18px; }
.hero-headline { font-family: var(--font-display); font-size: 19px; font-weight: 400; font-style: italic; color: var(--text-muted); margin: 6px 0 16px; line-height: 1.55; }

/* ---- PROOF SIDEBAR ---- */
.hero-right { background: var(--bg-alt); padding: 20px 24px; border-left: 3px solid var(--accent); }
.hero-right h3 { font-family: var(--font-mono); font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-faint); margin-bottom: 16px; font-weight: 500; }
.proof-item { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid var(--border-light); }
.proof-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
.proof-metric { font-family: var(--font-mono); font-size: 14px; font-weight: 500; color: var(--accent); line-height: 1.4; }
.proof-label { font-size: 12px; color: #888; margin-top: 2px; letter-spacing: 0.01em; }

/* ---- HOME BIO ---- */
.home-bio { font-size: 16px; color: #333; line-height: 1.78; }
.home-bio p { margin-bottom: 14px; }
.home-bio p:first-child::first-letter { font-family: var(--font-display); font-size: 3em; float: left; line-height: 0.82; margin-right: 5px; margin-top: 5px; color: var(--accent); font-weight: 400; }
.home-bio a { color: var(--accent); }
.summary-text { font-size: 16px; color: #333; line-height: 1.78; margin-bottom: 16px; }
.superpowers { font-family: var(--font-mono); font-size: 13px; color: var(--text-faint); margin-top: 12px; letter-spacing: 0.01em; }

/* ---- WORK/PROJECTS ---- */
.project { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light); }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.project p { font-size: 15px; color: var(--text-muted); line-height: 1.7; }
.project .metric { font-family: var(--font-mono); font-size: 12px; color: var(--accent); margin-top: 4px; }

/* ---- EXPERIENCE ---- */
.job { margin-bottom: 0; padding: 28px 0; border-top: 1px solid var(--border); }
.job:first-child { border-top: none; padding-top: 0; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.job-header strong { font-size: 16px; }
.date { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.role { font-size: 15px; color: var(--text-muted); margin-bottom: 6px; }
.sub-role { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f0e8dc; }
.sub-role:first-child { margin-top: 6px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.sub-role .role { font-weight: 600; color: var(--text); font-size: 14px; }
ul { margin: 6px 0 0 20px; }
li { font-size: 14px; color: #444; margin-bottom: 3px; line-height: 1.65; }

/* ---- ENTRIES (standardized) ---- */
.entry { margin-bottom: 0; padding: 28px 0; border-top: 1px solid var(--border); }
.entry:first-child { border-top: none; padding-top: 0; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.entry-title { font-weight: 700; font-size: 16px; color: var(--text); }
.entry-date { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.entry-role { font-size: 15px; color: var(--text-muted); margin-bottom: 6px; }
.entry-desc { font-size: 15px; color: var(--text-muted); line-height: 1.7; }
.entry li { font-size: 14px; color: #444; margin-bottom: 3px; line-height: 1.65; }
.sub-entry { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f0e8dc; }
.sub-entry:first-child { margin-top: 6px; padding-top: 0; border-top: none; }
.sub-entry .entry-role { font-weight: 600; color: var(--text); font-size: 14px; }
.sub-entry .entry-date { font-size: 11px; }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* ---- ABOUT ---- */
.detail { font-size: 15px; color: var(--text-muted); line-height: 1.7; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #444; padding: 4px 0; line-height: 1.6; }
.skills-list { font-family: var(--font-mono); font-size: 13px; color: var(--text-muted); line-height: 2; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }

/* ---- EDUCATION ---- */
.edu { margin-bottom: 8px; }

/* ---- CONTACT ---- */
.contact-line { font-size: 15px; }
.contact-line a { margin-right: 18px; }

/* ---- FOOTER ---- */
footer { margin-top: 48px; padding-top: 14px; border-top: 1px solid var(--footer-border); font-size: 11px; color: var(--footer-text); font-family: var(--font-mono); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-decoration-color: rgba(0,0,0,0.12); text-underline-offset: 2px; }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; width: auto; max-width: none; } body { background: #fff; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  .hero { grid-template-columns: 1fr; gap: 20px; }
  .hero-right { margin-top: 0; border-left: none; border-top: 3px solid var(--accent); }
  h1 { font-size: 30px; }
  h2 { font-size: 19px; }
  nav { font-size: 13px; gap: 14px; }
  .job-header { flex-direction: column; gap: 2px; }
  .sub-role-header { flex-direction: column; gap: 2px; }
  .entry-header { flex-direction: column; gap: 2px; }
  .home-bio { font-size: 15px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav .site-name { font-size: 17px; }
  h1 { font-size: 26px; }
  h2 { font-size: 17px; margin: 24px 0 10px; padding-top: 16px; }
  nav { font-size: 12px; gap: 10px; }
  .hero-left .headline { font-size: 17px; }
  .hero-headline { font-size: 17px; }
  .proof-metric { font-size: 15px; }
  .proof-label { font-size: 12px; }
  li { font-size: 13px; }
  .home-bio { font-size: 14px; }
  .detail { font-size: 14px; }
  .strengths-list li { font-size: 14px; }
  .skills-list { font-size: 12px; }
}`;
}
