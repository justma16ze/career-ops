/** styles/statement.mjs — Serif Statement style (inspired by Bradley Ziffer) */
export const name = 'statement';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@400;600;700&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #fff;
  --bg-alt: #fafafa;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #1a1a1a;
  --text-muted: #555;
  --text-faint: #888;

  /* Accent */
  --accent: #d4a040;
  --accent-hover: #b88a30;

  /* Borders */
  --border: #eee;
  --border-light: #f0f0f0;

  /* Typography */
  --font-display: 'Instrument Serif', serif;
  --font-body: 'Source Sans 3', sans-serif;
  --font-mono: 'Source Sans 3', sans-serif;

  /* Spacing */
  --wrap-width: 700px;
  --nav-height: auto;

  /* Footer */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: var(--accent);
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.65; font-size: 15px; }
a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ddd; }
a:hover { color: var(--accent-hover); text-decoration-color: var(--text); }
h2 { font-family: var(--font-display); font-size: 20px; font-weight: 400; color: var(--text); margin: 36px 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border-light); }
h2:first-child { margin-top: 0; }
.site-name { font-family: var(--font-display); color: var(--text); text-decoration: none; font-size: 16px; }

/* ---- NAV ---- */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 32px; border-bottom: 1px solid var(--border); font-size: 13px; }
nav .site-name { margin-right: auto; }
nav a { color: #bbb; text-decoration: none; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 600; }

/* ---- HEADINGS ---- */
h1 { font-family: var(--font-display); font-size: 40px; font-weight: 400; max-width: 600px; line-height: 1.25; margin-bottom: 16px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: var(--text); text-decoration: underline; text-decoration-color: #ddd; text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: var(--text); }
p { margin-bottom: 10px; }
p:last-child { margin-bottom: 0; }

/* ---- HERO ---- */
.hero { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
.hero .subline { font-size: 14px; color: var(--text-faint); margin-top: 4px; }
.hero .links { margin-top: 10px; font-size: 13px; }
.hero .links a { margin-right: 16px; }
.hero-headline { font-size: 14px; color: var(--text-faint); margin-top: 4px; }

/* ---- HOME BIO ---- */
.home-bio { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--text); }

/* ---- EXP TABLE ---- */
.exp-table { width: 100%; font-size: 14px; border-collapse: collapse; }
.exp-table td { padding: 10px 0; border-bottom: 1px solid var(--border-light); vertical-align: top; }
.exp-table .co { font-weight: 600; width: 180px; }
.exp-table .role-cell { color: var(--text-muted); }
.exp-table .dates { color: var(--accent); text-align: right; white-space: nowrap; font-size: 13px; }

/* ---- PROJECTS ---- */
.project { margin-bottom: 20px; }
.project p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.project .metric { font-size: 13px; color: var(--accent); margin-top: 2px; }

/* ---- EXPERIENCE ---- */
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 15px; }
.date { font-size: 13px; color: var(--accent); white-space: nowrap; }
.role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }
.sub-role { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.sub-role .role { font-weight: 600; color: var(--text); }
ul { margin: 6px 0 0 20px; }
li { font-size: 14px; color: var(--text-muted); margin-bottom: 3px; line-height: 1.6; }

/* ---- ENTRIES (standardized) ---- */
.entry { margin-bottom: 24px; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.entry-title { font-weight: 700; font-size: 15px; color: var(--text); }
.entry-date { font-size: 13px; color: var(--accent); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.entry li { font-size: 14px; color: var(--text-muted); }
.sub-entry { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-entry .entry-role { font-weight: 600; color: var(--text); }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* ---- ABOUT ---- */
.detail { font-size: 14px; color: var(--text-muted); }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #333; padding: 6px 0; border-bottom: 1px solid var(--border-light); }
.strengths-list li:last-child { border-bottom: none; }
.skills-list { font-size: 14px; color: var(--text-muted); line-height: 1.8; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }

/* ---- CONTACT ---- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 16px; }

/* ---- FOOTER ---- */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #ccc; }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: auto; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  h1 { font-size: 30px; }
  nav { font-size: 12px; gap: 12px; }
  nav .site-name { font-size: 15px; }
  .exp-table .co { width: auto; }
  .exp-table { font-size: 13px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .entry-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  h1 { font-size: 24px; }
  h2 { font-size: 17px; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 11px; gap: 8px; }
  .exp-table { font-size: 12px; }
  .exp-table .dates { font-size: 11px; }
  .job-header strong { font-size: 14px; }
  .date { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  li { font-size: 13px; }
}`;
}
