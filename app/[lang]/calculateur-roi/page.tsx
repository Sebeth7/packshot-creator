'use client';

import { useLocale } from 'next-intl';
import dynamic from 'next/dynamic';
import { TrendingUp } from 'lucide-react';
import { HeroSection } from '@/components/hero';
import { tx } from '@/lib/locale-text';
import RoiPublicChat from '@/components/roiChat/public/RoiPublicChat';

const ROICalculator = dynamic(
  () => import('@/components/calculators/ROICalculator/ROICalculatorWizard'),
  { loading: () => <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" /> }
);

export default function CalculateurROIPage() {
  const locale = useLocale();

  // FR : conseiller ROI conversationnel (remplacement du wizard, GO Seb 06/08).
  // EN/DE-CH : wizard conservé jusqu'à l'extension multilingue du chat.
  if (locale === 'fr') {
    // Le header sticky du site fait 4rem (h-16) : l'app cale sa hauteur dessus
    // pour garder la barre de saisie visible sans défilement.
    return (
      <div className="[--roi-offset:4rem]">
        <RoiPublicChat />
      </div>
    );
  }

  return (
    <>
      <HeroSection
        layout="centered"
        backgroundImage="/images/hero/hero-studios-wide.avif"
        badge={{
          icon: <TrendingUp className="h-4 w-4" />,
          label: tx(locale, 'Outil gratuit', 'Free tool', 'Kostenloses Tool'),
          colorClass: 'bg-accent-success/15 text-accent-success',
        }}
        title={tx(
          locale,
          'Calculez votre retour sur investissement',
          'Calculate your return on investment',
          'Berechnen Sie Ihre Rentabilität',
        )}
        subtitle={tx(
          locale,
          'Découvrez en quelques clics combien un système photo automatisé Orbitvu peut vous faire économiser.',
          'Find out in a few clicks how much an Orbitvu automated photo system can save you.',
          'Entdecken Sie mit wenigen Klicks, wie viel Ihnen ein automatisiertes Orbitvu-Fotosystem sparen kann.',
        )}
      />

      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ROICalculator locale={locale as 'fr' | 'en'} />
        </div>
      </section>
    </>
  );
}
