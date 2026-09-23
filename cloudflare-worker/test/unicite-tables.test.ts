/**
 * Unicité des clés dans les tables du Worker, et entre elles (piège E4).
 *
 * Intra-table : une clé répétée dans un littéral d'objet est écrasée en
 * silence par la dernière occurrence ; dans un Set, elle est sans effet mais
 * masque une intention contradictoire.
 *
 * Inter-tables : une clé présente dans deux tables n'est servie que par la
 * première évaluée ; l'autre entrée est morte. Entre deux tables de
 * redirection, il n'y en a aucune : le test l'impose. Entre GONE_PATHS et une
 * table de redirection, 59 existent au 23/09/2026, toutes mortes côté
 * GONE_PATHS (les tables de redirection sont évaluées avant shouldReturn410).
 * Elles sont recensées ci-dessous : le test échoue sur toute nouvelle, et
 * signale celles qui disparaissent pour que la liste soit tenue à jour.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const SOURCE = path.resolve(import.meta.dirname, '..', 'src', 'index.js');

/** Tables dont les clés sont des chemins servis par le Worker. */
const TABLES_DE_REDIRECTION = [
  'DE_CH_MAP',
  'LEGACY_REDIRECTS',
  'PRODUIT_REDIRECTS',
  'PRODUCT_REDIRECTS',
  'HOWTO_REDIRECTS',
  'LANG_SPECIFIC_REDIRECTS',
] as const;
/** Tables de slugs ou d'hôtes : contrôlées en intra-table seulement. */
const AUTRES_TABLES = ['BLOG_EN_REDIRECTS', 'GUIDE_EN_REDIRECTS', 'PASSTHROUGH_HOSTS', 'HOST_HOME_MAP'] as const;

type Entree = { cle: string; ligne: number };

function lireTable(lignes: string[], nom: string): Entree[] {
  const debut = lignes.findIndex((l) => new RegExp(`(var|const) ${nom} = `).test(l));
  if (debut === -1) throw new Error(`${nom} introuvable dans le Worker`);
  const entrees: Entree[] = [];
  for (let i = debut + 1; i < lignes.length; i++) {
    const l = lignes[i];
    if (/^\s*(\]\);|\};)\s*$/.test(l)) return entrees;
    const m = /^\s*"([^"]+)"(?::\s*"[^"]*")?,?\s*$/.exec(l);
    if (!m) throw new Error(`Ligne ${i + 1} de ${nom} non reconnue :\n${l}`);
    entrees.push({ cle: m[1], ligne: i + 1 });
  }
  throw new Error(`Fin de ${nom} introuvable`);
}

const lignes = readFileSync(SOURCE, 'utf-8').split('\n');
const tables = Object.fromEntries(
  [...TABLES_DE_REDIRECTION, ...AUTRES_TABLES, 'GONE_PATHS'].map((nom) => [nom, lireTable(lignes, nom)]),
) as Record<string, Entree[]>;

/** Clés présentes à la fois dans GONE_PATHS et dans une table de redirection, au 23/09/2026. */
const DOUBLONS_GONE_CONNUS: Record<string, string[]> = {
  LEGACY_REDIRECTS: [
    '/blog/lost-packshotcreator-ortery-software-solution',
    '/commun/contacts.html',
    '/commun/packshot-creator.html',
    '/commun/photos-animations-produits.html',
    '/commun/photos-packshot-jouets.html',
    '/discover-packshotcreator?gclid=COfU6v-klL4CFWbItAod40AA0w',
    '/en/blog/comment-automatiser-la-creation-de-vos-photographies-animations-de-produits',
    '/en/blog/comparatif-de-solutions-de-photographie-automatisee',
    '/en/blog/evolution-e-commerce-packshot',
    '/en/guide/animation-360-focus-stacking',
    '/en/guide/comment-photographier-lunettes-e-commerce',
    '/en/guide/modifier-couleur-produit-photo',
    '/en/guide/quel-equipement-choisir-pour-photo-bijoux',
    '/en/guide/realiser-animation-360-professionnelle-chaussures',
    '/en/industrie/high-tech-electromenager-informatique',
    '/en/quote-second-hand-photo-studio',
    '/en/studio-photo/alphashot-micro',
    '/studio-photo/360-drehtische',
    '/studio-photo/alphashot-360-kleine-producten',
    '/studio-photo/alphastudio-compact',
    '/studio-photo/e-comm-studio',
    '/studio-photo/studio-photo-360-alphastudio-xxl',
    '/studio-photo/tocadiscos-orbitvu-g2',
  ],
  PRODUCT_REDIRECTS: [
    '/product/360-photo-studio-diamonds-gemstones',
    '/product/livestudio-fotos-automatizada',
    '/product/livestudio-renews-image-capturing/caracteristiques-livestudio',
    '/product/packshot-rotating-plate/caracteristiques-packshotspin-series',
    '/product/packshotspin-jewelry',
    '/product/packshotstudio-modular-lighting',
  ],
  HOWTO_REDIRECTS: ['/how-to/how-to-photograph-eyewear'],
  LANG_SPECIFIC_REDIRECTS: [
    '/es/automatiser',
    '/es/besoins',
    '/es/besoins-photographie-produit',
    '/es/blog/fotos-productos-ecommerce',
    '/es/createur-des-studios-photos-connectes',
    '/es/descargo-de-responsabilidad-copy',
    '/es/formations-photographie-produits-packshotcreator',
    '/es/guide/guide-como-colocar-reloj-antes-foto',
    '/es/industrie/estudio-fotograficos-joyas',
    '/es/packshot-packshotcreator',
    '/es/packshot-packshotcreator/packshot-amazon',
    '/es/packshot-packshotcreator/packshot-orbitvu',
    '/es/packshot-secteur-bijouterie',
    '/es/packshot-secteur-chaussures',
    '/es/packshot-secteur-e-commerce',
    '/es/packshot-secteur-meuble',
    '/es/packshot-secteur-mode-accessoires',
    '/es/packshot-secteur-pieces-techniques',
    '/es/produits',
    '/es/studio-photo/alphashot-xl',
    '/nl/automatiser',
    '/nl/formations-photographie-produits-packshotcreator',
    '/nl/industrie/fotograaf-sieraden-horloges',
    '/nl/packshot-packshotcreator',
    '/nl/packshot-packshotcreator/packshot-e-commerce',
    '/nl/packshot-packshotcreator/packshot-mode',
    '/nl/packshot-packshotcreator/packshot-photographe',
    '/nl/packshot-secteur-bijouterie',
    '/nl/studio-photo/alphashot-xl',
  ],
};

describe('Tables du Worker — unicité intra-table', () => {
  for (const [nom, entrees] of Object.entries(tables)) {
    it(`${nom} ne contient aucune clé en double`, () => {
      const vues = new Map<string, number>();
      const doublons: string[] = [];
      for (const { cle, ligne } of entrees) {
        const premiere = vues.get(cle);
        if (premiere !== undefined) doublons.push(`"${cle}" : ligne ${premiere} puis ligne ${ligne}`);
        else vues.set(cle, ligne);
      }
      expect(doublons, `Clés en double dans ${nom} :\n${doublons.join('\n')}`).toEqual([]);
    });
  }
});

describe('Tables du Worker — unicité inter-tables', () => {
  it('aucune clé partagée entre deux tables de redirection', () => {
    const proprietaire = new Map<string, string>();
    const partagees: string[] = [];
    for (const nom of TABLES_DE_REDIRECTION) {
      for (const { cle, ligne } of tables[nom]) {
        const autre = proprietaire.get(cle);
        if (autre && autre !== nom) partagees.push(`"${cle}" : ${autre} et ${nom} (ligne ${ligne})`);
        else proprietaire.set(cle, nom);
      }
    }
    expect(partagees, `Clés partagées :\n${partagees.join('\n')}`).toEqual([]);
  });

  const gone = new Set(tables.GONE_PATHS.map((e) => e.cle));
  for (const nom of TABLES_DE_REDIRECTION) {
    it(`GONE_PATHS ∩ ${nom} : aucune clé hors de la liste recensée`, () => {
      const connues = new Set(DOUBLONS_GONE_CONNUS[nom] ?? []);
      const communes = tables[nom].filter((e) => gone.has(e.cle)).map((e) => e.cle);
      const nouvelles = communes.filter((c) => !connues.has(c));
      const disparues = [...connues].filter((c) => !communes.includes(c));
      expect(nouvelles, `Nouvelles clés à la fois en 410 et redirigées :\n${nouvelles.join('\n')}`).toEqual([]);
      expect(disparues, `Doublons résorbés, à retirer de DOUBLONS_GONE_CONNUS :\n${disparues.join('\n')}`).toEqual([]);
    });
  }

  it('le doublon /en/blog/orbitvu-vs-ortery-vs-styleshoots-2026 (D21) est retiré de GONE_PATHS', () => {
    expect(gone.has('/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026')).toBe(false);
  });

  it('les trois chemins sortis du 410 par le lot F ne sont plus dans GONE_PATHS', () => {
    for (const cle of [
      '/2018-guide-e-commerce-photos',
      '/range-pro/foto-studio-enterprise-packshot-creator-x2/prasentation',
      '/range-studio/studio-photo-without-clipping-packshot-r3/presentation',
    ]) {
      expect(gone.has(cle), cle).toBe(false);
    }
  });
});
