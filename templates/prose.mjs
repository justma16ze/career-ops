/**
 * templates/prose.mjs — Literary aesthetic
 *
 * Warm cream background, large italic serif name hero, indigo-navy text,
 * green link hover, flowing prose in a narrow column, literary confidence.
 */

export const name = 'prose';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif; color: #3f3f6d; background: #f4f4f3; line-height: 1.75; margin: 0; padding: 0; font-size: 17px; }
.wrap { width: 620px; margin: 0 auto; padding: 60px 36px 48px; }
a { color: #3f3f6d; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(63,63,109,0.3); transition: color 0.15s, text-decoration-color 0.15s; }
a:hover { color: #4fc08d; text-decoration-color: #4fc08d; }

/* Nav */
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 48px; font-size: 15px; }
nav .site-name { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 24px; color: #3f3f6d; text-decoration: none; margin-right: auto; }
nav .site-name:hover { color: #4fc08d; }
nav a { color: #3f3f6d; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: rgba(63,63,109,0.25); }
nav a:hover { color: #4fc08d; text-decoration-color: #4fc08d; }
nav .active { color: #3f3f6d; text-decoration: underline; text-underline-offset: 5px; text-decoration-color: #3f3f6d; text-decoration-thickness: 2px; font-weight: 600; }

/* Hero name */
.hero-name { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 4.5em; font-weight: 400; color: #3f3f6d; line-height: 1.1; margin-bottom: 12px; letter-spacing: -0.01em; }
.hero-headline { font-size: 17px; color: rgba(63,63,109,0.5); font-style: italic; margin-bottom: 40px; }

/* Main content */
main { }
h2 { font-family: 'Instrument Serif', Georgia, serif; font-style: italic; font-size: 22px; font-weight: 400; color: #3f3f6d; margin: 48px 0 16px; }
h2:first-child { margin-top: 0; }

/* Prose blocks */
.prose { font-size: 17px; color: #3f3f6d; line-height: 1.75; margin-bottom: 32px; }
.prose p { margin-bottom: 16px; }
.prose a { color: #3f3f6d; }
.prose a:hover { color: #4fc08d; }

.home-bio { font-size: 17px; color: #3f3f6d; line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: #3f3f6d; }
.home-bio a:hover { color: #4fc08d; }

/* Experience entries */
.entry { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid rgba(63,63,109,0.1); }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: 'Source Serif 4', Georgia, serif; font-weight: 600; font-size: 17px; color: #3f3f6d; }
.entry-title a { color: #3f3f6d; text-decoration: underline; text-decoration-color: rgba(63,63,109,0.3); }
.entry-title a:hover { color: #4fc08d; text-decoration-color: #4fc08d; }
.entry-date { font-size: 14px; color: rgba(63,63,109,0.55); white-space: nowrap; font-style: italic; }
.entry-role { font-size: 15px; color: rgba(63,63,109,0.7); font-style: italic; margin-bottom: 6px; }
.entry-desc { font-size: 16px; color: rgba(63,63,109,0.8); line-height: 1.7; }
.entry ul { margin: 8px 0 0 0; padding-left: 20px; font-size: 16px; color: rgba(63,63,109,0.8); list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.65; }

/* Sub-entries for multi-role companies */
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid rgba(63,63,109,0.08); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 600; font-style: normal; font-size: 15px; color: #3f3f6d; }
.sub-entry .entry-date { font-size: 13px; }

/* Details / expand */
details { margin-top: 8px; }
details summary { cursor: pointer; font-size: 13px; color: rgba(63,63,109,0.45); list-style: none; font-style: italic; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* Strengths */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 16px; color: rgba(63,63,109,0.85); padding: 4px 0; line-height: 1.65; }

/* Skills grid */
.skills-grid { font-size: 15px; color: rgba(63,63,109,0.7); line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }

/* Contact */
.contact-line { font-size: 16px; }
.contact-line a { text-decoration-color: rgba(63,63,109,0.3); }
.contact-line .sep { color: rgba(63,63,109,0.3); margin: 0 12px; }

/* Footer */
footer { margin-top: 56px; padding-top: 16px; border-top: 1px solid rgba(63,63,109,0.1); font-size: 13px; color: rgba(63,63,109,0.4); font-style: italic; }
footer a { color: rgba(63,63,109,0.5); font-style: italic; }
footer a:hover { color: #4fc08d; }

/* Print */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } .hero-name { font-size: 2.5em; } }

/* Tablet */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 40px 24px; }
  .hero-name { font-size: 3em; margin-bottom: 8px; }
  .hero-headline { font-size: 16px; margin-bottom: 24px; }
  nav { font-size: 14px; gap: 12px; }
  .entry-header { flex-direction: column; }
  .entry-date { margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 16px; }
  .prose { font-size: 16px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* Phone */
@media (max-width: 480px) {
  .wrap { padding: 28px 16px !important; }
  .hero-name { font-size: 2.4em; margin-bottom: 6px; }
  .hero-headline { font-size: 14px; margin-bottom: 18px; }
  nav .site-name { font-size: 20px; }
  nav { font-size: 13px; gap: 8px; }
  h2 { font-size: 18px; }
  .entry-title { font-size: 16px; }
  .entry-desc { font-size: 15px; }
  .entry ul { font-size: 15px; }
  .home-bio { font-size: 15px; }
  .prose { font-size: 15px; }
  .strengths-list li { font-size: 15px; }
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
    const siteNameStyle = active === 'index.html' ? ' style="visibility:hidden"' : '';
    return `<nav><a href="index.html" class="site-name"${siteNameStyle}>${esc(fullName)}</a> ${items}</nav>`;
  }

  // HOME — hero name + flowing prose
  const headlineText = headline ? headline.replace(/\s*--\s*/g, ' \u2014 ') : '';
  const headlineHtml = headlineText ? `<div class="hero-headline">${esc(headlineText)}</div>` : '';
  let homeContent;
  if (homeBio) {
    homeContent = `<div class="hero-name">${esc(fullName)}</div>\n${headlineHtml}\n<article class="home-bio">${homeBio}</article>`;
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
    homeContent = `<div class="hero-name">${esc(fullName)}</div>\n${headlineHtml}\n<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>\n${homeContent}\n</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h2>Work</h2>
${projects.map(p => `<div class="entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="entry-date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
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
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="entry-desc" style="margin-bottom:8px;">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Looking For</h2><p class="entry-desc">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>Skills</h2><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutParts.push(`<h2>Contact</h2><p class="contact-line">${links.join('<span class="sep">/</span>')}</p>`);
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
