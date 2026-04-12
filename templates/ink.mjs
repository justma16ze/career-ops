/**
 * templates/ink.mjs — Warm Editorial template
 *
 * Mood: A beautifully typeset magazine feature about an interesting person
 * Instrument Serif (display) + Source Sans 3 (body) + IBM Plex Mono (metadata)
 * #faf6f0 parchment bg, #1a1a1a ink text, #c1553d warm red accent
 * Two-column hero (name + thesis left, proof metrics right)
 * Editorial sections with hairline rules
 */

export const name = 'ink';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@300;400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 17px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; overflow-y: scroll; }
body { font-family: 'Source Sans 3', 'Source Sans Pro', sans-serif; color: #1a1a1a; background: #faf6f0; line-height: 1.72; margin: 0; padding: 0; }
.wrap { width: 740px; margin: 0 auto; padding: 36px 40px 40px; }
a { color: #c1553d; text-decoration: underline; text-decoration-color: rgba(193,85,61,0.3); text-underline-offset: 3px; transition: text-decoration-color 0.15s; }
a:hover { text-decoration-color: #c1553d; }

/* ---- NAV ---- */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 32px; border-bottom: 1px solid #d8d0c4; font-size: 14px; font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.01em; }
nav .site-name { font-family: 'Instrument Serif', serif; font-size: 20px; color: #1a1a1a; text-decoration: none; font-weight: 400; margin-right: auto; letter-spacing: 0; }
nav a { color: #999; text-decoration: none; }
nav a:hover { color: #1a1a1a; }
nav .active { color: #1a1a1a; font-weight: 500; }

/* ---- HEADINGS ---- */
h1 { font-family: 'Instrument Serif', serif; font-size: 38px; font-weight: 400; line-height: 1.15; margin-bottom: 8px; letter-spacing: -0.01em; }
h2 { font-family: 'Instrument Serif', serif; font-size: 22px; font-weight: 400; margin: 32px 0 14px; padding-top: 24px; border-top: 1px solid #d8d0c4; line-height: 1.3; }
h2:first-child { margin-top: 0; padding-top: 0; border-top: none; }
h3 { font-family: 'Source Sans 3', sans-serif; font-size: 16px; font-weight: 600; margin-bottom: 2px; line-height: 1.4; }
h3 a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #d8d0c4; text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: #1a1a1a; }

/* ---- BODY TEXT ---- */
p { margin-bottom: 10px; font-size: 16px; }
p:last-child { margin-bottom: 0; }
main { }

/* ---- HOME HERO ---- */
.hero { display: grid; grid-template-columns: 1fr 260px; gap: 40px; margin-bottom: 36px; padding-bottom: 36px; border-bottom: 1px solid #d8d0c4; align-items: start; }
.hero-left .headline { font-family: 'Instrument Serif', serif; font-size: 19px; font-weight: 400; font-style: italic; color: #666; margin: 6px 0 16px; line-height: 1.55; }
.hero-left .meta-line { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #999; line-height: 1.9; }
.hero-left .links { margin-top: 16px; font-size: 14px; }
.hero-left .links a { margin-right: 18px; }

/* ---- PROOF SIDEBAR ---- */
.hero-right { background: #f3ede4; padding: 20px 24px; border-left: 3px solid #c1553d; }
.hero-right h3 { font-family: 'IBM Plex Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 0.12em; color: #999; margin-bottom: 16px; font-weight: 500; }
.proof-item { margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #e4ddd4; }
.proof-item:last-child { margin-bottom: 0; padding-bottom: 0; border-bottom: none; }
.proof-metric { font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 500; color: #c1553d; line-height: 1.4; }
.proof-label { font-size: 12px; color: #888; margin-top: 2px; letter-spacing: 0.01em; }

/* ---- HOME BIO ---- */
.home-bio { font-size: 16px; color: #333; line-height: 1.78; }
.home-bio p { margin-bottom: 14px; }
.home-bio p:first-child::first-letter { font-family: 'Instrument Serif', serif; font-size: 3em; float: left; line-height: 0.82; margin-right: 5px; margin-top: 5px; color: #c1553d; font-weight: 400; }
.home-bio a { color: #c1553d; }
.summary-text { font-size: 16px; color: #333; line-height: 1.78; margin-bottom: 16px; }
.superpowers { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #777; margin-top: 12px; letter-spacing: 0.01em; }

/* ---- WORK/PROJECTS ---- */
.project { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #e8e0d4; }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.project p { font-size: 15px; color: #555; line-height: 1.7; }
.project .metric { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #c1553d; margin-top: 4px; }

/* ---- EXPERIENCE ---- */
.job { margin-bottom: 0; padding: 28px 0; border-top: 1px solid #d8d0c4; }
.job:first-child { border-top: none; padding-top: 0; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.job-header strong { font-size: 16px; }
.date { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #999; white-space: nowrap; }
.role { font-size: 15px; color: #555; margin-bottom: 6px; }
.sub-role { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f0e8dc; }
.sub-role:first-child { margin-top: 6px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.sub-role .role { font-weight: 600; color: #1a1a1a; font-size: 14px; }
ul { margin: 6px 0 0 20px; }
li { font-size: 14px; color: #444; margin-bottom: 3px; line-height: 1.65; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* ---- ABOUT ---- */
.detail { font-size: 15px; color: #555; line-height: 1.7; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #444; padding: 4px 0; line-height: 1.6; }
.skills-list { font-family: 'IBM Plex Mono', monospace; font-size: 13px; color: #666; line-height: 2; }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }

/* ---- EDUCATION ---- */
.edu { margin-bottom: 8px; }

/* ---- FOOTER ---- */
footer { margin-top: 48px; padding-top: 14px; border-top: 1px solid #d8d0c4; font-size: 11px; color: #bbb; font-family: 'IBM Plex Mono', monospace; }
footer a { color: #bbb; text-decoration: underline; text-decoration-color: rgba(0,0,0,0.12); text-underline-offset: 2px; font-weight: 400; }

/* ---- PRINT ---- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; width: auto; max-width: none; } body { background: #fff; } }

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 24px 24px 32px; }
  .hero { grid-template-columns: 1fr; gap: 20px; }
  .hero-right { margin-top: 0; border-left: none; border-top: 3px solid #c1553d; }
  h1 { font-size: 30px; }
  h2 { font-size: 19px; }
  nav { font-size: 13px; gap: 14px; }
  .job-header { flex-direction: column; gap: 2px; }
  .sub-role-header { flex-direction: column; gap: 2px; }
  .home-bio { font-size: 15px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  .wrap { padding: 16px 16px 28px !important; }
  nav .site-name { font-size: 17px; }
  h1 { font-size: 26px; }
  h2 { font-size: 17px; margin: 24px 0 10px; padding-top: 16px; }
  nav { font-size: 12px; gap: 10px; }
  .hero-left .headline { font-size: 17px; }
  .proof-metric { font-size: 15px; }
  .proof-label { font-size: 12px; }
  li { font-size: 13px; }
  .home-bio { font-size: 14px; }
  .detail { font-size: 14px; }
  .strengths-list li { font-size: 14px; }
  .skills-list { font-size: 12px; }
}`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers, proofPoints,
    projects, experience, education, skills, experienceGroups } = data;

  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const homeBio = data.homeBio || '';
  const targetRoles = data.targetRoles || [];
  const locationFlex = data.locationFlex || '';

  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

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
  const proofHtml = proofPoints.length > 0
    ? `<div class="hero-right"><h3>Proof Points</h3>${proofPoints.slice(0, 4).map(p =>
        `<div class="proof-item"><div class="proof-metric">${esc(p.hero_metric || p.heroMetric || '')}</div><div class="proof-label">${esc(p.name || p.description || '')}</div></div>`
      ).join('')}</div>`
    : '';

  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p class="summary-text">${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p class="summary-text">${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p class="summary-text">${renderInlineMarkdown(currentProject)}</p>`);
    homeContent = parts.join('\n');
  }

  const homebody = `<main>
<section class="hero">
<div class="hero-left">
${headline ? `<p class="headline">${esc(headline)}</p>` : ''}
${location ? `<div class="meta-line">${esc(location)}</div>` : ''}
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</div>
${proofHtml}
</section>
${homeContent}
${superpowers.length > 0 ? `<p class="superpowers">${superpowers.join(' / ')}</p>` : ''}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h1>Work</h1>
${projects.map(p => `<section class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
${p.description ? `<p>${p.description}</p>` : ''}
</section>`).join('\n')}
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;

  function renderBullets(bullets) {
    if (!bullets || bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  const expBody = experience.length > 0 ? `<main>
<h1>Experience</h1>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear}\u2013${endPart}` : firstDate;
    return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong><span class="date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><div class="role">${esc(r.role)}</div>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${renderBullets(r.bullets)}</div>`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="detail edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>` : '';

  // ABOUT
  const aboutParts = ['<main>', '<h1>About</h1>'];
  if (summaryText) aboutParts.push(`<article><p class="detail">${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p class="detail">${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></section>`);
  if (currentProject) aboutParts.push(`<section><h2>Now</h2><p class="detail">${renderInlineMarkdown(currentProject)}</p></section>`);
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) aboutParts.push(`<section><h2>Looking For</h2><p class="detail">${lp.join(' ')}</p></section>`);
  if (skills.length > 0) aboutParts.push(`<section><h2>Tools &amp; Skills</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>`);
  if (links.length > 0) aboutParts.push(`<section><h2>Contact</h2><p class="detail">${links.join(' ')}</p></section>`);
  aboutParts.push('</main>');

  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homebody],
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
  const fontLinks = fonts.map(f => `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${f}" rel="stylesheet">`).join('\n');
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
