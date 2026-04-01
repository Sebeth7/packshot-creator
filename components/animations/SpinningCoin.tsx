'use client';

import Image from 'next/image';

const EDGE_SLICES = 12;
const EDGE_DEPTH = 8; // px total thickness

export default function SpinningCoin({
  frontSrc,
  backSrc,
  alt = '1 euro coin',
  size = 280,
  duration = 4,
}: {
  frontSrc: string;
  backSrc: string;
  alt?: string;
  size?: number;
  duration?: number;
}) {
  /* Generate edge slices between front (z=0) and back (z=-EDGE_DEPTH) */
  const edgeSlices = Array.from({ length: EDGE_SLICES }, (_, i) => {
    const z = -(EDGE_DEPTH / EDGE_SLICES) * (i + 1);
    return z;
  });

  const coinRadius = size / 2;

  return (
    <div
      className="flex items-center justify-center"
      style={{ perspective: '800px' }}
    >
      <div
        className="relative"
        style={{
          width: size,
          height: size,
          transformStyle: 'preserve-3d',
          animation: `coin-spin ${duration}s linear infinite`,
        }}
      >
        {/* Face (front) — z=0 */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'translateZ(1px)',
          }}
        >
          <Image
            src={frontSrc}
            alt={alt}
            width={size}
            height={size}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          {/* Reflet glissant */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
              animation: `coin-shine ${duration}s linear infinite`,
            }}
          />
        </div>

        {/* Épaisseur — tranches métalliques entre les 2 faces */}
        {edgeSlices.map((z, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              width: size,
              height: size,
              transform: `translateZ(${z}px)`,
              backfaceVisibility: 'visible',
            }}
          >
            <div
              className="rounded-full mx-auto"
              style={{
                width: size * 0.92,
                height: size * 0.92,
                marginTop: size * 0.04,
                background: 'linear-gradient(180deg, #d4a843 0%, #c9982e 30%, #b8892a 50%, #c9982e 70%, #d4a843 100%)',
                boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)',
              }}
            />
          </div>
        ))}

        {/* Pile (back) — z=-EDGE_DEPTH, rotated 180° */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: `translateZ(${-EDGE_DEPTH - 1}px) rotateY(180deg)`,
          }}
        >
          <Image
            src={backSrc}
            alt={`${alt} — reverse`}
            width={size}
            height={size}
            className="w-full h-full object-contain"
            loading="lazy"
          />
          {/* Reflet glissant */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)',
              animation: `coin-shine ${duration}s linear infinite`,
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes coin-spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        @keyframes coin-shine {
          0% { opacity: 0; }
          45% { opacity: 0; }
          50% { opacity: 1; }
          55% { opacity: 0; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
