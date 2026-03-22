'use client';

import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { TrendingUp } from 'lucide-react';
import { HeroSection } from '@/components/hero';

const ROICalculator = dynamic(
  () => import('@/components/calculators/ROICalculator/ROICalculatorWizard'),
  { loading: () => <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" /> }
);

export default function CalculateurROIPage() {
  const locale = useLocale();
  const isFr = locale === 'fr';

  return (
    <>
      <HeroSection
        layout="centered"
        backgroundImage="/images/hero/hero-studios-wide.avif"
        badge={{
          icon: <TrendingUp className="h-4 w-4" />,
          label: isFr ? 'Outil gratuit' : 'Free tool',
          colorClass: 'bg-accent-success/15 text-accent-success',
        }}
        title={isFr
          ? 'Calculez votre retour sur investissement'
          : 'Calculate your return on investment'}
        subtitle={isFr
          ? 'Découvrez en quelques clics combien un système photo automatisé Orbitvu peut vous faire économiser.'
          : 'Find out in a few clicks how much an Orbitvu automated photo system can save you.'}
      />

      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ROICalculator locale={locale as 'fr' | 'en'} />
        </div>
      </section>
    </>
  );
}
