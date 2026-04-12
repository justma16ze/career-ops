/**
 * templates/ember.mjs — Blog-forward hot pink aesthetic
 *
 * Montserrat Black headlines in hot pink, Merriweather body,
 * pristine white background, generous spacing, blog-forward layout.
 * Dark mode variant with #ffa7c4 pink on dark bg.
 */

export const name = 'ember';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@900&family=Merriweather:ital,wght@0,400;0,700;1,400&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 18px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: Merriweather, Georgia, serif; color: #222; background: #fff; line-height: 1.7; margin: 0; padding: 0; }
.wrap { width: 672px; margin: 0 auto; padding: 48px 24px 40px; }
a { color: #d23669; text-decoration: underline; text-decoration-color: #d23669; text-underline-offset: 3px; }
a:hover { text-decoration-color: #222; }

/* NAV */
nav { display: flex; align-items: baseline; margin-bottom: 56px; gap: 20px; flex-wrap: wrap; }
nav .site-name { font-family: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 900; font-size: 24px; color: #222; text-decoration: none; margin-right: auto; letter-spacing: -0.5px; }
nav .site-name:hover { color: #d23669; }
nav a { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #222; text-decoration: none; font-size: 14px; font-weight: 500; }
nav a:hover { color: #d23669; }
nav .active { color: #d23669; font-weight: 700; }
nav span.active { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; }

/* HEADINGS */
h2 { font-family: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 900; font-size: 28px; color: #d23669; margin: 48px 0 16px; line-height: 1.3; letter-spacing: -0.5px; }
h2 a { color: #d23669; text-decoration: none; }
h2 a:hover { text-decoration: underline; text-decoration-color: #d23669; }
h3 { font-family: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 900; font-size: 20px; color: #d23669; margin: 32px 0 8px; line-height: 1.3; }

/* MAIN */
main { }

/* HOME BIO */
.home-bio { font-size: 1rem; color: #222; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: #d23669; }

/* BLOG-STYLE ENTRIES (projects/work) */
.post-list { margin-top: 8px; }
.post-entry { margin-bottom: 48px; }
.post-entry .post-title { font-family: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 900; font-size: 28px; color: #d23669; line-height: 1.3; letter-spacing: -0.5px; margin-bottom: 4px; }
.post-entry .post-title a { color: #d23669; text-decoration: none; }
.post-entry .post-title a:hover { text-decoration: underline; text-decoration-color: #d23669; }
.post-entry .post-date { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #999; margin-bottom: 6px; }
.post-entry .post-desc { font-size: 1rem; color: #555; line-height: 1.7; }
.post-entry .post-metric { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #999; margin-top: 2px; }

/* EXPERIENCE */
.exp-group { margin-bottom: 48px; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-company { font-family: Montserrat, -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 900; font-size: 22px; color: #d23669; letter-spacing: -0.3px; }
.exp-span { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #999; white-space: nowrap; }
.exp-role { font-weight: 700; font-size: 1rem; color: #222; margin-top: 8px; }
.exp-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.exp-role-date { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #999; white-space: nowrap; }
.exp-bullets { margin: 8px 0 0 0; padding-left: 20px; list-style: disc; }
.exp-bullets li { font-size: 0.9rem; color: #555; line-height: 1.65; margin-bottom: 4px; }
.exp-sub { margin-top: 16px; padding-top: 16px; border-top: 1px solid #eee; }
.exp-sub:first-child { margin-top: 8px; padding-top: 0; border-top: none; }

/* DETAILS (show more) */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* ABOUT */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 1rem; color: #222; padding: 6px 0; border-bottom: 1px solid #f0f0f0; }
.strengths-list li:last-child { border-bottom: none; }
.skills-grid { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; color: #555; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }
.contact-line { font-size: 1rem; }
.contact-line a { margin-right: 16px; }
.entry-desc { font-size: 1rem; color: #555; line-height: 1.7; }

/* EDUCATION */
.edu-entry { font-size: 1rem; color: #222; margin-bottom: 8px; line-height: 1.6; }

/* FOOTER */
footer { margin-top: 56px; padding-top: 16px; border-top: 1px solid #eee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 13px; color: #999; }
footer a { color: #d23669; font-weight: 600; text-decoration: none; }
footer a:hover { text-decoration: underline; }

/* DARK MODE */
@media (prefers-color-scheme: dark) {
  body { background: rgb(40, 44, 53); color: rgba(255,255,255,0.88); }
  nav .site-name { color: #fff; }
  nav .site-name:hover { color: #ffa7c4; }
  nav a { color: rgba(255,255,255,0.88); }
  nav a:hover { color: #ffa7c4; }
  nav .active { color: #ffa7c4; }
  a { color: #ffa7c4; text-decoration-color: #ffa7c4; }
  a:hover { text-decoration-color: rgba(255,255,255,0.88); }
  h2 { color: #ffa7c4; }
  h2 a { color: #ffa7c4; }
  h3 { color: #ffa7c4; }
  .home-bio { color: rgba(255,255,255,0.88); }
  .home-bio a { color: #ffa7c4; }
  .post-entry .post-title { color: #ffa7c4; }
  .post-entry .post-title a { color: #ffa7c4; }
  .post-entry .post-desc { color: rgba(255,255,255,0.6); }
  .post-entry .post-date { color: rgba(255,255,255,0.5); }
  .post-entry .post-metric { color: rgba(255,255,255,0.5); }
  .exp-company { color: #ffa7c4; }
  .exp-span { color: rgba(255,255,255,0.5); }
  .exp-role { color: #fff; }
  .exp-role-date { color: rgba(255,255,255,0.5); }
  .exp-bullets li { color: rgba(255,255,255,0.6); }
  .exp-sub { border-top-color: rgba(255,255,255,0.1); }
  .strengths-list li { color: rgba(255,255,255,0.88); border-bottom-color: rgba(255,255,255,0.1); }
  .skills-grid { color: rgba(255,255,255,0.6); }
  .entry-desc { color: rgba(255,255,255,0.6); }
  .edu-entry { color: rgba(255,255,255,0.88); }
  footer { border-top-color: rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); }
  footer a { color: #ffa7c4; }
  details summary { color: rgba(255,255,255,0.4); }
}

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* RESPONSIVE 660 */
@media (max-width: 660px) {
  html { font-size: 16px; }
  .wrap { width: 100% !important; padding: 32px 20px; }
  nav { font-size: 13px; gap: 14px; margin-bottom: 36px; }
  nav .site-name { font-size: 20px; }
  h2 { font-size: 24px; margin: 36px 0 12px; }
  h3 { font-size: 18px; }
  .post-entry { margin-bottom: 36px; }
  .post-entry .post-title { font-size: 24px; }
  .exp-company { font-size: 20px; }
  .exp-header { flex-direction: column; gap: 2px; }
  .exp-role-header { flex-direction: column; gap: 2px; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 0.95rem; }
}

/* RESPONSIVE 480 */
@media (max-width: 480px) {
  .wrap { padding: 20px 16px !important; }
  nav .site-name { font-size: 18px; }
  nav { gap: 10px; }
  h2 { font-size: 20px; }
  h3 { font-size: 16px; }
  .post-entry .post-title { font-size: 20px; }
  .exp-company { font-size: 18px; }
  .exp-role { font-size: 0.9rem; }
  .exp-bullets li { font-size: 0.85rem; }
  .home-bio { font-size: 0.9rem; }
  .strengths-list li { font-size: 0.9rem; }
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
    if (linkParts.length > 0) parts.push(`<p>${linkParts.join(' &middot; ')}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK (blog-style post list)
  const workBody = projects.length > 0 ? `<main>
<div class="post-list">
${projects.map(p => `<div class="post-entry">
<div class="post-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</div>
${p.heroMetric ? `<div class="post-date">${esc(p.heroMetric)}</div>` : ''}
${p.description ? `<div class="post-desc">${p.description}</div>` : ''}
</div>`).join('\n')}
</div>
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
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
      return `<div class="exp-group"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-span">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<div class="exp-group"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-span">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="exp-sub"><div class="exp-role-header"><span class="exp-role">${esc(r.role)}</span><span class="exp-role-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="edu-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
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
