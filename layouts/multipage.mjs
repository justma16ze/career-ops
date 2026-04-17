/**
 * layouts/multipage.mjs — Standard multi-page layout with top nav
 *
 * Extracted from templates/pi.mjs structure.
 * Top nav: site-name left, page links right.
 * Separate pages: home, experience, about, optional work.
 * On home page, site-name uses visibility:hidden when hero name is present.
 */

export const name = 'multipage';
export const description = 'Standard top nav with separate pages (home, experience, about, optional work)';

export function css() {
  return `/* === multipage layout: structural only === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: var(--font-body); color: var(--text); background: var(--bg); line-height: 1.6; margin: 0; padding: 0; }
.wrap { max-width: var(--wrap-width, 700px); margin: 0 auto; padding: 28px 36px 40px; }

/* --- Nav --- */
nav { display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; margin-bottom: 24px; font-size: 14px; }
nav .site-name { font-family: var(--font-display); font-size: 26px; color: var(--text); text-decoration: none; margin-right: auto; }
nav .site-name:hover { color: var(--text); }
nav a { color: var(--text); text-decoration: underline; text-underline-offset: 6px; text-decoration-color: var(--border); }
nav a:hover { text-decoration-color: var(--text); }
nav .active { text-decoration-color: var(--text); text-decoration-thickness: 2px; }
nav .site-name-hidden { visibility: hidden; }

/* --- Headings --- */
h2 { font-family: var(--font-display); font-size: 16px; font-weight: 700; color: var(--text); margin: 36px 0 12px; padding-top: 0; border-top: none; }

/* --- Home Bio --- */
.home-bio { font-size: 15px; color: var(--text-muted); line-height: 1.75; margin-bottom: 32px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--text); }

/* --- Timeline container --- */
.timeline { position: relative; margin-left: 6px; padding-left: 28px; border-left: 1px solid var(--border); margin-top: 24px; }

/* --- Entry --- */
.entry { position: relative; padding: 14px 16px; margin-bottom: 12px; background: var(--bg-card, var(--bg)); }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 700; font-size: 14px; color: var(--text); }
.entry-title a { color: var(--text); text-decoration: underline; text-decoration-color: var(--border); text-underline-offset: 3px; }
.entry-date { font-size: 12px; color: var(--text-faint); font-family: var(--font-mono); white-space: nowrap; }
.entry-role { font-size: 13px; color: var(--text-muted); font-style: italic; margin-bottom: 4px; }
.entry-desc { font-size: 13px; color: var(--text-muted); line-height: 1.6; }
.entry ul { margin: 6px 0 0 0; padding-left: 16px; font-size: 13px; color: var(--text-muted); list-style: disc; }
.entry li { margin-bottom: 3px; line-height: 1.5; }

/* --- Sub-entry (multi-role companies) --- */
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 700; font-style: normal; font-size: 13px; color: var(--text); }
.sub-entry .entry-date { font-size: 12px; }

/* --- Details toggle --- */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ show more'; }
details[open] summary::before { content: '- show less'; }
details .detail-content { padding-top: 8px; }

/* --- Skills grid --- */
.skills-list { font-size: 13px; color: var(--text-muted); line-height: 1.4; column-count: 3; column-gap: 24px; }
.skills-list span { display: block; padding: 2px 0; }

/* --- Strengths --- */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: var(--text-muted); padding: 3px 0; }

/* --- Contact --- */
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; }

/* --- Links --- */
a { color: var(--accent); }
a:hover { color: var(--accent-hover); }

/* --- Footer --- */
footer { margin-top: 40px; padding-top: 12px; border-top: 1px solid var(--footer-border); font-size: 12px; color: var(--footer-text); }
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover); }

/* --- Print --- */
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* --- Mobile --- */
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 20px 24px; }
  nav { font-size: 13px; gap: 12px; flex-wrap: wrap; }
  .timeline { margin-left: 0; padding-left: 20px; }
  .entry { padding: 12px; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .skills-list { column-count: 2; }
  .home-bio { font-size: 14px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px !important; }
  nav .site-name { font-size: 20px; }
  h2 { font-size: 14px; }
  nav { font-size: 12px; gap: 8px; }
  .timeline { padding-left: 16px; }
  .entry { padding: 10px; }
  .entry-title { font-size: 13px; }
  .entry-desc { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 13px; }
  .strengths-list li { font-size: 12px; }
  .skills-list { column-count: 1; }
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
    // On home page, hide site-name if hero name will be shown
    const siteNameClass = active === 'index.html' ? 'site-name site-name-hidden' : 'site-name';
    return `<nav><a href="index.html" class="${siteNameClass}">${esc(fullName)}</a> ${items}</nav>`;
  }

  // --- Render helpers ---
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  function renderExperienceGroups(groups) {
    return groups.map(g => {
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
  }

  // --- HOME ---
  // Omit the bio article entirely when there is no content to display.
  let homeContent = '';
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
    if (parts.length > 0) {
      homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
    }
  }

  const homeBody = `<main>
<h1>${esc(fullName)}</h1>
${headline ? `<p class="hero-headline">${esc(headline)}</p>` : ''}
${homeContent}
</main>`;

  // --- WORK ---
  const workBody = projects.length > 0 ? `<main>
<div class="timeline">
${projects.map(p => `<div class="entry"><div class="entry-header"><span class="entry-title">${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</span>${p.heroMetric ? `<span class="entry-date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="entry-desc">${p.description}</p>` : ''}</div>`).join('\n')}
</div>
</main>` : '';

  // --- EXPERIENCE ---
  const expBody = `<main>
<div class="timeline">
${renderExperienceGroups(experienceGroups)}
</div>
${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="entry-desc">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}
</main>`;

  // --- ABOUT ---
  const aboutParts = ['<main>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<p class="home-bio">${renderInlineMarkdown(summaryText)}</p>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  if (currentProject) aboutParts.push(`<h2>Now</h2><p class="entry-desc">${renderInlineMarkdown(currentProject)}</p>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  if (targetDesc) aboutParts.push(`<h2>Looking For</h2><p class="entry-desc">${esc(targetDesc)}</p>`);
  if (skills.length > 0) aboutParts.push(`<h2>Skills</h2><div class="skills-list">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutParts.push(`<h2>Contact</h2><p class="contact-line">${links.join(' ')}</p>`);
  aboutParts.push('</main>');

  // --- Assemble pages ---
  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutParts.join('\n')],
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
