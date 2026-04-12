/**
 * lib/parse-data.mjs — Single source of truth for CV/profile parsing
 *
 * Extracted from generate-portfolio.mjs. Used by both generate-portfolio.mjs
 * and combine-portfolio.mjs.
 */

// ---------------------------------------------------------------------------
// Markdown parsing
// ---------------------------------------------------------------------------

/**
 * Split cv.md into named sections keyed by heading text (lowercased).
 * Returns Map<string, string> where the value is the raw body text under that heading.
 */
export function parseSections(md) {
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
export function parseExperience(body) {
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
export function parseEducation(body) {
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
export function parseSkills(body) {
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
export function renderInlineMarkdown(text) {
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
export function esc(str) {
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
export function parseProjects(projectsBody, articleDigest, profileProofPoints) {
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
export function groupByCompany(entries) {
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
 * Extract all template data from profile + parsed CV sections.
 */
export function extractTemplateData({ profile, sections, articleDigest }) {
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

  // Extended profile data (portfolio content modules)
  const educationDetail = profile?.education_detail || {};
  const activities = profile?.preferences?.activities || [];
  const research = profile?.preferences?.research || [];
  const profileProjects = profile?.preferences?.projects || [];
  const testimonials = profile?.preferences?.testimonials || [];
  const values = profile?.preferences?.values || [];
  const nowText = profile?.preferences?.now || '';
  const talks = profile?.preferences?.talks || [];
  const tools = profile?.preferences?.tools || [];
  const gallery = profile?.preferences?.gallery || [];
  const reading = profile?.preferences?.reading || [];
  const showEducationDetail = c.type === 'student' || c.type === 'early_career';
  const sectionOrder = profile?.preferences?.section_order || null;

  return {
    name, headline, location, email, linkedin, github,
    summaryText, summaryShort, exitStory, currentProject, homeBio,
    superpowers, proofPoints, targetRoles, locationFlex,
    experience, education, skills, projects, experienceGroups,
    educationDetail, activities, research, profileProjects,
    testimonials, values, nowText, talks, tools, gallery, reading,
    showEducationDetail, sectionOrder,
    esc, renderInlineMarkdown,
  };
}
