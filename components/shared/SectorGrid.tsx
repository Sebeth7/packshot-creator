import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { StaggerContainer, StaggerItem } from '@/components/animations';
import {
  Wine,
  Armchair,
  Wrench,
  Gem,
  Footprints,
  Shirt,
  Sparkles,
  Smartphone,
  Trophy,
  Car,
  Baby,
  HeartPulse,
  Factory,
  Shield,
} from 'lucide-react';

export interface Sector {
  slug: string;
  name: string;
  Icon: LucideIcon;
  description?: string;
}

interface SectorGridProps {
  sectors: Sector[];
  columns?: 3 | 4 | 6;
  className?: string;
}

export default function SectorGrid({
  sectors,
  columns = 4,
  className,
}: SectorGridProps) {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <StaggerContainer stagger={0.06} className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {sectors.map((sector) => (
        <StaggerItem key={sector.slug}>
        <Link
          key={sector.slug}
          href={`/industrie/${sector.slug}`}
          className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-100 hover:border-very-peri-300"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-very-peri-50 text-very-peri-600 group-hover:bg-very-peri-100 transition-colors">
              <sector.Icon className="w-6 h-6" />
            </span>
            <h3 className="text-sm font-heading font-bold text-future-dusk-900 group-hover:text-very-peri-600 transition-colors">
              {sector.name}
            </h3>
            {sector.description && (
              <p className="text-xs text-future-dusk-400 line-clamp-2">
                {sector.description}
              </p>
            )}
          </div>
        </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}

export const DEFAULT_SECTORS: Sector[] = [
  { slug: 'chaussures', name: 'Chaussures', Icon: Footprints },
  { slug: 'bijoux-joaillerie', name: 'Bijoux & Joaillerie', Icon: Gem },
  { slug: 'mobilier-decoration', name: 'Mobilier & Décoration', Icon: Armchair },
  { slug: 'food-alimentaire', name: 'Food & Alimentaire', Icon: Wine },
  { slug: 'cosmetiques-beaute', name: 'Cosmétiques & Beauté', Icon: Sparkles },
  { slug: 'mode-textile', name: 'Mode & Textile', Icon: Shirt },
  { slug: 'electronique-hightech', name: 'Électronique & High-Tech', Icon: Smartphone },
  { slug: 'pieces-techniques-industrie', name: 'Pièces Techniques', Icon: Wrench },
  { slug: 'automobile-pieces-detachees', name: 'Automobile', Icon: Car },
  { slug: 'jouets-puericulture', name: 'Jouets & Puériculture', Icon: Baby },
  { slug: 'sport-outdoor', name: 'Sport & Outdoor', Icon: Trophy },
  { slug: 'sante-medical', name: 'Santé & Médical', Icon: HeartPulse },
  { slug: 'industrie-manufacturiere', name: 'Industrie Manufacturière', Icon: Factory },
  { slug: 'defense-securite', name: 'Défense & Sécurité', Icon: Shield },
];
