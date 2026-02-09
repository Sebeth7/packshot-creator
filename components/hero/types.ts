import type { ReactNode } from 'react';

export type HeroLayout = 'split' | 'centered';
export type HeroAlign = 'center' | 'left';

export interface HeroBadge {
  icon?: ReactNode;
  label: string;
  colorClass?: string;
}

export interface HeroCTA {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface HeroSectionProps {
  layout?: HeroLayout;
  align?: HeroAlign;
  compact?: boolean;
  badge?: HeroBadge;
  title: string | ReactNode;
  subtitle?: string | ReactNode;
  ctas?: HeroCTA[];
  media?: ReactNode;
  backgroundImage?: string;
  backgroundVideo?: ReactNode;
  gradient?: string;
  children?: ReactNode;
  className?: string;
}

export interface HeroImageProps {
  basePath: string;
  alt: string;
  priority?: boolean;
  className?: string;
}

export interface HeroBackgroundProps {
  src: string;
  alt?: string;
  className?: string;
}

export interface HeroVideoProps {
  src: string;
  poster: string;
  className?: string;
}
