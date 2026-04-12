/** styles/almanac.mjs — Table of Contents style */
export const name = 'almanac';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #f4f0e8;
  --bg-alt: #efe9df;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #2a2520;
  --text-muted: #6b6054;
  --text-faint: #8a7f71;

  /* Accent */
  --accent: #2a2520;
  --accent-hover: #4a443d;

  /* Borders */
  --border: #d6cfc2;
  --border-light: #d6cfc2;

  /* Typography */
  --font-display: 'Playfair Display SC', 'Playfair Display', Georgia, serif;
  --font-body: 'EB Garamond', Georgia, 'Times New Roman', serif;
  --font-mono: 'EB Garamond', Georgia, serif;

  /* Spacing */
  --wrap-width: 620px;
  --nav-height: 48px;

  /* Footer */
  --footer-text: #665c50;
  --footer-link: #2a2520;
  --footer-link-hover: #4a443d;
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.7; font-size: 16px; }
a { color: var(--text); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #c4b9a8; transition: text-decoration-color 0.2s; }
a:hover { color: var(--accent-hover); text-decoration-color: var(--text); }
h2 { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: var(--text); margin: 40px 0 16px; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px dotted #c4b9a8; padding-bottom: 8px; }
.site-name { font-family: var(--font-display); font-size: 56px; font-weight: 900; letter-spacing: 0.04em; color: var(--text); text-decoration: none; display: block; line-height: 1.1; }
.site-name:hover { text-decoration: none; }

/* ---- NAV (TOC-style) ---- */
nav { margin-bottom: 52px; text-align: center; }
nav .site-name { margin-bottom: 8px; }
nav .subtitle { font-family: var(--font-body); font-size: 15px; font-style: italic; color: var(--text-muted); letter-spacing: 0.04em; margin-bottom: 40px; display: block; }
nav .toc-list { list-style: none; padding: 0; margin: 0 auto; max-width: 380px; text-align: left; }
nav .toc-item { display: flex; align-items: baseline; gap: 0; margin-bottom: 10px; font-family: var(--font-body); font-size: 15px; letter-spacing: 0.1em; text-transform: uppercase; }
nav .toc-item a, nav .toc-item span.active-label { flex-shrink: 0; color: var(--text); text-decoration: none; }
nav .toc-item a:hover { text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--text); }
nav .toc-item .active-label { font-weight: 600; }
nav .toc-leader { flex: 1; overflow: hidden; margin: 0 8px; border-bottom: none; white-space: nowrap; color: #b0a898; font-size: 13px; letter-spacing: 0.2em; line-height: 1; }
nav .toc-numeral { flex-shrink: 0; font-size: 15px; color: var(--text-muted); letter-spacing: 0.06em; font-variant-numeric: oldstyle-nums; }

/* ---- MAIN ---- */
main { margin-top: 8px; }

/* ---- HOME BIO ---- */
.home-bio { font-size: 17px; color: #3a342d; line-height: 1.85; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--text); text-decoration-color: #c4b9a8; }

/* ---- INTRO ---- */
.intro { font-size: 17px; color: #3a342d; line-height: 1.85; margin-bottom: 32px; }
.intro p { margin-bottom: 14px; }

/* ---- ENTRIES ---- */
.entry { padding: 18px 0; border-bottom: 1px dotted var(--border); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 16px; color: var(--text); }
.entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: #c4b9a8; text-underline-offset: 3px; }
.entry-title a:hover { text-decoration-color: var(--text); }
.entry-date { font-size: 14px; color: var(--text-faint); white-space: nowrap; font-style: italic; font-family: var(--font-mono); }
.entry-role { font-size: 15px; color: var(--text-muted); font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 15px; color: #4a443d; line-height: 1.75; }
.entry ul { margin: 8px 0 0 0; padding-left: 20px; font-size: 15px; color: #4a443d; list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.65; }
.entry li::marker { color: #c4b9a8; }

/* ---- SUB-ENTRIES ---- */
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px dotted var(--border); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 600; font-style: normal; font-size: 15px; color: var(--text); }
.sub-entry .entry-date { font-size: 13px; }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 13px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* ---- PROJECTS ---- */
.project-entry { padding: 18px 0; border-bottom: 1px dotted var(--border); }
.project-entry:last-child { border-bottom: none; }

/* ---- ABOUT ---- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 16px; color: #3a342d; padding: 5px 0; border-bottom: 1px dotted var(--border); }
.strengths-list li:last-child { border-bottom: none; }
.skills-list { font-size: 15px; color: #4a443d; line-height: 1.5; }
.skills-grid { font-size: 15px; color: #4a443d; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 16px; }
.contact-line a { margin-right: 24px; }

/* ---- EDUCATION ---- */
.education-entry { font-size: 15px; color: #3a342d; padding: 6px 0; line-height: 1.7; }

/* ---- FOOTER ---- */
footer { margin-top: 48px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); text-align: center; letter-spacing: 0.04em; }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-decoration-color: #c4b9a8; text-underline-offset: 3px; }
footer a:hover { color: var(--footer-link-hover); text-decoration-color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  nav .site-name { font-size: 38px; }
  nav .subtitle { font-size: 14px; margin-bottom: 24px; }
  nav .toc-list { max-width: 100%; }
  nav .toc-item { font-size: 14px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 16px; }
  h2 { font-size: 18px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav .site-name { font-size: 30px; }
  nav .subtitle { font-size: 13px; margin-bottom: 20px; }
  nav .toc-item { font-size: 13px; }
  nav .toc-numeral { font-size: 12px; }
  h2 { font-size: 16px; }
  .entry-title { font-size: 15px; }
  .entry-desc { font-size: 14px; }
  .entry ul { font-size: 14px; }
  .home-bio { font-size: 15px; }
  .strengths-list li { font-size: 14px; }
  .skills-grid { column-count: 1; }
}`;
}
