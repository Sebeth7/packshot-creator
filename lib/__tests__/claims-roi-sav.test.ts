import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

// Faits métier rappelés par Laurent le 08/10/2026 : ROI de 6 à 12 mois en usage
// courant, jamais présenté comme garanti ; aucun engagement de service (délai
// d'intervention, délai de réponse, pièces sous 24 h) n'est établi.
// Complément de #109, sur des lignes que #109 ne touche pas.

const ROOT = process.cwd();
const LANGUES = ['fr', 'en', 'de-ch'] as const;

type BlogBudget = { roi: { body: string }; faq: { q5: { answer: string } } };
function blogBudget(lang: (typeof LANGUES)[number]): BlogBudget {
  const json = JSON.parse(fs.readFileSync(path.join(ROOT, 'messages', `${lang}.json`), 'utf8'));
  return json.blogBudget as BlogBudget;
}

describe('Guide budget — retour sur investissement', () => {
  for (const lang of LANGUES) {
    it(`${lang} : aucun ROI annoncé dès le 4e mois, fourchette 6 à 12 mois présentée comme indicative`, () => {
      const { roi, faq } = blogBudget(lang);
      for (const texte of [roi.body, faq.q5.answer]) {
        expect(texte).not.toMatch(/(4e|quatrième|4th|fourth) (mois|month)/i);
        expect(texte).toMatch(/6 (à|to) 12|entre 6 et 12|within 6 to 12/);
        expect(texte).toMatch(/garanti|guaranteed/);
      }
    });
  }
});

describe("Guide d'achat 2026 — engagements de service non établis", () => {
  const src = fs.readFileSync(
    path.join(ROOT, 'app', '[lang]', 'blog', 'guide-achat-studio-2026', 'page.tsx'),
    'utf8',
  );
  it('ni délai de réponse de la hotline, ni délai d’intervention, ni pièces sous 24 h', () => {
    expect(src).not.toMatch(/&lt; ?2h ouvrées/);
    expect(src).not.toMatch(/Intervention 24-48h/);
    expect(src).not.toMatch(/livraison 24h/);
  });
});
