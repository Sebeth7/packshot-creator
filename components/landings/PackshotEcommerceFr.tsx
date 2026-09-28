/**
 * Landing /fr/packshot-e-commerce — version FR dédiée (chantier F5, 28/09/2026).
 *
 * Composant page-scopé : seule la version FR l'utilise. EN et de-ch restent sur
 * PackshotLandingTemplate, partagé par quatre landings × trois langues, qui n'est
 * pas modifié. Le texte vit dans messages/fr.json (namespace packshotEcommerce) ;
 * ce fichier ne porte que la mise en page, les images et les cibles de liens.
 *
 * Données machines : valeurs publiées par Orbitvu (fiches orbitvu.com relevées le
 * 28/09/2026), pas celles de machines.ts. Les écarts sont consignés dans
 * docs/seo-geo/JOURNAL.md (entrée F5 du 28/09/2026).
 */
import type { ComponentProps, ReactNode } from 'react';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/hero';
import { ContactForm } from '@/components/forms/ContactForm';
import { MoneyPageResources } from '@/components/maillage/MaillageSections';
import SchemaOrg, { organizationSchema, breadcrumbSchema, faqSchema } from '@/components/seo/SchemaOrg';
import {
  ArrowRight,
  Box,
  Calculator,
  Camera,
  Check,
  ChevronDown,
  Clapperboard,
  Crop,
  Eye,
  GraduationCap,
  Handshake,
  Image as ImageIcon,
  Info,
  Layers,
  Lightbulb,
  PackageOpen,
  Palette,
  Ruler,
  ScanBarcode,
  ScanSearch,
  Send,
  ShoppingCart,
  Sparkles,
  Truck,
  Wallet,
  Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type Href = ComponentProps<typeof Link>['href'];

const SLUG = 'packshot-e-commerce';
const URL_PAGE = `https://www.packshot-creator.com/fr/${SLUG}`;

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

const HERO_MOSAIQUE = [
  { key: 'coat', src: '/images/machines/alphatable-alphadesk/packshot-coat.avif', w: 1200, h: 1200 },
  { key: 'mascara', src: '/images/machines/alphashot-pro-g2/packshot-mascara.avif', w: 1080, h: 1080 },
  { key: 'bag', src: '/images/machines/alphastudio-compact/packshot-bag.avif', w: 1080, h: 1080 },
  { key: 'chair', src: '/images/machines/alphastudio-compact/packshot-chair.avif', w: 1080, h: 1080 },
] as const;

const SERIE = [
  { key: 'blouse', src: '/images/machines/alphatable-alphadesk/packshot-blouse.avif', w: 1200, h: 1105 },
  { key: 'coat', src: '/images/machines/alphatable-alphadesk/packshot-coat.avif', w: 1200, h: 1200 },
  { key: 'dress', src: '/images/machines/alphatable-alphadesk/packshot-dress.avif', w: 1200, h: 1215 },
  { key: 'dungarees', src: '/images/machines/alphatable-alphadesk/packshot-dungarees.avif', w: 1200, h: 1215 },
] as const;

const SOMMAIRE = [
  { id: 'serie', key: 'r1' },
  { id: 'fiche-produit', key: 'r2' },
  { id: 'marketplaces', key: 'r3' },
  { id: 'choisir', key: 'r4' },
  { id: 'automatisation', key: 'r5' },
  { id: 'workflow', key: 'r6' },
  { id: 'studios', key: 'r7' },
  { id: 'cout-complet', key: 'r8' },
] as const;

const VUES: { key: string; icon: LucideIcon }[] = [
  { key: 'principale', icon: ImageIcon },
  { key: 'angles', icon: Box },
  { key: 'detail', icon: ScanSearch },
  { key: 'echelle', icon: Ruler },
  { key: 'variantes', icon: Palette },
  { key: 'colis', icon: PackageOpen },
  { key: 'mouvement', icon: Clapperboard },
];

const SOURCES_UX = [
  { label: 'Nielsen Norman Group, pages produit (2019)', href: 'https://www.nngroup.com/articles/ecommerce-product-pages/' },
  { label: 'Nielsen Norman Group, photos en liste produits (2022)', href: 'https://www.nngroup.com/articles/product-photos-listing-pages/' },
  { label: 'Baymard Institute, résolution et zoom', href: 'https://baymard.com/research-articles/ensure-sufficient-image-resolution-and-zoom' },
  { label: 'Baymard Institute, accessoires inclus', href: 'https://baymard.com/research-articles/included-accessories-image' },
  { label: 'De, Hu et Rahman, Information Systems Research (2013)', href: 'https://doi.org/10.1287/isre.2013.0487' },
];

const PRINCIPES = ['fidelite', 'entier', 'ajout', 'definition', 'fond', 'ia'] as const;

const PLATEFORMES = ['amazon', 'google', 'zalando', 'shopify'] as const;

const SOURCES_PLATEFORMES = [
  { label: 'Amazon Seller Central, exigences relatives aux images (G1881)', href: 'https://sellercentral.amazon.fr/help/hub/reference/external/G1881' },
  { label: 'Google Merchant Center, lien image', href: 'https://support.google.com/merchants/answer/6324350?hl=fr' },
  { label: 'Google Merchant Center, mise à jour 2026 des spécifications', href: 'https://support.google.com/merchants/answer/16989427?hl=fr' },
  { label: 'Zalando Partner University, consignes images', href: 'https://partner.zalando.com/university/article/zalando-image-guidelines' },
  { label: 'Shopify, types de médias produit', href: 'https://help.shopify.com/fr/manual/products/product-media/product-media-types' },
];

const OPTIONS: { key: string; icon: LucideIcon; accent: string }[] = [
  { key: 'prestataire', icon: Handshake, accent: 'bg-neutral-100 text-future-dusk-700' },
  { key: 'ia', icon: Sparkles, accent: 'bg-very-peri-50 text-very-peri-600' },
  { key: 'interne', icon: Camera, accent: 'bg-very-peri-500 text-white' },
];

const CRITERES = ['volume', 'rotation', 'delai', 'coherence', 'produits', 'ressources', 'cout'] as const;

const ETAPES_AUTO = ['preparation', 'reglages', 'capture', 'detourage', 'miseEnForme', 'export'] as const;

const FLUX: { key: string; icon: LucideIcon }[] = [
  { key: 'reception', icon: Truck },
  { key: 'preparation', icon: Wrench },
  { key: 'capture', icon: ScanBarcode },
  { key: 'controle', icon: Eye },
  { key: 'declinaisons', icon: Crop },
  { key: 'publication', icon: Send },
];

const INTEGRATIONS = ['boutiques', 'outils', 'amazon'] as const;

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

const FAQ_KEYS = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'] as const;

const CLASSE_LIEN =
  'font-medium text-very-peri-600 underline decoration-very-peri-200 underline-offset-4 hover:decoration-very-peri-500 transition-colors';

function lien(href: Href) {
  function LienRiche(chunks: ReactNode) {
    return (
      <Link href={href} className={CLASSE_LIEN}>
        {chunks}
      </Link>
    );
  }
  return LienRiche;
}

/** Empêche la coupure de ligne au trait d'union de « e-commerce » dans les titres. */
function sansCesure(texte: string): ReactNode {
  const morceaux = texte.split('e-commerce');
  if (morceaux.length === 1) return texte;
  return morceaux.flatMap((m, i) =>
    i === 0 ? [m] : [<span key={i} className="whitespace-nowrap">e-commerce</span>, m],
  );
}

function LienExterne({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-neutral-300 underline-offset-4 hover:text-very-peri-600 hover:decoration-very-peri-400 transition-colors">
      {children}
    </a>
  );
}

function EnTete({ eyebrow, heading, intro, centre = false }: { eyebrow: string; heading: string; intro?: string; centre?: boolean }) {
  return (
    <div className={centre ? 'max-w-3xl mx-auto text-center' : 'max-w-3xl'}>
      <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">{eyebrow}</span>
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

export default async function PackshotEcommerceFr() {
  const t = await getTranslations({ locale: 'fr', namespace: 'packshotEcommerce' });

  const faqs = FAQ_KEYS.map((k) => ({ question: t(`faq.${k}.question`), answer: t(`faq.${k}.answer`) }));

  const breadcrumbs = [
    { name: 'PackshotCreator', url: 'https://www.packshot-creator.com/fr' },
    { name: t('breadcrumb'), url: URL_PAGE },
  ];

  return (
    <>
      {/* ━━ HERO ━━ */}
      <HeroSection
        layout="split"
        badge={{
          icon: <ShoppingCart className="h-4 w-4" />,
          label: t('hero.badge'),
          colorClass: 'bg-white/10 text-very-peri-200',
        }}
        title={sansCesure(t('hero.title'))}
        subtitle={t('hero.subtitle')}
        ctas={[
          { label: t('hero.ctaPrimary'), href: '/contact', variant: 'primary' },
          { label: t('hero.ctaSecondary'), href: '/studio-photo/selecteur-machines', variant: 'secondary' },
        ]}
        media={
          <figure>
            <div className="grid grid-cols-4 lg:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
              {HERO_MOSAIQUE.map((img, i) => (
                <div key={img.key} className="bg-white rounded-xl lg:rounded-2xl p-1.5 sm:p-3 lg:p-4 shadow-xl shadow-black/20 aspect-square flex items-center justify-center">
                  <Image
                    src={img.src}
                    alt={t(`hero.alts.${img.key}`)}
                    width={img.w}
                    height={img.h}
                    sizes="(min-width: 1024px) 280px, 25vw"
                    className="w-full h-full object-contain"
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>
            <figcaption className="mt-3 lg:mt-4 text-xs sm:text-sm text-future-dusk-300 text-center">{t('hero.mosaicCaption')}</figcaption>
          </figure>
        }
      />

      {/* ━━ EN BREF + SOMMAIRE ━━ */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">{t('bref.label')}</span>
              <p className="text-xl lg:text-2xl text-future-dusk-900 leading-relaxed font-medium">{t('bref.definition')}</p>
              <p className="mt-6 text-future-dusk-500 leading-relaxed">{t('bref.positionnement')}</p>
              <p className="mt-4 text-future-dusk-500 leading-relaxed">
                {t.rich('bref.guide', {
                  lien: lien({ pathname: '/blog/[slug]', params: { slug: 'guide-photographie-packshot-pourquoi-faire-packshots' } }),
                })}
              </p>
            </div>
            <nav aria-label="Sommaire" className="lg:col-span-5 lg:pl-8 lg:border-l border-neutral-100">
              <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-x-6 gap-y-1">
                {SOMMAIRE.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex items-baseline gap-3 py-2 text-future-dusk-700 hover:text-very-peri-600 transition-colors">
                      <span className="text-xs font-semibold text-very-peri-400 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                      <span className="font-medium">{t(`${s.key}.eyebrow`)}</span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#faq" className="group flex items-baseline gap-3 py-2 text-future-dusk-700 hover:text-very-peri-600 transition-colors">
                    <span className="text-xs font-semibold text-very-peri-400">09</span>
                    <span className="font-medium">FAQ</span>
                  </a>
                </li>
              </ol>
            </nav>
          </div>

          <div className="mt-14 pt-10 border-t border-neutral-100">
            <p className="text-center text-xs font-semibold text-neutral-400 uppercase tracking-[0.15em] mb-6">{t('bref.logos')}</p>
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
                      loading="eager"
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
              <EnTete eyebrow={t('r1.eyebrow')} heading={t('r1.heading')} />
              <div className="space-y-5 text-future-dusk-600 leading-relaxed">
                <p>{t('r1.p1')}</p>
                <p>{t('r1.p2')}</p>
                <p>{t('r1.p3')}</p>
                <p>{t.rich('r1.lienIa', { lien: lien('/ia-photo-produit') })}</p>
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
          <EnTete eyebrow={t('r2.eyebrow')} heading={t('r2.heading')} intro={t('r2.intro')} />
          <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
            {VUES.map(({ key, icon: Icon }) => (
              <li key={key} className="rounded-2xl border border-neutral-100 bg-neutral-50 p-5 lg:p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-very-peri-500 border border-neutral-100 mb-4">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2">{t(`r2.cards.${key}.title`)}</h3>
                <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`r2.cards.${key}.text`)}</p>
              </li>
            ))}
            <li className="rounded-2xl bg-future-dusk-900 text-white p-5 lg:p-6 sm:col-span-2 lg:col-span-1">
              <Lightbulb className="h-6 w-6 text-very-peri-300 mb-4" aria-hidden="true" />
              <p className="text-sm text-future-dusk-100 leading-relaxed">{t('r2.nuance')}</p>
            </li>
          </ul>
          <div className="mt-8 text-xs text-future-dusk-400 leading-relaxed">
            <span className="font-semibold uppercase tracking-wider mr-2">{t('r2.sources')}</span>
            {SOURCES_UX.map((s, i) => (
              <span key={s.href}>
                <LienExterne href={s.href}>{s.label}</LienExterne>
                {i < SOURCES_UX.length - 1 ? ' · ' : ''}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ R3 — MARKETPLACES ━━ */}
      <section id="marketplaces" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r3.eyebrow')} heading={t('r3.heading')} intro={t('r3.intro')} />
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6">
            {PRINCIPES.map((k) => (
              <li key={k} className="flex gap-4">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-very-peri-500 text-white">
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-heading font-bold text-future-dusk-900">{t(`r3.principes.${k}.title`)}</h3>
                  <p className="mt-1 text-sm text-future-dusk-500 leading-relaxed">{t(`r3.principes.${k}.text`)}</p>
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
            <div className="px-5 sm:px-8 py-4 border-t border-neutral-100 bg-neutral-50 text-xs text-future-dusk-400 leading-relaxed">
              <span className="font-semibold uppercase tracking-wider mr-2">{t('r3.sources')}</span>
              {SOURCES_PLATEFORMES.map((s, i) => (
                <span key={s.href}>
                  <LienExterne href={s.href}>{s.label}</LienExterne>
                  {i < SOURCES_PLATEFORMES.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </div>
          </div>
          <p className="mt-6 text-future-dusk-600">{t.rich('r3.lienAmazon', { lien: lien('/packshot-amazon') })}</p>
        </div>
      </section>

      {/* ━━ R4 — PRESTATAIRE, IA OU STUDIO INTERNE ━━ */}
      <section id="choisir" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r4.eyebrow')} heading={t('r4.heading')} intro={t('r4.intro')} />
          <ul className="mt-12 grid md:grid-cols-3 gap-4 lg:gap-6">
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

          <div className="mt-14">
            <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">{t('r4.grilleTitle')}</h3>
            <div className="rounded-3xl border border-neutral-200 overflow-hidden">
              <table className="w-full text-sm text-left">
                <thead className="hidden md:table-header-group bg-future-dusk-900 text-white">
                  <tr>
                    <th scope="col" className="px-6 py-3 font-semibold w-1/4">{t('r4.columns.critere')}</th>
                    <th scope="col" className="px-6 py-3 font-semibold">{t('r4.columns.prestataire')}</th>
                    <th scope="col" className="px-6 py-3 font-semibold bg-very-peri-600">{t('r4.columns.interne')}</th>
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
                      <td className="block md:table-cell md:px-6 md:py-4 text-future-dusk-900 align-top py-1 md:bg-very-peri-50/60">
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
                lien: lien({ pathname: '/blog/[slug]', params: { slug: 'prestataire-packshot-vs-studio-interne' } }),
                lien2: lien('/calculateur-roi'),
              })}
            </p>
          </div>
        </div>
      </section>

      {/* ━━ R5 — AUTOMATISÉ / OPÉRATEUR ━━ */}
      <section id="automatisation" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-7">
              <EnTete eyebrow={t('r5.eyebrow')} heading={t('r5.heading')} intro={t('r5.intro')} />
            </div>
            <figure className="lg:col-span-5 rounded-3xl bg-white border border-neutral-100 p-4 sm:p-6">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src="/images/machines/alphashot-360/soft-bg-removal.avif"
                  alt={t('r5.imageAlt')}
                  fill
                  sizes="(min-width: 1024px) 460px, 92vw"
                  className="object-cover"
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
                      <span className="text-very-peri-400 tabular-nums mr-2">{i + 1}.</span>
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

          <div className="mt-8 grid md:grid-cols-2 gap-4 lg:gap-6">
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
              lien: lien({ pathname: '/guide/[slug]', params: { slug: 'visuels-collection-produits-homogenes' } }),
            })}
          </p>
        </div>
      </section>

      {/* ━━ R6 — WORKFLOW ━━ */}
      <section id="workflow" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r6.eyebrow')} heading={t('r6.heading')} intro={t('r6.intro')} />
          <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {FLUX.map(({ key, icon: Icon }, i) => (
              <li key={key} className="relative rounded-2xl border border-neutral-100 bg-neutral-50 p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-future-dusk-900 text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-2xl font-heading font-bold text-very-peri-200 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="font-heading font-bold text-future-dusk-900 mb-2">{t(`r6.steps.${key}.title`)}</h3>
                <p className="text-sm text-future-dusk-500 leading-relaxed">{t(`r6.steps.${key}.text`)}</p>
              </li>
            ))}
          </ol>

          <div className="mt-12 grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <figure className="lg:col-span-7 rounded-3xl overflow-hidden border border-neutral-100 bg-neutral-50">
              <Image
                src="/images/machines/alphashot-xl-g2/soft-station-capture.avif"
                alt={t('r6.imageAlt')}
                width={1400}
                height={875}
                sizes="(min-width: 1024px) 680px, 92vw"
                className="w-full h-auto"
              />
              <figcaption className="px-5 py-3 text-sm text-future-dusk-500">{t('r6.imageCaption')}</figcaption>
            </figure>
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl border border-neutral-200 p-6">
                <h3 className="font-heading font-bold text-future-dusk-900 mb-4 flex items-center gap-2">
                  <Layers className="h-5 w-5 text-very-peri-500" aria-hidden="true" />
                  {t('r6.integrationsTitle')}
                </h3>
                <ul className="space-y-3">
                  {INTEGRATIONS.map((k) => (
                    <li key={k} className="flex gap-3 text-sm text-future-dusk-600 leading-relaxed">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-very-peri-500" aria-hidden="true" />
                      <span>{t(`r6.integrations.${k}`)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-very-peri-50 border border-very-peri-100 p-6 flex gap-3">
                <Lightbulb className="h-5 w-5 mt-0.5 shrink-0 text-very-peri-600" aria-hidden="true" />
                <p className="text-sm text-future-dusk-700 leading-relaxed">{t('r6.astuce')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ R7 — QUEL STUDIO POUR QUELS PRODUITS ━━ */}
      <section id="studios" className="py-20 lg:py-28 bg-future-dusk-0 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r7.eyebrow')} heading={t('r7.heading')} intro={t('r7.intro')} />
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
                        className="group flex items-center gap-4"
                      >
                        <span className="h-14 w-14 shrink-0 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center p-1">
                          <Image src={s.img} alt="" width={s.w} height={s.h} sizes="56px" className="max-h-full w-auto object-contain" />
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
          <p className="mt-4 text-sm text-future-dusk-400 leading-relaxed">{t('r7.note')}</p>
          <p className="mt-6 text-future-dusk-600">
            {t.rich('r7.liens', {
              lien: lien('/studio-photo/selecteur-machines'),
              lien2: lien('/studios-photo-automatises'),
            })}
          </p>
        </div>
      </section>

      {/* ━━ R8 — COÛT, FINANCEMENT, FORMATION, ACCOMPAGNEMENT ━━ */}
      <section id="cout-complet" className="py-20 lg:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <EnTete eyebrow={t('r8.eyebrow')} heading={t('r8.heading')} />
          <div className="mt-12 grid md:grid-cols-2 gap-4 lg:gap-6">
            <div className="rounded-3xl bg-future-dusk-900 text-white p-6 lg:p-8 flex flex-col">
              <Calculator className="h-7 w-7 text-very-peri-300 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold mb-3">{t('r8.cout.title')}</h3>
              <p className="text-future-dusk-200 leading-relaxed flex-1">{t('r8.cout.text')}</p>
              <Button asChild className="mt-6 w-fit bg-very-peri-500 hover:bg-very-peri-600 text-white rounded-xl px-6 h-11">
                <Link href="/calculateur-roi">
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
                <Link href="/academy/formations-packshot" className={CLASSE_LIEN}>{t('r8.formation.cta')}</Link>
                <Link href="/academy/simulateur-opco" className={CLASSE_LIEN}>{t('r8.formation.cta2')}</Link>
              </div>
            </div>
            <div className="rounded-3xl border border-neutral-100 bg-neutral-50 p-6 lg:p-8">
              <Handshake className="h-7 w-7 text-very-peri-500 mb-4" aria-hidden="true" />
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">{t('r8.accompagnement.title')}</h3>
              <p className="text-future-dusk-600 leading-relaxed">{t('r8.accompagnement.text')}</p>
              <p className="mt-4 text-sm text-future-dusk-600">
                {t.rich('r8.accompagnement.migration', {
                  lien: lien({ pathname: '/blog/[slug]', params: { slug: 'migrer-ancien-packshotcreator' } }),
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
              <span className="text-xs font-semibold text-very-peri-500 uppercase tracking-[0.2em] mb-4 block">FAQ</span>
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

      {/* ━━ CTA FINAL ━━ */}
      <section className="py-20 lg:py-28 bg-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-center mb-12 lg:mb-16">{t('cta.heading')}</h2>
          <div className="grid lg:grid-cols-5 gap-4 lg:gap-8">
            <div className="lg:col-span-3 bg-white text-future-dusk-900 rounded-3xl p-4 sm:p-6 lg:p-10">
              <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-6">{t('cta.formTitle')}</h3>
              <ContactForm locale="fr" compact defaultRequestType="demo" />
            </div>
            <div className="lg:col-span-2 flex flex-col gap-4 lg:gap-8">
              <div className="bg-white/5 rounded-3xl p-5 sm:p-8 lg:p-10 border border-white/10 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4">{t('cta.roiTitle')}</h3>
                  <p className="text-future-dusk-300 mb-8 leading-relaxed">{t('cta.roiText')}</p>
                </div>
                <Button asChild className="bg-transparent border border-white/25 text-white hover:bg-white/10 rounded-xl px-6 h-11 text-sm sm:text-base w-fit">
                  <Link href="/calculateur-roi">
                    {t('cta.roiCta')} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                  </Link>
                </Button>
              </div>
              <div className="bg-gradient-to-br from-very-peri-500/20 to-very-peri-600/10 rounded-3xl p-5 sm:p-8 border border-very-peri-400/20">
                <p className="text-very-peri-200 text-sm leading-relaxed">{t('cta.demoNote')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ━━ EXPLOREZ ━━ */}
      <section className="py-20 bg-white border-t border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <span className="text-xs font-semibold text-primary-orbitvu uppercase tracking-[0.2em] block mb-10">{t('explore.label')}</span>
          <div className="grid md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
            {[
              { key: 'studios', href: '/studios-photo-automatises' as const, icon: <Camera className="h-5 w-5" aria-hidden="true" /> },
              { key: 'ia', href: '/ia-photo-produit' as const, icon: <Sparkles className="h-5 w-5" aria-hidden="true" /> },
              { key: 'academy', href: '/academy' as const, icon: <GraduationCap className="h-5 w-5" aria-hidden="true" /> },
            ].map((l) => (
              <Link key={l.key} href={l.href} className="group block px-4 sm:px-6 lg:px-8 py-6">
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

      <MoneyPageResources slug={SLUG} lang="fr" />

      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs), faqSchema(faqs)]} />
    </>
  );
}
