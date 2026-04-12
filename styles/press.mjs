/**
 * styles/press.mjs — Neo-brutalist warm aesthetic
 *
 * Thick borders, offset box shadows, warm paper background,
 * bold blue accent, yellow/coral section blocks, uppercase eyebrow labels,
 * serif display + mono tags, tactile hover lifts.
 */

export const name = 'press';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #f7f7f2;
  --bg-alt: #fff;
  --bg-card: #fff;
  --bg-nav: #ff6b4a;
  --bg-sidebar: transparent;

  /* Text */
  --text: #111;
  --text-muted: #444;
  --text-faint: #777;

  /* Accent */
  --accent: #0059ff;
  --accent-hover: #003db3;

  /* Borders */
  --border: #111;
  --border-light: #eee;

  /* Typography */
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'Space Mono', monospace;

  /* Spacing */
  --wrap-width: 720px;
  --nav-height: 48px;

  /* Footer — coral bg is mid-tone, text is dark #111 for contrast */
  --footer-bg: #ff6b4a;
  --footer-text: #111;
  --footer-link: #111;
  --footer-link-hover: #fff;
  --footer-border: #111;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; margin: 0; padding: 0; font-size: 15px; background-image: radial-gradient(circle, #ddd 1px, transparent 1px); background-size: 24px 24px; }
.wrap { max-width: var(--wrap-width); margin: 0 auto; padding: 24px 36px 40px; }
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; }
a:hover { color: var(--accent-hover); }

/* NAV */
nav { display: flex; align-items: center; gap: 28px; padding: 16px 24px; margin-bottom: 36px; background: var(--bg-nav); border: 3px solid var(--text); box-shadow: 6px 6px 0 0 var(--text); font-family: var(--font-mono); font-size: 13px; text-transform: uppercase; letter-spacing: 2px; }
nav .site-name { font-family: var(--font-mono); font-size: 14px; font-weight: 700; color: var(--text); text-decoration: none; background: #fff; border: 2px solid var(--text); padding: 5px 12px; margin-right: auto; letter-spacing: 0.5px; text-transform: none; }
nav .site-name:hover { background: var(--bg); }
nav a { color: var(--text); text-decoration: none; font-weight: 700; }
nav a:hover { text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 2px; }
nav .active { text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 3px; font-weight: 700; }

/* HEADINGS */
h2 { font-family: var(--font-display); font-size: 30px; font-weight: 700; font-style: italic; color: var(--text); margin-bottom: 20px; line-height: 1.2; }

/* HOME BIO */
.home-bio { font-size: 15px; color: #333; line-height: 1.75; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--accent); }

/* HERO CARD — offset shadow blocks */
.hero-card { background: #f5d547; border: 3px solid var(--text); box-shadow: 6px 6px 0 0 var(--text); padding: 40px 36px 36px; margin-bottom: 36px; }
.hero-card .eyebrow { font-family: var(--font-mono); font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: var(--text); margin-bottom: 12px; }
.hero-card h1 { font-family: var(--font-display); font-size: 60px; font-weight: 900; line-height: 1.05; color: var(--text); margin-bottom: 24px; }
.hero-card h1 em { font-style: italic; }
.hero-card .tagline { font-size: 19px; color: var(--text); border-left: 5px solid var(--text); padding-left: 18px; margin-bottom: 18px; line-height: 1.5; font-family: var(--font-body); }
.hero-card .intro-text { font-size: 15px; color: #333; line-height: 1.7; }
.hero-card .intro-text p { margin-bottom: 10px; }

/* SECTION BLOCKS — offset shadow cards */
.section-block { background: var(--bg-card); border: 3px solid var(--text); box-shadow: 6px 6px 0 0 var(--text); padding: 32px 28px; margin-bottom: 28px; }
.section-block.coral { background: #ff6b4a; }
.section-block.coral h2, .section-block.coral .entry-desc, .section-block.coral .entry-title, .section-block.coral .entry-date, .section-block.coral .entry-role, .section-block.coral li, .section-block.coral a, .section-block.coral .eyebrow, .section-block.coral .looking-for { color: var(--text); }
.section-block.coral .eyebrow { color: rgba(17,17,17,0.6); }
.section-block.yellow { background: #f5d547; }
.section-block.yellow h2, .section-block.yellow .eyebrow { color: var(--text); }

/* EYEBROW */
.eyebrow { font-family: var(--font-mono); font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: var(--text-faint); margin-bottom: 14px; font-weight: 700; }

/* EXPERIENCE ENTRIES */
.entry { padding: 22px 0; border-bottom: 2px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.entry-title { font-family: var(--font-display); font-weight: 700; font-size: 19px; color: var(--text); }
.entry-title a { color: var(--accent); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
.entry-date { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); white-space: nowrap; letter-spacing: 0.5px; }
.entry-role { font-size: 14px; color: #555; font-weight: 600; margin-bottom: 6px; }
.entry-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; }
.entry ul { margin: 8px 0 0 0; padding-left: 18px; font-size: 14px; color: var(--text-muted); list-style: square; }
.entry li { margin-bottom: 5px; line-height: 1.6; color: var(--text-muted); }

/* SUB ENTRIES */
.sub-entry { padding: 16px 0 0; margin-top: 16px; border-top: 2px dashed #ddd; }
.sub-entry:first-child { padding-top: 6px; margin-top: 6px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 15px; color: var(--text); }
.sub-entry .entry-date { font-size: 12px; color: var(--text-faint); }
.sub-entry .entry-header { margin-bottom: 6px; }

/* DETAILS TOGGLE */
details { margin-top: 8px; }
details summary { cursor: pointer; font-family: var(--font-mono); font-size: 12px; color: var(--accent); list-style: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* PROJECT CARDS — offset shadow hover lift */
.project-grid { display: flex; flex-direction: column; gap: 16px; }
.project-card { background: var(--bg-card); border: 3px solid var(--text); box-shadow: 4px 4px 0 0 var(--text); padding: 20px 22px; transition: transform 0.15s ease, box-shadow 0.15s ease; }
.project-card:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 0 var(--text); }
.project-card .entry-header { margin-bottom: 6px; }
.project-card .entry-title { font-family: var(--font-display); font-size: 18px; font-weight: 700; }
.project-card .entry-desc { font-size: 14px; color: var(--text-muted); }
.project-card .entry-date { font-family: var(--font-mono); font-size: 12px; color: var(--text); background: #f5d547; border: 2px solid var(--text); padding: 3px 10px; white-space: nowrap; font-weight: 700; }

/* SKILLS */
.skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.skills-grid span { font-family: var(--font-mono); font-size: 12px; color: var(--text); background: var(--bg); border: 2px solid var(--text); padding: 4px 12px; transition: transform 0.15s ease, box-shadow 0.15s ease; }
.skills-grid span:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 0 var(--text); }
.skills-list { display: flex; flex-wrap: wrap; gap: 8px; }

/* STRENGTHS */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 10px 0 10px 24px; border-bottom: 1px solid var(--border-light); position: relative; line-height: 1.5; }
.strengths-list li:last-child { border-bottom: none; }
.strengths-list li::before { content: ''; position: absolute; left: 0; top: 16px; width: 10px; height: 10px; background: #ff6b4a; border: 2px solid var(--text); }

/* CONTACT */
.contact-line { font-size: 15px; }
.contact-line a { margin-right: 20px; font-weight: 600; }

/* EDUCATION */
.education-entry { font-size: 15px; color: #333; padding: 8px 0; }

/* LOOKING FOR */
.looking-for { font-family: var(--font-mono); font-size: 14px; color: var(--text-muted); line-height: 1.6; }

/* FOOTER */
footer { background: var(--footer-bg, #ff6b4a); font-family: var(--font-mono); font-size: 12px; color: var(--footer-text); font-weight: 700; letter-spacing: 0.5px; }
footer a { color: var(--footer-link); text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: 100%; } body { background: #fff; background-image: none; } .hero-card, .section-block, .project-card { box-shadow: none; border-width: 1px; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 16px 20px 32px; }
  nav { font-size: 12px; gap: 14px; padding: 12px 16px; flex-wrap: wrap; letter-spacing: 1px; margin-bottom: 28px; }
  nav .site-name { font-size: 13px; padding: 4px 8px; }
  .hero-card { padding: 28px 22px 24px; }
  .hero-card h1 { font-size: 40px; }
  .hero-card .tagline { font-size: 16px; }
  h2 { font-size: 24px; }
  .section-block { padding: 24px 20px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid span { font-size: 12px; padding: 3px 8px; }
  .home-bio { font-size: 14px; }
  .project-card { padding: 16px 18px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 12px 14px 24px !important; }
  nav { font-size: 12px; gap: 8px; padding: 10px 12px; letter-spacing: 0.5px; }
  nav .site-name { font-size: 12px; padding: 3px 7px; }
  .hero-card h1 { font-size: 32px; }
  .hero-card .tagline { font-size: 14px; padding-left: 12px; border-left-width: 4px; }
  .hero-card { padding: 22px 16px 20px; }
  h2 { font-size: 20px; }
  .section-block { padding: 18px 14px; }
  .entry-title { font-size: 16px; }
  .entry-desc { font-size: 13px; }
  .entry ul { font-size: 13px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; padding-left: 20px; }
  .strengths-list li::before { width: 8px; height: 8px; }
  .skills-grid span { font-size: 12px; padding: 2px 6px; }
  .project-card { padding: 14px; }
  footer { font-size: 12px; padding: 12px 14px; }
}
`;
}
