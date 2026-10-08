import Image, { getImageProps } from 'next/image';
import { ArrowRight } from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/button';
import { SectorResources } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema, serviceSchema } from '@/components/seo/SchemaOrg';
import type { Secteur } from '@/data/secteurs';
import type { DEFAULT_SECTORS } from '@/components/shared/SectorGrid';
import SchemaEclairageBouteille from './SchemaEclairageBouteille';

/**
 * Hub /fr/industrie/vin-spiritueux : page dédiée, rendue à la place du gabarit commun des hubs
 * pour ce seul secteur (fr ; en servi en français, noindex, D9). /de-ch/branchen/wein garde le
 * gabarit commun.
 *
 * Texte : entrée `vin-spiritueux` de `data/secteurs.ts` (métadonnées, hero, matières, studios,
 * appel final, FAQ) et constantes ci-dessous (lumière, gamme, vues, workflow).
 * Registre des claims et provenance des visuels : docs/seo-geo/vin-spiritueux-2026-10-08/LANDING.md.
 *
 * Visuels : huit illustrations éditoriales générées par IA (outil natif ChatGPT, archive
 * PackshotCreator_Vin_Spiritueux_Wave2_Visuels fournie par Laurent le 08/10/2026), bouteilles et
 * étiquettes fictives. Statut EDITORIAL_ILLUSTRATION : elles ne prouvent aucun résultat ni aucune
 * capacité d'un studio Orbitvu. Légende toujours visible. Visuels machines : ceux des fiches.
 */

type Sector = (typeof DEFAULT_SECTORS)[number];

interface HubVinProps {
  secteur: Secteur;
  lang: string;
  slug: string;
  breadcrumbs: { name: string; url: string }[];
  autresSecteurs: Sector[];
}

type Visuel = { src: string; alt: string; width: number; height: number };

const DOSSIER = '/images/secteurs/vin';

/** Légende commune des illustrations (manifeste du 08/10/2026). */
const LEGENDE_IA = 'Illustration générée par IA, bouteilles et étiquettes fictives.';

const HERO: Visuel = {
  src: `${DOSSIER}/vin-i1-hero-cinq-bouteilles.avif`,
  alt: 'Cinq bouteilles fictives alignées sur fond blanc : vin rouge en verre sombre, vin blanc, vin doré dans une flûte en verre extra-blanc, carafe de spiritueux ambré à épaules carrées et petite flasque, étiquettes illustrées sans texte.',
  width: 1536,
  height: 1024,
};
/** Recadrage 4:5 du hero (sans nouvelle génération), servi sous 768 px. */
const HERO_MOBILE: Visuel = { ...HERO, src: `${DOSSIER}/vin-i1-hero-mobile-4x5.avif`, width: 800, height: 1000 };

/** Une illustration par matière, dans l'ordre des `problematiques.items`. */
const MATIERES: Visuel[] = [
  {
    src: `${DOSSIER}/vin-i2-c-verre-liquide-ambre.avif`,
    alt: 'Épaule d’un flacon en verre transparent rempli d’un liquide ambré, traversé par la lumière.',
    width: 1254,
    height: 1254,
  },
  {
    src: `${DOSSIER}/vin-i2-d-epaule-verre-sombre.avif`,
    alt: 'Épaule d’une bouteille en verre sombre soulignée par un reflet clair.',
    width: 1254,
    height: 1254,
  },
  {
    src: `${DOSSIER}/vin-i2-b-etiquette-texturee.avif`,
    alt: 'Étiquette fictive en papier texturé : collines en relief et soleil doré, sur une bouteille sombre.',
    width: 1254,
    height: 1254,
  },
  {
    src: `${DOSSIER}/vin-i2-a-capsule-metal.avif`,
    alt: 'Col d’une bouteille fictive coiffé d’une capsule à finition métallique brossée.',
    width: 1254,
    height: 1254,
  },
];

const GAMME_VISUEL: Visuel = {
  src: `${DOSSIER}/vin-i3-gamme-six-bouteilles.avif`,
  alt: 'Six bouteilles fictives de vin et de spiritueux alignées sur fond blanc, sous la même lumière, avec une même famille d’étiquettes illustrées.',
  width: 1536,
  height: 1024,
};

const VUES_VISUEL: Visuel = {
  src: `${DOSSIER}/vin-i4-vues-fiche-produit.avif`,
  alt: 'Le même flacon fictif de spiritueux en quatre vues : face, dos avec contre-étiquette illustrée, profil et vue de dessus du bouchon.',
  width: 1536,
  height: 1024,
};

/* Sources : orbitvu.com/blog/how-photograph-glass-products-e-commerce (23/02/2021) ;
   orbitvu.com/blog/product-photography-wine-bottles-alphashot-xl-wine (02/05/2016, principe du support) ;
   orbitvu.com/products/alphashot-xl-g2 (08/10/2026) ; orbitvu.com/software/orbitvu-station (08/10/2026) ;
   orbitvu.com/blog/honza-beer-challenge-… (15/05/2019, accessoires). */
const LUMIERE = {
  titre: 'Comment éclairer une bouteille sans perdre l’étiquette',
  reponse:
    'Pour photographier une bouteille de vin, on privilégie une lumière diffuse : une lumière directe de face crée des reflets francs sur le verre. Le contre-jour fait apparaître la transparence et la couleur du liquide ; des lumières latérales soulignent la forme ; une lumière dirigée vers l’étiquette compense l’assombrissement dû au contre-jour. Sur une bouteille sombre, un support surélevé évite le reflet du plateau, et des surfaces sombres sur les côtés soulignent les bords.',
  nuance:
    'L’équilibre entre ces sources se règle bouteille par bouteille : les formes complexes, comme certains flacons de spiritueux, demandent davantage de lumière d’appoint.',
  studio: 'Dans un studio Orbitvu, ces réglages se retrouvent d’une séance à l’autre :',
  points: [
    'la lumière se pilote depuis le logiciel Orbitvu Station ; sur l’Alphashot XL G2, chacun des 170 panneaux LED se règle en direction et en intensité ;',
    'un support bouteille, proposé en accessoire, surélève le produit ; Orbitvu Station détecte et retire de l’image les supports transparents ;',
    'des accessoires antireflets et un cache noir limitent les reflets de l’environnement ;',
    'le réglage retenu s’enregistre dans un modèle, avec ceux de l’appareil photo et du traitement.',
  ],
};

/* Sources : article Orbitvu du 15/05/2019 (contenu d'un modèle) ; orbitvu.com/software/orbitvu-station
   (« Keep a database of templates for different products », « Apply one correction to any number of
   images at once ») ; captures des guides PSC (rotation de 6 à 180 images, export HTML5 ou vidéo) ;
   orbitvu.com/products/alphashot-xl-g2 (« Top Camera Mount for overhead and close-up shots »). */
const GAMME = {
  titre: 'Une gamme cohérente, sous tous les angles',
  paragraphes: [
    'Bordelaise, bourguignonne, flûte, flacon de spiritueux : d’une référence à l’autre, la hauteur, le diamètre, la teinte du verre et les finitions changent. Le rendu de la gamme, lui, doit rester homogène.',
    'Un modèle Orbitvu Station mémorise le nombre d’images, la lumière, les angles, la position de l’appareil, l’ouverture, la vitesse et le détourage. Il donne une base de capture cohérente, que l’on ajuste selon la forme, les dimensions, le verre et les finitions de chaque bouteille. Station conserve un modèle par type de produit : un par format, si votre gamme l’exige. Une correction peut ensuite s’appliquer à toute une série d’images.',
  ],
  legende: `${LEGENDE_IA} Elle figure une présentation homogène, pas le résultat d’un réglage de studio.`,
  vuesTitre: 'Les vues dont vos fiches ont besoin',
  vuesIntro: 'Selon vos fiches produit, un même passage peut produire :',
  vues: [
    'la face, la contre-étiquette et le profil ;',
    'une vue de dessus de la capsule, si le studio est équipé d’un support d’appareil photo supérieur ;',
    'une rotation à 360°, de 6 à 180 images, exportée en HTML5 ou en vidéo ;',
    'de courtes vidéos du produit.',
  ],
  usages: 'Les mêmes fichiers servent à la fiche produit, au catalogue et aux visuels transmis aux distributeurs et aux importateurs.',
  vuesLegende: 'Illustration générée par IA, flacon et étiquettes fictifs. Vues conceptuelles, sans correspondance géométrique mesurée.',
};

/* D2. Sources : guide Orbitvu 2021 (préparation, gants en coton) ; article Orbitvu 2019 (le logiciel pilote
   l'appareil, la lumière et le plateau) ; orbitvu.com/software/orbitvu-station et /software/ai (IQ Mask,
   AI Masking, publication) ; orbitvu.com/blog/ai-retoucher-remove-reflections-fix-blemishes (14/07/2026 :
   reflets forts sur le verre, retouche manuelle possible) ; orbitvu.com/blog/what-is-ai-ocr-how-does-it-work
   (23/07/2026 : plusieurs vues, prévisualisation) ; note Orbitvu Station 26.2 (23/06/2026 : bêta, abonnement). */
const WORKFLOW = {
  titre: 'De la bouteille aux fichiers publiés',
  intro:
    'La photographie réelle de la bouteille reste le point de départ. L’opérateur intervient à chaque étape où un choix ou un contrôle est nécessaire.',
  etapes: [
    { titre: 'Préparer', texte: 'Dépoussiérer la bouteille et la manipuler avec des gants en coton : le verre garde chaque trace.', operateur: true },
    { titre: 'Placer', texte: 'Poser la bouteille au centre du plateau tournant, sur son support si nécessaire.', operateur: true },
    { titre: 'Capturer', texte: 'Lancer le modèle : photos, rotation à 360°, vidéo. Le logiciel pilote la lumière, l’appareil et le plateau.', operateur: false },
    { titre: 'Détourer', texte: 'Orbitvu Station retire le fond pendant la prise de vue, par une seconde exposition (IQ Mask) ou par l’IA (AI Masking), y compris en mode transparent. L’opérateur contrôle le résultat à l’écran.', operateur: true },
    { titre: 'Retoucher', texte: 'AI Retoucher peut atténuer des reflets indésirables, nettoyer des imperfections et ajuster les couleurs, en partant de la photo réelle. Orbitvu précise que des reflets forts sur le verre peuvent demander une retouche manuelle : l’opérateur valide le résultat.', operateur: true },
    { titre: 'Vérifier les données d’étiquette (option)', texte: 'AI OCR lit le texte imprimé sur plusieurs vues d’une même bouteille et le range dans des champs. L’opérateur vérifie les données avant de les enregistrer.', operateur: true },
    { titre: 'Publier', texte: 'Exporter les formats voulus, ou publier vers Shopify, Shopware, Magento, PrestaShop ou WooCommerce.', operateur: false },
  ],
  note: 'Les fonctions IA d’Orbitvu Station sont réservées aux abonnements. AI OCR et AI Retoucher ont été annoncés en bêta en juin 2026.',
};

/** Studios recommandés : visuels des fiches (l'Alphashot XL Pro v2 partage le visuel de l'XL v2, `10ade46`). */
const STUDIOS = [
  { id: 'alphashot-xl-pro-v2', image: { src: '/images/machines/alphashot-xl.avif', width: 1000, height: 1000 }, lien: 'Voir l’Alphashot XL Pro v2' },
  { id: 'alphashot-xl-g2', image: { src: '/images/machines/alphashot-xl-g2.avif', width: 1600, height: 893 }, lien: 'Voir l’Alphashot XL G2' },
] as const;

const STUDIOS_INTRO =
  'Nous recommandons deux studios pour les bouteilles. Le choix se fait avec vous, à partir de vos références : hauteur et poids des bouteilles, nombre de références, vues souhaitées, besoin de données d’étiquette ou de mesures.';

/** « Terme : texte » → { terme, texte }. */
function scinder(item: string) {
  const i = item.indexOf(' : ');
  if (i === -1) return { terme: '', texte: item };
  const texte = item.slice(i + 3);
  return { terme: item.slice(0, i), texte: texte.charAt(0).toUpperCase() + texte.slice(1) };
}

/** Espace insécable avant « : ; ! ? » : la ponctuation ne part jamais seule en début de ligne. */
const typo = (texte: string) => texte.replace(/ ([:;!?])/g, ' $1');

const paragraphes = (texte: string) => texte.split('\n\n').map(typo);

function Figure({
  visuel,
  sizes,
  legende,
  className = '',
}: {
  visuel: Visuel;
  sizes: string;
  legende: string;
  className?: string;
}) {
  return (
    <figure className={className}>
      <Image
        src={visuel.src}
        alt={visuel.alt}
        width={visuel.width}
        height={visuel.height}
        sizes={sizes}
        className="w-full h-auto rounded-lg"
      />
      <figcaption className="mt-3 text-sm text-neutral-medium">{typo(legende)}</figcaption>
    </figure>
  );
}

/** Hero : découpe 4:5 sous 768 px, composition 3:2 au-delà (direction artistique, getImageProps). */
function HeroVisuel() {
  const commun = {
    alt: HERO.alt,
    sizes: '(min-width: 1280px) 584px, (min-width: 1024px) 45vw, (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)',
    priority: true,
  };
  const { props: { srcSet: srcSetLarge } } = getImageProps({ ...commun, src: HERO.src, width: HERO.width, height: HERO.height });
  const { props: { srcSet: srcSetMobile, ...img } } = getImageProps({
    ...commun,
    src: HERO_MOBILE.src,
    width: HERO_MOBILE.width,
    height: HERO_MOBILE.height,
  });
  return (
    <figure>
      <picture>
        <source media="(min-width: 768px)" srcSet={srcSetLarge} width={HERO.width} height={HERO.height} />
        <source media="(max-width: 767px)" srcSet={srcSetMobile} width={HERO_MOBILE.width} height={HERO_MOBILE.height} />
        <img {...img} alt={HERO.alt} className="block w-full h-auto rounded-lg" />
      </picture>
      <figcaption className="mt-3 text-sm text-neutral-medium">{LEGENDE_IA}</figcaption>
    </figure>
  );
}

export default function HubVin({ secteur, lang, slug, breadcrumbs, autresSecteurs }: HubVinProps) {
  const [intro, ...introSuite] = paragraphes(secteur.hero.description);
  const matieres = secteur.problematiques.items.map(scinder);
  const faq = (secteur.faq ?? []).map((q) => ({ question: typo(q.question), answer: typo(q.answer) }));

  return (
    <>
      {/* ── A. Hero. Mobile : surtitre, H1, introduction, appels, puis le visuel 4:5.
          Desktop : texte à gauche, visuel 3:2 à droite. ── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-16 lg:pt-16 lg:pb-24 xl:pt-20 grid lg:grid-cols-12 gap-x-10 xl:gap-x-16 gap-y-10 items-center">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary-orbitvu mb-5 lg:mb-6">
              {secteur.hero.sousTitre}
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[2.75rem] xl:text-[3.4rem] font-heading font-bold text-heading-dark leading-[1.08] tracking-tight">
              {typo(secteur.hero.titre)}
            </h1>
            <p className="mt-6 lg:mt-8 text-lg text-neutral-medium leading-relaxed max-w-xl">{intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a
                href="#demonstration"
                className="inline-flex items-center justify-center rounded-lg bg-primary-orbitvu px-6 py-3.5 text-base font-semibold text-white hover:bg-very-peri-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-orbitvu transition-colors"
              >
                Demander une démonstration
              </a>
              <a
                href="#studios"
                className="inline-flex items-center gap-2 text-base font-semibold text-heading-dark hover:text-primary-orbitvu transition-colors"
              >
                Voir les deux studios <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            {introSuite.map((p) => (
              <p key={p} className="mt-8 text-sm text-neutral-medium leading-relaxed max-w-xl">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-6">
            <HeroVisuel />
          </div>
        </div>
      </section>

      {/* ── B. Matières : une illustration par contrainte (I2-A à I2-D). ── */}
      <section aria-labelledby="matieres" className="bg-bg-warm-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 id="matieres" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-6">
              {typo(secteur.problematiques.titre)}
            </h2>
            <p className="text-lg text-neutral-medium leading-relaxed">
              {typo('Sur une bouteille, chaque matière réagit à sa façon. Le réglage doit les traiter ensemble, sans en sacrifier une.')}
            </p>
          </div>
          {/* Sous 640 px : défilement horizontal (cartes à 80 % de la largeur, la suivante reste visible) ;
              au-delà : grille de 2 puis 4 colonnes. */}
          <ul
            tabIndex={0}
            aria-label="Quatre contraintes de prise de vue"
            className="mt-12 -mx-4 px-4 pb-4 flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 sm:mx-0 sm:px-0 sm:scroll-px-0 sm:pb-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-x-6 sm:gap-y-10 sm:overflow-visible focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-orbitvu"
          >
            {matieres.map((m, i) => (
              <li key={m.terme || i} className="w-[80%] shrink-0 snap-start sm:w-auto">
                {MATIERES[i] && (
                  <Image
                    src={MATIERES[i].src}
                    alt={MATIERES[i].alt}
                    width={MATIERES[i].width}
                    height={MATIERES[i].height}
                    sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) calc(50vw - 36px), 80vw"
                    className="w-full h-auto rounded-lg"
                  />
                )}
                <h3 className="mt-5 text-lg font-semibold text-heading-dark">{m.terme}</h3>
                <p className="mt-2 text-neutral-medium leading-relaxed">{typo(m.texte)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-neutral-medium">{LEGENDE_IA}</p>
        </div>
      </section>

      {/* ── C. Lumière : bloc réponse, réglages en studio, schéma D1. ── */}
      <section aria-labelledby="lumiere" className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-x-16 gap-y-12 items-start">
          <div className="lg:col-span-6">
            <h2 id="lumiere" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-8">
              {typo(LUMIERE.titre)}
            </h2>
            <p className="text-lg text-heading-dark leading-relaxed">{typo(LUMIERE.reponse)}</p>
            <p className="mt-4 text-neutral-medium leading-relaxed">{typo(LUMIERE.nuance)}</p>
            <p className="mt-8 font-semibold text-heading-dark">{typo(LUMIERE.studio)}</p>
            <ul className="mt-4 space-y-3">
              {LUMIERE.points.map((p) => (
                <li key={p} className="flex gap-3 text-neutral-medium leading-relaxed">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-orbitvu" />
                  <span>{typo(p)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <SchemaEclairageBouteille />
          </div>
        </div>
      </section>

      {/* ── D. Gamme (I3) et vues (I4). ── */}
      <section aria-labelledby="gamme" className="bg-bg-warm-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 id="gamme" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-6">
              {typo(GAMME.titre)}
            </h2>
            {GAMME.paragraphes.map((p) => (
              <p key={p} className="text-lg text-neutral-medium leading-relaxed mb-4">
                {typo(p)}
              </p>
            ))}
          </div>
          <Figure
            visuel={GAMME_VISUEL}
            legende={GAMME.legende}
            sizes="(min-width: 1280px) 1232px, calc(100vw - 32px)"
            className="mt-10"
          />
          <div className="mt-16 lg:mt-20 grid lg:grid-cols-12 gap-x-16 gap-y-10 items-center">
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-heading font-bold text-heading-dark mb-5">{typo(GAMME.vuesTitre)}</h3>
              <p className="text-neutral-medium leading-relaxed">{typo(GAMME.vuesIntro)}</p>
              <ul className="mt-4 space-y-3">
                {GAMME.vues.map((v) => (
                  <li key={v} className="flex gap-3 text-neutral-medium leading-relaxed">
                    <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-orbitvu" />
                    <span>{typo(v)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-neutral-medium leading-relaxed">{typo(GAMME.usages)}</p>
            </div>
            <Figure
              visuel={VUES_VISUEL}
              legende={GAMME.vuesLegende}
              sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, calc(100vw - 32px)"
              className="lg:col-span-7"
            />
          </div>
        </div>
      </section>

      {/* ── E. Workflow (D2), séquence sombre 1/2. ── */}
      <section aria-labelledby="workflow" className="bg-future-dusk-950 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 id="workflow" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-white leading-[1.12] mb-6">
              {typo(WORKFLOW.titre)}
            </h2>
            <p className="text-lg text-future-dusk-100 leading-relaxed">{typo(WORKFLOW.intro)}</p>
          </div>
          <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
            {WORKFLOW.etapes.map((e, i) => (
              <li key={e.titre} className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-very-peri-300">
                    <span className="sr-only">Étape </span>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {e.operateur && (
                    <span className="rounded-full border border-white/20 px-2.5 py-0.5 text-xs font-medium text-future-dusk-100">
                      Opérateur
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-lg font-semibold text-white">{typo(e.titre)}</h3>
                <p className="mt-2 text-future-dusk-100 leading-relaxed">{typo(e.texte)}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 text-sm text-future-dusk-200">{typo(WORKFLOW.note)}</p>
        </div>
      </section>

      {/* ── F. Studios recommandés. ── */}
      <section id="studios" aria-labelledby="studios-titre" className="bg-white py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <h2 id="studios-titre" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-heading-dark leading-[1.12] mb-6">
              {typo(secteur.solutions.titre)}
            </h2>
            <p className="text-lg text-neutral-medium leading-relaxed">{typo(STUDIOS_INTRO)}</p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            {secteur.solutions.items.map((studio, i) => {
              const s = STUDIOS[i];
              return (
                <article key={studio.titre} className="flex flex-col rounded-xl border border-future-dusk-100 bg-future-dusk-0 overflow-hidden">
                  {s && (
                    <div className="bg-white px-6 pt-6">
                      <Image
                        src={s.image.src}
                        alt={studio.titre}
                        width={s.image.width}
                        height={s.image.height}
                        sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, calc(100vw - 32px)"
                        className="mx-auto h-56 lg:h-64 w-auto object-contain"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6 lg:p-8">
                    <h3 className="text-2xl font-heading font-bold text-heading-dark">{studio.titre}</h3>
                    <p className="mt-3 text-neutral-medium leading-relaxed">{typo(studio.description)}</p>
                    <ul className="mt-5 space-y-2.5">
                      {studio.avantages.map((a) => (
                        <li key={a} className="flex gap-3 text-heading-dark leading-relaxed">
                          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-orbitvu" />
                          <span>{typo(a)}</span>
                        </li>
                      ))}
                    </ul>
                    {s && (
                      <Link
                        href={{ pathname: '/studio-photo/[slug]', params: { slug: s.id } }}
                        className="mt-auto pt-6 inline-flex items-center gap-2 font-semibold text-primary-orbitvu hover:text-very-peri-700"
                      >
                        {s.lien} <ArrowRight className="h-4 w-4" aria-hidden />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <div className="mt-10 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <Button asChild variant="outline" className="rounded-xl w-fit">
              <Link href="/studio-photo/selecteur-machines">
                Comparer tous les modèles <ArrowRight className="ml-2 h-4 w-4" aria-hidden />
              </Link>
            </Button>
            <Link
              href="/calculateur-roi"
              className="inline-flex items-center gap-2 text-heading-dark underline underline-offset-4 decoration-future-dusk-300 hover:text-primary-orbitvu"
            >
              Estimer votre retour sur investissement <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── G. Questions (FAQ visible = FAQPage). ── */}
      {faq.length > 0 && (
        <section aria-labelledby="questions" className="bg-bg-warm-white py-20 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <h2 id="questions" className="text-3xl lg:text-[2.2rem] font-heading font-bold text-heading-dark mb-8">
              Questions sur la photographie de bouteilles
            </h2>
            <div className="divide-y divide-future-dusk-100 border-y border-future-dusk-100">
              {faq.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-orbitvu [&::-webkit-details-marker]:hidden">
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

      {/* ── H. Demande de démonstration, séquence sombre 2/2. Parcours réel : ContactForm, type « demo ». ── */}
      <section id="demonstration" aria-labelledby="demonstration-titre" className="bg-future-dusk-950 py-20 lg:py-28 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <h2 id="demonstration-titre" className="text-3xl lg:text-[2.6rem] font-heading font-bold text-white leading-[1.12] mb-8">
              {typo(secteur.cta.titre)}
            </h2>
            {paragraphes(secteur.cta.description).map((p) => (
              <p key={p} className="text-lg text-future-dusk-100 leading-relaxed mb-4">
                {p}
              </p>
            ))}
          </div>
          <div className="lg:col-span-7 bg-white rounded-xl p-6 lg:p-10">
            <h3 className="text-2xl font-heading font-bold text-heading-dark mb-6">Demander une démonstration</h3>
            <ContactForm
              locale={lang as 'fr' | 'en' | 'de-ch'}
              compact
              defaultRequestType="demo"
              defaultSector={lang === 'en' ? 'Wine & spirits' : 'Vins, spiritueux'}
            />
          </div>
        </div>
      </section>

      {/* ── I. Lien existant vers la landing e-commerce (F5), même cible et même libellé que le gabarit :
          aucun lien entrant vers F5 ajouté ni retiré avant le 23/11/2026 (D37). ── */}
      <section className="py-12 bg-very-peri-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm text-future-dusk-500 mb-3">
            {lang === 'en' ? 'Specialized guide for your sector' : 'Guide spécialisé pour votre secteur'}
          </p>
          <Link
            href="/packshot-e-commerce"
            className="inline-flex items-center gap-2 text-lg font-heading font-bold text-very-peri-600 hover:text-very-peri-700 transition-colors"
          >
            {lang === 'en' ? 'E-commerce Packshot' : 'Packshot E-commerce'}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>
        </div>
      </section>

      {/* ── J. Ressources du secteur (table de maillage existante) et autres secteurs. ── */}
      <SectorResources slug={slug} lang={lang} />

      <section aria-labelledby="autres-secteurs" className="bg-white py-16 lg:py-20 border-t border-future-dusk-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 id="autres-secteurs" className="text-xl font-heading font-bold text-heading-dark mb-5">
            Autres secteurs
          </h2>
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
