/**
 * styles/caps.mjs — Bold Confidence template
 *
 * ALL-CAPS statement. Direct. Confident.
 * General Sans body, uppercase nav/labels, dark teal accent.
 */

export const name = 'caps';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
];

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
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #0d9488;
  --accent-hover: #0d9488;

  /* Borders */
  --border: #eee;
  --border-light: #f0f0f0;

  /* Typography */
  --font-display: 'General Sans', sans-serif;
  --font-body: 'General Sans', sans-serif;
  --font-mono: ui-monospace, SFMono-Regular, monospace;

  /* Spacing */
  --wrap-width: 700px;
  --nav-height: 48px;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: #333;
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; margin: 0; padding: 0; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(13,148,136,0.3); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent); }

/* Nav */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; font-size: 13px; }
.site-name { font-family: var(--font-display); font-weight: 700; color: var(--text); text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.06em; margin-right: auto; }
nav a { color: var(--text-faint); text-decoration: none; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; }

/* Headings */
h1 { font-family: var(--font-display); font-size: 36px; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; line-height: 1.15; margin-bottom: 20px; max-width: 620px; }
h2 { font-family: var(--font-display); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-faint); margin: 32px 0 12px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: var(--text); text-decoration: none; border-bottom: 2px solid var(--text); padding-bottom: 1px; }
h3 a:hover { border-color: var(--accent); color: var(--accent); }

/* Body text */
p { margin-bottom: 8px; }
p:last-child { margin-bottom: 0; }

/* Hero section */
.hero { margin-bottom: 32px; }
.hero .bio { font-size: 15px; color: var(--text-muted); line-height: 1.7; max-width: 580px; }
.hero .bio p { margin-bottom: 12px; }
.hero .bio a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ccc; }
.hero .bio a:hover { text-decoration-color: var(--text); }
.hero .links { margin-top: 14px; font-size: 13px; }
.hero .links a { color: var(--accent); margin-right: 16px; }

/* Home bio */
.home-bio { font-size: 15px; color: var(--text-muted); line-height: 1.7; max-width: 580px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ccc; }
.home-bio a:hover { text-decoration-color: var(--text); }

/* Projects */
.project { margin-bottom: 20px; }
.project p { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.project .metric { font-size: 13px; font-weight: 600; color: var(--accent); margin-top: 2px; }

/* Experience / Jobs */
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 15px; }
.date { font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }

/* Standard entry classes */
.entry { margin-bottom: 24px; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.entry-title { font-weight: 700; font-size: 15px; color: var(--text); }
.entry-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc, .entry li { font-size: 14px; color: var(--text-muted); }
.entry-desc { line-height: 1.6; }

/* Sub roles */
.sub-role { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.sub-role .role { font-weight: 600; color: var(--text); font-size: 14px; }
.sub-entry { margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { margin-top: 4px; padding-top: 0; border-top: none; }

ul { margin: 4px 0 0 20px; }
li { font-size: 14px; color: var(--text-muted); margin-bottom: 3px; line-height: 1.6; }

details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 6px; }

/* About page */
.detail { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: var(--text-muted); padding: 3px 0; }
.skills-list { font-size: 14px; color: var(--text-muted); line-height: 1.8; }
.skills-grid { font-size: 14px; color: var(--text-muted); }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 16px; }
section { margin-bottom: 16px; }
article { margin-bottom: 16px; }

/* Footer */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }
footer a:hover { color: var(--footer-link-hover); }

/* Print */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: auto; } }

/* Responsive 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 28px 24px; }
  h1 { font-size: 26px; }
  nav { font-size: 12px; gap: 14px; }
  .hero .bio { font-size: 14px; }
  .home-bio { font-size: 14px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .entry-header { flex-direction: column; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* Responsive 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1 { font-size: 22px; }
  nav .site-name { font-size: 11px; }
  nav { font-size: 11px; gap: 8px; }
  h2 { font-size: 10px; }
  h3 { font-size: 14px; }
  .hero .bio { font-size: 13px; }
  .home-bio { font-size: 13px; }
  .job-header strong { font-size: 14px; }
  .role { font-size: 13px; }
  li { font-size: 13px; }
  .detail { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  .skills-list { font-size: 13px; }
  .entry-title { font-size: 14px; }
  .entry-desc { font-size: 13px; }
}
`;
}
