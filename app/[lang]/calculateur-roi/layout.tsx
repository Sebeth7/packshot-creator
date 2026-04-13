import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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
  };
}

export default function CalculateurROILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
