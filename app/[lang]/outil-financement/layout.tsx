import type { Metadata } from 'next';
import SchemaOrg, { organizationSchema, breadcrumbSchema } from '@/components/seo/SchemaOrg';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  return {
    title: isFr
      ? 'Outil de financement — Comparateur leasing vs crédit bancaire | PackshotCreator'
      : 'Financing Tool — Leasing vs Bank Loan Comparator | PackshotCreator',
    description: isFr
      ? 'Comparez en temps réel le leasing et le crédit bancaire pour votre studio photo automatisé. Mensualités, coût total, avantages fiscaux.'
      : 'Compare leasing and bank loan in real time for your automated photo studio. Monthly payments, total cost, tax benefits.',
    // Contenu FR-only : /en/outil-financement sert le même contenu FR → canonical vers /fr
    alternates: {
      canonical: 'https://www.packshot-creator.com/fr/outil-financement',
    },
  };
}

export default async function OutilFinancementLayout({
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
    { name: isFr ? 'Outil de financement' : 'Financing Tool', url: `https://www.packshot-creator.com/${lang}/outil-financement` },
  ];

  return (
    <>
      {children}
      <SchemaOrg schema={[organizationSchema(), breadcrumbSchema(breadcrumbs)]} />
    </>
  );
}
