import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { ContactForm } from '@/components/forms/ContactForm';
import { sectorResourceLinks } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema, serviceSchema } from '@/components/seo/SchemaOrg';
import type { Secteur } from '@/data/secteurs';
import type { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';

/**
 * Hub /fr/industrie/bijoux-joaillerie (PR #104) : page narrative dédiée, rendue à la
 * place du gabarit commun des hubs pour ce seul secteur (fr et en ; de-ch inchangé).
 *
 * Cadre de fond (arbitrage du 08/10/2026, non affiché comme tel) : capture (lumière, macro,
 * profondeur, 360°), workflow (modèles, reprise d'une collection), IA seulement quand elle
 * sert (AI Masking, AI Retoucher), export vers les usages de l’entreprise (e-commerce, catalogues, documentation, besoins internes). Ordre des sections inchangé.
 *
 * Texte : entrée `bijoux-joaillerie` de `data/secteurs.ts` (hero, lumière, studio,
 * retouche et export, appel final, FAQ) et constantes ci-dessous (360°, collection).
 * Sources des faits : référentiel D45 (`data/produits/fiches-techniques.ts` : Micro Pro v2
 * « small objects up to 18 cm long », 1 kg ; Pro G2 10 kg), catalogue
 * `components/calculators/ROICalculator/lib/machines.ts`, guides FR de focus stacking
 * (bague, bracelet, animation 360°) et infobulles d'Orbitvu Station visibles sur leurs captures.
 *
 * Visuels affichés. Hero éditorial (08/10/2026), puis matière et lumière, puis studio et preuves réelles :
 * - deux illustrations éditoriales générées par IA (V104-HERO et V104-1, ci-dessous), signalées comme telles
 *   en légende selon la convention du cluster AI Act (docs/seo-geo/cluster-ai-act-2026-10-06/CLUSTER.md, §5) ;
 * - images réelles déjà publiées sur le site : /images/guides/* (guides PackshotCreator, Alphashot
 *   Micro Pro v2 et Orbitvu Station d'après les guides eux-mêmes) ; /images/secteurs/bijoux/superfocus-*
 *   (recadrages, sans retouche, de captures de ces guides) ; /images/machines/alphashot-micro-v2.avif
 *   (visuel produit déjà utilisé sur la fiche, ici dans la section studio) ;
 *   /images/blog/migrer-ancien-packshotcreator/bijoux-profil-rendu-constant.avif (trois pièces, article
 *   de Sébastien du 25/09/2026 ; origine du fichier non documentée, voir COLLECTION_TROIS_PIECES).
 */

type Sector = (typeof DEFAULT_SECTORS)[number];

interface HubBijouxProps {
  secteur: Secteur;
  lang: string;
  slug: string;
  breadcrumbs: { name: string; url: string }[];
  autresSecteurs: Sector[];
}

/**
 * Visuel de la page. `illustration: true` (EDITORIAL_ILLUSTRATION) : image générée, jamais présentée comme
 * une preuve produit ; la légende commence alors par « Illustration générée par IA ».
 */
type Visuel = { src: string; alt: string; width: number; height: number; legende: string; illustration: boolean };

/*
 * Hero (EDITORIAL_ILLUSTRATION, jamais PRODUCT_PROOF). Provenance : ChatGPT native image generation, image
 * fournie par Laurent le 08/10/2026 (WebP 1536 × 1024, sRGB), encodée en AVIF 1536 × 1024 (qualité 62) sans
 * recadrage ni retouche. Ce n'est ni une photo d'un studio Orbitvu, ni une capture d'Orbitvu Station : le logo
 * et le nom visibles sur le socle, l'interface et la bague à l'écran sont générés. Le vrai Alphashot Micro Pro v2
 * et les vraies captures restent plus bas (sections lumière, studio, retouche).
 */
const V104_HERO: Visuel = {
  src: '/images/secteurs/bijoux/v104-hero-studio-joaillerie.avif',
  alt: 'Illustration d’un studio de photographie de joaillerie avec un bijou placé dans le système et son image agrandie sur un écran.',
  width: 1536,
  height: 1024,
  legende: 'représentation éditoriale d’un workflow de photographie de joaillerie.',
  illustration: true,
};

/*
 * Illustration éditoriale (EDITORIAL_ILLUSTRATION, jamais PRODUCT_PROOF). Provenance : ChatGPT native image
 * generation ; archive PSC_104_BIJOUX_VISUELS_FINAUX_2026-10-08 fournie par Laurent le 08/10/2026 (fichier
 * web AVIF 1536 × 1024 intégré tel quel). Elle ne prouve aucun résultat Orbitvu, Superfocus, 360°,
 * AI Masking ou AI Retoucher. Affichée à 480 px de large au plus depuis le 08/10/2026 (bandeau retiré).
 * V104-2 (collection générée) est retirée de la page le 08/10/2026 : remplacée par COLLECTION_TROIS_PIECES.
 */
const V104_1_MACRO: Visuel = {
  src: '/images/secteurs/bijoux/v104-1-macro-joaillerie.avif',
  alt: 'Gros plan d’une bague en or jaune poli sertie d’une pierre claire facettée, tenue par quatre griffes',
  width: 1536,
  height: 1024,
  legende: 'création fictive.',
  illustration: true,
};

/*
 * Trois pièces réelles en apparence, déjà publiées sur le site (article « Migrer un ancien studio PackshotCreator »,
 * Sébastien, 25/09/2026, commit b60f7b1 ; ALT de l'article : « photographiés sur studio Orbitvu »). L'origine du
 * fichier (prise de vue PackshotCreator, Orbitvu ou client) n'est pas documentée dans le dépôt, et une signature
 * gravée, illisible, figure dans l'anneau de gauche : confirmation de Sébastien requise avant fusion. Utilisée ici
 * pour la diversité des pièces et des métaux, sans légende qui en ferait la preuve d'un modèle Orbitvu Station.
 */
const COLLECTION_TROIS_PIECES: Visuel = {
  src: '/images/blog/migrer-ancien-packshotcreator/bijoux-profil-rendu-constant.avif',
  alt: 'Bague en métal blanc à motif de feuilles pavées de pierres claires, bracelet en métal jaune au même motif, bague en métal rose sertie de pierres de couleur, sur fond blanc',
  width: 1600,
  height: 520,
  legende: 'Trois pièces, trois teintes de métal, un même fond.',
  illustration: false,
};

/*
 * Preuves techniques réelles encore manquantes (ASSET_REQUIRED). Rien n'est rendu tant qu'elles sont vides.
 * - REEL_SUPERFOCUS : vrai résultat Superfocus. Candidat à examiner :
 *   /images/guides/67d9917f406090f303cb4429.avif (bracelet, guide focus stacking), ordre avant / après à confirmer.
 * - REEL_BAGUE_360 : vraie vue 360° d'une bague (Orbitvu Sun ou vidéo). La vue du guide
 *   « animation 360° » renvoie 404 chez Orbitvu (constat du 07/10/2026).
 */
const REEL_SUPERFOCUS: Visuel | null = null;
const REEL_BAGUE_360: { src: string; title: string } | null = null;

const ROTATION = {
  titre: 'Montrer aussi le profil et l’arrière d’une pièce',
  paragraphes: [
    'Le profil d’une bague, la galerie sous la pierre, la bélière d’un pendentif ou le fermoir d’un bracelet comptent parfois autant que la vue de face.',
    'Pendant la prise de vue, le plateau tournant fait pivoter la pièce. On règle le nombre d’images de la rotation, de 6 à 180, et chaque angle peut être net de l’avant à l’arrière.',
  ],
};

/* Paramètres d'un modèle : infobulle « Modèles » d'Orbitvu Station (capture du guide bague,
   /images/guides/67d991805e0a0980101b8aa4.avif). Le zoom motorisé, cité par l'infobulle, n'est pas
   établi pour l'Alphashot Micro Pro v2 : non mentionné. Correction appliquée aux autres images :
   infobulle « Image » (/images/guides/67d991805e0a0980101b8aa1.avif). */
const COLLECTION = {
  titre: 'Quand la collection s’agrandit',
  paragraphes: [
    'Une nouvelle taille arrive. Puis une variante en or blanc. Une nouvelle pierre. Une référence est remise en production quelques semaines plus tard. Quelqu’un d’autre prend place devant le studio.',
    'Chaque fois, il faut retrouver la configuration de la première série. Dans Orbitvu Station, elle est enregistrée dans un modèle : réglages de la lumière, de l’appareil photo et de la position du plateau tournant, paramètres d’édition. On rappelle le modèle, on pose la pièce, et la prise de vue repart de là.',
    'Une correction faite sur une image peut ensuite être reportée sur le reste de la série.',
  ],
};

const PRO_G2 =
  'Pour des pièces plus grandes ou plus lourdes, l’Alphashot Pro G2 accepte des objets jusqu’à 10 kg.';

/** « Terme : texte » → { terme, Texte } (séparateur français, espace avant les deux-points). */
function scinder(item: string) {
  const i = item.indexOf(' : ');
  if (i === -1) return { terme: '', texte: item };
  const texte = item.slice(i + 3);
  return { terme: item.slice(0, i), texte: typo(texte.charAt(0).toUpperCase() + texte.slice(1)) };
}

/** Espace insécable avant « : ; ! ? » : la ponctuation ne part jamais seule en début de ligne. */
const typo = (texte: string) => texte.replace(/ ([:;!?])/g, '\u00a0$1');

const paragraphes = (texte: string) => texte.split('\n\n').map(typo);

function FigureVisuel({
  visuel,
  sizes,
  className = '',
  imageClassName = 'w-full h-auto rounded-md',
  priority = false,
}: {
  visuel: Visuel;
  sizes: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}) {
  return (
    <figure className={className}>
      <Image
        src={visuel.src}
        alt={visuel.alt}
        width={visuel.width}
        height={visuel.height}
        sizes={sizes}
        priority={priority}
        className={imageClassName}
      />
      <figcaption className="mt-2 text-sm text-neutral-medium">
        {visuel.illustration ? `Illustration générée par IA, ${visuel.legende}` : visuel.legende}
      </figcaption>
    </figure>
  );
}

export default function HubBijoux({ secteur, lang, slug, breadcrumbs, autresSecteurs }: HubBijouxProps) {
  const [studio, retouche] = secteur.solutions.items;
  const ressources = sectorResourceLinks('bijoux-joaillerie', lang);
  const faq = (secteur.faq ?? []).map((q) => ({ question: typo(q.question), answer: typo(q.answer) }));

  return (
    <>
      {/* ── A. Hero. Mobile : surtitre et H1, puis le visuel, puis le texte et l'appel.
          Desktop : texte à gauche, visuel à droite sur toute la hauteur. ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-20 lg:pb-24 grid lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] gap-x-16">
          <div className="lg:col-span-6 lg:col-start-1 lg:row-start-2">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-orbitvu mb-5 lg:mb-6">
              {secteur.hero.sousTitre}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-heading font-bold text-heading-dark leading-[1.08] tracking-tight">
              {typo(secteur.hero.titre)}
            </h1>
          </div>
          {/* Hero éditorial (V104-HERO, illustration générée par IA, légende toujours visible). Les preuves réelles
              (studio, captures, détourage) suivent dans les sections B, D et F. */}
          <FigureVisuel
            visuel={V104_HERO}
            priority
            sizes="(min-width: 1280px) 584px, (min-width: 1024px) 45vw, (min-width: 640px) calc(100vw - 48px), calc(100vw - 32px)"
            className="mt-6 lg:mt-0 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:row-span-4 lg:self-center"
          />
          <div className="mt-6 lg:mt-8 lg:col-span-6 lg:col-start-1 lg:row-start-3">
            {paragraphes(secteur.hero.description).map((p) => (
              <p key={p} className="text-lg text-neutral-medium leading-relaxed mb-4 max-w-xl">
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a
                href="#tester"
                className="inline-flex items-center justify-center rounded-lg bg-primary-orbitvu px-6 py-3.5 text-base font-semibold text-white hover:bg-very-peri-600 transition-colors"
              >
                Tester avec vos références
              </a>
              <Link
                href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-micro-v2' } }}
                className="inline-flex items-center gap-2 text-base font-semibold text-heading-dark hover:text-primary-orbitvu transition-colors"
              >
                Voir le studio pour petites pièces <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── B. La lumière, le métal, la pierre, la profondeur de champ.
          Desktop : explication et matière (V104-1, 480 px au plus), puis les trois points et la preuve technique
          réelle (deux mises au point). Mobile : même ordre, une colonne.
          Seule explication détaillée du Superfocus de la page (légende de la figure). ── */}
      <section aria-labelledby="lumiere" className="bg-bg-warm-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-x-16 gap-y-12 items-start">
          <div className="lg:col-span-5">
            <h2 id="lumiere" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-8">
              {secteur.problematiques.titre}
            </h2>
            <p className="text-lg text-neutral-medium leading-relaxed">
              {typo('Le métal poli renvoie tout ce qui l’entoure, et un or jaune, un or rose ou un métal blanc ne réagissent pas de la même façon à la lumière. Une pierre facettée multiplie les points lumineux. En macro, une poussière ou une micro-rayure devient immédiatement visible, tandis que la faible profondeur de champ peut laisser une partie de la monture hors de la zone de netteté.')}
            </p>
          </div>
          <FigureVisuel
            visuel={V104_1_MACRO}
            sizes="(min-width: 640px) 480px, calc(100vw - 32px)"
            className="lg:col-span-7 lg:justify-self-end w-full max-w-[480px]"
          />
          <dl className="lg:col-span-5 divide-y divide-future-dusk-100 border-y border-future-dusk-100">
            {secteur.problematiques.items.map((item) => {
              const { terme, texte } = scinder(item);
              return (
                <div key={item} className="py-5">
                  <dt className="font-semibold text-heading-dark mb-1">{terme}</dt>
                  <dd className="text-neutral-medium leading-relaxed">{texte}</dd>
                </div>
              );
            })}
          </dl>
          <div className="lg:col-span-7 space-y-8">
            <figure>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <Image
                    src="/images/secteurs/bijoux/superfocus-mise-au-point-avant.avif"
                    alt="Bague en or vue en macro : la pierre est nette, le pavé de diamants à l’arrière est flou"
                    width={745}
                    height={695}
                    sizes="(min-width: 1024px) 340px, 46vw"
                    className="w-full h-auto rounded-md"
                  />
                  <p className="mt-2 text-sm text-neutral-medium">Mise au point sur la pierre.</p>
                </div>
                <div>
                  <Image
                    src="/images/secteurs/bijoux/superfocus-mise-au-point-arriere.avif"
                    alt="Même bague : seul l’arrière de l’anneau est net, le premier plan est flou"
                    width={745}
                    height={695}
                    sizes="(min-width: 1024px) 340px, 46vw"
                    className="w-full h-auto rounded-md"
                  />
                  <p className="mt-2 text-sm text-neutral-medium">Mise au point sur l’arrière de l’anneau.</p>
                </div>
              </div>
              <figcaption className="mt-4 text-sm text-neutral-medium">
                Le Superfocus d’Orbitvu Station enchaîne ces mises au point et les fusionne en une seule image, nette de la pierre jusqu’à l’arrière de l’anneau.
              </figcaption>
            </figure>
            {REEL_SUPERFOCUS && <FigureVisuel visuel={REEL_SUPERFOCUS} sizes="(min-width: 1024px) 700px, 92vw" />}
          </div>
        </div>
      </section>

      {/* ── C. Reprendre une collection : modèles et paramètres enregistrés.
          Visuel : trois pièces réelles (COLLECTION_TROIS_PIECES), au format bandeau 1600 × 520 d'origine. ── */}
      <section aria-labelledby="collection" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <h2 id="collection" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-8">
              {COLLECTION.titre}
            </h2>
            {COLLECTION.paragraphes.map(typo).map((p) => (
              <p key={p} className="text-lg text-neutral-medium leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
          <FigureVisuel
            visuel={COLLECTION_TROIS_PIECES}
            sizes="(min-width: 1280px) 680px, (min-width: 1024px) 56vw, calc(100vw - 32px)"
            className="lg:col-span-7"
          />
        </div>
      </section>

      {/* ── D. Le studio ── */}
      <section aria-labelledby="studio" className="bg-bg-warm-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Le vrai studio (visuel produit de la fiche, revenu ici depuis que le hero est éditorial) et la mise en
              place réelle de la bague ajourée du guide de focus stacking (étape 1 du guide : nettoyer la pièce, la
              poser au centre du plateau). */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-3 sm:gap-4 items-start">
            <figure>
              <Image
                src="/images/machines/alphashot-micro-v2.avif"
                alt="Studio photo Orbitvu Alphashot Micro Pro v2"
                width={1000}
                height={1000}
                sizes="(min-width: 1280px) 284px, (min-width: 1024px) 22vw, 46vw"
                className="w-full h-auto rounded-md"
              />
              <figcaption className="mt-2 text-sm text-neutral-medium">L’Alphashot Micro Pro v2.</figcaption>
            </figure>
            <figure>
              <Image
                src="/images/guides/67d991805e0a0980101b8a98.avif"
                alt="Main gantée posant une bague ajourée sur le plateau blanc du studio"
                width={1200}
                height={1200}
                sizes="(min-width: 1280px) 284px, (min-width: 1024px) 22vw, 46vw"
                className="w-full h-auto rounded-md"
              />
              <figcaption className="mt-2 text-sm text-neutral-medium">Mise en place au centre du plateau, après nettoyage.</figcaption>
            </figure>
          </div>
          <div className="lg:col-span-6">
            <h2 id="studio" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-8">
              {secteur.solutions.titre}
            </h2>
            <p className="text-lg text-neutral-medium leading-relaxed mb-6">{studio.description}</p>
            <ul className="space-y-3 mb-8">
              {studio.avantages.map((a) => (
                <li key={a} className="pl-5 border-l-2 border-very-peri-100 text-heading-dark leading-relaxed">
                  {a}
                </li>
              ))}
            </ul>
            <Link
              href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-micro-v2' } }}
              className="inline-flex items-center gap-2 font-semibold text-primary-orbitvu hover:text-very-peri-700 transition-colors"
            >
              Voir l’Alphashot Micro Pro v2 <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <p className="mt-10 pt-6 border-t border-future-dusk-100 text-neutral-medium leading-relaxed">
              {PRO_G2}{' '}
              <Link
                href={{ pathname: '/studio-photo/[slug]', params: { slug: 'alphashot-pro-g2' } }}
                className="font-semibold text-heading-dark underline underline-offset-4 decoration-very-peri-200 hover:text-primary-orbitvu"
              >
                Voir l’Alphashot Pro G2
              </Link>
            </p>
            <Link
              href="/studio-photo/selecteur-machines"
              className="mt-4 inline-flex items-center gap-2 text-neutral-medium underline underline-offset-4 decoration-very-peri-200 hover:text-primary-orbitvu"
            >
              Comparer tous les modèles <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── E. 360° (séquence sombre 1/2), formulé pour plusieurs familles de pièces. Texte seul tant que
          REEL_BAGUE_360 est vide. ── */}
      <section aria-labelledby="rotation" className="bg-future-dusk-950 py-20 lg:py-24">
        <div
          className={
            REEL_BAGUE_360
              ? 'max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center'
              : 'max-w-3xl mx-auto px-4 sm:px-6'
          }
        >
          <div className={REEL_BAGUE_360 ? 'lg:col-span-5' : ''}>
            <h2 id="rotation" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-white leading-[1.12] mb-8">
              {ROTATION.titre}
            </h2>
            {ROTATION.paragraphes.map((p) => (
              <p key={p} className="text-lg text-future-dusk-100 leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
          {REEL_BAGUE_360 && (
            <figure className="lg:col-span-7">
              <iframe
                src={REEL_BAGUE_360.src}
                title={REEL_BAGUE_360.title}
                loading="lazy"
                className="w-full aspect-square rounded-md bg-white"
              />
            </figure>
          )}
        </div>
      </section>

      {/* ── F. Retouche, IA quand elle sert (AI Masking, AI Retoucher), export ── */}
      <section aria-labelledby="retouche" className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h2 id="retouche" className="text-3xl lg:text-[2.2rem] font-heading font-bold text-heading-dark leading-[1.15] mb-6">
              {retouche.titre}
            </h2>
            {paragraphes(retouche.description).map((p) => (
              <p key={p} className="text-lg text-neutral-medium leading-relaxed mb-4 last:mb-0">
                {p}
              </p>
            ))}
          </div>
          <figure className="lg:col-span-6">
            <Image
              src="/images/guides/67d991839ee10799cae56458.avif"
              alt="Bague ajourée détourée, présentée sur un damier qui figure la transparence"
              width={1200}
              height={1200}
              sizes="(min-width: 1024px) 560px, 92vw"
              className="w-full h-auto max-w-[560px] mx-auto rounded-md"
            />
            {/* Provenance : guide « Comment prendre une photo nette d'un bijou sans fond ? » (Superfocus et IQ Mask).
                Ce n'est pas un résultat AI Masking. Même bague ajourée que la mise en place (section D) : les deux
                guides partagent la photo /images/guides/67d9917f5e0a0980101b8a65.avif. */}
            <figcaption className="mt-2 text-sm text-neutral-medium text-center">La bague ajourée posée plus haut, détourée avec l’IQ Mask d’Orbitvu Station.</figcaption>
          </figure>
        </div>
      </section>

      {/* ── G. Appel final (séquence sombre 2/2).
          PROPOSITION À VALIDER PAR SÉBASTIEN : la démonstration avec les pièces du client. ── */}
      <section id="tester" aria-labelledby="tester-titre" className="bg-future-dusk-950 py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 id="tester-titre" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-white leading-[1.12] mb-8">
              {secteur.cta.titre}
            </h2>
            {paragraphes(secteur.cta.description).map((p) => (
              <p key={p} className="text-lg text-future-dusk-100 leading-relaxed mb-4">
                {p}
              </p>
            ))}
            <Link
              href="/calculateur-roi"
              className="mt-6 inline-flex items-center gap-2 text-future-dusk-100 underline underline-offset-4 decoration-future-dusk-500 hover:text-white"
            >
              Estimer le retour sur investissement <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
          <div className="lg:col-span-7 bg-white rounded-xl p-6 lg:p-10">
            <h3 className="text-2xl font-heading font-bold text-heading-dark mb-6">Tester mon workflow</h3>
            <ContactForm
              locale={lang as 'fr' | 'en' | 'de-ch'}
              compact
              defaultRequestType="demo"
              hideRequestType
              defaultSector={lang === 'en' ? 'Watches, jewelry' : 'Horlogerie, bijouterie, joaillerie'}
            />
          </div>
        </div>
      </section>

      {/* ── H. Questions ── */}
      {faq.length > 0 && (
        <section aria-labelledby="questions" className="bg-bg-warm-white py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 id="questions" className="text-3xl font-heading font-bold text-heading-dark mb-8">
              Questions fréquentes
            </h2>
            <div className="divide-y divide-future-dusk-100 border-y border-future-dusk-100">
              {faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-semibold text-heading-dark">{item.question}</h3>
                    <span aria-hidden className="mt-1 text-primary-orbitvu text-xl leading-none transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-neutral-medium leading-relaxed">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── I. Guides et autres secteurs, version compacte ── */}
      <section aria-labelledby="ressources" className="bg-white py-16 lg:py-20 border-t border-future-dusk-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-12">
          {ressources.length > 0 && (
            <div>
              <h2 id="ressources" className="text-xl font-heading font-bold text-heading-dark mb-5">
                Guides et articles sur la photo de bijoux
              </h2>
              <ul className="space-y-3">
                {ressources.map((r) => (
                  <li key={r.title}>
                    <Link href={r.href} className="text-heading-dark hover:text-primary-orbitvu underline-offset-4 hover:underline">
                      {typo(r.title)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h2 className="text-xl font-heading font-bold text-heading-dark mb-5">Autres secteurs</h2>
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {autresSecteurs.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={{ pathname: '/industrie/[slug]', params: { slug: s.slug } }}
                    className="text-heading-dark hover:text-primary-orbitvu underline-offset-4 hover:underline"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/industrie" className="font-semibold text-primary-orbitvu underline-offset-4 hover:underline">
                  Tous les secteurs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <SchemaOrg
        schema={[
          organizationSchema(),
          breadcrumbSchema(breadcrumbs),
          serviceSchema({
            name: secteur.titre,
            description: secteur.description,
            serviceType: lang === 'en' ? 'Automated product photography' : 'Photographie produit automatisée',
            url: `https://www.packshot-creator.com/${lang}/industrie/${slug}`,
            category: secteur.titre.split(':')[0].trim(),
          }),
          ...(faq.length > 0 ? [faqSchema(faq)] : []),
        ]}
      />
    </>
  );
}
