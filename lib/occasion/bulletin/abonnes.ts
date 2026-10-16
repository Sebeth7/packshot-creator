import { PROPRIETES } from '../alertes/resend';
import { estLangueOccasion, type LangueOccasion } from '../langues';
import type { Famille } from '../formulaires';
import { estFamilleInscrit } from './familles';

/**
 * Destinataires d'un bulletin d'arrivage : seuls les inscrits CONFIRMÉS de la
 * liste Occasion, non désinscrits, avec leur langue et leur famille.
 *
 * Les contacts sont lus chez Resend (segment et topic Occasion, propriétés
 * `occasion_alertes_*` écrites à la confirmation) par `sourceAbonnesResend`, en
 * lecture seule. Ici, aucune lecture : qualification pure, testée sur doublures.
 */

/** Contact tel que lu chez Resend, avant qualification. */
export interface ContactLu {
  email: string;
  /** Désinscription GLOBALE Resend (toutes communications). */
  unsubscribed: boolean;
  /** Abonnement au topic Occasion ; absent = jamais abonné. */
  topic: 'opt_in' | 'opt_out' | null;
  /** Propriétés de contact (valeurs texte). */
  proprietes: Readonly<Record<string, string | undefined>>;
}

export interface Abonne {
  email: string;
  langue: LangueOccasion;
  /** « » : toutes les familles. */
  famille: Famille | '';
}

export type RaisonExclusion =
  | 'desinscrit_global'
  | 'hors_topic'
  | 'non_confirme'
  | 'consentement_inconnu'
  | 'famille_inconnue'
  | 'adresse_invalide'
  | 'adresse_de_test'
  | 'doublon';

export interface Qualification {
  retenus: Abonne[];
  /** Nombre de contacts écartés, par raison : affiché à la validation, sans adresse. */
  exclus: Partial<Record<RaisonExclusion, number>>;
}

/**
 * Domaines réservés aux exemples et aux tests (RFC 2606, RFC 6761) et domaines
 * d'exemple français : jamais destinataires d'un bulletin réel.
 */
const DOMAINES_DE_TEST = /(^|\.)(example\.(com|net|org)|exemple\.(fr|com|test)|[^.]+\.(test|example|invalid|localhost))$/i;
const ADRESSE = /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[a-z]{2,}$/i;

/** Langue d'inscription : celle de la page d'origine conservée (`/en/…`), français à défaut. */
export function langueDeSource(source: string | undefined): LangueOccasion {
  const segment = source?.split('/')[1] ?? '';
  return estLangueOccasion(segment) ? segment : 'fr';
}

export function qualifierAbonnes(contacts: readonly ContactLu[]): Qualification {
  const retenus: Abonne[] = [];
  const exclus: Qualification['exclus'] = {};
  const vus = new Set<string>();
  const exclure = (r: RaisonExclusion) => {
    exclus[r] = (exclus[r] ?? 0) + 1;
  };

  for (const c of contacts) {
    const email = c.email.trim().toLowerCase();
    const p = c.proprietes;
    const famille = p[PROPRIETES.famille] ?? '';
    if (!ADRESSE.test(email)) exclure('adresse_invalide');
    else if (DOMAINES_DE_TEST.test(email.split('@')[1])) exclure('adresse_de_test');
    else if (c.unsubscribed) exclure('desinscrit_global');
    else if (c.topic !== 'opt_in') exclure('hors_topic');
    else if (p[PROPRIETES.etat] !== 'confirme' || Number.isNaN(Date.parse(p[PROPRIETES.confirmeLe] ?? ''))) exclure('non_confirme');
    else if (!(p[PROPRIETES.version] ?? '').startsWith('occasion-alertes-')) exclure('consentement_inconnu');
    else if (!estFamilleInscrit(famille)) exclure('famille_inconnue');
    else if (vus.has(email)) exclure('doublon');
    else {
      vus.add(email);
      retenus.push({ email, langue: langueDeSource(p[PROPRIETES.source]), famille });
    }
  }
  return { retenus, exclus };
}
