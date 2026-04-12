/**
 * templates/coral.mjs — Warm Maker-Culture Zine aesthetic
 *
 * Bold condensed serif hero, coral/salmon background, white centered column,
 * warm maker-culture zine feel. Strong typographic identity from one color + one bold font.
 */

export const name = 'coral';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Source+Serif+4:wght@400;600&family=Source+Sans+3:wght@400;600&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; background: #ff6b4a; }
body { font-family: 'Source Serif 4', Georgia, serif; color: #1a1a1a; background: #fff; line-height: 1.7; margin: 0 auto; padding: 0; font-size: 15px; max-width: 640px; min-height: 100vh; box-shadow: 0 0 40px rgba(0,0,0,0.08); }
.wrap { width: 640px; padding: 32px 40px 48px; }
a { color: #c0402a; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #c0402a; }
a:hover { color: #ff6b4a; text-decoration-color: #ff6b4a; }
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #e8e0da; font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; }
nav .site-name { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 900; color: #ff6b4a; text-decoration: none; margin-right: auto; letter-spacing: -0.5px; }
nav .site-name:hover { color: #c0402a; }
nav a { color: #555; text-decoration: none; font-weight: 600; }
nav a:hover { color: #ff6b4a; }
nav .active { color: #1a1a1a; border-bottom: 2px solid #ff6b4a; padding-bottom: 2px; }
h1.hero-name { font-family: 'Playfair Display', Georgia, serif; font-size: 52px; font-weight: 900; color: #ff6b4a; line-height: 1.08; margin-bottom: 10px; letter-spacing: -1px; }
.hero-headline { font-family: 'Source Sans 3', -apple-system, sans-serif; font-size: 16px; color: #666; margin-bottom: 32px; font-weight: 400; line-height: 1.5; }
h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 700; color: #1a1a1a; margin: 40px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #e8e0da; }
main { }
.home-bio { font-size: 16px; color: #333; line-height: 1.8; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #c0402a; }
.entry { padding: 16px 0; border-bottom: 1px solid #f0ebe6; }
.entry:last-child { border-bottom: none; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 16px; color: #1a1a1a; line-height: 1.3; }
.entry-title a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #ddd; text-underline-offset: 3px; }
.entry-title a:hover { text-decoration-color: #ff6b4a; color: #ff6b4a; }
.entry-date { font-family: 'Source Sans 3', -apple-system, sans-serif; font-size: 13px; color: #999; white-space: nowrap; }
.entry-role { font-size: 14px; color: #777; font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 14px; color: #555; line-height: 1.7; }
.entry ul { margin: 6px 0 0 0; padding-left: 18px; font-size: 14px; color: #555; list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.6; }
.entry li::marker { color: #ff6b4a; }
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid #f0ebe6; }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 14px; color: #1a1a1a; }
.sub-entry .entry-date { font-size: 12px; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #999; list-style: none; font-family: 'Source Sans 3', -apple-system, sans-serif; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 4px 0; line-height: 1.6; }
.strengths-list li::before { content: '\\2014\\00a0'; color: #ff6b4a; }
.skills-grid { font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 14px; color: #555; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.contact-line { font-size: 15px; }
.contact-line a { margin-right: 20px; color: #c0402a; }
.hero-metric { font-family: 'Source Sans 3', -apple-system, sans-serif; font-size: 13px; color: #ff6b4a; font-weight: 600; }
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #e8e0da; font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif; font-size: 12px; color: #999; }
footer a { color: #999; font-weight: 600; text-decoration: underline; text-decoration-color: #ddd; }
footer a:hover { color: #ff6b4a; text-decoration-color: #ff6b4a; }
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } body { background: #fff; box-shadow: none; max-width: none; } html { background: #fff; } h1.hero-name { color: #1a1a1a; } }
@media (max-width: 660px) {
  body { max-width: 100%; }
  .wrap { width: 100% !important; padding: 20px 24px; }
  h1.hero-name { font-size: 36px; }
  nav { font-size: 13px; gap: 12px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 15px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1.hero-name { font-size: 28px; }
  nav .site-name { font-size: 18px; }
  h2 { font-size: 16px; }
  nav { font-size: 12px; gap: 8px; }
  .entry-title { font-size: 14px; }
  .entry-desc { font-size: 13px; }
  .entry ul { font-size: 13px; }
  .home-bio { font-size: 14px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
  .hero-headline { font-size: 14px; }
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
    const siteNameStyle = active === 'index.html' ? ' style="visibility:hidden"' : '';
    return `<nav><a href="index.html" class="site-name"${siteNameStyle}>${esc(fullName)}</a> ${items}</nav>`;
  }

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<h1 class="hero-name">${esc(fullName)}</h1>
${headline ? `<p class="hero-headline">${esc(headline)}</p>` : ''}
<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    parts.push(`<h1 class="hero-name">${esc(fullName)}</h1>`);
    if (headline) parts.push(`<p class="hero-headline">${esc(headline)}</p>`);
    const bioLines = [];
    if (summaryText) bioLines.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) bioLines.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) bioLines.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    const linkParts = [];
    if (linkedin) linkParts.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
    if (github) linkParts.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
    if (email) linkParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    if (linkParts.length > 0) bioLines.push(`<p>${linkParts.join(' &middot; ')}</p>`);
    parts.push(`<article class="home-bio">${bioLines.join('\n')}</article>`);
    homeContent = parts.join('\n');
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h2>Work</h2>
${projects.map(p => `<div class="entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="hero-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h2>Experience</h2>
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
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="entry-desc" style="padding:8px 0">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
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
  if (links.length > 0) aboutParts.push(`<h2>Contact</h2><p class="contact-line">${links.join(' &middot; ')}</p>`);
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
