#!/usr/bin/env node

/**
 * generate-portfolio.mjs — Static portfolio site generator
 *
 * Reads candidate data files and generates a polished single-page portfolio
 * website as dist/index.html with all CSS inlined. No external dependencies
 * beyond js-yaml (already in package.json).
 *
 * Usage:
 *   node generate-portfolio.mjs [--output=dist/index.html] [--theme=dark|light]
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { output: 'dist/index.html', theme: 'light' };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--output=')) args.output = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--theme=')) args.theme = arg.split('=')[1].toLowerCase();
    else if (arg === '--help' || arg === '-h') {
      console.log('Usage: node generate-portfolio.mjs [--output=dist/index.html] [--theme=dark|light]');
      process.exit(0);
    }
  }
  if (!['dark', 'light'].includes(args.theme)) {
    console.error(`Invalid theme "${args.theme}". Use: dark, light`);
    process.exit(1);
  }
  return args;
}

// ---------------------------------------------------------------------------
// File readers
// ---------------------------------------------------------------------------

async function readProfile() {
  const path = resolve(__dirname, 'config/profile.yml');
  try {
    const raw = await readFile(path, 'utf-8');
    return yaml.load(raw);
  } catch {
    console.error('ERROR: config/profile.yml not found. Run onboarding first.');
    process.exit(1);
  }
}

async function readCV() {
  const path = resolve(__dirname, 'cv.md');
  try {
    return await readFile(path, 'utf-8');
  } catch {
    console.error('ERROR: cv.md not found. Run onboarding first.');
    process.exit(1);
  }
}

async function readArticleDigest() {
  const path = resolve(__dirname, 'article-digest.md');
  try {
    return await readFile(path, 'utf-8');
  } catch {
    return null; // optional file
  }
}

// ---------------------------------------------------------------------------
// Markdown parsing (regex-based, no dependencies)
// ---------------------------------------------------------------------------

/**
 * Split cv.md into named sections keyed by heading text (lowercased).
 * Returns Map<string, string> where the value is the raw body text under that heading.
 */
function parseSections(md) {
  const sections = new Map();
  const lines = md.split('\n');
  let currentKey = '_preamble';
  let currentLines = [];

  for (const line of lines) {
    const h2 = line.match(/^##\s+(.+)$/);
    if (h2) {
      sections.set(currentKey, currentLines.join('\n').trim());
      currentKey = h2[1].trim().toLowerCase();
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
  sections.set(currentKey, currentLines.join('\n').trim());
  return sections;
}

/**
 * Parse experience entries from a section body.
 * Expects patterns like:
 *   ### Company Name -- Location
 *   **Role Title**
 *   YYYY-YYYY or Month YYYY - Present
 *   - bullet
 */
function parseExperience(body) {
  if (!body) return [];
  const entries = [];
  const blocks = body.split(/^###\s+/m).filter(Boolean);

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const companyLine = lines[0];
    const company = companyLine.replace(/\s*--\s*.*$/, '').trim();
    const location = companyLine.includes('--') ? companyLine.split('--').slice(1).join('--').trim() : '';

    let role = '';
    let dateRange = '';
    const bullets = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Role line: **Role Title** or **Role Title / Other**
      const roleMatch = line.match(/^\*\*(.+?)\*\*$/);
      if (roleMatch && !role) {
        role = roleMatch[1];
        continue;
      }
      // Date line: YYYY-YYYY or YYYY - Present or Month YYYY - Month YYYY
      const dateMatch = line.match(/^(\d{4}\s*[-–]\s*(?:\d{4}|[Pp]resent)|\w+\s+\d{4}\s*[-–]\s*(?:\w+\s+\d{4}|[Pp]resent))$/);
      if (dateMatch && !dateRange) {
        dateRange = dateMatch[1].replace(/[-–]/, ' - ');
        continue;
      }
      // Bullet point
      if (line.startsWith('-') || line.startsWith('*')) {
        bullets.push(line.replace(/^[-*]\s*/, ''));
      }
    }

    entries.push({ company, location, role, dateRange, bullets });
  }
  return entries;
}

/**
 * Parse education entries from the section body.
 */
function parseEducation(body) {
  if (!body) return [];
  const entries = [];
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    // ### headers contain the degree/school info
    if (line.match(/^#{1,4}\s+/)) {
      entries.push(line.replace(/^#{1,4}\s+/, ''));
    } else if (line.startsWith('-') || line.startsWith('*')) {
      const text = line.replace(/^[-*]\s*/, '');
      // Append bullet details to last entry if exists
      if (entries.length > 0) {
        entries[entries.length - 1] += ` — ${text}`;
      } else {
        entries.push(text);
      }
    } else {
      entries.push(line);
    }
  }
  return entries;
}

/**
 * Parse skills from the section body into clean tags.
 *
 * Skills sections often look like:
 *   "Engineering: TypeScript, Python (daily), Go, SQL. LangChain, LangGraph..."
 * We need to split on commas AND on ". " (period-space before a capital letter),
 * strip parenthetical asides for cleaner tags, and filter noise.
 */
function parseSkills(body) {
  if (!body) return [];
  const skills = [];
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    let clean = line.replace(/^[-*]\s*/, '').replace(/\*\*/g, '');

    // Strip category prefix (e.g. "Engineering: ", "Teaching: ", "Other: ")
    const colonIdx = clean.indexOf(':');
    if (colonIdx > 0 && colonIdx < 30) {
      clean = clean.slice(colonIdx + 1).trim();
    }
    // Strip inline sub-category labels like "Delivery: lecture, lab" or "Assessment work: rubrics"
    // Match "Word(s): " but NOT "1:1" patterns (digit-colon-digit)
    clean = clean.replace(/(?<=^|[.,]\s*)(?:[A-Z][\w]+(?:\s+\w+){0,2}):\s*/g, '');

    // Split on period-space (sentence boundaries within a comma-separated skill line)
    // e.g. "SQL. LangChain" → ["SQL", "LangChain"]
    // Also handles "split. lecture" (lowercase after period)
    clean = clean.replace(/\.\s+/g, ', ');

    // Before comma-splitting, mask parenthetical content so commas inside parens are preserved
    // e.g. "PyTorch (basics, not research-level)" stays as one token
    const masked = [];
    clean = clean.replace(/\([^)]*\)/g, (match) => {
      const token = `\x00P${masked.length}\x00`;
      masked.push(match);
      return token;
    });

    // Split on commas
    let items = clean.split(/,\s*/).map(s => s.trim()).filter(Boolean);

    // Restore parenthetical content
    items = items.map(s => s.replace(/\x00P(\d+)\x00/g, (_, n) => masked[Number(n)]));

    for (let item of items) {
      // Remove trailing periods
      item = item.replace(/\.\s*$/, '');
      // Strip parenthetical asides for cleaner tags: "Python (daily)" → "Python"
      item = item.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
      // Skip items that are clearly descriptive sentences (contain multiple spaces + verbs)
      if (item.split(/\s+/).length > 5) continue;
      // Skip sentence fragments that start with conjunctions or pronouns
      if (/^(I |and |or |the |but |that |which |who )/i.test(item)) continue;
      // Skip empty or very short
      if (item.length < 2) continue;
      skills.push(item);
    }
  }

  // Deduplicate (case-insensitive) and cap length
  const seen = new Set();
  const unique = [];
  for (const s of skills) {
    const key = s.toLowerCase();
    if (!seen.has(key) && s.length <= 50) {
      seen.add(key);
      unique.push(s);
    }
  }
  return unique;
}

/**
 * Parse projects from cv.md Projects section and/or article-digest.md.
 */
function parseProjects(projectsBody, articleDigest, profileProofPoints) {
  const projects = [];

  // From cv.md Projects section
  if (projectsBody) {
    const lines = projectsBody.split('\n');
    for (const line of lines) {
      if (line.match(/^[-*]\s+/)) {
        const text = line.replace(/^[-*]\s*/, '');
        // Try to extract name from backticks or bold
        const nameMatch = text.match(/^`([^`]+)`|^\*\*([^*]+)\*\*/);
        let name, desc;
        if (nameMatch) {
          name = nameMatch[1] || nameMatch[2];
          desc = text.slice(nameMatch[0].length).replace(/^\s*[-–—()]\s*/, '').trim();
        } else {
          // Split on " -- " or " - " (but only the first separator to preserve the description)
          const sepIdx = text.search(/\s+[-–—]{1,2}\s+/);
          if (sepIdx > 0) {
            name = text.slice(0, sepIdx).trim();
            desc = text.slice(sepIdx).replace(/^\s*[-–—]+\s*/, '').trim();
          } else {
            name = text;
            desc = '';
          }
        }
        // Try to find a metric
        const metricMatch = desc.match(/(\d[\d,.]*[KkMm]?\+?\s*(?:stars|users|downloads|docs\/min|events\/month|alumni|contributors|developers|views|hours))/i);
        const heroMetric = metricMatch ? metricMatch[0] : '';
        // Try to find a URL
        const urlMatch = desc.match(/\[([^\]]*)\]\(([^)]+)\)/);
        const url = urlMatch ? urlMatch[2] : '';
        projects.push({ name, description: renderInlineMarkdown(desc), heroMetric, url });
      }
    }
  }

  // From article-digest.md
  if (articleDigest) {
    const digestLines = articleDigest.split('\n');
    let currentProject = null;
    for (const line of digestLines) {
      const h2 = line.match(/^##\s+(.+)/);
      const h3 = line.match(/^###\s+(.+)/);
      if (h2 || h3) {
        if (currentProject) projects.push(currentProject);
        currentProject = { name: (h2 || h3)[1].trim(), description: '', heroMetric: '', url: '' };
      } else if (currentProject && line.trim()) {
        const metricMatch = line.match(/(\d[\d,.]*[KkMm%]?\+?\s*(?:increase|decrease|reduction|improvement|stars|users|downloads|revenue|growth|faster|slower|saved|reduction))/i);
        if (metricMatch && !currentProject.heroMetric) {
          currentProject.heroMetric = metricMatch[0];
        }
        const urlMatch = line.match(/\[([^\]]*)\]\(([^)]+)\)/);
        if (urlMatch && !currentProject.url) {
          currentProject.url = urlMatch[2];
        }
        if (!currentProject.description) {
          currentProject.description = renderInlineMarkdown(line.replace(/^[-*]\s*/, '').trim());
        }
      }
    }
    if (currentProject) projects.push(currentProject);
  }

  // From profile.yml proof_points
  if (profileProofPoints && Array.isArray(profileProofPoints)) {
    for (const pp of profileProofPoints) {
      // Don't duplicate if name already exists
      if (projects.some(p => p.name === pp.name)) continue;
      projects.push({
        name: pp.name || '',
        description: pp.description || '',
        heroMetric: pp.hero_metric || '',
        url: pp.url || '',
      });
    }
  }

  return projects;
}

/**
 * Render inline markdown (bold, links, code) to HTML.
 */
function renderInlineMarkdown(text) {
  if (!text) return '';
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
}

/**
 * Escape HTML entities.
 */
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ---------------------------------------------------------------------------
// Multi-page HTML generation
// ---------------------------------------------------------------------------

function generatePages({ profile, sections, articleDigest }) {
  const c = profile.candidate || {};
  const n = profile.narrative || {};
  const name = c.full_name || 'Portfolio';
  const headline = n.headline || '';
  const location = c.location || '';
  const email = c.email || '';
  const linkedin = c.linkedin || '';
  const github = c.github || '';
  const superpowers = n.superpowers || [];
  const proofPoints = n.proof_points || [];
  const exitStory = n.exit_story || '';
  const currentProject = profile.talent_network?.current_project || n.current_project || '';
  const targetRoles = profile.target_roles?.primary || [];
  const locationFlex = profile.compensation?.location_flexibility || '';
  const sum = sections.get('professional summary') || sections.get('summary') || sections.get('about') || sections.get('_preamble') || '';
  const summaryText = sum.split('\n\n')[0].replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
  const summaryShort = summaryText.slice(0, 160).replace(/\s+\S*$/, '') + (summaryText.length > 160 ? '...' : '');
  const experience = parseExperience(sections.get('work experience') || sections.get('experience') || '');
  const education = parseEducation(sections.get('education') || '');
  const skills = parseSkills(sections.get('skills') || '');
  const techSkills = skills.filter(s => !superpowers.some(sp => sp.toLowerCase() === s.toLowerCase()));
  const projects = parseProjects(sections.get('projects') || '', articleDigest, proofPoints);
  const linkedinUrl = linkedin.startsWith('http') ? linkedin : `https://${linkedin}`;
  const githubUrl = github.startsWith('http') ? github : `https://${github}`;

  const css = `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 17px; -webkit-font-smoothing: antialiased; }
body { font-family: Georgia, 'Times New Roman', serif; color: #222; background: #fdfdfd; line-height: 1.7; max-width: 36rem; margin: 0 auto; padding: 3rem 1.5rem 2.5rem; }
h1 { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 1.35rem; font-weight: 600; letter-spacing: -0.01em; margin-bottom: 0.3rem; }
h2 { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 1rem; font-weight: 600; margin: 2rem 0 0.5rem; }
h2:first-child { margin-top: 0; }
h3 { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.95rem; font-weight: 600; margin: 1.5rem 0 0.2rem; }
h3:first-child { margin-top: 0; }
h3 a { color: #222; text-decoration: underline; text-decoration-color: #ccc; text-underline-offset: 2px; }
h3 a:hover { text-decoration-color: #222; }
a { color: #222; } a:hover { color: #555; }
p { margin-bottom: 0.6rem; } p:last-child { margin-bottom: 0; }
nav { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 0.85rem; margin-bottom: 2.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; display: flex; gap: 1.25rem; align-items: baseline; flex-wrap: wrap; }
nav .site-name { font-weight: 600; font-size: 0.9rem; color: #222; text-decoration: none; margin-right: auto; }
nav a { color: #888; text-decoration: none; } nav a:hover { color: #222; }
.nav-active { color: #222; font-weight: 500; }
.subtitle { font-style: italic; color: #555; font-size: 1rem; margin-bottom: 0.5rem; }
.meta { color: #999; font-size: 0.85rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
.page-links { font-size: 0.85rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin-top: 0.3rem; }
.page-links a { margin-right: 1rem; color: #555; text-decoration: underline; text-decoration-color: #ddd; text-underline-offset: 2px; }
.page-links a:hover { color: #222; text-decoration-color: #222; }
.project { margin-bottom: 1.75rem; padding-bottom: 1.75rem; border-bottom: 1px solid #f0f0f0; }
.project:last-child { border-bottom: none; padding-bottom: 0; }
.metric { font-size: 0.85rem; color: #888; font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin-bottom: 0.3rem; }
.job { margin-bottom: 1.5rem; } .job:last-child { margin-bottom: 0; }
.job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.25rem; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
.job-header strong { font-size: 0.9rem; }
.date { color: #999; font-size: 0.8rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; white-space: nowrap; }
.role { color: #555; font-size: 0.85rem; font-family: -apple-system, BlinkMacSystemFont, sans-serif; margin-bottom: 0.25rem; }
ul { margin: 0.3rem 0 0 1.25rem; } li { font-size: 0.9rem; color: #444; margin-bottom: 0.15rem; line-height: 1.6; }
.detail { font-size: 0.9rem; color: #555; } .detail strong { color: #333; }
footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; font-size: 0.75rem; color: #ccc; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
@media print { nav, footer { display: none; } body { padding: 1rem 0; max-width: none; } }
@media (max-width: 480px) { body { padding: 1.5rem 1rem; } nav { gap: 0.75rem; } .job-header { flex-direction: column; } }`;

  const navItems = [
    { href: 'index.html', label: 'Home' },
    ...(projects.length > 0 ? [{ href: 'work.html', label: 'Work' }] : []),
    ...(experience.length > 0 ? [{ href: 'experience.html', label: 'Experience' }] : []),
    { href: 'about.html', label: 'About' },
  ];

  function pg(title, active, body) {
    const t = title === name ? title : `${title} — ${name}`;
    const nv = navItems.map(ni => ni.href === active ? `<span class="nav-active">${esc(ni.label)}</span>` : `<a href="${ni.href}">${esc(ni.label)}</a>`).join(' ');
    return `<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n<title>${esc(t)}</title>\n<meta name="description" content="${esc(summaryShort)}">\n<meta property="og:title" content="${esc(t)}">\n<meta property="og:description" content="${esc(summaryShort)}">\n<meta property="og:type" content="website">\n<style>${css}</style>\n</head>\n<body>\n<nav><a href="index.html" class="site-name">${esc(name)}</a> ${nv}</nav>\n${body}\n<footer>&copy; ${new Date().getFullYear()} ${esc(name)}</footer>\n</body>\n</html>`;
  }

  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

  // HOME
  let hb = [];
  if (summaryText) hb.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
  if (exitStory) hb.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
  if (currentProject) hb.push(`<p>Right now I'm ${renderInlineMarkdown(currentProject.charAt(0).toLowerCase() + currentProject.slice(1))}</p>`);
  const home = `<header><h1>${esc(name)}</h1>${headline ? `<p class="subtitle">${esc(headline)}</p>` : ''}${location ? `<p class="meta">${esc(location)}</p>` : ''}${links.length > 0 ? `<p class="page-links">${links.join(' ')}</p>` : ''}</header>${hb.join('\n')}${superpowers.length > 0 ? `<p class="detail">${superpowers.join(' / ')}</p>` : ''}`;

  // WORK
  const work = projects.length > 0 ? `<h1>Work</h1><p>Selected projects and things I've built.</p>${projects.map(p => `<div class="project"><h3>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</h3>${p.heroMetric ? `<p class="metric">${esc(p.heroMetric)}</p>` : ''}${p.description ? `<p>${p.description}</p>` : ''}</div>`).join('\n')}` : '<h1>Work</h1><p>Nothing here yet.</p>';

  // EXPERIENCE
  const exp = `<h1>Experience</h1>${experience.map(j => `<div class="job"><div class="job-header"><strong>${esc(j.company)}</strong>${j.dateRange ? `<span class="date">${esc(j.dateRange)}</span>` : ''}</div>${j.role ? `<div class="role">${esc(j.role)}</div>` : ''}${j.bullets.length > 0 ? `<ul>${j.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('')}</ul>` : ''}</div>`).join('\n')}${education.length > 0 ? `<h2>Education</h2>${education.map(e => `<p class="detail">${renderInlineMarkdown(typeof e === 'string' ? e : '')}</p>`).join('')}` : ''}`;

  // ABOUT
  let ab = ['<h1>About</h1>'];
  if (summaryText) ab.push(`<p>${renderInlineMarkdown(summaryText)}</p>`);
  if (exitStory) ab.push(`<p>${renderInlineMarkdown(exitStory)}</p>`);
  if (superpowers.length > 0) ab.push(`<p>What I do best: ${superpowers.join(', ').replace(/, ([^,]*)$/, ', and $1')}.</p>`);
  if (currentProject) ab.push(`<h2>Now</h2><p>${renderInlineMarkdown(currentProject)}</p>`);
  const lp = [];
  if (targetRoles.length > 0) lp.push(`Interested in: ${targetRoles.join(', ')}.`);
  if (locationFlex) lp.push(locationFlex + '.');
  if (lp.length > 0) ab.push(`<h2>Looking for</h2><p>${lp.join(' ')}</p>`);
  if (techSkills.length > 0) ab.push(`<h2>Tools</h2><p class="detail">${techSkills.map(s => esc(s)).join(', ')}</p>`);
  if (links.length > 0) ab.push(`<h2>Contact</h2><p class="page-links">${links.join(' ')}</p>`);

  return {
    'index.html': pg(name, 'index.html', home),
    ...(projects.length > 0 ? { 'work.html': pg('Work', 'work.html', work) } : {}),
    ...(experience.length > 0 ? { 'experience.html': pg('Experience', 'experience.html', exp) } : {}),
    'about.html': pg('About', 'about.html', ab.join('\n')),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  const outputDir = resolve(__dirname, 'dist');
  console.log('Portfolio generator (multi-page)');
  console.log(`  Output: ${outputDir}/\n`);
  const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
  const sections = parseSections(cvRaw);
  console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
  console.log(`  article-digest.md: ${articleDigest ? 'found' : 'not found (skipping)'}\n`);
  const pages = generatePages({ profile, sections, articleDigest });
  await mkdir(outputDir, { recursive: true });
  let total = 0;
  for (const [f, html] of Object.entries(pages)) {
    await writeFile(resolve(outputDir, f), html, 'utf-8');
    const sz = Buffer.byteLength(html, 'utf-8');
    total += sz;
    console.log(`  ${f} (${(sz / 1024).toFixed(1)} KB)`);
  }
  console.log(`\n  ${Object.keys(pages).length} pages, ${(total / 1024).toFixed(1)} KB total`);
  console.log(`\n  open ${resolve(outputDir, 'index.html')}`);
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
