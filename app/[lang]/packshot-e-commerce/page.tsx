import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotLandingTemplate, { type PackshotLandingConfig } from '@/components/templates/PackshotLandingTemplate';
import PackshotEcommerceFr from '@/components/landings/PackshotEcommerceFr';
import { ShoppingCart, Package, Eraser, RotateCw, TrendingDown, Calculator } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

const CONFIG: PackshotLandingConfig = {
  namespace: 'packshotEcommerce',
  slug: 'packshot-e-commerce',
  benefitImageSlug: 'ecommerce',
  heroIcon: ShoppingCart,
  heroBadge: { fr: 'E-commerce & Marketplaces', en: 'E-commerce & Marketplaces' },
  benefitIcons: [Package, Eraser, RotateCw, TrendingDown, Calculator],
  machineIds: ['alphashot-360', 'alphashot-xl-g2', 'alphashot-micro-v2'],
  faqCount: 3,
};

interface PageProps {
  params: Promise<{ lang: string }>;
}

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });
  const url = `https://www.packshot-creator.com/${lang}/${CONFIG.slug}`;
  const ogImage = `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`;

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: url,
      languages: buildLanguages(`/fr/${CONFIG.slug}`, { en: `/en/${CONFIG.slug}`, deCh: `/de-ch/${CONFIG.slug}` }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: ogImage, width: 1200, height: 630 }],
      // FR seulement (F5) : l'openGraph de la page remplace celui du layout, qui fournissait url, locale et type.
      ...(lang === 'fr' ? { url, siteName: 'PackshotCreator', locale: 'fr_FR', type: 'website' as const } : {}),
    },
    // FR seulement (F5) : sans ce bloc, twitter:title reprend le titre générique du layout.
    ...(lang === 'fr'
      ? { twitter: { card: 'summary_large_image' as const, title: t('meta.title'), description: t('meta.description'), images: [ogImage] } }
      : {}),
  };
}

export default async function PackshotEcommercePage({ params }: PageProps) {
  const { lang } = await params;

  // FR : version dédiée (chantier F5, 28/09/2026). EN et de-ch restent sur le
  // gabarit partagé, inchangé, en attendant leur propre réécriture.
  if (lang === 'fr') return <PackshotEcommerceFr />;

  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });

  return <PackshotLandingTemplate config={CONFIG} lang={lang} t={t} />;
}
