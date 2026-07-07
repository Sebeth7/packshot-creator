'use client';

import { useState } from 'react';
import Image from 'next/image';
import { NavLink as Link } from '@/components/layout/NavLink';
import { tx, pickL } from '@/lib/locale-text';
import type { Machine } from '../lib/types';

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

// Labels pour l'automatisation
const AUTOMATION_LABELS: Record<string, { fr: string; en: string; 'de-ch': string; color: string }> = {
  'manual': { fr: 'Manuel', en: 'Manual', 'de-ch': 'Manuell', color: 'bg-neutral-100 text-future-dusk-700' },
  'semi-auto': { fr: 'Semi-auto', en: 'Semi-auto', 'de-ch': 'Halbauto.', color: 'bg-blue-100 text-blue-700' },
  'full-auto': { fr: 'Full auto', en: 'Full auto', 'de-ch': 'Vollauto.', color: 'bg-green-100 text-green-700' },
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
          {tx(locale, 'Sélectionné', 'Selected', 'Ausgewählt')}
        </div>
      )}

      {/* Image — clickable link to product page, plus grande et dominante */}
      <Link href={{ pathname: '/studio-photo/[slug]', params: { slug: machine.id } }} className="block relative aspect-[4/3] bg-white overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {!imageError && machine.imageUrl ? (
          <Image
            src={machine.imageUrl}
            alt={machine.nom}
            fill
            className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
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
          {pickL(locale, automationLabel)}
        </div>
      </Link>

      {/* Contenu — épuré : titre, 2 specs clés, actions. Le détail complet est dans l'Aperçu. */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-semibold text-future-dusk-900 text-lg leading-tight">
            {machine.nom}
          </h3>
          {showPrice && (
            <span className="text-very-peri-600 font-bold whitespace-nowrap">
              {machine.prixSurDevis ? (locale === 'en' ? 'On request' : 'Sur devis') : formatPrice(machine.prix)}
            </span>
          )}
        </div>

        {/* 2 specs clés */}
        <div className="flex items-center gap-4 mb-4 text-sm text-future-dusk-600">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-future-dusk-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>{machine.tailleMax}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-future-dusk-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>{machine.capaciteJour} {tx(locale, 'photos/j', 'photos/d', 'Fotos/Tag')}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={{ pathname: '/studio-photo/[slug]', params: { slug: machine.id } }}
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-4 text-sm font-medium text-white bg-very-peri-600 rounded-xl hover:bg-very-peri-700 transition-colors text-center"
          >
            {tx(locale, 'Voir la fiche', 'View product', 'Produkt ansehen')}
          </Link>
          {onViewDetails && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onViewDetails(machine);
              }}
              className="py-2 px-4 text-sm font-medium text-future-dusk-600 border border-neutral-200 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              {tx(locale, 'Aperçu', 'Preview', 'Vorschau')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
