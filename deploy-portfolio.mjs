#!/usr/bin/env node

/**
 * deploy-portfolio.mjs — Deploy portfolio site to GitHub Pages
 *
 * Usage:
 *   node deploy-portfolio.mjs [--dir=dist] [--repo=portfolio]
 *
 * Prerequisites:
 *   - gh CLI installed and authenticated
 *   - dist/index.html exists (run generate-portfolio.mjs first)
 *
 * Flow:
 *   1. Check gh CLI is available
 *   2. Get GitHub username
 *   3. Create repo if it doesn't exist
 *   4. Deploy with gh-pages
 *   5. Return the live URL
 */

import { execSync } from 'child_process';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ROOT = new URL('.', import.meta.url).pathname;

// Parse args
const args = process.argv.slice(2);
const getArg = (name, def) => {
  const match = args.find(a => a.startsWith(`--${name}=`));
  return match ? match.split('=')[1] : def;
};

const distDir = resolve(ROOT, getArg('dir', 'dist'));
const repoName = getArg('repo', 'portfolio');
const dryRun = args.includes('--dry-run');

function run(cmd, opts = {}) {
  try {
    return execSync(cmd, { encoding: 'utf-8', stdio: opts.silent ? 'pipe' : 'inherit', ...opts }).trim();
  } catch (e) {
    if (opts.allowFail) return null;
    throw e;
  }
}

function runSilent(cmd) {
  return run(cmd, { silent: true, allowFail: true });
}

// ── 1. Check prerequisites ──

console.log('Deploying portfolio to GitHub Pages...\n');

// Check dist exists
const indexPath = resolve(distDir, 'index.html');
if (!existsSync(indexPath)) {
  console.error(`Error: ${indexPath} not found.`);
  console.error('Run "node generate-portfolio.mjs" first to generate your portfolio.');
  process.exit(1);
}

const indexSize = readFileSync(indexPath).length;
console.log(`  Portfolio: ${indexPath} (${(indexSize / 1024).toFixed(1)} KB)`);

// Check gh CLI
const ghPath = runSilent('which gh');
if (!ghPath) {
  console.error('\nError: gh CLI not found.');
  console.error('Install it: https://cli.github.com/');
  console.error('\nAlternatively, you can manually deploy dist/index.html to any static host:');
  console.error('  - GitHub Pages: push dist/ to a gh-pages branch');
  console.error('  - Netlify: drag dist/ to app.netlify.com/drop');
  console.error('  - Cloudflare Pages: npx wrangler pages deploy dist/');
  process.exit(1);
}

// Check gh auth
const authStatus = runSilent('gh auth status 2>&1');
if (!authStatus || authStatus.includes('not logged in')) {
  console.error('\nError: gh CLI not authenticated.');
  console.error('Run: gh auth login');
  process.exit(1);
}

// ── 2. Get GitHub username ──

const username = runSilent('gh api user -q .login');
if (!username) {
  console.error('Error: Could not determine GitHub username.');
  process.exit(1);
}
console.log(`  GitHub user: ${username}`);

// ── 3. Create repo if needed ──

const repoExists = runSilent(`gh repo view ${username}/${repoName} --json name -q .name 2>/dev/null`);

if (!repoExists) {
  console.log(`\n  Creating repo ${username}/${repoName}...`);
  if (!dryRun) {
    run(`gh repo create ${repoName} --public --description "Personal portfolio — built with Speedrun Career Ops"`, { silent: true });
    console.log('  Repo created.');
  } else {
    console.log('  (dry run — would create repo)');
  }
} else {
  console.log(`  Repo ${username}/${repoName} already exists.`);
}

// ── 4. Add CNAME and nojekyll ──

// Create .nojekyll to prevent Jekyll processing
const nojekyllPath = resolve(distDir, '.nojekyll');
if (!existsSync(nojekyllPath)) {
  writeFileSync(nojekyllPath, '');
}

// ── 5. Deploy ──

const pageUrl = `https://${username}.github.io/${repoName}`;

if (dryRun) {
  console.log(`\n  (dry run — would deploy to ${pageUrl})`);
  console.log('  Done.');
  process.exit(0);
}

console.log('\n  Deploying to GitHub Pages...');

// Check if npx gh-pages is available
try {
  run(`npx gh-pages -d "${distDir}" -r "https://github.com/${username}/${repoName}.git" -m "Deploy portfolio"`, { silent: true });
} catch (e) {
  // Fallback: init a git repo in dist, push to gh-pages branch manually
  console.log('  gh-pages package failed, using manual git push...');
  try {
    const cmds = [
      `cd "${distDir}"`,
      'git init',
      'git checkout -b gh-pages',
      'git add -A',
      'git commit -m "Deploy portfolio"',
      `git remote add origin https://github.com/${username}/${repoName}.git`,
      'git push -f origin gh-pages',
    ].join(' && ');
    run(cmds, { silent: true });
  } catch (e2) {
    console.error('\nError deploying. You can manually push dist/ to your repo:');
    console.error(`  cd dist && git init && git checkout -b gh-pages && git add -A && git commit -m "Deploy" && git remote add origin https://github.com/${username}/${repoName}.git && git push -f origin gh-pages`);
    process.exit(1);
  }
}

// ── 6. Enable GitHub Pages (if not already) ──

// gh-pages branch deploy should auto-enable, but let's make sure
runSilent(`gh api repos/${username}/${repoName}/pages -X POST -f build_type=legacy -f source='{"branch":"gh-pages","path":"/"}' 2>/dev/null`);

// ── 7. Update profile.yml ──

const profilePath = resolve(ROOT, 'config/profile.yml');
if (existsSync(profilePath)) {
  let profileContent = readFileSync(profilePath, 'utf-8');
  if (profileContent.includes('portfolio_url:')) {
    profileContent = profileContent.replace(
      /portfolio_url:\s*"[^"]*"/,
      `portfolio_url: "${pageUrl}"`
    );
  } else {
    // Add after github line
    profileContent = profileContent.replace(
      /(github:\s*"[^"]*")/,
      `$1\n  portfolio_url: "${pageUrl}"`
    );
  }
  writeFileSync(profilePath, profileContent);
  console.log('  Updated config/profile.yml with portfolio URL.');
}

// ── 8. Done ──

console.log(`
  Portfolio deployed!

  URL: ${pageUrl}

  Note: GitHub Pages may take 1-2 minutes to go live.
  Your profile.yml has been updated with the portfolio URL.
`);
