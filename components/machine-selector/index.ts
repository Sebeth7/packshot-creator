// Composant principal
export { MachineSelector } from './MachineSelector';

// Sous-composants
export { MachineCard } from './components/MachineCard';
export { MachineList } from './components/MachineList';
export { FilterBar } from './components/FilterBar';
export { MachineModal } from './components/MachineModal';

// Hooks
export { useMachineSelection } from './hooks/useMachineSelection';

// Données
export { MACHINES, getMachineById, getMachinesBySize, getMachinesSortedByPrice, getMachinesCount } from './lib/machines';

// Types
export type {
  Machine,
  MachineEligibility,
  MachineSelectorProps,
  MachineSelectorFilters,
  SelectionCriteria,
  ProductSizeCategory,
  ContentType,
  AutomationLevel,
  IndustrySector,
  SortOption,
  Dimensions,
  BilingualText,
} from './lib/types';
