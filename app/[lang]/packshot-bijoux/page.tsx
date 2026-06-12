import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotLandingTemplate, { type PackshotLandingConfig } from '@/components/templates/PackshotLandingTemplate';
import { Gem, ScanSearch, RotateCw, Eraser, Zap, ShoppingBag } from 'lucide-react';

const CONFIG: PackshotLandingConfig = {
  namespace: 'packshotBijoux',
  slug: 'packshot-bijoux',
  benefitImageSlug: 'bijoux',
  heroIcon: Gem,
  heroBadge: { fr: 'Bijoux & Joaillerie', en: 'Jewelry & Watchmaking' },
  benefitIcons: [ScanSearch, RotateCw, Eraser, Zap, ShoppingBag],
  machineIds: ['alphashot-micro-v2', 'alphashot-xl-v2'],
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
      languages: { fr: `/fr/${CONFIG.slug}`, en: `/en/${CONFIG.slug}`, 'x-default': `/fr/${CONFIG.slug}` },
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function PackshotBijouxPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });

  return <PackshotLandingTemplate config={CONFIG} lang={lang} t={t} />;
}
