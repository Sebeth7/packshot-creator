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
        title: 'Coût avec une machine Orbitvu',
        body: 'Un studio automatisé multiplie par 3 la productivité de chaque opérateur, ce qui libère du temps pour d\'autres tâches (retouche, mise en ligne, créativité). Le calcul prend en compte ce gain d\'efficacité, ainsi que les coûts de maintenance et consommables de la machine.',
      },
      {
        icon: Clock,
        title: 'Retour sur investissement (break-even)',
        body: 'Le break-even indique le mois à partir duquel vos économies cumulées dépassent le prix d\'achat de la machine. Chaque mois, la différence entre votre coût actuel et le coût opérationnel avec machine s\'accumule jusqu\'à couvrir l\'investissement initial.',
      },
      {
        icon: Target,
        title: 'ROI sur 1 an et 5 ans',
        body: 'Le ROI compare vos économies réelles (cash) au prix de la machine. Sur 1 an : économie opérationnelle annuelle moins le prix d\'achat, divisé par le prix d\'achat. Sur 5 ans : même logique sur la durée d\'amortissement complète.',
      },
    ],
    note: 'Ces calculs sont des estimations basées sur vos données. Contactez notre équipe pour une analyse personnalisée.',
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
        title: 'Cost with an Orbitvu machine',
        body: 'An automated studio triples the productivity of each operator, freeing up time for other tasks (retouching, publishing, creative work). The calculation accounts for this efficiency gain, along with machine maintenance and consumables costs.',
      },
      {
        icon: Clock,
        title: 'Return on investment (break-even)',
        body: 'The break-even point shows the month when your cumulative savings exceed the machine\'s purchase price. Each month, the difference between your current cost and the operational cost with the machine accumulates until it covers the initial investment.',
      },
      {
        icon: Target,
        title: 'ROI over 1 year and 5 years',
        body: 'ROI compares your actual cash savings to the machine price. Over 1 year: annual operational savings minus the purchase price, divided by the purchase price. Over 5 years: same logic over the full depreciation period.',
      },
    ],
    note: 'These calculations are estimates based on your data. Contact our team for a personalized analysis.',
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
