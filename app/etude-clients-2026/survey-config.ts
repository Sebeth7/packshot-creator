// Source de vérité unique du questionnaire v2 : options et libellés partagés
// entre le formulaire (SurveyForm.tsx) et l'API (app/api/submit-survey/route.ts).
// Pour une nouvelle vague : incrémenter SURVEY_VERSION et adapter les options ici.

export const SURVEY_VERSION = 'v2_2026_q2';

export type Option = { value: string; label: string };

export const MACHINES: Option[] = [
  { value: 'alphashot_micro', label: 'Alphashot Micro' },
  { value: 'alphashot_360', label: 'Alphashot 360' },
  { value: 'alphashot_g2', label: 'Alphashot G2 / Pro G2' },
  { value: 'alphashot_xl', label: 'Alphashot XL' },
  { value: 'alphashot_xl_g2', label: 'Alphashot XL G2' },
  { value: 'alphadesk_alphatable', label: 'Alphadesk / Alphatable' },
  { value: 'alphastudio_compact', label: 'Alphastudio Compact' },
  { value: 'alphastudio_xxl', label: 'Alphastudio XXL' },
  { value: 'autre', label: 'Autre / je ne sais plus' },
];

export const ANCIENNETE: Option[] = [
  { value: 'moins_6_mois', label: 'Moins de 6 mois' },
  { value: '6_12_mois', label: '6 à 12 mois' },
  { value: '1_3_ans', label: '1 à 3 ans' },
  { value: 'plus_3_ans', label: 'Plus de 3 ans' },
];

export const FREQUENCE: Option[] = [
  { value: 'tous_les_jours', label: 'Tous les jours' },
  { value: 'plusieurs_fois_semaine', label: 'Plusieurs fois par semaine' },
  { value: 'chaque_semaine', label: 'Chaque semaine' },
  { value: 'chaque_mois', label: 'Chaque mois' },
  { value: 'plus_rarement', label: 'Plus rarement' },
];

export const TYPES_VISUELS: Option[] = [
  { value: 'packshot', label: 'Packshot / photo fixe' },
  { value: 'animation_360', label: 'Animation 360°' },
  { value: 'video', label: 'Vidéo' },
  { value: 'flat_lay', label: 'Photo à plat (flat lay)' },
  { value: 'ecommerce', label: 'Visuels e-commerce' },
  { value: 'reseaux_sociaux', label: 'Réseaux sociaux / marketing' },
];

export const VOLUME_MENSUEL: Option[] = [
  { value: 'moins_50', label: 'Moins de 50' },
  { value: '50_200', label: '50 à 200' },
  { value: '200_1000', label: '200 à 1 000' },
  { value: 'plus_1000', label: 'Plus de 1 000' },
];

export type CritereKey =
  | 'q7_qualite_images'
  | 'q7_productivite'
  | 'q7_logiciel'
  | 'q7_detourage'
  | 'q7_fiabilite'
  | 'q7_support';

export const CRITERES: { key: CritereKey; label: string }[] = [
  { key: 'q7_qualite_images', label: 'Qualité des images produites' },
  { key: 'q7_productivite', label: 'Rapidité / gain de productivité' },
  { key: 'q7_logiciel', label: "Facilité d'utilisation du logiciel (Orbitvu Station)" },
  { key: 'q7_detourage', label: 'Détourage automatique (IQ Mask)' },
  { key: 'q7_fiabilite', label: 'Fiabilité du matériel' },
  { key: 'q7_support', label: "Qualité de l'accompagnement / support" },
];

export const BENEFICES: Option[] = [
  { value: 'gain_temps', label: 'Gain de temps' },
  { value: 'reduction_couts', label: 'Réduction des coûts' },
  { value: 'homogeneite', label: 'Homogénéité des visuels' },
  { value: 'internalisation', label: 'Internalisation de la production' },
  { value: 'autonomie', label: 'Autonomie / simplicité' },
  { value: 'autre', label: 'Autre' },
];

export const IA_MATURITE: Option[] = [
  { value: 'utilise_regulierement', label: "Nous l'utilisons déjà régulièrement" },
  { value: 'experimente', label: 'Nous avons testé / nous expérimentons' },
  { value: 'reflexion', label: 'Nous y réfléchissons, sans avoir encore essayé' },
  { value: 'curieux', label: "Pas pour l'instant, mais curieux d'en savoir plus" },
  { value: 'pas_concerne', label: 'Pas concernés / pas confiance' },
];

export const IA_USAGES: Option[] = [
  { value: 'mises_en_scene', label: 'Mises en scène / fonds lifestyle sans shooting' },
  { value: 'declinaisons', label: "Déclinaisons d'un même visuel (formats, ambiances, saisons)" },
  { value: 'retouche_detourage', label: 'Retouche et détourage automatisés' },
  { value: 'mannequins_virtuels', label: 'Mannequins ou porter virtuel' },
  { value: 'fiches_produits', label: 'Génération de fiches produits / textes' },
  { value: 'aucun', label: 'Aucun de ces usages' },
  { value: 'autre', label: 'Autre' },
];

export function labelOf(options: Option[], value: string | null | undefined): string {
  if (!value) return '';
  return options.find(o => o.value === value)?.label ?? value;
}

export function labelsOf(options: Option[], values: string[] | null | undefined): string {
  if (!values || values.length === 0) return '';
  return values.map(v => labelOf(options, v)).join(', ');
}
