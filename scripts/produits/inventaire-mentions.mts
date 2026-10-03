/**
 * Inventaire des dimensions écrites en texte libre hors des deux catalogues de machines
 * (règle D45). Lecture seule : n'écrit rien, ne bloque rien.
 *
 * Pour chaque triplet « a × b × c cm » trouvé dans le site, indique s'il correspond à
 * une valeur du référentiel (site ou fabricant) et quelles machines sont nommées autour.
 * Sert à tenir à jour docs/standards/registre-ecarts-dimensions.md.
 *
 * Usage : npx tsx scripts/produits/inventaire-mentions.mts [--tout]
 *   sans option : seulement les triplets sans correspondance
 *   --tout      : tous les triplets
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { FICHES_TECHNIQUES } from '../../data/produits/fiches-techniques';
import { extraireTriplets, memeTriplet, tripletDe } from '../../lib/produits/dimensions';

const ROOT = process.cwd();
const RACINES = ['app', 'components', 'lib', 'messages', 'content', 'data', 'public'];
const EXCLUS = [
  'components/machine-selector/lib/machines.ts',
  'components/calculators/ROICalculator/lib/machines.ts',
  'data/produits/fiches-techniques.ts',
];
const NOMS = /(Alpha ?shot|Alpha ?studio|Alpha ?table|Alpha ?desk|Fashion Studio|Bike Studio|Furniture Studio|E-?Comm Studio|XXL|XL G2|XL Pro|Micro|Viso|Orbitvu)/gi;
const tout = process.argv.includes('--tout');

const references = FICHES_TECHNIQUES.flatMap((f) => [
  { id: f.id, quoi: 'objet (site)', t: tripletDe(f.psc.objetMax) },
  ...(f.psc.encombrement ? [{ id: f.id, quoi: 'encombrement (site)', t: tripletDe(f.psc.encombrement) }] : []),
  ...(f.fabricant?.objetMax ? [{ id: f.id, quoi: 'objet (fabricant)', t: f.fabricant.objetMax }] : []),
  ...(f.fabricant?.machine ? [{ id: f.id, quoi: 'machine (fabricant)', t: f.fabricant.machine }] : []),
]);

function parcourir(dossier: string): string[] {
  let sortie: string[] = [];
  for (const nom of readdirSync(dossier)) {
    const chemin = join(dossier, nom);
    if (nom === 'node_modules' || nom === '__tests__' || nom === 'images') continue;
    if (statSync(chemin).isDirectory()) sortie = sortie.concat(parcourir(chemin));
    else if (/\.(tsx?|json|md|mdx|txt)$/.test(nom)) sortie.push(chemin);
  }
  return sortie;
}

let total = 0;
let sansCorrespondance = 0;
for (const absolu of RACINES.flatMap((r) => parcourir(join(ROOT, r)))) {
  const fichier = relative(ROOT, absolu);
  if (EXCLUS.includes(fichier) || fichier.endsWith('alternates.json')) continue;
  const lignes = readFileSync(absolu, 'utf8').split('\n');
  lignes.forEach((ligne, i) => {
    const texte = ligne.replace(/<[^>]+>/g, ' ');
    for (const t of extraireTriplets(texte)) {
      total++;
      const ref = references.filter((r) => memeTriplet(r.t, t));
      if (ref.length === 0) sansCorrespondance++;
      if (ref.length > 0 && !tout) continue;
      const noms = [...new Set((texte.match(NOMS) ?? []).map((n) => n.trim()))].join(', ') || '—';
      const correspondance = ref.length ? ref.map((r) => `${r.id} ${r.quoi}`).join(' ; ') : 'AUCUNE';
      console.log(`${fichier}:${i + 1}\t${t.join(' × ')} cm\t${correspondance}\tmachines nommées sur la ligne : ${noms}`);
    }
  });
}
console.log(`\n${total} triplet(s), ${sansCorrespondance} sans correspondance dans le référentiel.`);
