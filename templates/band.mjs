/**
 * templates/band.mjs — Full-bleed alternating bands, single page
 *
 * Full-width horizontal bands with alternating backgrounds (white / light gray).
 * Content centered at max-width ~700px within each band. Fixed thin nav bar at top.
 * Volt aesthetic: Cabinet Grotesk, near-black text, rose accent.
 * Single page scroll with anchor nav.
 */

export const name = 'band';

export const fonts = [
  'https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,700,800&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; scroll-behavior: smooth; }
body { font-family: 'Cabinet Grotesk', -apple-system, BlinkMacSystemFont, sans-serif; color: #0a0a0a; background: #fefefe; line-height: 1.6; margin: 0; padding: 0; font-size: 15px; }

/* Fixed nav */
nav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: #fefefe; border-bottom: 1px solid #eee; height: 48px; display: flex; align-items: center; justify-content: center; gap: 28px; font-size: 13px; font-weight: 400; }
nav .site-name { font-size: 15px; font-weight: 800; color: #0a0a0a; text-decoration: none; letter-spacing: -0.02em; margin-right: auto; padding-left: 24px; }
nav .nav-links { display: flex; gap: 24px; padding-right: 24px; }
nav a { color: #555; text-decoration: none !important; transition: color 0.15s; }
nav a:hover { color: #0a0a0a; }
body { padding-top: 48px; }

/* Bands */
.band { width: 100%; padding: 80px 24px; }
#hero.band { padding: 96px 24px; }
.band-white { background: #fefefe; }
.band-gray { background: #f5f5f4; }
.band-inner { max-width: 700px; margin: 0 auto; }

/* Links */
a { color: #e11d48; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(225,29,72,0.4); }
a:hover { text-decoration-color: #e11d48; }

/* Section divider */
.section-divider { width: 48px; height: 3px; background: #e11d48; margin-bottom: 24px; }
.band-gray .section-divider { height: 2px; }

/* Section heading */
h2 { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #aaa; margin-bottom: 24px; }

/* Hero */
.hero h1 { font-size: 52px; font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; color: #0a0a0a; margin-bottom: 16px; }
.hero .headline { font-size: 18px; color: #555; line-height: 1.5; margin-bottom: 10px; }
.hero .meta { font-size: 13px; color: #aaa; margin-top: 4px; }
.hero .meta a { color: #e11d48; font-size: 13px; text-decoration: none; }
.hero .meta a:hover { text-decoration: underline; text-decoration-color: rgba(225,29,72,0.4); }

/* About */
.about-text { font-size: 16px; color: #333; line-height: 1.75; }
.about-text p { margin-bottom: 14px; }
.about-text a { color: #e11d48; }

/* Experience */
.exp-group { padding: 20px 0; border-bottom: 1px solid #eee; }
.exp-group:last-child { border-bottom: none; }
.exp-header { display: flex; justify-content: space-between; align-items: baseline; gap: 8px; flex-wrap: wrap; margin-bottom: 4px; }
.exp-company { font-size: 16px; font-weight: 800; color: #0a0a0a; letter-spacing: -0.01em; }
.exp-date { font-size: 12px; color: #aaa; white-space: nowrap; }
.exp-role { font-size: 14px; color: #555; font-weight: 700; margin-bottom: 4px; }
.exp-bullets { margin: 6px 0 0; padding-left: 18px; font-size: 13px; color: #555; list-style: disc; }
.exp-bullets li { margin-bottom: 3px; line-height: 1.5; }
.sub-role { padding: 12px 0 0; margin-top: 12px; border-top: 1px solid #eee; }
.sub-role:first-child { padding-top: 0; margin-top: 4px; border-top: none; }
.sub-role .exp-header { margin-bottom: 2px; }
details { margin-top: 6px; }
details summary { cursor: pointer; font-size: 12px; color: #aaa; list-style: none; }
details summary::-webkit-details-marker { display: none; }
details summary::before { content: '+ more'; }
details[open] summary::before { content: '- less'; }
details .detail-content { padding-top: 6px; }

/* Education */
.edu-divider { width: 32px; height: 2px; background: #e11d48; margin-bottom: 16px; }
.edu { font-size: 14px; color: #555; line-height: 1.6; margin-bottom: 6px; }

/* Skills */
.skills-grid { font-size: 13px; color: #555; line-height: 1.4; column-count: 3; column-gap: 20px; }
.skills-grid span { display: block; padding: 2px 0; }

/* Strengths */
.strengths-list { list-style: none; padding: 0; margin: 0; }
.strengths-list li { font-size: 15px; color: #333; padding: 8px 0; border-bottom: 1px solid #ddd; }
.strengths-list li:last-child { border-bottom: none; }
.band-gray .strengths-list li { border-bottom-color: #e8e8e7; }
.band-gray .exp-group { border-bottom-color: #e8e8e7; }
.band-gray .sub-role { border-top-color: #e8e8e7; }

/* Contact */
.contact-target { font-size: 15px; color: #555; margin-bottom: 16px; }
.contact-target strong { color: #0a0a0a; font-weight: 700; }
.contact-line { font-size: 15px; line-height: 2; }
.contact-line a { text-decoration-color: rgba(225,29,72,0.4); }

/* Footer */
footer { padding: 32px 24px; text-align: center; font-size: 11px; color: #aaa; border-top: 1px solid #eee; background: #fefefe; }
footer a { color: #aaa; text-decoration: underline; text-underline-offset: 2px; font-weight: 600; }
footer a:hover { color: #e11d48; }

/* Print */
@media print {
  nav, footer { display: none !important; }
  body { padding-top: 0; }
  .band { padding: 32px 0; background: #fff !important; }
  .band-gray { background: #fff !important; }
  .band-inner { max-width: none; }
}

/* Responsive 660px */
@media (max-width: 660px) {
  nav .site-name { font-size: 14px; padding-left: 16px; }
  nav .nav-links { gap: 16px; padding-right: 16px; font-size: 12px; }
  .band { padding: 64px 20px; }
  .hero h1 { font-size: 36px; }
  .hero .headline { font-size: 16px; }
  .exp-header { flex-direction: column; }
  .skills-grid { column-count: 2; }
  .about-text { font-size: 15px; }
}

/* Responsive 480px */
@media (max-width: 480px) {
  nav { height: 44px; }
  nav .site-name { font-size: 13px; padding-left: 12px; }
  nav .nav-links { gap: 12px; padding-right: 12px; font-size: 11px; }
  body { padding-top: 44px; }
  .band { padding: 48px 16px; }
  .hero h1 { font-size: 28px; }
  .hero .headline { font-size: 14px; }
  h2 { font-size: 12px; }
  .exp-company { font-size: 14px; }
  .exp-role { font-size: 13px; }
  .exp-bullets { font-size: 12px; }
  .about-text { font-size: 14px; }
  .strengths-list li { font-size: 13px; }
  .skills-grid { column-count: 1; }
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

  // Build nav anchor links
  const sections = ['hero'];
  if (summaryText || homeBio || exitStory) sections.push('about');
  if (experience.length > 0) sections.push('experience');
  if (skills.length > 0 || superpowers.length > 0) sections.push('skills');
  sections.push('contact');

  const navLabels = { hero: 'Home', about: 'About', experience: 'Experience', skills: 'Skills', contact: 'Contact' };

  const navHtml = `<nav>
<a href="#hero" class="site-name">${esc(fullName)}</a>
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
<div class="section-divider"></div>
${headline ? `<div class="headline">${esc(headline)}</div>` : ''}
${metaLine}
</div>
</div>
</section>`);

  // ABOUT band
  if (summaryText || homeBio || exitStory) {
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
    bands.push(`<section id="about" class="band ${bandClass()}">
<div class="band-inner">
<h2>About</h2>
<div class="section-divider"></div>
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
        if (bullets.length <= 2) return `<ul class="exp-bullets">${bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>`;
        const visible = bullets.slice(0, 2);
        const hidden = bullets.slice(2);
        return `<ul class="exp-bullets">${visible.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul><details><summary></summary><div class="detail-content"><ul class="exp-bullets">${hidden.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul></div></details>`;
      }
      if (g.roles.length === 1) {
        const r = g.roles[0];
        return `<div class="exp-group"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${r.role ? `<div class="exp-role">${esc(r.role)}</div>` : ''}${renderBullets(r.bullets)}</div>`;
      }
      const firstDate = g.roles[0].dateRange || '';
      const lastDate = g.roles[g.roles.length - 1].dateRange || '';
      const startYear = lastDate.match(/\d{4}/)?.[0] || '';
      const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
      const spanDate = startYear && endPart ? `${startYear} \u2013 ${endPart}` : firstDate;
      return `<div class="exp-group"><div class="exp-header"><span class="exp-company">${esc(g.company)}</span><span class="exp-date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="exp-header"><span class="exp-role">${esc(r.role)}</span><span class="exp-date">${esc(r.dateRange)}</span></div>${renderBullets(r.bullets)}</div>`).join('')}</div>`;
    }).join('\n');

    const eduHtml = education.length > 0
      ? `<h2 style="margin-top: 48px;">Education</h2><div class="edu-divider"></div>${education.map(e => `<p class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}`
      : '';

    bands.push(`<section id="experience" class="band ${bandClass()}">
<div class="band-inner">
<h2>Experience</h2>
<div class="section-divider"></div>
${expHtml}
${eduHtml}
</div>
</section>`);
  }

  // SKILLS band
  if (skills.length > 0 || superpowers.length > 0) {
    const skillParts = [];
    if (superpowers.length > 0) {
      skillParts.push(`<h2>Strengths</h2><div class="section-divider"></div><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul>`);
    }
    if (skills.length > 0) {
      skillParts.push(`<h2 ${superpowers.length > 0 ? 'style="margin-top: 40px;"' : ''}>Skills</h2><div class="skills-grid">${skills.map(s => `<span>${esc(s)}</span>`).join('')}</div>`);
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
<div class="section-divider"></div>
${targetDesc ? `<p class="contact-target">Looking for: <strong>${esc(targetDesc)}</strong></p>` : ''}
${contactParts.length > 0 ? `<p class="contact-line">${contactParts.join(' &middot; ')}</p>` : ''}
</div>
</section>`);

  // Assemble page
  const body = bands.join('\n');

  const footerHtml = `<footer>made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>`;

  const t = fullName;
  const html = buildPage({ title: t, nav: navHtml, body, footer: footerHtml, summaryShort: data.summaryShort, fonts, cssText: css() });

  return { 'index.html': html };
}

function buildPage({ title, nav, body, footer, summaryShort, fonts, cssText }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
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
${nav}
${body}
${footer}
</body>
</html>`;
}
