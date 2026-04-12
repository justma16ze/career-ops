/**
 * styles/garden.mjs — Digital Garden aesthetic
 *
 * Warm linen/cream background, massive serif headline, editorial magazine restraint.
 * Minimal nav, spare layout, type does all the work.
 * Plum accent (#7b3b5e) for links.
 */

export const name = 'garden';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@400;600&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #f3f0eb;
  --bg-alt: #fff;
  --bg-card: #f3f0eb;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #353534;
  --text-muted: #6b6b6b;
  --text-faint: #9a9590;

  /* Accent */
  --accent: #7b3b5e;
  --accent-hover: #7b3b5e;

  /* Borders */
  --border: #ddd7cf;
  --border-light: #e4dfd8;

  /* Typography */
  --font-display: 'Lora', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Source Sans 3', sans-serif;

  /* Spacing */
  --wrap-width: 760px;
  --nav-height: auto;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: #333;
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.65; margin: 0; padding: 0; font-size: 17px; }
.wrap { width: var(--wrap-width); margin: 0 auto; padding: 48px 36px 56px; }

/* Navigation */
nav { display: flex; align-items: baseline; margin-bottom: 64px; font-size: 15px; }
.site-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text); text-decoration: none; margin-right: auto; letter-spacing: -0.01em; }
.nav-links { display: flex; gap: 28px; }
nav a { color: var(--text-muted); text-decoration: none; transition: color 0.15s ease; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 600; }

/* Headings */
h1 { font-family: var(--font-display); font-size: 96px; font-weight: 400; color: #1a1a1a; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 28px; }
h1 strong { font-weight: 700; color: #111; }
h2 { font-family: var(--font-display); font-size: 32px; font-weight: 400; color: #1a1a1a; line-height: 1.2; letter-spacing: -0.015em; margin: 56px 0 20px; }
h3 { font-family: var(--font-display); font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.3; margin: 0; }

/* Links */
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(123, 59, 94, 0.3); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent); }

/* Hero subtitle */
.subtitle { font-size: 19px; color: var(--text-muted); line-height: 1.6; margin-bottom: 8px; }
.subtitle a { color: var(--accent); font-weight: 600; text-decoration: none; }
.subtitle a:hover { text-decoration: underline; text-underline-offset: 3px; }

/* Home bio */
.home-bio { font-size: 18px; color: #4a4a4a; line-height: 1.75; margin-bottom: 40px; max-width: 640px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: var(--accent); font-weight: 600; }

/* Section intro */
.section-intro { font-size: 17px; color: var(--text-muted); line-height: 1.65; margin-bottom: 32px; }

/* Standard entry classes */
.entry { padding: 20px 0; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: var(--font-display); font-weight: 700; font-size: 20px; color: #1a1a1a; }
.entry-date { font-size: 14px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 15px; color: var(--text-muted); font-style: italic; margin-top: 6px; }
.entry-desc { font-size: 15px; color: var(--text-muted); line-height: 1.6; }
.entry ul { margin: 8px 0 0 0; padding-left: 20px; font-size: 15px; color: #555; list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.55; color: var(--text-muted); }

/* Experience groups */
.exp-list { margin-top: 8px; }
.exp-group { margin-bottom: 44px; }
.exp-group-header { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 4px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }
.exp-company { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: #1a1a1a; }
.exp-date { font-size: 14px; color: var(--text-faint); white-space: nowrap; }
.exp-role-single { font-size: 15px; color: var(--text-muted); font-style: italic; margin-top: 6px; }
.exp-bullets { margin: 8px 0 0 0; padding-left: 20px; font-size: 15px; color: #555; list-style: disc; }
.exp-bullets li { margin-bottom: 4px; line-height: 1.55; }

/* Sub-roles */
.sub-role { margin-top: 16px; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.sub-role-title { font-weight: 700; font-size: 15px; color: #1a1a1a; }
.sub-role-date { font-size: 13px; color: var(--text-faint); white-space: nowrap; }
.sub-entry { margin-top: 16px; }
.sub-entry:first-child { margin-top: 4px; }

/* Details */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 13px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* Projects */
.project-list { margin-top: 8px; }
.project { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light); }
.project:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.project-name { font-family: var(--font-display); font-size: 20px; font-weight: 600; color: #1a1a1a; }
.project-name a { color: #1a1a1a; text-decoration: underline; text-decoration-color: var(--border); text-underline-offset: 4px; }
.project-name a:hover { text-decoration-color: #1a1a1a; }
.project-metric { font-size: 14px; color: var(--text-faint); white-space: nowrap; }
.project-desc { font-size: 15px; color: var(--text-muted); line-height: 1.6; }

/* Education */
.education { margin-top: 12px; }
.education p { font-size: 16px; color: #4a4a4a; margin-bottom: 6px; }

/* About */
.about-section { margin-bottom: 36px; }
.strengths-list { list-style: none; padding: 0; margin: 8px 0 0; }
.strengths-list li { font-size: 16px; color: #4a4a4a; padding: 4px 0 4px 22px; line-height: 1.5; position: relative; }
.strengths-list li::before { content: '\\2013'; color: var(--text-faint); position: absolute; left: 0; }
.skills-list { font-size: 15px; color: var(--text-muted); line-height: 1.8; }
.skills-grid { font-size: 15px; color: var(--text-muted); }
.looking-for { font-size: 16px; color: #4a4a4a; line-height: 1.6; }
.contact-line { font-size: 16px; }
.contact-line a { color: var(--accent); margin-right: 24px; }

/* FOOTER */
footer { margin-top: 56px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: none; }
footer a:hover { color: var(--footer-link-hover); }

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: auto; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 32px 24px 40px; }
  h1 { font-size: 48px; letter-spacing: -0.02em; }
  h2 { font-size: 26px; margin-top: 40px; }
  nav { margin-bottom: 48px; font-size: 14px; }
  nav .site-name { font-size: 18px; }
  .nav-links { gap: 20px; }
  .home-bio { font-size: 16px; }
  .subtitle { font-size: 17px; }
  .exp-group-header { flex-direction: column; gap: 2px; }
  .sub-role-header { flex-direction: column; gap: 2px; }
  .project-header { flex-direction: column; gap: 2px; }
  .entry-header { flex-direction: column; gap: 2px; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 20px 16px 32px !important; }
  h1 { font-size: 36px; margin-bottom: 16px; }
  h2 { font-size: 22px; margin-top: 32px; }
  nav { margin-bottom: 36px; font-size: 13px; }
  nav .site-name { font-size: 16px; }
  .nav-links { gap: 14px; }
  .home-bio { font-size: 15px; }
  .subtitle { font-size: 15px; }
  .exp-company { font-size: 17px; }
  .exp-bullets { font-size: 14px; }
  .project-name { font-size: 17px; }
  .project-desc { font-size: 14px; }
  .strengths-list li { font-size: 14px; }
  .skills-list { font-size: 14px; }
  .entry-title { font-size: 17px; }
}
`;
}
