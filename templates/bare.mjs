/**
 * templates/bare.mjs — Ultra-Minimal template
 *
 * The anti-design design. Almost no styling. Text does everything.
 * System fonts (-apple-system, BlinkMacSystemFont, sans-serif)
 * #fff bg, #111 text, #2563eb blue links
 * Narrow single column (max-width 600px), no decoration, minimal hierarchy.
 */

export const name = 'bare';

export const fonts = [];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 14px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #111; background: #fff; line-height: 1.65; margin: 0; padding: 0; }
.wrap { max-width: 600px; margin: 0 auto; padding: 32px 40px 40px; }
a { color: #2563eb; }
a:hover { color: #1d4ed8; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 20px; font-size: 13px; }
nav .site-name { font-weight: 600; color: #111; text-decoration: none; margin-right: auto; }
nav a { color: #888; text-decoration: none; }
nav a:hover { color: #111; }
nav .active { color: #111; font-weight: 500; }
h2 { font-size: 14px; font-weight: 700; margin: 24px 0 8px; }
p { margin-bottom: 8px; }
p:last-child { margin-bottom: 0; }
main { }
.home-bio { line-height: 1.7; margin-bottom: 16px; }
.home-bio p { margin-bottom: 10px; }
.home-bio a { color: #2563eb; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.exp-header strong { font-weight: 700; }
.exp-header .dates { color: #888; font-size: 13px; white-space: nowrap; }
.exp-item { margin-bottom: 20px; }
.exp-role { font-size: 13px; color: #444; margin-top: 1px; }
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid #f0f0f0; }
.sub-role:first-child { border-top: none; padding-top: 2px; margin-top: 4px; }
.sub-role .exp-header strong { font-weight: 600; font-size: 13px; }
.sub-role .dates { font-size: 12px; }
ul { margin: 4px 0 0 18px; font-size: 13px; color: #444; }
ul li { margin-bottom: 3px; line-height: 1.5; }
.detail { font-size: 13px; color: #444; }
.skills-list { font-size: 13px; color: #444; }
.strengths { font-size: 13px; color: #444; }
.contact-line { font-size: 13px; }
.contact-line a { margin-right: 12px; }
details { margin-top: 4px; }
details summary { cursor: pointer; font-size: 12px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 4px; }
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #eee; font-size: 11px; color: #999; }
footer a { color: #999; text-decoration: underline; }
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }
@media (max-width: 700px) {
  .wrap { padding: 24px 20px; }
  nav { font-size: 12px; gap: 14px; }
  .exp-header { flex-direction: column; gap: 0; }
  .exp-header .dates { white-space: normal; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px; }
  nav { font-size: 11px; gap: 10px; }
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

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>Right now: ${renderInlineMarkdown(currentProject)}</p>`);
    if (links.length > 0) parts.push(`<p>${links.join(' ')}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK — projects as bullet lists
  const workBody = projects.length > 0 ? `<main>
<h2>projects</h2>
<ul>
${projects.map(p => `<li>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}${p.heroMetric ? ` \u2014 ${esc(p.heroMetric)}` : ''}${p.description ? `, ${p.description}` : ''}</li>`).join('\n')}
</ul>
</main>` : '';

  // EXPERIENCE — bold title + date same line
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 3) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 3);
    const hidden = bullets.slice(3);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  const groups = experienceGroups;
  const expBody = `<main>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<article class="exp-item"><div class="exp-header"><strong>${esc(g.company)}</strong><span class="dates">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<article class="exp-item"><div class="exp-header"><strong>${esc(g.company)}</strong><span class="dates">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="exp-header"><strong>${esc(r.role)}</strong><span class="dates">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<h2>education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>strengths</h2><p class="strengths">${superpowers.join(', ').replace(/, ([^,]*)$/, ', and $1')}.</p>`);
  if (currentProject) aboutParts.push(`<h2>now</h2><p>${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>looking for</h2><p class="detail">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>tools</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p>`);
  if (links.length > 0) aboutParts.push(`<h2>contact</h2><p class="contact-line">${links.join(' ')}</p>`);
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
