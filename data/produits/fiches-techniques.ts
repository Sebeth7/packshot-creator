/**
 * Référentiel des caractéristiques dimensionnelles des produits (règle D45, R-PRODUCT-DIM).
 *
 * Ce fichier ne pilote encore aucun affichage. Il fixe, pour chaque machine des deux
 * catalogues (`components/machine-selector/lib/machines.ts` et
 * `components/calculators/ROICalculator/lib/machines.ts`) :
 * - `psc` : les valeurs que le site consomme aujourd'hui. Le test
 *   `lib/produits/__tests__/coherence-dimensions.test.ts` exige qu'elles soient
 *   identiques à celles des deux catalogues : toute modification d'une dimension passe
 *   donc par ce fichier, avec sa source.
 * - `fabricant` : la fiche publique du fabricant, relevée mot pour mot, datée.
 * - `statuts` : l'écart entre les deux, par caractéristique. Une contradiction non
 *   résolue reste inscrite comme telle ; aucune valeur n'est choisie ici.
 *
 * Quatre informations distinctes, jamais confondues :
 * - objet maximal photographiable (`objetMax`) ;
 * - dimensions extérieures de la machine (`machine`) ;
 * - diamètre du plateau tournant (`plateauCm`) ;
 * - charge admissible (`charges`), avec son type.
 * Unités : centimètres et kilogrammes.
 *
 * Ordre des axes : le fabricant ne le précise que pour l'Alphashot XL G2
 * (« W × D × H »). Ailleurs, `axes: 'non-precises'` et le triplet est recopié dans
 * l'ordre de la source, sans affectation largeur / profondeur / hauteur.
 *
 * Correspondance de version : un nom PSC suffixé (« Pro v2 », « v2 ») et un nom
 * fabricant sans suffixe ne sont pas réputés identiques sans validation écrite de
 * Sébastien (`version: 'non-etablie'`). Même logique que D29 pour XL v2 / XL G2.
 *
 * Questions ouvertes : Q20 (`docs/seo-geo/BOITE-AUX-LETTRES.md`).
 * Registre des écarts : `docs/standards/registre-ecarts-dimensions.md`.
 */

export type Triplet = readonly [number, number, number];

/** Dimensions telles que les catalogues du site les stockent (`dimensionsMax`, `studioFootprint`). */
export interface DimensionsPsc {
  l: number;
  w: number;
  h: number;
}

/**
 * conforme       : le site et le fabricant donnent la même valeur.
 * ecart          : valeurs différentes, version établie : erreur démontrable (catégorie A).
 * a-arbitrer     : valeurs différentes, version non établie ou sources contradictoires (catégorie B).
 * non-verifiable : aucune source primaire pour cette caractéristique.
 */
export type Statut = 'conforme' | 'ecart' | 'a-arbitrer' | 'non-verifiable';

export type TypeCharge = 'objet' | 'ponctuelle' | 'surfacique';

export interface SourceFabricant {
  url: string;
  /** Intitulés exacts de la source, recopiés sans traduction. */
  intitule: string;
  /** Date et heure du relevé (UTC). */
  releveLe: string;
}

export interface FicheFabricant {
  nom: string;
  source: SourceFabricant;
  objetMax: Triplet | null;
  /** Quand la source ne donne qu'une valeur ou une phrase. */
  objetMaxTexte?: string;
  machine: Triplet | null;
  axes: 'W×D×H' | 'non-precises';
  masseMachineKg?: number;
  plateauCm?: number;
  charges: { kg: number; type: TypeCharge }[];
  remarque?: string;
}

export interface FicheTechnique {
  /** Identifiant des deux catalogues. */
  id: string;
  nomPsc: string;
  version: 'etablie' | 'non-etablie' | 'sans-source';
  psc: {
    objetMax: DimensionsPsc;
    encombrement: DimensionsPsc | null;
    chargeKg: number;
  };
  fabricant: FicheFabricant | null;
  statuts: {
    objetMax: Statut;
    encombrement: Statut;
    charge: Statut;
  };
  /** Points de Q20 qui portent sur cette fiche. */
  q20: string[];
}

const RELEVE = '2026-10-03T05:54Z';
const orbitvu = (slug: string, intitule: string): SourceFabricant => ({
  url: `https://orbitvu.com/products/${slug}`,
  intitule,
  releveLe: RELEVE,
});

export const FICHES_TECHNIQUES: readonly FicheTechnique[] = [
  {
    id: 'alphashot-micro-v2',
    nomPsc: 'Alphashot Micro Pro v2',
    version: 'etablie',
    psc: { objetMax: { l: 18, w: 15, h: 16 }, encombrement: { l: 83, w: 52, h: 72 }, chargeKg: 1 },
    fabricant: {
      nom: 'Alphashot Micro Pro v2',
      source: orbitvu('alphashot-micro-v2', 'Dimensions 83 cm x 54 cm x 72 cm ; Weight 47 kg ; Maximum photographed object weight 1 kg ; « small objects up to 18 cm long »'),
      objetMax: null,
      objetMaxTexte: 'up to 18 cm long',
      machine: [83, 54, 72],
      axes: 'non-precises',
      masseMachineKg: 47,
      charges: [{ kg: 1, type: 'objet' }],
    },
    statuts: { objetMax: 'non-verifiable', encombrement: 'ecart', charge: 'conforme' },
    q20: ['Q20.5'],
  },
  {
    id: 'alphashot-360',
    nomPsc: 'Alphashot 360',
    version: 'etablie',
    psc: { objetMax: { l: 30, w: 30, h: 30 }, encombrement: { l: 115, w: 69, h: 64 }, chargeKg: 3 },
    fabricant: {
      nom: 'Alphashot 360',
      source: orbitvu('alphashot-360', 'Dimensions 115 cm x 69 cm x 64 cm ; Weight 60 kg ; Maximum object size 30 cm x 30 cm x 30 cm ; Turntable diameter 59 cm ; Maximum object weight 3 kg'),
      objetMax: [30, 30, 30],
      machine: [115, 69, 64],
      axes: 'non-precises',
      masseMachineKg: 60,
      plateauCm: 59,
      charges: [{ kg: 3, type: 'objet' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'conforme' },
    q20: [],
  },
  {
    id: 'alphashot-xl-g2',
    nomPsc: 'Alphashot XL G2',
    version: 'etablie',
    psc: { objetMax: { l: 60, w: 40, h: 70 }, encombrement: { l: 142, w: 87, h: 176 }, chargeKg: 25 },
    fabricant: {
      nom: 'Alphashot XL G2',
      source: orbitvu('alphashot-xl-g2', 'Studio dimensions 88 × 140 × 197 cm (W × D × H) ; Net weight 140 kg ; Max photographed object size 60 × 40 × 70 cm (W × D × H) ; curseur « max 25 kg »'),
      objetMax: [60, 40, 70],
      machine: [88, 140, 197],
      axes: 'W×D×H',
      masseMachineKg: 140,
      charges: [{ kg: 25, type: 'objet' }],
      remarque: "L'encombrement du site (142 × 87 × 176) est celui de l'Alphashot XL ancienne génération.",
    },
    statuts: { objetMax: 'conforme', encombrement: 'ecart', charge: 'conforme' },
    q20: ['Q20.4'],
  },
  {
    id: 'alphashot-pro-g2',
    nomPsc: 'Alphashot Pro G2',
    version: 'etablie',
    psc: { objetMax: { l: 35, w: 35, h: 40 }, encombrement: { l: 112, w: 71, h: 72 }, chargeKg: 10 },
    fabricant: {
      nom: 'Alphashot Pro G2',
      source: orbitvu('alphashot-pro-g2', 'Dimensions 112 x 71 x 72 cm ; Nett weight 48 kg ; Max object size 35 x 35 x 40 cm ; Max object weight 10 kg'),
      objetMax: [35, 35, 40],
      machine: [112, 71, 72],
      axes: 'non-precises',
      masseMachineKg: 48,
      charges: [{ kg: 10, type: 'objet' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'conforme' },
    q20: [],
  },
  {
    // D29 : la correspondance XL v2 (PSC) / Alphashot XL (fabricant) n'est pas validée.
    id: 'alphashot-xl-v2',
    nomPsc: 'Alphashot XL v2',
    version: 'non-etablie',
    psc: { objetMax: { l: 50, w: 30, h: 70 }, encombrement: { l: 142, w: 87, h: 176 }, chargeKg: 25 },
    fabricant: {
      nom: 'Alphashot XL',
      source: orbitvu('alphashot-xl', 'Dimensions 142 cm x 87 cm x 176 cm ; Weight 137 kg ; Max object size 50 cm x 30 cm x 70 cm ; Turntable diameter 75 cm ; Max object weight 25 kg'),
      objetMax: [50, 30, 70],
      machine: [142, 87, 176],
      axes: 'non-precises',
      masseMachineKg: 137,
      plateauCm: 75,
      charges: [{ kg: 25, type: 'objet' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'conforme' },
    q20: ['Q20.12'],
  },
  {
    id: 'alphashot-xl-wine-v2',
    nomPsc: 'Alphashot XL Wine v2',
    version: 'sans-source',
    psc: { objetMax: { l: 40, w: 40, h: 50 }, encombrement: { l: 142, w: 87, h: 176 }, chargeKg: 5 },
    fabricant: null,
    statuts: { objetMax: 'non-verifiable', encombrement: 'non-verifiable', charge: 'non-verifiable' },
    q20: ['Q20.10'],
  },
  {
    id: 'alphashot-xl-pro-v2',
    nomPsc: 'Alphashot XL Pro v2',
    version: 'sans-source',
    psc: { objetMax: { l: 50, w: 70, h: 30 }, encombrement: { l: 142, w: 87, h: 176 }, chargeKg: 25 },
    fabricant: null,
    statuts: { objetMax: 'non-verifiable', encombrement: 'non-verifiable', charge: 'non-verifiable' },
    q20: ['Q20.7'],
  },
  {
    id: 'alphadesk',
    nomPsc: 'Alphadesk v2',
    version: 'non-etablie',
    psc: { objetMax: { l: 85, w: 70, h: 5 }, encombrement: { l: 137, w: 123, h: 155 }, chargeKg: 10 },
    fabricant: {
      nom: 'Alphadesk',
      source: orbitvu('alphadesk', 'Dimensions 156 cm x 124 cm x 138 cm ; Weight 55 kg ; Maximum object size 85 cm x 70 cm x 5 cm ; Maximum object weight 10 kg'),
      objetMax: [85, 70, 5],
      machine: [156, 124, 138],
      axes: 'non-precises',
      masseMachineKg: 55,
      charges: [{ kg: 10, type: 'objet' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'a-arbitrer', charge: 'conforme' },
    q20: ['Q20.5', 'Q20.12'],
  },
  {
    id: 'alphatable',
    nomPsc: 'Alphatable v2',
    version: 'non-etablie',
    psc: { objetMax: { l: 165, w: 112, h: 5 }, encombrement: { l: 338, w: 191, h: 268 }, chargeKg: 80 },
    fabricant: {
      nom: 'Alphatable',
      source: orbitvu('alphatable', 'Dimensions 255 cm x 191 cm x 248 cm ; Weight 200 kg ; Max object size 165 cm x 112 cm x 5 cm ; Max object weight 80 kg'),
      objetMax: [165, 112, 5],
      machine: [255, 191, 248],
      axes: 'non-precises',
      masseMachineKg: 200,
      charges: [{ kg: 80, type: 'objet' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'a-arbitrer', charge: 'conforme' },
    q20: ['Q20.5'],
  },
  {
    id: 'alphastudio-compact-v2',
    nomPsc: 'Alphastudio Compact Pro v2',
    version: 'non-etablie',
    psc: { objetMax: { l: 80, w: 70, h: 130 }, encombrement: { l: 178, w: 136, h: 183 }, chargeKg: 100 },
    fabricant: {
      nom: 'Alphastudio Compact',
      source: orbitvu('alphastudio-compact', 'Dimensions 178 cm x 136 cm x 183 cm ; Weight 280 kg ; Max object size 80 cm x 70 cm x 130 cm ; Turntable diameter 125 cm ; Max object weight 100 kg'),
      objetMax: [80, 70, 130],
      machine: [178, 136, 183],
      axes: 'non-precises',
      masseMachineKg: 280,
      plateauCm: 125,
      charges: [{ kg: 100, type: 'objet' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'conforme' },
    q20: ['Q20.2'],
  },
  {
    id: 'alphastudio-xxl-v2',
    nomPsc: 'Alphastudio XXL Pro v2',
    version: 'non-etablie',
    psc: { objetMax: { l: 100, w: 90, h: 190 }, encombrement: { l: 277, w: 190, h: 273 }, chargeKg: 100 },
    fabricant: {
      nom: 'Alphastudio XXL',
      source: orbitvu('alphastudio-xxl', 'Dimensions 247 cm x 139 cm x 164 cm ; Weight 340 kg ; Max object size 190 cm x 90 cm x 100 cm ; Turntable diameter 120 cm ; Max object weight 100 kg'),
      objetMax: [190, 90, 100],
      machine: [247, 139, 164],
      axes: 'non-precises',
      masseMachineKg: 340,
      plateauCm: 120,
      charges: [{ kg: 100, type: 'objet' }],
      remarque: 'Profondeur 90 cm confirmée par Sébastien le 01/10 (JOURNAL). Affectation l = 100, w = 90, h = 190 propre à PSC.',
    },
    statuts: { objetMax: 'conforme', encombrement: 'a-arbitrer', charge: 'conforme' },
    q20: ['Q20.2', 'Q20.3', 'Q20.6'],
  },
  {
    id: 'fashion-studio-basic',
    nomPsc: 'Fashion Studio Basic',
    version: 'sans-source',
    psc: { objetMax: { l: 200, w: 100, h: 200 }, encombrement: { l: 600, w: 300, h: 292 }, chargeKg: 0 },
    fabricant: null,
    statuts: { objetMax: 'non-verifiable', encombrement: 'non-verifiable', charge: 'non-verifiable' },
    q20: ['Q20.10'],
  },
  {
    id: 'fashion-studio',
    nomPsc: 'Fashion Studio Pro v2',
    version: 'non-etablie',
    psc: { objetMax: { l: 200, w: 100, h: 200 }, encombrement: { l: 847, w: 301, h: 292 }, chargeKg: 0 },
    fabricant: {
      nom: 'Fashion Studio',
      source: orbitvu('fashion-studio', 'Dimensions 847 cm x 301 cm x 292 cm ; Weight 760 kg ; Max object size 200 cm x 100 cm x 200 cm ; Max object weight - point load 35 kg ; Max object weight - surface load 200 kg'),
      objetMax: [200, 100, 200],
      machine: [847, 301, 292],
      axes: 'non-precises',
      masseMachineKg: 760,
      charges: [{ kg: 35, type: 'ponctuelle' }, { kg: 200, type: 'surfacique' }],
      remarque: 'Le site affiche « 200 kg/m² » ; la source dit « surface load 200 kg », sans unité par mètre carré.',
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'a-arbitrer' },
    q20: ['Q20.9'],
  },
  {
    id: 'bike-studio',
    nomPsc: 'Bike Studio',
    version: 'etablie',
    psc: { objetMax: { l: 200, w: 100, h: 200 }, encombrement: { l: 847, w: 301, h: 292 }, chargeKg: 35 },
    fabricant: {
      nom: 'Bike Studio',
      source: orbitvu('bike-studio', 'Dimensions 847 cm x 301 cm x 292 cm ; Weight 800 kg ; Max object size 200 cm x 100 cm x 200 cm ; Max object weight - point load 35 kg ; Max object weight - surface load 200 kg'),
      objetMax: [200, 100, 200],
      machine: [847, 301, 292],
      axes: 'non-precises',
      masseMachineKg: 800,
      charges: [{ kg: 35, type: 'ponctuelle' }, { kg: 200, type: 'surfacique' }],
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'conforme' },
    q20: [],
  },
  {
    id: 'furniture-studio',
    nomPsc: 'Furniture Studio',
    version: 'etablie',
    psc: { objetMax: { l: 250, w: 200, h: 180 }, encombrement: { l: 500, w: 400, h: 300 }, chargeKg: 500 },
    fabricant: {
      nom: 'Furniture Studio',
      source: orbitvu('furniture-studio', 'Dimensions max 670 x 588 x 302 ; Nett weight 663 kg ; Max object size 300 x 300 x 200 ; Max object weight 4000 kg'),
      objetMax: [300, 300, 200],
      machine: [670, 588, 302],
      axes: 'non-precises',
      masseMachineKg: 663,
      charges: [{ kg: 4000, type: 'objet' }],
      remarque: "Bloc identique, au caractère près, à celui de la page E-comm Studio+. Landing F5 : « Plateforme de 1 000 kg, version 4 000 kg ».",
    },
    statuts: { objetMax: 'a-arbitrer', encombrement: 'a-arbitrer', charge: 'a-arbitrer' },
    q20: ['Q20.1'],
  },
  {
    id: 'e-comm-studio-plus',
    nomPsc: 'E-Comm Studio+',
    version: 'etablie',
    psc: { objetMax: { l: 300, w: 300, h: 200 }, encombrement: { l: 670, w: 588, h: 302 }, chargeKg: 1000 },
    fabricant: {
      nom: 'E-comm Studio+',
      source: orbitvu('e-comm-studio', 'Dimensions max 670 x 588 x 302 ; Nett weight 663 kg ; Max object size 300 x 300 x 200 ; Max object weight 4000 kg'),
      objetMax: [300, 300, 200],
      machine: [670, 588, 302],
      axes: 'non-precises',
      masseMachineKg: 663,
      charges: [{ kg: 4000, type: 'objet' }],
      remarque: 'Le site affiche « 1000 kg (4000 kg option) » ; la source ne mentionne pas d’option.',
    },
    statuts: { objetMax: 'conforme', encombrement: 'conforme', charge: 'a-arbitrer' },
    q20: ['Q20.8'],
  },
  {
    // Catalogue ROI seulement, délistée, repli du conseiller ROI (lib/roiChat/tools.ts).
    id: 'alphashot-g2',
    nomPsc: 'Alphashot G2',
    version: 'sans-source',
    psc: { objetMax: { l: 35, w: 35, h: 40 }, encombrement: null, chargeKg: 10 },
    fabricant: null,
    statuts: { objetMax: 'non-verifiable', encombrement: 'non-verifiable', charge: 'non-verifiable' },
    q20: ['Q20.10', 'Q20.12'],
  },
];

/**
 * Valeurs retirées : elles ne doivent réapparaître nulle part dans le site.
 * XXL : 100 × 70 × 190 cm remplacé par 100 × 90 × 190 cm le 01/10/2026 (#66).
 */
export const VALEURS_RETIREES: readonly { id: string; triplet: Triplet; remplaceeLe: string; motif: string }[] = [
  { id: 'alphastudio-xxl-v2', triplet: [100, 70, 190], remplaceeLe: '2026-10-01', motif: 'Profondeur 90 cm (retour de Sébastien du 01/10, fiche Orbitvu)' },
];

export function ficheTechnique(id: string): FicheTechnique | undefined {
  return FICHES_TECHNIQUES.find((f) => f.id === id);
}
