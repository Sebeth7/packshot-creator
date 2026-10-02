import { z } from 'zod/v4';

/**
 * Langues acceptées par `/api/contact`.
 *
 * `ContactForm` type sa prop `locale` sur cette même liste : une langue envoyée
 * par le formulaire et refusée par l'API devient une erreur de compilation.
 * Avant le 02/10/2026, l'API n'acceptait que `fr` et `en` alors que le
 * formulaire envoyait `de-ch` : toute demande des pages de-ch recevait un 400.
 */
export const CONTACT_LOCALES = ['fr', 'en', 'de-ch'] as const;
export type ContactLocale = (typeof CONTACT_LOCALES)[number];

export const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  company: z.string().min(1),
  sector: z.string().min(1),
  requestType: z.enum(['demo', 'quote', 'support', 'training', 'other']),
  message: z.string().optional(),
  rgpdConsent: z.literal(true),
  newsletter: z.enum(['yes', 'no']),
  locale: z.enum(CONTACT_LOCALES).default('fr'),
  pageSource: z.string().optional(), // page d'origine (ex: "/fr/studio-photo/alphashot-pro-g2")
  machineContext: z.string().optional(), // machine pré-sélectionnée si applicable
  // Attribution first-touch de session (mesure GEO : trafic IA / SEO / campagnes)
  attribution: z.object({
    utmSource: z.string().max(200).optional(),
    utmMedium: z.string().max(200).optional(),
    utmCampaign: z.string().max(200).optional(),
    utmTerm: z.string().max(200).optional(),
    utmContent: z.string().max(200).optional(),
    referrer: z.string().max(500).optional(),
    landingPage: z.string().max(500).optional(),
  }).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
