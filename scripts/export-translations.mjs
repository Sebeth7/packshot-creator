#!/usr/bin/env node
/**
 * Export fr.json + en.json → TSV (ouvre dans Google Sheets / Excel)
 *
 * Usage:
 *   node scripts/export-translations.mjs                    # Exporte tout
 *   node scripts/export-translations.mjs home               # Exporte uniquement le namespace "home"
 *   node scripts/export-translations.mjs home,contact       # Plusieurs namespaces
 *   node scripts/export-translations.mjs --fr-only          # FR uniquement (pour édition solo)
 *
 * Output: scripts/output/translations-YYYY-MM-DD.tsv
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MESSAGES_DIR = join(ROOT, 'messages');
const OUTPUT_DIR = join(__dirname, 'output');

// Parse args
const args = process.argv.slice(2);
const frOnly = args.includes('--fr-only');
const namespaceFilter = args.filter(a => !a.startsWith('--'))[0]?.split(',') || null;

// Load JSON files
const fr = JSON.parse(readFileSync(join(MESSAGES_DIR, 'fr.json'), 'utf-8'));
const en = JSON.parse(readFileSync(join(MESSAGES_DIR, 'en.json'), 'utf-8'));

// Flatten nested object to dot-notation keys
function flatten(obj, prefix = '') {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      Object.assign(result, flatten(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

// Filter by namespace if specified
function filterByNamespace(obj, namespaces) {
  if (!namespaces) return obj;
  const filtered = {};
  for (const ns of namespaces) {
    if (obj[ns]) filtered[ns] = obj[ns];
    else console.warn(`⚠ Namespace "${ns}" non trouvé`);
  }
  return filtered;
}

const frFiltered = filterByNamespace(fr, namespaceFilter);
const enFiltered = filterByNamespace(en, namespaceFilter);

const frFlat = flatten(frFiltered);
const enFlat = flatten(enFiltered);

// Collect all keys (FR is master)
const allKeys = Object.keys(frFlat);

// Escape TSV value (handle tabs and newlines in content)
function escapeTsv(str) {
  if (!str) return '';
  // If contains tab, newline, or double quote → wrap in quotes
  if (str.includes('\t') || str.includes('\n') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// Build TSV
const header = frOnly
  ? 'NAMESPACE\tKEY\tFR'
  : 'NAMESPACE\tKEY\tFR\tEN';

const rows = allKeys.map(key => {
  const namespace = key.split('.')[0];
  const frVal = frFlat[key] || '';
  const enVal = enFlat[key] || '';

  if (frOnly) {
    return `${escapeTsv(namespace)}\t${escapeTsv(key)}\t${escapeTsv(frVal)}`;
  }
  return `${escapeTsv(namespace)}\t${escapeTsv(key)}\t${escapeTsv(frVal)}\t${escapeTsv(enVal)}`;
});

const tsv = [header, ...rows].join('\n');

// Write output
mkdirSync(OUTPUT_DIR, { recursive: true });
const date = new Date().toISOString().slice(0, 10);
const suffix = namespaceFilter ? `-${namespaceFilter.join('+')}` : '';
const filename = `translations${suffix}-${date}.tsv`;
const outputPath = join(OUTPUT_DIR, filename);

writeFileSync(outputPath, '\uFEFF' + tsv, 'utf-8'); // BOM for Excel compatibility

const stats = {
  keys: allKeys.length,
  namespaces: [...new Set(allKeys.map(k => k.split('.')[0]))].length,
  file: outputPath,
};

console.log(`✓ Export terminé`);
console.log(`  ${stats.keys} clés exportées (${stats.namespaces} namespaces)`);
console.log(`  → ${filename}`);
console.log(`\n  Ouvre dans Google Sheets : Fichier > Importer > Upload > Séparateur: Tab`);
