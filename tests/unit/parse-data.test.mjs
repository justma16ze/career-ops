#!/usr/bin/env node

/**
 * tests/unit/parse-data.test.mjs — Exhaustive tests for lib/parse-data.mjs
 *
 * Covers: parseSections, parseExperience, parseEducation, parseSkills,
 *         parseProjects, groupByCompany, extractTemplateData, esc, renderInlineMarkdown
 */

import { Suite, projectRoot } from '../helpers.mjs';
import {
  parseSections, parseExperience, parseEducation, parseSkills,
  parseProjects, groupByCompany, extractTemplateData,
  renderInlineMarkdown, esc,
} from '../../lib/parse-data.mjs';

const s = new Suite('parse-data');

// -------------------------------------------------------------------------
// parseSections
// -------------------------------------------------------------------------

console.log('\n--- parseSections ---');

// empty input
{
  const result = parseSections('');
  s.assert(result instanceof Map, 'parseSections: returns Map on empty input');
  s.assert(result.has('_preamble'), 'parseSections: has _preamble on empty');
}

// single section
{
  const result = parseSections('## Summary\nHello world');
  s.assert(result.has('summary'), 'parseSections: single section found');
  s.assertEqual(result.get('summary'), 'Hello world', 'parseSections: single section body');
}

// multiple sections
{
  const md = `## Summary\nHello\n\n## Experience\n### Acme\nDid stuff\n\n## Education\n### MIT\nBS CS`;
  const result = parseSections(md);
  s.assert(result.has('summary'), 'parseSections multi: has summary');
  s.assert(result.has('experience'), 'parseSections multi: has experience');
  s.assert(result.has('education'), 'parseSections multi: has education');
  s.assertGte(result.size, 3, 'parseSections multi: at least 3 sections');
}

// malformed markdown (no heading markers)
{
  const result = parseSections('Just some text\nWith no headings');
  s.assert(result.has('_preamble'), 'parseSections malformed: everything in _preamble');
  s.assertIncludes(result.get('_preamble'), 'Just some text', 'parseSections malformed: text preserved');
}

// preamble content before first heading
{
  const result = parseSections('# Name\n\nSome intro\n\n## Summary\nContent');
  s.assert(result.get('_preamble').includes('Name'), 'parseSections: preamble captures content before ## headings');
  s.assert(result.has('summary'), 'parseSections: heading after preamble captured');
}

// heading normalization (lowercase, trimmed)
{
  const result = parseSections('## Work Experience  \nContent');
  s.assert(result.has('work experience'), 'parseSections: heading lowercased and trimmed');
}

// -------------------------------------------------------------------------
// parseExperience
// -------------------------------------------------------------------------

console.log('\n--- parseExperience ---');

// empty input
{
  const result = parseExperience('');
  s.assertEqual(result.length, 0, 'parseExperience: empty input returns empty array');
}

// null input
{
  const result = parseExperience(null);
  s.assertEqual(result.length, 0, 'parseExperience: null input returns empty array');
}

// single role
{
  const body = `### Acme Corp -- Senior Engineer\n**January 2020 - Present**\n- Built the platform\n- Led 5 engineers`;
  const result = parseExperience(body);
  s.assertEqual(result.length, 1, 'parseExperience single: 1 entry');
  s.assertEqual(result[0].company, 'Acme Corp', 'parseExperience single: company');
  s.assertEqual(result[0].role, 'Senior Engineer', 'parseExperience single: role');
  s.assertEqual(result[0].bullets.length, 2, 'parseExperience single: 2 bullets');
  s.assertIncludes(result[0].bullets[0], 'Built the platform', 'parseExperience single: bullet text');
}

// multi-role company (#### sub-roles)
{
  const body = `### BigCo\n#### Senior Engineer\n**2022 - Present**\n- Led team\n#### Engineer\n**2020 - 2022**\n- Wrote code`;
  const result = parseExperience(body);
  s.assertEqual(result.length, 2, 'parseExperience multi-role: 2 entries');
  s.assertEqual(result[0].company, 'BigCo', 'parseExperience multi-role: same company');
  s.assertEqual(result[1].company, 'BigCo', 'parseExperience multi-role: same company #2');
  s.assertEqual(result[0].role, 'Senior Engineer', 'parseExperience multi-role: first role');
  s.assertEqual(result[1].role, 'Engineer', 'parseExperience multi-role: second role');
  s.assertIncludes(result[0].dateRange, '2022', 'parseExperience multi-role: date extracted');
}

// Company -- Role dash format
{
  const body = `### StartupCo -- CTO\n**2019 - 2021**\n- Founded tech team`;
  const result = parseExperience(body);
  s.assertEqual(result.length, 1, 'parseExperience dash: 1 entry');
  s.assertEqual(result[0].company, 'StartupCo', 'parseExperience dash: company');
  s.assertEqual(result[0].role, 'CTO', 'parseExperience dash: role');
}

// bold date lines
{
  const body = `### TestCo -- Dev\n**March 2022 - Present**\n- Built things`;
  const result = parseExperience(body);
  s.assertIncludes(result[0].dateRange, '2022', 'parseExperience: bold date extracted');
}

// empty bullets (only company header)
{
  const body = `### EmptyCo -- Manager\n**2020 - 2021**`;
  const result = parseExperience(body);
  s.assertEqual(result.length, 1, 'parseExperience empty bullets: entry exists');
  s.assertEqual(result[0].bullets.length, 0, 'parseExperience empty bullets: no bullets');
}

// non-bullet paragraphs as bullets (lines > 10 chars)
{
  const body = `### ParaCo -- Writer\n**2020 - 2021**\nThis is a description paragraph that is long enough.`;
  const result = parseExperience(body);
  s.assertGte(result[0].bullets.length, 1, 'parseExperience: non-bullet paragraph captured');
}

// asterisk bullets
{
  const body = `### AstCo -- Dev\n**2020 - 2021**\n* Used asterisk bullets\n* Another bullet`;
  const result = parseExperience(body);
  s.assertEqual(result[0].bullets.length, 2, 'parseExperience: asterisk bullets parsed');
}

// -------------------------------------------------------------------------
// parseEducation
// -------------------------------------------------------------------------

console.log('\n--- parseEducation ---');

// standard format
{
  const body = `### University of Washington\n- BS Computer Science, 2017\n- Focus: Distributed Systems`;
  const result = parseEducation(body);
  s.assertGte(result.length, 1, 'parseEducation standard: at least 1 entry');
  s.assert(result[0].includes('Washington'), 'parseEducation standard: school name');
}

// empty input
{
  const result = parseEducation('');
  s.assertEqual(result.length, 0, 'parseEducation: empty returns empty');
}

// null input
{
  const result = parseEducation(null);
  s.assertEqual(result.length, 0, 'parseEducation: null returns empty');
}

// missing dates
{
  const body = `### Stanford University\n- MS Computer Science`;
  const result = parseEducation(body);
  s.assertGte(result.length, 1, 'parseEducation missing dates: entry exists');
  s.assert(result[0].includes('Stanford'), 'parseEducation missing dates: school name');
}

// multiple degrees
{
  const body = `### MIT\n- PhD Physics\n### Stanford\n- MS CS`;
  const result = parseEducation(body);
  s.assertGte(result.length, 2, 'parseEducation multiple: at least 2 entries');
}

// plain text lines (no heading, no bullet)
{
  const body = `University of Michigan, BS CS, 2020`;
  const result = parseEducation(body);
  s.assertGte(result.length, 1, 'parseEducation plain text: captured');
}

// -------------------------------------------------------------------------
// parseSkills
// -------------------------------------------------------------------------

console.log('\n--- parseSkills ---');

// comma-separated with category prefixes
{
  const body = `- Engineering: TypeScript, Go, Python, Rust\n- Tools: Docker, Kubernetes`;
  const result = parseSkills(body);
  s.assertGte(result.length, 4, 'parseSkills comma: at least 4 skills');
  s.assertIncludes(result, 'TypeScript', 'parseSkills comma: has TypeScript');
  s.assertIncludes(result, 'Docker', 'parseSkills comma: has Docker');
}

// bullet list format
{
  const body = `- TypeScript\n- Python\n- Go`;
  const result = parseSkills(body);
  s.assertGte(result.length, 3, 'parseSkills bullet: 3 skills');
}

// empty input
{
  const result = parseSkills('');
  s.assertEqual(result.length, 0, 'parseSkills: empty returns empty');
}

// null input
{
  const result = parseSkills(null);
  s.assertEqual(result.length, 0, 'parseSkills: null returns empty');
}

// deduplication
{
  const body = `- TypeScript, Python\n- TypeScript, Go`;
  const result = parseSkills(body);
  const tsCount = result.filter(s => s === 'TypeScript').length;
  s.assertEqual(tsCount, 1, 'parseSkills: deduplicates');
}

// filters out long phrases
{
  const body = `- I have extensive experience in many technologies and frameworks over the years`;
  const result = parseSkills(body);
  // The long phrase should be filtered (>5 words per item)
  s.assert(!result.some(s => s.split(/\s+/).length > 5), 'parseSkills: long phrases filtered');
}

// -------------------------------------------------------------------------
// parseProjects
// -------------------------------------------------------------------------

console.log('\n--- parseProjects ---');

// with URL
{
  const body = `- \`feature-flags-sdk\` -- SDK with edge eval, 1.2K stars [repo](https://github.com/test/sdk)`;
  const result = parseProjects(body, null, null);
  s.assertGte(result.length, 1, 'parseProjects with URL: at least 1');
  s.assertEqual(result[0].name, 'feature-flags-sdk', 'parseProjects with URL: name');
  s.assertEqual(result[0].url, 'https://github.com/test/sdk', 'parseProjects with URL: url');
}

// without URL
{
  const body = `- **DevPortal** -- Internal developer portal`;
  const result = parseProjects(body, null, null);
  s.assertGte(result.length, 1, 'parseProjects no URL: at least 1');
  s.assertEqual(result[0].name, 'DevPortal', 'parseProjects no URL: name');
  s.assertEqual(result[0].url, '', 'parseProjects no URL: empty url');
}

// with heroMetric
{
  const body = `- \`toolkit\` -- Toolkit used by 200+ contributors`;
  const result = parseProjects(body, null, null);
  s.assertGte(result.length, 1, 'parseProjects heroMetric: at least 1');
  s.assert(result[0].heroMetric.includes('200+'), 'parseProjects heroMetric: metric extracted');
}

// empty input
{
  const result = parseProjects('', null, null);
  s.assertEqual(result.length, 0, 'parseProjects: empty returns empty');
}

// null input
{
  const result = parseProjects(null, null, null);
  s.assertEqual(result.length, 0, 'parseProjects: null returns empty');
}

// with profileProofPoints
{
  const pp = [{ name: 'Extra', description: 'Extra project', hero_metric: '100 users', url: 'https://example.com' }];
  const result = parseProjects('', null, pp);
  s.assertEqual(result.length, 1, 'parseProjects proofPoints: 1 entry');
  s.assertEqual(result[0].name, 'Extra', 'parseProjects proofPoints: name');
}

// articleDigest headings
{
  const digest = `## Cool Project\n- A line about the project with 50% improvement`;
  const result = parseProjects(null, digest, null);
  s.assertGte(result.length, 1, 'parseProjects articleDigest: at least 1');
  s.assertEqual(result[0].name, 'Cool Project', 'parseProjects articleDigest: name from heading');
}

// -------------------------------------------------------------------------
// groupByCompany
// -------------------------------------------------------------------------

console.log('\n--- groupByCompany ---');

// single company
{
  const entries = [{ company: 'A', location: '', role: 'Dev', dateRange: '2022-2024', bullets: [] }];
  const result = groupByCompany(entries);
  s.assertEqual(result.length, 1, 'groupByCompany single: 1 group');
  s.assertEqual(result[0].roles.length, 1, 'groupByCompany single: 1 role');
}

// multiple roles at same company (consecutive)
{
  const entries = [
    { company: 'A', location: '', role: 'Sr', dateRange: '2022-2024', bullets: [] },
    { company: 'A', location: '', role: 'Jr', dateRange: '2020-2022', bullets: [] },
  ];
  const result = groupByCompany(entries);
  s.assertEqual(result.length, 1, 'groupByCompany multi-role: 1 group');
  s.assertEqual(result[0].roles.length, 2, 'groupByCompany multi-role: 2 roles');
}

// different companies
{
  const entries = [
    { company: 'A', location: '', role: 'Sr', dateRange: '2022-2024', bullets: [] },
    { company: 'B', location: '', role: 'Jr', dateRange: '2020-2022', bullets: [] },
  ];
  const result = groupByCompany(entries);
  s.assertEqual(result.length, 2, 'groupByCompany different: 2 groups');
}

// chronological ordering preserved
{
  const entries = [
    { company: 'A', location: '', role: 'Sr', dateRange: '2022-2024', bullets: [] },
    { company: 'A', location: '', role: 'Jr', dateRange: '2020-2022', bullets: [] },
    { company: 'B', location: '', role: 'Lead', dateRange: '2018-2020', bullets: [] },
  ];
  const result = groupByCompany(entries);
  s.assertEqual(result.length, 2, 'groupByCompany chronological: 2 groups');
  s.assertEqual(result[0].company, 'A', 'groupByCompany chronological: first is A');
  s.assertEqual(result[1].company, 'B', 'groupByCompany chronological: second is B');
  s.assertEqual(result[0].roles.length, 2, 'groupByCompany chronological: A has 2 roles');
}

// empty input
{
  const result = groupByCompany([]);
  s.assertEqual(result.length, 0, 'groupByCompany: empty returns empty');
}

// -------------------------------------------------------------------------
// extractTemplateData
// -------------------------------------------------------------------------

console.log('\n--- extractTemplateData ---');

// full profile
{
  const profile = {
    candidate: { full_name: 'Jane Doe', location: 'NYC', email: 'jane@test.com', linkedin: 'linkedin.com/in/jane', github: 'github.com/jane' },
    narrative: { headline: 'Builder', superpowers: ['Speed'], proof_points: [], exit_story: '', home_bio: '<p>Hi</p>' },
    target_roles: { primary: ['Engineer'] },
    compensation: { location_flexibility: 'Remote' },
    talent_network: {},
  };
  const sections = parseSections('## Summary\nGreat engineer.\n\n## Experience\n### Acme -- Dev\n**2020 - Present**\n- Built things');
  const data = extractTemplateData({ profile, sections, articleDigest: null });
  s.assertEqual(data.name, 'Jane Doe', 'extractTemplateData full: name');
  s.assertEqual(data.headline, 'Builder', 'extractTemplateData full: headline');
  s.assertEqual(data.location, 'NYC', 'extractTemplateData full: location');
  s.assertEqual(data.email, 'jane@test.com', 'extractTemplateData full: email');
  s.assertGte(data.experience.length, 1, 'extractTemplateData full: has experience');
  s.assertGte(data.superpowers.length, 1, 'extractTemplateData full: has superpowers');
  s.assertEqual(data.showEducationDetail, false, 'extractTemplateData full: showEducationDetail false for experienced');
  s.assert(typeof data.esc === 'function', 'extractTemplateData full: esc function');
  s.assert(typeof data.renderInlineMarkdown === 'function', 'extractTemplateData full: renderInlineMarkdown function');
}

// minimal profile (student)
{
  const profile = {
    candidate: { full_name: 'Alex Student', type: 'student' },
    narrative: {},
    target_roles: {},
    compensation: {},
  };
  const sections = parseSections('## Education\n### MIT\nBS CS 2026');
  const data = extractTemplateData({ profile, sections, articleDigest: null });
  s.assertEqual(data.name, 'Alex Student', 'extractTemplateData student: name');
  s.assertEqual(data.experience.length, 0, 'extractTemplateData student: no experience');
  s.assertEqual(data.showEducationDetail, true, 'extractTemplateData student: showEducationDetail true');
  s.assertGte(data.education.length, 1, 'extractTemplateData student: has education');
}

// missing fields
{
  const profile = {
    candidate: {},
    narrative: {},
    target_roles: {},
    compensation: {},
  };
  const sections = parseSections('');
  const data = extractTemplateData({ profile, sections, articleDigest: null });
  s.assertEqual(data.name, 'Portfolio', 'extractTemplateData missing: defaults to Portfolio');
  s.assertEqual(data.headline, '', 'extractTemplateData missing: headline empty');
  s.assertEqual(data.email, '', 'extractTemplateData missing: email empty');
  s.assertEqual(data.experience.length, 0, 'extractTemplateData missing: no experience');
  s.assertEqual(data.skills.length, 0, 'extractTemplateData missing: no skills');
  s.assertEqual(data.projects.length, 0, 'extractTemplateData missing: no projects');
}

// sectionOrder for student
{
  const profile = {
    candidate: { full_name: 'Student', type: 'early_career' },
    narrative: {},
    target_roles: {},
    compensation: {},
    preferences: { section_order: ['education', 'projects', 'experience'] },
  };
  const sections = parseSections('');
  const data = extractTemplateData({ profile, sections, articleDigest: null });
  s.assertEqual(data.showEducationDetail, true, 'extractTemplateData early_career: showEducationDetail true');
  s.assert(Array.isArray(data.sectionOrder), 'extractTemplateData: sectionOrder is array');
  s.assertEqual(data.sectionOrder[0], 'education', 'extractTemplateData: sectionOrder first is education');
}

// -------------------------------------------------------------------------
// esc and renderInlineMarkdown
// -------------------------------------------------------------------------

console.log('\n--- esc & renderInlineMarkdown ---');

s.assertEqual(esc('<script>'), '&lt;script&gt;', 'esc: HTML entities');
s.assertEqual(esc('"quotes"'), '&quot;quotes&quot;', 'esc: double quotes');
s.assertEqual(esc("it's"), "it&#39;s", 'esc: single quotes');
s.assertEqual(esc('&'), '&amp;', 'esc: ampersand');
s.assertEqual(esc(''), '', 'esc: empty string');
s.assertEqual(esc(null), '', 'esc: null');

s.assertIncludes(renderInlineMarkdown('**bold**'), '<strong>bold</strong>', 'renderInlineMarkdown: bold');
s.assertIncludes(renderInlineMarkdown('*italic*'), '<em>italic</em>', 'renderInlineMarkdown: italic');
s.assertIncludes(renderInlineMarkdown('`code`'), '<code>code</code>', 'renderInlineMarkdown: code');
s.assertIncludes(renderInlineMarkdown('[link](url)'), '<a href="url"', 'renderInlineMarkdown: link');
s.assertEqual(renderInlineMarkdown(''), '', 'renderInlineMarkdown: empty');
s.assertEqual(renderInlineMarkdown(null), '', 'renderInlineMarkdown: null');

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
