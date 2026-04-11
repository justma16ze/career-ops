/**
 * templates/volt.mjs — Sharp + Bold template
 *
 * Cabinet Grotesk
 * #fefefe bg, #0a0a0a text, #e11d48 rose accent
 * Bold 44px name, red divider
 */

export const name = 'volt';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; }
body { font-family: 'Cabinet Grotesk', sans-serif; color: #0a0a0a; background: #fefefe; line-height: 1.55; max-width: 800px; margin: 0 auto; padding: 40px 40px 32px; }
a { color: #e11d48; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(225,29,72,0.3); }
a:hover { text-decoration-color: #e11d48; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 24px; border-bottom: 2px solid #0a0a0a; font-size: 13px; }
nav .site-name { font-weight: 800; font-size: 15px; color: #0a0a0a; text-decoration: none; letter-spacing: -0.02em; margin-right: auto; }
nav a { color: #888; text-decoration: none; } nav a:hover { color: #0a0a0a; }
nav .active { color: #0a0a0a; font-weight: 500; }
h1 { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; margin-bottom: 8px; line-height: 1.1; }
h2 { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #aaa; margin: 28px 0 14px; }
h3 { font-size: 18px; font-weight: 700; margin-bottom: 3px; letter-spacing: -0.01em; }
h3 a { color: #0a0a0a; text-decoration: none; border-bottom: 2px solid #e11d48; padding-bottom: 1px; }
h3 a:hover { border-color: #0a0a0a; }
p { margin-bottom: 8px; } p:last-child { margin-bottom: 0; }
main { }
.hero { margin-bottom: 32px; }
.hero .thesis { font-size: 17px; color: #444; font-weight: 400; max-width: 540px; }
.hero .meta-block { margin-top: 16px; display: flex; gap: 32px; font-size: 13px; color: #777; flex-wrap: wrap; }
.hero .meta-block strong { color: #0a0a0a; font-weight: 500; }
.hero .links { margin-top: 12px; font-size: 13px; }
.hero .links a { margin-right: 16px; }
.divider { height: 3px; background: #e11d48; width: 48px; margin-bottom: 24px; }
.project { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #eee; }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.project p { font-size: 14px; color: #555; }
.project .tech { font-size: 12px; color: #aaa; margin-top: 4px; }
.project .metric { font-size: 13px; font-weight: 600; color: #e11d48; margin-top: 3px; }
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 16px; }
.date { font-size: 12px; color: #aaa; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid #f5f5f5; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
ul { margin: 4px 0 0 20px; } li { font-size: 14px; color: #555; margin-bottom: 2px; line-height: 1.6; }
.detail { font-size: 14px; color: #555; }
.skills-list { font-size: 14px; color: #555; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 28px; padding-top: 12px; border-top: 1px solid #eee; font-size: 12px; color: #ccc; }
footer a { color: #bbb; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #eee; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; } }
@media (max-width: 700px) { body { padding: 24px 20px; } h1 { font-size: 32px; } .hero .meta-block { flex-direction: column; gap: 4px; } .job-header { flex-direction: column; } }`;
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

  const metaParts = [];
  if (exitStory) metaParts.push(`<span><strong>Currently</strong> ${esc(exitStory)}</span>`);
  if (currentProject) metaParts.push(`<span><strong>Building</strong> ${esc(currentProject)}</span>`);
  const targetRoles = data.targetRoles || [];
  if (targetRoles.length > 0) metaParts.push(`<span><strong>Looking for</strong> ${esc(targetRoles[0])}</span>`);

  const homeBody = `<main>
<section class="hero">
<h1>${esc(fullName)}</h1>
${headline ? `<p class="thesis">${esc(headline)}</p>` : ''}
${metaParts.length > 0 ? `<div class="meta-block">${metaParts.join('\n')}</div>` : ''}
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</section>
<div class="divider"></div>
${summaryText ? `<article><p>${renderInlineMarkdown(summaryText)}</p></article>` : ''}
</main>`;

  const workBody = `<main>
<h1>Work</h1>
<div class="divider"></div>
<h2>Selected Work</h2>
${projects.map(p => `<section class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.description ? `<p>${p.description}</p>` : ''}
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
</section>`).join('\n')}
</main>`;

  const groups = experienceGroups;
  const expBody = `<main>
<h1>Experience</h1>
<div class="divider"></div>
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

  const aboutParts = ['<main>', '<h1>About</h1>', '<div class="divider"></div>'];
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
${nav}
${body}
<footer>made by <a href="https://github.com/a16z/speedrun-career-ops">speedrun</a></footer>
</body>
</html>`;
}
