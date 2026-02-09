import type { HeroBackgroundProps } from './types';
import HeroImage from './HeroImage';

/**
 * Full-bleed background image with scrim overlay for text readability.
 * Positioned absolute, fills parent container.
 */
export default function HeroBackground({
  src,
  alt = '',
  className = '',
}: HeroBackgroundProps) {
  // Extract base path (remove .avif extension for responsive variants)
  const basePath = src.replace(/\.(avif|webp|jpg|png)$/, '');

  return (
    <div
      className={`absolute inset-0 z-0 ${className}`}
      aria-hidden="true"
    >
      <HeroImage basePath={basePath} alt={alt} priority className="absolute inset-0" />
      {/* Scrim gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-future-dusk-900/80 via-future-dusk-900/50 to-transparent" />
    </div>
  );
}
