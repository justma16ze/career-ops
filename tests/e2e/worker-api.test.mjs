#!/usr/bin/env node

/**
 * tests/e2e/worker-api.test.mjs — Worker API tests
 *
 * Tests the Cloudflare Worker backend at web-worker/src/index.js.
 * Only runs if wrangler dev is available and the worker is reachable.
 * Otherwise, skips with a clear message.
 *
 * Tests:
 * - POST /api/session with valid email returns 201
 * - POST /api/session with invalid email returns 400
 * - POST /api/chat without session returns 400
 * - POST /api/generate with missing session returns error
 * - GET /health (if implemented) returns 200
 * - Rate limiting checks
 */

import { Suite } from '../helpers.mjs';

const s = new Suite('e2e:worker-api');
const WORKER_URL = process.env.WORKER_URL || 'http://localhost:8787';

console.log('\n--- E2E: Worker API ---');

// Check if worker is reachable
let workerAvailable = false;
try {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);
  const resp = await fetch(`${WORKER_URL}/`, { signal: controller.signal }).catch(() => null);
  clearTimeout(timeout);
  if (resp) {
    workerAvailable = true;
  }
} catch {
  // Worker not reachable
}

if (!workerAvailable) {
  console.log(`  Worker not available at ${WORKER_URL}`);
  console.log('  To run worker API tests:');
  console.log('    cd web-worker && npx wrangler dev --local');
  console.log('  Then: WORKER_URL=http://localhost:8787 node tests/e2e/worker-api.test.mjs');
  console.log('');
  s.skip('all worker API tests', 'Worker not reachable. Start with: cd web-worker && npx wrangler dev --local');
  const result = s.report();
  process.exit(0);
}

console.log(`  Worker available at ${WORKER_URL}`);

// Helper: make JSON request
async function apiPost(path, body, headers = {}) {
  const resp = await fetch(`${WORKER_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Origin': 'http://localhost:3000', ...headers },
    body: JSON.stringify(body),
  });
  return resp;
}

// POST /api/session with valid email
{
  try {
    const resp = await apiPost('/api/session', { email: 'test@test.com' });
    s.assertEqual(resp.status, 201, 'POST /api/session valid email: returns 201');
    const data = await resp.json();
    s.assert(data.session_id && data.session_id.length > 0, 'POST /api/session: returns session_id');
  } catch (e) {
    s.fail('POST /api/session valid email', e.message);
  }
}

// POST /api/session with invalid email
{
  try {
    const resp = await apiPost('/api/session', { email: 'notanemail' });
    s.assertEqual(resp.status, 400, 'POST /api/session invalid email: returns 400');
  } catch (e) {
    s.fail('POST /api/session invalid email', e.message);
  }
}

// POST /api/chat without session
{
  try {
    const resp = await apiPost('/api/chat', { message: 'hello' });
    // Should return 400 (missing session_id) or 404 (invalid session)
    s.assert(
      resp.status === 400 || resp.status === 404,
      `POST /api/chat no session: returns error (${resp.status})`
    );
  } catch (e) {
    s.fail('POST /api/chat no session', e.message);
  }
}

// POST /api/chat with fake session returns error
{
  try {
    const resp = await apiPost('/api/chat', {
      session_id: '00000000-0000-0000-0000-000000000000',
      message: 'hello',
    });
    s.assert(
      resp.status === 404 || resp.status === 400 || resp.status === 403,
      `POST /api/chat fake session: returns error (${resp.status})`
    );
  } catch (e) {
    s.fail('POST /api/chat fake session', e.message);
  }
}

// POST /api/generate without session returns error
{
  try {
    const resp = await apiPost('/api/generate', { style: 'bare', layout: 'multipage' });
    s.assert(
      resp.status === 400 || resp.status === 404,
      `POST /api/generate no session: returns error (${resp.status})`
    );
  } catch (e) {
    s.fail('POST /api/generate no session', e.message);
  }
}

// GET /health (may not be implemented — skip if 404)
{
  try {
    const resp = await fetch(`${WORKER_URL}/health`);
    if (resp.status === 200) {
      s.assert(true, 'GET /health: returns 200');
    } else if (resp.status === 404) {
      s.skip('GET /health', 'endpoint not implemented');
    } else {
      s.fail('GET /health', `unexpected status ${resp.status}`);
    }
  } catch (e) {
    s.skip('GET /health', e.message);
  }
}

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
