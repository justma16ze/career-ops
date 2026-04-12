/**
 * templates/letter.mjs — Centered single-page CV / letter aesthetic
 *
 * Hot pink accent palette (#d23669) presented
 * as a single vertical scroll — no navigation, no page switching.
 * Like a well-typeset letter or CV. System sans body, generous whitespace,
 * everything centered on the page within a ~600px column.
 */

export const name = 'letter';

export const fonts = [];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 17px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #222; background: #fff; line-height: 1.7; margin: 0; padding: 0; }
.wrap { max-width: 600px; margin: 0 auto; padding: 64px 24px 48px; }

/* NAME */
.letter-name { font-size: 2.4rem; font-weight: 700; text-align: center; letter-spacing: -0.03em; line-height: 1.2; margin-bottom: 12px; color: #111; }

/* HEADLINE */
.letter-headline { font-size: 1.05rem; font-weight: 500; text-align: center; color: #d23669; margin-bottom: 8px; line-height: 1.5; }

/* LOCATION */
.letter-location { font-size: 0.85rem; color: #999; text-align: center; margin-bottom: 36px; }

/* BIO */
.letter-bio { text-align: center; font-size: 0.95rem; color: #444; line-height: 1.75; margin-bottom: 40px; }
.letter-bio p { margin-bottom: 14px; }
.letter-bio p:last-child { margin-bottom: 0; }
.letter-bio a { color: #d23669; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(210, 54, 105, 0.3); }
.letter-bio a:hover { text-decoration-color: #d23669; }

/* SEPARATOR */
.letter-sep { border: none; border-top: 1px solid #eee; margin: 44px auto; max-width: 80px; }

/* SECTION HEADINGS */
.letter-section-title { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #d23669; text-align: center; margin-bottom: 24px; }

/* EXPERIENCE */
.letter-exp { margin-bottom: 40px; }
.letter-exp-group { margin-bottom: 32px; }
.letter-exp-group:last-child { margin-bottom: 0; }
.letter-exp-company { font-size: 1.1rem; font-weight: 700; color: #111; margin-bottom: 4px; letter-spacing: -0.01em; }
.letter-exp-role-row { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; flex-wrap: wrap; margin-bottom: 4px; }
.letter-exp-role { font-size: 0.9rem; font-weight: 600; color: #444; }
.letter-exp-date { font-size: 0.8rem; color: #aaa; white-space: nowrap; }
.letter-exp-bullets { margin: 6px 0 0 18px; padding: 0; list-style: disc; }
.letter-exp-bullets li { font-size: 0.85rem; color: #555; line-height: 1.65; margin-bottom: 4px; }
.letter-exp-sub { margin-top: 16px; padding-top: 14px; border-top: 1px solid #f5f5f5; }
.letter-exp-sub:first-child { margin-top: 6px; padding-top: 0; border-top: none; }

/* SKILLS */
.letter-skills { text-align: center; font-size: 0.9rem; color: #555; line-height: 1.8; margin-bottom: 40px; }

/* EDUCATION */
.letter-edu { text-align: center; font-size: 0.9rem; color: #444; line-height: 1.7; margin-bottom: 40px; }
.letter-edu p { margin-bottom: 8px; }
.letter-edu p:last-child { margin-bottom: 0; }

/* CONTACT */
.letter-contact { text-align: center; font-size: 0.9rem; margin-bottom: 0; line-height: 2; }
.letter-contact a { color: #d23669; text-decoration: none; margin: 0 12px; }
.letter-contact a:hover { text-decoration: underline; text-underline-offset: 3px; }

/* FOOTER */
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #f0f0f0; font-size: 0.75rem; color: #ccc; text-align: center; }
footer a { color: #d23669; font-weight: 600; text-decoration: none; }
footer a:hover { text-decoration: underline; }

/* PRINT */
@media print { footer { display: none; } .wrap { padding: 1rem; max-width: none; } }

/* RESPONSIVE 660 */
@media (max-width: 660px) {
  html { font-size: 16px; }
  .wrap { max-width: 100%; padding: 48px 20px 36px; }
  .letter-name { font-size: 2rem; }
  .letter-headline { font-size: 0.95rem; }
  .letter-exp-role-row { flex-direction: column; gap: 0; }
  .letter-exp-date { margin-bottom: 2px; }
}

/* RESPONSIVE 480 */
@media (max-width: 480px) {
  .wrap { padding: 36px 16px 28px; }
  .letter-name { font-size: 1.7rem; }
  .letter-headline { font-size: 0.9rem; margin-bottom: 24px; }
  .letter-bio { font-size: 0.88rem; }
  .letter-section-title { font-size: 0.75rem; }
  .letter-exp-company { font-size: 0.92rem; }
  .letter-exp-role { font-size: 0.85rem; }
  .letter-exp-bullets li { font-size: 0.82rem; }
  .letter-skills { font-size: 0.85rem; }
}`;
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
  const twitter = data.twitter || '';
  const twitterUrl = twitter && (twitter.startsWith('http') ? twitter : `https://${twitter}`);

  // --- Bio section ---
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

  // --- Experience section ---
  const groups = experienceGroups;
  const expHtml = groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<div class="letter-exp-group">
<div class="letter-exp-company">${esc(g.company)}</div>
<div class="letter-exp-role-row"><span class="letter-exp-role">${esc(r.role)}</span><span class="letter-exp-date">${esc(r.dateRange)}</span></div>
${r.bullets.length > 0 ? `<ul class="letter-exp-bullets">${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}
</div>`;
    }
    // Multi-role company
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<div class="letter-exp-group">
<div class="letter-exp-company">${esc(g.company)}${spanDate ? ` <span class="letter-exp-date">${esc(spanDate)}</span>` : ''}</div>
${g.roles.map(r => `<div class="letter-exp-sub">
<div class="letter-exp-role-row"><span class="letter-exp-role">${esc(r.role)}</span><span class="letter-exp-date">${esc(r.dateRange)}</span></div>
${r.bullets.length > 0 ? `<ul class="letter-exp-bullets">${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}
</div>`).join('')}
</div>`;
  }).join('\n');

  // --- Skills ---
  const skillsHtml = skills.length > 0 ? skills.map(s => esc(s)).join(', ') : '';

  // --- Education ---
  const eduHtml = education.length > 0
    ? education.map(e => `<p>${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')
    : '';

  // --- Contact links ---
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

  // --- Assemble single page ---
  const loc = data.location || '';
  const body = `<div class="letter-name">${esc(fullName)}</div>
${headline ? `<div class="letter-headline">${esc(headline)}</div>` : ''}
${loc ? `<div class="letter-location">${esc(loc)}</div>` : ''}
${bioHtml ? `<div class="letter-bio">${bioHtml}</div>` : ''}
${experienceGroups.length > 0 ? `<hr class="letter-sep">
<div class="letter-section-title">Experience</div>
<div class="letter-exp">${expHtml}</div>` : ''}
${skillsHtml ? `<hr class="letter-sep">
<div class="letter-section-title">Skills</div>
<div class="letter-skills">${skillsHtml}</div>` : ''}
${eduHtml ? `<hr class="letter-sep">
<div class="letter-section-title">Education</div>
<div class="letter-edu">${eduHtml}</div>` : ''}
${links.length > 0 ? `<hr class="letter-sep">
<div class="letter-section-title">Contact</div>
<div class="letter-contact">${links.join('')}</div>` : ''}`;

  const summaryShort = data.summaryShort || '';
  const html = buildPage({ title: fullName, body, summaryShort, cssText: css() });
  return { 'index.html': html };
}

function buildPage({ title, body, summaryShort, cssText }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
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
<style>${cssText}</style>
</head>
<body>
<div class="wrap">
${body}
<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>
</body>
</html>`;
}
