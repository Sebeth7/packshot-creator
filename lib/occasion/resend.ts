import type { ClientCourriel } from '@/lib/catalogue/resend';
import { composerAccuseOccasion } from './courriel';
import { lignesFicheOccasion } from './fiche';
import type { DemandeRecherche } from './schema';

/**
 * Envois Resend de la landing occasion, sur le modèle de la landing catalogue
 * (#82, `lib/catalogue/resend.ts` : même client, même expéditeur
 * `PackshotCreator <RESEND_FROM_EMAIL>`).
 *
 * Resend répond `{ data, error }` sans lever : un envoi n'est tenu pour fait que
 * sur un identifiant de message retourné.
 */

export interface NotificationOccasion {
  /** Notification interne. Renvoie l'identifiant Resend ; lève si l'envoi n'est pas confirmé. */
  notifier(demande: DemandeRecherche): Promise<{ id: string }>;
}

export interface AccuseOccasion {
  /** Accusé de réception au prospect ; `envoye: true` uniquement sur confirmation de Resend. */
  envoyer(demande: DemandeRecherche): Promise<{ envoye: boolean }>;
}

function expediteurComplet(expediteur: string): string {
  return `PackshotCreator <${expediteur}>`;
}

function echapper(valeur: string): string {
  return valeur
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Objet de la notification : `[Occasion] Recherche de studio — entreprise`. */
export function objetNotificationOccasion(demande: DemandeRecherche): string {
  return `[Occasion] Recherche de studio — ${demande.company}`;
}

export function notificationOccasionResend(
  client: ClientCourriel,
  expediteur: string,
  destinataires: string[],
): NotificationOccasion {
  return {
    async notifier(demande) {
      const entete = "Nouvelle demande de recherche d'un studio Orbitvu d'occasion (landing occasion).";
      const lignes = lignesFicheOccasion(demande);
      const r = await client.emails.send({
        from: expediteurComplet(expediteur),
        to: destinataires,
        subject: objetNotificationOccasion(demande),
        html: [`<p><strong>${echapper(entete)}</strong></p>`, `<p>${lignes.map(echapper).join('<br>')}</p>`].join('\n'),
        text: [entete, ...lignes].join('\n'),
      });
      if (r.error || !r.data?.id) throw new Error('notification interne non confirmée');
      return { id: r.data.id };
    },
  };
}

export function accuseOccasionResend(client: ClientCourriel, expediteur: string): AccuseOccasion {
  return {
    async envoyer(demande) {
      const c = composerAccuseOccasion({ firstName: demande.firstName });
      const r = await client.emails.send({
        from: expediteurComplet(expediteur),
        to: [demande.email],
        subject: c.objet,
        text: c.texte,
        html: c.html,
      });
      return { envoye: !r.error && typeof r.data?.id === 'string' && r.data.id.length > 0 };
    },
  };
}
