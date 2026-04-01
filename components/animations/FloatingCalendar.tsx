'use client';

import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function FloatingCalendar() {
  return (
    <div className="flex items-center justify-center py-2">
      <div style={{ perspective: '900px' }}>
        {/* Ombre portée au sol */}
        <div
          className="mx-auto w-[60%] h-[16px] rounded-full mt-2"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)',
            filter: 'blur(6px)',
            animation: 'cal-shadow 5s ease-in-out infinite',
          }}
        />

        <Link
          href="/contact"
          className="block relative group cursor-pointer"
          style={{
            animation: 'cal-float 5s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Image 3D originale */}
          <div className="relative group-hover:scale-[1.03] transition-transform duration-500">
            <Image
              src="/images/illustrations/home-final-cta.avif"
              alt="Réservez votre démo — calendrier"
              width={500}
              height={180}
              className="w-full rounded-xl"
              loading="lazy"
            />

            {/* Curseur animé en overlay */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: '25%',
                bottom: '20%',
                animation: 'cal-cursor 4s cubic-bezier(0.4, 0, 0.2, 1) infinite',
              }}
            >
              <svg
                width="32"
                height="36"
                viewBox="0 0 24 28"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.4))',
                }}
              >
                <path
                  d="M3 1L21 12.5L13.5 14.5L17 26L13.5 27.5L9.5 15.5L3 20V1Z"
                  fill="rgba(102,103,171,0.9)"
                  stroke="rgba(131,132,192,0.8)"
                  strokeWidth="0.8"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes cal-float {
          0%, 100% { transform: rotateY(-3deg) translateY(0px); }
          50% { transform: rotateY(-3deg) translateY(-10px); }
        }
        @keyframes cal-shadow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.88); }
        }
        @keyframes cal-cursor {
          0% { transform: translate(6px, 4px); opacity: 0.9; }
          25% { transform: translate(-4px, -2px); opacity: 1; }
          40% { transform: translate(-4px, -2px) scale(0.88); opacity: 1; }
          48% { transform: translate(-4px, -2px) scale(1); opacity: 1; }
          70% { transform: translate(2px, 6px); opacity: 0.9; }
          100% { transform: translate(6px, 4px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
