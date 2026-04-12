/**
 * templates/terminal.mjs — Claude Code Energy template
 *
 * JetBrains Mono + General Sans
 * #0d0d0d bg, #d4d4d4 text, #e8c473 gold accent
 * Monospace ship log. Cursor blink animation. Terminal prompt hero.
 */

export const name = 'terminal';

export const fonts = [
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap',
  'https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap',
];

export function css() {
  return `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 16px; -webkit-font-smoothing: antialiased; overflow-y: scroll; }
body { font-family: 'JetBrains Mono', monospace; color: #d4d4d4; background: #0d0d0d; line-height: 1.6; margin: 0; padding: 0; position: relative; }
.wrap { width: 100%; max-width: 800px; margin: 0 auto; padding: 24px 40px 32px; }
body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    radial-gradient(2px 2px at 8% 15%, rgba(255,255,255,0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 22% 55%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 48% 8%, rgba(232,196,115,0.35) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 65% 35%, rgba(255,255,255,0.25) 0%, transparent 100%),
    radial-gradient(2px 2px at 88% 72%, rgba(255,255,255,0.18) 0%, transparent 100%),
    radial-gradient(2.5px 2.5px at 12% 82%, rgba(232,196,115,0.3) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 42% 42%, rgba(255,255,255,0.2) 0%, transparent 100%),
    radial-gradient(2px 2px at 78% 12%, rgba(255,255,255,0.22) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 55% 68%, rgba(232,196,115,0.2) 0%, transparent 100%),
    radial-gradient(2px 2px at 35% 28%, rgba(255,255,255,0.15) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 92% 45%, rgba(232,196,115,0.25) 0%, transparent 100%),
    radial-gradient(2px 2px at 18% 95%, rgba(255,255,255,0.2) 0%, transparent 100%);
}
.wrap { position: relative; z-index: 1; }
a { color: #e8c473; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba(232,196,115,0.3); }
a:hover { text-decoration-color: #e8c473; }
nav { display: flex; gap: 20px; align-items: baseline; flex-wrap: wrap; padding-bottom: 16px; margin-bottom: 24px; border-bottom: 1px solid #222; font-size: 13px; }
nav .site-name { color: #d4d4d4; text-decoration: none; font-weight: 500; margin-right: auto; }
nav a { color: #444; text-decoration: none; } nav a:hover { color: #d4d4d4; }
nav .active { color: #e8c473; font-weight: 500; }
.prompt { color: #555; }
.accent { color: #e8c473; }
h1 { font-size: 24px; font-weight: 700; margin-bottom: 6px; display: flex; align-items: center; color: #e5e5e5; }
h1 .cursor { display: inline-block; width: 10px; height: 24px; background: #e8c473; margin-left: 4px; animation: blink 1s step-end infinite; }
@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
h2 { font-family: 'General Sans', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: #e8c473; margin: 24px 0 12px; }
.status-line { font-size: 12px; color: #555; }
.status-line span { color: #e8c473; }
.log-entry { display: grid; grid-template-columns: 90px 1fr; gap: 12px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #1a1a1a; }
.log-entry:last-child { border-bottom: none; }
.log-date { font-size: 11px; color: #3a3a3a; padding-top: 2px; }
.log-content h3 { font-size: 14px; font-weight: 500; color: #d4d4d4; margin-bottom: 2px; }
.log-content p { font-size: 12px; color: #666; }
.log-content .delta { color: #e8c473; font-weight: 500; }
main { }
section { margin-bottom: 8px; }
article { margin-bottom: 8px; }
.ship-entry { margin-bottom: 24px; padding-bottom: 24px; border-bottom: 1px solid #1a1a1a; }
.ship-entry:last-child { border-bottom: none; }
.ship-entry h3 { font-size: 15px; font-weight: 700; color: #e8c473; margin-bottom: 6px; }
.ship-entry h3 a { color: #e8c473; text-decoration: underline; text-underline-offset: 3px; text-decoration-color: rgba(232,196,115,0.3); }
.ship-entry p { font-size: 12px; color: #888; line-height: 1.6; }
.ship-entry .delta { color: #d4d4d4; font-weight: 400; font-size: 12px; margin-top: 6px; }
p { margin-bottom: 6px; } p:last-child { margin-bottom: 0; }
.hero { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #222; }
.job { margin-bottom: 28px; padding-bottom: 28px; border-bottom: 1px solid #1a1a1a; }
.job:last-child { border-bottom: none; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; margin-bottom: 4px; }
.job-header strong { font-size: 15px; color: #e8c473; }
.date { font-size: 11px; color: #e8c473; white-space: nowrap; }
.role { font-size: 12px; color: #888; margin-bottom: 6px; }
.sub-role { margin-top: 20px; padding-top: 0; }
.sub-role:first-child { margin-top: 8px; }
.sub-role-header { margin-bottom: 8px; }
.sub-role-header .role { color: #e8c473; font-weight: 700; font-size: 13px; display: block; margin-bottom: 2px; }
.sub-role-header .date { display: block; color: #555; }
ul { margin: 6px 0 0 18px; } li { font-size: 12px; color: #777; margin-bottom: 4px; line-height: 1.5; }
.detail { font-size: 12px; color: #777; }
.skills-list { font-size: 12px; color: #777; line-height: 2.2; }
.strengths-list { list-style: none; margin: 0; padding: 0; }
.strengths-list li { font-size: 12px; color: #777; margin-bottom: 4px; padding-left: 0; }
.strengths-list li::before { content: '> '; color: #e8c473; }
.home-bio { font-size: 14px; color: #bbb; line-height: 1.8; margin-top: 8px; }
.home-bio p { margin-bottom: 12px; }
.home-bio a { color: #e8c473; }
footer { margin-top: 32px; padding-top: 12px; border-top: 1px solid #222; font-size: 11px; color: #e8c473; }
footer a { color: #e8c473; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: rgba(232,196,115,0.4); }
@media print { nav, footer { display: none; } .wrap { padding: 1rem; max-width: none; } body { background: #fff; color: #111; } body::before { display: none; } }
@media (max-width: 840px) {
  .wrap { padding: 20px 24px; }
  h1 { font-size: 20px; }
  nav { font-size: 12px; gap: 12px; }
  .hero { margin-bottom: 16px; padding-bottom: 14px; }
  .job-header { flex-direction: column; }
  .sub-role-header { flex-direction: column; }
  .home-bio { font-size: 13px; }
  li { font-size: 11px; }
  .role { font-size: 11px; }
  .date { font-size: 10px; }
  p { word-wrap: break-word; overflow-wrap: break-word; }
  ul { margin-left: 14px; }
}
@media (max-width: 480px) {
  .wrap { padding: 16px; }
  h1 { font-size: 18px; }
  h2 { font-size: 10px; }
  nav { font-size: 11px; gap: 8px; flex-wrap: wrap; }
  .job-header strong { font-size: 13px; }
  .status-line { font-size: 11px; }
  .home-bio { font-size: 12px; line-height: 1.7; }
  .strengths-list li { font-size: 11px; }
  .skills-list { font-size: 11px; }
}`;
}

export function pages(data) {
  const { name: fullName, headline, location, email, linkedin, github,
    summaryText, exitStory, currentProject, superpowers, proofPoints,
    projects, experience, education, skills, experienceGroups } = data;
  const esc = data.esc;
  const renderInlineMarkdown = data.renderInlineMarkdown;
  const linkedinUrl = linkedin && (linkedin.startsWith('http') ? linkedin : `https://${linkedin}`);
  const githubUrl = github && (github.startsWith('http') ? github : `https://${github}`);

  const username = fullName.toLowerCase().replace(/\s+/g, '_');
  const targetRoles = data.targetRoles || [];

  const navItems = [
    { href: 'index.html', label: 'home' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'work' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'experience' }] : []),
    { href: 'about.html', label: 'about' },
  ];

  function nav(active) {
    const items = navItems.map(ni =>
      ni.href === active
        ? `<span class="active">${esc(ni.label)}</span>`
        : `<a href="${ni.href}">${esc(ni.label)}</a>`
    ).join(' ');
    return `<nav><a href="index.html" class="site-name">${esc(username)}</a> ${items}</nav>`;
  }

  // HOME — conversational paragraph about the person
  // If narrative.home_bio exists, render it directly (it contains HTML links).
  // Otherwise, fall back to assembling from structured fields.
  const homeBio = data.homeBio || '';

  let homeContent;
  if (homeBio) {
    homeContent = `<article class="home-bio">${homeBio}</article>`;
  } else {
    // Fallback: assemble from structured data
    const parts = [];
    if (summaryText) parts.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
    if (exitStory) parts.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
    if (currentProject) parts.push(`<p>${renderInlineMarkdown(currentProject)}</p>`);
    const linkParts = [];
    if (linkedin) linkParts.push(`<a href="${esc(linkedinUrl)}">linkedin</a>`);
    if (github) linkParts.push(`<a href="${esc(githubUrl)}">github</a>`);
    if (email) linkParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
    if (linkParts.length > 0) parts.push(`<p>${linkParts.join(' ')}</p>`);
    homeContent = `<article class="home-bio">${parts.join('\n')}</article>`;
  }

  const homeBody = `<main>
<section class="hero">
<h1><span class="prompt">&gt; </span>${esc(username)}<span class="cursor"></span></h1>
</section>
${homeContent}
</main>`;

  // WORK — same visual structure as experience page (job-style entries)
  const workBody = `<main>
<h1><span class="prompt">&gt; </span>ls work/<span class="cursor"></span></h1>
<h2>Selected Projects</h2>
${projects.map(p => `<article class="job"><div class="job-header"><strong>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</strong>${p.heroMetric ? `<span class="date">${esc(p.heroMetric)}</span>` : ''}</div>${p.description ? `<p class="role">${p.description}</p>` : ''}</article>`).join('\n')}
</main>`;

  // EXPERIENCE
  const groups = experienceGroups;
  const expBody = `<main>
<h1><span class="prompt">&gt; </span>cat experience.log<span class="cursor"></span></h1>
<h2>Work History</h2>
${groups.map(g => {
    if (g.roles.length === 1) {
      const r = g.roles[0];
      return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.role ? `<div class="role">${esc(r.role)}</div>` : ''}${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</article>`;
    }
    const firstDate = g.roles[0].dateRange || '';
    const lastDate = g.roles[g.roles.length - 1].dateRange || '';
    const startYear = lastDate.match(/\d{4}/)?.[0] || '';
    const endPart = firstDate.match(/[-\u2013]\s*(.+)$/)?.[1] || '';
    const spanDate = startYear && endPart ? `${startYear} - ${endPart}` : firstDate;
    return `<article class="job"><div class="job-header"><strong>${esc(g.company)}</strong><span class="date">${esc(spanDate)}</span></div>${g.roles.map(r => `<div class="sub-role"><div class="sub-role-header"><div class="role">${esc(r.role)}</div>${r.dateRange ? `<span class="date">${esc(r.dateRange)}</span>` : ''}</div>${r.bullets.length > 0 ? `<ul>${r.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</article>`;
  }).join('\n')}
${education.length > 0 ? `<section><h2>Education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}</section>` : ''}
</main>`;

  // ABOUT — only content NOT already on the home page
  // Home has the personal bio paragraph. About has: strengths, stack, what they're looking for, contact.
  // If home_bio exists, skip summary/exitStory here (already covered). If no home_bio, include them.
  const aboutParts = ['<main>', '<h1><span class="prompt">&gt; </span>whoami<span class="cursor"></span></h1>'];
  if (!homeBio) {
    if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
    if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  }
  if (superpowers.length > 0) aboutParts.push(`<section><h2>Strengths</h2><ul class="strengths-list">${superpowers.map(s => `<li>${esc(s)}</li>`).join('')}</ul></section>`);
  if (currentProject) aboutParts.push(`<section><h2>Now</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
  const targetDesc = targetRoles.length > 0 ? targetRoles.join(', ') : '';
  const locationDesc = data.locationFlex || '';
  if (targetDesc || locationDesc) {
    const lookingParts = [];
    if (targetDesc) lookingParts.push(`Interested in: ${targetDesc}.`);
    if (locationDesc) lookingParts.push(locationDesc);
    aboutParts.push(`<section><h2>Looking For</h2><p class="detail">${lookingParts.join(' ')}</p></section>`);
  }
  if (skills.length > 0) aboutParts.push(`<section><h2>Stack</h2><p class="skills-list">${skills.map(s => esc(s).toLowerCase()).join(', ')}</p></section>`);
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">linkedin</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">github</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (links.length > 0) aboutParts.push(`<section><h2>Contact</h2><p>${links.join(' ')}</p></section>`);
  aboutParts.push('</main>');

  const result = {};
  const pageDefs = [
    ['index.html', fullName, 'index.html', homeBody],
    ...(projects.length > 0 ? [['work.html', 'Work', 'work.html', workBody]] : []),
    ...(experience.length > 0 ? [['experience.html', 'Experience', 'experience.html', expBody]] : []),
    ['about.html', 'About', 'about.html', aboutParts.join('\n')],
  ];

  for (const [filename, title, active, body] of pageDefs) {
    const t = title === fullName ? title : `${title} \u2014 ${fullName}`;
    result[filename] = buildPage({ title: t, nav: nav(active), body, summaryShort: data.summaryShort, fonts, cssText: css() });
  }
  return result;
}

function buildPage({ title, nav, body, summaryShort, fonts, cssText }) {
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
<div class="wrap">
${nav}
${body}
<footer>~ made by <a href="https://github.com/justma16ze/career-ops">speedrun</a></footer>
</div>
</body>
</html>`;
}
