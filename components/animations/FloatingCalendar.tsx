'use client';

import { Link } from '@/i18n/routing';

export default function FloatingCalendar() {
  return (
    <div className="flex items-center justify-center">
      <div style={{ perspective: '800px' }}>
        <Link
          href="/contact"
          className="block relative group cursor-pointer"
          style={{
            animation: 'cal-float 4s ease-in-out infinite',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Ombre portée */}
          <div
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-[14px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse, rgba(102,103,171,0.3) 0%, transparent 70%)',
              filter: 'blur(5px)',
              animation: 'cal-shadow 4s ease-in-out infinite',
            }}
          />

          {/* Calendrier */}
          <div
            className="relative w-[180px] h-[180px] rounded-2xl overflow-visible group-hover:scale-105 transition-transform duration-300"
            style={{
              background: 'linear-gradient(145deg, #1a1d2e 0%, #0f1118 100%)',
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
              border: '1px solid rgba(180,160,100,0.2)',
            }}
          >
            {/* Anneaux spirale en haut */}
            <div className="absolute -top-3 left-0 right-0 flex justify-center gap-5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-4 h-6 rounded-full border-[2.5px]"
                  style={{
                    borderColor: '#2a2d42',
                    background: 'transparent',
                  }}
                />
              ))}
            </div>

            {/* Bord doré supérieur */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(180,160,100,0.3), transparent)' }}
            />

            {/* Grille de jours */}
            <div className="pt-6 px-4 pb-4">
              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: 12 }).map((_, i) => {
                  const isSelected = i === 5;
                  return (
                    <div
                      key={i}
                      className="aspect-square rounded-lg"
                      style={{
                        background: isSelected
                          ? '#6667AB'
                          : 'linear-gradient(145deg, #252840 0%, #1a1d2e 100%)',
                        boxShadow: isSelected
                          ? '0 0 12px rgba(102,103,171,0.5)'
                          : 'inset 0 1px 2px rgba(0,0,0,0.3)',
                        animation: isSelected ? 'cal-pulse 2s ease-in-out infinite' : undefined,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Curseur animé */}
            <div
              className="absolute pointer-events-none"
              style={{
                right: '28px',
                bottom: '32px',
                animation: 'cal-cursor 3s ease-in-out infinite',
              }}
            >
              <svg
                width="28"
                height="32"
                viewBox="0 0 24 28"
                fill="none"
                style={{
                  filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                }}
              >
                <path
                  d="M4 1L22 12L14 14L18 26L14 27L10 16L4 20V1Z"
                  fill="#6667AB"
                  stroke="#8384c0"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes cal-float {
          0%, 100% { transform: rotateX(8deg) rotateY(-6deg) translateY(0px); }
          50% { transform: rotateX(8deg) rotateY(-6deg) translateY(-8px); }
        }
        @keyframes cal-shadow {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.5; transform: translateX(-50%) scale(0.9); }
        }
        @keyframes cal-pulse {
          0%, 100% { box-shadow: 0 0 12px rgba(102,103,171,0.5); }
          50% { box-shadow: 0 0 20px rgba(102,103,171,0.8); }
        }
        @keyframes cal-cursor {
          0%, 100% { transform: translate(0, 0); }
          30% { transform: translate(-8px, -6px); }
          50% { transform: translate(-8px, -6px) scale(0.9); }
          55% { transform: translate(-8px, -6px) scale(1); }
          80% { transform: translate(4px, 2px); }
        }
      `}</style>
    </div>
  );
}
