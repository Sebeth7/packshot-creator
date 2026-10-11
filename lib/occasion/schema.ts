import { z } from 'zod/v4';
import { FAMILLES } from './formulaires';

/**
 * Demande de recherche d'un studio Orbitvu d'occasion — schéma partagé entre le
 * formulaire (`components/landings/occasion/FormulaireRecherche.tsx`) et la route
 * `POST /api/occasion`. GO_CODE de Laurent du 11/10/2026 (mission S0).
 *
 * Fait métier de Laurent (11/10) : des machines d'occasion peuvent être
 * recherchées ou mobilisées à la demande. La demande se transmet donc SANS stock
 * affiché ; une référence n'est jointe que si le visiteur a cliqué sur une
 * machine réelle, et la route vérifie qu'elle est disponible.
 *
 * Obligatoires : prénom, e-mail, entreprise, besoin (application ou modèle
 * recherché). Facultatifs : famille, téléphone, budget HT indicatif, horizon,
 * commentaire, référence. Aucun opt-in marketing : c'est une demande de contact,
 * pas une inscription ; un champ inconnu envoyé par un client est ignoré.
 * Champs, mentions et conservation à confirmer avant publication.
 */

/** Identifiant de la landing, conservé avec chaque demande (attribution interne). */
export const PAGE_SOURCE_OCCASION = 'occasion_studios_orbitvu';

export const HORIZONS = ['Moins de 3 mois', 'De 3 à 6 mois', 'Plus de 6 mois', 'À définir'] as const;

export const MESSAGES_RECHERCHE = {
  firstName: 'Indiquez votre prénom.',
  email: 'Saisissez une adresse e-mail valide.',
  company: 'Indiquez votre entreprise.',
  besoin: 'Décrivez votre besoin en quelques mots.',
  max: (n: number) => `${n} caractères au maximum.`,
  choix: 'Choisissez une valeur de la liste.',
  reference: "Cette machine n'est plus proposée. Votre recherche peut être envoyée sans référence.",
} as const;

const facultatif = (max: number) => z.string().trim().max(max, MESSAGES_RECHERCHE.max(max)).optional().default('');

/** Les champs saisis par le visiteur. */
export const champsRechercheSchema = z.object({
  firstName: z
    .string({ error: MESSAGES_RECHERCHE.firstName })
    .trim()
    .min(1, MESSAGES_RECHERCHE.firstName)
    .max(60, MESSAGES_RECHERCHE.max(60)),
  email: z
    .string({ error: MESSAGES_RECHERCHE.email })
    .trim()
    .max(254, MESSAGES_RECHERCHE.email)
    .pipe(z.email({ error: MESSAGES_RECHERCHE.email })),
  company: z
    .string({ error: MESSAGES_RECHERCHE.company })
    .trim()
    .min(1, MESSAGES_RECHERCHE.company)
    .max(120, MESSAGES_RECHERCHE.max(120)),
  besoin: z
    .string({ error: MESSAGES_RECHERCHE.besoin })
    .trim()
    .min(3, MESSAGES_RECHERCHE.besoin)
    .max(1000, MESSAGES_RECHERCHE.max(1000)),
  famille: z
    .union([z.enum(FAMILLES), z.literal('')], { error: MESSAGES_RECHERCHE.choix })
    .optional()
    .default(''),
  telephone: facultatif(30),
  budget: facultatif(60),
  horizon: z
    .union([z.enum(HORIZONS), z.literal('')], { error: MESSAGES_RECHERCHE.choix })
    .optional()
    .default(''),
  commentaire: facultatif(1000),
  /** Référence d'une machine réelle, présélectionnée par un clic sur sa carte. */
  reference: facultatif(40),
});

export type ChampsRecherche = z.output<typeof champsRechercheSchema>;
export type SaisieRecherche = z.input<typeof champsRechercheSchema>;

/** Attribution first-touch de session (`lib/attribution.ts`), mêmes bornes que `/api/catalogue`. */
export const attributionRechercheSchema = z.object({
  utmSource: z.string().max(200).optional(),
  utmMedium: z.string().max(200).optional(),
  utmCampaign: z.string().max(200).optional(),
  utmTerm: z.string().max(200).optional(),
  utmContent: z.string().max(200).optional(),
  referrer: z.string().max(500).optional(),
  landingPage: z.string().max(500).optional(),
});

/**
 * Corps de `POST /api/occasion` : les champs, plus
 * - `requestId` : identifiant tiré par le navigateur pour une tentative (idempotence) ;
 * - `attribution` : facultative ;
 * - `siteWeb` : champ piège, invisible pour un visiteur ; rempli = automate.
 */
export const requeteRechercheSchema = champsRechercheSchema.extend({
  requestId: z.uuid(),
  attribution: attributionRechercheSchema.optional(),
  siteWeb: z.string().max(200).optional(),
});

export type RequeteRecherche = z.output<typeof requeteRechercheSchema>;

/** Demande telle qu'elle est transmise aux services (notification interne, accusé de réception). */
export interface DemandeRecherche extends ChampsRecherche {
  requestId: string;
  recueLe: string; // ISO 8601
  pageSource: typeof PAGE_SOURCE_OCCASION;
  attribution?: z.output<typeof attributionRechercheSchema>;
}

/**
 * Réponses de la route. `ok: true` n'est renvoyé que si la notification interne
 * a été confirmée par Resend (identifiant d'envoi) : c'est elle qui fait de la
 * demande une demande reçue. `ackSent` dit si l'accusé de réception est parti.
 */
export type ReponseRecherche =
  | { ok: true; ackSent: boolean }
  | { ok: false; error: 'invalid'; fieldErrors?: Partial<Record<keyof ChampsRecherche, string>> }
  | { ok: false; error: 'reference_unavailable' }
  | { ok: false; error: 'rate_limited'; retryAfterSec: number }
  | { ok: false; error: 'occasion_unavailable' }
  | { ok: false; error: 'technical' };
