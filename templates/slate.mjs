/**
 * templates/slate.mjs — Dark Slate / Developer Portfolio
 *
 * Dark slate background, teal accent, sticky left sidebar, scrolling right content.
 * THE canonical engineer portfolio aesthetic.
 */

export const name = 'slate';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; scroll-behavior: smooth; }
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #94a3b8; background: #0f172a; line-height: 1.7; margin: 0; padding: 0; font-size: 14px; }
a { color: #e2e8f0; text-decoration: none; transition: color 0.15s ease; }
a:hover { color: #5eead4; }

/* --- Layout wrapper --- */
.wrap { max-width: 1100px; margin: 0 auto; padding: 0 48px; display: flex; gap: 48px; min-height: 100vh; }

/* --- Left sidebar (sticky) --- */
.sidebar { position: sticky; top: 0; width: 400px; min-width: 400px; height: 100vh; padding: 96px 0 40px 0; display: flex; flex-direction: column; justify-content: space-between; }
.sidebar-top { }
.site-name { font-size: 46px; font-weight: 700; color: #e2e8f0; letter-spacing: -0.025em; line-height: 1.05; margin-bottom: 12px; text-decoration: none; display: block; }
.site-name:hover { color: #e2e8f0; }
.sidebar-headline { font-size: 17px; font-weight: 500; color: #cbd5e1; margin-bottom: 16px; line-height: 1.4; }
.sidebar-tagline { font-size: 15px; color: #64748b; line-height: 1.6; margin-bottom: 56px; }
.sidebar-nav { list-style: none; padding: 0; margin: 0 0 0 0; }
.sidebar-nav li { margin-bottom: 12px; }
.sidebar-nav a { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #64748b; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; transition: color 0.15s ease; }
.sidebar-nav a::before { content: ''; display: inline-block; width: 32px; height: 1px; background: #64748b; transition: width 0.15s ease, background 0.15s ease; }
.sidebar-nav a:hover { color: #e2e8f0; }
.sidebar-nav a:hover::before { width: 64px; background: #e2e8f0; }
.sidebar-nav .active { color: #e2e8f0; }
.sidebar-nav .active::before { width: 64px; background: #e2e8f0; }

.sidebar-bottom { }
.social-links { display: flex; gap: 20px; align-items: center; }
.social-links a { color: #64748b; text-decoration: none; font-size: 13px; font-weight: 500; transition: color 0.15s ease; }
.social-links a:hover { color: #e2e8f0; }

/* --- Right content (scrolls) --- */
.content { flex: 1; padding: 96px 0 80px; min-width: 0; }

/* --- Section spacing --- */
.section { margin-bottom: 96px; }
.section:last-child { margin-bottom: 48px; }
.section-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e2e8f0; margin-bottom: 40px; position: relative; padding-left: 0; display: none; }

/* --- About / Bio --- */
.about-text { font-size: 16px; color: #94a3b8; line-height: 1.8; }
.about-text p { margin-bottom: 16px; }
.about-text a { color: #e2e8f0; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(94,234,212,0.4); }
.about-text a:hover { color: #5eead4; text-decoration-color: #5eead4; }
.about-text strong { color: #e2e8f0; font-weight: 600; }

/* --- Experience card --- */
.exp-card { display: grid; grid-template-columns: 140px 1fr; gap: 16px; padding: 24px; margin: 0 -24px; border-radius: 8px; transition: background 0.15s ease, box-shadow 0.15s ease; margin-bottom: 4px; border: 1px solid transparent; }
.exp-card:hover { background: rgba(30, 41, 59, 0.5); box-shadow: inset 0 1px 0 0 rgba(148,163,184,0.05); border-color: rgba(94,234,212,0.05); }
.exp-date { font-size: 12px; color: #64748b; font-weight: 500; text-transform: uppercase; letter-spacing: 0.02em; padding-top: 5px; white-space: nowrap; line-height: 1.5; }
.exp-body { }
.exp-header { margin-bottom: 4px; }
.exp-title { font-size: 15px; font-weight: 600; color: #e2e8f0; line-height: 1.4; }
.exp-company { font-size: 14px; color: #94a3b8; margin-bottom: 8px; line-height: 1.4; }
.exp-title a { color: #e2e8f0; text-decoration: none; }
.exp-title a:hover { color: #5eead4; }
.exp-card:hover .exp-title, .exp-card:hover .exp-title a { color: #5eead4; }
.exp-role { font-size: 14px; color: #94a3b8; margin-bottom: 6px; line-height: 1.5; }
.exp-desc { font-size: 13px; color: #94a3b8; line-height: 1.7; }
.exp-desc ul { margin: 6px 0 0 0; padding-left: 16px; list-style: disc; }
.exp-desc li { margin-bottom: 4px; font-size: 13px; line-height: 1.6; }
.exp-desc a { color: #e2e8f0; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba(94,234,212,0.4); }
.exp-desc a:hover { color: #5eead4; }

/* --- Sub-roles within a company --- */
.sub-role { padding-top: 12px; margin-top: 12px; border-top: 1px solid rgba(100,116,139,0.15); }
.sub-role:first-child { padding-top: 0; margin-top: 0; border-top: none; }
.sub-role-header { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; flex-wrap: wrap; margin-bottom: 2px; }
.sub-role-title { font-size: 14px; font-weight: 600; color: #e2e8f0; }
.sub-role-date { font-size: 12px; color: #64748b; white-space: nowrap; }

/* --- Tech tags --- */
.tag-list { margin-top: 10px; font-size: 13px; color: #94a3b8; line-height: 1.8; }
.tag { display: inline; }
.tag::after { content: ' · '; color: #475569; }
.tag:last-child::after { content: ''; }

/* --- Project card --- */
.proj-card { display: grid; grid-template-columns: 140px 1fr; gap: 16px; padding: 24px; margin: 0 -24px; border-radius: 8px; transition: background 0.15s ease, box-shadow 0.15s ease; margin-bottom: 4px; border: 1px solid transparent; }
.proj-card:hover { background: rgba(30, 41, 59, 0.5); box-shadow: inset 0 1px 0 0 rgba(148,163,184,0.05); border-color: rgba(94,234,212,0.05); }
.proj-metric { font-size: 12px; color: #64748b; font-weight: 500; padding-top: 4px; line-height: 1.5; }
.proj-body { }
.proj-title { font-size: 15px; font-weight: 600; color: #e2e8f0; margin-bottom: 4px; line-height: 1.4; }
.proj-title a { color: #e2e8f0; text-decoration: none; }
.proj-title a:hover { color: #5eead4; }
.proj-card:hover .proj-title, .proj-card:hover .proj-title a { color: #5eead4; }
.proj-desc { font-size: 13px; color: #94a3b8; line-height: 1.7; }

/* --- Education --- */
.edu-section { margin-top: 48px; }
.edu-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e2e8f0; margin-bottom: 16px; }
.edu-entry { font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 6px; }

/* --- Strengths --- */
.strengths-section { margin-top: 48px; }
.strengths-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e2e8f0; margin-bottom: 16px; }
.strengths-list { list-style: none; padding: 0; }
.strengths-list li { font-size: 14px; color: #94a3b8; padding: 8px 0 8px 16px; line-height: 1.5; border-left: 2px solid #1e293b; margin-bottom: 4px; transition: border-color 0.15s ease; }
.strengths-list li:hover { border-left-color: #5eead4; color: #cbd5e1; }

/* --- Skills --- */
.skills-section { margin-top: 48px; }
.skills-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e2e8f0; margin-bottom: 16px; }

/* --- Looking For --- */
.looking-section { margin-top: 48px; }
.looking-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e2e8f0; margin-bottom: 12px; }
.looking-text { font-size: 14px; color: #94a3b8; line-height: 1.6; }

/* --- Contact --- */
.contact-section { margin-top: 48px; }
.contact-label { font-size: 12px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #e2e8f0; margin-bottom: 12px; }
.contact-links { font-size: 14px; }
.contact-links a { margin-right: 20px; color: #94a3b8; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(94,234,212,0.3); }
.contact-links a:hover { color: #5eead4; text-decoration-color: #5eead4; }

/* --- Footer --- */
footer { margin-top: 80px; padding: 24px 0 40px; border-top: 1px solid #1e293b; font-size: 12px; color: #475569; }
footer a { color: #64748b; font-weight: 600; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(100,116,139,0.3); }
footer a:hover { color: #5eead4; text-decoration-color: #5eead4; }

/* --- Collapsible details --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #64748b; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* --- Print --- */
@media print {
  body { background: #fff; color: #1a1a1a; }
  .sidebar { display: none; }
  .wrap { max-width: none; padding: 1rem; display: block; }
  .content { padding: 0; }
  footer { display: none; }
  .exp-card, .proj-card { background: none !important; }
  .exp-title, .proj-title, .sub-role-title, .site-name, .sidebar-headline { color: #1a1a1a !important; }
  .exp-desc, .proj-desc, .about-text, .about-text p { color: #333 !important; }
  .tag { color: #333; }
  a { color: #1a1a1a !important; }
  .section-label { display: block; color: #1a1a1a; }
}

/* --- Mobile: sidebar stacks on top --- */
@media (max-width: 660px) {
  .wrap { flex-direction: column; padding: 0 24px; gap: 0; }
  .sidebar { position: relative; width: 100%; min-width: 0; height: auto; padding: 48px 0 24px; }
  .sidebar-tagline { margin-bottom: 24px; }
  .sidebar-nav { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 16px; }
  .sidebar-nav li { margin-bottom: 0; }
  .sidebar-nav a::before { display: none; }
  .sidebar-nav a { font-size: 11px; }
  .content { padding: 24px 0 48px; }
  .section { margin-bottom: 64px; }
  .section-label { display: block; position: sticky; top: 0; z-index: 10; background: rgba(15,23,42,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); padding: 12px 0; margin: 0 0 24px; }
  .exp-card, .proj-card { grid-template-columns: 1fr; gap: 4px; padding: 16px 12px; margin: 0 -12px; border: none; }
  .exp-date, .proj-metric { padding-top: 0; font-size: 11px; }
  .site-name { font-size: 34px; }
  .sidebar-headline { font-size: 15px; }
  .about-text { font-size: 14px; }
}
@media (max-width: 480px) {
  .wrap { padding: 0 16px; }
  .sidebar { padding: 32px 0 16px; }
  .site-name { font-size: 28px; }
  .sidebar-headline { font-size: 14px; }
  .sidebar-nav a { font-size: 10px; }
  .exp-card, .proj-card { padding: 12px 8px; margin: 0 -8px; }
  .exp-title, .proj-title { font-size: 14px; }
  .exp-desc, .proj-desc { font-size: 12px; }
  .tag { font-size: 12px; }
  .about-text { font-size: 13px; }
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

  // Derive a short tagline from summaryText for sidebar
  const shortTagline = summaryText ? summaryText.split('.')[0].trim() + '.' : '';

  // Nav items — all pages get nav
  const navItems = [
    { href: 'index.html', label: 'About' },
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Experience' }] : []),
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Projects' }] : []),
    { href: 'about.html', label: 'More' },
  ];

  // Social links for sidebar
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
    ${headline ? `<div class="sidebar-headline">${esc(headline)}</div>` : ''}
    ${shortTagline ? `<p class="sidebar-tagline">${esc(shortTagline)}</p>` : ''}
    <nav>
      <ul class="sidebar-nav">${navHtml}</ul>
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

  // --- HOME page ---
  let homeContent;
  if (homeBio) {
    homeContent = `<div class="about-text">${homeBio}</div>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    homeContent = `<div class="about-text">${parts.join('\n')}</div>`;
  }

  const homeBody = `<section class="section">
<div class="section-label">About</div>
${homeContent}
</section>`;

  // --- EXPERIENCE page ---
  const groups = experienceGroups;
  const expBody = `<section class="section">
<div class="section-label">Experience</div>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      const titleText = r.role || g.company;
      const companyText = r.role ? g.company : '';
      return `<div class="exp-card">
  <div class="exp-date">${esc(r.dateRange)}</div>
  <div class="exp-body">
    <div class="exp-header"><span class="exp-title">${esc(titleText)}</span></div>
    ${companyText ? `<div class="exp-company">${esc(companyText)}</div>` : ''}
    <div class="exp-desc">${renderBullets(r.bullets)}</div>
  </div>
</div>`;
    }
    // Multi-role company
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
    return `<div class="exp-card">
  <div class="exp-date">${esc(spanDate)}</div>
  <div class="exp-body">
    <div class="exp-header"><span class="exp-title">${esc(g.company)}</span></div>
    ${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><span class="sub-role-title">${esc(r.role)}</span><span class="sub-role-date">${esc(r.dateRange)}</span></div><div class="exp-desc">${renderBullets(r.bullets)}</div></div>`).join('')}
  </div>
</div>`;
  }).join('\n')}
${education.length > 0 ? `<div class="edu-section"><div class="edu-label">Education</div>${education.map(e => `<p class="edu-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</div>` : ''}
</section>`;

  // --- WORK / Projects page ---
  const workBody = projects.length > 0 ? `<section class="section">
<div class="section-label">Projects</div>
${projects.map(p => `<div class="proj-card">
  <div class="proj-metric">${p.heroMetric ? esc(p.heroMetric) : ''}</div>
  <div class="proj-body">
    <div class="proj-title">${p.url ? `<a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.name)}</a>` : esc(p.name)}</div>
    ${p.description ? `<p class="proj-desc">${p.description}</p>` : ''}
  </div>
</div>`).join('\n')}
</section>` : '';

  // --- ABOUT / More page ---
  const aboutParts = ['<section class="section">'];
  aboutParts.push('<div class="section-label">More</div>');

  if (!homeBio && summaryText) {
    aboutParts.push(`<div class="about-text"><p>${renderInlineMarkdown(summaryText)}</p></div>`);
  }
  if (superpowers.length > 0) {
    aboutParts.push(`<div class="strengths-section"><div class="strengths-label">Strengths</div><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></div>`);
  }
  if (currentProject) {
    aboutParts.push(`<div class="looking-section"><div class="looking-label">Now</div><p class="looking-text">${renderInlineMarkdown(currentProject)}</p></div>`);
  }
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) {
    aboutParts.push(`<div class="looking-section"><div class="looking-label">Looking For</div><p class="looking-text">${esc(targetDesc)}</p></div>`);
  }
  if (skills.length > 0) {
    aboutParts.push(`<div class="skills-section"><div class="skills-label">Skills</div><div class="tag-list">${skills.map(s => `<span class="tag">${esc(s)}</span>`).join('')}</div></div>`);
  }
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) {
    aboutParts.push(`<div class="contact-section"><div class="contact-label">Contact</div><div class="contact-links">${links.join('')}</div></div>`);
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
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
    result[filename] = buildPage({
      title: t,
      sidebar: sidebar(active),
      body,
      summaryShort: data.summaryShort,
      fonts,
      cssText: css(),
    });
  }
  return result;
}

function buildPage({ title, sidebar, body, summaryShort, fonts, cssText }) {
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
${sidebar}
<main class="content">
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</main>
</div>
</body>
</html>`;
}
