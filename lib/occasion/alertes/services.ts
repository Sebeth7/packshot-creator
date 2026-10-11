import { Resend } from 'resend';
import { etatAlertes, type VerrousAlertes } from '../activation';
import { SECRET_MIN } from './jeton';
import {
  clientAlertesResend,
  envoiConfirmationResend,
  registreAlertesResend,
  type ClientAlertes,
  type EnvoiConfirmation,
  type RegistreAlertes,
} from './resend';

/**
 * Services des routes `/api/occasion/alertes/**`, injectés pour être remplacés
 * par des doublures dans les tests.
 *
 * Assemblés seulement si TOUT est réuni :
 * - `ALERTES_REELLES_AUTORISEES` (code), indépendant de la recherche
 *   (`COLLECTE_REELLE_AUTORISEE`) ; hors production, une fenêtre de test
 *   `FENETRE_TEST_ALERTES_JUSQUA` non échue ; en production, `PUBLICATION_AUTORISEE` ;
 * - `RESEND_API_KEY`, `RESEND_FROM_EMAIL` ;
 * - `OCCASION_ALERTES_SEGMENT_ID`, `OCCASION_ALERTES_TOPIC_ID` (segment et topic
 *   créés chez Resend par une personne) ;
 * - `OCCASION_ALERTES_SECRET` (32 caractères au moins), clé des jetons.
 * Sinon les trois routes répondent 503 sans lire la demande. Aucune de ces
 * variables n'est configurée sur Vercel (GO_TEST_REEL_ALERTES = NO).
 * Facultatif : `OCCASION_ALERTES_URL_BASE` (origine des liens des e-mails) ;
 * à défaut, l'origine de la requête.
 */

export type ServicesAlertes =
  | { mode: 'desactive' }
  | {
      mode: 'reel';
      confirmation: EnvoiConfirmation;
      registre: RegistreAlertes;
      secret: string;
      urlBase: string | null;
      /** Fin de la fenêtre de test (ms) hors production ; null en production publiée. */
      ouverteJusqua: number | null;
    };

export const SERVICES_ALERTES_DESACTIVES: ServicesAlertes = { mode: 'desactive' };

export function alertesOuvertes(s: ServicesAlertes, maintenant: Date = new Date()): boolean {
  if (s.mode !== 'reel') return false;
  return s.ouverteJusqua === null || maintenant.getTime() < s.ouverteJusqua;
}

/** État affiché par la page (même forme que la collecte de la recherche). */
export function alertesAffichees(s: ServicesAlertes, maintenant: Date = new Date()): { active: boolean; jusqua: string | null } {
  if (s.mode !== 'reel' || !alertesOuvertes(s, maintenant)) return { active: false, jusqua: null };
  return { active: true, jusqua: s.ouverteJusqua === null ? null : new Date(s.ouverteJusqua).toISOString() };
}

export interface OptionsServicesAlertes {
  /** Pour les tests seulement : les verrous du code font foi sinon. */
  verrous?: VerrousAlertes;
  maintenant?: Date;
  client?: (cle: string) => ClientAlertes;
}

export function servicesAlertes(
  env: Readonly<Record<string, string | undefined>> = process.env,
  options: OptionsServicesAlertes = {},
): ServicesAlertes {
  const etat = etatAlertes(env, options.maintenant ?? new Date(), options.verrous);
  if (!etat.ouverte) return SERVICES_ALERTES_DESACTIVES;

  const cle = env.RESEND_API_KEY;
  const expediteur = env.RESEND_FROM_EMAIL;
  const segmentId = env.OCCASION_ALERTES_SEGMENT_ID?.trim();
  const topicId = env.OCCASION_ALERTES_TOPIC_ID?.trim();
  const secret = env.OCCASION_ALERTES_SECRET ?? '';
  if (!cle || !expediteur || !segmentId || !topicId || secret.length < SECRET_MIN) return SERVICES_ALERTES_DESACTIVES;

  const client = (options.client ?? ((k: string) => clientAlertesResend(new Resend(k))))(cle);
  return {
    mode: 'reel',
    confirmation: envoiConfirmationResend(client, expediteur),
    registre: registreAlertesResend(client, { segmentId, topicId }),
    secret,
    urlBase: env.OCCASION_ALERTES_URL_BASE?.trim() || null,
    ouverteJusqua: etat.jusqua === null ? null : Date.parse(etat.jusqua),
  };
}
