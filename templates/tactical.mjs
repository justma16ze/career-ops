/**
 * templates/tactical.mjs — Military/Defense Tech aesthetic
 *
 * Condensed sans + monospace data readouts, dark backgrounds,
 * structured grid layouts, muted olive/gray/steel palette with sharp accents.
 * Command-and-control energy. Clean, authoritative, zero softness.
 */

export const name = 'tactical';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;500;600;700&family=Share+Tech+Mono&family=Barlow:wght@400;500;600&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Barlow', sans-serif; color: #d4d4d4; background: #0a0a0a; line-height: 1.6; margin: 0; padding: 0; font-size: 14px; border-top: 2px solid #8faa6e; }
.wrap { width: 660px; margin: 0 auto; padding: 32px 40px 48px; }
a { color: #8faa6e; text-decoration: none; border-bottom: 1px solid rgba(143,170,110,0.3); }
a:hover { color: #a8c484; border-bottom-color: #a8c484; }

/* NAV */
nav { display: flex; gap: 20px; align-items: center; flex-wrap: wrap; margin-bottom: 40px; padding-bottom: 16px; border-bottom: 1px solid #1f1f1f; }
nav .site-name { font-family: 'Barlow Condensed', sans-serif; font-size: 18px; font-weight: 700; color: #e0e0e0; text-decoration: none; border-bottom: none; margin-right: auto; letter-spacing: 3px; text-transform: uppercase; }
nav a { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #707070; text-decoration: none; border-bottom: none; letter-spacing: 2px; text-transform: uppercase; transition: color 0.2s; }
nav a:hover { color: #8faa6e; }
nav .active { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #8faa6e; border-bottom: none; letter-spacing: 2px; text-transform: uppercase; }

/* HEADINGS */
h2 { font-family: 'Barlow Condensed', sans-serif; font-size: 11px; font-weight: 600; color: #8faa6e; margin: 40px 0 16px; letter-spacing: 3px; text-transform: uppercase; }
h2::before { content: '// '; color: #3a3a3a; }

/* SECTION LABELS */
.section-label { font-family: 'Share Tech Mono', monospace; font-size: 10px; color: #505050; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 8px; }

/* HOME */
.hero { margin-bottom: 40px; }
.hero-designation { font-family: 'Barlow Condensed', sans-serif; font-size: 36px; font-weight: 700; color: #e8e8e8; text-transform: uppercase; letter-spacing: 2px; line-height: 1.15; margin-bottom: 8px; }
.hero-headline { font-family: 'Barlow', sans-serif; font-size: 15px; color: #808080; line-height: 1.6; margin-bottom: 16px; }
.hero-meta { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 20px; padding: 16px 0; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; }
.hero-meta-item { }
.hero-meta-label { font-family: 'Share Tech Mono', monospace; font-size: 9px; color: #505050; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 2px; }
.hero-meta-value { font-family: 'Share Tech Mono', monospace; font-size: 13px; color: #c0c0c0; }
.hero-meta-value a { color: #8faa6e; border-bottom: none; }
.hero-meta-value a:hover { color: #a8c484; }

.home-bio { font-size: 15px; color: #b0b0b0; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #8faa6e; border-bottom: 1px solid rgba(143,170,110,0.3); }
.home-bio a:hover { color: #a8c484; border-bottom-color: #a8c484; }
.home-bio strong { color: #d0d0d0; font-weight: 600; }

/* INTRO / FALLBACK */
.intro { font-size: 15px; color: #a0a0a0; line-height: 1.75; margin-bottom: 32px; }
.intro p { margin-bottom: 14px; }
.intro a { color: #8faa6e; }

/* MISSION LOG (projects) */
.mission-log { margin-top: 24px; }
.mission-entry { padding: 20px 0; border-bottom: 1px solid #1a1a1a; }
.mission-entry:first-child { border-top: 1px solid #1a1a1a; }
.mission-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.mission-name { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 600; color: #e0e0e0; text-transform: uppercase; letter-spacing: 1px; }
.mission-name a { color: #e0e0e0; border-bottom: 1px solid #333; }
.mission-name a:hover { color: #8faa6e; border-bottom-color: #8faa6e; }
.mission-metric { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #8faa6e; white-space: nowrap; }
.mission-desc { font-size: 13px; color: #707070; line-height: 1.6; }

/* EXPERIENCE / SERVICE RECORD */
.service-record { margin-top: 24px; }
.service-entry { padding: 20px 0; border-bottom: 1px solid #1a1a1a; }
.service-entry:first-child { border-top: 1px solid #1a1a1a; }
.service-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.service-org { font-family: 'Barlow Condensed', sans-serif; font-size: 16px; font-weight: 700; color: #e0e0e0; text-transform: uppercase; letter-spacing: 1px; }
.service-date { font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #505050; white-space: nowrap; letter-spacing: 1px; }
.service-role { font-family: 'Barlow', sans-serif; font-size: 13px; color: #8faa6e; margin-bottom: 6px; }
.service-bullets { margin: 8px 0 0; padding-left: 0; list-style: none; }
.service-bullets li { font-size: 13px; color: #909090; line-height: 1.6; padding: 3px 0 3px 16px; position: relative; }
.service-bullets li::before { content: '>'; position: absolute; left: 0; color: #3a3a3a; font-family: 'Share Tech Mono', monospace; font-size: 12px; }
.service-bullets a { color: #8faa6e; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #505050; list-style: none; letter-spacing: 1px; text-transform: uppercase; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '[+] expand'; }
details[open] summary::before { content: '[-] collapse'; }
details .detail-content { padding-top: 6px; }

/* SUB-ENTRIES (multiple roles at same company) */
.sub-entry { padding: 14px 0 0; margin-top: 14px; border-top: 1px solid #141414; }
.sub-entry:first-child { padding-top: 6px; margin-top: 6px; border-top: none; }
.sub-entry .service-role { font-weight: 600; color: #a0b88a; margin-bottom: 4px; }
.sub-entry .service-date { font-size: 10px; }

/* ABOUT / DOSSIER */
.dossier-section { margin-bottom: 32px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #a0a0a0; padding: 4px 0 4px 16px; position: relative; }
.strengths-list li::before { content: '//'; position: absolute; left: 0; color: #3a3a3a; font-family: 'Share Tech Mono', monospace; font-size: 12px; }
.skills-grid { font-family: 'Share Tech Mono', monospace; font-size: 12px; color: #707070; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }
.contact-line { font-family: 'Share Tech Mono', monospace; font-size: 13px; }
.contact-line a { margin-right: 24px; color: #8faa6e; border-bottom: none; }
.contact-line a:hover { color: #a8c484; }
.entry-desc { font-size: 14px; color: #a0a0a0; line-height: 1.6; }
.entry-desc a { color: #8faa6e; }

/* EDUCATION */
.edu-entry { font-size: 14px; color: #a0a0a0; line-height: 1.6; padding: 4px 0; }

/* FOOTER */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #1a1a1a; font-family: 'Share Tech Mono', monospace; font-size: 11px; color: #3a3a3a; letter-spacing: 1px; }
footer a { color: #555; font-weight: 400; border-bottom: none; }
footer a:hover { color: #8faa6e; }

/* PRINT */
@media print {
  nav, footer { display: none; }
  body { background: #fff; color: #111; border-top: none; }
  .wrap { padding: 1rem; max-width: none; width: 100%; }
  .hero-designation { color: #111; }
  .service-org, .mission-name, .mission-name a { color: #111; }
  .service-role { color: #333; }
  .service-bullets li, .home-bio, .intro, .entry-desc, .strengths-list li { color: #333; }
  .service-bullets li::before, .strengths-list li::before, h2::before { color: #999; }
  h2 { color: #555; }
  .hero-meta { border-color: #ddd; }
  .service-entry, .mission-entry { border-color: #ddd; }
  .hero-meta-label { color: #999; }
  .hero-meta-value { color: #333; }
  a { color: #333; border-bottom-color: #ccc; }
}

/* RESPONSIVE 660 */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 20px 24px; }
  nav { font-size: 11px; gap: 12px; flex-wrap: wrap; }
  .hero-designation { font-size: 28px; }
  .hero-meta { grid-template-columns: repeat(2, 1fr); gap: 16px; }
  .service-header { flex-direction: column; }
  .service-date { margin-bottom: 2px; }
  .mission-header { flex-direction: column; }
  .sub-entry .service-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480 */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 15px; letter-spacing: 2px; }
  nav { font-size: 10px; gap: 8px; }
  h2 { font-size: 10px; }
  .hero-designation { font-size: 24px; }
  .hero-headline { font-size: 13px; }
  .hero-meta { grid-template-columns: 1fr; gap: 12px; }
  .service-org { font-size: 14px; }
  .mission-name { font-size: 14px; }
  .service-bullets li { font-size: 12px; }
  .mission-desc { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 12px; }
  .skills-grid { column-count: 1; }
}`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers, proofPoints,
    projects, experience, education, skills, experienceGroups } = data;
  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const homeBio = data.homeBio || '';
  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);
  const targetRoles = data.targetRoles || [];

  const navItems = [
    { href: 'index.html', label: 'Home' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Missions' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Service' }] : []),
    { href: 'about.html', label: 'Dossier' },
  ];

  function nav(active) {
    const items = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(fullName)}</a> ${items}</nav>`;
  }

  // HOME
  const metaItems = [];
  if (location) metaItems.push({ label: 'Location', value: esc(location) });
  if (targetRoles.length > 0) metaItems.push({ label: 'Designation', value: esc(targetRoles[0]) });
  if (email) metaItems.push({ label: 'Comms', value: `<a href="mailto:${esc(email)}">${esc(email)}</a>` });
  if (linkedin) metaItems.push({ label: 'Intel', value: `<a href="${esc(linkedinUrl)}">LinkedIn</a>` });
  if (github) metaItems.push({ label: 'Repo', value: `<a href="${esc(githubUrl)}">GitHub</a>` });

  const metaHtml = metaItems.length > 0
    ? `<div class="hero-meta">${metaItems.map(m => `<div class="hero-meta-item"><div class="hero-meta-label">${m.label}</div><div class="hero-meta-value">${m.value}</div></div>`).join('')}</div>`
    : '';

  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    homeContent = parts.length > 0 ? `<article class="home-bio">${parts.join('\n')}</article>` : '';
  }

  const homeBody = `<main>
<div class="hero">
  ${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}
  ${metaHtml}
</div>
${homeContent}
</main>`;

  // WORK / MISSIONS
  const workBody = projects.length > 0 ? `<main>
<h2>Mission Log</h2>
<div class="mission-log">
${projects.map(p => `<div class="mission-entry"><div class="mission-header"><span class="mission-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="mission-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="mission-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</main>` : '';

  // EXPERIENCE / SERVICE RECORD
  const groups = experienceGroups;
  const expBody = `<main>
<h2>Service Record</h2>
<div class="service-record">
${groups.map(g => {
    function renderBullets(bullets) {
      if (bullets.length === 0) return '';
      if (bullets.length <= 2) return `<ul class="service-bullets">${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
      const visible = bullets.slice(0, 2);
      const hidden = bullets.slice(2);
      return `<ul class="service-bullets">${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul class="service-bullets">${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
    }
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="service-entry"><div class="service-header"><span class="service-org">${esc(g.company)}</span><span class="service-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="service-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<div class="service-entry"><div class="service-header"><span class="service-org">${esc(g.company)}</span><span class="service-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="service-header"><span class="service-role">${esc(r.role)}</span><span class="service-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
</div>
${education.length > 0 ? `<h2>Training</h2>${education.map(e => `<p class="edu-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT / DOSSIER
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<div class="dossier-section"><p class="entry-desc">${renderInlineMarkdown(summaryText)}</p></div>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>Core Capabilities</h2><div class="dossier-section"><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`);
  if (currentProject) aboutParts.push(`<h2>Current Operations</h2><div class="dossier-section"><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p></div>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Target Designation</h2><div class="dossier-section"><p class="entry-desc">${esc(targetDesc)}</p></div>`);
  if (skills.length > 0) aboutParts.push(`<h2>Technical Proficiencies</h2><div class="dossier-section"><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div></div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutParts.push(`<h2>Secure Channel</h2><div class="dossier-section"><p class="contact-line">${links.join(' ')}</p></div>`);
  aboutParts.push('</main>');

  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(projects.length > 0 ? [['work.html', 'Missions', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Service Record', 'experience.html', expBody]] : []),
    ['about.html', 'Dossier', 'about.html', aboutParts.join('\n')],
  ];

  for (const [filename, title, active, body] of pageDefs) {
    const t = title === fullName ? title : `${title} — ${fullName}`;
    result[filename] = buildPage({ title: t, nav: nav(active), body, summaryShort: data.summaryShort, fonts, cssText: css() });
  }
  return result;
}

function buildPage({ title, nav, body, summaryShort, fonts, cssText }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(summaryShort)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(summaryShort)}">
<meta property="og:type" content="website">
${fontLinks}
<style>${cssText}</style>
</head>
<body>
<div class="wrap">
${nav}
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>
</body>
</html>`;
}
