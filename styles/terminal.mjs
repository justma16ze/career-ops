/** styles/terminal.mjs — Claude Code Energy style (dark, monospace, gold accent) */
export const name = 'terminal';
export const fonts = [
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
];
export function css() {
  return `:root {
  /* Backgrounds */
  --bg: #0d0d0d;
  --bg-alt: #181818;
  --bg-card: #151515;
  --bg-nav: rgba(13,13,13,0.92);
  --bg-sidebar: transparent;

  /* Text */
  --text: #d4d4d4;
  --text-muted: #888;
  --text-faint: #555;

  /* Accent */
  --accent: #e8c473;
  --accent-hover: #f0d48b;

  /* Borders */
  --border: #222;
  --border-light: #1a1a1a;

  /* Typography */
  --font-display: 'General Sans', sans-serif;
  --font-body: 'JetBrains Mono', monospace;
  --font-mono: 'JetBrains Mono', monospace;

  /* Spacing */
  --wrap-width: 800px;
  --nav-height: 48px;

  /* Footer — dark bg: accent color for link */
  --footer-text: #aaa;
  --footer-link: #e8c473;
  --footer-link-hover: #f0d48b;
  --footer-border: var(--border);
}

/* ---- BASE ---- */
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; position: relative; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba(232,196,115,0.3); }
a:hover { color: var(--accent-hover); text-decoration-color: var(--accent); }
h2 { font-family: var(--font-display); font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); margin: 24px 0 12px; }
.site-name { font-family: var(--font-body); color: var(--text); text-decoration: none; font-weight: 500; }

/* ---- STAR PARTICLES ---- */
body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    radial-gradient(2px 2px at 8% 15%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 22% 55%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 48% 8%, rgba(232,196,115,0.35) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 65% 35%, rgba(255,255,255,0.25) 0%, transparent 100%),
    radial-gradient(2px 2px at 88% 72%, rgba(255,255,255,0.18) 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 12% 82%, rgba(232,196,115,0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 42% 42%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(2px 2px at 78% 12%, rgba(255,255,255,0.22) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 55% 68%, rgba(232,196,115,0.2) 0%, transparent 100%),
    radial-gradient(2px 2px at 35% 28%, rgba(255,255,255,0.15) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 92% 45%, rgba(232,196,115,0.25) 0%, transparent 100%),
    radial-gradient(2px 2px at 18% 95%, rgba(255,255,255,0.2) 0%, transparent 100%);
}
.wrap { position: relative; z-index: 1; }

/* ---- NAV ---- */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 24px; border-bottom: 1px solid var(--border); font-size: 13px; }
nav .site-name { margin-right: auto; }
nav a { color: #444; text-decoration: none; } nav a:hover { color: var(--text); }
nav .active { color: var(--accent); font-weight: 500; }

/* ---- PROMPT / CURSOR ---- */
.prompt { color: var(--text-faint); }
.accent { color: var(--accent); }
h1 { font-size: 24px; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; color: #e5e5e5; }
h1 .cursor { display: inline-block; width: 10px; height: 24px; background: var(--accent); margin-left: 4px; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.status-line { font-size: 12px; color: var(--text-faint); }
.status-line span { color: var(--accent); }

/* ---- LOG ENTRIES ---- */
.log-entry { display: grid; grid-template-columns: 90px 1fr; gap: 12px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid var(--border-light); }
.log-entry:last-child { border-bottom: none; }
.log-date { font-size: 11px; color: #3a3a3a; padding-top: 2px; }
.log-content h3 { font-size: 14px; font-weight: 500; color: var(--text); margin-bottom: 2px; }
.log-content p { font-size: 12px; color: var(--text-muted); }
.log-content .delta { color: var(--accent); font-weight: 500; }

/* ---- SHIP ENTRIES ---- */
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
.ship-entry { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light); }
.ship-entry:last-child { border-bottom: none; }
.ship-entry h3 { font-size: 15px; font-weight: 700; color: var(--accent); margin-bottom: 6px; }
.ship-entry h3 a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(232,196,115,0.3); }
.ship-entry p { font-size: 12px; color: var(--text-muted); line-height: 1.6; }
.ship-entry .delta { color: var(--text); font-weight: 400; font-size: 12px; margin-top: 6px; }
p { margin-bottom: 6px; } p:last-child { margin-bottom: 0; }

/* ---- HERO ---- */
.hero { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid var(--border); }
.hero-headline { font-size: 12px; color: var(--text-muted); }

/* ---- HOME BIO ---- */
.home-bio { font-size: 14px; color: #bbb; line-height: 1.8; margin-top: 8px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--accent); }

/* ---- EXPERIENCE ---- */
.job { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid var(--border-light); }
.job:last-child { border-bottom: none; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.job-header strong { font-size: 15px; color: var(--accent); }
.date { font-size: 11px; color: var(--accent); white-space: nowrap; }
.role { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.sub-role { margin-top: 20px; padding-top: 0; }
.sub-role:first-child { margin-top: 8px; }
.sub-role-header { margin-bottom: 8px; }
.sub-role-header .role { color: var(--accent); font-weight: 700; font-size: 13px; display: block; margin-bottom: 2px; }
.sub-role-header .date { display: block; color: var(--text-faint); }
ul { margin: 6px 0 0 18px; } li { font-size: 12px; color: #777; margin-bottom: 4px; line-height: 1.5; }

/* ---- ENTRIES (standardized) ---- */
.entry { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.entry-title { font-weight: 700; font-size: 15px; color: var(--accent); }
.entry-date { font-size: 11px; color: var(--accent); white-space: nowrap; font-family: var(--font-mono); }
.entry-role { font-size: 12px; color: var(--text-muted); margin-bottom: 6px; }
.entry-desc { font-size: 12px; color: var(--text-muted); line-height: 1.6; }
.entry li { font-size: 12px; color: #777; margin-bottom: 4px; line-height: 1.5; }
.sub-entry { margin-top: 20px; padding-top: 0; }
.sub-entry:first-child { margin-top: 8px; }
.sub-entry .entry-role { color: var(--accent); font-weight: 700; font-size: 13px; }
.sub-entry .entry-date { color: var(--text-faint); }

/* ---- DETAILS ---- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 11px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* ---- ABOUT ---- */
.detail { font-size: 12px; color: #777; }
.skills-list { font-size: 12px; color: #777; line-height: 2.2; }
.strengths-list { list-style: none; margin: 0; padding: 0; }
.strengths-list li { font-size: 12px; color: #777; margin-bottom: 4px; padding-left: 20px; position: relative; }
.strengths-list li::before { content: '>'; color: var(--accent); position: absolute; left: 0; }

/* ---- CONTACT ---- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* ---- FOOTER ---- */
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 11px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba(232,196,115,0.4); }
footer a:hover { color: var(--footer-link-hover); }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } body { background: #fff; color: #111; } body::before { display: none; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  h1 { font-size: 20px; }
  nav { font-size: 12px; gap: 12px; }
  .hero { margin-bottom: 16px; padding-bottom: 14px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .entry-header { flex-direction: column; }
  .home-bio { font-size: 13px; }
  li { font-size: 11px; }
  .role { font-size: 11px; }
  .date { font-size: 10px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
  ul { margin-left: 14px; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  h1 { font-size: 18px; }
  h2 { font-size: 10px; }
  nav { font-size: 11px; gap: 8px; flex-wrap: wrap; }
  .job-header strong { font-size: 13px; }
  .entry-title { font-size: 13px; }
  .status-line { font-size: 11px; }
  .home-bio { font-size: 12px; line-height: 1.7; }
  .strengths-list li { font-size: 11px; }
  .skills-list { font-size: 11px; }
}`;
}
