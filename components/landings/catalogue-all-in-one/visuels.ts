/**
 * Visuels de la landing.
 *
 * 1. K1–K6 : pages du catalogue Orbitvu All-in-One, édition française 2026. Droits de
 *    diffusion et de présentation confirmés par Laurent le 02/10/2026 (fait métier).
 *    Fichiers : exports WebP du PDF de contrôle `All-in-One_2026_FR_RECROP_QA_NOT_APPROVED`
 *    (paquet du 02/10/2026 : seule la CropBox a été remise au cadrage réel, le contenu
 *    des pages n'est pas recomposé), copiés à l'identique sous
 *    public/images/catalogue-all-in-one/. Les planches de contrôle et le PDF ne sont pas
 *    dans le dépôt : le téléchargement du PDF n'est pas activé.
 * 2. GAMME : visuels Orbitvu déjà publiés sur les fiches du site
 *    (public/images/machines/), sans personne visible (point de droit à l'image
 *    ouvert au JOURNAL du 01/10 pour les photos d'opérateurs). Les légendes ne
 *    nomment aucun modèle : le catalogue présente l'Alphashot XL Pro v2, pas
 *    l'Alphashot XL G2 (D29).
 */

export type IdVisuel = 'K1' | 'K2' | 'K3' | 'K4' | 'K5' | 'K6';

export interface VisuelCatalogue {
  id: IdVisuel;
  /** Pages du catalogue reproduites. */
  pages: string;
  /** Légende publiée avec le visuel. */
  texte: string;
  /** Texte alternatif : ce que montre l'image. */
  alt: string;
  /** Dimensions du fichier : le rapport fixe l'emplacement, sans décalage de mise en page. */
  width: number;
  height: number;
  src: string | null;
  /** Page seule affichée à la place d'une double page sur petit écran. */
  mobile?: IdVisuel;
}

const DOSSIER = '/images/catalogue-all-in-one';
const PAGE = { width: 1339, height: 950 };
const DOUBLE = { width: 2678, height: 950 };

export const VISUELS: Record<IdVisuel, VisuelCatalogue> = {
  K1: {
    id: 'K1',
    pages: 'p. 1',
    texte: 'Couverture du catalogue Orbitvu All-in-One, édition française 2026.',
    alt: 'Couverture du catalogue Orbitvu All-in-One : « Solutions conçues pour une imagerie produit authentique »',
    ...PAGE,
    src: `${DOSSIER}/k1-couverture.webp`,
  },
  K2: {
    id: 'K2',
    pages: 'p. 24',
    texte: 'Orbitvu Furniture Studio — page 24',
    alt: 'Page 24 du catalogue : présentation de l’Orbitvu Furniture Studio et photos d’un canapé',
    ...PAGE,
    src: `${DOSSIER}/k2-furniture-studio-p24.webp`,
  },
  K3: {
    id: 'K3',
    pages: 'p. 10',
    texte: 'Alphashot Pro G2 — page 10',
    alt: 'Page 10 du catalogue : présentation de l’Alphashot Pro G2 et dix exemples de packshots',
    ...PAGE,
    src: `${DOSSIER}/k3-alphashot-pro-g2-p10.webp`,
  },
  K4: {
    id: 'K4',
    pages: 'pp. 24–25',
    texte: 'Orbitvu Furniture Studio — extrait, pages 24–25',
    alt: 'Pages 24 et 25 du catalogue : Orbitvu Furniture Studio, photos de mobilier et de véhicules, témoignage client',
    ...DOUBLE,
    src: `${DOSSIER}/k4-furniture-studio-pp24-25.webp`,
    mobile: 'K2',
  },
  K5: {
    id: 'K5',
    pages: 'pp. 10–11',
    texte: 'Alphashot Pro G2 — aperçu, pages 10–11',
    alt: 'Pages 10 et 11 du catalogue : Alphashot Pro G2, exemples de packshots et photos de lunettes de soleil',
    ...DOUBLE,
    src: `${DOSSIER}/k5-alphashot-pro-g2-pp10-11.webp`,
    mobile: 'K3',
  },
  K6: {
    id: 'K6',
    pages: 'pp. 6–7',
    texte: 'Quel système pour quels produits\u00A0? — matrice de sélection, pages 6–7',
    alt: 'Pages 6 et 7 du catalogue : matrice croisant dix systèmes Orbitvu, des petits aux très grands produits, et les secteurs d’activité',
    ...DOUBLE,
    src: `${DOSSIER}/k6-matrice-pp6-7.webp`,
  },
};

export interface VisuelGamme {
  cle: string;
  src: string;
  width: number;
  height: number;
  /** Texte alternatif : ce que montre l'image. */
  alt: string;
  titre: string;
  legende: string;
  /** `contain` pour un packshot sur fond blanc, `cover` sinon. */
  ajustement: 'contain' | 'cover';
  /** `object-position` dans la vignette 4:3. */
  cadrage?: string;
}

export const VISUELS_GAMME: readonly VisuelGamme[] = [
  {
    cle: 'lumiere',
    // Fiche Alphashot XL G2 (« advantage »), sans personne.
    src: '/images/machines/alphashot-xl-g2/advantage-open-doors.avif',
    width: 1400,
    height: 1004,
    alt: 'Studio Orbitvu aux portes ouvertes, chambre éclairée',
    ajustement: 'cover',
    titre: 'Lumière maîtrisée',
    legende: 'Chambre ouverte d’un studio Orbitvu : éclairage LED et bras caméra.',
  },
  {
    cle: 'angles',
    // Fiche Alphashot XL G2 (« logiciel »), interface de capture Orbitvu Station.
    src: '/images/machines/alphashot-xl-g2/soft-station-capture.avif',
    width: 1400,
    height: 875,
    alt: 'Interface de capture avec plusieurs vues d’un sachet de café',
    ajustement: 'cover',
    titre: 'Plusieurs angles',
    legende: 'Un même produit sous plusieurs angles dans le logiciel Orbitvu Station.',
    cadrage: '50% 30%',
  },
  {
    cle: '360-video',
    // Fiche Alphashot Pro G2 (« Export multi-canal ») : menu 2D, 360°, vidéo.
    src: '/images/machines/alphashot-pro-g2/soft-export.avif',
    width: 1304,
    height: 1100,
    alt: 'Palette de maquillage et menu d’export 2D, 360° et vidéo',
    ajustement: 'cover',
    titre: '360° et vidéo',
    legende: 'Un même produit exporté en 2D, en 360° ou en vidéo.',
  },
  {
    cle: 'rendu',
    // Fiche Alphashot Pro G2, packshot déjà utilisé par /fr/packshot-e-commerce.
    src: '/images/machines/alphashot-pro-g2/packshot-mascara.avif',
    width: 1080,
    height: 1080,
    alt: 'Mascara rouge sur fond blanc',
    ajustement: 'contain',
    titre: 'Le rendu',
    legende: 'Packshot sur fond blanc, exemple présenté par Orbitvu.',
  },
];
