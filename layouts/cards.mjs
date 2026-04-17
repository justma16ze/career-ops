/**
 * layouts/cards.mjs — Card grid layout
 *
 * Each section in a bordered card on a CSS grid.
 * 2-column grid on desktop, 1-column on mobile.
 * Hero card spans full width, about card spans full width.
 * Each experience group gets its own card.
 *
 * Extracted from templates/deck.mjs — structural CSS only, all visuals via var().
 */

export const name = 'cards';
export const description = 'Card grid layout with bordered cards on a 2-column CSS grid';

export function css() {
  return `
/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { overflow-y: scroll; }
body { margin: 0; padding: 0; }

/* === WRAP === */
.wrap { max-width: 760px; margin: 0 auto; padding: 32px 28px 40px; }

/* === HERO CARD === */
.hero {
  background: var(--bg-card, var(--bg));
  border: 3px solid var(--border);
  padding: 40px 36px 36px;
  margin-bottom: 24px;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: 52px; font-weight: 900;
  line-height: 1.08; color: var(--text);
  margin-bottom: 16px;
}
.hero h1 em { font-style: italic; font-weight: 900; }
.hero-headline {
  font-size: 17px; color: var(--text-muted);
  border-left: 4px solid var(--border);
  padding-left: 16px; line-height: 1.5;
}
.hero .eyebrow {
  font-family: var(--font-mono);
  font-size: 11px; text-transform: uppercase;
  letter-spacing: 3px; color: var(--text-faint);
  margin-bottom: 12px; font-weight: 700;
}

/* === CARD GRID === */
.card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
.card-grid .span-2 { grid-column: 1 / -1; }

/* === CARD === */
.card {
  background: var(--bg-card, var(--bg));
  border: 2px solid var(--border);
  padding: 28px 24px;
  display: flex; flex-direction: column;
}
.card .eyebrow {
  font-family: var(--font-mono);
  font-size: 11px; text-transform: uppercase;
  letter-spacing: 3px; color: var(--text-faint);
  margin-bottom: 14px; font-weight: 700;
}
.card .eyebrow-sub {
  font-family: var(--font-mono);
  font-size: 10px; color: var(--text-faint);
  letter-spacing: 0.5px;
  margin-top: -10px; margin-bottom: 14px;
}
.card h2 {
  font-family: var(--font-display);
  font-size: 22px; font-weight: 700; font-style: italic;
  color: var(--text);
  margin-bottom: 16px; line-height: 1.2;
}

/* === BIO CARD === */
.home-bio p {
  font-size: 15px; color: var(--text-muted);
  line-height: 1.75; margin-bottom: 10px;
}
.home-bio p:last-child { margin-bottom: 0; }
.home-bio a { color: var(--accent); }

/* === EXPERIENCE CARD === */
.entry {
  padding: 12px 0;
  border-bottom: 1px solid var(--border-light);
}
.entry:last-child { border-bottom: none; padding-bottom: 0; }
.entry:first-child { padding-top: 0; }
.entry-header {
  display: flex; justify-content: space-between;
  align-items: baseline; gap: 8px; flex-wrap: wrap;
  margin-bottom: 4px;
}
.entry-title { font-weight: 700; font-size: 14px; color: var(--text); }
.entry-date {
  font-family: var(--font-mono);
  font-size: 11px; color: var(--text-faint);
  white-space: nowrap; letter-spacing: 0.5px;
}
.entry-role { font-size: 13px; color: var(--text-muted); font-weight: 600; }
.entry-desc, .entry li { color: var(--text-muted); }
.entry ul {
  margin: 6px 0 0 0; padding-left: 16px;
  font-size: 13px; color: var(--text-muted);
  list-style: square;
}
.entry li { margin-bottom: 4px; line-height: 1.55; }

/* === DETAILS === */
details { margin-top: 6px; }
details summary {
  cursor: pointer; font-family: var(--font-mono);
  font-size: 11px; color: var(--text-faint);
  list-style: none; font-weight: 700;
  text-transform: uppercase; letter-spacing: 1px;
}
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* === SKILLS CARD === */
.skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
.skills-list span {
  font-family: var(--font-mono);
  font-size: 12px; color: var(--text);
  background: var(--bg-alt, var(--bg));
  border: 2px solid var(--border);
  padding: 4px 12px;
}

/* === CONTACT CARD === */
.contact-links { display: flex; flex-direction: column; gap: 10px; }
.contact-links a { font-size: 14px; font-weight: 600; display: block; color: var(--accent); }
.contact-label {
  font-family: var(--font-mono);
  font-size: 10px; text-transform: uppercase;
  letter-spacing: 2px; color: var(--text-faint);
  margin-bottom: 2px;
}

/* === EDUCATION CARD === */
.edu { font-size: 14px; color: var(--text-muted); padding: 6px 0; line-height: 1.5; }

/* === FOOTER === */
footer {
  margin-top: 32px; padding-top: 14px;
  border-top: 2px solid var(--footer-border, var(--border));
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--footer-text);
  font-weight: 700; letter-spacing: 0.5px;
}
footer a {
  color: var(--footer-link);
  font-weight: 700;
}
footer a:hover { color: var(--footer-link-hover, var(--accent)); }

/* === PRINT === */
@media print {
  footer { display: none; }
  .wrap { padding: 1rem; max-width: none; }
  .hero, .card { border-width: 1px; }
}

/* === RESPONSIVE 660px === */
@media (max-width: 660px) {
  .wrap { max-width: 100%; padding: 20px 18px 32px; }
  .card-grid { grid-template-columns: 1fr; }
  .card-grid .span-2 { grid-column: auto; }
  .hero { padding: 28px 22px 24px; }
  .hero h1 { font-size: 38px; }
  .hero-headline { font-size: 15px; }
  .card { padding: 22px 18px; }
  .card h2 { font-size: 19px; }
  .skills-list span { font-size: 12px; padding: 3px 8px; }
  .home-bio p { font-size: 14px; }
  .entry-header { flex-direction: column; }
}

/* === RESPONSIVE 480px === */
@media (max-width: 480px) {
  .wrap { padding: 14px 12px 24px; }
  .hero h1 { font-size: 30px; }
  .hero-headline { font-size: 14px; padding-left: 12px; border-left-width: 3px; }
  .hero { padding: 22px 16px 20px; }
  .card { padding: 18px 14px; }
  .card h2 { font-size: 17px; }
  .card .eyebrow { font-size: 12px; letter-spacing: 2px; }
  .entry-title { font-size: 13px; }
  .entry ul { font-size: 12px; }
  .skills-list span { font-size: 12px; padding: 2px 6px; }
  footer { font-size: 12px; }
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

  // HERO
  const firstName = fullName.split(' ')[0] || fullName;
  const lastName = fullName.split(' ').slice(1).join(' ') || '';
  const heroHtml = `<div class="hero">
  <div class="eyebrow">${esc(location)}</div>
  <h1>${esc(firstName)}${lastName ? ` <em>${esc(lastName)}</em>` : ''}</h1>
  ${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}
</div>`;

  // BIO CARD (spans 2 cols)
  // Omit the card entirely when there is no bio content to show.
  let bioContent = '';
  if (homeBio) {
    bioContent = homeBio;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    bioContent = parts.join('\n');
  }
  const bioCard = bioContent ? `<div class="card home-bio span-2">
  <div class="eyebrow">About</div>
  ${bioContent}
</div>` : '';

  // Helper: truncate bullets with details/summary
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  // EXPERIENCE CARDS -- one card per company group
  const expCards = experienceGroups.map(g => {
    const totalBullets = g.roles.reduce((sum, r) => sum + r.bullets.length, 0);
    const isLarge = g.roles.length >= 3 || totalBullets >= 4;
    const spanClass = isLarge ? ' span-2' : '';

    // Overall date span for multi-role companies
    let dateSpan = '';
    if (g.roles.length > 1) {
      const firstDate = g.roles[0].dateRange || '';
      const lastDate = g.roles[g.roles.length - 1].dateRange || '';
      const startYear = lastDate.match(/\d{4}/)?.[0] || '';
      const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
      dateSpan = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    }

    const rolesHtml = g.roles.map(r => {
      return `<div class="entry">
  <div class="entry-header">
    <span class="entry-title">${esc(r.role)}</span>
    ${r.dateRange ? `<span class="entry-date">${esc(r.dateRange)}</span>` : ''}
  </div>
  ${renderBullets(r.bullets)}
</div>`;
    }).join('\n');

    return `<div class="card${spanClass}">
  <div class="eyebrow">${esc(g.company)}</div>
  ${dateSpan ? `<div class="eyebrow-sub">${esc(dateSpan)}</div>` : ''}
  ${rolesHtml}
</div>`;
  }).join('\n');

  // SKILLS CARD
  const skillsCard = skills.length > 0 ? `<div class="card">
  <div class="eyebrow">Skills</div>
  <div class="skills-list">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>
</div>` : '';

  // EDUCATION CARD
  const eduCard = education.length > 0 ? `<div class="card">
  <div class="eyebrow">Education</div>
  ${education.map(e => `<div class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</div>`).join('')}
</div>` : '';

  // CONTACT CARD
  const contactEntries = [];
  if (email) contactEntries.push(`<div><div class="contact-label">Email</div><a href="mailto:${esc(email)}">${esc(email)}</a></div>`);
  if (linkedin) contactEntries.push(`<div><div class="contact-label">LinkedIn</div><a href="${esc(linkedinUrl)}">LinkedIn</a></div>`);
  if (github) contactEntries.push(`<div><div class="contact-label">GitHub</div><a href="${esc(githubUrl)}">${esc(github)}</a></div>`);
  const contactCard = contactEntries.length > 0 ? `<div class="card">
  <div class="eyebrow">Contact</div>
  <div class="contact-links">${contactEntries.join('\n')}</div>
</div>` : '';

  // ASSEMBLE
  const body = `<main>
${heroHtml}
<div class="card-grid">
${bioCard}
${expCards}
${skillsCard}
${eduCard}
${contactCard}
</div>
</main>`;

  const content = `<div class="wrap">
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>`;

  return { 'index.html': content };
}
