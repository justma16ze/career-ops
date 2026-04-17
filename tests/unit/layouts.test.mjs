#!/usr/bin/env node

/**
 * tests/unit/layouts.test.mjs — Layout contract tests
 *
 * For every layout in layouts/*.mjs, verifies:
 * - Required exports (name, description, css, pages)
 * - css() returns string
 * - pages(mockData) returns object with 'index.html'
 * - All pages contain 'made by' and 'speedrun' footer
 * - All pages contain footer link to github.com/justma16ze/career-ops
 * - pages() handles empty data (no experience, projects, skills)
 * - pages() handles student data
 */

import { Suite } from '../helpers.mjs';
import { listLayouts, getLayout, resetCache } from '../../layouts/registry.mjs';
import { esc, renderInlineMarkdown } from '../../lib/parse-data.mjs';

const s = new Suite('layouts');

// -------------------------------------------------------------------------
// Mock data
// -------------------------------------------------------------------------

const fullMockData = {
  name: 'Test Person',
  headline: 'Software Engineer',
  location: 'San Francisco, CA',
  email: 'test@example.com',
  linkedin: 'https://linkedin.com/in/test',
  github: 'https://github.com/test',
  summaryText: 'A skilled software engineer with 10 years of experience.',
  summaryShort: 'A skilled software engineer...',
  exitStory: 'Looking for new opportunities.',
  currentProject: 'Building a test framework.',
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
  projects: [
    { name: 'TestProject', description: 'A test project', heroMetric: '1K stars', url: 'https://example.com' },
  ],
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

const emptyMockData = {
  name: 'Empty Person',
  headline: '',
  location: '',
  email: '',
  linkedin: '',
  github: '',
  summaryText: '',
  summaryShort: '',
  exitStory: '',
  currentProject: '',
  homeBio: '',
  superpowers: [],
  proofPoints: [],
  targetRoles: [],
  locationFlex: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  experienceGroups: [],
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

const studentMockData = {
  ...emptyMockData,
  name: 'Student Person',
  headline: 'CS Student at MIT',
  education: ['BS Computer Science, MIT, 2026'],
  skills: ['Python', 'JavaScript'],
  showEducationDetail: true,
  sectionOrder: ['education', 'projects', 'experience'],
};

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

resetCache();

console.log('\n--- Layout Contract Tests ---');

const names = await listLayouts();
s.assertGte(names.length, 1, 'At least one layout exists');

for (const name of names) {
  const layout = await getLayout(name);

  // Required exports
  s.assertType(layout.name, 'string', `${name}: exports name (string)`);
  s.assert(layout.name.length > 0, `${name}: name is non-empty`);
  s.assertType(layout.description, 'string', `${name}: exports description (string)`);
  s.assertType(layout.css, 'function', `${name}: exports css (function)`);
  s.assertType(layout.pages, 'function', `${name}: exports pages (function)`);

  // css() returns string
  const css = layout.css();
  s.assertType(css, 'string', `${name}: css() returns string`);
  s.assert(css.length > 0, `${name}: css() returns non-empty string`);

  // pages(fullData) returns object with index.html
  const pages = layout.pages(fullMockData);
  s.assertType(pages, 'object', `${name}: pages() returns object`);
  s.assert(pages !== null, `${name}: pages() not null`);
  s.assert('index.html' in pages, `${name}: pages() contains index.html`);

  // Every page contains 'made by' and 'speedrun'
  for (const [filename, html] of Object.entries(pages)) {
    s.assert(
      html.includes('made by') && html.includes('speedrun'),
      `${name}/${filename}: contains 'made by speedrun'`
    );
  }

  // Footer link to github.com/justma16ze/career-ops
  for (const [filename, html] of Object.entries(pages)) {
    s.assert(
      html.includes('justma16ze/career-ops'),
      `${name}/${filename}: footer links to justma16ze/career-ops`
    );
  }

  // pages() with empty data: no crash, produces index.html
  try {
    const emptyPages = layout.pages(emptyMockData);
    s.assert('index.html' in emptyPages, `${name}: empty data produces index.html`);

    // Regression (build-p0-sprint C1): an empty bio MUST NOT leak the literal
    // string "Portfolio" into the about/bio section, and must not emit an
    // empty <article class="home-bio"></article> placeholder. When all bio
    // sources are empty, the about section should be omitted entirely.
    for (const [filename, html] of Object.entries(emptyPages)) {
      const aboutEmptyArticle = /<article class="home-bio">\s*<\/article>/;
      s.assert(
        !aboutEmptyArticle.test(html),
        `${name}/${filename}: empty bio does not emit empty home-bio article`
      );
      // The substring "Portfolio" (case-sensitive, word boundary) should not
      // appear as visible bio text. We can't forbid the word everywhere (it
      // may appear in copy), but we can assert it isn't inside the home-bio
      // wrapper.
      const bioContentMatch = html.match(/<article class="home-bio">([\s\S]*?)<\/article>/);
      if (bioContentMatch) {
        const bioContent = bioContentMatch[1];
        s.assert(
          !/\bPortfolio\b/.test(bioContent),
          `${name}/${filename}: home-bio content does not contain literal "Portfolio"`
        );
      }
    }
  } catch (e) {
    s.fail(`${name}: empty data crashed`, e.message);
  }

  // pages() with student data: no crash, produces index.html
  try {
    const studentPages = layout.pages(studentMockData);
    s.assert('index.html' in studentPages, `${name}: student data produces index.html`);
  } catch (e) {
    s.fail(`${name}: student data crashed`, e.message);
  }
}

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
