#!/usr/bin/env node

/**
 * validate-styles.mjs — Style lint script
 *
 * Loads every style from styles/registry.mjs, parses the CSS output,
 * and checks for banned properties and required custom properties.
 */

import { listStyles, getStyle } from './styles/registry.mjs';

// ---------------------------------------------------------------------------
// Banned properties on structural selectors
// ---------------------------------------------------------------------------

const STRUCTURAL_SELECTORS = ['.wrap', 'body', 'html'];
const BANNED_PROPERTIES = [
  'width', 'max-width', 'height', 'position', 'display',
  'grid-template-columns', 'grid-template-rows', 'grid-template-areas',
  'flex-direction', 'flex-wrap', 'overflow',
];

// Exceptions:
// - body { overflow-y: scroll } is allowed
// - body::before and body::after are allowed (decorative)
// - max-width on .wrap is allowed (styles may want to override wrap width)

// ---------------------------------------------------------------------------
// Required custom properties
// ---------------------------------------------------------------------------

const REQUIRED_PROPS = [
  '--bg', '--bg-alt', '--bg-card', '--bg-nav',
  '--text', '--text-muted', '--text-faint',
  '--accent', '--accent-hover',
  '--border', '--border-light',
  '--font-display', '--font-body', '--font-mono',
  '--wrap-width', '--nav-height',
  '--footer-text', '--footer-link', '--footer-link-hover', '--footer-border',
];

// ---------------------------------------------------------------------------
// Minimal CSS property extractor
// ---------------------------------------------------------------------------

function extractDeclarations(css, selector) {
  // Find all rule blocks matching the selector
  const results = [];
  // Match selector { ... } — handles basic cases
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  // Match the selector NOT inside a pseudo-element (::before, ::after)
  const regex = new RegExp(`(?:^|[\\s}])${escaped}\\s*(?![:\\w-])\\{([^}]*)\\}`, 'g');
  let match;
  while ((match = regex.exec(css)) !== null) {
    const block = match[1];
    // Parse property: value pairs
    const decls = block.split(';').map(d => d.trim()).filter(Boolean);
    for (const decl of decls) {
      const colonIdx = decl.indexOf(':');
      if (colonIdx > 0) {
        const prop = decl.slice(0, colonIdx).trim().toLowerCase();
        const value = decl.slice(colonIdx + 1).trim();
        results.push({ prop, value });
      }
    }
  }
  return results;
}

function findAllDeclarationsForSelector(css, baseSelector) {
  const results = [];
  // Remove comments
  const noComments = css.replace(/\/\*[\s\S]*?\*\//g, '');

  // Strip out @media blocks entirely - we only check top-level rules
  // (responsive overrides like width: 100% !important are fine)
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

  // Also strip @print blocks
  let cleaned = topLevel.replace(/@media\s+print[\s\S]*?\{[\s\S]*?\}/g, '');

  // Split into rules at } boundaries
  const chunks = cleaned.split('}');
  for (const chunk of chunks) {
    const braceIdx = chunk.lastIndexOf('{');
    if (braceIdx < 0) continue;
    const selectorPart = chunk.slice(0, braceIdx).trim();
    const declPart = chunk.slice(braceIdx + 1).trim();

    const selectors = selectorPart.split(',').map(s => s.trim());
    for (const sel of selectors) {
      // Get the last line of the selector (in case of multi-line)
      const trimSel = sel.split('\n').pop().trim();
      // Match body but NOT body::before, body::after
      if (baseSelector === 'body') {
        if (trimSel === 'body') {
          const decls = declPart.split(';').map(d => d.trim()).filter(Boolean);
          for (const decl of decls) {
            const colonIdx = decl.indexOf(':');
            if (colonIdx > 0) {
              results.push({
                prop: decl.slice(0, colonIdx).trim().toLowerCase(),
                value: decl.slice(colonIdx + 1).trim(),
                selector: trimSel,
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
              selector: trimSel,
            });
          }
        }
      }
    }
  }
  return results;
}

function extractRootVars(css) {
  const vars = new Map();
  const rootMatch = css.match(/:root\s*\{([\s\S]*?)\}/);
  if (!rootMatch) return vars;
  const block = rootMatch[1];
  const decls = block.split(';').map(d => d.trim()).filter(Boolean);
  for (const decl of decls) {
    // Skip comment-only lines
    const cleaned = decl.replace(/\/\*.*?\*\//g, '').trim();
    if (!cleaned) continue;
    const colonIdx = cleaned.indexOf(':');
    if (colonIdx > 0) {
      const prop = cleaned.slice(0, colonIdx).trim();
      const value = cleaned.slice(colonIdx + 1).trim();
      vars.set(prop, value);
    }
  }
  return vars;
}

// ---------------------------------------------------------------------------
// Contrast check (simplified)
// ---------------------------------------------------------------------------

function hexToLuminance(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function isLightBg(bgVar) {
  if (!bgVar || bgVar.startsWith('var(')) return true; // assume light if can't determine
  const hex = bgVar.match(/#[0-9a-fA-F]{3,6}/);
  if (!hex) return true;
  return hexToLuminance(hex[0]) > 0.5;
}

function footerLinkContrast(footerLink, isLight) {
  if (!footerLink || footerLink.startsWith('var(')) return true; // can't check vars
  const hex = footerLink.match(/#[0-9a-fA-F]{3,6}/);
  if (!hex) return true;
  const lum = hexToLuminance(hex[0]);
  if (isLight) {
    // Light bg: footer link should be at least #555 darkness (luminance <= ~0.35)
    return lum <= 0.45;
  } else {
    // Dark bg: footer link should be at least #aaa brightness (luminance >= ~0.65)
    return lum >= 0.55;
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const styleNames = await listStyles();
  let totalPass = 0;
  let totalFail = 0;

  for (const name of styleNames) {
    const style = await getStyle(name);
    const css = style.css();
    const violations = [];

    // 1. Check banned properties on structural selectors
    for (const sel of STRUCTURAL_SELECTORS) {
      const decls = findAllDeclarationsForSelector(css, sel);
      for (const { prop, value, selector } of decls) {
        // Skip exceptions
        if (sel === 'body' && prop === 'overflow-y' && value === 'scroll') continue;
        if (sel === 'body' && prop === 'overflow' && value.includes('scroll')) continue;
        // Allow max-width on .wrap (style override for wrap width)
        if (sel === '.wrap' && prop === 'max-width') continue;
        // Allow margin and padding on .wrap (common style customization)
        if (sel === '.wrap' && (prop === 'margin' || prop === 'padding')) continue;
        // Allow position: relative on .wrap and body (z-stacking for decorative pseudo-elements)
        if (prop === 'position' && value === 'relative') continue;
        // Allow overflow-y on html
        if (sel === 'html' && prop === 'overflow-y') continue;
        if (sel === 'html' && prop === 'overflow' && value.includes('scroll')) continue;

        if (BANNED_PROPERTIES.includes(prop)) {
          violations.push(`BANNED: ${selector || sel} { ${prop}: ${value} }`);
        }
      }
    }

    // 2. Check required custom properties
    const rootVars = extractRootVars(css);
    for (const req of REQUIRED_PROPS) {
      if (!rootVars.has(req)) {
        violations.push(`MISSING: ${req} not found in :root`);
      }
    }

    // 3. Check nav-height is not auto
    const navHeight = rootVars.get('--nav-height');
    if (navHeight === 'auto') {
      violations.push(`NAV-HEIGHT: --nav-height is 'auto' (must be a fixed value like 48px)`);
    }

    // 4. Check bg-nav is not transparent for dark styles
    const bg = rootVars.get('--bg');
    const bgNav = rootVars.get('--bg-nav');
    if (bg && !isLightBg(bg) && bgNav === 'transparent') {
      violations.push(`BG-NAV: --bg-nav is 'transparent' on dark bg (use semi-opaque rgba)`);
    }

    // 5. Check footer-link contrast
    const footerLink = rootVars.get('--footer-link');
    const light = isLightBg(bg);
    if (footerLink && !footerLinkContrast(footerLink, light)) {
      violations.push(`CONTRAST: --footer-link (${footerLink}) may not have enough contrast on ${light ? 'light' : 'dark'} bg`);
    }

    // Report
    if (violations.length === 0) {
      console.log(`  PASS  ${name}`);
      totalPass++;
    } else {
      console.log(`  FAIL  ${name}`);
      for (const v of violations) {
        console.log(`        ${v}`);
      }
      totalFail++;
    }
  }

  console.log(`\n  ${totalPass} passed, ${totalFail} failed out of ${styleNames.length} styles`);
  if (totalFail > 0) process.exit(1);
}

main().catch(e => { console.error('Failed:', e.message); process.exit(1); });
