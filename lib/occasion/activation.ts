/**
 * Interrupteurs de la landing « Offres d'occasion » Orbitvu
 * (/fr/studios-photo-automatises/opportunites), mission du 10/10/2026.
 *
 * Basculer un interrupteur est un changement de code, relu en PR : une variable
 * d'environnement ne suffit ni à publier la page, ni à activer une collecte.
 * Retour arrière : remettre l'interrupteur à `false`, ou `git revert` du commit
 * de fusion.
 */

/**
 * Page et liens de navigation (menu haut, pied de page) servis en production
 * Vercel, donc sur `www`. FAUX : GO_PUBLICATION = NO (Laurent, 10/10/2026).
 * Faux : 404 en production et aucun lien affiché ; page et liens servis en local
 * et sur les Preview seulement.
 */
export const PUBLICATION_AUTORISEE = false;

/**
 * Collecte réelle (liste d'attente, demande sur une machine) : aucune route
 * d'envoi n'existe. FAUX : GO_FORMULAIRES_REELS = NO (10/10/2026). Les deux
 * formulaires valident dans le navigateur et n'émettent aucune requête.
 */
export const COLLECTE_REELLE_AUTORISEE = false;

type Env = Readonly<Record<string, string | undefined>>;

/** La page `/fr/studios-photo-automatises/opportunites` est-elle générée dans cet environnement ? */
export function pageOccasionServie(env: Env = process.env): boolean {
  if (env.VERCEL_ENV === 'production') return PUBLICATION_AUTORISEE;
  return true;
}

/**
 * Les liens « Offres d'occasion » du menu haut et du pied de page sont-ils
 * affichés ? Mêmes conditions que la page : un lien ne mène jamais à un 404.
 * Évalué au rendu serveur (layout), jamais dans le navigateur.
 */
export function liensOccasionServis(env: Env = process.env): boolean {
  return pageOccasionServie(env);
}

/**
 * Vue de contrôle avec les trois exemples fictifs de la maquette V4.1
 * (/fr/studios-photo-automatises/opportunites/exemples-fictifs). Jamais en
 * production, quel que soit `PUBLICATION_AUTORISEE` : ces exemples ne sont pas
 * un stock et ne doivent jamais être publiés comme tel.
 */
export function exemplesFictifsServis(env: Env = process.env): boolean {
  return env.VERCEL_ENV !== 'production';
}
