/**
 * Une seule animation majeure à la fois (V4) : la vidéo du hero et la frise des
 * studios observent le même élément avec le même seuil. Sous ce seuil, la vidéo se
 * met en pause et la frise peut défiler ; au-dessus, l'inverse.
 */
export const ID_VIDEO_GAMME = 'video-gamme';

/** Part visible de la vidéo en dessous de laquelle elle est considérée hors champ. */
export const SEUIL_VIDEO_VISIBLE = 0.3;

/** Le header partagé est collant (h-16) : il masque le haut du viewport. */
export const MARGE_HEADER = '-64px 0px 0px 0px';
