import type {
  Machine,
  MachineEligibility,
  SelectionCriteria,
  ContentType,
  ProductSizeCategory,
  Dimensions,
  BilingualText,
} from './types';
import { MACHINES } from './machines';

/**
 * Algorithme de sélection multi-critères pour machines Orbitvu
 *
 * Critères éliminatoires (binaire : ça rentre ou pas) :
 * - Dimensions produit
 * - Poids produit
 *
 * Critères de scoring (100 points) :
 * - Poids produit (marge) : 25 points
 * - Volume annuel : 30 points
 * - Types de contenu : 25 points
 * - Secteur d'activité : 15 points
 * - Niveau d'automatisation : 5 points
 */

// ============================================
// CONSTANTES DE SCORING
// ============================================

const WEIGHTS = {
  weight: 25,
  volume: 30,
  contentTypes: 25,
  sectors: 15,
  automation: 5,
} as const;

const MIN_ELIGIBILITY_SCORE = 50; // Score minimum pour être éligible

// ============================================
// FONCTIONS UTILITAIRES
// ============================================

/**
 * Vérifie si les dimensions du produit rentrent dans la machine
 */
function checkDimensionsFit(
  productDims: Dimensions | undefined,
  machineDims: Dimensions
): { fits: boolean; margin: number } {
  if (!productDims) {
    return { fits: true, margin: 100 }; // Si pas de dimensions spécifiées, on accepte
  }

  // Trier les dimensions pour permettre rotation du produit
  const productSorted = [productDims.l, productDims.w, productDims.h].sort((a, b) => b - a);
  const machineSorted = [machineDims.l, machineDims.w, machineDims.h].sort((a, b) => b - a);

  // Vérifier que chaque dimension du produit rentre
  const fits = productSorted.every((dim, i) => dim <= machineSorted[i]);

  // Calculer la marge (plus c'est grand, mieux c'est)
  if (fits) {
    const margins = productSorted.map((dim, i) =>
      machineSorted[i] > 0 ? (machineSorted[i] - dim) / machineSorted[i] * 100 : 100
    );
    const avgMargin = margins.reduce((a, b) => a + b, 0) / margins.length;
    return { fits: true, margin: avgMargin };
  }

  return { fits: false, margin: 0 };
}

/**
 * Vérifie si le poids du produit est acceptable
 */
function checkWeightFit(
  productWeight: number | undefined,
  machineMaxWeight: number
): { fits: boolean; margin: number } {
  if (!productWeight || productWeight === 0) {
    return { fits: true, margin: 100 };
  }

  if (machineMaxWeight === 0) {
    // Machines spéciales (Fashion Studio) sans limite de poids fixe
    return { fits: true, margin: 50 };
  }

  if (productWeight <= machineMaxWeight) {
    const margin = ((machineMaxWeight - productWeight) / machineMaxWeight) * 100;
    return { fits: true, margin };
  }

  return { fits: false, margin: 0 };
}

/**
 * Calcule le score de correspondance du volume annuel
 */
function calculateVolumeScore(annualVolume: number, volumeRange: { min: number; max: number }): number {
  const { min, max } = volumeRange;

  // Volume parfaitement dans la plage
  if (annualVolume >= min && annualVolume <= max) {
    // Plus le volume est au milieu de la plage, meilleur est le score
    const midpoint = (min + max) / 2;
    const distanceFromMid = Math.abs(annualVolume - midpoint) / (max - min);
    return 100 - (distanceFromMid * 30); // Score entre 70 et 100
  }

  // Volume en dessous du minimum (machine peut être surdimensionnée)
  if (annualVolume < min) {
    const ratio = annualVolume / min;
    return Math.max(30, ratio * 70); // Score entre 30 et 70
  }

  // Volume au-dessus du maximum (machine peut être sous-dimensionnée)
  if (annualVolume > max) {
    const ratio = max / annualVolume;
    return Math.max(20, ratio * 60); // Score entre 20 et 60
  }

  return 50;
}

/**
 * Calcule le score de correspondance des types de contenu
 */
function calculateContentScore(
  requestedTypes: ContentType[],
  machineFeatures: ContentType[]
): { score: number; matching: ContentType[]; missing: ContentType[] } {
  if (requestedTypes.length === 0) {
    return { score: 100, matching: [], missing: [] };
  }

  const matching = requestedTypes.filter(type => machineFeatures.includes(type));
  const missing = requestedTypes.filter(type => !machineFeatures.includes(type));

  const score = (matching.length / requestedTypes.length) * 100;

  return { score, matching, missing };
}

/**
 * Convertit ProductSizeCategory en dimensions approximatives
 * Ces dimensions doivent correspondre aux capacités réelles des machines
 * pour chaque catégorie (avec marge de sécurité)
 */
function categoryToDimensions(category: ProductSizeCategory): Dimensions {
  switch (category) {
    case 'petit':
      // Machines: Alphashot Micro (18×15×16), Alphashot 360/G2 (30×30×30)
      return { l: 20, w: 20, h: 20 };
    case 'moyen':
      // Machines: Alphashot Pro G2 (35×35×40), XL (50×30×70)
      return { l: 35, w: 30, h: 40 };
    case 'grand':
      // Machines: Alphastudio Compact/XXL (100×70×190)
      // Dimensions compatibles avec tri [80, 70, 60] vs machine [190, 100, 70]
      return { l: 80, w: 60, h: 70 };
    case 'tres-grand':
      // Machines: Fashion Studio (200×100×200), E-Comm (300×300×200)
      return { l: 150, w: 80, h: 150 };
  }
}

// ============================================
// FONCTION PRINCIPALE DE SÉLECTION
// ============================================

/**
 * Évalue l'éligibilité d'une machine pour les critères donnés
 */
export function evaluateMachine(
  machine: Machine,
  criteria: SelectionCriteria
): MachineEligibility {
  const matchingCriteria: string[] = [];
  const missingCriteria: string[] = [];
  let totalScore = 0;

  // 1. DIMENSIONS - Critère binaire éliminatoire (ça rentre ou pas)
  const dimCheck = checkDimensionsFit(criteria.productDimensions, machine.dimensionsMax);
  if (!dimCheck.fits) {
    return {
      machineId: machine.id,
      machine,
      score: 0,
      isEligible: false,
      matchingCriteria: [],
      missingCriteria: ['Dimensions produit trop grandes'],
      keyAdvantages: machine.keyAdvantages,
      limitations: machine.limitations,
    };
  }
  matchingCriteria.push('Dimensions adaptées');

  // 2. POIDS (25 points) - Critère éliminatoire + scoring marge
  const weightCheck = checkWeightFit(criteria.productWeight, machine.poidsMaxKg);
  if (!weightCheck.fits) {
    return {
      machineId: machine.id,
      machine,
      score: 0,
      isEligible: false,
      matchingCriteria: [],
      missingCriteria: ['Poids produit trop élevé'],
      keyAdvantages: machine.keyAdvantages,
      limitations: machine.limitations,
    };
  }
  const weightScore = (weightCheck.margin / 100) * WEIGHTS.weight;
  totalScore += weightScore;
  if (weightCheck.margin > 20) {
    matchingCriteria.push('Poids compatible');
  }

  // 3. VOLUME ANNUEL (30 points)
  const volumeScore = (calculateVolumeScore(criteria.annualVolume, machine.volumeRange) / 100) * WEIGHTS.volume;
  totalScore += volumeScore;
  if (criteria.annualVolume >= machine.volumeRange.min && criteria.annualVolume <= machine.volumeRange.max) {
    matchingCriteria.push('Volume idéal');
  } else if (criteria.annualVolume < machine.volumeRange.min) {
    missingCriteria.push('Volume inférieur à l\'idéal');
  } else {
    missingCriteria.push('Volume supérieur à l\'idéal');
  }

  // 4. TYPES DE CONTENU (25 points)
  const contentResult = calculateContentScore(criteria.contentTypes, machine.features);
  const contentScore = (contentResult.score / 100) * WEIGHTS.contentTypes;
  totalScore += contentScore;
  if (contentResult.matching.length > 0) {
    matchingCriteria.push(`Supporte: ${contentResult.matching.join(', ')}`);
  }
  if (contentResult.missing.length > 0) {
    missingCriteria.push(`Ne supporte pas: ${contentResult.missing.join(', ')}`);
  }

  // 5. SECTEURS D'ACTIVITÉ (15 points)
  if (criteria.sectors && criteria.sectors.length > 0) {
    const matchingSectors = criteria.sectors.filter(s => machine.idealSectors.includes(s));
    const sectorScore = (matchingSectors.length / criteria.sectors.length) * WEIGHTS.sectors;
    totalScore += sectorScore;
    if (matchingSectors.length > 0) {
      matchingCriteria.push('Secteur compatible');
    }
  } else {
    totalScore += WEIGHTS.sectors; // Pas de critère = score max
  }

  // 6. AUTOMATISATION (5 points)
  if (criteria.automationPreference) {
    const automationMatch = machine.automationLevel === criteria.automationPreference;
    const partialMatch =
      (criteria.automationPreference === 'full-auto' && machine.automationLevel === 'semi-auto') ||
      (criteria.automationPreference === 'semi-auto' && machine.automationLevel === 'full-auto');

    if (automationMatch) {
      totalScore += WEIGHTS.automation;
      matchingCriteria.push('Niveau d\'automatisation idéal');
    } else if (partialMatch) {
      totalScore += WEIGHTS.automation * 0.6;
    } else {
      totalScore += WEIGHTS.automation * 0.3;
      missingCriteria.push('Automatisation différente');
    }
  } else {
    totalScore += WEIGHTS.automation;
  }

  // Arrondir le score
  const finalScore = Math.round(totalScore);

  return {
    machineId: machine.id,
    machine,
    score: finalScore,
    isEligible: finalScore >= MIN_ELIGIBILITY_SCORE,
    matchingCriteria,
    missingCriteria,
    keyAdvantages: machine.keyAdvantages,
    limitations: machine.limitations,
  };
}

/**
 * Sélectionne et classe les machines éligibles pour les critères donnés
 */
export function selectEligibleMachines(criteria: SelectionCriteria, sizeCategory?: ProductSizeCategory): MachineEligibility[] {
  // Filtrer d'abord par catégorie de taille si spécifiée
  const machinesFiltered = (sizeCategory
    ? MACHINES.filter(m => m.tailleCategories.includes(sizeCategory))
    : MACHINES
  ).filter(m => !m.delisted && !m.prixSurDevis);

  const evaluations = machinesFiltered.map(machine => evaluateMachine(machine, criteria));

  // Filtrer les machines éligibles et trier par prix croissant (puis par score si même prix)
  return evaluations
    .filter(e => e.isEligible)
    .sort((a, b) => a.machine.prix - b.machine.prix || b.score - a.score);
}

/**
 * Recommande la meilleure machine pour les critères donnés
 * Fallback vers l'ancienne logique si aucune machine éligible
 */
export function recommendMachine(criteria: SelectionCriteria, sizeCategory?: ProductSizeCategory): MachineEligibility | null {
  const eligibleMachines = selectEligibleMachines(criteria, sizeCategory);

  if (eligibleMachines.length > 0) {
    return eligibleMachines[0];
  }

  // Fallback : prendre la machine la moins chère parmi celles de la bonne catégorie
  // (machines sans prix confirmé exclues — pas de calcul ROI possible sans prix réel)
  const machinesFiltered = (sizeCategory
    ? MACHINES.filter(m => m.tailleCategories.includes(sizeCategory))
    : MACHINES
  ).filter(m => !m.prixSurDevis && !m.delisted);

  const allEvaluations = machinesFiltered.map(machine => evaluateMachine(machine, criteria))
    .sort((a, b) => a.machine.prix - b.machine.prix || b.score - a.score);

  if (allEvaluations.length > 0 && allEvaluations[0].score > 0) {
    return { ...allEvaluations[0], isEligible: true };
  }

  return null;
}

/**
 * Convertit les UserInputs existants en SelectionCriteria
 * Pour compatibilité avec le wizard actuel
 */
export function userInputsToSelectionCriteria(inputs: {
  photosAnnuelles: number;
  tailleProduitsCategory: ProductSizeCategory;
  typesContenu?: ContentType[];
}): SelectionCriteria {
  const contentTypes: ContentType[] = inputs.typesContenu && inputs.typesContenu.length > 0
    ? inputs.typesContenu
    : ['packshot'];

  const baseDimensions = categoryToDimensions(inputs.tailleProduitsCategory);

  // Si flat-lay est sélectionné, les produits sont posés à plat (épaisseur max ~5cm)
  // On garde les dimensions L/W de la catégorie mais avec une hauteur plate
  const isFlatLay = contentTypes.includes('flat-lay');
  const productDimensions = isFlatLay
    ? { l: baseDimensions.l, w: baseDimensions.w, h: 5 }
    : baseDimensions;

  return {
    productDimensions,
    annualVolume: inputs.photosAnnuelles,
    contentTypes,
  };
}

/**
 * Obtient les machines éligibles pour comparaison
 * Si count est 0 ou non spécifié, retourne toutes les machines éligibles
 */
export function getTopMachinesForComparison(
  criteria: SelectionCriteria,
  count: number = 0,
  sizeCategory?: ProductSizeCategory
): MachineEligibility[] {
  const eligible = selectEligibleMachines(criteria, sizeCategory);
  return count > 0 ? eligible.slice(0, count) : eligible;
}

// ============================================
// LABELS POUR L'UI
// ============================================

export const CONTENT_TYPE_LABELS: Record<ContentType, BilingualText> = {
  'packshot': { fr: 'Packshot', en: 'Packshot', 'de-ch': 'Packshot' },
  '360': { fr: 'Vue 360°', en: '360° View', 'de-ch': '360°-Ansicht' },
  'video': { fr: 'Vidéo', en: 'Video', 'de-ch': 'Video' },
  'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin', 'de-ch': 'Ghost-Mannequin' },
  'flat-lay': { fr: 'Flat-lay (vue dessus)', en: 'Flat-lay (top view)', 'de-ch': 'Flat-Lay (Draufsicht)' },
  'lifestyle': { fr: 'Lifestyle', en: 'Lifestyle', 'de-ch': 'Lifestyle' },
};

export const AUTOMATION_LABELS: Record<Machine['automationLevel'], BilingualText> = {
  'manual': { fr: 'Manuel', en: 'Manual', 'de-ch': 'Manuell' },
  'semi-auto': { fr: 'Semi-automatique', en: 'Semi-automatic', 'de-ch': 'Halbautomatisch' },
  'full-auto': { fr: 'Entièrement automatique', en: 'Fully automatic', 'de-ch': 'Vollautomatisch' },
};
