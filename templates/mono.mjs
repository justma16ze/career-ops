/**
 * templates/mono.mjs — Single-Page Scroll, Void Aesthetic
 *
 * One index.html. Everything stacked vertically: Hero, About, Experience,
 * Skills, Contact, Footer. Anchor nav at top. Near-black bg, JetBrains Mono,
 * radial glow, text hierarchy through brightness only.
 */

export const name = 'mono';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; scroll-behavior: smooth; }
body { font-family: 'JetBrains Mono', ui-monospace, 'SF Mono', SFMono-Regular, Menlo, Consolas, monospace; color: #888; background: #050505; line-height: 1.6; margin: 0; padding: 0; font-size: 14px; }
body::before { content: ''; position: fixed; top: 35%; left: 50%; width: 700px; height: 700px; background: radial-gradient(circle, rgba(0,210,180,0.045) 0%, rgba(0,180,160,0.015) 40%, rgba(0,210,180,0) 70%); transform: translate(-50%, -50%); pointer-events: none; z-index: 0; }
.wrap { width: 620px; margin: 0 auto; padding: 0 36px 40px; position: relative; z-index: 1; }
a { color: #999; text-decoration: none; transition: color 0.15s ease; }
a:hover { color: #ccc; }
nav { position: sticky; top: 0; z-index: 10; background: rgba(5,5,5,0.92); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; gap: 16px; align-items: baseline; flex-wrap: wrap; padding: 16px 0; margin-bottom: 0; font-size: 13px; border-bottom: 1px solid #1a1a1a; }
section[id] { scroll-margin-top: 60px; }
nav .site-name { font-size: 16px; font-weight: 500; color: #ccc; text-decoration: none; margin-right: auto; letter-spacing: -0.02em; }
nav a { color: #555; text-decoration: none; }
nav a:hover { color: #999; }
section { margin-bottom: 56px; }
h2 { font-size: 13px; font-weight: 500; color: #555; margin: 0 0 20px; text-transform: lowercase; letter-spacing: 0.05em; }
.hero { padding-top: 80px; margin-bottom: 56px; }
.hero-name { font-size: 28px; font-weight: 700; color: #ccc; letter-spacing: -0.02em; margin-bottom: 8px; }
.hero-headline { font-size: 14px; color: #666; line-height: 1.6; }
.about-text { font-size: 14px; color: #888; line-height: 1.75; }
.about-text p { margin-bottom: 16px; }
.about-text a { color: #999; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.about-text a:hover { color: #ccc; text-decoration-color: #666; }
.entry { padding: 16px 0; border-bottom: 1px solid #1a1a1a; }
.entry:last-child { border-bottom: none; }
.entry-header { margin-bottom: 4px; display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; }
.entry-title { font-weight: 500; font-size: 14px; color: #aaa; }
.entry-date { font-size: 12px; color: #444; white-space: nowrap; }
.entry-role { font-size: 13px; color: #666; margin-bottom: 4px; }
.entry ul { margin: 6px 0 0 0; padding-left: 0; font-size: 13px; color: #666; list-style: none; }
.entry li { margin-bottom: 3px; line-height: 1.5; padding-left: 16px; text-indent: -16px; }
.entry li::before { content: '-'; margin-right: 8px; color: #333; display: inline; }
.sub-entry { padding: 10px 0 0; margin-top: 10px; border-top: 1px solid #111; }
.sub-entry:first-child { padding-top: 4px; margin-top: 4px; border-top: none; }
.sub-entry .entry-role { font-weight: 500; font-style: normal; font-size: 13px; color: #888; }
.sub-entry .entry-date { font-size: 11px; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #444; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 8px; }
.skills-text { font-size: 13px; color: #666; line-height: 1.8; }
.education { margin-top: 32px; }
.education p { font-size: 13px; color: #666; padding: 4px 0; }
.contact-line { font-size: 14px; }
.contact-line a { margin-right: 20px; color: #888; text-decoration: underline; text-decoration-color: #333; text-underline-offset: 4px; }
.contact-line a:hover { color: #ccc; text-decoration-color: #666; }
footer { margin-top: 48px; padding-top: 16px; border-top: 1px solid #1a1a1a; font-size: 12px; color: #666; }
footer a { color: #777; font-weight: 500; text-decoration: underline; text-decoration-color: #444; text-underline-offset: 3px; }
footer a:hover { color: #999; }
@media print { nav, footer { display: none; } body { background: #fff; color: #1a1a1a; } body::before { display: none; } .wrap { padding: 1rem; max-width: none; } .hero-name { color: #1a1a1a; } .hero-headline { color: #444; } .entry-title { color: #1a1a1a; } .entry-date { color: #666; } .entry-role { color: #444; } .entry ul { color: #333; } .entry li::before { color: #999; } h2 { color: #444; } .about-text { color: #333; } .about-text a { color: #1a1a1a; } .skills-text { color: #333; } .contact-line a { color: #1a1a1a; } }
@media (max-width: 660px) {
  .wrap { width: 100% !important; padding: 0 24px 32px; }
  nav { font-size: 12px; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; padding: 12px 0; }
  .hero { padding-top: 48px; margin-bottom: 40px; }
  .hero-name { font-size: 22px; }
  .entry { padding: 12px 0; }
  .entry-header { flex-direction: column; }
  .entry-date { float: none; margin-bottom: 2px; }
  .sub-entry .entry-header { flex-direction: column; }
  .sub-entry .entry-date { float: none; }
  .about-text { font-size: 13px; }
  section { margin-bottom: 40px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
}
@media (max-width: 480px) {
  .wrap { padding: 0 16px 24px !important; }
  nav .site-name { font-size: 14px; }
  nav { font-size: 11px; gap: 8px; }
  h2 { font-size: 12px; }
  .hero { padding-top: 32px; margin-bottom: 32px; }
  .hero-name { font-size: 20px; }
  .hero-headline { font-size: 13px; }
  .entry-title { font-size: 13px; }
  .entry-role { font-size: 12px; }
  .entry ul { font-size: 12px; }
  .about-text { font-size: 12px; }
  .skills-text { font-size: 12px; }
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

  // --- Nav (anchor links) ---
  const nav = `<nav><a href="#" class="site-name">${esc(fullName)}</a> <a href="#about">about</a> <a href="#experience">experience</a> <a href="#skills">skills</a> <a href="#contact">contact</a></nav>`;

  // --- Hero ---
  const hero = `<div class="hero"><div class="hero-name">${esc(fullName)}</div>${headline ? `<div class="hero-headline">${esc(headline)}</div>` : ''}</div>`;

  // --- About ---
  let aboutContent;
  if (homeBio) {
    aboutContent = `<article class="about-text">${homeBio}</article>`;
  } else {
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    aboutContent = `<article class="about-text">${parts.join('\n')}</article>`;
  }
  const aboutSection = `<section id="about"><h2>about</h2>${aboutContent}</section>`;

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

  // --- Skills (comma-separated, no pills) ---
  const skillsSection = skills.length > 0 ? `<section id="skills"><h2>skills</h2><p class="skills-text">${skills.map(s => esc(s)).join(', ')}</p></section>` : '';

  // --- Contact ---
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">linkedin</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">github</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  const contactSection = links.length > 0 ? `<section id="contact"><h2>contact</h2><p class="contact-line">${links.join(' ')}</p></section>` : '';

  // --- Footer ---
  const footer = `<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>`;

  // --- Assemble single page ---
  const body = `${hero}\n${aboutSection}\n${expSection}\n${skillsSection}\n${contactSection}\n${footer}`;

  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  const escFn = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const summaryShort = data.summaryShort || '';

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escFn(fullName)}</title>
<meta name="description" content="${escFn(summaryShort)}">
<meta property="og:title" content="${escFn(fullName)}">
<meta property="og:description" content="${escFn(summaryShort)}">
<meta property="og:type" content="website">
${fontLinks}
<style>${css()}</style>
</head>
<body>
<div class="wrap">
${nav}
${body}
</div>
</body>
</html>`;

  return { 'index.html': html };
}
