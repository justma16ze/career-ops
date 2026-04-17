/**
 * layouts/scroll.mjs — Single-page scroll layout with sticky anchor nav
 *
 * Extracted from templates/mono.mjs structure.
 * One index.html. Everything stacked vertically: Hero, About, Experience,
 * Skills, Contact, Footer. Sticky anchor nav at top.
 * Returns only { 'index.html': html }.
 */

export const name = 'scroll';
export const description = 'Single page, everything stacked, sticky anchor nav';

export function css() {
  return `/* === scroll layout: structural only === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; scroll-behavior: smooth; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; margin: 0; padding: 0; font-size: 14px; }
.wrap { max-width: var(--wrap-width, 620px); margin: 0 auto; padding: 0 36px 40px; position: relative; z-index: 1; }
a { color: var(--accent); text-decoration: none; transition: color 0.15s ease; }
a:hover { color: var(--accent-hover); }

/* --- Sticky anchor nav --- */
nav { position: sticky; top: 0; z-index: 10; background: var(--bg-nav, var(--bg)); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; padding: 16px 0; margin-bottom: 0; font-size: 13px; border: none; border-bottom: 1px solid var(--border); box-shadow: none; }
nav .site-name { font-family: var(--font-display); font-size: 16px; font-weight: 500; color: var(--text); text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav .site-name-hidden { visibility: hidden; }
nav .nav-links { display: contents; }
nav a { color: var(--text-faint); text-decoration: none; }
nav a:hover { color: var(--text-muted); }
section[id] { scroll-margin-top: 60px; }
section { margin-bottom: 56px; }

/* --- Headings --- */
h2 { font-family: var(--font-display); font-size: 13px; font-weight: 500; color: var(--text-faint); margin: 0 0 20px; padding-top: 0; border-top: none; text-transform: lowercase; letter-spacing: 0.05em; }

/* --- Hero --- */
.hero { padding-top: 80px; margin-bottom: 56px; }
h1 { font-family: var(--font-display); font-size: 28px; font-weight: 700; color: var(--text); letter-spacing: -0.02em; margin-bottom: 8px; }
.hero-headline { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

/* --- About / Bio --- */
.home-bio { font-size: 14px; color: var(--text-muted); line-height: 1.75; }
.home-bio p { margin-bottom: 16px; }
.home-bio a { color: var(--text); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--border); }
.home-bio a:hover { color: var(--accent); }

/* --- Experience entries --- */
.entry { padding: 16px 0; border-bottom: 1px solid var(--border); }
.entry:last-child { border-bottom: none; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 500; font-size: 14px; color: var(--text); }
.entry-date { font-size: 12px; color: var(--text-faint); font-family: var(--font-mono); white-space: nowrap; }
.entry-role { font-size: 13px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.7; }
.entry ul { margin: 6px 0 0 0; padding-left: 0; font-size: 13px; color: var(--text-muted); list-style: none; }
.entry li { margin-bottom: 3px; line-height: 1.5; padding-left: 16px; text-indent: -16px; }
.entry li::before { content: '-'; margin-right: 8px; color: var(--text-faint); display: inline; }

/* --- Sub-entry (multi-role companies) --- */
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 500; font-style: normal; font-size: 13px; color: var(--text); }
.sub-entry .entry-date { font-size: 12px; }

/* --- Details toggle --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }

/* --- Skills --- */
.skills-list { font-size: 13px; color: var(--text-muted); line-height: 1.8; }

/* --- Education --- */
.education { margin-top: 32px; }
.education p { font-size: 13px; color: var(--text-muted); padding: 4px 0; }

/* --- Contact --- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; color: var(--text-muted); text-decoration: underline; text-underline-offset: 4px; text-decoration-color: var(--border); }
.contact-line a:hover { color: var(--accent); }

/* --- Footer --- */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* --- Print --- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* --- Mobile --- */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 0 24px 32px; }
  nav { font-size: 12px; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; padding: 12px 0; }
  .hero { padding-top: 48px; margin-bottom: 40px; }
  h1 { font-size: 22px; }
  .entry { padding: 12px 0; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .home-bio { font-size: 13px; }
  section { margin-bottom: 40px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 0 16px 24px !important; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 12px; gap: 8px; }
  h2 { font-size: 12px; }
  .hero { padding-top: 32px; margin-bottom: 32px; }
  h1 { font-size: 20px; }
  .hero-headline { font-size: 13px; }
  .entry-title { font-size: 13px; }
  .entry-role { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 12px; }
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
  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  // --- Nav (anchor links) ---
  const nav = `<nav><a href="#" class="site-name site-name-hidden">${esc(fullName)}</a><div class="nav-links"><a href="#about">about</a> <a href="#experience">experience</a> <a href="#skills">skills</a> <a href="#contact">contact</a></div></nav>`;

  // --- Hero ---
  const hero = `<div class="hero"><h1>${esc(fullName)}</h1>${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}</div>`;

  // --- About ---
  // Omit the entire about section when there's nothing to show,
  // rather than emitting an empty <article> or a stale placeholder.
  let aboutSection = '';
  if (homeBio) {
    aboutSection = `<section id="about"><h2>about</h2><article class="home-bio">${homeBio}</article></section>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    if (parts.length > 0) {
      aboutSection = `<section id="about"><h2>about</h2><article class="home-bio">${parts.join('\n')}</article></section>`;
    }
  }

  // --- Experience ---
  const groups = experienceGroups;
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  const expEntries = groups.map(g => {
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
  }).join('\n');

  const eduHtml = education.length > 0 ? `<div class="education"><h2>education</h2>${education.map(e => `<p>${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</div>` : '';
  const expSection = `<section id="experience"><h2>experience</h2>${expEntries}${eduHtml}</section>`;

  // --- Skills ---
  const skillsSection = skills.length > 0 ? `<section id="skills"><h2>skills</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p></section>` : '';

  // --- Contact ---
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">linkedin</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">github</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  const contactSection = links.length > 0 ? `<section id="contact"><h2>contact</h2><p class="contact-line">${links.join(' ')}</p></section>` : '';

  // --- Assemble single page ---
  const body = `${hero}\n${aboutSection}\n${expSection}\n${skillsSection}\n${contactSection}`;

  const content = `<div class="wrap">
${nav}
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>`;

  return { 'index.html': content };
}
