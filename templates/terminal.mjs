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
html { font-size: 16px; -webkit-font-smoothing: antialiased; }
body { font-family: 'JetBrains Mono', monospace; color: #d4d4d4; background: #0d0d0d; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 24px 40px 32px; position: relative; overflow-x: hidden; }
body::before {
  content: ''; position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.15) 0%, transparent 100%),
    radial-gradient(1px 1px at 30% 60%, rgba(255,255,255,0.1) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 50% 10%, rgba(232,196,115,0.2) 0%, transparent 100%),
    radial-gradient(1px 1px at 70% 40%, rgba(255,255,255,0.12) 0%, transparent 100%),
    radial-gradient(1px 1px at 90% 80%, rgba(255,255,255,0.08) 0%, transparent 100%),
    radial-gradient(1.5px 1.5px at 15% 85%, rgba(232,196,115,0.15) 0%, transparent 100%),
    radial-gradient(1px 1px at 45% 45%, rgba(255,255,255,0.1) 0%, transparent 100%),
    radial-gradient(1px 1px at 80% 15%, rgba(255,255,255,0.12) 0%, transparent 100%);
}
body > * { position: relative; z-index: 1; }
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
p { margin-bottom: 6px; } p:last-child { margin-bottom: 0; }
.hero { margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #222; }
.job { margin-bottom: 20px; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
.job-header strong { font-size: 14px; color: #d4d4d4; }
.date { font-size: 11px; color: #3a3a3a; white-space: nowrap; }
.role { font-size: 12px; color: #666; margin-bottom: 4px; }
.sub-role { margin-top: 8px; padding-top: 8px; border-top: 1px solid #1a1a1a; }
.sub-role:first-child { margin-top: 4px; padding-top: 0; border-top: none; }
.sub-role-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 4px; }
ul { margin: 4px 0 0 18px; } li { font-size: 12px; color: #666; margin-bottom: 2px; }
.detail { font-size: 12px; color: #666; }
.skills-list { font-size: 12px; color: #555; }
footer { margin-top: 24px; padding-top: 10px; border-top: 1px solid #1a1a1a; font-size: 11px; color: #2a2a2a; }
footer a { color: #3a3a3a; text-decoration: underline; text-underline-offset: 2px; text-decoration-color: #222; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; background: #fff; color: #111; } body::before { display: none; } }
@media (max-width: 700px) { body { padding: 16px 20px; } .log-entry { grid-template-columns: 1fr; } .log-date { margin-bottom: 2px; } .job-header { flex-direction: column; } }`;
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

  // HOME
  const statusParts = [];
  if (targetRoles.length > 0) statusParts.push(`role: <span>${esc(targetRoles[0])}</span>`);
  if (location) statusParts.push(`location: <span>${esc(location.toLowerCase())}</span>`);
  statusParts.push(`status: <span>building</span>`);

  const homeBody = `<main>
<section class="hero">
<h1><span class="prompt">&gt; </span>${esc(username)}<span class="cursor"></span></h1>
${statusParts.length > 0 ? `<div class="status-line">${statusParts.join(' | ')}</div>` : ''}
</section>
${summaryText ? `<article><p>${renderInlineMarkdown(summaryText)}</p></article>` : ''}
${projects.length > 0 ? `<section><h2>Ship Log</h2>${projects.slice(0, 4).map(p => {
    const dateStr = '';
    return `<div class="log-entry"><div class="log-date">${esc(dateStr)}</div><div class="log-content"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name.toLowerCase())}</a>` : esc(p.name.toLowerCase())}</h3>${p.description ? `<p>${p.description}</p>` : ''}${p.heroMetric ? `<div class="delta">${esc(p.heroMetric)}</div>` : ''}</div></div>`;
  }).join('\n')}</section>` : ''}
</main>`;

  // WORK
  const workBody = `<main>
<h1><span class="prompt">&gt; </span>ls work/<span class="cursor"></span></h1>
<h2>Ship Log</h2>
${projects.map(p => `<section class="log-entry"><div class="log-date"></div><div class="log-content"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name.toLowerCase())}</a>` : esc(p.name.toLowerCase())}</h3>${p.description ? `<p>${p.description}</p>` : ''}${p.heroMetric ? `<div class="delta">${esc(p.heroMetric)}</div>` : ''}</div></section>`).join('\n')}
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

  // ABOUT
  const aboutParts = ['<main>', '<h1><span class="prompt">&gt; </span>whoami<span class="cursor"></span></h1>'];
  if (summaryText) aboutParts.push(`<article><p>${renderInlineMarkdown(summaryText)}</p></article>`);
  if (exitStory) aboutParts.push(`<article><p>${renderInlineMarkdown(exitStory)}</p></article>`);
  if (superpowers.length > 0) aboutParts.push(`<section><h2>Strengths</h2><p class="detail">${superpowers.join(' / ')}</p></section>`);
  if (currentProject) aboutParts.push(`<section><h2>Now</h2><p>${renderInlineMarkdown(currentProject)}</p></section>`);
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
${nav}
${body}
<footer>~ made by <a href="https://github.com/a16z/speedrun-career-ops">speedrun</a></footer>
</body>
</html>`;
}
