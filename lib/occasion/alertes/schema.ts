import { z } from 'zod/v4';
import { FAMILLES, OPTIN } from '../formulaires';
import { LANGUES_OCCASION, cheminOccasion, type LangueOccasion } from '../langues';

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

/** Source conservée avec chaque inscription (preuve de consentement) : la page, dans sa langue. */
export function sourceAlertes(langue: LangueOccasion): string {
  return cheminOccasion(langue);
}

/** Source de la page française (compatibilité). */
export const SOURCE_ALERTES = sourceAlertes('fr');

export interface MessagesAlertes {
  email: string;
  famille: string;
  consentement: string;
  version: string;
}

/** Messages du serveur (français) ; le formulaire affiche ceux de sa langue (`contenu-*.ts`). */
export const MESSAGES_ALERTES: MessagesAlertes = {
  email: 'Indiquez une adresse e-mail valide.',
  famille: 'Choisissez une valeur de la liste.',
  consentement: 'Cochez cette case pour recevoir les disponibilités.',
  version: 'Le texte de la case a changé : rechargez la page puis cochez de nouveau la case.',
};

export const EMAIL_MAX = 254;

function champsCommuns(m: MessagesAlertes) {
  return {
    email: z
      .string({ error: m.email })
      .trim()
      .max(EMAIL_MAX, m.email)
      .pipe(z.email({ error: m.email }))
      .transform((e) => e.toLowerCase()),
    famille: z
      .union([z.enum(FAMILLES), z.literal('')], { error: m.famille })
      .optional()
      .default(''),
    consentement: z.literal(true, { error: m.consentement }),
  };
}

/** Champs saisis par le visiteur (validation du navigateur, mêmes règles que le serveur), messages au choix. */
export function creerChampsAlerteSchema(m: MessagesAlertes) {
  return z.strictObject(champsCommuns(m));
}

export const champsAlerteSchema = creerChampsAlerteSchema(MESSAGES_ALERTES);

export type ChampsAlerte = z.output<typeof champsAlerteSchema>;

/**
 * Corps de `POST /api/occasion/alertes`. La version du texte accepté doit être
 * celle de la langue de la page : un texte anglais ne prouve pas l'acceptation
 * du texte français, et inversement.
 */
export const requeteAlerteSchema = z
  .strictObject({
    ...champsCommuns(MESSAGES_ALERTES),
    /** Langue de la page (et du texte de la case) ; français si absente. */
    langue: z.enum(LANGUES_OCCASION).optional().default('fr'),
    /** Version du texte affiché à côté de la case, envoyée par le formulaire. */
    versionConsentement: z.string({ error: MESSAGES_ALERTES.version }).max(80, MESSAGES_ALERTES.version),
    /** Champ piège, invisible : rempli par un automate. */
    siteWeb: z.string().max(200).optional().default(''),
  })
  .superRefine((r, ctx) => {
    if (r.versionConsentement !== OPTIN[r.langue].version) {
      ctx.addIssue({ code: 'custom', path: ['versionConsentement'], message: MESSAGES_ALERTES.version });
    }
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
  /** Page d'origine, avec sa langue (`/en/…`) : la langue des futurs envois s'en déduit. */
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
