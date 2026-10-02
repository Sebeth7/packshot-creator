'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { GAMME } from './contenu';
import { ID_VIDEO_GAMME, MARGE_HEADER, SEUIL_VIDEO_VISIBLE } from './coordination';
import type { Gabarit, StudioFrise } from './studios';

/**
 * Frise des studios (V5) : ruban fin qui défile en continu, comme un paysage.
 *
 * Mécanique : un ruban défilable nativement (glisser, molette horizontale, flèches du
 * clavier). Le défilement automatique translate la piste (`translate3d`, au
 * sous-pixel près, sans recalcul de mise en page) à vitesse constante
 * (requestAnimationFrame) ; dès qu'il s'arrête, la translation est rendue au
 * défilement natif (`scrollLeft`) à la même position, sans saut visible. La liste est
 * rendue trois fois : la première porte la sémantique, les deux copies sont
 * `aria-hidden` et `inert`. Au bout d'une longueur de liste, la position recule
 * d'autant : les copies étant identiques, la boucle ne se voit pas. Sans JavaScript,
 * le ruban reste visible et défilable à la main.
 *
 * Défilement automatique seulement si : pas de `prefers-reduced-motion`, ruban visible,
 * vidéo du hero hors champ (une seule animation majeure à la fois), onglet actif, ni
 * survol ni focus du ruban. Toute interaction manuelle (glisser, molette horizontale,
 * clavier, boutons) l'arrête jusqu'à « Reprendre ».
 *
 * Visuels : rendus détourés sur fond blanc, fondus dans le fond du ruban
 * (`mix-blend-multiply`) pour n'en garder que la silhouette ; gabarit croissant avec
 * la taille des produits traités. Sous 640 px, ni précédent ni suivant : le doigt suffit,
 * le bouton pause reste.
 */
const VITESSE_PX_S = 22;
const COPIES = 3;
const ID_RUBAN = 'frise-studios';

// Largeur utile 92–127 px sur mobile, 128–176 px à partir de 640 px.
const TAILLE: Record<Gabarit, string> = {
  petit: 'h-[76px] w-[92px] sm:h-[104px] sm:w-[128px]',
  moyen: 'h-[85px] w-[104px] sm:h-[118px] sm:w-[144px]',
  grand: 'h-[94px] w-[115px] sm:h-[131px] sm:w-[160px]',
  'tres-grand': 'h-[104px] w-[127px] sm:h-[144px] sm:w-[176px]',
};

const TOUCHES_MANUELLES = new Set(['ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown']);

/**
 * Rend la position de la translation automatique au défilement natif, dans la même
 * tâche : aucune image intermédiaire, le visiteur reprend là où le ruban se trouvait.
 */
function rendreLaMain(
  el: HTMLDivElement | null,
  bande: HTMLDivElement | null,
  translation: { current: number | null },
) {
  if (!el || !bande || translation.current === null) return;
  const x = translation.current;
  translation.current = null;
  bande.style.transform = '';
  el.scrollLeft = x;
}

const bouton =
  'inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-future-dusk-800 ring-1 ring-future-dusk-200 transition-colors hover:bg-future-dusk-50 hover:text-future-dusk-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-very-peri-400';

function Liste({ studios, copie }: { studios: StudioFrise[]; copie: boolean }) {
  return (
    <ul
      aria-label={copie ? undefined : GAMME.liste}
      aria-hidden={copie || undefined}
      inert={copie}
      className="flex shrink-0 items-end gap-x-6 px-3 sm:gap-x-8 sm:px-4"
    >
      {studios.map((studio) => (
        <li key={studio.id} className="flex shrink-0 flex-col items-center">
          <div className={`relative ${TAILLE[studio.gabarit]}`}>
            <Image
              src={studio.image}
              alt=""
              fill
              sizes="(min-width: 640px) 176px, 127px"
              // Luminosité +4 % : les fonds blanc cassé (250–254) passent au blanc et
              // disparaissent au fondu ; les machines ne changent pas visiblement.
              className="object-contain mix-blend-multiply brightness-[1.04]"
            />
          </div>
          <p className="mt-1.5 whitespace-nowrap text-[11px] font-medium text-future-dusk-600 sm:text-xs">
            {studio.nom}
            <span className="sr-only">, {studio.famille}</span>
          </p>
        </li>
      ))}
    </ul>
  );
}

export function StudiosRail({ studios }: { studios: StudioFrise[] }) {
  const reduit = useReducedMotion();
  const mouvement = !reduit;
  const section = useRef<HTMLElement>(null);
  const ruban = useRef<HTMLDivElement>(null);
  const piste = useRef<HTMLDivElement>(null);
  const premiere = useRef<HTMLDivElement>(null);
  /** Position de la translation en cours, `null` hors défilement automatique. */
  const translation = useRef<number | null>(null);

  const [arret, setArret] = useState(false);
  const [survol, setSurvol] = useState(false);
  const [focus, setFocus] = useState(false);
  const [visible, setVisible] = useState(false);
  const [videoDansLeChamp, setVideoDansLeChamp] = useState(false);
  const [ongletVisible, setOngletVisible] = useState(true);

  const enLecture = mouvement && !arret;
  const actif = enLecture && !survol && !focus && visible && !videoDansLeChamp && ongletVisible;

  /** Longueur d'une liste : période de la boucle. */
  function periode(): number {
    return premiere.current?.offsetWidth ?? 0;
  }

  function manuel(sens: 1 | -1) {
    const el = ruban.current;
    const p = periode();
    rendreLaMain(ruban.current, piste.current, translation);
    setArret(true);
    if (!el || !p) return;
    const pas = Math.round(el.clientWidth * 0.6);
    // Défilement sans fin à la main aussi : on se replace d'une période avant d'avancer.
    if (sens < 0 && el.scrollLeft < pas) el.scrollLeft += p;
    if (sens > 0 && el.scrollLeft + pas > p * (COPIES - 1)) el.scrollLeft -= p;
    el.scrollBy({ left: sens * pas, behavior: reduit ? 'auto' : 'smooth' });
  }

  // Interaction manuelle sur le ruban : le défilement automatique s'arrête.
  useEffect(() => {
    const el = ruban.current;
    if (!el) return;
    const arreter = () => {
      // Avant que le geste ne commence à faire défiler : position remise au natif.
      rendreLaMain(el, piste.current, translation);
      setArret(true);
    };
    const touche = (e: KeyboardEvent) => {
      if (!TOUCHES_MANUELLES.has(e.key)) return;
      arreter();
      // Début / Fin : le navigateur ferait défiler la page verticalement.
      if (e.key === 'Home' || e.key === 'End') {
        e.preventDefault();
        const p = premiere.current?.offsetWidth ?? 0;
        el.scrollTo({ left: e.key === 'Home' ? 0 : Math.max(0, p - el.clientWidth) });
      }
    };
    const molette = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) arreter();
    };
    el.addEventListener('pointerdown', arreter);
    el.addEventListener('touchstart', arreter, { passive: true });
    el.addEventListener('keydown', touche);
    el.addEventListener('wheel', molette, { passive: true });
    return () => {
      el.removeEventListener('pointerdown', arreter);
      el.removeEventListener('touchstart', arreter);
      el.removeEventListener('keydown', touche);
      el.removeEventListener('wheel', molette);
    };
  }, []);

  // Visibilité du ruban, de la vidéo du hero et de l'onglet : observées seulement si le
  // mouvement est permis.
  useEffect(() => {
    const el = section.current;
    if (!mouvement || !el) return;
    const frise = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.3), {
      threshold: [0, 0.3, 1],
      rootMargin: MARGE_HEADER,
    });
    frise.observe(el);
    const video = document.getElementById(ID_VIDEO_GAMME);
    const hero = video
      ? new IntersectionObserver(([e]) => setVideoDansLeChamp(e.intersectionRatio >= SEUIL_VIDEO_VISIBLE), {
          threshold: [0, SEUIL_VIDEO_VISIBLE, 1],
          rootMargin: MARGE_HEADER,
        })
      : null;
    if (video) hero?.observe(video);
    const onglet = () => setOngletVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', onglet);
    return () => {
      frise.disconnect();
      hero?.disconnect();
      document.removeEventListener('visibilitychange', onglet);
    };
  }, [mouvement]);

  // Défilement continu : la piste est translatée, le défilement natif remis à zéro.
  useEffect(() => {
    const el = ruban.current;
    const bande = piste.current;
    if (!actif || !el || !bande) return;
    const p0 = premiere.current?.offsetWidth ?? 0;
    translation.current = p0 > 0 ? el.scrollLeft % p0 : el.scrollLeft;
    el.scrollLeft = 0;
    bande.style.transform = `translate3d(${-translation.current}px, 0, 0)`;
    let precedent: number | null = null;
    let image = 0;
    const avancer = (t: number) => {
      const p = premiere.current?.offsetWidth ?? 0;
      if (precedent !== null && p > 0 && translation.current !== null) {
        // Écart borné : pas de saut au retour d'un onglet ou après un ralentissement.
        let x = translation.current + (VITESSE_PX_S * Math.min(t - precedent, 64)) / 1000;
        if (x >= p) x -= p;
        translation.current = x;
        bande.style.transform = `translate3d(${-x}px, 0, 0)`;
      }
      precedent = t;
      image = requestAnimationFrame(avancer);
    };
    image = requestAnimationFrame(avancer);
    return () => {
      cancelAnimationFrame(image);
      rendreLaMain(el, bande, translation);
    };
  }, [actif]);

  return (
    <section ref={section} aria-labelledby="gamme-titre" className="bg-future-dusk-0 py-9 sm:py-12">
      <div className="mx-auto flex max-w-7xl items-end justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.12em] text-very-peri-600 sm:text-xs">{GAMME.surtitre}</p>
          <h2
            id="gamme-titre"
            className="mt-2 text-xl font-heading font-bold tracking-tight text-balance text-future-dusk-900 sm:text-2xl lg:text-[1.75rem]"
          >
            {GAMME.h2}
          </h2>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button type="button" aria-controls={ID_RUBAN} aria-label={GAMME.precedent} onClick={() => manuel(-1)} className={`${bouton} max-sm:hidden`}>
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" aria-controls={ID_RUBAN} aria-label={GAMME.suivant} onClick={() => manuel(1)} className={`${bouton} max-sm:hidden`}>
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
          {mouvement && (
            <button
              type="button"
              aria-controls={ID_RUBAN}
              aria-label={enLecture ? GAMME.pause : GAMME.lecture}
              onClick={() => setArret(enLecture)}
              className={bouton}
            >
              {enLecture ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      {/* Fond porté par le ruban et par la piste : le masque des bords et la translation
          isolent chacun un groupe, dans lequel se calcule le fondu `multiply` des rendus
          détourés ; sans fond propre, le blanc des images réapparaîtrait. */}
      <div
        ref={ruban}
        id={ID_RUBAN}
        role="group"
        aria-label={GAMME.ruban}
        tabIndex={0}
        data-lenis-prevent
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setSurvol(true)}
        onPointerLeave={() => setSurvol(false)}
        className="mt-5 overflow-x-auto bg-future-dusk-0 py-2 [mask-image:linear-gradient(to_right,transparent,#000_5%,#000_95%,transparent)] [scrollbar-width:none] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-very-peri-400 sm:mt-6 [&::-webkit-scrollbar]:hidden"
      >
        <div ref={piste} className="flex w-max bg-future-dusk-0 will-change-transform">
          {Array.from({ length: COPIES }, (_, i) => (
            <div key={i} ref={i === 0 ? premiere : undefined} className="shrink-0">
              <Liste studios={studios} copie={i > 0} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
