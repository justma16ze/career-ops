/**
 * layouts/spread.mjs — Two-column magazine spread
 *
 * Bio/about in the LEFT column, experience in the RIGHT column.
 * Both columns scroll independently. Full-width nav above, full-width footer below.
 * On mobile (<660px) stacks to single column.
 *
 * Extracted from templates/spread.mjs — structural CSS only, all visuals via var().
 */

export const name = 'spread';
export const description = 'Two-column magazine spread with independently scrolling columns';

export function css() {
  return `
/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body { margin: 0; padding: 0; height: 100vh; overflow: hidden; }

/* === OUTER SHELL === */
.spread-shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

/* === NAV === */
.nav-band { flex-shrink: 0; border-bottom: 1px solid var(--border); background: var(--bg-nav, var(--bg)); }
nav {
  display: flex; gap: 20px; align-items: baseline;
  flex-wrap: wrap; padding: 20px 40px 16px;
  font-size: 14px; font-family: var(--font-mono);
  letter-spacing: 0.01em;
  max-width: 1000px; width: 100%; margin: 0 auto;
  background: transparent; border: none; box-shadow: none;
}
nav .site-name {
  font-family: var(--font-display);
  font-size: 22px; color: var(--text);
  text-decoration: none; font-weight: 400;
  margin-right: auto; letter-spacing: 0;
}
.nav-links { display: flex; gap: 20px; }
nav a { color: var(--text-faint); text-decoration: none; }
nav a:hover { color: var(--text); }

/* Hide nav name on desktop — h1 in left column is the main name display */
.site-name-hidden { visibility: hidden; }

/* === TWO-COLUMN SPREAD === */
.spread-container {
  flex: 1; display: flex;
  max-width: 1000px; width: 100%;
  margin: 0 auto; min-height: 0;
}
.col-left {
  width: 45%; overflow-y: auto;
  padding: 36px 32px 48px 40px;
  border-right: 1px solid var(--border);
  background: var(--bg-sidebar, var(--bg));
}
.col-right {
  width: 55%; overflow-y: auto;
  padding: 36px 40px 48px 32px;
}

/* Scrollbar styling */
.col-left::-webkit-scrollbar, .col-right::-webkit-scrollbar { width: 4px; }
.col-left::-webkit-scrollbar-track, .col-right::-webkit-scrollbar-track { background: transparent; }
.col-left::-webkit-scrollbar-thumb, .col-right::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

/* === HEADINGS === */
h1 {
  font-family: var(--font-display);
  font-size: 38px; font-weight: 400;
  line-height: 1.12; margin-bottom: 4px;
  letter-spacing: -0.01em;
  color: var(--text);
}
h2 {
  font-family: var(--font-display);
  font-size: 20px; font-weight: 400;
  margin: 32px 0 14px; padding-top: 22px;
  border-top: 1px solid var(--border);
  line-height: 1.3; color: var(--text);
}
h2:first-child, h2.section-lead { margin-top: 0; padding-top: 0; border-top: none; }

/* === LEFT COLUMN CONTENT === */
.hero-headline {
  font-family: var(--font-display);
  font-size: 18px; font-weight: 400; font-style: italic;
  color: var(--text-faint); margin: 0 0 16px;
  line-height: 1.55;
}
.meta-line {
  font-family: var(--font-mono);
  font-size: 12px; color: var(--text-faint); line-height: 1.9;
}
.links { margin-top: 14px; font-size: 14px; }
.links a { margin-right: 16px; color: var(--accent); }
.home-bio { font-size: 15px; color: var(--text-muted); line-height: 1.78; margin-top: 20px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: var(--accent); }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li {
  font-size: 14px; color: var(--text-muted);
  padding: 4px 0; line-height: 1.6;
  border-bottom: 1px solid var(--border-light);
}
.strengths-list li:last-child { border-bottom: none; }
.looking-for { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
.contact-line { font-size: 14px; padding-bottom: 8px; }
.contact-line a { margin-right: 16px; color: var(--accent); }

/* === RIGHT COLUMN CONTENT === */

/* === EXPERIENCE === */
.entry {
  margin-bottom: 0; padding: 22px 0;
  border-top: 1px solid var(--border);
}
.entry:first-child { border-top: none; padding-top: 0; }
.entry-header {
  display: flex; justify-content: space-between;
  align-items: baseline; flex-wrap: wrap;
  gap: 8px; margin-bottom: 4px;
}
.entry-title { font-size: 15px; font-weight: 700; color: var(--text); }
.entry-date {
  font-family: var(--font-mono);
  font-size: 11px; color: var(--text-faint);
  white-space: nowrap;
}
.entry-role { font-size: 14px; color: var(--text-muted); margin-bottom: 4px; }
.entry-desc, .entry li { color: var(--text-muted); }
.sub-entry { margin-top: 14px; padding-top: 14px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { margin-top: 6px; padding-top: 0; border-top: none; }
.sub-entry .entry-header { margin-bottom: 4px; }
.sub-entry .entry-role { font-weight: 600; color: var(--text); font-size: 13px; }
ul { margin: 4px 0 0 18px; }
li { font-size: 13px; color: var(--text-muted); margin-bottom: 2px; line-height: 1.6; }

/* === DETAILS === */
details { margin-top: 4px; }
details summary {
  cursor: pointer; font-family: var(--font-mono);
  font-size: 11px; color: var(--text-faint); list-style: none;
}
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 4px; }

/* === EDUCATION === */
.edu { margin-bottom: 6px; font-size: 14px; color: var(--text-muted); line-height: 1.7; }

/* === SKILLS === */
.skills-list {
  font-family: var(--font-mono);
  font-size: 12px; color: var(--text-faint); line-height: 2;
}

/* === FOOTER === */
.footer-band { flex-shrink: 0; border-top: 1px solid var(--footer-border, var(--border)); }
footer {
  max-width: 1000px; width: 100%; margin: 0 auto;
  padding: 12px 40px 16px;
  font-size: 11px;
  color: var(--footer-text);
  font-family: var(--font-mono);
}
footer a { color: var(--footer-link); font-weight: 700; }
footer a:hover { color: var(--footer-link-hover, var(--accent)); }

/* === PRINT === */
@media print {
  .nav-band, .footer-band { display: none; }
  body { height: auto; overflow: visible; }
  .spread-shell { height: auto; overflow: visible; }
  .spread-container { flex-direction: column; max-width: none; }
  .col-left, .col-right { width: 100%; overflow-y: visible; border-right: none; padding: 16px; }
  .col-right { border-top: 1px solid var(--border); }
}

/* === RESPONSIVE 660px === */
@media (max-width: 660px) {
  body { height: auto; overflow: auto; }
  .spread-shell { height: auto; overflow: visible; }
  .site-name-hidden { visibility: visible; }
  nav { padding: 16px 20px 12px; font-size: 13px; gap: 12px; }
  nav .site-name { font-size: 19px; }
  .spread-container { flex-direction: column; }
  .col-left {
    width: 100%; overflow-y: visible;
    border-right: none; padding: 24px 20px 20px;
    border-bottom: 1px solid var(--border);
  }
  .col-right { width: 100%; overflow-y: visible; padding: 24px 20px 32px; }
  footer { padding: 12px 20px 16px; }
  h1 { font-size: 30px; }
  h2 { font-size: 18px; }
  .hero-headline { font-size: 16px; }
  .entry-header { flex-direction: column; gap: 2px; }
  .sub-entry .entry-header { flex-direction: column; gap: 2px; }
}

/* === RESPONSIVE 480px === */
@media (max-width: 480px) {
  nav { padding: 12px 16px 10px; font-size: 12px; gap: 8px; }
  nav .site-name { font-size: 17px; }
  .col-left { padding: 16px 16px 16px; }
  .col-right { padding: 16px 16px 24px; }
  footer { padding: 10px 16px 14px; }
  h1 { font-size: 26px; }
  h2 { font-size: 17px; margin: 20px 0 8px; padding-top: 14px; }
  .hero-headline { font-size: 15px; }
  .home-bio { font-size: 14px; }
  li { font-size: 12px; }
  .strengths-list li { font-size: 13px; }
  .skills-list { font-size: 11px; }
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
  const targetRoles = data.targetRoles || [];
  const locationFlex = data.locationFlex || '';

  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  // -- LEFT COLUMN: who I am --
  const leftParts = [];

  // Name + headline + location
  leftParts.push(`<h1>${esc(fullName)}</h1>`);
  if (headline) leftParts.push(`<p class="hero-headline">${esc(headline)}</p>`);
  if (location) leftParts.push(`<div class="meta-line">${esc(location)}</div>`);

  // Links
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) leftParts.push(`<div class="links">${links.join(' ')}</div>`);

  // Bio
  if (homeBio) {
    leftParts.push(`<article class="home-bio">${homeBio}</article>`);
  } else {
    const bioParts = [];
    if (summaryText) bioParts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) bioParts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) bioParts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    if (bioParts.length > 0) leftParts.push(`<article class="home-bio">${bioParts.join('\n')}</article>`);
  }

  // Strengths
  if (superpowers.length > 0) {
    leftParts.push(`<h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
  }

  // Looking for
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) {
    leftParts.push(`<h2>Looking For</h2><p class="looking-for">${lp.join(' ')}</p>`);
  }

  // Contact (repeat at bottom of left column for magazine feel)
  if (links.length > 0) {
    leftParts.push(`<h2>Contact</h2><p class="contact-line">${links.join(' ')}</p>`);
  }

  // -- RIGHT COLUMN: what I've done --
  const rightParts = [];

  // Experience
  if (experienceGroups && experienceGroups.length > 0) {
    rightParts.push('<h2 class="section-lead">Experience</h2>');

    function renderBullets(bullets) {
      if (!bullets || bullets.length === 0) return '';
      if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
      const visible = bullets.slice(0, 2);
      const hidden = bullets.slice(2);
      return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
    }

    const expHtml = experienceGroups.map(g => {
      if (g.roles.length === 1) {
        const r = g.roles[0];
        return `<article class="entry"><div class="entry-header"><strong class="entry-title">${esc(g.company)}</strong>${r.dateRange ? `<span class="entry-date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="entry-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</article>`;
      }
      const firstDate = g.roles[0].dateRange || '';
      const lastDate = g.roles[g.roles.length - 1].dateRange || '';
      const startYear = lastDate.match(/\d{4}/)?.[0] || '';
      const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
      const spanDate = startYear && endPart ? `${startYear}\u2013${endPart}` : firstDate;
      return `<article class="entry"><div class="entry-header"><strong class="entry-title">${esc(g.company)}</strong><span class="entry-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-entry"><div class="entry-header"><div class="entry-role">${esc(r.role)}</div>${r.dateRange ? `<span class="entry-date">${esc(r.dateRange)}</span>` : ''}</div>${renderBullets(r.bullets)}</div>`).join('')}</article>`;
    }).join('\n');

    rightParts.push(expHtml);
  }

  // Education
  if (education.length > 0) {
    rightParts.push(`<h2>Education</h2>${education.map(e => `<p class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}`);
  }

  // Skills
  if (skills.length > 0) {
    rightParts.push(`<h2>Skills</h2><p class="skills-list">${skills.map(s => esc(s)).join(', ')}</p>`);
  }

  // Build the single page (body fragment for combine-portfolio.mjs)
  const content = `<div class="spread-shell">
<div class="nav-band"><nav><a href="index.html" class="site-name site-name-hidden">${esc(fullName)}</a></nav></div>
<div class="spread-container">
<div class="col-left">
${leftParts.join('\n')}
</div>
<div class="col-right">
${rightParts.join('\n')}
</div>
</div>
<div class="footer-band"><footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer></div>
</div>`;

  return { 'index.html': content };
}
