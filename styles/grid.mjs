/**
 * styles/grid.mjs — Data-Forward aesthetic
 *
 * Bloomberg terminal meets personal site. Dense, information-rich, utilitarian.
 * Dark header bar with name + stats, tabular project data. Compact, dense.
 * General Sans body, JetBrains Mono for data. Green accent for metrics.
 */

export const name = 'grid';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #f5f5f4;
  --bg-alt: #fff;
  --bg-card: #fff;
  --bg-nav: #fff;
  --bg-sidebar: transparent;

  /* Text */
  --text: #171717;
  --text-muted: #525252;
  --text-faint: #a3a3a3;

  /* Accent */
  --accent: #16a34a;
  --accent-hover: #15803d;

  /* Borders */
  --border: #d4d4d4;
  --border-light: #e5e5e5;

  /* Typography */
  --font-display: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --wrap-width: 680px;
  --nav-height: auto;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: #171717;
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.5; margin: 0; padding: 0; font-size: 14px; }
.wrap { width: var(--wrap-width); margin: 0 auto; padding: 0 0 40px; }
a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--text-faint); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--text); }

/* Dark data bar */
.data-bar { background: #171717; color: #d4d4d4; padding: 18px 28px; }
.data-bar-inner { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
.data-bar .bar-name { font-size: 17px; font-weight: 700; color: #fafafa; letter-spacing: -0.01em; }
.data-bar .bar-meta { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); display: flex; gap: 16px; flex-wrap: wrap; }
.data-bar .bar-meta span { white-space: nowrap; }
.data-bar .bar-stat { color: var(--accent); font-weight: 500; }

/* Nav */
nav { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; padding: 10px 28px; background: var(--bg-nav); border-bottom: 1px solid var(--border); font-size: 13px; font-weight: 500; }
.site-name { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); text-decoration: none; margin-right: auto; }
nav a { color: var(--text-muted); text-decoration: none; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px; text-decoration-color: var(--accent); }

/* Main */
main { padding: 24px 28px 0; }

/* Headings */
h2 { font-family: var(--font-display); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #737373; margin: 28px 0 10px; }
h2:first-child { margin-top: 0; }

/* Home bio */
.home-bio { font-size: 14px; color: #404040; line-height: 1.7; }
.home-bio p { margin-bottom: 12px; }
.home-bio p:last-child { margin-bottom: 0; }
.home-bio a { color: var(--text); text-decoration-color: var(--text-faint); }

/* Data table (projects) */
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { text-align: left; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-faint); padding: 6px 0; border-bottom: 1px solid var(--border); }
.data-table td { padding: 10px 0; border-bottom: 1px solid var(--border-light); vertical-align: top; }
.data-table tr:last-child td { border-bottom: none; }
.data-table .col-name { font-weight: 600; color: var(--text); padding-right: 16px; white-space: nowrap; }
.data-table .col-name a { color: var(--text); text-decoration: underline; text-decoration-color: var(--text-faint); text-underline-offset: 3px; }
.data-table .col-name a:hover { text-decoration-color: var(--text); }
.data-table .col-desc { color: var(--text-muted); line-height: 1.5; }
.data-table .col-metric { font-family: var(--font-mono); font-size: 11px; color: var(--accent); font-weight: 500; white-space: nowrap; text-align: right; padding-left: 16px; }

/* Standard entry classes */
.entry { padding: 14px 0; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 700; font-size: 14px; color: var(--text); }
.entry-date { font-family: var(--font-mono); font-size: 11px; color: #737373; white-space: nowrap; }
.entry-role { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
.entry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.5; }
.entry li { font-size: 13px; color: var(--text-muted); margin-bottom: 3px; line-height: 1.5; }

/* Experience */
.exp-entry { padding: 14px 0; border-bottom: 1px solid var(--border-light); }
.exp-entry:last-child { border-bottom: none; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.exp-company { font-weight: 700; font-size: 14px; color: var(--text); }
.exp-date { font-family: var(--font-mono); font-size: 11px; color: #737373; white-space: nowrap; }
.exp-role { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
.exp-bullets { margin: 6px 0 0 0; padding-left: 16px; font-size: 13px; color: var(--text-muted); list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.5; }
.sub-role { padding: 8px 0 0; margin-top: 8px; border-top: 1px solid #f0f0f0; }
.sub-role:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-role .exp-role { font-weight: 600; color: var(--text); font-size: 13px; }
.sub-role .exp-date { font-size: 10px; }
.sub-entry { padding: 8px 0 0; margin-top: 8px; border-top: 1px solid #f0f0f0; }
.sub-entry:first-child { padding-top: 0; margin-top: 4px; border-top: none; }

/* Details */
details { margin-top: 4px; }
details summary { cursor: pointer; font-size: 11px; color: var(--text-faint); list-style: none; font-family: var(--font-mono); }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 4px; }

/* Skills */
.skills-grid { font-size: 13px; color: var(--text-muted); line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.skills-list { font-family: var(--font-mono); font-size: 12px; color: var(--text-muted); }

/* Strengths */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 13px; color: #404040; padding: 4px 0; border-bottom: 1px solid #f0f0f0; }
.strengths-list li:last-child { border-bottom: none; }

/* Contact */
.contact-line { font-size: 13px; }
.contact-line a { margin-right: 20px; }

/* Education */
.edu-entry { font-size: 13px; color: var(--text-muted); padding: 4px 0; }

/* About intro */
.about-intro { font-size: 14px; color: #404040; line-height: 1.7; margin-bottom: 16px; }
.about-intro p { margin-bottom: 8px; }

/* FOOTER */
footer { margin-top: 32px; padding: 12px 28px; border-top: 1px solid var(--footer-border); font-size: 11px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
footer a:hover { color: var(--footer-link-hover); }

/* PRINT */
@media print { nav, footer, .data-bar { display: none; } .wrap { padding: 1rem; max-width: none; } main { padding: 0 1rem; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 0 0 28px; }
  .data-bar { padding: 14px 20px; }
  .data-bar-inner { flex-direction: column; gap: 4px; }
  .data-bar .bar-meta { gap: 10px; }
  nav { padding: 10px 20px; font-size: 12px; gap: 10px; }
  main { padding: 20px 20px 0; }
  .data-table .col-metric { display: none; }
  .exp-header, .entry-header { flex-direction: column; }
  .sub-role .exp-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 13px; }
  footer { padding: 12px 20px; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .data-bar { padding: 10px 16px; }
  .data-bar .bar-name { font-size: 15px; }
  .data-bar .bar-meta { font-size: 10px; gap: 8px; }
  nav { padding: 8px 16px; font-size: 11px; gap: 8px; }
  main { padding: 16px 16px 0; }
  h2 { font-size: 10px; }
  .exp-company, .entry-title { font-size: 13px; }
  .exp-role, .entry-role { font-size: 12px; }
  .exp-bullets { font-size: 12px; }
  .data-table { font-size: 12px; }
  .skills-grid { column-count: 1; }
  .home-bio { font-size: 12px; }
  .strengths-list li { font-size: 12px; }
  footer { padding: 10px 16px; }
}
`;
}
