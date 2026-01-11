'use client';

import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Star } from 'lucide-react';
import { formatEuro } from '../lib/calculations';
import type { CalculationResults } from '../lib/types';

interface ContextualCTAProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    exceptional: {
      badge: 'ROI Exceptionnel',
      title: 'Votre ROI est exceptionnel !',
      description: 'Avec un retour sur investissement de {roi}% sur 3 ans, le {machine} est le choix optimal pour votre activité.',
      cta: 'Réserver ma démo gratuite',
    },
    good: {
      badge: 'Excellent ROI',
      title: 'Excellent retour sur investissement',
      description: 'Un ROI de {roi}% sur 3 ans avec {savings} d\'économies annuelles. Passez à l\'étape suivante.',
      cta: 'Demander une démonstration',
    },
    moderate: {
      badge: 'ROI Positif',
      title: 'Investissement rentable',
      description: 'Malgré un ROI modéré, les bénéfices qualitatifs (cohérence, réactivité, autonomie) sont significatifs.',
      cta: 'En savoir plus',
    },
    note: 'Sans engagement • Démo personnalisée • Réponse sous 24h',
  },
  en: {
    exceptional: {
      badge: 'Exceptional ROI',
      title: 'Your ROI is exceptional!',
      description: 'With a {roi}% return on investment over 3 years, the {machine} is the optimal choice for your business.',
      cta: 'Book my free demo',
    },
    good: {
      badge: 'Excellent ROI',
      title: 'Excellent return on investment',
      description: 'A {roi}% ROI over 3 years with {savings} in annual savings. Take the next step.',
      cta: 'Request a demonstration',
    },
    moderate: {
      badge: 'Positive ROI',
      title: 'Profitable investment',
      description: 'Despite a moderate ROI, the qualitative benefits (consistency, reactivity, autonomy) are significant.',
      cta: 'Learn more',
    },
    note: 'No commitment • Personalized demo • Response within 24h',
  },
};

export default function ContextualCTA({ results, locale }: ContextualCTAProps) {
  const t = LABELS[locale];

  // Déterminer le niveau de ROI
  const roiLevel = results.roi3ans > 300 ? 'exceptional' : results.roi3ans > 100 ? 'good' : 'moderate';
  const content = t[roiLevel];

  const description = content.description
    .replace('{roi}', Math.round(results.roi3ans).toString())
    .replace('{machine}', results.machine.nom)
    .replace('{savings}', formatEuro(results.economieAnnuelle));

  const bgGradient = roiLevel === 'exceptional'
    ? 'from-primary-turquoise to-primary-dark'
    : roiLevel === 'good'
      ? 'from-accent-success to-green-600'
      : 'from-purple-500 to-purple-700';

  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 text-white mb-8`}>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          {/* Badge */}
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur mb-4">
            <Star className="w-3 h-3" />
            {content.badge}
          </span>

          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
            {content.title}
          </h3>

          <p className="text-white/90 mb-6 max-w-xl">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Button
              size="lg"
              className="bg-white text-primary-dark hover:bg-white/90 gap-2"
            >
              <Calendar className="w-5 h-5" />
              {content.cta}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 gap-2"
            >
              {locale === 'fr' ? 'Voir la fiche produit' : 'View product sheet'}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm text-white/70 mt-4">
            {t.note}
          </p>
        </div>

        {/* Icône décorative */}
        <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full bg-white/10 backdrop-blur">
          <div className="text-6xl">
            {roiLevel === 'exceptional' ? '🚀' : roiLevel === 'good' ? '📈' : '✅'}
          </div>
        </div>
      </div>
    </div>
  );
}
