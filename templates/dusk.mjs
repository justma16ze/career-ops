/**
 * templates/dusk.mjs — Warm Solarized aesthetic
 *
 * Warm cream background, dark brown headings, copper/rust accent,
 * blue links, sage green section labels. Two-column CSS grid with
 * border-top dividers. Timeline with vertical line + dots.
 * Unbounded for display, system sans for body, JetBrains Mono for code.
 */

export const name = 'dusk';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; color: #3b2010; background: #fdf6e3; line-height: 1.65; margin: 0; padding: 0; font-size: 15px; }
.wrap { width: 720px; margin: 0 auto; padding: 32px 40px 48px; }
a { color: #268bd2; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(38,139,210,0.4); }
a:hover { text-decoration-color: #268bd2; }

/* --- Nav --- */
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; font-size: 14px; border-bottom: 1px solid #e0d5c1; padding-bottom: 16px; }
nav .site-name { font-family: 'Unbounded', sans-serif; font-size: 20px; font-weight: 700; color: #3b2010; text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav a { color: #3b2010; text-decoration: none; font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; }
nav a:hover { color: #d16d3e; }
nav .active { color: #d16d3e; font-weight: 600; }
nav span { font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; }

/* --- Section Grid (two-column: label | content) --- */
.section { display: grid; grid-template-columns: 100px 1fr; gap: 0 32px; border-top: 1px solid #e0d5c1; padding-top: 28px; margin-top: 28px; }
.section-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; color: #77934d; text-transform: uppercase; letter-spacing: 0.1em; padding-top: 5px; line-height: 1.4; word-spacing: 0.05em; }
.section-content { min-width: 0; }

/* --- Headings --- */
h1 { font-family: 'Unbounded', sans-serif; font-size: 36px; font-weight: 800; color: #3b2010; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 8px; }
h2 { font-family: 'Unbounded', sans-serif; font-size: 14px; font-weight: 600; color: #3b2010; margin: 28px 0 12px; letter-spacing: -0.01em; }
.headline { font-size: 16px; color: #5c4a3a; line-height: 1.6; margin-bottom: 4px; }
.hero { margin-bottom: 8px; }
.location { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a08060; letter-spacing: 0.02em; margin-bottom: 6px; }
.hero-contact { font-size: 14px; margin-top: 4px; }
.hero-contact a { color: #268bd2; }
.hero-contact .sep { color: #ccc; margin: 0 4px; font-size: 12px; }

/* --- Home Bio --- */
.home-bio { font-size: 15px; color: #3b2010; line-height: 1.75; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #268bd2; }

/* --- Intro --- */
.intro { font-size: 15px; color: #5c4a3a; line-height: 1.75; margin-bottom: 24px; }
.intro p { margin-bottom: 12px; }
.intro a { color: #268bd2; }

/* --- Timeline --- */
.timeline { position: relative; margin-left: 8px; padding-left: 24px; border-left: 2px solid #e0d5c1; margin-top: 8px; }
.entry { position: relative; padding: 12px 0 20px; }
.entry::before { content: ''; position: absolute; left: -31px; top: 18px; width: 10px; height: 10px; background: #d16d3e; border-radius: 50%; border: 2px solid #fdf6e3; }
.entry + .entry { border-top: 1px solid #efe6d5; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.entry-title { font-weight: 700; font-size: 15px; color: #3b2010; }
.entry-title a { color: #268bd2; text-decoration: underline; text-decoration-color: rgba(38,139,210,0.3); text-underline-offset: 3px; }
.entry-title a:hover { text-decoration-color: #268bd2; }
.entry-date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a08060; white-space: nowrap; }
.entry-role { font-size: 14px; color: #5c4a3a; font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 14px; color: #5c4a3a; line-height: 1.65; }
.entry ul { margin: 6px 0 0 0; padding-left: 18px; font-size: 14px; color: #5c4a3a; list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.55; }

/* --- Sub-entries (multi-role at same company) --- */
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid #efe6d5; }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 600; font-style: normal; font-size: 14px; color: #3b2010; }
.sub-entry .entry-date { font-size: 11px; }

/* --- Details (show more / show less) --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a08060; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* --- Strengths --- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #3b2010; padding: 4px 0; border-bottom: 1px solid #efe6d5; }
.strengths-list li:last-child { border-bottom: none; }

/* --- Skills grid --- */
.skills-grid { font-size: 13px; color: #5c4a3a; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }

/* --- Contact --- */
.contact-line { font-size: 14px; line-height: 1.8; }
.contact-line a { margin-right: 8px; }
.contact-line .sep { color: #ccc; margin: 0 6px; }

/* --- Hero metrics (Work page) --- */
.hero-metric { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #d16d3e; }

/* --- Education --- */
.education-entry { font-size: 14px; color: #5c4a3a; line-height: 1.65; margin-bottom: 6px; }

/* --- Footer --- */
footer { margin-top: 40px; padding-top: 14px; border-top: 1px solid #e0d5c1; font-size: 12px; color: #a08060; }
footer a { color: #a08060; font-weight: 600; text-decoration: underline; text-decoration-color: rgba(160,128,96,0.4); }
footer a:hover { text-decoration-color: #a08060; }

/* --- Print --- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; width: 100%; max-width: none; } .section { grid-template-columns: 80px 1fr; } }

/* --- Responsive: 660px --- */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 20px 24px; }
  h1 { font-size: 26px; }
  nav { font-size: 12px; gap: 10px; }
  nav .site-name { font-size: 16px; }
  nav span { font-size: 12px; }
  .section { grid-template-columns: 1fr; gap: 4px 0; }
  .section-label { padding-top: 0; margin-bottom: 6px; }
  .timeline { margin-left: 0; padding-left: 20px; }
  .entry::before { left: -27px; top: 18px; width: 8px; height: 8px; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 14px; }
  .hero-contact { font-size: 13px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* --- Responsive: 480px --- */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1 { font-size: 22px; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 10px; gap: 6px; }
  nav span { font-size: 10px; }
  .section-label { font-size: 10px; }
  .headline { font-size: 14px; }
  .entry-title { font-size: 13px; }
  .entry-desc { font-size: 13px; }
  .entry ul { font-size: 13px; }
  .timeline { padding-left: 16px; }
  .entry::before { left: -22px; width: 6px; height: 6px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
  .hero-contact { font-size: 12px; }
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
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Work' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Experience' }] : []),
    { href: 'about.html', label: 'About' },
  ];

  function nav(active) {
    const items = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(fullName)}</a> ${items}</nav>`;
  }

  // HOME — contact bar below hero
  const contactLinks = [];
  if (email) contactLinks.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (linkedin) contactLinks.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) contactLinks.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  const contactBar = contactLinks.length > 0
    ? `<p class="hero-contact">${contactLinks.join(' <span class="sep">&middot;</span> ')}</p>`
    : '';

  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
<div class="hero">
${headline ? `<p class="headline">${esc(headline)}</p>` : ''}
${location ? `<p class="location">${esc(location)}</p>` : ''}
${contactBar}
</div>
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<div class="section">
<div class="section-label">Projects</div>
<div class="section-content">
<div class="timeline">
${projects.map(p => `<div class="entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="hero-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</div>
</div>
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<div class="section">
<div class="section-label">Experience</div>
<div class="section-content">
<div class="timeline">
${groups.map(g => {
    function renderBullets(bullets) {
      if (bullets.length === 0) return '';
      if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
      const visible = bullets.slice(0, 2);
      const hidden = bullets.slice(2);
      return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
    }
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="entry-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
</div>
</div>
</div>
${education.length > 0 ? `<div class="section">
<div class="section-label">Education</div>
<div class="section-content">
${education.map(e => `<p class="education-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}
</div>
</div>` : ''}
</main>`;

  // ABOUT
  const aboutSections = [];
  if (!homeBio) {
    if (summaryText) aboutSections.push(`<div class="section">
<div class="section-label">Summary</div>
<div class="section-content"><p class="intro">${renderInlineMarkdown(summaryText)}</p></div>
</div>`);
  }
  if (superpowers.length > 0) aboutSections.push(`<div class="section">
<div class="section-label">Strengths</div>
<div class="section-content"><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>
</div>`);
  if (currentProject) aboutSections.push(`<div class="section">
<div class="section-label">Now</div>
<div class="section-content"><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p></div>
</div>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutSections.push(`<div class="section">
<div class="section-label">Looking For</div>
<div class="section-content"><p class="entry-desc">${esc(targetDesc)}</p></div>
</div>`);
  if (skills.length > 0) aboutSections.push(`<div class="section">
<div class="section-label">Skills</div>
<div class="section-content"><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div></div>
</div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutSections.push(`<div class="section">
<div class="section-label">Contact</div>
<div class="section-content"><p class="contact-line">${links.join(' &middot; ')}</p></div>
</div>`);

  const aboutBody = `<main>\n${aboutSections.join('\n')}\n</main>`;

  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutBody],
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
