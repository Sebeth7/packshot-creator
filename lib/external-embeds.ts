/**
 * Contenus externes des articles de blog (hors YouTube) : façade locale,
 * chargement après accord explicite.
 *
 * Les contenus hérités de Webflow (content/blog/**) intègrent par une iframe
 * chargée à l'affichage : player.vimeo.com (success story Shotflow, FR et EN),
 * sketchfab.com (photogrammétrie, FR et EN) et saasphoto.com (photographie à
 * 360°, FR et EN). Mesure du 08/10/2026 sur le build de `main` : chacune
 * contactait son hôte avant tout choix, après un refus et après une révocation.
 *
 * `transformExternalEmbeds` remplace, au rendu, chaque iframe reconnue par une
 * façade locale : un lien vers le contenu (utilisable sans JavaScript), une
 * icône générique, le nom du service. Aucune ressource du service n'est
 * référencée par la façade. L'iframe n'est créée qu'après l'accord explicite de
 * l'internaute, pour ce contenu seulement, par components/blog/YouTubeConsent.tsx.
 * La catégorie « Vidéos YouTube » du gestionnaire de cookies ne couvre pas ces
 * services : aucun accord durable n'est enregistré pour eux.
 *
 * Aucun fichier de contenu n'est modifié. Classes visuelles communes avec la
 * façade YouTube (app/globals.css, `.pkc-yt*`) : même boîte 16:9 réservée.
 */

import { PLAY_ICON, FIGCAPTION_RE, FIGURE_RE, IFRAME_RE, captionText, decodeEntities, escapeHtml, getAttr } from './youtube';

export type ExternalEmbedProvider = 'vimeo' | 'sketchfab' | 'saasphoto';

interface ProviderDef {
  /** Nom affiché. */
  name: string;
  /** Hôte contacté au chargement de l'iframe, cité dans la fenêtre d'information. */
  host: string;
  /** URL d'intégration acceptée (https seulement, chemin strict). */
  src: RegExp;
  /** Attribut allowfullscreen de l'intégration d'origine, conservé. */
  allowFullscreen: boolean;
}

const QUERY = '(?:\\?[A-Za-z0-9=&_.%-]*)?';

export const EXTERNAL_EMBED_PROVIDERS: Record<ExternalEmbedProvider, ProviderDef> = {
  vimeo: {
    name: 'Vimeo',
    host: 'player.vimeo.com',
    src: new RegExp(`^https://player\\.vimeo\\.com/video/\\d+${QUERY}$`),
    allowFullscreen: true,
  },
  sketchfab: {
    name: 'Sketchfab',
    host: 'sketchfab.com',
    src: new RegExp(`^https://sketchfab\\.com/models/[0-9a-f]{32}/embed${QUERY}$`),
    allowFullscreen: true,
  },
  saasphoto: {
    name: 'saasphoto.com',
    host: 'saasphoto.com',
    src: /^https:\/\/saasphoto\.com\/share\/[A-Za-z0-9_-]+(?:\/[A-Za-z0-9_.-]+)*\.html$/,
    allowFullscreen: false,
  },
};

/**
 * Service et URL d'intégration (https) d'une source d'iframe ; null si le
 * service n'est pas reconnu ou si l'URL sort du format attendu. La source est
 * prise telle quelle : entités HTML déjà décodées (attribut lu par le DOM, ou
 * décodé par l'appelant).
 */
export function parseExternalEmbed(raw: string | null | undefined): { provider: ExternalEmbedProvider; src: string } | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  const src = trimmed.startsWith('//') ? `https:${trimmed}` : trimmed;
  for (const provider of Object.keys(EXTERNAL_EMBED_PROVIDERS) as ExternalEmbedProvider[]) {
    if (EXTERNAL_EMBED_PROVIDERS[provider].src.test(src)) return { provider, src };
  }
  return null;
}

export interface ExternalEmbedFacadeLabels {
  /** Nom accessible de la façade, ex. « Afficher le contenu Vimeo : {title} ». */
  play: (provider: string, title: string) => string;
  /** Nom accessible quand ni l'iframe ni la légende ne fournissent de titre. */
  playUntitled: (provider: string) => string;
  /** Mention visible sur la façade. */
  notice: (provider: string) => string;
}

export interface ExternalEmbedDialogLabels {
  title: (provider: string) => string;
  item: (title: string) => string;
  body: (provider: string, host: string) => string;
  accept: string;
  cancel: string;
  close: string;
  openExternal: (provider: string) => string;
  scope: string;
}

/**
 * Textes de la façade et de la fenêtre d'information, par langue. Gardés ici et
 * non dans messages/*.json, modifiés par plusieurs PR ouvertes au 08/10/2026
 * (#105, #108, #109, #111) ; à y migrer ensuite.
 */
export const EXTERNAL_EMBED_TEXTS: Record<'fr' | 'en' | 'de-ch', { facade: ExternalEmbedFacadeLabels; dialog: ExternalEmbedDialogLabels }> = {
  fr: {
    facade: {
      play: (p, t) => `Afficher le contenu ${p} : ${t}`,
      playUntitled: (p) => `Afficher le contenu ${p}`,
      notice: (p) => `Contenu ${p} · affiché après votre accord`,
    },
    dialog: {
      title: (p) => `Afficher un contenu ${p}`,
      item: (t) => `Contenu : ${t}`,
      body: (p, h) =>
        `Ce contenu est hébergé par ${p}. Rien n'a encore été chargé depuis ${h}. Si vous l'autorisez, il sera chargé depuis ${h}, qui recevra alors notamment votre adresse IP et des informations techniques sur votre navigateur, et pourra utiliser des cookies ou des technologies similaires.`,
      accept: 'Autoriser et afficher le contenu',
      cancel: 'Annuler',
      close: 'Fermer',
      openExternal: (p) => `Ouvrir le contenu sur ${p} (nouvel onglet)`,
      scope: "Cet accord vaut pour ce contenu uniquement, sur cette page. Il n'est pas mémorisé.",
    },
  },
  en: {
    facade: {
      play: (p, t) => `Show ${p} content: ${t}`,
      playUntitled: (p) => `Show ${p} content`,
      notice: (p) => `${p} content · shown after your consent`,
    },
    dialog: {
      title: (p) => `Show ${p} content`,
      item: (t) => `Content: ${t}`,
      body: (p, h) =>
        `This content is hosted by ${p}. Nothing has been loaded from ${h} yet. If you allow it, it will be loaded from ${h}, which will then receive, in particular, your IP address and technical information about your browser, and may use cookies or similar technologies.`,
      accept: 'Allow and show the content',
      cancel: 'Cancel',
      close: 'Close',
      openExternal: (p) => `Open the content on ${p} (new tab)`,
      scope: 'This permission applies to this content only, on this page. It is not stored.',
    },
  },
  'de-ch': {
    facade: {
      play: (p, t) => `Inhalt von ${p} anzeigen: ${t}`,
      playUntitled: (p) => `Inhalt von ${p} anzeigen`,
      notice: (p) => `Inhalt von ${p} · Anzeige nach Ihrer Zustimmung`,
    },
    dialog: {
      title: (p) => `Inhalt von ${p} anzeigen`,
      item: (t) => `Inhalt: ${t}`,
      body: (p, h) =>
        `Dieser Inhalt wird bei ${p} gehostet. Bisher wurde nichts von ${h} geladen. Wenn Sie es zulassen, wird er von ${h} geladen. ${h} erhält dann insbesondere Ihre IP-Adresse und technische Informationen über Ihren Browser und kann Cookies oder ähnliche Technologien verwenden.`,
      accept: 'Zulassen und Inhalt anzeigen',
      cancel: 'Abbrechen',
      close: 'Schliessen',
      openExternal: (p) => `Inhalt auf ${p} öffnen (neuer Tab)`,
      scope: 'Diese Zustimmung gilt nur für diesen Inhalt auf dieser Seite. Sie wird nicht gespeichert.',
    },
  },
};

/** Textes de la langue de la page ; français par défaut. */
export function externalEmbedTexts(locale: string) {
  return EXTERNAL_EMBED_TEXTS[locale as keyof typeof EXTERNAL_EMBED_TEXTS] ?? EXTERNAL_EMBED_TEXTS.fr;
}

export interface EmbedFacadeInput {
  provider: ExternalEmbedProvider;
  src: string;
  title: string;
  captionHtml: string | null;
  align: 'fullwidth' | 'center';
}

/**
 * Façade d'un contenu externe. `pkc-yt*` porte les styles communs ; `pkc-embed*`,
 * placé en tête de l'attribut class, et l'absence de `data-yt-id` la distinguent
 * d'une façade YouTube.
 */
export function renderEmbedFacade(
  { provider, src, title, captionHtml, align }: EmbedFacadeInput,
  labels: ExternalEmbedFacadeLabels,
): string {
  const name = EXTERNAL_EMBED_PROVIDERS[provider].name;
  const t = escapeHtml(title);
  const label = title ? labels.play(name, title) : labels.playUntitled(name);
  return [
    `<figure class="pkc-embed pkc-embed--${provider} pkc-yt pkc-yt--${align}">`,
    `<a class="pkc-embed__facade pkc-yt__facade" href="${escapeHtml(src)}" target="_blank" rel="noopener noreferrer"`,
    ` data-embed-provider="${provider}" data-embed-src="${escapeHtml(src)}"${title ? ` data-embed-title="${t}"` : ''} aria-label="${escapeHtml(label)}">`,
    `<span class="pkc-yt__play" aria-hidden="true">${PLAY_ICON}</span>`,
    `<span class="pkc-yt__meta" aria-hidden="true">${title ? `<span class="pkc-yt__title">${t}</span>` : ''}<span class="pkc-yt__notice">${escapeHtml(labels.notice(name))}</span></span>`,
    `</a>`,
    captionHtml !== null ? `<figcaption>${captionHtml}</figcaption>` : '',
    `</figure>`,
  ].join('');
}

function embedOf(iframeAttrs: string) {
  const raw = getAttr(iframeAttrs, 'src');
  return raw === null ? null : parseExternalEmbed(decodeEntities(raw));
}

/**
 * Remplace chaque iframe d'un service reconnu par une façade locale, sur le
 * modèle de transformYouTubeEmbeds (lib/youtube.ts) :
 * - dans une <figure> (format Webflow) : la figure entière est reconstruite,
 *   légende conservée telle quelle, alignement conservé, `padding-bottom` en
 *   ligne abandonné ;
 * - hors figure (bloc Sketchfab, crédits conservés à côté) : l'iframe est
 *   remplacée par une figure de façade sans légende.
 * Une iframe d'un autre service est laissée telle quelle : le test du corpus
 * (lib/__tests__/external-embeds.test.ts) signale toute nouvelle intégration.
 */
export function transformExternalEmbeds(
  html: string,
  labels: ExternalEmbedFacadeLabels = EXTERNAL_EMBED_TEXTS.fr.facade,
): { html: string; count: number } {
  let count = 0;

  const facadeFor = (iframeAttrs: string, captionHtml: string | null, align: EmbedFacadeInput['align']): string | null => {
    const embed = embedOf(iframeAttrs);
    if (!embed) return null;
    const rawTitle = getAttr(iframeAttrs, 'title');
    // Titre : attribut title de l'iframe, sinon texte de la légende, sinon aucun.
    const title = (rawTitle ? decodeEntities(rawTitle).trim() : '') || captionText(captionHtml);
    count++;
    return renderEmbedFacade({ ...embed, title, captionHtml, align }, labels);
  };

  const withFigures = html.replace(FIGURE_RE, (match, figAttrs: string, inner: string) => {
    let iframeAttrs: string | null = null;
    for (const m of inner.matchAll(IFRAME_RE)) {
      if (embedOf(m[1])) { iframeAttrs = m[1]; break; }
    }
    if (iframeAttrs === null) return match;
    const caption = inner.match(FIGCAPTION_RE);
    const cls = getAttr(figAttrs, 'class') ?? '';
    const align = /\bw-richtext-align-center\b/.test(cls) ? 'center' : 'fullwidth';
    return facadeFor(iframeAttrs, caption ? caption[1] : null, align) ?? match;
  });

  const out = withFigures.replace(IFRAME_RE, (match, attrs: string) => facadeFor(attrs, null, 'fullwidth') ?? match);

  return { html: out, count };
}
