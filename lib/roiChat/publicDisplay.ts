/**
 * Affichage public des résultats filtrés (UX_PROPOSITION_ROI_PUBLIC.md §5).
 *
 * Le serveur envoie à l'UI les MÊMES résultats filtrés que ceux vus par le
 * LLM (PublicRoiResults — aucun prix catalogue dans les payloads réseau).
 * Pour réutiliser les composants du wizard (HeroMetrics, EvolutionChart,
 * BreakEvenTimeline), les champs coût masqués sont réhydratés ICI, côté
 * client, depuis le catalogue machines déjà présent dans le bundle — statu
 * quo wizard exact (CDC §2 : ROI % + cumul affichés, prix jamais affiché
 * directement, déduction arithmétique acceptée).
 */

import { MACHINES } from '@/components/calculators/ROICalculator/lib/machines';
import { CONSTANTES } from '@/components/calculators/ROICalculator/lib/constants';
import type { PublicRoiResults, RoiEngineResults, ResolvedMachineCost } from '@/lib/roiEngine';

/** Reconstruit un ResolvedMachineCost affichable depuis la vue publique. */
function rehydrateMachine(pub: PublicRoiResults['machine']): ResolvedMachineCost {
  const catalogue = pub.machineId ? MACHINES.find((m) => m.id === pub.machineId) : undefined;

  // Champs coût masqués uniquement pour l'achat catalogue (leasing et prix
  // fournis sont déjà visibles) → recalcul identique au moteur serveur
  const prixMachine =
    pub.prixMachine ?? (pub.mode === 'achat' && catalogue?.prix ? catalogue.prix : null);
  const operationnel =
    pub.mode === 'achat'
      ? (catalogue?.maintenanceAnnuelle ?? 0) + (catalogue?.consommablesAnnuels ?? 0)
      : pub.tcoAnnuel ?? 0;
  const tcoAnnuel =
    pub.tcoAnnuel ??
    (prixMachine !== null ? prixMachine / CONSTANTES.dureeAmortissement + operationnel : 0);

  return {
    machineId: pub.machineId,
    machineNom: pub.machineNom,
    mode: pub.mode,
    prixSource: pub.prixSource,
    coutTotalInvestissement: pub.coutTotalInvestissement ?? prixMachine ?? 0,
    prixMachine,
    tcoAnnuel,
    coutOperationnelAnnuel: operationnel,
    capaciteJour: pub.capaciteJour,
    nbMois: pub.nbMois,
  };
}

/**
 * PublicRoiResults → RoiEngineResults pour l'adaptateur wizard
 * (adaptResults.ts). Le différentiel garde ses deltas masqués (null) :
 * l'affichage public les présente comme « sur devis ».
 */
export function rehydratePublicResults(pub: PublicRoiResults): RoiEngineResults {
  const b = pub.baselineMachineResolved;
  return {
    ...pub,
    machine: rehydrateMachine(pub.machine),
    baselineMachineResolved: b
      ? {
          machineId: b.machineId,
          machineNom: b.machineNom,
          mode: b.mode,
          prixSource: b.prixSource,
          coutTotalInvestissement: 0,
          prixMachine: null,
          tcoAnnuel: 0,
          coutOperationnelAnnuel: 0,
          capaciteJour: b.capaciteJour,
          nbMois: b.nbMois,
        }
      : null,
    differentiel: pub.differentiel
      ? {
          ...pub.differentiel,
          deltaInvestissement: pub.differentiel.deltaInvestissement ?? 0,
          deltaInvestissementNetIS: pub.differentiel.deltaInvestissementNetIS ?? 0,
        }
      : null,
  };
}

export interface Hypothese {
  label: string;
  value: string;
}

/** Hypothèses affichées sous les résultats (UX §5), toujours modifiables. */
export function buildHypotheses(pub: PublicRoiResults): Hypothese[] {
  const list: Hypothese[] = [];
  if (pub.baselineLabel) {
    list.push({ label: 'Scénario de référence', value: pub.baselineLabel });
  }
  list.push(
    { label: 'Base de temps', value: `${CONSTANTES.joursProduction} jours ouvrés/an` },
    {
      label: 'Coût employeur',
      value: `${CONSTANTES.salaireMensuelCoutEmployeur.toLocaleString('fr-FR')} €/mois chargé (défaut)`,
    },
    { label: "Durée d'analyse", value: `${pub.dureeAnalyseMois} mois` }
  );
  if (pub.isLeasing && pub.machine.tcoAnnuel !== null) {
    list.push({
      label: 'Leasing',
      value: `${Math.round(pub.machine.tcoAnnuel / 12).toLocaleString('fr-FR')} €/mois sur ${pub.machine.nbMois} mois`,
    });
  }
  return list;
}
