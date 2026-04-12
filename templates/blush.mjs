/**
 * templates/blush.mjs — Warm Blush-Cream Editorial
 *
 * Warm blush-cream background, centered serif editorial, single yellow accent,
 * Italian typography restraint. CSS @layer, fluid clamp() type, rlh spacing.
 */

export const name = 'blush';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap',
];

export function css() {
  return `@layer reset, base, layout, components, responsive, print;

@layer reset {
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
}

@layer base {
  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-y: scroll;
  }
  body {
    font-family: 'Source Serif 4', Georgia, 'Times New Roman', serif;
    font-size: clamp(0.875rem, 0.8rem + 0.25vw, 1.125rem);
    color: #3d2f1e;
    background: #fdf3e7;
    line-height: 1.7;
    margin: 0;
    padding: 0;
  }
  a {
    color: #3d2f1e;
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-color: #c9b99a;
    transition: text-decoration-color 0.2s;
  }
  a:hover {
    text-decoration-color: #3d2f1e;
  }
  ::selection {
    background: #FFF7B1;
    color: #3d2f1e;
  }
}

@layer layout {
  .wrap {
    width: 640px;
    margin: 0 auto;
    padding: 3rlh 2.5rem 3rlh;
    overflow-y: scroll;
  }
}

@layer components {
  /* --- Nav --- */
  nav {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    flex-wrap: wrap;
    margin-bottom: 2rlh;
    padding-bottom: 1rlh;
    border-bottom: 1px solid #e6d5c3;
  }
  nav .site-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1.25rem, 1.1rem + 0.5vw, 1.625rem);
    color: #3d2f1e;
    text-decoration: none;
    margin-right: auto;
    letter-spacing: 0.01em;
  }
  nav a {
    font-size: 0.85em;
    color: #6b5744;
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
  nav a:hover {
    color: #3d2f1e;
  }
  nav .active {
    font-size: 0.85em;
    color: #3d2f1e;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background-image: linear-gradient(to top, #FFF7B1 30%, transparent 30%);
    padding-bottom: 1px;
  }

  /* --- Headings --- */
  h2 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: clamp(1rem, 0.95rem + 0.2vw, 1.2rem);
    font-weight: 700;
    color: #3d2f1e;
    margin: 2.5rlh 0 1rlh;
    letter-spacing: -0.01em;
    display: inline-block;
    background-image: linear-gradient(to top, #FFF7B1 35%, transparent 35%);
    padding: 0 0.15em;
    margin-left: -0.15em;
  }

  /* --- Home bio --- */
  .home-bio {
    font-size: clamp(0.9375rem, 0.85rem + 0.25vw, 1.125rem);
    color: #4a3a28;
    line-height: 1.85;
    margin-bottom: 2rlh;
    margin-top: 0.5rlh;
  }
  .home-bio p {
    margin-bottom: 1.25rlh;
  }
  .home-bio a {
    color: #3d2f1e;
    font-weight: 600;
  }

  /* --- Intro / summary --- */
  .intro {
    font-size: clamp(0.9375rem, 0.85rem + 0.25vw, 1.125rem);
    color: #4a3a28;
    line-height: 1.8;
    margin-bottom: 2rlh;
  }
  .intro p { margin-bottom: 1rlh; }
  .intro a { color: #3d2f1e; }

  /* --- Experience entries --- */
  .entries {
    margin-top: 1rlh;
  }
  .entry {
    padding: 1rlh 0;
    border-bottom: 1px solid #e6d5c3;
  }
  .entry:last-child {
    border-bottom: none;
  }
  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 0.75rem;
    flex-wrap: wrap;
    margin-bottom: 0.25rlh;
  }
  .entry-title {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem);
    color: #3d2f1e;
  }
  .entry-title a {
    color: #3d2f1e;
    text-decoration: underline;
    text-decoration-color: #c9b99a;
    text-underline-offset: 0.15em;
  }
  .entry-title a:hover {
    text-decoration-color: #3d2f1e;
  }
  .entry-date {
    font-size: 0.8em;
    color: #8a7560;
    white-space: nowrap;
    letter-spacing: 0.02em;
  }
  .entry-role {
    font-size: 0.9em;
    color: #6b5744;
    font-style: italic;
    margin-bottom: 0.25rlh;
  }
  .entry-desc {
    font-size: 0.9em;
    color: #5a4a38;
    line-height: 1.7;
  }
  .entry ul {
    margin: 0.5rlh 0 0 0;
    padding-left: 1.2em;
    font-size: 0.9em;
    color: #5a4a38;
    list-style: disc;
  }
  .entry li {
    margin-bottom: 0.25rlh;
    line-height: 1.6;
  }

  /* --- Sub-entries (multi-role at one company) --- */
  .sub-entry {
    padding: 0.75rlh 0 0;
    margin-top: 0.75rlh;
    border-top: 1px solid #f0e6d8;
  }
  .sub-entry:first-child {
    padding-top: 0.25rlh;
    margin-top: 0.25rlh;
    border-top: none;
  }
  .sub-entry .entry-role {
    font-weight: 700;
    font-style: normal;
    font-size: 0.9em;
    color: #3d2f1e;
  }
  .sub-entry .entry-date {
    font-size: 0.75em;
  }

  /* --- Details/expand --- */
  details { margin-top: 0.5rlh; }
  details summary {
    cursor: pointer;
    font-size: 0.8em;
    color: #8a7560;
    list-style: none;
  }
  details summary::-webkit-details-marker { display: none; }
  details summary::before { content: '+ more'; }
  details[open] summary::before { content: '- less'; }
  details .detail-content { padding-top: 0.5rlh; }

  /* --- Work / Projects --- */
  .project-entry {
    padding: 1rlh 0;
    border-bottom: 1px solid #e6d5c3;
  }
  .project-entry:last-child {
    border-bottom: none;
  }
  .project-name {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 700;
    font-size: clamp(0.9375rem, 0.88rem + 0.2vw, 1.0625rem);
    color: #3d2f1e;
  }
  .project-name a {
    color: #3d2f1e;
    text-decoration: underline;
    text-decoration-color: #c9b99a;
    text-underline-offset: 0.15em;
  }
  .project-name a:hover {
    text-decoration-color: #3d2f1e;
  }
  .project-metric {
    display: inline-block;
    font-size: 0.8em;
    color: #6b5744;
    background: #FFF7B1;
    padding: 0.1em 0.5em;
    margin-left: 0.5em;
    letter-spacing: 0.02em;
  }
  .project-desc {
    font-size: 0.9em;
    color: #5a4a38;
    line-height: 1.7;
    margin-top: 0.25rlh;
  }

  /* --- About page --- */
  .strengths-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .strengths-list li {
    font-size: 0.95em;
    color: #4a3a28;
    padding: 0.25rlh 0;
    border-bottom: 1px solid #efe3d5;
  }
  .strengths-list li:last-child {
    border-bottom: none;
  }
  .skills-grid {
    font-size: 0.9em;
    color: #5a4a38;
    line-height: 1.6;
    column-count: 3;
    column-gap: 1.5rem;
  }
  .skills-grid span {
    display: block;
    padding: 0.15rlh 0;
  }
  .contact-line {
    font-size: 0.95em;
  }
  .contact-line a {
    margin-right: 1.25rem;
  }

  /* --- Footer --- */
  footer {
    margin-top: 3rlh;
    padding-top: 1rlh;
    border-top: 1px solid #e6d5c3;
    font-size: 0.75em;
    color: #8a7560;
    letter-spacing: 0.04em;
  }
  footer a {
    color: #6b5744;
    font-weight: 600;
    text-decoration: underline;
    text-decoration-color: #c9b99a;
  }
  footer a:hover {
    text-decoration-color: #6b5744;
  }
}

@layer responsive {
  @media (max-width: 660px) {
    .wrap { width: 100% !important; padding: 2rlh 1.5rem; }
    nav { font-size: 0.9em; gap: 0.75rem; flex-wrap: wrap; }
    .entry-header { flex-direction: column; }
    .entry-date { float: none; margin-bottom: 0.15rlh; }
    .sub-entry .entry-header { flex-direction: column; }
    .sub-entry .entry-date { float: none; }
    .skills-grid { column-count: 2; }
    .home-bio { font-size: 0.9375rem; }
    p { word-wrap: break-word; overflow-wrap: break-word; }
  }
  @media (max-width: 480px) {
    .wrap { padding: 1.5rlh 1rem !important; }
    nav .site-name { font-size: 1.2rem; }
    h2 { font-size: 0.95rem; }
    nav { font-size: 0.8em; gap: 0.5rem; }
    .entry-title { font-size: 0.9rem; }
    .entry-desc { font-size: 0.85em; }
    .entry ul { font-size: 0.85em; }
    .home-bio { font-size: 0.875rem; }
    .strengths-list li { font-size: 0.875rem; }
    .skills-grid { column-count: 1; }
  }
}

@layer print {
  @media print {
    nav, footer { display: none; }
    .wrap { padding: 1rem; max-width: none; width: 100%; }
    body { background: #fff; }
  }
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
<div class="entries">
${projects.map(p => `<div class="project-entry"><div class="entry-header"><span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="project-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="project-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<div class="entries">
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
