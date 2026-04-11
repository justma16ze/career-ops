#!/usr/bin/env node

/**
 * setup.mjs — Lightweight postinstall for speedrun-career-ops
 *
 * Creates directories and copies templates. That's it.
 * Heavy dependency installation (Playwright, Go, gh) is handled by
 * Claude Code at runtime — see CLAUDE.md "Step 0: Dependencies".
 *
 * Runs automatically after `npm install`. Never fails.
 */

import { existsSync, mkdirSync, copyFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const ROOT = dirname(fileURLToPath(import.meta.url));

// Create required directories
for (const dir of ['data', 'output', 'reports', 'jds', 'batch/logs', 'batch/tracker-additions']) {
  const p = join(ROOT, dir);
  if (!existsSync(p)) mkdirSync(p, { recursive: true });
}

// Copy template files if user copies don't exist yet
const templates = [
  ['templates/portals.example.yml', 'portals.yml'],
];
for (const [src, dst] of templates) {
  const dstPath = join(ROOT, dst);
  const srcPath = join(ROOT, src);
  if (!existsSync(dstPath) && existsSync(srcPath)) {
    copyFileSync(srcPath, dstPath);
  }
}

console.log('speedrun-career-ops: directories ready. Run `claude` and type /speedrun to start.');
