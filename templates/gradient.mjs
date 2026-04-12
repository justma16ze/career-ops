/**
 * templates/gradient.mjs — Pastel Gradient + Massive Stacked Typography
 *
 * Massive stacked serif name with alternating filled/hollow (text-stroke) letterforms.
 * Soft pastel blue-to-white gradient background on hero. Clean white content area below.
 * Bold, confident, graphic-design-forward.
 */

export const name = 'gradient';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif; color: #1a1a1a; background: #fff; line-height: 1.6; margin: 0; padding: 0; font-size: 15px; }
.wrap { width: 700px; margin: 0 auto; padding: 0; }
a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 4px; text-decoration-color: #bbb; }
a:hover { text-decoration-color: #1a1a1a; }

/* ── NAV ── */
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; padding: 24px 36px; font-size: 14px; }
nav .site-name { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 700; color: #1a1a1a; text-decoration: none; margin-right: auto; }
nav a { color: #1a1a1a; text-decoration: underline; text-underline-offset: 6px; text-decoration-color: #ccc; font-weight: 400; }
nav a:hover { text-decoration-color: #1a1a1a; }
nav .active { text-decoration: underline; text-decoration-color: #1a1a1a; text-decoration-thickness: 2px; text-underline-offset: 6px; font-weight: 600; }

/* ── HERO (home only) ── */
.hero-gradient { background: linear-gradient(155deg, #b4dced 0%, #c2e4f2 12%, #d0ecf7 28%, #e2f2fa 48%, #f2f8fc 68%, #ffffff 100%); padding: 72px 36px 52px; text-align: center; }
.hero-name-stack { display: flex; flex-direction: column; align-items: center; gap: 2px; line-height: 0.88; margin-bottom: 36px; }
.hero-name-row { font-family: 'Playfair Display', Georgia, serif; text-transform: uppercase; letter-spacing: 0.03em; display: block; }
.hero-name-row.outline { font-size: 68px; font-weight: 400; color: transparent; -webkit-text-stroke: 1.2px #2a2a2a; }
.hero-name-row.filled { font-size: 86px; font-weight: 900; color: #1a1a1a; -webkit-text-stroke: 0; letter-spacing: 0.02em; }
.hero-name-row.light-outline { font-size: 62px; font-weight: 400; color: transparent; -webkit-text-stroke: 1px #aaa; letter-spacing: 0.05em; }
.hero-headline { font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 300; color: #4a4a4a; letter-spacing: 0.04em; margin-top: 16px; }
.hero-gradient-fade { height: 1px; background: linear-gradient(to right, transparent, #e0e0e0, transparent); margin: 0 auto; width: 60%; }
.hero-links { margin-top: 24px; }
.hero-links a { display: inline-block; padding: 10px 28px; border: 1px solid #ccc; border-radius: 24px; text-decoration: none; font-size: 14px; color: #1a1a1a; background: rgba(255,255,255,0.7); transition: border-color 0.2s; }
.hero-links a:hover { border-color: #1a1a1a; }

/* ── CONTENT AREA ── */
.content { padding: 36px 36px 40px; }
main { }
.home-bio { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 24px; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #1a1a1a; font-weight: 600; }

/* ── HEADINGS ── */
h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 700; color: #1a1a1a; margin: 36px 0 16px; padding-bottom: 8px; border-bottom: 1px solid #e5e5e5; }

/* ── EXPERIENCE / TIMELINE ── */
.exp-group { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #eee; }
.exp-group:last-child { border-bottom: none; }
.exp-company-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.exp-company { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 17px; color: #1a1a1a; }
.exp-date { font-size: 13px; color: #888; white-space: nowrap; font-weight: 400; }
.exp-role-block { padding: 8px 0 4px; }
.exp-role-block + .exp-role-block { border-top: 1px solid #eee; padding-top: 10px; margin-top: 6px; }
.exp-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 2px; }
.exp-role { font-weight: 600; font-size: 14px; color: #333; }
.exp-role-date { font-size: 12px; color: #999; white-space: nowrap; }
.exp-bullets { margin: 4px 0 0; padding-left: 18px; font-size: 14px; color: #555; list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.55; }
details { margin-top: 4px; }
details summary { cursor: pointer; font-size: 12px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 6px; }

/* ── PROJECTS / WORK ── */
.project-entry { padding: 16px 0; border-bottom: 1px solid #f0f0f0; }
.project-entry:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.project-name { font-family: 'Playfair Display', Georgia, serif; font-weight: 700; font-size: 16px; }
.project-name a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #ccc; text-underline-offset: 3px; }
.project-metric { font-size: 13px; color: #888; white-space: nowrap; }
.project-desc { font-size: 14px; color: #555; line-height: 1.6; }

/* ── ABOUT ── */
.about-section { margin-bottom: 24px; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #333; padding: 4px 0; border-bottom: 1px solid #f5f5f5; }
.strengths-list li:last-child { border-bottom: none; }
.skills-grid { font-size: 13px; color: #555; line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-grid span { display: block; padding: 2px 0; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }
.entry-desc { font-size: 14px; color: #555; line-height: 1.6; }

/* ── EDUCATION ── */
.education-entry { font-size: 14px; color: #444; margin-bottom: 6px; line-height: 1.5; }

/* ── FOOTER ── */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #e5e5e5; font-size: 12px; color: #999; padding-bottom: 24px; }
footer a { color: #999; font-weight: 600; text-decoration: underline; text-decoration-color: #ccc; }
footer a:hover { color: #1a1a1a; text-decoration-color: #1a1a1a; }

/* ── PRINT ── */
@media print { nav, footer, .hero-links { display: none; } .wrap { padding: 1rem; width: 100%; max-width: none; } .hero-gradient { background: none; padding: 24px 0; } .hero-name-row.outline, .hero-name-row.light-outline { -webkit-text-stroke: 1px #000; } }

/* ── RESPONSIVE 660px ── */
@media (max-width: 660px) {
  .wrap { width: 100% !important; }
  nav { padding: 16px 20px; font-size: 13px; gap: 12px; }
  .hero-gradient { padding: 48px 20px 40px; }
  .hero-name-row.outline { font-size: 38px; }
  .hero-name-row.filled { font-size: 50px; }
  .hero-name-row.light-outline { font-size: 34px; }
  .hero-headline { font-size: 14px; }
  .content { padding: 24px 20px 32px; }
  h2 { font-size: 18px; }
  .exp-company-header { flex-direction: column; }
  .exp-role-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  .skills-grid { column-count: 2; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* ── RESPONSIVE 480px ── */
@media (max-width: 480px) {
  nav { padding: 12px 16px; font-size: 12px; gap: 8px; }
  nav .site-name { font-size: 18px; }
  .hero-gradient { padding: 32px 16px 28px; }
  .hero-name-row.outline { font-size: 26px; -webkit-text-stroke: 0.8px #2a2a2a; }
  .hero-name-row.filled { font-size: 36px; }
  .hero-name-row.light-outline { font-size: 24px; -webkit-text-stroke: 0.6px #aaa; }
  .hero-headline { font-size: 13px; }
  .content { padding: 16px 16px 24px; }
  h2 { font-size: 16px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
  .exp-company { font-size: 15px; }
  .exp-role { font-size: 13px; }
  .exp-bullets { font-size: 13px; }
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

  // Split name into first/last for stacked hero display
  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0] || '';
  const lastName = nameParts.slice(1).join(' ') || '';

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

  // ── HERO block (home page only) ──
  function heroBlock() {
    const displayFirst = esc(firstName).toUpperCase();
    const displayLast = esc(lastName).toUpperCase();
    const displayFull = esc(fullName).toUpperCase();

    return `<div class="hero-gradient">
  <div class="hero-name-stack">
    <span class="hero-name-row outline">${displayFull}</span>
    <span class="hero-name-row filled">${displayFull}</span>
    <span class="hero-name-row light-outline">${displayFull}</span>
  </div>
  ${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}
</div>`;
  }

  // ── HOME ──
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

  const homeBody = `${heroBlock()}
<div class="content">
<main>
${homeContent}
</main>
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>`;

  // ── WORK ──
  const workBody = projects.length > 0 ? `<div class="content">
<main>
<h2>Projects</h2>
${projects.map(p => `<div class="project-entry"><div class="project-header"><span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="project-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="project-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</main>
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>` : '';

  // ── EXPERIENCE ──
  const groups = experienceGroups;
  const expBody = `<div class="content">
<main>
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
      return `<div class="exp-group"><div class="exp-company-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role-block"><div class="exp-role-header"><span class="exp-role">${esc(r.role)}</span></div>${renderBullets(r.bullets)}</div>` : renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<div class="exp-group"><div class="exp-company-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="exp-role-block"><div class="exp-role-header"><span class="exp-role">${esc(r.role)}</span><span class="exp-role-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="education-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>`;

  // ── ABOUT ──
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

  const aboutBody = `<div class="content">
${aboutParts.join('\n')}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>`;

  // ── BUILD PAGES ──
  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody, true],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody, false]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody, false]] : []),
    ['about.html', 'About', 'about.html', aboutBody, false],
  ];

  for (const [filename, title, active, body, isHome] of pageDefs) {
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
    result[filename] = buildPage({ title: t, nav: nav(active), body, summaryShort: data.summaryShort, fonts, cssText: css(), isHome });
  }
  return result;
}

function buildPage({ title, nav, body, summaryShort, fonts, cssText, isHome }) {
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
</div>
</body>
</html>`;
}
