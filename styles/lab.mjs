/** styles/lab.mjs — Research Lab aesthetic */
export const name = 'lab';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Source+Sans+3:wght@400;600&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #f8f6f1;
  --bg-alt: #f7f5f0;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #1a1a1a;
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #1a1a1a;
  --accent-hover: #333;

  /* Borders */
  --border: #ccc;
  --border-light: #eee;

  /* Typography */
  --font-display: Georgia, serif;
  --font-body: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;
  --font-mono: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace;

  /* Spacing */
  --wrap-width: 620px;
  --nav-height: 48px;

  /* Footer */
  --footer-text: #666;
  --footer-link: #1a1a1a;
  --footer-link-hover: #333;
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; font-size: 14px; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #bbb; }
a:hover { color: var(--accent-hover); text-decoration-color: var(--text); }
h2 { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text); margin: 36px 0 12px; }
.site-name { font-family: var(--font-display); font-size: 26px; color: var(--text); text-decoration: none; }

/* ---- NAV ---- */
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; margin-bottom: 24px; font-size: 14px; }
nav .site-name { margin-right: auto; }
nav a { color: var(--text); text-decoration: underline; text-underline-offset: 6px; text-decoration-color: var(--border); }
nav a:hover { text-decoration-color: var(--text); }
nav .active { text-decoration-color: var(--text); text-decoration-thickness: 2px; }

/* ---- INTRO/BIO ---- */
.intro { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.intro p { margin-bottom: 12px; }
.intro a { color: var(--text); }
.home-bio { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--text); }

/* ---- TIMELINE ---- */
.timeline { position: relative; margin-left: 6px; padding-left: 28px; border-left: 1px solid var(--border); margin-top: 24px; }

/* ---- ENTRIES ---- */
.entry { position: relative; padding: 14px 16px; margin-bottom: 12px; margin-left: 0; background: var(--bg-card); }
.entry::before { content: ''; position: absolute; left: -37px; top: 20px; width: 8px; height: 8px; background: #333; border-radius: 50%; border: 2px solid var(--bg); }
.entry:hover { background: var(--bg-alt); }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 700; font-size: 14px; color: var(--text); }
.entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: var(--border); text-underline-offset: 3px; }
.entry-date { font-size: 12px; color: var(--text-faint); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 13px; color: #888; font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
.entry ul { margin: 6px 0 0 0; padding-left: 16px; font-size: 13px; color: var(--text-muted); list-style: disc; }
.entry li { margin-bottom: 3px; line-height: 1.5; }

/* ---- SUB-ENTRIES ---- */
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 13px; color: var(--text); }
.sub-entry .entry-date { font-size: 11px; }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* ---- STRENGTHS ---- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #333; padding: 3px 0; }

/* ---- SKILLS ---- */
.skills-list { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: var(--text-muted); line-height: 1.4; }
.skills-grid { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: var(--text-muted); line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.team-grid { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #333; line-height: 1.4; column-count: 3; column-gap: 24px; }
.team-grid span { display: block; padding: 2px 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* ---- FOOTER ---- */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  nav { font-size: 13px; gap: 12px; flex-wrap: wrap; }
  .timeline { margin-left: 0; padding-left: 20px; }
  .entry { padding: 12px; }
  .entry::before { left: -27px; top: 18px; width: 6px; height: 6px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .team-grid { column-count: 2; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav .site-name { font-size: 20px; }
  h2 { font-size: 14px; }
  nav { font-size: 12px; gap: 8px; }
  .timeline { padding-left: 16px; }
  .entry { padding: 10px; }
  .entry::before { left: -22px; width: 5px; height: 5px; }
  .entry-title { font-size: 13px; }
  .entry-desc { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 12px; }
  .team-grid { column-count: 1; }
  .skills-grid { column-count: 1; }
}`;
}
