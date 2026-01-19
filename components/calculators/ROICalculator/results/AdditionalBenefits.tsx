'use client';

import { Zap, Shield, Users, TrendingUp } from 'lucide-react';
import type { CalculationResults } from '../lib/types';

interface AdditionalBenefitsProps {
  results: CalculationResults;
  locale: 'fr' | 'en';
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
      description: 'Capacité résiduelle de {capacity} photos/an. Croissance sans coûts supplémentaires.',
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
      description: 'Residual capacity of {capacity} photos/year. Growth without additional costs.',
    },
    autonomy: {
      title: 'Total Autonomy',
      description: 'No more dependency on external providers. Complete control of your production.',
    },
  },
};

export default function AdditionalBenefits({ results, locale }: AdditionalBenefitsProps) {
  const t = LABELS[locale];

  const benefits = [
    {
      icon: Shield,
      title: t.consistency.title,
      description: t.consistency.description,
      color: 'text-secondary-orbitvu',
      bgColor: 'bg-secondary-orbitvu/10',
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
      color: 'text-accent-success',
      bgColor: 'bg-accent-success/10',
    },
  ];

  return (
    <div className="mb-8">
      <h3 className="text-xl font-heading font-bold text-neutral-dark mb-6">
        {t.title}
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-5 shadow-md border border-neutral-light hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${benefit.bgColor} flex items-center justify-center flex-shrink-0`}>
                <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              </div>
              <div>
                <h4 className={`font-heading font-bold ${benefit.color} mb-1`}>
                  {benefit.title}
                </h4>
                <p className="text-sm text-neutral-medium">
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
