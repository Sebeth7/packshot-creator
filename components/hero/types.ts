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
  /** Fil d'Ariane rendu juste avant le `<h1>`, hors de celui-ci (variante centrée seulement). */
  breadcrumb?: ReactNode;
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

export interface HeroVideoPanelProps {
  /** MP4 16:9 (Cloudflare R2), toujours lu muet. */
  src: string;
  /** Image fixe AVIF : affiche de la vidéo, seule visible sous 768 px. */
  poster: string;
  /** Nom accessible de la vidéo et texte alternatif de l'image fixe. */
  title: string;
  labels: {
    pause: string;
    play: string;
  };
  className?: string;
}
