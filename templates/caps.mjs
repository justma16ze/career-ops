/**
 * templates/caps.mjs — Bold Confidence template
 *
 * Mood: ALL-CAPS statement. Direct. Confident.
 * Display/Body: General Sans (Fontshare)
 * Background: #fff | Text: #111 | Accent: #0d9488 (dark teal)
 * Layout: Large ALL-CAPS hero text, then readable body. Nav and labels in uppercase.
 * Projects with bold underlined titles.
 * Border: #eee
 */

export const name = 'caps';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'General Sans', sans-serif; color: #111; background: #fff; line-height: 1.6; margin: 0; padding: 0; }
.wrap { width: 700px; margin: 0 auto; padding: 48px 40px 32px; }
a { color: #0d9488; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(13,148,136,0.3); }
a:hover { text-decoration-color: #0d9488; }

/* Nav */
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; margin-bottom: 32px; font-size: 13px; }
nav .site-name { font-weight: 700; color: #111; text-decoration: none; text-transform: uppercase; font-size: 12px; letter-spacing: 0.06em; margin-right: auto; }
nav a { color: #999; text-decoration: none; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; }
nav a:hover { color: #111; }
nav .active { color: #111; font-weight: 600; text-transform: uppercase; font-size: 11px; letter-spacing: 0.06em; }

/* Headings */
h1 { font-size: 36px; font-weight: 700; text-transform: uppercase; letter-spacing: -0.01em; line-height: 1.15; margin-bottom: 20px; max-width: 620px; }
h2 { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin: 32px 0 12px; }
h3 { font-size: 15px; font-weight: 600; margin-bottom: 2px; }
h3 a { color: #111; text-decoration: none; border-bottom: 2px solid #111; padding-bottom: 1px; }
h3 a:hover { border-color: #0d9488; color: #0d9488; }

/* Body text */
p { margin-bottom: 8px; }
p:last-child { margin-bottom: 0; }
main { }

/* Hero section */
.hero { margin-bottom: 32px; }
.hero .bio { font-size: 15px; color: #444; line-height: 1.7; max-width: 580px; }
.hero .bio p { margin-bottom: 12px; }
.hero .bio a { color: #111; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ccc; }
.hero .bio a:hover { text-decoration-color: #111; }
.hero .links { margin-top: 14px; font-size: 13px; }
.hero .links a { color: #0d9488; margin-right: 16px; }

/* Home bio (from data.homeBio) */
.home-bio { font-size: 15px; color: #444; line-height: 1.7; max-width: 580px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: #111; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: #ccc; }
.home-bio a:hover { text-decoration-color: #111; }

/* Projects */
.project { margin-bottom: 20px; }
.project p { font-size: 14px; color: #555; line-height: 1.6; }
.project .metric { font-size: 13px; font-weight: 600; color: #0d9488; margin-top: 2px; }

/* Experience / Jobs */
.job { margin-bottom: 24px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 15px; }
.date { font-size: 12px; color: #999; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 10px; padding-top: 10px; border-top: 1px solid #f0f0f0; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.sub-role .role { font-weight: 600; color: #111; font-size: 14px; }
ul { margin: 4px 0 0 20px; }
li { font-size: 14px; color: #555; margin-bottom: 3px; line-height: 1.6; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 6px; }

/* About page */
.detail { font-size: 14px; color: #555; line-height: 1.6; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #444; padding: 3px 0; }
.skills-list { font-size: 14px; color: #555; line-height: 1.8; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 16px; }
section { margin-bottom: 16px; }
article { margin-bottom: 16px; }

/* Footer */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid #eee; font-size: 12px; color: #999; }
footer a { color: #888; font-weight: 600; text-decoration: underline; text-underline-offset: 2px; }
footer a:hover { color: #666; }

/* Print */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: auto; } }

/* Responsive 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 28px 24px; }
  h1 { font-size: 26px; }
  nav { font-size: 12px; gap: 14px; }
  .hero .bio { font-size: 14px; }
  .home-bio { font-size: 14px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* Responsive 480px */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1 { font-size: 22px; }
  nav .site-name { font-size: 11px; }
  nav { font-size: 11px; gap: 8px; }
  h2 { font-size: 10px; }
  h3 { font-size: 14px; }
  .hero .bio { font-size: 13px; }
  .home-bio { font-size: 13px; }
  .job-header strong { font-size: 14px; }
  .role { font-size: 13px; }
  li { font-size: 13px; }
  .detail { font-size: 13px; }
  .strengths-list li { font-size: 13px; }
  .skills-list { font-size: 13px; }
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

  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

  const navItems = [
    { href: 'index.html', label: 'HOME' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'WORK' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'EXPERIENCE' }] : []),
    { href: 'about.html', label: 'ABOUT' },
  ];

  function nav(active) {
    const items = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(fullName.toUpperCase())}</a> ${items}</nav>`;
  }

  // CAPS hero: All-caps statement -- clean up dashes to em dashes
  const cleanHeadline = headline ? headline.replace(/\s*--\s*/g, ' \u2014 ') : '';
  const capsStatement = cleanHeadline
    ? `I'M ${fullName.toUpperCase()}, ${cleanHeadline.toUpperCase()}`
    : `I'M ${fullName.toUpperCase()}${location ? `, BASED IN ${location.toUpperCase()}` : ''}.`;

  // HOME
  let homeContent;
  if (homeBio) {
    homeContent = `<div class="home-bio">${homeBio}</div>`;
  } else {
    const bioLines = [];
    if (summaryText) bioLines.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) bioLines.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    homeContent = bioLines.length > 0 ? `<div class="bio">${bioLines.join('\n')}</div>` : '';
  }

  const homeBody = `<main>
<section class="hero">
<h1>${esc(capsStatement)}</h1>
${homeContent}
${links.length > 0 ? `<div class="links">${links.join(' ')}</div>` : ''}
</section>
${projects.length > 0 ? `<section>
<h2>SELECTED WORK</h2>
${projects.slice(0, 4).map(p => `<div class="project"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>${p.description ? `<p>${p.description}</p>` : ''}${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}</div>`).join('\n')}
</section>` : ''}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h1>WORK</h1>
<h2>ALL PROJECTS</h2>
${projects.map(p => `<section class="project">
<h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>
${p.description ? `<p>${p.description}</p>` : ''}
${p.heroMetric ? `<div class="metric">${esc(p.heroMetric)}</div>` : ''}
</section>`).join('\n')}
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h1>EXPERIENCE</h1>
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
      return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong><span class="date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><div class="role">${esc(r.role)}</div>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${renderBullets(r.bullets)}</div>`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<section><h2>EDUCATION</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</section>` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>', '<h1>ABOUT</h1>'];
  if (summaryText) aboutParts.push(`<article><p class="detail">${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p class="detail">${renderInlineMarkdown(exitStory.replace(/\s*--\s*/g, ' \u2014 '))}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><h2>STRENGTHS</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></section>`);
  if (currentProject) aboutParts.push(`<section><h2>NOW</h2><p class="detail">${renderInlineMarkdown(currentProject)}</p></section>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<section><h2>LOOKING FOR</h2><p class="detail">${esc(targetDesc)}</p></section>`);
  if (skills.length > 0) aboutParts.push(`<section><h2>TOOLS</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>`);
  if (links.length > 0) aboutParts.push(`<section><h2>CONTACT</h2><p class="contact-line">${links.join(' ')}</p></section>`);
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
