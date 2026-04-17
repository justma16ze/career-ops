/**
 * layouts/sidebar.mjs — Left sidebar layout
 *
 * Extracted from templates/slate.mjs structure.
 * Sticky left sidebar with name, headline, nav, and social links.
 * Scrolling right content area. Multi-page: home, experience, about.
 * Sidebar is identical on all pages; content changes per page.
 */

export const name = 'sidebar';
export const description = 'Sticky left sidebar with name/headline/nav/social, scrolling right content';

export function css() {
  return `/* === sidebar layout: structural only === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; scroll-behavior: smooth; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.7; margin: 0; padding: 0; font-size: 14px; }
a { color: var(--accent); text-decoration: none; transition: color 0.15s ease; }
a:hover { color: var(--accent-hover); }

/* --- Two-column wrapper --- */
.wrap { width: 100% !important; max-width: 1100px; margin: 0 auto; padding: 0 48px; display: flex; gap: 48px; min-height: 100vh; }

/* --- Left sidebar (sticky) --- */
.sidebar { position: sticky; top: 0; width: 400px; min-width: 400px; height: 100vh; padding: 96px 0 40px 0; display: flex; flex-direction: column; justify-content: space-between; }
.sidebar-top { }
.site-name { font-family: var(--font-display); font-size: 46px; font-weight: 700; color: var(--text); letter-spacing: -0.025em; line-height: 1.05; margin-bottom: 12px; text-decoration: none; display: block; }
.site-name:hover { color: var(--text); }
.hero-headline { font-size: 17px; font-weight: 500; color: var(--text); margin-bottom: 16px; line-height: 1.4; }
.sidebar-tagline { font-size: 15px; color: var(--text-muted); line-height: 1.6; margin-bottom: 56px; }

/* --- Sidebar nav --- */
nav { display: block; background: transparent; border: none; box-shadow: none; padding: 0; margin: 0; text-transform: none; letter-spacing: normal; font-size: inherit; }
.nav-links { list-style: none; padding: 0; margin: 0; }
.nav-links li { margin-bottom: 12px; }
.nav-links a { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-faint); text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: color 0.15s ease; }
.nav-links a::before { content: ''; display: inline-block; width: 32px; height: 1px; background: var(--text-faint); transition: width 0.15s ease, background 0.15s ease; }
.nav-links a:hover { color: var(--text); }
.nav-links a:hover::before { width: 64px; background: var(--text); }
.nav-links .active { color: var(--text); }
.nav-links .active::before { width: 64px; background: var(--text); }

.sidebar-bottom { }
.social-links { display: flex; gap: 20px; align-items: center; }
.social-links a { color: var(--text-faint); text-decoration: none; font-size: 13px; font-weight: 500; transition: color 0.15s ease; }
.social-links a:hover { color: var(--text); }

/* --- Right content (scrolls) --- */
.content { flex: 1; padding: 96px 0 80px; min-width: 0; }

/* --- Section spacing --- */
.section { margin-bottom: 96px; }
.section:last-child { margin-bottom: 48px; }
.section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text); margin-bottom: 40px; display: none; }

/* --- About / Bio --- */
.home-bio { font-size: 16px; color: var(--text-muted); line-height: 1.8; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: var(--text); text-decoration: underline; text-underline-offset: 3px; }
.home-bio a:hover { color: var(--accent); }
.home-bio strong { color: var(--text); font-weight: 600; }

/* --- Experience entry --- */
.entry { display: grid; grid-template-columns: 140px 1fr; gap: 16px; padding: 24px; margin: 0 -24px; border-radius: 8px; transition: background 0.15s ease, box-shadow 0.15s ease; margin-bottom: 4px; border: 1px solid transparent; }
.entry:hover { background: var(--bg-alt); }
.entry-date { font-size: 12px; color: var(--text-faint); font-family: var(--font-mono); font-weight: 500; text-transform: uppercase; letter-spacing: 0.02em; padding-top: 5px; white-space: nowrap; line-height: 1.5; }
.entry-body { }
.entry-header { margin-bottom: 4px; }
.entry-title { font-size: 15px; font-weight: 600; color: var(--text); line-height: 1.4; }
.entry-title a { color: var(--text); text-decoration: none; }
.entry-title a:hover { color: var(--accent); }
.entry-company { font-size: 14px; color: var(--text-muted); margin-bottom: 8px; line-height: 1.4; }
.entry-role { font-size: 14px; color: var(--text-muted); margin-bottom: 6px; line-height: 1.5; }
.entry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.7; }
.entry ul { margin: 6px 0 0 0; padding-left: 16px; list-style: disc; }
.entry li { margin-bottom: 4px; font-size: 13px; color: var(--text-muted); line-height: 1.6; }

/* --- Sub-entry (multi-role companies) --- */
.sub-entry { padding-top: 12px; margin-top: 12px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 0; margin-top: 0; border-top: none; }
.sub-entry .entry-header { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 2px; }
.sub-entry .entry-role { font-size: 14px; font-weight: 600; color: var(--text); }
.sub-entry .entry-date { font-size: 12px; }

/* --- Skills --- */
.skills-list { font-size: 13px; color: var(--text-muted); line-height: 1.8; }
.skills-list .tag { display: inline; }
.skills-list .tag::after { content: ' \u00b7 '; color: var(--text-faint); }
.skills-list .tag:last-child::after { content: ''; }

/* --- Strengths --- */
.strengths-list { list-style: none; padding: 0; }
.strengths-list li { font-size: 14px; color: var(--text-muted); padding: 8px 0 8px 20px; line-height: 1.5; border-left: 2px solid var(--border); margin-bottom: 4px; transition: border-color 0.15s ease; }
.strengths-list li:hover { border-left-color: var(--accent); color: var(--text); }

/* --- Contact --- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; color: var(--text-muted); text-decoration: underline; text-underline-offset: 3px; }
.contact-line a:hover { color: var(--accent); }

/* --- Education --- */
h2 { font-family: var(--font-display); font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text); margin: 48px 0 16px; padding-top: 0; border-top: none; }

/* --- Details toggle --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* --- Footer --- */
footer { margin-top: 80px; padding: 24px 0 40px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* --- Print --- */
@media print {
  .sidebar { display: none; }
  .wrap { max-width: none; padding: 1rem; display: block; }
  .content { padding: 0; }
  footer { display: none; }
  .entry { background: none !important; }
  .section-label { display: block; }
}

/* --- Mobile: sidebar stacks on top --- */
@media (max-width: 660px) {
  .wrap { flex-direction: column; padding: 0 24px; gap: 0; }
  .sidebar { position: relative; width: 100%; min-width: 0; height: auto; padding: 48px 0 24px; }
  .sidebar-tagline { margin-bottom: 24px; }
  .nav-links { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
  .nav-links li { margin-bottom: 0; }
  .nav-links a::before { display: none; }
  .nav-links a { font-size: 12px; }
  .content { padding: 24px 0 48px; }
  .section { margin-bottom: 64px; }
  .section-label { display: block; position: sticky; top: 0; z-index: 10; background: var(--bg); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 12px 0; margin: 0 0 24px; }
  .entry { grid-template-columns: 1fr; gap: 4px; padding: 16px 12px; margin: 0 -12px; border: none; }
  .entry-date { padding-top: 0; font-size: 12px; }
  .site-name { font-size: 34px; }
  .hero-headline { font-size: 15px; }
  .home-bio { font-size: 14px; }
}
@media (max-width: 480px) {
  .wrap { padding: 0 16px; }
  .sidebar { padding: 32px 0 16px; }
  .site-name { font-size: 28px; }
  .hero-headline { font-size: 14px; }
  .nav-links a { font-size: 12px; }
  .entry { padding: 12px 8px; margin: 0 -8px; }
  .entry-title { font-size: 14px; }
  .entry-desc { font-size: 12px; }
  .entry li { font-size: 12px; }
  .home-bio { font-size: 13px; }
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

  // Short tagline for sidebar
  const shortTagline = summaryText ? summaryText.split('.')[0].trim() + '.' : '';

  // Nav items
  const navItems = [
    { href: 'index.html', label: 'About' },
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Experience' }] : []),
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Projects' }] : []),
    { href: 'about.html', label: 'More' },
  ];

  // Social links
  function socialLinks() {
    const links = [];
    if (linkedin) links.push(`<a href="${esc(linkedinUrl)}" target="_blank" rel="noopener">LinkedIn</a>`);
    if (github) links.push(`<a href="${esc(githubUrl)}" target="_blank" rel="noopener">GitHub</a>`);
    if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    return links.length > 0 ? `<div class="social-links">${links.join('')}</div>` : '';
  }

  function sidebar(active) {
    const navHtml = navItems.map(ni =>
      ni.href === active
        ? `<li><a href="${ni.href}" class="active">${esc(ni.label)}</a></li>`
        : `<li><a href="${ni.href}">${esc(ni.label)}</a></li>`
    ).join('');
    return `<aside class="sidebar">
  <div class="sidebar-top">
    <a href="index.html" class="site-name">${esc(fullName)}</a>
    ${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}
    ${shortTagline ? `<p class="sidebar-tagline">${esc(shortTagline)}</p>` : ''}
    <nav>
      <ul class="nav-links">${navHtml}</ul>
    </nav>
  </div>
  <div class="sidebar-bottom">
    ${socialLinks()}
  </div>
</aside>`;
  }

  // --- Render helpers ---
  function renderBullets(bullets) {
    if (!bullets || bullets.length === 0) return '';
    if (bullets.length <= 2) {
      return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    }
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  // --- HOME ---
  // Omit both the bio wrapper and the surrounding "About" section when
  // there is no bio content to display.
  let homeContent = '';
  if (homeBio) {
    homeContent = `<div class="home-bio">${homeBio}</div>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    if (parts.length > 0) {
      homeContent = `<div class="home-bio">${parts.join('\n')}</div>`;
    }
  }
  const homeBody = homeContent ? `<section class="section">
<div class="section-label">About</div>
${homeContent}
</section>` : '';

  // --- EXPERIENCE ---
  const groups = experienceGroups;
  const expBody = `<section class="section">
<div class="section-label">Experience</div>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      const titleText = r.role || g.company;
      const companyText = r.role ? g.company : '';
      return `<div class="entry">
  <div class="entry-date">${esc(r.dateRange)}</div>
  <div class="entry-body">
    <div class="entry-header"><span class="entry-title">${esc(titleText)}</span></div>
    ${companyText ? `<div class="entry-company">${esc(companyText)}</div>` : ''}
    <div class="entry-desc">${renderBullets(r.bullets)}</div>
  </div>
</div>`;
    }
    // Multi-role company
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="entry">
  <div class="entry-date">${esc(spanDate)}</div>
  <div class="entry-body">
    <div class="entry-header"><span class="entry-title">${esc(g.company)}</span></div>
    ${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div><div class="entry-desc">${renderBullets(r.bullets)}</div></div>`).join('')}
  </div>
</div>`;
  }).join('\n')}
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="entry-desc">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</section>`;

  // --- WORK / Projects ---
  const workBody = projects.length > 0 ? `<section class="section">
<div class="section-label">Projects</div>
${projects.map(p => `<div class="entry">
  <div class="entry-date">${p.heroMetric ? esc(p.heroMetric) : ''}</div>
  <div class="entry-body">
    <div class="entry-title">${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>` : esc(p.name)}</div>
    ${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}
  </div>
</div>`).join('\n')}
</section>` : '';

  // --- ABOUT / More ---
  const aboutParts = ['<section class="section">'];
  aboutParts.push('<div class="section-label">More</div>');
  if (!homeBio && summaryText) {
    aboutParts.push(`<div class="home-bio"><p>${renderInlineMarkdown(summaryText)}</p></div>`);
  }
  if (superpowers.length > 0) {
    aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  }
  if (currentProject) {
    aboutParts.push(`<h2>Now</h2><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p>`);
  }
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) {
    aboutParts.push(`<h2>Looking For</h2><p class="entry-desc">${esc(targetDesc)}</p>`);
  }
  if (skills.length > 0) {
    aboutParts.push(`<h2>Skills</h2><div class="skills-list">${skills.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div>`);
  }
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) {
    aboutParts.push(`<h2>Contact</h2><p class="contact-line">${links.join('')}</p>`);
  }
  aboutParts.push('</section>');

  // --- Assemble pages ---
  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ...(projects.length > 0 ? [['work.html', 'Projects', 'work.html', workBody]] : []),
    ['about.html', 'More', 'about.html', aboutParts.join('\n')],
  ];

  for (const [filename, title, active, body] of pageDefs) {
    result[filename] = `<div class="wrap">
${sidebar(active)}
<main class="content">
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</main>
</div>`;
  }
  return result;
}
