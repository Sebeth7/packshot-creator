#!/usr/bin/env node
/**
 * Import TSV édité → fr.json + en.json
 *
 * Usage:
 *   node scripts/import-translations.mjs scripts/output/translations-2026-03-28.tsv
 *   node scripts/import-translations.mjs translations.tsv --dry-run    # Prévisualise sans écrire
 *   node scripts/import-translations.mjs translations.tsv --fr-only    # N'écrit que fr.json
 *
 * Le script:
 * 1. Lit le TSV
 * 2. Reconstruit les objets JSON imbriqués
 * 3. Merge avec les fichiers existants (les clés absentes du TSV sont conservées)
 * 4. Écrit fr.json et en.json (avec backup automatique)
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MESSAGES_DIR = join(ROOT, 'messages');
const BACKUP_DIR = join(__dirname, 'output', 'backups');

// Parse args
const args = process.argv.slice(2);
const tsvPath = args.find(a => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');
const frOnly = args.includes('--fr-only');

if (!tsvPath) {
  console.error('Usage: node scripts/import-translations.mjs <fichier.tsv> [--dry-run] [--fr-only]');
  process.exit(1);
}

// Parse TSV (single-pass, handles quoted fields with embedded tabs/newlines/quotes)
function parseTsv(content) {
  // Remove BOM if present
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);

  const result = []; // array of arrays
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  while (i < content.length) {
    const ch = content[i];

    if (inQuotes) {
      if (ch === '"') {
        if (content[i + 1] === '"') {
          // Escaped quote "" → literal "
          field += '"';
          i += 2;
        } else {
          // End of quoted field
          inQuotes = false;
          i++;
        }
      } else {
        field += ch;
        i++;
      }
    } else {
      if (ch === '"') {
        // Start of quoted field (only valid at field start)
        inQuotes = true;
        i++;
      } else if (ch === '\t') {
        row.push(field);
        field = '';
        i++;
      } else if (ch === '\n' || ch === '\r') {
        row.push(field);
        field = '';
        if (row.some(f => f.length > 0)) result.push(row);
        row = [];
        // Handle \r\n
        if (ch === '\r' && content[i + 1] === '\n') i++;
        i++;
      } else {
        field += ch;
        i++;
      }
    }
  }
  // Push last field/row
  row.push(field);
  if (row.some(f => f.length > 0)) result.push(row);

  return result;
}

// Set nested value: setNested(obj, 'home.hero.title', 'value')
function setNested(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]] || typeof current[parts[i]] !== 'object') {
      current[parts[i]] = {};
    }
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

// Deep merge: target gets values from source where they exist
function deepMerge(target, source) {
  for (const key of Object.keys(source)) {
    if (typeof source[key] === 'object' && source[key] !== null && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {};
      deepMerge(target[key], source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

// Load existing files
const frExisting = JSON.parse(readFileSync(join(MESSAGES_DIR, 'fr.json'), 'utf-8'));
const enExisting = JSON.parse(readFileSync(join(MESSAGES_DIR, 'en.json'), 'utf-8'));

// Parse TSV
const tsvContent = readFileSync(tsvPath, 'utf-8');
const parsed = parseTsv(tsvContent);
const header = parsed[0];
const dataRows = parsed.slice(1);

const hasEn = header.length >= 4 && header[3]?.toUpperCase().includes('EN');

// Build new objects from TSV
const frNew = {};
const enNew = {};
let changeCount = 0;

for (const row of dataRows) {
  const key = row[1]; // KEY column
  const frVal = row[2]; // FR column
  const enVal = hasEn ? row[3] : undefined; // EN column (if present)

  if (!key || key === 'KEY') continue;

  // Check for changes
  const keyParts = key.split('.');
  let frOld = frExisting;
  for (const p of keyParts) frOld = frOld?.[p];

  if (frVal !== undefined && frVal !== frOld) {
    changeCount++;
    if (dryRun) {
      console.log(`  FR  ${key}`);
      console.log(`    - ${String(frOld).substring(0, 80)}`);
      console.log(`    + ${String(frVal).substring(0, 80)}`);
    }
  }

  if (frVal !== undefined) setNested(frNew, key, frVal);
  if (enVal !== undefined && !frOnly) setNested(enNew, key, enVal);
}

if (dryRun) {
  console.log(`\n✓ Dry run : ${changeCount} modifications détectées (FR)`);
  console.log(`  Relancez sans --dry-run pour appliquer.`);
  process.exit(0);
}

// Backup existing files
mkdirSync(BACKUP_DIR, { recursive: true });
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
copyFileSync(join(MESSAGES_DIR, 'fr.json'), join(BACKUP_DIR, `fr-${timestamp}.json`));
copyFileSync(join(MESSAGES_DIR, 'en.json'), join(BACKUP_DIR, `en-${timestamp}.json`));

// Merge and write
const frFinal = deepMerge(structuredClone(frExisting), frNew);
writeFileSync(join(MESSAGES_DIR, 'fr.json'), JSON.stringify(frFinal, null, 2) + '\n', 'utf-8');

if (!frOnly && hasEn) {
  const enFinal = deepMerge(structuredClone(enExisting), enNew);
  writeFileSync(join(MESSAGES_DIR, 'en.json'), JSON.stringify(enFinal, null, 2) + '\n', 'utf-8');
}

console.log(`✓ Import terminé`);
console.log(`  ${changeCount} modifications FR appliquées`);
if (!frOnly && hasEn) console.log(`  EN mis à jour également`);
console.log(`  Backups → scripts/output/backups/`);
console.log(`\n  Vérifie avec : npm run dev`);
