#!/usr/bin/env node

/**
 * cli.mjs — Quick-start CLI for speedrun-career-ops
 *
 * Usage: npx speedrun-career-ops
 *
 * Creates a project directory, copies necessary files, and instructs
 * the user to run 'claude' to start.
 */

import { existsSync, mkdirSync, cpSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import { execSync } from 'child_process';

const projectName = 'my-portfolio';
const projectDir = resolve(process.cwd(), projectName);

console.log('speedrun-career-ops\n');
console.log('168 portfolio templates. Two commands. Free.\n');

// Check Node.js version
const nodeVersion = parseInt(process.versions.node.split('.')[0], 10);
if (nodeVersion < 18) {
  console.error('ERROR: Node.js 18+ is required. You have ' + process.versions.node);
  process.exit(1);
}

// Create project directory
if (existsSync(projectDir)) {
  console.log(`Directory ${projectName}/ already exists. Using it.`);
} else {
  mkdirSync(projectDir, { recursive: true });
  console.log(`Created ${projectName}/`);
}

// Copy essential files
const essentialDirs = ['styles', 'layouts', 'lib', 'config', 'modes', 'templates'];
const essentialFiles = [
  'combine-portfolio.mjs',
  'generate-portfolio.mjs',
  'deploy-portfolio.mjs',
  'validate-styles.mjs',
  'test-portfolio.mjs',
  'compatibility.json',
  'package.json',
  'CLAUDE.md',
  'DESIGN.md',
  'DATA_CONTRACT.md',
];

const srcDir = new URL('.', import.meta.url).pathname;

for (const dir of essentialDirs) {
  const src = join(srcDir, dir);
  const dest = join(projectDir, dir);
  if (existsSync(src)) {
    cpSync(src, dest, { recursive: true });
  }
}

for (const file of essentialFiles) {
  const src = join(srcDir, file);
  const dest = join(projectDir, file);
  if (existsSync(src)) {
    cpSync(src, dest);
  }
}

// Create starter files
const starterProfile = join(projectDir, 'config', 'profile.yml');
const starterCV = join(projectDir, 'cv.md');

if (!existsSync(starterProfile)) {
  const profileExample = join(srcDir, 'config', 'profile.example.yml');
  if (existsSync(profileExample)) {
    cpSync(profileExample, starterProfile);
  }
}

if (!existsSync(starterCV)) {
  writeFileSync(starterCV, '# Your CV\n\n## Summary\n\nPaste your resume content here.\n\n## Experience\n\n## Education\n\n## Skills\n', 'utf-8');
}

// Install dependencies
console.log('Installing dependencies...');
try {
  execSync('npm install --production', { cwd: projectDir, stdio: 'pipe' });
  console.log('Dependencies installed.');
} catch {
  console.log('npm install failed. Run it manually: cd my-portfolio && npm install');
}

console.log(`
Project ready!

  cd ${projectName}
  claude

Claude will walk you through onboarding and build your portfolio.
168 style x layout combinations. Deploys free to GitHub Pages.

made by the a16z speedrun team
`);
