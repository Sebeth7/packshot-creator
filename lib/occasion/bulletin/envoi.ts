import type { MachineOccasion } from '@/data/occasion/machines';
import { bulletinEnvoyable, type VerrousBulletin } from '../activation';
import { lienDesinscription } from '../alertes/courriel';
import { creerJeton, SECRET_MIN } from '../alertes/jeton';
import { composerBulletin } from './courriel';
import { lienDesinscriptionApercu, machinesPourFamille, type PlanBulletin } from './plan';
import { machinesAnnoncables } from './selection';

/**
 * Envoi d'un bulletin d'arrivage VALIDÉ. N'est appelé par aucune route ni aucune
 * tâche planifiée : seulement par une personne, depuis le script
 * `scripts/occasion-bulletin.mts`, après validation écrite de Sébastien.
 *
 * Refus AVANT tout appel au fournisseur si :
 * - `bulletinEnvoyable()` est faux (BULLETIN_ENVOI_AUTORISE, liste en service,
 *   page publiée : sans elles, le lien de désinscription ne fonctionnerait pas ;
 *   bulletin de test : publication non exigée, inscrits désignés seulement) ;
 * - l'empreinte fournie n'est pas celle du brouillon recalculé ;
 * - la validation n'est pas nominative ;
 * - une machine du brouillon n'est plus annonçable (vendue, réservée, déjà
 *   annoncée, fiche devenue incomplète) ;
 * - le secret des jetons manque.
 *
 * Chaque message porte un lien de désinscription PERSONNEL (jeton chiffré) et
 * l'en-tête `List-Unsubscribe`. Envoi par tranches de 100 au plus, chacune avec
 * une clé d'idempotence dérivée du bulletin : relancer le même envoi après une
 * panne ne renvoie pas une tranche déjà acceptée par le fournisseur (durée de
 * validité de la clé fixée par Resend). Après l'envoi : renseigner `annonce`
 * dans le registre, par commit, pour chaque machine annoncée.
 */

export const TAILLE_TRANCHE = 100;

type ErreurResend = { name?: string; statusCode?: number | null; message?: string } | null;

export interface MessageBulletin {
  from: string;
  to: string[];
  subject: string;
  text: string;
  html: string;
  headers: Record<string, string>;
  tags: { name: string; value: string }[];
}

/** Sous-ensemble du client Resend utilisé pour l'envoi. */
export interface ClientEnvoiBulletin {
  batch: {
    send(messages: MessageBulletin[], o: { idempotencyKey: string }): Promise<{ data: { data: { id: string }[] } | null; error: ErreurResend }>;
  };
}

export type RefusEnvoi =
  | 'verrou_ferme'
  | 'empreinte_differente'
  | 'validation_absente'
  | 'machine_plus_annoncable'
  | 'secret_absent'
  | 'aucun_destinataire';

export type RapportEnvoi =
  | { statut: 'refuse'; raison: RefusEnvoi; detail?: string }
  | {
      statut: 'envoye' | 'interrompu';
      bulletin: string;
      envoyes: number;
      identifiants: string[];
      /** Tranche en échec (envoi interrompu) : relancer le même envoi, l'idempotence protège les tranches acceptées. */
      echec?: { lot: number; tranche: number; code: string };
      /** Machines à marquer `annonce: { bulletin, envoyeLe }` dans le registre, par commit. */
      aMarquer: string[];
    };

export async function envoyerBulletin(
  plan: PlanBulletin,
  o: {
    client: ClientEnvoiBulletin;
    expediteur: string;
    secret: string;
    source: readonly MachineOccasion[];
    autorisation: { empreinte: string; valideePar: string };
    maintenant?: Date;
    /** Pour les tests seulement : les verrous du code font foi sinon. */
    verrous?: VerrousBulletin;
  },
): Promise<RapportEnvoi> {
  if (!bulletinEnvoyable(o.verrous, plan.test)) return { statut: 'refuse', raison: 'verrou_ferme' };
  if (o.autorisation.empreinte !== plan.empreinte) return { statut: 'refuse', raison: 'empreinte_differente' };
  if (o.autorisation.valideePar.trim().length < 3) return { statut: 'refuse', raison: 'validation_absente' };
  if (o.secret.length < SECRET_MIN) return { statut: 'refuse', raison: 'secret_absent' };
  if (plan.totalDestinataires === 0) return { statut: 'refuse', raison: 'aucun_destinataire' };

  const maintenant = o.maintenant ?? new Date();
  const encore = machinesAnnoncables(o.source, maintenant, plan.refs).machines.map((m) => m.ref);
  const perdues = plan.refs.filter((r) => !encore.includes(r));
  if (perdues.length > 0) return { statut: 'refuse', raison: 'machine_plus_annoncable', detail: perdues.join(', ') };
  const machines = o.source.filter((m) => plan.refs.includes(m.ref));

  // Le contenu envoyé doit être exactement celui de l'aperçu validé (hors lien personnel).
  for (const lot of plan.lots) {
    const c = composerBulletin({
      machines: machinesPourFamille(machines, lot.famille),
      langue: lot.langue,
      famille: lot.famille,
      base: plan.base,
      lienDesinscription: lienDesinscriptionApercu(plan.base, lot.langue),
    });
    if (c.texte !== lot.apercu.texte || c.html !== lot.apercu.html || c.objet !== lot.apercu.objet) {
      return { statut: 'refuse', raison: 'empreinte_differente', detail: 'contenu modifié depuis l’aperçu' };
    }
  }

  const identifiants: string[] = [];
  for (const [i, lot] of plan.lots.entries()) {
    const concernees = machinesPourFamille(machines, lot.famille);
    for (let j = 0; j * TAILLE_TRANCHE < lot.destinataires.length; j++) {
      const tranche = lot.destinataires.slice(j * TAILLE_TRANCHE, (j + 1) * TAILLE_TRANCHE);
      const messages = tranche.map((email) => {
        const lien = lienDesinscription(plan.base, creerJeton({ type: 'desinscription', email }, o.secret), lot.langue);
        const c = composerBulletin({ machines: concernees, langue: lot.langue, famille: lot.famille, base: plan.base, lienDesinscription: lien });
        return {
          from: `PackshotCreator <${o.expediteur}>`,
          to: [email],
          subject: c.objet,
          text: c.texte,
          html: c.html,
          headers: c.entetes,
          tags: [
            { name: 'programme', value: 'occasion-arrivage' },
            { name: 'bulletin', value: plan.id },
          ],
        };
      });
      const r = await o.client.batch.send(messages, { idempotencyKey: `${plan.id}-${plan.empreinte.slice(0, 16)}-${i}-${j}` });
      const ids = r.data?.data?.map((d) => d.id).filter((id) => typeof id === 'string' && id.length > 0) ?? [];
      if (r.error || ids.length !== messages.length) {
        return {
          statut: 'interrompu',
          bulletin: plan.id,
          envoyes: identifiants.length,
          identifiants,
          echec: { lot: i + 1, tranche: j + 1, code: r.error?.name ?? 'reponse_incomplete' },
          aMarquer: [],
        };
      }
      identifiants.push(...ids);
    }
  }
  // Un bulletin de test n'annonce rien : les machines restent annonçables pour le vrai bulletin.
  return { statut: 'envoye', bulletin: plan.id, envoyes: identifiants.length, identifiants, aMarquer: plan.test ? [] : plan.refs };
}
