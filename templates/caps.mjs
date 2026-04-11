/**
 * templates/caps.mjs — Bold Confidence template
 *
 * General Sans
 * #fff bg, #111 text, #0d9488 teal accent
 * ALL-CAPS hero
 */

export const name = 'caps';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; }
body { font-family: 'General Sans', sans-serif; color: #111; background: #fff; line-height: 1.6; max-width: 760px; margin: 0 auto; padding: 48px 40px 32px; }
a { color: #0d9488; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba(13,148,136,0.3); }
a:hover { text-decoration-color: #0d9488; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; font-size: 13px; }
nav .site-name { font-weight: 700; color: #111; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.06em; margin-right: auto; }
nav a { color: #bbb; text-decoration: none; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; } nav a:hover { color: #111; }
nav .active { color: #111; font-weight: 600; }
h1 { font-size: 32px; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; line-height: 1.2; margin-bottom: 16px; max-width: 600px; }
h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #bbb; margin: 28px 0 12px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: #111; text-decoration: none; border-bottom: 2px solid #111; padding-bottom: 1px; }
h3 a:hover { border-color: #0d9488; }
p { margin-bottom: 8px; } p:last-child { margin-bottom: 0; }
main { }
.hero { margin-bottom: 32px; }
.hero .bio { font-size: 15px; color: #444; max-width: 540px; }
.hero .bio a { color: #111; text-decoration: underline; text-underline-offset: 3px; }
.hero .links { margin-top: 12px; font-size: 13px; }
.hero .links a { color: #0d9488; margin-right: 14px; }
.project { margin-bottom: 16px; }
.project p { font-size: 14px; color: #555; }
.project .metric { font-size: 13px; font-weight: 600; color: #0d9488; }
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 15px; }
.date { font-size: 12px; color: #bbb; white-space: nowrap; }
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
footer a { color: #ccc; text-decoration: underline; text-underline-offset: 2px; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; } }
@media (max-width: 700px) { body { padding: 32px 20px; } h1 { font-size: 24px; } .job-header { flex-direction: column; } }`;
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
    { href: 'index.html', label: 'HOME' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'WORK' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'EXPERIENCE' }] : []),
    { href: 'about.html', label: 'ABOUT' },
  ];

  function nav(active) {
    const items = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(fullName.toUpperCase())}</a> ${items}</nav>`;
  }

  // CAPS hero: All-caps statement
  const capsStatement = headline
    ? `I'M ${fullName.toUpperCase()}, ${headline.toUpperCase()}`
    : `I'M ${fullName.toUpperCase()}${location ? `, BASED IN ${location.toUpperCase()}` : ''}.`;

  // HOME
  const bioLines = [];
  if (summaryText) bioLines.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
  if (exitStory) bioLines.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);

  const homeBody = `<main>
<section class="hero">
<h1>${esc(capsStatement)}</h1>
${bioLines.length > 0 ? `<div class="bio">${bioLines.join('\n')}</div>` : ''}
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</section>
${projects.length > 0 ? `<section>
<h2>SELECTED WORK</h2>
${projects.slice(0, 4).map(p => `<div class="project"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>${p.description ? `<p>${p.description}</p>` : ''}${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}</div>`).join('\n')}
</section>` : ''}
</main>`;

  // WORK
  const workBody = `<main>
<h1>WORK</h1>
<h2>ALL PROJECTS</h2>
${projects.map(p => `<section class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.description ? `<p>${p.description}</p>` : ''}
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
</section>`).join('\n')}
</main>`;

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h1>EXPERIENCE</h1>
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
${education.length > 0 ? `<section><h2>EDUCATION</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</section>` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>', '<h1>ABOUT</h1>'];
  if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><p>What I do best: ${superpowers.join(', ').replace(/, ([^,]*)$/, ', and $1')}.</p></section>`);
  if (currentProject) aboutParts.push(`<section><h2>NOW</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
  const targetRoles = data.targetRoles || [];
  const locationFlex = data.locationFlex || '';
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) aboutParts.push(`<section><h2>LOOKING FOR</h2><p>${lp.join(' ')}</p></section>`);
  if (skills.length > 0) aboutParts.push(`<section><h2>TOOLS</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>`);
  if (links.length > 0) aboutParts.push(`<section><h2>CONTACT</h2><p>${links.join(' ')}</p></section>`);
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
