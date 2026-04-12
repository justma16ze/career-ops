#!/usr/bin/env node

/**
 * tests/run-all.mjs — Master test runner
 *
 * Runs all test suites and produces a summary report.
 *
 * Usage:
 *   node tests/run-all.mjs             # Run everything
 *   node tests/run-all.mjs --unit      # Unit tests only
 *   node tests/run-all.mjs --e2e       # E2E tests only
 *   node tests/run-all.mjs --visual    # Visual regression only
 *   node tests/run-all.mjs --unit --no-visual   # Quick mode
 *   node tests/run-all.mjs --update-baselines   # Regenerate visual baselines
 */

import { spawn } from 'child_process';
import { writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

// -------------------------------------------------------------------------
// Parse args
// -------------------------------------------------------------------------

const args = new Set(process.argv.slice(2));
const runUnit = args.has('--unit') || (!args.has('--e2e') && !args.has('--visual'));
const runE2e = args.has('--e2e') || (!args.has('--unit') && !args.has('--visual'));
const runVisual = args.has('--visual') || (!args.has('--unit') && !args.has('--e2e') && !args.has('--no-visual'));
const noVisual = args.has('--no-visual');
const updateBaselines = args.has('--update-baselines');

// -------------------------------------------------------------------------
// Test definitions
// -------------------------------------------------------------------------

const unitTests = [
  { name: 'parse-data', file: 'tests/unit/parse-data.test.mjs' },
  { name: 'styles', file: 'tests/unit/styles.test.mjs' },
  { name: 'layouts', file: 'tests/unit/layouts.test.mjs' },
  { name: 'combine', file: 'tests/unit/combine.test.mjs' },
];

const e2eTests = [
  { name: 'portfolio-generation', file: 'tests/e2e/portfolio-generation.test.mjs' },
  { name: 'web-frontend', file: 'tests/e2e/web-frontend.test.mjs' },
  { name: 'worker-api', file: 'tests/e2e/worker-api.test.mjs' },
];

const visualTests = [
  { name: 'visual-regression', file: 'tests/visual/regression.test.mjs' },
];

// -------------------------------------------------------------------------
// Run a single test file as a child process
// -------------------------------------------------------------------------

function runTest(testFile, extraArgs = []) {
  return new Promise((resolve) => {
    const fullPath = `${ROOT}/${testFile}`;
    const child = spawn('node', [fullPath, ...extraArgs], {
      cwd: ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, FORCE_COLOR: '1' },
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (data) => {
      const text = data.toString();
      stdout += text;
      process.stdout.write(text);
    });

    child.stderr.on('data', (data) => {
      const text = data.toString();
      stderr += text;
      process.stderr.write(text);
    });

    child.on('close', (code) => {
      resolve({ code, stdout, stderr });
    });

    child.on('error', (err) => {
      resolve({ code: 1, stdout, stderr: stderr + err.message });
    });
  });
}

// -------------------------------------------------------------------------
// Extract counts from test output
// -------------------------------------------------------------------------

function extractCounts(output) {
  // Look for lines like "N tests — X passed, Y failed, Z skipped"
  const match = output.match(/(\d+)\s+tests?\s*[—-]\s*(\d+)\s+passed,\s*(\d+)\s+failed(?:,\s*(\d+)\s+skipped)?/);
  if (match) {
    return {
      total: parseInt(match[1]),
      passed: parseInt(match[2]),
      failed: parseInt(match[3]),
      skipped: parseInt(match[4] || '0'),
    };
  }
  // Fallback: count check/cross marks
  const passes = (output.match(/\u2713/g) || []).length;
  const fails = (output.match(/\u2717/g) || []).length;
  const skips = (output.match(/\u25CB/g) || []).length;
  return { total: passes + fails + skips, passed: passes, failed: fails, skipped: skips };
}

// -------------------------------------------------------------------------
// Main
// -------------------------------------------------------------------------

async function main() {
  const startTime = Date.now();
  console.log(`${BOLD}Speedrun Career Ops — Test Suite${RESET}\n`);

  const results = [];

  // Unit tests
  if (runUnit) {
    console.log(`${BOLD}Unit Tests${RESET}`);
    console.log('='.repeat(60));
    for (const test of unitTests) {
      const { code, stdout } = await runTest(test.file);
      const counts = extractCounts(stdout);
      results.push({ ...test, ...counts, code, category: 'unit' });
    }
    console.log('');
  }

  // E2E tests
  if (runE2e) {
    console.log(`${BOLD}E2E Tests${RESET}`);
    console.log('='.repeat(60));
    for (const test of e2eTests) {
      const { code, stdout } = await runTest(test.file);
      const counts = extractCounts(stdout);
      results.push({ ...test, ...counts, code, category: 'e2e' });
    }
    console.log('');
  }

  // Visual regression tests
  if (runVisual && !noVisual) {
    console.log(`${BOLD}Visual Regression Tests${RESET}`);
    console.log('='.repeat(60));
    for (const test of visualTests) {
      const extraArgs = updateBaselines ? ['--update-baselines'] : [];
      const { code, stdout } = await runTest(test.file, extraArgs);
      const counts = extractCounts(stdout);
      results.push({ ...test, ...counts, code, category: 'visual' });
    }
    console.log('');
  }

  // -------------------------------------------------------------------------
  // Summary
  // -------------------------------------------------------------------------

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
  const totalPassed = results.reduce((sum, r) => sum + r.passed, 0);
  const totalFailed = results.reduce((sum, r) => sum + r.failed, 0);
  const totalSkipped = results.reduce((sum, r) => sum + r.skipped, 0);
  const totalTests = totalPassed + totalFailed + totalSkipped;
  const allPassed = totalFailed === 0;

  console.log('='.repeat(60));
  console.log(`${BOLD}Summary${RESET} (${elapsed}s)\n`);

  for (const r of results) {
    const statusIcon = r.failed > 0 ? `${RED}\u2717${RESET}` : `${GREEN}\u2713${RESET}`;
    const failStr = r.failed > 0 ? ` ${RED}${r.failed} failed${RESET}` : '';
    const skipStr = r.skipped > 0 ? ` ${YELLOW}${r.skipped} skipped${RESET}` : '';
    console.log(`  ${statusIcon} ${r.name} — ${r.passed} passed${failStr}${skipStr}`);
  }

  console.log('');
  console.log(`  ${BOLD}Total:${RESET} ${totalTests} tests — ${GREEN}${totalPassed} passed${RESET}, ${totalFailed > 0 ? RED : ''}${totalFailed} failed${RESET}${totalSkipped > 0 ? `, ${YELLOW}${totalSkipped} skipped${RESET}` : ''}`);
  console.log(`  ${allPassed ? `${GREEN}ALL TESTS PASSED${RESET}` : `${RED}SOME TESTS FAILED${RESET}`}`);
  console.log('');

  // -------------------------------------------------------------------------
  // Write report
  // -------------------------------------------------------------------------

  const reportLines = [
    `# Test Report`,
    ``,
    `Date: ${new Date().toISOString()}`,
    `Duration: ${elapsed}s`,
    ``,
    `## Results`,
    ``,
    `| Suite | Passed | Failed | Skipped | Status |`,
    `|-------|--------|--------|---------|--------|`,
    ...results.map(r => `| ${r.name} | ${r.passed} | ${r.failed} | ${r.skipped} | ${r.failed > 0 ? 'FAIL' : 'PASS'} |`),
    ``,
    `## Totals`,
    ``,
    `- **Total tests:** ${totalTests}`,
    `- **Passed:** ${totalPassed}`,
    `- **Failed:** ${totalFailed}`,
    `- **Skipped:** ${totalSkipped}`,
    `- **Result:** ${allPassed ? 'ALL PASSED' : 'FAILURES DETECTED'}`,
    ``,
  ];

  if (totalFailed > 0) {
    reportLines.push(`## Failures`);
    reportLines.push('');
    for (const r of results) {
      if (r.failed > 0) {
        reportLines.push(`### ${r.name}`);
        reportLines.push(`${r.failed} test(s) failed. Run \`node ${r.file}\` for details.`);
        reportLines.push('');
      }
    }
  }

  try {
    await writeFile(resolve(__dirname, 'report.md'), reportLines.join('\n'), 'utf-8');
  } catch {
    // Non-fatal if report can't be written
  }

  process.exit(allPassed ? 0 : 1);
}

main().catch(e => {
  console.error('Test runner crashed:', e.message);
  process.exit(1);
});
