import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import PackshotMode from '@/components/landings/PackshotMode';
import { buildLanguages } from '@/lib/hreflang';

// Landing Mode, trilingue depuis le 01/10/2026 : FR (réécriture du 30/09/2026, méthode F5),
// EN et adaptation de-ch depuis le FR validé (D38, D42). Les trois langues partagent le
// composant page-scopé PackshotMode ; PackshotLandingTemplate n'est plus utilisé ici.
const SLUG = 'packshot-mode';
const NAMESPACE = 'packshotMode';
const LANGUES = ['fr', 'en', 'de-ch'] as const;
type Langue = (typeof LANGUES)[number];

// Même convention que les autres pages du site (fr_FR, en_US, de_CH).
const OG_LOCALE: Record<Langue, string> = { fr: 'fr_FR', en: 'en_US', 'de-ch': 'de_CH' };

interface PageProps {
  params: Promise<{ lang: string }>;
}

function langue(lang: string): Langue {
  return (LANGUES as readonly string[]).includes(lang) ? (lang as Langue) : 'fr';
}

export function generateStaticParams() {
  return LANGUES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const lang = langue((await params).lang);
  const t = await getTranslations({ locale: lang, namespace: NAMESPACE });
  const url = `https://www.packshot-creator.com/${lang}/${SLUG}`;
  const ogImage = `/api/og?title=${encodeURIComponent(t('meta.title'))}&type=page&lang=${lang}`;

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    alternates: {
      canonical: url,
      languages: buildLanguages(`/fr/${SLUG}`, { en: `/en/${SLUG}`, deCh: `/de-ch/${SLUG}` }),
    },
    // L'openGraph de la page remplace celui du layout : url, locale et type sont redonnés ici.
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      url,
      siteName: 'PackshotCreator',
      locale: OG_LOCALE[lang],
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: [ogImage],
    },
  };
}

export default async function PackshotModePage({ params }: PageProps) {
  const lang = langue((await params).lang);
  return <PackshotMode lang={lang} />;
}
