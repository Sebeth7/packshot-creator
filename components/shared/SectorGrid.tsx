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
  Glasses,
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
  { slug: 'chaussures', name: 'Chaussures', Icon: Footprints, description: 'Packshot, 360° et lifestyle pour sneakers, luxe et sport' },
  { slug: 'bijoux-joaillerie', name: 'Bijoux & Joaillerie', Icon: Gem, description: 'Macro focus stacking et visuels lifestyle haute joaillerie' },
  { slug: 'mobilier-decoration', name: 'Mobilier & Décoration', Icon: Armchair, description: 'Grands formats et mises en scène IA multi-ambiances' },
  { slug: 'food-alimentaire', name: 'Food & Alimentaire', Icon: Wine, description: 'Packshot packaging et food styling IA' },
  { slug: 'cosmetiques-beaute', name: 'Cosmétiques & Beauté', Icon: Sparkles, description: 'Rendu textures, reflets et ambiances spa par IA' },
  { slug: 'mode-textile', name: 'Mode & Textile', Icon: Shirt, description: 'Ghost mannequin, porté et flat-lay automatisés' },
  { slug: 'electronique-hightech', name: 'Électronique & High-Tech', Icon: Smartphone, description: 'Packshot reflets maîtrisés et visuels lifestyle tech' },
  { slug: 'pieces-techniques-industrie', name: 'Pièces Techniques', Icon: Wrench, description: 'Catalogage 360° haute précision et nomenclature' },
  { slug: 'automobile-pieces-detachees', name: 'Automobile', Icon: Car, description: 'Pièces détachées, 360° et intégration catalogue' },
  { slug: 'jouets-puericulture', name: 'Jouets & Puériculture', Icon: Baby, description: 'Couleurs fidèles et mises en ambiance enfants par IA' },
  { slug: 'sport-outdoor', name: 'Sport & Outdoor', Icon: Trophy, description: 'Packshot technique et lifestyle outdoor immersif' },
  { slug: 'sante-medical', name: 'Santé & Médical', Icon: HeartPulse, description: 'Visuels conformes CE et documentation réglementaire' },
  { slug: 'industrie-manufacturiere', name: 'Industrie Manufacturière', Icon: Factory, description: 'Catalogage massif et intégration PIM automatisée' },
  { slug: 'defense-securite', name: 'Défense & Sécurité', Icon: Shield, description: 'Studio sur site sécurisé, traçabilité et conformité' },
  { slug: 'lunetterie', name: 'Lunetterie & Optique', Icon: Glasses, description: 'Packshot montures, verres et solaires avec gestion des reflets' },
];
