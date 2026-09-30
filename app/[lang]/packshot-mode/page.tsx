import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotLandingTemplate, { type PackshotLandingConfig } from '@/components/templates/PackshotLandingTemplate';
import PackshotMode from '@/components/landings/PackshotMode';
import { Shirt, Layers, Palette, RotateCw, Zap, Upload } from 'lucide-react';
import { buildLanguages } from '@/lib/hreflang';

// FR : composant page-scopé PackshotMode (réécriture du 30/09/2026, méthode F5).
// EN et de-ch : gabarit partagé et anciens messages, jusqu'à la traduction de la version FR
// validée (D38). La configuration ci-dessous ne sert plus qu'à ces deux langues.
const CONFIG: PackshotLandingConfig = {
  namespace: 'packshotMode',
  slug: 'packshot-mode',
  benefitImageSlug: 'mode',
  heroIcon: Shirt,
  heroBadge: { fr: 'Mode & Textile', en: 'Fashion & Textile' },
  benefitIcons: [Layers, Palette, RotateCw, Zap, Upload],
  machineIds: ['alphashot-xl-pro-v2', 'alphatable', 'alphastudio-xxl-v2'],
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
    // FR : l'openGraph de la page remplace celui du layout ; url, locale et type sont redonnés
    // ici, et twitter reprend le titre de la page (même traitement que F5). EN et de-ch inchangés.
    openGraph: lang === 'fr'
      ? {
          title: t('meta.title'),
          description: t('meta.description'),
          url,
          siteName: 'PackshotCreator',
          locale: 'fr_FR',
          type: 'website',
          images: [{ url: ogImage, width: 1200, height: 630 }],
        }
      : {
          title: t('meta.title'),
          description: t('meta.description'),
          images: [{ url: ogImage, width: 1200, height: 630 }],
        },
    ...(lang === 'fr'
      ? {
          twitter: {
            card: 'summary_large_image',
            title: t('meta.title'),
            description: t('meta.description'),
            images: [ogImage],
          },
        }
      : {}),
  };
}

export default async function PackshotModePage({ params }: PageProps) {
  const { lang } = await params;
  if (lang === 'fr') return <PackshotMode lang="fr" />;

  const t = await getTranslations({ locale: lang, namespace: CONFIG.namespace });
  return <PackshotLandingTemplate config={CONFIG} lang={lang} t={t} />;
}
