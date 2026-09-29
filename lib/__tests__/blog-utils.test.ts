import { describe, it, expect } from 'vitest';
import { addYouTubeReferrerPolicy, processHtmlContent } from '../blog-utils';

const ATTR = 'referrerpolicy="strict-origin-when-cross-origin"';

const out = (html: string) => processHtmlContent(html).processedHtml;
const ref = addYouTubeReferrerPolicy;
const count = (html: string, motif: RegExp) => (html.match(motif) ?? []).length;

// Balise telle qu'exportée par Webflow (content/blog/en/5-cameras-realistic-3d-animation.json)
const WEBFLOW_YT =
  '<figure data-rt-type="video" data-page-url="https://www.youtube.com/watch?v=VssNUk1qsXg"><div id="">' +
  '<iframe allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/VssNUk1qsXg"></iframe>' +
  '</div></figure>';

const IFRAME_YOUTUBE = /<iframe\b[^>]*youtube(?:-nocookie)?\.com/gi;

// Depuis #44, processHtmlContent remplace les iframes YouTube par une façade :
// le correctif de #46 est vérifié directement sur addYouTubeReferrerPolicy,
// qui reste appliquée après la façade.
describe('addYouTubeReferrerPolicy — referrerpolicy des embeds YouTube (#46)', () => {
  it('www.youtube.com/embed : attribut ajouté, reste de la balise inchangé', () => {
    expect(ref(WEBFLOW_YT)).toBe(
      '<figure data-rt-type="video" data-page-url="https://www.youtube.com/watch?v=VssNUk1qsXg"><div id="">' +
        `<iframe ${ATTR} allowfullscreen="true" frameborder="0" scrolling="no" src="https://www.youtube.com/embed/VssNUk1qsXg"></iframe>` +
        '</div></figure>'
    );
  });

  it('youtube.com/embed sans www : attribut ajouté', () => {
    expect(ref('<iframe src="https://youtube.com/embed/abc"></iframe>')).toBe(
      `<iframe ${ATTR} src="https://youtube.com/embed/abc"></iframe>`
    );
  });

  it('youtube-nocookie.com/embed, avec et sans www : attribut ajouté', () => {
    expect(ref('<iframe src="https://www.youtube-nocookie.com/embed/abc?rel=0"></iframe>')).toBe(
      `<iframe ${ATTR} src="https://www.youtube-nocookie.com/embed/abc?rel=0"></iframe>`
    );
    expect(ref('<iframe src="https://youtube-nocookie.com/embed/abc"></iframe>')).toBe(
      `<iframe ${ATTR} src="https://youtube-nocookie.com/embed/abc"></iframe>`
    );
  });

  it('iframe portant déjà un referrerpolicy : inchangée, quelle que soit la valeur ou la casse', () => {
    const deja = [
      '<iframe referrerpolicy="no-referrer" src="https://www.youtube.com/embed/abc"></iframe>',
      `<iframe src="https://www.youtube.com/embed/abc" ${ATTR}></iframe>`,
      '<iframe src="https://www.youtube.com/embed/abc" referrerPolicy="origin"></iframe>',
      '<iframe src="https://www.youtube.com/embed/abc" referrerpolicy></iframe>',
    ];
    for (const html of deja) {
      expect(ref(html)).toBe(html);
      expect(count(ref(html), /referrerpolicy/gi)).toBe(1);
    }
  });

  it('iframes non YouTube : strictement inchangées (fonction et processHtmlContent)', () => {
    const autres = [
      '<iframe src="https://player.vimeo.com/video/123" allowfullscreen="true"></iframe>',
      '<iframe title="Modèle 3D" src="https://sketchfab.com/models/abc/embed" frameborder="0"></iframe>',
      '<iframe src="https://saasphoto.com/embed/abc"></iframe>',
      '<iframe class="embedly-embed" src="//cdn.embedly.com/widgets/media.html?src=%2F%2Forbitvu.co%2Fshare%2Fabc&amp;schema=orbitvu" scrolling="no"></iframe>',
      // Hôte imitant YouTube, et URL YouTube qui n'est pas un embed
      '<iframe src="https://www.youtube.com.example.org/embed/abc"></iframe>',
      '<iframe src="https://www.youtube.com/watch?v=abc"></iframe>',
      // Embed YouTube seulement dans un attribut data-*
      '<iframe data-src="https://www.youtube.com/embed/abc" src="https://player.vimeo.com/video/123"></iframe>',
    ];
    for (const html of autres) {
      expect(ref(html)).toBe(html);
      expect(out(html)).toBe(html);
    }
  });

  it('liens et textes mentionnant un embed YouTube : inchangés (fonction et processHtmlContent)', () => {
    const html = '<p>Voir <a href="https://www.youtube.com/embed/abc">https://www.youtube.com/embed/abc</a></p>';
    expect(ref(html)).toBe(html);
    expect(out(html)).toBe(html);
  });

  it('plusieurs iframes dans le même contenu : seules les YouTube reçoivent l\'attribut, une fois chacune', () => {
    const vimeo = '<iframe src="https://player.vimeo.com/video/123"></iframe>';
    const html =
      '<p>Intro</p>' +
      '<iframe src="https://www.youtube.com/embed/a1"></iframe>' +
      vimeo +
      '<iframe allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/b2"></iframe>' +
      '<iframe referrerpolicy="no-referrer" src="https://youtube.com/embed/c3"></iframe>';
    const res = ref(html);
    expect(res).toBe(
      '<p>Intro</p>' +
        `<iframe ${ATTR} src="https://www.youtube.com/embed/a1"></iframe>` +
        vimeo +
        `<iframe ${ATTR} allowfullscreen="true" src="https://www.youtube-nocookie.com/embed/b2"></iframe>` +
        '<iframe referrerpolicy="no-referrer" src="https://youtube.com/embed/c3"></iframe>'
    );
    expect(count(res, /<iframe\b/g)).toBe(4);
    expect(count(res, /referrerpolicy=/g)).toBe(3);
  });

  it('deux passages : même sortie, aucun attribut dupliqué', () => {
    const html =
      '<h2>Titre</h2><p><img src="/a.jpg"></p>' +
      WEBFLOW_YT +
      '<iframe src="https://www.youtube-nocookie.com/embed/b2"></iframe>' +
      '<iframe src="https://player.vimeo.com/video/123"></iframe>';
    const une = ref(html);
    const deux = ref(une);
    expect(deux).toBe(une);
    expect(count(deux, /referrerpolicy=/g)).toBe(2);
    for (const tag of deux.match(/<iframe\b[^>]*>/g) ?? []) {
      expect(count(tag, /referrerpolicy=/g)).toBeLessThanOrEqual(1);
    }
  });
});

describe('processHtmlContent — embeds YouTube après la façade (#44) et garde #46', () => {
  const variantes = [
    WEBFLOW_YT,
    '<iframe src="https://youtube.com/embed/VssNUk1qsXg"></iframe>',
    '<iframe src="https://www.youtube-nocookie.com/embed/VssNUk1qsXg?rel=0"></iframe>',
    `<iframe ${ATTR} src="https://www.youtube.com/embed/VssNUk1qsXg"></iframe>`,
    '<iframe referrerpolicy="no-referrer" src="https://www.youtube.com/embed/VssNUk1qsXg"></iframe>',
  ];

  it('aucune iframe YouTube brute en sortie : façade à la place, compteur à 1', () => {
    for (const html of variantes) {
      const res = processHtmlContent(html);
      expect(count(res.processedHtml, IFRAME_YOUTUBE)).toBe(0);
      expect(res.processedHtml).toContain('class="pkc-yt ');
      expect(res.videoCount).toBe(1);
    }
  });

  it('identifiant YouTube illisible : iframe retirée, jamais rendue brute', () => {
    const res = processHtmlContent('<p>a</p><iframe src="https://www.youtube.com/embed/abc"></iframe><p>b</p>');
    expect(count(res.processedHtml, IFRAME_YOUTUBE)).toBe(0);
    expect(res.videoCount).toBe(0);
  });

  it('aucun referrerpolicy en double dans la sortie', () => {
    const html = variantes.join('') + '<iframe src="https://player.vimeo.com/video/123"></iframe>';
    const res = out(html);
    for (const tag of res.match(/<iframe\b[^>]*>/g) ?? []) {
      expect(count(tag, /referrerpolicy/gi)).toBeLessThanOrEqual(1);
    }
    expect(count(res, /referrerpolicy/gi)).toBe(0);
  });

  it('deux passages de processHtmlContent : même sortie', () => {
    const html =
      '<h2>Titre</h2><p><img src="/a.jpg"></p>' +
      WEBFLOW_YT +
      '<iframe src="https://www.youtube-nocookie.com/embed/tR-6RBucmWw"></iframe>' +
      '<iframe src="https://player.vimeo.com/video/123"></iframe>';
    const une = out(html);
    expect(out(une)).toBe(une);
  });

  it('nombre de mots et sommaire inchangés par le traitement vidéo', () => {
    const texte = '<h2>Vidéo</h2><p>Un deux trois</p>';
    const avec = processHtmlContent(texte + WEBFLOW_YT);
    const sans = processHtmlContent(texte);
    expect(avec.wordCount).toBe(sans.wordCount);
    expect(avec.headings).toEqual(sans.headings);
  });
});
