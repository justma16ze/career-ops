#!/usr/bin/env node

/**
 * Tests for expanded signals pipeline in submit-to-network.mjs
 *
 * Covers:
 *   1. buildExpandedSignals extracts new profile.yml fields correctly
 *   2. Retry queue: enqueue, load, drain with simulated success/failure
 *   3. Backward compatibility: old profile.yml without new fields still works
 *
 * Run: node test/submit-expanded.test.mjs
 */

import { strict as assert } from 'assert';
import { existsSync, mkdirSync, writeFileSync, readFileSync, unlinkSync, rmSync } from 'fs';
import { join } from 'path';
import { tmpdir, homedir } from 'os';
import {
  buildExpandedSignals,
  buildForm1Data,
  buildForm2Data,
  validate,
  enqueueRetry,
  loadRetryQueue,
  writeRetryQueue,
  RETRY_QUEUE_FILE,
} from '../submit-to-network.mjs';

// ── Test Helpers ──────────────────────────────────────────────────

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    passed++;
  } catch (err) {
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    ${err.message}`);
    failed++;
  }
}

async function testAsync(name, fn) {
  try {
    await fn();
    console.log(`  \x1b[32m✓\x1b[0m ${name}`);
    passed++;
  } catch (err) {
    console.log(`  \x1b[31m✗\x1b[0m ${name}`);
    console.log(`    ${err.message}`);
    failed++;
  }
}

// ── Test Fixtures ─────────────────────────────────────────────────

const FULL_PROFILE = {
  candidate: {
    full_name: 'Test User',
    email: 'test@example.com',
    location: 'San Francisco, CA',
    linkedin: 'https://linkedin.com/in/testuser',
    portfolio_url: 'https://testuser.dev',
    github: 'github.com/testuser',
  },
  narrative: {
    headline: 'ML Engineer',
    motivation: 'I want to work on problems that matter at early-stage companies.',
    current_project: 'Building an AI screening tool',
    current_project_detail: 'A pipeline that ingests 126K candidate profiles from Gem, scores them with Claude, and surfaces top matches to hiring managers. Currently processing 500/day with 92% precision.',
    superpowers: ['ML pipelines', 'Fast prototyping'],
  },
  preferences: {
    company_rankings: ['Anthropic', 'OpenAI', 'Anysphere', 'Vercel'],
    stage_preference: 'Series A-B',
    deal_breakers: ['No remote', 'Requires PhD', 'Defense sector'],
    work_style: 'Async-first, deep work blocks',
  },
  portfolio: {
    template: 'terminal',
  },
  target_roles: {
    primary: ['Senior AI Engineer', 'Staff ML Engineer'],
  },
  talent_network: {
    considering_founding: false,
    is_student: false,
    newsletter: true,
    current_project: 'AI screening tool',
  },
  compensation: {
    target_range: '$150K-200K',
    location_flexibility: 'Remote preferred',
  },
};

const MINIMAL_PROFILE = {
  candidate: {
    full_name: 'Old User',
    email: 'old@example.com',
    location: 'New York',
    linkedin: 'https://linkedin.com/in/olduser',
  },
  target_roles: {
    primary: ['Product Manager'],
  },
  talent_network: {
    considering_founding: false,
    is_student: false,
    newsletter: true,
    current_project: '',
  },
};

const SAMPLE_CV = `# Test User

## Summary
ML Engineer with 8 years of experience.

## Experience
### Acme Corp — Senior ML Engineer
- Built ML pipeline processing $2M in revenue
- Reduced inference latency by 40%
`;

// ── Tests: Expanded Signals Extraction ────────────────────────────

console.log('\n\x1b[1mExpanded Signals Extraction\x1b[0m');

test('extracts all expanded signal fields from full profile', () => {
  const signals = buildExpandedSignals(FULL_PROFILE);
  assert.ok(signals, 'should return signals object');
  assert.equal(signals.motivation, FULL_PROFILE.narrative.motivation);
  assert.equal(signals.current_project_detail, FULL_PROFILE.narrative.current_project_detail);
  assert.deepEqual(signals.company_rankings, FULL_PROFILE.preferences.company_rankings);
  assert.equal(signals.stage_preference, FULL_PROFILE.preferences.stage_preference);
  assert.deepEqual(signals.deal_breakers, FULL_PROFILE.preferences.deal_breakers);
  assert.equal(signals.work_style, FULL_PROFILE.preferences.work_style);
  assert.equal(signals.template_chosen, 'terminal');
});

test('returns null when no expanded signal fields are present', () => {
  const signals = buildExpandedSignals(MINIMAL_PROFILE);
  assert.equal(signals, null, 'should return null for profile without new fields');
});

test('returns null for empty profile', () => {
  const signals = buildExpandedSignals({});
  assert.equal(signals, null);
});

test('returns null for null/undefined profile', () => {
  assert.equal(buildExpandedSignals(null), null);
  assert.equal(buildExpandedSignals(undefined), null);
});

test('handles partial expanded signals (only motivation)', () => {
  const partial = {
    ...MINIMAL_PROFILE,
    narrative: { ...MINIMAL_PROFILE.narrative, motivation: 'Career growth' },
  };
  const signals = buildExpandedSignals(partial);
  assert.ok(signals);
  assert.equal(signals.motivation, 'Career growth');
  assert.equal(signals.stage_preference, undefined);
  assert.equal(signals.company_rankings, undefined);
});

test('handles partial expanded signals (only preferences)', () => {
  const partial = {
    ...MINIMAL_PROFILE,
    preferences: { stage_preference: 'Seed' },
  };
  const signals = buildExpandedSignals(partial);
  assert.ok(signals);
  assert.equal(signals.stage_preference, 'Seed');
  assert.equal(signals.motivation, undefined);
});

test('truncates long motivation to 2000 chars', () => {
  const longMotivation = 'x'.repeat(3000);
  const profile = {
    narrative: { motivation: longMotivation },
  };
  const signals = buildExpandedSignals(profile);
  assert.equal(signals.motivation.length, 2000);
});

test('wraps non-array company_rankings into array', () => {
  const profile = {
    preferences: { company_rankings: 'Anthropic' },
  };
  const signals = buildExpandedSignals(profile);
  assert.deepEqual(signals.company_rankings, ['Anthropic']);
});

test('wraps non-array deal_breakers into array', () => {
  const profile = {
    preferences: { deal_breakers: 'No remote' },
  };
  const signals = buildExpandedSignals(profile);
  assert.deepEqual(signals.deal_breakers, ['No remote']);
});

// ── Tests: Backward Compatibility ─────────────────────────────────

console.log('\n\x1b[1mBackward Compatibility\x1b[0m');

test('old profile without new fields passes validation', () => {
  const { errors } = validate(MINIMAL_PROFILE, SAMPLE_CV);
  assert.equal(errors.length, 0, `Unexpected errors: ${errors.join(', ')}`);
});

test('buildForm1Data works with minimal profile', () => {
  const form1 = buildForm1Data(MINIMAL_PROFILE, SAMPLE_CV);
  assert.equal(form1.full_name, 'Old User');
  assert.equal(form1.email, 'old@example.com');
});

test('buildForm2Data works with minimal profile', () => {
  const form2 = buildForm2Data(MINIMAL_PROFILE, SAMPLE_CV, null, null);
  assert.ok(form2.accomplishments !== undefined);
  assert.equal(form2.current_project, '');
});

test('full profile with expanded signals still builds form1/form2 correctly', () => {
  const form1 = buildForm1Data(FULL_PROFILE, SAMPLE_CV);
  const form2 = buildForm2Data(FULL_PROFILE, SAMPLE_CV, null, null);
  assert.equal(form1.full_name, 'Test User');
  assert.equal(form1.email, 'test@example.com');
  assert.equal(form2.current_project, 'AI screening tool');
});

// ── Tests: Retry Queue ────────────────────────────────────────────

console.log('\n\x1b[1mRetry Queue\x1b[0m');

// Use a temporary backup approach to avoid polluting real queue
const REAL_QUEUE_BACKUP = RETRY_QUEUE_FILE + '.test-backup';

function setupRetryTest() {
  // Back up existing queue if present
  if (existsSync(RETRY_QUEUE_FILE)) {
    writeFileSync(REAL_QUEUE_BACKUP, readFileSync(RETRY_QUEUE_FILE));
  }
  // Start clean
  if (existsSync(RETRY_QUEUE_FILE)) unlinkSync(RETRY_QUEUE_FILE);
}

function teardownRetryTest() {
  // Clean up test queue
  if (existsSync(RETRY_QUEUE_FILE)) unlinkSync(RETRY_QUEUE_FILE);
  // Restore backup if it existed
  if (existsSync(REAL_QUEUE_BACKUP)) {
    writeFileSync(RETRY_QUEUE_FILE, readFileSync(REAL_QUEUE_BACKUP));
    unlinkSync(REAL_QUEUE_BACKUP);
  }
}

test('enqueue adds payload to retry queue file', () => {
  setupRetryTest();
  try {
    const payload = { name: 'Test', email: 'test@test.com' };
    enqueueRetry(payload);
    assert.ok(existsSync(RETRY_QUEUE_FILE), 'Queue file should exist');
    const queue = loadRetryQueue();
    assert.equal(queue.length, 1);
    assert.deepEqual(queue[0].payload, payload);
    assert.equal(queue[0].attempts, 0);
    assert.ok(queue[0].queued_at, 'should have queued_at timestamp');
  } finally {
    teardownRetryTest();
  }
});

test('enqueue appends multiple items', () => {
  setupRetryTest();
  try {
    enqueueRetry({ name: 'A' });
    enqueueRetry({ name: 'B' });
    enqueueRetry({ name: 'C' });
    const queue = loadRetryQueue();
    assert.equal(queue.length, 3);
    assert.equal(queue[0].payload.name, 'A');
    assert.equal(queue[2].payload.name, 'C');
  } finally {
    teardownRetryTest();
  }
});

test('loadRetryQueue returns empty array when file does not exist', () => {
  setupRetryTest();
  try {
    const queue = loadRetryQueue();
    assert.deepEqual(queue, []);
  } finally {
    teardownRetryTest();
  }
});

test('writeRetryQueue clears file when given empty array', () => {
  setupRetryTest();
  try {
    enqueueRetry({ name: 'temp' });
    assert.ok(existsSync(RETRY_QUEUE_FILE));
    writeRetryQueue([]);
    assert.ok(!existsSync(RETRY_QUEUE_FILE), 'Queue file should be removed');
  } finally {
    teardownRetryTest();
  }
});

test('writeRetryQueue writes filtered items back', () => {
  setupRetryTest();
  try {
    const items = [
      { payload: { name: 'Keep' }, queued_at: new Date().toISOString(), attempts: 1 },
    ];
    writeRetryQueue(items);
    const reloaded = loadRetryQueue();
    assert.equal(reloaded.length, 1);
    assert.equal(reloaded[0].payload.name, 'Keep');
    assert.equal(reloaded[0].attempts, 1);
  } finally {
    teardownRetryTest();
  }
});

test('loadRetryQueue handles corrupt lines gracefully', () => {
  setupRetryTest();
  try {
    const talentDir = join(homedir(), '.speedrun-talent');
    if (!existsSync(talentDir)) mkdirSync(talentDir, { recursive: true });
    writeFileSync(RETRY_QUEUE_FILE,
      '{"payload":{"name":"Good"},"queued_at":"2026-01-01","attempts":0}\n' +
      'NOT VALID JSON\n' +
      '{"payload":{"name":"AlsoGood"},"queued_at":"2026-01-02","attempts":1}\n'
    );
    const queue = loadRetryQueue();
    assert.equal(queue.length, 2, 'should skip corrupt line');
    assert.equal(queue[0].payload.name, 'Good');
    assert.equal(queue[1].payload.name, 'AlsoGood');
  } finally {
    teardownRetryTest();
  }
});

// ── Tests: Expanded Signals in Payload Construction ───────────────

console.log('\n\x1b[1mPayload Construction with Expanded Signals\x1b[0m');

test('expanded_signals included in payload when profile has new fields', () => {
  const signals = buildExpandedSignals(FULL_PROFILE);
  const payload = {
    name: FULL_PROFILE.candidate.full_name,
    email: FULL_PROFILE.candidate.email,
  };
  if (signals) payload.expanded_signals = signals;

  assert.ok(payload.expanded_signals, 'payload should have expanded_signals');
  assert.equal(payload.expanded_signals.motivation, FULL_PROFILE.narrative.motivation);
  assert.equal(payload.expanded_signals.stage_preference, 'Series A-B');
  assert.deepEqual(payload.expanded_signals.deal_breakers, ['No remote', 'Requires PhD', 'Defense sector']);
});

test('expanded_signals NOT included in payload for old-style profile', () => {
  const signals = buildExpandedSignals(MINIMAL_PROFILE);
  const payload = {
    name: MINIMAL_PROFILE.candidate.full_name,
    email: MINIMAL_PROFILE.candidate.email,
  };
  if (signals) payload.expanded_signals = signals;

  assert.equal(payload.expanded_signals, undefined, 'payload should NOT have expanded_signals');
});

test('existing Gem payload fields remain unchanged when expanded_signals added', () => {
  const form1 = buildForm1Data(FULL_PROFILE, SAMPLE_CV);
  const form2 = buildForm2Data(FULL_PROFILE, SAMPLE_CV, null, null);
  const signals = buildExpandedSignals(FULL_PROFILE);

  const payload = {
    name: form1.full_name,
    email: form1.email,
    location: form1.location,
    craft: form1.craft_area,
    accomplishments: form2.accomplishments,
    building: form2.current_project,
  };
  if (signals) payload.expanded_signals = signals;

  // Gem fields intact
  assert.equal(payload.name, 'Test User');
  assert.equal(payload.email, 'test@example.com');
  assert.equal(payload.building, 'AI screening tool');
  // Expanded signals separate
  assert.ok(payload.expanded_signals);
  assert.equal(payload.expanded_signals.template_chosen, 'terminal');
});

// ── Summary ───────────────────────────────────────────────────────

console.log(`\n\x1b[1mResults: ${passed} passed, ${failed} failed\x1b[0m\n`);
process.exit(failed > 0 ? 1 : 0);
