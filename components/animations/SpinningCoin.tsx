'use client';

import Image from 'next/image';

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
        {/* Face (front) */}
        <div
          className="absolute inset-0"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image
            src={frontSrc}
            alt={alt}
            width={size}
            height={size}
            className="w-full h-full object-contain drop-shadow-lg"
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

        {/* Pile (back) — rotated 180° so it appears correctly when flipped */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <Image
            src={backSrc}
            alt={`${alt} — reverse`}
            width={size}
            height={size}
            className="w-full h-full object-contain drop-shadow-lg"
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
