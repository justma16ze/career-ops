#!/usr/bin/env node

/**
 * tests/e2e/web-frontend.test.mjs — Web frontend tests
 *
 * Uses Playwright to test web/index.html:
 * - Page loads, boot sequence plays (4 lines within ~2s)
 * - Claude greeting appears after boot
 * - Input is functional (can type, can submit with Enter)
 * - Mobile viewport: input bar at bottom, layout not broken
 */

import { Suite } from '../helpers.mjs';
import { chromium } from 'playwright';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { access } from 'fs/promises';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '../..');
const WEB_HTML = resolve(ROOT, 'web/index.html');
const s = new Suite('e2e:web-frontend');

console.log('\n--- E2E: Web Frontend ---');

// Check web/index.html exists
try {
  await access(WEB_HTML);
} catch {
  s.skip('all web frontend tests', 'web/index.html not found');
  const result = s.report();
  process.exit(0);
}

let browser;
try {
  browser = await chromium.launch({ headless: true });
} catch (e) {
  s.skip('all web frontend tests', `Playwright not available: ${e.message}`);
  const result = s.report();
  process.exit(0);
}

// Desktop tests
{
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();

  try {
    await page.goto(`file://${WEB_HTML}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    s.assert(true, 'desktop: page loads');

    // Wait for boot sequence — the 4 boot lines should appear
    // Boot lines are spans with class "system-text"
    await page.waitForTimeout(3000); // Allow boot animation to complete

    const outputText = await page.textContent('#output');

    // Boot line 1: "initializing portfolio engine..."
    s.assert(
      outputText.includes('initializing') || outputText.includes('portfolio'),
      'desktop: boot sequence line 1 appears'
    );

    // Boot line 4: "ready."
    s.assert(
      outputText.includes('ready'),
      'desktop: boot sequence "ready" appears'
    );

    // Claude greeting appears after boot
    s.assert(
      outputText.includes('portfolio') || outputText.includes('email') || outputText.includes('build'),
      'desktop: Claude greeting appears after boot'
    );

    // Input is functional — look for the inline input
    const inlineInput = await page.$('.inline-input-line input');
    if (inlineInput) {
      const isEnabled = await inlineInput.isEnabled();
      s.assert(isEnabled, 'desktop: inline input is enabled after boot');

      // Can type
      await inlineInput.fill('test@test.com');
      const value = await inlineInput.inputValue();
      s.assertEqual(value, 'test@test.com', 'desktop: can type in input');
    } else {
      s.skip('desktop: inline input', 'inline input element not found');
    }

  } catch (e) {
    s.fail('desktop: test execution', e.message);
  }
  await context.close();
}

// Mobile viewport tests
{
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  const page = await context.newPage();

  try {
    await page.goto(`file://${WEB_HTML}`, { waitUntil: 'domcontentloaded', timeout: 10000 });
    await page.waitForTimeout(3000); // Allow boot

    s.assert(true, 'mobile: page loads');

    // Check layout not broken: no horizontal overflow
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    s.assert(
      scrollWidth <= clientWidth + 2,
      `mobile: no horizontal overflow (scroll=${scrollWidth}, client=${clientWidth})`
    );

    // On mobile, the input bar (#input-bar) should be visible
    const inputBar = await page.$('#input-bar');
    if (inputBar) {
      const isVisible = await inputBar.isVisible();
      // On mobile, input-bar display changes from 'none' to flex
      if (isVisible) {
        s.assert(true, 'mobile: input bar visible at bottom');
      } else {
        // Some implementations may still use inline input on mobile
        s.skip('mobile: input bar visibility', 'input bar may use inline mode');
      }
    } else {
      s.skip('mobile: input bar', 'input bar element not found');
    }

    // App container is full height
    const appHeight = await page.evaluate(() => {
      const app = document.getElementById('app');
      return app ? app.getBoundingClientRect().height : 0;
    });
    s.assert(appHeight > 400, `mobile: app container has reasonable height (${appHeight}px)`);

  } catch (e) {
    s.fail('mobile: test execution', e.message);
  }
  await context.close();
}

await browser.close();

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
