/**
 * Écran d'échec du formulaire de contact (G5, #132, décision de Laurent du
 * 15/10/2026). L'environnement Vitest est `node` : le composant n'est pas rendu,
 * son source est contrôlé, comme les autres gardes statiques du dépôt.
 *
 * Ce que ces cas verrouillent :
 * - présentation neutre : plus d'écran rouge plein sur l'état d'échec ;
 * - message exact des trois locales ;
 * - contact alternatif cliquable, avec les coordonnées officielles déjà
 *   présentes dans le dépôt (schéma Organization, points de contact FR et CH) ;
 * - aucune conversion comptée sans succès confirmé ;
 * - saisies conservées : aucun `reset` du formulaire ;
 * - les messages de validation par champ, eux, restent en rouge.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const SOURCE = readFileSync(
  join(process.cwd(), 'components/forms/ContactForm.tsx'),
  'utf-8'
);

/** Bloc de l'état d'échec seul, pour ne pas confondre avec les autres états. */
function blocEchec(): string {
  const debut = SOURCE.indexOf("if (status === 'error')");
  expect(debut).toBeGreaterThan(-1);
  const fin = SOURCE.indexOf('const errorBase', debut);
  expect(fin).toBeGreaterThan(debut);
  return SOURCE.slice(debut, fin);
}

describe('#132 — écran d’échec du formulaire de contact', () => {
  it('présentation neutre : aucune classe rouge dans l’état d’échec', () => {
    expect(blocEchec()).not.toMatch(/\bred-\d/);
  });

  it('messages des trois locales, au texte arrêté par Laurent', () => {
    expect(SOURCE).toContain(
      "errorTitle: 'Nous ne pouvons pas confirmer la réception de votre demande'"
    );
    expect(SOURCE).toContain(
      "errorMessage: 'Vos informations sont conservées dans ce formulaire. Vous pouvez réessayer ou nous contacter directement.'"
    );
    expect(SOURCE).toContain(
      "errorTitle: 'We cannot confirm that your request was received'"
    );
    expect(SOURCE).toContain(
      "errorTitle: 'Wir können den Eingang Ihrer Anfrage nicht bestätigen'"
    );
  });

  it('un libellé de contact alternatif par locale', () => {
    expect(SOURCE.match(/contactAltLabel:/g) ?? []).toHaveLength(3);
  });

  it('coordonnées officielles du dépôt, aucune autre', () => {
    expect(SOURCE).toContain("telHref: 'tel:+33147426666'");
    expect(SOURCE).toContain("telHref: 'tel:+41445804384'");
    expect(SOURCE.match(/email: 'sales@sysnext\.com'/g) ?? []).toHaveLength(3);
    // de-ch sur le point de contact suisse, fr et en sur le français.
    expect(SOURCE).toMatch(
      /'de-ch':\s*\{\s*telAffiche: '\+41 44 580 43 84'/
    );
    // Aucun autre numéro ni domaine introduit par cette correction.
    const numeros = new Set(SOURCE.match(/tel:\+\d+/g) ?? []);
    expect([...numeros].sort()).toEqual(['tel:+33147426666', 'tel:+41445804384']);
  });

  it('contact alternatif cliquable : un lien tel: et un lien mailto:', () => {
    const bloc = blocEchec();
    expect(bloc).toContain('href={secours.telHref}');
    expect(bloc).toContain('href={`mailto:${secours.email}`}');
  });

  it('bouton de réessai conservé, qui ramène au formulaire', () => {
    expect(blocEchec()).toContain("onClick={() => setStatus('idle')}");
  });

  it('aucune conversion comptée sans succès : trackFormSubmit après setStatus(success) seulement', () => {
    expect(SOURCE.match(/trackFormSubmit\(/g) ?? []).toHaveLength(1);
    expect(SOURCE).toMatch(/setStatus\('success'\);\s*\n\s*trackFormSubmit\('contact_form'\);/);
    expect(blocEchec()).not.toContain('trackFormSubmit');
  });

  it('saisies conservées : aucun reset du formulaire', () => {
    expect(SOURCE).not.toMatch(/\breset\s*\(/);
  });

  it('les autres états du formulaire sont inchangés', () => {
    // Succès : toujours en vert, sans message d'échec.
    expect(SOURCE).toContain('bg-emerald-50 border border-emerald-200');
    // Validation par champ : toujours en rouge.
    expect(SOURCE).toContain("const errorBase = 'text-xs text-red-500 mt-1'");
    // Les quatre états restent les mêmes.
    expect(SOURCE).toContain(
      "useState<'idle' | 'submitting' | 'success' | 'error'>('idle')"
    );
  });
});
