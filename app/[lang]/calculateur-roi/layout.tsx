import type { Metadata } from 'next';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { buildLanguages } from '@/lib/hreflang';
import { tx } from '@/lib/locale-text';

// Segment de-ch localisé (Suisse alémanique) — voir i18n/routing.ts pathnames.
const DE_CH_PATH = '/de-ch/roi-rechner';

export function generateStaticParams() {
  return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'de-ch' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;

  return {
    title: tx(
      lang,
      'Calculateur ROI — Retour sur investissement studio photo | PackshotCreator',
      'ROI Calculator — Photo Studio Return on Investment | PackshotCreator',
      'ROI-Rechner — Rentabilität eines Fotostudios | PackshotCreator',
    ),
    description: tx(
      lang,
      'Calculez gratuitement le retour sur investissement d\'un studio photo automatisé Orbitvu. Comparez achat vs leasing et découvrez vos économies.',
      'Calculate the return on investment of an Orbitvu automated photo studio for free. Compare purchase vs leasing and discover your savings.',
      'Berechnen Sie kostenlos die Rentabilität eines automatisierten Orbitvu-Fotostudios. Vergleichen Sie Kauf und Leasing und entdecken Sie Ihre Einsparungen.',
    ),
    alternates: {
      canonical:
        lang === 'de-ch'
          ? `https://www.packshot-creator.com${DE_CH_PATH}`
          : `https://www.packshot-creator.com/${lang}/calculateur-roi`,
      languages: buildLanguages('/fr/calculateur-roi', { en: '/en/calculateur-roi', deCh: DE_CH_PATH }),
    },
  };
}

export default async function CalculateurROILayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const breadcrumbs = [
    { name: tx(lang, 'Accueil', 'Home', 'Startseite'), url: `https://www.packshot-creator.com/${lang}` },
    { name: tx(lang, 'Calculateur ROI', 'ROI Calculator', 'ROI-Rechner'), url: `https://www.packshot-creator.com/${lang}/calculateur-roi` },
  ];

  return (
    <>
      {children}
      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
