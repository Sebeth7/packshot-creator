import { Resend } from 'resend';
import { destinatairesNotification, type ClientCourriel } from '@/lib/catalogue/resend';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { COLLECTE_REELLE_AUTORISEE, PUBLICATION_AUTORISEE } from './activation';
import { accuseOccasionResend, notificationOccasionResend, type AccuseOccasion, type NotificationOccasion } from './resend';
import { machinesDisponibles } from './stock';

/**
 * Services de la route `/api/occasion`, injectés pour être remplacés par des
 * doublures dans les tests.
 *
 * V1 (mission S0 du 11/10/2026) : AUCUN CRM, aucun Pipedrive, aucun n8n. La
 * remise commerciale est la notification interne Resend, adressée aux
 * destinataires de `OCCASION_NOTIFICATION_EMAIL` : variable propre à
 * l'occasion, SANS repli sur `CATALOGUE_NOTIFICATION_EMAIL` ni sur
 * `NOTIFICATION_EMAIL` (questionnaire). Elle n'est pas configurée sur Vercel :
 * GO_TEST_REEL = NO.
 *
 * Les services réels ne sont assemblés que si TOUT est réuni :
 * `COLLECTE_REELLE_AUTORISEE` (code), `PUBLICATION_AUTORISEE` en production
 * (code), les secrets `RESEND_API_KEY` et `RESEND_FROM_EMAIL`, et au moins une
 * adresse valide dans `OCCASION_NOTIFICATION_EMAIL`. Sinon la route répond 503
 * `occasion_unavailable`, sans lire la demande.
 */

export type ServicesOccasion =
  | { mode: 'desactive' }
  | {
      mode: 'reel';
      notification: NotificationOccasion;
      accuse: AccuseOccasion;
      /** Références réellement disponibles au moment de la demande (registre, jamais les exemples fictifs). */
      referencesDisponibles(): readonly string[];
    };

export const SERVICES_OCCASION_DESACTIVES: ServicesOccasion = { mode: 'desactive' };

export interface InterrupteursOccasion {
  collecteReelle: boolean;
  publication: boolean;
}

const INTERRUPTEURS: InterrupteursOccasion = {
  collecteReelle: COLLECTE_REELLE_AUTORISEE,
  publication: PUBLICATION_AUTORISEE,
};

/** Références du registre réel affichables maintenant (`machinesDisponibles`). */
export function referencesDuRegistre(maintenant: Date = new Date()): string[] {
  return machinesDisponibles(MACHINES_OCCASION, maintenant).map((m) => m.ref);
}

export interface OptionsServicesOccasion {
  /** Pour les tests seulement : les interrupteurs du code font foi sinon. */
  interrupteurs?: InterrupteursOccasion;
  clientCourriel?: (cle: string) => ClientCourriel;
  referencesDisponibles?: () => readonly string[];
}

export function servicesOccasion(
  env: Readonly<Record<string, string | undefined>> = process.env,
  options: OptionsServicesOccasion = {},
): ServicesOccasion {
  const i = options.interrupteurs ?? INTERRUPTEURS;
  if (!i.collecteReelle) return SERVICES_OCCASION_DESACTIVES;
  // La page est en 404 en production avant le GO de publication : son API est fermée aussi.
  if (env.VERCEL_ENV === 'production' && !i.publication) return SERVICES_OCCASION_DESACTIVES;

  const cle = env.RESEND_API_KEY;
  const expediteur = env.RESEND_FROM_EMAIL;
  // Sans repli : la notification est la trace de la demande ; sans destinataire, la route reste fermée.
  const destinataires = destinatairesNotification(env.OCCASION_NOTIFICATION_EMAIL);
  if (!cle || !expediteur || destinataires.length === 0) return SERVICES_OCCASION_DESACTIVES;

  const client = (options.clientCourriel ?? ((k: string) => new Resend(k)))(cle);
  return {
    mode: 'reel',
    notification: notificationOccasionResend(client, expediteur, destinataires),
    accuse: accuseOccasionResend(client, expediteur),
    referencesDisponibles: options.referencesDisponibles ?? (() => referencesDuRegistre()),
  };
}
