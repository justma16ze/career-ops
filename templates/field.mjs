/**
 * templates/field.mjs — Right Sidebar "Field" layout
 *
 * Solarized aesthetic: warm cream bg, dark brown text, copper accent,
 * sage green section labels, blue links. Two-column flex layout with
 * sticky right sidebar (skills, contact, location, target roles).
 * Main content on left (bio, experience, projects). Sidebar appears
 * on ALL pages. On mobile (<=660px) sidebar stacks below.
 *
 * Fonts: Unbounded (display), system sans (body), JetBrains Mono (metadata).
 * Multi-page: home, experience, about.
 */

export const name = 'field';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; color: #3b2010; background: #fdf6e3; line-height: 1.65; margin: 0; padding: 0; font-size: 15px; }

/* --- Outer wrap --- */
.wrap { max-width: 960px; margin: 0 auto; padding: 32px 40px 48px; }

/* --- Nav --- */
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 28px; font-size: 14px; border-bottom: 1px solid #e0d5c1; padding-bottom: 14px; }
nav .site-name { font-family: 'Unbounded', sans-serif; font-size: 20px; font-weight: 700; color: #3b2010; text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav a { color: #3b2010; text-decoration: none; font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; }
nav a:hover { color: #d16d3e; }
nav .active { color: #d16d3e; font-weight: 600; }
nav span { font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; }

/* --- Two-column layout --- */
.layout { display: flex; gap: 28px; align-items: flex-start; }
.main-col { flex: 1; min-width: 0; }
.sidebar { width: 250px; flex-shrink: 0; position: sticky; top: 32px; align-self: flex-start; padding-left: 24px; border-left: 1px solid #e0d5c1; }

/* --- Sidebar styling --- */
.sidebar-section { margin-bottom: 24px; }
.sidebar-label { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; color: #77934d; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 2px solid #d16d3e; display: inline-block; }
.sidebar-content { font-size: 13px; color: #5c4a3a; line-height: 1.6; }
.sidebar-content a { color: #268bd2; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(38,139,210,0.4); font-size: 13px; }
.sidebar-content a:hover { text-decoration-color: #268bd2; }
.sidebar-item { display: block; margin-bottom: 4px; }
.sidebar-role { font-size: 13px; color: #3b2010; font-weight: 600; display: block; margin-bottom: 3px; }
.sidebar-location { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a08060; }
.sidebar-skills-list { list-style: none; padding: 0; margin: 0; }
.sidebar-skills-list li { font-size: 13px; color: #5c4a3a; padding: 2px 0; line-height: 1.5; }
.sidebar-divider { border: none; border-top: 1px solid #e0d5c1; margin: 0 0 24px; }

/* --- Links --- */
a { color: #268bd2; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(38,139,210,0.4); }
a:hover { text-decoration-color: #268bd2; }

/* --- Headings --- */
h1 { font-family: 'Unbounded', sans-serif; font-size: 32px; font-weight: 800; color: #3b2010; line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 8px; }
h2 { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 500; color: #77934d; text-transform: uppercase; letter-spacing: 0.1em; margin: 32px 0 14px; border-top: 1px solid #e0d5c1; padding-top: 14px; }
h2:first-child, .main-col > h2:first-child { margin-top: 0; border-top: none; padding-top: 0; }

/* --- Hero (home page) --- */
.hero { margin-bottom: 24px; }
.headline { font-size: 16px; color: #5c4a3a; line-height: 1.6; margin-bottom: 4px; }
.hero-contact { font-size: 14px; margin-top: 6px; }
.hero-contact a { color: #268bd2; }
.hero-contact .sep { color: #ccc; margin: 0 4px; font-size: 12px; }

/* --- Home Bio --- */
.home-bio { font-size: 15px; color: #3b2010; line-height: 1.75; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: #268bd2; }

/* --- Intro --- */
.intro { font-size: 15px; color: #5c4a3a; line-height: 1.75; margin-bottom: 24px; }
.intro p { margin-bottom: 12px; }

/* --- Experience entries --- */
.exp-group { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid #efe6d5; }
.exp-group:last-child { border-bottom: none; padding-bottom: 0; }
.exp-company { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-company-name { font-weight: 700; font-size: 15px; color: #3b2010; }
.exp-date { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a08060; white-space: nowrap; }
.exp-role { font-size: 14px; color: #5c4a3a; font-style: italic; margin-bottom: 4px; }
.exp-bullets { margin: 6px 0 0 0; padding-left: 18px; font-size: 14px; color: #5c4a3a; list-style: disc; }
.exp-bullets li { margin-bottom: 4px; line-height: 1.55; }
.sub-role { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid #efe6d5; }
.sub-role:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-role .exp-role { font-weight: 600; font-style: normal; color: #3b2010; }
.sub-role .exp-date { font-size: 11px; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }

/* --- Details (show more / show less) --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #a08060; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* --- Projects --- */
.project { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #efe6d5; }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.project-name { font-weight: 700; font-size: 15px; color: #3b2010; }
.project-name a { color: #268bd2; text-decoration: underline; text-decoration-color: rgba(38,139,210,0.3); text-underline-offset: 3px; }
.project-name a:hover { text-decoration-color: #268bd2; }
.project-metric { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #d16d3e; }
.project-desc { font-size: 14px; color: #5c4a3a; line-height: 1.65; }

/* --- Education --- */
.education-entry { font-size: 14px; color: #5c4a3a; line-height: 1.65; margin-bottom: 6px; }

/* --- Strengths --- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #3b2010; padding: 4px 0; border-bottom: 1px solid #efe6d5; }
.strengths-list li:last-child { border-bottom: none; }

/* --- About text --- */
.about-text { font-size: 15px; color: #3b2010; line-height: 1.75; margin-bottom: 16px; }
.about-text p { margin-bottom: 12px; }
.about-label { font-size: 14px; color: #5c4a3a; line-height: 1.65; }

/* --- Footer --- */
footer { margin-top: 40px; padding-top: 14px; border-top: 1px solid #e0d5c1; font-size: 12px; color: #a08060; }
footer a { color: #a08060; font-weight: 600; text-decoration: underline; text-decoration-color: rgba(160,128,96,0.4); }
footer a:hover { text-decoration-color: #a08060; }

/* --- Print --- */
@media print { nav, footer, .sidebar { display: none; } .wrap { padding: 1rem; max-width: none; } .layout { display: block; } .main-col { width: 100%; } }

/* --- Responsive: 660px (sidebar stacks below) --- */
@media (max-width: 660px) {
  .wrap { max-width: 100%; padding: 20px 24px; }
  .layout { flex-direction: column; gap: 32px; }
  .sidebar { width: 100%; position: static; border-top: 1px solid #e0d5c1; padding-top: 24px; border-left: none; padding-left: 0; }
  h1 { font-size: 26px; }
  nav { font-size: 12px; gap: 10px; }
  nav .site-name { font-size: 16px; }
  nav span { font-size: 12px; }
  .exp-company { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  .hero-contact { font-size: 13px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* --- Responsive: 480px --- */
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1 { font-size: 22px; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 10px; gap: 6px; }
  nav span { font-size: 10px; }
  .headline { font-size: 14px; }
  .home-bio { font-size: 13px; }
  .exp-company-name { font-size: 13px; }
  .exp-role { font-size: 13px; }
  .exp-bullets { font-size: 13px; }
  .project-name { font-size: 13px; }
  .project-desc { font-size: 13px; }
  .sidebar-content { font-size: 12px; }
  .sidebar-skills-list li { font-size: 12px; }
  .strengths-list li { font-size: 13px; }
  .hero-contact { font-size: 12px; }
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

  // --- Build sidebar HTML (same on every page) ---
  function buildSidebar() {
    const parts = [];

    // Target roles
    if (targetRoles.length > 0) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Target Roles</div>
<div class="sidebar-content">${targetRoles.map(r => `<span class="sidebar-role">${esc(r)}</span>`).join('')}</div>
</div>`);
    }

    // Location
    if (location) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Location</div>
<div class="sidebar-content"><span class="sidebar-location">${esc(location)}</span></div>
</div>`);
    }

    // Skills
    if (skills.length > 0) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Skills</div>
<ul class="sidebar-skills-list">${skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
</div>`);
    }

    // Contact
    const contactLinks = [];
    if (email) contactLinks.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    if (linkedin) contactLinks.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
    if (github) contactLinks.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
    if (contactLinks.length > 0) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Contact</div>
<div class="sidebar-content">${contactLinks.map(l => `<span class="sidebar-item">${l}</span>`).join('')}</div>
</div>`);
    }

    return `<aside class="sidebar">${parts.join('\n')}</aside>`;
  }

  const sidebar = buildSidebar();

  // --- Navigation ---
  const navItems = [
    { href: 'index.html', label: 'Home' },
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

  // --- HOME ---
  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  // Projects on home page
  let projectsHtml = '';
  if (projects.length > 0) {
    projectsHtml = `<h2>Projects</h2>
${projects.map(p => `<div class="project"><div class="project-header"><span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="project-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="project-desc">${p.description}</p>` : ''}</div>`).join('\n')}`;
  }

  const homeBody = `<div class="layout">
<div class="main-col">
<div class="hero">
<h1>${esc(fullName)}</h1>
${headline ? `<p class="headline">${esc(headline)}</p>` : ''}
</div>
${homeContent}
${projectsHtml}
</div>
${sidebar}
</div>`;

  // --- EXPERIENCE ---
  const groups = experienceGroups;
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul class="exp-bullets">${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul class="exp-bullets">${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul class="exp-bullets">${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  const expEntries = groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="exp-group"><div class="exp-company"><span class="exp-company-name">${esc(g.company)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="exp-group"><div class="exp-company"><span class="exp-company-name">${esc(g.company)}</span><span class="exp-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><div class="exp-role">${esc(r.role)}</div><span class="exp-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
  }).join('\n');

  const expBody = `<div class="layout">
<div class="main-col">
<h2>Experience</h2>
${expEntries}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="education-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</div>
${sidebar}
</div>`;

  // --- ABOUT ---
  const aboutParts = [];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<p class="about-text">${renderInlineMarkdown(summaryText)}</p>`);
  } else {
    aboutParts.push(`<article class="about-text">${homeBio}</article>`);
  }
  if (exitStory && !homeBio) aboutParts.push(`<p class="about-text">${renderInlineMarkdown(exitStory)}</p>`);
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="about-label">${renderInlineMarkdown(currentProject)}</p>`);

  const aboutBody = `<div class="layout">
<div class="main-col">
<h1>About</h1>
${aboutParts.join('\n')}
</div>
${sidebar}
</div>`;

  // --- Assemble pages ---
  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutBody],
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
