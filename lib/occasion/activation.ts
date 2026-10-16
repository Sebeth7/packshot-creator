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
 * Collecte réelle de la demande de recherche (`POST /api/occasion`, mission S0
 * du 11/10/2026). FAUX : GO_COLLECTE_REELLE = NO, GO_TEST_REEL = NO. Faux : la
 * route répond 503 sans lire la demande, même si `RESEND_API_KEY`,
 * `RESEND_FROM_EMAIL` et `OCCASION_NOTIFICATION_EMAIL` existaient. La liste
 * d'alerte n'a pas de route : elle n'est pas activée, quel que soit ce verrou.
 */
export const COLLECTE_REELLE_AUTORISEE = true;

/**
 * Fin d'une fenêtre de test réel sur Preview (ISO 8601 UTC), ou `null`.
 *
 * Hors production, la collecte n'est ouverte QUE si `COLLECTE_REELLE_AUTORISEE`
 * est vrai ET que cette heure n'est pas passée. Raison (protocole de #82 :
 * ouverture `4a800f0`, fermeture `971d0bc`, déploiement de test supprimé) : un
 * déploiement Vercel garde le code et les variables de sa construction ; l'URL
 * propre du commit d'ouverture resterait ouverte après le commit de fermeture.
 * Avec une heure de fin, ce déploiement se referme seul (503) même s'il n'a pas
 * été supprimé. Cela complète sa suppression, sans la remplacer.
 * En production, la fenêtre est ignorée : seule la publication décide.
 */
export const FENETRE_TEST_JUSQUA: string | null = '2026-10-16T08:41:00Z';

type Env = Readonly<Record<string, string | undefined>>;

export interface VerrousCollecte {
  collecte: boolean;
  publication: boolean;
  fenetreJusqua: string | null;
}

const VERROUS: VerrousCollecte = {
  collecte: COLLECTE_REELLE_AUTORISEE,
  publication: PUBLICATION_AUTORISEE,
  fenetreJusqua: FENETRE_TEST_JUSQUA,
};

export interface EtatCollecte {
  ouverte: boolean;
  /** Fin de la fenêtre de test (ISO UTC), hors production ; sinon null. */
  jusqua: string | null;
}

/** La collecte réelle est-elle ouverte à cet instant, dans cet environnement ? Fermée par défaut. */
export function etatCollecte(env: Env = process.env, maintenant: Date = new Date(), v: VerrousCollecte = VERROUS): EtatCollecte {
  if (!v.collecte) return { ouverte: false, jusqua: null };
  if (env.VERCEL_ENV === 'production') return { ouverte: v.publication, jusqua: null };
  const fin = v.fenetreJusqua ? Date.parse(v.fenetreJusqua) : Number.NaN;
  if (!Number.isFinite(fin)) return { ouverte: false, jusqua: null };
  return { ouverte: maintenant.getTime() < fin, jusqua: new Date(fin).toISOString() };
}

/**
 * Liste d'alerte « prochaines occasions Orbitvu » (`/api/occasion/alertes/**`,
 * sprint final du 11/10/2026). FAUX : GO_TEST_REEL_ALERTES = NO. Verrou
 * INDÉPENDANT de `COLLECTE_REELLE_AUTORISEE` (recherche) : fermer l'un ne ferme
 * pas l'autre. Faux : les trois routes répondent 503 sans lire la demande, même
 * si les secrets et identifiants Resend existaient.
 */
export const ALERTES_REELLES_AUTORISEES = false;

/** Fin d'une fenêtre de test réel de la liste d'alerte hors production (ISO 8601 UTC), ou `null`. */
export const FENETRE_TEST_ALERTES_JUSQUA: string | null = null;

export interface VerrousAlertes {
  alertes: boolean;
  publication: boolean;
  fenetreJusqua: string | null;
}

const VERROUS_ALERTES: VerrousAlertes = {
  alertes: ALERTES_REELLES_AUTORISEES,
  publication: PUBLICATION_AUTORISEE,
  fenetreJusqua: FENETRE_TEST_ALERTES_JUSQUA,
};

/**
 * La liste d'alerte est-elle ouverte à cet instant ? Mêmes règles que la
 * recherche, avec ses propres verrous : en production, publication exigée ;
 * ailleurs, fenêtre de test datée non échue. Fermée par défaut.
 */
export function etatAlertes(env: Env = process.env, maintenant: Date = new Date(), v: VerrousAlertes = VERROUS_ALERTES): EtatCollecte {
  return etatCollecte(env, maintenant, { collecte: v.alertes, publication: v.publication, fenetreJusqua: v.fenetreJusqua });
}

/**
 * Envoi d'un bulletin d'arrivage « Nouvelles occasions Orbitvu disponibles » aux
 * inscrits confirmés (`lib/occasion/bulletin/**`, décision du 12/10/2026 : un
 * bulletin par nouvel arrivage vérifié, validé par Sébastien, jamais périodique
 * ni automatique). FAUX : GO_ENVOI_REEL = NO. Faux : `envoyerBulletin` refuse
 * avant tout appel. Vrai ne suffit pas : la liste doit être en service et publiée
 * (`bulletinEnvoyable`), pour que le lien de désinscription de chaque message
 * fonctionne, et l'empreinte du brouillon validé doit être fournie.
 */
export const BULLETIN_ENVOI_AUTORISE = false;

export interface VerrousBulletin {
  bulletin: boolean;
  alertes: boolean;
  publication: boolean;
}

const VERROUS_BULLETIN: VerrousBulletin = {
  bulletin: BULLETIN_ENVOI_AUTORISE,
  alertes: ALERTES_REELLES_AUTORISEES,
  publication: PUBLICATION_AUTORISEE,
};

/**
 * Un bulletin peut-il partir ? Les trois verrous ouverts : envoi, liste en
 * service, page publiée. Bulletin de TEST (destinataires désignés, inscrits de
 * test seulement) : la publication n'est pas exigée, pour tester avant la mise
 * en ligne, sur une fenêtre de test des alertes en Preview.
 */
export function bulletinEnvoyable(v: VerrousBulletin = VERROUS_BULLETIN, test = false): boolean {
  return v.bulletin && v.alertes && (test || v.publication);
}

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
