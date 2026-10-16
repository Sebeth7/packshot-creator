'use client';

/**
 * Navigation V9 des pages organisées en sections (décision de Laurent du 16/10/2026,
 * R-UX-LONG § 2 bis) : barre horizontale collante (`SommaireCollant`) et sommaire
 * vertical à droite (`TableOfContents`), sur les mêmes ancres, synchronisés.
 *
 * - 1 280 px et plus : barre sous l'en-tête et colonne de droite collante sous la barre,
 *   à l'intérieur de la zone des sections (elle quitte l'écran avec la dernière). Les
 *   sections de la zone réservent sa largeur (`xl:pr-80` sur leur conteneur, côté page).
 * - 1 024 à 1 279 px : barre seule en élément collant ; le sommaire vertical devient le
 *   sommaire repliable placé en tête de zone, dans le flux, sans perte de largeur.
 * - Sous 1 024 px : sommaire repliable seulement, aucune barre fixe.
 * - Section active : calculée une fois, par la barre (`onActif`, tolérance d'arrivée de
 *   1 px pour les positions fractionnaires), et affichée par les deux sommaires
 *   (`aria-current="location"`). Sans barre, le sommaire la calcule seul.
 * - Ordre du document : le sommaire précède les sections (clavier, lecteurs d'écran).
 *
 * Sans `lateral`, le composant rend la barre et les sections, sans aucun élément ajouté.
 */
import { useMemo, useState, type ReactNode } from 'react';
import SommaireCollant, { type EntreeSommaire } from '@/components/navigation/SommaireCollant';
import { TableOfContents } from '@/components/blog/TableOfContents';

export default function NavigationSections({
  barre,
  lateral,
  libellesBarre,
  libellesSommaire,
  entrees,
  ancreSommaire,
  ancreFin,
  children,
}: {
  /** Barre horizontale activée par le registre (`barreActive`). */
  barre: boolean;
  /** Sommaire vertical activé par le registre (`sommaireLateralActif`). */
  lateral: boolean;
  libellesBarre: { titre: string; libelle: string };
  libellesSommaire: { titre: string; libelle: string };
  entrees: EntreeSommaire[];
  ancreSommaire?: string;
  ancreFin?: string;
  /** Les sections listées par `entrees`, et seulement elles. */
  children: ReactNode;
}) {
  const [actif, setActif] = useState<string | null>(null);
  const cle = entrees.map((e) => `${e.id}=${e.libelle}`).join('|');
  // `cle` résume `entrees` : les sommaires ne se réinscrivent pas si le parent recrée le tableau.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const titres = useMemo(() => entrees.map((e) => ({ id: e.id, text: e.libelle, level: 2 })), [cle]);
  const actifPartage = barre ? actif : undefined;

  return (
    <>
      {barre && (
        <SommaireCollant
          titre={libellesBarre.titre}
          libelle={libellesBarre.libelle}
          entrees={entrees}
          ancreSommaire={ancreSommaire}
          ancreFin={ancreFin}
          onActif={lateral ? setActif : undefined}
          tolerance={1}
        />
      )}
      {lateral ? (
        <div className="relative">
          {/* 1 280 px et plus : colonne de droite, alignée sur le titre de la première section
              (py-24), collée sous la barre : en-tête 65 px + barre 48 px + 19 px. */}
          <div className="pointer-events-none absolute inset-0 z-30 hidden xl:block">
            <div className="mx-auto flex h-full max-w-7xl justify-end px-6 pt-24">
              <div className="pointer-events-auto sticky top-[8.25rem] w-64 self-start rounded-xl border border-neutral-200 bg-white/95 p-5 shadow-sm backdrop-blur-sm">
                <TableOfContents
                  headings={titres}
                  title={libellesSommaire.titre}
                  libelle={libellesSommaire.libelle}
                  actif={actifPartage}
                  classeListe="max-h-[calc(100vh-14rem)]"
                />
              </div>
            </div>
          </div>
          {/* Sous 1 280 px : sommaire repliable dans le flux, jamais collant. */}
          <div className="xl:hidden bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10">
              <TableOfContents headings={titres} title={libellesSommaire.titre} collapsible actif={actifPartage} />
            </div>
          </div>
          {children}
        </div>
      ) : (
        children
      )}
    </>
  );
}
