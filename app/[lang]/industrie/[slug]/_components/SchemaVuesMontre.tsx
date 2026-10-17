/**
 * Schéma de principe des vues de référence d'une montre, pour le contrôle qualité et le SAV
 * (hub horlogerie, FR). Il accompagne les deux cas d'usage de `data/secteurs.ts` : à réception
 * puis après révision, les mêmes vues (cadran, boîtier, bracelet) sont prises avec le même modèle
 * de prise de vue, et chaque vue se compare à la même vue.
 *
 * Ce sont des pictogrammes, pas des photographies ni des résultats Orbitvu : aucune image avant/après
 * n'est représentée. Les modèles de prise de vue et la reprise des angles du plateau sont décrits par
 * Orbitvu (orbitvu.com/software/orbitvu-station et /products/alphashot-micro-v2, lus le 17/10/2026).
 *
 * Accessibilité : les pictogrammes sont décoratifs (`aria-hidden`) ; le sens est porté par le texte
 * HTML (en-têtes de colonnes, étiquettes de ligne, légende), lisible à toutes les largeurs.
 */

const VUES = ['Cadran', 'Boîtier', 'Bracelet'] as const;

function Cadran() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
      <rect x={24} y={4} width={16} height={12} rx={3} className="fill-future-dusk-100 stroke-future-dusk-700" strokeWidth={2} />
      <rect x={24} y={48} width={16} height={12} rx={3} className="fill-future-dusk-100 stroke-future-dusk-700" strokeWidth={2} />
      <rect x={49} y={28} width={5} height={8} rx={1.5} className="fill-future-dusk-700" />
      <circle cx={32} cy={32} r={18} className="fill-white stroke-future-dusk-700" strokeWidth={2.5} />
      <circle cx={32} cy={32} r={13.5} className="fill-very-peri-50 stroke-future-dusk-300" strokeWidth={1} />
      <path d="M32 20.5v2.5M43.5 32H41M32 43.5V41M20.5 32H23" className="stroke-future-dusk-500" strokeWidth={1.5} strokeLinecap="round" />
      <path d="M32 32L25.4 27.4M32 32L41.5 26.5" className="stroke-primary-orbitvu" strokeWidth={2} strokeLinecap="round" />
      <circle cx={32} cy={32} r={1.6} className="fill-primary-orbitvu" />
    </svg>
  );
}

function Boitier() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
      {/* Profil côté couronne : bracelet à gauche et à droite, couronne de face au centre */}
      <rect x={2} y={29} width={13} height={8} rx={2} className="fill-future-dusk-100 stroke-future-dusk-700" strokeWidth={2} />
      <rect x={49} y={29} width={13} height={8} rx={2} className="fill-future-dusk-100 stroke-future-dusk-700" strokeWidth={2} />
      <path d="M15 25 Q32 15 49 25" fill="none" className="stroke-future-dusk-500" strokeWidth={2} strokeLinecap="round" />
      <rect x={13} y={25} width={38} height={16} rx={5} className="fill-white stroke-future-dusk-700" strokeWidth={2.5} />
      <path d="M18 41 Q32 47 46 41" fill="none" className="stroke-future-dusk-700" strokeWidth={2} strokeLinecap="round" />
      <rect x={27} y={28} width={10} height={10} rx={2.5} className="fill-primary-orbitvu" />
      <path d="M30 29.5v7M32 29.5v7M34 29.5v7" className="stroke-white" strokeWidth={1} strokeLinecap="round" />
    </svg>
  );
}

function Bracelet() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className="h-12 w-12 sm:h-16 sm:w-16">
      <rect x={24} y={3} width={16} height={58} rx={4} className="fill-future-dusk-100 stroke-future-dusk-700" strokeWidth={2} />
      <rect x={19} y={20} width={26} height={13} rx={2.5} fill="none" className="stroke-primary-orbitvu" strokeWidth={2.5} />
      <path d="M32 20v13" className="stroke-primary-orbitvu" strokeWidth={2} strokeLinecap="round" />
      <circle cx={32} cy={42} r={1.8} className="fill-future-dusk-700" />
      <circle cx={32} cy={49} r={1.8} className="fill-future-dusk-700" />
      <circle cx={32} cy={56} r={1.8} className="fill-future-dusk-700" />
    </svg>
  );
}

const PICTOS = [Cadran, Boitier, Bracelet] as const;

function Ligne({ etiquette, accent }: { etiquette: string; accent?: boolean }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-primary-orbitvu">{etiquette}</p>
      <ul className="grid grid-cols-3 gap-3 sm:gap-6">
        {PICTOS.map((Picto, i) => (
          <li
            key={VUES[i]}
            className={`flex items-center justify-center rounded-xl py-3 sm:py-4 ${
              accent ? 'bg-very-peri-100/60 ring-1 ring-very-peri-200' : 'bg-very-peri-50'
            }`}
          >
            <Picto />
            <span className="sr-only">{VUES[i]}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function SchemaVuesMontre() {
  return (
    <figure className="mx-auto mt-10 max-w-2xl">
      <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-8">
        <div className="grid grid-cols-3 gap-3 text-center sm:gap-6" aria-hidden="true">
          {VUES.map((vue) => (
            <p key={vue} className="text-sm font-semibold text-heading-dark">{vue}</p>
          ))}
        </div>
        <div className="mt-3 space-y-3">
          <Ligne etiquette="À réception" />
          <p className="flex items-center justify-center gap-2 text-xs text-neutral-medium">
            <svg viewBox="0 0 12 16" aria-hidden="true" className="h-4 w-3 shrink-0">
              <path d="M6 1v12M2 9l4 5 4-5" fill="none" className="stroke-very-peri-400" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Même modèle de prise de vue, mêmes angles
          </p>
          <Ligne etiquette="Après révision" accent />
        </div>
      </div>
      <figcaption className="mt-4 text-center text-sm text-neutral-medium">
        Schéma de principe : les mêmes vues, avant et après l’intervention, se comparent une à une. Pictogrammes, pas des photographies.
      </figcaption>
    </figure>
  );
}
