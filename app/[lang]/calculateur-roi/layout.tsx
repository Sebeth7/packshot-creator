import type { Metadata } from 'next';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';
import { buildLanguages } from '@/lib/hreflang';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? 'Calculateur ROI — Retour sur investissement studio photo | PackshotCreator'
      : 'ROI Calculator — Photo Studio Return on Investment | PackshotCreator',
    description: isFr
      ? 'Calculez gratuitement le retour sur investissement d\'un studio photo automatisé Orbitvu. Comparez achat vs leasing et découvrez vos économies.'
      : 'Calculate the return on investment of an Orbitvu automated photo studio for free. Compare purchase vs leasing and discover your savings.',
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/calculateur-roi`,
      languages: buildLanguages('/fr/calculateur-roi', { en: '/en/calculateur-roi' }),
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
  const isFr = lang === 'fr';
  const breadcrumbs = [
    { name: isFr ? 'Accueil' : 'Home', url: `https://www.packshot-creator.com/${lang}` },
    { name: isFr ? 'Calculateur ROI' : 'ROI Calculator', url: `https://www.packshot-creator.com/${lang}/calculateur-roi` },
  ];

  return (
    <>
      {children}
      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
