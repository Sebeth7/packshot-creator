'use client';

import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

interface NotProfitableCTAProps {
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    title: 'Votre situation mérite une analyse approfondie',
    description: 'Nos experts peuvent identifier des optimisations spécifiques à votre activité et vous proposer la solution la plus adaptée.',
    cta: 'Demander une étude gratuite',
    benefits: [
      'Sans engagement',
      'Réponse sous 24h',
      'Conseil personnalisé',
    ],
  },
  en: {
    title: 'Your situation deserves a deeper analysis',
    description: 'Our experts can identify optimizations specific to your business and offer you the most suitable solution.',
    cta: 'Request a free analysis',
    benefits: [
      'No commitment',
      'Response within 24h',
      'Personalized advice',
    ],
  },
};

export default function NotProfitableCTA({ locale }: NotProfitableCTAProps) {
  const t = LABELS[locale];

  return (
    <div className="bg-gradient-to-br from-neutral-lighter to-white rounded-2xl p-8 text-center border border-neutral-light">
      <div className="text-5xl mb-4">🔍</div>

      <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-3">
        {t.title}
      </h3>

      <p className="text-lg text-neutral-medium mb-6 max-w-2xl mx-auto">
        {t.description}
      </p>

      <Button size="lg" className="gap-2 bg-secondary-orbitvu hover:bg-primary-orbitvu">
        <MessageCircle className="w-5 h-5" />
        {t.cta}
      </Button>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-neutral-medium">
        {t.benefits.map((benefit, index) => (
          <div key={index} className="flex items-center gap-2">
            <span>✓</span>
            <span>{benefit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
