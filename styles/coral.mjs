/**
 * styles/coral.mjs — Warm Maker-Culture Zine aesthetic
 *
 * Bold condensed serif hero, coral/salmon background outside,
 * white centered column, warm maker-culture zine feel.
 * Strong typographic identity from one color + one bold font.
 */

export const name = 'coral';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:wght@400;600&family=Source+Sans+3:wght@400;600&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #fff;
  --bg-alt: #fff8f6;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #1a1a1a;
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #c0402a;
  --accent-hover: #ff6b4a;

  /* Borders */
  --border: #e8e0da;
  --border-light: #f0ebe6;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;
  --font-mono: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif;

  /* Spacing */
  --wrap-width: 640px;
  --nav-height: auto;

  /* Footer — light bg */
  --footer-text: #666;
  --footer-link: #444;
  --footer-link-hover: #c0402a;
  --footer-border: var(--border);
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; background: #ff6b4a; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.7; margin: 0 auto; padding: 0; font-size: 15px; max-width: var(--wrap-width); min-height: 100vh; box-shadow: 0 0 40px rgba(0,0,0,0.08); }
.wrap { width: var(--wrap-width); padding: 32px 40px 48px; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--accent); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent-hover); }

/* NAV */
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid var(--border); font-family: var(--font-mono); font-size: 14px; }
.site-name { font-family: var(--font-display); font-size: 22px; font-weight: 900; color: #ff6b4a; text-decoration: none; margin-right: auto; letter-spacing: -0.5px; }
nav .site-name:hover { color: var(--accent); }
nav a { color: var(--text-muted); text-decoration: none; font-weight: 600; }
nav a:hover { color: #ff6b4a; }
nav .active { color: var(--text); border-bottom: 2px solid #ff6b4a; padding-bottom: 2px; }

/* HEADINGS */
h1.hero-name { font-family: var(--font-display); font-size: 52px; font-weight: 900; color: #ff6b4a; line-height: 1.08; margin-bottom: 10px; letter-spacing: -1px; }
h2 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 1px solid var(--border); }

/* HOME BIO */
.home-bio { font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--accent); }
.hero-headline { font-family: var(--font-mono); font-size: 16px; color: #666; margin-bottom: 32px; font-weight: 400; line-height: 1.5; }

/* ENTRIES */
.entry { padding: 16px 0; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-family: var(--font-display); font-weight: 700; font-size: 16px; color: var(--text); line-height: 1.3; }
.entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: #ddd; text-underline-offset: 3px; }
.entry-title a:hover { text-decoration-color: #ff6b4a; color: #ff6b4a; }
.entry-date { font-family: var(--font-mono); font-size: 13px; color: var(--text-faint); white-space: nowrap; }
.entry-role { font-size: 14px; color: #777; font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
.entry ul { margin: 6px 0 0 0; padding-left: 18px; font-size: 14px; color: var(--text-muted); list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.6; color: var(--text-muted); }
.entry li::marker { color: #ff6b4a; }

/* SUB ENTRIES */
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 14px; color: var(--text); }
.sub-entry .entry-date { font-size: 12px; }

/* DETAILS */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; font-family: var(--font-mono); }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* ABOUT */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 4px 0 4px 22px; line-height: 1.6; position: relative; }
.strengths-list li::before { content: '\\2014'; color: #ff6b4a; position: absolute; left: 0; }
.skills-grid { font-family: var(--font-mono); font-size: 14px; color: var(--text-muted); line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.skills-list { font-size: 14px; color: var(--text-muted); }
.contact-line { font-size: 15px; }
.contact-line a { margin-right: 20px; color: var(--accent); }
.hero-metric { font-family: var(--font-mono); font-size: 13px; color: #ff6b4a; font-weight: 600; }

/* FOOTER */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-family: var(--font-mono); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-decoration-color: #ddd; }
footer a:hover { color: var(--footer-link-hover); text-decoration-color: var(--footer-link-hover); }

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } body { background: #fff; box-shadow: none; max-width: none; } html { background: #fff; } h1.hero-name { color: var(--text); } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  body { max-width: 100%; }
  .wrap { width: 100% !important; padding: 20px 24px; }
  h1.hero-name { font-size: 36px; }
  nav { font-size: 13px; gap: 12px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 15px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1.hero-name { font-size: 28px; }
  nav .site-name { font-size: 18px; }
  h2 { font-size: 16px; }
  nav { font-size: 12px; gap: 8px; }
  .entry-title { font-size: 14px; }
  .entry-desc { font-size: 13px; }
  .entry ul { font-size: 13px; }
  .home-bio { font-size: 14px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
  .hero-headline { font-size: 14px; }
}
`;
}
