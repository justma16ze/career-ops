#!/usr/bin/env node

/**
 * scrape-portcos.mjs — Scrape a16z portfolio and speedrun company lists
 *
 * Usage:
 *   node scrape-portcos.mjs [--source=portfolio|speedrun|both] [--output=portcos.yml]
 *
 * Sources:
 *   - portfoliojobs.a16z.com/jobs — ~753 companies with 15K+ jobs (client-rendered)
 *   - speedrun.a16z.com/companies — ~180 companies (client-rendered, lazy-loaded)
 *
 * Outputs YAML with company names, career URLs (when discoverable), and source tags.
 */

import { chromium } from 'playwright';
import yaml from 'js-yaml';
import { writeFileSync } from 'node:fs';
import { parseArgs } from 'node:util';

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

const { values: flags } = parseArgs({
  options: {
    source: { type: 'string', default: 'both' },
    output: { type: 'string', default: 'portcos.yml' },
    help:   { type: 'boolean', short: 'h', default: false },
  },
  strict: false,
});

if (flags.help) {
  console.log(`Usage: node scrape-portcos.mjs [--source=portfolio|speedrun|both] [--output=portcos.yml]`);
  process.exit(0);
}

const SOURCE = flags.source;
const OUTPUT = flags.output;

if (!['portfolio', 'speedrun', 'both'].includes(SOURCE)) {
  console.error(`Invalid --source: ${SOURCE}. Must be portfolio, speedrun, or both.`);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function log(msg) {
  console.log(`[scrape-portcos] ${msg}`);
}

/** Scroll to the bottom of a page repeatedly until no new content loads. */
async function scrollToBottom(page, { maxScrolls = 200, pauseMs = 800, stableRounds = 3 } = {}) {
  let previousHeight = 0;
  let stableCount = 0;

  for (let i = 0; i < maxScrolls; i++) {
    const currentHeight = await page.evaluate(() => document.body.scrollHeight);
    if (currentHeight === previousHeight) {
      stableCount++;
      if (stableCount >= stableRounds) {
        log(`  Page fully loaded after ${i} scrolls (height stable at ${currentHeight}px).`);
        return;
      }
    } else {
      stableCount = 0;
    }
    previousHeight = currentHeight;
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(pauseMs);
    if (i > 0 && i % 10 === 0) {
      log(`  Scrolled ${i} times, page height: ${currentHeight}px...`);
    }
  }
  log(`  Reached max scrolls (${maxScrolls}). Proceeding with what we have.`);
}

// ---------------------------------------------------------------------------
// Portfolio Jobs scraper (portfoliojobs.a16z.com)
// ---------------------------------------------------------------------------

/**
 * Strategy:
 * 1. First, try to intercept XHR/fetch API calls that return structured job data
 *    (many Lever/Ashby-powered job boards use JSON APIs under the hood).
 * 2. Fallback: scroll and extract company names from DOM elements.
 */
async function scrapePortfolio(browser) {
  log('Scraping portfoliojobs.a16z.com/jobs ...');
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  // Collect API responses that might contain structured data
  const apiResponses = [];
  page.on('response', async (response) => {
    const url = response.url();
    // Look for JSON API endpoints that job boards commonly use
    if (
      response.status() === 200 &&
      (url.includes('/api/') || url.includes('/graphql') || url.includes('.json')) &&
      response.headers()['content-type']?.includes('application/json')
    ) {
      try {
        const body = await response.json();
        apiResponses.push({ url, body });
      } catch { /* not JSON, skip */ }
    }
  });

  try {
    await page.goto('https://portfoliojobs.a16z.com/jobs', {
      waitUntil: 'networkidle',
      timeout: 60_000,
    });
  } catch (e) {
    log(`  Warning: page load timed out or errored (${e.message}). Continuing...`);
  }

  // Give extra time for client-side rendering
  await page.waitForTimeout(3_000);

  // ------------------------------------------------------------------
  // Strategy A: Try to extract from intercepted API data
  // ------------------------------------------------------------------
  let companies = new Map(); // name -> { careers_url }

  for (const { url, body } of apiResponses) {
    try {
      // Common patterns: { jobs: [...] }, { data: { jobs: [...] } }, array of jobs
      const jobs = body?.jobs || body?.data?.jobs || body?.results || (Array.isArray(body) ? body : null);
      if (Array.isArray(jobs) && jobs.length > 0) {
        log(`  Found API with ${jobs.length} items from ${new URL(url).pathname}`);
        for (const job of jobs) {
          const name = job.company_name || job.company?.name || job.companyName || job.organization;
          if (name && typeof name === 'string') {
            const existing = companies.get(name) || {};
            const careersUrl = job.company_url || job.company?.careers_url || job.apply_url || existing.careers_url;
            companies.set(name, { careers_url: careersUrl || null });
          }
        }
      }
    } catch { /* skip malformed */ }
  }

  if (companies.size > 0) {
    log(`  Extracted ${companies.size} companies from API responses.`);
  }

  // ------------------------------------------------------------------
  // Strategy B: DOM extraction (primary or supplementary)
  // ------------------------------------------------------------------
  log('  Scrolling to load all listings...');
  await scrollToBottom(page, { maxScrolls: 150, pauseMs: 1000 });

  // Try various selectors that job boards commonly use
  const domCompanies = await page.evaluate(() => {
    const results = new Map();

    // Strategy B1: Look for company name elements in job cards
    // Common patterns: [data-company], .company-name, job card structures
    const selectors = [
      // Ashby-style
      '[data-testid="company-name"]',
      '.ashby-job-posting-brief-company',
      // Lever-style
      '.posting-company',
      // Generic patterns
      '.company-name',
      '.company',
      '[class*="company"]',
      '[class*="Company"]',
      // Job card company labels
      '.job-company',
      '.job-card__company',
    ];

    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      if (els.length > 5) { // Only if we find a meaningful number
        for (const el of els) {
          const name = el.textContent?.trim();
          if (name && name.length > 1 && name.length < 100) {
            results.set(name, { careers_url: null });
          }
        }
      }
    }

    // Strategy B2: Look for links that contain company names
    // Many job boards have links to company pages
    const allLinks = document.querySelectorAll('a[href]');
    for (const a of allLinks) {
      const href = a.href;
      // Company career page links often follow patterns
      if (href && (href.includes('/companies/') || href.includes('/company/'))) {
        const name = a.textContent?.trim();
        if (name && name.length > 1 && name.length < 100 && !name.includes('\n')) {
          results.set(name, { careers_url: href });
        }
      }
    }

    // Strategy B3: Grab all heading-like elements inside card-like containers
    // This is more aggressive but catches many board layouts
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], [class*="listing"], [class*="Listing"], [class*="posting"], [class*="Posting"], [class*="job-"]');
    for (const card of cards) {
      // First h3/h4/strong that looks like a company name
      const heading = card.querySelector('h3, h4, strong, [class*="company"], [class*="Company"], [class*="org"]');
      if (heading) {
        const name = heading.textContent?.trim();
        if (name && name.length > 1 && name.length < 80) {
          if (!results.has(name)) {
            results.set(name, { careers_url: null });
          }
        }
      }
    }

    return Object.fromEntries(results);
  });

  const domCount = Object.keys(domCompanies).length;
  if (domCount > 0) {
    log(`  Found ${domCount} companies via DOM extraction.`);
    for (const [name, data] of Object.entries(domCompanies)) {
      if (!companies.has(name)) {
        companies.set(name, data);
      }
    }
  }

  // ------------------------------------------------------------------
  // Strategy C: Check for "load more" or pagination buttons
  // ------------------------------------------------------------------
  const hasLoadMore = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button, a')];
    return buttons.some(b => {
      const text = b.textContent?.toLowerCase() || '';
      return text.includes('load more') || text.includes('show more') || text.includes('see more') || text.includes('next page');
    });
  });

  if (hasLoadMore) {
    log('  Found "load more" button — clicking to load all results...');
    let consecutiveFails = 0;
    for (let round = 0; round < 200; round++) {
      const clicked = await page.evaluate(() => {
        const buttons = [...document.querySelectorAll('button, a')];
        const loadMore = buttons.find(b => {
          const text = b.textContent?.toLowerCase() || '';
          return text.includes('load more') || text.includes('show more') || text.includes('see more');
        });
        if (loadMore && !loadMore.disabled) {
          loadMore.click();
          return true;
        }
        return false;
      });
      if (!clicked) {
        consecutiveFails++;
        if (consecutiveFails >= 3) break;
        await page.waitForTimeout(2000); // wait a bit longer, button may reappear
        continue;
      }
      consecutiveFails = 0;
      await page.waitForTimeout(1200);
      if ((round + 1) % 20 === 0) {
        log(`  Clicked "load more" ${round + 1} times...`);
      }
    }

    // Full re-extraction after loading everything
    log('  Re-extracting companies after loading all pages...');
    const moreCompanies = await page.evaluate(() => {
      const results = new Map();

      // Re-run all strategies on the now-fully-loaded page
      const selectors = [
        '[class*="company"]', '[class*="Company"]',
        '[data-testid="company-name"]', '.company-name', '.company',
      ];
      for (const sel of selectors) {
        for (const el of document.querySelectorAll(sel)) {
          const name = el.textContent?.trim();
          if (name && name.length > 1 && name.length < 100) {
            results.set(name, { careers_url: null });
          }
        }
      }

      // Links with company paths
      for (const a of document.querySelectorAll('a[href]')) {
        const href = a.href;
        if (href && (href.includes('/companies/') || href.includes('/company/'))) {
          const name = a.textContent?.trim();
          if (name && name.length > 1 && name.length < 100 && !name.includes('\n')) {
            results.set(name, { careers_url: href });
          }
        }
      }

      // Card headings
      for (const card of document.querySelectorAll('[class*="card"], [class*="Card"], [class*="listing"], [class*="Listing"], [class*="posting"], [class*="Posting"], [class*="job-"]')) {
        const heading = card.querySelector('h3, h4, strong, [class*="company"], [class*="Company"], [class*="org"]');
        if (heading) {
          const name = heading.textContent?.trim();
          if (name && name.length > 1 && name.length < 80) {
            if (!results.has(name)) results.set(name, { careers_url: null });
          }
        }
      }

      return Object.fromEntries(results);
    });
    const reExtracted = Object.keys(moreCompanies).length;
    log(`  Re-extraction found ${reExtracted} companies total.`);
    for (const [name, data] of Object.entries(moreCompanies)) {
      if (!companies.has(name)) {
        companies.set(name, data);
      }
    }
  }

  // ------------------------------------------------------------------
  // Strategy D: Screenshot for debugging if we got very little
  // ------------------------------------------------------------------
  if (companies.size < 10) {
    log('  Warning: Found very few companies. Taking a debug screenshot...');
    await page.screenshot({ path: 'debug-portfolio.png', fullPage: false });
    log('  Saved debug-portfolio.png');

    // Last resort: dump all visible text and try to extract company names
    // by looking for capitalized multi-word strings
    const pageText = await page.evaluate(() => document.body?.innerText || '');
    log(`  Page text length: ${pageText.length} chars`);
    if (pageText.length > 100) {
      // Look for lines that might be company names (capitalized, short)
      const lines = pageText.split('\n').map(l => l.trim()).filter(l => l.length > 1 && l.length < 60);
      log(`  Found ${lines.length} candidate text lines on the page.`);
    }
  }

  log(`Portfolio scrape complete: ${companies.size} unique companies found.`);

  await context.close();

  return [...companies.entries()].map(([name, data]) => ({
    name,
    ...(data.careers_url ? { careers_url: data.careers_url } : {}),
    source: 'portfolio',
  }));
}

// ---------------------------------------------------------------------------
// Speedrun scraper (speedrun.a16z.com/companies)
// ---------------------------------------------------------------------------

async function scrapeSpeedrun(browser) {
  log('Scraping speedrun.a16z.com/companies ...');
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  });
  const page = await context.newPage();

  // Collect API responses
  const apiResponses = [];
  page.on('response', async (response) => {
    const url = response.url();
    if (
      response.status() === 200 &&
      (url.includes('/api/') || url.includes('/graphql') || url.includes('.json') || url.includes('companies')) &&
      response.headers()['content-type']?.includes('application/json')
    ) {
      try {
        const body = await response.json();
        apiResponses.push({ url, body });
      } catch { /* skip */ }
    }
  });

  try {
    await page.goto('https://speedrun.a16z.com/companies', {
      waitUntil: 'networkidle',
      timeout: 60_000,
    });
  } catch (e) {
    log(`  Warning: page load timed out or errored (${e.message}). Continuing...`);
  }

  await page.waitForTimeout(3_000);

  // ------------------------------------------------------------------
  // Strategy A: API interception
  // ------------------------------------------------------------------
  let companies = new Map();

  for (const { url, body } of apiResponses) {
    try {
      // Try various JSON shapes
      const items =
        body?.companies ||
        body?.data?.companies ||
        body?.results ||
        body?.data?.results ||
        body?.data ||
        (Array.isArray(body) ? body : null);

      if (Array.isArray(items) && items.length > 5) {
        log(`  Found API with ${items.length} items from ${new URL(url).pathname}`);
        for (const item of items) {
          const name = item.name || item.company_name || item.title;
          if (name && typeof name === 'string') {
            companies.set(name, {});
          }
        }
      }
    } catch { /* skip */ }
  }

  if (companies.size > 0) {
    log(`  Extracted ${companies.size} companies from API responses.`);
  }

  // ------------------------------------------------------------------
  // Strategy B: Scroll and DOM extract
  // ------------------------------------------------------------------
  log('  Scrolling to load all companies...');
  await scrollToBottom(page, { maxScrolls: 100, pauseMs: 1000 });

  const domCompanies = await page.evaluate(() => {
    const results = new Set();

    // Look for company cards / list items
    const selectors = [
      '[class*="company"] h2',
      '[class*="company"] h3',
      '[class*="Company"] h2',
      '[class*="Company"] h3',
      '[class*="card"] h2',
      '[class*="card"] h3',
      '[class*="Card"] h2',
      '[class*="Card"] h3',
      // Grid/list items
      'h2',
      'h3',
      // Links to company pages
      'a[href*="/companies/"]',
      'a[href*="/company/"]',
    ];

    for (const sel of selectors) {
      const els = document.querySelectorAll(sel);
      if (els.length >= 5) {
        for (const el of els) {
          const name = el.textContent?.trim();
          if (name && name.length > 0 && name.length < 80 && !name.includes('\n')) {
            results.add(name);
          }
        }
        if (results.size > 10) break; // Found a good selector, stop
      }
    }

    // Strategy B2: look for a grid of items with images + text
    const gridItems = document.querySelectorAll('[class*="grid"] > div, [class*="Grid"] > div, [class*="list"] > div, [class*="List"] > div');
    if (gridItems.length >= 10) {
      for (const item of gridItems) {
        // Company name is often the first text node or a heading
        const text = item.querySelector('h2, h3, h4, p, span')?.textContent?.trim();
        if (text && text.length > 0 && text.length < 80) {
          results.add(text);
        }
      }
    }

    return [...results];
  });

  if (domCompanies.length > 0) {
    log(`  Found ${domCompanies.length} companies via DOM extraction.`);
    for (const name of domCompanies) {
      if (!companies.has(name)) {
        companies.set(name, {});
      }
    }
  }

  // ------------------------------------------------------------------
  // Strategy C: "Load more" / "Show all" buttons
  // ------------------------------------------------------------------
  const clicked = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button, a')];
    const loadMore = buttons.find(b => {
      const text = b.textContent?.toLowerCase() || '';
      return text.includes('load more') || text.includes('show all') ||
             text.includes('show more') || text.includes('see all') ||
             text.includes('view all');
    });
    if (loadMore) {
      loadMore.click();
      return loadMore.textContent?.trim();
    }
    return null;
  });

  if (clicked) {
    log(`  Clicked "${clicked}" button, waiting for content...`);
    await page.waitForTimeout(3_000);
    await scrollToBottom(page, { maxScrolls: 50, pauseMs: 800 });

    // Re-extract
    const moreCompanies = await page.evaluate(() => {
      const results = new Set();
      for (const el of document.querySelectorAll('h2, h3, a[href*="/company"]')) {
        const name = el.textContent?.trim();
        if (name && name.length > 0 && name.length < 80 && !name.includes('\n')) {
          results.add(name);
        }
      }
      return [...results];
    });
    for (const name of moreCompanies) {
      if (!companies.has(name)) {
        companies.set(name, {});
      }
    }
  }

  // Debug screenshot if low count
  if (companies.size < 10) {
    log('  Warning: Found very few companies. Taking a debug screenshot...');
    await page.screenshot({ path: 'debug-speedrun.png', fullPage: false });
    log('  Saved debug-speedrun.png');
  }

  log(`Speedrun scrape complete: ${companies.size} unique companies found.`);

  await context.close();

  return [...companies.keys()].map(name => ({
    name,
    source: 'speedrun',
  }));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  log(`Starting scrape (source=${SOURCE}, output=${OUTPUT})`);

  let browser;
  try {
    browser = await chromium.launch({ headless: true });
  } catch (e) {
    console.error(
      `\nFailed to launch browser. You may need to install Playwright browsers:\n` +
      `  npx playwright install chromium\n\n` +
      `Error: ${e.message}`
    );
    process.exit(1);
  }

  let portfolioCompanies = [];
  let speedrunCompanies = [];

  try {
    if (SOURCE === 'portfolio' || SOURCE === 'both') {
      portfolioCompanies = await scrapePortfolio(browser);
    }

    if (SOURCE === 'speedrun' || SOURCE === 'both') {
      speedrunCompanies = await scrapeSpeedrun(browser);
    }
  } finally {
    await browser.close();
  }

  // Sort alphabetically
  portfolioCompanies.sort((a, b) => a.name.localeCompare(b.name));
  speedrunCompanies.sort((a, b) => a.name.localeCompare(b.name));

  // Deduplicate: if a company appears in both, note it
  if (SOURCE === 'both') {
    const speedrunNames = new Set(speedrunCompanies.map(c => c.name.toLowerCase()));
    const portfolioNames = new Set(portfolioCompanies.map(c => c.name.toLowerCase()));
    const overlap = [...speedrunNames].filter(n => portfolioNames.has(n));
    if (overlap.length > 0) {
      log(`Found ${overlap.length} companies in both sources: ${overlap.slice(0, 5).join(', ')}${overlap.length > 5 ? '...' : ''}`);
    }
  }

  // Build YAML output
  const today = new Date().toISOString().slice(0, 10);
  const header = [
    `# Auto-scraped from portfoliojobs.a16z.com and speedrun.a16z.com`,
    `# Generated: ${today}`,
    `# Total: ${portfolioCompanies.length} companies from portfolio, ${speedrunCompanies.length} from speedrun`,
    '',
  ].join('\n');

  const doc = {};
  if (portfolioCompanies.length > 0) {
    doc.portfolio_companies = portfolioCompanies;
  }
  if (speedrunCompanies.length > 0) {
    doc.speedrun_companies = speedrunCompanies;
  }

  const yamlStr = header + yaml.dump(doc, {
    lineWidth: 120,
    quotingType: '"',
    forceQuotes: false,
    sortKeys: false,
    noRefs: true,
  });

  writeFileSync(OUTPUT, yamlStr, 'utf-8');
  log(`Wrote ${OUTPUT} (${portfolioCompanies.length} portfolio + ${speedrunCompanies.length} speedrun companies)`);

  // Summary
  console.log('\n--- Summary ---');
  if (portfolioCompanies.length > 0) {
    console.log(`Portfolio companies: ${portfolioCompanies.length}`);
    console.log(`  First 5: ${portfolioCompanies.slice(0, 5).map(c => c.name).join(', ')}`);
  }
  if (speedrunCompanies.length > 0) {
    console.log(`Speedrun companies:  ${speedrunCompanies.length}`);
    console.log(`  First 5: ${speedrunCompanies.slice(0, 5).map(c => c.name).join(', ')}`);
  }
  if (portfolioCompanies.length === 0 && speedrunCompanies.length === 0) {
    console.log('WARNING: No companies scraped. The pages may have changed structure.');
    console.log('Check debug-portfolio.png and debug-speedrun.png for visual clues.');
    console.log('You may need to update the selectors in this script.');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
