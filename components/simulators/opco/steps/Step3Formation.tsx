'use client';

import type { FormationSelectionnee } from '../lib/types';
import { FORMATIONS_DISPONIBLES } from '../lib/constants';
import { formatMontant } from '../lib/eligibility';

interface Step3FormationProps {
  data: Partial<FormationSelectionnee>;
  onChange: (data: Partial<FormationSelectionnee>) => void;
  locale: 'fr' | 'en';
}

export function Step3Formation({ data, onChange, locale }: Step3FormationProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'fr' ? 'Votre formation' : 'Your training'}
        </h2>
        <p className="text-gray-600">
          {locale === 'fr'
            ? 'Sélectionnez la formation qui vous intéresse.'
            : 'Select the training that interests you.'}
        </p>
      </div>

      {/* Liste des formations */}
      <div className="space-y-3">
        {FORMATIONS_DISPONIBLES.map((formation) => {
          const isSelected = data.formationId === formation.id;

          return (
            <button
              key={formation.id}
              onClick={() => onChange({ ...data, formationId: formation.id })}
              className={`
                w-full p-4 rounded-xl border-2 text-left transition-all
                ${isSelected
                  ? 'border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20'
                  : 'border-gray-200 hover:border-brand-red/50 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`
                      w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors flex-shrink-0
                      ${isSelected ? 'border-brand-red bg-brand-red' : 'border-gray-300'}
                    `}>
                      {isSelected && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <h3 className={`font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-800'}`}>
                      {locale === 'fr' ? formation.nom.fr : formation.nom.en}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 ml-8 mb-2">
                    {locale === 'fr' ? formation.description.fr : formation.description.en}
                  </p>
                  <div className="flex flex-wrap gap-3 ml-8 text-sm">
                    <span className="inline-flex items-center gap-1 text-gray-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {formation.duree}h
                    </span>
                    <span className={`
                      inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
                      ${formation.niveau === 'initiation' ? 'bg-green-100 text-green-800' : ''}
                      ${formation.niveau === 'perfectionnement' ? 'bg-blue-100 text-blue-800' : ''}
                      ${formation.niveau === 'expert' ? 'bg-purple-100 text-purple-800' : ''}
                    `}>
                      {formation.niveau === 'initiation' && (locale === 'fr' ? 'Initiation' : 'Beginner')}
                      {formation.niveau === 'perfectionnement' && (locale === 'fr' ? 'Perfectionnement' : 'Advanced')}
                      {formation.niveau === 'expert' && 'Expert'}
                    </span>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-lg font-bold text-brand-red">
                    {formatMontant(formation.prixHT)}
                  </span>
                  <span className="text-sm text-gray-500 block">HT</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Lien professionnel */}
      {data.formationId && (
        <div className="pt-6 border-t border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {locale === 'fr'
              ? 'Cette formation est-elle en lien avec votre activité professionnelle ?'
              : 'Is this training related to your professional activity?'}
          </label>
          <div className="flex gap-3">
            {[
              { value: true, labelFr: 'Oui, directement lié', labelEn: 'Yes, directly related' },
              { value: false, labelFr: 'Non, intérêt personnel', labelEn: 'No, personal interest' },
            ].map((option) => {
              const isSelected = data.lienProfessionnel === option.value;

              return (
                <button
                  key={String(option.value)}
                  onClick={() => onChange({ ...data, lienProfessionnel: option.value })}
                  className={`
                    flex-1 px-4 py-3 rounded-lg border-2 transition-all
                    ${isSelected
                      ? 'border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20'
                      : 'border-gray-200 hover:border-brand-red/50 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {locale === 'fr' ? option.labelFr : option.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
          {data.lienProfessionnel === false && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-sm text-amber-700">
                {locale === 'fr'
                  ? 'Le financement OPCO nécessite un lien direct avec l\'activité professionnelle. Vous pouvez utiliser votre CPF personnel.'
                  : 'OPCO funding requires a direct link to professional activity. You can use your personal CPF.'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Modalité (optionnel) */}
      {data.formationId && data.lienProfessionnel && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            {locale === 'fr' ? 'Modalité de formation' : 'Training mode'}
          </label>
          <div className="flex flex-wrap gap-3">
            {[
              { value: 'temps-travail' as const, labelFr: 'Sur temps de travail', labelEn: 'During work hours' },
              { value: 'hors-temps-travail' as const, labelFr: 'Hors temps de travail', labelEn: 'Outside work hours' },
              { value: 'mixte' as const, labelFr: 'Mixte', labelEn: 'Mixed' },
            ].map((option) => {
              const isSelected = data.modalite === option.value;

              return (
                <button
                  key={option.value}
                  onClick={() => onChange({ ...data, modalite: option.value })}
                  className={`
                    px-4 py-2 rounded-lg border-2 transition-all
                    ${isSelected
                      ? 'border-brand-red bg-brand-red/5 ring-2 ring-brand-red/20'
                      : 'border-gray-200 hover:border-brand-red/50 hover:bg-gray-50'
                    }
                  `}
                >
                  <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                    {locale === 'fr' ? option.labelFr : option.labelEn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Badge Qualiopi */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
          <div>
            <p className="font-semibold text-green-800">
              {locale === 'fr' ? 'Formation certifiée Qualiopi' : 'Qualiopi certified training'}
            </p>
            <p className="text-sm text-green-700 mt-1">
              {locale === 'fr'
                ? 'PackshotCreator Academy est certifié Qualiopi, garantissant l\'éligibilité au financement OPCO.'
                : 'PackshotCreator Academy is Qualiopi certified, guaranteeing eligibility for OPCO funding.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
