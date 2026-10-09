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

/** Bande haute de la fenêtre où une sortie de souris vaut intention de sortie, en px. */
export const BANDE_HAUTE_PX = 20;

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
 */
export const ROUTES_GELEES: readonly (RegleRoute & { jusqua: string })[] = [
  { chemin: '/fr', exact: true, motif: 'Accueil, mesure M5 (D44)', jusqua: '28/10/2026' },
  { chemin: '/fr/packshot-e-commerce', motif: 'F5 (D37)', jusqua: '23/11/2026' },
  { chemin: '/fr/packshot-mode', motif: 'Mode (D39)', jusqua: '26/11/2026' },
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

export type SortieSouris = {
  /** Ordonnée de la souris à la sortie, en px depuis le haut de la fenêtre. */
  clientY: number;
  /** Élément atteint par la souris ; nul quand elle quitte le document. */
  relatedTarget: unknown;
  /** Ordonnée du dernier mouvement connu, nulle si aucun mouvement n'a été vu. */
  dernierY: number | null;
};

/**
 * Intention de sortie : la souris quitte le document par le haut de la
 * fenêtre, en remontant. Une sortie latérale ou par le bas n'en est pas une.
 */
export function estIntentionDeSortie(s: SortieSouris): boolean {
  if (s.relatedTarget) return false;
  if (s.clientY > BANDE_HAUTE_PX) return false;
  if (s.dernierY !== null && s.clientY > s.dernierY) return false;
  return true;
}
