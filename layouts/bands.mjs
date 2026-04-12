/**
 * layouts/bands.mjs — Full-bleed alternating bands, single page
 *
 * Full-width horizontal bands with alternating backgrounds.
 * Content centered at max-width within each band. Fixed thin nav bar at top.
 * Single page scroll with anchor nav.
 *
 * Extracted from templates/band.mjs — structural CSS only, all visuals via var().
 */

export const name = 'bands';
export const description = 'Full-bleed alternating sections with fixed anchor nav, single page scroll';

export function css() {
  return `
/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { overflow-y: scroll; scroll-behavior: smooth; }
body { margin: 0; padding: 0; }

/* === FIXED NAV === */
nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 100;
  background: var(--bg-nav, var(--bg));
  border: none; border-bottom: 1px solid var(--border);
  box-shadow: none;
  height: var(--nav-height, 48px);
  display: flex; align-items: center; justify-content: center; gap: 28px;
  font-size: 13px;
}
nav .site-name {
  font-family: var(--font-display);
  font-size: 15px; font-weight: 800;
  color: var(--text);
  text-decoration: none;
  letter-spacing: -0.02em;
  margin-right: auto;
  padding-left: 24px;
}
.nav-links { display: flex; gap: 24px; padding-right: 24px; }
nav .site-name-hidden { visibility: hidden; }
nav a { color: var(--text-muted); text-decoration: none; transition: color 0.15s; }
nav a:hover { color: var(--text); }
body { padding-top: var(--nav-height, 48px); }

/* === BANDS === */
.band { width: 100%; padding: 80px 24px; }
#hero.band { padding: 96px 24px; }
.band-white { background: var(--bg); }
.band-gray { background: var(--bg-alt); }
.band-inner { max-width: var(--wrap-width, 700px); margin: 0 auto; }

/* === HERO === */
.hero h1 {
  font-family: var(--font-display);
  font-size: 52px; font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.05;
  color: var(--text);
  margin-bottom: 16px;
}
.hero-headline { font-size: 18px; color: var(--text-muted); line-height: 1.5; margin-bottom: 10px; }
.hero .meta { font-size: 13px; color: var(--text-faint); margin-top: 4px; }
.hero .meta a { color: var(--accent); font-size: 13px; text-decoration: none; }
.hero .meta a:hover { text-decoration: underline; }

/* === ABOUT === */
.home-bio { font-size: 16px; color: var(--text-muted); line-height: 1.75; }
.home-bio p { margin-bottom: 14px; }
.home-bio a { color: var(--accent); }

/* === SECTION HEADINGS === */
h2 {
  font-family: var(--font-display);
  font-size: 13px; font-weight: 800;
  text-transform: uppercase; letter-spacing: 0.08em;
  color: var(--text-faint);
  margin: 0 0 24px; padding-top: 0; border-top: none;
}

/* === EXPERIENCE === */
.entry { padding: 20px 0; border-bottom: 1px solid var(--border-light); }
.entry:last-child { border-bottom: none; }
.entry-header {
  display: flex; justify-content: space-between;
  align-items: baseline; gap: 8px; flex-wrap: wrap;
  margin-bottom: 4px;
}
.entry-title {
  font-family: var(--font-body);
  font-size: 16px; font-weight: 800;
  color: var(--text);
  letter-spacing: -0.01em;
}
.entry-date {
  font-family: var(--font-mono);
  font-size: 12px; color: var(--text-faint);
  white-space: nowrap;
}
.entry-role { font-size: 14px; color: var(--text-muted); font-weight: 700; margin-bottom: 4px; }
.entry-desc, .entry li { color: var(--text-muted); }
.entry ul {
  margin: 6px 0 0; padding-left: 18px;
  font-size: 13px; color: var(--text-muted); list-style: disc;
}
.entry li { margin-bottom: 3px; line-height: 1.5; }
.sub-entry { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-entry .entry-header { margin-bottom: 2px; }

/* === DETAILS === */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* === EDUCATION === */
.edu { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 6px; }

/* === SKILLS === */
.skills-list {
  font-size: 13px; color: var(--text-muted);
  line-height: 1.4; column-count: 3; column-gap: 20px;
}
.skills-list span { display: block; padding: 2px 0; }

/* === STRENGTHS === */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li {
  font-size: 15px; color: var(--text-muted);
  padding: 8px 0; border-bottom: 1px solid var(--border);
}
.strengths-list li:last-child { border-bottom: none; }

/* === CONTACT === */
.contact-target { font-size: 15px; color: var(--text-muted); margin-bottom: 16px; }
.contact-target strong { color: var(--text); font-weight: 700; }
.contact-line { font-size: 15px; line-height: 2; }

/* === FOOTER === */
footer {
  padding: 32px 24px; text-align: center;
  font-size: 11px;
  color: var(--footer-text);
  border-top: 1px solid var(--footer-border, var(--border));
  background: var(--footer-bg, var(--bg));
}
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover, var(--accent)); }

/* === PRINT === */
@media print {
  nav, footer { display: none !important; }
  body { padding-top: 0; }
  .band { padding: 32px 0; background: #fff !important; }
  .band-gray { background: #fff !important; }
  .band-inner { max-width: none; }
}

/* === RESPONSIVE 660px === */
@media (max-width: 660px) {
  nav .site-name { font-size: 14px; padding-left: 16px; }
  .nav-links { gap: 16px; padding-right: 16px; font-size: 12px; }
  .band { padding: 64px 20px; }
  .hero h1 { font-size: 36px; }
  .hero-headline { font-size: 16px; }
  .entry-header { flex-direction: column; }
  .skills-list { column-count: 2; }
  .home-bio { font-size: 15px; }
}

/* === RESPONSIVE 480px === */
@media (max-width: 480px) {
  nav { height: 44px; }
  nav .site-name { font-size: 13px; padding-left: 12px; }
  .nav-links { gap: 12px; padding-right: 12px; font-size: 11px; }
  body { padding-top: 44px; }
  .band { padding: 48px 16px; }
  .hero h1 { font-size: 28px; }
  .hero-headline { font-size: 14px; }
  h2 { font-size: 12px; }
  .entry-title { font-size: 14px; }
  .entry-role { font-size: 13px; }
  .entry ul { font-size: 12px; }
  .home-bio { font-size: 14px; }
  .strengths-list li { font-size: 13px; }
  .skills-list { column-count: 1; }
}
`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers,
    experience, education, skills, experienceGroups } = data;
  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const homeBio = data.homeBio || '';
  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);
  const targetRoles = data.targetRoles || [];

  // Build nav anchor links
  const sections = ['hero'];
  if (summaryText || homeBio || exitStory) sections.push('about');
  if (experience.length > 0) sections.push('experience');
  if (skills.length > 0 || superpowers.length > 0) sections.push('skills');
  sections.push('contact');

  const navLabels = { hero: 'Home', about: 'About', experience: 'Experience', skills: 'Skills', contact: 'Contact' };

  const navHtml = `<nav>
<a href="#hero" class="site-name site-name-hidden">${esc(fullName)}</a>
<div class="nav-links">${sections.filter(s => s !== 'hero').map(s => `<a href="#${s}">${navLabels[s]}</a>`).join(' ')}</div>
</nav>`;

  // META line
  const metaParts = [];
  if (location) metaParts.push(esc(location));
  if (linkedin) metaParts.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) metaParts.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) metaParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  const metaLine = metaParts.length > 0 ? `<div class="meta">${metaParts.join(' &middot; ')}</div>` : '';

  // Band index for alternating colors
  let bandIdx = 0;
  function bandClass() {
    return (bandIdx++ % 2 === 0) ? 'band-white' : 'band-gray';
  }

  const bands = [];

  // HERO band
  bands.push(`<section id="hero" class="band ${bandClass()}">
<div class="band-inner">
<div class="hero">
<h1>${esc(fullName)}</h1>
${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}
${metaLine}
</div>
</div>
</section>`);

  // ABOUT band
  if (summaryText || homeBio || exitStory) {
    let aboutContent;
    if (homeBio) {
      aboutContent = `<article class="home-bio">${homeBio}</article>`;
    } else {
      const parts = [];
      if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
      if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
      if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
      aboutContent = `<article class="home-bio">${parts.join('\n')}</article>`;
    }
    bands.push(`<section id="about" class="band ${bandClass()}">
<div class="band-inner">
<h2>About</h2>
${aboutContent}
</div>
</section>`);
  }

  // EXPERIENCE band
  if (experience.length > 0) {
    const groups = experienceGroups;
    const expHtml = groups.map(g => {
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
      const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
      return `<div class="entry"><div class="entry-header"><span class="entry-title">${esc(g.company)}</span><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
    }).join('\n');

    const eduHtml = education.length > 0
      ? `<h2 style="margin-top: 48px;">Education</h2>${education.map(e => `<p class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}`
      : '';

    bands.push(`<section id="experience" class="band ${bandClass()}">
<div class="band-inner">
<h2>Experience</h2>
${expHtml}
${eduHtml}
</div>
</section>`);
  }

  // SKILLS band
  if (skills.length > 0 || superpowers.length > 0) {
    const skillParts = [];
    if (superpowers.length > 0) {
      skillParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
    }
    if (skills.length > 0) {
      skillParts.push(`<h2 ${superpowers.length > 0 ? 'style="margin-top: 40px;"' : ''}>Skills</h2><div class="skills-list">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
    }
    bands.push(`<section id="skills" class="band ${bandClass()}">
<div class="band-inner">
${skillParts.join('\n')}
</div>
</section>`);
  }

  // CONTACT band
  const contactParts = [];
  if (linkedin) contactParts.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) contactParts.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) contactParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';

  bands.push(`<section id="contact" class="band ${bandClass()}">
<div class="band-inner">
<h2>Contact</h2>
${targetDesc ? `<p class="contact-target">Looking for: <strong>${esc(targetDesc)}</strong></p>` : ''}
${contactParts.length > 0 ? `<p class="contact-line">${contactParts.join(' &middot; ')}</p>` : ''}
</div>
</section>`);

  // Assemble page
  const body = bands.join('\n');
  const footerHtml = `<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>`;

  const content = `${navHtml}
${body}
${footerHtml}`;

  return { 'index.html': content };
}
