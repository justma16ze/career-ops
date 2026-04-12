/**
 * templates/garden.mjs — Digital Garden aesthetic
 *
 * Warm linen/cream background, massive serif headline, editorial magazine restraint.
 * Minimal nav, spare layout, type does all the work.
 */

export const name = 'garden';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;0,700;1,400&family=Source+Sans+3:wght@400;600&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Source Sans 3', -apple-system, BlinkMacSystemFont, sans-serif; color: #353534; background: #f3f0eb; line-height: 1.65; margin: 0; padding: 0; font-size: 17px; }
.wrap { width: 760px; margin: 0 auto; padding: 48px 36px 56px; }

/* Navigation */
nav { display: flex; align-items: baseline; margin-bottom: 64px; font-size: 15px; }
nav .site-name { font-family: 'Lora', Georgia, serif; font-size: 20px; font-weight: 700; color: #353534; text-decoration: none; margin-right: auto; letter-spacing: -0.01em; }
nav .nav-links { display: flex; gap: 28px; }
nav a { color: #6b6b6b; text-decoration: none; transition: color 0.15s ease; }
nav a:hover { color: #353534; }
nav .active { color: #353534; font-weight: 600; }

/* Headings */
h1 { font-family: 'Lora', Georgia, serif; font-size: 96px; font-weight: 400; color: #1a1a1a; line-height: 1.05; letter-spacing: -0.03em; margin-bottom: 28px; }
h1 strong { font-weight: 700; color: #111; }
h2 { font-family: 'Lora', Georgia, serif; font-size: 32px; font-weight: 400; color: #1a1a1a; line-height: 1.2; letter-spacing: -0.015em; margin: 56px 0 20px; }
h3 { font-family: 'Lora', Georgia, serif; font-size: 18px; font-weight: 600; color: #1a1a1a; line-height: 1.3; margin: 0; }

/* Links */
a { color: #7b3b5e; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(123, 59, 94, 0.3); }
a:hover { text-decoration-color: #7b3b5e; }

/* Main content */
main { }

/* Hero subtitle */
.subtitle { font-size: 19px; color: #6b6b6b; line-height: 1.6; margin-bottom: 8px; }
.subtitle a { color: #7b3b5e; font-weight: 600; text-decoration: none; }
.subtitle a:hover { text-decoration: underline; text-underline-offset: 3px; }

/* Home bio */
.home-bio { font-size: 18px; color: #4a4a4a; line-height: 1.75; margin-bottom: 40px; max-width: 640px; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: #7b3b5e; font-weight: 600; }

/* Section intro text */
.section-intro { font-size: 17px; color: #6b6b6b; line-height: 1.65; margin-bottom: 32px; }

/* Experience entries */
.exp-list { margin-top: 8px; }
.exp-group { margin-bottom: 44px; }
.exp-group-header { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; margin-bottom: 4px; padding-bottom: 8px; border-bottom: 1px solid #ddd7cf; }
.exp-company { font-family: 'Lora', Georgia, serif; font-size: 20px; font-weight: 700; color: #1a1a1a; }
.exp-date { font-size: 14px; color: #9a9590; white-space: nowrap; }
.exp-role-single { font-size: 15px; color: #6b6b6b; font-style: italic; margin-top: 6px; }
.exp-bullets { margin: 8px 0 0 0; padding-left: 20px; font-size: 15px; color: #555; list-style: disc; }
.exp-bullets li { margin-bottom: 4px; line-height: 1.55; }

/* Sub-roles */
.sub-role { margin-top: 16px; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; }
.sub-role-title { font-weight: 700; font-size: 15px; color: #1a1a1a; }
.sub-role-date { font-size: 13px; color: #9a9590; white-space: nowrap; }

/* Details expand */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 13px; color: #9a9590; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* Project entries */
.project-list { margin-top: 8px; }
.project { margin-bottom: 32px; padding-bottom: 24px; border-bottom: 1px solid #e4dfd8; }
.project:last-child { border-bottom: none; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 6px; }
.project-name { font-family: 'Lora', Georgia, serif; font-size: 20px; font-weight: 600; color: #1a1a1a; }
.project-name a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #ddd7cf; text-underline-offset: 4px; }
.project-name a:hover { text-decoration-color: #1a1a1a; }
.project-metric { font-size: 14px; color: #9a9590; white-space: nowrap; }
.project-desc { font-size: 15px; color: #6b6b6b; line-height: 1.6; }

/* Education */
.education { margin-top: 12px; }
.education p { font-size: 16px; color: #4a4a4a; margin-bottom: 6px; }

/* About page */
.about-section { margin-bottom: 36px; }
.strengths-list { list-style: none; padding: 0; margin: 8px 0 0; }
.strengths-list li { font-size: 16px; color: #4a4a4a; padding: 4px 0; line-height: 1.5; }
.strengths-list li::before { content: '\\2013\\00a0'; color: #9a9590; }
.skills-list { font-size: 15px; color: #6b6b6b; line-height: 1.8; }
.looking-for { font-size: 16px; color: #4a4a4a; line-height: 1.6; }
.contact-line { font-size: 16px; }
.contact-line a { color: #7b3b5e; margin-right: 24px; }

/* Footer */
footer { margin-top: 56px; padding-top: 16px; border-top: 1px solid #ddd7cf; font-size: 12px; color: #9a9590; }
footer a { color: #9a9590; font-weight: 600; text-decoration: none; }
footer a:hover { color: #6b6b6b; }

/* Print */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; width: auto; } }

/* Responsive 660px */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 32px 24px 40px; }
  h1 { font-size: 48px; letter-spacing: -0.02em; }
  h2 { font-size: 26px; margin-top: 40px; }
  nav { margin-bottom: 48px; font-size: 14px; }
  nav .site-name { font-size: 18px; }
  nav .nav-links { gap: 20px; }
  .home-bio { font-size: 16px; }
  .subtitle { font-size: 17px; }
  .exp-group-header { flex-direction: column; gap: 2px; }
  .sub-role-header { flex-direction: column; gap: 2px; }
  .project-header { flex-direction: column; gap: 2px; }
}

/* Responsive 480px */
@media (max-width: 480px) {
  .wrap { padding: 20px 16px 32px !important; }
  h1 { font-size: 36px; margin-bottom: 16px; }
  h2 { font-size: 22px; margin-top: 32px; }
  nav { margin-bottom: 36px; font-size: 13px; }
  nav .site-name { font-size: 16px; }
  nav .nav-links { gap: 14px; }
  .home-bio { font-size: 15px; }
  .subtitle { font-size: 15px; }
  .exp-company { font-size: 17px; }
  .exp-bullets { font-size: 14px; }
  .project-name { font-size: 17px; }
  .project-desc { font-size: 14px; }
  .strengths-list li { font-size: 14px; }
  .skills-list { font-size: 14px; }
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
    const links = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(fullName)}</a><div class="nav-links">${links}</div></nav>`;
  }

  // Split name for hero: first name bold, rest normal
  const nameParts = fullName.split(' ');
  const firstName = nameParts[0];
  const restName = nameParts.slice(1).join(' ');

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

  // Build hero headline: convert -- to em-dash, bold first name in the headline
  let heroHeadline;
  if (headline) {
    // Replace -- with em-dash
    let cleanHeadline = headline.replace(/\s*--\s*/g, ' \u2014 ');
    // Bold the first word for editorial emphasis (Maggie Appleton style)
    const firstSpace = cleanHeadline.indexOf(' ');
    if (firstSpace > 0) {
      cleanHeadline = `<strong>${esc(cleanHeadline.slice(0, firstSpace))}</strong> ${renderInlineMarkdown(cleanHeadline.slice(firstSpace + 1))}`;
    } else {
      cleanHeadline = `<strong>${esc(cleanHeadline)}</strong>`;
    }
    heroHeadline = `<h1>${cleanHeadline}</h1>`;
  } else {
    heroHeadline = `<h1><strong>${esc(firstName)}</strong> ${esc(restName)}</h1>`;
  }

  const homeBody = `<main>
${heroHeadline}
${location ? `<p class="subtitle">${esc(location)}</p>` : ''}
${homeContent}
</main>`;

  // WORK
  const workBody = projects.length > 0 ? `<main>
<h2>Work</h2>
<div class="project-list">
${projects.map(p => `<div class="project"><div class="project-header"><span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="project-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="project-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</main>` : '';

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h2>Experience</h2>
<div class="exp-list">
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
      return `<div class="exp-group"><div class="exp-group-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role-single">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="exp-group"><div class="exp-group-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><span class="sub-role-title">${esc(r.role)}</span><span class="sub-role-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n')}
</div>
${education.length > 0 ? `<h2>Education</h2><div class="education">${education.map(e => `<p>${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</div>` : ''}
</main>`;

  // ABOUT
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<div class="about-section"><p class="home-bio">${renderInlineMarkdown(summaryText)}</p></div>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<div class="about-section"><h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`);
  if (currentProject) aboutParts.push(`<div class="about-section"><h2>Now</h2><p class="looking-for">${renderInlineMarkdown(currentProject)}</p></div>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<div class="about-section"><h2>Looking For</h2><p class="looking-for">${esc(targetDesc)}</p></div>`);
  if (skills.length > 0) aboutParts.push(`<div class="about-section"><h2>Skills</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutParts.push(`<div class="about-section"><h2>Contact</h2><p class="contact-line">${links.join(' ')}</p></div>`);
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
