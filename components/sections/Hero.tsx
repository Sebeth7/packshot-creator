import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export type HeroVariant = 'hardware' | 'ia' | 'formation' | 'default';

interface HeroProps {
  variant?: HeroVariant;
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
  ctaHref?: string;
  ctaSecondaryKey?: string;
  ctaSecondaryHref?: string;
  images?: {
    src: string;
    alt: string;
  }[];
  badges?: ReactNode[];
  namespace?: string;
  useSectionColor?: boolean;
}

const variantStyles = {
  hardware: {
    bg: 'bg-gradient-to-br from-neutral-lighter to-white',
    accent: 'text-secondary-orbitvu',
    ctaColor: 'bg-secondary-orbitvu hover:bg-primary-orbitvu',
  },
  ia: {
    bg: 'bg-gradient-to-br from-very-peri-50 to-white',
    accent: 'text-primary-orbitvu',
    ctaColor: 'bg-primary-orbitvu hover:bg-very-peri-600',
  },
  formation: {
    bg: 'bg-gradient-to-br from-primary-formation/10 to-white',
    accent: 'text-primary-formation',
    ctaColor: 'bg-primary-formation hover:bg-primary-formation/90',
  },
  default: {
    bg: 'bg-neutral-lighter',
    accent: 'text-secondary-orbitvu',
    ctaColor: 'bg-secondary-orbitvu hover:bg-primary-orbitvu',
  },
};

export default function Hero({
  variant = 'default',
  titleKey = 'hero.title',
  subtitleKey = 'hero.subtitle',
  ctaKey = 'hero.cta',
  ctaHref = '/contact',
  ctaSecondaryKey,
  ctaSecondaryHref,
  images = [],
  badges,
  namespace = 'home',
  useSectionColor = false,
}: HeroProps) {
  const t = useTranslations(namespace);
  const styles = variantStyles[variant];

  return (
    <section className={cn('relative min-h-[600px] py-20 px-4', styles.bg)}>
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Contenu texte */}
        <div className="space-y-6">
          {/* Badges personnalisables */}
          {badges && badges.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, idx) => (
                <div key={idx}>{badge}</div>
              ))}
            </div>
          )}

          <h1 className="font-heading text-5xl lg:text-6xl text-neutral-dark leading-tight">
            {t(titleKey)}
          </h1>

          <p className="text-lg lg:text-xl text-neutral-medium leading-relaxed">
            {t(subtitleKey)}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              variant={useSectionColor ? 'section' : 'default'}
              className={cn(
                !useSectionColor && styles.ctaColor,
                'text-white px-8 py-6 text-lg'
              )}
            >
              <Link href={ctaHref}>
                {t(ctaKey)}
              </Link>
            </Button>

            {ctaSecondaryKey && ctaSecondaryHref && (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg border-2"
              >
                <Link href={ctaSecondaryHref}>
                  {t(ctaSecondaryKey)}
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Images produits */}
        {images.length > 0 && (
          <div className="relative h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Image principale (dernière de la liste) */}
              {images[images.length - 1] && (
                <div className="relative w-full h-full">
                  <Image
                    src={images[images.length - 1].src}
                    alt={images[images.length - 1].alt}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
