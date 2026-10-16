/**
 * Bloc HTML d'enrichissement de la notification interne (G5, L09, P0 sécurité) :
 * toute valeur venue de l'INSEE, du site web du prospect ou du modèle est
 * échappée. Aucun réseau : la fonction testée est pure.
 */
import { describe, it, expect } from 'vitest';
import { formatEnrichmentHtml } from '@/lib/lead-enrichment';

describe('formatEnrichmentHtml : échappement', () => {
  it('échappe société, site et résumé IA', () => {
    const html = formatEnrichmentHtml({
      company: {
        nom: 'A&B <SA>', siren: '123', categorie: 'PME', effectif: '10-19', anneeEffectif: null,
        naf: '', siege: '', adresse: '<b>Rue</b>', nbEtablissements: 2, dateCreation: '2001', dirigeants: [],
      } as never,
      website: { domain: 'x.fr', title: 't', description: '<script>x</script>' } as never,
      aiSummary: '<img src=x>',
    });
    expect(html).toContain('A&amp;B &lt;SA&gt;');
    expect(html).toContain('&lt;b&gt;Rue&lt;/b&gt;');
    expect(html).not.toMatch(/<script|<img|<b>Rue/);
  });
});
