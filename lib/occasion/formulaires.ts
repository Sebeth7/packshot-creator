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
 */
export const OPTIN: Readonly<Record<LangueOccasion, { version: string; texte: string }>> = {
  fr: {
    version: 'occasion-alertes-v2-2026-10-11',
    texte:
      "Je souhaite recevoir par e-mail les nouvelles disponibilités d'équipements Orbitvu d'occasion. Cette inscription est indépendante de la newsletter et ne m'abonne à aucune autre communication.",
  },
  en: {
    version: 'occasion-alertes-v2-2026-10-11-en',
    texte:
      'I would like to receive emails about newly available pre-owned Orbitvu equipment. This subscription is separate from the newsletter and does not sign me up for any other communication.',
  },
  'de-ch': {
    version: 'occasion-alertes-v2-2026-10-11-de-ch',
    texte:
      'Ich möchte per E-Mail über neu verfügbare Orbitvu-Occasionen informiert werden. Diese Anmeldung ist vom Newsletter unabhängig und meldet mich für keine weiteren Mitteilungen an.',
  },
};

/** Texte et version en français (v1 du 10/10 : même texte suivi d'un astérisque, jamais utilisée en réel). */
export const TEXTE_OPTIN = OPTIN.fr.texte;
export const VERSION_TEXTE_OPTIN = OPTIN.fr.version;

/** Textes acceptés, par version : la preuve d'une inscription renvoie à l'un d'eux. */
export const TEXTES_OPTIN: Readonly<Record<string, string>> = Object.fromEntries(
  Object.values(OPTIN).map((o) => [o.version, o.texte]),
);
