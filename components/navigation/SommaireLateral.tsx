'use client';

/**
 * Sommaire vertical collant à droite, desktop large seulement (xl et plus). Règle D44,
 * forme B pour les pages structurées (guide, fiche machine).
 *
 * Présentationnel : il ne calcule rien. Il lit la section active par le contexte
 * `SectionActiveContext`, alimenté par le même scroll-spy que la barre horizontale
 * (`FournisseurSectionActive`). Les deux navigations restent donc d'accord sur la section
 * active (pas de décalage P2).
 *
 * - rendu seulement ≥ 1 280 px (xl), dans la gouttière droite, pour ne pas chevaucher le
 *   contenu centré des gabarits ; sous cette largeur, la barre horizontale et, sur mobile,
 *   l'éventuel sommaire replié du gabarit prennent le relais ;
 * - `position: fixed`, aligné sous l'en-tête et la barre : la page n'a qu'à porter les
 *   `id` (déjà requis par la barre) ; aucune colonne à ajouter au gabarit ;
 * - visible en même temps que la barre (`etat.visible`), avec la même section active
 *   (`aria-current="location"`) ;
 * - liens d'ancre natifs : le `scroll-margin-top` posé par le scroll-spy place la cible
 *   sous l'en-tête et la barre.
 */
import { useEtatSection } from './NavigationPageLongue';
import { HAUTEUR_BARRE, MARGE } from './useSectionActive';
import type { EntreeSommaire } from './SommaireCollant';

export default function SommaireLateral({
  titre,
  libelle,
  entrees,
}: {
  /** Titre affiché en tête du sommaire (« Sommaire », « Contents », « Inhalt »). */
  titre: string;
  /** Nom accessible du repère, distinct de celui de la barre et du sommaire de page. */
  libelle: string;
  entrees: EntreeSommaire[];
}) {
  const etat = useEtatSection();
  if (!etat || entrees.length === 0) return null;
  const { actif, visible, haut } = etat;

  return (
    <nav
      aria-label={libelle}
      data-d44="lateral"
      style={{ top: haut + HAUTEUR_BARRE + MARGE }}
      className={`hidden xl:block fixed right-6 z-30 w-56 transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-future-dusk-500" aria-hidden="true">
        {titre}
      </p>
      <ol className="space-y-1 border-l-2 border-neutral-200 pl-3">
        {entrees.map((e, i) => {
          const numero = String(i + 1).padStart(2, '0');
          const estActif = e.id === actif;
          return (
            <li key={e.id}>
              <a
                href={`#${e.id}`}
                aria-current={estActif ? 'location' : undefined}
                className={`flex items-start gap-2 rounded-sm py-1 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-500 ${
                  estActif
                    ? 'font-semibold text-very-peri-700'
                    : 'text-future-dusk-600 hover:text-very-peri-600'
                }`}
              >
                <span className="shrink-0 tabular-nums text-xs text-future-dusk-400" aria-hidden="true">
                  {numero}
                </span>
                <span className="min-w-0">{e.libelle}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
