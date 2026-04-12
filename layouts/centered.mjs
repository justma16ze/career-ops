/**
 * layouts/centered.mjs — Centered vertical scroll, no navigation
 *
 * NO navigation at all. Everything on one page, centered vertically.
 * Name at top, then headline, bio, experience, skills, contact.
 * Like a well-typeset letter or CV.
 *
 * Extracted from templates/letter.mjs — structural CSS only, all visuals via var().
 */

export const name = 'centered';
export const description = 'Centered vertical scroll with no navigation, single page letter layout';

export function css() {
  return `
/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { overflow-y: scroll; }
body { margin: 0; padding: 0; }

/* === WRAP === */
.wrap { max-width: var(--wrap-width, 600px); margin: 0 auto; padding: 64px 24px 48px; }

/* === NAME === */
h1 {
  font-family: var(--font-display);
  font-size: 2.4rem; font-weight: 700;
  text-align: center;
  letter-spacing: -0.03em; line-height: 1.2;
  color: var(--text);
  margin-bottom: 12px;
}

/* === HEADLINE === */
.hero-headline {
  font-size: 1.05rem; font-weight: 500;
  text-align: center;
  color: var(--accent);
  margin-bottom: 8px; line-height: 1.5;
}

/* === LOCATION === */
.location {
  font-family: var(--font-mono);
  font-size: 0.85rem; color: var(--text-faint);
  text-align: center; margin-bottom: 36px;
}

/* === BIO === */
.home-bio {
  text-align: center;
  font-size: 0.95rem; color: var(--text-muted);
  line-height: 1.75; margin-bottom: 40px;
}
.home-bio p { margin-bottom: 14px; }
.home-bio p:last-child { margin-bottom: 0; }
.home-bio a { color: var(--accent); }

/* === SEPARATOR === */
.section-sep {
  border: none;
  border-top: 1px solid var(--border-light);
  margin: 44px auto; max-width: 80px;
}

/* === SECTION HEADINGS === */
h2 {
  font-family: var(--font-display);
  font-size: 0.8rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.12em;
  color: var(--accent);
  text-align: center; margin-bottom: 24px;
}

/* === EXPERIENCE === */
.entry { margin-bottom: 32px; }
.entry:last-child { margin-bottom: 0; }
.entry-title {
  font-family: var(--font-body);
  font-size: 1.1rem; font-weight: 700;
  color: var(--text);
  margin-bottom: 4px; letter-spacing: -0.01em;
}
.entry-header {
  display: flex; justify-content: space-between;
  align-items: baseline; gap: 12px; flex-wrap: wrap;
  margin-bottom: 4px;
}
.entry-role { font-size: 0.9rem; font-weight: 600; color: var(--text-muted); }
.entry-date {
  font-family: var(--font-mono);
  font-size: 0.8rem; color: var(--text-faint);
  white-space: nowrap;
}
.entry ul {
  margin: 6px 0 0 18px; padding: 0; list-style: disc;
}
.entry li {
  font-size: 0.85rem; color: var(--text-muted);
  line-height: 1.65; margin-bottom: 4px;
}
.sub-entry { margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-light); }
.sub-entry:first-child { margin-top: 6px; padding-top: 0; border-top: none; }

/* === DETAILS === */
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 0.75rem; color: var(--text-faint); list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* === SKILLS === */
.skills-list {
  text-align: center; font-size: 0.9rem;
  color: var(--text-muted); line-height: 1.8;
  margin-bottom: 40px;
}

/* === EDUCATION === */
.edu {
  text-align: center; font-size: 0.9rem;
  color: var(--text-muted); line-height: 1.7;
  margin-bottom: 8px;
}
.edu:last-child { margin-bottom: 0; }

/* === CONTACT === */
.contact-line {
  text-align: center; font-size: 0.9rem;
  margin-bottom: 0; line-height: 2;
}
.contact-line a { color: var(--accent); text-decoration: none; margin: 0 12px; }
.contact-line a:hover { text-decoration: underline; }

/* === FOOTER === */
footer {
  margin-top: 48px; padding-top: 16px;
  border-top: 1px solid var(--footer-border, var(--border));
  font-size: 0.75rem;
  color: var(--footer-text);
  text-align: center;
}
footer a { color: var(--footer-link); font-weight: 700; text-decoration: none; }
footer a:hover { color: var(--footer-link-hover, var(--accent)); }

/* === PRINT === */
@media print { footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* === RESPONSIVE 660px === */
@media (max-width: 660px) {
  .wrap { max-width: 100%; padding: 48px 20px 36px; }
  h1 { font-size: 2rem; }
  .hero-headline { font-size: 0.95rem; }
  .entry-header { flex-direction: column; gap: 0; }
  .entry-date { margin-bottom: 2px; }
}

/* === RESPONSIVE 480px === */
@media (max-width: 480px) {
  .wrap { padding: 36px 16px 28px; }
  h1 { font-size: 1.7rem; }
  .hero-headline { font-size: 0.9rem; margin-bottom: 24px; }
  .home-bio { font-size: 0.88rem; }
  h2 { font-size: 0.75rem; }
  .entry-title { font-size: 0.92rem; }
  .entry-role { font-size: 0.85rem; }
  .entry li { font-size: 0.82rem; }
  .skills-list { font-size: 0.85rem; }
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

  // Bio section
  let bioHtml = '';
  if (homeBio) {
    bioHtml = homeBio;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    bioHtml = parts.join('\n');
  }

  // Experience section
  const groups = experienceGroups;
  const expHtml = groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="entry">
<div class="entry-title">${esc(g.company)}</div>
<div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>
${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}
</div>`;
    }
    // Multi-role company
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<div class="entry">
<div class="entry-title">${esc(g.company)}${spanDate ? ` <span class="entry-date">${esc(spanDate)}</span>` : ''}</div>
${g.roles.map(r => `<div class="sub-entry">
<div class="entry-header"><span class="entry-role">${esc(r.role)}</span><span class="entry-date">${esc(r.dateRange)}</span></div>
${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}
</div>`).join('')}
</div>`;
  }).join('\n');

  // Skills
  const skillsHtml = skills.length > 0 ? skills.map(s => esc(s)).join(', ') : '';

  // Education
  const eduHtml = education.length > 0
    ? education.map(e => `<p class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')
    : '';

  // Contact links
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

  // Assemble single page
  const body = `<h1>${esc(fullName)}</h1>
${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}
${location ? `<div class="location">${esc(location)}</div>` : ''}
${bioHtml ? `<div class="home-bio">${bioHtml}</div>` : ''}
${experienceGroups.length > 0 ? `<hr class="section-sep">
<h2>Experience</h2>
<div class="experience">${expHtml}</div>` : ''}
${skillsHtml ? `<hr class="section-sep">
<h2>Skills</h2>
<div class="skills-list">${skillsHtml}</div>` : ''}
${eduHtml ? `<hr class="section-sep">
<h2>Education</h2>
<div class="education">${eduHtml}</div>` : ''}
${links.length > 0 ? `<hr class="section-sep">
<h2>Contact</h2>
<div class="contact-line">${links.join('')}</div>` : ''}`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(fullName)}</title>
<meta name="description" content="${esc(data.summaryShort || '')}">
<meta property="og:title" content="${esc(fullName)}">
<meta property="og:description" content="${esc(data.summaryShort || '')}">
<meta property="og:type" content="website">
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
