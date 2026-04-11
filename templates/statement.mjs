/**
 * templates/statement.mjs — Serif Statement template
 *
 * Instrument Serif + Source Sans 3
 * #fff bg, #1a1a1a text, #d4a040 gold accent
 * Statement hero (thesis, not name), experience table
 */

export const name = 'statement';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@400;600;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; }
body { font-family: 'Source Sans 3', sans-serif; color: #1a1a1a; background: #fff; line-height: 1.65; max-width: 760px; margin: 0 auto; padding: 40px 40px 32px; }
a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ddd; }
a:hover { text-decoration-color: #1a1a1a; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 24px; border-bottom: 1px solid #eee; font-size: 13px; }
nav .site-name { font-family: 'Instrument Serif', serif; color: #1a1a1a; text-decoration: none; font-size: 15px; margin-right: auto; }
nav a { color: #bbb; text-decoration: none; } nav a:hover { color: #1a1a1a; }
nav .active { color: #1a1a1a; font-weight: 500; }
h1 { font-family: 'Instrument Serif', serif; font-size: 28px; font-weight: 400; max-width: 560px; line-height: 1.4; margin-bottom: 12px; }
h2 { font-family: 'Instrument Serif', serif; font-size: 18px; font-weight: 400; margin: 28px 0 14px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #ddd; text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: #1a1a1a; }
p { margin-bottom: 8px; } p:last-child { margin-bottom: 0; }
main { }
.hero { margin-bottom: 32px; padding-bottom: 32px; border-bottom: 1px solid #eee; }
.hero .subline { font-size: 14px; color: #888; }
.hero .links { margin-top: 8px; font-size: 13px; }
.hero .links a { margin-right: 14px; }
.exp-table { width: 100%; font-size: 14px; border-collapse: collapse; }
.exp-table td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
.exp-table .co { font-weight: 600; width: 200px; }
.exp-table .role-cell { color: #555; }
.exp-table .dates { color: #d4a040; text-align: right; white-space: nowrap; font-size: 13px; }
.project { margin-bottom: 16px; }
.project p { font-size: 14px; color: #555; }
.project .metric { font-size: 13px; color: #d4a040; }
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 15px; }
.date { font-size: 13px; color: #d4a040; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
ul { margin: 4px 0 0 20px; } li { font-size: 14px; color: #555; margin-bottom: 2px; line-height: 1.6; }
.detail { font-size: 14px; color: #555; }
.skills-list { font-size: 14px; color: #555; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #eee; font-size: 12px; color: #ddd; }
footer a { color: #ccc; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #eee; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; } }
@media (max-width: 700px) { body { padding: 24px 20px; } .exp-table .co { width: auto; } .job-header { flex-direction: column; } }`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers,
    projects, experience, education, skills, experienceGroups } = data;
  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

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

  // Statement hero uses the headline as the big statement, not the name
  const statementText = headline || summaryText || `I'm ${fullName}.`;

  // HOME
  const homeBody = `<main>
<section class="hero">
<h1>${esc(statementText)}</h1>
<p class="subline">${esc(fullName)}${location ? ` \u2014 ${esc(location)}` : ''}</p>
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</section>
${experience.length > 0 ? `<section>
<h2>Experience</h2>
<table class="exp-table">
${experienceGroups.slice(0, 4).map(g => {
    const r = g.roles[0];
    return `<tr><td class="co">${esc(g.company)}</td><td class="role-cell">${esc(r.role)}</td><td class="dates">${esc(r.dateRange)}</td></tr>`;
  }).join('\n')}
${education.slice(0, 2).map(e => `<tr><td class="co">${esc(typeof e === 'string' ? e.split(' \u2014 ')[0] : '')}</td><td class="role-cell">${esc(typeof e === 'string' && e.includes(' \u2014 ') ? e.split(' \u2014 ')[1] : '')}</td><td class="dates"></td></tr>`).join('\n')}
</table></section>` : ''}
${projects.length > 0 ? `<section>
<h2>Selected Work</h2>
${projects.slice(0, 3).map(p => `<div class="project"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>${p.description ? `<p>${p.description}</p>` : ''}${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}</div>`).join('\n')}
</section>` : ''}
</main>`;

  // WORK
  const workBody = `<main>
<h1>Work</h1>
<h2>Selected Work</h2>
${projects.map(p => `<section class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.description ? `<p>${p.description}</p>` : ''}
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
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
    ['index.html', fullName, 'index.html', homeBody],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutParts.join('\n')],
  ];

  for (const [filename, title, active, body] of pageDefs) {
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
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
${nav}
${body}
<footer>made by <a href="https://github.com/a16z/speedrun-career-ops">speedrun</a></footer>
</body>
</html>`;
}
