'use client';

import { Zap, Shield, Users, TrendingUp } from 'lucide-react';
import type { CalculationResults } from '../lib/types';

interface AdditionalBenefitsProps {
  results: CalculationResults;
  locale: 'fr' | 'en' | 'de-ch';
}

const LABELS = {
  fr: {
    title: 'Bénéfices Additionnels',
    consistency: {
      title: 'Cohérence Visuelle',
      description: 'Visuels homogènes pour toute votre gamme. Qualité constante sans dépendance à un photographe.',
    },
    speed: {
      title: 'Réactivité Marché',
      description: 'Nouveaux produits en ligne en quelques heures au lieu de jours. Time-to-market réduit.',
    },
    scalability: {
      title: 'Scalabilité',
      description: 'Capacité résiduelle de {capacity} produits/an. Croissance sans coûts supplémentaires.',
    },
    autonomy: {
      title: 'Autonomie Totale',
      description: 'Plus de dépendance aux prestataires externes. Maîtrise complète de votre production.',
    },
  },
  en: {
    title: 'Additional Benefits',
    consistency: {
      title: 'Visual Consistency',
      description: 'Homogeneous visuals for your entire range. Constant quality without photographer dependency.',
    },
    speed: {
      title: 'Market Reactivity',
      description: 'New products online in hours instead of days. Reduced time-to-market.',
    },
    scalability: {
      title: 'Scalability',
      description: 'Residual capacity of {capacity} products/year. Growth without additional costs.',
    },
    autonomy: {
      title: 'Total Autonomy',
      description: 'No more dependency on external providers. Complete control of your production.',
    },
  },
  'de-ch': {
    title: 'Zusätzliche Vorteile',
    consistency: {
      title: 'Visuelle Konsistenz',
      description: 'Einheitliche Visuals für Ihr gesamtes Sortiment. Konstante Qualität ohne Abhängigkeit von einem Fotografen.',
    },
    speed: {
      title: 'Marktreaktivität',
      description: 'Neue Produkte innerhalb von Stunden statt Tagen online. Verkürzte Time-to-Market.',
    },
    scalability: {
      title: 'Skalierbarkeit',
      description: 'Restkapazität von {capacity} Produkten/Jahr. Wachstum ohne zusätzliche Kosten.',
    },
    autonomy: {
      title: 'Vollständige Autonomie',
      description: 'Keine Abhängigkeit mehr von externen Dienstleistern. Volle Kontrolle über Ihre Produktion.',
    },
  },
};

export default function AdditionalBenefits({ results, locale }: AdditionalBenefitsProps) {
  const t = LABELS[locale] ?? LABELS.en;

  const benefits = [
    {
      icon: Shield,
      title: t.consistency.title,
      description: t.consistency.description,
      color: 'text-very-peri-600',
      bgColor: 'bg-very-peri-100',
    },
    {
      icon: Zap,
      title: t.speed.title,
      description: t.speed.description,
      color: 'text-amber-500',
      bgColor: 'bg-amber-100',
    },
    {
      icon: TrendingUp,
      title: t.scalability.title,
      description: t.scalability.description.replace(
        '{capacity}',
        Math.round(results.capaciteResiduelle).toLocaleString()
      ),
      color: 'text-purple-500',
      bgColor: 'bg-purple-100',
    },
    {
      icon: Users,
      title: t.autonomy.title,
      description: t.autonomy.description,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-heading font-bold text-future-dusk-900 mb-6">
        {t.title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-md border border-neutral-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${benefit.bgColor} flex items-center justify-center flex-shrink-0`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <div>
                <h4 className={`font-heading font-bold ${benefit.color} mb-1`}>
                  {benefit.title}
                </h4>
                <p className="text-sm text-future-dusk-500">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
