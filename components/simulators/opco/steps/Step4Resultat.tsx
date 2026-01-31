'use client';

import type { ResultatEligibilite, Coordonnees } from '../lib/types';
import { formatMontant } from '../lib/eligibility';
import { FORMATIONS_DISPONIBLES } from '../lib/constants';

interface Step4ResultatProps {
  resultat: ResultatEligibilite;
  formationId?: string;
  locale: 'fr' | 'en';
  coordonnees: Partial<Coordonnees>;
  onCoordonneesChange: (data: Partial<Coordonnees>) => void;
  onSubmit?: () => void;
}

export function Step4Resultat({
  resultat,
  formationId,
  locale,
  coordonnees,
  onCoordonneesChange,
  onSubmit,
}: Step4ResultatProps) {
  const formation = FORMATIONS_DISPONIBLES.find(f => f.id === formationId);

  return (
    <div className="space-y-8">
      {/* Résultat principal */}
      <div className={`
        p-6 rounded-2xl border-2
        ${resultat.eligible
          ? 'bg-green-50 border-green-200'
          : 'bg-amber-50 border-amber-200'
        }
      `}>
        <div className="flex items-start gap-4">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
            ${resultat.eligible ? 'bg-green-100' : 'bg-amber-100'}
          `}>
            {resultat.eligible ? (
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            ) : (
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
          </div>
          <div className="flex-1">
            <h2 className={`text-xl font-bold mb-2 ${resultat.eligible ? 'text-green-800' : 'text-amber-800'}`}>
              {resultat.eligible
                ? (locale === 'fr' ? 'Vous êtes éligible au financement OPCO !' : 'You are eligible for OPCO funding!')
                : (locale === 'fr' ? 'Financement OPCO non disponible' : 'OPCO funding not available')}
            </h2>
            <p className={`${resultat.eligible ? 'text-green-700' : 'text-amber-700'}`}>
              {resultat.messagePersonnalise}
            </p>
          </div>
        </div>
      </div>

      {/* Détails du financement (si éligible) */}
      {resultat.eligible && resultat.opco && formation && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            {locale === 'fr' ? 'Estimation du financement' : 'Funding estimate'}
          </h3>

          <div className="space-y-4">
            {/* OPCO identifié */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                {locale === 'fr' ? 'Votre OPCO' : 'Your OPCO'}
              </span>
              <span className="font-semibold text-gray-900">{resultat.opco.nom}</span>
            </div>

            {/* Formation */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                {locale === 'fr' ? 'Formation' : 'Training'}
              </span>
              <span className="font-semibold text-gray-900">
                {locale === 'fr' ? formation.nom.fr : formation.nom.en}
              </span>
            </div>

            {/* Coût formation */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                {locale === 'fr' ? 'Coût de la formation' : 'Training cost'}
              </span>
              <span className="font-semibold text-gray-900">
                {formatMontant(formation.prixHT)} HT
              </span>
            </div>

            {/* Prise en charge OPCO */}
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">
                {locale === 'fr' ? 'Prise en charge OPCO' : 'OPCO coverage'}
              </span>
              <span className="font-bold text-green-600">
                {formatMontant(resultat.montantPriseEnCharge || 0)} ({resultat.tauxFinancement}%)
              </span>
            </div>

            {/* Reste à charge */}
            <div className="flex items-center justify-between py-3 bg-gray-50 rounded-lg px-4 -mx-2">
              <span className="font-semibold text-gray-900">
                {locale === 'fr' ? 'Reste à charge' : 'Remaining cost'}
              </span>
              <span className={`text-xl font-bold ${
                (resultat.montantRestant || 0) === 0 ? 'text-green-600' : 'text-secondary-orbitvu'
              }`}>
                {formatMontant(resultat.montantRestant || 0)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Redirection (si non éligible) */}
      {!resultat.eligible && resultat.redirection && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-bold text-blue-900 mb-2">
            {locale === 'fr' ? 'Alternative de financement' : 'Funding alternative'}
          </h3>
          <p className="text-blue-700 mb-4">{resultat.redirection.description}</p>
          <a
            href={resultat.redirection.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {locale === 'fr' ? 'Visiter' : 'Visit'} {resultat.redirection.organisme}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}

      {/* Prochaines étapes (si éligible) */}
      {resultat.eligible && resultat.prochainesEtapes && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">
            {locale === 'fr' ? 'Prochaines étapes' : 'Next steps'}
          </h3>
          <div className="space-y-4">
            {resultat.prochainesEtapes.map((etape, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary-orbitvu text-white flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                  {etape.numero}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{etape.titre}</h4>
                  <p className="text-sm text-gray-600 mt-1">{etape.description}</p>
                  {etape.delai && (
                    <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {etape.delai}
                    </p>
                  )}
                  {etape.documents && (
                    <ul className="mt-2 space-y-1">
                      {etape.documents.map((doc, i) => (
                        <li key={i} className="text-xs text-gray-500 flex items-center gap-1">
                          <svg className="w-3 h-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Formulaire de contact */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">
          {locale === 'fr' ? 'Recevoir mon estimation détaillée' : 'Receive my detailed estimate'}
        </h3>
        <p className="text-gray-600 mb-6">
          {locale === 'fr'
            ? 'Laissez vos coordonnées et un conseiller vous contactera pour finaliser votre dossier.'
            : 'Leave your contact details and an advisor will contact you to finalize your file.'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locale === 'fr' ? 'Prénom *' : 'First name *'}
            </label>
            <input
              type="text"
              value={coordonnees.prenom || ''}
              onChange={(e) => onCoordonneesChange({ ...coordonnees, prenom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orbitvu/20 focus:border-secondary-orbitvu outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locale === 'fr' ? 'Nom *' : 'Last name *'}
            </label>
            <input
              type="text"
              value={coordonnees.nom || ''}
              onChange={(e) => onCoordonneesChange({ ...coordonnees, nom: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orbitvu/20 focus:border-secondary-orbitvu outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locale === 'fr' ? 'Email professionnel *' : 'Professional email *'}
            </label>
            <input
              type="email"
              value={coordonnees.email || ''}
              onChange={(e) => onCoordonneesChange({ ...coordonnees, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orbitvu/20 focus:border-secondary-orbitvu outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locale === 'fr' ? 'Téléphone' : 'Phone'}
            </label>
            <input
              type="tel"
              value={coordonnees.telephone || ''}
              onChange={(e) => onCoordonneesChange({ ...coordonnees, telephone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orbitvu/20 focus:border-secondary-orbitvu outline-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locale === 'fr' ? 'Entreprise' : 'Company'}
            </label>
            <input
              type="text"
              value={coordonnees.entreprise || ''}
              onChange={(e) => onCoordonneesChange({ ...coordonnees, entreprise: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-orbitvu/20 focus:border-secondary-orbitvu outline-none"
            />
          </div>
        </div>

        {onSubmit && (
          <button
            onClick={onSubmit}
            disabled={!coordonnees.prenom || !coordonnees.nom || !coordonnees.email}
            className="mt-6 w-full py-3 px-6 bg-secondary-orbitvu text-white font-semibold rounded-lg hover:bg-secondary-orbitvu/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {locale === 'fr' ? 'Recevoir mon estimation' : 'Receive my estimate'}
          </button>
        )}

        <p className="text-xs text-gray-500 mt-4 text-center">
          {locale === 'fr'
            ? 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité.'
            : 'By submitting this form, you accept our privacy policy.'}
        </p>
      </div>

      {/* Lien OPCO */}
      {resultat.eligible && resultat.opco && (
        <div className="text-center">
          <a
            href={resultat.opco.siteWeb}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-secondary-orbitvu hover:underline"
          >
            {locale === 'fr' ? 'Visiter le site de' : 'Visit'} {resultat.opco.nom}
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
