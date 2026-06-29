import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotLandingTemplate, { type PackshotLandingConfig } from '@/components/templates/PackshotLandingTemplate';
import { ShoppingCart, Package, Eraser, RotateCw, TrendingDown, Calculator } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

const CONFIG: PackshotLandingConfig = {
  namespace: 'packshotEcommerce',
  slug: 'packshot-e-commerce',
  benefitImageSlug: 'ecommerce',
  heroIcon: ShoppingCart,
  heroBadge: { fr: 'E-commerce & Marketplaces', en: 'E-commerce & Marketplaces' },
  benefitIcons: [Package, Eraser, RotateCw, TrendingDown, Calculator],
  machineIds: ['alphashot-360', 'alphashot-g2', 'alphashot-micro-v2'],
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

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/${CONFIG.slug}`,
      languages: buildLanguages(`/fr/${CONFIG.slug}`, { en: `/en/${CONFIG.slug}`, deCh: `/de-ch/${CONFIG.slug}` }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function PackshotEcommercePage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });

  return <PackshotLandingTemplate config={CONFIG} lang={lang} t={t} />;
}
