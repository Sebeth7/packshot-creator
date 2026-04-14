'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { Button } from '@/components/ui/button';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { trackFormSubmit } from '@/lib/analytics';

// ── Config ────────────────────────────────────────────────────

const REQUEST_TYPES = {
  fr: [
    { value: 'demo', label: 'Demande de démonstration' },
    { value: 'quote', label: 'Demande de devis' },
    { value: 'support', label: 'Support technique' },
    { value: 'training', label: 'Formation / Academy' },
    { value: 'other', label: 'Autre' },
  ],
  en: [
    { value: 'demo', label: 'Demo request' },
    { value: 'quote', label: 'Quote request' },
    { value: 'support', label: 'Technical support' },
    { value: 'training', label: 'Training / Academy' },
    { value: 'other', label: 'Other' },
  ],
};

const SECTORS = {
  fr: [
    'Agroalimentaire, arts de la table',
    'Chaussures',
    'Défense, industrie, aéronautique',
    'High-tech, électroménager, informatique',
    'Horlogerie, bijouterie, joaillerie',
    'Meubles',
    'Mode, accessoires',
    'Objets d\'art, antiquités',
    'Optique, lunetterie',
    'Pièces techniques',
    'Skincare, cosmétiques',
    'Sports',
    'Vins, spiritueux',
    'Autre',
  ],
  en: [
    'Food & tableware',
    'Defense, industry, aerospace',
    'Footwear',
    'High-tech, electronics',
    'Watches, jewelry',
    'Furniture',
    'Fashion, accessories',
    'Art, antiques',
    'Eyewear, optics',
    'Technical parts',
    'Skincare, cosmetics',
    'Sports',
    'Wine & spirits',
    'Other',
  ],
};

// ── Validation ────────────────────────────────────────────────

function createContactSchema(locale: 'fr' | 'en') {
  const msg = locale === 'fr'
    ? { required: 'Ce champ est requis', email: 'Email invalide', min2: 'Minimum 2 caractères', rgpd: 'Vous devez accepter la politique de confidentialité' }
    : { required: 'This field is required', email: 'Invalid email', min2: 'Minimum 2 characters', rgpd: 'You must accept the privacy policy' };

  return z.object({
    firstName: z.string().min(2, msg.min2),
    lastName: z.string().min(2, msg.min2),
    email: z.email(msg.email),
    phone: z.string().optional(),
    company: z.string().min(1, msg.required),
    sector: z.string().min(1, msg.required),
    requestType: z.enum(['demo', 'quote', 'support', 'training', 'other']),
    message: z.string().optional(),
    rgpdConsent: z.literal(true, { error: msg.rgpd }),
    newsletter: z.enum(['yes', 'no']),
  });
}

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

// ── Props ─────────────────────────────────────────────────────

interface ContactFormProps {
  locale?: 'fr' | 'en';
  className?: string;
  /** Mode compact pour intégration dans les pages produits */
  compact?: boolean;
  /** Pré-sélectionner le type de demande */
  defaultRequestType?: 'demo' | 'quote' | 'support' | 'training' | 'other';
  /** Pré-sélectionner le secteur */
  defaultSector?: string;
  /** Contexte machine (affiché dans la note Pipedrive) */
  machineContext?: string;
}

// ── Component ─────────────────────────────────────────────────

export function ContactForm({
  locale = 'fr',
  className = '',
  compact = false,
  defaultRequestType = 'demo',
  defaultSector,
  machineContext,
}: ContactFormProps) {
  const pathname = usePathname();
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const schema = createContactSchema(locale);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      requestType: defaultRequestType,
      sector: defaultSector || '',
      rgpdConsent: false as unknown as true,
      newsletter: 'no' as const,
    },
  });

  const t = locale === 'fr'
    ? {
        firstName: 'Prénom',
        lastName: 'Nom',
        email: 'Email professionnel',
        phone: 'Téléphone',
        company: 'Société',
        sector: 'Secteur d\'activité',
        sectorPlaceholder: 'Sélectionnez votre secteur',
        requestType: 'Objet de votre demande',
        message: 'Message',
        messagePlaceholder: 'Décrivez votre projet ou vos besoins...',
        submit: 'Envoyer ma demande',
        submitting: 'Envoi en cours...',
        successTitle: 'Demande envoyée !',
        successMessage: 'Notre équipe vous recontactera sous 24 heures ouvrées.',
        errorTitle: 'Une erreur est survenue',
        errorMessage: 'Veuillez réessayer ou nous contacter directement par email.',
        retry: 'Réessayer',
        rgpdLabel: 'J\'accepte la politique de confidentialité et le traitement de mes données personnelles.',
        newsletterLabel: 'Souhaitez-vous recevoir notre newsletter ?',
        newsletterYes: 'Oui',
        newsletterNo: 'Non',
        optional: 'facultatif',
      }
    : {
        firstName: 'First name',
        lastName: 'Last name',
        email: 'Professional email',
        phone: 'Phone',
        company: 'Company',
        sector: 'Industry',
        sectorPlaceholder: 'Select your industry',
        requestType: 'Request type',
        message: 'Message',
        messagePlaceholder: 'Describe your project or needs...',
        submit: 'Send my request',
        submitting: 'Sending...',
        successTitle: 'Request sent!',
        successMessage: 'Our team will get back to you within 24 business hours.',
        errorTitle: 'An error occurred',
        errorMessage: 'Please try again or contact us directly by email.',
        retry: 'Try again',
        rgpdLabel: 'I accept the privacy policy and the processing of my personal data.',
        newsletterLabel: 'Would you like to receive our newsletter?',
        newsletterYes: 'Yes',
        newsletterNo: 'No',
        optional: 'optional',
      };

  const onSubmit = async (values: ContactFormValues) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          locale,
          pageSource: pathname,
          machineContext,
        }),
      });
      if (!res.ok) throw new Error('API error');
      setStatus('success');
      trackFormSubmit('contact_form');
    } catch {
      setStatus('error');
    }
  };

  // ── Success state ─────────────────────────────────────────
  if (status === 'success') {
    return (
      <div className={`bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center ${className}`}>
        <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-emerald-800 mb-2">{t.successTitle}</h3>
        <p className="text-emerald-600">{t.successMessage}</p>
      </div>
    );
  }

  // ── Error state ───────────────────────────────────────────
  if (status === 'error') {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-2xl p-8 text-center ${className}`}>
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-heading font-bold text-red-800 mb-2">{t.errorTitle}</h3>
        <p className="text-red-600 mb-4">{t.errorMessage}</p>
        <Button type="button" onClick={() => setStatus('idle')} className="bg-red-600 hover:bg-red-700 text-white rounded-xl">
          {t.retry}
        </Button>
      </div>
    );
  }

  // ── Input style helpers ───────────────────────────────────
  const inputBase =
    'w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-future-dusk-900 placeholder:text-future-dusk-400 focus:outline-none focus:ring-2 focus:ring-very-peri-400 focus:border-very-peri-400 transition-colors';
  const labelBase = 'block text-sm font-medium text-future-dusk-700 mb-1.5';
  const errorBase = 'text-xs text-red-500 mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} noValidate>
      {/* Request type — radio pills */}
      <fieldset className="mb-6">
        <legend className={labelBase}>{t.requestType}</legend>
        <div className={`grid gap-2 ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {REQUEST_TYPES[locale].map((type) => (
            <label
              key={type.value}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-colors text-sm border
                ${compact ? 'px-2 py-2 text-xs' : ''}
              `}
            >
              <input
                type="radio"
                value={type.value}
                {...register('requestType')}
                className="accent-very-peri-600"
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* Name row */}
      <div className={`grid gap-4 mb-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="cf-firstName" className={labelBase}>{t.firstName} *</label>
          <input id="cf-firstName" type="text" className={`${inputBase} ${errors.firstName ? 'border-red-400 focus:ring-red-400' : ''}`} {...register('firstName')} />
          {errors.firstName && <p className={errorBase}>{errors.firstName.message}</p>}
        </div>
        <div>
          <label htmlFor="cf-lastName" className={labelBase}>{t.lastName} *</label>
          <input id="cf-lastName" type="text" className={`${inputBase} ${errors.lastName ? 'border-red-400 focus:ring-red-400' : ''}`} {...register('lastName')} />
          {errors.lastName && <p className={errorBase}>{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="cf-email" className={labelBase}>{t.email} *</label>
        <input id="cf-email" type="email" className={`${inputBase} ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`} {...register('email')} />
        {errors.email && <p className={errorBase}>{errors.email.message}</p>}
      </div>

      {/* Phone + Company row */}
      <div className={`grid gap-4 mb-4 ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
        <div>
          <label htmlFor="cf-phone" className={labelBase}>{t.phone} <span className="text-future-dusk-400 font-normal">({t.optional})</span></label>
          <input id="cf-phone" type="tel" className={inputBase} {...register('phone')} />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelBase}>{t.company} *</label>
          <input id="cf-company" type="text" className={`${inputBase} ${errors.company ? 'border-red-400 focus:ring-red-400' : ''}`} {...register('company')} />
          {errors.company && <p className={errorBase}>{errors.company.message}</p>}
        </div>
      </div>

      {/* Sector */}
      <div className="mb-4">
        <label htmlFor="cf-sector" className={labelBase}>{t.sector} *</label>
        <select
          id="cf-sector"
          className={`${inputBase} ${errors.sector ? 'border-red-400 focus:ring-red-400' : ''}`}
          {...register('sector')}
        >
          <option value="">{t.sectorPlaceholder}</option>
          {SECTORS[locale].map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        {errors.sector && <p className={errorBase}>{errors.sector.message}</p>}
      </div>

      {/* Message — hidden in compact */}
      {!compact && (
        <div className="mb-6">
          <label htmlFor="cf-message" className={labelBase}>{t.message} <span className="text-future-dusk-400 font-normal">({t.optional})</span></label>
          <textarea
            id="cf-message"
            rows={4}
            className={`${inputBase} resize-none`}
            placeholder={t.messagePlaceholder}
            {...register('message')}
          />
        </div>
      )}

      {/* Newsletter opt-in */}
      <fieldset className="mb-4">
        <legend className={labelBase}>{t.newsletterLabel}</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="radio" value="yes" {...register('newsletter')} className="accent-very-peri-600" />
            {t.newsletterYes}
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="radio" value="no" {...register('newsletter')} className="accent-very-peri-600" />
            {t.newsletterNo}
          </label>
        </div>
      </fieldset>

      {/* RGPD consent checkbox */}
      <div className="mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register('rgpdConsent')}
            className="accent-very-peri-600 mt-1 h-4 w-4 shrink-0"
          />
          <span className="text-xs text-future-dusk-500 leading-relaxed">{t.rgpdLabel} *</span>
        </label>
        {errors.rgpdConsent && <p className={errorBase}>{errors.rgpdConsent.message}</p>}
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-very-peri-600 hover:bg-very-peri-700 text-white rounded-xl h-12 text-base font-semibold shadow-lg shadow-very-peri-600/20 transition-all"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            {t.submitting}
          </>
        ) : (
          <>
            <Send className="h-5 w-5" />
            {t.submit}
          </>
        )}
      </Button>

    </form>
  );
}
