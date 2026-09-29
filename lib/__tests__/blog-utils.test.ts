import { describe, it, expect } from 'vitest';
import {
  addYouTubeReferrerPolicy,
  decodeHtmlEntities,
  processHtmlContent,
  removeEmptyParagraphs,
  slugify,
} from '../blog-utils';

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

const ZWJ = '\u200d';

describe('removeEmptyParagraphs — paragraphes vides hérités de Webflow (F19)', () => {
  const vides = [
    `<p>${ZWJ}</p>`,
    `<p id="">${ZWJ}</p>`,
    `<p id=''>${ZWJ}</p>`,
    `<P ID="">${ZWJ}</P>`,
    '<p> </p>',
    '<p></p>',
    '<p id=""></p>',
    '<p>&nbsp;</p>',
    '<p>&zwj;</p>',
    '<p>&#8205;</p>',
    '<p>&#x200D;</p>',
    '<p>&#160;&#xfeff;&#8203;</p>',
    '<p>\u200b\u200d\ufeff\u00a0\u2060 \n\t</p>',
  ];

  it('paragraphes vides ou invisibles : supprimés, voisins intacts', () => {
    for (const p of vides) {
      expect(removeEmptyParagraphs(`<h2>a</h2>${p}<p>b</p>`), p).toBe('<h2>a</h2><p>b</p>');
    }
  });

  it('paragraphes avec contenu réel ou attribut : conservés', () => {
    const conserves = [
      '<p>Texte</p>',
      `<p>${ZWJ}Texte</p>`,
      `<p id="">${ZWJ}.</p>`,
      '<p><img src="/a.jpg"></p>',
      `<p><a href="/x">${ZWJ}</a></p>`,
      '<p><br></p>',
      `<p><strong>${ZWJ}</strong></p>`,
      `<p id="ancre">${ZWJ}</p>`,
      `<p class="x">${ZWJ}</p>`,
      `<p style="margin:0">${ZWJ}</p>`,
      '<p>&amp;</p>',
      '<p>&#65;</p>',
      '<p>&eacute;</p>',
      '<p>&#8206;</p>',
    ];
    for (const p of conserves) expect(removeEmptyParagraphs(p), p).toBe(p);
  });

  it('balises voisines commençant par « p » et texte hors paragraphe : intacts', () => {
    const html = `<param name="a" value=""><svg><path d=""></path></svg><pre> </pre><picture></picture>Texte ${ZWJ} <span>${ZWJ}</span>`;
    expect(removeEmptyParagraphs(html)).toBe(html);
  });

  it('suppressions adjacentes et dans une liste ; deux passages sans effet supplémentaire', () => {
    const html = `<p>Intro</p><p id="">${ZWJ}</p><p id="">${ZWJ}</p><p> </p><ul><li>a<p>${ZWJ}</p></li></ul><p>Fin</p>`;
    const une = removeEmptyParagraphs(html);
    expect(une).toBe('<p>Intro</p><ul><li>a</li></ul><p>Fin</p>');
    expect(removeEmptyParagraphs(une)).toBe(une);
  });
});

describe('decodeHtmlEntities — texte du sommaire (F11)', () => {
  it('entités nommées et numériques décodées', () => {
    expect(decodeHtmlEntities('Gad &amp; Co')).toBe('Gad & Co');
    expect(decodeHtmlEntities('R&amp;D')).toBe('R&D');
    expect(decodeHtmlEntities('&lt;b&gt; &quot;x&quot; &#39;y&apos;')).toBe('<b> "x" \'y\'');
    expect(decodeHtmlEntities('a&nbsp;b')).toBe('a\u00a0b');
    expect(decodeHtmlEntities('caf&#233; caf&#xE9; caf&#Xe9;')).toBe('café café café');
  });

  it('entité inconnue, code invalide et esperluette seule : conservés', () => {
    for (const s of ['&foo;', '&#0;', '&#xD800;', '&#1114112;', 'A & B', 'A &amp B', '']) {
      expect(decodeHtmlEntities(s), s).toBe(s);
    }
  });

  it('double encodage décodé une seule fois', () => {
    expect(decodeHtmlEntities('&amp;amp;')).toBe('&amp;');
    expect(decodeHtmlEntities('&amp;lt;')).toBe('&lt;');
  });
});

describe('processHtmlContent — sommaire décodé (F11) et paragraphes vides (F19)', () => {
  it('texte du sommaire décodé, id et ancres inchangés', () => {
    const html = '<h2>Témoignage concret : Gad &amp; Co et l\'efficacité Orbitvu</h2><h3 id="">R&amp;D</h3>';
    const res = processHtmlContent(html);
    expect(res.headings).toEqual([
      { id: 'temoignage-concret-gad-amp-co-et-l-efficacite-orbitvu', text: 'Témoignage concret : Gad & Co et l\'efficacité Orbitvu', level: 2 },
      { id: 'r-amp-d', text: 'R&D', level: 3 },
    ]);
    // id calculé sur la source, comme avant : slugify du texte encodé
    expect(res.headings[0].id).toBe(slugify('Témoignage concret : Gad &amp; Co et l\'efficacité Orbitvu'));
    expect(res.processedHtml).toBe(
      '<h2 id="temoignage-concret-gad-amp-co-et-l-efficacite-orbitvu">Témoignage concret : Gad &amp; Co et l\'efficacité Orbitvu</h2>' +
        '<h3 id="r-amp-d">R&amp;D</h3>'
    );
  });

  it('paragraphes vides retirés autour des titres, listes et façades ; nombre de mots calculé sur la source', () => {
    const html =
      `<p id="">${ZWJ}</p><h2>Titre</h2><p id="">${ZWJ}</p><ul><li>a</li></ul><p id="">${ZWJ}</p>` +
      WEBFLOW_YT + `<p id="">${ZWJ}</p><p>Texte</p>`;
    const res = processHtmlContent(html);
    expect(count(res.processedHtml, /<p\b[^>]*>[\s\u200d]*<\/p>/g)).toBe(0);
    expect(res.processedHtml.startsWith('<h2 id="titre">Titre</h2><ul><li>a</li></ul><figure class="pkc-yt ')).toBe(true);
    expect(res.processedHtml.endsWith('</figure><p>Texte</p>')).toBe(true);
    expect(res.videoCount).toBe(1);
    expect(res.headings).toEqual([{ id: 'titre', text: 'Titre', level: 2 }]);
    const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    expect(res.wordCount).toBe(plain.split(/\s+/).length);
  });

  it('deux passages : même sortie', () => {
    const html = `<h2>A &amp; B</h2><p id="">${ZWJ}</p><p>x</p>` + WEBFLOW_YT + `<p> </p>`;
    const une = out(html);
    expect(out(une)).toBe(une);
  });
});
