/**
 * styles/tactical.mjs — Military/Defense Tech aesthetic
 *
 * Condensed sans + monospace data readouts, dark backgrounds,
 * muted olive/gray/steel palette with sharp accents.
 * // prefixes on section headings. Command-and-control energy.
 */

export const name = 'tactical';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Share+Tech+Mono&family=Barlow:wght@400;500;600&display=swap',
];

export function css() {
  return `
:root {
  /* Backgrounds */
  --bg: #0a0a0a;
  --bg-alt: #111;
  --bg-card: #141414;
  --bg-nav: rgba(10,10,10,0.92);
  --bg-sidebar: transparent;

  /* Text */
  --text: #d4d4d4;
  --text-muted: #909090;
  --text-faint: #505050;

  /* Accent */
  --accent: #8faa6e;
  --accent-hover: #a8c484;

  /* Borders */
  --border: #1f1f1f;
  --border-light: #1a1a1a;

  /* Typography */
  --font-display: 'Barlow Condensed', sans-serif;
  --font-body: 'Barlow', sans-serif;
  --font-mono: 'Share Tech Mono', monospace;

  /* Spacing */
  --wrap-width: 660px;
  --nav-height: 48px;

  /* Footer — dark bg: accent color for link */
  --footer-text: #aaa;
  --footer-link: #8faa6e;
  --footer-link-hover: #a8c484;
  --footer-border: #1a1a1a;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; margin: 0; padding: 0; font-size: 14px; border-top: 2px solid var(--accent); }
.wrap { max-width: var(--wrap-width); margin: 0 auto; padding: 32px 40px 48px; }
a { color: var(--accent); text-decoration: none; border-bottom: 1px solid rgba(143,170,110,0.3); }
a:hover { color: var(--accent-hover); border-bottom-color: var(--accent-hover); }

/* NAV */
nav { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 40px; padding-bottom: 16px; border-bottom: 1px solid var(--border); }
.site-name { font-family: var(--font-display); font-size: 18px; font-weight: 700; color: #e0e0e0; text-decoration: none; border-bottom: none; margin-right: auto; letter-spacing: 3px; text-transform: uppercase; }
nav a { font-family: var(--font-mono); font-size: 11px; color: #707070; text-decoration: none; border-bottom: none; letter-spacing: 2px; text-transform: uppercase; transition: color 0.2s; }
nav a:hover { color: var(--accent); }
nav .active { font-family: var(--font-mono); font-size: 11px; color: var(--accent); border-bottom: none; letter-spacing: 2px; text-transform: uppercase; }

/* HEADINGS — tactical-specific // prefix */
h2 { font-family: var(--font-display); font-size: 11px; font-weight: 600; color: var(--accent); margin: 40px 0 16px; letter-spacing: 3px; text-transform: uppercase; }
h2::before { content: '// '; color: #3a3a3a; }

/* SECTION LABELS */
.section-label { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }

/* HOME */
.hero { margin-bottom: 40px; }
.hero-designation { font-family: var(--font-display); font-size: 36px; font-weight: 700; color: #e8e8e8; text-transform: uppercase; letter-spacing: 2px; line-height: 1.15; margin-bottom: 8px; }
.hero-headline { font-family: var(--font-body); font-size: 15px; color: #808080; line-height: 1.6; margin-bottom: 16px; }
.hero-meta { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; padding: 16px 0; border-top: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); }
.hero-meta-label { font-family: var(--font-mono); font-size: 9px; color: var(--text-faint); letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px; }
.hero-meta-value { font-family: var(--font-mono); font-size: 13px; color: #c0c0c0; }
.hero-meta-value a { color: var(--accent); border-bottom: none; }
.hero-meta-value a:hover { color: var(--accent-hover); }

.home-bio { font-size: 15px; color: #b0b0b0; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--accent); border-bottom: 1px solid rgba(143,170,110,0.3); }
.home-bio a:hover { color: var(--accent-hover); border-bottom-color: var(--accent-hover); }
.home-bio strong { color: #d0d0d0; font-weight: 600; }

/* INTRO / FALLBACK */
.intro { font-size: 15px; color: #a0a0a0; line-height: 1.75; margin-bottom: 32px; }
.intro p { margin-bottom: 14px; }
.intro a { color: var(--accent); }

/* MISSION LOG (projects) */
.mission-log { margin-top: 24px; }
.mission-entry { padding: 20px 0; border-bottom: 1px solid var(--border-light); }
.mission-entry:first-child { border-top: 1px solid var(--border-light); }
.mission-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.mission-name { font-family: var(--font-display); font-size: 16px; font-weight: 600; color: #e0e0e0; text-transform: uppercase; letter-spacing: 1px; }
.mission-name a { color: #e0e0e0; border-bottom: 1px solid #333; }
.mission-name a:hover { color: var(--accent); border-bottom-color: var(--accent); }
.mission-metric { font-family: var(--font-mono); font-size: 12px; color: var(--accent); white-space: nowrap; }
.mission-desc { font-size: 13px; color: #707070; line-height: 1.6; }

/* SERVICE RECORD (experience) */
.service-record { margin-top: 24px; }
.service-entry { padding: 20px 0; border-bottom: 1px solid var(--border-light); }
.service-entry:first-child { border-top: 1px solid var(--border-light); }
.service-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.service-org { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #e0e0e0; text-transform: uppercase; letter-spacing: 1px; }
.service-date { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); white-space: nowrap; letter-spacing: 1px; }
.service-role { font-family: var(--font-body); font-size: 13px; color: var(--accent); margin-bottom: 6px; }
.service-bullets { margin: 8px 0 0; padding-left: 0 !important; list-style: none !important; }
.service-bullets li { font-size: 13px; color: var(--text-muted); line-height: 1.6; padding: 3px 0 3px 16px; position: relative; }
.service-bullets li::before { content: '>' !important; position: absolute; left: 0; color: #3a3a3a; font-family: var(--font-mono); font-size: 12px; }
.service-bullets a { color: var(--accent); }

/* Standard entry classes */
.entry { padding: 20px 0; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: #e0e0e0; text-transform: uppercase; letter-spacing: 1px; }
.entry-date { font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); white-space: nowrap; letter-spacing: 1px; }
.entry-role { font-family: var(--font-body); font-size: 13px; color: var(--accent); margin-bottom: 6px; }
.entry-desc { font-size: 14px; color: #a0a0a0; line-height: 1.6; }
.entry-desc a { color: var(--accent); }
.entry ul { margin: 8px 0 0; padding-left: 0 !important; list-style: none !important; }
.entry li { font-size: 13px; color: var(--text-muted); line-height: 1.6; padding: 3px 0 3px 16px; position: relative; }
.entry li::before { content: '>' !important; position: absolute; left: 0; color: #3a3a3a; font-family: var(--font-mono); font-size: 12px; }

/* DETAILS */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: var(--font-mono); font-size: 11px; color: var(--text-faint); list-style: none; letter-spacing: 1px; text-transform: uppercase; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '[+] expand'; }
details[open] summary::before { content: '[-] collapse'; }
details .detail-content { padding-top: 6px; }

/* SUB-ENTRIES */
.sub-entry { padding: 14px 0 0; margin-top: 14px; border-top: 1px solid #141414; }
.sub-entry:first-child { padding-top: 6px; margin-top: 6px; border-top: none; }
.sub-entry .service-role { font-weight: 600; color: #a0b88a; margin-bottom: 4px; }
.sub-entry .service-date { font-size: 10px; }
.sub-entry .entry-role { font-weight: 600; color: #a0b88a; margin-bottom: 4px; }
.sub-entry .entry-date { font-size: 10px; }

/* DOSSIER / ABOUT */
.dossier-section { margin-bottom: 32px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #a0a0a0; padding: 4px 0 4px 22px; position: relative; }
.strengths-list li::before { content: '//'; position: absolute; left: 0; color: #3a3a3a; font-family: var(--font-mono); font-size: 12px; }
.skills-grid { font-family: var(--font-mono); font-size: 12px; color: #707070; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }
.skills-list { font-family: var(--font-mono); font-size: 12px; color: #707070; }
.contact-line { font-family: var(--font-mono); font-size: 13px; }
.contact-line a { margin-right: 24px; color: var(--accent); border-bottom: none; }
.contact-line a:hover { color: var(--accent-hover); }

/* EDUCATION */
.edu-entry { font-size: 14px; color: #a0a0a0; line-height: 1.6; padding: 4px 0; }

/* FOOTER */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-family: var(--font-mono); font-size: 11px; color: var(--footer-text); letter-spacing: 1px; }
footer a { color: var(--footer-link); font-weight: 700; border-bottom: none; }
footer a:hover { color: var(--footer-link-hover); }

/* PRINT */
@media print {
  nav, footer { display: none; }
  body { background: #fff; color: #111; border-top: none; }
  .wrap { padding: 1rem; max-width: none; width: 100%; }
  .hero-designation { color: #111; }
  .service-org, .mission-name, .mission-name a, .entry-title { color: #111; }
  .service-role, .entry-role { color: #333; }
  .service-bullets li, .home-bio, .intro, .entry-desc, .strengths-list li, .entry li { color: #333; }
  .service-bullets li::before, .strengths-list li::before, h2::before, .entry li::before { color: #999; }
  h2 { color: #555; }
  .hero-meta { border-color: #ddd; }
  .service-entry, .mission-entry, .entry { border-color: #ddd; }
  .hero-meta-label { color: #999; }
  .hero-meta-value { color: #333; }
  a { color: #333; border-bottom-color: #ccc; }
}

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 20px 24px; }
  nav { font-size: 11px; gap: 12px; flex-wrap: wrap; }
  .hero-designation { font-size: 28px; }
  .hero-meta { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .service-header, .entry-header { flex-direction: column; }
  .service-date, .entry-date { margin-bottom: 2px; }
  .mission-header { flex-direction: column; }
  .sub-entry .service-header, .sub-entry .entry-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 15px; letter-spacing: 2px; }
  nav { font-size: 10px; gap: 8px; }
  h2 { font-size: 10px; }
  .hero-designation { font-size: 24px; }
  .hero-headline { font-size: 13px; }
  .hero-meta { grid-template-columns: 1fr; gap: 12px; }
  .service-org, .entry-title { font-size: 14px; }
  .mission-name { font-size: 14px; }
  .service-bullets li, .entry li { font-size: 12px; }
  .mission-desc { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 12px; }
  .skills-grid { column-count: 1; }
}
`;
}
