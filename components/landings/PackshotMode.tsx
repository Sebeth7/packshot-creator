/**
 * Landing /[lang]/packshot-mode — composant page-scopé, réécriture du 30/09/2026 sur la
 * méthode de F5 (/packshot-e-commerce). Servi en FR seulement : EN et de-ch restent sur
 * PackshotLandingTemplate jusqu'à la traduction de la version FR validée (D38).
 *
 * Le texte vit dans messages/fr.json (namespace packshotMode) ; ce fichier ne porte que la
 * mise en page, les images, les sources et les cibles de liens. PackshotLandingTemplate,
 * partagé par les autres landings, n'est pas modifié.
 *
 * Données machines : dimensions publiées par Orbitvu (fiches orbitvu.com relevées le
 * 28/09/2026 pour F5, consignées dans docs/seo-geo/JOURNAL.md). Les limites du Fashion
 * Studio et de l'Alphatable viennent des fiches du site (machines.ts). Aucune cadence.
 *
 * Visuels : actifs déjà présents dans public/images/machines/, légendes sans attribution
 * de modèle quand la provenance n'a pas été contrôlée sur orbitvu.com. S'y ajoutent cinq
 * illustrations générées (public/images/packshot-mode/, pack visuel du 30/09/2026) : ni
 * client, ni séance réelle, ni personne de l'équipe ; alt et légende le disent.
 */
import type { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { navPinLocale } from '@/i18n/deChCoverage';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import SommaireCollant from '@/components/landings/SommaireCollant';
import {
  ArrowRight,
  ArrowUp,
  Calculator,
  Camera,
  Check,
  ChevronDown,
  CircleAlert,
  Clock,
  FlaskConical,
  GraduationCap,
  Handshake,
  Info,
  Layers,
  Lock,
  Palette,
  Repeat,
  ScanSearch,
  Shirt,
  Sparkles,
  UserRound,
  Wallet,
  Waves,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Href = ComponentProps<typeof Link>['href'];
type Langue = 'fr' | 'en' | 'de-ch';

const SLUG = 'packshot-mode';
const SITE = 'https://www.packshot-creator.com';
const ANCRE_DEMO = 'demande-demo';

// Même liste que le bandeau du gabarit partagé (logos déjà publiés sur le site).
const CLIENT_LOGOS = [
  { name: 'Chanel', src: '/images/logos/client-chanel.avif', w: 225, h: 225 },
  { name: 'Amazon', src: '/images/logos/client-amazon.avif', w: 409, h: 123 },
  { name: 'Safran', src: '/images/logos/client-safran.avif', w: 994, h: 228 },
  { name: 'Essilor Luxottica', src: '/images/logos/client-essilor-luxottica.avif', w: 600, h: 66 },
  { name: 'Valentino', src: '/images/logos/client-valentino.avif', w: 320, h: 157 },
  { name: 'Sandro', src: '/images/logos/client-sandro.avif', w: 390, h: 100 },
  { name: 'Seiko', src: '/images/logos/client-seiko.avif', w: 508, h: 99 },
  { name: 'Lidl', src: '/images/logos/client-lidl.avif', w: 177, h: 168 },
  { name: 'Würth', src: '/images/logos/client-wurth.avif', w: 485, h: 104 },
];

// Une image par présentation (à plat, en volume, porté, accessoire), sans logo de marque visible.
const HERO_MOSAIQUE = [
  { key: 'aplat', src: '/images/machines/alphatable-alphadesk/packshot-coat.avif', w: 1200, h: 1200 },
  { key: 'volume', src: '/images/machines/alphastudio-xxl/packshot-jacket.avif', w: 1080, h: 1080 },
  { key: 'porte', src: '/images/machines/fashion-studio/packshot-sport-1.avif', w: 720, h: 1080 },
  { key: 'accessoire', src: '/images/machines/alphashot-xl/packshot-shoe-360.avif', w: 600, h: 600 },
] as const;

// Illustrations générées, dérivées AVIF des PNG 1672 × 941 du pack (SHA-256 contrôlés, sources
// conservées hors dépôt). Ratio complet, aucun recadrage : V1 et V3 doivent rester lisibles.
const ILLUSTRATIONS = {
  presentations: '/images/packshot-mode/mode-v1-meme-article-trois-presentations.avif',
  matiere: '/images/packshot-mode/mode-v2-matieres-textures.avif',
  collection: '/images/packshot-mode/mode-v3-coherence-collection.avif',
  auStudio: '/images/packshot-mode/mode-v4-preparation-humaine.avif',
  ia: '/images/packshot-mode/mode-v5-deux-variantes-colorees.avif',
} as const;

const SOMMAIRE = [
  { id: 'collection', key: 'collection' },
  { id: 'matiere', key: 'matiere' },
  { id: 'presentations', key: 'presentations' },
  { id: 'interne', key: 'interne' },
  { id: 'au-studio', key: 'auStudio' },
  { id: 'ia', key: 'ia' },
  { id: 'plateformes', key: 'plateformes' },
  { id: 'studios', key: 'studios' },
  { id: 'accompagnement', key: 'accompagnement' },
  { id: 'faq', key: 'faq' },
] as const;

const REPERES: { key: string; icon: LucideIcon }[] = [
  { key: 'coherence', icon: Repeat },
  { key: 'fidelite', icon: Palette },
  { key: 'presentation', icon: Shirt },
  { key: 'controle', icon: ScanSearch },
];

const POINTS_MATIERE: { key: string; icon: LucideIcon }[] = [
  { key: 'couleur', icon: Palette },
  { key: 'texture', icon: Layers },
  { key: 'tombe', icon: Waves },
  { key: 'details', icon: ScanSearch },
];

// Sources relues pour F5 le 28/09/2026 (JOURNAL.md) ; libellés propres à cette page.
const SOURCES_UX = [
  { label: 'Nielsen Norman Group, photos dans les listes de produits (2022)', href: 'https://www.nngroup.com/articles/product-photos-listing-pages/' },
  { label: 'Baymard Institute, résolution et zoom des images', href: 'https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom' },
];

const PRESENTATIONS = ['aplat', 'volume', 'porte', 'accessoires'] as const;

const RAISONS: { key: string; icon: LucideIcon }[] = [
  { key: 'rythme', icon: Clock },
  { key: 'surPlace', icon: Lock },
  { key: 'temps', icon: Repeat },
  { key: 'volume', icon: Layers },
];

const ETAPES = ['preparation', 'reglages', 'capture', 'detourage', 'export'] as const;

const IA_AIDE = ['detourage', 'formats', 'scenes'] as const;
const IA_CONTROLE = ['couleur', 'motifs', 'textes', 'coupe'] as const;
const IA_BLOCS: { key: string; icon: LucideIcon }[] = [
  { key: 'essais', icon: FlaskConical },
  { key: 'virtuel', icon: UserRound },
  { key: 'hybride', icon: Camera },
];

const PLATEFORMES = ['zalando', 'amazon', 'google'] as const;

// Versions françaises des pages officielles, relues le 28/09/2026 pour F5.
const SOURCES_PLATEFORMES = [
  { label: 'Zalando Partner University, consignes images', href: 'https://partner.zalando.com/university/article/zalando-image-guidelines' },
  { label: 'Amazon Seller Central, exigences relatives aux images (G1881)', href: 'https://sellercentral.amazon.fr/help/hub/reference/external/G1881' },
  { label: 'Google Merchant Center, lien image', href: 'https://support.google.com/merchants/answer/6324350?hl=fr' },
  { label: 'Google Merchant Center, mise à jour 2026 des spécifications', href: 'https://support.google.com/merchants/answer/16989427?hl=fr' },
];

// Fiches actives du site (aucun modèle délisté) ; vignettes déjà utilisées par les fiches.
const STUDIOS: { key: string; slug: string; img: string; w: number; h: number }[] = [
  { key: 'alphatable', slug: 'alphatable', img: '/images/machines/alphatable-alphadesk.avif', w: 1000, h: 1000 },
  { key: 'xxl', slug: 'alphastudio-xxl-v2', img: '/images/machines/alphastudio-xxl.avif', w: 1000, h: 1000 },
  { key: 'fashion', slug: 'fashion-studio', img: '/images/machines/fashion-studio.avif', w: 1000, h: 1000 },
  { key: 'xlg2', slug: 'alphashot-xl-g2', img: '/images/machines/alphashot-xl-g2.avif', w: 1600, h: 893 },
  { key: 'prog2', slug: 'alphashot-pro-g2', img: '/images/machines/alphashot-pro-g2.avif', w: 996, h: 996 },
  { key: 'micro', slug: 'alphashot-micro-v2', img: '/images/machines/alphashot-micro-v2.avif', w: 1000, h: 1000 },
];

// Articles liés : slug de chaque langue relevé dans content/blog/alternates.json et
// content/guides/alternates.json. Sans version dans la langue, repli vers l'anglais puis le français.
const ARTICLES: Record<string, { gabarit: '/blog/[slug]' | '/guide/[slug]'; slugs: Partial<Record<Langue, string>> }> = {
  collection: {
    gabarit: '/guide/[slug]',
    slugs: { fr: 'visuels-collection-produits-homogenes', en: 'consistent-product-image-collection' },
  },
  couleurs: {
    gabarit: '/guide/[slug]',
    slugs: { fr: 'comment-obtenir-couleurs-fideles-photographie-produit' },
  },
  chaussures: {
    gabarit: '/guide/[slug]',
    slugs: { fr: 'comment-faire-photos-multi-angles-chaussures' },
  },
  prestataire: {
    gabarit: '/blog/[slug]',
    slugs: { fr: 'prestataire-packshot-vs-studio-interne', en: 'prestataire-packshot-vs-studio-interne' },
  },
  migration: {
    gabarit: '/blog/[slug]',
    slugs: { fr: 'migrer-ancien-packshotcreator', en: 'migrate-legacy-packshotcreator-studio', 'de-ch': 'altes-packshotcreator-studio-migrieren' },
  },
};

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'] as const;

const CLASSE_LIEN =
  'font-medium text-very-peri-600 underline decoration-very-peri-200 underline-offset-4 hover:decoration-very-peri-500 transition-colors';

function cibleArticle(cle: keyof typeof ARTICLES, lang: Langue): { href: Href; locale: Langue } {
  const { gabarit, slugs } = ARTICLES[cle];
  const locale: Langue = slugs[lang] ? lang : slugs.en ? 'en' : 'fr';
  return { href: { pathname: gabarit, params: { slug: slugs[locale] as string } }, locale };
}

/** Lien interne d'un texte riche. En de-ch, une cible non traduite est épinglée sur /en ou /fr. */
function lien(lang: string, href: Href, locale?: Langue) {
  function LienRiche(chunks: ReactNode) {
    return (
      <Link href={href} locale={locale ?? navPinLocale(lang, href)} className={CLASSE_LIEN}>
        {chunks}
      </Link>
    );
  }
  return LienRiche;
}

function lienArticle(lang: Langue, cle: keyof typeof ARTICLES) {
  const { href, locale } = cibleArticle(cle, lang);
  return lien(lang, href, locale);
}

function LienExterne({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-4 hover:text-very-peri-600 hover:decoration-very-peri-400 transition-colors">
      {children}
    </a>
  );
}

/** Lien discret vers le sommaire, en tête de section : aucun élément fixe ne double l'en-tête du site. */
function RetourSommaire({ label }: { label: string }) {
  return (
    <a
      href="#sommaire"
      className="inline-flex min-h-6 shrink-0 items-center gap-1 text-xs font-medium text-future-dusk-500 hover:text-very-peri-600 transition-colors"
    >
      <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
      {label}
    </a>
  );
}

function EnTete({ eyebrow, heading, intro, retour }: { eyebrow: string; heading: string; intro?: string; retour: string }) {
  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-4">
        <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em]">{eyebrow}</span>
        <RetourSommaire label={retour} />
      </div>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-5">{heading}</h2>
      {intro && <p className="text-lg text-future-dusk-500 leading-relaxed">{intro}</p>}
    </div>
  );
}

/** Libellé de colonne affiché au-dessus de chaque cellule quand le tableau passe en cartes (mobile). */
function LibelleMobile({ children }: { children: ReactNode }) {
  return <span className="md:hidden block text-[11px] font-semibold uppercase tracking-wider text-future-dusk-400 mb-1">{children}</span>;
}

/** Illustration pleine largeur du conteneur, sans recadrage, légende sous l'image. */
function Illustration({ src, alt, caption, className }: { src: string; alt: string; caption: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="rounded-3xl bg-white border border-neutral-100 overflow-hidden">
        <Image src={src} alt={alt} width={1672} height={941} sizes="(min-width: 1280px) 1232px, 92vw" className="w-full h-auto" />
      </div>
      <figcaption className="mt-3 text-sm text-future-dusk-500 text-center">{caption}</figcaption>
    </figure>
  );
}

function ListeSources({ titre, sources }: { titre: string; sources: { label: string; href: string }[] }) {
  return (
    <p className="text-xs text-future-dusk-500 leading-relaxed">
      <span className="font-semibold uppercase tracking-wider mr-2">{titre}</span>
      {sources.map((s, i) => (
        <span key={s.href}>
          <LienExterne href={s.href}>{s.label}</LienExterne>
          {i < sources.length - 1 ? ' · ' : ''}
        </span>
      ))}
    </p>
  );
}

export default async function PackshotMode({ lang }: { lang: Langue }) {
  const t = await getTranslations({ locale: lang, namespace: 'packshotMode' });
  const urlPage = `${SITE}/${lang}/${SLUG}`;
  const epingle = (href: Href) => navPinLocale(lang, href);
  const retour = t('sommaire.retour');
  const illustration = (cle: keyof typeof ILLUSTRATIONS, className: string) => (
    <Illustration
      src={ILLUSTRATIONS[cle]}
      alt={t(`${cle}.illustration.alt`)}
      caption={t(`${cle}.illustration.caption`)}
      className={className}
    />
  );

  const faqs = FAQ_KEYS.map((k) => ({ question: t(`faq.${k}.question`), answer: t(`faq.${k}.answer`) }));

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `${SITE}/${lang}` },
    { name: t('breadcrumb'), url: urlPage },
  ];

  return (
    <>
      {/* ━━ HERO ━━ Texte avant la mosaïque sur mobile. */}
      <section className="relative overflow-hidden text-white bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-white/10 text-very-peri-200">
                <Shirt className="h-4 w-4" aria-hidden="true" />
                {t('hero.badge')}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-heading font-bold text-white leading-[1.1] tracking-tight">
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-lg lg:text-xl text-future-dusk-200 max-w-xl leading-relaxed">{t('hero.subtitle')}</p>
              <p className="mt-4 text-base text-future-dusk-200 max-w-xl leading-relaxed">{t('hero.role')}</p>
              <div className="mt-8 lg:mt-10 flex flex-col sm:flex-row gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-very-peri-500 hover:bg-very-peri-600 text-white px-8 h-12 text-base font-semibold rounded-lg shadow-lg shadow-very-peri-500/25"
                >
                  <a href={`#${ANCRE_DEMO}`}>{t('hero.ctaPrimary')}</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border border-future-dusk-400 text-white hover:bg-future-dusk-700/50 px-8 h-12 text-base rounded-lg"
                >
                  <Link href="/studio-photo/selecteur-machines" locale={epingle('/studio-photo/selecteur-machines')}>{t('hero.ctaSecondary')}</Link>
                </Button>
              </div>
            </div>
            <figure>
              <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {HERO_MOSAIQUE.map((img, i) => (
                  <div key={img.key} className="bg-white rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl shadow-black/20 aspect-square flex items-center justify-center">
                    <Image
                      src={img.src}
                      alt={t(`hero.alts.${img.key}`)}
                      width={img.w}
                      height={img.h}
                      sizes="(min-width: 1024px) 280px, 45vw"
                      className="w-full h-full object-contain"
                      priority={i < 2}
                    />
                  </div>
                ))}
              </div>
              <figcaption className="mt-3 lg:mt-4 text-sm text-future-dusk-200 text-center">{t('hero.mosaicCaption')}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ━━ EN BREF + SOMMAIRE ━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">{t('bref.label')}</span>
              <p className="text-xl lg:text-2xl text-future-dusk-900 leading-relaxed font-medium">{t('bref.lead')}</p>
              <ul className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-5">
                {REPERES.map(({ key, icon: Icon }) => (
                  <li key={key} className="flex gap-3">
                    <Icon className="h-5 w-5 mt-0.5 shrink-0 text-very-peri-500" aria-hidden="true" />
                    <p className="text-future-dusk-600 leading-relaxed">
                      <span className="font-semibold text-future-dusk-900">{t(`bref.reperes.${key}.titre`)}.</span>{' '}
                      {t(`bref.reperes.${key}.texte`)}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <nav id="sommaire" aria-label={t('sommaire.titre')} className="lg:col-span-5 lg:pl-8 lg:border-l border-neutral-100 scroll-mt-24">
              <p className="text-xs font-semibold text-future-dusk-500 uppercase tracking-[0.2em] mb-3">{t('sommaire.titre')}</p>
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6">
                {SOMMAIRE.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex items-baseline gap-3 py-2 text-future-dusk-700 hover:text-very-peri-600 transition-colors">
                      <span className="text-xs font-semibold text-very-peri-500 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-medium">{t(`sommaire.${s.key}`)}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>

          <div className="mt-14 pt-10 border-t border-neutral-100">
            <p className="text-center text-xs font-semibold text-future-dusk-500 uppercase tracking-[0.15em] mb-6">{t('bref.logos')}</p>
            {/* Logos en chargement différé (mesure F5 du 28/09 : en eager, 9 préchargements dans le <head>). */}
            <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
              <div className="flex items-center gap-x-10 sm:gap-x-14 animate-marquee w-max">
                {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
                  <div key={`${logo.name}-${i}`} className="w-[90px] h-[34px] sm:w-[120px] sm:h-[40px] flex-shrink-0 flex items-center justify-center opacity-60">
                    <Image
                      src={logo.src}
                      alt={i < CLIENT_LOGOS.length ? logo.name : ''}
                      aria-hidden={i >= CLIENT_LOGOS.length ? true : undefined}
                      width={logo.w}
                      height={logo.h}
                      sizes="120px"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ SOMMAIRE COLLANT (desktop) ━━ Relais du sommaire ci-dessus, de la section 1 à la FAQ. */}
      <SommaireCollant
        titre={t('sommaire.titre')}
        libelle={t('sommaire.barre')}
        ancreSommaire="sommaire"
        entrees={SOMMAIRE.map((s) => ({ id: s.id, libelle: t(`sommaire.${s.key}`) }))}
      />

      {/* ━━ 1 — LA COLLECTION ━━ */}
      <section id="collection" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <EnTete eyebrow={t('collection.eyebrow')} heading={t('collection.heading')} retour={retour} />
              <div className="space-y-5 text-future-dusk-600 leading-relaxed">
                <p>{t('collection.p1')}</p>
                <p>{t('collection.p2')}</p>
                <p>{t('collection.p3')}</p>
              </div>
              <p className="mt-6 text-future-dusk-600">{t.rich('collection.lienGuide', { lien: lienArticle(lang, 'collection') })}</p>
            </div>
            <figure className="lg:col-span-6">
              <div className="bg-white rounded-3xl p-4 sm:p-6 border border-neutral-100 shadow-sm">
                <Image
                  src="/images/machines/alphatable-alphadesk/soft-templates.avif"
                  alt={t('collection.imageAlt')}
                  width={1304}
                  height={1100}
                  sizes="(min-width: 1024px) 560px, 92vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-4 text-sm text-future-dusk-500 text-center">{t('collection.imageCaption')}</figcaption>
            </figure>
          </div>
          {illustration('collection', 'mt-12 lg:mt-16')}
        </div>
      </section>

      {/* ━━ 2 — COULEUR, MATIÈRE, TOMBÉ ━━ */}
      <section id="matiere" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('matiere.eyebrow')} heading={t('matiere.heading')} intro={t('matiere.intro')} retour={retour} />
          {illustration('matiere', 'mt-12')}
          <ul className="mt-12 grid sm:grid-cols-2 gap-4 lg:gap-6">
            {POINTS_MATIERE.map(({ key, icon: Icon }) => (
              <li key={key} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-6 lg:p-8">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-very-peri-100 text-very-peri-700 mb-4">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">{t(`matiere.points.${key}.titre`)}</h3>
                <p className="text-future-dusk-600 leading-relaxed">{t(`matiere.points.${key}.texte`)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-2xl bg-amber-50 border border-amber-200 p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-amber-700">
              <CircleAlert className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">{t('matiere.recolo.titre')}</h3>
              <p className="text-future-dusk-700 leading-relaxed">{t('matiere.recolo.texte')}</p>
            </div>
          </div>
          <p className="mt-8 text-future-dusk-600">{t.rich('matiere.lienGuide', { lien: lienArticle(lang, 'couleurs') })}</p>
          <details className="group mt-6 text-xs text-future-dusk-500">
            <summary className="inline-flex min-h-6 items-center gap-1.5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden font-semibold uppercase tracking-wider hover:text-very-peri-600 transition-colors">
              {t('matiere.sources')} ({SOURCES_UX.length})
              <ChevronDown className="h-3.5 w-3.5 group-open:rotate-180 transition-transform" aria-hidden="true" />
            </summary>
            <ul className="mt-3 space-y-1.5 leading-relaxed">
              {SOURCES_UX.map((s) => (
                <li key={s.href}>
                  <LienExterne href={s.href}>{s.label}</LienExterne>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* ━━ 3 — À PLAT, EN VOLUME, PORTÉ ━━ */}
      <section id="presentations" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('presentations.eyebrow')} heading={t('presentations.heading')} intro={t('presentations.intro')} retour={retour} />
          {illustration('presentations', 'mt-12')}
          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  {(['presentation', 'montre', 'articles', 'demande'] as const).map((c) => (
                    <th key={c} scope="col" className="px-6 py-3 font-semibold">{t(`presentations.columns.${c}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {PRESENTATIONS.map((p) => (
                  <tr key={p} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                    <th scope="row" className="block md:table-cell md:px-6 md:py-4 font-heading font-bold text-future-dusk-900 align-top mb-2 md:mb-0">
                      {t(`presentations.rows.${p}.presentation`)}
                    </th>
                    {(['montre', 'articles', 'demande'] as const).map((c) => (
                      <td key={c} className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                        <LibelleMobile>{t(`presentations.columns.${c}`)}</LibelleMobile>
                        {t(`presentations.rows.${p}.${c}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-future-dusk-600 leading-relaxed max-w-4xl">{t('presentations.note')}</p>
          <p className="mt-3 text-future-dusk-600 leading-relaxed max-w-4xl">{t.rich('presentations.lienChaussures', { lien: lienArticle(lang, 'chaussures') })}</p>
        </div>
      </section>

      {/* ━━ 4 — POURQUOI INTERNALISER ━━ */}
      <section id="interne" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('interne.eyebrow')} heading={t('interne.heading')} intro={t('interne.intro')} retour={retour} />
          <ul className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {RAISONS.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-future-dusk-900 text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-future-dusk-900 mb-1.5">{t(`interne.raisons.${key}.titre`)}</h3>
                  <p className="text-future-dusk-600 leading-relaxed">{t(`interne.raisons.${key}.texte`)}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-12 rounded-2xl bg-neutral-50 border border-neutral-100 p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-future-dusk-700 border border-neutral-100">
              <Handshake className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">{t('interne.prestataire.titre')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('interne.prestataire.texte')}</p>
            </div>
          </div>
          <p className="mt-8 text-future-dusk-600 leading-relaxed max-w-4xl">
            {t.rich('interne.liens', {
              lien: lienArticle(lang, 'prestataire'),
              lien2: lien(lang, '/calculateur-roi'),
            })}
          </p>
        </div>
      </section>

      {/* ━━ 5 — LE STUDIO ET L'ÉQUIPE ━━ */}
      <section id="au-studio" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <EnTete eyebrow={t('auStudio.eyebrow')} heading={t('auStudio.heading')} intro={t('auStudio.intro')} retour={retour} />
            </div>
            <figure className="lg:col-span-5">
              <div className="overflow-hidden rounded-3xl bg-neutral-100">
                <Image
                  src="/images/machines/alphashot-xl-g2/packshot-operator.avif"
                  alt={t('auStudio.imageAlt')}
                  width={880}
                  height={586}
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-3 text-sm text-future-dusk-500 text-center">{t('auStudio.imageCaption')}</figcaption>
            </figure>
          </div>

          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold w-1/5">{t('auStudio.columns.etape')}</th>
                  <th scope="col" className="px-6 py-3 font-semibold bg-very-peri-600">{t('auStudio.columns.studio')}</th>
                  <th scope="col" className="px-6 py-3 font-semibold">{t('auStudio.columns.equipe')}</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {ETAPES.map((e, i) => (
                  <tr key={e} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                    <th scope="row" className="block md:table-cell md:px-6 md:py-4 font-heading font-bold text-future-dusk-900 align-top mb-2 md:mb-0">
                      <span className="text-very-peri-500 tabular-nums mr-2">{i + 1}.</span>
                      {t(`auStudio.rows.${e}.etape`)}
                    </th>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-900 align-top py-1 md:bg-very-peri-50/60">
                      <LibelleMobile>{t('auStudio.columns.studio')}</LibelleMobile>
                      {t(`auStudio.rows.${e}.studio`)}
                    </td>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                      <LibelleMobile>{t('auStudio.columns.equipe')}</LibelleMobile>
                      {t(`auStudio.rows.${e}.equipe`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {illustration('auStudio', 'mt-12')}
          <div className="mt-8 max-w-4xl flex gap-4">
            <GraduationCap className="h-6 w-6 mt-0.5 shrink-0 text-very-peri-500" aria-hidden="true" />
            <p className="text-future-dusk-700 leading-relaxed">{t('auStudio.controle')}</p>
          </div>
          {/* Seul CTA intermédiaire : à mi-page (mesure du 01/10 en 390 px : ~24 900 px entre le bouton du hero et le formulaire). */}
          <div className="mt-10 rounded-2xl border border-very-peri-200 bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <p className="flex-1 text-future-dusk-900 font-medium leading-relaxed">{t('auStudio.demo.texte')}</p>
            <Button asChild className="w-fit bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl px-6 h-11 shrink-0">
              <a href={`#${ANCRE_DEMO}`}>
                {t('auStudio.demo.cta')} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ━━ 6 — IA ━━ */}
      <section id="ia" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('ia.eyebrow')} heading={t('ia.heading')} intro={t('ia.intro')} retour={retour} />
          {illustration('ia', 'mt-12')}
          <div className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="rounded-2xl border border-neutral-100 bg-very-peri-50 p-6 lg:p-8">
              <h3 className="flex items-center gap-2 text-xl font-heading font-bold text-future-dusk-900 mb-4">
                <Sparkles className="h-5 w-5 text-very-peri-600" aria-hidden="true" />
                {t('ia.aide.titre')}
              </h3>
              <ul className="space-y-3">
                {IA_AIDE.map((k) => (
                  <li key={k} className="flex gap-3 text-future-dusk-700 leading-relaxed">
                    <Check className="h-4 w-4 mt-1 shrink-0 text-very-peri-600" aria-hidden="true" />
                    {t(`ia.aide.items.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 lg:p-8">
              <h3 className="flex items-center gap-2 text-xl font-heading font-bold text-future-dusk-900 mb-4">
                <ScanSearch className="h-5 w-5 text-amber-700" aria-hidden="true" />
                {t('ia.controler.titre')}
              </h3>
              <ul className="space-y-3">
                {IA_CONTROLE.map((k) => (
                  <li key={k} className="flex gap-3 text-future-dusk-700 leading-relaxed">
                    <CircleAlert className="h-4 w-4 mt-1 shrink-0 text-amber-700" aria-hidden="true" />
                    {t(`ia.controler.items.${k}`)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="mt-10 grid lg:grid-cols-3 gap-8">
            {IA_BLOCS.map(({ key, icon: Icon }) => (
              <li key={key}>
                <Icon className="h-6 w-6 text-very-peri-500 mb-3" aria-hidden="true" />
                <h3 className="text-lg font-heading font-bold text-future-dusk-900 mb-2">{t(`ia.${key}.titre`)}</h3>
                <p className="text-future-dusk-600 leading-relaxed">{t(`ia.${key}.texte`)}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-future-dusk-600">{t.rich('ia.lien', { lien: lien(lang, '/ia-photo-produit') })}</p>
        </div>
      </section>

      {/* ━━ 7 — PLATEFORMES ━━ */}
      <section id="plateformes" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('plateformes.eyebrow')} heading={t('plateformes.heading')} intro={t('plateformes.intro')} retour={retour} />
          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-5 border-b border-neutral-100">
              <h3 className="font-heading font-bold text-lg text-future-dusk-900">{t('plateformes.tableTitle')}</h3>
              <p className="inline-flex items-center gap-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                {t('plateformes.tableNote')}
              </p>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  {(['plateforme', 'fond', 'format', 'noter'] as const).map((c) => (
                    <th key={c} scope="col" className="px-6 py-3 font-semibold">{t(`plateformes.columns.${c}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {PLATEFORMES.map((p) => (
                  <tr key={p} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                    <th scope="row" className="block md:table-cell md:px-6 md:py-4 font-heading font-bold text-future-dusk-900 align-top mb-2 md:mb-0">
                      {t(`plateformes.rows.${p}.nom`)}
                    </th>
                    {(['fond', 'format', 'noter'] as const).map((c) => (
                      <td key={c} className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                        <LibelleMobile>{t(`plateformes.columns.${c}`)}</LibelleMobile>
                        {t(`plateformes.rows.${p}.${c}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50">
              <ListeSources titre={t('plateformes.sources')} sources={SOURCES_PLATEFORMES} />
            </div>
          </div>
          <p className="mt-6 text-future-dusk-600">{t.rich('plateformes.lienAmazon', { lien: lien(lang, '/packshot-amazon') })}</p>
        </div>
      </section>

      {/* ━━ 8 — QUEL STUDIO POUR QUELS ARTICLES ━━ */}
      <section id="studios" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('studios.eyebrow')} heading={t('studios.heading')} intro={t('studios.intro')} retour={retour} />
          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  {(['studio', 'usage', 'gabarit', 'limite'] as const).map((c) => (
                    <th key={c} scope="col" className="px-6 py-3 font-semibold">{t(`studios.columns.${c}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {STUDIOS.map((s) => (
                  <tr key={s.key} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                    <th scope="row" className="block md:table-cell md:px-6 md:py-4 align-middle mb-3 md:mb-0">
                      <Link
                        href={{ pathname: '/studio-photo/[slug]', params: { slug: s.slug } }}
                        locale={epingle({ pathname: '/studio-photo/[slug]', params: { slug: s.slug } })}
                        className="group flex items-center gap-4"
                      >
                        <span className="h-16 w-16 shrink-0 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1">
                          <Image src={s.img} alt="" width={s.w} height={s.h} sizes="64px" className="max-h-full w-auto object-contain" />
                        </span>
                        <span>
                          <span className="block font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
                            {t(`studios.rows.${s.key}.nom`)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-normal text-very-peri-500">
                            {t('studios.voirFiche')} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    </th>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-middle py-1">
                      <LibelleMobile>{t('studios.columns.usage')}</LibelleMobile>
                      {t(`studios.rows.${s.key}.usage`)}
                    </td>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-900 font-medium align-middle py-1 md:whitespace-nowrap">
                      <LibelleMobile>{t('studios.columns.gabarit')}</LibelleMobile>
                      {t(`studios.rows.${s.key}.gabarit`)}
                    </td>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-middle py-1">
                      <LibelleMobile>{t('studios.columns.limite')}</LibelleMobile>
                      {t(`studios.rows.${s.key}.limite`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-future-dusk-500 leading-relaxed">
            {t.rich('studios.note', {
              lien: lien(lang, { pathname: '/studio-photo/[slug]', params: { slug: 'fashion-studio-basic' } }),
            })}
          </p>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {[
              { key: 'xxl', src: '/images/machines/alphastudio-xxl/hero.avif' },
              { key: 'fashion', src: '/images/machines/fashion-studio/hero.avif' },
            ].map((f) => (
              <figure key={f.key}>
                <div className="rounded-3xl bg-white border border-neutral-100 overflow-hidden">
                  <Image
                    src={f.src}
                    alt={t(`studios.figures.${f.key}Alt`)}
                    width={1148}
                    height={636}
                    sizes="(min-width: 768px) 600px, 92vw"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mt-3 text-sm text-future-dusk-500 text-center">{t(`studios.figures.${f.key}Caption`)}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-8 text-future-dusk-600">
            {t.rich('studios.liens', {
              lien: lien(lang, '/studio-photo/selecteur-machines'),
              lien2: lien(lang, '/studios-photo-automatises'),
            })}
          </p>
        </div>
      </section>

      {/* ━━ 9 — BUDGET, FINANCEMENT, FORMATION, ACCOMPAGNEMENT ━━ */}
      <section id="accompagnement" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('accompagnement.eyebrow')} heading={t('accompagnement.heading')} retour={retour} />
          <div className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="rounded-3xl bg-future-dusk-900 text-white p-6 lg:p-8 flex flex-col">
              <Calculator className="h-7 w-7 text-very-peri-300 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3">{t('accompagnement.cout.title')}</h3>
              <p className="text-future-dusk-200 leading-relaxed flex-1">{t('accompagnement.cout.text')}</p>
              <Button asChild className="mt-6 w-fit bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl px-6 h-11">
                <Link href="/calculateur-roi" locale={epingle('/calculateur-roi')}>
                  {t('accompagnement.cout.cta')} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-white p-6 lg:p-8">
              <Wallet className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('accompagnement.financement.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('accompagnement.financement.text')}</p>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-white p-6 lg:p-8">
              <GraduationCap className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('accompagnement.formation.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('accompagnement.formation.text')}</p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                <Link href="/academy" locale={epingle('/academy')} className={`inline-flex min-h-6 items-center ${CLASSE_LIEN}`}>{t('accompagnement.formation.cta')}</Link>
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-white p-6 lg:p-8">
              <Handshake className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('accompagnement.accompagnement.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('accompagnement.accompagnement.text')}</p>
              <p className="mt-4 text-sm text-future-dusk-600">
                {t.rich('accompagnement.accompagnement.migration', {
                  lien: lienArticle(lang, 'migration'),
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ FAQ ━━ */}
      <section id="faq" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em]">FAQ</span>
                <RetourSommaire label={retour} />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">{t('faq.heading')}</h2>
            </div>
            <div className="lg:col-span-8 space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={FAQ_KEYS[i]}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden [&[open]]:shadow-md [&[open]]:border-very-peri-200 transition-all duration-300"
                >
                  <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                    <h3 className="text-lg font-heading font-semibold text-future-dusk-900 text-left leading-snug group-hover:text-very-peri-600 transition-colors">
                      {faq.question}
                    </h3>
                    <ChevronDown className="h-5 w-5 text-future-dusk-400 shrink-0 group-open:rotate-180 transition-transform duration-300" aria-hidden="true" />
                  </summary>
                  <div className="px-5 sm:px-6 pb-6 -mt-1">
                    <p className="text-future-dusk-500 leading-relaxed">{faq.answer}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ━━ DEMANDE DE DÉMONSTRATION ━━ Cible du bouton du hero ; le CTA de l'en-tête du site n'est pas modifié. */}
      <section id={ANCRE_DEMO} className="py-20 lg:py-28 bg-black text-white relative overflow-hidden scroll-mt-16">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-center mb-12 lg:mb-16">{t('cta.heading')}</h2>
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-8 items-start">
            <div className="lg:col-span-3 bg-white text-future-dusk-900 rounded-3xl p-4 sm:p-6 lg:p-10">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900">{t('cta.formTitle')}</h3>
              <p className="mt-2 mb-6 text-sm text-future-dusk-600 leading-relaxed">{t('cta.demoNote')}</p>
              <ContactForm locale={lang} compact defaultRequestType="demo" hideRequestType />
            </div>
            <div className="lg:col-span-2 bg-white/5 rounded-3xl p-5 sm:p-8 border border-white/10">
              <h3 className="text-xl font-heading font-bold mb-3">{t('cta.roiTitle')}</h3>
              <p className="text-sm text-future-dusk-200 mb-6 leading-relaxed">{t('cta.roiText')}</p>
              <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-6 h-11 text-sm sm:text-base w-fit">
                <Link href="/calculateur-roi" locale={epingle('/calculateur-roi')}>
                  {t('cta.roiCta')} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ EXPLOREZ ━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] mb-10">{t('explore.label')}</h2>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios', href: '/studios-photo-automatises' as const, icon: <Camera className="h-5 w-5" aria-hidden="true" /> },
              { key: 'ia', href: '/ia-photo-produit' as const, icon: <Sparkles className="h-5 w-5" aria-hidden="true" /> },
              { key: 'academy', href: '/academy' as const, icon: <GraduationCap className="h-5 w-5" aria-hidden="true" /> },
            ].map((l) => (
              <Link key={l.key} href={l.href} locale={epingle(l.href)} className="group block px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-very-peri-500">{l.icon}</span>
                  <h3 className="font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">{t(`explore.${l.key}.title`)}</h3>
                  <ArrowRight className="h-4 w-4 text-future-dusk-300 group-hover:text-very-peri-500 group-hover:translate-x-1 transition-all ml-auto" aria-hidden="true" />
                </div>
                <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`explore.${l.key}.desc`)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <MoneyPageResources slug={SLUG} lang={lang} />

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
