'use client';

import { Suspense, lazy, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  REQUETE_DESKTOP,
  TEMPS_MINIMAL_MS,
  estIntentionDeSortie,
  pretePourSortie,
  profondeurLecture,
  routeCouverte,
  type EtatEligibilite,
} from '@/lib/engagement/regles';
import { sessionPopin } from '@/lib/engagement/session';
import { VISUEL } from './visuel';

const chargerFenetre = () => import('./FenetreEngagement');
const FenetreEngagement = lazy(chargerFenetre);

/** Cookie posé par components/cookies/CookieBanner.tsx une fois le choix enregistré. */
const COOKIE_CONSENTEMENT = /(?:^|;\s*)cookie-consent=/;

/** Délai avant la première mesure de lecture d'une page : le défilement de la page précédente ne compte pas. */
const DELAI_PREMIERE_MESURE_MS = 250;

/** Une autre fenêtre occupe l'écran : galerie, vidéo, modale machine ou méthodologie ROI. */
function autreFenetreOuverte(): boolean {
  if (document.querySelector('dialog[open], [role="dialog"], [aria-modal="true"]')) return true;
  return document.body.style.overflow === 'hidden';
}

/**
 * Surveillant de la pop-in d'engagement, monté par le layout sur les pages FR.
 * Léger : ni texte ni image tant que la pop-in n'est pas éligible. La fenêtre
 * est préchargée quand 60 s et 70 % sont atteints, puis ouverte à
 * l'intention de sortie. Sur une route exclue ou gelée, sur mobile ou après
 * une première apparition dans la session, il ne pose aucun écouteur.
 *
 * Temps : depuis l'arrivée sur le site dans la session (sessionStorage), donc
 * cumulé entre pages et rechargements. Lecture : propre à la page courante,
 * remise à zéro à chaque changement de page et mesurée seulement après la
 * remise en haut de la nouvelle page.
 */
export default function PopinEngagement() {
  const chemin = usePathname();
  const [ouverte, setOuverte] = useState(false);

  useEffect(() => {
    const session = sessionPopin();
    const arrivee = session.debut(Date.now());
    if (!chemin || !routeCouverte(chemin) || session.dejaAffichee()) return;
    const desktop = window.matchMedia(REQUETE_DESKTOP);
    if (!desktop.matches) return;

    let profondeurMax = 0;
    let dernierY: number | null = null;
    let bandeauRouvert = false;
    let prechargee = false;
    let mesurable = false;

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

    const surMouvement = (e: MouseEvent) => {
      dernierY = e.clientY;
    };

    const surSortie = (e: MouseEvent) => {
      if (!estIntentionDeSortie({ clientY: e.clientY, relatedTarget: e.relatedTarget, dernierY })) return;
      if (document.visibilityState !== 'visible' || !pretePourSortie(etat())) return;
      session.marquer('shown');
      nettoyer();
      setOuverte(true);
    };

    const surBandeauRouvert = () => {
      bandeauRouvert = true;
    };
    const surChoixCookies = () => {
      bandeauRouvert = false;
    };

    window.addEventListener('scroll', mesurer, { passive: true });
    window.addEventListener('resize', mesurer, { passive: true });
    document.addEventListener('mousemove', surMouvement, { passive: true });
    document.addEventListener('mouseout', surSortie);
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
      document.removeEventListener('mouseout', surSortie);
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
