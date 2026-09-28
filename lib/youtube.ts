/**
 * Vidéos YouTube des articles de blog : façade locale, lecture après accord.
 *
 * Les contenus hérités de Webflow (content/blog/**) intègrent les vidéos par une
 * iframe `https://www.youtube.com/embed/<id>`. Chargée à l'affichage, elle
 * contactait youtube.com et doubleclick.net et déposait des cookies YouTube
 * avant tout consentement (mesure du 28/09/2026).
 *
 * `transformYouTubeEmbeds` remplace, au rendu, chaque iframe YouTube par une
 * façade locale : un lien vers la page YouTube de la vidéo (utilisable sans
 * JavaScript), une vignette locale ou un fond neutre, une icône de lecture
 * générique. Aucune ressource YouTube, ytimg ou Google n'est référencée par la
 * façade. Le lecteur youtube-nocookie.com n'est créé qu'après l'accord de
 * l'internaute, par components/blog/YouTubeConsent.tsx.
 *
 * Aucun fichier de contenu n'est modifié : la transformation couvre les 57
 * intégrations des 49 fichiers, et toute intégration future au même format.
 */

/** Identifiant de vidéo YouTube : 11 caractères [A-Za-z0-9_-]. */
const YOUTUBE_ID_RE = /^[A-Za-z0-9_-]{11}$/;

/** Hôtes d'intégration reconnus : youtube.com (www., m.) et youtube-nocookie.com. */
const YOUTUBE_EMBED_SRC_RE = /^(?:https?:)?\/\/(?:[a-z0-9-]+\.)*youtube(?:-nocookie)?\.com\/embed\//i;

export const GOOGLE_PRIVACY_URL = 'https://policies.google.com/privacy';

/**
 * Vignettes locales à usage déjà établi sur le site. Aucune vignette n'est
 * téléchargée depuis YouTube : seule une image déjà utilisée pour la même
 * vidéo peut servir. `tR-6RBucmWw` : affiche de cette vidéo sur la fiche
 * /studio-photo/alphashot-pro-g2 (VIDEO_META de app/[lang]/studio-photo/[slug]).
 */
export const YOUTUBE_LOCAL_POSTERS: Record<string, { src: string; width: number; height: number }> = {
  'tR-6RBucmWw': { src: '/images/machines/alphashot-pro-g2/session.avif', width: 1920, height: 946 },
};

export interface YouTubeFacadeLabels {
  /** Nom accessible de la façade, ex. « Lire la vidéo : {title} ». */
  play: (title: string) => string;
  /** Nom accessible quand ni l'iframe ni la légende ne fournissent de titre. */
  playUntitled: string;
  /** Mention visible sur la façade. */
  notice: string;
}

/** Libellés de repli (français, langue par défaut du site). */
export const DEFAULT_YOUTUBE_LABELS: YouTubeFacadeLabels = {
  play: (title) => `Lire la vidéo : ${title}`,
  playUntitled: 'Lire la vidéo YouTube',
  notice: 'Vidéo YouTube · lecture après votre accord',
};

export function isYouTubeId(id: string | null | undefined): id is string {
  return typeof id === 'string' && YOUTUBE_ID_RE.test(id);
}

/** Extrait l'identifiant et le point de départ (secondes) d'une URL d'intégration. */
export function parseYouTubeEmbed(src: string): { id: string; start: number | null } | null {
  if (!YOUTUBE_EMBED_SRC_RE.test(src)) return null;
  let url: URL;
  try {
    url = new URL(src.startsWith('//') ? `https:${src}` : src);
  } catch {
    return null;
  }
  const id = url.pathname.replace(/^\/embed\//, '').split('/')[0];
  if (!isYouTubeId(id)) return null;
  const raw = url.searchParams.get('start') ?? url.searchParams.get('t');
  const n = raw ? parseInt(raw, 10) : NaN;
  return { id, start: Number.isFinite(n) && n > 0 ? n : null };
}

/** URL du lecteur chargé après accord : youtube-nocookie.com, lecture automatique après l'action volontaire. */
export function youtubeNocookieEmbedUrl(id: string, start: number | null): string {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`;
}

/** URL de la page YouTube : cible du lien de la façade (sans JavaScript) et du lien « Ouvrir sur YouTube ». */
export function youtubeWatchUrl(id: string, start: number | null): string {
  return `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ''}`;
}

function decodeEntities(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, d: string) => String.fromCodePoint(Number(d)))
    .replace(/&#x([0-9a-f]+);/gi, (_, h: string) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getAttr(attrs: string, name: string): string | null {
  const m = attrs.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, 'i'));
  return m ? (m[1] ?? m[2] ?? '') : null;
}

const PLAY_ICON =
  '<svg viewBox="0 0 64 64" focusable="false"><circle cx="32" cy="32" r="31" fill="currentColor"/><path d="M26 20v24l19-12z" fill="#fff"/></svg>';

interface FacadeInput {
  id: string;
  start: number | null;
  title: string;
  captionHtml: string | null;
  align: 'fullwidth' | 'center';
}

function renderFacade({ id, start, title, captionHtml, align }: FacadeInput, labels: YouTubeFacadeLabels): string {
  const poster = YOUTUBE_LOCAL_POSTERS[id];
  const t = escapeHtml(title);
  const label = title ? labels.play(title) : labels.playUntitled;
  const parts = [
    `<figure class="pkc-yt pkc-yt--${align}">`,
    `<a class="pkc-yt__facade" href="${escapeHtml(youtubeWatchUrl(id, start))}" target="_blank" rel="noopener noreferrer"`,
    ` data-yt-id="${id}"${start ? ` data-yt-start="${start}"` : ''}${title ? ` data-yt-title="${t}"` : ''} aria-label="${escapeHtml(label)}">`,
    poster
      ? `<img class="pkc-yt__poster" src="${escapeHtml(poster.src)}" alt="" width="${poster.width}" height="${poster.height}" loading="lazy" decoding="async">`
      : '',
    `<span class="pkc-yt__play" aria-hidden="true">${PLAY_ICON}</span>`,
    `<span class="pkc-yt__meta" aria-hidden="true">${title ? `<span class="pkc-yt__title">${t}</span>` : ''}<span class="pkc-yt__notice">${escapeHtml(labels.notice)}</span></span>`,
    `</a>`,
    captionHtml !== null ? `<figcaption>${captionHtml}</figcaption>` : '',
    `</figure>`,
  ];
  return parts.join('');
}

function captionText(captionHtml: string | null): string {
  if (!captionHtml) return '';
  return decodeEntities(captionHtml.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
}

// Attributs : une valeur entre guillemets peut contenir « > ».
const ATTRS = `((?:[^>"']|"[^"]*"|'[^']*')*)`;
const FIGURE_RE = new RegExp(`<figure\\b${ATTRS}>((?:(?!<\\/figure>)[\\s\\S])*?)<\\/figure>`, 'gi');
const IFRAME_RE = new RegExp(`<iframe\\b${ATTRS}>(?:[\\s\\S]*?<\\/iframe>)?`, 'gi');
const FIGCAPTION_RE = /<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i;

function youtubeSrc(iframeAttrs: string): string | null {
  const src = getAttr(iframeAttrs, 'src');
  return src && YOUTUBE_EMBED_SRC_RE.test(decodeEntities(src)) ? decodeEntities(src) : null;
}

/**
 * Remplace chaque iframe YouTube par une façade locale.
 * - Dans une <figure> (format Webflow) : la figure entière est reconstruite,
 *   légende conservée telle quelle, alignement centré ou pleine largeur conservé,
 *   `padding-bottom` en ligne abandonné (il créait l'espace vide sous l'iframe).
 * - Hors figure : l'iframe est remplacée par une figure de façade sans légende.
 * Une iframe YouTube dont l'identifiant est illisible est retirée : aucune
 * intégration YouTube ne sort de cette fonction.
 */
export function transformYouTubeEmbeds(
  html: string,
  labels: YouTubeFacadeLabels = DEFAULT_YOUTUBE_LABELS,
): { html: string; count: number } {
  let count = 0;

  const facadeFor = (iframeAttrs: string, captionHtml: string | null, align: FacadeInput['align']): string => {
    const src = youtubeSrc(iframeAttrs);
    const parsed = src ? parseYouTubeEmbed(src) : null;
    if (!parsed) return captionHtml !== null ? `<figure class="pkc-yt pkc-yt--${align}"><figcaption>${captionHtml}</figcaption></figure>` : '';
    const rawTitle = getAttr(iframeAttrs, 'title');
    // Titre : attribut title de l'iframe, sinon texte de la légende, sinon aucun.
    const title = (rawTitle ? decodeEntities(rawTitle).trim() : '') || captionText(captionHtml);
    count++;
    return renderFacade({ ...parsed, title, captionHtml, align }, labels);
  };

  const withFigures = html.replace(FIGURE_RE, (match, figAttrs: string, inner: string) => {
    let iframeAttrs: string | null = null;
    for (const m of inner.matchAll(IFRAME_RE)) {
      if (youtubeSrc(m[1])) { iframeAttrs = m[1]; break; }
    }
    if (iframeAttrs === null) return match;
    const caption = inner.match(FIGCAPTION_RE);
    const cls = getAttr(figAttrs, 'class') ?? '';
    const align = /\bw-richtext-align-center\b/.test(cls) ? 'center' : 'fullwidth';
    return facadeFor(iframeAttrs, caption ? caption[1] : null, align);
  });

  const out = withFigures.replace(IFRAME_RE, (match, attrs: string) =>
    youtubeSrc(attrs) ? facadeFor(attrs, null, 'fullwidth') : match,
  );

  return { html: out, count };
}
