#!/usr/bin/env node

/**
 * combine-portfolio.mjs — Style x Layout combinator for portfolio generation.
 *
 * Merges a style module (colors, typography, fonts) with a layout module
 * (page structure, HTML generation) to produce a complete portfolio site.
 *
 * Usage:
 *   node combine-portfolio.mjs --style=bare --layout=scroll
 *   node combine-portfolio.mjs --style=bare --layout=scroll --output=dist
 *   node combine-portfolio.mjs --list-styles
 *   node combine-portfolio.mjs --list-layouts
 *   node combine-portfolio.mjs --all          # every combination -> dist-combos/STYLE-LAYOUT/
 *
 * No external dependencies beyond js-yaml (already in package.json).
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import { getStyle, listStyles } from './styles/registry.mjs';
import { getLayout, listLayouts } from './layouts/registry.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {
    style: null,
    layout: null,
    output: 'dist',
    listStyles: false,
    listLayouts: false,
    all: false,
    help: false,
  };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--style=')) args.style = arg.split('=').slice(1).join('=').toLowerCase();
    else if (arg.startsWith('--layout=')) args.layout = arg.split('=').slice(1).join('=').toLowerCase();
    else if (arg.startsWith('--output=')) args.output = arg.split('=').slice(1).join('=');
    else if (arg === '--list-styles') args.listStyles = true;
    else if (arg === '--list-layouts') args.listLayouts = true;
    else if (arg === '--all') args.all = true;
    else if (arg === '--help' || arg === '-h') args.help = true;
  }
  return args;
}

// ---------------------------------------------------------------------------
// File readers (copied from generate-portfolio.mjs)
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
// Markdown parsing (copied from generate-portfolio.mjs)
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
 */
function parseExperience(body) {
  if (!body) return [];
  const entries = [];
  const blocks = body.split(/^###\s+/m).filter(Boolean);

  for (const block of blocks) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    const companyLine = lines[0];
    const hasDashSep = companyLine.includes('--');
    const company = companyLine.replace(/\s*--\s*.*$/, '').replace(/\s*\([\d\s\w]+\)\s*$/, '').trim();
    const dashRole = hasDashSep ? companyLine.split('--').slice(1).join('--').trim() : '';

    const hasSubRoles = lines.some(l => l.startsWith('####'));

    if (hasSubRoles) {
      const subBlocks = block.split(/^####\s+/m).filter(Boolean);
      for (let s = 1; s < subBlocks.length; s++) {
        const subLines = subBlocks[s].split('\n').map(l => l.trim()).filter(Boolean);
        if (subLines.length === 0) continue;
        const role = subLines[0];
        let dateRange = '';
        const bullets = [];
        for (let i = 1; i < subLines.length; i++) {
          const line = subLines[i];
          const boldDateMatch = line.match(/^\*\*(.+?)\*\*$/);
          if (boldDateMatch && !dateRange) {
            dateRange = boldDateMatch[1].replace(/\s*\([^)]*\)\s*$/, '').trim();
            continue;
          }
          if (line.startsWith('-') || line.startsWith('*')) {
            bullets.push(line.replace(/^[-*]\s*/, ''));
            continue;
          }
          if (line.length < 50 && /^[A-Z]/.test(line) && (line.includes(',') || line.includes('Area'))) continue;
          if (line.length > 10) {
            bullets.push(line);
          }
        }
        entries.push({ company, location: '', role, dateRange, bullets });
      }
    } else {
      let role = dashRole;
      let dateRange = '';
      const bullets = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const h4Match = line.match(/^####\s+(.+)/);
        if (h4Match && !role) { role = h4Match[1]; continue; }
        const boldMatch = line.match(/^\*\*(.+?)\*\*$/);
        if (boldMatch) {
          if (/\d{4}/.test(boldMatch[1])) {
            if (!dateRange) dateRange = boldMatch[1].replace(/\s*\([^)]*\)\s*$/, '').trim();
          } else if (!role) {
            role = boldMatch[1];
          }
          continue;
        }
        const dateMatch = line.match(/^(\d{4}\s*[-–]\s*(?:\d{4}|[Pp]resent)|\w+\s+\d{4}\s*[-–]\s*(?:\w+\s+\d{4}|[Pp]resent))/);
        if (dateMatch && !dateRange) {
          dateRange = dateMatch[1].replace(/[-–]/, ' - ');
          continue;
        }
        if (line.startsWith('-') || line.startsWith('*')) {
          bullets.push(line.replace(/^[-*]\s*/, ''));
          continue;
        }
        if (line.length < 50 && /^[A-Z]/.test(line) && (line.includes(',') || line.includes('Area'))) continue;
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
    if (line.match(/^#{1,4}\s+/)) {
      entries.push(line.replace(/^#{1,4}\s+/, ''));
    } else if (line.startsWith('-') || line.startsWith('*')) {
      const text = line.replace(/^[-*]\s*/, '');
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
 */
function parseSkills(body) {
  if (!body) return [];
  const skills = [];
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);

  for (const line of lines) {
    let clean = line.replace(/^[-*]\s*/, '').replace(/\*\*/g, '');

    const colonIdx = clean.indexOf(':');
    if (colonIdx > 0 && colonIdx < 30) {
      clean = clean.slice(colonIdx + 1).trim();
    }
    clean = clean.replace(/(?<=^|[.,]\s*)(?:[A-Z][\w]+(?:\s+\w+){0,2}):\s*/g, '');
    clean = clean.replace(/\.\s+/g, ', ');

    const masked = [];
    clean = clean.replace(/\([^)]*\)/g, (match) => {
      const token = `\x00P${masked.length}\x00`;
      masked.push(match);
      return token;
    });

    let items = clean.split(/,\s*/).map(s => s.trim()).filter(Boolean);
    items = items.map(s => s.replace(/\x00P(\d+)\x00/g, (_, n) => masked[Number(n)]));

    for (let item of items) {
      item = item.replace(/\.\s*$/, '');
      item = item.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
      if (item.split(/\s+/).length > 5) continue;
      if (/^(I |and |or |the |but |that |which |who )/i.test(item)) continue;
      if (item.length < 2) continue;
      skills.push(item);
    }
  }

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

/**
 * Parse projects from cv.md Projects section and/or article-digest.md.
 */
function parseProjects(projectsBody, articleDigest, profileProofPoints) {
  const projects = [];

  if (projectsBody) {
    const lines = projectsBody.split('\n');
    for (const line of lines) {
      if (line.match(/^[-*]\s+/)) {
        const text = line.replace(/^[-*]\s*/, '');
        const nameMatch = text.match(/^`([^`]+)`|^\*\*([^*]+)\*\*/);
        let name, desc;
        if (nameMatch) {
          name = nameMatch[1] || nameMatch[2];
          desc = text.slice(nameMatch[0].length).replace(/^\s*[-–—()]\s*/, '').trim();
        } else {
          const sepIdx = text.search(/\s+[-–—]{1,2}\s+/);
          if (sepIdx > 0) {
            name = text.slice(0, sepIdx).trim();
            desc = text.slice(sepIdx).replace(/^\s*[-–—]+\s*/, '').trim();
          } else {
            name = text;
            desc = '';
          }
        }
        const metricMatch = desc.match(/(\d[\d,.]*[KkMm]?\+?\s*(?:stars|users|downloads|docs\/min|events\/month|alumni|contributors|developers|views|hours))/i);
        const heroMetric = metricMatch ? metricMatch[0] : '';
        const urlMatch = desc.match(/\[([^\]]*)\]\(([^)]+)\)/);
        const url = urlMatch ? urlMatch[2] : '';
        projects.push({ name, description: renderInlineMarkdown(desc), heroMetric, url });
      }
    }
  }

  if (articleDigest) {
    const digestLines = articleDigest.split('\n');
    let currentProject = null;
    for (const line of digestLines) {
      const h2 = line.match(/^##\s+(.+)/);
      const h3 = line.match(/^###\s+(.+)/);
      if (h2 || h3) {
        const heading = (h2 || h3)[1].trim();
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

  if (profileProofPoints && Array.isArray(profileProofPoints)) {
    for (const pp of profileProofPoints) {
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

// ---------------------------------------------------------------------------
// Data extraction (copied from generate-portfolio.mjs)
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
// Page builder — wraps layout HTML in a full document with style
// ---------------------------------------------------------------------------

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort }) {
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
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Generate one style x layout combination
// ---------------------------------------------------------------------------

async function generateCombo({ style, layout, data, outputDir }) {
  const styleCSS = style.css();
  const layoutCSS = layout.css();
  const fonts = style.fonts || [];
  const pages = layout.pages(data);

  await mkdir(outputDir, { recursive: true });
  let total = 0;
  const fileCount = Object.keys(pages).length;

  for (const [filename, body] of Object.entries(pages)) {
    // Determine page title from filename
    const pageName = filename.replace('.html', '');
    const pageTitle = pageName === 'index'
      ? data.name
      : `${pageName.charAt(0).toUpperCase() + pageName.slice(1)} — ${data.name}`;

    const html = buildPage({
      title: pageTitle,
      styleCSS,
      layoutCSS,
      fonts,
      body,
      summaryShort: data.summaryShort,
    });

    await writeFile(resolve(outputDir, filename), html, 'utf-8');
    const sz = Buffer.byteLength(html, 'utf-8');
    total += sz;
    console.log(`    ${filename} (${(sz / 1024).toFixed(1)} KB)`);
  }

  return { fileCount, totalBytes: total };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const args = parseArgs(process.argv);

  // --help
  if (args.help) {
    console.log(`Usage: node combine-portfolio.mjs [options]

Options:
  --style=NAME       Style module to use (from styles/)
  --layout=NAME      Layout module to use (from layouts/)
  --output=DIR       Output directory (default: dist)
  --list-styles      List available style modules
  --list-layouts     List available layout modules
  --all              Generate every style x layout combination into dist-combos/
  -h, --help         Show this help`);
    process.exit(0);
  }

  // --list-styles
  if (args.listStyles) {
    let styles;
    try {
      styles = await listStyles();
    } catch (err) {
      console.error(`ERROR loading styles: ${err.message}`);
      process.exit(1);
    }
    if (styles.length === 0) {
      console.log('No style modules found in styles/');
    } else {
      console.log('Available styles:');
      for (const s of styles) console.log(`  ${s}`);
    }
    process.exit(0);
  }

  // --list-layouts
  if (args.listLayouts) {
    let layouts;
    try {
      layouts = await listLayouts();
    } catch (err) {
      console.error(`ERROR loading layouts: ${err.message}`);
      process.exit(1);
    }
    if (layouts.length === 0) {
      console.log('No layout modules found in layouts/');
    } else {
      console.log('Available layouts:');
      for (const l of layouts) console.log(`  ${l}`);
    }
    process.exit(0);
  }

  // Load candidate data
  console.log('Combine Portfolio (style x layout combinator)\n');
  const [profile, cvRaw, articleDigest] = await Promise.all([readProfile(), readCV(), readArticleDigest()]);
  const sections = parseSections(cvRaw);
  console.log(`  Sections: ${[...sections.keys()].filter(k => k !== '_preamble').join(', ')}`);
  console.log(`  article-digest.md: ${articleDigest ? 'found' : 'not found (skipping)'}\n`);
  const data = extractTemplateData({ profile, sections, articleDigest });

  // --all: generate every combination
  if (args.all) {
    let styleNames, layoutNames;
    try {
      styleNames = await listStyles();
    } catch (err) {
      console.error(`ERROR loading styles: ${err.message}`);
      process.exit(1);
    }
    try {
      layoutNames = await listLayouts();
    } catch (err) {
      console.error(`ERROR loading layouts: ${err.message}`);
      process.exit(1);
    }

    if (styleNames.length === 0) {
      console.error('ERROR: No style modules found in styles/. Create at least one style .mjs file.');
      process.exit(1);
    }
    if (layoutNames.length === 0) {
      console.error('ERROR: No layout modules found in layouts/. Create at least one layout .mjs file.');
      process.exit(1);
    }

    const combosDir = resolve(__dirname, 'dist-combos');
    console.log(`  Generating ${styleNames.length} styles x ${layoutNames.length} layouts = ${styleNames.length * layoutNames.length} combinations\n`);

    let totalCombos = 0;
    for (const sName of styleNames) {
      const style = await getStyle(sName);
      for (const lName of layoutNames) {
        const layout = await getLayout(lName);
        const outDir = resolve(combosDir, `${sName}-${lName}`);
        console.log(`  [${sName} x ${lName}]`);
        const { fileCount, totalBytes } = await generateCombo({ style, layout, data, outputDir: outDir });
        console.log(`    ${fileCount} pages, ${(totalBytes / 1024).toFixed(1)} KB\n`);
        totalCombos++;
      }
    }

    console.log(`  ${totalCombos} combinations generated in ${combosDir}/`);
    process.exit(0);
  }

  // Single combination: require both --style and --layout
  if (!args.style || !args.layout) {
    console.error('ERROR: Both --style and --layout are required.\n');
    console.error('Usage: node combine-portfolio.mjs --style=NAME --layout=NAME');
    console.error('       node combine-portfolio.mjs --list-styles');
    console.error('       node combine-portfolio.mjs --list-layouts');
    console.error('       node combine-portfolio.mjs --all');
    process.exit(1);
  }

  // Load style
  let style;
  try {
    style = await getStyle(args.style);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }

  // Load layout
  let layout;
  try {
    layout = await getLayout(args.layout);
  } catch (err) {
    console.error(`ERROR: ${err.message}`);
    process.exit(1);
  }

  const outputDir = resolve(__dirname, args.output);
  console.log(`  Style: ${args.style}`);
  console.log(`  Layout: ${args.layout}`);
  console.log(`  Output: ${outputDir}/\n`);

  const { fileCount, totalBytes } = await generateCombo({ style, layout, data, outputDir });

  console.log(`\n  ${fileCount} pages, ${(totalBytes / 1024).toFixed(1)} KB total`);
  console.log(`  Style: ${args.style} | Layout: ${args.layout}`);
  console.log(`\n  open ${resolve(outputDir, 'index.html')}`);
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
