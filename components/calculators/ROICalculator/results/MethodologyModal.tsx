'use client';

import { useEffect, useRef } from 'react';
import { X, Calculator, TrendingDown, Clock, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: 'fr' | 'en' | 'de-ch';
}

const CONTENT = {
  fr: {
    title: 'Comment sont calculés vos résultats ?',
    close: 'Fermer',
    sections: [
      {
        icon: Calculator,
        title: 'Économie directe (trésorerie)',
        body: 'L\'économie directe ne compte que les dépenses réellement supprimées par le studio : vos prestataires externes et votre budget équipement annuel, moins le coût de la machine (loyers en leasing, ou amortissement, maintenance et consommables en achat). Les salaires de vos équipes n\'y sont volontairement pas inclus : ils ne disparaissent pas avec l\'arrivée du studio.',
      },
      {
        icon: Clock,
        title: 'Temps interne libéré',
        body: 'Le temps que vos opérateurs consacrent aujourd\'hui à la photographie produit est comparé au temps nécessaire avec le studio, calculé d\'après la capacité réelle de chaque modèle (produits/jour) rapportée à votre volume annuel. Le résultat est exprimé en jours par an, avec une valorisation indicative au coût employeur : c\'est du temps de travail réaffectable à d\'autres missions, pas une économie de trésorerie.',
      },
      {
        icon: TrendingDown,
        title: 'Retour sur investissement (break-even)',
        body: 'Le break-even est calculé en trésorerie pure : il indique le mois à partir duquel les dépenses supprimées cumulées couvrent le prix d\'achat de la machine (en leasing, dès le premier mois si les loyers sont inférieurs aux coûts supprimés). La valorisation du temps libéré n\'y est pas comptée.',
      },
      {
        icon: Target,
        title: 'ROI',
        body: 'Le ROI compare l\'économie directe nette cumulée au coût total de la machine : sur la durée du contrat en leasing, sur 5 ans (durée d\'amortissement) en achat. Tous les montants sont présentés avant impôt ; loyers de leasing et amortissement restent par ailleurs déductibles du résultat imposable.',
      },
    ],
    note: 'Ces calculs sont des estimations basées sur vos données, présentées avant impôt. Contactez notre équipe pour une analyse personnalisée adaptée à votre situation.',
  },
  en: {
    title: 'How are your results calculated?',
    close: 'Close',
    sections: [
      {
        icon: Calculator,
        title: 'Direct savings (cash)',
        body: 'Direct savings only count expenses actually eliminated by the studio: your external providers and annual equipment budget, minus the machine cost (lease payments in leasing, or depreciation, maintenance and consumables when purchasing). Your team\'s salaries are deliberately excluded: they do not disappear when the studio arrives.',
      },
      {
        icon: Clock,
        title: 'In-house time freed up',
        body: 'The time your operators currently spend on product photography is compared to the time needed with the studio, based on each model\'s actual production capacity (products/day) relative to your annual volume. The result is expressed in days per year, with an indicative valuation at employer cost: it is working time that can be redeployed to other tasks, not a cash saving.',
      },
      {
        icon: TrendingDown,
        title: 'Return on investment (break-even)',
        body: 'Break-even is calculated on pure cash flow: it shows the month when cumulative eliminated expenses cover the machine\'s purchase price (in leasing, from month one if lease payments are lower than eliminated costs). The freed-time valuation is not counted here.',
      },
      {
        icon: Target,
        title: 'ROI',
        body: 'ROI compares cumulative net direct savings to the total machine cost: over the contract duration in leasing, over 5 years (depreciation period) when purchasing. All amounts are shown pre-tax; lease payments and depreciation remain tax-deductible.',
      },
    ],
    note: 'These calculations are estimates based on your data, shown pre-tax. Contact our team for a personalized analysis adapted to your situation.',
  },
  'de-ch': {
    title: 'Wie werden Ihre Ergebnisse berechnet?',
    close: 'Schliessen',
    sections: [
      {
        icon: Calculator,
        title: 'Direkte Einsparung (Liquidität)',
        body: 'Die direkte Einsparung zählt nur Ausgaben, die durch das Studio tatsächlich wegfallen: Ihre externen Dienstleister und Ihr jährliches Ausrüstungsbudget, abzüglich der Maschinenkosten (Leasingraten im Leasing bzw. Abschreibung, Wartung und Verbrauchsmaterial beim Kauf). Die Gehälter Ihrer Teams sind bewusst nicht enthalten: Sie fallen mit der Ankunft des Studios nicht weg.',
      },
      {
        icon: Clock,
        title: 'Freigesetzte interne Zeit',
        body: 'Die Zeit, die Ihre Mitarbeitenden heute für die Produktfotografie aufwenden, wird mit der benötigten Zeit mit dem Studio verglichen, basierend auf der realen Produktionskapazität jedes Modells (Produkte/Tag) im Verhältnis zu Ihrem Jahresvolumen. Das Ergebnis wird in Tagen pro Jahr ausgedrückt, mit einer indikativen Bewertung zu Arbeitgeberkosten: Es ist umverteilbare Arbeitszeit, keine Liquiditätseinsparung.',
      },
      {
        icon: TrendingDown,
        title: 'Rentabilität der Investition (Break-even)',
        body: 'Der Break-even wird rein liquiditätsbasiert berechnet: Er zeigt den Monat, ab dem die kumulierten wegfallenden Ausgaben den Kaufpreis der Maschine decken (im Leasing ab dem ersten Monat, wenn die Raten unter den wegfallenden Kosten liegen). Die Bewertung der freigesetzten Zeit fliesst hier nicht ein.',
      },
      {
        icon: Target,
        title: 'ROI',
        body: 'Der ROI vergleicht die kumulierte direkte Netto-Einsparung mit den Gesamtkosten der Maschine: über die Vertragslaufzeit im Leasing, über 5 Jahre (Abschreibungsdauer) beim Kauf. Alle Beträge werden vor Steuern ausgewiesen; Leasingraten und Abschreibung bleiben steuerlich absetzbar.',
      },
    ],
    note: 'Diese Berechnungen sind Schätzungen auf Basis Ihrer Daten, ausgewiesen vor Steuern. Kontaktieren Sie unser Team für eine persönliche Analyse, die auf Ihre Situation abgestimmt ist.',
  },
};

export default function MethodologyModal({ isOpen, onClose, locale }: MethodologyModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const t = CONTENT[locale] ?? CONTENT.en;

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
