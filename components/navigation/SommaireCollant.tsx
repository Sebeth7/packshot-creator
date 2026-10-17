'use client';

/**
 * Barre de sommaire horizontale collante, desktop seulement (lg et plus). Règle D44,
 * forme A. Version mutualisée du composant de /packshot-mode
 * (`components/landings/SommaireCollant.tsx`), qui reste en place jusqu'à la fin de la
 * mesure Mode (26/11/2026) ; la bascule de Mode se fera après contrôle de parité.
 *
 * Deux modes :
 * - AUTONOME (hors fournisseur D44) : la barre calcule elle-même la section active et sa
 *   visibilité avec le scroll-spy mutualisé `useSectionActive`. Comportement identique à la
 *   version d'origine, pour les pages à barre seule non encore basculées en double
 *   navigation.
 * - CONTRÔLÉ (dans un `FournisseurSectionActive…`) : la barre lit l'état par le contexte,
 *   partagé avec le sommaire latéral. Un seul scroll-spy par page (voir R-UX-LONG §3.1).
 *
 * Comportement commun :
 * - rien n'est rendu sous lg (1 024 px) ; sans JavaScript, la barre reste masquée ;
 * - placée sous l'en-tête collant du site (`header.sticky`, hauteur mesurée), z-40 ;
 * - section active : numéro souligné, `aria-current="location"`, libellé affiché dans un
 *   emplacement fixe à droite des numéros (tronqué s'il est long). Chaque lien garde le
 *   libellé complet dans son nom accessible ; infobulle au survol et au focus.
 * Masquée, la barre n'est pas focalisable (`invisible`).
 */
import { useEtatSection } from './NavigationPageLongue';
import { useSectionActive } from './useSectionActive';

export type EntreeSommaire = { id: string; libelle: string };

export default function SommaireCollant({
  titre,
  libelle,
  entrees,
  ancreSommaire,
  ancreFin,
}: {
  /** Mot affiché à gauche de la barre (« Sommaire », « Contents », « Inhalt »). */
  titre: string;
  /** Nom accessible du repère, distinct de celui du sommaire de la page. */
  libelle: string;
  entrees: EntreeSommaire[];
  ancreSommaire?: string;
  ancreFin?: string;
}) {
  // Contexte présent = mode contrôlé : l'état vient du fournisseur D44, et le scroll-spy
  // autonome ci-dessous est désactivé (`enabled = false`) pour ne pas en créer un second.
  const ctx = useEtatSection();
  const auto = useSectionActive(
    entrees.map((e) => e.id),
    { ancreSommaire, ancreFin },
    ctx === null,
  );
  const { actif, visible, haut } = ctx ?? auto;

  if (entrees.length === 0) return null;

  return (
    <nav
      aria-label={libelle}
      data-d44="barre"
      style={{ top: haut }}
      className={`hidden lg:block fixed inset-x-0 z-40 border-b border-neutral-200 bg-white/95 backdrop-blur-sm transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-12 flex items-center gap-5">
        <span className="shrink-0 text-xs font-semibold uppercase tracking-[0.2em] text-future-dusk-500" aria-hidden="true">
          {titre}
        </span>
        <ol className="flex shrink-0 items-center">
          {entrees.map((e, i) => {
            const numero = String(i + 1).padStart(2, '0');
            const estActif = e.id === actif;
            return (
              <li key={e.id} className="group relative">
                <a
                  href={`#${e.id}`}
                  aria-current={estActif ? 'location' : undefined}
                  className={`flex h-12 items-center border-b-2 px-2.5 text-sm tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-500 ${
                    estActif
                      ? 'border-very-peri-500 font-semibold text-very-peri-700'
                      : 'border-transparent text-future-dusk-600 hover:text-very-peri-600'
                  }`}
                >
                  {numero}
                  <span className="sr-only"> {e.libelle}</span>
                </a>
                {!estActif && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-future-dusk-900 px-2 py-1 text-xs text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
                  >
                    {e.libelle}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
        {/* Libellé de la section active dans un emplacement fixe : les numéros ne bougent
            pas quand la section change (pas de décalage de mise en page pendant le défilement). */}
        <span aria-hidden="true" className="min-w-0 flex-1 truncate text-sm font-semibold text-very-peri-700">
          {entrees.find((e) => e.id === actif)?.libelle ?? ''}
        </span>
      </div>
    </nav>
  );
}
