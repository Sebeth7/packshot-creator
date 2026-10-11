/**
 * Les deux parcours de la landing occasion, séparés :
 * - A, demande de recherche d'un studio d'occasion, avec ou sans machine
 *   affichée (mission S0 du 11/10/2026) : schéma `schema.ts`, route
 *   `POST /api/occasion`, fermée tant que COLLECTE_REELLE_AUTORISEE est faux ;
 * - B, inscription aux prochaines disponibilités (liste d'alerte) : secondaire,
 *   NON ACTIVÉE, sans route ni stockage ; règles ci-dessous seulement.
 * Une alerte de stock n'est ni un lead de démonstration ni une affaire « neuve ».
 */

export const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function emailValide(email: string): boolean {
  return RE_EMAIL.test(email.trim());
}

/** Familles proposées dans la liste d'attente (V4.1). Facultatif : « » = tous. */
export const FAMILLES = [
  'Alphashot (Micro, 360, Pro, XL)',
  'Alphastudio (Compact, XXL)',
  'Alphatable / Alphadesk',
  'Studios spécialisés (mode, mobilier, vélo)',
] as const;

export interface SaisieAlerte {
  email: string;
  prenom?: string;
  famille?: string;
  /** Case décochée par défaut : choix explicite du prospect. */
  optin: boolean;
}

export type Erreurs<T> = Partial<Record<keyof T, string>>;

export const MESSAGES = {
  email: 'Indiquez une adresse e-mail valide.',
  optin: 'Cochez cette case pour recevoir les disponibilités.',
  requis: 'Champ obligatoire.',
} as const;

/** Parcours B : e-mail valide et opt-in coché ; prénom et famille facultatifs. */
export function validerAlerte(s: SaisieAlerte): Erreurs<SaisieAlerte> {
  const e: Erreurs<SaisieAlerte> = {};
  if (!emailValide(s.email)) e.email = MESSAGES.email;
  if (s.famille && !(FAMILLES as readonly string[]).includes(s.famille)) e.famille = MESSAGES.requis;
  if (s.optin !== true) e.optin = MESSAGES.optin;
  return e;
}

// ── Consentement de la liste d'attente : structure prévue, rien n'est stocké ──
//
// Outil d'envoi, lieu de stockage sous contrôle de Sysnext, double opt-in, durée
// de conservation et validateur des envois : NON TRANCHÉS (éléments non établis
// de la V4.1, point 7). Exclus sans décision séparée : la base Supabase SEO et
// l'instance n8n personnelles de Laurent. Chaque e-mail futur portera un lien
// signé vers les préférences (famille, désinscription) et un en-tête
// `List-Unsubscribe` ; une désinscription est définitive, sans réinscription ni
// inscription croisée vers la newsletter.

/** Version du texte de la case d'opt-in : toute modification du texte la change. */
export const VERSION_TEXTE_OPTIN = 'occasion-alertes-v1-2026-10-10';

export type EtatConsentement = 'en_attente' | 'confirme' | 'desinscrit';

/** Preuve à conserver pour chaque inscription (mini-brief V4.1, § 4). */
export interface PreuveConsentement {
  email: string;
  horodatage: string;
  versionTexte: string;
  pageSource: string;
  famille?: string;
  etat: EtatConsentement;
  dateDesinscription?: string;
}

/**
 * Construit la preuve d'une inscription, à l'état « en_attente » (confirmation
 * par double opt-in recommandée, non décidée). Fonction pure : n'écrit nulle part.
 */
export function preuveConsentement(s: SaisieAlerte, pageSource: string, maintenant: Date = new Date()): PreuveConsentement {
  return {
    email: s.email.trim().toLowerCase(),
    horodatage: maintenant.toISOString(),
    versionTexte: VERSION_TEXTE_OPTIN,
    pageSource,
    ...(s.famille ? { famille: s.famille } : {}),
    etat: 'en_attente',
  };
}

/** Désinscription : définitive, datée. */
export function desinscrire(p: PreuveConsentement, maintenant: Date = new Date()): PreuveConsentement {
  return { ...p, etat: 'desinscrit', dateDesinscription: maintenant.toISOString() };
}
