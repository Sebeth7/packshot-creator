import Image from 'next/image';
import { FileText } from 'lucide-react';
import type { VisuelCatalogue } from './visuels';

/**
 * Visuel du catalogue, ou emplacement neutre tant que le visuel n'est pas
 * autorisé. L'emplacement ne reproduit aucun contenu de la brochure : il
 * indique seulement l'identifiant du visuel attendu et ses pages.
 */
export function EmplacementVisuel({
  visuel,
  ton = 'clair',
  sizes,
  priority = false,
  compact = false,
  className = '',
}: {
  visuel: VisuelCatalogue;
  ton?: 'sombre' | 'clair';
  sizes: string;
  priority?: boolean;
  /** Vignette : identifiant seul, sans texte d'attente. */
  compact?: boolean;
  className?: string;
}) {
  const style = { aspectRatio: String(visuel.ratio) };

  if (visuel.src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={style}>
        <Image src={visuel.src} alt={visuel.texte} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  const double = visuel.ratio > 2;
  const sombre = ton === 'sombre';
  return (
    <div
      role="img"
      aria-label={`Emplacement réservé : ${visuel.texte} (visuel en attente du PDF définitif)`}
      data-emplacement={visuel.id}
      className={`relative overflow-hidden ${
        sombre
          ? 'bg-gradient-to-br from-future-dusk-600 via-future-dusk-700 to-very-peri-800 text-white/70'
          : 'bg-future-dusk-0 text-future-dusk-500'
      } ${className}`}
      style={style}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 ${sombre ? 'opacity-[0.08]' : 'opacity-[0.5]'}`}
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${sombre ? 'white' : 'var(--future-dusk-2)'} 1px, transparent 0)`,
          backgroundSize: '14px 14px',
        }}
      />
      {double && (
        <div aria-hidden="true" className={`absolute inset-y-0 left-1/2 w-px ${sombre ? 'bg-white/15' : 'bg-future-dusk-200'}`} />
      )}
      {compact ? (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-semibold tracking-[0.08em]">{visuel.id}</span>
        </div>
      ) : (
        <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-3 text-center">
          <FileText className="h-5 w-5 opacity-60" />
          <span className="text-[11px] font-semibold tracking-[0.08em] uppercase">
            {visuel.id} · {visuel.pages}
          </span>
          <span className="text-[11px] opacity-80">Visuel en attente du PDF définitif</span>
        </div>
      )}
    </div>
  );
}
