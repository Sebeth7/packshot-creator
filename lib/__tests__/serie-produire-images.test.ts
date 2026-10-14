import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import { processHtmlContent } from '@/lib/blog-utils';
import { getArticle, getGuide } from '@/lib/content';
import { STATIC_ARTICLE_SLUGS } from '@/lib/blog';

/**
 * Série éditoriale « Produire ses images produit » : article 1 (décider) et
 * article 2 (produire).
 *
 * Fichier partagé par les deux PR de réécriture (A = #139, B = #140) et
 * volontairement IDENTIQUE dans les deux : il décrit les deux articles et
 * s'adapte à l'état réellement présent. Un article est contrôlé dès qu'il est
 * en forme réécrite (présence de `<h2 class="psc-q">`) ; tant qu'il reste dans
 * son ancienne forme (branche où sa PR n'est pas encore là), ses gardes sont
 * ignorées. Résultat : chaque PR est verte isolément (elle ne réécrit qu'un
 * article) et, une fois A ET B publiés, les gardes contrôlent LES DEUX — sans
 * réconciliation manuelle du test.
 */
const ROOT = process.cwd();
const SERIE = {
  decider: { slug: 'est-il-utile-dinternaliser-sa-production-de-photos-packshot', questions: 7 },
  produire: { slug: 'e-commerce-comment-mettre-en-place-votre-studio-photo', questions: 8 },
} as const;

/** Destinations retirées de la série : affirmations non sourcées ou contradictoires. */
const LIENS_EXCLUS = [
  '/fr/blog/prestataire-packshot-vs-studio-interne',
  '/fr/blog/quel-retour-sur-investissement-avec-un-studio-photo-en-interne',
  '/fr/blog/generer-images-produit-ia',
];

for (const [nom, { slug, questions }] of Object.entries(SERIE)) {
  describe(`Série « Produire ses images produit » — ${nom} (${slug})`, () => {
    const article = getArticle(slug, 'fr');
    const html = article?.content ?? '';
    const { headings } = processHtmlContent(html);
    // Article en forme réécrite ? Sinon (ancienne version sur cette branche), gardes ignorées.
    const reecrit = html.includes('<h2 class="psc-q">');
    const siReecrit = reecrit ? it : it.skip;
    const autre = Object.values(SERIE).find((a) => a.slug !== slug)!.slug;

    siReecrit('est servi par le gabarit commun, sans FAQ ni auteur nominatif', () => {
      expect(article).not.toBeNull();
      expect(STATIC_ARTICLE_SLUGS.has(slug)).toBe(false);
      expect(article?.faqs).toEqual([]);
      expect(article?.author).toBe('PackshotCreator');
    });

    siReecrit('affiche une date de mise à jour datée dans le contenu', () => {
      expect(html).toContain('psc-maj');
      expect(html).toMatch(/<time datetime="2026-10-14">[^<]*2026<\/time>/);
    });

    siReecrit('a des renvois internes autonomes : chaque ancre #… cible un titre existant', () => {
      const ids = new Set(headings.map((h) => h.id));
      const ancres = [...html.matchAll(/href="#([^"]+)"/g)].map((m) => m[1]);
      for (const a of ancres) expect(ids.has(a), `ancre #${a} sans titre`).toBe(true);
      expect(html).not.toMatch(/\(question\s*\d+\)/);
    });

    siReecrit(`pose ${questions} questions, chacune suivie de sa réponse courte visible`, () => {
      const blocs = html.split('<h2 class="psc-q">').slice(1);
      expect(blocs).toHaveLength(questions);
      for (const bloc of blocs) {
        const titre = bloc.slice(0, bloc.indexOf('</h2>'));
        expect(titre.trim().endsWith('?')).toBe(true);
        const suite = bloc.slice(bloc.indexOf('</h2>') + 5).trimStart();
        expect(suite.startsWith('<div class="psc-bref">')).toBe(true);
      }
    });

    siReecrit('ne cache jamais la réponse courte dans un bloc dépliable', () => {
      for (const d of html.match(/<details[\s\S]*?<\/details>/g) ?? []) {
        expect(d).not.toContain('psc-bref');
        expect(d).toMatch(/^<details class="psc-details"><summary>[^<]+<\/summary>/);
      }
      expect((html.match(/<details/g) ?? []).length).toBeGreaterThan(0);
    });

    siReecrit('produit un sommaire aux ancres uniques', () => {
      const ids = headings.map((h) => h.id);
      expect(new Set(ids).size).toBe(ids.length);
      expect(headings.filter((h) => h.level === 2).length).toBe(questions + 2);
    });

    siReecrit('ne contient aucun marqueur de la version de travail', () => {
      expect(html).not.toContain('psc-alerte');
      expect(html).not.toMatch(/non valid/i);
    });

    siReecrit('lie l’autre article de la série', () => {
      expect(html).toContain(`href="/fr/blog/${autre}"`);
    });

    siReecrit('ne lie que des contenus existants, et aucune destination exclue', () => {
      const liens = [...html.matchAll(/href="(\/fr\/[^"#]*)"/g)].map((m) => m[1]);
      expect(liens.length).toBeGreaterThan(0);
      for (const lien of liens) {
        expect(LIENS_EXCLUS).not.toContain(lien);
        const blog = lien.match(/^\/fr\/blog\/([^/]+)$/);
        const guide = lien.match(/^\/fr\/guide\/([^/]+)$/);
        if (blog) expect(getArticle(blog[1], 'fr') ?? STATIC_ARTICLE_SLUGS.has(blog[1]) ?? null).toBeTruthy();
        else if (guide) expect(getGuide(guide[1], 'fr')).not.toBeNull();
        else expect(['/fr/packshot-e-commerce', '/fr/calculateur-roi']).toContain(lien);
      }
    });

    siReecrit('n’affiche que des images présentes, avec dimensions et texte alternatif, et un hero existant', () => {
      // L'article B n'a aucune photo inline (droits HOLD retirés) ; A en a. La boucle
      // valide ce qui est présent, sans en exiger un nombre minimal.
      const images = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
      for (const img of images) {
        const src = img.match(/src="([^"]+)"/)?.[1] ?? '';
        expect(fs.existsSync(path.join(ROOT, 'public', src))).toBe(true);
        expect(img).toMatch(/\bwidth="\d+"/);
        expect(img).toMatch(/\bheight="\d+"/);
        expect(img).toMatch(/\balt="[^"]{20,}"/);
      }
      expect(fs.existsSync(path.join(ROOT, 'public', article?.image ?? ''))).toBe(true);
    });

    siReecrit('ouvre les liens externes dans un nouvel onglet, avec rel', () => {
      for (const a of html.match(/<a [^>]*href="https?:[^>]*>/g) ?? []) {
        expect(a).toContain('target="_blank"');
        expect(a).toContain('rel="noopener"');
      }
    });
  });
}
