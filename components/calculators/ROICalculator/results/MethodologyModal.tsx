'use client';

import { useEffect, useRef } from 'react';
import { X, Calculator, TrendingDown, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: 'fr' | 'en';
}

const CONTENT = {
  fr: {
    title: 'Comment sont calculés vos résultats ?',
    close: 'Fermer',
    sections: [
      {
        icon: Calculator,
        title: 'Coût de votre solution actuelle',
        body: 'Nous calculons le coût annuel de votre production photo en additionnant : le salaire chargé de vos opérateurs (au prorata du temps consacré à la photo), votre budget équipement annuel, et vos éventuels prestataires externes.',
      },
      {
        icon: TrendingDown,
        title: 'Coût avec un studio PackshotCreator',
        body: 'Le temps opérateur avec la machine est calculé en fonction de la capacité réelle de production de chaque modèle (photos/jour) rapportée à votre volume annuel. Plus la machine est productive, moins elle mobilise vos équipes.',
      },
      {
        icon: Clock,
        title: 'Retour sur investissement (break-even)',
        body: 'Le break-even indique le mois à partir duquel vos économies cumulées dépassent le prix d\'achat de la machine. Chaque mois, la différence entre votre coût actuel et le coût opérationnel avec machine s\'accumule jusqu\'à couvrir l\'investissement initial. Ce calcul intègre l\'avantage fiscal lié à l\'amortissement de la machine (Impôt sur les Sociétés au taux de 25%).',
      },
      {
        icon: Target,
        title: 'ROI sur 1 an et 5 ans',
        body: 'Le ROI compare vos économies réelles au prix de la machine. Il intègre : l\'économie opérationnelle (réduction du temps opérateur et suppression des coûts externes), ainsi que l\'avantage fiscal IS à 25% sur l\'amortissement de la machine (sur 5 ans). Sur 1 an : économies totales moins le prix d\'achat. Sur 5 ans : économies cumulées sur la durée d\'amortissement.',
      },
    ],
    note: 'Ces calculs sont des estimations basées sur vos données et un taux d\'IS de 25%. Contactez notre équipe pour une analyse personnalisée adaptée à votre situation fiscale.',
  },
  en: {
    title: 'How are your results calculated?',
    close: 'Close',
    sections: [
      {
        icon: Calculator,
        title: 'Cost of your current solution',
        body: 'We calculate the annual cost of your photo production by adding: the loaded salary of your operators (proportional to time spent on photography), your annual equipment budget, and any external providers.',
      },
      {
        icon: TrendingDown,
        title: 'Cost with a PackshotCreator studio',
        body: 'Operator time with the machine is calculated based on the actual production capacity of each model (photos/day) relative to your annual volume. The more productive the machine, the less it ties up your teams.',
      },
      {
        icon: Clock,
        title: 'Return on investment (break-even)',
        body: 'The break-even point shows the month when your cumulative savings exceed the machine\'s purchase price. Each month, the difference between your current cost and the operational cost with the machine accumulates until it covers the initial investment. This calculation includes the tax benefit from machine depreciation (Corporate Tax at 25%).',
      },
      {
        icon: Target,
        title: 'ROI over 1 year and 5 years',
        body: 'ROI compares your actual savings to the machine price. It includes: operational savings (reduced operator time and eliminated external costs), plus the 25% Corporate Tax benefit on machine depreciation (over 5 years). Over 1 year: total savings minus purchase price. Over 5 years: cumulative savings over the full depreciation period.',
      },
    ],
    note: 'These calculations are estimates based on your data and a 25% corporate tax rate. Contact our team for a personalized analysis adapted to your tax situation.',
  },
};

export default function MethodologyModal({ isOpen, onClose, locale }: MethodologyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = CONTENT[locale];

  // Fermer sur Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Bloquer le scroll du body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-2xl border-b border-neutral-100 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg font-heading font-bold text-future-dusk-900">
            {t.title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-future-dusk-500 hover:text-future-dusk-900 transition-colors"
            aria-label={t.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenu */}
        <div className="px-6 py-5 space-y-6">
          {t.sections.map((section, i) => {
            const Icon = section.icon;
            return (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-very-peri-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-very-peri-600" />
                </div>
                <div>
                  <h4 className="font-medium text-future-dusk-900 mb-1">
                    {section.title}
                  </h4>
                  <p className="text-sm text-future-dusk-600 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-neutral-100">
          <p className="text-xs text-future-dusk-500 mb-3">
            {t.note}
          </p>
          <Button
            type="button"
            onClick={onClose}
            className="w-full bg-very-peri-500 hover:bg-very-peri-600"
          >
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
}
