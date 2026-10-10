/**
 * Pop-in d'engagement (démo prioritaire, catalogue Orbitvu en repli) — règles
 * pures, sans DOM : couverture des routes, conditions d'apparition, intention
 * de sortie. Décision de Laurent du 09/10/2026 (mission « pop-in d'engagement »).
 *
 * V1 : desktop, FR, une seule apparition par session, déclenchée seulement si
 * les trois conditions sont réunies : au moins 60 s sur le site, au moins 70 %
 * de la page parcourus, puis une intention de sortie (souris vers le haut de
 * la fenêtre). Ni apparition à l'arrivée, ni minuterie seule, ni mobile.
 */

/** Temps minimal passé sur le site depuis l'arrivée, en millisecondes. */
export const TEMPS_MINIMAL_MS = 60_000;

/** Profondeur de lecture maximale à atteindre sur la page courante (0 à 1). */
export const PROFONDEUR_MINIMALE = 0.7;

/**
 * Desktop au sens du dépôt : 1 024 px et plus (seuil des éléments collants,
 * D44 / R-UX-LONG), avec un pointeur fin capable de survol, condition de
 * l'intention de sortie à la souris.
 */
export const REQUETE_DESKTOP = '(min-width: 1024px) and (hover: hover) and (pointer: fine)';

/**
 * Pointeur capable de survol : condition pour écouter la souris. La largeur
 * de 1 024 px est vérifiée au moment du geste, pas au chargement : une fenêtre
 * élargie après coup (outils de développement refermés, zoom) reste couverte.
 */
export const REQUETE_POINTEUR = '(hover: hover) and (pointer: fine)';

/**
 * Sortie effective du document : bande haute où la position rapportée vaut
 * sortie par le haut. Chrome rapporte selon le système une coordonnée
 * extérieure (négative) ou la dernière position intérieure, qu'un geste
 * rapide peut laisser à plusieurs dizaines de pixels du bord.
 */
export const BANDE_SORTIE_HAUT_PX = 80;

/** Repli sans sortie effective : bande extrême du haut de la fenêtre, en px. */
export const BANDE_REPLI_PX = 8;

/** Repli : montée minimale, dans la fenêtre de trajectoire, pour atteindre la bande extrême. */
export const MONTEE_REPLI_PX = 40;

/** Durée sur laquelle la trajectoire de la souris est lue, en ms. */
export const FENETRE_TRAJECTOIRE_MS = 600;

/** Origine portée par le lien vers la landing catalogue (lien interne : aucun UTM). */
export const ORIGINE_CATALOGUE = 'brochure_exit_sitewide';

/** Landing catalogue Orbitvu All-in-One (#82), FR seulement. */
export const URL_CATALOGUE = `/fr/catalogue-orbitvu-all-in-one?origine=${ORIGINE_CATALOGUE}`;

type RegleRoute = {
  chemin: string;
  /** Vrai : le chemin seul ; faux : le chemin et tout ce qui est en dessous. */
  exact?: boolean;
  motif: string;
};

/** Routes où une conversion active ou un contenu réglementaire serait perturbé. */
export const ROUTES_EXCLUES: readonly RegleRoute[] = [
  { chemin: '/fr/contact', motif: 'Formulaire de contact et de démo' },
  { chemin: '/fr/calculateur-roi', motif: 'Calculateur ROI' },
  { chemin: '/fr/calculateur', motif: 'Calculateur interne' },
  { chemin: '/fr/outil-financement', motif: 'Simulateur de financement' },
  { chemin: '/fr/catalogue-orbitvu-all-in-one', motif: 'Landing catalogue (#82)' },
  { chemin: '/fr/mentions-legales', motif: 'Page légale' },
  { chemin: '/fr/cgu', motif: 'Page légale' },
  { chemin: '/fr/confidentialite', motif: 'Page légale' },
  { chemin: '/fr/academy', motif: 'Academy / formation' },
];

/**
 * Pages sous expérience SEO : « aucune modification de la page »
 * (docs/standards/R-UX-LONG.md, D37, D39, D44). Elles rejoindront la
 * couverture en retirant leur ligne, sur décision, après la fin de leur gel.
 * Aucune levée automatique à la date.
 *
 * `/fr/packshot-mode` retirée le 10/10/2026 sur décision de Laurent (D56) :
 * exception propre à la pop-in, la période de mesure Mode n'est pas annulée.
 */
export const ROUTES_GELEES: readonly (RegleRoute & { jusqua: string })[] = [
  { chemin: '/fr', exact: true, motif: 'Accueil, mesure M5 (D44)', jusqua: '28/10/2026' },
  { chemin: '/fr/packshot-e-commerce', motif: 'F5 (D37)', jusqua: '23/11/2026' },
  { chemin: '/fr/industrie/mode-textile', motif: 'Hub mode-textile, mesure Mode', jusqua: '26/11/2026' },
];

/** Segments de pages de confirmation ou de succès de formulaire. */
const SEGMENTS_CONFIRMATION = /^(merci|confirmation|succes|success|thank-you|thanks)$/;

function normaliser(chemin: string): string {
  const sansRequete = chemin.split(/[?#]/)[0] || '/';
  return sansRequete.length > 1 ? sansRequete.replace(/\/+$/, '') : sansRequete;
}

function correspond(chemin: string, regle: RegleRoute): boolean {
  if (chemin === regle.chemin) return true;
  return !regle.exact && chemin.startsWith(`${regle.chemin}/`);
}

/** Vrai si la pop-in peut couvrir cette route (FR, ni exclue, ni gelée). */
export function routeCouverte(chemin: string): boolean {
  const c = normaliser(chemin);
  if (c !== '/fr' && !c.startsWith('/fr/')) return false;
  if (c.split('/').some((segment) => SEGMENTS_CONFIRMATION.test(segment))) return false;
  if (ROUTES_EXCLUES.some((r) => correspond(c, r))) return false;
  if (ROUTES_GELEES.some((r) => correspond(c, r))) return false;
  return true;
}

/** Part de la page déjà parcourue, de 0 à 1 ; une page plus courte que l'écran vaut 1. */
export function profondeurLecture(defilement: number, hauteurFenetre: number, hauteurDocument: number): number {
  if (hauteurDocument <= 0 || hauteurDocument <= hauteurFenetre) return 1;
  const part = (Math.max(0, defilement) + hauteurFenetre) / hauteurDocument;
  return Math.min(1, Math.max(0, part));
}

export type EtatEligibilite = {
  desktop: boolean;
  routeCouverte: boolean;
  dejaAffichee: boolean;
  /** Temps écoulé depuis l'arrivée sur le site, en ms. */
  ecouleMs: number;
  /** Profondeur maximale atteinte sur la page courante. */
  profondeurMax: number;
  /** Choix de cookies enregistré et bandeau fermé. */
  bandeauCookiesFerme: boolean;
  /** Une autre fenêtre (galerie, modale, vidéo) occupe l'écran. */
  autreFenetreOuverte: boolean;
};

/**
 * Conditions préalables à l'intention de sortie : tout est réuni sauf le geste
 * de sortie lui-même. Sert aussi à précharger la fenêtre avant ce geste.
 */
export function pretePourSortie(e: EtatEligibilite): boolean {
  return (
    e.desktop &&
    e.routeCouverte &&
    !e.dejaAffichee &&
    e.ecouleMs >= TEMPS_MINIMAL_MS &&
    e.profondeurMax >= PROFONDEUR_MINIMALE &&
    e.bandeauCookiesFerme &&
    !e.autreFenetreOuverte
  );
}

/** Position de la souris à un instant donné (ms, horloge de la page). */
export type Point = { x: number; y: number; t: number };

/**
 * Pas de souris « montant » : vers le haut (ou immobile), avec au plus un
 * léger écart latéral (tremblement de la main). Un balayage horizontal, par
 * exemple dans l'en-tête, interrompt la montée.
 */
function pasMontant(a: Point, b: Point): boolean {
  const dx = Math.abs(b.x - a.x);
  const dy = b.y - a.y;
  return dy <= 0 && dx <= 2 * -dy + 4;
}

/**
 * Dernière montée continue de la souris, dans la fenêtre de trajectoire : du
 * début de la suite ininterrompue de pas montants jusqu'au dernier point. Si
 * le dernier pas ne monte pas, c'est ce pas qui est renvoyé (il ne vaut pas
 * montée). Nul s'il y a moins de deux points récents.
 */
export function trajectoire(points: readonly Point[], maintenant: number): { dx: number; dy: number } | null {
  const recents = points.filter((p) => maintenant - p.t <= FENETRE_TRAJECTOIRE_MS && p.t <= maintenant);
  if (recents.length < 2) return null;
  const fin = recents.length - 1;
  let debut = fin;
  while (debut > 0 && pasMontant(recents[debut - 1], recents[debut])) debut--;
  if (debut === fin) debut = fin - 1;
  return { dx: recents[fin].x - recents[debut].x, dy: recents[fin].y - recents[debut].y };
}

/** La souris remonte, et la montée l'emporte sur le déplacement latéral. */
function monteeDominante(t: { dx: number; dy: number }): boolean {
  return t.dy < 0 && -t.dy >= Math.abs(t.dx);
}

export type SortieDocument = {
  /** Coordonnées rapportées par `mouseleave` / `mouseout` à la sortie du document. */
  clientX: number;
  clientY: number;
  /** Dimensions de la fenêtre (zone visible), en px. */
  largeur: number;
  hauteur: number;
  points: readonly Point[];
  maintenant: number;
};

/**
 * Signal principal : la souris a quitté le document, par le haut. Une
 * coordonnée négative vaut sortie par le haut. Sinon, la position rapportée
 * doit être dans la bande haute, plus proche du bord haut que des côtés, et
 * la trajectoire récente doit monter. Sorties latérales et basses écartées.
 */
export function estSortieParLeHaut(s: SortieDocument): boolean {
  const { clientX: x, clientY: y, largeur, hauteur } = s;
  if (y < 0) return true;
  if (x < 0 || x >= largeur || y >= hauteur) return false;
  if (y > BANDE_SORTIE_HAUT_PX) return false;
  if (Math.min(x, largeur - 1 - x) < y) return false;
  const t = trajectoire(s.points, s.maintenant);
  return t === null || monteeDominante(t);
}

export type ApprocheHaut = {
  clientY: number;
  /** Boutons de souris enfoncés (0 : aucun) : un glisser ou une sélection n'est pas une sortie. */
  boutons: number;
  points: readonly Point[];
  maintenant: number;
};

/**
 * Repli : la souris atteint la bande extrême du haut en remontant d'au moins
 * 40 px, sans bouton enfoncé, sans avoir encore quitté le document. Être dans
 * l'en-tête ou y cliquer ne suffit pas.
 */
export function estApprocheDuHaut(s: ApprocheHaut): boolean {
  if (s.boutons !== 0 || s.clientY > BANDE_REPLI_PX) return false;
  const t = trajectoire(s.points, s.maintenant);
  return t !== null && monteeDominante(t) && -t.dy >= MONTEE_REPLI_PX;
}
