import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { estLangueOccasion, type LangueOccasion } from '../langues';

/**
 * Jetons des liens de la liste d'alerte (serveur seulement).
 *
 * Double opt-in SANS stockage temporaire : le lien de confirmation porte la
 * demande elle-même (e-mail, famille, version du texte accepté, source, date),
 * chiffrée et authentifiée par AES-256-GCM avec `OCCASION_ALERTES_SECRET`.
 * Personne ne peut fabriquer ni modifier un jeton sans le secret, et l'adresse
 * n'apparaît pas en clair dans l'URL. Le jeton de confirmation expire ; le jeton
 * de désinscription n'expire pas (un lien de désinscription doit toujours
 * fonctionner). Le type est chiffré avec le reste : un jeton de confirmation ne
 * vaut pas désinscription, et inversement.
 */

export const DUREE_CONFIRMATION_MS = 48 * 60 * 60 * 1000;
export const SECRET_MIN = 32;

export interface DonneesConfirmation {
  type: 'confirmation';
  email: string;
  /** Langue de la page et du texte accepté. */
  langue: LangueOccasion;
  famille: string;
  versionConsentement: string;
  source: string;
  demandeLe: string;
  expireLe: number;
}

export interface DonneesDesinscription {
  type: 'desinscription';
  email: string;
}

export type DonneesJeton = DonneesConfirmation | DonneesDesinscription;

export type LectureJeton<T> = { ok: true; donnees: T } | { ok: false; raison: 'invalide' | 'expire' };

function cle(secret: string): Buffer {
  if (secret.length < SECRET_MIN) throw new Error('OCCASION_ALERTES_SECRET trop court');
  return createHash('sha256').update(`packshot-occasion-alertes:${secret}`).digest();
}

export function creerJeton(donnees: DonneesJeton, secret: string): string {
  const iv = randomBytes(12);
  const chiffreur = createCipheriv('aes-256-gcm', cle(secret), iv);
  const contenu = Buffer.concat([chiffreur.update(JSON.stringify(donnees), 'utf8'), chiffreur.final()]);
  return Buffer.concat([iv, contenu, chiffreur.getAuthTag()]).toString('base64url');
}

function dechiffrer(jeton: string, secret: string): unknown {
  try {
    const brut = Buffer.from(jeton, 'base64url');
    if (brut.length < 12 + 16 + 2) return null;
    const dechiffreur = createDecipheriv('aes-256-gcm', cle(secret), brut.subarray(0, 12));
    dechiffreur.setAuthTag(brut.subarray(brut.length - 16));
    const clair = Buffer.concat([dechiffreur.update(brut.subarray(12, brut.length - 16)), dechiffreur.final()]);
    return JSON.parse(clair.toString('utf8'));
  } catch {
    return null;
  }
}

const estTexte = (v: unknown): v is string => typeof v === 'string';

export function lireJetonConfirmation(jeton: string, secret: string, maintenant: Date = new Date()): LectureJeton<DonneesConfirmation> {
  const d = dechiffrer(jeton, secret) as Partial<DonneesConfirmation> | null;
  if (
    !d ||
    d.type !== 'confirmation' ||
    !estTexte(d.email) ||
    !estTexte(d.langue) ||
    !estLangueOccasion(d.langue) ||
    !estTexte(d.famille) ||
    !estTexte(d.versionConsentement) ||
    !estTexte(d.source) ||
    !estTexte(d.demandeLe) ||
    typeof d.expireLe !== 'number'
  ) {
    return { ok: false, raison: 'invalide' };
  }
  if (maintenant.getTime() >= d.expireLe) return { ok: false, raison: 'expire' };
  return { ok: true, donnees: d as DonneesConfirmation };
}

export function lireJetonDesinscription(jeton: string, secret: string): LectureJeton<DonneesDesinscription> {
  const d = dechiffrer(jeton, secret) as Partial<DonneesDesinscription> | null;
  if (!d || d.type !== 'desinscription' || !estTexte(d.email)) return { ok: false, raison: 'invalide' };
  return { ok: true, donnees: d as DonneesDesinscription };
}
