#!/usr/bin/env node

/**
 * tests/eval/run-evals.mjs — Product quality evaluation runner.
 *
 * Runs all evals (full-flow, visual-quality, abuse) and produces
 * a formatted report with pass/fail counts and overall score.
 *
 * Usage:
 *   node tests/eval/run-evals.mjs           # Full evaluation
 *   node tests/eval/run-evals.mjs --quick   # Quick mode (1 persona, 3 visual combos)
 */

import { runFullFlowEval } from './full-flow.eval.mjs';
import { runVisualQualityEval } from './visual-quality.eval.mjs';
import { runAbuseEval } from './abuse.eval.mjs';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';
const BOLD = '\x1b[1m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const quick = process.argv.includes('--quick');

function pad(str, len) {
  return String(str).padEnd(len);
}

function center(str, len) {
  const total = len - str.length;
  const left = Math.floor(total / 2);
  const right = total - left;
  return ' '.repeat(Math.max(0, left)) + str + ' '.repeat(Math.max(0, right));
}

async function main() {
  const startTime = Date.now();

  console.log('');
  console.log(`${BOLD}${CYAN}  PRODUCT QUALITY EVALUATION${RESET} ${quick ? `${DIM}(quick mode)${RESET}` : ''}`);
  console.log(`${DIM}  ${'='.repeat(48)}${RESET}`);

  // -----------------------------------------------------------------------
  // 1. Full flow eval
  // -----------------------------------------------------------------------
  console.log(`\n${BOLD}  [1/3] Full Flow Evaluation${RESET}`);
  let fullFlow;
  try {
    fullFlow = await runFullFlowEval({ quick });
  } catch (err) {
    console.error(`${RED}  Full flow eval failed: ${err.message}${RESET}`);
    console.error(err.stack);
    fullFlow = null;
  }

  // -----------------------------------------------------------------------
  // 2. Visual quality eval
  // -----------------------------------------------------------------------
  console.log(`\n${BOLD}  [2/3] Visual Quality Evaluation${RESET}`);
  let visual;
  try {
    visual = await runVisualQualityEval({ sampleSize: 20, quick });
  } catch (err) {
    console.error(`${RED}  Visual quality eval failed: ${err.message}${RESET}`);
    console.error(err.stack);
    visual = null;
  }

  // -----------------------------------------------------------------------
  // 3. Abuse eval
  // -----------------------------------------------------------------------
  console.log(`\n${BOLD}  [3/3] Abuse Prevention Evaluation${RESET}`);
  let abuse;
  try {
    abuse = await runAbuseEval();
  } catch (err) {
    console.error(`${RED}  Abuse eval failed: ${err.message}${RESET}`);
    abuse = null;
  }

  // -----------------------------------------------------------------------
  // Report
  // -----------------------------------------------------------------------
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  console.log('\n');

  const W = 56;
  const line = (content) => `  ${BOLD}${CYAN}\u2551${RESET} ${pad(content, W - 2)} ${BOLD}${CYAN}\u2551${RESET}`;
  const sep = `  ${BOLD}${CYAN}\u2560${'═'.repeat(W)}╣${RESET}`;
  const top = `  ${BOLD}${CYAN}\u2554${'═'.repeat(W)}╗${RESET}`;
  const bot = `  ${BOLD}${CYAN}\u255A${'═'.repeat(W)}╝${RESET}`;
  const blank = line('');

  console.log(top);
  console.log(line(center('PRODUCT QUALITY EVALUATION REPORT', W - 2)));
  console.log(sep);
  console.log(blank);

  // Stats
  let totalStructuralPassed = 0;
  let totalStructuralTotal = 0;
  let portfoliosGenerated = 0;
  let personasTested = 0;

  if (fullFlow) {
    personasTested = fullFlow.personasTested;
    portfoliosGenerated = fullFlow.portfoliosGenerated;
    totalStructuralPassed = fullFlow.structural.passed;
    totalStructuralTotal = fullFlow.structural.passed + fullFlow.structural.failed;

    console.log(line(`Personas tested: ${personasTested}`));
    console.log(line(`Portfolios generated: ${portfoliosGenerated}`));

    const structPct = totalStructuralTotal > 0
      ? ((totalStructuralPassed / totalStructuralTotal) * 100).toFixed(0)
      : '0';
    const structColor = structPct >= 90 ? GREEN : structPct >= 80 ? YELLOW : RED;
    console.log(line(`Structural checks: ${structColor}${totalStructuralPassed}/${totalStructuralTotal} passed (${structPct}%)${RESET}`));

    // Quality scores
    console.log(line(`Quality scores:`));
    const qs = fullFlow.quality.scores;
    if (qs.bioQuality !== undefined) console.log(line(`  Bio quality:        ${formatScore(qs.bioQuality)}/10 avg`));
    if (qs.contentDensity !== undefined) console.log(line(`  Content density:    ${formatScore(qs.contentDensity)}/10 avg`));
    if (qs.sectionBalance !== undefined) console.log(line(`  Section balance:    ${formatScore(qs.sectionBalance)}/10 avg`));
    if (qs.visualHierarchy !== undefined) console.log(line(`  Visual hierarchy:   ${formatScore(qs.visualHierarchy)}/10 avg`));
    if (qs.whitespace !== undefined) console.log(line(`  Whitespace:         ${formatScore(qs.whitespace)}/10 avg`));

    // Template recommendations
    const recTotal = fullFlow.templateRec.passed + fullFlow.templateRec.failed;
    console.log(line(`Template recommendations: ${fullFlow.templateRec.passed}/${recTotal} appropriate`));

    // Candidate detection
    const detTotal = fullFlow.detection.passed + fullFlow.detection.failed;
    console.log(line(`Candidate detection: ${fullFlow.detection.passed}/${detTotal} correct`));

    // All layouts
    const layoutTotal = fullFlow.allLayoutsCheck.passed + fullFlow.allLayoutsCheck.failed;
    if (layoutTotal > 0) {
      console.log(line(`All-layout check: ${fullFlow.allLayoutsCheck.passed}/${layoutTotal} passed`));
    }
  } else {
    console.log(line(`${RED}Full flow eval: FAILED TO RUN${RESET}`));
  }

  console.log(blank);

  // Visual quality
  if (visual) {
    const vizTotal = visual.passed + visual.failed;
    const vizColor = vizTotal > 0 && (visual.passed / vizTotal) >= 0.9 ? GREEN : YELLOW;
    console.log(line(`Visual quality (${visual.sampled} combos): ${vizColor}${visual.passed}/${vizTotal} pass${RESET}`));
  } else {
    console.log(line(`${YELLOW}Visual quality: FAILED TO RUN${RESET}`));
  }

  // Abuse prevention
  if (abuse) {
    if (abuse.workerRunning) {
      const abuseTotal = abuse.passed + abuse.failed;
      console.log(line(`Abuse prevention: ${abuse.passed}/${abuseTotal} blocked`));
    } else {
      console.log(line(`Abuse prevention: ${DIM}skipped (worker not running)${RESET}`));
    }
  } else {
    console.log(line(`${YELLOW}Abuse prevention: FAILED TO RUN${RESET}`));
  }

  console.log(blank);

  // -----------------------------------------------------------------------
  // Overall score
  // -----------------------------------------------------------------------
  let totalPassed = 0;
  let totalChecks = 0;

  if (fullFlow) {
    totalPassed += fullFlow.structural.passed;
    totalChecks += fullFlow.structural.passed + fullFlow.structural.failed;
    totalPassed += fullFlow.templateRec.passed;
    totalChecks += fullFlow.templateRec.passed + fullFlow.templateRec.failed;
    totalPassed += fullFlow.detection.passed;
    totalChecks += fullFlow.detection.passed + fullFlow.detection.failed;
    totalPassed += fullFlow.allLayoutsCheck.passed;
    totalChecks += fullFlow.allLayoutsCheck.passed + fullFlow.allLayoutsCheck.failed;
  }
  if (visual) {
    totalPassed += visual.passed;
    totalChecks += visual.passed + visual.failed;
  }
  if (abuse && abuse.workerRunning) {
    totalPassed += abuse.passed;
    totalChecks += abuse.passed + abuse.failed;
  }

  const overallPct = totalChecks > 0 ? ((totalPassed / totalChecks) * 100).toFixed(0) : 0;
  let verdict, verdictColor;
  if (overallPct >= 90) {
    verdict = 'SHIP IT';
    verdictColor = GREEN;
  } else if (overallPct >= 80) {
    verdict = 'SHIP WITH CONCERNS';
    verdictColor = YELLOW;
  } else {
    verdict = 'FIX BEFORE SHIPPING';
    verdictColor = RED;
  }

  console.log(line(`${BOLD}OVERALL: ${verdictColor}${overallPct}% -- ${verdict}${RESET}`));
  console.log(blank);
  console.log(line(`${DIM}Screenshots: tests/eval/output/${RESET}`));
  console.log(line(`${DIM}Completed in ${elapsed}s${RESET}`));
  console.log(blank);
  console.log(bot);

  // -----------------------------------------------------------------------
  // Detailed failures
  // -----------------------------------------------------------------------
  const failures = [];
  if (fullFlow) {
    for (const r of fullFlow.structural.results) {
      if (!r.pass) failures.push(`  Structural: [${r.persona}] ${r.name}${r.detail ? ` -- ${r.detail}` : ''}`);
    }
    for (const r of fullFlow.allLayoutsCheck.results) {
      if (!r.pass) failures.push(`  Layout: [${r.layout}] ${r.detail || 'failed'}`);
    }
    for (const r of fullFlow.detection.results) {
      if (!r.pass) failures.push(`  Detection: [${r.persona}] expected=${r.expected} got=${r.detected}`);
    }
    for (const r of fullFlow.templateRec.results) {
      if (!r.pass) failures.push(`  Template: [${r.persona}] ${r.detail}`);
    }
  }
  if (visual) {
    for (const r of visual.results) {
      if (!r.pass) {
        const failedChecks = Object.entries(r.checks).filter(([_, v]) => !v).map(([k]) => k).join(', ');
        failures.push(`  Visual: [${r.style} x ${r.layout}] failed: ${failedChecks}`);
      }
    }
  }
  if (abuse && abuse.workerRunning) {
    for (const r of abuse.results) {
      if (r.pass === false) failures.push(`  Abuse: ${r.name} -- ${r.detail}`);
    }
  }

  if (failures.length > 0) {
    console.log(`\n${BOLD}  Failures:${RESET}`);
    for (const f of failures) {
      console.log(`  ${RED}\u2717${RESET} ${f}`);
    }
  }

  console.log('');

  // Exit with failure code if below threshold
  const exitCode = overallPct >= 80 ? 0 : 1;
  process.exit(exitCode);
}

function formatScore(n) {
  return n !== undefined ? n.toFixed(1) : '?';
}

main().catch(err => {
  console.error(`\n${RED}Eval runner crashed: ${err.message}${RESET}`);
  console.error(err.stack);
  process.exit(1);
});
