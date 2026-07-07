'use client';

import { useState, useCallback, useMemo } from 'react';
import type { Machine, MachineSelectorFilters, SortOption, ProductSizeCategory, ContentType, IndustrySector, AutomationLevel } from '../lib/types';
import { MACHINES, getMachinesBySize } from '../lib/machines';

interface UseMachineSelectionReturn {
  // Data
  machines: Machine[];
  filteredMachines: Machine[];
  selectedMachine: Machine | null;

  // Filters
  filters: MachineSelectorFilters;
  setFilter: <K extends keyof MachineSelectorFilters>(key: K, value: MachineSelectorFilters[K]) => void;
  resetFilters: () => void;

  // Sorting
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;

  // Selection
  selectMachine: (machine: Machine | null) => void;

  // Stats
  totalMachines: number;
  visibleMachines: number;
}

const defaultFilters: MachineSelectorFilters = {
  sizeCategory: undefined,
  priceRange: undefined,
  features: undefined,
  sectors: undefined,
  automationLevel: undefined,
};

/**
 * Hook personnalisé pour gérer la sélection et le filtrage des machines
 */
export function useMachineSelection(
  initialFilters?: Partial<MachineSelectorFilters>,
  initialSort: SortOption = 'recommended'
): UseMachineSelectionReturn {
  const [filters, setFilters] = useState<MachineSelectorFilters>({
    ...defaultFilters,
    ...initialFilters,
  });

  const [sortOption, setSortOption] = useState<SortOption>(initialSort);
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);

  // Fonction pour mettre à jour un filtre
  const setFilter = useCallback(<K extends keyof MachineSelectorFilters>(
    key: K,
    value: MachineSelectorFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  // Réinitialiser tous les filtres
  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Sélectionner une machine
  const selectMachine = useCallback((machine: Machine | null) => {
    setSelectedMachine(machine);
  }, []);

  // Filtrer et trier les machines
  const filteredMachines = useMemo(() => {
    let result = MACHINES.filter(m => !m.delisted);

    // Filtre par catégorie de taille
    if (filters.sizeCategory) {
      result = result.filter(m => m.tailleCategories.includes(filters.sizeCategory as ProductSizeCategory));
    }

    // Filtre par plage de prix (machines sans prix confirmé toujours incluses, non comparables à une plage)
    if (filters.priceRange) {
      result = result.filter(m =>
        m.prixSurDevis || (m.prix >= filters.priceRange!.min && m.prix <= filters.priceRange!.max)
      );
    }

    // Filtre par fonctionnalités
    if (filters.features && filters.features.length > 0) {
      result = result.filter(m =>
        filters.features!.every(f => m.features.includes(f))
      );
    }

    // Filtre par secteurs
    if (filters.sectors && filters.sectors.length > 0) {
      result = result.filter(m =>
        filters.sectors!.some(s => m.idealSectors.includes(s))
      );
    }

    // Filtre par niveau d'automatisation
    if (filters.automationLevel) {
      result = result.filter(m => m.automationLevel === filters.automationLevel);
    }

    // Tri ('recommended' = ordre naturel du catalogue, déjà curé du plus petit au plus grand produit)
    switch (sortOption) {
      case 'recommended':
        break;
      case 'capacity-asc':
        result.sort((a, b) => a.capaciteJour - b.capaciteJour);
        break;
      case 'capacity-desc':
        result.sort((a, b) => b.capaciteJour - a.capaciteJour);
        break;
      case 'name-asc':
        result.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case 'name-desc':
        result.sort((a, b) => b.nom.localeCompare(a.nom));
        break;
    }

    return result;
  }, [filters, sortOption]);

  return {
    machines: MACHINES,
    filteredMachines,
    selectedMachine,
    filters,
    setFilter,
    resetFilters,
    sortOption,
    setSortOption,
    selectMachine,
    totalMachines: MACHINES.length,
    visibleMachines: filteredMachines.length,
  };
}
