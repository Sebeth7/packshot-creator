'use client';

import type { ProfilUtilisateur, TrancheEffectif, SecteurActivite } from '../lib/types';
import { EFFECTIF_LABELS, SECTEUR_LABELS } from '../lib/constants';

interface Step2EntrepriseProps {
  data: Partial<ProfilUtilisateur>;
  onChange: (data: Partial<ProfilUtilisateur>) => void;
  locale: 'fr' | 'en';
}

const TRANCHES_EFFECTIF: TrancheEffectif[] = [
  'moins-11',
  '11-49',
  '50-249',
  '250-plus',
];

const SECTEURS: SecteurActivite[] = [
  'e-commerce',
  'commerce-proximite',
  'commerce-distribution',
  'industrie',
  'services-entreprises',
  'banque-assurance',
  'transport-logistique',
  'btp',
  'sante',
  'culture-media',
  'agriculture',
  'social-sport',
  'autre',
];

export function Step2Entreprise({ data, onChange, locale }: Step2EntrepriseProps) {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {locale === 'fr' ? 'Votre entreprise' : 'Your company'}
        </h2>
        <p className="text-gray-600">
          {locale === 'fr'
            ? 'Ces informations permettent d\'identifier votre OPCO et estimer le financement.'
            : 'This information helps identify your OPCO and estimate funding.'}
        </p>
      </div>

      {/* Effectif */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {locale === 'fr' ? 'Effectif de l\'entreprise' : 'Company size'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TRANCHES_EFFECTIF.map((tranche) => {
            const isSelected = data.trancheEffectif === tranche;
            const label = EFFECTIF_LABELS[tranche];

            return (
              <button
                key={tranche}
                onClick={() => onChange({ ...data, trancheEffectif: tranche })}
                className={`
                  p-3 rounded-lg border-2 text-center transition-all text-sm
                  ${isSelected
                    ? 'border-secondary-orbitvu bg-secondary-orbitvu/5 ring-2 ring-secondary-orbitvu/20'
                    : 'border-gray-200 hover:border-secondary-orbitvu/50 hover:bg-gray-50'
                  }
                `}
              >
                <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {locale === 'fr' ? label.fr : label.en}
                </span>
              </button>
            );
          })}
        </div>
        {data.trancheEffectif === 'moins-11' && (
          <p className="mt-2 text-sm text-green-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {locale === 'fr'
              ? 'Les TPE bénéficient des plafonds les plus favorables !'
              : 'Small businesses benefit from the most favorable ceilings!'}
          </p>
        )}
      </div>

      {/* Secteur d'activité */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {locale === 'fr' ? 'Secteur d\'activité' : 'Industry sector'}
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {SECTEURS.map((secteur) => {
            const isSelected = data.secteurActivite === secteur;
            const label = SECTEUR_LABELS[secteur];

            return (
              <button
                key={secteur}
                onClick={() => onChange({ ...data, secteurActivite: secteur })}
                className={`
                  p-3 rounded-lg border-2 text-left transition-all text-sm
                  ${isSelected
                    ? 'border-secondary-orbitvu bg-secondary-orbitvu/5 ring-2 ring-secondary-orbitvu/20'
                    : 'border-gray-200 hover:border-secondary-orbitvu/50 hover:bg-gray-50'
                  }
                `}
              >
                <span className={`font-medium ${isSelected ? 'text-gray-900' : 'text-gray-700'}`}>
                  {locale === 'fr' ? label.fr : label.en}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Cotisations à jour */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {locale === 'fr'
            ? 'Votre entreprise est-elle à jour de ses cotisations formation ?'
            : 'Is your company up to date with its training contributions?'}
        </label>
        <div className="flex flex-wrap gap-3">
          {[
            { value: true, labelFr: 'Oui', labelEn: 'Yes' },
            { value: false, labelFr: 'Non', labelEn: 'No' },
            { value: 'ne-sais-pas' as const, labelFr: 'Je ne sais pas', labelEn: "I don't know" },
          ].map((option) => {
            const isSelected = data.aJourCotisations === option.value;

            return (
              <button
                key={String(option.value)}
                onClick={() => onChange({ ...data, aJourCotisations: option.value })}
                className={`
                  px-4 py-2 rounded-lg border-2 transition-all
                  ${isSelected
                    ? 'border-secondary-orbitvu bg-secondary-orbitvu/5 ring-2 ring-secondary-orbitvu/20'
                    : 'border-gray-200 hover:border-secondary-orbitvu/50 hover:bg-gray-50'
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
        {data.aJourCotisations === false && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700">
              {locale === 'fr'
                ? 'L\'entreprise doit être à jour de ses cotisations URSSAF pour bénéficier du financement OPCO.'
                : 'The company must be up to date with its URSSAF contributions to benefit from OPCO funding.'}
            </p>
          </div>
        )}
        {data.aJourCotisations === 'ne-sais-pas' && (
          <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              {locale === 'fr'
                ? 'Nous vous recommandons de vérifier auprès de votre service RH ou comptabilité.'
                : 'We recommend checking with your HR or accounting department.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
