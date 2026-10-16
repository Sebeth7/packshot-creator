import { describe, it, expect } from 'vitest';
import { echapperHtml, echapperHtmlMultiligne } from '@/lib/echapper-html';

describe('echapperHtml', () => {
  it('échappe les cinq caractères spéciaux', () => {
    expect(echapperHtml(`<a href="x" title='y'>A & B</a>`)).toBe(
      '&lt;a href=&quot;x&quot; title=&#39;y&#39;&gt;A &amp; B&lt;/a&gt;',
    );
  });

  it('laisse intact un texte bénin et les accents', () => {
    expect(echapperHtml('Société Müller — 3 × 2 m')).toBe('Société Müller — 3 × 2 m');
  });

  it('accepte nombres, null et undefined', () => {
    expect(echapperHtml(42)).toBe('42');
    expect(echapperHtml(null)).toBe('');
    expect(echapperHtml(undefined)).toBe('');
  });

  it('n’échappe pas deux fois ce qu’il produit ailleurs (une seule passe attendue)', () => {
    expect(echapperHtml('&amp;')).toBe('&amp;amp;');
  });

  it('multiligne : échappe puis convertit les retours à la ligne', () => {
    expect(echapperHtmlMultiligne('a<b\r\nc')).toBe('a&lt;b<br/>c');
  });
});
