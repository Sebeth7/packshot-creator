import { describe, it, expect } from 'vitest';
import {
  addRelToBlankTargets,
  addYouTubeReferrerPolicy,
  decodeHtmlEntities,
  isInternalHref,
  parseYouTubeUrl,
  processHtmlContent,
  removeEmptyParagraphs,
  slugify,
  transformEmbedShortcodes,
} from '../blog-utils';
import { transformYouTubeEmbeds } from '../youtube';

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

// Formes réelles (content/blog/fr/photographie-2d-de-produits.json et
// content/blog/fr/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter.json)
const SHORTCODE_SEUL = '<p id="">[embed]https://youtu.be/HVmUF6Mjan8[/embed]</p>';
const SHORTCODE_EN_FIN =
  '<p id="">Selon une étude, les photos représentent le premier facteur d’incitation à l’achat, ' +
  'puis par les avis clients en ligne.[embed]https://youtu.be/HVmUF6Mjan8[/embed]</p>';

const shortcodes = (html: string) => transformEmbedShortcodes(html);
// Façade de référence : celle que #44 produit pour une iframe YouTube hors figure.
const facade = (id: string, start: number | null = null) =>
  transformYouTubeEmbeds(`<iframe src="https://www.youtube.com/embed/${id}${start ? `?start=${start}` : ''}"></iframe>`).html;

describe('parseYouTubeUrl — URL des shortcodes [embed]', () => {
  it('youtu.be, watch et embed : identifiant lu', () => {
    expect(parseYouTubeUrl('https://youtu.be/HVmUF6Mjan8')).toEqual({ id: 'HVmUF6Mjan8', start: null });
    expect(parseYouTubeUrl('https://www.youtube.com/watch?v=xZ_lJM-ClSs')).toEqual({ id: 'xZ_lJM-ClSs', start: null });
    expect(parseYouTubeUrl('https://m.youtube.com/watch?feature=share&v=xZ_lJM-ClSs')).toEqual({ id: 'xZ_lJM-ClSs', start: null });
    expect(parseYouTubeUrl('https://youtube.com/embed/VssNUk1qsXg')).toEqual({ id: 'VssNUk1qsXg', start: null });
    expect(parseYouTubeUrl('//youtu.be/HVmUF6Mjan8')).toEqual({ id: 'HVmUF6Mjan8', start: null });
  });

  it('paramètres : t et start en secondes, formats 1m30s ; autres paramètres ignorés', () => {
    expect(parseYouTubeUrl('https://youtu.be/HVmUF6Mjan8?t=42')?.start).toBe(42);
    expect(parseYouTubeUrl('https://youtu.be/HVmUF6Mjan8?si=abc123&t=90s')?.start).toBe(90);
    expect(parseYouTubeUrl('https://www.youtube.com/watch?v=HVmUF6Mjan8&t=1m30s')?.start).toBe(90);
    expect(parseYouTubeUrl('https://www.youtube.com/watch?v=HVmUF6Mjan8&t=1h2m3s')?.start).toBe(3723);
    expect(parseYouTubeUrl('https://www.youtube.com/embed/HVmUF6Mjan8?start=15&rel=0')?.start).toBe(15);
    expect(parseYouTubeUrl('https://youtu.be/HVmUF6Mjan8?t=abc')?.start).toBeNull();
    expect(parseYouTubeUrl('https://youtu.be/HVmUF6Mjan8?t=0')?.start).toBeNull();
    expect(parseYouTubeUrl('https://youtu.be/HVmUF6Mjan8?feature=shared')).toEqual({ id: 'HVmUF6Mjan8', start: null });
  });

  it('URL non YouTube, identifiant illisible ou protocole non web : null', () => {
    for (const url of [
      'https://vimeo.com/123456',
      'https://www.youtube.com.example.com/watch?v=HVmUF6Mjan8',
      'https://notyoutube.com/watch?v=HVmUF6Mjan8',
      'https://youtu.be/court',
      'https://www.youtube.com/watch?v=',
      'https://www.youtube.com/channel/UC123',
      'javascript:alert(1)',
      'pas une url',
    ]) {
      expect(parseYouTubeUrl(url)).toBeNull();
    }
  });
});

describe('transformEmbedShortcodes — shortcodes [embed] YouTube hérités de Webflow', () => {
  it('youtu.be seul dans son paragraphe : paragraphe remplacé par la façade de #44, sans iframe', () => {
    const res = shortcodes(SHORTCODE_SEUL);
    expect(res.html).toBe(facade('HVmUF6Mjan8'));
    expect(res.count).toBe(1);
    expect(res.html).not.toContain('[embed]');
    expect(res.html).not.toMatch(/<iframe/i);
    expect(res.html).not.toMatch(/youtu\.be|ytimg|youtube\.com\/embed/);
  });

  it('URL watch : même façade que la forme youtu.be', () => {
    expect(shortcodes('<p>[embed]https://www.youtube.com/watch?v=HVmUF6Mjan8[/embed]</p>').html).toBe(facade('HVmUF6Mjan8'));
  });

  it('paramètres : point de départ conservé, autres paramètres ignorés, entités décodées', () => {
    expect(shortcodes('<p>[embed]https://youtu.be/HVmUF6Mjan8?t=42[/embed]</p>').html).toBe(facade('HVmUF6Mjan8', 42));
    expect(shortcodes('<p>[embed]https://www.youtube.com/watch?v=HVmUF6Mjan8&amp;t=42&amp;si=x[/embed]</p>').html).toBe(
      facade('HVmUF6Mjan8', 42),
    );
    expect(shortcodes('<p>[embed] https://youtu.be/HVmUF6Mjan8?si=abc [/embed]</p>').html).toBe(facade('HVmUF6Mjan8'));
    expect(shortcodes('<p>[EMBED]https://youtu.be/HVmUF6Mjan8[/EMBED]</p>').html).toBe(facade('HVmUF6Mjan8'));
  });

  it('shortcode en fin de paragraphe (forme réelle) : texte conservé à l\'identique dans son paragraphe, façade après', () => {
    const res = shortcodes(SHORTCODE_EN_FIN);
    expect(res.html).toBe(
      '<p id="">Selon une étude, les photos représentent le premier facteur d’incitation à l’achat, ' +
        'puis par les avis clients en ligne.</p>' +
        facade('HVmUF6Mjan8'),
    );
  });

  it('shortcode entouré de paragraphes et au milieu d\'un paragraphe : voisins intacts, aucune partie vide émise', () => {
    const html = `<p>Avant</p>${SHORTCODE_SEUL}<h3 id="">Après</h3>`;
    expect(shortcodes(html).html).toBe(`<p>Avant</p>${facade('HVmUF6Mjan8')}<h3 id="">Après</h3>`);
    const milieu = '<p class="x">Début <strong>gras</strong>[embed]https://youtu.be/HVmUF6Mjan8[/embed]fin <a href="/fr">lien</a></p>';
    expect(shortcodes(milieu).html).toBe(
      `<p class="x">Début <strong>gras</strong></p>${facade('HVmUF6Mjan8')}<p class="x">fin <a href="/fr">lien</a></p>`,
    );
    const invisibles = '<p id="">‍[embed]https://youtu.be/HVmUF6Mjan8[/embed] </p>';
    expect(shortcodes(invisibles).html).toBe(facade('HVmUF6Mjan8'));
  });

  it('plusieurs shortcodes, dans un ou plusieurs paragraphes : une façade chacun, dans l\'ordre', () => {
    const deuxParagraphes = `${SHORTCODE_SEUL}<p>Texte</p><p id="">[embed]https://youtu.be/xZ_lJM-ClSs[/embed]</p>`;
    const res = shortcodes(deuxParagraphes);
    expect(res.html).toBe(`${facade('HVmUF6Mjan8')}<p>Texte</p>${facade('xZ_lJM-ClSs')}`);
    expect(res.count).toBe(2);
    const memeParagraphe = '<p>a[embed]https://youtu.be/HVmUF6Mjan8[/embed]b[embed]https://youtu.be/xZ_lJM-ClSs[/embed]c</p>';
    expect(shortcodes(memeParagraphe).html).toBe(
      `<p>a</p>${facade('HVmUF6Mjan8')}<p>b</p>${facade('xZ_lJM-ClSs')}<p>c</p>`,
    );
  });

  it('non YouTube, URL illisible, hors paragraphe ou dans une balise non refermée : laissé tel quel', () => {
    const intacts = [
      '<p>[embed]https://vimeo.com/123456[/embed]</p>',
      '<p>[embed]https://youtu.be/court[/embed]</p>',
      '<p>[embed]pas une url[/embed]</p>',
      '<div>[embed]https://youtu.be/HVmUF6Mjan8[/embed]</div>',
      '<p><strong>Voir [embed]https://youtu.be/HVmUF6Mjan8[/embed]</strong></p>',
      '<p>Texte sans shortcode</p><pre>[embed]https://youtu.be/HVmUF6Mjan8[/embed]</pre>',
    ];
    for (const html of intacts) {
      expect(shortcodes(html)).toEqual({ html, count: 0 });
    }
    // Un shortcode non YouTube reste dans le texte, à côté d'un shortcode YouTube transformé.
    expect(shortcodes('<p>[embed]https://vimeo.com/1[/embed] puis [embed]https://youtu.be/HVmUF6Mjan8[/embed]</p>').html).toBe(
      `<p>[embed]https://vimeo.com/1[/embed] puis </p>${facade('HVmUF6Mjan8')}`,
    );
  });

  it('deux passages : sortie identique', () => {
    const html = `<p>Avant</p>${SHORTCODE_SEUL}${SHORTCODE_EN_FIN}<p>[embed]https://vimeo.com/1[/embed]</p>`;
    const une = shortcodes(html);
    expect(shortcodes(une.html)).toEqual({ html: une.html, count: 0 });
  });
});

describe('processHtmlContent — shortcodes [embed] YouTube', () => {
  it('façade à la place du shortcode, compteur vidéo incrémenté (YouTubeConsent monté), aucune iframe ni shortcode', () => {
    const res = processHtmlContent(`<p>Intro</p>${SHORTCODE_SEUL}${WEBFLOW_YT}`);
    expect(res.videoCount).toBe(2);
    expect(count(res.processedHtml, /class="pkc-yt /g)).toBe(2);
    expect(count(res.processedHtml, IFRAME_YOUTUBE)).toBe(0);
    expect(res.processedHtml).not.toContain('[embed]');
  });

  it('libellés de la page transmis à la façade', () => {
    const res = processHtmlContent(SHORTCODE_SEUL, {
      youtubeLabels: { play: (t) => `Play: ${t}`, playUntitled: 'Play the YouTube video', notice: 'YouTube video' },
    });
    expect(res.processedHtml).toContain('aria-label="Play the YouTube video"');
    expect(res.processedHtml).toContain('<span class="pkc-yt__notice">YouTube video</span>');
  });

  it('nombre de mots et sommaire calculés sur la source, comme avant', () => {
    const html = `<h2>Vidéo</h2>${SHORTCODE_EN_FIN}`;
    const res = processHtmlContent(html);
    const plain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    expect(res.wordCount).toBe(plain.split(/\s+/).length);
    expect(res.headings).toEqual([{ id: 'video', text: 'Vidéo', level: 2 }]);
  });

  it('deux passages : même sortie', () => {
    const une = out(`${SHORTCODE_SEUL}${SHORTCODE_EN_FIN}${WEBFLOW_YT}`);
    expect(out(une)).toBe(une);
  });
});

describe('isInternalHref — liens internes au site (F22)', () => {
  it('internes : chemin relatif, ancre, requête, URL absolue du site (avec ou sans www, http ou https, //)', () => {
    for (const href of [
      '/fr/a-propos',
      '/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots',
      '#ancre',
      '?q=1',
      'page-voisine',
      'https://www.packshot-creator.com/fr/ia-photo-produit',
      'https://packshot-creator.com/fr',
      'http://www.packshot-creator.com/en',
      '//www.packshot-creator.com/fr',
      'https://WWW.Packshot-Creator.com/fr',
      '/fr/contact?x=1&amp;y=2',
    ]) {
      expect(isInternalHref(href), href).toBe(true);
    }
  });

  it('externes : autres domaines, sous-domaines, domaine imitant, mailto, tel, href absent ou vide de sens', () => {
    for (const href of [
      'https://orbitvu.com/',
      '//orbitvu.com/',
      'https://videos.packshot-creator.com/x.mp4',
      'https://trail.packshot-creator.com/',
      'https://www.packshot-creator.com.example.com/',
      'https://notpackshot-creator.com/',
      'mailto:contact@packshot-creator.com',
      'tel:+33147426666',
      'javascript:void(0)',
      null,
    ]) {
      expect(isInternalHref(href), String(href)).toBe(false);
    }
  });
});

describe('addRelToBlankTargets — liens target="_blank" (F22, arbitrage du 29/09)', () => {
  const rel = addRelToBlankTargets;

  it('interne relatif sans rel (forme réelle) : rel="noopener" seul, reste de la balise intact', () => {
    expect(rel('<a href="/fr/a-propos" target="_blank" id="">À propos</a>')).toBe(
      '<a href="/fr/a-propos" target="_blank" id="" rel="noopener">À propos</a>',
    );
    expect(rel('<a href="#tarifs" target="_blank">x</a>')).toBe('<a href="#tarifs" target="_blank" rel="noopener">x</a>');
  });

  it('interne absolu packshot-creator.com sans rel : rel="noopener" seul', () => {
    expect(rel('<a href="https://www.packshot-creator.com/fr/ia-photo-produit" target="_blank">x</a>')).toBe(
      '<a href="https://www.packshot-creator.com/fr/ia-photo-produit" target="_blank" rel="noopener">x</a>',
    );
  });

  it('externe sans rel (forme réelle) : rel="noopener noreferrer"', () => {
    expect(rel('<a href="https://orbitvu.com/" target="_blank" id="">Orbitvu</a>')).toBe(
      '<a href="https://orbitvu.com/" target="_blank" id="" rel="noopener noreferrer">Orbitvu</a>',
    );
    expect(rel('<a href="https://videos.packshot-creator.com/x.mp4" target="_blank">x</a>')).toBe(
      '<a href="https://videos.packshot-creator.com/x.mp4" target="_blank" rel="noopener noreferrer">x</a>',
    );
  });

  it('mailto, tel, href absent : traités comme externes (noopener noreferrer), aucun cas dans le corpus', () => {
    expect(rel('<a href="mailto:contact@packshot-creator.com" target="_blank">x</a>')).toBe(
      '<a href="mailto:contact@packshot-creator.com" target="_blank" rel="noopener noreferrer">x</a>',
    );
    expect(rel('<a href="tel:+33147426666" target="_blank">x</a>')).toBe(
      '<a href="tel:+33147426666" target="_blank" rel="noopener noreferrer">x</a>',
    );
    expect(rel('<a target="_blank">x</a>')).toBe('<a target="_blank" rel="noopener noreferrer">x</a>');
  });

  it('ordre des attributs différent, casse, espaces : rel ajouté, target et href intacts', () => {
    expect(rel('<a target="_blank" href="https://x.fr/" id="">x</a>')).toBe(
      '<a target="_blank" href="https://x.fr/" id="" rel="noopener noreferrer">x</a>',
    );
    expect(rel('<A HREF="https://x.fr/" TARGET="_BLANK">x</A>')).toBe(
      '<A HREF="https://x.fr/" TARGET="_BLANK" rel="noopener noreferrer">x</A>',
    );
    expect(rel('<A TARGET="_BLANK" HREF="/FR/Contact">x</A>')).toBe('<A TARGET="_BLANK" HREF="/FR/Contact" rel="noopener">x</A>');
    expect(rel('<a\nhref="https://x.fr/"\ntarget = "_blank" >x</a>')).toBe(
      '<a\nhref="https://x.fr/"\ntarget = "_blank" rel="noopener noreferrer">x</a>',
    );
    expect(rel('<a href=https://x.fr/ target=_blank>x</a>')).toBe(
      '<a href=https://x.fr/ target=_blank rel="noopener noreferrer">x</a>',
    );
    expect(rel('<a href=/fr/contact target=_blank>x</a>')).toBe('<a href=/fr/contact target=_blank rel="noopener">x</a>');
  });

  it('rel contenant déjà noopener ou noreferrer, interne ou externe : lien strictement inchangé', () => {
    const deja = [
      // Formes réelles : 1 interne absolu et 28 externes portent rel="noopener".
      '<a href="https://www.packshot-creator.com/fr/ia-photo-produit" target="_blank" rel="noopener">x</a>',
      '<a href="https://www.gs1.org/standards/gs1-global-data-model" target="_blank" rel="noopener">x</a>',
      '<a href="/fr/a-propos" target="_blank" rel="noopener">x</a>',
      '<a href="/fr/a-propos" target="_blank" rel="noreferrer">x</a>',
      '<a href="https://x.fr/" target="_blank" rel="noreferrer">x</a>',
      '<a href="https://x.fr/" target="_blank" rel="noopener noreferrer">x</a>',
      '<a rel="nofollow NoOpener" href="https://x.fr/" target="_blank">x</a>',
      '<a href="https://x.fr/" target="_blank" rel=\'noreferrer external\'>x</a>',
    ];
    for (const html of deja) expect(rel(html)).toBe(html);
  });

  it('rel sans noopener ni noreferrer : jetons, guillemets et position conservés, protection ajoutée selon la cible', () => {
    expect(rel('<a href="https://x.fr/" rel="nofollow" target="_blank">x</a>')).toBe(
      '<a href="https://x.fr/" rel="nofollow noopener noreferrer" target="_blank">x</a>',
    );
    expect(rel('<a href="/fr/contact" rel="nofollow" target="_blank">x</a>')).toBe(
      '<a href="/fr/contact" rel="nofollow noopener" target="_blank">x</a>',
    );
    expect(rel('<a href="https://x.fr/" target="_blank" rel="nofollow  sponsored ugc">x</a>')).toBe(
      '<a href="https://x.fr/" target="_blank" rel="nofollow sponsored ugc noopener noreferrer">x</a>',
    );
    expect(rel('<a href=\'https://x.fr/\' target=\'_blank\' rel=\'external\'>x</a>')).toBe(
      '<a href=\'https://x.fr/\' target=\'_blank\' rel=\'external noopener noreferrer\'>x</a>',
    );
    expect(rel('<a href=\'/fr\' target=\'_blank\' rel=\'bookmark\'>x</a>')).toBe(
      '<a href=\'/fr\' target=\'_blank\' rel=\'bookmark noopener\'>x</a>',
    );
    expect(rel('<a href="https://x.fr/" target="_blank" rel="">x</a>')).toBe(
      '<a href="https://x.fr/" target="_blank" rel="noopener noreferrer">x</a>',
    );
    expect(rel('<a href="/fr" target="_blank" rel="">x</a>')).toBe('<a href="/fr" target="_blank" rel="noopener">x</a>');
    expect(rel('<a href="https://x.fr/" target="_blank" rel=nofollow>x</a>')).toBe(
      '<a href="https://x.fr/" target="_blank" rel="nofollow noopener noreferrer">x</a>',
    );
  });

  it('apostrophes et guillemets dans les valeurs : ni « rel= », « href= » ni « target= » en texte pris pour un attribut', () => {
    expect(rel('<a href="https://x.fr/?q=l\'objectif" title=\'Le "guide" rel=x > y\' target="_blank">l\'objectif</a>')).toBe(
      '<a href="https://x.fr/?q=l\'objectif" title=\'Le "guide" rel=x > y\' target="_blank" rel="noopener noreferrer">l\'objectif</a>',
    );
    expect(rel('<a title=\'href="/fr"\' href="https://x.fr/" target="_blank">x</a>')).toBe(
      '<a title=\'href="/fr"\' href="https://x.fr/" target="_blank" rel="noopener noreferrer">x</a>',
    );
    const leurre = '<a href="https://x.fr/" title="target=_blank">x</a>';
    expect(rel(leurre)).toBe(leurre);
    expect(rel('<a data-rel="noopener" data-target="_blank" data-href="/fr" href="https://x.fr/" target="_blank">x</a>')).toBe(
      '<a data-rel="noopener" data-target="_blank" data-href="/fr" href="https://x.fr/" target="_blank" rel="noopener noreferrer">x</a>',
    );
  });

  it('jamais deux attributs rel : un seul par lien après traitement', () => {
    const html = [
      '<a href="/a" target="_blank">a</a>',
      '<a href="https://x.fr/" target="_blank">b</a>',
      '<a href="/b" target="_blank" rel="nofollow">c</a>',
      '<a href="/c" target="_blank" rel="noopener">d</a>',
      '<a href="https://x.fr/" rel="" target="_blank">e</a>',
    ].join('');
    const res = rel(html);
    for (const tag of res.match(/<a\b[^>]*>/g) ?? []) expect(count(tag, /\srel\s*=/gi)).toBe(1);
  });

  it('autres cibles, liens sans target et autres balises : inchangés', () => {
    const intacts = [
      '<a target="_new" href="https://gnpp.wordpress.com/" id="">x</a>',
      '<a href="https://x.fr/" target="_self">x</a>',
      '<a href="https://x.fr/" target="blank">x</a>',
      '<a href="https://x.fr/">x</a>',
      '<a href="/fr/contact">x</a>',
      '<a id="ancre"></a>',
      '<abbr title="x" target="_blank">x</abbr>',
      '<area href="/x" target="_blank">',
      '<form target="_blank"></form>',
    ];
    for (const html of intacts) expect(rel(html)).toBe(html);
  });

  it('idempotence : deux passages, même sortie', () => {
    const html =
      '<a href="https://x.fr/" target="_blank" id="">x</a><a href="/y" rel="nofollow" target="_blank">y</a>' +
      '<a href="/z" target="_blank" id="">z</a><a href="https://z.fr/" target="_blank" rel="noopener">z</a>';
    const une = rel(html);
    expect(rel(une)).toBe(une);
  });

  it('processHtmlContent : interne en noopener, externe en noopener noreferrer, façades YouTube inchangées', () => {
    const res = out(
      `<p><a href="https://orbitvu.com/" target="_blank" id="">Orbitvu</a> <a href="/fr/a-propos" target="_blank" id="">À propos</a></p>` +
        `${WEBFLOW_YT}${SHORTCODE_SEUL}`,
    );
    expect(res).toContain('<a href="https://orbitvu.com/" target="_blank" id="" rel="noopener noreferrer">Orbitvu</a>');
    expect(res).toContain('<a href="/fr/a-propos" target="_blank" id="" rel="noopener">À propos</a>');
    expect(count(res, /\srel="noopener noreferrer"/g)).toBe(3);
    expect(count(res, /\srel="noopener"/g)).toBe(1);
    for (const tag of res.match(/<a\b[^>]*>/g) ?? []) expect(count(tag, /\srel\s*=/gi)).toBe(1);
    expect(out(res)).toBe(res);
  });
});
