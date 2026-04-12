#!/usr/bin/env node

/**
 * tests/unit/styles.test.mjs — Style contract tests
 *
 * For every style in styles/*.mjs, verifies:
 * - Required exports (name, fonts, css)
 * - Required CSS custom properties from the contract
 * - Constraint checks (nav-height, bg-nav, footer-link contrast)
 * - No banned structural properties on .wrap, body, html
 */

import { Suite } from '../helpers.mjs';
import { listStyles, getStyle, resetCache } from '../../styles/registry.mjs';

const s = new Suite('styles');

// -------------------------------------------------------------------------
// Required custom properties
// -------------------------------------------------------------------------

const REQUIRED_ROOT_PROPS = [
  '--bg', '--bg-alt', '--bg-card', '--bg-nav',
  '--text', '--text-muted', '--text-faint',
  '--accent', '--accent-hover',
  '--border', '--border-light',
  '--font-display', '--font-body', '--font-mono',
  '--wrap-width', '--nav-height',
  '--footer-text', '--footer-link', '--footer-link-hover', '--footer-border',
];

const BANNED_PROPERTIES = [
  'width', 'max-width', 'height', 'position', 'display',
  'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
  'flex-direction', 'flex-wrap', 'overflow',
];

const STRUCTURAL_SELECTORS = ['.wrap', 'body', 'html'];

// -------------------------------------------------------------------------
// Helpers
// -------------------------------------------------------------------------

function extractRootVars(css) {
  const vars = new Map();
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) return vars;
  const block = rootMatch[1];
  const decls = block.split(';').map(d => d.trim()).filter(Boolean);
  for (const decl of decls) {
    const cleaned = decl.replace(/\/\*.*?\*\//g, '').trim();
    if (!cleaned) continue;
    const colonIdx = cleaned.indexOf(':');
    if (colonIdx > 0) {
      vars.set(cleaned.slice(0, colonIdx).trim(), cleaned.slice(colonIdx + 1).trim());
    }
  }
  return vars;
}

function hexToLuminance(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isLightBg(bgVar) {
  if (!bgVar || bgVar.startsWith('var(')) return true;
  const hex = bgVar.match(/#[0-9a-fA-F]{3,6}/);
  if (!hex) return true;
  return hexToLuminance(hex[0]) > 0.5;
}

function footerLinkContrast(footerLink, isLight) {
  if (!footerLink || footerLink.startsWith('var(')) return true;
  const hex = footerLink.match(/#[0-9a-fA-F]{3,6}/);
  if (!hex) return true;
  const lum = hexToLuminance(hex[0]);
  if (isLight) {
    return lum <= 0.45; // not lighter than ~#555
  } else {
    return lum >= 0.55; // not darker than ~#aaa
  }
}

/** Minimal CSS parser — find declarations for a base selector (not pseudo) */
function findDeclarationsForSelector(css, baseSelector) {
  const results = [];
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Strip @media blocks
  let topLevel = '';
  let depth = 0;
  let inMedia = false;
  for (let i = 0; i < noComments.length; i++) {
    const ch = noComments[i];
    if (noComments.slice(i, i + 6) === '@media' && depth === 0) {
      inMedia = true;
    }
    if (ch === '{') {
      if (inMedia && depth === 0) { depth = 1; continue; }
      if (inMedia) { depth++; continue; }
      topLevel += ch;
    } else if (ch === '}') {
      if (inMedia) { depth--; if (depth === 0) inMedia = false; continue; }
      topLevel += ch;
    } else {
      if (!inMedia) topLevel += ch;
    }
  }

  const chunks = topLevel.split('}');
  for (const chunk of chunks) {
    const braceIdx = chunk.lastIndexOf('{');
    if (braceIdx < 0) continue;
    const selectorPart = chunk.slice(0, braceIdx).trim();
    const declPart = chunk.slice(braceIdx + 1).trim();

    const selectors = selectorPart.split(',').map(s => s.trim());
    for (const sel of selectors) {
      const trimSel = sel.split('\n').pop().trim();
      // Match exact selector but not pseudo-element variants
      if (baseSelector === 'body') {
        if (trimSel === 'body') {
          const decls = declPart.split(';').map(d => d.trim()).filter(Boolean);
          for (const decl of decls) {
            const colonIdx = decl.indexOf(':');
            if (colonIdx > 0) {
              results.push({
                prop: decl.slice(0, colonIdx).trim().toLowerCase(),
                value: decl.slice(colonIdx + 1).trim(),
              });
            }
          }
        }
      } else if (trimSel === baseSelector) {
        const decls = declPart.split(';').map(d => d.trim()).filter(Boolean);
        for (const decl of decls) {
          const colonIdx = decl.indexOf(':');
          if (colonIdx > 0) {
            results.push({
              prop: decl.slice(0, colonIdx).trim().toLowerCase(),
              value: decl.slice(colonIdx + 1).trim(),
            });
          }
        }
      }
    }
  }
  return results;
}

// -------------------------------------------------------------------------
// Tests
// -------------------------------------------------------------------------

resetCache();

console.log('\n--- Style Contract Tests ---');

const names = await listStyles();
s.assertGte(names.length, 1, 'At least one style exists');

for (const name of names) {
  const style = await getStyle(name);

  // Required exports
  s.assertType(style.name, 'string', `${name}: exports name (string)`);
  s.assert(style.name.length > 0, `${name}: name is non-empty`);
  s.assert(Array.isArray(style.fonts), `${name}: exports fonts (array)`);
  s.assertType(style.css, 'function', `${name}: exports css (function)`);

  // css() returns string
  const css = style.css();
  s.assertType(css, 'string', `${name}: css() returns string`);
  s.assert(css.length > 0, `${name}: css() returns non-empty string`);

  // Required custom properties
  const rootVars = extractRootVars(css);
  for (const prop of REQUIRED_ROOT_PROPS) {
    s.assert(rootVars.has(prop), `${name}: has ${prop} in :root`);
  }

  // --nav-height not auto
  const navHeight = rootVars.get('--nav-height');
  s.assert(navHeight !== 'auto', `${name}: --nav-height is not 'auto'`);

  // --bg-nav not transparent on dark backgrounds
  const bgNav = rootVars.get('--bg-nav') || '';
  const bgVal = rootVars.get('--bg') || '';
  const isDarkBg = !isLightBg(bgVal);
  if (isDarkBg) {
    s.assert(bgNav !== 'transparent', `${name}: --bg-nav is not 'transparent' on dark bg`);
  } else {
    s.assert(true, `${name}: --bg-nav check (light bg, transparent ok)`);
  }

  // Footer link contrast
  const footerLink = rootVars.get('--footer-link');
  const bg = rootVars.get('--bg');
  const light = isLightBg(bg);
  if (footerLink) {
    s.assert(
      footerLinkContrast(footerLink, light),
      `${name}: --footer-link has sufficient contrast on ${light ? 'light' : 'dark'} bg`
    );
  }

  // Banned structural properties
  for (const sel of STRUCTURAL_SELECTORS) {
    const decls = findDeclarationsForSelector(css, sel);
    for (const { prop, value } of decls) {
      // Exceptions per validate-styles.mjs
      if (sel === 'body' && prop === 'overflow-y' && value === 'scroll') continue;
      if (sel === 'body' && prop === 'overflow' && value.includes('scroll')) continue;
      if (sel === '.wrap' && prop === 'max-width') continue;
      if (sel === '.wrap' && (prop === 'margin' || prop === 'padding')) continue;
      if (prop === 'position' && value === 'relative') continue;
      if (sel === 'html' && prop === 'overflow-y') continue;
      if (sel === 'html' && prop === 'overflow' && value.includes('scroll')) continue;

      s.assert(
        !BANNED_PROPERTIES.includes(prop),
        `${name}: no banned property '${prop}' on ${sel}`
      );
    }
  }
}

// -------------------------------------------------------------------------
// Report
// -------------------------------------------------------------------------

const result = s.report();
process.exit(result.failed > 0 ? 1 : 0);
