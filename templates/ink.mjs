/**
 * templates/ink.mjs — Warm Editorial template
 *
 * Instrument Serif + Source Sans 3 + IBM Plex Mono
 * #faf6f0 bg, #1a1a1a text, #c1553d accent
 * Two-column hero with proof sidebar
 */

export const name = 'ink';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 17px; -webkit-font-smoothing: antialiased; }
body { font-family: 'Source Sans 3', sans-serif; color: #1a1a1a; background: #faf6f0; line-height: 1.7; max-width: 800px; margin: 0 auto; padding: 40px 40px 32px; }
a { color: #c1553d; text-decoration: underline; text-decoration-color: rgba(193,85,61,0.3); text-underline-offset: 3px; }
a:hover { text-decoration-color: #c1553d; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 24px; border-bottom: 1px solid #d8d0c4; font-size: 14px; }
nav .site-name { font-family: 'Instrument Serif', serif; font-size: 16px; color: #1a1a1a; text-decoration: none; font-weight: 400; margin-right: auto; }
nav a { color: #999; text-decoration: none; } nav a:hover { color: #1a1a1a; }
nav .active { color: #1a1a1a; font-weight: 500; }
h1 { font-family: 'Instrument Serif', serif; font-size: 30px; font-weight: 400; margin-bottom: 4px; }
h2 { font-family: 'Instrument Serif', serif; font-size: 20px; font-weight: 400; margin: 24px 0 12px; }
h3 { font-family: 'Source Sans 3', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 3px; }
h3 a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #d8d0c4; text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: #1a1a1a; }
p { margin-bottom: 8px; } p:last-child { margin-bottom: 0; }
main { }
.hero { display: grid; grid-template-columns: 1fr 260px; gap: 40px; margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #d8d0c4; }
.hero-left .thesis { font-size: 17px; color: #555; margin-bottom: 12px; }
.hero-left .meta-line { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #888; line-height: 1.8; }
.hero-left .links { margin-top: 10px; font-size: 14px; }
.hero-left .links a { margin-right: 16px; }
.hero-right { background: #f3ede4; padding: 20px; }
.hero-right h3 { font-family: 'IBM Plex Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #888; margin-bottom: 12px; }
.proof-item { margin-bottom: 12px; }
.proof-metric { font-family: 'IBM Plex Mono', monospace; font-size: 20px; font-weight: 500; color: #c1553d; }
.proof-label { font-size: 13px; color: #666; }
.project { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e8e0d4; }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.project p { font-size: 14px; color: #555; }
.project .metric { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #c1553d; }
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 16px; }
.date { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #888; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0e8dc; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
ul { margin: 4px 0 0 20px; } li { font-size: 14px; color: #444; margin-bottom: 2px; line-height: 1.6; }
.detail { font-size: 14px; color: #555; }
.skills-list { font-size: 14px; color: #555; line-height: 1.9; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #d8d0c4; font-size: 12px; color: #bbb; }
footer a { color: #bbb; text-decoration: underline; text-decoration-color: rgba(0,0,0,0.15); text-underline-offset: 2px; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; background: #fff; } }
@media (max-width: 700px) { body { padding: 24px 20px; } .hero { grid-template-columns: 1fr; } .hero-right { margin-top: 12px; } .job-header { flex-direction: column; } }`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers, proofPoints,
    projects, experience, education, skills, experienceGroups } = data;

  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;

  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">${esc('LinkedIn')}</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">${esc('GitHub')}</a>`);
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

  // HOME
  const proofHtml = proofPoints.length > 0
    ? `<div class="hero-right"><h3>Proof points</h3>${proofPoints.slice(0, 4).map(p =>
        `<div class="proof-item"><div class="proof-metric">${esc(p.hero_metric || p.heroMetric || '')}</div><div class="proof-label">${esc(p.name || p.description || '')}</div></div>`
      ).join('')}</div>`
    : '';
  const metaLines = [];
  if (exitStory) metaLines.push(exitStory);
  if (currentProject) metaLines.push(`Building: ${currentProject}`);
  const homebody = `<main>
<section class="hero">
<div class="hero-left">
<h1>${esc(fullName)}</h1>
${headline ? `<p class="thesis">${esc(headline)}</p>` : ''}
${metaLines.length > 0 ? `<div class="meta-line">${metaLines.map(l => esc(l)).join('<br>')}</div>` : ''}
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</div>
${proofHtml}
</section>
${summaryText ? `<article><p>${renderInlineMarkdown(summaryText)}</p></article>` : ''}
${superpowers.length > 0 ? `<p class="detail">${superpowers.join(' / ')}</p>` : ''}
</main>`;

  // WORK
  const workBody = `<main>
<h1>Work</h1>
<p>Selected projects and things I've built.</p>
${projects.map(p => `<section class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
${p.description ? `<p>${p.description}</p>` : ''}
</section>`).join('\n')}
</main>`;

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
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
</main>`;

  // ABOUT
  const aboutParts = ['<main>', '<h1>About</h1>'];
  if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><p>What I do best: ${superpowers.join(', ').replace(/, ([^,]*)$/, ', and $1')}.</p></section>`);
  if (currentProject) aboutParts.push(`<section><h2>Now</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
  const targetRoles = data.targetRoles || [];
  const locationFlex = data.locationFlex || '';
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) aboutParts.push(`<section><h2>Looking for</h2><p>${lp.join(' ')}</p></section>`);
  if (skills.length > 0) aboutParts.push(`<section><h2>Tools</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>`);
  if (links.length > 0) aboutParts.push(`<section><h2>Contact</h2><p>${links.join(' ')}</p></section>`);
  aboutParts.push('</main>');

  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homebody],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutParts.join('\n')],
  ];

  for (const [filename, title, active, body] of pageDefs) {
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
    result[filename] = buildPage({ title: t, nav: nav(active), body, fullName, summaryShort: data.summaryShort, fonts, cssText: css() });
  }
  return result;
}

function buildPage({ title, nav, body, fullName, summaryShort, fonts, cssText }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fontLinks = fonts.map(f => `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${f}" rel="stylesheet">`).join('\n');
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
${nav}
${body}
<footer>made by <a href="https://github.com/a16z/speedrun-career-ops">speedrun</a></footer>
</body>
</html>`;
}
