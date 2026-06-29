import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotLandingTemplate, { type PackshotLandingConfig } from '@/components/templates/PackshotLandingTemplate';
import { Wrench, RotateCw, Lightbulb, Repeat, Plug } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

const CONFIG: PackshotLandingConfig = {
  namespace: 'packshotIndustriel',
  slug: 'packshot-industriel',
  benefitImageSlug: 'industriel',
  heroIcon: Wrench,
  heroBadge: { fr: 'Industrie & Technique', en: 'Industry & Technical' },
  benefitIcons: [Wrench, RotateCw, Lightbulb, Repeat, Plug],
  machineIds: ['alphashot-xl-v2', 'alphashot-pro-g2'],
  faqCount: 3,
};

interface PageProps {
  params: Promise<{ lang: string }>;
}

// Segment de-ch localisé (Suisse alémanique) — voir i18n/routing.ts pathnames.
const DE_CH_PATH = '/de-ch/packshot-industrie';

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
      canonical:
        lang === 'de-ch'
          ? `https://www.packshot-creator.com${DE_CH_PATH}`
          : `https://www.packshot-creator.com/${lang}/${CONFIG.slug}`,
      languages: buildLanguages(`/fr/${CONFIG.slug}`, { en: `/en/${CONFIG.slug}`, deCh: DE_CH_PATH }),
    },
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{ url: `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`, width: 1200, height: 630 }],
    },
  };
}

export default async function PackshotIndustrielPage({ params }: PageProps) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });

  return <PackshotLandingTemplate config={CONFIG} lang={lang} t={t} />;
}
