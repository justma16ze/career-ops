#!/usr/bin/env node

/**
 * generate-share-kit.mjs — Post-deploy share kit generator
 *
 * Generates:
 *   1. OG image (screenshot of hero section at 1200x630) via Playwright
 *   2. Pre-written LinkedIn post and tweet in dist/share.md
 *
 * Usage: node generate-share-kit.mjs [--url=https://example.github.io/portfolio]
 */

import { readFile, writeFile, mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function readProfile() {
  const path = resolve(__dirname, 'config/profile.yml');
  try {
    const raw = await readFile(path, 'utf-8');
    return yaml.load(raw);
  } catch {
    return {};
  }
}

function parseArgs(argv) {
  const args = { url: '' };
  for (const arg of argv.slice(2)) {
    if (arg.startsWith('--url=')) args.url = arg.split('=').slice(1).join('=');
  }
  return args;
}

async function generateOgImage(url) {
  if (!url) return false;
  try {
    const { chromium } = await import('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const distDir = resolve(__dirname, 'dist');
    await mkdir(distDir, { recursive: true });
    await page.screenshot({ path: resolve(distDir, 'og.png'), fullPage: false });
    await browser.close();
    console.log('  OG image saved to dist/og.png');
    return true;
  } catch (e) {
    console.log(`  OG image skipped (Playwright unavailable: ${e.message})`);
    return false;
  }
}

async function main() {
  const args = parseArgs(process.argv);
  const profile = await readProfile();
  const c = profile.candidate || {};
  const n = profile.narrative || {};
  const name = c.full_name || 'Portfolio';
  const headline = n.headline || '';
  const url = args.url || `https://${(c.github || 'user').replace(/.*github.com\//, '')}.github.io/portfolio`;

  console.log('Share Kit Generator\n');

  // 1. Generate OG image
  await generateOgImage(url);

  // 2. Generate share.md with pre-written posts
  const linkedinPost = `I just shipped my portfolio site.

${headline ? headline + '\n\n' : ''}${url}

Built with speedrun-career-ops — an open-source tool from the a16z speedrun team that generates 168 portfolio templates from your resume. Two commands, zero cost, deploys to GitHub Pages.

#portfolio #careers #opensource`;

  const tweet = `Shipped my portfolio: ${url}

Built with speedrun-career-ops by @a16z — 168 templates, two commands, free.`;

  const shareContent = `# Share Kit

## Your portfolio URL
${url}

## LinkedIn Post
\`\`\`
${linkedinPost}
\`\`\`

## Tweet / X Post
\`\`\`
${tweet}
\`\`\`

## OG Image
${url.replace(/\/$/, '')}/og.png (if generated)

Copy-paste the text above to share your portfolio.
`;

  const distDir = resolve(__dirname, 'dist');
  await mkdir(distDir, { recursive: true });
  await writeFile(resolve(distDir, 'share.md'), shareContent, 'utf-8');
  console.log('  Share kit saved to dist/share.md');
  console.log(`\n  Portfolio URL: ${url}`);
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
