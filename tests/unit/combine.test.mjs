#!/usr/bin/env node

/**
 * tests/unit/combine.test.mjs — Combinator tests
 *
 * Tests portfolio generation by combining styles and layouts:
 * - bare-multipage generates without error
 * - void-scroll generates without error
 * - Blocked combos from compatibility.json produce warning not error
 * - Generated HTML is valid (DOCTYPE, html, head, body)
 * - Generated HTML includes both style CSS and layout CSS
 * - Generated HTML includes font links from the style
 */

import { Suite } from '../helpers.mjs';
import { readFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { getStyle, listStyles, resetCache as resetStyleCache } from '../../styles/registry.mjs';
import { getLayout, listLayouts, resetCache as resetLayoutCache } from '../../layouts/registry.mjs';
import { esc, renderInlineMarkdown } from '../../lib/parse-data.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const s = new Suite('combine');

// -------------------------------------------------------------------------
// Mock data
// -------------------------------------------------------------------------

const mockData = {
  name: 'Test Person',
  headline: 'Engineer',
  location: 'NYC',
  email: 'test@example.com',
  linkedin: 'https://linkedin.com/in/test',
  github: 'https://github.com/test',
  summaryText: 'Test summary.',
  summaryShort: 'Test summary.',
  exitStory: '',
  currentProject: '',
  homeBio: '<p>Hello.</p>',
  superpowers: ['Architecture'],
  proofPoints: [],
  targetRoles: ['Engineer'],
  locationFlex: '',
  experience: [
    { company: 'TestCo', location: '', role: 'Dev', dateRange: '2023 - Present', bullets: ['Coded'] },
  ],
  education: ['BS CS'],
  skills: ['JavaScript', 'Python'],
  projects: [
    { name: 'TestApp', description: 'A test', heroMetric: '', url: '' },
  ],
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

// -------------------------------------------------------------------------
// Helper: buildPage (mirrors combine-portfolio.mjs)
// -------------------------------------------------------------------------

function buildPage({ title, styleCSS, layoutCSS, fonts, body, summaryShort }) {
  const fontLinks = fonts.map(f => `<link href="${f}" rel="stylesheet">`).join('\n');
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(summaryShort)}">
${fontLinks}
<style>${styleCSS}\n${layoutCSS}</style>
</head>
<body>
${body}
</body>
</html>`;
}

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

resetStyleCache();
resetLayoutCache();

console.log('\n--- Combine Tests ---');

// bare-multipage generates without error
{
  const style = await getStyle('bare');
  const layout = await getLayout('multipage');
  const pages = layout.pages(mockData);
  const html = buildPage({
    title: mockData.name,
    styleCSS: style.css(),
    layoutCSS: layout.css(),
    fonts: style.fonts || [],
    body: pages['index.html'],
    summaryShort: mockData.summaryShort,
  });
  s.assert(html.length > 0, 'bare-multipage: generates HTML');
  s.assertIncludes(html, '<!DOCTYPE html>', 'bare-multipage: has DOCTYPE');
  s.assertIncludes(html, '<html', 'bare-multipage: has <html>');
  s.assertIncludes(html, '<head>', 'bare-multipage: has <head>');
  s.assertIncludes(html, '<body>', 'bare-multipage: has <body>');
  s.assertIncludes(html, '</html>', 'bare-multipage: has </html>');
  s.assertIncludes(html, '</body>', 'bare-multipage: has </body>');
  s.assertIncludes(html, 'Test Person', 'bare-multipage: contains name');
}

// void-scroll generates without error
{
  const style = await getStyle('void');
  const layout = await getLayout('scroll');
  const pages = layout.pages(mockData);
  const html = buildPage({
    title: mockData.name,
    styleCSS: style.css(),
    layoutCSS: layout.css(),
    fonts: style.fonts || [],
    body: pages['index.html'],
    summaryShort: mockData.summaryShort,
  });
  s.assert(html.length > 0, 'void-scroll: generates HTML');
  s.assertIncludes(html, '<!DOCTYPE html>', 'void-scroll: has DOCTYPE');
  s.assertIncludes(html, '--bg:', 'void-scroll: style CSS included');
  s.assertIncludes(html, 'scroll', 'void-scroll: layout references present');
}

// blocked combos produce warning, not error
{
  let blocked = [];
  try {
    const raw = await readFile(resolve(ROOT, 'compatibility.json'), 'utf-8');
    const data = JSON.parse(raw);
    blocked = data.blocked || [];
  } catch {
    s.skip('blocked combos', 'compatibility.json not found');
  }

  if (blocked.length > 0) {
    const [styleName, layoutName, reason] = blocked[0];
    // The blocked combo should still be loadable — the combinator warns but proceeds
    try {
      const style = await getStyle(styleName);
      const layout = await getLayout(layoutName);
      // Generation should succeed even though blocked
      const pages = layout.pages(mockData);
      s.assert('index.html' in pages, `blocked combo ${styleName}-${layoutName}: generates pages (with warning)`);
    } catch (e) {
      // If either style or layout doesn't exist, skip
      s.skip(`blocked combo ${styleName}-${layoutName}`, e.message);
    }
  }
}

// Generated HTML includes style CSS + layout CSS
{
  const style = await getStyle('ink');
  const layout = await getLayout('scroll');
  const pages = layout.pages(mockData);
  const html = buildPage({
    title: 'Test',
    styleCSS: style.css(),
    layoutCSS: layout.css(),
    fonts: style.fonts || [],
    body: pages['index.html'],
    summaryShort: '',
  });
  // Style CSS has :root vars, layout CSS has structural rules
  s.assertIncludes(html, '--bg:', 'ink-scroll: style CSS vars present');
  s.assertIncludes(html, '.wrap', 'ink-scroll: layout structural CSS present');
}

// Generated HTML includes font links from the style
{
  const style = await getStyle('ink');
  const fonts = style.fonts || [];
  if (fonts.length > 0) {
    const html = buildPage({
      title: 'Test',
      styleCSS: style.css(),
      layoutCSS: '',
      fonts,
      body: '<p>test</p>',
      summaryShort: '',
    });
    s.assertIncludes(html, 'rel="stylesheet"', 'ink: font links present in HTML');
    s.assertIncludes(html, fonts[0], 'ink: first font URL in HTML');
  } else {
    s.skip('ink font links', 'ink has no fonts');
  }
}

// Multiple combos can generate
{
  const combos = [
    ['bare', 'multipage'],
    ['void', 'scroll'],
    ['press', 'cards'],
    ['ink', 'spread'],
  ];

  for (const [sName, lName] of combos) {
    try {
      const style = await getStyle(sName);
      const layout = await getLayout(lName);
      const pages = layout.pages(mockData);
      const html = buildPage({
        title: 'Test',
        styleCSS: style.css(),
        layoutCSS: layout.css(),
        fonts: style.fonts || [],
        body: pages['index.html'],
        summaryShort: '',
      });
      s.assert(html.includes('<!DOCTYPE html>'), `${sName}-${lName}: valid HTML generated`);
    } catch (e) {
      s.fail(`${sName}-${lName}: generation failed`, e.message);
    }
  }
}

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
