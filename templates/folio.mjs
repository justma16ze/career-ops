/**
 * templates/folio.mjs — Warm + Text-Forward template
 *
 * Mood: The kind of personal site a thoughtful person would make by hand
 *
 * Display: Instrument Serif (Google Fonts)
 * Body: DM Sans (Google Fonts)
 * Background: #f8f5f0 (warm cream)
 * Text: #222
 * Accent: #2563eb (blue) — links, metrics
 * Layout: Two-column (bio + projects left, skills sidebar right). Generous paragraphs.
 * Border: #ddd5c8 (warm separator)
 */

export const name = 'folio';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'DM Sans', sans-serif; color: #222; background: #f8f5f0; line-height: 1.7; margin: 0; padding: 0; }
.wrap { width: 700px; margin: 0 auto; padding: 40px 40px 32px; }
a { color: #2563eb; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(37,99,235,0.3); }
a:hover { text-decoration-color: #2563eb; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 12px; margin-bottom: 24px; border-bottom: 1px solid #ddd5c8; font-size: 13px; }
nav .site-name { font-family: 'Instrument Serif', serif; color: #222; text-decoration: none; font-size: 18px; margin-right: auto; }
nav a { color: #999; text-decoration: none; }
nav a:hover { color: #222; }
nav .active { color: #222; font-weight: 500; }
h1 { font-family: 'Instrument Serif', serif; font-size: 36px; font-weight: 400; line-height: 1.2; margin-bottom: 12px; }
h2 { font-family: 'Instrument Serif', serif; font-size: 22px; font-weight: 400; margin: 32px 0 12px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: #222; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ccc; }
h3 a:hover { text-decoration-color: #222; }
p { margin-bottom: 10px; }
p:last-child { margin-bottom: 0; }
main { }
.home-bio { font-size: 15px; color: #444; line-height: 1.8; margin-bottom: 28px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: #2563eb; }
.two-col { display: grid; grid-template-columns: 1fr 200px; gap: 40px; margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #ddd5c8; }
.skills-sidebar { font-size: 13px; color: #777; line-height: 1.9; }
.skills-sidebar .sidebar-label { display: block; color: #222; font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 12px; margin-bottom: 2px; font-weight: 700; }
.skills-sidebar .sidebar-label:first-child { margin-top: 0; }
.project { margin-bottom: 20px; }
.project p { font-size: 14px; color: #555; line-height: 1.7; }
.project .metric { font-size: 13px; color: #2563eb; margin-top: 2px; }
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.job-header .company { font-size: 15px; font-weight: 700; }
.date { font-size: 12px; color: #999; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 10px; padding-top: 10px; border-top: 1px solid #ece5da; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 2px; }
.sub-role-header .role { font-weight: 600; font-size: 14px; color: #222; margin-bottom: 0; }
ul { margin: 4px 0 0 20px; }
li { font-size: 14px; color: #444; margin-bottom: 3px; line-height: 1.6; }
.detail { font-size: 14px; color: #555; }
.skills-list { font-size: 14px; color: #555; line-height: 1.9; }
.links { font-size: 13px; margin-top: 8px; }
.links a { margin-right: 14px; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #ddd5c8; font-size: 12px; color: #999; }
footer a { color: #888; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #ccc; }
@media print { nav, footer { display: none; } .wrap { padding: 1rem; width: auto; max-width: none; } body { background: #fff; } }
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 24px 20px; }
  .two-col { grid-template-columns: 1fr; gap: 24px; }
  h1 { font-size: 28px; }
  nav { font-size: 12px; gap: 14px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 15px; }
  nav { font-size: 11px; gap: 10px; }
  h1 { font-size: 24px; }
  h2 { font-size: 18px; }
  .home-bio { font-size: 13px; }
  .project p { font-size: 13px; }
  .project .metric { font-size: 12px; }
  li { font-size: 13px; }
  .job-header .company { font-size: 14px; }
  .role { font-size: 13px; }
  .date { font-size: 11px; }
  .skills-sidebar { font-size: 12px; }
  .skills-list { font-size: 13px; }
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

  // HOME — homeBio primary, fallback to summaryText
  let homeContent;
  if (homeBio) {
    homeContent = `<div class="home-bio">${homeBio}</div>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    if (links.length > 0) parts.push(`<div class="links">${links.join(' ')}</div>`);
    homeContent = `<div class="home-bio">${parts.join('\n')}</div>`;
  }

  // Skills sidebar for homepage two-column
  const skillsSidebar = skills.length > 0
    ? `<div class="skills-sidebar"><span class="sidebar-label">Skills</span>${skills.slice(0, 15).map(s => esc(s)).join(', ')}</div>`
    : '';

  // Homepage two-column: bio + selected projects left, skills right
  const selectedProjects = projects.slice(0, 3);
  const leftCol = selectedProjects.length > 0
    ? `<h2>Selected work</h2>${selectedProjects.map(p => `<div class="project"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>${p.description ? `<p>${p.description}</p>` : ''}${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}</div>`).join('\n')}`
    : '';

  // Two-column only when there are projects for the left side; otherwise skills go below bio
  let homeLower = '';
  if (leftCol && skillsSidebar) {
    homeLower = `<div class="two-col">
<div>${leftCol}</div>
${skillsSidebar}
</div>`;
  } else if (leftCol) {
    homeLower = `<div>${leftCol}</div>`;
  } else if (skillsSidebar) {
    homeLower = skillsSidebar;
  }

  const homeBody = `<main>
${homeContent}
${homeLower}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h1>Work</h1>
<p style="color:#555;margin-bottom:24px;">Selected projects and things I've built.</p>
${projects.map(p => `<div class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.description ? `<p>${p.description}</p>` : ''}
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
</div>`).join('\n')}
</main>` : '';

  // EXPERIENCE — bold title + date same line
  const groups = experienceGroups;
  const expBody = `<main>
<h1>Experience</h1>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<article class="job"><div class="job-header"><span class="company">${esc(g.company)}</span>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="role">${esc(r.role)}</div>` : ''}${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<article class="job"><div class="job-header"><span class="company">${esc(g.company)}</span><span class="date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><span class="role">${esc(r.role)}</span>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<section><h2>Education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</section>` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>', '<h1>About</h1>'];
  if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><p>What I do best: ${superpowers.join(', ').replace(/, ([^,]*)$/, ', and $1')}.</p></section>`);
  if (currentProject) aboutParts.push(`<section><h2>Now</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
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
<div class="wrap">
${nav}
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>
</body>
</html>`;
}
