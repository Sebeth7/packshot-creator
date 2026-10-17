'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  FENETRE_TRAJECTOIRE_MS,
  REQUETE_DESKTOP,
  REQUETE_POINTEUR,
  TEMPS_MINIMAL_MS,
  estApprocheDuHaut,
  estSortieParLeHaut,
  pretePourSortie,
  profondeurLecture,
  routeCouverte,
  type EtatEligibilite,
  type Point,
} from '@/lib/engagement/regles';
import { sessionPopin } from '@/lib/engagement/session';
import { VISUEL } from './visuel';

const chargerFenetre = () => import('./FenetreEngagement');
const FenetreEngagement = lazy(chargerFenetre);

/** Cookie posé par components/cookies/CookieBanner.tsx une fois le choix enregistré. */
const COOKIE_CONSENTEMENT = /(?:^|;\s*)cookie-consent=/;

/** Délai avant la première mesure de lecture d'une page : le défilement de la page précédente ne compte pas. */
const DELAI_PREMIERE_MESURE_MS = 250;

/** Points de trajectoire gardés au plus (les plus récents). */
const POINTS_MAX = 24;

/** Élément affiché à l'écran (une fenêtre masquée dans le DOM ne bloque pas la pop-in). */
function affiche(el: Element): boolean {
  return el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden';
}

/** Une autre fenêtre occupe l'écran : galerie, vidéo, modale machine ou méthodologie ROI. */
function autreFenetreOuverte(): boolean {
  if (document.querySelector('dialog[open]')) return true;
  if (Array.from(document.querySelectorAll('[role="dialog"], [aria-modal="true"]')).some(affiche)) return true;
  return document.body.style.overflow === 'hidden';
}

/**
 * Surveillant de la pop-in d'engagement, monté par le layout sur les pages FR.
 * Léger : ni texte ni image tant que la pop-in n'est pas éligible. La fenêtre
 * est préchargée quand 60 s et 70 % sont atteints, puis ouverte à
 * l'intention de sortie. Sur une route exclue ou gelée, sans souris (mobile,
 * tactile) ou après une première apparition dans la session, il ne pose aucun
 * écouteur.
 *
 * Intention de sortie, deux signaux, une seule ouverture :
 * - principal : `mouseleave` du document (et `mouseout` sans cible, son
 *   équivalent), accepté si la sortie se fait par le haut ;
 * - repli : la souris atteint les 8 px du haut en remontant d'au moins 40 px,
 *   sans bouton enfoncé, avant même de quitter le document.
 *
 * Temps : depuis l'arrivée sur le site dans la session (sessionStorage), donc
 * cumulé entre pages et rechargements. Lecture : propre à la page courante,
 * remise à zéro à chaque changement de page et mesurée seulement après la
 * remise en haut de la nouvelle page.
 *
 * Diagnostic : `?popin-debug=1` dans l'URL écrit dans la console chaque
 * signal de sortie et l'état des conditions, en texte JSON lisible par les
 * outils de lecture de console. Rien n'est stocké ni envoyé.
 */
export default function PopinEngagement() {
  const chemin = usePathname();
  const [ouverte, setOuverte] = useState(false);

  useEffect(() => {
    const session = sessionPopin();
    const arrivee = session.debut(Date.now());
    const diagnostic = new URLSearchParams(window.location.search).has('popin-debug');
    const inactif = (raison: string) => {
      if (diagnostic) console.info(`[popin] inactif : ${raison}`);
    };
    if (!chemin || !routeCouverte(chemin)) return inactif('route exclue, gelée ou hors FR');
    if (session.dejaAffichee()) return inactif(`déjà affichée dans la session (${session.etat()})`);
    if (!window.matchMedia(REQUETE_POINTEUR).matches) return inactif('pas de souris (tactile)');
    const desktop = window.matchMedia(REQUETE_DESKTOP);
    if (diagnostic) console.info('[popin] actif : en attente de 60 s, 70 % et sortie par le haut');

    let profondeurMax = 0;
    let bandeauRouvert = false;
    let prechargee = false;
    let mesurable = false;
    let declenchee = false;
    const points: Point[] = [];

    const etat = (): EtatEligibilite => ({
      desktop: desktop.matches,
      routeCouverte: true,
      dejaAffichee: session.dejaAffichee(),
      ecouleMs: Date.now() - arrivee,
      profondeurMax,
      bandeauCookiesFerme: !bandeauRouvert && COOKIE_CONSENTEMENT.test(document.cookie),
      autreFenetreOuverte: autreFenetreOuverte(),
    });

    const precharger = () => {
      if (prechargee || !pretePourSortie(etat())) return;
      prechargee = true;
      void chargerFenetre();
      const image = new window.Image();
      image.src = VISUEL.src;
    };

    const mesurer = () => {
      if (!mesurable) return;
      const p = profondeurLecture(window.scrollY, window.innerHeight, document.documentElement.scrollHeight);
      if (p > profondeurMax) profondeurMax = p;
      precharger();
    };

    /** Intention de sortie reconnue : ouverture si les conditions sont réunies, une seule fois. */
    const tenter = (signal: 'sortie' | 'approche', e: MouseEvent) => {
      if (declenchee) return;
      const e0 = etat();
      const pret = document.visibilityState === 'visible' && pretePourSortie(e0);
      if (diagnostic) {
        console.info(`[popin] ${signal} ${JSON.stringify({
          x: e.clientX,
          y: e.clientY,
          pret,
          page: document.visibilityState,
          desktop: e0.desktop,
          secondes: Math.round(e0.ecouleMs / 1000),
          lecture: Math.round(e0.profondeurMax * 100),
          cookies: e0.bandeauCookiesFerme,
          autreFenetre: e0.autreFenetreOuverte,
          dejaAffichee: e0.dejaAffichee,
        })}`);
      }
      if (!pret) return;
      declenchee = true;
      session.marquer('shown');
      nettoyer();
      setOuverte(true);
    };

    const surMouvement = (e: MouseEvent) => {
      const maintenant = performance.now();
      points.push({ x: e.clientX, y: e.clientY, t: maintenant });
      while (points.length > POINTS_MAX || (points.length > 0 && maintenant - points[0].t > FENETRE_TRAJECTOIRE_MS)) {
        points.shift();
      }
      if (estApprocheDuHaut({ clientY: e.clientY, boutons: e.buttons, points, maintenant })) tenter('approche', e);
    };

    const surSortieDocument = (e: MouseEvent) => {
      if (e.type === 'mouseout' && e.relatedTarget) return;
      const sortie = estSortieParLeHaut({
        clientX: e.clientX,
        clientY: e.clientY,
        largeur: document.documentElement.clientWidth,
        hauteur: document.documentElement.clientHeight,
        points,
        maintenant: performance.now(),
      });
      if (sortie) tenter('sortie', e);
      else if (diagnostic) console.info(`[popin] sortie ignorée (côté, bas ou descente) ${JSON.stringify({ x: e.clientX, y: e.clientY })}`);
    };

    const surBandeauRouvert = () => {
      bandeauRouvert = true;
    };
    const surChoixCookies = () => {
      bandeauRouvert = false;
    };

    const racine = document.documentElement;
    window.addEventListener('scroll', mesurer, { passive: true });
    window.addEventListener('resize', mesurer, { passive: true });
    document.addEventListener('mousemove', surMouvement, { passive: true });
    racine.addEventListener('mouseleave', surSortieDocument);
    document.addEventListener('mouseout', surSortieDocument);
    window.addEventListener('open-cookie-banner', surBandeauRouvert);
    window.addEventListener('cookie-consent-update', surChoixCookies);
    const premiereMesure = window.setTimeout(() => {
      mesurable = true;
      mesurer();
    }, DELAI_PREMIERE_MESURE_MS);
    const minuterie = window.setTimeout(mesurer, Math.max(DELAI_PREMIERE_MESURE_MS, TEMPS_MINIMAL_MS - (Date.now() - arrivee)) + 50);

    function nettoyer() {
      window.removeEventListener('scroll', mesurer);
      window.removeEventListener('resize', mesurer);
      document.removeEventListener('mousemove', surMouvement);
      racine.removeEventListener('mouseleave', surSortieDocument);
      document.removeEventListener('mouseout', surSortieDocument);
      window.removeEventListener('open-cookie-banner', surBandeauRouvert);
      window.removeEventListener('cookie-consent-update', surChoixCookies);
      window.clearTimeout(premiereMesure);
      window.clearTimeout(minuterie);
    }
    return nettoyer;
  }, [chemin]);

  if (!ouverte) return null;
  return (
    <Suspense fallback={null}>
      <FenetreEngagement onFermee={() => setOuverte(false)} />
    </Suspense>
  );
}
