import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotLandingTemplate, { type PackshotLandingConfig } from '@/components/templates/PackshotLandingTemplate';
import { ShoppingCart, Target, RotateCw, Layers, FileImage } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

const CONFIG: PackshotLandingConfig = {
  namespace: 'packshotAmazon',
  slug: 'packshot-amazon',
  benefitImageSlug: 'amazon',
  heroIcon: ShoppingCart,
  heroBadge: { fr: 'Amazon & Marketplaces', en: 'Amazon & Marketplaces' },
  benefitIcons: [Target, ShoppingCart, RotateCw, Layers, FileImage],
  machineIds: ['alphashot-360', 'alphashot-g2'],
  faqCount: 3,
};

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/${CONFIG.slug}`,
      languages: buildLanguages(`/fr/${CONFIG.slug}`, { en: `/en/${CONFIG.slug}` }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function PackshotAmazonPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });

  return <PackshotLandingTemplate config={CONFIG} lang={lang} t={t} />;
}
