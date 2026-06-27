'use client';

import Image from 'next/image';
import { NavLink as Link } from '@/components/layout/NavLink';

export default function FloatingCalendar() {
  return (
    <div className="relative flex items-center justify-center py-2">
      <div style={{ perspective: '900px' }}>
        {/* Ombre portée au sol */}
        <div
          className="mx-auto w-[55%] h-[14px] rounded-full mt-2"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.2) 0%, transparent 70%)',
            filter: 'blur(6px)',
            animation: 'cal-shadow 5s ease-in-out infinite',
          }}
        />

        <Link
          href="/contact"
          className="block relative group cursor-pointer"
          style={{
            animation: 'cal-float 5s ease-in-out infinite',
          }}
        >
          <div className="relative group-hover:scale-[1.03] transition-transform duration-500">
            <Image
              src="/images/illustrations/home-final-cta.avif"
              alt="Réservez votre démo — calendrier"
              width={800}
              height={500}
              className="w-full rounded-xl"
              sizes="(max-width: 768px) 100vw, 580px"
              loading="lazy"
            />

            {/* Curseur flèche — image AVIF */}
            <div
              className="absolute pointer-events-none left-[55%] top-[70%] -translate-x-1/2 -translate-y-1/2"
              style={{
                animation: 'cal-cursor 3s ease-in-out infinite',
              }}
            >
              <Image
                src="/images/illustrations/cursor-arrow.avif"
                alt=""
                width={40}
                height={40}
                className="w-10 h-10"
                style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
                loading="lazy"
                aria-hidden="true"
              />
            </div>
          </div>
        </Link>
      </div>

      <style jsx>{`
        @keyframes cal-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes cal-shadow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.88); }
        }
        @keyframes cal-cursor {
          0% { transform: translate(4px, 3px); }
          8% { transform: translate(-3px, -2px); }
          16% { transform: translate(4px, 3px); }
          24% { transform: translate(-3px, -2px); }
          32% { transform: translate(4px, 3px); }
          100% { transform: translate(4px, 3px); }
        }
      `}</style>
    </div>
  );
}
