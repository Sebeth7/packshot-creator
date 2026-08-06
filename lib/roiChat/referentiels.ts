/**
 * Référentiels serveur du calculateur ROI conversationnel (CDC §6).
 *
 * ⚠ STATUT : les entrées `status: 'draft'` sont des estimations NON validées
 * — ne jamais les présenter comme des chiffres certifiés.
 * État au 06/08/2026 (validation Seb) :
 *  - Coûts de marché : TOUS VALIDÉS, y compris les 4 entrées sectorielles
 *    (horlogerie-joaillerie 60 €, cosmétique 50 €, vins 35 €, mobilier 40 €
 *    — données Seb). La ligne « journée shooting presta » a été retirée.
 *  - Gains par fonction : seule mesure/pesée (8 min/4 €) est validée
 *    (Seb 02/08, vMeasure/Cubiscan) ; les 4 autres restent en draft
 *    pendant le rodage, sur décision Seb.
 *
 * Les tools market_reference et function_gains exposent ces données en
 * lecture seule, statut inclus — le system prompt impose d'étiqueter tout
 * chiffre draft comme « estimation de marché à confirmer ».
 */

export type ReferentielStatus = 'valide' | 'draft';

// ===== a) Coûts de marché (baselines contrefactuelles) =====

export interface MarketCostEntry {
  id: string;
  label: string;
  /** Secteur d'activité si l'entrée est sectorielle (sinon : généraliste) */
  secteur?: string;
  /** €/unité — fourchette basse (volume) */
  prixMin: number;
  /** €/unité — fourchette haute (unité/complexe) */
  prixMax: number;
  /** Valeur médiane conseillée pour une baseline prudente */
  prixMedian: number;
  unite: 'photo' | 'produit' | 'jour' | 'mois' | 'look';
  notes: string;
  sources: string[];
  status: ReferentielStatus;
}

export const MARKET_COSTS: MarketCostEntry[] = [
  {
    id: 'packshot-fond-blanc',
    label: 'Packshot fond blanc (prestataire, généraliste)',
    prixMin: 15,
    prixMax: 40,
    prixMedian: 25,
    unite: 'photo',
    notes:
      "10-40 €/photo à l'unité ; dégressif en lot (100 photos : 15-20 €). Retouche basique incluse, retouche créative +5-20 €/image. Pour les secteurs listés plus bas, préférer l'entrée sectorielle.",
    sources: ['brique-lab.fr/shooting-photo-prix', 'packshot-paris.fr', 'atelierb9.com', 'Validé Seb 06/08/2026'],
    status: 'valide',
  },
  {
    id: 'packshot-horlogerie-joaillerie',
    label: 'Packshot horlogerie / joaillerie / luxe (prestataire)',
    secteur: 'horlogerie-joaillerie',
    prixMin: 30,
    prixMax: 90,
    prixMedian: 60,
    unite: 'photo',
    notes:
      'Médian 60 €/photo, rapport ×0,5 à ×1,5 selon le niveau de qualité attendu (macro, gestion des reflets, exigence retouche).',
    sources: ['Données Seb 06/08/2026'],
    status: 'valide',
  },
  {
    id: 'packshot-cosmetique',
    label: 'Packshot cosmétique (prestataire)',
    secteur: 'cosmetique',
    prixMin: 40,
    prixMax: 75,
    prixMedian: 50,
    unite: 'photo',
    notes: 'Médian 50 €/photo, rapport ×0,8 à ×1,5 selon le niveau de qualité attendu.',
    sources: ['Données Seb 06/08/2026'],
    status: 'valide',
  },
  {
    id: 'packshot-vins',
    label: 'Packshot vins & spiritueux (prestataire)',
    secteur: 'vins',
    prixMin: 28,
    prixMax: 53,
    prixMedian: 35,
    unite: 'photo',
    notes:
      'Médian 35 €/photo (validé). Fourchette indicative ×0,8-1,5 non actée — raisonner sur le médian.',
    sources: ['Données Seb 06/08/2026'],
    status: 'valide',
  },
  {
    id: 'packshot-mobilier',
    label: 'Packshot mobilier / gros produits (prestataire)',
    secteur: 'mobilier',
    prixMin: 32,
    prixMax: 60,
    prixMedian: 40,
    unite: 'photo',
    notes:
      'Médian 40 €/photo (validé). Fourchette indicative ×0,8-1,5 non actée — raisonner sur le médian.',
    sources: ['Données Seb 06/08/2026'],
    status: 'valide',
  },
  {
    id: 'packshot-creatif',
    label: 'Packshot créatif / mise en scène (prestataire)',
    prixMin: 30,
    prixMax: 80,
    prixMedian: 50,
    unite: 'photo',
    notes: 'Fond travaillé, composition, ombres réalistes.',
    sources: ['brique-lab.fr/shooting-photo-prix'],
    status: 'valide',
  },
  {
    id: 'ghost-mannequin',
    label: 'Ghost mannequin / piqué vêtement (prestataire)',
    prixMin: 24,
    prixMax: 80,
    prixMedian: 40,
    unite: 'photo',
    notes: 'Dégressif dès 24 €/photo en volume (studios parisiens spécialisés).',
    sources: ['lestudiohonore.fr/packshot-ecommerce', 'eshopstudio.com/photos-ghost'],
    status: 'valide',
  },
  {
    id: 'photo-360',
    label: 'Vue 360° produit (prestataire)',
    prixMin: 80,
    prixMax: 150,
    prixMedian: 120,
    unite: 'produit',
    notes:
      'Plancher constaté ~150 € HT/produit à l’unité, dégressif en volume. Quasi impossible à produire manuellement en interne sans équipement dédié.',
    sources: ['photographe-360.com/les-tarifs-des-photographies-360'],
    status: 'valide',
  },
  {
    id: 'lifestyle-mannequin',
    label: 'Photo lifestyle avec mannequin (prestataire)',
    prixMin: 80,
    prixMax: 200,
    prixMedian: 120,
    unite: 'look',
    notes: 'Journée studio avec mannequin : 2 000-5 000 €/jour, soit 80-200 €/look.',
    sources: ['brique-lab.fr/shooting-photo-prix'],
    status: 'valide',
  },
  // (Ligne « journée de shooting prestataire » RETIRÉE — décision Seb 06/08 :
  // baseline trop peu sourcée, on raisonne en prix/photo et coût salarié.)
  {
    id: 'photographe-salarie',
    label: 'Photographe salarié dédié (coût employeur)',
    prixMin: 3500,
    prixMax: 4800,
    prixMedian: 4000,
    unite: 'mois',
    notes:
      'Salaire moyen photographe France 2026 : ~2 210 € net/mois (33 500 € brut/an) → coût employeur ~3 500-4 800 €/mois. Cohérent avec la constante 4 000 €/mois du calculateur.',
    sources: ['hellowork.com/salaires/photographe', 'francecv.com/salaire/photographe', 'jooble.org'],
    status: 'valide',
  },
];

// ===== b) Gains par typologie de fonction =====

export interface FunctionGainEntry {
  fonction: string;
  label: string;
  minutesParProduit?: number;
  euroParProduit?: number;
  /** Présentation imposée : plancher, complément qualitatif */
  presentation: string;
  sources: string[];
  status: ReferentielStatus;
}

export const FUNCTION_GAINS: FunctionGainEntry[] = [
  {
    fonction: 'mesure-donnees',
    label: 'Mesure/pesée dimensionnelle + capture données étiquettes (MDC)',
    minutesParProduit: 8,
    euroParProduit: 4,
    presentation:
      'ACTÉ Seb 02/08/2026 : 4 min mesure/pesée/report + 4 min retranscription étiquette, opérateur 30 €/h. À présenter comme un PLANCHER (hors litiges transporteurs évités, station de cubage évitée, avantage fiscal ~−25 % sur les break-even).',
    sources: ['vMeasure', 'Cubiscan', 'benchmarks listing produit'],
    status: 'valide',
  },
  {
    fonction: 'packshot',
    label: 'Packshot automatisé (vs prise de vue manuelle interne)',
    minutesParProduit: 12,
    presentation:
      'DRAFT : prise de vue manuelle + retouche/détourage ~15 min/produit vs ~2-3 min en machine (détourage automatique) → ~12 min évitées/produit (~6 € à 30 €/h). Alternative presta : 15-40 €/photo évités (voir coûts de marché).',
    sources: ['estimation interne à valider par Seb'],
    status: 'draft',
  },
  {
    fonction: '360',
    label: 'Animation 360° automatisée',
    euroParProduit: 100,
    presentation:
      'DRAFT : baseline prestataire 80-150 €/produit (médiane 120 €, retenir 100 € prudent). En interne sans machine : pratiquement irréalisable (plateau motorisé + post-production). Étiqueter « par rapport à un scénario prestataire ».',
    sources: ['photographe-360.com'],
    status: 'draft',
  },
  {
    fonction: 'video',
    label: 'Vidéo produit automatisée',
    euroParProduit: 60,
    presentation:
      'DRAFT : vidéo produit courte prestataire 50-150 € selon complexité ; retenir 60 € prudent en baseline. À affiner avec des benchmarks dédiés avant validation.',
    sources: ['brique-lab.fr (extrapolation), à sourcer davantage'],
    status: 'draft',
  },
  {
    fonction: 'ghost-mannequin',
    label: 'Ghost mannequin automatisé',
    euroParProduit: 30,
    presentation:
      'DRAFT : baseline prestataire 24-80 €/photo (dégressif) → retenir 30 € prudent en volume. En interne manuel : montage piqué ~20-30 min/pièce.',
    sources: ['lestudiohonore.fr', 'eshopstudio.com'],
    status: 'draft',
  },
];

/** Vue sérialisable pour les tools (statut inclus, jamais filtré). */
export function getMarketCosts() {
  return {
    avertissement:
      "Les entrées status='draft' sont des estimations de marché NON validées : les présenter comme « estimation de marché à confirmer », jamais comme des chiffres certifiés.",
    entries: MARKET_COSTS,
  };
}

export function getFunctionGains() {
  return {
    avertissement:
      "Seule la fonction 'mesure-donnees' est validée (Seb 02/08/2026). Les autres sont des drafts : les présenter comme des estimations à confirmer.",
    entries: FUNCTION_GAINS,
  };
}
