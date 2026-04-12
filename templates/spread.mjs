/**
 * templates/spread.mjs — Magazine Spread aesthetic
 *
 * Two-column content layout like a magazine spread.
 * LEFT column (~45%): bio text, strengths, "looking for", contact.
 * RIGHT column (~55%): experience timeline, education, skills.
 * Both columns scroll independently. Top nav spans full width.
 *
 * Uses the "ink" aesthetic: parchment bg, ink text, warm red accent.
 * Fonts: Instrument Serif (display), Source Sans 3 (body), IBM Plex Mono (metadata).
 */

export const name = 'spread';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Source+Sans+3:wght@300;400;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 17px; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
body { font-family: 'Source Sans 3', 'Source Sans Pro', sans-serif; color: #1a1a1a; background: #faf6f0; line-height: 1.72; margin: 0; padding: 0; height: 100vh; overflow: hidden; }
a { color: #c1553d; text-decoration: underline; text-decoration-color: rgba(193,85,61,0.3); text-underline-offset: 3px; transition: text-decoration-color 0.15s; }
a:hover { text-decoration-color: #c1553d; }

/* ---- OUTER SHELL ---- */
.spread-shell { display: flex; flex-direction: column; height: 100vh; overflow: hidden; }

/* ---- NAV ---- */
.nav-band { flex-shrink: 0; border-bottom: 1px solid #d8d0c4; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding: 20px 40px 16px; font-size: 14px; font-family: 'IBM Plex Mono', monospace; letter-spacing: 0.01em; max-width: 1000px; width: 100%; margin: 0 auto; }
nav .site-name { font-family: 'Instrument Serif', serif; font-size: 22px; color: #1a1a1a; text-decoration: none; font-weight: 400; margin-right: auto; letter-spacing: 0; }
nav a { color: #999; text-decoration: none; }
nav a:hover { color: #1a1a1a; }

/* ---- TWO-COLUMN SPREAD ---- */
.spread-container { flex: 1; display: flex; max-width: 1000px; width: 100%; margin: 0 auto; min-height: 0; }
.col-left { width: 45%; overflow-y: auto; padding: 36px 32px 48px 40px; border-right: 1px solid #d8d0c4; }
.col-right { width: 55%; overflow-y: auto; padding: 36px 40px 48px 32px; }

/* Scrollbar styling */
.col-left::-webkit-scrollbar, .col-right::-webkit-scrollbar { width: 4px; }
.col-left::-webkit-scrollbar-track, .col-right::-webkit-scrollbar-track { background: transparent; }
.col-left::-webkit-scrollbar-thumb, .col-right::-webkit-scrollbar-thumb { background: #d8d0c4; border-radius: 2px; }

/* ---- HEADINGS ---- */
h1 { font-family: 'Instrument Serif', serif; font-size: 38px; font-weight: 400; line-height: 1.12; margin-bottom: 4px; letter-spacing: -0.01em; }
h2 { font-family: 'Instrument Serif', serif; font-size: 20px; font-weight: 400; margin: 32px 0 14px; padding-top: 22px; border-top: 1px solid #d8d0c4; line-height: 1.3; }
h2:first-child, h2.section-lead { margin-top: 0; padding-top: 0; border-top: none; }
h3 { font-family: 'Source Sans 3', sans-serif; font-size: 15px; font-weight: 600; margin-bottom: 2px; line-height: 1.4; }
h3 a { color: #1a1a1a; text-decoration: underline; text-decoration-color: #d8d0c4; text-underline-offset: 3px; }
h3 a:hover { text-decoration-color: #1a1a1a; }

/* ---- NAME ACCENT ---- */
.name-accent { display: block; width: 40px; height: 2px; background: #c1553d; margin: 10px 0 14px; }

/* ---- LEFT COLUMN CONTENT ---- */
.headline { font-family: 'Instrument Serif', serif; font-size: 18px; font-weight: 400; font-style: italic; color: #666; margin: 0 0 16px; line-height: 1.55; }
.meta-line { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #999; line-height: 1.9; }
.links { margin-top: 14px; font-size: 14px; }
.links a { margin-right: 16px; }
.home-bio { font-size: 15px; color: #333; line-height: 1.78; margin-top: 20px; }
.home-bio p { margin-bottom: 12px; }
.home-bio p:first-child::first-letter { font-family: 'Instrument Serif', serif; font-size: 2.8em; float: left; line-height: 0.82; margin-right: 4px; margin-top: 4px; color: #c1553d; font-weight: 400; }
.home-bio a { color: #c1553d; }
.summary-text { font-size: 15px; color: #333; line-height: 1.78; margin-bottom: 14px; }
.summary-text:first-child::first-letter { font-family: 'Instrument Serif', serif; font-size: 2.8em; float: left; line-height: 0.82; margin-right: 4px; margin-top: 4px; color: #c1553d; font-weight: 400; }
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 14px; color: #444; padding: 4px 0; line-height: 1.6; border-bottom: 1px solid #efe8dc; }
.strengths-list li:last-child { border-bottom: none; }
.looking-for { font-size: 14px; color: #555; line-height: 1.7; }
.contact-line { font-size: 14px; padding-bottom: 8px; }
.contact-line a { margin-right: 16px; }

/* ---- RIGHT COLUMN CONTENT ---- */
p { margin-bottom: 10px; font-size: 15px; }
p:last-child { margin-bottom: 0; }

/* ---- EXPERIENCE ---- */
.job { margin-bottom: 0; padding: 22px 0; border-top: 1px solid #d8d0c4; }
.job:first-child { border-top: none; padding-top: 0; border-left: 3px solid #c1553d; padding-left: 16px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.job-header strong { font-size: 15px; }
.date { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #999; white-space: nowrap; }
.role { font-size: 14px; color: #555; margin-bottom: 4px; }
.sub-role { margin-top: 14px; padding-top: 14px; border-top: 1px solid #f0e8dc; }
.sub-role:first-child { margin-top: 6px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; margin-bottom: 4px; }
.sub-role .role { font-weight: 600; color: #1a1a1a; font-size: 13px; }
ul { margin: 4px 0 0 18px; }
li { font-size: 13px; color: #444; margin-bottom: 2px; line-height: 1.6; }
details { margin-top: 4px; }
details summary { cursor: pointer; font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: #999; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 4px; }

/* ---- EDUCATION ---- */
.edu { margin-bottom: 6px; font-size: 14px; color: #555; line-height: 1.7; }

/* ---- SKILLS ---- */
.skills-list { font-family: 'IBM Plex Mono', monospace; font-size: 12px; color: #666; line-height: 2; }

/* ---- FOOTER ---- */
.footer-band { flex-shrink: 0; border-top: 1px solid #d8d0c4; }
footer { max-width: 1000px; width: 100%; margin: 0 auto; padding: 12px 40px 16px; font-size: 11px; color: #bbb; font-family: 'IBM Plex Mono', monospace; }
footer a { color: #bbb; text-decoration: underline; text-decoration-color: rgba(0,0,0,0.12); text-underline-offset: 2px; font-weight: 400; }

/* ---- PRINT ---- */
@media print {
  .nav-band, .footer-band { display: none; }
  body { height: auto; overflow: visible; background: #fff; }
  .spread-shell { height: auto; overflow: visible; }
  .spread-container { flex-direction: column; max-width: none; }
  .col-left, .col-right { width: 100%; overflow-y: visible; border-right: none; padding: 16px; }
  .col-right { border-top: 1px solid #d8d0c4; }
}

/* ---- RESPONSIVE 660px ---- */
@media (max-width: 660px) {
  body { height: auto; overflow: auto; }
  .spread-shell { height: auto; overflow: visible; }
  nav { padding: 16px 20px 12px; font-size: 13px; gap: 12px; }
  nav .site-name { font-size: 19px; }
  .spread-container { flex-direction: column; }
  .col-left { width: 100%; overflow-y: visible; border-right: none; padding: 24px 20px 20px; border-bottom: 1px solid #d8d0c4; }
  .col-right { width: 100%; overflow-y: visible; padding: 24px 20px 32px; }
  footer { padding: 12px 20px 16px; }
  h1 { font-size: 30px; }
  h2 { font-size: 18px; }
  .headline { font-size: 16px; }
  .job-header { flex-direction: column; gap: 2px; }
  .sub-role-header { flex-direction: column; gap: 2px; }
  .home-bio p:first-child::first-letter, .summary-text:first-child::first-letter { font-size: 2.4em; }
}

/* ---- RESPONSIVE 480px ---- */
@media (max-width: 480px) {
  nav { padding: 12px 16px 10px; font-size: 12px; gap: 8px; }
  nav .site-name { font-size: 17px; }
  .col-left { padding: 16px 16px 16px; }
  .col-right { padding: 16px 16px 24px; }
  footer { padding: 10px 16px 14px; }
  h1 { font-size: 26px; }
  h2 { font-size: 17px; margin: 20px 0 8px; padding-top: 14px; }
  .headline { font-size: 15px; }
  .home-bio { font-size: 14px; }
  .summary-text { font-size: 14px; }
  li { font-size: 12px; }
  .strengths-list li { font-size: 13px; }
  .skills-list { font-size: 11px; }
}`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers, proofPoints,
    projects, experience, education, skills, experienceGroups } = data;

  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const homeBio = data.homeBio || '';
  const targetRoles = data.targetRoles || [];
  const locationFlex = data.locationFlex || '';

  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  // -- LEFT COLUMN: who I am --
  const leftParts = [];

  // Name + accent line + headline + location
  leftParts.push(`<h1>${esc(fullName)}</h1>`);
  leftParts.push('<span class="name-accent"></span>');
  if (headline) leftParts.push(`<p class="headline">${esc(headline)}</p>`);
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
    if (summaryText) bioParts.push(`<p class="summary-text">${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) bioParts.push(`<p class="summary-text">${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) bioParts.push(`<p class="summary-text">${renderInlineMarkdown(currentProject)}</p>`);
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
        return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</article>`;
      }
      const firstDate = g.roles[0].dateRange || '';
      const lastDate = g.roles[g.roles.length - 1].dateRange || '';
      const startYear = lastDate.match(/\d{4}/)?.[0] || '';
      const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
      const spanDate = startYear && endPart ? `${startYear}\u2013${endPart}` : firstDate;
      return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong><span class="date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><div class="role">${esc(r.role)}</div>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${renderBullets(r.bullets)}</div>`).join('')}</article>`;
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

  // Build the single page
  const html = buildPage({
    title: fullName,
    leftHtml: leftParts.join('\n'),
    rightHtml: rightParts.join('\n'),
    summaryShort: data.summaryShort,
    fonts,
    cssText: css(),
  });

  return { 'index.html': html };
}

function buildPage({ title, leftHtml, rightHtml, summaryShort, fonts, cssText }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fontLinks = fonts.map(f => `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${f}" rel="stylesheet">`).join('\n');
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
<div class="spread-shell">
<div class="nav-band"><nav><a href="index.html" class="site-name">${esc(title)}</a></nav></div>
<div class="spread-container">
<div class="col-left">
${leftHtml}
</div>
<div class="col-right">
${rightHtml}
</div>
</div>
<div class="footer-band"><footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer></div>
</div>
</body>
</html>`;
}
