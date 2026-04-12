/**
 * templates/grid.mjs — Data-Forward aesthetic
 *
 * Bloomberg terminal meets personal site. Dense, information-rich, utilitarian.
 * Dark header bar with name + stats, tabular project data. Compact, dense.
 * General Sans (Fontshare) body, JetBrains Mono (Google Fonts) for data.
 * Background: #f5f5f4 (stone) with #171717 dark data bar at top
 * Accent: #16a34a (green) for data metrics
 */

export const name = 'grid';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'General Sans', -apple-system, BlinkMacSystemFont, sans-serif; color: #171717; background: #f5f5f4; line-height: 1.5; margin: 0; padding: 0; font-size: 14px; }
.wrap { width: 680px; margin: 0 auto; padding: 0 0 40px; }
a { color: #171717; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #a3a3a3; }
a:hover { text-decoration-color: #171717; }

/* Dark data bar */
.data-bar { background: #171717; color: #d4d4d4; padding: 18px 28px; }
.data-bar-inner { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
.data-bar .bar-name { font-size: 17px; font-weight: 700; color: #fafafa; letter-spacing: -0.01em; }
.data-bar .bar-meta { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a3a3a3; display: flex; gap: 16px; flex-wrap: wrap; }
.data-bar .bar-meta span { white-space: nowrap; }
.data-bar .bar-stat { color: #16a34a; font-weight: 500; }

/* Nav */
nav { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; padding: 10px 28px; background: #fff; border-bottom: 1px solid #d4d4d4; font-size: 13px; font-weight: 500; }
nav a { color: #525252; text-decoration: none; }
nav a:hover { color: #171717; }
nav .active { color: #171717; text-decoration: underline; text-underline-offset: 6px; text-decoration-thickness: 2px; text-decoration-color: #16a34a; }

/* Main */
main { padding: 24px 28px 0; }
h2 { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #737373; margin: 28px 0 10px; }
h2:first-child { margin-top: 0; }

/* Home bio */
.home-bio { font-size: 14px; color: #404040; line-height: 1.7; }
.home-bio p { margin-bottom: 12px; }
.home-bio p:last-child { margin-bottom: 0; }
.home-bio a { color: #171717; text-decoration-color: #a3a3a3; }

/* Data table (projects) */
.data-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.data-table th { text-align: left; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #a3a3a3; padding: 6px 0; border-bottom: 1px solid #d4d4d4; }
.data-table td { padding: 10px 0; border-bottom: 1px solid #e5e5e5; vertical-align: top; }
.data-table tr:last-child td { border-bottom: none; }
.data-table .col-name { font-weight: 600; color: #171717; padding-right: 16px; white-space: nowrap; }
.data-table .col-name a { color: #171717; text-decoration: underline; text-decoration-color: #a3a3a3; text-underline-offset: 3px; }
.data-table .col-name a:hover { text-decoration-color: #171717; }
.data-table .col-desc { color: #525252; line-height: 1.5; }
.data-table .col-metric { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #16a34a; font-weight: 500; white-space: nowrap; text-align: right; padding-left: 16px; }

/* Experience */
.exp-entry { padding: 14px 0; border-bottom: 1px solid #e5e5e5; }
.exp-entry:last-child { border-bottom: none; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.exp-company { font-weight: 700; font-size: 14px; color: #171717; }
.exp-date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #737373; white-space: nowrap; }
.exp-role { font-size: 13px; color: #525252; margin-top: 2px; }
.exp-bullets { margin: 6px 0 0 0; padding-left: 16px; font-size: 13px; color: #525252; list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.5; }
.sub-role { padding: 8px 0 0; margin-top: 8px; border-top: 1px solid #f0f0f0; }
.sub-role:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-role .exp-role { font-weight: 600; color: #171717; font-size: 13px; }
.sub-role .exp-date { font-size: 10px; }

/* Details expand */
details { margin-top: 4px; }
details summary { cursor: pointer; font-size: 11px; color: #a3a3a3; list-style: none; font-family: 'JetBrains Mono', monospace; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 4px; }

/* Skills */
.skills-grid { font-size: 13px; color: #525252; line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }

/* Strengths */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 13px; color: #404040; padding: 4px 0; border-bottom: 1px solid #f0f0f0; }
.strengths-list li:last-child { border-bottom: none; }

/* Contact */
.contact-line { font-size: 13px; }
.contact-line a { margin-right: 20px; }

/* Education */
.edu-entry { font-size: 13px; color: #525252; padding: 4px 0; }

/* About intro */
.about-intro { font-size: 14px; color: #404040; line-height: 1.7; margin-bottom: 16px; }
.about-intro p { margin-bottom: 8px; }

/* Footer */
footer { margin-top: 32px; padding: 12px 28px; border-top: 1px solid #d4d4d4; font-size: 11px; color: #a3a3a3; }
footer a { color: #a3a3a3; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; }
footer a:hover { color: #171717; }

@media print { nav, footer, .data-bar { display: none; } .wrap { padding: 1rem; max-width: none; } main { padding: 0 1rem; } }
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 0 0 28px; }
  .data-bar { padding: 14px 20px; }
  .data-bar-inner { flex-direction: column; gap: 4px; }
  .data-bar .bar-meta { gap: 10px; }
  nav { padding: 10px 20px; font-size: 12px; gap: 10px; }
  main { padding: 20px 20px 0; }
  .data-table .col-metric { display: none; }
  .exp-header { flex-direction: column; }
  .sub-role .exp-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 13px; }
  footer { padding: 12px 20px; }
}
@media (max-width: 480px) {
  .data-bar { padding: 10px 16px; }
  .data-bar .bar-name { font-size: 15px; }
  .data-bar .bar-meta { font-size: 10px; gap: 8px; }
  nav { padding: 8px 16px; font-size: 11px; gap: 8px; }
  main { padding: 16px 16px 0; }
  h2 { font-size: 10px; }
  .exp-company { font-size: 13px; }
  .exp-role { font-size: 12px; }
  .exp-bullets { font-size: 12px; }
  .data-table { font-size: 12px; }
  .skills-grid { column-count: 1; }
  .home-bio { font-size: 12px; }
  .strengths-list li { font-size: 12px; }
  footer { padding: 10px 16px; }
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

  // Build stats for the dark data bar — short, dense data points only
  const stats = [];
  if (location) stats.push(`<span>${esc(location)}</span>`);
  if (experienceGroups.length > 0) stats.push(`<span>${experienceGroups.length} orgs</span>`);
  // Pull up to 2 green metrics from proof points — find clean "NNx word" patterns
  const allMetricCandidates = [];
  if (proofPoints && proofPoints.length > 0) {
    for (const pp of proofPoints) {
      const metric = pp.hero_metric || pp.heroMetric || '';
      if (!metric) continue;
      // Split on commas to get individual stat phrases, then find clean short ones
      const phrases = metric.split(/,\s*/);
      for (const phrase of phrases) {
        const clean = phrase.trim();
        // Match patterns like "50M impressions", "220K followers", "5M applications"
        const m = clean.match(/^([\d,.]+[KkMm]?\+?)\s+(\w+(?:\s+\w+)?)$/);
        if (m && m[0].length <= 25) {
          allMetricCandidates.push(m[0]);
        }
      }
    }
  }
  // Take up to 2 best metrics
  for (let i = 0; i < Math.min(2, allMetricCandidates.length); i++) {
    stats.push(`<span class="bar-stat">${esc(allMetricCandidates[i])}</span>`);
  }

  const navItems = [
    { href: 'index.html', label: 'Home' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Work' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Experience' }] : []),
    { href: 'about.html', label: 'About' },
  ];

  function nav(active) {
    return navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
  }

  function dataBar() {
    return `<div class="data-bar"><div class="data-bar-inner"><span class="bar-name">${esc(fullName)}</span><div class="bar-meta">${stats.join('')}</div></div></div>`;
  }

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    const linkParts = [];
    if (linkedin) linkParts.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
    if (github) linkParts.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
    if (email) linkParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    if (linkParts.length > 0) parts.push(`<p>${linkParts.join(' &middot; ')}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>${homeContent}</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h2>Projects</h2>
<table class="data-table">
<thead><tr><th>Name</th><th>Description</th><th>Metric</th></tr></thead>
<tbody>
${projects.map(p => `<tr><td class="col-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</td><td class="col-desc">${p.description || ''}</td><td class="col-metric">${p.heroMetric ? esc(p.heroMetric) : ''}</td></tr>`).join('\n')}
</tbody>
</table>
</main>` : '';

  // EXPERIENCE — uses experienceGroups, bold title + date on same line
  const groups = experienceGroups;
  const expBody = `<main>
<h2>Experience</h2>
${groups.map(g => {
    function renderBullets(bullets) {
      if (bullets.length === 0) return '';
      if (bullets.length <= 2) return `<ul class="exp-bullets">${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
      const visible = bullets.slice(0, 2);
      const hidden = bullets.slice(2);
      return `<ul class="exp-bullets">${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul class="exp-bullets">${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
    }
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="exp-entry"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="exp-entry"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="exp-header"><span class="exp-role">${esc(r.role)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="edu-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<div class="about-intro"><p>${renderInlineMarkdown(summaryText)}</p></div>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="edu-entry">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Looking For</h2><p class="edu-entry">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>Skills</h2><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutParts.push(`<h2>Contact</h2><p class="contact-line">${links.join(' ')}</p>`);
  aboutParts.push('</main>');

  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutParts.join('\n')],
  ];

  for (const [filename, title, active, body] of pageDefs) {
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
    result[filename] = buildPage({ title: t, dataBar: dataBar(), nav: nav(active), body, summaryShort: data.summaryShort, fonts, cssText: css() });
  }
  return result;
}

function buildPage({ title, dataBar, nav, body, summaryShort, fonts, cssText }) {
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
${dataBar}
<nav>${nav}</nav>
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>
</body>
</html>`;
}
