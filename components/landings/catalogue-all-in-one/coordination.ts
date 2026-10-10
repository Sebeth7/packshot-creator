/**
 * Repères communs au hero et au ruban des studios. Depuis la V5.1, la priorité entre
 * les deux animations passe par animationPrincipale.ts : le ruban ne dépend plus de
 * la visibilité de la vidéo.
 */
export const ID_VIDEO_GAMME = 'video-gamme';

/** Part visible de la vidéo en dessous de laquelle elle est considérée hors champ. */
export const SEUIL_VIDEO_VISIBLE = 0.3;

/** Le header partagé est collant (h-16) : il masque le haut du viewport. */
export const MARGE_HEADER = '-64px 0px 0px 0px';
