/**
 * templates/registry.mjs — Auto-discovers and validates template modules.
 *
 * Each template .mjs file in this directory must export:
 *   { name: string, fonts: string[], css: () => string, pages: (data) => Record<string, string> }
 *
 * Usage:
 *   import { getTemplate, listTemplates } from './templates/registry.mjs';
 *   const tmpl = getTemplate('ink');
 *   const pages = tmpl.pages(data);
 */

import { readdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const REQUIRED_EXPORTS = ['name', 'fonts', 'css', 'pages'];

let _cache = null;

/**
 * Load all template modules from this directory, validate exports, cache result.
 */
async function loadAll() {
  if (_cache) return _cache;

  const files = await readdir(__dirname);
  const templateFiles = files.filter(f => f.endsWith('.mjs') && f !== 'registry.mjs');

  const templates = new Map();

  for (const file of templateFiles) {
    const fullPath = resolve(__dirname, file);
    const mod = await import(pathToFileURL(fullPath).href);

    // Validate required exports
    for (const key of REQUIRED_EXPORTS) {
      if (!(key in mod)) {
        throw new Error(`Template "${file}" is missing required export: ${key}`);
      }
    }
    if (typeof mod.name !== 'string') throw new Error(`Template "${file}": name must be a string`);
    if (!Array.isArray(mod.fonts)) throw new Error(`Template "${file}": fonts must be an array`);
    if (typeof mod.css !== 'function') throw new Error(`Template "${file}": css must be a function`);
    if (typeof mod.pages !== 'function') throw new Error(`Template "${file}": pages must be a function`);

    templates.set(mod.name, mod);
  }

  _cache = templates;
  return templates;
}

/**
 * Get a template by name. Throws with list of valid names if not found.
 */
export async function getTemplate(name) {
  const templates = await loadAll();
  const tmpl = templates.get(name);
  if (!tmpl) {
    const valid = [...templates.keys()].sort().join(', ');
    throw new Error(`Unknown template "${name}". Available templates: ${valid}`);
  }
  return tmpl;
}

/**
 * List all available template names.
 */
export async function listTemplates() {
  const templates = await loadAll();
  return [...templates.keys()].sort();
}

/**
 * Reset the internal cache (useful for testing).
 */
export function resetCache() {
  _cache = null;
}
