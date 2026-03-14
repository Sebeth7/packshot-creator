'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import type { Machine } from '../lib/types';

interface MachineRecommendationProps {
  machine: Machine;
  locale: 'fr' | 'en';
}

const LABELS = {
  fr: {
    recommended: 'Machine recommandée',
    price: 'Prix',
    capacity: 'Capacité',
    maxSize: 'Taille max',
    maxWeight: 'Poids max',
    useCases: "Cas d'usage :",
    bookDemo: 'Être recontacté',
    learnMore: 'En savoir plus',
    imagePlaceholder: 'Image bientôt disponible',
    photosPerDay: 'photos/jour',
  },
  en: {
    recommended: 'Recommended machine',
    price: 'Price',
    capacity: 'Capacity',
    maxSize: 'Max size',
    maxWeight: 'Max weight',
    useCases: 'Use cases:',
    bookDemo: 'Get in touch',
    learnMore: 'Learn more',
    imagePlaceholder: 'Image coming soon',
    photosPerDay: 'photos/day',
  },
};

export default function MachineRecommendation({ machine, locale }: MachineRecommendationProps) {
  const t = LABELS[locale];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-neutral-200">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image placeholder */}
        <div className="flex-shrink-0 w-full md:w-48 h-48 bg-neutral-100 rounded-lg overflow-hidden flex items-center justify-center">
          {machine.imageUrl ? (
            <Image
              src={machine.imageUrl}
              alt={machine.nom}
              width={192}
              height={192}
              className="object-cover"
            />
          ) : (
            <div className="text-future-dusk-500 text-sm text-center p-4">
              {t.imagePlaceholder}
            </div>
          )}
        </div>

        {/* Infos */}
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-very-peri-500 text-white">
              {t.recommended}
            </span>
            <h3 className="text-xl md:text-2xl font-heading font-bold text-future-dusk-900">
              {machine.nom}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              <span className="text-future-dusk-500">{t.capacity}</span>
              <p className="font-bold text-future-dusk-900">{machine.capaciteJour} {t.photosPerDay}</p>
            </div>
            <div>
              <span className="text-future-dusk-500">{t.maxSize}</span>
              <p className="font-bold text-future-dusk-900">{machine.tailleMax}</p>
            </div>
            <div>
              <span className="text-future-dusk-500">{t.maxWeight}</span>
              <p className="font-bold text-future-dusk-900">{machine.poidsMax}</p>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-future-dusk-500 font-medium mb-2">
              {t.useCases}
            </p>
            <div className="flex flex-wrap gap-2">
              {machine.useCases.map(useCase => (
                <span
                  key={useCase}
                  className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-neutral-100 text-future-dusk-900"
                >
                  {useCase}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="bg-very-peri-500 hover:bg-very-peri-600">
              {t.bookDemo}
            </Button>
            <Button variant="outline">
              {t.learnMore}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
