/**
 * Lecture des dimensions écrites en texte (« 190 × 90 × 100 cm », « 100x90x190 cm »,
 * « 60 × 40 × 70 cm (W × D × H) ») pour les contrôles de la règle D45.
 * Fonctions pures, sans dépendance.
 */

export type Triplet = readonly [number, number, number];

const ESPACE = '[\\s\\u00a0\\u202f]*';
const NOMBRE = '(\\d{1,4}(?:[.,]\\d+)?)';
const SEP = `${ESPACE}(?:cm)?${ESPACE}[x×X*]${ESPACE}`;

/** Triplets « a × b × c » suivis d'une unité centimètre (ou sans unité, si `sansUnite`). */
export function extraireTriplets(texte: string, { sansUnite = false } = {}): Triplet[] {
  const unite = sansUnite ? `(?:${ESPACE}cm)?` : `${ESPACE}cm`;
  const motif = new RegExp(`${NOMBRE}${SEP}${NOMBRE}${SEP}${NOMBRE}${unite}(?![\\d])`, 'g');
  const resultat: Triplet[] = [];
  for (const m of texte.matchAll(motif)) {
    resultat.push([nombre(m[1]), nombre(m[2]), nombre(m[3])]);
  }
  return resultat;
}

/** Masses en kilogrammes : « 100 kg », « 1 000 kg », « 4,000 kg ». */
export function extraireKg(texte: string): number[] {
  const motif = /(\d{1,3}(?:[\s  ,.]\d{3})*|\d+)[\s  ]?kg\b/g;
  return [...texte.matchAll(motif)].map((m) => Number(m[1].replace(/[\s  ,.]/g, '')));
}

/** « Jusqu'à 18 cm », « Up to 18 cm », « Bis 18 cm » : plus grande dimension seule. */
export function extraireLongueurMax(texte: string): number | null {
  const m = texte.match(/(?:jusqu['’]à|up to|bis)[\s  ]+(\d{1,4})[\s  ]?cm/i);
  return m ? Number(m[1]) : null;
}

export function trier(t: readonly number[]): number[] {
  return [...t].sort((a, b) => a - b);
}

/** Même ensemble de trois valeurs, quel que soit l'ordre des axes. */
export function memeTriplet(a: readonly number[], b: readonly number[]): boolean {
  const x = trier(a);
  const y = trier(b);
  return x.length === 3 && y.length === 3 && x.every((v, i) => v === y[i]);
}

export function tripletDe(d: { l: number; w: number; h: number }): Triplet {
  return [d.l, d.w, d.h];
}

function nombre(s: string): number {
  return Number(s.replace(',', '.'));
}
