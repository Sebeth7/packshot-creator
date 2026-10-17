'use client';

/**
 * Sommaire vertical collant à droite. Règle D44, forme B pour les pages structurées
 * (guide, fiche machine). Présentationnel : il ne calcule rien, il lit la section active
 * par le contexte `SectionActiveContext`, alimenté par le même scroll-spy que la barre
 * (`FournisseurSectionActive`). Les deux navigations restent donc d'accord (pas de P2).
 *
 * Deux dispositions (correctifs QA du 16/10) :
 * - `colonne` (A1, guide) : sommaire EN FLUX, placé par le gabarit dans une vraie colonne
 *   réservée (grille à droite du contenu) ; c'est le gabarit qui gère la visibilité (xl) et
 *   le `sticky`. Plus d'overlay : aucun chevauchement du contenu.
 * - `overlay` (A2, fiche) : sommaire `fixed` dans la gouttière droite, affiché au-dessus
 *   d'un seuil porté par `seuilClassName` (la fiche Alphashot : seulement ≥ 1920 px, seuil
 *   CSS explicite `.d44-laterale-fiche`, pas le palier Tailwind `2xl`). Visible en même
 *   temps que la barre.
 *
 * Liens d'ancre natifs : le `scroll-margin-top` posé par le scroll-spy place la cible sous
 * l'en-tête et la barre.
 */
import { useEtatSection } from './NavigationPageLongue';
import { HAUTEUR_BARRE, MARGE } from './useSectionActive';
import type { EntreeSommaire } from './SommaireCollant';

function Liste({ entrees, actif }: { entrees: EntreeSommaire[]; actif: string | null }) {
  return (
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
                estActif ? 'font-semibold text-very-peri-700' : 'text-future-dusk-600 hover:text-very-peri-600'
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
  );
}

export default function SommaireLateral({
  titre,
  libelle,
  entrees,
  variant = 'overlay',
  seuilClassName = 'hidden xl:block',
}: {
  /** Titre affiché en tête du sommaire (« Sommaire », « Contents », « Inhalt »). */
  titre: string;
  /** Nom accessible du repère, distinct de celui de la barre et du sommaire de page. */
  libelle: string;
  entrees: EntreeSommaire[];
  /** `colonne` : en flux (gabarit) ; `overlay` : `fixed` dans la gouttière. */
  variant?: 'colonne' | 'overlay';
  /** Classe de seuil d'affichage pour la disposition `overlay`. */
  seuilClassName?: string;
}) {
  const etat = useEtatSection();
  if (!etat || entrees.length === 0) return null;
  const { actif, visible, haut } = etat;

  // A1 — colonne réservée : le gabarit porte la visibilité (xl) et le `sticky`. Toujours
  // rendue (la colonne est un repère permanent), surbrillance mise à jour au défilement.
  if (variant === 'colonne') {
    return (
      <nav aria-label={libelle} data-d44="lateral" className="w-full">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-future-dusk-500" aria-hidden="true">
          {titre}
        </p>
        <Liste entrees={entrees} actif={actif} />
      </nav>
    );
  }

  // A2 — overlay `fixed`, affiché au-dessus du seuil `seuilClassName`, visible avec la barre.
  return (
    <nav
      aria-label={libelle}
      data-d44="lateral"
      style={{ top: haut + HAUTEUR_BARRE + MARGE }}
      className={`${seuilClassName} fixed right-6 z-30 w-56 transition-opacity duration-200 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0 invisible'
      }`}
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-future-dusk-500" aria-hidden="true">
        {titre}
      </p>
      <Liste entrees={entrees} actif={actif} />
    </nav>
  );
}
