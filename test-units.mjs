#!/usr/bin/env node

/**
 * test-units.mjs — Unit tests for data extraction and business logic
 *
 * Tests pure functions in submit-to-network.mjs and scan.mjs.
 * Run alongside test-all.mjs for full coverage.
 *
 * Usage:
 *   node test-units.mjs
 */

import {
  mapContinent, extractCurrentCompany, inferCraftArea,
  synthesizeAccomplishments, validate, CONTINENT_MAP, CRAFT_CHOICES,
} from './submit-to-network.mjs';

import {
  detectApi, parseGreenhouse, parseAshby, parseLever, buildTitleFilter,
} from './scan.mjs';

import { getTemplate, listTemplates } from './templates/registry.mjs';
import {
  parseSections, parseExperience, parseEducation, parseSkills,
  parseProjects, groupByCompany, renderInlineMarkdown, esc,
} from './generate-portfolio.mjs';

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    console.log(`  \u2705 ${msg}`);
    passed++;
  } else {
    console.log(`  \u274c ${msg}`);
    failed++;
  }
}

function eq(actual, expected, msg) {
  assert(actual === expected, `${msg} (got: ${JSON.stringify(actual)}, expected: ${JSON.stringify(expected)})`);
}

function truthy(val, msg) { assert(!!val, msg); }
function falsy(val, msg) { assert(!val, msg); }

console.log('\n\ud83e\uddea Unit tests\n');

// ── mapContinent ────────────────────────────────────────────────────

console.log('1. mapContinent');

eq(mapContinent('San Francisco'), 'North America', 'SF exact match');
eq(mapContinent('san francisco'), 'North America', 'SF lowercase');
eq(mapContinent('New York, NY'), 'North America', 'NYC with state');
eq(mapContinent('Austin, TX'), 'North America', 'Austin with state');
eq(mapContinent('London'), 'Europe', 'London exact');
eq(mapContinent('london, uk'), 'Europe', 'London with country');
eq(mapContinent('Tokyo'), 'Asia', 'Tokyo exact');
eq(mapContinent('bangalore'), 'Asia', 'Bangalore');
eq(mapContinent('Tel Aviv'), 'Middle East', 'Tel Aviv');
eq(mapContinent('Sydney'), 'Australia', 'Sydney');
eq(mapContinent('Lagos'), 'Africa', 'Lagos');
eq(mapContinent('Sao Paulo'), 'South America', 'Sao Paulo');
eq(mapContinent('Mexico City'), 'Latin America', 'Mexico City');
eq(mapContinent('Toronto, Canada'), 'North America', 'Toronto with country');
eq(mapContinent('Raleigh, NC'), 'North America', 'US state abbreviation fallback');
eq(mapContinent('Portland, OR'), 'North America', 'Portland with state code');
eq(mapContinent(null), null, 'null input');
eq(mapContinent(''), null, 'empty string');
eq(mapContinent('Remote'), null, '"Remote" returns null (no geographic meaning)');
eq(mapContinent('Mars'), null, 'unknown location returns null');

// ── extractCurrentCompany ───────────────────────────────────────────

console.log('\n2. extractCurrentCompany');

eq(extractCurrentCompany(`# CV
## Experience
### Stripe
Senior Engineer (2022 - Present)
- Did stuff
### Google
Engineer (2019 - 2022)`), 'Stripe', 'Heading format: ### Company');

eq(extractCurrentCompany(`# CV
## Experience
### Senior Engineer at Anthropic
Built things
### Engineer at Google
Other things`), 'Anthropic', '"Role at Company" format');

eq(extractCurrentCompany(`# CV
## Work History
**Vercel** — Staff Engineer
- Built things`), 'Vercel', 'Bold company format under Work History');

eq(extractCurrentCompany(`# CV
## Experience
### CTO | Acme Corp (2023 - Present)
Led engineering`), 'Acme Corp', 'Pipe separator: Role | Company');

eq(extractCurrentCompany(`# CV
## Experience
### Acme Corp - VP Engineering
Led team`), 'Acme Corp', 'Dash separator: Company - Role');

eq(extractCurrentCompany(null), null, 'null CV returns null');
eq(extractCurrentCompany('Just some random text'), null, 'no Experience section returns null');
eq(extractCurrentCompany(`# CV
## Skills
- JavaScript
## Education
MIT`), null, 'CV with no experience section');

// ── inferCraftArea ──────────────────────────────────────────────────

console.log('\n3. inferCraftArea');

const engineeringCV = `## Experience
### Senior Software Engineer at Stripe
- Built payment infrastructure
- Led backend team of 5 engineers
### Software Engineer at Google
- Worked on distributed systems`;

const productCV = `## Experience
### Product Manager at Meta
- Led product roadmap for Messenger
### Senior Product Manager at Airbnb
- Drove product strategy`;

const designCV = `## Experience
### Senior UX Designer at Apple
- Led interaction design for iOS
### UI/UX Designer at Spotify
- Visual design and user research`;

const opsCV = `## Experience
### Head of People Operations at Stripe
- Built recruiting team from 0 to 20
### HR Business Partner at Google
- Managed people operations`;

eq(inferCraftArea(engineeringCV, {}), CRAFT_CHOICES[0], 'Engineering CV → Engineering craft');
eq(inferCraftArea(productCV, {}), CRAFT_CHOICES[1], 'Product CV → Product craft');
eq(inferCraftArea(designCV, {}), CRAFT_CHOICES[2], 'Design CV → Design craft');
eq(inferCraftArea(opsCV, {}), CRAFT_CHOICES[5], 'Ops/People CV → Operations craft');
eq(inferCraftArea(null, {}), null, 'null CV returns null');
eq(inferCraftArea('I like cats', {}), null, 'irrelevant text returns null');

// With profile target roles
const profileWithRoles = { target_roles: { primary: ['Data Scientist', 'ML Engineer'] } };
truthy(
  inferCraftArea('## Experience\nWorked with data', profileWithRoles),
  'Profile target roles contribute to craft inference'
);

// ── synthesizeAccomplishments ───────────────────────────────────────

console.log('\n4. synthesizeAccomplishments');

const cvWithMetrics = `## Experience
### Stripe
- Grew revenue from $1M to $5M ARR in 12 months
- Reduced latency by 40% across all API endpoints
- Led team of 12 engineers across 3 time zones
### Google
- Scaled system to handle 1M requests per second
- Saved $2.3M annually by optimizing cloud costs`;

const result = synthesizeAccomplishments(cvWithMetrics, null);
truthy(result.length > 0, 'extracts accomplishments from CV with metrics');
truthy(result.includes('$'), 'includes dollar amounts');

const resultWithDigest = synthesizeAccomplishments(cvWithMetrics, `
# Proof Points
- Published paper on distributed systems at SOSP 2023
- Open source project with 5K GitHub stars
`);
truthy(resultWithDigest.length > result.length, 'digest adds to accomplishments');

eq(synthesizeAccomplishments(null, null), '', 'null CV returns empty string');

const cvWithSummary = `## Summary
Experienced engineer with 10 years in distributed systems.

## Skills
JavaScript, Go, Python`;
truthy(
  synthesizeAccomplishments(cvWithSummary, null).length > 0,
  'falls back to summary section when no metrics found'
);

// ── validate ────────────────────────────────────────────────────────

console.log('\n5. validate');

const validProfile = {
  candidate: { full_name: 'Jane Doe', email: 'jane@example.com', linkedin: 'linkedin.com/in/jane' },
};
const { errors: noErrors } = validate(validProfile, 'some cv text');
eq(noErrors.length, 0, 'valid profile + CV has no errors');

const { errors: missingProfile } = validate(null, 'cv');
truthy(missingProfile.length > 0, 'null profile produces errors');

const { errors: missingCV } = validate(validProfile, null);
truthy(missingCV.length > 0, 'null CV produces errors');

const { errors: missingFields } = validate({ candidate: {} }, 'cv');
truthy(missingFields.length >= 3, 'empty candidate object produces multiple errors');

const { warnings } = validate(validProfile, 'cv');
truthy(warnings.length > 0, 'valid profile without optional fields produces warnings');

// ── detectApi (scan.mjs) ────────────────────────────────────────────

console.log('\n6. detectApi');

eq(
  detectApi({ api: 'https://boards-api.greenhouse.io/v1/boards/stripe/jobs' }).type,
  'greenhouse', 'explicit greenhouse API detected'
);

eq(
  detectApi({ careers_url: 'https://jobs.ashbyhq.com/stripe' }).type,
  'ashby', 'Ashby careers URL detected'
);

eq(
  detectApi({ careers_url: 'https://jobs.lever.co/stripe' }).type,
  'lever', 'Lever careers URL detected'
);

eq(
  detectApi({ careers_url: 'https://job-boards.greenhouse.io/stripe' }).type,
  'greenhouse', 'Greenhouse EU board URL detected'
);

eq(detectApi({ careers_url: 'https://stripe.com/careers' }), null, 'unknown URL returns null');
eq(detectApi({}), null, 'empty company returns null');

// Verify URLs are well-formed
const ashbyResult = detectApi({ careers_url: 'https://jobs.ashbyhq.com/mycompany' });
truthy(ashbyResult.url.includes('api.ashbyhq.com'), 'Ashby URL points to API');
truthy(ashbyResult.url.includes('mycompany'), 'Ashby URL includes company slug');

const leverResult = detectApi({ careers_url: 'https://jobs.lever.co/mycompany' });
truthy(leverResult.url.includes('api.lever.co'), 'Lever URL points to API');

// ── parseGreenhouse ─────────────────────────────────────────────────

console.log('\n7. parseGreenhouse');

const ghResponse = {
  jobs: [
    { title: 'Software Engineer', absolute_url: 'https://boards.greenhouse.io/co/jobs/123', location: { name: 'SF, CA' } },
    { title: 'Product Manager', absolute_url: 'https://boards.greenhouse.io/co/jobs/456', location: { name: 'Remote' } },
  ],
};

const ghJobs = parseGreenhouse(ghResponse, 'TestCo');
eq(ghJobs.length, 2, 'parses 2 jobs');
eq(ghJobs[0].title, 'Software Engineer', 'preserves title');
eq(ghJobs[0].company, 'TestCo', 'sets company name');
eq(ghJobs[0].location, 'SF, CA', 'preserves location');
eq(ghJobs[0].url, 'https://boards.greenhouse.io/co/jobs/123', 'preserves URL');

eq(parseGreenhouse({}, 'Co').length, 0, 'empty response returns empty array');
eq(parseGreenhouse({ jobs: [] }, 'Co').length, 0, 'empty jobs returns empty array');

// ── parseAshby ──────────────────────────────────────────────────────

console.log('\n8. parseAshby');

const ashbyResponse = {
  jobs: [
    { title: 'Head of People', jobUrl: 'https://jobs.ashbyhq.com/co/abc', location: 'NYC' },
  ],
};

const ashbyJobs = parseAshby(ashbyResponse, 'AshbyCo');
eq(ashbyJobs.length, 1, 'parses 1 job');
eq(ashbyJobs[0].title, 'Head of People', 'preserves title');
eq(ashbyJobs[0].company, 'AshbyCo', 'sets company name');

// ── parseLever ──────────────────────────────────────────────────────

console.log('\n9. parseLever');

const leverResponse = [
  { text: 'VP Engineering', hostedUrl: 'https://jobs.lever.co/co/abc', categories: { location: 'Remote' } },
  { text: 'Designer', hostedUrl: 'https://jobs.lever.co/co/def', categories: { location: 'London' } },
];

const leverJobs = parseLever(leverResponse, 'LeverCo');
eq(leverJobs.length, 2, 'parses 2 jobs');
eq(leverJobs[0].title, 'VP Engineering', 'preserves title');
eq(leverJobs[0].location, 'Remote', 'extracts location from categories');

eq(parseLever({}, 'Co').length, 0, 'non-array input returns empty');
eq(parseLever([], 'Co').length, 0, 'empty array returns empty');

// ── buildTitleFilter ────────────────────────────────────────────────

console.log('\n10. buildTitleFilter');

const filter = buildTitleFilter({
  positive: ['Head of People', 'VP Talent', 'Director of Recruiting'],
  negative: ['Junior', 'Intern'],
});

truthy(filter('Head of People'), 'matches positive keyword');
truthy(filter('VP Talent Acquisition'), 'matches partial positive');
truthy(filter('Director of Recruiting Operations'), 'matches partial positive');
falsy(filter('Software Engineer'), 'rejects non-matching title');
falsy(filter('Junior Head of People'), 'negative keyword rejects');
falsy(filter('Head of People Intern'), 'negative keyword at end rejects');

const noPositive = buildTitleFilter({ positive: [], negative: ['Intern'] });
truthy(noPositive('Software Engineer'), 'empty positive list matches everything');
falsy(noPositive('Engineering Intern'), 'empty positive still respects negative');

const noFilter = buildTitleFilter({});
truthy(noFilter('Anything'), 'empty filter matches everything');

// ── Worker input validation (tested via contract) ───────────────────

console.log('\n11. Worker contract validation');

// These test the expected shape of data the client sends to the worker
const mockProfile = {
  candidate: {
    full_name: 'Test User',
    email: 'test@example.com',
    linkedin: 'https://linkedin.com/in/testuser',
    location: 'San Francisco, CA',
    current_title: 'Senior Engineer',
    portfolio_url: 'https://testuser.dev',
    github: 'https://github.com/testuser',
  },
  talent_network: {
    considering_founding: true,
    is_student: false,
    newsletter: true,
  },
  target_roles: { primary: ['Staff Engineer'] },
  narrative: { superpowers: ['systems design'] },
};

// Import buildForm1Data and buildForm2Data
import { buildForm1Data, buildForm2Data } from './submit-to-network.mjs';

const form1 = buildForm1Data(mockProfile, engineeringCV);
truthy(form1.full_name === 'Test User', 'form1 includes name');
truthy(form1.email === 'test@example.com', 'form1 includes email');
truthy(form1.location === 'San Francisco, CA', 'form1 includes location');
truthy(form1.current_title === 'Senior Engineer', 'form1 includes title');
truthy(form1.continent === 'North America', 'form1 maps continent');
truthy(form1.craft_area !== null, 'form1 infers craft area');

const form2 = buildForm2Data(mockProfile, cvWithMetrics, null, null);
truthy(form2.accomplishments.length > 0, 'form2 synthesizes accomplishments');
truthy(form2.email === 'test@example.com', 'form2 includes email');

// ── Template registry ──────────────────────────────────────────

console.log('\n12. Template registry — listTemplates');

const allTemplates = await listTemplates();
eq(allTemplates.length, 8, 'registry discovers 8 templates');
truthy(allTemplates.includes('ink'), 'includes ink');
truthy(allTemplates.includes('terminal'), 'includes terminal');
truthy(allTemplates.includes('volt'), 'includes volt');
truthy(allTemplates.includes('folio'), 'includes folio');
truthy(allTemplates.includes('grid'), 'includes grid');
truthy(allTemplates.includes('statement'), 'includes statement');
truthy(allTemplates.includes('caps'), 'includes caps');
truthy(allTemplates.includes('bare'), 'includes bare');

console.log('\n13. Template registry — getTemplate error');

let invalidTemplateError = null;
try {
  await getTemplate('nonexistent-template');
} catch (err) {
  invalidTemplateError = err;
}
truthy(invalidTemplateError !== null, 'invalid template name throws error');
truthy(invalidTemplateError.message.includes('nonexistent-template'), 'error mentions invalid name');
truthy(invalidTemplateError.message.includes('ink'), 'error lists valid templates');

console.log('\n14. Template registry — default template is ink');

const defaultTemplate = await getTemplate('ink');
eq(defaultTemplate.name, 'ink', 'default template name is ink');

// ── Template smoke tests ──────────────────────────────────────

// Build sample data for all template tests
const sampleData = {
  name: 'Test User',
  headline: 'Building infrastructure for small teams',
  location: 'San Francisco, CA',
  email: 'test@example.com',
  linkedin: 'https://linkedin.com/in/testuser',
  github: 'https://github.com/testuser',
  summaryText: 'Experienced engineer with 10 years in distributed systems.',
  summaryShort: 'Experienced engineer with 10 years in distributed systems.',
  exitStory: 'Leaving BigCo after 4 years to build something new.',
  currentProject: 'building an open-source deploy orchestrator',
  superpowers: ['systems design', 'team building'],
  proofPoints: [
    { name: 'API requests/day', hero_metric: '340M', description: 'API requests/day served' },
    { name: 'Deploy improvement', hero_metric: '12x', description: 'deployment frequency' },
  ],
  targetRoles: ['Founding Engineer', 'Staff Engineer'],
  locationFlex: 'Open to remote',
  experience: [
    { company: 'BigCo', location: 'SF', role: 'Senior Engineer', dateRange: '2020 - 2024', bullets: ['Built payment infra', 'Led team of 5'] },
    { company: 'StartupCo', location: 'NYC', role: 'Engineer', dateRange: '2018 - 2020', bullets: ['Full-stack development'] },
  ],
  education: ['MIT — B.S. Computer Science'],
  skills: ['TypeScript', 'Go', 'Python', 'Kubernetes', 'PostgreSQL'],
  projects: [
    { name: 'Meridian', description: 'Open-source deploy orchestrator', heroMetric: '2.4K stars', url: 'https://github.com/test/meridian' },
    { name: 'Cache Framework', description: 'Distributed cache invalidation', heroMetric: '99.97% consistency', url: '' },
  ],
  experienceGroups: [
    { company: 'BigCo', location: 'SF', roles: [{ role: 'Senior Engineer', dateRange: '2020 - 2024', bullets: ['Built payment infra', 'Led team of 5'] }] },
    { company: 'StartupCo', location: 'NYC', roles: [{ role: 'Engineer', dateRange: '2018 - 2020', bullets: ['Full-stack development'] }] },
  ],
  esc,
  renderInlineMarkdown,
};

const TEMPLATE_NAMES = ['ink', 'terminal', 'volt', 'folio', 'grid', 'statement', 'caps', 'bare'];

for (const tmplName of TEMPLATE_NAMES) {
  console.log(`\n15-${tmplName}. Template smoke test: ${tmplName}`);

  const tmpl = await getTemplate(tmplName);

  // Validate exports
  eq(tmpl.name, tmplName, `${tmplName}: name matches`);
  truthy(Array.isArray(tmpl.fonts), `${tmplName}: fonts is array`);
  truthy(typeof tmpl.css === 'function', `${tmplName}: css is function`);
  truthy(typeof tmpl.pages === 'function', `${tmplName}: pages is function`);

  // CSS is non-empty string
  const cssResult = tmpl.css();
  truthy(typeof cssResult === 'string' && cssResult.length > 100, `${tmplName}: css() returns substantial CSS`);

  // Generate pages
  const pages = tmpl.pages(sampleData);
  truthy(typeof pages === 'object', `${tmplName}: pages() returns object`);
  truthy('index.html' in pages, `${tmplName}: generates index.html`);
  truthy('about.html' in pages, `${tmplName}: generates about.html`);
  truthy('work.html' in pages, `${tmplName}: generates work.html`);
  truthy('experience.html' in pages, `${tmplName}: generates experience.html`);

  // Check each page for required elements
  for (const [pageName, html] of Object.entries(pages)) {
    // Font links (bare has no fonts, so skip font check for bare)
    if (tmplName !== 'bare') {
      for (const fontUrl of tmpl.fonts) {
        truthy(html.includes(fontUrl), `${tmplName}/${pageName}: includes font link`);
      }
    }

    // "made by speedrun" footer
    truthy(
      html.includes('made by') && html.includes('speedrun'),
      `${tmplName}/${pageName}: has "made by speedrun" footer`
    );
    truthy(
      html.includes('https://github.com/a16z/speedrun-career-ops'),
      `${tmplName}/${pageName}: footer links to GitHub repo`
    );

    // Nav with Home/Work/Experience/About
    truthy(html.includes('<nav'), `${tmplName}/${pageName}: has nav element`);

    // Semantic HTML elements
    truthy(html.includes('<nav'), `${tmplName}/${pageName}: uses semantic nav`);
    truthy(html.includes('<footer'), `${tmplName}/${pageName}: uses semantic footer`);

    // Check for main element (except grid which has special structure)
    truthy(html.includes('<main') || html.includes('<div class="content"'), `${tmplName}/${pageName}: uses semantic main or content div`);

    // No pill-shaped elements (border-radius: 9999px)
    falsy(html.includes('9999px'), `${tmplName}/${pageName}: no pill-shaped elements`);
    falsy(html.includes('border-radius: 9999'), `${tmplName}/${pageName}: no pill border-radius`);

    // Print stylesheet
    truthy(html.includes('@media print'), `${tmplName}/${pageName}: has print stylesheet`);
  }
}

// ── SUMMARY ─────────────────────────────────────────────────────────

console.log('\n' + '='.repeat(50));
console.log(`\ud83d\udcca Results: ${passed} passed, ${failed} failed`);

if (failed > 0) {
  console.log('\ud83d\udd34 UNIT TESTS FAILED\n');
  process.exit(1);
} else {
  console.log('\ud83d\udfe2 All unit tests passed\n');
  process.exit(0);
}
