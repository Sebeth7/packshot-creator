import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { LucideIcon, ArrowRight } from 'lucide-react';
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
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <StaggerContainer stagger={0.05} className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
      {sectors.map((sector) => (
        <StaggerItem key={sector.slug}>
        <Link
          href={`/industrie/${sector.slug}`}
          className="group flex items-start gap-4 bg-future-dusk-0 rounded-xl p-5 border border-transparent hover:border-very-peri-200 hover:bg-white hover:shadow-lg transition-all duration-300"
        >
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-very-peri-50 text-very-peri-600 group-hover:bg-very-peri-100 transition-colors shrink-0 mt-0.5">
            <sector.Icon className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-base font-heading font-bold text-heading-dark group-hover:text-very-peri-600 transition-colors">
                {sector.name}
              </h3>
              <ArrowRight className="h-4 w-4 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:text-very-peri-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            {sector.description && (
              <p className="text-sm text-neutral-medium leading-relaxed">
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
  { slug: 'vin-spiritueux', name: 'Vin & Spiritueux', Icon: Wine, description: 'Packshot bouteilles, fidélité étiquettes et lifestyle cave & bar par IA' },
];
