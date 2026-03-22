'use client';

import Script from 'next/script';
import { useState, useEffect } from 'react';

const REQUEST_TYPES = {
  fr: [
    { value: 'demo', label: 'Demande de démonstration' },
    { value: 'quote', label: 'Demande de devis' },
    { value: 'support', label: 'Support technique' },
    { value: 'training', label: 'Formation / Academy' },
  ],
  en: [
    { value: 'demo', label: 'Demo request' },
    { value: 'quote', label: 'Quote request' },
    { value: 'support', label: 'Technical support' },
    { value: 'training', label: 'Training / Academy' },
  ],
};

interface PipedriveContactFormProps {
  locale?: 'fr' | 'en';
  className?: string;
}

/**
 * Composant d'embed du formulaire de contact Pipedrive WebForms
 *
 * URL Pipedrive identifiée depuis Webflow:
 * https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh
 *
 * Note: Les formulaires Pipedrive WebForms sont responsive et
 * ajustent automatiquement leur hauteur.
 */
export function PipedriveContactForm({
  locale = 'fr',
  className = '',
}: PipedriveContactFormProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [requestType, setRequestType] = useState('');

  // URL du formulaire Pipedrive (depuis l'inventaire Webflow)
  const PIPEDRIVE_FORM_URL =
    'https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh';

  // Détecter quand le formulaire est chargé
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Gérer les erreurs de chargement
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-8 text-center ${className}`}>
        <svg
          className="w-12 h-12 text-red-400 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          {locale === 'fr' ? 'Erreur de chargement' : 'Loading error'}
        </h3>
        <p className="text-red-600 mb-4">
          {locale === 'fr'
            ? 'Le formulaire n\'a pas pu être chargé.'
            : 'The form could not be loaded.'}
        </p>
        <a
          href="mailto:contact@packshotcreator.com"
          className="inline-flex items-center gap-2 text-red-700 hover:text-red-800 font-medium"
        >
          {locale === 'fr' ? 'Contactez-nous par email' : 'Contact us by email'}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Loading state */}
      {isLoading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-4 border-brand-red border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-gray-600">
              {locale === 'fr' ? 'Chargement du formulaire...' : 'Loading form...'}
            </p>
          </div>
        </div>
      )}

      {/* Qualifying question — radio buttons */}
      <fieldset className="mb-6 p-5 bg-very-peri-50/50 rounded-2xl border border-very-peri-100">
        <legend className="text-sm font-heading font-bold text-future-dusk-900 mb-3">
          {locale === 'fr' ? 'Quel est l\'objet de votre demande ?' : 'What is your request about?'}
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {REQUEST_TYPES[locale].map((type) => (
            <label
              key={type.value}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors text-sm ${
                requestType === type.value
                  ? 'bg-very-peri-100 text-very-peri-800 font-medium border border-very-peri-300'
                  : 'bg-white text-future-dusk-600 border border-neutral-100 hover:border-very-peri-200'
              }`}
            >
              <input
                type="radio"
                name="requestType"
                value={type.value}
                checked={requestType === type.value}
                onChange={(e) => setRequestType(e.target.value)}
                className="accent-very-peri-600"
              />
              {type.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* Conteneur du formulaire Pipedrive */}
      <div
        className="pipedriveWebForms min-h-[700px] bg-white rounded-lg overflow-hidden"
        data-pd-webforms={PIPEDRIVE_FORM_URL}
      />

      {/* Script Pipedrive WebForms */}
      <Script
        src="https://webforms.pipedrive.com/f/loader"
        strategy="lazyOnload"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
      />

      {/* Message RGPD */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        {locale === 'fr'
          ? 'En soumettant ce formulaire, vous acceptez notre politique de confidentialité.'
          : 'By submitting this form, you accept our privacy policy.'}
      </p>
    </div>
  );
}
