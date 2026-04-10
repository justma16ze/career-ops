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
  const args = { output: 'dist/index.html', theme: 'dark' };
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
    if (line.startsWith('-') || line.startsWith('*')) {
      const text = line.replace(/^[-*]\s*/, '');
      entries.push(text);
    } else if (!line.startsWith('#')) {
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

  // Extract summary from cv.md
  const summarySection = sections.get('professional summary')
    || sections.get('summary')
    || sections.get('about')
    || sections.get('_preamble')
    || '';
  // Clean up the summary: remove markdown formatting, take first paragraph
  const summaryText = summarySection
    .split('\n\n')[0]
    .replace(/\*\*/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
  const summaryShort = summaryText.slice(0, 160).replace(/\s+\S*$/, '') + (summaryText.length > 160 ? '...' : '');

  // Parse structured data
  const experienceBody = sections.get('work experience') || sections.get('experience') || '';
  const experience = parseExperience(experienceBody);

  // Also check for "recent engineering" or similar sections to merge
  const recentBody = sections.get('recent engineering (last 12 months)') || sections.get('recent engineering') || '';

  const educationBody = sections.get('education') || '';
  const education = parseEducation(educationBody);

  const skillsBody = sections.get('skills') || '';
  const skills = parseSkills(skillsBody);

  const projectsBody = sections.get('projects') || '';
  const projects = parseProjects(projectsBody, articleDigest, proofPoints);

  // Build the LinkedIn/GitHub URLs (ensure they are full URLs)
  const linkedinUrl = linkedin.startsWith('http') ? linkedin : `https://${linkedin}`;
  const githubUrl = github.startsWith('http') ? github : `https://${github}`;

  // -----------------------------------------------------------------------
  // CSS
  // -----------------------------------------------------------------------

  const css = `
    /* ===== Reset & Base ===== */
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --color-bg: #0a0a0a;
      --color-surface: #111111;
      --color-surface-raised: #1a1a1a;
      --color-border: #1a1a1a;
      --color-border-subtle: #252525;
      --color-text: #e5e5e5;
      --color-text-secondary: #a3a3a3;
      --color-text-muted: #737373;
      --color-accent: #3b82f6;
      --color-accent-dim: rgba(59, 130, 246, 0.12);
      --color-accent-hover: #60a5fa;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif;
      --font-mono: 'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'Courier New', monospace;
      --max-width: 720px;
      --radius: 8px;
      --radius-lg: 12px;
      --transition: 150ms ease;
    }

    ${theme === 'light' ? `
    :root {
      --color-bg: #fafafa;
      --color-surface: #ffffff;
      --color-surface-raised: #f5f5f5;
      --color-border: #e5e5e5;
      --color-border-subtle: #ebebeb;
      --color-text: #171717;
      --color-text-secondary: #525252;
      --color-text-muted: #a3a3a3;
      --color-accent: #2563eb;
      --color-accent-dim: rgba(37, 99, 235, 0.08);
      --color-accent-hover: #3b82f6;
    }
    ` : ''}

    @media (prefers-color-scheme: light) {
      ${theme === 'dark' ? `
      /* Respect OS preference only in dark default mode */
      :root:not([data-theme="dark"]) {
        --color-bg: #fafafa;
        --color-surface: #ffffff;
        --color-surface-raised: #f5f5f5;
        --color-border: #e5e5e5;
        --color-border-subtle: #ebebeb;
        --color-text: #171717;
        --color-text-secondary: #525252;
        --color-text-muted: #a3a3a3;
        --color-accent: #2563eb;
        --color-accent-dim: rgba(37, 99, 235, 0.08);
        --color-accent-hover: #3b82f6;
      }
      ` : ''}
    }

    html {
      font-size: 16px;
      scroll-behavior: smooth;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--color-bg);
      color: var(--color-text);
      line-height: 1.7;
      min-height: 100vh;
    }

    a {
      color: var(--color-accent);
      text-decoration: none;
      transition: color var(--transition);
    }
    a:hover { color: var(--color-accent-hover); }
    a:focus-visible {
      outline: 2px solid var(--color-accent);
      outline-offset: 2px;
      border-radius: 2px;
    }

    code {
      font-family: var(--font-mono);
      font-size: 0.875em;
      background: var(--color-surface-raised);
      padding: 0.15em 0.4em;
      border-radius: 4px;
    }

    strong { font-weight: 600; color: var(--color-text); }

    /* ===== Layout ===== */
    .container {
      max-width: var(--max-width);
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* ===== Animations ===== */
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .animate-in {
      animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
    }
    .animate-in:nth-child(1) { animation-delay: 0s; }
    .animate-in:nth-child(2) { animation-delay: 0.08s; }
    .animate-in:nth-child(3) { animation-delay: 0.16s; }
    .animate-in:nth-child(4) { animation-delay: 0.24s; }
    .animate-in:nth-child(5) { animation-delay: 0.32s; }
    .animate-in:nth-child(6) { animation-delay: 0.40s; }
    .animate-in:nth-child(7) { animation-delay: 0.48s; }

    @supports (animation-timeline: view()) {
      .scroll-reveal {
        animation: fadeInUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-timeline: view();
        animation-range: entry 0% entry 30%;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .animate-in, .scroll-reveal { animation: none !important; opacity: 1; transform: none; }
    }

    /* ===== Header / Hero ===== */
    .hero {
      padding: 5rem 0 3rem;
      border-bottom: 1px solid var(--color-border);
    }
    .hero__name {
      font-size: clamp(2.25rem, 5vw, 3.25rem);
      font-weight: 700;
      letter-spacing: -0.035em;
      line-height: 1.15;
      color: var(--color-text);
      margin-bottom: 0.75rem;
    }
    .hero__headline {
      font-size: clamp(1.05rem, 2.5vw, 1.2rem);
      color: var(--color-text-secondary);
      font-weight: 400;
      line-height: 1.5;
      margin-bottom: 1rem;
    }
    .hero__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.875rem;
      color: var(--color-text-muted);
    }
    .hero__meta-sep {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      background: var(--color-text-muted);
      display: inline-block;
    }
    .hero__links {
      display: flex;
      flex-wrap: wrap;
      gap: 1.25rem;
      margin-top: 1.5rem;
    }
    .hero__link {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      transition: color var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .hero__link:hover { color: var(--color-accent); }
    .hero__link-arrow {
      font-size: 0.75rem;
      opacity: 0;
      transform: translateX(-4px);
      transition: opacity var(--transition), transform var(--transition);
    }
    .hero__link:hover .hero__link-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    /* ===== Section Shared ===== */
    section {
      padding: 3.5rem 0;
      border-bottom: 1px solid var(--color-border);
    }
    section:last-of-type { border-bottom: none; }

    .section__title {
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
      margin-bottom: 2rem;
    }

    /* ===== About ===== */
    .about__text {
      font-size: clamp(1rem, 2vw, 1.075rem);
      color: var(--color-text-secondary);
      line-height: 1.8;
      max-width: 65ch;
    }
    .about__superpowers {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }
    .superpower-tag {
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.3rem 0.75rem;
      background: var(--color-accent-dim);
      color: var(--color-accent);
      border-radius: 100px;
      border: 1px solid transparent;
      white-space: nowrap;
    }

    /* ===== Experience ===== */
    .exp-list { list-style: none; }
    .exp-item {
      position: relative;
      padding-left: 1.5rem;
      padding-bottom: 2.5rem;
    }
    .exp-item:last-child { padding-bottom: 0; }
    .exp-item::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-accent);
    }
    .exp-item::after {
      content: '';
      position: absolute;
      left: 3px;
      top: 20px;
      width: 1px;
      height: calc(100% - 16px);
      background: var(--color-border-subtle);
    }
    .exp-item:last-child::after { display: none; }
    .exp-company {
      font-size: 1rem;
      font-weight: 600;
      color: var(--color-text);
      line-height: 1.4;
    }
    .exp-role {
      font-size: 0.925rem;
      color: var(--color-text-secondary);
      margin-top: 0.15rem;
    }
    .exp-date {
      font-size: 0.8rem;
      color: var(--color-text-muted);
      font-variant-numeric: tabular-nums;
      margin-top: 0.25rem;
      margin-bottom: 0.75rem;
    }
    .exp-bullets {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .exp-bullets li {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
      padding-left: 1rem;
      position: relative;
    }
    .exp-bullets li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--color-border-subtle);
    }

    /* ===== Projects ===== */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }
    @media (min-width: 640px) {
      .projects-grid { grid-template-columns: 1fr 1fr; }
    }
    .project-card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      transition: border-color var(--transition), box-shadow var(--transition);
      display: flex;
      flex-direction: column;
    }
    .project-card:hover {
      border-color: var(--color-border-subtle);
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    }
    .project-card__name {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--color-text);
      margin-bottom: 0.35rem;
    }
    .project-card__metric {
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--color-accent);
      margin-bottom: 0.75rem;
    }
    .project-card__desc {
      font-size: 0.85rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
      flex: 1;
    }
    .project-card__link {
      display: inline-block;
      margin-top: 1rem;
      font-size: 0.8rem;
      font-weight: 500;
    }

    /* ===== Skills ===== */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .skill-pill {
      font-size: 0.8rem;
      font-weight: 500;
      padding: 0.35rem 0.85rem;
      background: var(--color-surface-raised);
      color: var(--color-text-secondary);
      border-radius: 100px;
      border: 1px solid var(--color-border);
      white-space: nowrap;
      transition: border-color var(--transition), color var(--transition);
    }
    .skill-pill:hover {
      border-color: var(--color-accent);
      color: var(--color-text);
    }

    /* ===== Education ===== */
    .edu-list { list-style: none; }
    .edu-item {
      padding: 0.75rem 0;
      font-size: 0.925rem;
      color: var(--color-text-secondary);
      line-height: 1.6;
    }
    .edu-item + .edu-item {
      border-top: 1px solid var(--color-border);
    }

    /* ===== Recent Highlights ===== */
    .highlights-list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .highlights-list li {
      font-size: 0.9rem;
      color: var(--color-text-secondary);
      line-height: 1.65;
      padding-left: 1rem;
      position: relative;
    }
    .highlights-list li::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0.55em;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--color-accent);
    }

    /* ===== Footer ===== */
    footer {
      padding: 3rem 0;
      border-top: 1px solid var(--color-border);
    }
    .footer__inner {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      gap: 1rem;
    }
    .footer__contact {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }
    .footer__contact a {
      color: var(--color-text-secondary);
    }
    .footer__contact a:hover {
      color: var(--color-accent);
    }
    .attribution {
      font-size: 0.8rem;
      color: var(--color-text-muted);
    }
    .attribution a {
      color: var(--color-text-muted);
      text-decoration: underline;
      text-decoration-color: var(--color-border);
      text-underline-offset: 2px;
    }
    .attribution a:hover { color: var(--color-text-secondary); }

    /* ===== Responsive ===== */
    @media (min-width: 640px) {
      .hero { padding: 6rem 0 3.5rem; }
      section { padding: 4rem 0; }
    }
    @media (min-width: 768px) {
      .hero { padding: 7rem 0 4rem; }
    }
    @media (min-width: 1024px) {
      :root { --max-width: 720px; }
    }

    /* ===== Print ===== */
    @media print {
      :root {
        --color-bg: #ffffff;
        --color-surface: #ffffff;
        --color-surface-raised: #f5f5f5;
        --color-border: #d4d4d4;
        --color-border-subtle: #e5e5e5;
        --color-text: #0a0a0a;
        --color-text-secondary: #404040;
        --color-text-muted: #737373;
        --color-accent: #1d4ed8;
        --color-accent-dim: rgba(29, 78, 216, 0.08);
      }
      body { font-size: 11pt; line-height: 1.5; }
      .hero { padding: 1.5rem 0 1rem; }
      section { padding: 1.5rem 0; break-inside: avoid; }
      header { break-after: avoid; }
      .animate-in, .scroll-reveal { animation: none !important; opacity: 1; transform: none; }
      .hero__link-arrow { display: none; }
      a[href]::after {
        content: " (" attr(href) ")";
        font-size: 0.75em;
        color: var(--color-text-muted);
        word-break: break-all;
      }
      .hero__links a[href]::after,
      .footer__contact a[href]::after,
      .project-card__link[href]::after {
        content: " (" attr(href) ")";
      }
      .attribution { display: none; }
      .project-card { box-shadow: none; border: 1px solid var(--color-border); }
      .project-card:hover { box-shadow: none; }
    }
  `;

  // -----------------------------------------------------------------------
  // HTML sections
  // -----------------------------------------------------------------------

  // Hero
  const heroLinks = [];
  if (linkedin) heroLinks.push(`<a href="${esc(linkedinUrl)}" class="hero__link" target="_blank" rel="noopener">LinkedIn<span class="hero__link-arrow">&#8599;</span></a>`);
  if (github) heroLinks.push(`<a href="${esc(githubUrl)}" class="hero__link" target="_blank" rel="noopener">GitHub<span class="hero__link-arrow">&#8599;</span></a>`);
  if (email) heroLinks.push(`<a href="mailto:${esc(email)}" class="hero__link">Email<span class="hero__link-arrow">&#8599;</span></a>`);

  const heroMeta = [];
  if (location) heroMeta.push(`<span>${esc(location)}</span>`);
  if (headline) heroMeta.push(`<span>${esc(headline)}</span>`);

  const heroHTML = `
    <header class="hero animate-in">
      <div class="container">
        <h1 class="hero__name">${esc(name)}</h1>
        ${headline ? `<p class="hero__headline">${esc(headline)}</p>` : ''}
        ${heroMeta.length > 0 ? `
          <div class="hero__meta">
            ${heroMeta.join('<span class="hero__meta-sep"></span>')}
          </div>` : ''}
        ${heroLinks.length > 0 ? `
          <div class="hero__links">
            ${heroLinks.join('\n            ')}
          </div>` : ''}
      </div>
    </header>`;

  // About
  const aboutHTML = summaryText ? `
    <section id="about" class="animate-in">
      <div class="container">
        <h2 class="section__title">About</h2>
        <p class="about__text">${renderInlineMarkdown(summaryText)}</p>
        ${superpowers.length > 0 ? `
          <div class="about__superpowers">
            ${superpowers.map(s => `<span class="superpower-tag">${esc(s)}</span>`).join('\n            ')}
          </div>` : ''}
      </div>
    </section>` : '';

  // Recent highlights (if there's a separate recent engineering section)
  let recentHTML = '';
  if (recentBody) {
    const recentBullets = recentBody.split('\n')
      .filter(l => l.match(/^[-*]\s+/))
      .map(l => l.replace(/^[-*]\s*/, '').trim())
      .slice(0, 5);
    if (recentBullets.length > 0) {
      recentHTML = `
    <section id="recent" class="animate-in">
      <div class="container">
        <h2 class="section__title">Recent Highlights</h2>
        <ul class="highlights-list">
          ${recentBullets.map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('\n          ')}
        </ul>
      </div>
    </section>`;
    }
  }

  // Experience
  const experienceHTML = experience.length > 0 ? `
    <section id="experience" class="animate-in">
      <div class="container">
        <h2 class="section__title">Experience</h2>
        <ul class="exp-list">
          ${experience.slice(0, 5).map(exp => `
            <li class="exp-item">
              <div class="exp-company">${esc(exp.company)}${exp.location ? ` <span style="font-weight:400;color:var(--color-text-muted);font-size:0.85em">${esc(exp.location)}</span>` : ''}</div>
              ${exp.role ? `<div class="exp-role">${esc(exp.role)}</div>` : ''}
              ${exp.dateRange ? `<div class="exp-date">${esc(exp.dateRange)}</div>` : ''}
              ${exp.bullets.length > 0 ? `
                <ul class="exp-bullets">
                  ${exp.bullets.slice(0, 4).map(b => `<li>${renderInlineMarkdown(b)}</li>`).join('\n                  ')}
                </ul>` : ''}
            </li>`).join('')}
        </ul>
      </div>
    </section>` : '';

  // Projects
  const projectsHTML = projects.length > 0 ? `
    <section id="projects" class="animate-in">
      <div class="container">
        <h2 class="section__title">Projects</h2>
        <div class="projects-grid">
          ${projects.map(p => `
            <div class="project-card">
              <div class="project-card__name">${esc(p.name)}</div>
              ${p.heroMetric ? `<div class="project-card__metric">${esc(p.heroMetric)}</div>` : ''}
              ${p.description ? `<div class="project-card__desc">${p.description}</div>` : ''}
              ${p.url ? `<a href="${esc(p.url)}" class="project-card__link" target="_blank" rel="noopener">View project &#8599;</a>` : ''}
            </div>`).join('')}
        </div>
      </div>
    </section>` : '';

  // Skills
  // Merge skills from cv.md with superpowers from profile.yml (deduplicated)
  const allSkills = [...skills];
  for (const sp of superpowers) {
    if (!allSkills.some(s => s.toLowerCase() === sp.toLowerCase())) {
      allSkills.push(sp);
    }
  }

  const skillsHTML = allSkills.length > 0 ? `
    <section id="skills" class="animate-in">
      <div class="container">
        <h2 class="section__title">Skills</h2>
        <div class="skills-grid">
          ${allSkills.map(s => `<span class="skill-pill">${esc(s)}</span>`).join('\n          ')}
        </div>
      </div>
    </section>` : '';

  // Education
  const educationHTML = education.length > 0 ? `
    <section id="education" class="animate-in">
      <div class="container">
        <h2 class="section__title">Education</h2>
        <ul class="edu-list">
          ${education.map(e => `<li class="edu-item">${renderInlineMarkdown(e)}</li>`).join('\n          ')}
        </ul>
      </div>
    </section>` : '';

  // Footer
  const currentYear = new Date().getFullYear();
  const footerContactParts = [];
  if (email) footerContactParts.push(`<a href="mailto:${esc(email)}">${esc(email)}</a>`);
  if (linkedin) footerContactParts.push(`<a href="${esc(linkedinUrl)}" target="_blank" rel="noopener">LinkedIn</a>`);
  if (github) footerContactParts.push(`<a href="${esc(githubUrl)}" target="_blank" rel="noopener">GitHub</a>`);

  const footerHTML = `
    <footer>
      <div class="container">
        <div class="footer__inner">
          <div class="footer__contact">
            ${footerContactParts.join(' &middot; ')}
          </div>
          <p class="attribution">&copy; ${currentYear} ${esc(name)} &middot; Built with <a href="https://github.com/santifer/career-ops">Speedrun Career Ops</a></p>
        </div>
      </div>
    </footer>`;

  // -----------------------------------------------------------------------
  // Full HTML document
  // -----------------------------------------------------------------------

  return `<!DOCTYPE html>
<html lang="en"${theme === 'dark' ? ' data-theme="dark"' : ''}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(name)}${headline ? ` — ${esc(headline)}` : ''}</title>
  <meta name="description" content="${esc(summaryShort)}">
  <meta property="og:title" content="${esc(name)}${headline ? ` — ${esc(headline)}` : ''}">
  <meta property="og:description" content="${esc(summaryShort)}">
  <meta property="og:type" content="website">
  ${portfolioUrl ? `<meta property="og:url" content="${esc(portfolioUrl)}">` : ''}
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${esc(name)}${headline ? ` — ${esc(headline)}` : ''}">
  <meta name="twitter:description" content="${esc(summaryShort)}">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>&#x1f680;</text></svg>">
  <style>${css}</style>
</head>
<body>
  ${heroHTML}
  <main>
    ${aboutHTML}
    ${recentHTML}
    ${experienceHTML}
    ${projectsHTML}
    ${skillsHTML}
    ${educationHTML}
  </main>
  ${footerHTML}
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
