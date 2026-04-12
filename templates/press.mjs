/**
 * templates/press.mjs — Neo-brutalist warm aesthetic
 *
 * Thick borders, offset box shadows, warm paper background,
 * bold blue accent, yellow/coral section blocks, uppercase eyebrow labels,
 * serif display + mono tags, tactile hover lifts.
 */

export const name = 'press';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #111; background: #f7f7f2; line-height: 1.6; margin: 0; padding: 0; font-size: 15px; background-image: radial-gradient(circle, #ddd 1px, transparent 1px); background-size: 24px 24px; }
.wrap { width: 720px; margin: 0 auto; padding: 24px 36px 40px; }
a { color: #0059ff; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; }
a:hover { color: #003db3; }

/* NAV */
nav { display: flex; align-items: center; gap: 28px; padding: 16px 24px; margin-bottom: 36px; background: #ff6b4a; border: 3px solid #111; box-shadow: 6px 6px 0 0 #111; font-family: 'Space Mono', monospace; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; }
nav .site-name { font-family: 'Space Mono', monospace; font-size: 14px; font-weight: 700; color: #111; text-decoration: none; background: #fff; border: 2px solid #111; padding: 5px 12px; margin-right: auto; letter-spacing: 0.5px; text-transform: none; }
nav .site-name:hover { background: #f7f7f2; }
nav a { color: #111; text-decoration: none; font-weight: 700; }
nav a:hover { text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 2px; }
nav .active { text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 3px; font-weight: 700; }

/* HERO CARD */
.hero-card { background: #f5d547; border: 3px solid #111; box-shadow: 6px 6px 0 0 #111; padding: 40px 36px 36px; margin-bottom: 36px; }
.hero-card .eyebrow { font-family: 'Space Mono', monospace; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #111; margin-bottom: 12px; }
.hero-card h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 60px; font-weight: 900; line-height: 1.05; color: #111; margin-bottom: 24px; }
.hero-card h1 em { font-style: italic; }
.hero-card .tagline { font-size: 19px; color: #111; border-left: 5px solid #111; padding-left: 18px; margin-bottom: 18px; line-height: 1.5; font-family: 'Inter', sans-serif; }
.hero-card .intro-text { font-size: 15px; color: #333; line-height: 1.7; }
.hero-card .intro-text p { margin-bottom: 10px; }

/* SECTION BLOCKS */
.section-block { background: #fff; border: 3px solid #111; box-shadow: 6px 6px 0 0 #111; padding: 32px 28px; margin-bottom: 28px; }
.section-block.coral { background: #ff6b4a; }
.section-block.coral h2, .section-block.coral .entry-desc, .section-block.coral .entry-title, .section-block.coral .entry-date, .section-block.coral .entry-role, .section-block.coral li, .section-block.coral a, .section-block.coral .eyebrow, .section-block.coral .looking-for { color: #111; }
.section-block.coral .eyebrow { color: rgba(17,17,17,0.6); }
.section-block.yellow { background: #f5d547; }
.section-block.yellow h2, .section-block.yellow .eyebrow { color: #111; }

/* EYEBROW */
.eyebrow { font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #777; margin-bottom: 14px; font-weight: 700; }

/* HEADINGS */
h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 30px; font-weight: 700; font-style: italic; color: #111; margin-bottom: 20px; line-height: 1.2; }

main { }

/* HOME BIO */
.home-bio { font-size: 15px; color: #333; line-height: 1.75; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: #0059ff; }

/* EXPERIENCE ENTRIES */
.entry { padding: 22px 0; border-bottom: 2px solid #eee; }
.entry:last-child { border-bottom: none; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.entry-title { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 19px; color: #111; }
.entry-title a { color: #0059ff; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; }
.entry-date { font-family: 'Space Mono', monospace; font-size: 12px; color: #777; white-space: nowrap; letter-spacing: 0.5px; }
.entry-role { font-size: 14px; color: #555; font-weight: 600; margin-bottom: 6px; }
.entry-desc { font-size: 14px; color: #444; line-height: 1.65; }
.entry ul { margin: 8px 0 0 0; padding-left: 18px; font-size: 14px; color: #444; list-style: square; }
.entry li { margin-bottom: 5px; line-height: 1.6; }

/* SUB ENTRIES (multi-role) */
.sub-entry { padding: 16px 0 0; margin-top: 16px; border-top: 2px dashed #ddd; }
.sub-entry:first-child { padding-top: 6px; margin-top: 6px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 15px; color: #111; }
.sub-entry .entry-date { font-size: 11px; color: #777; }
.sub-entry .entry-header { margin-bottom: 6px; }

/* DETAILS TOGGLE */
details { margin-top: 8px; }
details summary { cursor: pointer; font-family: 'Space Mono', monospace; font-size: 12px; color: #0059ff; list-style: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* WORK/PROJECT CARDS */
.project-grid { display: flex; flex-direction: column; gap: 16px; }
.project-card { background: #fff; border: 3px solid #111; box-shadow: 4px 4px 0 0 #111; padding: 20px 22px; transition: transform 0.15s ease, box-shadow 0.15s ease; }
.project-card:hover { transform: translate(-2px, -2px); box-shadow: 8px 8px 0 0 #111; }
.project-card .entry-header { margin-bottom: 6px; }
.project-card .entry-title { font-family: 'Playfair Display', Georgia, serif; font-size: 18px; font-weight: 700; }
.project-card .entry-desc { font-size: 14px; color: #444; }
.project-card .entry-date { font-family: 'Space Mono', monospace; font-size: 11px; color: #111; background: #f5d547; border: 2px solid #111; padding: 3px 10px; white-space: nowrap; font-weight: 700; }

/* SKILLS */
.skills-grid { display: flex; flex-wrap: wrap; gap: 8px; }
.skills-grid span { font-family: 'Space Mono', monospace; font-size: 12px; color: #111; background: #f7f7f2; border: 2px solid #111; padding: 4px 12px; transition: transform 0.15s ease, box-shadow 0.15s ease; }
.skills-grid span:hover { transform: translate(-1px, -1px); box-shadow: 3px 3px 0 0 #111; }

/* STRENGTHS */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 10px 0 10px 24px; border-bottom: 1px solid #eee; position: relative; line-height: 1.5; }
.strengths-list li:last-child { border-bottom: none; }
.strengths-list li::before { content: ''; position: absolute; left: 0; top: 16px; width: 10px; height: 10px; background: #ff6b4a; border: 2px solid #111; }

/* CONTACT */
.contact-line { font-size: 15px; }
.contact-line a { margin-right: 20px; font-weight: 600; }

/* EDUCATION */
.education-entry { font-size: 15px; color: #333; padding: 8px 0; }

/* LOOKING FOR */
.looking-for { font-family: 'Space Mono', monospace; font-size: 14px; color: #444; line-height: 1.6; }

/* FOOTER */
footer { margin-top: 40px; padding: 16px 24px; background: #ff6b4a; border: 3px solid #111; box-shadow: 6px 6px 0 0 #111; font-family: 'Space Mono', monospace; font-size: 12px; color: #111; font-weight: 700; letter-spacing: 0.5px; }
footer a { color: #111; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; font-weight: 700; }
footer a:hover { color: #fff; }

/* PRINT */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: 100%; } body { background: #fff; background-image: none; } .hero-card, .section-block, .project-card { box-shadow: none; border-width: 1px; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 16px 20px 32px; }
  nav { font-size: 11px; gap: 14px; padding: 12px 16px; flex-wrap: wrap; letter-spacing: 1px; margin-bottom: 28px; }
  nav .site-name { font-size: 13px; padding: 4px 8px; }
  .hero-card { padding: 28px 22px 24px; }
  .hero-card h1 { font-size: 40px; }
  .hero-card .tagline { font-size: 16px; }
  h2 { font-size: 24px; }
  .section-block { padding: 24px 20px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-grid span { font-size: 11px; padding: 3px 8px; }
  .home-bio { font-size: 14px; }
  .project-card { padding: 16px 18px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 12px 14px 24px !important; }
  nav { font-size: 10px; gap: 8px; padding: 10px 12px; letter-spacing: 0.5px; }
  nav .site-name { font-size: 12px; padding: 3px 7px; }
  .hero-card h1 { font-size: 32px; }
  .hero-card .tagline { font-size: 14px; padding-left: 12px; border-left-width: 4px; }
  .hero-card { padding: 22px 16px 20px; }
  h2 { font-size: 20px; }
  .section-block { padding: 18px 14px; }
  .entry-title { font-size: 16px; }
  .entry-desc { font-size: 13px; }
  .entry ul { font-size: 13px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; padding-left: 20px; }
  .strengths-list li::before { width: 8px; height: 8px; }
  .skills-grid span { font-size: 10px; padding: 2px 6px; }
  .project-card { padding: 14px; }
  footer { font-size: 11px; padding: 12px 14px; }
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

  // Extract first name for hero
  const firstName = fullName.split(' ')[0] || fullName;
  const lastName = fullName.split(' ').slice(1).join(' ') || '';

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<div class="hero-card">
  <div class="eyebrow">${esc(location)}</div>
  <h1>${esc(firstName)}${lastName ? `<br><em>${esc(lastName)}</em>` : ''}</h1>
  ${headline ? `<div class="tagline">${esc(headline)}</div>` : ''}
</div>
<div class="section-block">
  <div class="eyebrow">About</div>
  <article class="home-bio">${homeBio}</article>
</div>`;
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
    homeContent = `<div class="hero-card">
  <div class="eyebrow">${esc(location)}</div>
  <h1>${esc(firstName)}${lastName ? `<br><em>${esc(lastName)}</em>` : ''}</h1>
  ${headline ? `<div class="tagline">${esc(headline)}</div>` : ''}
</div>
<div class="section-block">
  <div class="eyebrow">About</div>
  <article class="home-bio">${parts.join('\n')}</article>
</div>`;
  }

  const homeBody = `<main>
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<div class="section-block yellow">
  <div class="eyebrow">Projects</div>
  <h2>Systems worth shipping</h2>
</div>
<div class="project-grid">
${projects.map(p => `<div class="project-card"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="entry-date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<div class="section-block yellow">
  <div class="eyebrow">Career</div>
  <h2>Building at the edges</h2>
</div>
<div class="section-block">
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
${education.length > 0 ? `<div class="section-block"><div class="eyebrow">Education</div>${education.map(e => `<p class="education-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</div>` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];

  // Summary block
  if (!homeBio && summaryText) {
    aboutParts.push(`<div class="section-block yellow"><div class="eyebrow">Summary</div><article class="home-bio"><p>${renderInlineMarkdown(summaryText)}</p></article></div>`);
  }

  // Superpowers
  if (superpowers.length > 0) {
    aboutParts.push(`<div class="section-block"><div class="eyebrow">Strengths</div><h2>What I bring</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`);
  }

  // Now
  if (currentProject) {
    aboutParts.push(`<div class="section-block"><div class="eyebrow">Now</div><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p></div>`);
  }

  // Looking for
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) {
    aboutParts.push(`<div class="section-block coral"><div class="eyebrow">Looking For</div><p class="looking-for">${esc(targetDesc)}</p></div>`);
  }

  // Skills
  if (skills.length > 0) {
    aboutParts.push(`<div class="section-block"><div class="eyebrow">Skills</div><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div></div>`);
  }

  // Contact
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) {
    aboutParts.push(`<div class="section-block"><div class="eyebrow">Contact</div><p class="contact-line">${links.join(' &middot; ')}</p></div>`);
  }

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
