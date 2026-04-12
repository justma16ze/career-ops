/** styles/prose.mjs — Literary aesthetic */
export const name = 'prose';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #f4f4f3;
  --bg-alt: #eeeeed;
  --bg-card: #fff;
  --bg-nav: transparent;
  --bg-sidebar: transparent;

  /* Text */
  --text: #3f3f6d;
  --text-muted: rgba(63,63,109,0.7);
  --text-faint: rgba(63,63,109,0.55);

  /* Accent */
  --accent: #4fc08d;
  --accent-hover: #42a97b;

  /* Borders */
  --border: rgba(63,63,109,0.1);
  --border-light: rgba(63,63,109,0.08);

  /* Typography */
  --font-display: 'Instrument Serif', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, 'Times New Roman', serif;
  --font-mono: 'Source Serif 4', Georgia, serif;

  /* Spacing */
  --wrap-width: 620px;
  --nav-height: 48px;

  /* Footer */
  --footer-text: rgba(63,63,109,0.65);
  --footer-link: #3f3f6d;
  --footer-link-hover: var(--accent);
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.75; font-size: 17px; }
a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(63,63,109,0.3); transition: color 0.15s, text-decoration-color 0.15s; }
a:hover { color: var(--accent); text-decoration-color: var(--accent); }
h2 { font-family: var(--font-display); font-style: italic; font-size: 22px; font-weight: 400; color: var(--text); margin: 48px 0 16px; }
h2:first-child { margin-top: 0; }
.site-name { font-family: var(--font-display); font-style: italic; font-size: 24px; color: var(--text); text-decoration: none; }
.site-name:hover { color: var(--accent); }

/* ---- NAV ---- */
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 48px; font-size: 15px; }
nav .site-name { margin-right: auto; }
nav a { color: var(--text); text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(63,63,109,0.25); }
nav a:hover { color: var(--accent); text-decoration-color: var(--accent); }
nav .active { color: var(--text); text-decoration: underline; text-underline-offset: 5px; text-decoration-color: var(--text); text-decoration-thickness: 2px; font-weight: 600; }

/* ---- HERO ---- */
.hero-name { font-family: var(--font-display); font-style: italic; font-size: 4.5em; font-weight: 400; color: var(--text); line-height: 1.1; margin-bottom: 12px; letter-spacing: -0.01em; }
.hero-headline { font-size: 17px; color: var(--text-faint); font-style: italic; margin-bottom: 40px; }

/* ---- PROSE ---- */
.prose { font-size: 17px; color: var(--text); line-height: 1.75; margin-bottom: 32px; }
.prose p { margin-bottom: 16px; }
.prose a { color: var(--text); }
.prose a:hover { color: var(--accent); }

/* ---- HOME BIO ---- */
.home-bio { font-size: 17px; color: var(--text); line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: var(--text); }
.home-bio a:hover { color: var(--accent); }

/* ---- ENTRIES ---- */
.entry { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid var(--border); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: var(--font-body); font-weight: 600; font-size: 17px; color: var(--text); }
.entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: rgba(63,63,109,0.3); }
.entry-title a:hover { color: var(--accent); text-decoration-color: var(--accent); }
.entry-date { font-size: 14px; color: var(--text-faint); white-space: nowrap; font-style: italic; font-family: var(--font-mono); }
.entry-role { font-size: 15px; color: var(--text-muted); font-style: italic; margin-bottom: 6px; }
.entry-desc { font-size: 16px; color: rgba(63,63,109,0.8); line-height: 1.7; }
.entry ul { margin: 8px 0 0 0; padding-left: 20px; font-size: 16px; color: rgba(63,63,109,0.8); list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.65; }

/* ---- SUB-ENTRIES ---- */
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 600; font-style: normal; font-size: 15px; color: var(--text); }
.sub-entry .entry-date { font-size: 13px; }

/* ---- DETAILS ---- */
details { margin-top: 8px; }
details summary { cursor: pointer; font-size: 13px; color: var(--text-faint); list-style: none; font-style: italic; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* ---- STRENGTHS ---- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 16px; color: rgba(63,63,109,0.85); padding: 4px 0; line-height: 1.65; }

/* ---- SKILLS ---- */
.skills-list { font-size: 15px; color: var(--text-muted); line-height: 1.5; }
.skills-grid { font-size: 15px; color: var(--text-muted); line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 16px; }
.contact-line a { text-decoration-color: rgba(63,63,109,0.3); }
.contact-line .sep { color: rgba(63,63,109,0.3); margin: 0 12px; }

/* ---- FOOTER ---- */
footer { margin-top: 56px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-size: 13px; color: var(--footer-text); font-style: italic; }
footer a { color: var(--footer-link); font-weight: 700; font-style: italic; }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } .hero-name { font-size: 2.5em; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  .hero-name { font-size: 3em; margin-bottom: 8px; }
  .hero-headline { font-size: 16px; margin-bottom: 24px; }
  nav { font-size: 14px; gap: 12px; }
  .entry-header { flex-direction: column; }
  .entry-date { margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 16px; }
  .prose { font-size: 16px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  .hero-name { font-size: 2.4em; margin-bottom: 6px; }
  .hero-headline { font-size: 14px; margin-bottom: 18px; }
  nav .site-name { font-size: 20px; }
  nav { font-size: 13px; gap: 8px; }
  h2 { font-size: 18px; }
  .entry-title { font-size: 16px; }
  .entry-desc { font-size: 15px; }
  .entry ul { font-size: 15px; }
  .home-bio { font-size: 15px; }
  .prose { font-size: 15px; }
  .strengths-list li { font-size: 15px; }
  .skills-grid { column-count: 1; }
}`;
}
