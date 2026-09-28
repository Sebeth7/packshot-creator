'use client';

/**
 * Activation des façades YouTube des articles (lib/youtube.ts).
 *
 * Au clic, à Entrée ou à Espace sur une façade :
 * - catégorie « contenus externes » acceptée dans le gestionnaire de cookies :
 *   le lecteur youtube-nocookie.com est créé directement ;
 * - sinon : une fenêtre d'information s'ouvre AVANT tout appel à YouTube.
 *   « Autoriser et lire la vidéo » crée le lecteur pour cette vidéo seulement,
 *   sans rien mémoriser ; l'accord durable passe par le gestionnaire.
 * Le clic sur la façade n'est jamais, à lui seul, un consentement.
 *
 * Si la catégorie est retirée ensuite (gestionnaire de cookies), les lecteurs
 * ouverts sur la page sont retirés et les façades remises en place.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { hasExternalMediaConsent } from '@/components/cookies/CookieBanner';
import { GOOGLE_PRIVACY_URL, isYouTubeId, youtubeNocookieEmbedUrl, youtubeWatchUrl } from '@/lib/youtube';

const FACADE_SELECTOR = 'a.pkc-yt__facade[data-yt-id]';

type Video = { facade: HTMLAnchorElement; id: string; start: number | null; title: string };

function readFacade(facade: HTMLAnchorElement): Video | null {
  const id = facade.dataset.ytId;
  if (!isYouTubeId(id)) return null;
  const n = parseInt(facade.dataset.ytStart ?? '', 10);
  return { facade, id, start: Number.isFinite(n) && n > 0 ? n : null, title: facade.dataset.ytTitle ?? '' };
}

export default function YouTubeConsent() {
  const t = useTranslations('externalVideo');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const players = useRef(new Map<HTMLIFrameElement, HTMLAnchorElement>());
  const [pending, setPending] = useState<Video | null>(null);

  const loadPlayer = useCallback((video: Video) => {
    const { facade, id, start, title } = video;
    if (!facade.isConnected) return;
    const iframe = document.createElement('iframe');
    iframe.className = 'pkc-yt__player';
    iframe.src = youtubeNocookieEmbedUrl(id, start);
    iframe.title = title || t('untitled');
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    // Referrer-Policy globale same-origin : sans cette exception, YouTube
    // refuse la lecture (« Erreur 153 »), cf. components/video/YouTubeFacade.tsx.
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    facade.replaceWith(iframe);
    players.current.set(iframe, facade);
    iframe.focus();
  }, [t]);

  const activate = useCallback((facade: HTMLAnchorElement) => {
    const video = readFacade(facade);
    if (!video) return;
    if (hasExternalMediaConsent()) loadPlayer(video);
    else setPending(video);
  }, [loadPlayer]);

  // Délégation d'événements : les façades vivent dans le HTML de l'article.
  useEffect(() => {
    for (const f of document.querySelectorAll<HTMLAnchorElement>(FACADE_SELECTOR)) f.setAttribute('role', 'button');

    const facadeFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLAnchorElement>(FACADE_SELECTOR) : null;

    // Tout clic, modificateurs compris : aucune navigation vers YouTube sans information préalable.
    const onClick = (e: MouseEvent) => {
      const facade = facadeFrom(e.target);
      if (!facade) return;
      e.preventDefault();
      activate(facade);
    };
    // Clic du milieu : ouvrirait youtube.com dans un onglet sans information préalable.
    const onAuxClick = (e: MouseEvent) => {
      if (e.button === 1 && facadeFrom(e.target)) e.preventDefault();
    };
    // Espace : comportement de bouton, sans défilement de la page. Entrée déclenche déjà « click ».
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== ' ' && e.key !== 'Spacebar') return;
      const facade = facadeFrom(e.target);
      if (!facade) return;
      e.preventDefault();
      if (!e.repeat) activate(facade);
    };
    // Retrait de la catégorie : les lecteurs ouverts sont retirés, les façades remises.
    const onConsentUpdate = (e: Event) => {
      if ((e as CustomEvent).detail?.externalMedia === true) return;
      for (const [iframe, facade] of players.current) iframe.replaceWith(facade);
      players.current.clear();
    };

    document.addEventListener('click', onClick);
    document.addEventListener('auxclick', onAuxClick);
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('cookie-consent-update', onConsentUpdate);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('auxclick', onAuxClick);
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('cookie-consent-update', onConsentUpdate);
    };
  }, [activate]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (pending && dialog && !dialog.open) dialog.showModal();
  }, [pending]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Fermeture (Annuler, croix, Échap, fond) : aucun appel tiers, retour du focus sur la façade.
  const onDialogClose = useCallback(() => {
    if (pending?.facade.isConnected) pending.facade.focus({ preventScroll: true });
    setPending(null);
  }, [pending]);

  const accept = useCallback(() => {
    const video = pending;
    setPending(null);
    dialogRef.current?.close();
    if (video) loadPlayer(video);
  }, [pending, loadPlayer]);

  const manage = useCallback(() => {
    dialogRef.current?.close();
    window.dispatchEvent(new Event('open-cookie-banner'));
  }, []);

  return (
    <dialog
      ref={dialogRef}
      onClose={onDialogClose}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      aria-labelledby="pkc-yt-dialog-title"
      aria-describedby="pkc-yt-dialog-desc"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-2xl border border-neutral-200 bg-white p-0 text-left shadow-xl backdrop:bg-future-dusk-950/60"
    >
      {pending && (
        <div className="p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <h2 id="pkc-yt-dialog-title" className="text-lg font-heading font-bold text-future-dusk-900">
              {t('dialogTitle')}
            </h2>
            <button
              type="button"
              onClick={close}
              className="text-future-dusk-400 hover:text-future-dusk-600 transition-colors shrink-0"
              aria-label={t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {pending.title && (
            <p className="text-sm font-semibold text-future-dusk-800 mb-2">{t('dialogVideo', { title: pending.title })}</p>
          )}
          <p id="pkc-yt-dialog-desc" className="text-sm text-future-dusk-600 leading-relaxed mb-5">
            {t('dialogBody')}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
            <button
              type="button"
              onClick={accept}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-very-peri-500 hover:bg-very-peri-600 text-white transition-colors"
            >
              {t('accept')}
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-transparent border border-future-dusk-300 text-future-dusk-600 hover:bg-neutral-50 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
          <ul className="space-y-1.5 text-sm mb-4">
            <li>
              <a
                href={youtubeWatchUrl(pending.id, pending.start)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="text-very-peri-600 underline underline-offset-2 hover:text-very-peri-700"
              >
                {t('openOnYoutube')}
              </a>
            </li>
            <li>
              <a
                href={GOOGLE_PRIVACY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-very-peri-600 underline underline-offset-2 hover:text-very-peri-700"
              >
                {t('googlePrivacy')}
              </a>
            </li>
          </ul>
          <p className="text-xs text-future-dusk-500 leading-relaxed">
            {t('manageHint')}{' '}
            <button
              type="button"
              onClick={manage}
              className="font-medium text-very-peri-600 underline underline-offset-2 hover:text-very-peri-700"
            >
              {t('managePreferences')}
            </button>
          </p>
        </div>
      )}
    </dialog>
  );
}
