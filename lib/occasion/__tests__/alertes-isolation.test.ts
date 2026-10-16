/**
 * Isolation de la liste d'alerte : séparée de la demande commerciale, de la
 * newsletter, du CRM et du catalogue #82 ; aucune clé côté navigateur. Contrôles
 * sur les sources (aucun appel réseau).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { FAMILLES } from '@/lib/occasion/formulaires';

const RACINE = process.cwd();
const lire = (chemin: string) => readFileSync(join(RACINE, chemin), 'utf8');
const imports = (source: string) => [...source.matchAll(/^import[^;]*?from\s+'([^']+)'/gm)].map((m) => m[1]);

const SERVEUR_ALERTES = [
  ...readdirSync(join(RACINE, 'lib/occasion/alertes')).map((f) => `lib/occasion/alertes/${f}`),
  'app/api/occasion/alertes/route.ts',
  'app/api/occasion/alertes/confirmation/route.ts',
  'app/api/occasion/alertes/desinscription/route.ts',
];
const CLIENT_ALERTES = 'components/landings/occasion/FormulaireAlertes.tsx';

describe('Isolation commerciale', () => {
  it('aucun import CRM, n8n, Supabase, /api/contact, catalogue ou demande commerciale dans le parcours d’alerte', () => {
    for (const f of [...SERVEUR_ALERTES, CLIENT_ALERTES]) {
      for (const i of imports(lire(f))) {
        expect(i, `${f} importe ${i}`).not.toMatch(/pipedrive|n8n|supabase|api\/contact|lib\/catalogue|occasion\/(gestionnaire|services|schema|resend|fiche|courriel)$/i);
      }
      expect(lire(f), f).not.toMatch(/pipedrive|n8n|supabase/i);
    }
  });

  it('les routes d’alerte n’appellent jamais /api/occasion (demande commerciale), et inversement', () => {
    for (const f of SERVEUR_ALERTES.filter((x) => x.startsWith('app/'))) {
      expect(imports(lire(f)).every((i) => i.startsWith('@/lib/occasion/alertes/'))).toBe(true);
    }
    for (const f of ['app/api/occasion/route.ts', 'lib/occasion/gestionnaire.ts', 'lib/occasion/services.ts', 'components/landings/occasion/FormulaireRecherche.tsx']) {
      expect(lire(f), f).not.toMatch(/alertes\//);
    }
  });

  it('le catalogue #82 n’est pas touché par la liste d’alerte', () => {
    for (const f of readdirSync(join(RACINE, 'lib/catalogue')).filter((x) => x.endsWith('.ts'))) {
      expect(lire(`lib/catalogue/${f}`), f).not.toMatch(/occasion/);
    }
  });

  it('aucune inscription à une newsletter : seul le topic dédié est écrit', () => {
    // Code seul, sans les commentaires (qui citent `unsubscribed: true` pour l'expliquer).
    const adaptateur = lire('lib/occasion/alertes/resend.ts')
      .split('\n')
      .filter((l) => !/^\s*(\*|\/\/|\/\*\*)/.test(l))
      .join('\n');
    expect(adaptateur).not.toMatch(/unsubscribed:\s*(true|false)/);
    expect(adaptateur.match(/id: cfg\.topicId/g)?.length).toBeGreaterThan(0);
    expect(adaptateur).not.toMatch(/newsletter_?id|NEWSLETTER/);
  });

  it('familles : aucune référence de machine fictive', () => {
    for (const f of FAMILLES) expect(f).not.toMatch(/OCC-|exemple|fictif/i);
  });
});

describe('Aucune clé exposée côté navigateur', () => {
  it('le formulaire n’importe ni le SDK Resend, ni les jetons, ni les services, ni process.env', () => {
    const source = lire(CLIENT_ALERTES);
    expect(source.startsWith("'use client';")).toBe(true);
    expect(source).not.toMatch(/process\.env|RESEND|OCCASION_ALERTES_/);
    for (const i of imports(source)) {
      expect(i).not.toMatch(/^resend$|alertes\/(jeton|resend|services|gestionnaires|instance)|node:/);
    }
  });

  it('les secrets ne sont lus que par les services serveur', () => {
    const lecteurs = SERVEUR_ALERTES.filter((f) => /env\.(OCCASION_ALERTES_SECRET|RESEND_API_KEY)/.test(lire(f)));
    expect(lecteurs).toEqual(['lib/occasion/alertes/services.ts']);
  });
});
