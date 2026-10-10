import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { processHtmlContent } from '@/lib/blog-utils';
import {
  EXTERNAL_EMBED_TEXTS,
  externalEmbedTexts,
  parseExternalEmbed,
  transformExternalEmbeds,
} from '@/lib/external-embeds';

const VIMEO = 'https://player.vimeo.com/video/842561038';
const SKETCHFAB = 'https://sketchfab.com/models/e730252850194eccb75fa3a11a24e8dc/embed';
const SAASPHOTO = 'https://saasphoto.com/share/05HGU6/demo/Components/Drill_360/Drill_360.html';

describe('parseExternalEmbed', () => {
  it('reconnaît les trois intégrations du corpus', () => {
    expect(parseExternalEmbed(VIMEO)).toEqual({ provider: 'vimeo', src: VIMEO });
    expect(parseExternalEmbed(SKETCHFAB)).toEqual({ provider: 'sketchfab', src: SKETCHFAB });
    expect(parseExternalEmbed(SAASPHOTO)).toEqual({ provider: 'saasphoto', src: SAASPHOTO });
  });

  it('URL sans protocole : https imposé', () => {
    expect(parseExternalEmbed('//player.vimeo.com/video/842561038')).toEqual({ provider: 'vimeo', src: VIMEO });
  });

  it('refuse http, un autre hôte, un hôte imitant, un chemin hors format', () => {
    for (const bad of [
      'http://player.vimeo.com/video/842561038',
      'https://player.vimeo.com.example.org/video/842561038',
      'https://evil.example/player.vimeo.com/video/1',
      'https://player.vimeo.com/video/abc',
      'https://player.vimeo.com/video/1"onload="x',
      'https://sketchfab.com/models/E730252850194ECCB75FA3A11A24E8DC/embed',
      'https://sketchfab.com/models/e730252850194eccb75fa3a11a24e8dc',
      'https://saasphoto.com/share/../x.html',
      'https://saasphoto.com/share/05HGU6/demo.js',
      'javascript:alert(1)',
      'https://www.youtube.com/embed/VssNUk1qsXg',
      '',
      null,
    ]) {
      expect(parseExternalEmbed(bad), String(bad)).toBeNull();
    }
  });
});

describe('transformExternalEmbeds', () => {
  const vimeoFigure =
    `<figure id="" class="w-richtext-figure-type-video w-richtext-align-fullwidth" style="padding-bottom:56.33802816901409%" data-rt-type="video"><div id=""><iframe allowfullscreen="true" frameborder="0" scrolling="no" src="${VIMEO}" title="ShotFlow Client Success Story | Orvis"></iframe></div></figure>`;

  it('figure Vimeo : façade sans iframe, titre conservé, padding abandonné', () => {
    const { html, count } = transformExternalEmbeds(`<p>a</p>${vimeoFigure}<p>b</p>`);
    expect(count).toBe(1);
    expect(html).not.toMatch(/<iframe/);
    expect(html).not.toMatch(/padding-bottom/);
    expect(html).toContain('<figure class="pkc-embed pkc-embed--vimeo pkc-yt pkc-yt--fullwidth">');
    expect(html).toContain(`href="${VIMEO}" target="_blank" rel="noopener noreferrer"`);
    expect(html).toContain(`data-embed-provider="vimeo" data-embed-src="${VIMEO}"`);
    expect(html).toContain('data-embed-title="ShotFlow Client Success Story | Orvis"');
    expect(html).toContain('aria-label="Afficher le contenu Vimeo : ShotFlow Client Success Story | Orvis"');
    expect(html).toContain('Contenu Vimeo · affiché après votre accord');
    expect(html.startsWith('<p>a</p>') && html.endsWith('<p>b</p>')).toBe(true);
  });

  it('bloc Sketchfab hors figure : façade à la place de l\'iframe, crédits conservés', () => {
    const credits = '<p style="font-size: 13px;"> <a href="https://sketchfab.com/3d-models/nike" target="_blank">Nike Performance</a></p>';
    const src = `<div class="sketchfab-embed-wrapper"> <iframe title="Nike Performance" frameborder="0" allowfullscreen src="${SKETCHFAB}"> </iframe> ${credits}</div>`;
    const { html, count } = transformExternalEmbeds(src);
    expect(count).toBe(1);
    expect(html).not.toMatch(/<iframe/);
    expect(html).toContain('<div class="sketchfab-embed-wrapper"> <figure class="pkc-embed pkc-embed--sketchfab pkc-yt pkc-yt--fullwidth">');
    expect(html).toContain(credits);
  });

  it('figure saasphoto.com centrée, légende conservée telle quelle, sans titre', () => {
    const src = `<figure class="w-richtext-figure-type-video w-richtext-align-center" style="padding-bottom:"><div><iframe src="${SAASPHOTO}" frameborder="0" scrolling="no"></iframe></div><figcaption id="">﻿﻿</figcaption></figure>`;
    const { html } = transformExternalEmbeds(src);
    expect(html).toContain('pkc-yt--center');
    expect(html).toContain('<figcaption>﻿﻿</figcaption>');
    expect(html).not.toContain('data-embed-title');
    expect(html).toContain('aria-label="Afficher le contenu saasphoto.com"');
  });

  it('iframe d\'un service non reconnu : laissée telle quelle', () => {
    const src = '<iframe src="https://example.org/embed/1"></iframe>';
    expect(transformExternalEmbeds(src)).toEqual({ html: src, count: 0 });
  });

  it('titre échappé, entités de la source décodées une fois', () => {
    const src = `<iframe src="${VIMEO}?h=a&amp;b=1" title="A &amp; &quot;B&quot;"></iframe>`;
    const { html, count } = transformExternalEmbeds(src);
    expect(count).toBe(1);
    expect(html).toContain(`data-embed-src="${VIMEO}?h=a&amp;b=1"`);
    expect(html).toContain('data-embed-title="A &amp; &quot;B&quot;"');
  });

  it('deux passages donnent la même sortie', () => {
    const once = transformExternalEmbeds(vimeoFigure).html;
    expect(transformExternalEmbeds(once)).toEqual({ html: once, count: 0 });
  });

  it('libellés de la langue demandée', () => {
    const { html } = transformExternalEmbeds(vimeoFigure, externalEmbedTexts('de-ch').facade);
    expect(html).toContain('aria-label="Inhalt von Vimeo anzeigen: ShotFlow Client Success Story | Orvis"');
    expect(externalEmbedTexts('xx')).toBe(EXTERNAL_EMBED_TEXTS.fr);
  });
});

describe('textes de la façade et de la fenêtre d\'information', () => {
  it('trois langues complètes, de-CH sans « ß »', () => {
    for (const [locale, { facade, dialog }] of Object.entries(EXTERNAL_EMBED_TEXTS)) {
      const all = [
        facade.play('P', 'T'), facade.playUntitled('P'), facade.notice('P'),
        dialog.title('P'), dialog.item('T'), dialog.body('P', 'h.example'), dialog.accept,
        dialog.cancel, dialog.close, dialog.openExternal('P'), dialog.scope,
      ];
      for (const s of all) expect(s.trim().length, locale).toBeGreaterThan(0);
      expect(dialog.body('P', 'h.example'), locale).toContain('h.example');
      if (locale === 'de-ch') expect(all.join(' ')).not.toContain('ß');
    }
  });
});

// Corpus : tous les articles de blog, toutes langues.
const BLOG_DIR = path.resolve(process.cwd(), 'content/blog');
const files = fs
  .readdirSync(BLOG_DIR, { recursive: true })
  .map(String)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({ file: f, content: String(JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf8')).content ?? '') }));

describe('contenus externes — corpus content/blog', () => {
  const all = files.map((f) => ({ ...f, after: processHtmlContent(f.content) }));

  it('inventaire : 6 intégrations (Vimeo 2, Sketchfab 2, saasphoto.com 2), toutes en façade', () => {
    expect(all.reduce((n, f) => n + f.after.embedCount, 0)).toBe(6);
    const byProvider: Record<string, number> = {};
    for (const f of all) {
      for (const m of f.after.processedHtml.matchAll(/data-embed-provider="([a-z]+)"/g)) byProvider[m[1]] = (byProvider[m[1]] ?? 0) + 1;
    }
    expect(byProvider).toEqual({ vimeo: 2, sketchfab: 2, saasphoto: 2 });
  });

  it('aucune iframe ne sort du rendu des articles, tous services confondus', () => {
    for (const f of all) expect(f.after.processedHtml, f.file).not.toMatch(/<iframe\b/i);
  });

  it('aucune ressource des services chargeable : seuls href et data-embed-src les citent', () => {
    for (const f of all) {
      for (const [, name] of f.after.processedHtml.matchAll(/\b([a-z-]+)="(?:https?:)?\/\/[^"]*(?:vimeo\.com|sketchfab\.com\/models|saasphoto\.com)[^"]*"/g)) {
        expect(['href', 'data-embed-src'], f.file).toContain(name);
      }
    }
  });
});
