/** styles/ember.mjs — Blog-forward hot pink style */
export const name = 'ember';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #fff;
  --bg-alt: #fafafa;
  --bg-card: #fff;
  --bg-nav: rgba(255, 255, 255, 0.92);
  --bg-sidebar: transparent;

  /* Text */
  --text: #222;
  --text-muted: #555;
  --text-faint: #999;

  /* Accent */
  --accent: #d23669;
  --accent-hover: #b82d5a;

  /* Borders */
  --border: #eee;
  --border-light: #f0f0f0;

  /* Typography */
  --font-display: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-body: Merriweather, Georgia, serif;
  --font-mono: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

  /* Spacing */
  --wrap-width: 672px;
  --nav-height: 48px;

  /* Footer */
  --footer-text: #666;
  --footer-link: #d23669;
  --footer-link-hover: #b82d5a;
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.7; font-size: 18px; }
a { color: var(--accent); text-decoration: underline; text-decoration-color: var(--accent); text-underline-offset: 3px; }
a:hover { color: var(--accent-hover); text-decoration-color: var(--text); }
h2 { font-family: var(--font-display); font-weight: 900; font-size: 28px; color: var(--accent); margin: 48px 0 16px; line-height: 1.3; letter-spacing: -0.5px; }
h2 a { color: var(--accent); text-decoration: none; }
h2 a:hover { text-decoration: underline; text-decoration-color: var(--accent); }
h3 { font-family: var(--font-display); font-weight: 900; font-size: 20px; color: var(--accent); margin: 32px 0 8px; line-height: 1.3; }
.site-name { font-family: var(--font-display); font-weight: 900; font-size: 24px; color: var(--text); text-decoration: none; letter-spacing: -0.5px; }
.site-name:hover { color: var(--accent); }

/* ---- NAV ---- */
nav { display: flex; align-items: baseline; margin-bottom: 56px; gap: 20px; flex-wrap: wrap; }
nav .site-name { margin-right: auto; }
nav a { font-family: var(--font-mono); color: var(--text); text-decoration: none; font-size: 14px; font-weight: 500; }
nav a:hover { color: var(--accent); }
nav .active { color: var(--accent); font-weight: 700; }
nav span.active { font-family: var(--font-mono); font-size: 14px; }

/* ---- HOME BIO ---- */
.home-bio { font-size: 1rem; color: var(--text); line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: var(--accent); }

/* ---- BLOG-STYLE ENTRIES ---- */
.post-list { margin-top: 8px; }
.post-entry { margin-bottom: 48px; }
.post-entry .post-title { font-family: var(--font-display); font-weight: 900; font-size: 28px; color: var(--accent); line-height: 1.3; letter-spacing: -0.5px; margin-bottom: 4px; }
.post-entry .post-title a { color: var(--accent); text-decoration: none; }
.post-entry .post-title a:hover { text-decoration: underline; text-decoration-color: var(--accent); }
.post-entry .post-date { font-family: var(--font-mono); font-size: 14px; color: var(--text-faint); margin-bottom: 6px; }
.post-entry .post-desc { font-size: 1rem; color: var(--text-muted); line-height: 1.7; }
.post-entry .post-metric { font-family: var(--font-mono); font-size: 13px; color: var(--text-faint); margin-top: 2px; }

/* ---- EXPERIENCE ---- */
.exp-group { margin-bottom: 48px; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-company { font-family: var(--font-display); font-weight: 900; font-size: 22px; color: var(--accent); letter-spacing: -0.3px; }
.exp-span { font-family: var(--font-mono); font-size: 14px; color: var(--text-faint); white-space: nowrap; }
.exp-role { font-weight: 700; font-size: 1rem; color: var(--text); margin-top: 8px; }
.exp-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.exp-role-date { font-family: var(--font-mono); font-size: 13px; color: var(--text-faint); white-space: nowrap; }
.exp-bullets { margin: 8px 0 0 0; padding-left: 20px; list-style: disc; }
.exp-bullets li { font-size: 0.9rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 4px; }
.exp-sub { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
.exp-sub:first-child { margin-top: 8px; padding-top: 0; border-top: none; }

/* ---- ENTRIES (standardized) ---- */
.entry { margin-bottom: 48px; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: var(--font-display); font-weight: 900; font-size: 22px; color: var(--accent); }
.entry-date { font-family: var(--font-mono); font-size: 14px; color: var(--text-faint); white-space: nowrap; }
.entry-role { font-weight: 700; font-size: 1rem; color: var(--text); margin-top: 8px; }
.entry-desc { font-size: 1rem; color: var(--text-muted); line-height: 1.7; }
.entry li { font-size: 0.9rem; color: var(--text-muted); line-height: 1.65; margin-bottom: 4px; }
.sub-entry { margin-top: 16px; padding-top: 16px; border-top: 1px solid var(--border); }
.sub-entry:first-child { margin-top: 8px; padding-top: 0; border-top: none; }
.sub-entry .entry-role { font-weight: 700; color: var(--text); }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: var(--font-mono); font-size: 13px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* ---- ABOUT ---- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 1rem; color: var(--text); padding: 6px 0; border-bottom: 1px solid var(--border-light); }
.strengths-list li:last-child { border-bottom: none; }
.skills-list { font-family: var(--font-mono); font-size: 14px; color: var(--text-muted); line-height: 1.5; }
.skills-grid { font-family: var(--font-mono); font-size: 14px; color: var(--text-muted); line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 1rem; }
.contact-line a { margin-right: 16px; }

/* ---- EDUCATION ---- */
.edu-entry { font-size: 1rem; color: var(--text); margin-bottom: 8px; line-height: 1.6; }

/* ---- FOOTER ---- */
footer { margin-top: 56px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-family: var(--font-mono); font-size: 13px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: none; }
footer a:hover { color: var(--footer-link-hover); text-decoration: underline; }

/* ---- DARK MODE ---- */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: rgb(40, 44, 53);
    --bg-alt: rgb(45, 49, 58);
    --bg-card: rgb(50, 54, 63);
    --text: rgba(255,255,255,0.88);
    --text-muted: rgba(255,255,255,0.6);
    --text-faint: rgba(255,255,255,0.5);
    --accent: #ffa7c4;
    --accent-hover: #ff8ab0;
    --border: rgba(255,255,255,0.1);
    --border-light: rgba(255,255,255,0.1);
    --footer-text: rgba(255,255,255,0.6);
    --footer-link: #ffa7c4;
    --footer-link-hover: #ff8ab0;
    --footer-border: rgba(255,255,255,0.1);
    --bg-nav: rgba(40, 44, 53, 0.92);
  }
  body { background: var(--bg); color: var(--text); }
  .site-name { color: #fff; }
  .site-name:hover { color: var(--accent); }
  nav a { color: var(--text); }
  nav a:hover { color: var(--accent); }
  .home-bio { color: var(--text); }
  .home-bio a { color: var(--accent); }
  .post-entry .post-title { color: var(--accent); }
  .post-entry .post-title a { color: var(--accent); }
  .exp-company { color: var(--accent); }
  .exp-role { color: #fff; }
  .entry-title { color: var(--accent); }
  .entry-role { color: #fff; }
  .strengths-list li { color: var(--text); }
  .edu-entry { color: var(--text); }
}

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  html { font-size: 16px; }
  nav { font-size: 13px; gap: 14px; margin-bottom: 36px; }
  nav .site-name { font-size: 20px; }
  h2 { font-size: 24px; margin: 36px 0 12px; }
  h3 { font-size: 18px; }
  .post-entry { margin-bottom: 36px; }
  .post-entry .post-title { font-size: 24px; }
  .exp-company { font-size: 20px; }
  .entry-title { font-size: 20px; }
  .exp-header { flex-direction: column; gap: 2px; }
  .exp-role-header { flex-direction: column; gap: 2px; }
  .entry-header { flex-direction: column; gap: 2px; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 0.95rem; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav .site-name { font-size: 18px; }
  nav { gap: 10px; }
  h2 { font-size: 20px; }
  h3 { font-size: 16px; }
  .post-entry .post-title { font-size: 20px; }
  .exp-company { font-size: 18px; }
  .entry-title { font-size: 18px; }
  .exp-role { font-size: 0.9rem; }
  .exp-bullets li { font-size: 0.85rem; }
  .home-bio { font-size: 0.9rem; }
  .strengths-list li { font-size: 0.9rem; }
  .skills-grid { column-count: 1; }
}`;
}
