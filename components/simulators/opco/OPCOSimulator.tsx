'use client';

import { useState, useCallback } from 'react';
import type {
  OPCOSimulatorProps,
  SimulateurState,
  ProfilUtilisateur,
  FormationSelectionnee,
  Coordonnees,
  ResultatEligibilite,
} from './lib/types';
import { calculerEligibilite } from './lib/eligibility';
import { Step1Profil } from './steps/Step1Profil';
import { Step2Entreprise } from './steps/Step2Entreprise';
import { Step3Formation } from './steps/Step3Formation';
import { Step4Resultat } from './steps/Step4Resultat';

const TOTAL_STEPS = 4;

/**
 * Simulateur d'éligibilité OPCO pour les formations PackshotCreator
 *
 * @example
 * <OPCOSimulator
 *   locale="fr"
 *   onComplete={(resultat, coordonnees) => console.log('Completed:', resultat)}
 * />
 */
export function OPCOSimulator({
  locale = 'fr',
  className = '',
  onComplete,
}: OPCOSimulatorProps) {
  const [state, setState] = useState<SimulateurState>({
    step: 1,
    profil: {},
    formation: {},
    coordonnees: {},
    resultat: null,
  });

  // Navigation entre les étapes
  const goToStep = useCallback((step: number) => {
    setState(prev => ({ ...prev, step: Math.min(Math.max(1, step), TOTAL_STEPS) }));
  }, []);

  const nextStep = useCallback(() => {
    if (state.step < TOTAL_STEPS) {
      // Si on passe à l'étape 4, calculer le résultat
      if (state.step === 3) {
        const resultat = calculerEligibilite(
          state.profil as ProfilUtilisateur,
          state.formation as FormationSelectionnee,
          locale
        );
        setState(prev => ({
          ...prev,
          step: 4,
          resultat,
        }));
      } else {
        goToStep(state.step + 1);
      }
    }
  }, [state.step, state.profil, state.formation, goToStep, locale]);

  const prevStep = useCallback(() => {
    if (state.step > 1) {
      goToStep(state.step - 1);
    }
  }, [state.step, goToStep]);

  // Mise à jour des données
  const updateProfil = useCallback((data: Partial<ProfilUtilisateur>) => {
    setState(prev => ({ ...prev, profil: data }));
  }, []);

  const updateFormation = useCallback((data: Partial<FormationSelectionnee>) => {
    setState(prev => ({ ...prev, formation: data }));
  }, []);

  const updateCoordonnees = useCallback((data: Partial<Coordonnees>) => {
    setState(prev => ({ ...prev, coordonnees: data }));
  }, []);

  // Soumission finale
  const handleSubmit = useCallback(() => {
    if (state.resultat && state.coordonnees.prenom && state.coordonnees.nom && state.coordonnees.email) {
      onComplete?.(state.resultat, state.coordonnees as Coordonnees);
    }
  }, [state.resultat, state.coordonnees, onComplete]);

  // Validation des étapes
  const isStep1Valid = !!state.profil.statut;
  const isStep2Valid = !!state.profil.trancheEffectif && !!state.profil.secteurActivite;
  const isStep3Valid = !!state.formation.formationId && state.formation.lienProfessionnel !== undefined;

  const canProceed = () => {
    switch (state.step) {
      case 1: return isStep1Valid;
      case 2: return isStep2Valid;
      case 3: return isStep3Valid;
      default: return false;
    }
  };

  return (
    <div className={`opco-simulator bg-white rounded-2xl shadow-lg overflow-hidden ${className}`}>
      {/* Progress bar */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            {locale === 'fr' ? `Étape ${state.step} sur ${TOTAL_STEPS}` : `Step ${state.step} of ${TOTAL_STEPS}`}
          </span>
          <span className="text-sm text-gray-500">
            {state.step === 1 && (locale === 'fr' ? 'Votre profil' : 'Your profile')}
            {state.step === 2 && (locale === 'fr' ? 'Votre entreprise' : 'Your company')}
            {state.step === 3 && (locale === 'fr' ? 'Votre formation' : 'Your training')}
            {state.step === 4 && (locale === 'fr' ? 'Résultat' : 'Result')}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-secondary-orbitvu transition-all duration-300"
            style={{ width: `${(state.step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="p-6 md:p-8">
        {state.step === 1 && (
          <Step1Profil
            data={state.profil}
            onChange={updateProfil}
            locale={locale}
          />
        )}

        {state.step === 2 && (
          <Step2Entreprise
            data={state.profil}
            onChange={updateProfil}
            locale={locale}
          />
        )}

        {state.step === 3 && (
          <Step3Formation
            data={state.formation}
            onChange={updateFormation}
            locale={locale}
          />
        )}

        {state.step === 4 && state.resultat && (
          <Step4Resultat
            resultat={state.resultat}
            formationId={state.formation.formationId}
            locale={locale}
            coordonnees={state.coordonnees}
            onCoordonneesChange={updateCoordonnees}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* Navigation buttons */}
      {state.step < 4 && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-between">
          <button
            onClick={prevStep}
            disabled={state.step === 1}
            className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locale === 'fr' ? 'Précédent' : 'Previous'}
          </button>
          <button
            onClick={nextStep}
            disabled={!canProceed()}
            className="px-6 py-2.5 text-white bg-secondary-orbitvu rounded-lg hover:bg-secondary-orbitvu/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state.step === 3
              ? (locale === 'fr' ? 'Voir mon résultat' : 'See my result')
              : (locale === 'fr' ? 'Suivant' : 'Next')}
          </button>
        </div>
      )}

      {/* Restart button on step 4 */}
      {state.step === 4 && (
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 text-center">
          <button
            onClick={() => setState({
              step: 1,
              profil: {},
              formation: {},
              coordonnees: {},
              resultat: null,
            })}
            className="text-secondary-orbitvu hover:underline text-sm"
          >
            {locale === 'fr' ? 'Recommencer la simulation' : 'Restart simulation'}
          </button>
        </div>
      )}
    </div>
  );
}
