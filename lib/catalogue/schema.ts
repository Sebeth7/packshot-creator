import { z } from 'zod/v4';

/**
 * Demande du catalogue Orbitvu All-in-One — schéma partagé entre le formulaire
 * (`components/landings/catalogue-all-in-one/CatalogueForm.tsx`) et la route
 * `POST /api/catalogue`.
 *
 * Règles fixées par Laurent le 02/10/2026 (kit d'intégration, copydeck V2) :
 * - quatre champs obligatoires : prénom, e-mail, entreprise, pays ;
 * - pays France ou Suisse, sans présélection ;
 * - e-mail contrôlé sur sa seule syntaxe : les adresses personnelles (Gmail,
 *   Outlook, Bluewin…) sont acceptées ;
 * - « Vos produits » facultatif, texte libre court ;
 * - demande de consultant facultative, décochée par défaut ;
 * - aucun consentement marketing en V1 : le champ n'existe pas, et un champ
 *   inconnu envoyé par un client est ignoré.
 */

export const PAYS_CATALOGUE = ['FR', 'CH'] as const;
export type PaysCatalogue = (typeof PAYS_CATALOGUE)[number];

/** Identifiant de la landing, conservé avec chaque demande (attribution interne). */
export const PAGE_SOURCE_CATALOGUE = 'catalogue_all_in_one';

/** Brochure remise (règles brochure de Sébastien, § 4 et § 6 : `brochureId`) ; V1 : FR seule. */
export const BROCHURE_ID = 'orbitvu_all_in_one_2026_fr';
export const LANGUE_CATALOGUE = 'fr';

export const MESSAGES_VALIDATION = {
  firstName: 'Indiquez votre prénom.',
  email: 'Saisissez une adresse e-mail valide.',
  company: 'Indiquez votre entreprise.',
  country: 'Sélectionnez France ou Suisse.',
  firstNameMax: '60 caractères au maximum.',
  companyMax: '120 caractères au maximum.',
  productsMax: '120 caractères au maximum.',
} as const;

/** Les champs saisis par le visiteur. */
export const champsCatalogueSchema = z.object({
  firstName: z
    .string({ error: MESSAGES_VALIDATION.firstName })
    .trim()
    .min(1, MESSAGES_VALIDATION.firstName)
    .max(60, MESSAGES_VALIDATION.firstNameMax),
  email: z
    .string({ error: MESSAGES_VALIDATION.email })
    .trim()
    .max(254, MESSAGES_VALIDATION.email)
    .pipe(z.email({ error: MESSAGES_VALIDATION.email })),
  company: z
    .string({ error: MESSAGES_VALIDATION.company })
    .trim()
    .min(1, MESSAGES_VALIDATION.company)
    .max(120, MESSAGES_VALIDATION.companyMax),
  country: z.enum(PAYS_CATALOGUE, { error: MESSAGES_VALIDATION.country }),
  products: z.string().trim().max(120, MESSAGES_VALIDATION.productsMax).optional().default(''),
  consultantOptIn: z.boolean().optional().default(false),
});

export type ChampsCatalogue = z.output<typeof champsCatalogueSchema>;
export type SaisieCatalogue = z.input<typeof champsCatalogueSchema>;

/** Attribution first-touch de session (`lib/attribution.ts`), mêmes bornes que `/api/contact`. */
export const attributionCatalogueSchema = z.object({
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landingPage: z.string().max(500).optional(),
});

/**
 * Corps de `POST /api/catalogue` : les champs, plus
 * - `requestId` : identifiant tiré par le navigateur pour une tentative ; la
 *   route l'utilise pour l'idempotence (double clic, nouvel essai) ;
 * - `attribution` : facultative ;
 * - `siteWeb` : champ piège, invisible pour un visiteur ; rempli = automate.
 */
export const requeteCatalogueSchema = champsCatalogueSchema.extend({
  requestId: z.uuid(),
  attribution: attributionCatalogueSchema.optional(),
  siteWeb: z.string().max(200).optional(),
});

export type RequeteCatalogue = z.output<typeof requeteCatalogueSchema>;

/** Demande telle qu'elle est transmise aux services (e-mail du lien, notification interne). */
export interface DemandeCatalogue {
  requestId: string;
  recueLe: string; // ISO 8601
  firstName: string;
  email: string;
  company: string;
  country: PaysCatalogue;
  products: string;
  consultantOptIn: boolean;
  pageSource: typeof PAGE_SOURCE_CATALOGUE;
  attribution?: z.output<typeof attributionCatalogueSchema>;
}

/**
 * Réponses de la route. `ok: true` n'est renvoyé que lorsqu'une URL de PDF
 * autorisée est disponible et que la demande a laissé une trace : notification
 * interne ou e-mail du lien confirmé par Resend.
 * `emailSent` et `contactRequestAccepted` reflètent le retour réel des services :
 * ils valent `false` dès que l'envoi ou la transmission n'est pas confirmé.
 */
export type ReponseCatalogue =
  | {
      ok: true;
      pdfUrl: string;
      emailSent: boolean;
      contactRequestAccepted: boolean;
      /** Présent et vrai uniquement en simulation locale : rien n'a été envoyé ni enregistré. */
      simulated?: true;
    }
  | { ok: false; error: 'invalid'; fieldErrors?: Partial<Record<keyof ChampsCatalogue, string>> }
  | { ok: false; error: 'rate_limited'; retryAfterSec: number }
  | { ok: false; error: 'catalogue_unavailable' }
  | { ok: false; error: 'technical' };
