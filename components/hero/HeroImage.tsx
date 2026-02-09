import type { HeroImageProps } from './types';

/**
 * Responsive hero image using <picture> with AVIF breakpoint variants.
 * Expects images at: {basePath}-sm.avif, -md.avif, -lg.avif, -xl.avif
 */
export default function HeroImage({
  basePath,
  alt,
  priority = false,
  className = '',
}: HeroImageProps) {
  return (
    <picture>
      <source
        media="(max-width: 640px)"
        srcSet={`${basePath}-sm.avif`}
        type="image/avif"
      />
      <source
        media="(max-width: 1024px)"
        srcSet={`${basePath}-md.avif`}
        type="image/avif"
      />
      <source
        media="(max-width: 1440px)"
        srcSet={`${basePath}-lg.avif`}
        type="image/avif"
      />
      <source srcSet={`${basePath}-xl.avif`} type="image/avif" />
      {/* Fallback to base avif */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${basePath}.avif`}
        alt={alt}
        className={`w-full h-full object-cover ${className}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
      />
    </picture>
  );
}
