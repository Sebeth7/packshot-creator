'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { ChevronDown, List } from 'lucide-react';
import type { HeadingData } from '@/lib/blog-utils';

interface TableOfContentsProps {
  headings: HeadingData[];
  title?: string;
  collapsible?: boolean;
  className?: string;
}

/**
 * Sommaire des articles (règle D44, forme latérale du blog).
 *
 * - Repliable (mobile, et pages dédiées qui le demandent) : le panneau se replie
 *   AVANT le défilement vers le titre. Replier pendant le défilement faisait remonter
 *   le contenu de la hauteur du panneau : le titre visé finissait au-dessus de l'écran
 *   (mesuré le 03/10/2026 à 390 px : −810 px et −191 px).
 * - Latéral (desktop, colonne `sticky top-24`) : la liste a une hauteur maximale
 *   calculée sur la fenêtre et défile seule ; l'entrée active reste visible. Sans
 *   cela, 29 sommaires dépassaient la hauteur utile à 1 440 × 900 et leurs dernières
 *   entrées restaient inaccessibles.
 * - Les `id` des titres ne sont pas calculés ici (`processHtmlContent`) : ancres
 *   historiques inchangées. L'adresse de la page n'est pas modifiée au clic.
 */
export function TableOfContents({
  headings,
  title = 'Sommaire',
  collapsible = false,
  className = '',
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [cible, setCible] = useState<string | null>(null);
  const listeRef = useRef<HTMLDivElement>(null);
  const enDefilement = useRef(false);
  const [finDefilement, setFinDefilement] = useState(0);
  const panneauId = useId();

  /**
   * Défile vers le titre, puis vérifie sa position à l'arrivée. Les images des articles
   * hérités de Webflow n'ont pas toutes de dimensions : celles qui se chargent pendant le
   * défilement allongent la page et le titre finit plus bas que prévu (mesuré le 03/10 :
   * +1 277 px et +3 662 px sur deux articles). Jusqu'à trois corrections.
   */
  function lancerDefilement(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    enDefilement.current = true;
    let corrections = 0;
    let garde = 0;
    const armer = () => {
      window.removeEventListener('scrollend', arrivee);
      window.addEventListener('scrollend', arrivee, { once: true });
      window.clearTimeout(garde);
      garde = window.setTimeout(arrivee, 2000); // navigateurs sans « scrollend »
    };
    function arrivee() {
      window.removeEventListener('scrollend', arrivee);
      window.clearTimeout(garde);
      if (corrections < 3 && horsDePlace(el!)) {
        corrections++;
        armer();
        defilerVers(el!);
        return;
      }
      // Dernier contrôle, une fois les chargements en cours terminés.
      garde = window.setTimeout(() => {
        if (corrections < 3 && horsDePlace(el!)) {
          corrections++;
          armer();
          defilerVers(el!);
          return;
        }
        enDefilement.current = false;
        setFinDefilement((n) => n + 1);
      }, 600);
    }
    armer();
    defilerVers(el);
  }

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -80% 0px' }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings]);

  // Défilement différé : il part une fois le panneau replié et la page remise en page.
  useEffect(() => {
    if (!cible || isOpen) return;
    const image = requestAnimationFrame(() => {
      lancerDefilement(cible);
      setCible(null);
    });
    return () => cancelAnimationFrame(image);
  }, [cible, isOpen]);

  // Colonne latérale : garder l'entrée active dans la partie visible de la liste.
  // Suspendu pendant un défilement lancé depuis le sommaire : un défilement programmé
  // de la liste interromprait celui de la page (constaté dans Chromium le 03/10).
  useEffect(() => {
    const liste = listeRef.current;
    if (enDefilement.current) return;
    if (!liste || !activeId || liste.scrollHeight <= liste.clientHeight) return;
    const bouton = liste.querySelector<HTMLElement>(`[data-toc-id="${CSS.escape(activeId)}"]`);
    if (!bouton) return;
    const haut = bouton.offsetTop;
    const bas = haut + bouton.offsetHeight;
    if (haut < liste.scrollTop || bas > liste.scrollTop + liste.clientHeight) {
      liste.scrollTop = Math.max(0, haut - liste.clientHeight / 3);
    }
  }, [activeId, finDefilement]);

  if (headings.length === 0) return null;

  const handleClick = (id: string) => {
    if (collapsible && isOpen) {
      setCible(id);
      setIsOpen(false);
      return;
    }
    lancerDefilement(id);
  };

  const list = (
    <ul className="space-y-2">
      {headings.map((heading) => (
        <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
          <button
            type="button"
            data-toc-id={heading.id}
            onClick={() => handleClick(heading.id)}
            aria-current={activeId === heading.id ? 'location' : undefined}
            className={`text-sm text-left w-full transition-colors hover:text-very-peri-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-500 rounded-sm ${
              activeId === heading.id
                ? 'text-very-peri-600 font-medium'
                : 'text-future-dusk-500'
            }`}
          >
            {heading.text}
          </button>
        </li>
      ))}
    </ul>
  );

  if (collapsible) {
    return (
      <div className={className}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls={panneauId}
          className="flex items-center justify-between w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 text-future-dusk-900"
        >
          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide">
            <List className="h-4 w-4" />
            {title}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {isOpen && (
          <div id={panneauId} className="mt-2 p-4 rounded-xl border border-neutral-200 bg-white">
            {list}
          </div>
        )}
      </div>
    );
  }

  return (
    <nav className={className}>
      <h2 className="text-sm font-bold text-future-dusk-900 mb-4 uppercase tracking-wide flex items-center gap-2">
        <List className="h-4 w-4" />
        {title}
      </h2>
      {/* 10rem : décalage de la colonne collante (top-24), titre du sommaire et marge basse. */}
      <div
        ref={listeRef}
        className="relative border-l-2 border-neutral-200 pl-4 pr-2 max-h-[calc(100vh-10rem)] overflow-y-auto overscroll-contain"
      >
        {list}
      </div>
    </nav>
  );
}

function defilerVers(el: HTMLElement) {
  const reduit = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduit ? 'auto' : 'smooth', block: 'start' });
}

/** Le titre n'est pas à sa place : ni sous l'en-tête (marge de défilement), ni en bas de page atteint. */
function horsDePlace(el: HTMLElement): boolean {
  const marge = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  const ecart = el.getBoundingClientRect().top - marge;
  const finDePage = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
  if (ecart > 0 && finDePage) return false;
  return Math.abs(ecart) > 4;
}
