#!/usr/bin/env node

/**
 * generate-portfolio.mjs — Static portfolio site generator
 *
 * Reads candidate data files and generates a multi-page portfolio
 * website with all CSS inlined. Supports 8 templates.
 * No external dependencies beyond js-yaml (already in package.json).
 *
 * Usage:
 *   node generate-portfolio.mjs [--output=dist] [--template=ink] [--theme=dark|light]
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { getTemplate, listTemplates } from './templates/registry.mjs';
import { getStyle, listStyles } from './styles/registry.mjs';
import { getLayout, listLayouts } from './layouts/registry.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = { output: 'dist', theme: 'light', template: 'ink', style: '', layout: '' };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--output=')) args.output = arg.split('=').slice(1).join('=');
    else if (arg.startsWith('--theme=')) args.theme = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--template=')) args.template = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--style=')) args.style = arg.split('=')[1].toLowerCase();
    else if (arg.startsWith('--layout=')) args.layout = arg.split('=')[1].toLowerCase();
    else if (arg === '--help' || arg === '-h') {
      console.log('Usage: node generate-portfolio.mjs [--output=dist] [--template=ink]');
      console.log('       node generate-portfolio.mjs --style=ink --layout=multipage [--output=dist]');
      console.log('\nStyle x Layout combinatorial system:');
      console.log('  --style=X    Visual style (colors, fonts, spacing)');
      console.log('  --layout=Y   HTML structure (multipage, sidebar, scroll, bands, centered, cards, sidebar-right, spread)');
      console.log('  --template=X Backward-compat: uses monolithic template from templates/');
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
    // "Company -- Role" format: part after -- is the role for single-role entries, not location
    const hasDashSep = companyLine.includes('--');
    const company = companyLine.replace(/\s*--\s*.*$/, '').replace(/\s*\([\d\s\w]+\)\s*$/, '').trim();
    const dashRole = hasDashSep ? companyLine.split('--').slice(1).join('--').trim() : '';

    // Check if block has #### sub-roles
    const hasSubRoles = lines.some(l => l.startsWith('####'));

    if (hasSubRoles) {
      // Split into sub-role blocks on ####
      const subBlocks = block.split(/^####\s+/m).filter(Boolean);
      // First sub-block is the company header line, skip it
      for (let s = 1; s < subBlocks.length; s++) {
        const subLines = subBlocks[s].split('\n').map(l => l.trim()).filter(Boolean);
        if (subLines.length === 0) continue;
        const role = subLines[0];
        let dateRange = '';
        const bullets = [];
        for (let i = 1; i < subLines.length; i++) {
          const line = subLines[i];
          // Date in bold: **Month YYYY - Month YYYY (duration)**
          const boldDateMatch = line.match(/^\*\*(.+?)\*\*$/);
          if (boldDateMatch && !dateRange) {
            // Extract just the date part, strip duration in parens
            dateRange = boldDateMatch[1].replace(/\s*\([^)]*\)\s*$/, '').trim();
            continue;
          }
          // Bullet points
          if (line.startsWith('-') || line.startsWith('*')) {
            bullets.push(line.replace(/^[-*]\s*/, ''));
            continue;
          }
          // Skip short location-like lines
          if (line.length < 50 && /^[A-Z]/.test(line) && (line.includes(',') || line.includes('Area'))) continue;
          // Non-bullet paragraph text — include as content
          if (line.length > 10) {
            bullets.push(line);
          }
        }
        entries.push({ company, location: '', role, dateRange, bullets });
      }
    } else {
      // Single role at this company
      let role = dashRole; // from "Company -- Role" format
      let dateRange = '';
      const bullets = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        // Role in #### heading
        const h4Match = line.match(/^####\s+(.+)/);
        if (h4Match && !role) { role = h4Match[1]; continue; }
        // Bold text: could be date or role
        const boldMatch = line.match(/^\*\*(.+?)\*\*$/);
        if (boldMatch) {
          if (/\d{4}/.test(boldMatch[1])) {
            if (!dateRange) dateRange = boldMatch[1].replace(/\s*\([^)]*\)\s*$/, '').trim();
          } else if (!role) {
            role = boldMatch[1];
          }
          continue;
        }
        // Date line
        const dateMatch = line.match(/^(\d{4}\s*[-–]\s*(?:\d{4}|[Pp]resent)|\w+\s+\d{4}\s*[-–]\s*(?:\w+\s+\d{4}|[Pp]resent))/);
        if (dateMatch && !dateRange) {
          dateRange = dateMatch[1].replace(/[-–]/, ' - ');
          continue;
        }
        // Bullet points
        if (line.startsWith('-') || line.startsWith('*')) {
          bullets.push(line.replace(/^[-*]\s*/, ''));
          continue;
        }
        // Skip short location-like lines (city, state)
        if (line.length < 50 && /^[A-Z]/.test(line) && (line.includes(',') || line.includes('Area'))) continue;
        // Non-bullet paragraph text — include as a bullet (it's still content)
        if (line.length > 10) {
          bullets.push(line);
        }
      }
      entries.push({ company, location: '', role, dateRange, bullets });
    }
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
    // Get candidate name for filtering metadata headings
    const candidateName = profileProofPoints?.[0]?.name ? '' : '';
    for (const line of digestLines) {
      const h2 = line.match(/^##\s+(.+)/);
      const h3 = line.match(/^###\s+(.+)/);
      if (h2 || h3) {
        const heading = (h2 || h3)[1].trim();
        // Skip metadata/header lines that aren't real projects
        const isMetadata = /proof\s*points|article\s*digest|compact\s*proof|cv\s*and\s*evaluation|for\s*cv\s*/i.test(heading);
        if (isMetadata) continue;
        if (currentProject) projects.push(currentProject);
        currentProject = { name: heading, description: '', heroMetric: '', url: '' };
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
 * Group consecutive experience entries by company name.
 * Returns an array of { company, roles: [{ role, dateRange, bullets }] }.
 */
function groupByCompany(entries) {
  const groups = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (last && last.company === entry.company) {
      last.roles.push({ role: entry.role, dateRange: entry.dateRange, bullets: entry.bullets });
    } else {
      groups.push({ company: entry.company, location: entry.location, roles: [{ role: entry.role, dateRange: entry.dateRange, bullets: entry.bullets }] });
    }
  }
  return groups;
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
// Data extraction — builds template data object from profile + parsed CV
// ---------------------------------------------------------------------------

function extractTemplateData({ profile, sections, articleDigest }) {
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
  const homeBio = n.home_bio || '';
  const targetRoles = profile.target_roles?.primary || [];
  const locationFlex = profile.compensation?.location_flexibility || '';
  const sum = sections.get('professional summary') || sections.get('summary') || sections.get('about') || sections.get('_preamble') || '';
  const summaryText = sum.split('\n\n')[0].replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();
  const summaryShort = summaryText.slice(0, 160).replace(/\s+\S*$/, '') + (summaryText.length > 160 ? '...' : '');
  const experience = parseExperience(sections.get('work experience') || sections.get('experience') || '');
  const education = parseEducation(sections.get('education') || '');
  const skills = parseSkills(sections.get('skills') || '');
  // Only use real projects from cv.md Projects section. Article-digest proof points
  // are resume highlights, not standalone projects — they duplicate experience content.
  // If there's no Projects section in cv.md, projects array will be empty and
  // templates should skip the Work page entirely.
  const projectsBody = sections.get('projects') || '';
  const projects = projectsBody ? parseProjects(projectsBody, null, proofPoints) : [];
  const experienceGroups = groupByCompany(experience);

  return {
    name, headline, location, email, linkedin, github,
    summaryText, summaryShort, exitStory, currentProject, homeBio,
    superpowers, proofPoints, targetRoles, locationFlex,
    experience, education, skills, projects, experienceGroups,
    esc, renderInlineMarkdown,
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Style x Layout combinator: wraps layout HTML with style CSS + fonts
// ---------------------------------------------------------------------------

function buildComboPage({ title, body, summaryShort, styleFonts, styleCss, layoutCss }) {
  const esc = s => !s ? '' : String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  const fontLinks = styleFonts.map(f =>
    `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="${f}" rel="stylesheet">`
  ).join('\n');
  // Layout CSS first (structural), then style CSS (visual overrides)
  const combinedCss = `/* === LAYOUT === */\n${layoutCss}\n/* === STYLE === */\n${styleCss}`;
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
<style>${combinedCss}</style>
</head>
<body>
${body}
</body>
</html>`;
}

async function main() {
  const args = parseArgs(process.argv);
  const outputDir = resolve(__dirname, args.output);

  // Determine mode: style+layout combo vs monolithic template
  const useCombo = !!(args.style || args.layout);

  if (useCombo) {
    // ---------- STYLE x LAYOUT MODE ----------
    const styleName = args.style || 'ink';
    const layoutName = args.layout || 'multipage';

    console.log('Portfolio generator (style x layout combinatorial system)');
    console.log(`  Style: ${styleName}`);
    console.log(`  Layout: ${layoutName}`);
    console.log(`  Output: ${outputDir}/\n`);

    let style, layout;
    try {
      style = await getStyle(styleName);
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
      const available = await listStyles();
      console.error(`Available styles: ${available.join(', ')}`);
      process.exit(1);
    }
    try {
      layout = await getLayout(layoutName);
    } catch (err) {
      console.error(`ERROR: ${err.message}`);
      const available = await listLayouts();
      console.error(`Available layouts: ${available.join(', ')}`);
      process.exit(1);
    }

    const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
    const sections = parseSections(cvRaw);
    console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
    console.log(`  article-digest.md: ${articleDigest ? 'found' : 'not found (skipping)'}\n`);

    const data = extractTemplateData({ profile, sections, articleDigest });

    // Layout generates raw HTML body fragments (keyed by filename)
    const rawPages = layout.pages(data);
    const styleCss = style.css();
    const layoutCss = layout.css();

    await mkdir(outputDir, { recursive: true });
    let total = 0;
    for (const [f, bodyHtml] of Object.entries(rawPages)) {
      const pageTitle = f === 'index.html' ? data.name : `${f.replace('.html', '').replace(/^./, c => c.toUpperCase())} \u2014 ${data.name}`;
      const html = buildComboPage({
        title: pageTitle,
        body: bodyHtml,
        summaryShort: data.summaryShort,
        styleFonts: style.fonts,
        styleCss,
        layoutCss,
      });
      await writeFile(resolve(outputDir, f), html, 'utf-8');
      const sz = Buffer.byteLength(html, 'utf-8');
      total += sz;
      console.log(`  ${f} (${(sz / 1024).toFixed(1)} KB)`);
    }
    console.log(`\n  ${Object.keys(rawPages).length} pages, ${(total / 1024).toFixed(1)} KB total`);
    console.log(`  Style: ${styleName} | Layout: ${layoutName}`);
    console.log(`\n  open ${resolve(outputDir, 'index.html')}`);

  } else {
    // ---------- MONOLITHIC TEMPLATE MODE (backward compat) ----------
    const templateName = args.template;

    console.log('Portfolio generator (multi-page, template system)');
    console.log(`  Template: ${templateName}`);
    console.log(`  Output: ${outputDir}/\n`);

    // Try monolithic template first, then fall back to style+multipage
    let template;
    try {
      template = await getTemplate(templateName);
    } catch {
      // Check if templateName matches a style name — use style + multipage layout
      try {
        const style = await getStyle(templateName);
        const layout = await getLayout('multipage');
        const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
        const sections = parseSections(cvRaw);
        console.log(`  (using style "${templateName}" + layout "multipage")`);
        console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}\n`);
        const data = extractTemplateData({ profile, sections, articleDigest });
        const rawPages = layout.pages(data);
        const styleCss = style.css();
        const layoutCss = layout.css();
        await mkdir(outputDir, { recursive: true });
        let total = 0;
        for (const [f, bodyHtml] of Object.entries(rawPages)) {
          const pageTitle = f === 'index.html' ? data.name : `${f.replace('.html', '').replace(/^./, c => c.toUpperCase())} \u2014 ${data.name}`;
          const html = buildComboPage({ title: pageTitle, body: bodyHtml, summaryShort: data.summaryShort, styleFonts: style.fonts, styleCss, layoutCss });
          await writeFile(resolve(outputDir, f), html, 'utf-8');
          const sz = Buffer.byteLength(html, 'utf-8');
          total += sz;
          console.log(`  ${f} (${(sz / 1024).toFixed(1)} KB)`);
        }
        console.log(`\n  ${Object.keys(rawPages).length} pages, ${(total / 1024).toFixed(1)} KB total`);
        console.log(`  Style: ${templateName} | Layout: multipage`);
        console.log(`\n  open ${resolve(outputDir, 'index.html')}`);
        return;
      } catch {
        const available = await listTemplates();
        const styles = await listStyles();
        console.error(`Unknown template/style "${templateName}".`);
        console.error(`Templates: ${available.join(', ')}`);
        console.error(`Styles: ${styles.join(', ')}`);
        process.exit(1);
      }
    }

    const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
    const sections = parseSections(cvRaw);
    console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
    console.log(`  article-digest.md: ${articleDigest ? 'found' : 'not found (skipping)'}\n`);

    const data = extractTemplateData({ profile, sections, articleDigest });
    const pages = template.pages(data);

    await mkdir(outputDir, { recursive: true });
    let total = 0;
    for (const [f, html] of Object.entries(pages)) {
      await writeFile(resolve(outputDir, f), html, 'utf-8');
      const sz = Buffer.byteLength(html, 'utf-8');
      total += sz;
      console.log(`  ${f} (${(sz / 1024).toFixed(1)} KB)`);
    }
    console.log(`\n  ${Object.keys(pages).length} pages, ${(total / 1024).toFixed(1)} KB total`);
    console.log(`  Template: ${templateName}`);
    console.log(`\n  open ${resolve(outputDir, 'index.html')}`);
  }
}

// Export data extraction utilities for use in templates and tests
export {
  parseSections, parseExperience, parseEducation, parseSkills,
  parseProjects, groupByCompany, renderInlineMarkdown, esc,
  extractTemplateData,
};

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
