'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Loader2, X } from 'lucide-react';
import { getAttribution } from '@/lib/attribution';
import type { Machine } from '../lib/types';

interface MachineRecommendationProps {
  machine: Machine;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    recommended: 'Modèle recommandé',
    price: 'Prix',
    capacity: 'Capacité',
    maxSize: 'Taille max',
    maxWeight: 'Poids max',
    useCases: "Cas d'usage :",
    bookDemo: 'Être recontacté',

    imagePlaceholder: 'Image bientôt disponible',
    photosPerDay: 'produits/jour',
    contactTitle: 'Être recontacté par notre équipe',
    emailLabel: 'Email',
    phoneLabel: 'Téléphone',
    companyLabel: 'Société',
    emailPlaceholder: 'votre@email.com',
    phonePlaceholder: '06 12 34 56 78',
    companyPlaceholder: 'Nom de votre société',
    send: 'Envoyer',
    sending: 'Envoi...',
    success: 'Merci ! Notre équipe vous recontactera rapidement.',
    errorRequired: 'Merci de renseigner au moins un email ou un téléphone',
    errorSending: "Erreur lors de l'envoi",
  },
  en: {
    recommended: 'Recommended model',
    price: 'Price',
    capacity: 'Capacity',
    maxSize: 'Max size',
    maxWeight: 'Max weight',
    useCases: 'Use cases:',
    bookDemo: 'Get in touch',

    imagePlaceholder: 'Image coming soon',
    photosPerDay: 'products/day',
    contactTitle: 'Get in touch with our team',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    companyLabel: 'Company',
    emailPlaceholder: 'your@email.com',
    phonePlaceholder: '+33 6 12 34 56 78',
    companyPlaceholder: 'Your company name',
    send: 'Send',
    sending: 'Sending...',
    success: 'Thank you! Our team will get back to you shortly.',
    errorRequired: 'Please provide at least an email or phone number',
    errorSending: 'Error sending',
  },
};

export default function MachineRecommendation({ machine, locale }: MachineRecommendationProps) {
  const t = LABELS[locale];
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactCompany, setContactCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleContactSubmit = async () => {
    if (!contactEmail && !contactPhone) {
      setError(t.errorRequired);
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/roi-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: contactEmail || undefined,
          phone: contactPhone || undefined,
          company: contactCompany || undefined,
          calculatorData: {
            machineNom: machine.nom,
            machineId: machine.id,
            // Minimal data for contact request
            nbOperateurs: 0,
            pourcentageTemps: 0,
            photosAnnuelles: 0,
            tailleProduitsCategory: '',
            typesContenu: [],
            leasingActif: false,
            investissementInitialActif: false,
            economieAnnuelle: 0,
            roi5ans: 0,
            breakEvenMois: null,
            economie5ans: 0,
            isRentable: true,
            isLeasing: false,
            coutTotalActuel: 0,
            coutTotalMachine: 0,
          },
          locale,
          contactRequest: true,
          attribution: getAttribution() ?? undefined,
        }),
      });

      if (!response.ok) throw new Error('Failed');
      setIsSubmitted(true);
    } catch {
      setError(t.errorSending);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-neutral-200">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image placeholder */}
        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
          {machine.imageUrl ? (
            <Image
              src={machine.imageUrl}
              alt={machine.nom}
              width={192}
              height={192}
              className="object-cover"
            />
          ) : (
            <div className="text-future-dusk-500 text-sm text-center p-4">
              {t.imagePlaceholder}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-very-peri-500 text-white">
              {t.recommended}
            </span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-future-dusk-900">
              {machine.nom}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-future-dusk-500">{t.capacity}</span>
              <p className="font-bold text-future-dusk-900">{machine.capaciteJour} {t.photosPerDay}</p>
            </div>
            <div>
              <span className="text-future-dusk-500">{t.maxSize}</span>
              <p className="font-bold text-future-dusk-900">{machine.tailleMax}</p>
            </div>
            <div>
              <span className="text-future-dusk-500">{t.maxWeight}</span>
              <p className="font-bold text-future-dusk-900">{machine.poidsMax}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-future-dusk-500 font-medium mb-2">
              {t.useCases}
            </p>
            <div className="flex flex-wrap gap-2">
              {machine.useCases.map(useCase => (
                <span
                  key={useCase}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-neutral-100 text-future-dusk-900"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          {/* Bouton interactif - exclu du PDF */}
          <div data-pdf-exclude>
            {!showContactForm && !isSubmitted && (
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  className="bg-very-peri-500 hover:bg-very-peri-600"
                  onClick={() => setShowContactForm(true)}
                >
                  {t.bookDemo}
                </Button>
              </div>
            )}

            {/* Formulaire de contact inline */}
            {showContactForm && !isSubmitted && (
              <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-heading font-bold text-future-dusk-900 text-sm">
                    {t.contactTitle}
                  </h4>
                  <button
                    type="button"
                    onClick={() => setShowContactForm(false)}
                    className="text-future-dusk-400 hover:text-future-dusk-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                  <div>
                    <Label htmlFor="contact-email" className="text-xs text-future-dusk-500">{t.emailLabel}</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      placeholder={t.emailPlaceholder}
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-phone" className="text-xs text-future-dusk-500">{t.phoneLabel}</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      placeholder={t.phonePlaceholder}
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-company" className="text-xs text-future-dusk-500">{t.companyLabel}</Label>
                    <Input
                      id="contact-company"
                      type="text"
                      placeholder={t.companyPlaceholder}
                      value={contactCompany}
                      onChange={(e) => setContactCompany(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                {error && <p className="text-sm text-red-500 mb-2">{error}</p>}
                <Button
                  type="button"
                  disabled={isSubmitting}
                  onClick={handleContactSubmit}
                  className="bg-very-peri-500 hover:bg-very-peri-600 gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      {t.sending}
                    </>
                  ) : (
                    t.send
                  )}
                </Button>
              </div>
            )}

            {/* Confirmation */}
            {isSubmitted && (
              <div className="bg-emerald-50 rounded-lg p-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-emerald-600" />
                </div>
                <p className="text-emerald-600 font-medium text-sm">{t.success}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
