/**
 * styles/gradient.mjs — Pastel Gradient + Massive Stacked Typography
 *
 * Massive stacked serif name with alternating filled/hollow (text-stroke) letterforms.
 * Soft pastel blue-to-white gradient background on hero. Clean white content below.
 * Bold, confident, graphic-design-forward.
 */

export const name = 'gradient';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #fff;
  --bg-alt: #f0f4ff;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #1a1a1a;
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #1a1a1a;
  --accent-hover: #1a1a1a;

  /* Borders */
  --border: #e5e5e5;
  --border-light: #eee;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Source Sans 3', sans-serif;

  /* Spacing */
  --wrap-width: 700px;
  --nav-height: auto;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: #1a1a1a;
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; margin: 0; padding: 0; font-size: 15px; }
.wrap { width: var(--wrap-width); margin: 0 auto; padding: 0; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #bbb; }
a:hover { color: var(--accent-hover); text-decoration-color: var(--text); }

/* NAV */
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; padding: 24px 36px; font-size: 14px; }
.site-name { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--text); text-decoration: none; margin-right: auto; }
nav a { color: var(--text); text-decoration: underline; text-underline-offset: 6px; text-decoration-color: #ccc; font-weight: 400; }
nav a:hover { text-decoration-color: var(--text); }
nav .active { text-decoration: underline; text-decoration-color: var(--text); text-decoration-thickness: 2px; text-underline-offset: 6px; font-weight: 600; }

/* HERO — gradient-specific stacked text-stroke name */
.hero-gradient { background: linear-gradient(155deg, #b4dced 0%, #c2e4f2 12%, #d0ecf7 28%, #e2f2fa 48%, #f2f8fc 68%, #ffffff 100%); padding: 72px 36px 52px; text-align: center; }
.hero-name-stack { display: flex; flex-direction: column; align-items: center; gap: 2px; line-height: 0.88; margin-bottom: 36px; }
.hero-name-row { font-family: var(--font-display); text-transform: uppercase; letter-spacing: 0.03em; display: block; }
.hero-name-row.outline { font-size: 68px; font-weight: 400; color: transparent; -webkit-text-stroke: 1.2px #2a2a2a; }
.hero-name-row.filled { font-size: 86px; font-weight: 900; color: var(--text); -webkit-text-stroke: 0; letter-spacing: 0.02em; }
.hero-name-row.light-outline { font-size: 62px; font-weight: 400; color: transparent; -webkit-text-stroke: 1px #aaa; letter-spacing: 0.05em; }
.hero-headline { font-family: var(--font-body); font-size: 15px; font-weight: 300; color: #4a4a4a; letter-spacing: 0.04em; margin-top: 16px; }
.hero-gradient-fade { height: 1px; background: linear-gradient(to right, transparent, #e0e0e0, transparent); margin: 0 auto; width: 60%; }
.hero-links { margin-top: 24px; }
.hero-links a { display: inline-block; padding: 10px 28px; border: 1px solid #ccc; border-radius: 24px; text-decoration: none; font-size: 14px; color: var(--text); background: rgba(255,255,255,0.7); transition: border-color 0.2s; }
.hero-links a:hover { border-color: var(--text); }

/* CONTENT AREA */
.content { padding: 36px 36px 40px; }

/* HOME BIO */
.home-bio { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 24px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--text); font-weight: 600; }

/* HEADINGS */
h2 { font-family: var(--font-display); font-size: 22px; font-weight: 700; color: var(--text); margin: 36px 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }

/* EXPERIENCE */
.exp-group { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light); }
.exp-group:last-child { border-bottom: none; }
.exp-company-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.exp-company { font-family: var(--font-display); font-weight: 700; font-size: 17px; color: var(--text); }
.exp-date { font-size: 13px; color: #888; white-space: nowrap; font-weight: 400; }
.exp-role-block { padding: 8px 0 4px; }
.exp-role-block + .exp-role-block { border-top: 1px solid var(--border-light); padding-top: 10px; margin-top: 6px; }
.exp-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 2px; }
.exp-role { font-weight: 600; font-size: 14px; color: #333; }
.exp-role-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.exp-bullets { margin: 4px 0 0; padding-left: 18px; font-size: 14px; color: var(--text-muted); list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.55; }

/* Standard entry classes */
.entry { padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-weight: 700; font-size: 16px; color: var(--text); }
.entry-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.entry li { font-size: 14px; color: var(--text-muted); margin-bottom: 3px; line-height: 1.55; }

.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }

/* DETAILS */
details { margin-top: 4px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 6px; }

/* PROJECTS */
.project-entry { padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
.project-entry:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.project-name { font-family: var(--font-display); font-weight: 700; font-size: 16px; }
.project-name a { color: var(--text); text-decoration: underline; text-decoration-color: #ccc; text-underline-offset: 3px; }
.project-metric { font-size: 13px; color: #888; white-space: nowrap; }
.project-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

/* ABOUT */
.about-section { margin-bottom: 24px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #333; padding: 4px 0; border-bottom: 1px solid #f5f5f5; }
.strengths-list li:last-child { border-bottom: none; }
.skills-grid { font-size: 13px; color: var(--text-muted); line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.skills-list { font-size: 13px; color: var(--text-muted); }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* EDUCATION */
.education-entry { font-size: 14px; color: #444; margin-bottom: 6px; line-height: 1.5; }

/* FOOTER */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); padding-bottom: 24px; }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-decoration-color: #ccc; }
footer a:hover { color: var(--footer-link-hover); text-decoration-color: var(--text); }

/* PRINT */
@media print { nav, footer, .hero-links { display: none; } .wrap { padding: 1rem; width: 100%; max-width: none; } .hero-gradient { background: none; padding: 24px 0; } .hero-name-row.outline, .hero-name-row.light-outline { -webkit-text-stroke: 1px #000; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; }
  nav { padding: 16px 20px; font-size: 13px; gap: 12px; }
  .hero-gradient { padding: 48px 20px 40px; }
  .hero-name-row.outline { font-size: 38px; }
  .hero-name-row.filled { font-size: 50px; }
  .hero-name-row.light-outline { font-size: 34px; }
  .hero-headline { font-size: 14px; }
  .content { padding: 24px 20px 32px; }
  h2 { font-size: 18px; }
  .exp-company-header { flex-direction: column; }
  .exp-role-header { flex-direction: column; }
  .entry-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  .skills-grid { column-count: 2; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  nav { padding: 12px 16px; font-size: 12px; gap: 8px; }
  nav .site-name { font-size: 18px; }
  .hero-gradient { padding: 32px 16px 28px; }
  .hero-name-row.outline { font-size: 26px; -webkit-text-stroke: 0.8px #2a2a2a; }
  .hero-name-row.filled { font-size: 36px; }
  .hero-name-row.light-outline { font-size: 24px; -webkit-text-stroke: 0.6px #aaa; }
  .hero-headline { font-size: 13px; }
  .content { padding: 16px 16px 24px; }
  h2 { font-size: 16px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
  .exp-company { font-size: 15px; }
  .exp-role { font-size: 13px; }
  .exp-bullets { font-size: 13px; }
  .entry-title { font-size: 15px; }
}
`;
}
