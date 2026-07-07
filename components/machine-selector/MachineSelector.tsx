'use client';

import { useState, useCallback } from 'react';
import { tx } from '@/lib/locale-text';
import type { Machine, MachineSelectorProps, ProductSizeCategory } from './lib/types';
import { useMachineSelection } from './hooks/useMachineSelection';
import { FilterBar } from './components/FilterBar';
import { MachineList } from './components/MachineList';
import { MachineModal } from './components/MachineModal';

/**
 * Composant standalone pour sélectionner et explorer les machines Orbitvu
 *
 * @example
 * // Mode affichage simple
 * <MachineSelector />
 *
 * @example
 * // Mode sélection avec callback
 * <MachineSelector
 *   mode="selection"
 *   onMachineSelect={(machine) => console.log('Selected:', machine)}
 *   showPrices
 * />
 *
 * @example
 * // Avec filtre par défaut
 * <MachineSelector
 *   defaultSize="petit"
 *   showFilters
 *   locale="en"
 * />
 */
export function MachineSelector({
  mode = 'display',
  defaultSize,
  onMachineSelect,
  showFilters = true,
  showPrices = false,
  maxMachines,
  locale = 'fr',
  className = '',
  selectedMachineId,
}: MachineSelectorProps) {
  const {
    filteredMachines,
    selectedMachine,
    filters,
    setFilter,
    resetFilters,
    selectMachine,
    totalMachines,
    visibleMachines,
  } = useMachineSelection(
    defaultSize ? { sizeCategory: defaultSize } : undefined
  );

  const [modalMachine, setModalMachine] = useState<Machine | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Machines à afficher (avec limite optionnelle)
  const displayedMachines = maxMachines
    ? filteredMachines.slice(0, maxMachines)
    : filteredMachines;

  // Gestion de la sélection
  const handleMachineSelect = useCallback((machine: Machine) => {
    if (mode === 'selection') {
      selectMachine(machine);
      onMachineSelect?.(machine);
    }
  }, [mode, selectMachine, onMachineSelect]);

  // Ouverture du modal de détails
  const handleViewDetails = useCallback((machine: Machine) => {
    setModalMachine(machine);
    setIsModalOpen(true);
  }, []);

  // Fermeture du modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setModalMachine(null);
  }, []);

  return (
    <div className={`machine-selector ${className}`}>
      {/* Header optionnel */}
      {mode === 'selection' && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {tx(locale, 'Choisissez votre machine', 'Choose your machine', 'Wählen Sie Ihre Maschine')}
          </h2>
          <p className="text-gray-600">
            {tx(
              locale,
              'Sélectionnez la machine qui correspond le mieux à vos besoins de production.',
              'Select the machine that best matches your production needs.',
              'Wählen Sie die Maschine, die am besten zu Ihren Produktionsanforderungen passt.'
            )}
          </p>
        </div>
      )}

      {/* Filtres */}
      {showFilters && (
        <FilterBar
          filters={filters}
          onFilterChange={setFilter}
          onReset={resetFilters}
          totalMachines={totalMachines}
          visibleMachines={visibleMachines}
          locale={locale}
        />
      )}

      {/* Liste des machines */}
      <MachineList
        machines={displayedMachines}
        locale={locale}
        showPrices={showPrices}
        selectedMachineId={selectedMachineId || selectedMachine?.id}
        onMachineSelect={mode === 'selection' ? handleMachineSelect : undefined}
        onViewDetails={handleViewDetails}
      />

      {/* Message si limite atteinte */}
      {maxMachines && filteredMachines.length > maxMachines && (
        <div className="mt-6 text-center">
          <p className="text-gray-500">
            {tx(
              locale,
              `${filteredMachines.length - maxMachines} machines supplémentaires disponibles`,
              `${filteredMachines.length - maxMachines} more machines available`,
              `${filteredMachines.length - maxMachines} weitere Maschinen verfügbar`
            )}
          </p>
        </div>
      )}

      {/* Modal détails */}
      <MachineModal
        machine={modalMachine}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelect={mode === 'selection' ? handleMachineSelect : undefined}
        locale={locale}
        showPrice={showPrices}
      />
    </div>
  );
}
