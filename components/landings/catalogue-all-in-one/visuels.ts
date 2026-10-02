/**
 * Visuels de la landing.
 *
 * 1. K1–K6 : pages du catalogue (manifeste du kit du 02/10/2026,
 *    05_SPECIFICATIONS/03_ASSET_MANIFEST.md). Droits de diffusion confirmés par
 *    Laurent le 02/10/2026 (fait métier). `src: null` = visuel non intégré : un
 *    emplacement neutre est affiché, faute d'export paysage techniquement correct
 *    (la copie du kit a une CropBox restreinte). Les exports iront sous
 *    public/images/catalogue-all-in-one/ (AVIF/WebP). Les aperçus de contrôle du
 *    kit, marqués « NE PAS PUBLIER », ne doivent jamais y être copiés.
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
  /** Texte alternatif ou légende publiée avec le visuel. */
  texte: string;
  /** Rapport largeur / hauteur : page A4 paysage ≈ 1,414 ; double page ≈ 2,828. */
  ratio: number;
  src: string | null;
}

const PAGE = 297 / 210;

export const VISUELS: Record<IdVisuel, VisuelCatalogue> = {
  K1: {
    id: 'K1',
    pages: 'p. 1',
    texte: 'Couverture du catalogue Orbitvu All-in-One, édition française 2026, sur fond sombre.',
    ratio: PAGE,
    src: null,
  },
  K2: { id: 'K2', pages: 'p. 24', texte: 'Page Orbitvu Furniture Studio du catalogue', ratio: PAGE, src: null },
  K3: { id: 'K3', pages: 'p. 10', texte: 'Page Alphashot Pro G2 du catalogue', ratio: PAGE, src: null },
  K4: {
    id: 'K4',
    pages: 'pp. 24–25',
    texte: 'Orbitvu Furniture Studio — extrait, pages 24–25',
    ratio: PAGE * 2,
    src: null,
  },
  K5: {
    id: 'K5',
    pages: 'pp. 10–11',
    texte: 'Alphashot Pro G2 — aperçu, pages 10–11',
    ratio: PAGE * 2,
    src: null,
  },
  K6: {
    id: 'K6',
    pages: 'pp. 6–7',
    texte: 'Quel système pour quels produits\u00A0? — matrice de sélection, pages 6–7',
    ratio: PAGE * 2,
    src: null,
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
