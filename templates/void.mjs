/**
 * templates/void.mjs — Hacker-Minimal aesthetic
 *
 * Near-black background, monospace throughout, single subtle radial glow,
 * sparse link list. "Builder not designer" energy. Dark and atmospheric.
 */

export const name = 'void';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace; color: #888; background: #050505; line-height: 1.6; margin: 0; padding: 0; font-size: 14px; }
body::before { content: ''; position: fixed; top: 35%; left: 50%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,210,180,0.045) 0%, rgba(0,180,160,0.015) 40%, rgba(0,210,180,0) 70%); transform: translate(-50%, -50%); pointer-events: none; z-index: 0; }
.wrap { width: 620px; margin: 0 auto; padding: 80px 36px 40px; position: relative; z-index: 1; }
a { color: #999; text-decoration: none; transition: color 0.15s ease; }
a:hover { color: #ccc; }
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; margin-bottom: 48px; font-size: 13px; }
nav .site-name { font-size: 16px; font-weight: 500; color: #ccc; text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav a { color: #555; text-decoration: none; }
nav a:hover { color: #999; }
nav .active { color: #888; }
h2 { font-size: 13px; font-weight: 500; color: #555; margin: 40px 0 16px; text-transform: lowercase; letter-spacing: 0.05em; }
main { }
.intro { font-size: 14px; color: #888; line-height: 1.75; margin-bottom: 32px; }
.intro p { margin-bottom: 12px; }
.intro a { color: #999; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.intro a:hover { color: #ccc; text-decoration-color: #666; }
.home-bio { font-size: 14px; color: #888; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: #999; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.home-bio a:hover { color: #ccc; text-decoration-color: #666; }
.link-list { list-style: none; padding: 0; margin: 24px 0 0; }
.link-list li { padding: 8px 0; }
.link-list li a { color: #888; font-size: 14px; }
.link-list li a:hover { color: #ccc; }
.entry { padding: 16px 0; border-bottom: 1px solid #1a1a1a; }
.entry:last-child { border-bottom: none; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 500; font-size: 14px; color: #aaa; }
.entry-title a { color: #aaa; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 3px; }
.entry-title a:hover { color: #ccc; text-decoration-color: #666; }
.entry-date { font-size: 12px; color: #444; white-space: nowrap; }
.entry-role { font-size: 13px; color: #666; margin-bottom: 4px; }
.entry-desc { font-size: 13px; color: #666; line-height: 1.6; }
.entry-desc a { color: #888; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 3px; }
.entry-desc a:hover { color: #ccc; }
.entry ul { margin: 6px 0 0 0; padding-left: 0; font-size: 13px; color: #666; list-style: none; }
.entry li { margin-bottom: 3px; line-height: 1.5; padding-left: 16px; text-indent: -16px; }
.entry li::before { content: '-'; margin-right: 8px; color: #333; display: inline; }
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid #111; }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 500; font-style: normal; font-size: 13px; color: #888; }
.sub-entry .entry-date { font-size: 11px; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #444; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 13px; color: #777; padding: 4px 0; }
.strengths-list li::before { content: '-'; margin-right: 8px; color: #333; }
.skills-grid { font-size: 13px; color: #555; line-height: 1.4; column-count: 2; column-gap: 32px; }
.skills-grid span { display: block; padding: 2px 0; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; color: #888; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.contact-line a:hover { color: #ccc; text-decoration-color: #666; }
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #1a1a1a; font-size: 12px; color: #666; }
footer a { color: #777; font-weight: 500; text-decoration: underline; text-decoration-color: #444; text-underline-offset: 3px; }
footer a:hover { color: #999; }
@media print { nav, footer { display: none; } body { background: #fff; color: #1a1a1a; } body::before { display: none; } .wrap { padding: 1rem; max-width: none; } .entry-title { color: #1a1a1a; } .entry-date { color: #666; } .entry-role { color: #444; } .entry-desc { color: #333; } .entry ul { color: #333; } .entry li::before { color: #999; } h2 { color: #444; } .home-bio { color: #333; } .home-bio a { color: #1a1a1a; } .strengths-list li { color: #333; } .skills-grid { color: #333; } .contact-line a { color: #1a1a1a; } }
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 48px 24px 32px; }
  nav { font-size: 12px; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
  .entry { padding: 12px 0; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid { column-count: 1; }
  .home-bio { font-size: 13px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 32px 16px !important; }
  nav .site-name { font-size: 14px; }
  h2 { font-size: 12px; }
  nav { font-size: 11px; gap: 8px; }
  .entry-title { font-size: 13px; }
  .entry-desc { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 12px; }
  .strengths-list li { font-size: 12px; }
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
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    const linkParts = [];
    if (linkedin) linkParts.push(`<a href="${esc(linkedinUrl)}">linkedin</a>`);
    if (github) linkParts.push(`<a href="${esc(githubUrl)}">github</a>`);
    if (email) linkParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    if (linkParts.length > 0) parts.push(`<p>${linkParts.join(' ')}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
${projects.map(p => `<div class="entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="entry-date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
${groups.map(g => {
    function renderBullets(bullets) {
      if (bullets.length === 0) return '';
      if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
      const visible = bullets.slice(0, 2);
      const hidden = bullets.slice(2);
      return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
    }
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="entry-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>education</h2>${education.map(e => `<p class="entry-desc">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<p class="home-bio">${renderInlineMarkdown(summaryText)}</p>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>now</h2><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>looking for</h2><p class="entry-desc">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>skills</h2><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">linkedin</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">github</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
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
    const t = title === fullName ? title : `${title} — ${fullName}`;
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
