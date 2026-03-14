import type { UserInputs, CalculationResults, Machine } from './types';
import { CONSTANTES } from './constants';
import { MACHINES } from './machines';
import {
  recommendMachine as recommendMachineAdvanced,
  userInputsToSelectionCriteria,
} from './machineSelector';

/**
 * Recommande la machine optimale selon les inputs utilisateur
 * Utilise le nouvel algorithme multi-critères avec fallback sur l'ancienne logique
 */
export function recommanderMachine(inputs: UserInputs): Machine {
  // Convertir les inputs en critères de sélection
  const criteria = userInputsToSelectionCriteria(inputs);

  // Utiliser le nouveau sélecteur multi-critères (trié par prix croissant)
  const recommendation = recommendMachineAdvanced(criteria, inputs.tailleProduitsCategory);

  if (recommendation) {
    return recommendation.machine;
  }

  // Fallback sur l'ancienne logique si aucune machine trouvée
  return fallbackRecommendation(inputs);
}

/**
 * Ancienne logique de recommandation (fallback)
 */
function fallbackRecommendation(inputs: UserInputs): Machine {
  const { photosAnnuelles, tailleProduitsCategory } = inputs;

  // 1. Filtrer par taille de produits (critère principal)
  const machinesCompatibles = MACHINES.filter(m =>
    m.tailleCategories.includes(tailleProduitsCategory)
  );

  if (machinesCompatibles.length === 0) {
    // Fallback: Alphashot Pro G2 (polyvalent)
    return MACHINES.find(m => m.id === 'alphashot-pro-g2')!;
  }

  // 2. Calculer le besoin de capacité annuelle
  const capaciteRequise = photosAnnuelles / CONSTANTES.joursProduction;

  // 3. Filtrer par capacité suffisante
  const machinesCapables = machinesCompatibles.filter(m =>
    m.capaciteJour >= capaciteRequise
  );

  // Si aucune machine n'a assez de capacité seule, prendre la plus productive
  const candidats = machinesCapables.length > 0
    ? machinesCapables
    : machinesCompatibles;

  // 4. Choisir selon le volume
  if (photosAnnuelles < 5000) {
    // Petit volume: machine la moins chère compatible
    return candidats.reduce((a, b) => a.prix < b.prix ? a : b);
  } else if (photosAnnuelles < 15000) {
    // Volume moyen: version Pro si disponible
    const proVersion = candidats.find(m => m.id.includes('pro'));
    return proVersion || candidats.reduce((a, b) => a.prix < b.prix ? a : b);
  } else {
    // Gros volume: machine avec meilleure capacité
    return candidats.reduce((a, b) => a.capaciteJour > b.capaciteJour ? a : b);
  }
}

/**
 * Calcule tous les métriques ROI
 * Si forceMachineId est fourni, utilise cette machine au lieu de la recommandation automatique
 */
export function calculateROI(inputs: UserInputs, forceMachineId?: string): CalculationResults {
  // Valeurs par défaut si optionnelles non renseignées
  const budgetEquipement = inputs.budgetEquipement ?? CONSTANTES.budgetEquipementDefaut;
  const coutSalarial = inputs.coutSalarialMensuel ?? CONSTANTES.salaireMensuelCoutEmployeur;

  // ===== SITUATION ACTUELLE =====

  // 1. Coût employeur annuel
  const coutEmployeurAnnuel =
    inputs.nbOperateurs *
    coutSalarial *
    12 *
    (inputs.pourcentageTemps / 100);

  // 2. Coût équipement annuel
  const coutEquipementAnnuel = budgetEquipement;

  // 3. Coût solution externe
  const coutExterneAnnuel = inputs.utiliseSolutionExterne && inputs.budgetMensuelExterne
    ? inputs.budgetMensuelExterne * 12
    : 0;

  // 4. Coût total actuel
  const coutTotalActuel = coutEmployeurAnnuel + coutEquipementAnnuel + coutExterneAnnuel;

  // 5. Capacité annuelle actuelle
  const capaciteAnnuelleActuelle =
    inputs.capaciteJournaliere *
    CONSTANTES.joursProduction *
    inputs.nbOperateurs *
    (inputs.pourcentageTemps / 100);

  // 6. Protection division par zéro
  const photosAnnuelles = Math.max(inputs.photosAnnuelles, 1);

  // 7. Coût par photo actuel
  const coutParPhotoActuel = coutTotalActuel / photosAnnuelles;

  // 8. Temps par photo (heures)
  const heuresTravailAnnuel = CONSTANTES.heuresSemaine * CONSTANTES.nbSemainesTravail;
  const tempsParPhotoHeures =
    (heuresTravailAnnuel * inputs.nbOperateurs * (inputs.pourcentageTemps / 100)) /
    photosAnnuelles;

  // 9. Jours de production actuels
  const joursProductionActuels =
    photosAnnuelles /
    Math.max(inputs.capaciteJournaliere * inputs.nbOperateurs, 1);

  // ===== SITUATION AVEC MACHINE =====

  // 1. Machine recommandée (ou forcée si machineId spécifié)
  const machine = forceMachineId
    ? (MACHINES.find(m => m.id === forceMachineId) ?? recommanderMachine(inputs))
    : recommanderMachine(inputs);

  // 2. TCO annualisé (sur 5 ans) - pour affichage coût annuel comptable
  const tcoAnnuel =
    (machine.prix / CONSTANTES.dureeAmortissement) +
    machine.maintenanceAnnuelle +
    machine.consommablesAnnuels;

  // 3. Coût opérationnel machine annuel (hors amortissement) - pour cash-flow
  const coutOperationnelMachineAnnuel =
    machine.maintenanceAnnuelle +
    machine.consommablesAnnuels;

  // 4. Coût opérateur machine
  // Règles : N > 1 → ceil(N/2) opérateurs | N ≤ 1 → 1 opérateur, temps ÷ 3
  let nbOperateursMachine: number;
  let pourcentageTempsMachineEffectif: number;

  if (inputs.nbOperateurs > 1) {
    nbOperateursMachine = Math.ceil(inputs.nbOperateurs / 2);
    const joursNecessairesMachine = photosAnnuelles / machine.capaciteJour;
    pourcentageTempsMachineEffectif = Math.min(joursNecessairesMachine / CONSTANTES.joursProduction, 1) * 100;
  } else {
    nbOperateursMachine = 1;
    pourcentageTempsMachineEffectif = inputs.pourcentageTemps / 3;
  }

  const coutOperateurMachine =
    nbOperateursMachine *
    coutSalarial *
    12 *
    (pourcentageTempsMachineEffectif / 100);

  // 5. Coût total avec machine (comptable, avec amortissement)
  const coutTotalMachine = coutOperateurMachine + tcoAnnuel;

  // 6. Capacité annuelle avec machine
  const capaciteAnnuelleMachine = machine.capaciteJour * CONSTANTES.joursProduction;

  // 7. Coût par photo avec machine (basé sur coût comptable annuel)
  const coutParPhotoMachine = coutTotalMachine / photosAnnuelles;

  // 8. Temps par photo avec machine
  const heuresAvecMachine = heuresTravailAnnuel * nbOperateursMachine * (pourcentageTempsMachineEffectif / 100);
  const tempsParPhotoMachine = heuresAvecMachine / photosAnnuelles;

  // 9. Jours de production avec machine
  const joursProductionMachine = photosAnnuelles / machine.capaciteJour;

  // ===== COMPARAISON (basée sur cash-flow réel, pas comptable) =====

  // Économie opérationnelle annuelle (cash-flow : avant vs après, hors amortissement)
  const coutOperationnelTotal = coutOperateurMachine + coutOperationnelMachineAnnuel;
  const economieOperationnelle = coutTotalActuel - coutOperationnelTotal;

  // 1. Économie annuelle (comptable, affichée comme référence)
  const economieAnnuelle = coutTotalActuel - coutTotalMachine;

  // 2. Flag rentabilité (basé sur cash-flow)
  const isRentable = economieOperationnelle > machine.prix / CONSTANTES.dureeAmortissement;

  // 3. Break-even en mois (cash-flow : quand les économies cumulées = investissement)
  let breakEvenMois: number | null = null;
  if (economieOperationnelle > 0) {
    breakEvenMois = machine.prix / (economieOperationnelle / 12);
  }

  // 4. ROI année 1 (cash-flow : économies opérationnelles an 1 - investissement)
  const roiAn1 = ((economieOperationnelle - machine.prix) / machine.prix) * 100;

  // 5. ROI 5 ans (cash-flow sur durée d'amortissement)
  const economie5ans = (economieOperationnelle * 5) - machine.prix;
  const roi5ans = (economie5ans / machine.prix) * 100;

  // 6. Économie par photo
  const economieParPhoto = coutParPhotoActuel - coutParPhotoMachine;
  const economieParPhotoPourcent = (economieParPhoto / Math.max(coutParPhotoActuel, 0.01)) * 100;

  // 7. Jours économisés
  const joursEconomises = joursProductionActuels - joursProductionMachine;
  const gainTempsPourcent = (joursEconomises / Math.max(joursProductionActuels, 1)) * 100;

  // 8. Scalabilité
  const capaciteResiduelle = capaciteAnnuelleMachine - photosAnnuelles;
  const potentielCroissance = (capaciteResiduelle / photosAnnuelles) * 100;

  return {
    // Situation actuelle
    coutEmployeurAnnuel,
    coutEquipementAnnuel,
    coutExterneAnnuel,
    coutTotalActuel,
    coutParPhotoActuel,
    tempsParPhotoHeures,
    joursProductionActuels,
    capaciteAnnuelleActuelle,

    // Avec machine
    machine,
    tcoAnnuel,
    coutOperateurMachine,
    coutTotalMachine,
    coutParPhotoMachine,
    tempsParPhotoMachine,
    joursProductionMachine,
    capaciteAnnuelleMachine,

    // Comparaison
    economieAnnuelle,
    breakEvenMois,
    roiAn1,
    roi5ans,
    economie5ans,
    economieParPhoto,
    economieParPhotoPourcent,
    joursEconomises,
    gainTempsPourcent,
    capaciteResiduelle,
    potentielCroissance,

    // Flag
    isRentable,
  };
}

/**
 * Formate un nombre en euros
 */
export function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Formate des heures en format lisible
 */
export function formatHeures(heures: number): string {
  if (heures < 1) {
    return `${Math.round(heures * 60)} min`;
  }
  const h = Math.floor(heures);
  const m = Math.round((heures - h) * 60);
  return m > 0 ? `${h}h${m.toString().padStart(2, '0')}` : `${h}h`;
}

/**
 * Génère les données pour le graphique d'évolution sur 5 ans
 * Utilise les coûts opérationnels (cash-flow) pour éviter le double comptage
 */
export function generateChartData(results: CalculationResults): Array<{
  mois: number;
  actuel: number;
  orbitvu: number;
  economie: number;
}> {
  const data = [];

  // Coût opérationnel mensuel avec machine (hors amortissement, car le prix est en mois 0)
  const coutOperationnelMensuel =
    (results.coutOperateurMachine +
      results.machine.maintenanceAnnuelle +
      results.machine.consommablesAnnuels) / 12;

  for (let mois = 0; mois <= 60; mois++) {
    const coutActuelCumule = (results.coutTotalActuel / 12) * mois;
    const coutOrbituCumule = results.machine.prix + (coutOperationnelMensuel * mois);

    data.push({
      mois,
      actuel: Math.round(coutActuelCumule),
      orbitvu: Math.round(coutOrbituCumule),
      economie: Math.round(coutActuelCumule - coutOrbituCumule),
    });
  }

  return data;
}
