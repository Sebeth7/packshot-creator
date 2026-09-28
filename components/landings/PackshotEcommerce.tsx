/**
 * Landing /[lang]/packshot-e-commerce — composant page-scopé du chantier F5 (28/09/2026),
 * servi en FR, EN et de-ch depuis la publication trilingue décidée par Laurent le 28/09/2026.
 *
 * Le texte vit dans messages/{fr,en,de-ch}.json (namespace packshotEcommerce, clés
 * identiques dans les trois langues) ; ce fichier ne porte que la mise en page, les
 * images, les sources et les cibles de liens. PackshotLandingTemplate, partagé par les
 * autres landings, n'est plus utilisé pour cette page et n'est pas modifié.
 *
 * Données machines : valeurs publiées par Orbitvu (fiches orbitvu.com relevées le
 * 28/09/2026). Les écarts sont consignés dans docs/seo-geo/JOURNAL.md (entrées F5).
 *
 * Liens internes : en de-ch, une cible non traduite est épinglée sur /en ou /fr par
 * navPinLocale (i18n/deChCoverage) ; les articles utilisent le slug de chaque langue
 * (alternates.json des blogs et des guides), avec repli explicite si la traduction manque.
 */
import type { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { navPinLocale } from '@/i18n/deChCoverage';
import { tx } from '@/lib/locale-text';
import { Button } from '@/components/ui/button';
import { ContactForm } from '@/components/forms/ContactForm';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import {
  ArrowRight,
  ArrowUp,
  Calculator,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Crop,
  Database,
  Eye,
  FolderOutput,
  GraduationCap,
  Handshake,
  Info,
  KeyRound,
  PackageOpen,
  Palette,
  Ruler,
  ScanBarcode,
  ScanSearch,
  Send,
  ShoppingCart,
  SlidersHorizontal,
  Sparkles,
  Store,
  UserCheck,
  Wallet,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Href = ComponentProps<typeof Link>['href'];

const SLUG = 'packshot-e-commerce';
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

// Visuels présents sur les fiches orbitvu.com du modèle cité en légende (contrôle du 28/09/2026).
const HERO_MOSAIQUE = [
  { key: 'mascara', src: '/images/machines/alphashot-pro-g2/packshot-mascara.avif', w: 1080, h: 1080 },
  { key: 'karcher', src: '/images/machines/alphastudio-compact/packshot-karcher.avif', w: 1080, h: 1080 },
  { key: 'eyeshadow', src: '/images/machines/alphashot-pro-g2/packshot-eyeshadow.avif', w: 1080, h: 1080 },
  { key: 'chair', src: '/images/machines/furniture-studio/packshot-chair.avif', w: 1081, h: 1081 },
] as const;

const SERIE = [
  { key: 'blouse', src: '/images/machines/alphatable-alphadesk/packshot-blouse.avif', w: 1200, h: 1105 },
  { key: 'coat', src: '/images/machines/alphatable-alphadesk/packshot-coat.avif', w: 1200, h: 1200 },
  { key: 'dress', src: '/images/machines/alphatable-alphadesk/packshot-dress.avif', w: 1200, h: 1215 },
  { key: 'dungarees', src: '/images/machines/alphatable-alphadesk/packshot-dungarees.avif', w: 1200, h: 1215 },
] as const;

const SOMMAIRE = [
  { id: 'serie', key: 'serie' },
  { id: 'fiche-produit', key: 'ficheProduit' },
  { id: 'marketplaces', key: 'marketplaces' },
  { id: 'choisir', key: 'choisir' },
  { id: 'automatisation', key: 'automatisation' },
  { id: 'workflow', key: 'workflow' },
  { id: 'studios', key: 'studios' },
  { id: 'cout-complet', key: 'coutComplet' },
  { id: 'faq', key: 'faq' },
] as const;

const REPERES: { key: string; icon: LucideIcon }[] = [
  { key: 'vues', icon: Camera },
  { key: 'reglages', icon: SlidersHorizontal },
  { key: 'exports', icon: Send },
  { key: 'operateur', icon: UserCheck },
];

// Photos fournies par Sébastien (28/09/2026) : une seule monture, cinq vues.
// Conversion AVIF depuis les JPEG d'origine (1.jpg, 21.jpg, 15.jpg, 20.jpg, 6.jpg).
const LUNETTES_PRINCIPALE = { key: 'troisQuarts', src: '/images/packshot-e-commerce/lunettes-vue-trois-quarts.avif', w: 1600, h: 1600 };
const LUNETTES_VUES = [
  { key: 'face', src: '/images/packshot-e-commerce/lunettes-vue-face.avif', w: 1200, h: 1200 },
  { key: 'profil', src: '/images/packshot-e-commerce/lunettes-vue-profil.avif', w: 1200, h: 1200 },
  { key: 'repliees', src: '/images/packshot-e-commerce/lunettes-face-branches-repliees.avif', w: 1200, h: 1200 },
  { key: 'charniere', src: '/images/packshot-e-commerce/lunettes-detail-charniere.avif', w: 1200, h: 1200 },
] as const;

const COMPLEMENTS: { key: string; icon: LucideIcon }[] = [
  { key: 'echelle', icon: Ruler },
  { key: 'variantes', icon: Palette },
  { key: 'colis', icon: PackageOpen },
  { key: 'zoom', icon: ScanSearch },
  { key: 'mouvement', icon: Clapperboard },
];

// Libellés localisés ; URL primaires identiques dans les trois langues.
function sourcesUx(lang: string) {
  return [
    { label: tx(lang, 'Nielsen Norman Group, pages produit (2019)', 'Nielsen Norman Group, product pages (2019)', 'Nielsen Norman Group, Produktseiten (2019)'), href: 'https://www.nngroup.com/articles/ecommerce-product-pages/' },
    { label: tx(lang, 'Nielsen Norman Group, photos en liste produits (2022)', 'Nielsen Norman Group, photos on listing pages (2022)', 'Nielsen Norman Group, Fotos in Produktlisten (2022)'), href: 'https://www.nngroup.com/articles/product-photos-listing-pages/' },
    { label: tx(lang, 'Baymard Institute, résolution et zoom', 'Baymard Institute, resolution and zoom', 'Baymard Institute, Auflösung und Zoom'), href: 'https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom' },
    { label: tx(lang, 'Baymard Institute, accessoires inclus', 'Baymard Institute, included accessories', 'Baymard Institute, mitgeliefertes Zubehör'), href: 'https://baymard.com/research-articles/included-accessories-image' },
  ];
}

const PRINCIPES = ['fidelite', 'entier', 'ajout', 'definition', 'fond', 'ia'] as const;

const PLATEFORMES = ['amazon', 'google', 'zalando', 'shopify'] as const;

// Amazon : page amazon.fr (seule version contrôlée) dans les trois langues. Google et Shopify :
// version linguistique contrôlée le 28/09/2026 (6324350 en ; 16989427 en et de ; Shopify en).
function sourcesPlateformes(lang: string) {
  return [
    { label: tx(lang, 'Amazon Seller Central, exigences relatives aux images (G1881)', 'Amazon Seller Central (amazon.fr), product image requirements (G1881)', 'Amazon Seller Central (amazon.fr), Anforderungen an Produktbilder (G1881)'), href: 'https://sellercentral.amazon.fr/help/hub/reference/external/G1881' },
    { label: tx(lang, 'Google Merchant Center, lien image', 'Google Merchant Center, image link', 'Google Merchant Center, Bildlink (Englisch)'), href: tx(lang, 'https://support.google.com/merchants/answer/6324350?hl=fr', 'https://support.google.com/merchants/answer/6324350?hl=en', 'https://support.google.com/merchants/answer/6324350?hl=en') },
    { label: tx(lang, 'Google Merchant Center, mise à jour 2026 des spécifications', 'Google Merchant Center, 2026 specification update', 'Google Merchant Center, Aktualisierung der Spezifikationen 2026'), href: tx(lang, 'https://support.google.com/merchants/answer/16989427?hl=fr', 'https://support.google.com/merchants/answer/16989427?hl=en', 'https://support.google.com/merchants/answer/16989427?hl=de') },
    { label: tx(lang, 'Zalando Partner University, consignes images', 'Zalando Partner University, image guidelines', 'Zalando Partner University, Bildrichtlinien'), href: 'https://partner.zalando.com/university/article/zalando-image-guidelines' },
    { label: tx(lang, 'Shopify, types de médias produit', 'Shopify, product media types', 'Shopify, Produktmedientypen (Englisch)'), href: tx(lang, 'https://help.shopify.com/fr/manual/products/product-media/product-media-types', 'https://help.shopify.com/en/manual/products/product-media/product-media-types', 'https://help.shopify.com/en/manual/products/product-media/product-media-types') },
  ];
}

const OPTIONS: { key: string; icon: LucideIcon; accent: string }[] = [
  { key: 'prestataire', icon: Handshake, accent: 'bg-neutral-100 text-future-dusk-700' },
  { key: 'interne', icon: Camera, accent: 'bg-very-peri-500 text-white' },
];

const CRITERES = ['volume', 'renouvellement', 'delai', 'coherence', 'logistique', 'equipe', 'cout'] as const;

const ETAPES_AUTO = ['preparation', 'reglages', 'capture', 'detourage', 'miseEnForme', 'export'] as const;

const FLUX: { key: string; icon: LucideIcon }[] = [
  { key: 'identification', icon: ScanBarcode },
  { key: 'capture', icon: Camera },
  { key: 'controle', icon: Eye },
  { key: 'declinaisons', icon: Crop },
  { key: 'publication', icon: Send },
];

const INTEGRATIONS: { key: string; icon: LucideIcon }[] = [
  { key: 'export', icon: FolderOutput },
  { key: 'modules', icon: Store },
  { key: 'conditions', icon: KeyRound },
  { key: 'outils', icon: Database },
];

function sourcesIntegrations(lang: string) {
  return [
    { label: tx(lang, 'plateformes e-commerce prises en charge', 'supported e-commerce platforms', 'unterstützte E-Commerce-Plattformen'), href: 'https://public.manuals.orbitvu.com/m/68548/l/746645-supported-ecommerce-shop-platforms-and-demo-shops' },
    { label: tx(lang, 'types de modules e-commerce', 'types of e-commerce plugins', 'Arten von E-Commerce-Modulen'), href: 'https://public.manuals.orbitvu.com/m/68548/l/746592-types-of-orbitvu-ecommerce-plugins' },
  ];
}

// Articles liés : slug de chaque langue relevé dans content/blog/alternates.json et
// content/guides/alternates.json (28/09/2026). « prestataire » est un article statique
// bilingue fr/en (i18n/deChCoverage, STATIC_BILINGUAL_BLOG). Sans version de-ch, le lien
// de-ch pointe vers la version anglaise, signalée « (auf Englisch) » dans le texte.
type Langue = 'fr' | 'en' | 'de-ch';
const ARTICLES: Record<string, { gabarit: '/blog/[slug]' | '/guide/[slug]'; slugs: Partial<Record<Langue, string>> }> = {
  guidePackshot: {
    gabarit: '/blog/[slug]',
    slugs: { fr: 'guide-photographie-packshot-pourquoi-faire-packshots', en: 'packshot-photography-guide-why-make-product-packshots', 'de-ch': 'leitfaden-packshot-fotografie-warum-packshots-machen' },
  },
  prestataire: {
    gabarit: '/blog/[slug]',
    slugs: { fr: 'prestataire-packshot-vs-studio-interne', en: 'prestataire-packshot-vs-studio-interne' },
  },
  collection: {
    gabarit: '/guide/[slug]',
    slugs: { fr: 'visuels-collection-produits-homogenes', en: 'consistent-product-image-collection' },
  },
  migration: {
    gabarit: '/blog/[slug]',
    slugs: { fr: 'migrer-ancien-packshotcreator', en: 'migrate-legacy-packshotcreator-studio', 'de-ch': 'altes-packshotcreator-studio-migrieren' },
  },
};

function cibleArticle(cle: keyof typeof ARTICLES, lang: Langue): { href: Href; locale: Langue } {
  const { gabarit, slugs } = ARTICLES[cle];
  const locale: Langue = slugs[lang] ? lang : slugs.en ? 'en' : 'fr';
  return { href: { pathname: gabarit, params: { slug: slugs[locale] as string } }, locale };
}

const STUDIOS: { key: string; slug: string; img: string; w: number; h: number }[] = [
  { key: 'micro', slug: 'alphashot-micro-v2', img: '/images/machines/alphashot-micro-v2.avif', w: 1000, h: 1000 },
  { key: 'a360', slug: 'alphashot-360', img: '/images/machines/alphashot-360.avif', w: 1000, h: 1000 },
  { key: 'prog2', slug: 'alphashot-pro-g2', img: '/images/machines/alphashot-pro-g2.avif', w: 996, h: 996 },
  { key: 'xlg2', slug: 'alphashot-xl-g2', img: '/images/machines/alphashot-xl-g2.avif', w: 1600, h: 893 },
  { key: 'compact', slug: 'alphastudio-compact-v2', img: '/images/machines/alphastudio-compact.avif', w: 1000, h: 1000 },
  { key: 'xxl', slug: 'alphastudio-xxl-v2', img: '/images/machines/alphastudio-xxl.avif', w: 1000, h: 1000 },
  { key: 'alphatable', slug: 'alphatable', img: '/images/machines/alphatable-alphadesk.avif', w: 1000, h: 1000 },
  { key: 'furniture', slug: 'furniture-studio', img: '/images/machines/furniture-studio.avif', w: 1000, h: 1000 },
];

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9'] as const;

const CLASSE_LIEN =
  'font-medium text-very-peri-600 underline decoration-very-peri-200 underline-offset-4 hover:decoration-very-peri-500 transition-colors';

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

function gras(chunks: ReactNode) {
  return <strong className="font-semibold text-future-dusk-900">{chunks}</strong>;
}

/** Empêche la coupure de ligne au trait d'union de « e-commerce » dans les titres. */
function sansCesure(texte: string): ReactNode {
  const morceaux = texte.split(/(e-commerce)/i);
  if (morceaux.length === 1) return texte;
  return morceaux.map((m, i) => (i % 2 === 1 ? <span key={i} className="whitespace-nowrap">{m}</span> : m));
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
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1] mb-5">
        {sansCesure(heading)}
      </h2>
      {intro && <p className="text-lg text-future-dusk-500 leading-relaxed">{intro}</p>}
    </div>
  );
}

/** Libellé de colonne affiché au-dessus de chaque cellule quand le tableau passe en cartes (mobile). */
function LibelleMobile({ children }: { children: ReactNode }) {
  return <span className="md:hidden block text-[11px] font-semibold uppercase tracking-wider text-future-dusk-400 mb-1">{children}</span>;
}

export default async function PackshotEcommerce({ lang }: { lang: Langue }) {
  const t = await getTranslations({ locale: lang, namespace: 'packshotEcommerce' });
  const urlPage = `${SITE}/${lang}/${SLUG}`;
  const epingle = (href: Href) => navPinLocale(lang, href);
  const retour = t('sommaire.retour');

  const faqs = FAQ_KEYS.map((k) => ({ question: t(`faq.${k}.question`), answer: t(`faq.${k}.answer`) }));

  const breadcrumbs = [
    { name: 'PackshotCreator', url: `${SITE}/${lang}` },
    { name: t('breadcrumb'), url: urlPage },
  ];

  return (
    <>
      {/* ━━ HERO ━━ Mêmes styles que HeroSection (split), mais le texte précède la galerie sur mobile. */}
      <section className="relative overflow-hidden text-white bg-gradient-to-br from-future-dusk-900 via-future-dusk-800 to-very-peri-800">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full bg-white/10 text-very-peri-200">
                <ShoppingCart className="h-4 w-4" aria-hidden="true" />
                {t('hero.badge')}
              </span>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.5rem] font-heading font-bold text-white leading-[1.1] tracking-tight">
                {sansCesure(t('hero.title'))}
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
              <p className="mt-8 text-future-dusk-500 leading-relaxed">
                {t.rich('bref.guide', {
                  lien: lienArticle(lang, 'guidePackshot'),
                })}
              </p>
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
            {/* Logos en chargement différé : en eager, React émettait 9 <link rel="preload"> dans le <head> (mesure du 28/09). */}
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

      {/* ━━ R1 — LA SÉRIE ━━ */}
      <section id="serie" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <EnTete eyebrow={t('r1.eyebrow')} heading={t('r1.heading')} retour={retour} />
              <div className="space-y-5 text-future-dusk-600 leading-relaxed">
                <p>{t('r1.p1')}</p>
                <p>{t('r1.p2')}</p>
              </div>
            </div>
            <figure className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 bg-white rounded-3xl p-4 sm:p-6 border border-neutral-100 shadow-sm">
                {SERIE.map((img) => (
                  <div key={img.key} className="aspect-square rounded-xl bg-white border border-neutral-100 flex items-center justify-center p-2">
                    <Image
                      src={img.src}
                      alt={t(`r1.alts.${img.key}`)}
                      width={img.w}
                      height={img.h}
                      sizes="(min-width: 1024px) 260px, 45vw"
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>
              <figcaption className="mt-4 text-sm text-future-dusk-500 text-center">{t('r1.serieCaption')}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ━━ R2 — CE QU'UNE FICHE PRODUIT DOIT MONTRER ━━ */}
      <section id="fiche-produit" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r2.eyebrow')} heading={t('r2.heading')} intro={t('r2.intro')} retour={retour} />

          {/* Cinq vues d'une même monture, en chargement différé (aucun préchargement). */}
          <div className="mt-12 grid lg:grid-cols-12 gap-6">
            <figure className="lg:col-span-7">
              <div className="rounded-2xl overflow-hidden border border-neutral-100">
                <Image
                  src={LUNETTES_PRINCIPALE.src}
                  alt={t(`r2.vues.${LUNETTES_PRINCIPALE.key}.alt`)}
                  width={LUNETTES_PRINCIPALE.w}
                  height={LUNETTES_PRINCIPALE.h}
                  sizes="(min-width: 1280px) 700px, (min-width: 1024px) 56vw, 92vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mt-3 text-sm text-future-dusk-600 leading-relaxed">
                <span className="font-semibold text-future-dusk-900">{t(`r2.vues.${LUNETTES_PRINCIPALE.key}.titre`)}</span> : {t(`r2.vues.${LUNETTES_PRINCIPALE.key}.texte`)}
              </figcaption>
            </figure>
            <div className="lg:col-span-5 grid grid-cols-2 gap-x-4 gap-y-6 content-start">
              {LUNETTES_VUES.map((v) => (
                <figure key={v.key}>
                  <div className="rounded-2xl overflow-hidden border border-neutral-100">
                    <Image
                      src={v.src}
                      alt={t(`r2.vues.${v.key}.alt`)}
                      width={v.w}
                      height={v.h}
                      sizes="(min-width: 1280px) 240px, (min-width: 1024px) 19vw, 45vw"
                      className="w-full h-auto"
                    />
                  </div>
                  <figcaption className="mt-2 text-sm text-future-dusk-600 leading-snug">
                    <span className="font-semibold text-future-dusk-900">{t(`r2.vues.${v.key}.titre`)}</span> : {t(`r2.vues.${v.key}.texte`)}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-5">{t('r2.complementsTitre')}</h3>
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {COMPLEMENTS.map(({ key, icon: Icon }) => (
                <li key={key} className="flex gap-3">
                  <Icon className="h-5 w-5 mt-0.5 shrink-0 text-very-peri-500" aria-hidden="true" />
                  <p className="text-sm text-future-dusk-600 leading-relaxed">
                    <span className="font-semibold text-future-dusk-900">{t(`r2.complements.${key}.titre`)}</span> : {t(`r2.complements.${key}.texte`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <details className="group mt-8 text-xs text-future-dusk-500">
            <summary className="inline-flex min-h-6 items-center gap-1.5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden font-semibold uppercase tracking-wider hover:text-very-peri-600 transition-colors">
              {t('r2.sources')} ({sourcesUx(lang).length})
              <ChevronDown className="h-3.5 w-3.5 group-open:rotate-180 transition-transform" aria-hidden="true" />
            </summary>
            <ul className="mt-3 space-y-1.5 leading-relaxed">
              {sourcesUx(lang).map((s) => (
                <li key={s.href}>
                  <LienExterne href={s.href}>{s.label}</LienExterne>
                </li>
              ))}
            </ul>
          </details>
        </div>
      </section>

      {/* ━━ R3 — PLATEFORMES ━━ */}
      <section id="marketplaces" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r3.eyebrow')} heading={t('r3.heading')} intro={t('r3.intro')} retour={retour} />
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {PRINCIPES.map((k) => (
              <li key={k} className="flex gap-4">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-very-peri-500 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-future-dusk-900">{t(`r3.principes.${k}.title`)}</h3>
                  <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-wider text-very-peri-600">{t(`r3.principes.${k}.portee`)}</p>
                  <p className="mt-1.5 text-sm text-future-dusk-500 leading-relaxed">{t(`r3.principes.${k}.text`)}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-14 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 sm:px-8 py-5 border-b border-neutral-100">
              <h3 className="font-heading font-bold text-lg text-future-dusk-900">{t('r3.tableTitle')}</h3>
              <p className="inline-flex items-center gap-2 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-full px-3 py-1">
                <Info className="h-3.5 w-3.5" aria-hidden="true" />
                {t('r3.tableNote')}
              </p>
            </div>
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  {(['plateforme', 'fond', 'definition', 'noter'] as const).map((c) => (
                    <th key={c} scope="col" className="px-6 py-3 font-semibold">{t(`r3.columns.${c}`)}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {PLATEFORMES.map((p) => (
                  <tr key={p} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                    <th scope="row" className="block md:table-cell md:px-6 md:py-4 font-heading font-bold text-future-dusk-900 align-top mb-2 md:mb-0">
                      {t(`r3.rows.${p}.nom`)}
                    </th>
                    {(['fond', 'definition', 'noter'] as const).map((c) => (
                      <td key={c} className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                        <LibelleMobile>{t(`r3.columns.${c}`)}</LibelleMobile>
                        {t(`r3.rows.${p}.${c}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-5 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50 text-xs text-future-dusk-500 leading-relaxed">
              <span className="font-semibold uppercase tracking-wider mr-2">{t('r3.sources')}</span>
              {sourcesPlateformes(lang).map((s, i, liste) => (
                <span key={s.href}>
                  <LienExterne href={s.href}>{s.label}</LienExterne>
                  {i < liste.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-future-dusk-600">{t.rich('r3.lienAmazon', { lien: lien(lang, '/packshot-amazon') })}</p>
        </div>
      </section>

      {/* ━━ R4 — INTERNE OU PRESTATAIRE ━━ */}
      <section id="choisir" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r4.eyebrow')} heading={t('r4.heading')} intro={t('r4.intro')} retour={retour} />
          <ul className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-6">
            {OPTIONS.map(({ key, icon: Icon, accent }) => (
              <li key={key} className="rounded-2xl border border-neutral-100 p-6 lg:p-8 bg-white shadow-sm">
                <span className={`inline-flex h-11 w-11 items-center justify-center rounded-xl mb-5 ${accent}`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-3">{t(`r4.options.${key}.title`)}</h3>
                <p className="text-future-dusk-500 leading-relaxed">{t(`r4.options.${key}.text`)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-4 lg:mt-6 rounded-2xl bg-very-peri-50 border border-very-peri-100 p-6 lg:p-8 flex flex-col sm:flex-row gap-4 sm:gap-6">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-very-peri-600">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-2">{t('r4.ia.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('r4.ia.text')}</p>
              <p className="mt-3 text-future-dusk-600">{t.rich('r4.ia.lien', { lien: lien(lang, '/ia-photo-produit') })}</p>
            </div>
          </div>

          <div className="mt-14">
            <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">{t('r4.grilleTitle')}</h3>
            <div className="rounded-3xl border border-neutral-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-semibold w-1/4">{t('r4.columns.critere')}</th>
                    <th scope="col" className="px-6 py-3 font-semibold">{t('r4.columns.prestataire')}</th>
                    <th scope="col" className="px-6 py-3 font-semibold">{t('r4.columns.interne')}</th>
                  </tr>
                </thead>
                <tbody className="block md:table-row-group">
                  {CRITERES.map((c) => (
                    <tr key={c} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                      <th scope="row" className="block md:table-cell md:px-6 md:py-4 font-heading font-bold text-future-dusk-900 align-top mb-2 md:mb-0">
                        {t(`r4.rows.${c}.critere`)}
                      </th>
                      <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                        <LibelleMobile>{t('r4.columns.prestataire')}</LibelleMobile>
                        {t(`r4.rows.${c}.prestataire`)}
                      </td>
                      <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                        <LibelleMobile>{t('r4.columns.interne')}</LibelleMobile>
                        {t(`r4.rows.${c}.interne`)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-6 text-future-dusk-600 leading-relaxed max-w-4xl">{t('r4.note')}</p>
            <p className="mt-3 text-future-dusk-600 leading-relaxed max-w-4xl">
              {t.rich('r4.liens', {
                lien: lienArticle(lang, 'prestataire'),
                lien2: lien(lang, '/calculateur-roi'),
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ━━ R5 — AUTOMATISÉ / OPÉRATEUR, PUIS PASSAGE DE TERRAIN ━━ */}
      <section id="automatisation" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-7">
              <EnTete eyebrow={t('r5.eyebrow')} heading={t('r5.heading')} intro={t('r5.intro')} retour={retour} />
            </div>
            {/* Photo 1920 × 946 dont seule la moitié gauche est utile : recadrage carré ancré à gauche, d'où des sizes doublées. */}
            <figure className="lg:col-span-5">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-black">
                <Image
                  src="/images/machines/alphashot-pro-g2/session.avif"
                  alt={t('r5.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 960px, 190vw"
                  className="object-cover object-left"
                />
              </div>
              <figcaption className="mt-3 text-sm text-future-dusk-500 text-center">{t('r5.imageCaption')}</figcaption>
            </figure>
          </div>

          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  <th scope="col" className="px-6 py-3 font-semibold w-1/5">{t('r5.columns.etape')}</th>
                  <th scope="col" className="px-6 py-3 font-semibold bg-very-peri-600">{t('r5.columns.auto')}</th>
                  <th scope="col" className="px-6 py-3 font-semibold">{t('r5.columns.humain')}</th>
                </tr>
              </thead>
              <tbody className="block md:table-row-group">
                {ETAPES_AUTO.map((e, i) => (
                  <tr key={e} className="block md:table-row border-t border-neutral-100 px-5 py-4 md:p-0">
                    <th scope="row" className="block md:table-cell md:px-6 md:py-4 font-heading font-bold text-future-dusk-900 align-top mb-2 md:mb-0">
                      <span className="text-very-peri-500 tabular-nums mr-2">{i + 1}.</span>
                      {t(`r5.rows.${e}.etape`)}
                    </th>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-900 align-top py-1 md:bg-very-peri-50/60">
                      <LibelleMobile>{t('r5.columns.auto')}</LibelleMobile>
                      {t(`r5.rows.${e}.auto`)}
                    </td>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-top py-1">
                      <LibelleMobile>{t('r5.columns.humain')}</LibelleMobile>
                      {t(`r5.rows.${e}.humain`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Passage validé par Sébastien (28/09/2026) : repères de terrain, chiffres et conditions dans le même paragraphe. */}
          <div className="mt-16 max-w-3xl">
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-future-dusk-900 leading-tight mb-6">{t('r5.terrain.titre')}</h3>
            <div className="space-y-5 text-lg text-future-dusk-700 leading-relaxed">
              <p>{t('r5.terrain.p1')}</p>
              <p>{t('r5.terrain.p2')}</p>
              <p>{t.rich('r5.terrain.p3', { b: gras })}</p>
              <p>{t('r5.terrain.p4')}</p>
              <p>{t('r5.terrain.p5')}</p>
              <p>{t.rich('r5.terrain.p6', { b: gras })}</p>
              <p>{t('r5.terrain.p7')}</p>
            </div>
            <p className="mt-6 pl-4 border-l-2 border-very-peri-300 text-sm text-future-dusk-500 leading-relaxed">{t('r5.terrain.attribution')}</p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="rounded-2xl bg-white border border-neutral-100 p-6">
              <GraduationCap className="h-6 w-6 text-very-peri-500 mb-3" aria-hidden="true" />
              <p className="text-future-dusk-600 leading-relaxed">{t('r5.savoirFaire')}</p>
            </div>
            <div className="rounded-2xl bg-white border border-neutral-100 p-6">
              <Sparkles className="h-6 w-6 text-very-peri-500 mb-3" aria-hidden="true" />
              <p className="text-future-dusk-600 leading-relaxed">{t('r5.ia')}</p>
            </div>
          </div>
          <p className="mt-6 text-future-dusk-600">
            {t.rich('r5.lienGuide', {
              lien: lienArticle(lang, 'collection'),
            })}
          </p>
        </div>
      </section>

      {/* ━━ R6 — EXPORTS ━━ */}
      <section id="workflow" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r6.eyebrow')} heading={t('r6.heading')} intro={t('r6.intro')} retour={retour} />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {FLUX.map(({ key, icon: Icon }, i) => (
              <li key={key} className="relative rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-future-dusk-900 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-2xl font-heading font-bold text-very-peri-200 tabular-nums" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2">{t(`r6.steps.${key}.title`)}</h3>
                <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`r6.steps.${key}.text`)}</p>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-7">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">{t('r6.integrationsTitle')}</h3>
              <ul className="grid sm:grid-cols-2 gap-4">
                {INTEGRATIONS.map(({ key, icon: Icon }) => (
                  <li key={key} className="rounded-2xl border border-neutral-200 p-5">
                    <p className="flex items-center gap-2 font-heading font-bold text-future-dusk-900 mb-2">
                      <Icon className="h-5 w-5 text-very-peri-500" aria-hidden="true" />
                      {t(`r6.integrations.${key}.titre`)}
                    </p>
                    <p className="text-sm text-future-dusk-600 leading-relaxed">{t(`r6.integrations.${key}.texte`)}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-future-dusk-500 leading-relaxed">
                <span className="font-semibold uppercase tracking-wider mr-2">{t('r6.sourcesIntegrations')}</span>
                {sourcesIntegrations(lang).map((s, i, liste) => (
                  <span key={s.href}>
                    <LienExterne href={s.href}>{s.label}</LienExterne>
                    {i < liste.length - 1 ? ' · ' : ''}
                  </span>
                ))}
              </p>
            </div>
            <figure className="lg:col-span-5 rounded-3xl bg-neutral-50 border border-neutral-100 p-4 sm:p-6">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/machines/alphashot-360/soft-bg-removal.avif"
                  alt={t('r6.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-3 text-sm text-future-dusk-500 text-center">{t('r6.imageCaption')}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ━━ R7 — QUEL STUDIO POUR QUELS PRODUITS ━━ */}
      <section id="studios" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r7.eyebrow')} heading={t('r7.heading')} intro={t('r7.intro')} retour={retour} />
          <div className="mt-12 rounded-3xl bg-white border border-neutral-200 overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                <tr>
                  {(['studio', 'produits', 'gabarit', 'cadence'] as const).map((c) => (
                    <th key={c} scope="col" className="px-6 py-3 font-semibold">{t(`r7.columns.${c}`)}</th>
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
                            {t(`r7.rows.${s.key}.nom`)}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-normal text-very-peri-500">
                            {t('r7.voirFiche')} <ArrowRight className="h-3 w-3" aria-hidden="true" />
                          </span>
                        </span>
                      </Link>
                    </th>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-middle py-1">
                      <LibelleMobile>{t('r7.columns.produits')}</LibelleMobile>
                      {t(`r7.rows.${s.key}.produits`)}
                    </td>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-900 font-medium align-middle py-1 md:whitespace-nowrap">
                      <LibelleMobile>{t('r7.columns.gabarit')}</LibelleMobile>
                      {t(`r7.rows.${s.key}.gabarit`)}
                    </td>
                    <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-600 align-middle py-1">
                      <LibelleMobile>{t('r7.columns.cadence')}</LibelleMobile>
                      {t(`r7.rows.${s.key}.cadence`)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-future-dusk-500 leading-relaxed">{t('r7.note')}</p>
          <p className="mt-6 text-future-dusk-600">
            {t.rich('r7.liens', {
              lien: lien(lang, '/studio-photo/selecteur-machines'),
              lien2: lien(lang, '/studios-photo-automatises'),
            })}
          </p>
        </div>
      </section>

      {/* ━━ R8 — BUDGET, FINANCEMENT, FORMATION, ACCOMPAGNEMENT ━━ */}
      <section id="cout-complet" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r8.eyebrow')} heading={t('r8.heading')} retour={retour} />
          <div className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="rounded-3xl bg-future-dusk-900 text-white p-6 lg:p-8 flex flex-col">
              <Calculator className="h-7 w-7 text-very-peri-300 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3">{t('r8.cout.title')}</h3>
              <p className="text-future-dusk-200 leading-relaxed flex-1">{t('r8.cout.text')}</p>
              <Button asChild className="mt-6 w-fit bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl px-6 h-11">
                <Link href="/calculateur-roi" locale={epingle('/calculateur-roi')}>
                  {t('r8.cout.cta')} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-neutral-50 p-6 lg:p-8">
              <Wallet className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('r8.financement.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('r8.financement.text')}</p>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-neutral-50 p-6 lg:p-8">
              <GraduationCap className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('r8.formation.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('r8.formation.text')}</p>
              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm">
                <Link href="/academy/formations-packshot" locale={epingle('/academy/formations-packshot')} className={`inline-flex min-h-6 items-center ${CLASSE_LIEN}`}>{t('r8.formation.cta')}</Link>
                <Link href="/academy/simulateur-opco" locale={epingle('/academy/simulateur-opco')} className={`inline-flex min-h-6 items-center ${CLASSE_LIEN}`}>{t('r8.formation.cta2')}</Link>
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-neutral-50 p-6 lg:p-8">
              <Handshake className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('r8.accompagnement.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('r8.accompagnement.text')}</p>
              <p className="mt-4 text-sm text-future-dusk-600">
                {t.rich('r8.accompagnement.migration', {
                  lien: lienArticle(lang, 'migration'),
                })}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ FAQ ━━ */}
      <section id="faq" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12">
            <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em]">FAQ</span>
                <RetourSommaire label={retour} />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-future-dusk-900 leading-[1.1]">{sansCesure(t('faq.heading'))}</h2>
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

      {/* Exclus ici : deux articles dont les chiffres de conversion et de retours, ou le titre absolu,
          contredisent la page (audit du 28/09/2026 consigné dans JOURNAL.md). */}
      <MoneyPageResources
        slug={SLUG}
        lang={lang}
        exclure={['taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques', 'comment-avoir-meilleure-photo-produit-e-commerce']}
      />

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
