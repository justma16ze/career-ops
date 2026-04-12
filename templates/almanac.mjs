/**
 * templates/almanac.mjs — Table of Contents aesthetic
 *
 * Ornate blackletter display type for the name. Dotted leaders
 * between navigation labels and Roman numerals. Off-white parchment
 * background. Archival, book-like mood. Centered, quiet, confident.
 */

export const name = 'almanac';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'EB Garamond', Georgia, 'Times New Roman', serif; color: #2a2520; background: #f4f0e8; line-height: 1.7; margin: 0; padding: 0; font-size: 16px; }
.wrap { width: 620px; margin: 0 auto; padding: 48px 36px 40px; }

/* Links */
a { color: #2a2520; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #c4b9a8; transition: text-decoration-color 0.2s; }
a:hover { text-decoration-color: #2a2520; }

/* ─── Navigation ─── */
nav { margin-bottom: 52px; text-align: center; }
nav .site-name { font-family: 'Playfair Display SC', 'Playfair Display', Georgia, serif; font-size: 56px; font-weight: 900; letter-spacing: 0.04em; color: #2a2520; text-decoration: none; display: block; line-height: 1.1; margin-bottom: 8px; }
nav .site-name:hover { text-decoration: none; }
nav .subtitle { font-family: 'EB Garamond', Georgia, serif; font-size: 15px; font-style: italic; color: #6b6054; letter-spacing: 0.04em; margin-bottom: 40px; display: block; }
nav .toc-list { list-style: none; padding: 0; margin: 0 auto; max-width: 380px; text-align: left; }
nav .toc-item { display: flex; align-items: baseline; gap: 0; margin-bottom: 10px; font-family: 'EB Garamond', Georgia, serif; font-size: 15px; letter-spacing: 0.1em; text-transform: uppercase; }
nav .toc-item a, nav .toc-item span.active-label { flex-shrink: 0; color: #2a2520; text-decoration: none; }
nav .toc-item a:hover { text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #2a2520; }
nav .toc-item .active-label { font-weight: 600; }
nav .toc-leader { flex: 1; overflow: hidden; margin: 0 8px; border-bottom: none; white-space: nowrap; color: #b0a898; font-size: 13px; letter-spacing: 0.2em; line-height: 1; }
nav .toc-numeral { flex-shrink: 0; font-size: 15px; color: #6b6054; letter-spacing: 0.06em; font-variant-numeric: oldstyle-nums; }

/* ─── Main content ─── */
main { margin-top: 8px; }

/* Sections */
h2 { font-family: 'Playfair Display SC', 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 700; color: #2a2520; margin: 40px 0 16px; letter-spacing: 0.06em; text-transform: uppercase; border-bottom: 1px dotted #c4b9a8; padding-bottom: 8px; }

/* Home bio */
.home-bio { font-size: 17px; color: #3a342d; line-height: 1.85; margin-bottom: 32px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #2a2520; text-decoration-color: #c4b9a8; }

/* Intro / summary */
.intro { font-size: 17px; color: #3a342d; line-height: 1.85; margin-bottom: 32px; }
.intro p { margin-bottom: 14px; }

/* ─── Experience entries ─── */
.entry { padding: 18px 0; border-bottom: 1px dotted #d6cfc2; }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 16px; color: #2a2520; }
.entry-title a { color: #2a2520; text-decoration: underline; text-decoration-color: #c4b9a8; text-underline-offset: 3px; }
.entry-title a:hover { text-decoration-color: #2a2520; }
.entry-date { font-size: 14px; color: #8a7f71; white-space: nowrap; font-style: italic; }
.entry-role { font-size: 15px; color: #6b6054; font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 15px; color: #4a443d; line-height: 1.75; }
.entry ul { margin: 8px 0 0 0; padding-left: 20px; font-size: 15px; color: #4a443d; list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.65; }
.entry li::marker { color: #c4b9a8; }

/* Sub-entries (multi-role at same company) */
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px dotted #d6cfc2; }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 600; font-style: normal; font-size: 15px; color: #2a2520; }
.sub-entry .entry-date { font-size: 13px; }

/* Details expand */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 13px; color: #8a7f71; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* ─── Projects (Work page) ─── */
.project-entry { padding: 18px 0; border-bottom: 1px dotted #d6cfc2; }
.project-entry:last-child { border-bottom: none; }

/* ─── About page ─── */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 16px; color: #3a342d; padding: 5px 0; border-bottom: 1px dotted #d6cfc2; }
.strengths-list li:last-child { border-bottom: none; }
.skills-grid { font-size: 15px; color: #4a443d; line-height: 1.5; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 3px 0; }
.contact-line { font-size: 16px; }
.contact-line a { margin-right: 24px; }

/* ─── Footer ─── */
footer { margin-top: 48px; padding-top: 12px; border-top: 1px solid #d6cfc2; font-size: 12px; color: #8a7f71; text-align: center; letter-spacing: 0.04em; }
footer a { color: #6b6054; font-weight: 600; text-decoration: underline; text-decoration-color: #c4b9a8; text-underline-offset: 3px; }
footer a:hover { text-decoration-color: #6b6054; }

/* ─── Education ─── */
.education-entry { font-size: 15px; color: #3a342d; padding: 6px 0; line-height: 1.7; }

/* ─── Print ─── */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* ─── Responsive 660px ─── */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 28px 24px; }
  nav .site-name { font-size: 38px; }
  nav .subtitle { font-size: 14px; margin-bottom: 24px; }
  nav .toc-list { max-width: 100%; }
  nav .toc-item { font-size: 14px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid { column-count: 2; }
  .home-bio { font-size: 16px; }
  h2 { font-size: 18px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ─── Responsive 480px ─── */
@media (max-width: 480px) {
  .wrap { padding: 20px 16px !important; }
  nav .site-name { font-size: 30px; }
  nav .subtitle { font-size: 13px; margin-bottom: 20px; }
  nav .toc-item { font-size: 13px; }
  nav .toc-numeral { font-size: 12px; }
  h2 { font-size: 16px; }
  .entry-title { font-size: 15px; }
  .entry-desc { font-size: 14px; }
  .entry ul { font-size: 14px; }
  .home-bio { font-size: 15px; }
  .strengths-list li { font-size: 14px; }
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

  // Roman numerals for TOC
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];

  const navItems = [
    { href: 'index.html', label: 'Home' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Work' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Experience' }] : []),
    { href: 'about.html', label: 'About' },
  ];

  function nav(active) {
    const tocItems = navItems.map((ni, idx) => {
      const numeral = romanNumerals[idx] || String(idx + 1);
      const labelHtml = ni.href === active
        ? `<span class="active-label">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`;
      const dots = ' . '.repeat(40);
      return `<li class="toc-item">${labelHtml}<span class="toc-leader">${dots}</span><span class="toc-numeral">${numeral}</span></li>`;
    }).join('\n');

    return `<nav>
<a href="index.html" class="site-name">${esc(fullName)}</a>
<span class="subtitle">${esc(headline).replace(/\s*--\s*/g, ' \u2014 ')}</span>
<ul class="toc-list">
${tocItems}
</ul>
</nav>`;
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
${projects.map(p => `<div class="project-entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="entry-date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
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
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="education-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
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
