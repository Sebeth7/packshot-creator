import { Resend } from 'resend';
import type { DemandeCatalogue } from './schema';
import { PUBLICATION_AUTORISEE, SERVICES_REELS_AUTORISES, simulationAutorisee } from './activation';
import { PDF_CATALOGUE } from './pdf';
import { courrielResend, destinatairesNotification, notificationInterneResend, type ClientCourriel } from './resend';

/**
 * Services de la route `/api/catalogue`, injectés pour être remplacés par des
 * doublures dans les tests.
 *
 * Décision de Sébastien du 09/10/2026 : AUCUN CRM dans ce parcours (Pipedrive
 * retiré). Le tri des leads brochure se fait hors du site, par l'assistant IA de
 * Sébastien, à partir de la notification interne.
 * - e-mail du lien au prospect : Resend (`resend.ts`, texte de `courriel.ts`) ;
 * - notification interne de chaque nouvelle demande, consultant demandé mis en
 *   tête, avec la fiche de la demande (`fiche.ts`) : Resend aux adresses de
 *   `CATALOGUE_NOTIFICATION_EMAIL` (variable propre au catalogue, sans repli sur
 *   `NOTIFICATION_EMAIL`, lue par le questionnaire). C'est la trace de la
 *   demande : sans destinataire, la route reste fermée ;
 * - PDF : URL R2 de `pdf.ts`.
 *
 * Les services réels ne sont assemblés que si TOUT est réuni :
 * `SERVICES_REELS_AUTORISES` (code), PDF en ligne (`pdf.ts`, code),
 * `PUBLICATION_AUTORISEE` en production (code), les secrets `RESEND_API_KEY` et
 * `RESEND_FROM_EMAIL`, et au moins une adresse valide dans
 * `CATALOGUE_NOTIFICATION_EMAIL`. Sinon la route répond 503
 * `catalogue_unavailable` : aucun succès n'est annoncé.
 */

export interface CourrielCatalogue {
  /** `envoye: true` uniquement sur confirmation du service d'envoi. */
  envoyerLien(demande: DemandeCatalogue, pdfUrl: string): Promise<{ envoye: boolean }>;
}

export interface NotificationCatalogue {
  /**
   * Notification interne d'une nouvelle demande (lead brochure), qui porte aussi
   * la demande de consultant et le sort de l'e-mail du lien. Lève en cas
   * d'échec : une demande de consultant n'est déclarée prise en compte que si
   * elle a été transmise.
   */
  notifier(demande: DemandeCatalogue, suivi: { emailSent: boolean }): Promise<void>;
}

export type ServicesCatalogue =
  | {
      mode: 'desactive' | 'simulation';
      /** URL du PDF autorisé, ou null si aucune n'est disponible. */
      pdfUrl(): Promise<string | null>;
    }
  | {
      mode: 'reel';
      pdfUrl(): Promise<string | null>;
      courriel: CourrielCatalogue;
      notification: NotificationCatalogue;
    };

export const SERVICES_DESACTIVES: ServicesCatalogue = {
  mode: 'desactive',
  pdfUrl: async () => null,
};

/**
 * Simulation locale : rien n'est envoyé ni transmis. Aucun e-mail ni aucune
 * demande de consultant n'est donc déclaré accepté, et la réponse porte
 * `simulated: true`. Le lien « Ouvrir le catalogue » mène à une page vide :
 * aucun PDF n'est servi.
 */
export const SERVICES_SIMULATION: ServicesCatalogue = {
  mode: 'simulation',
  pdfUrl: async () => 'about:blank',
};

export interface InterrupteursCatalogue {
  servicesReels: boolean;
  pdfEnLigne: boolean;
  publication: boolean;
}

const INTERRUPTEURS: InterrupteursCatalogue = {
  servicesReels: SERVICES_REELS_AUTORISES,
  pdfEnLigne: PDF_CATALOGUE.enLigne,
  publication: PUBLICATION_AUTORISEE,
};

export interface OptionsServices {
  /** Pour les tests seulement : les interrupteurs du code font foi sinon. */
  interrupteurs?: InterrupteursCatalogue;
  clientCourriel?: (cle: string) => ClientCourriel;
}

export function servicesCatalogue(
  env: Readonly<Record<string, string | undefined>> = process.env,
  options: OptionsServices = {},
): ServicesCatalogue {
  if (simulationAutorisee(env)) return SERVICES_SIMULATION;

  const i = options.interrupteurs ?? INTERRUPTEURS;
  if (!i.servicesReels || !i.pdfEnLigne) return SERVICES_DESACTIVES;
  // La page est en 404 en production avant le GO : son API l'est aussi.
  if (env.VERCEL_ENV === 'production' && !i.publication) return SERVICES_DESACTIVES;

  const cle = env.RESEND_API_KEY;
  const expediteur = env.RESEND_FROM_EMAIL;
  // Variable propre au catalogue, sans repli : la notification est la trace de
  // la demande ; sans destinataire, rien ne serait tracé, la route reste fermée.
  const destinataires = destinatairesNotification(env.CATALOGUE_NOTIFICATION_EMAIL);
  if (!cle || !expediteur || destinataires.length === 0) return SERVICES_DESACTIVES;

  const client = (options.clientCourriel ?? ((k: string) => new Resend(k)))(cle);
  return {
    mode: 'reel',
    pdfUrl: async () => PDF_CATALOGUE.url,
    courriel: courrielResend(client, expediteur),
    notification: notificationInterneResend(client, expediteur, destinataires),
  };
}
