#!/usr/bin/env node

/**
 * test-portfolio.mjs — Full test suite for portfolio system
 *
 * Contract tests, layout tests, combo generation tests, and data parsing tests.
 */

import { listStyles, getStyle } from './styles/registry.mjs';
import { listLayouts, getLayout } from './layouts/registry.mjs';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import {
  parseSections, parseExperience, parseEducation, parseSkills,
  parseProjects, groupByCompany, extractTemplateData,
  renderInlineMarkdown, esc,
} from './lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

let passed = 0;
let failed = 0;

function assert(condition, name) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.log(`  FAIL  ${name}`);
  }
}

function assertEq(actual, expected, name) {
  if (actual === expected) {
    passed++;
  } else {
    failed++;
    console.log(`  FAIL  ${name}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// ---------------------------------------------------------------------------
// Required custom properties for styles
// ---------------------------------------------------------------------------

const REQUIRED_ROOT_PROPS = [
  '--bg', '--bg-alt', '--bg-card', '--bg-nav',
  '--text', '--text-muted', '--text-faint',
  '--accent', '--accent-hover',
  '--border', '--border-light',
  '--font-display', '--font-body', '--font-mono',
  '--wrap-width', '--nav-height',
  '--footer-text', '--footer-link', '--footer-link-hover', '--footer-border',
];

function extractRootVars(css) {
  const vars = new Map();
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) return vars;
  const block = rootMatch[1];
  const decls = block.split(';').map(d => d.trim()).filter(Boolean);
  for (const decl of decls) {
    const cleaned = decl.replace(/\/\*.*?\*\//g, '').trim();
    if (!cleaned) continue;
    const colonIdx = cleaned.indexOf(':');
    if (colonIdx > 0) {
      vars.set(cleaned.slice(0, colonIdx).trim(), cleaned.slice(colonIdx + 1).trim());
    }
  }
  return vars;
}

// ---------------------------------------------------------------------------
// 1. Contract tests for styles
// ---------------------------------------------------------------------------

async function testStyleContracts() {
  console.log('\n--- Style Contract Tests ---');
  const names = await listStyles();
  assert(names.length > 0, 'At least one style exists');

  for (const name of names) {
    const style = await getStyle(name);
    assert(typeof style.name === 'string' && style.name.length > 0, `${name}: exports name`);
    assert(Array.isArray(style.fonts), `${name}: exports fonts array`);
    assert(typeof style.css === 'function', `${name}: exports css()`);

    const css = style.css();
    assert(typeof css === 'string' && css.length > 0, `${name}: css() returns non-empty string`);

    const rootVars = extractRootVars(css);
    for (const prop of REQUIRED_ROOT_PROPS) {
      assert(rootVars.has(prop), `${name}: has ${prop} in :root`);
    }

    // nav-height must not be auto
    const navHeight = rootVars.get('--nav-height');
    assert(navHeight !== 'auto', `${name}: --nav-height is not auto (is ${navHeight})`);

    // bg-nav must not be transparent on dark styles
    const bg = rootVars.get('--bg') || '';
    const bgNav = rootVars.get('--bg-nav') || '';
    const isDark = bg.match(/#[0-2][0-9a-f]{5}/i) || bg === '#000' || bg.match(/#0[0-9a-f]/i);
    if (isDark) {
      assert(bgNav !== 'transparent', `${name}: --bg-nav is not transparent on dark bg`);
    }
  }
}

// ---------------------------------------------------------------------------
// 2. Layout tests
// ---------------------------------------------------------------------------

async function testLayoutContracts() {
  console.log('\n--- Layout Contract Tests ---');
  const names = await listLayouts();
  assert(names.length > 0, 'At least one layout exists');

  // Mock data for testing
  const mockData = {
    name: 'Test Person',
    headline: 'Software Engineer',
    location: 'San Francisco, CA',
    email: 'test@example.com',
    linkedin: 'https://linkedin.com/in/test',
    github: 'https://github.com/test',
    summaryText: 'A skilled software engineer with 10 years of experience.',
    summaryShort: 'A skilled software engineer...',
    exitStory: '',
    currentProject: '',
    homeBio: '<p>Hello world.</p>',
    superpowers: ['Leadership', 'Architecture'],
    proofPoints: [],
    targetRoles: ['Senior Engineer'],
    locationFlex: 'Remote',
    experience: [
      { company: 'Acme Corp', location: '', role: 'Engineer', dateRange: '2020 - Present', bullets: ['Built things', 'Led teams'] },
    ],
    education: ['BS Computer Science, MIT'],
    skills: ['TypeScript', 'Python', 'Go'],
    projects: [],
    experienceGroups: [
      { company: 'Acme Corp', location: '', roles: [{ role: 'Engineer', dateRange: '2020 - Present', bullets: ['Built things', 'Led teams'] }] },
    ],
    educationDetail: {},
    activities: [],
    research: [],
    profileProjects: [],
    testimonials: [],
    values: [],
    nowText: '',
    talks: [],
    tools: [],
    gallery: [],
    reading: [],
    showEducationDetail: false,
    sectionOrder: null,
    esc,
    renderInlineMarkdown,
  };

  for (const name of names) {
    const layout = await getLayout(name);
    assert(typeof layout.name === 'string' && layout.name.length > 0, `${name}: exports name`);
    assert(typeof layout.description === 'string', `${name}: exports description`);
    assert(typeof layout.css === 'function', `${name}: exports css()`);
    assert(typeof layout.pages === 'function', `${name}: exports pages()`);

    const css = layout.css();
    assert(typeof css === 'string' && css.length > 0, `${name}: css() returns non-empty string`);

    const pages = layout.pages(mockData);
    assert(typeof pages === 'object' && pages !== null, `${name}: pages() returns object`);
    assert('index.html' in pages, `${name}: pages() returns index.html`);

    // Check all pages contain 'made by' footer
    for (const [filename, html] of Object.entries(pages)) {
      assert(
        html.includes('made by') && html.includes('speedrun'),
        `${name}/${filename}: contains "made by speedrun" footer`
      );
      assert(
        html.includes('footer'),
        `${name}/${filename}: contains footer element`
      );
    }
  }
}

// ---------------------------------------------------------------------------
// 3. Combo generation tests
// ---------------------------------------------------------------------------

async function testComboGeneration() {
  console.log('\n--- Combo Generation Tests ---');

  const mockData = {
    name: 'Test Person',
    headline: 'Engineer',
    location: 'NYC',
    email: 'test@example.com',
    linkedin: '',
    github: '',
    summaryText: 'Test summary.',
    summaryShort: 'Test summary.',
    exitStory: '',
    currentProject: '',
    homeBio: '<p>Hello.</p>',
    superpowers: [],
    proofPoints: [],
    targetRoles: [],
    locationFlex: '',
    experience: [
      { company: 'TestCo', location: '', role: 'Dev', dateRange: '2023 - Present', bullets: ['Coded'] },
    ],
    education: ['BS CS'],
    skills: ['JS'],
    projects: [],
    experienceGroups: [
      { company: 'TestCo', location: '', roles: [{ role: 'Dev', dateRange: '2023 - Present', bullets: ['Coded'] }] },
    ],
    educationDetail: {},
    activities: [],
    research: [],
    profileProjects: [],
    testimonials: [],
    values: [],
    nowText: '',
    talks: [],
    tools: [],
    gallery: [],
    reading: [],
    showEducationDetail: false,
    sectionOrder: null,
    esc,
    renderInlineMarkdown,
  };

  // bare-multipage produces valid HTML
  const bare = await getStyle('bare');
  const multipage = await getLayout('multipage');
  const pages = multipage.pages(mockData);
  assert(Object.keys(pages).length >= 1, 'bare-multipage: produces at least 1 page');
  assert(pages['index.html'].includes('Test Person'), 'bare-multipage: index contains name');

  // void-scroll produces HTML with dark mode vars
  const voidStyle = await getStyle('void');
  const scroll = await getLayout('scroll');
  const voidCss = voidStyle.css();
  assert(voidCss.includes('--bg:') && voidCss.includes('#'), 'void-scroll: dark mode vars present');
  const scrollPages = scroll.pages(mockData);
  assert('index.html' in scrollPages, 'void-scroll: produces index.html');

  // Empty data (no experience) doesn't crash
  const emptyData = {
    ...mockData,
    experience: [],
    experienceGroups: [],
    education: [],
    skills: [],
    projects: [],
    superpowers: [],
    homeBio: '',
    summaryText: '',
    summaryShort: '',
  };

  for (const layoutName of ['multipage', 'scroll', 'centered', 'bands']) {
    try {
      const layout = await getLayout(layoutName);
      const result = layout.pages(emptyData);
      assert('index.html' in result, `empty data: ${layoutName} produces index.html`);
    } catch (e) {
      assert(false, `empty data: ${layoutName} crashed: ${e.message}`);
    }
  }
}

// ---------------------------------------------------------------------------
// 4. Data parsing tests
// ---------------------------------------------------------------------------

async function testDataParsing() {
  console.log('\n--- Data Parsing Tests ---');

  // parseSections
  const md = `## Summary\nHello world\n\n## Experience\n### Acme\nDid stuff\n\n## Education\n### MIT\nBS CS`;
  const sections = parseSections(md);
  assert(sections.has('summary'), 'parseSections: has summary');
  assert(sections.has('experience'), 'parseSections: has experience');
  assert(sections.has('education'), 'parseSections: has education');

  // parseExperience - single role
  const singleExp = `### Acme Corp -- Senior Engineer\n**January 2020 - Present**\n- Built the platform\n- Led 5 engineers`;
  const entries = parseExperience(singleExp);
  assertEq(entries.length, 1, 'parseExperience single: 1 entry');
  assertEq(entries[0].company, 'Acme Corp', 'parseExperience single: company');
  assertEq(entries[0].role, 'Senior Engineer', 'parseExperience single: role');
  assert(entries[0].bullets.length === 2, 'parseExperience single: 2 bullets');

  // parseExperience - multi-role (#### sub-roles)
  const multiExp = `### BigCo\n#### Senior Engineer\n**2022 - Present**\n- Led team\n#### Engineer\n**2020 - 2022**\n- Wrote code`;
  const multiEntries = parseExperience(multiExp);
  assertEq(multiEntries.length, 2, 'parseExperience multi: 2 entries');
  assertEq(multiEntries[0].company, 'BigCo', 'parseExperience multi: company');
  assertEq(multiEntries[0].role, 'Senior Engineer', 'parseExperience multi: role 1');
  assertEq(multiEntries[1].role, 'Engineer', 'parseExperience multi: role 2');

  // parseExperience - dash format
  const dashExp = `### StartupCo -- CTO\n**2019 - 2021**\n- Founded tech team`;
  const dashEntries = parseExperience(dashExp);
  assertEq(dashEntries.length, 1, 'parseExperience dash: 1 entry');
  assertEq(dashEntries[0].company, 'StartupCo', 'parseExperience dash: company');
  assertEq(dashEntries[0].role, 'CTO', 'parseExperience dash: role');

  // parseEducation
  const eduBody = `### Massachusetts Institute of Technology\n- BS Computer Science, 2018`;
  const edu = parseEducation(eduBody);
  assert(edu.length >= 1, 'parseEducation: at least 1 entry');
  assert(edu[0].includes('Massachusetts'), 'parseEducation: contains school name');

  // parseSkills
  const skillsBody = `- Engineering: TypeScript, Python, Go, SQL\n- Tools: Docker, Kubernetes`;
  const skills = parseSkills(skillsBody);
  assert(skills.length >= 4, 'parseSkills: at least 4 skills');
  assert(skills.includes('TypeScript'), 'parseSkills: contains TypeScript');
  assert(skills.includes('Docker'), 'parseSkills: contains Docker');

  // groupByCompany
  const grouped = groupByCompany([
    { company: 'A', location: '', role: 'Sr', dateRange: '2022-2024', bullets: [] },
    { company: 'A', location: '', role: 'Jr', dateRange: '2020-2022', bullets: [] },
    { company: 'B', location: '', role: 'Lead', dateRange: '2018-2020', bullets: [] },
  ]);
  assertEq(grouped.length, 2, 'groupByCompany: 2 groups');
  assertEq(grouped[0].roles.length, 2, 'groupByCompany: first group has 2 roles');

  // extractTemplateData - full profile
  const fullProfile = {
    candidate: { full_name: 'Jane Doe', location: 'NYC', email: 'jane@test.com', linkedin: 'linkedin.com/in/jane', github: 'github.com/jane' },
    narrative: { headline: 'Builder', superpowers: ['Speed'], proof_points: [], exit_story: '', home_bio: '<p>Hi</p>' },
    target_roles: { primary: ['Engineer'] },
    compensation: { location_flexibility: 'Remote' },
    talent_network: {},
  };
  const fullSections = parseSections('## Summary\nGreat engineer.\n\n## Experience\n### Acme -- Dev\n**2020 - Present**\n- Built things');
  const fullData = extractTemplateData({ profile: fullProfile, sections: fullSections, articleDigest: null });
  assertEq(fullData.name, 'Jane Doe', 'extractTemplateData full: name');
  assertEq(fullData.headline, 'Builder', 'extractTemplateData full: headline');
  assert(fullData.experience.length >= 1, 'extractTemplateData full: has experience');
  assert(fullData.skills.length === 0, 'extractTemplateData full: no skills section');

  // extractTemplateData - minimal profile (student, no experience)
  const minProfile = {
    candidate: { full_name: 'Alex Student', type: 'student' },
    narrative: {},
    target_roles: {},
    compensation: {},
  };
  const minSections = parseSections('## Education\n### MIT\nBS CS 2026');
  const minData = extractTemplateData({ profile: minProfile, sections: minSections, articleDigest: null });
  assertEq(minData.name, 'Alex Student', 'extractTemplateData minimal: name');
  assert(minData.experience.length === 0, 'extractTemplateData minimal: no experience');
  assert(minData.showEducationDetail === true, 'extractTemplateData minimal: showEducationDetail for student');

  // esc and renderInlineMarkdown
  assertEq(esc('<script>'), '&lt;script&gt;', 'esc: escapes HTML');
  assert(renderInlineMarkdown('**bold**').includes('<strong>'), 'renderInlineMarkdown: bold');
  assert(renderInlineMarkdown('[link](url)').includes('<a href="url"'), 'renderInlineMarkdown: link');
}

// ---------------------------------------------------------------------------
// Run all tests
// ---------------------------------------------------------------------------

async function main() {
  console.log('Portfolio Test Suite\n');

  await testStyleContracts();
  await testLayoutContracts();
  await testComboGeneration();
  await testDataParsing();

  console.log(`\n--- Results ---`);
  console.log(`  ${passed} passed, ${failed} failed`);

  if (failed > 0) process.exit(1);
}

main().catch(e => { console.error('Test suite crashed:', e.message); process.exit(1); });
