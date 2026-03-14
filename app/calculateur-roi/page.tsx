'use client';

import dynamic from 'next/dynamic';
import { Camera } from 'lucide-react';
import { HeroSection } from '@/components/hero';

const ROICalculator = dynamic(
  () => import('@/components/calculators/ROICalculator/ROICalculatorWizard'),
  { loading: () => <div className="h-96 bg-neutral-100 rounded-2xl animate-pulse" /> }
);

export default function CalculateurROIPage() {
  return (
    <>
      <HeroSection
        layout="centered"
        backgroundImage="/images/hero/hero-studios-wide.avif"
        badge={{
          icon: <Camera className="h-4 w-4" />,
          label: 'Orbitvu Official Partner',
          colorClass: 'bg-amber-500/15 text-amber-300',
        }}
        title="Calculez votre retour sur investissement"
        subtitle="Découvrez en quelques clics combien un studio photo automatisé peut vous faire économiser."
      />

      <section className="py-16 bg-gradient-to-b from-neutral-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <ROICalculator locale="fr" />
        </div>
      </section>

      <footer className="py-8 bg-future-dusk-900 text-center">
        <p className="text-sm text-white/60">
          © {new Date().getFullYear()} PackshotCreator — Sysnext SAS
        </p>
        <p className="text-xs text-white/40 mt-2">
          Une question ? Contactez-nous : contact@packshotcreator.com
        </p>
      </footer>
    </>
  );
}
