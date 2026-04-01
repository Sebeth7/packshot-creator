'use client';

export default function FloatingDashboard() {
  return (
    <div className="flex items-center justify-center py-4">
      <div
        className="relative"
        style={{
          perspective: '1200px',
        }}
      >
        {/* Ombre portée au sol */}
        <div
          className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-[20px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(15,17,24,0.12) 0%, transparent 70%)',
            filter: 'blur(6px)',
            animation: 'dashboard-shadow 4s ease-in-out infinite',
          }}
        />

        {/* Panneau principal */}
        <div
          className="relative rounded-2xl overflow-hidden border border-neutral-200/60"
          style={{
            width: '420px',
            transform: 'rotateX(12deg) rotateY(-8deg) rotateZ(1deg)',
            transformStyle: 'preserve-3d',
            animation: 'dashboard-float 4s ease-in-out infinite',
            boxShadow: '0 25px 60px -15px rgba(15,17,24,0.15), 0 10px 20px -10px rgba(15,17,24,0.08)',
          }}
        >
          {/* Header du dashboard */}
          <div className="bg-future-dusk-900 px-5 py-3 flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="text-[10px] text-future-dusk-400 ml-2 font-mono">production-photo.dashboard</span>
          </div>

          {/* Contenu du dashboard */}
          <div className="bg-white p-5 space-y-4">
            {/* Row 1 — 3 KPI cards */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                <div className="text-[9px] text-red-400 uppercase font-semibold tracking-wider mb-1">Cadence</div>
                <div className="text-lg font-heading font-bold text-red-600 leading-none">30</div>
                <div className="text-[9px] text-red-400 mt-0.5">photos/jour</div>
              </div>
              <div className="bg-amber-50 rounded-lg p-3 border border-amber-100">
                <div className="text-[9px] text-amber-500 uppercase font-semibold tracking-wider mb-1">Coût</div>
                <div className="text-lg font-heading font-bold text-amber-600 leading-none">15-50€</div>
                <div className="text-[9px] text-amber-500 mt-0.5">par image</div>
              </div>
              <div className="bg-very-peri-50 rounded-lg p-3 border border-very-peri-100">
                <div className="text-[9px] text-very-peri-500 uppercase font-semibold tracking-wider mb-1">Impact</div>
                <div className="text-lg font-heading font-bold text-very-peri-700 leading-none">67%</div>
                <div className="text-[9px] text-very-peri-500 mt-0.5">influencés</div>
              </div>
            </div>

            {/* Row 2 — Progress bars */}
            <div className="space-y-2.5">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-future-dusk-500 font-medium">Capacité production</span>
                  <span className="text-[9px] text-red-500 font-semibold">Saturée</span>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                    style={{ animation: 'bar-pulse-1 3s ease-in-out infinite' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-future-dusk-500 font-medium">Budget photo externalisé</span>
                  <span className="text-[9px] text-amber-500 font-semibold">Élevé</span>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    style={{ animation: 'bar-pulse-2 4s ease-in-out infinite' }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-[9px] text-future-dusk-500 font-medium">Cohérence visuels</span>
                  <span className="text-[9px] text-red-500 font-semibold">Critique</span>
                </div>
                <div className="h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-300 to-red-400 rounded-full"
                    style={{ animation: 'bar-pulse-3 3.5s ease-in-out infinite' }}
                  />
                </div>
              </div>
            </div>

            {/* Row 3 — Mini chart bars */}
            <div>
              <div className="text-[9px] text-future-dusk-500 font-medium mb-2">Temps de production par visuel</div>
              <div className="flex items-end gap-1 h-[40px]">
                {[65, 80, 45, 90, 70, 55, 85, 95, 60, 75, 88, 50, 92, 68, 82, 78, 58, 86, 72, 64].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm"
                    style={{
                      height: `${h}%`,
                      background: h > 80 ? '#f87171' : h > 60 ? '#fbbf24' : '#c4b5fd',
                      opacity: 0.7 + (i * 0.015),
                      animation: `chart-bar ${2 + (i % 5) * 0.4}s ease-in-out ${i * 0.15}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes dashboard-float {
          0%, 100% { transform: rotateX(12deg) rotateY(-8deg) rotateZ(1deg) translateY(0px); }
          50% { transform: rotateX(12deg) rotateY(-8deg) rotateZ(1deg) translateY(-10px); }
        }
        @keyframes dashboard-shadow {
          0%, 100% { opacity: 1; transform: translateX(-50%) scale(1); }
          50% { opacity: 0.6; transform: translateX(-50%) scale(0.9); }
        }
        @keyframes bar-pulse-1 {
          0%, 100% { width: 94%; }
          50% { width: 88%; }
        }
        @keyframes bar-pulse-2 {
          0%, 100% { width: 78%; }
          40% { width: 82%; }
          70% { width: 72%; }
        }
        @keyframes bar-pulse-3 {
          0%, 100% { width: 32%; }
          30% { width: 28%; }
          60% { width: 36%; }
        }
        @keyframes chart-bar {
          0%, 100% { transform: scaleY(1); }
          50% { transform: scaleY(0.85); }
        }
      `}</style>
    </div>
  );
}
