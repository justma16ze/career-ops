/** styles/volt.mjs — Sharp + Bold style (product launch energy) */
export const name = 'volt';
export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,700,800&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #fefefe;
  --bg-alt: #fafafa;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #0a0a0a;
  --text-muted: #555;
  --text-faint: #aaa;

  /* Accent */
  --accent: #e11d48;
  --accent-hover: #be123c;

  /* Borders */
  --border: #eee;
  --border-light: #f5f5f5;

  /* Typography */
  --font-display: 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --wrap-width: 640px;
  --nav-height: 48px;

  /* Footer */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: var(--accent);
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; font-size: 15px; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(225,29,72,0.4); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent); }
h2 { font-family: var(--font-display); font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-faint); margin: 40px 0 16px; }
.site-name { font-family: var(--font-display); font-size: 18px; font-weight: 800; color: var(--text); text-decoration: none; letter-spacing: -0.02em; }

/* ---- NAV ---- */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; font-size: 14px; font-weight: 400; }
nav .site-name { margin-right: auto; }
nav a { color: #666; text-decoration: none; }
nav a:hover { color: var(--text); }
nav .active { color: var(--text); font-weight: 700; }

/* ---- HERO ---- */
.hero h1 { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: var(--text); margin-bottom: 12px; }
.hero .divider { width: 48px; height: 3px; background: var(--accent); margin-bottom: 16px; }
.hero .headline { font-size: 17px; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px; }
.hero .meta { font-size: 13px; color: var(--text-faint); margin-bottom: 32px; }
.hero .meta a { color: var(--accent); font-size: 13px; }
.hero-headline { font-size: 17px; color: var(--text-muted); line-height: 1.5; margin-bottom: 8px; }

/* ---- HOME BIO ---- */
.home-bio { font-size: 16px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--accent); }

/* ---- PROJECT CARDS ---- */
.project { padding: 20px 0; border-bottom: 1px solid var(--border); }
.project:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.project-name { font-size: 16px; font-weight: 700; color: var(--text); }
.project-name a { color: var(--text); text-decoration: none; border-bottom: 2px solid var(--accent); padding-bottom: 1px; }
.project-name a:hover { border-color: var(--text); }
.project-metric { font-size: 13px; color: var(--accent); font-weight: 700; white-space: nowrap; }
.project-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

/* ---- EXPERIENCE ---- */
.exp-group { padding: 20px 0; border-bottom: 1px solid var(--border); }
.exp-group:last-child { border-bottom: none; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-company { font-size: 16px; font-weight: 800; color: var(--text); letter-spacing: -0.01em; }
.exp-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.exp-role { font-size: 14px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px; }
.exp-bullets { margin: 6px 0 0; padding-left: 18px; font-size: 13px; color: var(--text-muted); list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.5; }
.sub-role { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid var(--border-light); }
.sub-role:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-role .exp-header { margin-bottom: 2px; }

/* ---- ENTRIES (standardized) ---- */
.entry { padding: 20px 0; border-bottom: 1px solid var(--border); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-weight: 700; font-size: 16px; color: var(--text); }
.entry-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 14px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px; }
.entry-desc { font-size: 14px; color: var(--text-muted); line-height: 1.6; }
.entry ul { margin: 6px 0 0; padding-left: 18px; font-size: 13px; color: var(--text-muted); list-style: disc; }
.entry li { margin-bottom: 3px; line-height: 1.5; }
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 800; color: var(--text); }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* ---- ABOUT ---- */
.about-text { font-size: 15px; color: #333; line-height: 1.7; margin-bottom: 12px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 6px 0; border-bottom: 1px solid var(--border); }
.strengths-list li:last-child { border-bottom: none; }
.skills-list { font-size: 13px; color: var(--text-faint); line-height: 1.4; }
.skills-grid { font-size: 13px; color: var(--text-faint); line-height: 1.4; column-count: 3; column-gap: 20px; }
.skills-grid span { display: block; padding: 2px 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* ---- EDUCATION ---- */
.edu { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 6px; }

/* ---- FOOTER ---- */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-size: 11px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  nav { font-size: 13px; gap: 14px; }
  .hero h1 { font-size: 32px; }
  .hero .headline { font-size: 15px; }
  .hero-headline { font-size: 15px; }
  .exp-header { flex-direction: column; }
  .project-header { flex-direction: column; }
  .entry-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 15px; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav .site-name { font-size: 16px; }
  nav { font-size: 12px; gap: 10px; }
  .hero h1 { font-size: 28px; }
  .hero .headline { font-size: 14px; }
  .hero-headline { font-size: 14px; }
  h2 { font-size: 12px; }
  .project-name { font-size: 14px; }
  .exp-company { font-size: 14px; }
  .exp-role { font-size: 13px; }
  .exp-bullets { font-size: 12px; }
  .entry-title { font-size: 14px; }
  .home-bio { font-size: 14px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
}`;
}
