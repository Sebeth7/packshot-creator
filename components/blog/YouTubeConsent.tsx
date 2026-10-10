'use client';

/**
 * Activation des façades de contenus externes des articles :
 * - vidéos YouTube (lib/youtube.ts) ;
 * - Vimeo, Sketchfab et saasphoto.com (lib/external-embeds.ts).
 *
 * Au clic, à Entrée ou à Espace sur une façade :
 * - vidéo YouTube et catégorie « Vidéos YouTube » acceptée dans le gestionnaire
 *   de cookies : le lecteur youtube-nocookie.com est créé directement ;
 * - sinon : une fenêtre d'information s'ouvre AVANT tout appel au service.
 *   « Autoriser… » crée l'iframe pour ce contenu seulement, sans rien mémoriser.
 *   L'accord durable n'existe que pour YouTube et passe par le gestionnaire ;
 *   aucune catégorie du gestionnaire ne couvre les autres services.
 * Le clic sur la façade n'est jamais, à lui seul, un consentement.
 *
 * Si la catégorie est retirée ensuite (gestionnaire de cookies), les iframes
 * ouvertes sur la page, de tout service, sont retirées et les façades remises en place.
 *
 * Le nom du composant est conservé : il est monté par le gabarit des articles.
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { hasExternalMediaConsent } from '@/components/cookies/CookieBanner';
import { googlePrivacyUrl, isYouTubeId, youtubeNocookieEmbedUrl, youtubeWatchUrl } from '@/lib/youtube';
import {
  EXTERNAL_EMBED_PROVIDERS,
  externalEmbedTexts,
  parseExternalEmbed,
  type ExternalEmbedProvider,
} from '@/lib/external-embeds';

const FACADE_SELECTOR = 'a.pkc-yt__facade[data-yt-id], a.pkc-embed__facade[data-embed-provider]';

type YouTubeItem = { kind: 'youtube'; facade: HTMLAnchorElement; id: string; start: number | null; title: string };
type EmbedItem = { kind: 'embed'; facade: HTMLAnchorElement; provider: ExternalEmbedProvider; src: string; title: string };
type Item = YouTubeItem | EmbedItem;

function readFacade(facade: HTMLAnchorElement): Item | null {
  if (facade.dataset.ytId !== undefined) {
    const id = facade.dataset.ytId;
    if (!isYouTubeId(id)) return null;
    const n = parseInt(facade.dataset.ytStart ?? '', 10);
    return { kind: 'youtube', facade, id, start: Number.isFinite(n) && n > 0 ? n : null, title: facade.dataset.ytTitle ?? '' };
  }
  // Source revalidée : seule une URL d'un service reconnu devient une iframe.
  const embed = parseExternalEmbed(facade.dataset.embedSrc);
  if (!embed || embed.provider !== facade.dataset.embedProvider) return null;
  return { kind: 'embed', facade, ...embed, title: facade.dataset.embedTitle ?? '' };
}

export default function YouTubeConsent() {
  const t = useTranslations('externalVideo');
  const locale = useLocale();
  const embedTexts = externalEmbedTexts(locale).dialog;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const players = useRef(new Map<HTMLIFrameElement, HTMLAnchorElement>());
  // « gérer mes préférences » : le gestionnaire de cookies prend le focus et le rendra à la façade.
  const managing = useRef(false);
  const [pending, setPending] = useState<Item | null>(null);

  const loadPlayer = useCallback((item: Item) => {
    const { facade } = item;
    if (!facade.isConnected) return;
    const iframe = document.createElement('iframe');
    iframe.className = 'pkc-yt__player';
    if (item.kind === 'youtube') {
      iframe.src = youtubeNocookieEmbedUrl(item.id, item.start);
      iframe.title = item.title || t('untitled');
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      // Referrer-Policy globale same-origin : sans cette exception, YouTube
      // refuse la lecture (« Erreur 153 »), cf. components/video/YouTubeFacade.tsx.
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    } else {
      // Mêmes attributs que l'intégration d'origine (src, allowfullscreen), titre en plus.
      const provider = EXTERNAL_EMBED_PROVIDERS[item.provider];
      iframe.src = item.src;
      iframe.title = item.title || provider.name;
      iframe.allowFullscreen = provider.allowFullscreen;
    }
    facade.replaceWith(iframe);
    players.current.set(iframe, facade);
    iframe.focus();
  }, [t]);

  const activate = useCallback((facade: HTMLAnchorElement) => {
    const item = readFacade(facade);
    if (!item) return;
    if (item.kind === 'youtube' && hasExternalMediaConsent()) loadPlayer(item);
    else setPending(item);
  }, [loadPlayer]);

  // Délégation d'événements : les façades vivent dans le HTML de l'article.
  useEffect(() => {
    for (const f of document.querySelectorAll<HTMLAnchorElement>(FACADE_SELECTOR)) f.setAttribute('role', 'button');

    const facadeFrom = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLAnchorElement>(FACADE_SELECTOR) : null;

    // Tout clic, modificateurs compris : aucune navigation vers le service sans information préalable.
    const onClick = (e: MouseEvent) => {
      const facade = facadeFrom(e.target);
      if (!facade) return;
      e.preventDefault();
      activate(facade);
    };
    // Clic du milieu : ouvrirait le service dans un onglet sans information préalable.
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
    // Retrait de la catégorie : les iframes ouvertes sont retirées, les façades remises.
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
    if (!managing.current && pending?.facade.isConnected) pending.facade.focus({ preventScroll: true });
    managing.current = false;
    setPending(null);
  }, [pending]);

  const accept = useCallback(() => {
    const item = pending;
    setPending(null);
    dialogRef.current?.close();
    if (item) loadPlayer(item);
  }, [pending, loadPlayer]);

  const manage = useCallback(() => {
    const returnFocus = pending?.facade ?? null;
    managing.current = true;
    dialogRef.current?.close();
    window.dispatchEvent(new CustomEvent('open-cookie-banner', { detail: { returnFocus } }));
  }, [pending]);

  const provider = pending?.kind === 'embed' ? EXTERNAL_EMBED_PROVIDERS[pending.provider] : null;

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
              {provider ? embedTexts.title(provider.name) : t('dialogTitle')}
            </h2>
            <button
              type="button"
              onClick={close}
              className="text-future-dusk-400 hover:text-future-dusk-600 transition-colors shrink-0"
              aria-label={provider ? embedTexts.close : t('close')}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {pending.title && (
            <p className="text-sm font-semibold text-future-dusk-800 mb-2">
              {provider ? embedTexts.item(pending.title) : t('dialogVideo', { title: pending.title })}
            </p>
          )}
          <p id="pkc-yt-dialog-desc" className="text-sm text-future-dusk-600 leading-relaxed mb-5">
            {provider ? embedTexts.body(provider.name, provider.host) : t('dialogBody')}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-5">
            <button
              type="button"
              onClick={accept}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-very-peri-500 hover:bg-very-peri-600 text-white transition-colors"
            >
              {provider ? embedTexts.accept : t('accept')}
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-transparent border border-future-dusk-300 text-future-dusk-600 hover:bg-neutral-50 transition-colors"
            >
              {provider ? embedTexts.cancel : t('cancel')}
            </button>
          </div>
          {pending.kind === 'embed' && provider ? (
            <>
              <ul className="space-y-1.5 text-sm mb-4">
                <li>
                  <a
                    href={pending.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={close}
                    className="text-very-peri-600 underline underline-offset-2 hover:text-very-peri-700"
                  >
                    {embedTexts.openExternal(provider.name)}
                  </a>
                </li>
              </ul>
              <p className="text-xs text-future-dusk-500 leading-relaxed">{embedTexts.scope}</p>
            </>
          ) : pending.kind === 'youtube' ? (
            <>
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
                    href={googlePrivacyUrl(locale)}
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
            </>
          ) : null}
        </div>
      )}
    </dialog>
  );
}
