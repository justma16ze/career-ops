/**
 * styles/registry.mjs — Auto-discovers and validates style modules.
 *
 * Each style .mjs file must export:
 *   { name: string, fonts: string[], css: () => string }
 */

import { readdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let _cache = null;

async function loadAll() {
  if (_cache) return _cache;
  const files = await readdir(__dirname);
  const styleFiles = files.filter(f => f.endsWith('.mjs') && f !== 'registry.mjs');
  const styles = new Map();
  for (const file of styleFiles) {
    const fullPath = resolve(__dirname, file);
    const mod = await import(pathToFileURL(fullPath).href);
    if (!mod.name || typeof mod.css !== 'function' || !Array.isArray(mod.fonts)) {
      throw new Error(`Style "${file}" missing required exports (name, fonts, css)`);
    }
    styles.set(mod.name, mod);
  }
  _cache = styles;
  return styles;
}

export async function getStyle(name) {
  const styles = await loadAll();
  const s = styles.get(name);
  if (!s) {
    const valid = [...styles.keys()].sort().join(', ');
    throw new Error(`Unknown style "${name}". Available styles: ${valid}`);
  }
  return s;
}

export async function listStyles() {
  const styles = await loadAll();
  return [...styles.keys()].sort();
}

export function resetCache() { _cache = null; }

/**
 * Returns the set of external origins referenced by all registered styles'
 * font URLs. Consumers (e.g. the readme-web Worker) use this to build a
 * Content-Security-Policy allowlist without hardcoding domains.
 *
 * Currently two stylesheet origins are in use:
 *   - https://fonts.googleapis.com   (Google Fonts CSS)
 *   - https://api.fontshare.com      (Fontshare CSS — styles: caps, volt, grid, terminal)
 *
 * Each of those stylesheets references a font-file origin that the browser
 * also fetches, so a functional CSP must additionally allow those origins
 * in `font-src`:
 *   - https://fonts.gstatic.com      (Google Fonts files)
 *   - https://cdn.fontshare.com      (Fontshare files)
 *
 * See STYLE_FONT_FILE_ORIGINS below for that mapping.
 */
export async function listStyleFontStylesheetOrigins() {
  const styles = await loadAll();
  const origins = new Set();
  for (const s of styles.values()) {
    for (const f of s.fonts || []) {
      try { origins.add(new URL(f).origin); } catch {}
    }
  }
  return [...origins].sort();
}

/**
 * Maps each stylesheet origin to the font-file origin it loads. Useful for
 * constructing both `style-src` and `font-src` directives in a worker CSP.
 */
export const STYLE_FONT_FILE_ORIGINS = {
  'https://fonts.googleapis.com': 'https://fonts.gstatic.com',
  'https://api.fontshare.com': 'https://cdn.fontshare.com',
};
