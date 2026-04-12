/**
 * templates/deck.mjs — Card Grid (Monochrome Neo-Brutalist)
 *
 * Single-page card grid layout. Information organized in discrete bordered cards
 * on a CSS grid. Apaleja-inspired neo-brutalist aesthetic — warm paper bg,
 * thick borders, offset box shadows — but strictly monochrome.
 * Playfair Display for display, Space Mono for labels.
 * The card grid IS the personality.
 */

export const name = 'deck';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&family=Space+Mono:wght@400;700&family=Inter:wght@400;500;600;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; color: #111; background: #f7f7f2; line-height: 1.6; margin: 0; padding: 0; font-size: 15px; }
.wrap { max-width: 760px; margin: 0 auto; padding: 32px 28px 40px; }
a { color: #111; text-decoration: underline; text-underline-offset: 3px; text-decoration-thickness: 2px; }
a:hover { color: #444; }

/* HERO — full width card */
.hero { background: #fff; border: 3px solid #111; box-shadow: 4px 4px 0 0 #111; padding: 40px 36px 36px; margin-bottom: 24px; }
.hero .eyebrow { font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #666; margin-bottom: 12px; font-weight: 700; }
.hero h1 { font-family: 'Playfair Display', Georgia, serif; font-size: 52px; font-weight: 900; line-height: 1.08; color: #111; margin-bottom: 16px; }
.hero h1 em { font-style: italic; font-weight: 900; }
.hero .headline { font-size: 17px; color: #333; border-left: 4px solid #111; padding-left: 16px; line-height: 1.5; }

/* CARD GRID */
.card-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.card-grid .span-2 { grid-column: 1 / -1; }

/* CARD */
.card { background: #fff; border: 2px solid #111; box-shadow: 4px 4px 0 0 #111; padding: 28px 24px; display: flex; flex-direction: column; }
.card .eyebrow { font-family: 'Space Mono', monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 3px; color: #666; margin-bottom: 14px; font-weight: 700; }
.card .eyebrow-sub { font-family: 'Space Mono', monospace; font-size: 10px; color: #999; letter-spacing: 0.5px; margin-top: -10px; margin-bottom: 14px; }
.card h2 { font-family: 'Playfair Display', Georgia, serif; font-size: 22px; font-weight: 700; font-style: italic; color: #111; margin-bottom: 16px; line-height: 1.2; }

/* BIO CARD */
.card-bio p { font-size: 15px; color: #333; line-height: 1.75; margin-bottom: 10px; }
.card-bio p:last-child { margin-bottom: 0; }
.card-bio a { color: #111; }

/* EXPERIENCE CARD */
.exp-role { padding: 12px 0; border-bottom: 1px solid #e0e0e0; }
.exp-role:last-child { border-bottom: none; padding-bottom: 0; }
.exp-role:first-child { padding-top: 0; }
.exp-role-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-role-title { font-weight: 700; font-size: 14px; color: #111; }
.exp-role-date { font-family: 'Space Mono', monospace; font-size: 11px; color: #777; white-space: nowrap; letter-spacing: 0.5px; }
.exp-role ul { margin: 6px 0 0 0; padding-left: 16px; font-size: 13px; color: #444; list-style: square; }
.exp-role li { margin-bottom: 4px; line-height: 1.55; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-family: 'Space Mono', monospace; font-size: 11px; color: #777; list-style: none; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* SKILLS CARD */
.skills-list { display: flex; flex-wrap: wrap; gap: 8px; }
.skills-list span { font-family: 'Space Mono', monospace; font-size: 12px; color: #111; background: #f7f7f2; border: 2px solid #111; padding: 4px 12px; }

/* CONTACT CARD */
.contact-links { display: flex; flex-direction: column; gap: 10px; }
.contact-links a { font-size: 14px; font-weight: 600; display: block; }
.contact-label { font-family: 'Space Mono', monospace; font-size: 10px; text-transform: uppercase; letter-spacing: 2px; color: #999; margin-bottom: 2px; }

/* EDUCATION CARD */
.edu-entry { font-size: 14px; color: #333; padding: 6px 0; line-height: 1.5; }

/* FOOTER */
footer { margin-top: 32px; padding-top: 14px; border-top: 2px solid #111; font-family: 'Space Mono', monospace; font-size: 12px; color: #111; font-weight: 700; letter-spacing: 0.5px; }
footer a { color: #111; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; font-weight: 700; }
footer a:hover { color: #555; }

/* PRINT */
@media print { footer { display: none; } .wrap { padding: 1rem; max-width: none; } body { background: #fff; } .hero, .card { box-shadow: none; border-width: 1px; } }

/* RESPONSIVE 660px */
@media (max-width: 660px) {
  .wrap { max-width: 100%; padding: 20px 18px 32px; }
  .card-grid { grid-template-columns: 1fr; }
  .card-grid .span-2 { grid-column: auto; }
  .hero { padding: 28px 22px 24px; }
  .hero h1 { font-size: 38px; }
  .hero .headline { font-size: 15px; }
  .card { padding: 22px 18px; }
  .card h2 { font-size: 19px; }
  .skills-list span { font-size: 11px; padding: 3px 8px; }
  .card-bio p { font-size: 14px; }
  .exp-role-header { flex-direction: column; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}

/* RESPONSIVE 480px */
@media (max-width: 480px) {
  .wrap { padding: 14px 12px 24px; }
  .hero h1 { font-size: 30px; }
  .hero .headline { font-size: 14px; padding-left: 12px; border-left-width: 3px; }
  .hero { padding: 22px 16px 20px; }
  .card { padding: 18px 14px; }
  .card h2 { font-size: 17px; }
  .card .eyebrow { font-size: 10px; letter-spacing: 2px; }
  .exp-role-title { font-size: 13px; }
  .exp-role ul { font-size: 12px; }
  .skills-list span { font-size: 10px; padding: 2px 6px; }
  footer { font-size: 11px; }
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

  // HERO
  const firstName = fullName.split(' ')[0] || fullName;
  const lastName = fullName.split(' ').slice(1).join(' ') || '';
  const heroHtml = `<div class="hero">
  <div class="eyebrow">${esc(location)}</div>
  <h1>${esc(firstName)}${lastName ? ` <em>${esc(lastName)}</em>` : ''}</h1>
  ${headline ? `<div class="headline">${esc(headline)}</div>` : ''}
</div>`;

  // BIO CARD (spans 2 cols)
  let bioContent;
  if (homeBio) {
    bioContent = homeBio;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    bioContent = parts.join('\n');
  }
  const bioCard = `<div class="card card-bio span-2">
  <div class="eyebrow">About</div>
  ${bioContent}
</div>`;

  // Helper: truncate bullets with details/summary
  function renderBullets(bullets) {
    if (bullets.length === 0) return '';
    if (bullets.length <= 2) return `<ul>${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
    const visible = bullets.slice(0, 2);
    const hidden = bullets.slice(2);
    return `<ul>${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul>${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
  }

  // EXPERIENCE CARDS — one card per company group
  // Cards with 3+ roles OR 4+ total bullets span both columns
  const expCards = experienceGroups.map((g, idx) => {
    const totalBullets = g.roles.reduce((sum, r) => sum + r.bullets.length, 0);
    const isLarge = g.roles.length >= 3 || totalBullets >= 4;
    const spanClass = isLarge ? ' span-2' : '';

    // Compute overall date span for multi-role companies
    let dateSpan = '';
    if (g.roles.length > 1) {
      const firstDate = g.roles[0].dateRange || '';
      const lastDate = g.roles[g.roles.length - 1].dateRange || '';
      const startYear = lastDate.match(/\d{4}/)?.[0] || '';
      const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
      dateSpan = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    }

    const rolesHtml = g.roles.map(r => {
      return `<div class="exp-role">
  <div class="exp-role-header">
    <span class="exp-role-title">${esc(r.role)}</span>
    ${r.dateRange ? `<span class="exp-role-date">${esc(r.dateRange)}</span>` : ''}
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
  ${education.map(e => `<div class="edu-entry">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</div>`).join('')}
</div>` : '';

  // CONTACT CARD
  const contactEntries = [];
  if (email) contactEntries.push(`<div><div class="contact-label">Email</div><a href="mailto:${esc(email)}">${esc(email)}</a></div>`);
  if (linkedin) contactEntries.push(`<div><div class="contact-label">LinkedIn</div><a href="${esc(linkedinUrl)}">linkedin.com/in/${esc(linkedin.replace(/.*linkedin\.com\/in\//,''))}</a></div>`);
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

  const title = fullName;
  const summaryShort = data.summaryShort || '';
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  const cssText = css();

  const html = `<!DOCTYPE html>
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
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>
</body>
</html>`;

  return { 'index.html': html };
}
