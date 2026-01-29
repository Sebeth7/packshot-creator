'use client';

import { useState } from 'react';
import type {
  MachineSelectorFilters,
  ProductSizeCategory,
  ContentType,
  IndustrySector,
  AutomationLevel,
  SortOption,
} from '../lib/types';

interface FilterBarProps {
  filters: MachineSelectorFilters;
  sortOption: SortOption;
  onFilterChange: <K extends keyof MachineSelectorFilters>(key: K, value: MachineSelectorFilters[K]) => void;
  onSortChange: (option: SortOption) => void;
  onReset: () => void;
  totalMachines: number;
  visibleMachines: number;
  locale?: 'fr' | 'en';
}

// Labels pour les catégories de taille
const SIZE_LABELS: Record<ProductSizeCategory, { fr: string; en: string }> = {
  'petit': { fr: 'Petit (< 30cm)', en: 'Small (< 30cm)' },
  'moyen': { fr: 'Moyen (30-60cm)', en: 'Medium (30-60cm)' },
  'grand': { fr: 'Grand (60-150cm)', en: 'Large (60-150cm)' },
  'tres-grand': { fr: 'Très grand (> 150cm)', en: 'Extra large (> 150cm)' },
};

// Labels pour les features
const FEATURE_LABELS: Record<ContentType, { fr: string; en: string }> = {
  'packshot': { fr: 'Packshot', en: 'Packshot' },
  '360': { fr: 'Vue 360°', en: '360° View' },
  'video': { fr: 'Vidéo', en: 'Video' },
  'ghost-mannequin': { fr: 'Ghost Mannequin', en: 'Ghost Mannequin' },
  'flat-lay': { fr: 'Flat-lay', en: 'Flat-lay' },
  'lifestyle': { fr: 'Lifestyle', en: 'Lifestyle' },
};

// Labels pour les secteurs
const SECTOR_LABELS: Record<IndustrySector, { fr: string; en: string }> = {
  'jewelry': { fr: 'Bijouterie', en: 'Jewelry' },
  'fashion': { fr: 'Mode', en: 'Fashion' },
  'footwear': { fr: 'Chaussures', en: 'Footwear' },
  'bags': { fr: 'Maroquinerie', en: 'Bags' },
  'cosmetics': { fr: 'Cosmétiques', en: 'Cosmetics' },
  'electronics': { fr: 'Électronique', en: 'Electronics' },
  'furniture': { fr: 'Mobilier', en: 'Furniture' },
  'wine': { fr: 'Vins/Spiritueux', en: 'Wine/Spirits' },
  'cycling': { fr: 'Cycles', en: 'Cycling' },
  'sports': { fr: 'Sports', en: 'Sports' },
  'appliances': { fr: 'Électroménager', en: 'Appliances' },
  'automotive': { fr: 'Automobile', en: 'Automotive' },
  'general': { fr: 'E-commerce général', en: 'General e-commerce' },
};

// Labels pour l'automatisation
const AUTOMATION_LABELS: Record<AutomationLevel, { fr: string; en: string }> = {
  'manual': { fr: 'Manuel', en: 'Manual' },
  'semi-auto': { fr: 'Semi-automatique', en: 'Semi-automatic' },
  'full-auto': { fr: 'Entièrement automatique', en: 'Fully automatic' },
};

// Labels pour le tri
const SORT_LABELS: Record<SortOption, { fr: string; en: string }> = {
  'price-asc': { fr: 'Prix croissant', en: 'Price (low to high)' },
  'price-desc': { fr: 'Prix décroissant', en: 'Price (high to low)' },
  'capacity-asc': { fr: 'Capacité croissante', en: 'Capacity (low to high)' },
  'capacity-desc': { fr: 'Capacité décroissante', en: 'Capacity (high to low)' },
  'name-asc': { fr: 'Nom A-Z', en: 'Name A-Z' },
  'name-desc': { fr: 'Nom Z-A', en: 'Name Z-A' },
};

export function FilterBar({
  filters,
  sortOption,
  onFilterChange,
  onSortChange,
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
    filters.automationLevel ||
    filters.searchQuery;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
      {/* Barre de recherche et tri */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        {/* Recherche */}
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder={locale === 'fr' ? 'Rechercher une machine...' : 'Search machines...'}
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange('searchQuery', e.target.value || undefined)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Tri */}
        <div className="md:w-64">
          <select
            value={sortOption}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all bg-white"
          >
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {locale === 'fr' ? label.fr : label.en}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtres principaux */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Filtre taille */}
        <div className="relative">
          <select
            value={filters.sizeCategory || ''}
            onChange={(e) => onFilterChange('sizeCategory', (e.target.value || undefined) as ProductSizeCategory | undefined)}
            className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all bg-white text-sm"
          >
            <option value="">{locale === 'fr' ? 'Toutes les tailles' : 'All sizes'}</option>
            {Object.entries(SIZE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {locale === 'fr' ? label.fr : label.en}
              </option>
            ))}
          </select>
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Filtre automatisation */}
        <div className="relative">
          <select
            value={filters.automationLevel || ''}
            onChange={(e) => onFilterChange('automationLevel', (e.target.value || undefined) as AutomationLevel | undefined)}
            className="appearance-none px-4 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all bg-white text-sm"
          >
            <option value="">{locale === 'fr' ? 'Automatisation' : 'Automation'}</option>
            {Object.entries(AUTOMATION_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {locale === 'fr' ? label.fr : label.en}
              </option>
            ))}
          </select>
          <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Bouton filtres avancés */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-4 py-2 border rounded-lg text-sm transition-all flex items-center gap-2 ${
            showAdvanced
              ? 'border-brand-red text-brand-red bg-brand-red/5'
              : 'border-gray-300 text-gray-700 hover:border-brand-red/50'
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
          </svg>
          {locale === 'fr' ? 'Filtres avancés' : 'Advanced filters'}
        </button>

        {/* Bouton réinitialiser */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="px-4 py-2 text-sm text-gray-600 hover:text-brand-red transition-colors flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            {locale === 'fr' ? 'Réinitialiser' : 'Reset'}
          </button>
        )}
      </div>

      {/* Filtres avancés */}
      {showAdvanced && (
        <div className="pt-4 border-t border-gray-200 space-y-4">
          {/* Secteurs */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Secteurs d\'activité' : 'Industries'}
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
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {locale === 'fr' ? label.fr : label.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fonctionnalités */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {locale === 'fr' ? 'Fonctionnalités requises' : 'Required features'}
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
                        ? 'bg-brand-red text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {locale === 'fr' ? label.fr : label.en}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Compteur de résultats */}
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
        <span>
          {locale === 'fr'
            ? `${visibleMachines} machine${visibleMachines > 1 ? 's' : ''} sur ${totalMachines}`
            : `${visibleMachines} machine${visibleMachines > 1 ? 's' : ''} of ${totalMachines}`}
        </span>
        {hasActiveFilters && (
          <span className="text-brand-red">
            {locale === 'fr' ? 'Filtres actifs' : 'Filters active'}
          </span>
        )}
      </div>
    </div>
  );
}
