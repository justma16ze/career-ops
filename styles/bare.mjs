/**
 * styles/bare.mjs — Ultra-Minimal template
 *
 * The anti-design design. System fonts, #fff bg, #111 text, #2563eb links.
 * Narrow single column, no decoration, minimal hierarchy.
 */

export const name = 'bare';

export const fonts = [];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #fff;
  --bg-alt: #fafafa;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #111;
  --text-muted: #444;
  --text-faint: #888;

  /* Accent */
  --accent: #2563eb;
  --accent-hover: #1d4ed8;

  /* Borders */
  --border: #eee;
  --border-light: #f0f0f0;

  /* Typography */
  --font-display: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-body: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, 'SF Mono', monospace;

  /* Spacing */
  --wrap-width: 600px;
  --nav-height: 48px;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: var(--accent);
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 14px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.65; margin: 0; padding: 0; }
.wrap { max-width: var(--wrap-width); margin: 0 auto; padding: 32px 40px 40px; }
a { color: var(--accent); }
a:hover { color: var(--accent-hover); }

/* NAV */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 20px; font-size: 13px; }
.site-name { font-family: var(--font-display); font-weight: 600; color: var(--text); text-decoration: none; margin-right: auto; }
nav a { color: var(--text-faint); text-decoration: none; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 500; }

/* HEADINGS */
h2 { font-family: var(--font-display); font-size: 14px; font-weight: 700; color: var(--text); margin: 24px 0 8px; }

p { margin-bottom: 8px; }
p:last-child { margin-bottom: 0; }

/* HOME BIO */
.home-bio { line-height: 1.7; margin-bottom: 16px; }
.home-bio p { margin-bottom: 10px; }
.home-bio a { color: var(--accent); }

/* EXPERIENCE */
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.exp-header strong { font-weight: 700; }
.exp-header .dates { color: var(--text-faint); font-size: 13px; white-space: nowrap; }
.exp-item { margin-bottom: 20px; }
.exp-role { font-size: 13px; color: var(--text-muted); margin-top: 1px; }

/* Standard entry classes */
.entry { margin-bottom: 20px; }
.entry:last-child { margin-bottom: 0; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 700; color: var(--text); }
.entry-date { color: var(--text-faint); font-family: var(--font-mono); font-size: 13px; white-space: nowrap; }
.entry-role { font-size: 13px; color: var(--text-muted); margin-top: 1px; }
.entry-desc, .entry li { font-size: 13px; color: var(--text-muted); }
.entry-desc { line-height: 1.6; }

/* SUB ROLES */
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border-light); }
.sub-role:first-child { border-top: none; padding-top: 2px; margin-top: 4px; }
.sub-role .exp-header strong { font-weight: 600; font-size: 13px; }
.sub-role .dates { font-size: 12px; }
.sub-entry { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { border-top: none; padding-top: 2px; margin-top: 4px; }

ul { margin: 4px 0 0 18px; font-size: 13px; color: var(--text-muted); }
ul li { margin-bottom: 3px; line-height: 1.5; }

.detail { font-size: 13px; color: var(--text-muted); }
.skills-list { font-size: 13px; color: var(--text-muted); }

/* Override layout-specific pill/tag styling — bare shows plain text */
body .skills-list span { background: none; border: none; padding: 2px 0; font-family: var(--font-body); font-size: 13px; color: var(--text-muted); }
body .skills-list .tag::after { content: ', '; color: var(--text-muted); }
body .skills-list .tag:last-child::after { content: ''; }
.skills-grid { font-size: 13px; color: var(--text-muted); }
.strengths-list { list-style: none; padding: 0; }
.strengths-list li { font-size: 13px; color: var(--text-muted); padding-left: 0; }
.strengths { font-size: 13px; color: var(--text-muted); }
.contact-line { font-size: 13px; }
.contact-line a { margin-right: 12px; }

/* DETAILS */
details { margin-top: 4px; }
details summary { cursor: pointer; font-size: 12px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 4px; }

/* FOOTER */
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); text-decoration: underline; font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* RESPONSIVE 660px */
@media (max-width: 700px) {
  .wrap { padding: 24px 20px; }
  nav { font-size: 12px; gap: 14px; }
  .exp-header { flex-direction: column; gap: 0; }
  .exp-header .dates { white-space: normal; }
  .entry-header { flex-direction: column; gap: 0; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px; }
  nav { font-size: 12px; gap: 10px; }
}
`;
}
