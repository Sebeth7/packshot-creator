import { Resend } from 'resend';
import type { DemandeCatalogue } from './schema';
import type { SuiviCatalogue } from './crm';
import { PUBLICATION_AUTORISEE, SERVICES_REELS_AUTORISES, simulationAutorisee } from './activation';
import { PDF_CATALOGUE } from './pdf';
import { stockagePipedrive } from './pipedrive';
import { courrielResend, destinatairesNotification, notificationConsultantResend, type ClientCourriel } from './resend';

/**
 * Services de la route `/api/catalogue`, injectés pour être remplacés par des
 * doublures dans les tests.
 *
 * ÉTAT AU 06/10/2026 — ADAPTATEURS ÉCRITS, AUCUN APPEL RÉEL.
 * - trace durable : Pipedrive, personne + organisation + note, dédoublonnée
 *   par requestId (`pipedrive.ts`, règle dans `crm.ts`) ; aucune affaire ;
 * - e-mail du lien au prospect : Resend (`resend.ts`, texte de `courriel.ts`) ;
 * - demande de consultant : notification interne Resend à `NOTIFICATION_EMAIL`,
 *   en plus de la mention dans la note ;
 * - PDF : URL R2 de `pdf.ts`.
 *
 * Les services réels ne sont assemblés que si TOUT est réuni :
 * `SERVICES_REELS_AUTORISES` (code), PDF en ligne (`pdf.ts`, code),
 * `PUBLICATION_AUTORISEE` en production (code), et les secrets
 * `PIPEDRIVE_API_TOKEN`, `RESEND_API_KEY`, `RESEND_FROM_EMAIL`. Sinon la route
 * répond 503 `catalogue_unavailable` : aucun succès n'est annoncé.
 */

export interface EnregistrementCatalogue {
  /** Identifiant de la trace durable (note Pipedrive), sans donnée personnelle. */
  reference: string;
  /** Personne CRM rattachée, si connue. */
  personId?: number;
  /** Vrai si une trace portant le même requestId existait déjà : aucun effet n'est rejoué. */
  dejaEnregistree: boolean;
  /** Suivi consigné lors du premier traitement, relu pour une demande rejouée. */
  suivi?: SuiviCatalogue | null;
  /** Écarts secondaires (noms d'événements, sans donnée personnelle), portés au journal. */
  anomalies?: string[];
}

export interface StockageCatalogue {
  /** Trace durable, dédoublonnée par requestId. Doit lever si la demande n'est pas enregistrée. */
  enregistrer(demande: DemandeCatalogue): Promise<EnregistrementCatalogue>;
  /** Consigne dans la trace ce qui a réellement été fait (e-mail, consultant). */
  consignerSuivi?(reference: string, demande: DemandeCatalogue, suivi: SuiviCatalogue): Promise<void>;
}

export interface CourrielCatalogue {
  /** `envoye: true` uniquement sur confirmation du service d'envoi. */
  envoyerLien(demande: DemandeCatalogue, pdfUrl: string): Promise<{ envoye: boolean }>;
}

export interface ConsultantCatalogue {
  /** Transmission à l'équipe d'une demande de consultant ; lève en cas d'échec. */
  transmettre(demande: DemandeCatalogue, enregistrement: EnregistrementCatalogue): Promise<void>;
}

export interface ServicesCatalogue {
  mode: 'desactive' | 'simulation' | 'reel';
  /** URL du PDF autorisé, ou null si aucune n'est disponible. */
  pdfUrl(): Promise<string | null>;
  stockage: StockageCatalogue | null;
  courriel: CourrielCatalogue | null;
  consultant: ConsultantCatalogue | null;
}

export const SERVICES_DESACTIVES: ServicesCatalogue = {
  mode: 'desactive',
  pdfUrl: async () => null,
  stockage: null,
  courriel: null,
  consultant: null,
};

/**
 * Simulation locale : la demande n'est ni enregistrée, ni envoyée, ni transmise.
 * Aucun e-mail ni aucune demande de consultant n'est donc déclaré accepté, et la
 * réponse porte `simulated: true`. Le lien « Ouvrir le catalogue » mène à une
 * page vide : aucun PDF n'est servi.
 */
export const SERVICES_SIMULATION: ServicesCatalogue = {
  mode: 'simulation',
  pdfUrl: async () => 'about:blank',
  stockage: { enregistrer: async () => ({ reference: 'simulation', dejaEnregistree: false }) },
  courriel: null,
  consultant: null,
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
  fetch?: typeof fetch;
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

  const jeton = env.PIPEDRIVE_API_TOKEN;
  const cle = env.RESEND_API_KEY;
  const expediteur = env.RESEND_FROM_EMAIL;
  if (!jeton || !cle || !expediteur) return SERVICES_DESACTIVES;

  const client = (options.clientCourriel ?? ((k: string) => new Resend(k)))(cle);
  const destinataires = destinatairesNotification(env.NOTIFICATION_EMAIL);
  const domainePipedrive = env.PIPEDRIVE_DOMAIN || 'packshotcreator.pipedrive.com';

  return {
    mode: 'reel',
    pdfUrl: async () => PDF_CATALOGUE.url,
    stockage: stockagePipedrive({ jeton, fetch: options.fetch }),
    courriel: courrielResend(client, expediteur),
    consultant:
      destinataires.length > 0 ? notificationConsultantResend(client, expediteur, destinataires, domainePipedrive) : null,
  };
}
