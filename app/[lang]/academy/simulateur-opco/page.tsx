import { Metadata } from 'next';
import SimulateurOPCOClient from './SimulateurOPCOClient';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === 'fr';

  const title = isFr
    ? 'Simulateur OPCO — Financez votre formation | PackshotCreator Academy'
    : 'OPCO Simulator — Finance your training | PackshotCreator Academy';
  const description = isFr
    ? 'Vérifiez votre éligibilité au financement OPCO pour les formations PackshotCreator. Simulez le montant de prise en charge en 2 minutes.'
    : 'Check your OPCO funding eligibility for PackshotCreator training. Simulate your coverage amount in 2 minutes.';

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.packshot-creator.com/${lang}/academy/simulateur-opco`,
      languages: {
        fr: '/fr/academy/simulateur-opco',
        en: '/en/academy/simulateur-opco',
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.packshot-creator.com/${lang}/academy/simulateur-opco`,
      siteName: 'PackshotCreator',
      locale: isFr ? 'fr_FR' : 'en_US',
    },
  };
}

export default function SimulateurOPCOPage() {
  return <SimulateurOPCOClient />;
}
