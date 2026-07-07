'use client';

import { useState } from 'react';
import { tx, pickL } from '@/lib/locale-text';
import type {
  MachineSelectorFilters,
  ProductSizeCategory,
  ContentType,
  IndustrySector,
  AutomationLevel,
} from '../lib/types';

interface FilterBarProps {
  filters: MachineSelectorFilters;
  onFilterChange: <K extends keyof MachineSelectorFilters>(key: K, value: MachineSelectorFilters[K]) => void;
  onReset: () => void;
  totalMachines: number;
  visibleMachines: number;
  locale?: 'fr' | 'en';
}

// Labels pour les catégories de taille
const SIZE_LABELS: Record<ProductSizeCategory, { fr: string; en: string; 'de-ch': string }> = {
  'petit': { fr: 'Petit (< 30cm)', en: 'Small (< 30cm)', 'de-ch': 'Klein (< 30cm)' },
  'moyen': { fr: 'Moyen (30-60cm)', en: 'Medium (30-60cm)', 'de-ch': 'Mittel (30-60cm)' },
  'grand': { fr: 'Grand (60-150cm)', en: 'Large (60-150cm)', 'de-ch': 'Gross (60-150cm)' },
  'tres-grand': { fr: 'Très grand (> 150cm)', en: 'Extra large (> 150cm)', 'de-ch': 'Sehr gross (> 150cm)' },
};

// Labels pour les features
const FEATURE_LABELS: Record<ContentType, { fr: string; en: string; 'de-ch': string }> = {
  'packshot': { fr: 'Packshot', en: 'Packshot', 'de-ch': 'Packshot' },
  '360': { fr: 'Vue 360°', en: '360° View', 'de-ch': '360°-Ansicht' },
  'video': { fr: 'Vidéo', en: 'Video', 'de-ch': 'Video' },
  'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin', 'de-ch': 'Ghost Mannequin' },
  'flat-lay': { fr: 'Flat-lay', en: 'Flat-lay', 'de-ch': 'Flat-Lay' },
  'lifestyle': { fr: 'Lifestyle', en: 'Lifestyle', 'de-ch': 'Lifestyle' },
};

// Labels pour les secteurs
const SECTOR_LABELS: Record<IndustrySector, { fr: string; en: string; 'de-ch': string }> = {
  'jewelry': { fr: 'Bijouterie', en: 'Jewelry', 'de-ch': 'Schmuck' },
  'fashion': { fr: 'Mode', en: 'Fashion', 'de-ch': 'Mode' },
  'footwear': { fr: 'Chaussures', en: 'Footwear', 'de-ch': 'Schuhe' },
  'bags': { fr: 'Maroquinerie', en: 'Bags', 'de-ch': 'Taschen' },
  'cosmetics': { fr: 'Cosmétiques', en: 'Cosmetics', 'de-ch': 'Kosmetik' },
  'electronics': { fr: 'Électronique', en: 'Electronics', 'de-ch': 'Elektronik' },
  'furniture': { fr: 'Mobilier', en: 'Furniture', 'de-ch': 'Möbel' },
  'wine': { fr: 'Vins/Spiritueux', en: 'Wine/Spirits', 'de-ch': 'Wein/Spirituosen' },
  'cycling': { fr: 'Cycles', en: 'Cycling', 'de-ch': 'Fahrräder' },
  'sports': { fr: 'Sports', en: 'Sports', 'de-ch': 'Sport' },
  'appliances': { fr: 'Électroménager', en: 'Appliances', 'de-ch': 'Haushaltsgeräte' },
  'automotive': { fr: 'Automobile', en: 'Automotive', 'de-ch': 'Automobil' },
  'optics': { fr: 'Lunetterie & Optique', en: 'Eyewear & Optics', 'de-ch': 'Optik & Brillen' },
  'health': { fr: 'Santé & Médical', en: 'Health & Medical', 'de-ch': 'Gesundheit & Medizin' },
  'industrial': { fr: 'Industrie & pièces techniques', en: 'Industry & technical parts', 'de-ch': 'Industrie & Technikteile' },
  'watchmaking': { fr: 'Horlogerie', en: 'Watchmaking', 'de-ch': 'Uhrmacherei' },
  'general': { fr: 'E-commerce général', en: 'General e-commerce', 'de-ch': 'Allgemeiner E-Commerce' },
};

// Labels pour l'automatisation
const AUTOMATION_LABELS: Record<AutomationLevel, { fr: string; en: string; 'de-ch': string }> = {
  'manual': { fr: 'Manuel', en: 'Manual', 'de-ch': 'Manuell' },
  'semi-auto': { fr: 'Semi-automatique', en: 'Semi-automatic', 'de-ch': 'Halbautomatisch' },
  'full-auto': { fr: 'Entièrement automatique', en: 'Fully automatic', 'de-ch': 'Vollautomatisch' },
};

export function FilterBar({
  filters,
  onFilterChange,
  onReset,
  totalMachines,
  visibleMachines,
  locale = 'fr',
}: FilterBarProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Vérifier si des filtres sont actifs
  const hasActiveFilters =
    filters.sizeCategory ||
    filters.priceRange ||
    (filters.features && filters.features.length > 0) ||
    (filters.sectors && filters.sectors.length > 0) ||
    filters.automationLevel;

  return (
    <div className="bg-white rounded-xl border border-neutral-200 p-4 mb-6">
      {/* Filtres principaux */}
      <div className="flex flex-wrap items-end gap-3 mb-4">
        {/* Filtre taille */}
        <div className="relative">
          <label className="block text-xs font-medium text-future-dusk-500 mb-1">
            {tx(locale, 'Taille du produit à photographier', 'Product size to photograph', 'Grösse des zu fotografierenden Produkts')}
          </label>
          <select
            value={filters.sizeCategory || ''}
            onChange={(e) => onFilterChange('sizeCategory', (e.target.value || undefined) as ProductSizeCategory | undefined)}
            className="appearance-none px-4 py-2 pr-8 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-very-peri-500/20 focus:border-very-peri-500 outline-none transition-all bg-white text-sm"
          >
            <option value="">{tx(locale, 'Toutes les tailles de produit', 'All product sizes', 'Alle Produktgrössen')}</option>
            {Object.entries(SIZE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {pickL(locale, label)}
              </option>
            ))}
          </select>
          <svg className="absolute right-2 bottom-2.5 w-4 h-4 text-future-dusk-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Filtre automatisation */}
        <div className="relative">
          <label className="block text-xs font-medium text-future-dusk-500 mb-1">
            {tx(locale, 'Niveau d\'automatisation', 'Automation level', 'Automatisierungsgrad')}
          </label>
          <select
            value={filters.automationLevel || ''}
            onChange={(e) => onFilterChange('automationLevel', (e.target.value || undefined) as AutomationLevel | undefined)}
            className="appearance-none px-4 py-2 pr-8 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-very-peri-500/20 focus:border-very-peri-500 outline-none transition-all bg-white text-sm"
          >
            <option value="">{tx(locale, 'Toutes', 'All', 'Alle')}</option>
            {Object.entries(AUTOMATION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {pickL(locale, label)}
              </option>
            ))}
          </select>
          <svg className="absolute right-2 bottom-2.5 w-4 h-4 text-future-dusk-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Bouton filtres avancés */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-2 border rounded-lg text-sm transition-all flex items-center gap-2 ${
            showAdvanced
              ? 'border-very-peri-500 text-very-peri-600 bg-very-peri-50'
              : 'border-neutral-300 text-future-dusk-700 hover:border-very-peri-400'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {tx(locale, 'Filtres avancés', 'Advanced filters', 'Erweiterte Filter')}
        </button>

        {/* Bouton réinitialiser */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm text-future-dusk-600 hover:text-very-peri-600 transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {tx(locale, 'Réinitialiser', 'Reset', 'Zurücksetzen')}
          </button>
        )}
      </div>

      {/* Secteurs — toujours visibles, c'est le critère de recherche le plus naturel */}
      <div className="mb-4">
        <label className="block text-xs font-medium text-future-dusk-500 mb-2">
          {tx(locale, 'Votre secteur d\'activité', 'Your industry', 'Ihre Branche')}
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.entries(SECTOR_LABELS).map(([value, label]) => {
            const isActive = filters.sectors?.includes(value as IndustrySector);
            return (
              <button
                key={value}
                onClick={() => {
                  const current = filters.sectors || [];
                  if (isActive) {
                    const newSectors = current.filter(s => s !== value);
                    onFilterChange('sectors', newSectors.length > 0 ? newSectors : undefined);
                  } else {
                    onFilterChange('sectors', [...current, value as IndustrySector]);
                  }
                }}
                className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                  isActive
                    ? 'bg-very-peri-600 text-white'
                    : 'bg-neutral-100 text-future-dusk-700 hover:bg-neutral-200'
                }`}
              >
                {pickL(locale, label)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filtres avancés */}
      {showAdvanced && (
        <div className="pt-4 border-t border-neutral-200 space-y-4">
          {/* Fonctionnalités */}
          <div>
            <label className="block text-sm font-medium text-future-dusk-700 mb-2">
              {tx(locale, 'Fonctionnalités requises', 'Required features', 'Erforderliche Funktionen')}
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(FEATURE_LABELS).map(([value, label]) => {
                const isActive = filters.features?.includes(value as ContentType);
                return (
                  <button
                    key={value}
                    onClick={() => {
                      const current = filters.features || [];
                      if (isActive) {
                        const newFeatures = current.filter(f => f !== value);
                        onFilterChange('features', newFeatures.length > 0 ? newFeatures : undefined);
                      } else {
                        onFilterChange('features', [...current, value as ContentType]);
                      }
                    }}
                    className={`px-3 py-1.5 text-xs rounded-full transition-all ${
                      isActive
                        ? 'bg-very-peri-600 text-white'
                        : 'bg-neutral-100 text-future-dusk-700 hover:bg-neutral-200'
                    }`}
                  >
                    {pickL(locale, label)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Compteur de résultats */}
      <div className="mt-4 pt-4 border-t border-neutral-200 flex items-center justify-between text-sm text-future-dusk-600">
        <span>
          {tx(
            locale,
            `${visibleMachines} machine${visibleMachines > 1 ? 's' : ''} sur ${totalMachines}`,
            `${visibleMachines} machine${visibleMachines > 1 ? 's' : ''} of ${totalMachines}`,
            `${visibleMachines} Maschine${visibleMachines > 1 ? 'n' : ''} von ${totalMachines}`
          )}
        </span>
        {hasActiveFilters && (
          <span className="text-very-peri-600">
            {tx(locale, 'Filtres actifs', 'Filters active', 'Aktive Filter')}
          </span>
        )}
      </div>
    </div>
  );
}
