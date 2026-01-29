'use client';

import type { Machine } from '../lib/types';
import { MachineCard } from './MachineCard';

interface MachineListProps {
  machines: Machine[];
  locale?: 'fr' | 'en';
  showPrices?: boolean;
  selectedMachineId?: string;
  onMachineSelect?: (machine: Machine) => void;
  onViewDetails?: (machine: Machine) => void;
  emptyMessage?: string;
  maxColumns?: 2 | 3 | 4;
}

export function MachineList({
  machines,
  locale = 'fr',
  showPrices = false,
  selectedMachineId,
  onMachineSelect,
  onViewDetails,
  emptyMessage,
  maxColumns = 3,
}: MachineListProps) {
  if (machines.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <svg
          className="w-16 h-16 mx-auto text-gray-300 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-medium text-gray-900 mb-1">
          {locale === 'fr' ? 'Aucune machine trouvée' : 'No machines found'}
        </h3>
        <p className="text-gray-500">
          {emptyMessage || (locale === 'fr'
            ? 'Essayez de modifier vos critères de recherche'
            : 'Try adjusting your search criteria')}
        </p>
      </div>
    );
  }

  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[maxColumns];

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {machines.map((machine) => (
        <MachineCard
          key={machine.id}
          machine={machine}
          locale={locale}
          showPrice={showPrices}
          isSelected={machine.id === selectedMachineId}
          onSelect={onMachineSelect}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
}
