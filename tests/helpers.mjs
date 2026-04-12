/**
 * tests/helpers.mjs — Shared test harness for all test files.
 *
 * Provides assert functions, console coloring, and summary reporting.
 * Each test file creates its own Suite, runs tests, then calls report().
 */

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const DIM = '\x1b[2m';

export class Suite {
  constructor(name) {
    this.name = name;
    this.passed = 0;
    this.failed = 0;
    this.skipped = 0;
    this.failures = [];
  }

  pass(name) {
    this.passed++;
    console.log(`  ${GREEN}\u2713${RESET} ${DIM}${name}${RESET}`);
  }

  fail(name, detail) {
    this.failed++;
    const msg = detail ? `${name}: ${detail}` : name;
    this.failures.push(msg);
    console.log(`  ${RED}\u2717${RESET} ${name}${detail ? ` — ${detail}` : ''}`);
  }

  skip(name, reason) {
    this.skipped++;
    console.log(`  ${YELLOW}\u25CB${RESET} ${DIM}${name}${reason ? ` (${reason})` : ''}${RESET}`);
  }

  assert(condition, name) {
    if (condition) this.pass(name);
    else this.fail(name);
  }

  assertEqual(actual, expected, name) {
    if (actual === expected) {
      this.pass(name);
    } else {
      this.fail(name, `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    }
  }

  assertIncludes(haystack, needle, name) {
    if (typeof haystack === 'string' && haystack.includes(needle)) {
      this.pass(name);
    } else if (Array.isArray(haystack) && haystack.includes(needle)) {
      this.pass(name);
    } else {
      this.fail(name, `${JSON.stringify(needle)} not found`);
    }
  }

  assertGte(actual, expected, name) {
    if (actual >= expected) this.pass(name);
    else this.fail(name, `expected >= ${expected}, got ${actual}`);
  }

  assertType(value, type, name) {
    if (typeof value === type) this.pass(name);
    else this.fail(name, `expected type ${type}, got ${typeof value}`);
  }

  assertNoThrow(fn, name) {
    try {
      const result = fn();
      // handle async
      if (result && typeof result.then === 'function') {
        return result.then(() => this.pass(name)).catch(e => this.fail(name, e.message));
      }
      this.pass(name);
    } catch (e) {
      this.fail(name, e.message);
    }
  }

  report() {
    const total = this.passed + this.failed + this.skipped;
    console.log('');
    console.log(`  ${this.name}: ${total} tests — ${GREEN}${this.passed} passed${RESET}, ${this.failed > 0 ? RED : ''}${this.failed} failed${RESET}${this.skipped > 0 ? `, ${YELLOW}${this.skipped} skipped${RESET}` : ''}`);
    if (this.failures.length > 0) {
      console.log(`  Failures:`);
      for (const f of this.failures) {
        console.log(`    ${RED}\u2717${RESET} ${f}`);
      }
    }
    return { passed: this.passed, failed: this.failed, skipped: this.skipped, name: this.name };
  }
}

/**
 * Resolve a path relative to the project root.
 */
export function projectRoot() {
  return new URL('..', import.meta.url).pathname.replace(/\/$/, '');
}
