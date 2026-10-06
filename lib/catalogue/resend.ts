import { composerCourrielCatalogue } from './courriel';
import { noteCrmCatalogue } from './crm';
import type { DemandeCatalogue } from './schema';
import type { CourrielCatalogue, EnregistrementCatalogue, NotificationCatalogue } from './services';

/**
 * Envois Resend de la landing catalogue, sur le modèle des routes existantes
 * (`/api/contact`, `/api/roi-lead` : expéditeur `PackshotCreator <RESEND_FROM_EMAIL>`).
 *
 * - Au prospect : l'e-mail transactionnel de `courriel.ts` (lien, jamais de
 *   pièce jointe, aucune séquence marketing).
 * - À l'équipe, pour chaque nouvelle demande : une notification interne
 *   « [Brochure] entreprise » adressée aux destinataires de
 *   `CATALOGUE_NOTIFICATION_EMAIL` (adresses séparées par des virgules),
 *   avec la demande de consultant en tête quand elle existe. Aucune adresse
 *   n'est codée en dur : sans destinataire configuré, la notification n'existe
 *   pas et une demande de consultant n'est pas déclarée prise en compte.
 *
 * Resend répond `{ data, error }` sans lever : un envoi n'est tenu pour fait
 * que sur un identifiant de message retourné.
 */

export interface ClientCourriel {
  emails: {
    send(message: {
      from: string;
      to: string[];
      subject: string;
      html: string;
      text?: string;
    }): Promise<{ data: { id: string } | null; error: unknown }>;
  };
}

function expediteurComplet(expediteur: string): string {
  return `PackshotCreator <${expediteur}>`;
}

export function courrielResend(client: ClientCourriel, expediteur: string): CourrielCatalogue {
  return {
    async envoyerLien(demande: DemandeCatalogue, pdfUrl: string) {
      const c = composerCourrielCatalogue({ firstName: demande.firstName, pdfUrl });
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

/** Destinataires d'une liste d'adresses séparées par des virgules, ou liste vide si la variable est absente. */
export function destinatairesNotification(valeur: string | undefined): string[] {
  return (valeur ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
}

function echapper(valeur: string): string {
  return valeur.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/** Objet de la notification interne : `[Brochure] entreprise`, signal consultant visible. */
export function objetNotification(demande: DemandeCatalogue): string {
  return demande.consultantOptIn
    ? `[Brochure] ${demande.company} - DEMANDE À ÊTRE RECONTACTÉ`
    : `[Brochure] ${demande.company}`;
}

/**
 * Notification interne de CHAQUE nouvelle demande (lead brochure), règles
 * brochure de Sébastien (§ 5) et fait métier de Laurent du 06/10 : l'équipe sait
 * qu'un lead brochure existe. Aucune consigne d'appel ni d'interdiction d'appel,
 * aucune relance ; la demande de consultant est mise en tête quand elle existe.
 */
export function notificationInterneResend(
  client: ClientCourriel,
  expediteur: string,
  destinataires: string[],
  domainePipedrive: string,
): NotificationCatalogue {
  return {
    async notifier(demande: DemandeCatalogue, enregistrement: EnregistrementCatalogue) {
      const fiche = enregistrement.personId ? `https://${domainePipedrive}/person/${enregistrement.personId}` : null;
      const entete = demande.consultantOptIn
        ? 'LE PROSPECT DEMANDE À ÊTRE RECONTACTÉ (case consultant cochée sur la landing catalogue Orbitvu All-in-One).'
        : 'Nouveau lead brochure : demande du catalogue Orbitvu All-in-One sur la landing.';
      const lignes = [`Prénom : ${demande.firstName}`, `E-mail : ${demande.email}`, ...noteCrmCatalogue(demande).split('\n')];
      const html = [
        `<p><strong>${echapper(entete)}</strong></p>`,
        fiche ? `<p><a href="${echapper(fiche)}">Fiche Pipedrive de la personne</a></p>` : '',
        `<p>${lignes.map(echapper).join('<br>')}</p>`,
      ].join('\n');
      const r = await client.emails.send({
        from: expediteurComplet(expediteur),
        to: destinataires,
        subject: objetNotification(demande),
        html,
        text: [entete, fiche, ...lignes].filter(Boolean).join('\n'),
      });
      if (r.error || !r.data?.id) throw new Error('notification interne non confirmée');
    },
  };
}
