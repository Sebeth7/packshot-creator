'use client';

import type { ProfilUtilisateur, StatutProfessionnel } from '../lib/types';
import { STATUT_LABELS } from '../lib/constants';

interface Step1ProfilProps {
  data: Partial<ProfilUtilisateur>;
  onChange: (data: Partial<ProfilUtilisateur>) => void;
  locale: 'fr' | 'en';
}

const STATUTS: StatutProfessionnel[] = [
  'salarie-cdi',
  'salarie-cdd',
  'interimaire',
  'dirigeant-salarie',
  'auto-entrepreneur',
  'auto-entrepreneur-avec-salaries',
  'demandeur-emploi',
  'autre',
];

export function Step1Profil({ data, onChange, locale }: Step1ProfilProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'fr' ? 'Votre profil' : 'Your profile'}
        </h2>
        <p className="text-gray-600">
          {locale === 'fr'
            ? 'Quelle est votre situation professionnelle actuelle ?'
            : 'What is your current professional situation?'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {STATUTS.map((statut) => {
          const isSelected = data.statut === statut;
          const label = STATUT_LABELS[statut];

          return (
            <button
              key={statut}
              onClick={() => onChange({ ...data, statut })}
              className={`
                p-4 rounded-xl border-2 text-left transition-all
                ${isSelected
                  ? 'border-secondary-orbitvu bg-secondary-orbitvu/5 ring-2 ring-secondary-orbitvu/20'
                  : 'border-gray-200 hover:border-secondary-orbitvu/50 hover:bg-gray-50'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? 'border-secondary-orbitvu bg-secondary-orbitvu' : 'border-gray-300'}
                `}>
                  {isSelected && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {locale === 'fr' ? label.fr : label.en}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Note informative */}
      {data.statut && !['salarie-cdi', 'salarie-cdd', 'interimaire', 'dirigeant-salarie'].includes(data.statut) && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex gap-3">
            <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <p className="text-sm text-amber-800 font-medium">
                {locale === 'fr' ? 'Information importante' : 'Important information'}
              </p>
              <p className="text-sm text-amber-700 mt-1">
                {locale === 'fr'
                  ? 'Ce statut peut ne pas être éligible au financement OPCO. Continuez pour voir les alternatives disponibles.'
                  : 'This status may not be eligible for OPCO funding. Continue to see available alternatives.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
