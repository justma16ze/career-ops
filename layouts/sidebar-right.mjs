/**
 * layouts/sidebar-right.mjs — Right sidebar layout
 *
 * Extracted from templates/field.mjs structure.
 * Main content on the left, sticky right sidebar with skills/contact/location.
 * Multi-page: home, experience, about.
 * Sidebar is identical on all pages; content changes per page.
 */

export const name = 'sidebar-right';
export const description = 'Main content left, sticky right sidebar with skills/contact/location';

export function css() {
  return `/* === sidebar-right layout: structural only === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.65; margin: 0; padding: 0; font-size: 15px; }

/* --- Outer wrap --- */
.wrap { width: 100% !important; max-width: 960px; margin: 0 auto; padding: 32px 40px 48px; }

/* --- Nav --- */
nav { display: flex; gap: 18px; align-items: baseline; flex-wrap: wrap; margin-bottom: 28px; font-size: 14px; border-bottom: 1px solid var(--border); padding-bottom: 14px; background: var(--bg-nav, transparent); border-top: none; border-left: none; border-right: none; box-shadow: none; }
nav .site-name { font-family: var(--font-display); font-size: 20px; font-weight: 700; color: var(--text); text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav .site-name-hidden { visibility: hidden; }
nav .nav-links { display: contents; }
nav a { color: var(--text); text-decoration: none; font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; }
nav a:hover { color: var(--accent); }
nav .active { color: var(--accent); font-weight: 600; }
nav span { font-size: 13px; letter-spacing: 0.02em; text-transform: uppercase; }

/* --- Two-column layout --- */
.layout { display: flex; gap: 28px; align-items: flex-start; }
.main-col { flex: 1; min-width: 0; }
.sidebar { width: 260px; flex-shrink: 0; position: sticky; top: 32px; align-self: flex-start; padding-left: 24px; border-left: 1px solid var(--border); min-width: 0; overflow-wrap: break-word; word-break: break-word; }

/* --- Sidebar sections --- */
.sidebar-section { margin-bottom: 24px; }
.sidebar-label { font-family: var(--font-mono); font-size: 11px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; padding-bottom: 4px; border-bottom: 2px solid var(--accent); display: inline-block; }
.sidebar-content { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
.sidebar-content a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; font-size: 13px; }
.sidebar-item { display: block; margin-bottom: 4px; }
.sidebar-role { font-size: 13px; color: var(--text); font-weight: 600; display: block; margin-bottom: 3px; overflow-wrap: break-word; word-break: break-word; }
.sidebar-location { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); }
.sidebar-skills-list { list-style: none; padding: 0; margin: 0; }
.sidebar-skills-list li { font-size: 13px; color: var(--text-muted); padding: 2px 0; line-height: 1.5; overflow-wrap: break-word; word-break: break-word; }

/* --- Links --- */
a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
a:hover { color: var(--accent-hover); }

/* --- Headings --- */
h1 { font-family: var(--font-display); font-size: 32px; font-weight: 800; color: var(--text); line-height: 1.15; letter-spacing: -0.03em; margin-bottom: 8px; }
h2 { font-family: var(--font-mono); font-size: 11px; font-weight: 500; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin: 32px 0 14px; border-top: 1px solid var(--border); padding-top: 14px; }
h2:first-child, .main-col > h2:first-child { margin-top: 0; border-top: none; padding-top: 0; }

/* --- Hero (home page) --- */
.hero { margin-bottom: 24px; }
.hero-headline { font-size: 16px; color: var(--text-muted); line-height: 1.6; margin-bottom: 4px; }
.hero-contact { font-size: 14px; margin-top: 6px; }
.hero-contact a { color: var(--accent); }

/* --- Home Bio --- */
.home-bio { font-size: 15px; color: var(--text); line-height: 1.75; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--accent); }

/* --- Experience entries --- */
.entry { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; padding-bottom: 0; }
.entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.entry-title { font-weight: 700; font-size: 15px; color: var(--text); }
.entry-date { font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); white-space: nowrap; }
.entry-role { font-size: 14px; color: var(--text-muted); font-style: italic; margin-bottom: 4px; }
.entry ul { margin: 6px 0 0 0; padding-left: 18px; font-size: 14px; color: var(--text-muted); list-style: disc; }
.entry li { margin-bottom: 4px; line-height: 1.55; }
.entry-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; }

/* --- Sub-entry (multi-role companies) --- */
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 600; font-style: normal; color: var(--text); }
.sub-entry .entry-date { font-size: 11px; }
.sub-entry .entry-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }

/* --- Details toggle --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: var(--font-mono); font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* --- Projects --- */
.project { margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid var(--border-light); }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.project-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.project-name { font-weight: 700; font-size: 15px; color: var(--text); }
.project-name a { color: var(--accent); text-decoration: underline; text-underline-offset: 3px; }
.project-metric { font-family: var(--font-mono); font-size: 12px; color: var(--accent); }
.project-desc { font-size: 14px; color: var(--text-muted); line-height: 1.65; }

/* --- Education --- */
.education-entry { font-size: 14px; color: var(--text-muted); line-height: 1.65; margin-bottom: 6px; }

/* --- Strengths --- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: var(--text); padding: 4px 0; border-bottom: 1px solid var(--border-light); }
.strengths-list li:last-child { border-bottom: none; }

/* --- About text --- */
.about-text { font-size: 15px; color: var(--text); line-height: 1.75; margin-bottom: 16px; }
.about-text p { margin-bottom: 12px; }

/* --- Contact --- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* --- Footer --- */
footer { margin-top: 40px; padding-top: 14px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* --- Print --- */
@media print { nav, footer, .sidebar { display: none; } .wrap { padding: 1rem; max-width: none; } .layout { display: block; } .main-col { width: 100%; } }

/* --- Mobile: sidebar stacks below --- */
@media (max-width: 660px) {
  .wrap { max-width: 100%; padding: 20px 24px; }
  .layout { flex-direction: column; gap: 32px; }
  .sidebar { width: 100%; position: static; border-top: 1px solid var(--border); padding-top: 24px; border-left: none; padding-left: 0; }
  h1 { font-size: 26px; }
  nav { font-size: 12px; gap: 10px; }
  nav .site-name { font-size: 16px; }
  nav span { font-size: 12px; }
  .entry-header { flex-direction: column; }
  .sub-entry .entry-header { flex-direction: column; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  h1 { font-size: 22px; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 10px; gap: 6px; }
  nav span { font-size: 10px; }
  .hero-headline { font-size: 14px; }
  .home-bio { font-size: 13px; }
  .entry-title { font-size: 13px; }
  .entry-role { font-size: 13px; }
  .entry ul { font-size: 13px; }
  .project-name { font-size: 13px; }
  .project-desc { font-size: 13px; }
  .sidebar-content { font-size: 12px; }
  .sidebar-skills-list li { font-size: 12px; }
  .strengths-list li { font-size: 13px; }
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

    if (targetRoles.length > 0) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Target Roles</div>
<div class="sidebar-content">${targetRoles.map(r => `<span class="sidebar-role">${esc(r)}</span>`).join('')}</div>
</div>`);
    }

    if (location) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Location</div>
<div class="sidebar-content"><span class="sidebar-location">${esc(location)}</span></div>
</div>`);
    }

    if (skills.length > 0) {
      parts.push(`<div class="sidebar-section">
<div class="sidebar-label">Skills</div>
<ul class="sidebar-skills-list">${skills.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
</div>`);
    }

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
    const siteNameClass = active === 'index.html' ? 'site-name site-name-hidden' : 'site-name';
    return `<nav><a href="index.html" class="${siteNameClass}">${esc(fullName)}</a><div class="nav-links">${items}</div></nav>`;
  }

  // --- Render helpers ---
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
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

  let projectsHtml = '';
  if (projects.length > 0) {
    projectsHtml = `<h2>Projects</h2>
${projects.map(p => `<div class="project"><div class="project-header"><span class="project-name">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="project-metric">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="project-desc">${p.description}</p>` : ''}</div>`).join('\n')}`;
  }

  const homeBody = `<div class="layout">
<div class="main-col">
<div class="hero">
<h1>${esc(fullName)}</h1>
${headline ? `<p class="hero-headline">${esc(headline)}</p>` : ''}
</div>
${homeContent}
${projectsHtml}
</div>
${sidebar}
</div>`;

  // --- EXPERIENCE ---
  const groups = experienceGroups;
  const expEntries = groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="entry-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><div class="entry-role">${esc(r.role)}</div><span class="entry-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
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
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p>`);

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
    result[filename] = `<div class="wrap">
${nav(active)}
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>`;
  }
  return result;
}
