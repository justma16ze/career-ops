/**
 * templates/volt.mjs — Sharp + Bold aesthetic
 *
 * Product launch page energy. Sharp, high-contrast.
 * Cabinet Grotesk (Fontshare), near-white bg, rose accent.
 * Bold hero with large name (44px, weight 800), short red divider,
 * projects with rose-accented underlines.
 */

export const name = 'volt';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,700,800&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif; color: #0a0a0a; background: #fefefe; line-height: 1.6; margin: 0; padding: 0; font-size: 15px; }
.wrap { width: 640px; margin: 0 auto; padding: 32px 40px 48px; }
a { color: #e11d48; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(225,29,72,0.4); }
a:hover { text-decoration-color: #e11d48; }

/* Nav */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; font-size: 14px; font-weight: 400; }
nav .site-name { font-size: 18px; font-weight: 800; color: #0a0a0a; text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav a { color: #666; text-decoration: none; }
nav a:hover { color: #0a0a0a; }
nav .active { color: #0a0a0a; font-weight: 700; }

/* Hero */
.hero h1 { font-size: 44px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.1; color: #0a0a0a; margin-bottom: 12px; }
.hero .divider { width: 48px; height: 3px; background: #e11d48; margin-bottom: 16px; }
.hero .headline { font-size: 17px; color: #555; line-height: 1.5; margin-bottom: 8px; }
.hero .meta { font-size: 13px; color: #aaa; margin-bottom: 32px; }
.hero .meta a { color: #e11d48; font-size: 13px; }

/* Sections */
h2 { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #aaa; margin: 40px 0 16px; }
main { }

/* Home bio */
.home-bio { font-size: 16px; color: #333; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #e11d48; }

/* Project cards */
.project { padding: 20px 0; border-bottom: 1px solid #eee; }
.project:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.project-name { font-size: 16px; font-weight: 700; color: #0a0a0a; }
.project-name a { color: #0a0a0a; text-decoration: none; border-bottom: 2px solid #e11d48; padding-bottom: 1px; }
.project-name a:hover { border-color: #0a0a0a; }
.project-metric { font-size: 13px; color: #e11d48; font-weight: 700; white-space: nowrap; }
.project-desc { font-size: 14px; color: #555; line-height: 1.6; }

/* Experience */
.exp-group { padding: 20px 0; border-bottom: 1px solid #eee; }
.exp-group:last-child { border-bottom: none; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-company { font-size: 16px; font-weight: 800; color: #0a0a0a; letter-spacing: -0.01em; }
.exp-date { font-size: 12px; color: #aaa; white-space: nowrap; }
.exp-role { font-size: 14px; color: #555; font-weight: 700; margin-bottom: 4px; }
.exp-bullets { margin: 6px 0 0; padding-left: 18px; font-size: 13px; color: #555; list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.5; }
.sub-role { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid #f5f5f5; }
.sub-role:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-role .exp-header { margin-bottom: 2px; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #aaa; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* About */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 6px 0; border-bottom: 1px solid #eee; }
.strengths-list li:last-child { border-bottom: none; }
.skills-grid { font-size: 13px; color: #aaa; line-height: 1.4; column-count: 3; column-gap: 20px; }
.skills-grid span { display: block; padding: 2px 0; }
.about-text { font-size: 15px; color: #333; line-height: 1.7; margin-bottom: 12px; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* Education */
.edu { font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 6px; }

/* Footer */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #eee; font-size: 11px; color: #aaa; }
footer a { color: #aaa; text-decoration: underline; text-underline-offset: 2px; font-weight: 600; }
footer a:hover { color: #e11d48; }

/* Print */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* Responsive 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 24px 24px; }
  nav { font-size: 13px; gap: 14px; }
  .hero h1 { font-size: 32px; }
  .hero .headline { font-size: 15px; }
  .exp-header { flex-direction: column; }
  .project-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 15px; }
}

/* Responsive 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 16px; }
  nav { font-size: 12px; gap: 10px; }
  .hero h1 { font-size: 28px; }
  .hero .headline { font-size: 14px; }
  h2 { font-size: 12px; }
  .project-name { font-size: 14px; }
  .exp-company { font-size: 14px; }
  .exp-role { font-size: 13px; }
  .exp-bullets { font-size: 12px; }
  .home-bio { font-size: 14px; }
  .strengths-list li { font-size: 13px; }
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

  // META line: location + links
  function metaLine() {
    const parts = [];
    if (location) parts.push(esc(location));
    if (linkedin) parts.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
    if (github) parts.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
    if (email) parts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    return parts.length > 0 ? `<div class="meta">${parts.join(' &middot; ')}</div>` : '';
  }

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<div class="hero">
<div class="divider"></div>
${headline ? `<div class="headline">${esc(headline)}</div>` : ''}
${metaLine()}
</div>
<article class="home-bio">${homeBio}</article>`;
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
    homeContent = `<div class="hero">
<div class="divider"></div>
${headline ? `<div class="headline">${esc(headline)}</div>` : ''}
${metaLine()}
</div>
<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>${homeContent}</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h2>Projects</h2>
${projects.map(p => `<div class="project"><div class="project-header"><span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="project-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="project-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h2>Experience</h2>
${groups.map(g => {
    function renderBullets(bullets) {
      if (bullets.length === 0) return '';
      if (bullets.length <= 2) return `<ul class="exp-bullets">${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
      const visible = bullets.slice(0, 2);
      const hidden = bullets.slice(2);
      return `<ul class="exp-bullets">${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul class="exp-bullets">${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
    }
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="exp-group"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="exp-group"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="exp-header"><span class="exp-role">${esc(r.role)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (summaryText) {
    aboutParts.push(`<p class="about-text">${renderInlineMarkdown(summaryText)}</p>`);
  }
  if (exitStory) {
    aboutParts.push(`<p class="about-text">${renderInlineMarkdown(exitStory)}</p>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="about-text">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Looking For</h2><p class="about-text">${esc(targetDesc)}</p>`);
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
