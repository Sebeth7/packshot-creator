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
