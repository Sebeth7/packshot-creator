/**
 * Filtrage des résultats pour le contexte LLM PUBLIC — garde-fou ARCHITECTURAL
 * (CDC §3) : les prix catalogue ne passent JAMAIS dans le contexte du modèle
 * en mode public, ni directement ni par un champ qui permettrait de les
 * reconstituer exactement (tcoAnnuel achat = prix/5 + maintenance,
 * prixMachine, coutTotalInvestissement, deltaInvestissement catalogue).
 *
 * Restent exposés (statu quo wizard) : économie directe, temps libéré,
 * break-even, ROI %, capacité. Les montants fournis PAR l'utilisateur
 * (mensualité leasing, prix négocié) lui sont évidemment restitués.
 */

import type { RoiEngineResults, PublicRoiResults, ResolvedMachineCost } from './types';

function isUserSuppliedPricing(machine: ResolvedMachineCost): boolean {
  return machine.prixSource === 'fourni';
}

export function filterResultsForPublic(results: RoiEngineResults): PublicRoiResults {
  const m = results.machine;
  // En leasing, les loyers sont connus de l'utilisateur (mensualité saisie ou
  // règle publique affichée sur les fiches) → exposables. En achat catalogue,
  // tcoAnnuel contient prix/5 → jamais exposé.
  const pricingVisible = isUserSuppliedPricing(m) || m.mode === 'leasing';

  const differentiel = results.differentiel
    ? {
        ...results.differentiel,
        // Le delta d'investissement révèle les prix catalogue si l'une des deux
        // machines vient du catalogue → masqué sauf si les DEUX prix sont fournis
        deltaInvestissement:
          isUserSuppliedPricing(m) &&
          results.baselineMachineResolved !== null &&
          isUserSuppliedPricing(results.baselineMachineResolved)
            ? results.differentiel.deltaInvestissement
            : null,
        deltaInvestissementNetIS:
          isUserSuppliedPricing(m) &&
          results.baselineMachineResolved !== null &&
          isUserSuppliedPricing(results.baselineMachineResolved)
            ? results.differentiel.deltaInvestissementNetIS
            : null,
      }
    : null;

  const b = results.baselineMachineResolved;

  return {
    mode: results.mode,
    baselineLabel: results.baselineLabel,
    volumeAnnuel: results.volumeAnnuel,
    machine: {
      machineId: m.machineId,
      machineNom: m.machineNom,
      mode: m.mode,
      prixSource: m.prixSource,
      capaciteJour: m.capaciteJour,
      nbMois: m.nbMois,
      tcoAnnuel: pricingVisible ? m.tcoAnnuel : null,
      coutTotalInvestissement: pricingVisible ? m.coutTotalInvestissement : null,
      prixMachine: isUserSuppliedPricing(m) ? m.prixMachine : null,
    },
    // Identité/specs de la baseline (différentiel) — jamais de champ prix
    baselineMachineResolved: b
      ? {
          machineId: b.machineId,
          machineNom: b.machineNom,
          mode: b.mode,
          prixSource: b.prixSource,
          capaciteJour: b.capaciteJour,
          nbMois: b.nbMois,
        }
      : null,
    cashSupprimeAnnuel: results.cashSupprimeAnnuel,
    cashSupprimePonctuel: results.cashSupprimePonctuel,
    economieAnnuelle: results.economieAnnuelle,
    economieCumulee: results.economieCumulee,
    roiPourcent: results.roiPourcent,
    breakEvenMois: results.breakEvenMois,
    tempsInterneActuelJours: results.tempsInterneActuelJours,
    tempsMachineJours: results.tempsMachineJours,
    tempsLibereJours: results.tempsLibereJours,
    valeurTempsLibere: results.valeurTempsLibere,
    coutTempsMachineIndicatif: results.coutTempsMachineIndicatif,
    capaciteAnnuelleMachine: results.capaciteAnnuelleMachine,
    capaciteInsuffisante: results.capaciteInsuffisante,
    inputsSurcapacite: results.inputsSurcapacite,
    differentiel,
    coutRevient: results.coutRevient,
    avantageFiscalAnnuel: results.avantageFiscalAnnuel,
    dureeAnalyseMois: results.dureeAnalyseMois,
    isLeasing: results.isLeasing,
    gainTotalAnnuel: results.gainTotalAnnuel,
    isRentable: results.isRentable,
  };
}
