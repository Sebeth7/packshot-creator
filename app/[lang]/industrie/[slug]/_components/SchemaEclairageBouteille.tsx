/**
 * D1 — Schéma de principe de l'éclairage d'une bouteille, vu de dessus (hub vin-spiritueux).
 *
 * Ce n'est pas le plan interne d'un studio Orbitvu : les positions varient selon la bouteille et
 * le studio. La vue de dessus ne montre pas la hauteur : le support surélevé n'y figure pas.
 * Sources des rôles de chaque lumière : orbitvu.com/blog/how-photograph-glass-products-e-commerce
 * (23/02/2021 : contre-jour, lumières latérales, lumière dirigée vers l'étiquette, surfaces sombres
 * sur les côtés pour souligner les bords).
 *
 * Accessibilité : `role="img"` avec `<title>` et `<desc>` ; les repères numérotés renvoient à une
 * légende HTML lisible à toutes les largeurs (aucun texte important n'est porté par le SVG seul).
 */

const LEGENDE = [
  'Appareil photo, face à l’étiquette.',
  'Contre-jour diffusé : transparence et couleur du liquide.',
  'Panneau latéral diffusant : forme du verre.',
  'Panneau latéral diffusant : forme du verre.',
  'Lumière dirigée vers l’étiquette : elle compense l’assombrissement dû au contre-jour.',
  'Surfaces sombres : elles soulignent les bords du verre.',
] as const;

function Repere({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g aria-hidden="true">
      <circle cx={x} cy={y} r={15} className="fill-primary-orbitvu" />
      <text x={x} y={y + 5} textAnchor="middle" className="fill-white" fontSize={15} fontWeight={700}>
        {n}
      </text>
    </g>
  );
}

export default function SchemaEclairageBouteille() {
  return (
    <figure className="w-full">
      <div className="rounded-xl bg-white border border-future-dusk-100 p-4 sm:p-6">
        <svg
          viewBox="0 0 640 440"
          role="img"
          aria-labelledby="d1-titre d1-desc"
          className="w-full h-auto"
        >
          <title id="d1-titre">Schéma de principe de l’éclairage d’une bouteille, vu de dessus</title>
          <desc id="d1-desc">
            Au centre, la bouteille, étiquette tournée vers l’appareil photo placé en bas. Derrière la bouteille,
            une source diffuse en contre-jour. De chaque côté, un panneau diffusant. En bas à gauche, une lumière
            dirigée vers l’étiquette. Entre les panneaux et la bouteille, deux surfaces sombres.
          </desc>

          {/* 2 — Contre-jour diffusé */}
          <rect x={200} y={30} width={240} height={22} rx={4} className="fill-very-peri-100 stroke-very-peri-400" strokeWidth={2} />
          <path d="M 220 52 L 300 186 L 340 186 L 420 52 Z" className="fill-very-peri-100" opacity={0.55} />

          {/* 3 et 4 — Panneaux latéraux diffusants */}
          <rect x={64} y={150} width={22} height={150} rx={4} className="fill-very-peri-100 stroke-very-peri-400" strokeWidth={2} />
          <rect x={554} y={150} width={22} height={150} rx={4} className="fill-very-peri-100 stroke-very-peri-400" strokeWidth={2} />
          <path d="M 86 165 L 284 205 L 284 235 L 86 285 Z" className="fill-very-peri-100" opacity={0.45} />
          <path d="M 554 165 L 356 205 L 356 235 L 554 285 Z" className="fill-very-peri-100" opacity={0.45} />

          {/* 6 — Surfaces sombres, de part et d'autre de la bouteille, légèrement en arrière */}
          <rect x={196} y={120} width={14} height={86} rx={3} transform="rotate(-28 203 163)" className="fill-future-dusk-800" />
          <rect x={430} y={120} width={14} height={86} rx={3} transform="rotate(28 437 163)" className="fill-future-dusk-800" />

          {/* 5 — Lumière dirigée vers l'étiquette */}
          <rect x={132} y={348} width={34} height={22} rx={4} transform="rotate(-38 149 359)" className="fill-very-peri-200 stroke-very-peri-500" strokeWidth={2} />
          <path d="M 160 345 L 290 238 L 306 252 L 170 362 Z" className="fill-very-peri-200" opacity={0.6} />

          {/* Bouteille, vue de dessus : verre et étiquette (arc côté appareil) */}
          <circle cx={320} cy={220} r={36} className="fill-future-dusk-100 stroke-future-dusk-700" strokeWidth={3} />
          <circle cx={320} cy={220} r={13} className="fill-white stroke-future-dusk-500" strokeWidth={2} />
          <path d="M 288 238 A 36 36 0 0 0 352 238" fill="none" className="stroke-primary-orbitvu" strokeWidth={7} strokeLinecap="round" />

          {/* 1 — Appareil photo et axe de visée */}
          <line x1={320} y1={262} x2={320} y2={352} className="stroke-future-dusk-400" strokeWidth={2} strokeDasharray="6 6" />
          <rect x={290} y={360} width={60} height={38} rx={6} className="fill-future-dusk-800" />
          <rect x={308} y={350} width={24} height={12} rx={2} className="fill-future-dusk-600" />

          {/* Repères numérotés (légende en HTML ci-dessous) */}
          <Repere x={380} y={392} n={1} />
          <Repere x={470} y={41} n={2} />
          <Repere x={75} y={126} n={3} />
          <Repere x={565} y={126} n={4} />
          <Repere x={112} y={396} n={5} />
          <Repere x={252} y={108} n={6} />
          <Repere x={388} y={108} n={6} />
        </svg>
      </div>
      <ol className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-neutral-medium">
        {LEGENDE.map((texte, i) => (
          <li key={i} className="flex gap-3">
            <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-orbitvu text-[11px] font-bold text-white">
              {i + 1}
            </span>
            <span>
              <span className="sr-only">Repère {i + 1} : </span>
              {texte}
            </span>
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-neutral-medium">
        Schéma de principe, vu de dessus. Les positions varient selon la bouteille et le studio.
      </figcaption>
    </figure>
  );
}
