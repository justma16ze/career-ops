/**
 * templates/lab.mjs — Research Lab aesthetic
 *
 * Serif headers, clean body, dotted separators, publication-style entries.
 * Zero color. Black on white. Academic rigor.
 */

export const name = 'lab';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Source+Sans+3:wght@400;600&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace; color: #1a1a1a; background: #f8f6f1; line-height: 1.6; margin: 0; padding: 0; font-size: 14px; }
.wrap { width: 620px; margin: 0 auto; padding: 28px 36px 40px; }
a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #bbb; }
a:hover { text-decoration-color: #1a1a1a; }
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; margin-bottom: 24px; font-size: 14px; }
nav .site-name { font-family: Georgia, serif; font-size: 26px; color: #1a1a1a; text-decoration: none; margin-right: auto; }
nav a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 6px; text-decoration-color: #ccc; }
nav a:hover { text-decoration-color: #1a1a1a; }
nav .active { text-decoration-color: #1a1a1a; text-decoration-thickness: 2px; }
h2 { font-family: Georgia, serif; font-size: 16px; font-weight: 700; color: #1a1a1a; margin: 36px 0 12px; }
main { }
.intro { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.intro p { margin-bottom: 12px; }
.intro a { color: #1a1a1a; }
.home-bio { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: #1a1a1a; }
.timeline { position: relative; margin-left: 6px; padding-left: 28px; border-left: 1px solid #ccc; margin-top: 24px; }
.entry { position: relative; padding: 14px 16px; margin-bottom: 12px; margin-left: 0; background: #fff; }
.entry::before { content: ''; position: absolute; left: -37px; top: 20px; width: 8px; height: 8px; background: #333; border-radius: 50%; border: 2px solid #f8f6f1; }
.entry:hover { background: #f7f5f0; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 700; font-size: 14px; }
.entry-title a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #ccc; text-underline-offset: 3px; }
.entry-date { font-size: 12px; color: #999; white-space: nowrap; }
.entry-role { font-size: 13px; color: #888; font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 13px; color: #555; line-height: 1.6; }
.entry ul { margin: 6px 0 0 0; padding-left: 16px; font-size: 13px; color: #555; list-style: disc; }
.entry li { margin-bottom: 3px; line-height: 1.5; }
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid #eee; }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 13px; color: #1a1a1a; }
.sub-entry .entry-date { font-size: 11px; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }
.team-grid { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #333; line-height: 1.4; column-count: 3; column-gap: 24px; }
.team-grid span { display: block; padding: 2px 0; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #333; padding: 3px 0; }
.skills-grid { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 13px; color: #555; line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }
footer { margin-top: 40px; padding-top: 12px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; color: #1a1a1a; }
footer a { color: #1a1a1a; font-weight: 600; }
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 20px 24px; }
  nav { font-size: 13px; gap: 12px; flex-wrap: wrap; }
  .timeline { margin-left: 0; padding-left: 20px; }
  .entry { padding: 12px; }
  .entry::before { left: -27px; top: 18px; width: 6px; height: 6px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .team-grid { column-count: 2; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 20px; }
  h2 { font-size: 14px; }
  nav { font-size: 12px; gap: 8px; }
  .timeline { padding-left: 16px; }
  .entry { padding: 10px; }
  .entry::before { left: -22px; width: 5px; height: 5px; }
  .entry-title { font-size: 13px; }
  .entry-desc { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 12px; }
  .team-grid { column-count: 1; }
  .skills-grid { column-count: 1; }
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
  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    const linkParts = [];
    if (linkedin) linkParts.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
    if (github) linkParts.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
    if (email) linkParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    if (linkParts.length > 0) parts.push(`<p>${linkParts.join(' ')}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<div class="timeline">
${projects.map(p => `<div class="entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="entry-date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<div class="timeline">
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
</div>
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="entry-desc">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<p class="home-bio">${renderInlineMarkdown(summaryText)}</p>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Looking For</h2><p class="entry-desc">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>Skills</h2><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
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
