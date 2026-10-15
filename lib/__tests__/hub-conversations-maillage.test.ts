import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { navPinLocale, isDeChCovered } from '@/i18n/deChCoverage';

/**
 * Non-régression maillage — hubs « conversations-sebastien-jourdan » et articles A/B de-ch.
 *
 * Les hubs EN/de-ch et les articles de-ch A/B liaient A, B et la landing e-commerce
 * vers leurs URL FR alors que des versions localisées publiées existent. Ce test
 * verrouille les destinations localisées et interdit le retour des URL FR pour ces
 * cibles-là (les liens interlangues volontaires — cibles sans version localisée —
 * restent autorisés et ne sont pas contrôlés ici).
 */

const ROOT = join(__dirname, '..', '..');
const read = (p: string) => readFileSync(join(ROOT, p), 'utf8');

const A_FR = 'est-il-utile-dinternaliser-sa-production-de-photos-packshot';
const B_FR = 'e-commerce-comment-mettre-en-place-votre-studio-photo';
const A_EN = '5-questions-before-investing-in-an-in-house-photo-studio';
const B_EN = 'e-commerce-set-up-internal-packshots';
const A_DECH = 'lohnt-sich-ein-internes-produktfotostudio';
const B_DECH = 'e-commerce-fotostudio-organisieren';

describe('Hub conversations — liens A/B localisés par langue', () => {
  const en = read('content/conversations-sebastien-jourdan/en.json');
  const dech = read('content/conversations-sebastien-jourdan/de-ch.json');

  it('hub EN ne lie plus A/B vers /fr/blog', () => {
    expect(en).not.toContain(`/fr/blog/${A_FR}`);
    expect(en).not.toContain(`/fr/blog/${B_FR}`);
  });

  it('hub EN lie A/B vers leurs URL /en/blog', () => {
    expect(en).toContain(`/en/blog/${A_EN}`);
    expect(en).toContain(`/en/blog/${B_EN}`);
  });

  it('hub de-ch ne lie plus A/B vers /fr/blog', () => {
    expect(dech).not.toContain(`/fr/blog/${A_FR}`);
    expect(dech).not.toContain(`/fr/blog/${B_FR}`);
  });

  it('hub de-ch lie A/B vers leurs URL /de-ch/blog', () => {
    expect(dech).toContain(`/de-ch/blog/${A_DECH}`);
    expect(dech).toContain(`/de-ch/blog/${B_DECH}`);
  });
});

describe('Articles de-ch A/B — landing e-commerce localisée', () => {
  const files = [
    `content/blog/de-ch/${A_DECH}.json`,
    `content/blog/de-ch/${B_DECH}.json`,
  ];

  it('ne lient plus la landing e-commerce vers /fr (version /de-ch servie)', () => {
    for (const f of files) {
      expect(read(f)).not.toContain('/fr/packshot-e-commerce');
    }
  });

  it('lient la landing e-commerce vers /de-ch quand elle est citée (article B)', () => {
    const b = read(files[1]);
    expect(b).toContain('/de-ch/packshot-e-commerce');
  });
});

describe('Couverture de-ch du hub — navigation native (menu, sélecteur)', () => {
  const hub = '/conversations-sebastien-jourdan';

  it('le hub est couvert en de-ch (sa version de-ch est publiée)', () => {
    expect(isDeChCovered(hub)).toBe(true);
  });

  it('un NavLink de-ch vers le hub reste natif /de-ch (plus d’épinglage /en)', () => {
    // navPinLocale renvoie undefined => NavLink rend l’URL de la locale courante (/de-ch).
    expect(navPinLocale('de-ch', hub)).toBeUndefined();
  });
});

/**
 * V9 — conversion du hub : visibilité des liens, renforcement contextuel des
 * conversations les moins reliées, et bloc « Pour aller plus loin » cliquable.
 */
describe('V9 — liens contextuels ajoutés aux conversations', () => {
  const parse = (lang: string) =>
    JSON.parse(read(`content/conversations-sebastien-jourdan/${lang}.json`)) as {
      entretiens: { num: string; intro?: string[]; ouverture?: string; aRetenir?: string;
        sections: { contenu: { html?: string; paras?: string[] }[] }[] }[];
    };
  const htmlOf = (lang: string, num: string) => {
    const e = parse(lang).entretiens.find((x) => x.num === num)!;
    let h = (e.intro ?? []).join(' ') + ' ' + (e.ouverture ?? '') + ' ' + (e.aRetenir ?? '');
    for (const s of e.sections) for (const b of s.contenu) { if (b.html) h += ' ' + b.html; if (b.paras) h += ' ' + b.paras.join(' '); }
    return h;
  };

  // [lang, num, href, texte d'ancre] — chaque ajout V9 doit être présent et cliquable.
  const AJOUTS: [string, string, string, string][] = [
    ['fr', '02', '/fr/studio-photo/selecteur-machines', 'choisir un équipement'],
    ['fr', '03', '#entretien-05', 'la couleur'],
    ['fr', '03', '/fr/guide/comment-obtenir-couleurs-fideles-photographie-produit', 'validation des teintes sensibles'],
    ['fr', '06', '/fr/blog/images-ia-metadonnees-marketplaces', 'Les règles des marketplaces'],
    ['fr', '09', '/fr/packshot-amazon', 'les marketplaces'],
    ['fr', '10', '/fr/academy', 'La formation'],
    ['en', '03', '#entretien-05', 'the color'],
    ['en', '06', '/en/blog/ai-product-images-metadata-marketplaces', 'Marketplace rules'],
    ['de-ch', '02', '/de-ch/fotostudio/maschinen-finder', 'eine Ausrüstung wählt'],
    ['de-ch', '06', '/de-ch/blog/ki-produktbilder-metadaten-marktplaetze', 'Die Regeln der Marktplätze'],
  ];

  it.each(AJOUTS)('%s conv %s : lien « %s » présent et cliquable', (lang, num, href, texte) => {
    expect(htmlOf(lang, num)).toContain(`<a href="${href}">${texte}</a>`);
  });

  it('les conversations 03 et 06 ne sont plus à un seul lien (FR)', () => {
    for (const num of ['03', '06']) {
      const n = (htmlOf('fr', num).match(/<a href=/g) ?? []).length;
      expect(n).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('V9 — visibilité CSS des liens du hub', () => {
  const css = read('app/globals.css');
  const page = read('app/[lang]/conversations-sebastien-jourdan/page.tsx');

  it('globals.css cible les liens de contenu du hub (sans attribut class)', () => {
    expect(css).toContain(':where(.conversations-hub a:not([class]))');
    expect(css).toMatch(/\.conversations-hub a:not\(\[class\]\)\)[\s\S]*text-decoration-line: underline/);
    expect(css).toContain(':where(.conversations-hub a:not([class])):focus-visible');
  });

  it('le hub porte la classe racine conversations-hub', () => {
    expect(page).toContain('conversations-hub bg-white');
  });
});

describe('V9 — bloc « Pour aller plus loin » cliquable', () => {
  const page = read('app/[lang]/conversations-sebastien-jourdan/page.tsx');

  it('expose les cinq destinations piliers (slugs localisés) et un CTA', () => {
    expect(page).toContain('ressources.map');
    expect(page).toContain('/calculateur-roi');
    expect(page).toContain('/de-ch/roi-rechner');
    expect(page).toContain('studios-photo-automatises');
    expect(page).toContain('ia-photo-produit');
    expect(page).toContain('est-il-utile-dinternaliser-sa-production-de-photos-packshot');
    expect(page).toContain('e-commerce-fotostudio-organisieren');
    expect(page).toContain('Demander une démo');
    expect(page).toContain('/de-ch/kontakt');
  });
});
