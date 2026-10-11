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

/** Familles proposées (recherche et alertes). Facultatif : « » = tous les équipements. */
export const FAMILLES = [
  'Alphashot (Micro, 360, Pro, XL)',
  'Alphastudio (Compact, XXL)',
  'Alphatable / Alphadesk',
  'Studios spécialisés (mode, mobilier, vélo)',
] as const;

/**
 * Texte EXACT de la case d'accord de la liste d'alerte. Toute modification de ce
 * texte impose une nouvelle `VERSION_TEXTE_OPTIN` : la version conservée avec
 * chaque inscription doit désigner le texte réellement accepté.
 */
export const TEXTE_OPTIN =
  "Je souhaite recevoir par e-mail les nouvelles disponibilités d'équipements Orbitvu d'occasion. Cette inscription est indépendante de la newsletter et ne m'abonne à aucune autre communication.";

/** Version du texte `TEXTE_OPTIN` (v1 du 10/10 : même texte suivi d'un astérisque, jamais utilisée en réel). */
export const VERSION_TEXTE_OPTIN = 'occasion-alertes-v2-2026-10-11';

/** Textes acceptés, par version : la preuve d'une inscription renvoie à l'un d'eux. */
export const TEXTES_OPTIN: Readonly<Record<string, string>> = {
  [VERSION_TEXTE_OPTIN]: TEXTE_OPTIN,
};
