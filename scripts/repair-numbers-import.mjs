#!/usr/bin/env node
/**
 * Repair script for Numbers-corrupted TSV import.
 *
 * Numbers corrupts TSV files in two ways:
 * 1. Strips <bold>...</bold> tags (interprets as HTML)
 * 2. Strips accented characters on some namespaces (encoding issue)
 *
 * This script:
 * 1. Reads the TSV (Seb's edits)
 * 2. Compares each key with original fr.json
 * 3. For keys with ONLY corruption (no real edits): reverts to original
 * 4. For keys with real edits + corruption: keeps edits, restores bold + accents
 *
 * Usage:
 *   node scripts/repair-numbers-import.mjs <file.tsv> --dry-run
 *   node scripts/repair-numbers-import.mjs <file.tsv>
 */

import { readFileSync, writeFileSync, copyFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MESSAGES_DIR = join(ROOT, 'messages');
const BACKUP_DIR = join(__dirname, 'output', 'backups');

const args = process.argv.slice(2);
const tsvPath = args.find(a => !a.startsWith('--'));
const dryRun = args.includes('--dry-run');

if (!tsvPath) {
  console.error('Usage: node scripts/repair-numbers-import.mjs <file.tsv> [--dry-run]');
  process.exit(1);
}

// ── TSV Parser (single-pass) ──
function parseTsv(content) {
  if (content.charCodeAt(0) === 0xFEFF) content = content.slice(1);
  const result = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;
  while (i < content.length) {
    const ch = content[i];
    if (inQuotes) {
      if (ch === '"') {
        if (content[i + 1] === '"') { field += '"'; i += 2; }
        else { inQuotes = false; i++; }
      } else { field += ch; i++; }
    } else {
      if (ch === '"') { inQuotes = true; i++; }
      else if (ch === '\t') { row.push(field); field = ''; i++; }
      else if (ch === '\n' || ch === '\r') {
        row.push(field); field = '';
        if (row.some(f => f.length > 0)) result.push(row);
        row = [];
        if (ch === '\r' && content[i + 1] === '\n') i++;
        i++;
      } else { field += ch; i++; }
    }
  }
  row.push(field);
  if (row.some(f => f.length > 0)) result.push(row);
  return result;
}

// ── Helpers ──

function stripAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function stripBold(str) {
  return str.replace(/<bold>/g, '').replace(/<\/bold>/g, '');
}

/**
 * Detect if a value was corrupted by Numbers' numeric/date interpretation.
 * Returns the original value if corruption detected, null otherwise.
 */
function detectNumberCorruption(original, modified) {
  // Date corruption: "4.9/5" → "0005-08-02 00:00:00"
  if (/^\d{4}-\d{2}-\d{2}/.test(modified) && !/^\d{4}-\d{2}-\d{2}/.test(original)) {
    return original;
  }

  // Percentage corruption: "67%" → "0.67", "-80%" → "-0.8"
  const pctMatch = original.match(/^(-?\d+(?:\.\d+)?)%$/);
  if (pctMatch) {
    const origNum = parseFloat(pctMatch[1]);
    const modNum = parseFloat(modified);
    if (!isNaN(modNum) && Math.abs(modNum - origNum / 100) < 0.0001) {
      return original; // Pure corruption
    }
  }

  // Range corruption: "60-85%" → "0.6"
  if (/^\d+-\d+%$/.test(original) && /^[\d.]+$/.test(modified)) {
    return original;
  }

  // Number+suffix corruption: "500+" → "500.0", "5 000+" → "5000.0"
  const suffixMatch = original.match(/^([\d\s]+)\+$/);
  if (suffixMatch) {
    const origNum = parseFloat(suffixMatch[1].replace(/\s/g, ''));
    const modNum = parseFloat(modified);
    if (!isNaN(modNum) && modNum === origNum) {
      return original; // Same number, lost suffix → pure corruption
    }
    // Different number but lost suffix+format: "500+" → "5000.0" = real change (500→5000) + corruption (.0, lost +)
    if (!isNaN(modNum) && modNum !== origNum && modified.endsWith('.0')) {
      return String(Math.round(modNum)) + '+'; // Restore suffix, fix .0
    }
  }

  // Pure .0 suffix: "25" → "25.0", "30" → "30.0"
  if (/^\d+$/.test(original) && modified === original + '.0') {
    return original;
  }

  // Number with spaces corruption: "1 000" → "1000.0", "5 000" → "5000.0"
  const spacedMatch = original.match(/^([\d\s]+)$/);
  if (spacedMatch) {
    const origNum = parseFloat(original.replace(/\s/g, ''));
    const modNum = parseFloat(modified);
    if (!isNaN(modNum) && modNum === origNum) {
      return original; // Same number, lost formatting
    }
  }

  // Floating point noise: "-0.7000000000000001" for "-70%"
  if (/\d{10,}/.test(modified)) {
    // Check if rounding matches a percentage
    const rounded = Math.round(parseFloat(modified) * 100);
    if (original === `${rounded}%` || original === `-${Math.abs(rounded)}%`) {
      return original;
    }
  }

  return null; // Not number corruption
}

function getNested(obj, path) {
  const parts = path.split('.');
  let current = obj;
  for (const p of parts) {
    if (!current || typeof current !== 'object') return undefined;
    current = current[p];
  }
  return current;
}

function setNested(obj, path, value) {
  const parts = path.split('.');
  let current = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    if (!current[parts[i]] || typeof current[parts[i]] !== 'object') current[parts[i]] = {};
    current = current[parts[i]];
  }
  current[parts[parts.length - 1]] = value;
}

/**
 * Restore <bold> tags from original into new text.
 * Strategy: find each bold segment in original, locate it in new text, re-wrap.
 */
function restoreBoldTags(original, modified) {
  const boldRegex = /<bold>(.*?)<\/bold>/g;
  let match;
  const boldSegments = [];
  while ((match = boldRegex.exec(original)) !== null) {
    boldSegments.push(match[1]);
  }
  if (boldSegments.length === 0) return modified;

  let result = modified;
  for (const segment of boldSegments) {
    // Try exact match first
    if (result.includes(segment) && !result.includes(`<bold>${segment}</bold>`)) {
      result = result.replace(segment, `<bold>${segment}</bold>`);
    } else {
      // Try accent-stripped match
      const strippedSegment = stripAccents(segment);
      if (result.includes(strippedSegment) && !result.includes(`<bold>${strippedSegment}</bold>`)) {
        result = result.replace(strippedSegment, `<bold>${segment}</bold>`);
      }
    }
  }
  return result;
}

/**
 * Restore accents from original text into modified text.
 * Word-by-word comparison: if a word in modified is the accent-stripped version
 * of the corresponding word in original, restore the accented version.
 */
function restoreAccents(original, modified) {
  // If they're the same after accent-stripping, just return original
  if (stripAccents(original) === stripAccents(modified)) {
    // modified might have real spacing/punctuation changes though
    // So do word-level restoration
  }

  const origWords = original.split(/(\s+|[.,;:!?()—–\-/])/);
  const modWords = modified.split(/(\s+|[.,;:!?()—–\-/])/);

  if (origWords.length !== modWords.length) {
    // Different structure — do best-effort word mapping
    // Build a lookup: accent-stripped word → accented word
    const accentMap = new Map();
    for (const w of origWords) {
      if (w.trim()) accentMap.set(stripAccents(w), w);
    }
    return modWords.map(w => {
      if (!w.trim()) return w;
      const accented = accentMap.get(w);
      return accented && stripAccents(accented) === w ? accented : w;
    }).join('');
  }

  // Same structure — word-by-word restoration
  return origWords.map((origWord, i) => {
    const modWord = modWords[i];
    if (origWord === modWord) return origWord;
    if (stripAccents(origWord) === modWord) return origWord; // Restore accent
    return modWord; // Real change — keep it
  }).join('');
}

// ── Main ──

const originalFr = JSON.parse(readFileSync(join(MESSAGES_DIR, 'fr.json'), 'utf-8'));
const tsvContent = readFileSync(tsvPath, 'utf-8');
const parsed = parseTsv(tsvContent);
const dataRows = parsed.slice(1); // Skip header

let stats = { total: 0, reverted: 0, repaired: 0, realChanges: 0, unchanged: 0 };
const changes = []; // For dry-run display

const newFr = JSON.parse(JSON.stringify(originalFr)); // Deep clone

for (const row of dataRows) {
  const key = row[1];
  const tsvValue = row[2];
  if (!key || key === 'KEY' || tsvValue === undefined) continue;

  const originalValue = getNested(originalFr, key);
  if (originalValue === undefined) continue;
  stats.total++;

  if (tsvValue === originalValue) {
    stats.unchanged++;
    continue;
  }

  // ── Check for number corruption first (highest priority) ──
  const numberFix = detectNumberCorruption(originalValue, tsvValue);
  if (numberFix === originalValue) {
    // Pure number corruption, no real edit → revert
    stats.reverted++;
    changes.push({ key, type: 'REVERT', reason: 'number corruption' });
    continue;
  }

  // ── Check for bold/accent-only corruption ──
  const originalStripped = stripBold(stripAccents(originalValue));
  const tsvStripped = stripAccents(tsvValue); // TSV already has no bold

  if (originalStripped === tsvStripped || stripAccents(originalStripped) === stripAccents(tsvStripped)) {
    // ONLY bold/accent corruption, no real edit → revert to original
    stats.reverted++;
    changes.push({ key, type: 'REVERT', reason: 'bold/accent corruption' });
    continue;
  }

  // ── Real changes (possibly mixed with corruption) ──
  stats.realChanges++;
  let repaired = tsvValue;

  // Fix number format if it was corrupted alongside a real change
  if (numberFix && numberFix !== originalValue) {
    repaired = numberFix; // e.g. "500+" → "5000+" (real change + format restored)
  }

  // Restore <bold> tags if original had them
  if (originalValue.includes('<bold>')) {
    repaired = restoreBoldTags(originalValue, repaired);
  }

  // Restore accents if they were stripped
  if (stripAccents(originalValue) !== originalValue) {
    repaired = restoreAccents(originalValue, repaired);
  }

  setNested(newFr, key, repaired);

  if (repaired !== tsvValue) {
    stats.repaired++;
    changes.push({ key, type: 'REPAIR', original: originalValue, tsv: tsvValue, repaired });
  } else {
    changes.push({ key, type: 'KEEP', tsv: tsvValue });
  }
}

// ── Output ──

if (dryRun) {
  console.log(`\n📊 Analyse de ${stats.total} clés :\n`);
  console.log(`  ✅ ${stats.unchanged} inchangées`);
  console.log(`  ↩️  ${stats.reverted} revertées (corruption uniquement, pas de vraie modif)`);
  console.log(`  🔧 ${stats.repaired} réparées (vraie modif + corruption corrigée)`);
  console.log(`  📝 ${stats.realChanges - stats.repaired} modifications pures (sans corruption)`);

  const realChanges = changes.filter(c => c.type === 'KEEP' || c.type === 'REPAIR');
  if (realChanges.length > 0) {
    console.log(`\n── Tes vraies modifications (${realChanges.length}) ──\n`);
    for (const c of realChanges) {
      const original = getNested(originalFr, c.key);
      const final = c.type === 'REPAIR' ? c.repaired : c.tsv;
      console.log(`  ${c.type === 'REPAIR' ? '🔧' : '📝'} ${c.key}`);
      console.log(`     AVANT: ${String(original).substring(0, 100)}`);
      console.log(`     APRÈS: ${String(final).substring(0, 100)}`);
      if (c.type === 'REPAIR') {
        console.log(`     (bold/accents restaurés automatiquement)`);
      }
      console.log('');
    }
  }

  console.log(`\nRelancez sans --dry-run pour appliquer.`);
} else {
  // Backup
  mkdirSync(BACKUP_DIR, { recursive: true });
  const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  copyFileSync(join(MESSAGES_DIR, 'fr.json'), join(BACKUP_DIR, `fr-${ts}.json`));

  // Write
  writeFileSync(join(MESSAGES_DIR, 'fr.json'), JSON.stringify(newFr, null, 2) + '\n', 'utf-8');

  console.log(`\n✅ Import réparé appliqué :`);
  console.log(`  ↩️  ${stats.reverted} corruptions revertées`);
  console.log(`  🔧 ${stats.repaired} modifs réparées (bold/accents restaurés)`);
  console.log(`  📝 ${stats.realChanges - stats.repaired} modifs pures appliquées`);
  console.log(`  Backup → scripts/output/backups/`);
  console.log(`\n  Vérifie avec : npm run dev`);
}
