import type { DemandeCatalogue } from './schema';
import { simulationAutorisee } from './activation';

/**
 * Services de la route `/api/catalogue`, injectés pour être remplacés par des
 * doublures dans les tests.
 *
 * ÉTAT AU 02/10/2026 — AUCUN SERVICE EXTERNE N'EST BRANCHÉ.
 * Ce fichier ne contient aucun adaptateur Pipedrive, Resend, Supabase ni
 * stockage de PDF, et ne lit aucun secret : la présence de `PIPEDRIVE_API_TOKEN`,
 * `RESEND_API_KEY` ou d'une URL de PDF dans l'environnement (Preview ou
 * production) ne déclenche aucun appel. La route répond alors 503
 * `catalogue_unavailable` : aucun succès n'est annoncé.
 *
 * Adaptations nécessaires après GO (Laurent pour la publication, Sébastien pour
 * le métier), chacune relue en PR :
 * 1. `pdfUrl` : URL stable du PDF paysage autorisé (hébergement à arbitrer :
 *    `public/` ou R2), renvoyée seulement après contrôle du fichier.
 * 2. `stockage` : enregistrement durable de chaque demande, avant tout autre
 *    effet, avec unicité sur `requestId` (support à arbitrer : table Supabase,
 *    file, ou Pipedrive comme registre). Sans lui, la route reste fermée.
 * 3. `courriel` : envoi transactionnel du lien (`composerCourrielCatalogue`),
 *    `envoye: true` seulement sur accusé de l'API d'envoi.
 * 4. `crm` : personne et organisation pour chaque demande ; affaire seulement
 *    si `consultantOptIn` (`regleCrmCatalogue`), dans une étape à fixer par
 *    Sébastien. L'étape ROI de `lib/pipedrive.ts` n'est pas réutilisée.
 * 5. Reprise des échecs d'e-mail et de CRM à partir du stockage (à arbitrer).
 */

export interface StockageCatalogue {
  /** Doit lever si la demande n'est pas durablement enregistrée. */
  enregistrer(demande: DemandeCatalogue): Promise<void>;
}

export interface CourrielCatalogue {
  /** `envoye: true` uniquement sur confirmation du service d'envoi. */
  envoyerLien(demande: DemandeCatalogue, pdfUrl: string): Promise<{ envoye: boolean }>;
}

export interface CrmCatalogue {
  /** Personne et organisation, pour chaque demande acceptée. */
  synchroniserContact(demande: DemandeCatalogue): Promise<void>;
  /** Transmission à l'équipe d'une demande de consultant ; lève en cas d'échec. */
  transmettreDemandeConsultant(demande: DemandeCatalogue): Promise<void>;
}

export interface ServicesCatalogue {
  mode: 'desactive' | 'simulation';
  /** URL vérifiée du PDF autorisé, ou null si aucune n'est disponible. */
  pdfUrl(): Promise<string | null>;
  stockage: StockageCatalogue | null;
  courriel: CourrielCatalogue | null;
  crm: CrmCatalogue | null;
}

export const SERVICES_DESACTIVES: ServicesCatalogue = {
  mode: 'desactive',
  pdfUrl: async () => null,
  stockage: null,
  courriel: null,
  crm: null,
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
  stockage: { enregistrer: async () => {} },
  courriel: null,
  crm: null,
};

export function servicesCatalogue(env: Readonly<Record<string, string | undefined>> = process.env): ServicesCatalogue {
  return simulationAutorisee(env) ? SERVICES_SIMULATION : SERVICES_DESACTIVES;
}
