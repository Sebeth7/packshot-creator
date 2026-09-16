#!/usr/bin/env node
/**
 * Intégrité des fichiers JSON de contenu et de traduction.
 *
 * Un messages/*.json invalide casse le build ; un alternates.json invalide
 * casse le sélecteur de langue en silence (cf docs/seo-geo/03-PIEGES.md, C5).
 *
 * Sans dépendance et sans fs.globSync (absent de Node 20) : parcours manuel.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const RACINES = ['messages', 'content'];

function parcourir(chemin, acc = []) {
  if (!existsSync(chemin)) return acc;
  for (const entree of readdirSync(chemin)) {
    if (entree === 'node_modules' || entree.startsWith('.')) continue;
    const complet = join(chemin, entree);
    const infos = statSync(complet);
    if (infos.isDirectory()) parcourir(complet, acc);
    else if (entree.endsWith('.json')) acc.push(complet);
  }
  return acc;
}

const fichiers = RACINES.flatMap((r) => parcourir(r));

if (fichiers.length === 0) {
  console.error('Aucun fichier JSON trouvé sous messages/ ni content/ — anormal.');
  process.exit(1);
}

const erreurs = [];
for (const fichier of fichiers) {
  try {
    JSON.parse(readFileSync(fichier, 'utf8'));
  } catch (e) {
    erreurs.push({ fichier, message: e.message });
  }
}

if (erreurs.length > 0) {
  console.error('JSON INVALIDE :\n');
  for (const { fichier, message } of erreurs) {
    console.error(`  ${fichier}\n    ${message}\n`);
  }
  process.exit(1);
}

console.log(`${fichiers.length} fichier(s) JSON valides.`);
