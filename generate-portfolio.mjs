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
// HTML generation
// ---------------------------------------------------------------------------

function generateHTML({ profile, sections, articleDigest, theme }) {
  const candidate = profile.candidate || {};
  const narrative = profile.narrative || {};

  const name = candidate.full_name || 'Portfolio';
  const headline = narrative.headline || '';
  const location = candidate.location || '';
  const email = candidate.email || '';
  const linkedin = candidate.linkedin || '';
  const github = candidate.github || '';
  const portfolioUrl = candidate.portfolio_url || '';
  const superpowers = narrative.superpowers || [];
  const proofPoints = narrative.proof_points || [];

  const summarySection = sections.get('professional summary')
    || sections.get('summary')
    || sections.get('about')
    || sections.get('_preamble')
    || '';
  const summaryText = summarySection
    .split('\n\n')[0]
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
  const summaryShort = summaryText.slice(0, 160).replace(/\s+\S*$/, '') + (summaryText.length > 160 ? '...' : '');

  const experienceBody = sections.get('work experience') || sections.get('experience') || '';
  const experience = parseExperience(experienceBody);
  const recentBody = sections.get('recent engineering (last 12 months)') || sections.get('recent engineering') || '';

  const educationBody = sections.get('education') || '';
  const education = parseEducation(educationBody);

  const skillsBody = sections.get('skills') || '';
  const skills = parseSkills(skillsBody);

  const projectsBody = sections.get('projects') || '';
  const projects = parseProjects(projectsBody, articleDigest, proofPoints);

  const linkedinUrl = linkedin.startsWith('http') ? linkedin : `https://${linkedin}`;
  const githubUrl = github.startsWith('http') ? github : `https://${github}`;

  // -----------------------------------------------------------------------
  // Build HTML sections
  // -----------------------------------------------------------------------

  // -- Experience --
  const expHTML = experience.length > 0 ? `
    <section>
      <h2>Experience</h2>
      ${experience.map(job => `
      <div class="job">
        <div class="job-header">
          <strong>${esc(job.company)}</strong>
          ${job.dateRange ? `<span class="date">${esc(job.dateRange)}</span>` : ''}
        </div>
        ${job.role ? `<div class="role">${esc(job.role)}</div>` : ''}
        ${job.bullets.length > 0 ? `<ul>${job.bullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('\n')}</ul>` : ''}
      </div>`).join('\n')}
    </section>` : '';

  // -- Projects --
  const projHTML = projects.length > 0 ? `
    <section>
      <h2>Projects</h2>
      ${projects.map(p => `
      <div class="project">
        <strong>${p.url ? `<a href="${esc(p.url)}">${esc(p.name)}</a>` : esc(p.name)}</strong>${p.metric ? ` &mdash; ${esc(p.metric)}` : ''}
        ${p.description ? `<p>${renderInlineMarkdown(p.description)}</p>` : ''}
      </div>`).join('\n')}
    </section>` : '';

  // -- Skills --
  // Only use actual technical skills, not superpowers
  const techSkills = skills.filter(s =>
    !superpowers.some(sp => sp.toLowerCase() === s.toLowerCase())
  );
  const skillsHTML = techSkills.length > 0 ? `
    <section>
      <h2>Skills</h2>
      <p class="skills">${techSkills.map(s => esc(s)).join(', ')}</p>
    </section>` : '';

  // -- Education --
  const eduHTML = education.length > 0 ? `
    <section>
      <h2>Education</h2>
      ${education.map(e => `<p class="edu">${renderInlineMarkdown(typeof e === 'string' ? e : (e.raw || `${e.degree || ''} — ${e.school || ''}${e.year ? `, ${e.year}` : ''}`))}</p>`).join('\n')}
    </section>` : '';

  // -- Links --
  const links = [];
  if (linkedin) links.push(`<a href="${esc(linkedinUrl)}">LinkedIn</a>`);
  if (github) links.push(`<a href="${esc(githubUrl)}">GitHub</a>`);
  if (email) links.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);

  // -----------------------------------------------------------------------
  // Final HTML — typography-first, no gimmicks
  // -----------------------------------------------------------------------

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(name)}${headline ? ` — ${esc(headline)}` : ''}</title>
  <meta name="description" content="${esc(summaryShort)}">
  <meta property="og:title" content="${esc(name)}${headline ? ` — ${esc(headline)}` : ''}">
  <meta property="og:description" content="${esc(summaryShort)}">
  <meta property="og:type" content="website">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { font-size: 16px; -webkit-font-smoothing: antialiased; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      color: #1a1a1a;
      background: #fff;
      line-height: 1.6;
      max-width: 38rem;
      margin: 0 auto;
      padding: 4rem 1.5rem 3rem;
    }
    h1 { font-size: 1.5rem; font-weight: 600; letter-spacing: -0.02em; margin-bottom: 0.25rem; }
    h2 { font-size: 0.85rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #999; margin-bottom: 1rem; margin-top: 0; }
    a { color: #1a1a1a; }
    a:hover { color: #666; }
    p { margin-bottom: 0.75rem; }

    .subtitle { color: #555; font-size: 1rem; margin-bottom: 0.5rem; }
    .meta { color: #999; font-size: 0.875rem; margin-bottom: 0.25rem; }
    .links { font-size: 0.875rem; margin-bottom: 0; }
    .links a { margin-right: 1rem; }
    .links a:last-child { margin-right: 0; }

    header { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid #e0e0e0; }

    section { margin-bottom: 2.5rem; }

    .job { margin-bottom: 1.5rem; }
    .job:last-child { margin-bottom: 0; }
    .job-header { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.25rem; }
    .job-header strong { font-size: 0.95rem; }
    .date { color: #999; font-size: 0.85rem; white-space: nowrap; }
    .role { color: #555; font-size: 0.9rem; margin-bottom: 0.35rem; }
    ul { margin: 0.35rem 0 0 1.25rem; }
    li { font-size: 0.9rem; color: #444; margin-bottom: 0.2rem; line-height: 1.55; }

    .project { margin-bottom: 0.75rem; }
    .project p { font-size: 0.9rem; color: #555; margin: 0.15rem 0 0; }

    .skills { font-size: 0.9rem; color: #555; }

    .edu { font-size: 0.9rem; color: #444; margin-bottom: 0.35rem; }

    footer { margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e0e0e0; font-size: 0.8rem; color: #bbb; }
    footer a { color: #bbb; }
    footer a:hover { color: #999; }

    @media print {
      body { padding: 1rem 0; font-size: 11pt; max-width: none; }
      header { margin-bottom: 1.5rem; padding-bottom: 1rem; }
      section { margin-bottom: 1.25rem; }
      a[href]::after { content: " (" attr(href) ")"; font-size: 0.75em; color: #999; }
      footer { display: none; }
    }
    @media (max-width: 480px) {
      body { padding: 2rem 1rem 2rem; }
      .job-header { flex-direction: column; }
    }
  </style>
</head>
<body>
  <header>
    <h1>${esc(name)}</h1>
    ${headline ? `<p class="subtitle">${esc(headline)}</p>` : ''}
    ${location ? `<p class="meta">${esc(location)}</p>` : ''}
    ${links.length > 0 ? `<p class="links">${links.join('\n')}</p>` : ''}
  </header>

  ${summaryText ? `<section><h2>About</h2><p>${renderInlineMarkdown(summaryText)}</p></section>` : ''}
  ${expHTML}
  ${projHTML}
  ${skillsHTML}
  ${eduHTML}

  <footer>&copy; ${new Date().getFullYear()} ${esc(name)}</footer>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);
  const outputPath = resolve(__dirname, args.output);

  console.log(`Portfolio generator`);
  console.log(`  Theme:  ${args.theme}`);
  console.log(`  Output: ${outputPath}`);
  console.log('');

  // Read data files
  const [profile, cvRaw, articleDigest] = await Promise.all([
    readProfile(),
    readCV(),
    readArticleDigest(),
  ]);

  // Parse cv.md sections
  const sections = parseSections(cvRaw);

  console.log(`  Sections found: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
  if (articleDigest) console.log('  article-digest.md: found');
  else console.log('  article-digest.md: not found (skipping)');
  console.log('');

  // Generate HTML
  const html = generateHTML({ profile, sections, articleDigest, theme: args.theme });

  // Ensure output directory exists
  await mkdir(dirname(outputPath), { recursive: true });

  // Write file
  await writeFile(outputPath, html, 'utf-8');

  const sizeKB = (Buffer.byteLength(html, 'utf-8') / 1024).toFixed(1);
  console.log(`Portfolio generated: ${outputPath}`);
  console.log(`  Size: ${sizeKB} KB`);
  console.log(`  Sections: hero, about, experience, projects, skills, education`);
  console.log('');
  console.log('Open in browser:');
  console.log(`  open ${outputPath}`);
}

main().catch((err) => {
  console.error('Portfolio generation failed:', err.message);
  process.exit(1);
});
