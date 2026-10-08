import Image, { getImageProps } from 'next/image';
import dynamic from 'next/dynamic';
import type { ComponentProps } from 'react';
import {
  ArrowDown, ArrowRight, Calculator, Camera, ChevronDown, ExternalLink, Images, Layers, Package, Send, Sparkles,
} from 'lucide-react';
import { NavLink as Link } from '@/components/layout/NavLink';
import { Button } from '@/components/ui/button';
import { HeroSection, HeroVideoPanel } from '@/components/hero';
import { ContactForm } from '@/components/forms/ContactForm';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema, serviceSchema } from '@/components/seo/SchemaOrg';

/**
 * Landing Studios photo automatisés, version FR (Wave 2, 08/10/2026).
 *
 * Texte : proposition revue par ChatGPT (« Studios_Wave2_L3_revue_ChatGPT_2026-10-08 »), intégrée sans
 * ses notes de préparation. Statut : en attente du circuit D15/D42 ; ni validé ni publié.
 * Source unique du texte FR : les constantes de ce fichier. EN et de-ch gardent l'ancien gabarit
 * de `page.tsx` (corrections d'intégrité ciblées seulement, aucune traduction).
 *
 * Fil : produit réel → capture → modèle de prise de vue → IA qui assiste → images et données → diffusion.
 * Sources des faits : registre L2 du 08/10 (orbitvu.com, référentiel D45, D32, page contact, calculateur).
 *
 * Interdits tenus : aucun nombre de systèmes, aucune cadence, aucun ROI chiffré, aucun prix, aucun
 * délai, aucune gratuité, aucun BlendAI, aucun logo client, aucun avis, aucun `id="calculateur-roi"` (D47).
 *
 * Médias : tous réels, aucun visuel généré. Droits de réutilisation non formalisés
 * (`ORBITVU_REUSE_PERMISSION = TO_CONFIRM`) : un bandeau le signale sur les Previews Vercel
 * seulement ; publication bloquée tant que les droits ne sont pas établis.
 */

const MachineSelector = dynamic(
  () => import('@/components/machine-selector/MachineSelector').then((mod) => ({ default: mod.MachineSelector })),
  { loading: () => <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" /> },
);

/** Le lien vers la page IA n'est rendu qu'une fois la landing IA Orbitvu (#105) publiée et vérifiée sur `www`. */
const LIEN_PAGE_IA_PUBLIEE = false;

/** Marqueurs de statut des médias : Previews Vercel et développement local seulement, jamais en production. */
const PREVISUALISATION = process.env.VERCEL_ENV === 'preview' || process.env.NODE_ENV === 'development';

type Href = ComponentProps<typeof Link>['href'];
const fiche = (slug: string): Href => ({ pathname: '/studio-photo/[slug]', params: { slug } });

type Fichier = { src: string; w: number; h: number };
type Visuel = Fichier & { mobile?: Fichier; statut: string };

const VIDEO_GAMME = {
  // V01 : film de la gamme Orbitvu fourni par Sébastien (accueil, #95) ; affiche fixe seule sous 768 px
  // et avec `prefers-reduced-motion` (comportement de HeroVideoPanel, inchangé).
  src: 'https://videos.packshot-creator.com/orbitvu-gamme-2026-1080p.mp4',
  poster: '/images/hero/orbitvu-gamme-2026-poster.avif',
};

const VISUELS = {
  // V05 : photo réelle (import Webflow) ; provenance et droits TO_CONFIRM.
  operatrice: { src: '/images/blog/6787d343815aa433b695f1bd.avif', w: 2414, h: 1508, statut: 'V05 · provenance et droits à confirmer' },
  // V02 : capture Orbitvu Station publiée sur la fiche XL G2 ; découpe mobile = recadrage seul.
  station: {
    src: '/images/machines/alphashot-xl-g2/soft-station-capture.avif', w: 1400, h: 875,
    mobile: { src: '/images/studios/station-capture-mobile.avif', w: 600, h: 750 },
    statut: 'V02 · visuel Orbitvu, droits de réutilisation à confirmer',
  },
  // V03 : capture AI OCR publiée sur la fiche XL G2 ; découpe mobile = recadrage seul.
  ocr: {
    src: '/images/machines/alphashot-xl-g2/soft-ai-ocr.avif', w: 1400, h: 945,
    mobile: { src: '/images/studios/station-ai-ocr-mobile.avif', w: 680, h: 850 },
    statut: 'V03 · visuel Orbitvu, droits de réutilisation à confirmer',
  },
} satisfies Record<string, Visuel>;

/** V12 : packshots publiés sur les fiches machines ; provenance et droits TO_CONFIRM. */
const EXEMPLES = [
  { src: '/images/machines/alphashot-pro-g2/packshot-mascara.avif', w: 1080, h: 1080, alt: 'Mascara rouge sur fond blanc', machine: 'Alphashot Pro G2' },
  { src: '/images/machines/alphashot-360/packshot-camera.avif', w: 1080, h: 1080, alt: 'Appareil photo instantané blanc sur fond blanc', machine: 'Alphashot 360' },
  { src: '/images/machines/alphastudio-compact/packshot-chair.avif', w: 1080, h: 1080, alt: 'Fauteuil jaune sur fond blanc', machine: 'Alphastudio Compact' },
  { src: '/images/machines/alphatable-alphadesk/packshot-coat.avif', w: 1200, h: 1200, alt: 'Manteau rose présenté à plat sur fond blanc', machine: 'Alphatable' },
] as const;

const CHAINE = [
  { titre: 'Le produit réel', texte: 'Il est posé dans le studio, tel qu’il sera vendu.', ancre: 'a-quoi-sert', icone: Package },
  { titre: 'La capture', texte: 'L’éclairage et l’appareil sont pilotés par le logiciel.', ancre: 'capture', icone: Camera },
  { titre: 'Le modèle de prise de vue', texte: 'Les réglages sont conservés pour des références comparables.', ancre: 'collection', icone: Layers },
  { titre: 'L’IA qui assiste', texte: 'Détourage, retouche, lecture d’étiquette.', ancre: 'ia', icone: Sparkles },
  { titre: 'Les images et les données', texte: 'Photos, 360°, vidéo et, selon l’équipement, mesures ou données produit.', ancre: 'images', icone: Images },
  { titre: 'La diffusion', texte: 'Les fichiers partent vers votre boutique ou votre stockage.', ancre: 'diffusion', icone: Send },
] as const;

const COLLECTION = ['Réglage de référence', 'Nouvelles références', 'Ajustement si nécessaire', 'Contrôle', 'Images homogènes'] as const;

const ROLE_STUDIO = [
  'éclairent le produit selon des réglages enregistrés dans un modèle de prise de vue ;',
  'pilotent des appareils Canon compatibles reliés en USB ; plusieurs appareils peuvent être intégrés dans certaines configurations ;',
  'déclenchent les photos, les séquences ou la vidéo ;',
  'appliquent les traitements prévus : détourage, retouche, export.',
] as const;

const ROLE_OPERATEUR = [
  'prépare le produit : nettoyage, mise en forme, étiquettes ;',
  'le place et choisit le modèle de prise de vue ;',
  'contrôle l’image à l’écran et ajuste si besoin ;',
  'valide les images avant leur envoi.',
] as const;

const FONCTIONS_IA = [
  { nom: 'AI Photo Assistant', texte: 'reconnaît le type de produit et propose plusieurs réglages d’éclairage. Disponible sur l’Alphashot Pro G2 et l’Alphashot XL G2.' },
  { nom: 'AI Masking', texte: 'aide à détacher le produit de son fond pendant la capture, avec vérification du résultat.' },
  { nom: 'AI Retoucher', texte: 'aide à atténuer certains reflets, corriger des imperfections, ajuster le rendu des couleurs ou ajouter une ombre. Des retouches manuelles peuvent rester nécessaires.' },
  { nom: 'AI OCR', texte: 'propose des informations extraites du texte visible sur le produit ou son emballage, que l’opérateur doit vérifier.' },
] as const;

const CRITERES = [
  'les dimensions et le poids de vos plus grands produits ;',
  'les visuels attendus : photo fixe, 360°, vidéo, mode ;',
  'le nombre de références à photographier et leur rythme d’arrivée ;',
  'la place disponible et l’organisation de votre équipe.',
] as const;

const PREREQUIS = [
  { titre: 'Un appareil Canon compatible.', texte: 'Consultez la liste officielle Orbitvu actualisée avant l’achat : lors du contrôle du 08/10/2026, elle comportait des modèles EOS R, mais pas les EOS 6D et 5D Mark III.' },
  { titre: 'Une liaison USB', texte: 'entre l’appareil et le poste : Orbitvu n’annonce pas de liaison sans fil.' },
  { titre: 'De la place.', texte: 'L’encombrement varie fortement d’un modèle à l’autre ; chaque fiche l’indique.' },
  { titre: 'Un opérateur formé.', texte: 'La préparation des produits, les ajustements et la validation des images restent des gestes humains.' },
  { titre: 'L’offre logicielle.', texte: 'Les fonctions d’IA dépendent de l’offre Orbitvu Station.' },
] as const;

/**
 * FAQ visible = FAQPage (7 questions). `lien.texte` est un extrait exact de la réponse : il devient un lien
 * dans la page, et le texte transmis à FAQPage reste identique au texte visible.
 */
type QuestionFaq = { q: string; r: string; lien?: { texte: string; href: Href } };
const FAQ: readonly QuestionFaq[] = [
  {
    q: 'Faut-il être photographe pour utiliser un studio automatisé ?',
    r: 'Il n’est pas nécessaire d’être photographe professionnel, mais une formation à l’équipement et une bonne préparation des produits sont importantes. L’opérateur positionne le produit, choisit et ajuste un modèle de prise de vue, puis contrôle les images. L’IA peut l’assister ; elle ne valide pas le rendu à sa place.',
  },
  {
    q: 'Quels produits peut-on photographier ?',
    r: 'Cela dépend du modèle. L’Alphashot Pro G2 accepte des objets jusqu’à 35 × 35 × 40 cm et 10 kg, l’Alphashot XL G2 jusqu’à 60 × 40 × 70 cm et 25 kg. Des studios dédiés existent pour la mode, le mobilier, les vélos et les très grands objets. La compatibilité des produits doit être vérifiée dans les fiches techniques à jour.',
  },
  {
    q: 'Peut-on réaliser des vues à 360° ?',
    r: 'Oui, selon le modèle. Orbitvu Station produit des photos fixes, des vues à 360° et de la vidéo. Les fiches machines, dont celle de l’Alphashot 360, précisent ce que permet chaque modèle.',
    lien: { texte: 'celle de l’Alphashot 360', href: fiche('alphashot-360') },
  },
  {
    q: 'Quel appareil photo utiliser ?',
    r: 'Un appareil Canon figurant dans le guide officiel de compatibilité Orbitvu, à vérifier à la date de votre projet. Au 08/10/2026, les modèles indiqués appartenaient à la gamme EOS R ; les EOS 6D et 5D Mark III n’étaient pas pris en charge. L’appareil se relie au poste en USB.',
  },
  {
    q: 'Que comprend le coût d’un projet ?',
    r: 'Le budget comprend la machine, la livraison et l’installation facturées en supplément, la formation proposée séparément si elle vous est utile, l’appareil photo compatible nécessaire et l’abonnement logiciel correspondant aux fonctions retenues. Le détail dépend du projet.',
  },
  {
    q: 'Peut-on voir un studio avant de décider ?',
    r: 'Oui. Une découverte est possible à distance et une visite du showroom peut être organisée sur rendez-vous. Vous pouvez présenter vos propres produits afin de discuter de leurs contraintes et des solutions adaptées, sans présumer du résultat de la prise de vue.',
  },
  {
    q: 'Comment estimer la rentabilité d’un studio ?',
    r: 'Avec le calculateur ROI : il part de votre production actuelle et calcule les économies, le temps libéré et le retour sur investissement avec vos chiffres.',
    lien: { texte: 'le calculateur ROI', href: '/calculateur-roi' },
  },
];

const CONTENEUR = 'max-w-7xl mx-auto px-4 sm:px-6';
const SECTION = 'py-16 lg:py-24 scroll-mt-20';
const H2 = 'text-3xl lg:text-4xl font-heading font-bold text-heading-dark leading-tight mb-5 text-balance';
const PARAGRAPHE = 'text-lg text-neutral-medium leading-relaxed';
const LIEN = 'inline-flex items-center gap-1.5 font-semibold text-very-peri-600 hover:text-very-peri-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400 rounded';

function ReponseFaq({ item }: { item: QuestionFaq }) {
  if (!item.lien) return <>{item.r}</>;
  const [avant, apres] = item.r.split(item.lien.texte);
  return (
    <>
      {avant}
      <Link href={item.lien.href} className="font-semibold text-very-peri-600 underline underline-offset-4 hover:text-very-peri-700">
        {item.lien.texte}
      </Link>
      {apres}
    </>
  );
}

function StatutMedia({ statut }: { statut: string }) {
  if (!PREVISUALISATION) return null;
  return (
    <span className="absolute left-2 top-2 z-10 rounded bg-amber-100 px-2 py-1 text-xs font-semibold text-amber-900 shadow">
      Préversion · {statut}
    </span>
  );
}

function Figure({ visuel, alt, legende, sizes }: { visuel: Visuel; alt: string; legende: string; sizes: string }) {
  const m = visuel.mobile;
  let image;
  if (m) {
    // Direction artistique : capture entière à partir de 768 px, zone utile recadrée en dessous.
    const commun = { alt, sizes, loading: 'lazy' as const };
    const { props: { srcSet: srcSetLarge } } = getImageProps({ ...commun, src: visuel.src, width: visuel.w, height: visuel.h });
    const { props: { srcSet: srcSetMobile, ...img } } = getImageProps({ ...commun, src: m.src, width: m.w, height: m.h });
    image = (
      <picture>
        <source media="(min-width: 768px)" srcSet={srcSetLarge} width={visuel.w} height={visuel.h} />
        <source media="(max-width: 767px)" srcSet={srcSetMobile} width={m.w} height={m.h} />
        <img {...img} alt={alt} className="block w-full h-auto" />
      </picture>
    );
  } else {
    image = <Image src={visuel.src} alt={alt} width={visuel.w} height={visuel.h} sizes={sizes} loading="lazy" className="block w-full h-auto" />;
  }
  return (
    <figure>
      <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        <StatutMedia statut={visuel.statut} />
        {image}
      </div>
      <figcaption className="mt-2 text-sm text-neutral-medium leading-relaxed">{legende}</figcaption>
    </figure>
  );
}

/** S1 : chaîne de production, navigation statique (forme C de D44), sans élément collant. */
function Chaine() {
  return (
    <nav aria-labelledby="chaine-titre" className="bg-future-dusk-0 border-b border-neutral-100">
      <div className={`${CONTENEUR} py-10 lg:py-14`}>
        <h2 id="chaine-titre" className="text-2xl lg:text-3xl font-heading font-bold text-heading-dark mb-6 text-balance">
          De votre produit à votre fiche produit
        </h2>
        <ol className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {CHAINE.map((etape, i) => {
            const Icone = etape.icone;
            return (
              <li key={etape.ancre} className="relative">
                <a
                  href={`#${etape.ancre}`}
                  className="group flex h-full flex-col gap-2 rounded-xl border border-neutral-200 bg-white p-3 sm:p-4 transition-colors hover:border-very-peri-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400"
                >
                  <span className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-very-peri-100 text-very-peri-600" aria-hidden="true">
                      <Icone className="h-5 w-5" />
                    </span>
                    <span className="text-xs font-semibold text-very-peri-600 tabular-nums" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <span className="font-semibold text-heading-dark leading-snug group-hover:text-very-peri-700">{etape.titre}</span>
                  <span className="hidden sm:block text-sm text-neutral-medium leading-snug">{etape.texte}</span>
                </a>
                {i < CHAINE.length - 1 && (
                  <ArrowRight className="absolute -right-3.5 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-very-peri-300 lg:block" aria-hidden="true" />
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

/** S2 : collection reproductible, schéma HTML ; vertical sous 768 px. */
function SchemaCollection() {
  return (
    <ol aria-label="Étapes d’une collection reproductible" className="mt-8 flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-3">
      {COLLECTION.map((etape, i) => (
        <li key={etape} className="flex flex-col items-start gap-2 md:flex-row md:items-center md:gap-3">
          <span className="rounded-lg border border-neutral-200 bg-future-dusk-0 px-4 py-2.5 text-sm font-semibold text-heading-dark">
            <span className="mr-2 text-very-peri-600 tabular-nums" aria-hidden="true">{i + 1}.</span>
            {etape}
          </span>
          {i < COLLECTION.length - 1 && (
            <>
              <ArrowDown className="ml-4 h-4 w-4 text-very-peri-300 md:hidden" aria-hidden="true" />
              <ArrowRight className="hidden h-4 w-4 text-very-peri-300 md:block" aria-hidden="true" />
            </>
          )}
        </li>
      ))}
    </ol>
  );
}

export default function LandingStudios({ lang }: { lang: 'fr' }) {
  const url = `https://www.packshot-creator.com/${lang}/studios-photo-automatises`;

  return (
    <>
      {/* 1. Hero : film réel de la gamme ; CTA principal vers la démonstration. */}
      <HeroSection
        layout="split"
        badge={{ label: 'Distributeur officiel Orbitvu — France et Suisse', colorClass: 'bg-amber-500/15 text-amber-300' }}
        title="Studio photo automatisé : produisez vos packshots en interne."
        subtitle="Un studio Orbitvu associe un environnement de prise de vue piloté par logiciel à un workflow de traitement. Votre équipe prépare les produits, enregistre des réglages réutilisables, les ajuste selon les références et contrôle les images avant leur diffusion."
        ctas={[
          { label: 'Demander une démonstration', href: '#demonstration', variant: 'primary' },
          { label: 'Comparer les machines', href: '#studios', variant: 'secondary' },
        ]}
        media={
          <figure className="relative">
            <StatutMedia statut="V01 · film Orbitvu, droits de réutilisation à confirmer" />
            <HeroVideoPanel
              src={VIDEO_GAMME.src}
              poster={VIDEO_GAMME.poster}
              title="Studios photo Orbitvu : présentation de la gamme"
              labels={{ pause: 'Mettre la vidéo en pause', play: 'Lire la vidéo' }}
            />
            <figcaption className="mt-2 text-sm text-future-dusk-300">Film de présentation de la gamme Orbitvu.</figcaption>
          </figure>
        }
      />

      {/* 2. S1 : chaîne de production. */}
      <Chaine />

      {/* 3. À quoi sert un studio photo automatisé. */}
      <section id="a-quoi-sert" className={`${SECTION} bg-white`}>
        <div className={`${CONTENEUR} grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-center`}>
          <div>
            <h2 className={H2}>À quoi sert un studio photo automatisé ?</h2>
            <p className={`${PARAGRAPHE} mb-4`}>
              Il permet à votre équipe de photographier vos produits en interne avec une méthode de capture reproductible.
              Lorsqu’une nouvelle référence arrive, vous repartez d’un modèle de prise de vue existant et ajustez ce qui doit
              l’être pour conserver une présentation cohérente avec le catalogue.
            </p>
            <p className={`${PARAGRAPHE} mb-6`}>
              PackshotCreator n’est pas une agence photo. Distributeur officiel Orbitvu, nous vous conseillons sur le choix de
              l’équipement. La livraison et l’installation sont facturées en supplément ; la formation est proposée séparément.
              C’est votre équipe qui réalise les prises de vue.
            </p>
            <aside className="rounded-xl bg-future-dusk-0 border border-neutral-100 p-5">
              <h3 className="font-heading font-semibold text-heading-dark mb-1">Quand un prestataire reste plus adapté</h3>
              <p className="text-neutral-medium leading-relaxed">
                Peu de références par an, des mises en scène créatives, ou des produits hors des dimensions des studios.
              </p>
            </aside>
          </div>
          <Figure
            visuel={VISUELS.operatrice}
            alt="Opératrice devant un Alphashot Micro, l’écran du poste affichant une montre en cours de prise de vue"
            legende="Une opératrice prépare une prise de vue ; l’écran affiche Orbitvu Station."
            sizes="(min-width: 1024px) 600px, 100vw"
          />
        </div>
      </section>

      {/* 4. La machine et l'opérateur. */}
      <section id="capture" className={`${SECTION} bg-future-dusk-0`}>
        <div className={CONTENEUR}>
          <h2 className={H2}>Ce que fait la machine, ce que fait l’opérateur</h2>
          <div className="grid gap-5 md:grid-cols-2 mb-8">
            <div className="rounded-2xl bg-white border border-neutral-200 p-6">
              <h3 className="font-heading font-semibold text-heading-dark mb-3">Le studio et Orbitvu Station</h3>
              <ul className="list-disc pl-5 space-y-2 text-neutral-medium leading-relaxed">
                {ROLE_STUDIO.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-6">
              <h3 className="font-heading font-semibold text-heading-dark mb-3">L’opérateur</h3>
              <ul className="list-disc pl-5 space-y-2 text-neutral-medium leading-relaxed">
                {ROLE_OPERATEUR.map((r) => <li key={r}>{r}</li>)}
              </ul>
            </div>
          </div>
          <p className={`${PARAGRAPHE} mb-8`}>Orbitvu le résume ainsi : l’IA assiste, le choix final revient à l’opérateur.</p>
          <Figure
            visuel={VISUELS.station}
            alt="Capture d’écran d’Orbitvu Station pendant la prise de vue d’un sachet de café"
            legende="Orbitvu Station pendant une prise de vue (visuel Orbitvu)."
            sizes="(min-width: 1280px) 1232px, 100vw"
          />
          <p className="mt-4">
            <Link href={fiche('alphashot-xl-g2')} className={LIEN}>
              Voir l’Alphashot XL G2 en fonctionnement <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* 5. Une collection reproductible (S2). */}
      <section id="collection" className={`${SECTION} bg-white`}>
        <div className={CONTENEUR}>
          <h2 className={H2}>Photographier toute une collection avec les mêmes réglages</h2>
          <div className="max-w-3xl space-y-4">
            <p className={PARAGRAPHE}>
              Pour une famille de produits, l’opérateur prépare une première prise de vue et l’enregistre comme modèle. Les
              références comparables reprennent une base de cadrage, de lumière et de traitement. Les paramètres peuvent ensuite
              être adaptés au produit, et certaines corrections appliquées à un lot d’images.
            </p>
            <p className={PARAGRAPHE}>
              Les produits brillants, transparents ou de forme inhabituelle demandent souvent d’ajuster le modèle. L’ajustement
              se fait une fois, puis il sert aux références comparables.
            </p>
          </div>
          <SchemaCollection />
        </div>
      </section>

      {/* 6. L'IA qui assiste. */}
      <section id="ia" className={`${SECTION} bg-future-dusk-0`}>
        <div className={`${CONTENEUR} grid gap-10 lg:grid-cols-2 lg:gap-16 lg:items-start`}>
          <div className="lg:order-2">
            <h2 className={H2}>Ce que l’IA d’Orbitvu Station prend en charge</h2>
            <p className={`${PARAGRAPHE} mb-6`}>
              Les fonctions d’IA d’Orbitvu Station assistent la prise de vue ou le traitement d’images de produits réels. Leur
              disponibilité dépend des équipements et d’un abonnement Orbitvu Station ; l’opérateur vérifie le résultat.
            </p>
            <ul className="grid gap-3 sm:grid-cols-2">
              {FONCTIONS_IA.map((f) => (
                <li key={f.nom} className="rounded-xl bg-white border border-neutral-200 p-4 text-neutral-medium leading-relaxed">
                  <strong className="block font-semibold text-heading-dark">{f.nom}</strong>
                  {f.texte}
                </li>
              ))}
            </ul>
            {LIEN_PAGE_IA_PUBLIEE && (
              <p className="mt-6">
                <Link href="/ia-photo-produit" className={LIEN}>
                  Voir comment l’IA intervient dans Orbitvu Station <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </p>
            )}
          </div>
          <div className="lg:order-1">
            <Figure
              visuel={VISUELS.ocr}
              alt="Fenêtre AI OCR d’Orbitvu Station lisant l’étiquette d’un sachet de café"
              legende="Lecture d’une étiquette par AI OCR dans Orbitvu Station (visuel Orbitvu)."
              sizes="(min-width: 1024px) 600px, 100vw"
            />
          </div>
        </div>
      </section>

      {/* 7. Ce que vous obtenez. */}
      <section id="images" className={`${SECTION} bg-white`}>
        <div className={CONTENEUR}>
          <h2 className={H2}>Ce que vous obtenez à la sortie du studio</h2>
          <p className={`${PARAGRAPHE} max-w-3xl`}>
            Selon l’équipement et les réglages, un studio Orbitvu peut produire des photos fixes, des séquences, des vidéos ou des
            vues à 360°. Les mesures physiques sont réservées aux configurations qui les prennent en charge ; la lecture
            d’informations sur l’emballage par AI OCR est une fonction distincte, soumise à vérification.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {EXEMPLES.map((e) => (
              <li key={e.src}>
                <figure>
                  <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white">
                    <StatutMedia statut="V12 · à confirmer" />
                    <Image src={e.src} alt={e.alt} width={e.w} height={e.h} sizes="(min-width: 1024px) 296px, 50vw" loading="lazy" className="block w-full h-auto" />
                  </div>
                  <figcaption className="mt-2 text-sm text-neutral-medium">Exemple de résultat présenté par Orbitvu pour {e.machine}.</figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link href={fiche('alphashot-360')} className={LIEN}>
              Pour les vues à 360°, voir l’Alphashot 360 <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      {/* 8. La diffusion. */}
      <section id="diffusion" className={`${SECTION} bg-future-dusk-0`}>
        <div className={CONTENEUR}>
          <h2 className={H2}>Envoyer les images là où elles servent</h2>
          <p className={`${PARAGRAPHE} max-w-3xl`}>
            Orbitvu Station enregistre les fichiers sur votre poste ou dans le cloud, et peut les envoyer vers vos destinations
            e-commerce, web ou ERP. Orbitvu cite des connexions avec Shopify, Magento, Shopware et WooCommerce, et avec les
            stockages Amazon S3, Azure et Google Storage.
          </p>
        </div>
      </section>

      {/* 9. Choisir le studio : sélecteur existant, inchangé. */}
      <section id="studios" className={`${SECTION} bg-future-dusk-900 text-white`}>
        <div className={CONTENEUR}>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold leading-tight mb-5 text-balance">Choisir le studio adapté à vos produits</h2>
          <div className="grid gap-8 lg:grid-cols-2 mb-10">
            <div>
              <p className="text-lg text-future-dusk-200 mb-3">Quatre questions orientent le choix :</p>
              <ul className="list-disc pl-5 space-y-1.5 text-future-dusk-200 leading-relaxed">
                {CRITERES.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <p className="text-lg text-future-dusk-200 leading-relaxed">
              Deux repères publiés par Orbitvu : l’Alphashot Pro G2 accepte des objets jusqu’à 35 × 35 × 40 cm et 10 kg ;
              l’Alphashot XL G2, jusqu’à 60 × 40 × 70 cm et 25 kg. La gamme comprend aussi des studios pour la mode, le mobilier,
              les vélos et les très grands objets.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-4 sm:p-6 lg:p-10 shadow-2xl shadow-black/20 text-heading-dark">
            <p className="text-neutral-medium mb-6">
              Filtrez par taille de produit, niveau d’automatisation, secteur ou fonctionnalité, puis ouvrez la fiche de chaque machine.
            </p>
            <MachineSelector mode="display" showFilters={true} showPrices={false} locale={lang} />
            <p className="mt-6">
              <Link href="/besoins-photographie-produit" className={LIEN}>
                Pas sûr ? Identifiez votre besoin <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* 10. Prérequis. */}
      <section id="prerequis" className={`${SECTION} bg-white`}>
        <div className={CONTENEUR}>
          <h2 className={H2}>Avant de vous équiper</h2>
          <ul className="grid gap-4 md:grid-cols-2 max-w-5xl">
            {PREREQUIS.map((p) => (
              <li key={p.titre} className="rounded-xl border border-neutral-200 p-5 text-neutral-medium leading-relaxed">
                <strong className="font-semibold text-heading-dark">{p.titre}</strong> {p.texte}
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <a href="https://orbitvu.com/compatibility-guide" target="_blank" rel="noopener noreferrer" className={LIEN}>
              Guide de compatibilité Orbitvu <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </p>
        </div>
      </section>

      {/* 11. Coût complet, ROI, démonstration. */}
      <section id="projet" className={`${SECTION} bg-future-dusk-0`}>
        <div className={CONTENEUR}>
          <h2 className={H2}>Ce que comprend un projet</h2>
          <p className={`${PARAGRAPHE} max-w-3xl mb-3`}>
            Le budget d’un projet dépend du studio choisi, de la livraison et de l’installation facturées en supplément, ainsi que
            des options et de la formation, proposée séparément. Vérifiez également l’appareil photo compatible nécessaire et
            l’abonnement Orbitvu Station correspondant aux fonctions souhaitées.
          </p>
          <p className="mb-10">
            <Link href="/academy" className={LIEN}>
              Voir les formations <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </p>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 lg:p-8 flex flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-very-peri-100 text-very-peri-600 mb-4" aria-hidden="true">
                <Calculator className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-heading font-bold text-heading-dark mb-2">Calculer votre retour sur investissement</h3>
              <p className="text-neutral-medium leading-relaxed mb-6 flex-1">
                Le calculateur vous pose quelques questions sur votre production actuelle. Il calcule ensuite les économies, le
                temps libéré et le retour sur investissement à partir de vos chiffres.
              </p>
              <Button asChild size="lg" className="self-start bg-white text-very-peri-600 border border-very-peri-500 hover:bg-very-peri-50 rounded-xl px-6 h-12 font-semibold">
                <Link href="/calculateur-roi">Calculer mon ROI</Link>
              </Button>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-200 p-6 lg:p-8 flex flex-col">
              <h3 className="text-xl font-heading font-bold text-heading-dark mb-2">Voir un studio avant de décider</h3>
              <p className="text-neutral-medium leading-relaxed mb-6 flex-1">
                Une première présentation peut être organisée à distance. Une visite du showroom est possible sur rendez-vous,
                avec vos propres produits pour discuter des contraintes de prise de vue.
              </p>
              <Button asChild size="lg" className="self-start bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl px-6 h-12 font-semibold">
                <a href="#demonstration">Demander une démonstration</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ (= FAQPage). */}
      <section id="faq" className={`${SECTION} bg-white`}>
        <div className={`${CONTENEUR} max-w-4xl`}>
          <h2 className={H2}>Questions fréquentes</h2>
          <div className="space-y-3">
            {FAQ.map((item) => (
              <details key={item.q} className="group rounded-2xl border border-neutral-200 bg-white open:shadow-md open:border-very-peri-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 lg:p-6 [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400 rounded-2xl">
                  <h3 className="text-lg font-heading font-semibold text-heading-dark leading-snug">{item.q}</h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-future-dusk-400 transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
                </summary>
                <p className="px-5 pb-5 lg:px-6 lg:pb-6 text-neutral-medium leading-relaxed"><ReponseFaq item={item} /></p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Demande de démonstration : formulaire existant, type « demo ». */}
      <section id="demonstration" className={`${SECTION} bg-future-dusk-900`}>
        <div className={`${CONTENEUR} max-w-2xl`}>
          <div className="bg-white rounded-3xl p-6 sm:p-10">
            <h2 className="text-3xl font-heading font-bold text-heading-dark mb-3 text-balance">Demander une démonstration</h2>
            <p className="text-neutral-medium text-lg leading-relaxed mb-8">
              Décrivez vos produits et votre organisation actuelle. Nous pourrons organiser une présentation à distance ou une
              visite du showroom sur rendez-vous.
            </p>
            <ContactForm locale={lang} compact defaultRequestType="demo" />
          </div>
        </div>
      </section>

      {/* 14. Ressources : liste existante, inchangée. */}
      <MoneyPageResources slug="studios-photo-automatises" lang={lang} />

      <SchemaOrg
        schema={[
          organizationSchema(),
          breadcrumbSchema([
            { name: 'PackshotCreator', url: `https://www.packshot-creator.com/${lang}` },
            { name: 'Studios Photo Automatisés', url },
          ]),
          serviceSchema({
            name: 'Studios photo automatisés Orbitvu',
            description:
              'Studios photo automatisés Orbitvu distribués et installés par PackshotCreator en France et en Suisse : capture pilotée par Orbitvu Station, fonctions d’IA selon l’équipement et l’abonnement, formation proposée séparément.',
            serviceType: 'Studio photo automatisé',
            url,
            category: 'Équipement studio photo',
          }),
          faqSchema(FAQ.map((f) => ({ question: f.q, answer: f.r }))),
        ]}
      />
    </>
  );
}
