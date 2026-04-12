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
