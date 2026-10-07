import { NavLink as Link } from '@/components/layout/NavLink';
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
  UtensilsCrossed,
  Watch,
} from 'lucide-react';

export interface Sector {
  slug: string;
  name: string;
  Icon: LucideIcon;
  description?: string;
  /** Libellés EN et de-ch ; `name` et `description` restent la version FR. */
  i18n?: Record<'en' | 'de-ch', { name: string; description?: string }>;
}

/** Nom et description du secteur dans la langue demandée (FR par défaut, repli FR). */
export function sectorText(sector: Sector, lang: string = 'fr'): { name: string; description?: string } {
  const t = lang === 'en' || lang === 'de-ch' ? sector.i18n?.[lang] : undefined;
  return t ?? { name: sector.name, description: sector.description };
}

interface SectorGridProps {
  sectors: Sector[];
  columns?: 3 | 4 | 6;
  className?: string;
  /** Langue des libellés ; sans valeur, rendu FR inchangé. */
  lang?: string;
}

export default function SectorGrid({
  sectors,
  columns = 4,
  className,
  lang = 'fr',
}: SectorGridProps) {
  const gridCols = {
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    6: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
  };

  return (
    <StaggerContainer stagger={0.05} className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
      {sectors.map((sector) => {
        const texte = sectorText(sector, lang);
        return (
        <StaggerItem key={sector.slug}>
        <Link
          href={{ pathname: '/industrie/[slug]', params: { slug: sector.slug } }}
          className="group flex items-start gap-4 bg-future-dusk-0 rounded-xl p-5 border border-transparent hover:border-very-peri-200 hover:bg-white hover:shadow-lg transition-all duration-300"
        >
          <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-very-peri-50 text-very-peri-600 group-hover:bg-very-peri-100 transition-colors shrink-0 mt-0.5">
            <sector.Icon className="w-5 h-5" />
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h3 className="text-base font-heading font-bold text-heading-dark group-hover:text-very-peri-600 transition-colors">
                {texte.name}
              </h3>
              <ArrowRight className="h-4 w-4 text-neutral-300 opacity-0 group-hover:opacity-100 group-hover:text-very-peri-500 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
            {texte.description && (
              <p className="text-sm text-neutral-medium leading-relaxed">
                {texte.description}
              </p>
            )}
          </div>
        </Link>
        </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}

export const DEFAULT_SECTORS: Sector[] = [
  { slug: 'chaussures', name: 'Chaussures', Icon: Footprints, description: 'Packshot, 360° et lifestyle pour sneakers, luxe et sport',
    i18n: { en: { name: 'Shoes', description: 'Packshot, 360° and lifestyle for sneakers, luxury and sports' }, 'de-ch': { name: 'Schuhe', description: 'Packshot, 360° und Lifestyle für Sneaker, Luxus- und Sportschuhe' } } },
  { slug: 'bijoux-joaillerie', name: 'Bijoux & Joaillerie', Icon: Gem, description: 'Macro focus stacking et visuels lifestyle haute joaillerie',
    i18n: { en: { name: 'Jewelry & Fine Jewelry', description: 'Macro focus stacking and high-jewelry lifestyle visuals' }, 'de-ch': { name: 'Schmuck & Juwelen', description: 'Makro-Focus-Stacking und Lifestyle-Visuals für Haute Joaillerie' } } },
  { slug: 'mobilier-decoration', name: 'Mobilier & Décoration', Icon: Armchair, description: 'Grands formats et mises en scène IA multi-ambiances',
    i18n: { en: { name: 'Furniture & Decoration', description: 'Large formats and multi-setting AI staging' }, 'de-ch': { name: 'Möbel & Wohndekoration', description: 'Grossformate und KI-Inszenierungen in verschiedenen Ambientes' } } },
  { slug: 'vin-spiritueux', name: 'Vin & Spiritueux', Icon: Wine, description: 'Packshot bouteilles, fidélité étiquettes et lifestyle cave & bar par IA',
    i18n: { en: { name: 'Wine & Spirits', description: 'Bottle packshots, faithful labels and AI cellar & bar lifestyle' }, 'de-ch': { name: 'Wein & Spirituosen', description: 'Flaschen-Packshots, originalgetreue Etiketten und KI-Lifestyle für Keller & Bar' } } },
  { slug: 'cosmetiques-beaute', name: 'Cosmétiques & Beauté', Icon: Sparkles, description: 'Rendu textures, reflets et ambiances spa par IA',
    i18n: { en: { name: 'Cosmetics & Beauty', description: 'Texture and reflection rendering, AI spa settings' }, 'de-ch': { name: 'Kosmetik & Beauty', description: 'Wiedergabe von Texturen und Reflexen, KI-Spa-Ambientes' } } },
  { slug: 'mode-textile', name: 'Mode & Textile', Icon: Shirt, description: 'Ghost mannequin, porté et flat-lay automatisés',
    i18n: { en: { name: 'Fashion & Textile', description: 'Automated ghost mannequin, on-model and flat-lay' }, 'de-ch': { name: 'Mode & Textil', description: 'Automatisiertes Ghost-Mannequin, getragen und Flat-Lay' } } },
  { slug: 'electronique-hightech', name: 'Électronique & High-Tech', Icon: Smartphone, description: 'Packshot reflets maîtrisés et visuels lifestyle tech',
    i18n: { en: { name: 'Electronics & High-Tech', description: 'Packshots with controlled reflections and tech lifestyle visuals' }, 'de-ch': { name: 'Elektronik & High-Tech', description: 'Packshots mit kontrollierten Reflexen und Tech-Lifestyle-Visuals' } } },
  { slug: 'pieces-techniques-industrie', name: 'Pièces Techniques', Icon: Wrench, description: 'Catalogage 360° haute précision et nomenclature',
    i18n: { en: { name: 'Technical Parts', description: 'High-precision 360° cataloging and bills of materials' }, 'de-ch': { name: 'Technische Teile', description: 'Hochpräzise 360°-Katalogisierung und Stücklisten' } } },
  { slug: 'automobile-pieces-detachees', name: 'Automobile', Icon: Car, description: 'Pièces détachées, 360° et intégration catalogue',
    i18n: { en: { name: 'Automotive', description: 'Spare parts, 360° and catalog integration' }, 'de-ch': { name: 'Automobil', description: 'Ersatzteile, 360° und Katalogintegration' } } },
  { slug: 'jouets-puericulture', name: 'Jouets & Puériculture', Icon: Baby, description: 'Couleurs fidèles et mises en ambiance enfants par IA',
    i18n: { en: { name: 'Toys & Childcare', description: 'True-to-life colors and AI children\'s settings' }, 'de-ch': { name: 'Spielwaren & Babyartikel', description: 'Originalgetreue Farben und KI-Ambientes für Kinder' } } },
  { slug: 'sport-outdoor', name: 'Sport & Outdoor', Icon: Trophy, description: 'Packshot technique et lifestyle outdoor immersif',
    i18n: { en: { name: 'Sport & Outdoor', description: 'Technical packshots and immersive outdoor lifestyle' }, 'de-ch': { name: 'Sport & Outdoor', description: 'Technische Packshots und immersiver Outdoor-Lifestyle' } } },
  { slug: 'sante-medical', name: 'Santé & Médical', Icon: HeartPulse, description: 'Visuels conformes CE et documentation réglementaire',
    i18n: { en: { name: 'Health & Medical', description: 'CE-compliant visuals and regulatory documentation' }, 'de-ch': { name: 'Gesundheit & Medizin', description: 'CE-konforme Visuals und regulatorische Dokumentation' } } },
  { slug: 'industrie-manufacturiere', name: 'Industrie Manufacturière', Icon: Factory, description: 'Catalogage massif et intégration PIM automatisée',
    i18n: { en: { name: 'Manufacturing', description: 'Mass cataloging and automated PIM integration' }, 'de-ch': { name: 'Fertigungsindustrie', description: 'Massenkatalogisierung und automatisierte PIM-Integration' } } },
  { slug: 'defense-securite', name: 'Défense & Sécurité', Icon: Shield, description: 'Studio sur site sécurisé, traçabilité et conformité',
    i18n: { en: { name: 'Defense & Security', description: 'Secure on-site studio, traceability and compliance' }, 'de-ch': { name: 'Verteidigung & Sicherheit', description: 'Gesichertes Studio vor Ort, Rückverfolgbarkeit und Konformität' } } },
  { slug: 'lunetterie', name: 'Lunetterie & Optique', Icon: Glasses, description: 'Packshot montures, verres et solaires avec gestion des reflets',
    i18n: { en: { name: 'Eyewear & Optics', description: 'Packshots of frames, lenses and sunglasses with reflection control' }, 'de-ch': { name: 'Brillen & Optik', description: 'Packshots von Fassungen, Gläsern und Sonnenbrillen mit Reflexkontrolle' } } },
  { slug: 'food-alimentaire', name: 'Food & Alimentaire', Icon: UtensilsCrossed, description: 'Packshot packaging et food styling IA',
    i18n: { en: { name: 'Food & Beverage', description: 'Packaging packshots and AI food styling' }, 'de-ch': { name: 'Food & Lebensmittel', description: 'Verpackungs-Packshots und KI-Foodstyling' } } },
  { slug: 'horlogerie', name: 'Horlogerie', Icon: Watch, description: 'Macro focus stacking et gestion des reflets verre saphir & boîtiers',
    i18n: { en: { name: 'Watchmaking', description: 'Macro focus stacking and reflection control on sapphire glass & cases' }, 'de-ch': { name: 'Uhrmacherei', description: 'Makro-Focus-Stacking und Reflexkontrolle bei Saphirglas & Gehäusen' } } },
];
