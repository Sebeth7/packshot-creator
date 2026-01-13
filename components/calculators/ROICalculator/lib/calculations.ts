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
  const { photosAnnuelles, repartition, tailleProduitsCategory } = inputs;

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

  // 4. Pour les gros volumes lifestyle (>40%), privilégier les studios plus grands
  if (repartition.lifestyle > 40 && photosAnnuelles > 10000) {
    const studiosGrands = candidats.filter(m =>
      m.id.includes('alphastudio') || m.id.includes('fashion')
    );
    if (studiosGrands.length > 0) {
      // Prendre le moins cher des studios grands
      return studiosGrands.reduce((a, b) => a.prix < b.prix ? a : b);
    }
  }

  // 5. Choisir selon le volume
  // Logique: pour un même volume, prendre la machine la plus adaptée rapport qualité/prix
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
 */
export function calculateROI(inputs: UserInputs): CalculationResults {
  // Valeurs par défaut si optionnelles non renseignées
  const budgetEquipement = inputs.budgetEquipement ?? CONSTANTES.budgetEquipementDefaut;

  // ===== SITUATION ACTUELLE =====

  // 1. Coût employeur annuel
  const coutEmployeurAnnuel =
    inputs.nbOperateurs *
    CONSTANTES.salaireMensuelCoutEmployeur *
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

  // 1. Machine recommandée
  const machine = recommanderMachine(inputs);

  // 2. TCO annualisé (sur 5 ans)
  const tcoAnnuel =
    (machine.prix / CONSTANTES.dureeAmortissement) +
    machine.maintenanceAnnuelle +
    machine.consommablesAnnuels;

  // 3. Coût opérateur machine (proportionnel au temps nécessaire)
  // HYPOTHÈSE CLÉ : Avec une machine Orbitvu, UN SEUL opérateur suffit (vs N opérateurs avant)
  // L'automatisation permet de passer de N personnes à 1 personne sur la machine
  // Ce coût est proportionnel au temps réellement nécessaire pour produire les photos
  const joursNecessairesMachine = photosAnnuelles / machine.capaciteJour;
  const pourcentageTempsMachine = Math.min(joursNecessairesMachine / CONSTANTES.joursProduction, 1);
  const coutOperateurMachine = CONSTANTES.salaireMensuelCoutEmployeur * 12 * pourcentageTempsMachine;

  // 4. Coût total avec machine
  const coutTotalMachine = coutOperateurMachine + tcoAnnuel;

  // 5. Capacité annuelle avec machine
  const capaciteAnnuelleMachine = machine.capaciteJour * CONSTANTES.joursProduction;

  // 6. Coût par photo avec machine
  const coutParPhotoMachine = coutTotalMachine / photosAnnuelles;

  // 7. Temps par photo avec machine
  // Heures travaillées = 1 opérateur × pourcentage temps machine × heures annuelles standard
  // Ceci reflète le temps réel passé par l'opérateur machine pour produire toutes les photos
  const heuresAvecMachine = heuresTravailAnnuel * pourcentageTempsMachine;
  const tempsParPhotoMachine = heuresAvecMachine / photosAnnuelles;

  // 8. Jours de production avec machine
  const joursProductionMachine = photosAnnuelles / machine.capaciteJour;

  // ===== COMPARAISON =====

  // 1. Économie annuelle
  const economieAnnuelle = coutTotalActuel - coutTotalMachine;

  // 2. Flag rentabilité
  const isRentable = economieAnnuelle > 0;

  // 3. Break-even (null si pas rentable)
  let breakEvenMois: number | null = null;
  if (isRentable && economieAnnuelle > 0) {
    const economieMensuelle = economieAnnuelle / 12;
    breakEvenMois = machine.prix / economieMensuelle;
  }

  // 4. ROI année 1
  const roiAn1 = ((economieAnnuelle - machine.prix) / machine.prix) * 100;

  // 5. ROI 5 ans (aligné sur la durée d'amortissement)
  const economie5ans = (economieAnnuelle * 5) - machine.prix;
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
 */
export function generateChartData(results: CalculationResults): Array<{
  mois: number;
  actuel: number;
  orbitvu: number;
  economie: number;
}> {
  const data = [];

  for (let mois = 0; mois <= 60; mois++) {
    const coutActuelCumule = (results.coutTotalActuel / 12) * mois;
    const coutOrbituCumule = results.machine.prix + ((results.coutTotalMachine / 12) * mois);

    data.push({
      mois,
      actuel: Math.round(coutActuelCumule),
      orbitvu: Math.round(coutOrbituCumule),
      economie: Math.round(coutActuelCumule - coutOrbituCumule),
    });
  }

  return data;
}
