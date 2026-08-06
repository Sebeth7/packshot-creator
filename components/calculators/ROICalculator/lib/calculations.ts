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
  // Machines sans prix confirmé exclues — pas de calcul ROI possible sans prix réel
  const machinesCompatibles = MACHINES.filter(m =>
    m.tailleCategories.includes(tailleProduitsCategory) && !m.prixSurDevis && !m.delisted
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
 * Calcule tous les métriques ROI.
 *
 * Modèle économique : séparation stricte entre
 *  - l'économie DIRECTE (cash) : coûts réellement supprimés (prestataires externes,
 *    budget équipement) moins le coût de la machine (loyers ou TCO) — c'est la seule
 *    valeur présentée comme "économie annuelle" ;
 *  - le TEMPS INTERNE LIBÉRÉ : les salaires internes ne disparaissent pas quand la
 *    machine arrive, ils sont réaffectés. Ce gain est exposé séparément en jours/an
 *    avec une valorisation indicative, jamais additionné à l'économie cash.
 * Tous les montants sont présentés avant impôt.
 *
 * Si forceMachineId est fourni, utilise cette machine au lieu de la recommandation automatique
 */
export function calculateROI(inputs: UserInputs, forceMachineId?: string): CalculationResults {
  // Valeurs par défaut si optionnelles non renseignées
  const budgetEquipement = inputs.budgetEquipement ?? CONSTANTES.budgetEquipementDefaut;
  const coutSalarial = inputs.coutSalarialMensuel ?? CONSTANTES.salaireMensuelCoutEmployeur;

  // ===== SITUATION ACTUELLE =====

  // 1. Coût employeur annuel (temps interne déclaré — valorisé comme temps, pas comme cash)
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

  // 3b. Investissement initial envisagé (cash au mois 0, même traitement que le prix machine PackshotCreator)
  const investissementInitialMontant = inputs.investissementInitialActif && inputs.montantInvestissementInitial
    ? inputs.montantInvestissementInitial
    : 0;

  // 4. Capacité annuelle actuelle
  const capaciteAnnuelleActuelle =
    inputs.capaciteJournaliere *
    CONSTANTES.joursProduction *
    inputs.nbOperateurs *
    (inputs.pourcentageTemps / 100);

  // 5. Protection division par zéro
  const photosAnnuelles = Math.max(inputs.photosAnnuelles, 1);

  // 6. Facteur de volume : si le volume cible dépasse la capacité actuelle,
  // le temps interne doit être proportionné (il faudrait plus de ressources)
  const facteurVolume = Math.max(photosAnnuelles / Math.max(capaciteAnnuelleActuelle, 1), 1);
  const coutEmployeurAnnuelEffectif = coutEmployeurAnnuel * facteurVolume;

  // 7. Coûts cash supprimables : seuls les décaissements externes comptent
  // en économie directe (les salaires internes sont traités en temps libéré)
  const coutCashActuel = coutEquipementAnnuel + coutExterneAnnuel;

  // 7b. Coût total actuel (informatif — CRM et comparaisons, jamais présenté comme économisable)
  const coutTotalActuel = coutEmployeurAnnuelEffectif + coutCashActuel;

  // 8. Temps par produit (heures) — basé sur la cadence journalière réelle
  const heuresParJour = CONSTANTES.heuresSemaine / 5;
  const tempsParPhotoHeures = heuresParJour / Math.max(inputs.capaciteJournaliere, 1);

  // 9. Jours de production actuels
  const joursProductionActuels =
    photosAnnuelles /
    Math.max(inputs.capaciteJournaliere * inputs.nbOperateurs, 1);

  // 10. Jours-homme internes consacrés à la photo (base du temps libéré)
  const joursInternesActuels =
    CONSTANTES.joursProduction *
    inputs.nbOperateurs *
    (inputs.pourcentageTemps / 100) *
    facteurVolume;

  // ===== SITUATION AVEC MACHINE =====

  // Mode leasing ?
  const isLeasing = inputs.leasingActif && inputs.leasingMachineId && inputs.leasingMensualite && inputs.leasingNbMois;

  // 1. Machine (forcée par leasing, par forceMachineId, ou recommandée)
  // Machines sans prix confirmé (prixSurDevis) jamais utilisables ici — pas de calcul ROI possible sans prix réel
  const machine = isLeasing
    ? (MACHINES.find(m => m.id === inputs.leasingMachineId && !m.prixSurDevis && !m.delisted) ?? recommanderMachine(inputs))
    : forceMachineId
      ? (MACHINES.find(m => m.id === forceMachineId && !m.prixSurDevis && !m.delisted) ?? recommanderMachine(inputs))
      : recommanderMachine(inputs);

  // 1b. Accessoires complémentaires (achat uniquement — inclus dans le leasing)
  const montantAccessoires = (!isLeasing && inputs.montantAccessoires) ? inputs.montantAccessoires : 0;
  // Prix total PackshotCreator = machine + accessoires
  const prixTotalPackshotCreator = machine.prix + montantAccessoires;

  // 2. Coûts machine selon mode achat ou leasing
  const tauxIS = 0.25;
  let tcoAnnuel: number;
  let coutOperationnelMachineAnnuel: number;
  let avantageFiscalAnnuel: number;

  if (isLeasing) {
    const leasingAnnuel = inputs.leasingMensualite! * 12;
    tcoAnnuel = leasingAnnuel; // En leasing, le TCO = loyers annuels
    coutOperationnelMachineAnnuel = leasingAnnuel; // Tout est opérationnel (pas d'amortissement)
    // Loyers 100% déductibles en charges d'exploitation (informatif — non additionné à l'économie,
    // les charges actuelles supprimées étant elles-mêmes déductibles)
    avantageFiscalAnnuel = leasingAnnuel * tauxIS;
  } else {
    tcoAnnuel =
      (prixTotalPackshotCreator / CONSTANTES.dureeAmortissement) +
      machine.maintenanceAnnuelle +
      machine.consommablesAnnuels;
    coutOperationnelMachineAnnuel =
      machine.maintenanceAnnuelle +
      machine.consommablesAnnuels;
    // Amortissement réduit le bénéfice imposable (machine + accessoires)
    const amortissementAnnuel = prixTotalPackshotCreator / CONSTANTES.dureeAmortissement;
    avantageFiscalAnnuel = amortissementAnnuel * tauxIS;
  }

  // 3. Capacité effective (plafonnée à 300/jour si flat-lay uniquement)
  const isFlatLayOnly = inputs.typesContenu?.length === 1 && inputs.typesContenu[0] === 'flat-lay';
  const capaciteJourEffective = isFlatLayOnly
    ? Math.min(machine.capaciteJour, 300)
    : machine.capaciteJour;

  // 4. Coût opérateur machine
  const joursNecessairesMachine = photosAnnuelles / capaciteJourEffective;
  const pourcentageTempsMachineEffectif = Math.min(joursNecessairesMachine / CONSTANTES.joursProduction, 1) * 100;

  let nbOperateursMachine: number;
  if (inputs.nbOperateurs <= 1) {
    nbOperateursMachine = 1;
  } else {
    const operateursNecessaires = Math.ceil(joursNecessairesMachine / CONSTANTES.joursProduction);
    nbOperateursMachine = Math.max(1, Math.min(operateursNecessaires, Math.ceil(inputs.nbOperateurs / 2)));
  }

  const coutOperateurMachine =
    nbOperateursMachine *
    coutSalarial *
    12 *
    (pourcentageTempsMachineEffectif / 100);

  // 5. Coût total avec machine (informatif — symétrique de coutTotalActuel)
  const coutTotalMachine = coutOperateurMachine + tcoAnnuel;

  // 6. Capacité annuelle avec machine
  const capaciteAnnuelleMachine = capaciteJourEffective * CONSTANTES.joursProduction;

  // 7. Temps par produit avec machine — basé sur la cadence journalière de la machine
  const tempsParPhotoMachine = heuresParJour / Math.max(capaciteJourEffective, 1);

  // 8. Jours de production avec machine
  const joursProductionMachine = photosAnnuelles / capaciteJourEffective;

  // ===== TEMPS INTERNE LIBÉRÉ =====

  const tempsLibereJours = Math.max(0, joursInternesActuels - joursNecessairesMachine);
  // Valorisation indicative au coût employeur — temps réaffectable, PAS une économie de trésorerie
  const valeurTempsLibere = Math.max(0, coutEmployeurAnnuelEffectif - coutOperateurMachine);

  // ===== ÉCONOMIE DIRECTE (cash, avant impôt) =====

  const economieAnnuelle = coutCashActuel - tcoAnnuel;
  const gainTotalAnnuel = economieAnnuelle + valeurTempsLibere;

  // Cash-flow annuel en achat : seuls les décaissements comptent (l'amortissement est
  // une écriture comptable) — cohérent avec les courbes du graphique d'évolution
  const cashFlowAnnuelAchat = coutCashActuel - coutOperationnelMachineAnnuel;

  // Rentabilité et break-even (trésorerie pure)
  let breakEvenMois: number | null = null;
  const isRentable = gainTotalAnnuel > 0;

  if (isLeasing) {
    if (economieAnnuelle > 0 || investissementInitialMontant > 0) {
      breakEvenMois = 1;
    }
  } else {
    // Investissement net = prix PackshotCreator - investissement initial envisagé
    const netInvestissement = prixTotalPackshotCreator - investissementInitialMontant;
    if (netInvestissement <= 0) {
      // PackshotCreator coûte moins cher que l'alternative dès le jour 1
      breakEvenMois = 1;
    } else if (cashFlowAnnuelAchat > 0) {
      breakEvenMois = netInvestissement / (cashFlowAnnuelAchat / 12);
    }
  }

  // ===== ROI (cash uniquement, avant impôt) =====

  const dureeAnalyseMois = isLeasing ? inputs.leasingNbMois! : CONSTANTES.dureeAmortissement * 12;
  const coutTotalInvestissement = isLeasing
    ? inputs.leasingMensualite! * inputs.leasingNbMois!
    : prixTotalPackshotCreator;

  // Économie nette année 1 (leasing : déjà nette des loyers ; achat : cash-flow moins le prix)
  const economieAn1 = isLeasing
    ? economieAnnuelle + investissementInitialMontant
    : cashFlowAnnuelAchat - prixTotalPackshotCreator + investissementInitialMontant;

  const roiAn1 = (economieAn1 / Math.max(isLeasing ? inputs.leasingMensualite! * 12 : prixTotalPackshotCreator, 1)) * 100;

  // Économie nette cumulée sur la durée d'analyse (contrat en leasing, 5 ans en achat)
  const economie5ans = isLeasing
    ? economieAnnuelle * (dureeAnalyseMois / 12) + investissementInitialMontant
    : cashFlowAnnuelAchat * CONSTANTES.dureeAmortissement - prixTotalPackshotCreator + investissementInitialMontant;

  const roi5ans = (economie5ans / Math.max(coutTotalInvestissement, 1)) * 100;

  // Jours économisés
  const joursEconomises = joursProductionActuels - joursProductionMachine;
  const gainTempsPourcent = (joursEconomises / Math.max(joursProductionActuels, 1)) * 100;

  // Scalabilité
  const capaciteResiduelle = capaciteAnnuelleMachine - photosAnnuelles;
  const potentielCroissance = (capaciteResiduelle / photosAnnuelles) * 100;

  // Capacité insuffisante
  const capaciteInsuffisante = photosAnnuelles > capaciteAnnuelleMachine;

  // Incohérence probable des saisies : la capacité interne déclarée dépasse largement
  // l'objectif annuel (confusion volume mensuel/annuel fréquente)
  const inputsSurcapacite = capaciteAnnuelleActuelle >= photosAnnuelles * 2;

  return {
    // Situation actuelle
    coutEmployeurAnnuel: coutEmployeurAnnuelEffectif,
    coutEquipementAnnuel,
    coutExterneAnnuel,
    coutCashActuel,
    investissementInitialMontant,
    coutTotalActuel,
    tempsParPhotoHeures,
    joursProductionActuels,
    capaciteAnnuelleActuelle,

    // Avec machine
    machine,
    montantAccessoires,
    prixTotalPackshotCreator,
    tcoAnnuel,
    coutOperateurMachine,
    coutTotalMachine,
    tempsParPhotoMachine,
    joursProductionMachine,
    capaciteAnnuelleMachine,

    // Comparaison
    economieAnnuelle,
    tempsLibereJours,
    valeurTempsLibere,
    gainTotalAnnuel,
    avantageFiscalAnnuel,
    breakEvenMois,
    dureeAnalyseMois,
    roiAn1,
    economieAn1,
    roi5ans,
    economie5ans,
    joursEconomises,
    gainTempsPourcent,
    capaciteResiduelle,
    potentielCroissance,

    // Flags
    isRentable,
    capaciteInsuffisante,
    inputsSurcapacite,
    isLeasing: !!isLeasing,
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
 * Génère les données pour le graphique d'évolution — coûts cash cumulés uniquement
 * (pas de valorisation salariale ni d'avantage fiscal, symétrique des deux côtés).
 * Achat : 5 ans avec prix d'achat au mois 0
 * Leasing : durée réelle du contrat avec loyers mensuels (pas de saut au mois 0)
 */
export function generateChartData(results: CalculationResults): Array<{
  mois: number;
  actuel: number;
  orbitvu: number;
  economie: number;
}> {
  const data = [];
  const dureeMois = results.dureeAnalyseMois;

  // Investissement initial envisagé : cash au mois 0 (même traitement que machine.prix pour PackshotCreator)
  const investissementInitialMois0 = results.investissementInitialMontant;
  // Coût cash mensuel récurrent actuel (prestataires + équipement)
  const coutMensuelActuelRecurrent = results.coutCashActuel / 12;

  if (results.isLeasing) {
    const loyerMensuel = results.tcoAnnuel / 12;

    for (let mois = 0; mois <= dureeMois; mois++) {
      const coutActuelCumule = investissementInitialMois0 + (coutMensuelActuelRecurrent * mois);
      const coutOrbituCumule = loyerMensuel * mois; // Pas de saut au mois 0

      data.push({
        mois,
        actuel: Math.round(coutActuelCumule),
        orbitvu: Math.round(coutOrbituCumule),
        economie: Math.round(coutActuelCumule - coutOrbituCumule),
      });
    }
  } else {
    // Achat : prix initial + coûts opérationnels mensuels (maintenance + consommables)
    const coutOperationnelMensuel =
      (results.machine.maintenanceAnnuelle + results.machine.consommablesAnnuels) / 12;

    for (let mois = 0; mois <= dureeMois; mois++) {
      const coutActuelCumule = investissementInitialMois0 + (coutMensuelActuelRecurrent * mois);
      const coutOrbituCumule = results.prixTotalPackshotCreator + (coutOperationnelMensuel * mois);

      data.push({
        mois,
        actuel: Math.round(coutActuelCumule),
        orbitvu: Math.round(coutOrbituCumule),
        economie: Math.round(coutActuelCumule - coutOrbituCumule),
      });
    }
  }

  return data;
}
