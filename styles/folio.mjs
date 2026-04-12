/**
 * styles/folio.mjs — Warm + Text-Forward template
 *
 * The kind of personal site a thoughtful person would make by hand.
 * Instrument Serif display, DM Sans body. Warm cream bg, blue accent.
 * Two-column layout option with skills sidebar.
 */

export const name = 'folio';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #f8f5f0;
  --bg-alt: #fff;
  --bg-card: #f8f5f0;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #222;
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #2563eb;
  --accent-hover: #2563eb;

  /* Borders */
  --border: #ddd5c8;
  --border-light: #ece5da;

  /* Typography */
  --font-display: 'Instrument Serif', serif;
  --font-body: 'DM Sans', sans-serif;
  --font-mono: 'DM Sans', sans-serif;

  /* Spacing */
  --wrap-width: 700px;
  --nav-height: 48px;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: var(--accent);
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.7; margin: 0; padding: 0; }
.wrap { max-width: var(--wrap-width); margin: 0 auto; padding: 40px 40px 32px; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(37,99,235,0.3); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent); }

/* NAV */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 12px; margin-bottom: 24px; border-bottom: 1px solid var(--border); font-size: 13px; }
.site-name { font-family: var(--font-display); color: var(--text); text-decoration: none; font-size: 18px; margin-right: auto; }
nav a { color: var(--text-faint); text-decoration: none; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 500; }

/* HEADINGS */
h1 { font-family: var(--font-display); font-size: 36px; font-weight: 400; line-height: 1.2; margin-bottom: 12px; }
h2 { font-family: var(--font-display); font-size: 22px; font-weight: 400; color: var(--text); margin: 32px 0 12px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ccc; }
h3 a:hover { text-decoration-color: var(--text); }

p { margin-bottom: 10px; }
p:last-child { margin-bottom: 0; }

/* HOME BIO */
.home-bio { font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 28px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--accent); }

/* TWO-COLUMN LAYOUT */
.two-col { display: grid; grid-template-columns: 1fr 200px; gap: 40px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
.skills-sidebar { font-size: 13px; color: #777; line-height: 1.9; }
.skills-sidebar .sidebar-label { display: block; color: var(--text); font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 12px; margin-bottom: 2px; font-weight: 700; }
.skills-sidebar .sidebar-label:first-child { margin-top: 0; }

/* PROJECTS */
.project { margin-bottom: 20px; }
.project p { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
.project .metric { font-size: 13px; color: var(--accent); margin-top: 2px; }

/* EXPERIENCE */
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.job-header .company { font-size: 15px; font-weight: 700; }
.date { font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }

/* Standard entry classes */
.entry { margin-bottom: 24px; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.entry-title { font-weight: 700; font-size: 15px; color: var(--text); }
.entry-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc, .entry li { font-size: 14px; color: var(--text-muted); }
.entry-desc { line-height: 1.7; }

/* Sub roles */
.sub-role { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 2px; }
.sub-role-header .role { font-weight: 600; font-size: 14px; color: var(--text); margin-bottom: 0; }
.sub-entry { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { margin-top: 4px; padding-top: 0; border-top: none; }

ul { margin: 4px 0 0 20px; }
li { font-size: 14px; color: #444; margin-bottom: 3px; line-height: 1.6; }

.detail { font-size: 14px; color: var(--text-muted); }
.skills-list { font-size: 14px; color: var(--text-muted); line-height: 1.9; }
.skills-grid { font-size: 13px; color: var(--text-muted); }
.strengths-list { list-style: none; padding: 0; }
.strengths-list li { font-size: 15px; color: var(--text); padding: 5px 0; border-bottom: 1px solid var(--border-light); }
.strengths-list li:last-child { border-bottom: none; }
.links { font-size: 13px; margin-top: 8px; }
.links a { margin-right: 14px; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 14px; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }

/* FOOTER */
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #ccc; }
footer a:hover { color: var(--footer-link-hover); }

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; width: auto; max-width: none; } body { background: #fff; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 24px 20px; }
  .two-col { grid-template-columns: 1fr; gap: 24px; }
  h1 { font-size: 28px; }
  nav { font-size: 12px; gap: 14px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .entry-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 15px; }
  nav { font-size: 11px; gap: 10px; }
  h1 { font-size: 24px; }
  h2 { font-size: 18px; }
  .home-bio { font-size: 13px; }
  .project p { font-size: 13px; }
  .project .metric { font-size: 12px; }
  li { font-size: 13px; }
  .job-header .company { font-size: 14px; }
  .role { font-size: 13px; }
  .date { font-size: 11px; }
  .skills-sidebar { font-size: 12px; }
  .skills-list { font-size: 13px; }
  .entry-title { font-size: 14px; }
}
`;
}
