/**
 * templates/statement.mjs — Serif Statement template
 *
 * Mood: Your hero text IS the design. Statement-driven, confident.
 *
 * Display: Instrument Serif (Google Fonts)
 * Body: Source Sans 3 (Google Fonts)
 * Background: #fff
 * Text: #1a1a1a
 * Accent: #d4a040 (warm gold) — experience dates, metrics
 * Layout: Large serif statement as hero (not the name, a thesis/headline),
 *         then clean experience table (company | role | dates), then projects
 * Border: #eee / #f0f0f0
 */

export const name = 'statement';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@400;600;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Source Sans 3', sans-serif; color: #1a1a1a; background: #fff; line-height: 1.65; margin: 0; padding: 0; font-size: 15px; }
.wrap { width: 700px; margin: 0 auto; padding: 40px 40px 32px; }
a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ddd; }
a:hover { text-decoration-color: #1a1a1a; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 32px; border-bottom: 1px solid #eee; font-size: 13px; }
nav .site-name { font-family: 'Instrument Serif', serif; color: #1a1a1a; text-decoration: none; font-size: 16px; margin-right: auto; }
nav a { color: #bbb; text-decoration: none; }
nav a:hover { color: #1a1a1a; }
nav .active { color: #1a1a1a; font-weight: 600; }
h1 { font-family: 'Instrument Serif', serif; font-size: 40px; font-weight: 400; max-width: 600px; line-height: 1.25; margin-bottom: 16px; }
h2 { font-family: 'Instrument Serif', serif; font-size: 20px; font-weight: 400; margin: 36px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #f0f0f0; }
h2:first-child { margin-top: 0; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #ddd; text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: #1a1a1a; }
p { margin-bottom: 10px; }
p:last-child { margin-bottom: 0; }
main { }
.hero { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #eee; }
.hero .subline { font-size: 14px; color: #888; margin-top: 4px; }
.hero .links { margin-top: 10px; font-size: 13px; }
.hero .links a { margin-right: 16px; }
.home-bio { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: #1a1a1a; }
.exp-table { width: 100%; font-size: 14px; border-collapse: collapse; }
.exp-table td { padding: 10px 0; border-bottom: 1px solid #f0f0f0; vertical-align: top; }
.exp-table .co { font-weight: 600; width: 180px; }
.exp-table .role-cell { color: #555; }
.exp-table .dates { color: #d4a040; text-align: right; white-space: nowrap; font-size: 13px; }
.project { margin-bottom: 20px; }
.project p { font-size: 14px; color: #555; line-height: 1.6; }
.project .metric { font-size: 13px; color: #d4a040; margin-top: 2px; }
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 15px; }
.date { font-size: 13px; color: #d4a040; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0f0f0; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.sub-role .role { font-weight: 600; color: #1a1a1a; }
ul { margin: 6px 0 0 20px; }
li { font-size: 14px; color: #555; margin-bottom: 3px; line-height: 1.6; }
.detail { font-size: 14px; color: #555; }
.skills-list { font-size: 14px; color: #555; line-height: 1.8; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #333; padding: 6px 0; border-bottom: 1px solid #f0f0f0; }
.strengths-list li:last-child { border-bottom: none; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 16px; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
footer a { color: #888; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #ccc; }
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: auto; } }
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 24px 20px; }
  h1 { font-size: 30px; }
  nav { font-size: 12px; gap: 12px; }
  nav .site-name { font-size: 15px; }
  .exp-table .co { width: auto; }
  .exp-table { font-size: 13px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1 { font-size: 24px; }
  h2 { font-size: 17px; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 11px; gap: 8px; }
  .exp-table { font-size: 12px; }
  .exp-table .dates { font-size: 11px; }
  .job-header strong { font-size: 14px; }
  .date { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  li { font-size: 13px; }
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

  // Statement hero: headline in large Instrument Serif, NOT the name
  const statementText = headline || summaryText || `I'm ${fullName}.`;

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<section class="hero">
<h1>${esc(statementText)}</h1>
<p class="subline">${esc(fullName)}${location ? ` \u2014 ${esc(location)}` : ''}</p>
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</section>
<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    if (links.length > 0) parts.push(`<p>${links.join(' ')}</p>`);
    homeContent = `<section class="hero">
<h1>${esc(statementText)}</h1>
<p class="subline">${esc(fullName)}${location ? ` \u2014 ${esc(location)}` : ''}</p>
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</section>
<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h2>Selected Work</h2>
${projects.map(p => `<div class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.description ? `<p>${p.description}</p>` : ''}
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
</div>`).join('\n')}
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h2>Experience</h2>
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
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="detail">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Looking For</h2><p class="detail">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>Tools</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p>`);
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
