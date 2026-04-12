/**
 * layouts/registry.mjs — Auto-discovers and validates layout modules.
 *
 * Each layout .mjs file must export:
 *   { name: string, css: () => string, pages: (data) => Record<string, string> }
 */

import { readdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let _cache = null;

async function loadAll() {
  if (_cache) return _cache;
  const files = await readdir(__dirname);
  const layoutFiles = files.filter(f => f.endsWith('.mjs') && f !== 'registry.mjs');
  const layouts = new Map();
  for (const file of layoutFiles) {
    const fullPath = resolve(__dirname, file);
    const mod = await import(pathToFileURL(fullPath).href);
    if (!mod.name || typeof mod.css !== 'function' || typeof mod.pages !== 'function') {
      throw new Error(`Layout "${file}" missing required exports (name, css, pages)`);
    }
    layouts.set(mod.name, mod);
  }
  _cache = layouts;
  return layouts;
}

export async function getLayout(name) {
  const layouts = await loadAll();
  const l = layouts.get(name);
  if (!l) {
    const valid = [...layouts.keys()].sort().join(', ');
    throw new Error(`Unknown layout "${name}". Available layouts: ${valid}`);
  }
  return l;
}

export async function listLayouts() {
  const layouts = await loadAll();
  return [...layouts.keys()].sort();
}

export function resetCache() { _cache = null; }
