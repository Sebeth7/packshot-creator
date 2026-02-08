'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Machine, BilingualText } from '../lib/types';

interface MachineCardProps {
  machine: Machine;
  locale?: 'fr' | 'en';
  showPrice?: boolean;
  isSelected?: boolean;
  onSelect?: (machine: Machine) => void;
  onViewDetails?: (machine: Machine) => void;
}

// Fonction utilitaire pour formater le prix
function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

// Fonction pour obtenir le texte bilingue
function getText(text: BilingualText, locale: 'fr' | 'en'): string {
  return text[locale] || text.fr;
}

// Labels pour les features
const FEATURE_LABELS: Record<string, { fr: string; en: string; icon: string }> = {
  'packshot': { fr: 'Packshot', en: 'Packshot', icon: '📷' },
  '360': { fr: '360°', en: '360°', icon: '🔄' },
  'video': { fr: 'Vidéo', en: 'Video', icon: '🎬' },
  'ghost-mannequin': { fr: 'Ghost', en: 'Ghost', icon: '👤' },
  'flat-lay': { fr: 'Flat-lay', en: 'Flat-lay', icon: '⬇️' },
  'lifestyle': { fr: 'Lifestyle', en: 'Lifestyle', icon: '✨' },
};

// Labels pour l'automatisation
const AUTOMATION_LABELS: Record<string, { fr: string; en: string; color: string }> = {
  'manual': { fr: 'Manuel', en: 'Manual', color: 'bg-neutral-100 text-future-dusk-700' },
  'semi-auto': { fr: 'Semi-auto', en: 'Semi-auto', color: 'bg-blue-100 text-blue-700' },
  'full-auto': { fr: 'Full auto', en: 'Full auto', color: 'bg-green-100 text-green-700' },
};

export function MachineCard({
  machine,
  locale = 'fr',
  showPrice = false,
  isSelected = false,
  onSelect,
  onViewDetails,
}: MachineCardProps) {
  const [imageError, setImageError] = useState(false);

  const automationLabel = AUTOMATION_LABELS[machine.automationLevel];

  return (
    <div
      className={`
        group relative bg-white rounded-2xl border-2 transition-all duration-200 overflow-hidden
        ${isSelected
          ? 'border-very-peri-500 shadow-lg ring-2 ring-very-peri-500/20'
          : 'border-neutral-100 hover:border-very-peri-400 hover:shadow-md'
        }
        ${onSelect ? 'cursor-pointer' : ''}
      `}
      onClick={() => onSelect?.(machine)}
    >
      {/* Badge sélectionné */}
      {isSelected && (
        <div className="absolute top-3 right-3 z-10 bg-very-peri-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
          {locale === 'fr' ? 'Sélectionné' : 'Selected'}
        </div>
      )}

      {/* Image */}
      <div className="relative aspect-[4/3] bg-neutral-50 overflow-hidden">
        {!imageError && machine.imageUrl ? (
          <Image
            src={machine.imageUrl}
            alt={machine.nom}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <div className="text-center text-future-dusk-400">
              <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm">{machine.nom}</span>
            </div>
          </div>
        )}

        {/* Badge automatisation */}
        <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${automationLabel.color}`}>
          {locale === 'fr' ? automationLabel.fr : automationLabel.en}
        </div>
      </div>

      {/* Contenu */}
      <div className="p-4">
        {/* Titre et prix */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-future-dusk-900 text-lg leading-tight">
            {machine.nom}
          </h3>
          {showPrice && (
            <span className="text-very-peri-600 font-bold whitespace-nowrap">
              {formatPrice(machine.prix)}
            </span>
          )}
        </div>

        {/* Specs principales */}
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="flex items-center gap-1.5 text-future-dusk-600">
            <svg className="w-4 h-4 text-future-dusk-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{machine.tailleMax}</span>
          </div>
          <div className="flex items-center gap-1.5 text-future-dusk-600">
            <svg className="w-4 h-4 text-future-dusk-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
            <span>{machine.poidsMax}</span>
          </div>
          <div className="flex items-center gap-1.5 text-future-dusk-600">
            <svg className="w-4 h-4 text-future-dusk-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{machine.capaciteJour} {locale === 'fr' ? 'photos/j' : 'photos/d'}</span>
          </div>
          <div className="flex items-center gap-1.5 text-future-dusk-600">
            <svg className="w-4 h-4 text-future-dusk-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span>{machine.spaceRequired}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {machine.features.slice(0, 4).map((feature) => {
            const label = FEATURE_LABELS[feature];
            return (
              <span
                key={feature}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-neutral-100 text-future-dusk-700 text-xs rounded-full"
              >
                <span>{label?.icon}</span>
                <span>{locale === 'fr' ? label?.fr : label?.en}</span>
              </span>
            );
          })}
          {machine.features.length > 4 && (
            <span className="inline-flex items-center px-2 py-0.5 bg-gray-100 text-future-dusk-500 text-xs rounded-full">
              +{machine.features.length - 4}
            </span>
          )}
        </div>

        {/* Use cases */}
        <p className="text-sm text-future-dusk-500 line-clamp-2 mb-3">
          {machine.useCases.slice(0, 3).join(' • ')}
          {machine.useCases.length > 3 && '...'}
        </p>

        {/* Actions */}
        {onViewDetails && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(machine);
            }}
            className="w-full py-2 px-4 text-sm font-medium text-very-peri-600 border border-very-peri-500 rounded-xl hover:bg-very-peri-600 hover:text-white transition-colors"
          >
            {locale === 'fr' ? 'Voir les détails' : 'View details'}
          </button>
        )}
      </div>
    </div>
  );
}
