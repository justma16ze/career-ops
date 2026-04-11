/**
 * templates/bare.mjs — Ultra-Minimal template
 *
 * System fonts (-apple-system, BlinkMacSystemFont, sans-serif)
 * #fff bg, #111 text, #2563eb blue links
 * max-width 600px, no decoration
 */

export const name = 'bare';

export const fonts = [];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 14px; -webkit-font-smoothing: antialiased; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; background: #fff; line-height: 1.65; max-width: 600px; margin: 0 auto; padding: 32px 40px; }
a { color: #2563eb; }
a:hover { color: #1d4ed8; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 16px; font-size: 13px; }
nav .site-name { font-weight: 600; color: #111; text-decoration: none; margin-right: auto; }
nav a { color: #888; text-decoration: none; } nav a:hover { color: #111; }
nav .active { color: #111; font-weight: 500; }
h1 { font-size: 18px; font-weight: 700; margin-bottom: 2px; }
h2 { font-size: 14px; font-weight: 700; margin: 20px 0 6px; }
h3 { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
p { margin-bottom: 6px; } p:last-child { margin-bottom: 0; }
main { }
.top-links { font-size: 13px; color: #888; margin-bottom: 16px; }
.top-links a { margin-right: 10px; }
.bio { margin-bottom: 16px; }
.exp-item { margin-bottom: 8px; }
.exp-item strong { font-weight: 600; }
.exp-item .dates { color: #888; font-size: 13px; }
.exp-item p { color: #444; font-size: 13px; margin-top: 2px; }
ul { margin: 4px 0 0 18px; font-size: 13px; color: #444; }
ul li { margin-bottom: 3px; }
.detail { font-size: 13px; color: #444; }
.skills-list { font-size: 13px; color: #444; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
footer { margin-top: 24px; font-size: 11px; color: #ccc; }
footer a { color: #ccc; text-decoration: underline; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; } }
@media (max-width: 700px) { body { padding: 24px 20px; } }`;
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
  if (email) links.push(`<a href="mailto:${esc(email)}">email</a>`);

  const navItems = [
    { href: 'index.html', label: 'home' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'work' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'experience' }] : []),
    { href: 'about.html', label: 'about' },
  ];

  function nav(active) {
    const items = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(fullName)}</a> ${items}</nav>`;
  }

  // HOME — ultra-minimal
  const bioLines = [];
  if (summaryText) bioLines.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
  if (exitStory) bioLines.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
  if (currentProject) bioLines.push(`<p>Right now: ${renderInlineMarkdown(currentProject)}</p>`);

  const homeBody = `<main>
<h1>${esc(fullName)}</h1>
${links.length > 0 ? `<div class="top-links">${links.join(' ')}</div>` : ''}
${bioLines.length > 0 ? `<section class="bio">${bioLines.join('\n')}</section>` : ''}
${experience.length > 0 ? `<section>
<h2>experience</h2>
${experienceGroups.slice(0, 3).map(g => {
    const r = g.roles[0];
    return `<div class="exp-item"><strong>${esc(g.company)}</strong> <span class="dates">${esc(r.dateRange)}</span><p>${esc(r.role)}${r.bullets.length > 0 ? '. ' + r.bullets[0] : ''}</p></div>`;
  }).join('\n')}
</section>` : ''}
${projects.length > 0 ? `<section>
<h2>projects</h2>
<ul>
${projects.slice(0, 4).map(p => `<li>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}${p.heroMetric ? ` \u2014 ${esc(p.heroMetric)}` : ''}${p.description ? `, ${p.description}` : ''}</li>`).join('\n')}
</ul>
</section>` : ''}
</main>`;

  // WORK
  const workBody = `<main>
<h1>work</h1>
<h2>projects</h2>
<ul>
${projects.map(p => `<li>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}${p.heroMetric ? ` \u2014 ${esc(p.heroMetric)}` : ''}${p.description ? `, ${p.description}` : ''}</li>`).join('\n')}
</ul>
</main>`;

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h1>experience</h1>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<article class="exp-item"><strong>${esc(g.company)}</strong> <span class="dates">${esc(r.dateRange)}</span>${r.role ? `<p>${esc(r.role)}</p>` : ''}${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<article class="exp-item"><strong>${esc(g.company)}</strong> <span class="dates">${esc(spanDate)}</span>${g.roles.map(r => `<p>${esc(r.role)}${r.dateRange ? ` (${esc(r.dateRange)})` : ''}</p>${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<section><h2>education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</section>` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>', '<h1>about</h1>'];
  if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><p>What I do best: ${superpowers.join(', ').replace(/, ([^,]*)$/, ', and $1')}.</p></section>`);
  if (currentProject) aboutParts.push(`<section><h2>now</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
  const targetRoles = data.targetRoles || [];
  const locationFlex = data.locationFlex || '';
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) aboutParts.push(`<section><h2>looking for</h2><p>${lp.join(' ')}</p></section>`);
  if (skills.length > 0) aboutParts.push(`<section><h2>tools</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>`);
  if (links.length > 0) aboutParts.push(`<section><h2>contact</h2><p>${links.join(' ')}</p></section>`);
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
