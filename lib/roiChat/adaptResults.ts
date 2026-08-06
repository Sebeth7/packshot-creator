/**
 * Adapte les résultats du moteur généralisé (RoiEngineResults) vers le type
 * CalculationResults du wizard, pour réutiliser les composants de résultats
 * existants (HeroMetrics, EvolutionChart, BreakEvenTimeline) dans le fil du
 * chat (CDC §3). Les modes vs-existant et contrefactuel s'adaptent ; le mode
 * différentiel a son propre affichage (DifferentielCard) → retourne null.
 */

import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import type { CalculationResults, Machine } from '@/components/calculators/ROICalculator/lib/types';
import type { RoiEngineResults } from '@/lib/roiEngine';

export function adaptEngineResults(r: RoiEngineResults): CalculationResults | null {
  if (r.mode === 'differentiel' || r.coutRevient) return null;

  const catalogue = r.machine.machineId
    ? MACHINES.find((m) => m.id === r.machine.machineId)
    : undefined;

  // Machine synthétique si prix fourni sans rattachement catalogue
  const machine: Machine =
    catalogue ??
    ({
      id: r.machine.machineId ?? 'machine-fournie',
      nom: r.machine.machineNom ?? 'Machine',
      prix: r.machine.prixMachine ?? 0,
      capaciteJour: r.machine.capaciteJour ?? 0,
      tailleMax: '',
      poidsMax: '',
      tailleCategories: ['moyen'],
      useCases: [],
      // Le graphique achat lit maintenance+consommables : on y met le coût
      // opérationnel annuel complet du moteur
      maintenanceAnnuelle: r.isLeasing ? 0 : r.machine.coutOperationnelAnnuel,
      consommablesAnnuels: 0,
      dimensionsMax: { l: 0, w: 0, h: 0 },
      poidsMaxKg: 0,
      features: [],
      automationLevel: 'full-auto',
      idealSectors: [],
      volumeRange: { min: 0, max: 0 },
      keyAdvantages: [],
      limitations: [],
      spaceRequired: '',
    } as Machine);

  const prixMachine = r.machine.prixMachine ?? 0;
  const cashFlowAnnuel = r.cashSupprimeAnnuel - r.machine.coutOperationnelAnnuel;
  const economieAn1 = r.isLeasing
    ? r.economieAnnuelle + r.cashSupprimePonctuel
    : cashFlowAnnuel - prixMachine + r.cashSupprimePonctuel;
  const capaciteMachine = r.capaciteAnnuelleMachine ?? 0;

  return {
    // Situation de référence
    coutEmployeurAnnuel: r.valeurTempsLibere,
    coutEquipementAnnuel: 0,
    coutExterneAnnuel: r.cashSupprimeAnnuel,
    coutCashActuel: r.cashSupprimeAnnuel,
    investissementInitialMontant: r.cashSupprimePonctuel,
    coutTotalActuel: r.cashSupprimeAnnuel + r.valeurTempsLibere,
    tempsParPhotoHeures: 0,
    joursProductionActuels: r.tempsInterneActuelJours,
    capaciteAnnuelleActuelle: 0,

    // Avec machine
    machine,
    montantAccessoires: 0,
    prixTotalPackshotCreator: prixMachine,
    tcoAnnuel: r.machine.tcoAnnuel,
    coutOperateurMachine: r.coutTempsMachineIndicatif ?? 0,
    coutTotalMachine: r.machine.tcoAnnuel + (r.coutTempsMachineIndicatif ?? 0),
    tempsParPhotoMachine: 0,
    joursProductionMachine: r.tempsMachineJours ?? 0,
    capaciteAnnuelleMachine: capaciteMachine,

    // Comparaison
    economieAnnuelle: r.economieAnnuelle,
    tempsLibereJours: r.tempsLibereJours,
    valeurTempsLibere: r.valeurTempsLibere,
    gainTotalAnnuel: r.gainTotalAnnuel,
    avantageFiscalAnnuel: r.avantageFiscalAnnuel,
    breakEvenMois: r.breakEvenMois,
    dureeAnalyseMois: r.dureeAnalyseMois,
    roiAn1: 0,
    economieAn1,
    roi5ans: r.roiPourcent ?? 0,
    economie5ans: r.economieCumulee,
    joursEconomises: r.tempsLibereJours,
    gainTempsPourcent: 0,
    capaciteResiduelle: Math.max(0, capaciteMachine - r.volumeAnnuel),
    potentielCroissance:
      r.volumeAnnuel > 0 ? (Math.max(0, capaciteMachine - r.volumeAnnuel) / r.volumeAnnuel) * 100 : 0,

    // Flags
    isRentable: r.isRentable,
    capaciteInsuffisante: r.capaciteInsuffisante,
    inputsSurcapacite: r.inputsSurcapacite,
    isLeasing: r.isLeasing,
  };
}
