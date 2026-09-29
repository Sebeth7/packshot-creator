import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { processHtmlContent } from '@/lib/blog-utils';
import {
  parseYouTubeEmbed,
  transformYouTubeEmbeds,
  youtubeNocookieEmbedUrl,
  youtubeWatchUrl,
  googlePrivacyUrl,
  YOUTUBE_LOCAL_POSTERS,
} from '@/lib/youtube';

// Tous les contenus de blog, toutes langues : la transformation doit couvrir
// chaque intégration YouTube sans modifier un seul fichier de contenu.
const BLOG_DIR = path.resolve(process.cwd(), 'content/blog');
const files = fs
  .readdirSync(BLOG_DIR, { recursive: true })
  .map(String)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ file: f, content: String(JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')).content ?? '') }));

const YT_IFRAME = /<iframe\b[^>]*\bsrc="[^"]*youtube(?:-nocookie)?\.com[^"]*"/gi;
const count = (s: string, re: RegExp) => (s.match(re) || []).length;

/** Intégrations d'origine : id, start, title, légende. */
function originals(html: string) {
  const out: { id: string; start: number | null; title: string | null; caption: string | null; align: string }[] = [];
  for (const fig of html.matchAll(/<figure\b([^>]*)>((?:(?!<\/figure>)[\s\S])*?)<\/figure>/gi)) {
    const iframe = fig[2].match(/<iframe\b([^>]*)>/i);
    const src = iframe?.[1].match(/\bsrc="([^"]*)"/)?.[1];
    if (!src || !/youtube\.com\/embed\//.test(src)) continue;
    const parsed = parseYouTubeEmbed(src)!;
    out.push({
      ...parsed,
      title: iframe![1].match(/\btitle="([^"]*)"/)?.[1] ?? null,
      caption: fig[2].match(/<figcaption\b[^>]*>([\s\S]*?)<\/figcaption>/i)?.[1] ?? null,
      align: /w-richtext-align-center/.test(fig[1]) ? 'center' : 'fullwidth',
    });
  }
  return out;
}

describe('façade YouTube — corpus content/blog', () => {
  const all = files.map((f) => ({ ...f, before: originals(f.content), after: processHtmlContent(f.content) }));
  const withVideos = all.filter((f) => f.before.length > 0);
  const embeds = withVideos.flatMap((f) => f.before);

  it('inventaire d\'origine : 57 intégrations, 49 fichiers, 23 vidéos', () => {
    expect(embeds).toHaveLength(57);
    expect(withVideos).toHaveLength(49);
    expect(new Set(embeds.map((e) => e.id)).size).toBe(23);
    expect(all.reduce((n, f) => n + count(f.content, YT_IFRAME), 0)).toBe(57);
  });

  // Shortcodes [embed] YouTube (lib/blog-utils.ts) : 5, dans 3 fichiers sans iframe YouTube.
  const shortcodes = (s: string) => count(s, /\[embed\]https:\/\/youtu\.be\/[A-Za-z0-9_-]{11}\[\/embed\]/g);

  it('57 façades produites depuis les iframes, 5 depuis les shortcodes [embed], aucune iframe YouTube restante', () => {
    expect(all.reduce((n, f) => n + shortcodes(f.content), 0)).toBe(5);
    expect(withVideos.filter((f) => shortcodes(f.content) > 0)).toHaveLength(0);
    expect(withVideos.reduce((n, f) => n + f.after.videoCount, 0)).toBe(57);
    expect(all.reduce((n, f) => n + f.after.videoCount, 0)).toBe(57 + 5);
    for (const f of all) {
      expect(count(f.after.processedHtml, YT_IFRAME), f.file).toBe(0);
      expect(count(f.after.processedHtml, /class="pkc-yt__facade"/g), f.file).toBe(f.before.length + shortcodes(f.content));
      expect(f.after.videoCount, f.file).toBe(f.before.length + shortcodes(f.content));
    }
  });

  it('aucune ressource tierce référencée par une façade (ytimg, Google, DoubleClick)', () => {
    for (const f of withVideos) {
      const html = f.after.processedHtml;
      expect(html, f.file).not.toMatch(/ytimg\.com|img\.youtube\.com|ggpht\.com|doubleclick\.net|youtube-nocookie\.com/);
      // Aucune ressource YouTube chargeable (src) ; seuls liens (href) : page de la vidéo.
      const attrs = [...html.matchAll(/\b(src|href|srcset|data|poster)="([^"]*youtube[^"]*)"/g)];
      for (const [, name, url] of attrs) {
        expect(name, f.file).toBe('href');
        expect(url, f.file).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]{11}(&amp;t=\d+s)?$/);
      }
      for (const src of html.matchAll(/<img\b[^>]*class="pkc-yt__poster"[^>]*\bsrc="([^"]*)"/g)) expect(src[1]).toMatch(/^\/images\//);
    }
  });

  it('identifiants et ordre conservés, 8 points de départ conservés', () => {
    let starts = 0;
    for (const f of withVideos) {
      const facades = [...f.after.processedHtml.matchAll(/<a class="pkc-yt__facade" href="([^"]*)"[^>]*\bdata-yt-id="([^"]*)"(?: data-yt-start="(\d+)")?/g)];
      expect(facades.map((m) => m[2]), f.file).toEqual(f.before.map((e) => e.id));
      facades.forEach((m, i) => {
        const e = f.before[i];
        expect(m[3] ? Number(m[3]) : null, f.file).toBe(e.start);
        expect(m[1]).toBe(youtubeWatchUrl(e.id, e.start).replace(/&/g, '&amp;'));
        if (e.start) starts++;
      });
    }
    expect(starts).toBe(8);
    expect(embeds.filter((e) => e.start).map((e) => e.start).sort()).toEqual([1, 1, 5, 5, 5, 5, 8, 8]);
  });

  it('6 légendes conservées à l\'identique', () => {
    const captions = embeds.filter((e) => e.caption !== null);
    expect(captions).toHaveLength(6);
    for (const f of withVideos) {
      const after = [...f.after.processedHtml.matchAll(/<figure class="pkc-yt[^"]*">(?:(?!<\/figure>)[\s\S])*?<\/figure>/g)].map(
        (m) => m[0].match(/<figcaption>([\s\S]*?)<\/figcaption>/)?.[1] ?? null,
      );
      expect(after, f.file).toEqual(f.before.map((e) => e.caption));
    }
  });

  it('17 titres d\'iframe conservés ; repli sur la légende ; sinon nom accessible générique', () => {
    expect(embeds.filter((e) => e.title)).toHaveLength(17);
    const decode = (v: string) =>
      v.replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    const strip = (h: string) => decode(h.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim());
    for (const f of withVideos) {
      const facades = [...f.after.processedHtml.matchAll(/<a class="pkc-yt__facade"[^>]*>/g)].map((m) => ({
        title: decode(m[0].match(/\bdata-yt-title="([^"]*)"/)?.[1] ?? '') || null,
        aria: decode(m[0].match(/\baria-label="([^"]*)"/)?.[1] ?? ''),
      }));
      f.before.forEach((e, i) => {
        const expected = (e.title && decode(e.title)) || (e.caption && strip(e.caption)) || null;
        expect(facades[i].title, f.file).toBe(expected);
        expect(facades[i].aria, f.file).toBe(expected ? `Lire la vidéo : ${expected}` : 'Lire la vidéo YouTube');
      });
    }
  });

  it('alignement conservé : figures centrées → pkc-yt--center', () => {
    for (const f of withVideos) {
      const before = f.before.map((e) => e.align);
      const after = [...f.after.processedHtml.matchAll(/<figure class="pkc-yt pkc-yt--(\w+)">/g)].map((m) => m[1]);
      expect(after, f.file).toEqual(before);
    }
  });

  it('titres h2/h3 et nombre de mots inchangés', () => {
    for (const f of withVideos) {
      expect(count(f.after.processedHtml, /<h[23]\b/g), f.file).toBe(count(f.content, /<h[23]\b/g));
      const plain = f.content.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
      expect(f.after.wordCount, f.file).toBe(plain ? plain.split(/\s+/).length : 0);
    }
  });

  it('vignette locale : uniquement pour la vidéo à affiche établie', () => {
    for (const f of withVideos) {
      for (const m of f.after.processedHtml.matchAll(/data-yt-id="([^"]*)"[^>]*>(<img\b[^>]*>)?/g)) {
        expect(Boolean(m[2]), `${f.file} ${m[1]}`).toBe(m[1] in YOUTUBE_LOCAL_POSTERS);
      }
    }
  });
});

describe('façade YouTube — cas unitaires', () => {
  it('lit l\'identifiant et le départ', () => {
    expect(parseYouTubeEmbed('https://www.youtube.com/embed/8uq7kD1DoEM?start=5')).toEqual({ id: '8uq7kD1DoEM', start: 5 });
    expect(parseYouTubeEmbed('//www.youtube-nocookie.com/embed/tR-6RBucmWw')).toEqual({ id: 'tR-6RBucmWw', start: null });
    expect(parseYouTubeEmbed('https://www.youtube.com/embed/abc')).toBeNull();
    expect(parseYouTubeEmbed('https://player.vimeo.com/video/123')).toBeNull();
    expect(parseYouTubeEmbed('https://evil.example/www.youtube.com/embed/8uq7kD1DoEM')).toBeNull();
  });

  it('règles de confidentialité de Google dans la langue de la page', () => {
    expect(googlePrivacyUrl('fr')).toBe('https://policies.google.com/privacy?hl=fr');
    expect(googlePrivacyUrl('en')).toBe('https://policies.google.com/privacy?hl=en');
    expect(googlePrivacyUrl('de-ch')).toBe('https://policies.google.com/privacy?hl=de');
  });

  it('URL du lecteur : youtube-nocookie, autoplay, rel=0, start', () => {
    expect(youtubeNocookieEmbedUrl('8uq7kD1DoEM', 5)).toBe('https://www.youtube-nocookie.com/embed/8uq7kD1DoEM?autoplay=1&rel=0&start=5');
    expect(youtubeNocookieEmbedUrl('8uq7kD1DoEM', null)).toBe('https://www.youtube-nocookie.com/embed/8uq7kD1DoEM?autoplay=1&rel=0');
  });

  it('échappe titre et légende sans injection', () => {
    const html = '<figure class="w-richtext-figure-type-video"><div><iframe src="https://www.youtube.com/embed/8uq7kD1DoEM" title="A &quot;B&quot; <C>"></iframe></div></figure>';
    const out = transformYouTubeEmbeds(html).html;
    expect(out).toContain('data-yt-title="A &quot;B&quot; &lt;C&gt;"');
    expect(out).not.toContain('<C>');
  });

  it('iframe hors figure, iframe illisible, iframe non YouTube', () => {
    const r = transformYouTubeEmbeds(
      '<p>a</p><iframe src="https://www.youtube.com/embed/xKI4wRhNUoU?start=5"></iframe>' +
        '<iframe src="https://www.youtube.com/embed/nope"></iframe>' +
        '<iframe src="https://www.google.com/maps/embed?pb=x"></iframe>',
    );
    expect(r.count).toBe(1);
    expect(r.html).toContain('data-yt-id="xKI4wRhNUoU" data-yt-start="5"');
    expect(r.html).not.toContain('youtube.com/embed');
    // Hors périmètre : Google Maps reste inchangé (audit séparé).
    expect(r.html).toContain('google.com/maps/embed');
  });
});
