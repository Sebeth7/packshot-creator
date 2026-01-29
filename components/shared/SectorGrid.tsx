import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
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
  ShoppingBag,
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
    <div className={cn(`grid ${gridCols[columns]} gap-6`, className)}>
      {sectors.map((sector) => (
        <Link
          key={sector.slug}
          href={`/industrie/${sector.slug}`}
          className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-secondary-orbitvu"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            {/* Icon */}
            <div className="group-hover:scale-110 transition-transform duration-300">
              <sector.Icon className="w-10 h-10 text-neutral-dark stroke-[1.5]" />
            </div>

            {/* Name */}
            <h3 className="text-base font-heading font-semibold text-neutral-dark group-hover:text-secondary-orbitvu transition-colors">
              {sector.name}
            </h3>

            {/* Description (optionnel) */}
            {sector.description && (
              <p className="text-xs text-neutral-medium line-clamp-2">
                {sector.description}
              </p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

// Export sectors data (12 secteurs principaux - alignés avec secteurs.ts)
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
  { slug: 'sante-medical', name: 'Santé & Médical', Icon: ShoppingBag },
];
