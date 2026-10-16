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

/**
 * Bornes serveur (P0 sécurité, G5 du 11/10/2026) : chaque champ libre est
 * borné, et les champs d'une ligne refusent les caractères de contrôle (retour
 * à la ligne compris). Les bornes sont larges : le formulaire n'en impose
 * aucune, et une demande légitime ne doit pas recevoir de 400.
 */
const SANS_CONTROLE = /^[^\u0000-\u001f\u007f]*$/;
const ligne = (max: number) => z.string().max(max).regex(SANS_CONTROLE);

export const contactSchema = z.object({
  firstName: ligne(100).min(2),
  lastName: ligne(100).min(2),
  email: z.email().max(254),
  phone: ligne(50).optional(),
  company: ligne(200).min(1),
  sector: ligne(100).min(1),
  requestType: z.enum(['demo', 'quote', 'support', 'training', 'other']),
  message: z.string().max(5000).optional(),
  rgpdConsent: z.literal(true),
  newsletter: z.enum(['yes', 'no']),
  locale: z.enum(CONTACT_LOCALES).default('fr'),
  pageSource: ligne(500).optional(), // page d'origine (ex: "/fr/studio-photo/alphashot-pro-g2")
  machineContext: ligne(200).optional(), // machine pré-sélectionnée si applicable
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
  // Champ piège : absent du formulaire visible ; rempli = automate.
  siteWeb: z.string().max(200).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
