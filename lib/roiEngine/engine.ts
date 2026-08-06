/**
 * Moteur ROI généralisé — calculs.
 *
 * Généralisation en primitives de calculations.ts (wizard), SANS toucher au
 * wizard qui reste en prod. Les règles du modèle économique validé par Seb
 * (commit 4477c2a) sont conservées :
 *  - économie directe (cash) = décaissements supprimés − coût machine (loyers/TCO),
 *    avant impôt, avantage fiscal informatif jamais additionné ;
 *  - temps interne libéré = jours/an + valorisation coût employeur, métrique
 *    séparée, jamais agrégée au cash.
 */

import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { CONSTANTES } from '@/components/calculators/ROICalculator/lib/constants';
import { leasingMonthly, LEASING_MONTHS } from '@/lib/leasing';
import type {
  RoiDossier,
  RoiEngineResults,
  ResolvedMachineCost,
  MachineCostInput,
  DifferentielResults,
  CoutRevientResults,
  TimeLine,
} from './types';

const TAUX_IS = 0.25;
const HEURES_PAR_JOUR = CONSTANTES.heuresSemaine / 5; // 7 h

/** Taux journalier employeur à partir du coût mensuel (défaut : constante wizard). */
function tauxJournalier(coutMensuel?: number): number {
  const mensuel = coutMensuel ?? CONSTANTES.salaireMensuelCoutEmployeur;
  return (mensuel * 12) / CONSTANTES.joursProduction;
}

/** Taux horaire employeur (≈ 30 €/h pour 4 000 €/mois). */
function tauxHoraire(coutMensuel?: number): number {
  return tauxJournalier(coutMensuel) / HEURES_PAR_JOUR;
}

/** Jours-homme annuels d'une ligne de temps. */
function joursLigne(ligne: TimeLine, volumeAnnuel: number): number {
  if (ligne.joursParAn !== undefined) return ligne.joursParAn;
  if (ligne.minutesParProduit !== undefined) {
    return (ligne.minutesParProduit * volumeAnnuel) / 60 / HEURES_PAR_JOUR;
  }
  return 0;
}

/**
 * Résout le coût machine. Pour source 'fourni', le prix catalogue n'est JAMAIS
 * lu — seules les specs (capacité, maintenance) peuvent être rattachées via
 * machineId (garde-fou architectural, CDC §3).
 */
export function resolveMachineCost(input: MachineCostInput): ResolvedMachineCost {
  const catalogueSpecs = input.machineId
    ? MACHINES.find((m) => m.id === input.machineId) ?? null
    : null;

  if (input.source === 'catalogue') {
    const machine = catalogueSpecs;
    if (!machine) {
      throw new Error(`Machine catalogue inconnue : ${input.machineId}`);
    }
    if (machine.prixSurDevis || !machine.prix) {
      throw new Error(
        `Machine ${machine.nom} sur devis : pas de prix catalogue exploitable. Utiliser un prix fourni.`
      );
    }
    if (input.mode === 'achat') {
      const prix = machine.prix + (input.montantAccessoires ?? 0);
      return {
        machineId: machine.id,
        machineNom: machine.nom,
        mode: 'achat',
        prixSource: 'catalogue',
        coutTotalInvestissement: prix,
        prixMachine: prix,
        tcoAnnuel:
          prix / CONSTANTES.dureeAmortissement +
          machine.maintenanceAnnuelle +
          machine.consommablesAnnuels,
        coutOperationnelAnnuel: machine.maintenanceAnnuelle + machine.consommablesAnnuels,
        capaciteJour: machine.capaciteJour,
        nbMois: CONSTANTES.dureeAmortissement * 12,
      };
    }
    // Leasing catalogue : mensualité fournie, sinon estimation par la règle
    // prix × 1,3 ÷ nombre de mensualités (Seb 07/08) — à présenter comme une
    // estimation à valider par le service commercial.
    const nbMois = input.nbMois ?? LEASING_MONTHS;
    const mensualite = input.mensualite ?? leasingMonthly(machine.prix, 'EUR', nbMois);
    if (!mensualite) {
      throw new Error(`Mensualité leasing introuvable pour ${machine.nom}.`);
    }
    return {
      machineId: machine.id,
      machineNom: machine.nom,
      mode: 'leasing',
      prixSource: 'catalogue',
      coutTotalInvestissement: mensualite * nbMois,
      prixMachine: null,
      tcoAnnuel: mensualite * 12,
      coutOperationnelAnnuel: mensualite * 12,
      capaciteJour: machine.capaciteJour,
      nbMois,
    };
  }

  // ===== Prix FOURNI par l'utilisateur (remise, occasion, devis) =====
  const capaciteJour = input.capaciteJour ?? catalogueSpecs?.capaciteJour ?? null;
  const nomBase = input.label ?? catalogueSpecs?.nom ?? 'Machine (prix fourni)';

  if (input.mode === 'achat') {
    const maintenance = input.maintenanceAnnuelle ?? catalogueSpecs?.maintenanceAnnuelle ?? 0;
    const consommables = input.consommablesAnnuels ?? catalogueSpecs?.consommablesAnnuels ?? 0;
    return {
      machineId: input.machineId ?? null,
      machineNom: nomBase,
      mode: 'achat',
      prixSource: 'fourni',
      coutTotalInvestissement: input.prix,
      prixMachine: input.prix,
      tcoAnnuel: input.prix / CONSTANTES.dureeAmortissement + maintenance + consommables,
      coutOperationnelAnnuel: maintenance + consommables,
      capaciteJour,
      nbMois: CONSTANTES.dureeAmortissement * 12,
    };
  }
  return {
    machineId: input.machineId ?? null,
    machineNom: nomBase,
    mode: 'leasing',
    prixSource: 'fourni',
    coutTotalInvestissement: input.mensualite * input.nbMois,
    prixMachine: null,
    tcoAnnuel: input.mensualite * 12,
    coutOperationnelAnnuel: input.mensualite * 12,
    capaciteJour,
    nbMois: input.nbMois,
  };
}

/** Calcul du bloc différentiel (machine vs machine, gains par fonction). */
function computeDifferentiel(
  dossier: RoiDossier,
  machine: ResolvedMachineCost,
  baseline: ResolvedMachineCost
): DifferentielResults {
  const gains = dossier.functionGains ?? [];
  const parFonction = gains.map((g) => {
    const minutes = g.minutesParProduit ?? 0;
    const euro =
      g.euroParProduit ?? (minutes * tauxHoraire(g.coutMensuelEmployeur)) / 60;
    return {
      fonction: g.fonction,
      label: g.label,
      minutesParProduit: minutes,
      euroParProduit: euro,
      gainAnnuel: euro * dossier.volumeAnnuel,
      source: g.source,
    };
  });

  const gainParProduit = parFonction.reduce((s, f) => s + f.euroParProduit, 0);
  const minutesParProduit = parFonction.reduce((s, f) => s + f.minutesParProduit, 0);
  const deltaInvestissement =
    machine.coutTotalInvestissement - baseline.coutTotalInvestissement;

  return {
    deltaInvestissement,
    deltaInvestissementNetIS: deltaInvestissement * (1 - TAUX_IS),
    gainParProduit,
    minutesParProduit,
    breakEvenProduits: gainParProduit > 0 ? deltaInvestissement / gainParProduit : null,
    breakEvenAnnees:
      gainParProduit > 0 && dossier.volumeAnnuel > 0
        ? deltaInvestissement / gainParProduit / dossier.volumeAnnuel
        : null,
    gainAnnuel: gainParProduit * dossier.volumeAnnuel,
    parFonction,
    gainType: 'temps-valorise',
  };
}

/** Lecture coût de revient — repli du contrefactuel sans baseline crédible. */
function computeCoutRevient(
  dossier: RoiDossier,
  machine: ResolvedMachineCost
): CoutRevientResults {
  const volume = Math.max(dossier.volumeAnnuel, 1);
  const coutParProduit = machine.tcoAnnuel / volume;
  const prixRef = dossier.prixReferenceParProduit ?? null;
  return {
    coutParProduit,
    capaciteAnnuelleMachine: machine.capaciteJour
      ? machine.capaciteJour * CONSTANTES.joursProduction
      : null,
    // Volume annuel où le TCO machine passe sous le coût à l'unité de référence
    seuilRentabiliteProduitsAn:
      prixRef && prixRef > 0 ? machine.tcoAnnuel / prixRef : null,
    prixReferenceParProduit: prixRef,
  };
}

/**
 * Point d'entrée du moteur : calcule tous les indicateurs à partir du dossier
 * de modélisation. Le dossier doit avoir été validé par le schéma zod
 * (schema.ts) — le moteur suppose des données cohérentes.
 */
export function computeRoi(dossier: RoiDossier): RoiEngineResults {
  const machine = resolveMachineCost(dossier.machine);
  const baseline = dossier.baselineMachine
    ? resolveMachineCost(dossier.baselineMachine)
    : null;
  const isLeasing = machine.mode === 'leasing';
  const volumeAnnuel = Math.max(dossier.volumeAnnuel, 1);
  const dureeAnalyseMois = dossier.dureeAnalyseMois ?? machine.nbMois;

  // ===== Cash : décaissements supprimés =====
  const cashSupprimeAnnuel = dossier.cashLines
    .filter((l) => l.frequence === 'recurrent')
    .reduce((s, l) => s + (l.montantAnnuel ?? 0) * (l.pourcentageSupprimable / 100), 0);
  const cashSupprimePonctuel = dossier.cashLines
    .filter((l) => l.frequence === 'ponctuel')
    .reduce((s, l) => s + (l.montant ?? 0) * (l.pourcentageSupprimable / 100), 0);

  const economieAnnuelle = cashSupprimeAnnuel - machine.tcoAnnuel;

  // Cash-flow annuel : seuls les décaissements comptent (l'amortissement est
  // une écriture comptable) — cohérent avec le wizard
  const cashFlowAnnuel = cashSupprimeAnnuel - machine.coutOperationnelAnnuel;

  // ===== Break-even (trésorerie pure) =====
  let breakEvenMois: number | null = null;
  if (isLeasing) {
    if (economieAnnuelle > 0 || cashSupprimePonctuel > 0) breakEvenMois = 1;
  } else {
    const netInvestissement = (machine.prixMachine ?? 0) - cashSupprimePonctuel;
    if (netInvestissement <= 0) {
      breakEvenMois = 1;
    } else if (cashFlowAnnuel > 0) {
      breakEvenMois = netInvestissement / (cashFlowAnnuel / 12);
    }
  }

  // ===== Économie cumulée + ROI sur la durée d'analyse =====
  const economieCumulee = isLeasing
    ? economieAnnuelle * (dureeAnalyseMois / 12) + cashSupprimePonctuel
    : cashFlowAnnuel * (dureeAnalyseMois / 12) -
      (machine.prixMachine ?? 0) +
      cashSupprimePonctuel;
  const roiPourcent =
    machine.coutTotalInvestissement > 0
      ? (economieCumulee / machine.coutTotalInvestissement) * 100
      : null;

  // ===== Temps interne =====
  const lignesAvecJours = dossier.timeLines.map((l) => ({
    ligne: l,
    jours: joursLigne(l, volumeAnnuel),
  }));
  const tempsInterneActuelJours = lignesAvecJours.reduce((s, l) => s + l.jours, 0);
  const joursLiberables = lignesAvecJours.reduce(
    (s, l) => s + l.jours * (l.ligne.pourcentageLiberable / 100),
    0
  );
  const valeurLiberable = lignesAvecJours.reduce(
    (s, l) =>
      s +
      l.jours *
        (l.ligne.pourcentageLiberable / 100) *
        tauxJournalier(l.ligne.coutMensuelEmployeur),
    0
  );

  // Temps d'opération de la machine (déduit du temps libéré)
  const tempsMachineJours = machine.capaciteJour
    ? volumeAnnuel / machine.capaciteJour
    : null;
  // Valorisé au taux moyen des lignes (ou au taux par défaut si aucune ligne —
  // cas 100 % sous-traité : temps interne NOUVEAU, exposé à part, jamais en cash)
  const tauxMoyen =
    tempsInterneActuelJours > 0
      ? lignesAvecJours.reduce(
          (s, l) => s + l.jours * tauxJournalier(l.ligne.coutMensuelEmployeur),
          0
        ) / tempsInterneActuelJours
      : tauxJournalier();
  const coutTempsMachineIndicatif =
    tempsMachineJours !== null ? tempsMachineJours * tauxMoyen : null;

  const tempsLibereJours = Math.max(0, joursLiberables - (tempsMachineJours ?? 0));
  const valeurTempsLibere = Math.max(
    0,
    valeurLiberable - (tempsMachineJours ?? 0) * tauxMoyen
  );

  // ===== Capacité et cohérence =====
  const capaciteAnnuelleMachine = machine.capaciteJour
    ? machine.capaciteJour * CONSTANTES.joursProduction
    : null;
  const capaciteInsuffisante =
    capaciteAnnuelleMachine !== null && volumeAnnuel > capaciteAnnuelleMachine;

  // Capacité interne déclarée : cadence/j/opérateur × jours × équivalents temps plein
  const equivalentsTempsPlein = tempsInterneActuelJours / CONSTANTES.joursProduction;
  const capaciteAnnuelleActuelle = dossier.capaciteJournaliereActuelle
    ? dossier.capaciteJournaliereActuelle *
      CONSTANTES.joursProduction *
      Math.max(equivalentsTempsPlein, dossier.timeLines.length > 0 ? 0 : 1)
    : null;
  const inputsSurcapacite =
    capaciteAnnuelleActuelle !== null && capaciteAnnuelleActuelle >= volumeAnnuel * 2;

  // ===== Modes spécifiques =====
  const differentiel =
    dossier.mode === 'differentiel' && baseline
      ? computeDifferentiel(dossier, machine, baseline)
      : null;
  const coutRevient =
    dossier.mode === 'contrefactuel' && dossier.cashLines.length === 0
      ? computeCoutRevient(dossier, machine)
      : null;

  // ===== Fiscal (informatif, jamais additionné) =====
  const avantageFiscalAnnuel = isLeasing
    ? machine.tcoAnnuel * TAUX_IS
    : ((machine.prixMachine ?? 0) / CONSTANTES.dureeAmortissement) * TAUX_IS;

  const gainDifferentielAnnuel = differentiel?.gainAnnuel ?? 0;
  const gainTotalAnnuel = economieAnnuelle + valeurTempsLibere + gainDifferentielAnnuel;

  return {
    mode: dossier.mode,
    baselineLabel: dossier.baselineLabel ?? null,
    volumeAnnuel,
    machine,
    baselineMachineResolved: baseline,
    cashSupprimeAnnuel,
    cashSupprimePonctuel,
    economieAnnuelle,
    economieCumulee,
    roiPourcent,
    breakEvenMois,
    tempsInterneActuelJours,
    tempsMachineJours,
    tempsLibereJours,
    valeurTempsLibere,
    coutTempsMachineIndicatif,
    capaciteAnnuelleMachine,
    capaciteInsuffisante,
    inputsSurcapacite,
    differentiel,
    coutRevient,
    avantageFiscalAnnuel,
    dureeAnalyseMois,
    isLeasing,
    gainTotalAnnuel,
    isRentable: gainTotalAnnuel > 0,
  };
}
