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
          className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary-turquoise"
        >
          <div className="flex flex-col items-center text-center space-y-3">
            {/* Icon */}
            <div className="group-hover:scale-110 transition-transform duration-300">
              <sector.Icon className="w-10 h-10 text-neutral-dark stroke-[1.5]" />
            </div>

            {/* Name */}
            <h3 className="text-base font-heading font-semibold text-neutral-dark group-hover:text-primary-turquoise transition-colors">
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

// Export sectors data (12 secteurs principaux)
export const DEFAULT_SECTORS: Sector[] = [
  { slug: 'agroalimentaire', name: 'Agroalimentaire', Icon: Wine },
  { slug: 'meubles', name: 'Meubles', Icon: Armchair },
  { slug: 'pieces-techniques', name: 'Pièces techniques', Icon: Wrench },
  { slug: 'bijoux', name: 'Bijouterie', Icon: Gem },
  { slug: 'chaussures', name: 'Chaussures', Icon: Footprints },
  { slug: 'mode-accessoires', name: 'Mode & Accessoires', Icon: Shirt },
  { slug: 'cosmetique', name: 'Cosmétique', Icon: Sparkles },
  { slug: 'high-tech', name: 'High-tech', Icon: Smartphone },
  { slug: 'sport', name: 'Sport', Icon: Trophy },
  { slug: 'automobile', name: 'Automobile', Icon: Car },
  { slug: 'jouets', name: 'Jouets', Icon: Baby },
  { slug: 'maroquinerie', name: 'Maroquinerie', Icon: ShoppingBag },
];
