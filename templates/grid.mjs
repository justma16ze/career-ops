/**
 * templates/grid.mjs — Data-Forward template
 *
 * General Sans + JetBrains Mono
 * #f5f5f4 bg with #171717 data bar, #16a34a green accent
 * Table layout
 */

export const name = 'grid';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; }
body { font-family: 'General Sans', sans-serif; color: #171717; background: #f5f5f4; line-height: 1.5; max-width: 900px; margin: 0 auto; }
a { color: #171717; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #d4d4d4; }
a:hover { text-decoration-color: #171717; }
.data-bar {
  background: #171717; color: #e5e5e5; padding: 10px 40px;
  display: flex; gap: 28px; align-items: center; font-size: 13px; flex-wrap: wrap;
}
.data-bar .bar-name { font-weight: 600; font-size: 14px; color: #fff; margin-right: auto; }
.data-bar .stat { font-family: 'JetBrains Mono', monospace; font-size: 11px; }
.data-bar .stat em { font-style: normal; color: #16a34a; }
.content { padding: 24px 40px 32px; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 20px; border-bottom: 1px solid #d4d4d4; font-size: 13px; }
nav .site-name { font-weight: 600; color: #171717; text-decoration: none; margin-right: auto; }
nav a { color: #a3a3a3; text-decoration: none; } nav a:hover { color: #171717; }
nav .active { color: #171717; font-weight: 500; }
h1 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
h2 { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #737373; margin: 20px 0 10px; }
h3 { font-size: 14px; font-weight: 500; margin-bottom: 2px; }
p { margin-bottom: 6px; } p:last-child { margin-bottom: 0; }
main { }
.data-table { width: 100%; border-collapse: collapse; font-size: 14px; }
.data-table th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: #a3a3a3; font-weight: 500; padding: 6px 12px; border-bottom: 2px solid #d4d4d4; }
.data-table td { padding: 8px 12px; border-bottom: 1px solid #e5e5e5; vertical-align: top; }
.data-table .metric-cell { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #16a34a; white-space: nowrap; }
.data-table .name-cell { font-weight: 500; }
.data-table .name-cell a { color: #171717; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #d4d4d4; }
.data-table .desc-cell { color: #737373; font-size: 13px; }
.job { margin-bottom: 20px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 14px; }
.date { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #a3a3a3; white-space: nowrap; }
.role { font-size: 13px; color: #737373; margin-bottom: 4px; }
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid #e5e5e5; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
ul { margin: 4px 0 0 18px; } li { font-size: 13px; color: #525252; margin-bottom: 2px; }
.detail { font-size: 13px; color: #525252; }
.skills-list { font-size: 13px; color: #525252; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 24px; padding-top: 12px; border-top: 1px solid #d4d4d4; font-size: 11px; color: #a3a3a3; }
footer a { color: #a3a3a3; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #d4d4d4; }
@media print { nav, footer, .data-bar { display: none; } body { background: #fff; } .content { padding: 1rem 0; } }
@media (max-width: 700px) { .data-bar { flex-direction: column; gap: 6px; align-items: flex-start; padding: 10px 20px; } .data-bar .bar-name { margin-right: 0; } .content { padding: 16px 20px 24px; } .job-header { flex-direction: column; } .data-table { font-size: 13px; } .data-table th, .data-table td { padding: 6px 8px; } }`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers,
    projects, experience, education, skills, experienceGroups } = data;
  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  const targetRoles = data.targetRoles || [];
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

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

  function dataBar() {
    const stats = [];
    if (targetRoles.length > 0) stats.push(`<span class="stat">role: <em>${esc(targetRoles[0])}</em></span>`);
    if (experience.length > 0) stats.push(`<span class="stat">yoe: <em>${experience.length}</em></span>`);
    if (location) stats.push(`<span class="stat">location: ${esc(location.toLowerCase())}</span>`);
    stats.push(`<span class="stat">status: <em>open</em></span>`);
    return `<header class="data-bar"><span class="bar-name">${esc(fullName)}</span>${stats.join('\n')}</header>`;
  }

  // HOME
  const homeBody = `${dataBar()}
<div class="content">
${nav('index.html')}
<main>
${summaryText ? `<article><p>${renderInlineMarkdown(summaryText)}</p></article>` : ''}
${projects.length > 0 ? `<section><h2>Projects</h2>
<table class="data-table">
<thead><tr><th>Project</th><th>Description</th><th>Impact</th></tr></thead>
<tbody>
${projects.slice(0, 5).map(p => `<tr><td class="name-cell">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</td><td class="desc-cell">${p.description || ''}</td><td class="metric-cell">${esc(p.heroMetric || '')}</td></tr>`).join('\n')}
</tbody>
</table></section>` : ''}
${skills.length > 0 ? `<section><h2>Stack</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>` : ''}
</main>
</div>`;

  // WORK
  const workBody = `${dataBar()}
<div class="content">
${nav('work.html')}
<main>
<h1>Work</h1>
<h2>All Projects</h2>
<table class="data-table">
<thead><tr><th>Project</th><th>Description</th><th>Impact</th></tr></thead>
<tbody>
${projects.map(p => `<tr><td class="name-cell">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</td><td class="desc-cell">${p.description || ''}</td><td class="metric-cell">${esc(p.heroMetric || '')}</td></tr>`).join('\n')}
</tbody>
</table>
</main>
</div>`;

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `${dataBar()}
<div class="content">
${nav('experience.html')}
<main>
<h1>Experience</h1>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="role">${esc(r.role)}</div>` : ''}${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong><span class="date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><div class="role">${esc(r.role)}</div>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<section><h2>Education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</section>` : ''}
</main>
</div>`;

  // ABOUT
  const aboutParts = [];
  aboutParts.push(`${dataBar()}`);
  aboutParts.push(`<div class="content">`);
  aboutParts.push(nav('about.html'));
  aboutParts.push('<main>');
  aboutParts.push('<h1>About</h1>');
  if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><h2>Strengths</h2><p class="detail">${superpowers.join(' / ')}</p></section>`);
  if (currentProject) aboutParts.push(`<section><h2>Now</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
  const locationFlex = data.locationFlex || '';
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) aboutParts.push(`<section><h2>Looking for</h2><p>${lp.join(' ')}</p></section>`);
  if (skills.length > 0) aboutParts.push(`<section><h2>Stack</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>`);
  if (links.length > 0) aboutParts.push(`<section><h2>Contact</h2><p>${links.join(' ')}</p></section>`);
  aboutParts.push('</main>');
  aboutParts.push('</div>');

  // Grid template has special structure: data bar is outside content div
  // So we handle buildPage differently — the body already includes everything
  const result = {};

  const pageDefsSpecial = [
    ['index.html', fullName, homeBody],
    ...(projects.length > 0 ? [['work.html', 'Work', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', expBody]] : []),
    ['about.html', 'About', aboutParts.join('\n')],
  ];

  for (const [filename, title, body] of pageDefsSpecial) {
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
    result[filename] = buildPageGrid({ title: t, body, summaryShort: data.summaryShort, fonts, cssText: css() });
  }
  return result;
}

function buildPageGrid({ title, body, summaryShort, fonts, cssText }) {
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
${body}
<footer>made by <a href="https://github.com/a16z/speedrun-career-ops">speedrun</a></footer>
</body>
</html>`;
}
