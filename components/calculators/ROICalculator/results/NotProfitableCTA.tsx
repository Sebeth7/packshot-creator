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
    <div className="bg-gradient-to-br from-neutral-100 to-white rounded-2xl p-8 text-center border border-neutral-200">
      <div className="text-5xl mb-4">🔍</div>

      <h3 className="text-2xl font-heading font-bold text-future-dusk-900 mb-3">
        {t.title}
      </h3>

      <p className="text-lg text-future-dusk-500 mb-6 max-w-2xl mx-auto">
        {t.description}
      </p>

      <Button size="lg" className="gap-2 bg-very-peri-500 hover:bg-very-peri-600">
        <MessageCircle className="w-5 h-5" />
        {t.cta}
      </Button>

      <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-future-dusk-500">
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
