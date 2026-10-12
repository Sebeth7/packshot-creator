import type { LangueOccasion } from './langues';

/**
 * Les deux parcours de la landing occasion, séparés :
 * - A, demande de recherche d'un studio d'occasion, avec ou sans machine
 *   affichée (mission S0 du 11/10/2026) : schéma `schema.ts`, route
 *   `POST /api/occasion`, fermée tant que COLLECTE_REELLE_AUTORISEE est faux ;
 * - B, inscription aux prochaines disponibilités (liste d'alerte, sprint final
 *   du 11/10/2026) : secondaire, double opt-in, `lib/occasion/alertes/**` et
 *   routes `/api/occasion/alertes/**`, fermée tant que
 *   ALERTES_REELLES_AUTORISEES est faux. Liste dédiée : ni newsletter, ni
 *   démonstration, ni vente de produits neufs, ni CRM.
 * Une alerte de stock n'est ni un lead de démonstration ni une affaire « neuve ».
 */

/**
 * Familles proposées (recherche et alertes). Facultatif : « » = tous les
 * équipements. Valeurs CANONIQUES (françaises) transmises au serveur, quelle que
 * soit la langue de la page ; seuls les libellés affichés sont traduits.
 */
export const FAMILLES = [
  'Alphashot (Micro, 360, Pro, XL)',
  'Alphastudio (Compact, XXL)',
  'Alphatable / Alphadesk',
  'Studios spécialisés (mode, mobilier, vélo)',
] as const;

export type Famille = (typeof FAMILLES)[number];

/** Libellés affichés des familles, par langue (les noms de gamme Orbitvu ne se traduisent pas). */
export const LIBELLES_FAMILLES: Readonly<Record<LangueOccasion, Readonly<Record<Famille, string>>>> = {
  fr: {
    'Alphashot (Micro, 360, Pro, XL)': 'Alphashot (Micro, 360, Pro, XL)',
    'Alphastudio (Compact, XXL)': 'Alphastudio (Compact, XXL)',
    'Alphatable / Alphadesk': 'Alphatable / Alphadesk',
    'Studios spécialisés (mode, mobilier, vélo)': 'Studios spécialisés (mode, mobilier, vélo)',
  },
  en: {
    'Alphashot (Micro, 360, Pro, XL)': 'Alphashot (Micro, 360, Pro, XL)',
    'Alphastudio (Compact, XXL)': 'Alphastudio (Compact, XXL)',
    'Alphatable / Alphadesk': 'Alphatable / Alphadesk',
    'Studios spécialisés (mode, mobilier, vélo)': 'Specialised studios (fashion, furniture, bike)',
  },
  'de-ch': {
    'Alphashot (Micro, 360, Pro, XL)': 'Alphashot (Micro, 360, Pro, XL)',
    'Alphastudio (Compact, XXL)': 'Alphastudio (Compact, XXL)',
    'Alphatable / Alphadesk': 'Alphatable / Alphadesk',
    'Studios spécialisés (mode, mobilier, vélo)': 'Spezialstudios (Mode, Möbel, Velo)',
  },
};

/** Libellé d'une famille (valeur canonique ou « ») dans une langue. */
export function libelleFamille(famille: string, langue: LangueOccasion): string {
  return (LIBELLES_FAMILLES[langue] as Record<string, string>)[famille] ?? famille;
}

/**
 * Texte EXACT de la case d'accord de la liste d'alerte, par langue. Toute
 * modification d'un texte impose une nouvelle version : la version conservée
 * avec chaque inscription doit désigner le texte réellement accepté.
 *
 * v3 du 12/10/2026 : promesse « nouvelles offres de studios Orbitvu
 * d'occasion » (décision du 12/10 : alertes sur nouvel arrivage), choix de la
 * famille, désinscription. Les versions v1 (10/10) et
 * v2 (11/10) n'ont jamais servi à une inscription réelle (liste fermée).
 */
export const OPTIN: Readonly<Record<LangueOccasion, { version: string; texte: string }>> = {
  fr: {
    version: 'occasion-alertes-v3-2026-10-12',
    texte:
      "J'accepte de recevoir par e-mail les nouvelles offres de studios Orbitvu d'occasion de PackshotCreator, pour la famille choisie ou pour toutes les familles. Cette liste est distincte de la newsletter et je peux m'en désinscrire depuis chaque message.",
  },
  en: {
    version: 'occasion-alertes-v3-2026-10-12-en',
    texte:
      'I agree to receive emails from PackshotCreator about new offers on pre-owned Orbitvu studios, for the chosen family or for all families. This list is separate from the newsletter, and I can unsubscribe from any message.',
  },
  'de-ch': {
    version: 'occasion-alertes-v3-2026-10-12-de-ch',
    texte:
      'Ich bin einverstanden, von PackshotCreator E-Mails mit neuen Angeboten für Orbitvu-Studios als Occasion zu erhalten, für die gewählte Familie oder für alle Familien. Diese Liste ist vom Newsletter unabhängig, und ich kann mich in jeder Nachricht abmelden.',
  },
};

/** Texte et version en français. */
export const TEXTE_OPTIN = OPTIN.fr.texte;
export const VERSION_TEXTE_OPTIN = OPTIN.fr.version;

/** Textes acceptés, par version : la preuve d'une inscription renvoie à l'un d'eux. */
export const TEXTES_OPTIN: Readonly<Record<string, string>> = Object.fromEntries(
  Object.values(OPTIN).map((o) => [o.version, o.texte]),
);
