import { z } from 'zod/v4';
import { FAMILLES, VERSION_TEXTE_OPTIN } from '../formulaires';

/**
 * Liste d'alerte « prochaines occasions Orbitvu » — schémas partagés entre le
 * formulaire (`components/landings/occasion/FormulaireAlertes.tsx`) et les routes
 * `/api/occasion/alertes/**` (sprint final du 11/10/2026).
 *
 * Parcours simple : e-mail (obligatoire), famille (facultative), case d'accord
 * explicite (obligatoire, décochée par défaut). Pas de prénom, pas de compte.
 * Les schémas sont STRICTS : une clé inattendue (prénom, référence de machine,
 * newsletter…) fait échouer la validation au lieu d'être ignorée.
 */

/** Source conservée avec chaque inscription (preuve de consentement). */
export const SOURCE_ALERTES = '/fr/studios-photo-automatises/opportunites';

export const MESSAGES_ALERTES = {
  email: 'Indiquez une adresse e-mail valide.',
  famille: 'Choisissez une valeur de la liste.',
  consentement: 'Cochez cette case pour recevoir les disponibilités.',
  version: 'Le texte de la case a changé : rechargez la page puis cochez de nouveau la case.',
} as const;

export const EMAIL_MAX = 254;

const email = z
  .string({ error: MESSAGES_ALERTES.email })
  .trim()
  .max(EMAIL_MAX, MESSAGES_ALERTES.email)
  .pipe(z.email({ error: MESSAGES_ALERTES.email }))
  .transform((e) => e.toLowerCase());

const famille = z
  .union([z.enum(FAMILLES), z.literal('')], { error: MESSAGES_ALERTES.famille })
  .optional()
  .default('');

/** Champs saisis par le visiteur (validation du navigateur, mêmes règles que le serveur). */
export const champsAlerteSchema = z.strictObject({
  email,
  famille,
  consentement: z.literal(true, { error: MESSAGES_ALERTES.consentement }),
});

export type ChampsAlerte = z.output<typeof champsAlerteSchema>;

/** Corps de `POST /api/occasion/alertes`. */
export const requeteAlerteSchema = z.strictObject({
  email,
  famille,
  consentement: z.literal(true, { error: MESSAGES_ALERTES.consentement }),
  /** Version du texte affiché à côté de la case, envoyée par le formulaire. */
  versionConsentement: z.literal(VERSION_TEXTE_OPTIN, { error: MESSAGES_ALERTES.version }),
  /** Champ piège, invisible : rempli par un automate. */
  siteWeb: z.string().max(200).optional().default(''),
});

export type RequeteAlerte = z.output<typeof requeteAlerteSchema>;

/** Corps de `POST /api/occasion/alertes/confirmation` et `/desinscription`. */
export const requeteJetonSchema = z.strictObject({
  jeton: z.string().min(16).max(2048),
});

/** Inscription confirmée : ce qui est conservé chez Resend comme preuve de consentement. */
export interface InscriptionAlerte {
  email: string;
  famille: string;
  versionConsentement: string;
  source: string;
  /** Horodatage ISO de l'envoi du formulaire (case cochée). */
  demandeLe: string;
  /** Horodatage ISO du clic de confirmation (double opt-in). */
  confirmeLe: string;
}

export type EtatInscription = 'confirmation_envoyee' | 'inscrit' | 'deja_inscrit' | 'desinscrit';

export type ErreurAlertes =
  | 'alertes_unavailable'
  | 'invalid'
  | 'rate_limited'
  | 'jeton_invalide'
  | 'jeton_expire'
  | 'technical';

export type ReponseAlertes =
  | { ok: true; etat: EtatInscription }
  | {
      ok: false;
      error: ErreurAlertes;
      fieldErrors?: Partial<Record<'email' | 'famille' | 'consentement', string>>;
      retryAfterSec?: number;
    };
