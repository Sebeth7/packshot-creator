/**
 * Prompt d'enrichissement des leads (G5, 11/10/2026, LOT-6) : PackshotCreator est
 * distributeur officiel, pas exclusif (D6). Tout le réseau est simulé : l'appel
 * Gemini est intercepté par une doublure, aucune requête ne part, aucun crédit
 * n'est consommé.
 */
import { describe, it, expect, vi, afterEach } from 'vitest';
import { enrichLead } from '@/lib/lead-enrichment';

afterEach(() => {
  vi.unstubAllGlobals();
  delete process.env.GOOGLE_GEMINI_API_KEY;
});

describe('enrichLead : prompt envoyé au modèle (doublure)', () => {
  it('dit « official Orbitvu distributor », jamais « exclusive »', async () => {
    process.env.GOOGLE_GEMINI_API_KEY = 'cle-factice';
    const corps: string[] = [];
    vi.stubGlobal('fetch', vi.fn(async (url: string, init?: RequestInit) => {
      if (String(url).startsWith('https://generativelanguage.googleapis.com/')) {
        corps.push(String(init?.body));
        return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text: '[FR]\n1. Profil : test' }] } }] }));
      }
      return new Response('{}', { status: 404 });
    }));
    await enrichLead({
      firstName: 'Anna', lastName: 'Muster', email: 'anna@example.ch', company: 'Muster AG',
      sector: 'autre', requestType: 'demo',
    });
    expect(corps).toHaveLength(1);
    expect(corps[0]).toContain('official Orbitvu distributor in France and Switzerland');
    expect(corps[0]).not.toMatch(/exclusive/i);
  });
});
