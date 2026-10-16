import { Resend } from 'resend';
import { destinatairesNotification, type ClientCourriel } from '@/lib/catalogue/resend';
import { MACHINES_OCCASION } from '@/data/occasion/machines';
import { etatCollecte, type VerrousCollecte } from './activation';
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
 * `COLLECTE_REELLE_AUTORISEE` (code) ; hors production, une fenêtre de test
 * `FENETRE_TEST_JUSQUA` non échue (code) ; en production, `PUBLICATION_AUTORISEE`
 * (code) ; les secrets `RESEND_API_KEY` et `RESEND_FROM_EMAIL` ; au moins une
 * adresse valide dans `OCCASION_NOTIFICATION_EMAIL`. Sinon la route répond 503
 * `occasion_unavailable`, sans lire la demande. La fin de fenêtre est revérifiée
 * à CHAQUE demande (`servicesOuverts`) : un déploiement de test oublié se ferme seul.
 */

export type ServicesOccasion =
  | { mode: 'desactive' }
  | {
      mode: 'reel';
      notification: NotificationOccasion;
      accuse: AccuseOccasion;
      /** Références réellement disponibles au moment de la demande (registre, jamais les exemples fictifs). */
      referencesDisponibles(): readonly string[];
      /** Fin de la fenêtre de test (ms depuis l'époque) hors production ; null en production publiée. */
      ouverteJusqua: number | null;
    };

export const SERVICES_OCCASION_DESACTIVES: ServicesOccasion = { mode: 'desactive' };

/** Les services sont-ils ouverts à cet instant ? (fenêtre de test revérifiée à chaque demande) */
export function servicesOuverts(services: ServicesOccasion, maintenant: Date = new Date()): boolean {
  if (services.mode !== 'reel') return false;
  return services.ouverteJusqua === null || maintenant.getTime() < services.ouverteJusqua;
}

/** État affiché par la page (bandeau, avis du formulaire), calculé au rendu serveur. */
export function collecteAffichee(services: ServicesOccasion, maintenant: Date = new Date()): { active: boolean; jusqua: string | null } {
  if (!servicesOuverts(services, maintenant) || services.mode !== 'reel') return { active: false, jusqua: null };
  return { active: true, jusqua: services.ouverteJusqua === null ? null : new Date(services.ouverteJusqua).toISOString() };
}

/** Références du registre réel affichables maintenant (`machinesDisponibles`). */
export function referencesDuRegistre(maintenant: Date = new Date()): string[] {
  return machinesDisponibles(MACHINES_OCCASION, maintenant).map((m) => m.ref);
}

export interface OptionsServicesOccasion {
  /** Pour les tests seulement : les verrous du code font foi sinon. */
  verrous?: VerrousCollecte;
  maintenant?: Date;
  clientCourriel?: (cle: string) => ClientCourriel;
  referencesDisponibles?: () => readonly string[];
}

export function servicesOccasion(
  env: Readonly<Record<string, string | undefined>> = process.env,
  options: OptionsServicesOccasion = {},
): ServicesOccasion {
  // Verrous du code : collecte, publication en production, fenêtre de test hors production.
  const etat = etatCollecte(env, options.maintenant ?? new Date(), options.verrous);
  if (!etat.ouverte) return SERVICES_OCCASION_DESACTIVES;

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
    ouverteJusqua: etat.jusqua === null ? null : Date.parse(etat.jusqua),
  };
}
