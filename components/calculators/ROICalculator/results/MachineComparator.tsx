'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import type { MachineEligibility, UserInputs, CalculationResults, Machine } from '../lib/types';
import { calculateROI } from '../lib/calculations';
import { getTopMachinesForComparison, userInputsToSelectionCriteria, AUTOMATION_LABELS } from '../lib/machineSelector';
import { MACHINES } from '../lib/machines';
import { CONSTANTES } from '../lib/constants';

interface MachineComparatorProps {
  inputs: UserInputs;
  currentResults: CalculationResults;
  locale: 'fr' | 'en';
  onSelectMachine?: (machineId: string) => void;
}

const LABELS = {
  fr: {
    title: 'Comparer les machines éligibles',
    subtitle: 'Voici les machines qui correspondent à vos critères',
    score: 'Score',
    recommended: 'Recommandée',
    capacity: 'Capacité',
    photosPerDay: 'photos/jour',
    maxSize: 'Taille max',
    maxWeight: 'Poids max',
    automation: 'Automatisation',
    space: 'Espace requis',
    advantages: 'Points forts',
    limitations: 'Limitations',
    annualSavings: 'Économie annuelle',
    breakEven: 'Retour sur inv.',
    roi5years: 'ROI 5 ans',
    months: 'mois',
    selectMachine: 'Sélectionner',
    showDetails: 'Voir détails',
    hideDetails: 'Masquer détails',
    matchingCriteria: 'Critères correspondants',
    missingCriteria: 'Points d\'attention',
    noEligibleMachines: 'Aucune machine ne correspond exactement à vos critères. Voici les meilleures alternatives.',
    vs: 'vs',
    currentSelected: 'Sélection actuelle',
  },
  en: {
    title: 'Compare eligible machines',
    subtitle: 'Here are the machines that match your criteria',
    score: 'Score',
    recommended: 'Recommended',
    capacity: 'Capacity',
    photosPerDay: 'photos/day',
    maxSize: 'Max size',
    maxWeight: 'Max weight',
    automation: 'Automation',
    space: 'Space required',
    advantages: 'Strengths',
    limitations: 'Limitations',
    annualSavings: 'Annual savings',
    breakEven: 'Break-even',
    roi5years: 'ROI 5 years',
    months: 'months',
    selectMachine: 'Select',
    showDetails: 'Show details',
    hideDetails: 'Hide details',
    matchingCriteria: 'Matching criteria',
    missingCriteria: 'Attention points',
    noEligibleMachines: 'No machine exactly matches your criteria. Here are the best alternatives.',
    vs: 'vs',
    currentSelected: 'Current selection',
  },
};

function formatEuro(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

interface MachineCardProps {
  eligibility: MachineEligibility;
  isRecommended: boolean;
  isSelected: boolean;
  roiResults: CalculationResults;
  locale: 'fr' | 'en';
  onSelect?: () => void;
}

function MachineCard({ eligibility, isRecommended, isSelected, roiResults, locale, onSelect }: MachineCardProps) {
  const [expanded, setExpanded] = useState(false);
  const t = LABELS[locale];
  const machine = eligibility.machine;

  const automationLabel = AUTOMATION_LABELS[machine.automationLevel][locale];

  return (
    <div
      className={`bg-white rounded-xl border-2 transition-all ${
        isRecommended
          ? 'border-primary-turquoise shadow-lg'
          : isSelected
          ? 'border-primary-gold shadow-md'
          : 'border-neutral-light hover:border-neutral-medium'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-neutral-lighter">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {isRecommended && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary-turquoise text-white">
                  <Star className="w-3 h-3" />
                  {t.recommended}
                </span>
              )}
              {isSelected && !isRecommended && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-gold text-white">
                  {t.currentSelected}
                </span>
              )}
            </div>
            <h4 className="font-heading font-bold text-lg text-neutral-dark">
              {machine.nom}
            </h4>
          </div>
          <div className="text-right">
            <div className="text-xs text-neutral-medium">{t.score}</div>
            <div className={`text-2xl font-bold ${
              eligibility.score >= 70 ? 'text-green-600' :
              eligibility.score >= 50 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {eligibility.score}
            </div>
          </div>
        </div>

        {/* Specs rapides */}
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-neutral-medium text-xs">{t.capacity}</span>
            <p className="font-semibold">{machine.capaciteJour} {t.photosPerDay}</p>
          </div>
          <div>
            <span className="text-neutral-medium text-xs">{t.automation}</span>
            <p className="font-semibold">{automationLabel}</p>
          </div>
        </div>
      </div>

      {/* ROI Metrics */}
      <div className="p-4 bg-neutral-lighter/50">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-xs text-neutral-medium">{t.annualSavings}</div>
            <div className={`font-bold ${roiResults.economieAnnuelle > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {formatEuro(roiResults.economieAnnuelle)}
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-medium">{t.breakEven}</div>
            <div className="font-bold text-neutral-dark">
              {roiResults.breakEvenMois
                ? `${Math.round(roiResults.breakEvenMois)} ${t.months}`
                : '—'
              }
            </div>
          </div>
          <div>
            <div className="text-xs text-neutral-medium">{t.roi5years}</div>
            <div className={`font-bold ${roiResults.roi5ans > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {roiResults.roi5ans > 0 ? '+' : ''}{Math.round(roiResults.roi5ans)}%
            </div>
          </div>
        </div>
      </div>

      {/* Détails expandables */}
      {expanded && (
        <div className="p-4 border-t border-neutral-lighter">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-neutral-medium text-xs">{t.maxSize}</span>
              <p className="font-medium">{machine.tailleMax}</p>
            </div>
            <div>
              <span className="text-neutral-medium text-xs">{t.maxWeight}</span>
              <p className="font-medium">{machine.poidsMax}</p>
            </div>
            <div className="col-span-2">
              <span className="text-neutral-medium text-xs">{t.space}</span>
              <p className="font-medium">{machine.spaceRequired}</p>
            </div>
          </div>

          {/* Critères matching */}
          {eligibility.matchingCriteria.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-neutral-medium mb-1">{t.matchingCriteria}</p>
              <div className="flex flex-wrap gap-1">
                {eligibility.matchingCriteria.map((criteria, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-100 text-green-700">
                    <CheckCircle className="w-3 h-3" />
                    {criteria}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Critères manquants */}
          {eligibility.missingCriteria.length > 0 && (
            <div className="mb-3">
              <p className="text-xs font-medium text-neutral-medium mb-1">{t.missingCriteria}</p>
              <div className="flex flex-wrap gap-1">
                {eligibility.missingCriteria.map((criteria, i) => (
                  <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-yellow-100 text-yellow-700">
                    <XCircle className="w-3 h-3" />
                    {criteria}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Avantages */}
          <div className="mb-3">
            <p className="text-xs font-medium text-neutral-medium mb-1">{t.advantages}</p>
            <ul className="space-y-1">
              {machine.keyAdvantages.slice(0, 3).map((adv, i) => (
                <li key={i} className="text-xs text-neutral-dark flex items-start gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500 mt-0.5 flex-shrink-0" />
                  {adv[locale]}
                </li>
              ))}
            </ul>
          </div>

          {/* Limitations */}
          {machine.limitations.length > 0 && (
            <div>
              <p className="text-xs font-medium text-neutral-medium mb-1">{t.limitations}</p>
              <ul className="space-y-1">
                {machine.limitations.map((lim, i) => (
                  <li key={i} className="text-xs text-neutral-dark flex items-start gap-1">
                    <XCircle className="w-3 h-3 text-yellow-500 mt-0.5 flex-shrink-0" />
                    {lim[locale]}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="p-4 border-t border-neutral-lighter flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-sm text-primary-turquoise hover:text-primary-dark flex items-center gap-1"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              {t.hideDetails}
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              {t.showDetails}
            </>
          )}
        </button>
        {onSelect && !isRecommended && (
          <Button
            size="sm"
            variant={isSelected ? 'outline' : 'default'}
            onClick={onSelect}
            className={isSelected ? '' : 'bg-primary-turquoise hover:bg-primary-dark'}
          >
            {t.selectMachine}
          </Button>
        )}
      </div>
    </div>
  );
}

export default function MachineComparator({
  inputs,
  currentResults,
  locale,
  onSelectMachine,
}: MachineComparatorProps) {
  const t = LABELS[locale];

  // Obtenir les machines éligibles
  const criteria = userInputsToSelectionCriteria(inputs);
  const eligibleMachines = getTopMachinesForComparison(criteria, 2);

  // Calculer le ROI pour chaque machine et filtrer les non-rentables
  const machinesWithROI = eligibleMachines
    .map(eligibility => {
      // Créer des inputs modifiés avec cette machine
      // (On recalcule le ROI en forçant cette machine)
      const machineInputs = { ...inputs };
      const roiResults = calculateROIForMachine(machineInputs, eligibility.machine.id);
      return {
        eligibility,
        roiResults,
      };
    })
    .filter(({ roiResults }) => roiResults.isRentable); // Ne garder que les machines rentables

  if (machinesWithROI.length === 0) {
    return null;
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h3 className="text-xl font-heading font-bold text-neutral-dark mb-2">
          {t.title}
        </h3>
        <p className="text-neutral-medium">
          {eligibleMachines.length > 0 ? t.subtitle : t.noEligibleMachines}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {machinesWithROI.map(({ eligibility, roiResults }, index) => (
          <MachineCard
            key={eligibility.machineId}
            eligibility={eligibility}
            isRecommended={index === 0}
            isSelected={currentResults.machine.id === eligibility.machineId}
            roiResults={roiResults}
            locale={locale}
            onSelect={onSelectMachine ? () => onSelectMachine(eligibility.machineId) : undefined}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Calcule le ROI pour une machine spécifique
 * (Utilise la fonction calculateROI existante mais force la machine)
 */
function calculateROIForMachine(inputs: UserInputs, machineId: string): CalculationResults {
  const machine = MACHINES.find((m: Machine) => m.id === machineId);
  if (!machine) {
    // Fallback sur le calcul normal
    return calculateROI(inputs);
  }

  // Recalculer avec cette machine spécifique
  const budgetEquipement = inputs.budgetEquipement ?? CONSTANTES.budgetEquipementDefaut;
  const photosAnnuelles = Math.max(inputs.photosAnnuelles, 1);

  // Situation actuelle
  const coutEmployeurAnnuel =
    inputs.nbOperateurs *
    CONSTANTES.salaireMensuelCoutEmployeur *
    12 *
    (inputs.pourcentageTemps / 100);
  const coutEquipementAnnuel = budgetEquipement;
  const coutExterneAnnuel = inputs.utiliseSolutionExterne && inputs.budgetMensuelExterne
    ? inputs.budgetMensuelExterne * 12
    : 0;
  const coutTotalActuel = coutEmployeurAnnuel + coutEquipementAnnuel + coutExterneAnnuel;
  const capaciteAnnuelleActuelle =
    inputs.capaciteJournaliere *
    CONSTANTES.joursProduction *
    inputs.nbOperateurs *
    (inputs.pourcentageTemps / 100);
  const coutParPhotoActuel = coutTotalActuel / photosAnnuelles;
  const heuresTravailAnnuel = CONSTANTES.heuresSemaine * CONSTANTES.nbSemainesTravail;
  const tempsParPhotoHeures =
    (heuresTravailAnnuel * inputs.nbOperateurs * (inputs.pourcentageTemps / 100)) /
    photosAnnuelles;
  const joursProductionActuels =
    photosAnnuelles /
    Math.max(inputs.capaciteJournaliere * inputs.nbOperateurs, 1);

  // Avec machine
  const tcoAnnuel =
    (machine.prix / CONSTANTES.dureeAmortissement) +
    machine.maintenanceAnnuelle +
    machine.consommablesAnnuels;
  const joursNecessairesMachine = photosAnnuelles / machine.capaciteJour;
  const pourcentageTempsMachine = Math.min(joursNecessairesMachine / CONSTANTES.joursProduction, 1);
  const coutOperateurMachine = CONSTANTES.salaireMensuelCoutEmployeur * 12 * pourcentageTempsMachine;
  const coutTotalMachine = coutOperateurMachine + tcoAnnuel;
  const capaciteAnnuelleMachine = machine.capaciteJour * CONSTANTES.joursProduction;
  const coutParPhotoMachine = coutTotalMachine / photosAnnuelles;
  const heuresAvecMachine = heuresTravailAnnuel * pourcentageTempsMachine;
  const tempsParPhotoMachine = heuresAvecMachine / photosAnnuelles;
  const joursProductionMachine = photosAnnuelles / machine.capaciteJour;

  // Comparaison
  const economieAnnuelle = coutTotalActuel - coutTotalMachine;
  const isRentable = economieAnnuelle > 0;
  let breakEvenMois: number | null = null;
  if (isRentable && economieAnnuelle > 0) {
    const economieMensuelle = economieAnnuelle / 12;
    breakEvenMois = machine.prix / economieMensuelle;
  }
  const roiAn1 = ((economieAnnuelle - machine.prix) / machine.prix) * 100;
  const economie5ans = (economieAnnuelle * 5) - machine.prix;
  const roi5ans = (economie5ans / machine.prix) * 100;
  const economieParPhoto = coutParPhotoActuel - coutParPhotoMachine;
  const economieParPhotoPourcent = (economieParPhoto / Math.max(coutParPhotoActuel, 0.01)) * 100;
  const joursEconomises = joursProductionActuels - joursProductionMachine;
  const gainTempsPourcent = (joursEconomises / Math.max(joursProductionActuels, 1)) * 100;
  const capaciteResiduelle = capaciteAnnuelleMachine - photosAnnuelles;
  const potentielCroissance = (capaciteResiduelle / photosAnnuelles) * 100;

  return {
    coutEmployeurAnnuel,
    coutEquipementAnnuel,
    coutExterneAnnuel,
    coutTotalActuel,
    coutParPhotoActuel,
    tempsParPhotoHeures,
    joursProductionActuels,
    capaciteAnnuelleActuelle,
    machine,
    tcoAnnuel,
    coutOperateurMachine,
    coutTotalMachine,
    coutParPhotoMachine,
    tempsParPhotoMachine,
    joursProductionMachine,
    capaciteAnnuelleMachine,
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
    isRentable,
  };
}
