/**
 * Landing occasion en FR, EN et DE-CH (mission finale du 11/10/2026) : textes de
 * même structure, aucune promesse, e-mails au visiteur dans sa langue, routes et
 * liens cohérents. Aucun réseau, aucun e-mail.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { FR } from '@/components/landings/occasion/contenu-fr';
import { EN } from '@/components/landings/occasion/contenu-en';
import { DE_CH } from '@/components/landings/occasion/contenu-de-ch';
import { contenuOccasion } from '@/components/landings/occasion/contenu';
import { versCartes } from '@/components/landings/occasion/cartes';
import { exemplesFictifs } from '@/data/occasion/exemples-fictifs';
import { FAMILLES, LIBELLES_FAMILLES, OPTIN, TEXTES_OPTIN } from '@/lib/occasion/formulaires';
import { LANGUES_OCCASION, cheminOccasion, urlConfidentialite } from '@/lib/occasion/langues';
import { HORIZONS, LIBELLES_HORIZONS, requeteRechercheSchema } from '@/lib/occasion/schema';
import { composerAccuseOccasion } from '@/lib/occasion/courriel';
import { lignesFicheOccasion } from '@/lib/occasion/fiche';
import { composerConfirmationAlerte, lienConfirmation } from '@/lib/occasion/alertes/courriel';
import { requeteAlerteSchema } from '@/lib/occasion/alertes/schema';
import { LIEN_OCCASION, libelleLienOccasion } from '@/lib/occasion/navigation';
import { isDeChCovered, localeSwitchHref, navPinLocale } from '@/i18n/deChCoverage';
import { routing } from '@/i18n/routing';

const TRADUCTIONS = { en: EN, 'de-ch': DE_CH } as const;

/** Chemins « a.b.c » de toutes les feuilles (chaînes, nombres, fonctions) d'un objet. */
function feuilles(o: unknown, prefixe = ''): Map<string, unknown> {
  const out = new Map<string, unknown>();
  if (o !== null && typeof o === 'object') {
    for (const [k, v] of Object.entries(o)) for (const [c, f] of feuilles(v, prefixe ? `${prefixe}.${k}` : k)) out.set(c, f);
  } else {
    out.set(prefixe, o);
  }
  return out;
}

// Clés internes (aperçu, annotations) volontairement en français, et données non textuelles.
const INTERNES = /(^APERCU\.|annotation|indisponiblePrevu|avisTestReel|photo\.src$)/i;
// Valeurs identiques admises d'une langue à l'autre (noms propres, termes communs).
const IDENTIQUES_ADMIS = new Set(['Showroom', 'Garantie', 'Demo', 'Ref.', '(optional)', 'E-Mail *']);

describe('Textes de la landing : trois langues de même structure', () => {
  it('EN et DE-CH ont exactement les clés du français, aucune valeur vide', () => {
    const fr = feuilles(FR);
    for (const [langue, contenu] of Object.entries(TRADUCTIONS)) {
      const t = feuilles(contenu);
      expect([...t.keys()].sort(), langue).toEqual([...fr.keys()].sort());
      for (const [cle, v] of t) if (typeof v === 'string') expect(v.trim(), `${langue} ${cle}`).not.toBe('');
    }
  });

  it('textes visiteurs réellement traduits (aucun texte français recopié)', () => {
    const fr = feuilles(FR);
    for (const [langue, contenu] of Object.entries(TRADUCTIONS)) {
      for (const [cle, v] of feuilles(contenu)) {
        if (typeof v !== 'string' || INTERNES.test(cle) || IDENTIQUES_ADMIS.has(v)) continue;
        expect(v, `${langue} ${cle}`).not.toBe(fr.get(cle));
      }
    }
  });

  it('aucune promesse : ni prix, ni remise, ni délai, ni disponibilité garantie', () => {
    for (const [langue, contenu] of Object.entries({ fr: FR, ...TRADUCTIONS })) {
      for (const [cle, v] of feuilles(contenu)) {
        if (typeof v !== 'string' || INTERNES.test(cle)) continue;
        expect(v, `${langue} ${cle}`).not.toMatch(/€|CHF|\d+\s?%|\bprix\b|\bprice\b|\bPreis|remise de|discount|Rabatt|garanti(e|ed)? disponib|guaranteed availab|verfügbarkeit garantiert|sous \d+ ?(h|jours)|within \d+ (hours|days)|innert \d+ (Stunden|Tagen)/i);
      }
    }
  });

  it('DE-CH : orthographe suisse (pas de ß), vocabulaire « Occasion », « Offerte », « MWST »', () => {
    for (const [cle, v] of feuilles(DE_CH)) if (typeof v === 'string' && !INTERNES.test(cle)) expect(v, cle).not.toContain('ß');
    expect(DE_CH.HERO.surtitre).toContain('Occasion');
    expect(DE_CH.GARANTIE.texte).toContain('Offerte');
    expect(DE_CH.RECHERCHE.champs.budget).toContain('MWST');
  });

  it('les machines fictives restent signalées comme exemples dans chaque langue', () => {
    expect(EN.MACHINES.etiquetteFictif).toBe('Fictitious example');
    expect(DE_CH.MACHINES.etiquetteFictif).toBe('Fiktives Beispiel');
    for (const langue of LANGUES_OCCASION) {
      const cartes = versCartes(exemplesFictifs(new Date('2026-10-11T12:00:00Z')), langue);
      expect(cartes.every((c) => c.fictif), langue).toBe(true);
    }
  });

  it('cartes EN et DE-CH : textes traduits, jamais le français', () => {
    const ex = exemplesFictifs(new Date('2026-10-11T12:00:00Z'));
    const en = versCartes(ex, 'en');
    const de = versCartes(ex, 'de-ch');
    expect(en.map((c) => c.usage)).toEqual(['Display and demonstrations', 'Jewellery and watches', 'Stand presentation']);
    expect(de.map((c) => c.usage)).toEqual(['Ausstellung und Vorführungen', 'Schmuck und Uhren', 'Präsentation am Messestand']);
    expect(en[0].photo.credit).toBe('Illustrative photo');
    expect(versCartes(ex, 'fr')[0].usage).toBe('Exposition et démonstrations');
  });

  it('libellés des familles et horizons traduits ; valeurs transmises inchangées (canoniques)', () => {
    for (const langue of LANGUES_OCCASION) {
      expect(Object.keys(LIBELLES_FAMILLES[langue]).sort()).toEqual([...FAMILLES].sort());
      expect(Object.keys(LIBELLES_HORIZONS[langue]).sort()).toEqual([...HORIZONS].sort());
    }
    expect(LIBELLES_FAMILLES['de-ch']['Studios spécialisés (mode, mobilier, vélo)']).toBe('Spezialstudios (Mode, Möbel, Velo)');
    expect(LIBELLES_HORIZONS.en['De 3 à 6 mois']).toBe('In 3 to 6 months');
  });

  it('contenuOccasion renvoie la langue demandée', () => {
    expect(contenuOccasion('fr')).toBe(FR);
    expect(contenuOccasion('en')).toBe(EN);
    expect(contenuOccasion('de-ch')).toBe(DE_CH);
  });
});

describe('Promesse de la liste : « nouvelles offres », sans cadence ni immédiateté (décision du 12/10)', () => {
  const PAGES = { fr: FR, en: EN, 'de-ch': DE_CH } as const;

  it('titre français exact ; même nombre de points dans les trois langues ; aide sur la famille', () => {
    expect(FR.ALERTES.titre).toBe("Recevez les nouvelles offres de studios Orbitvu d'occasion");
    for (const c of Object.values(PAGES)) {
      expect(c.ALERTES.points).toHaveLength(4);
      expect(c.ALERTES.champs.familleAide.length).toBeGreaterThan(10);
    }
  });

  it('famille ou toutes les familles, confirmation, désinscription, hors newsletter : dits dans chaque langue', () => {
    const attendus = {
      fr: ['toutes les familles', 'confirmation', 'désinscription', 'newsletter'],
      en: ['all families', 'confirm', 'unsubscribe', 'newsletter'],
      'de-ch': ['alle Familien', 'Bestätigung', 'Abmeldung', 'Newsletter'],
    } as const;
    for (const [langue, morceaux] of Object.entries(attendus)) {
      const a = PAGES[langue as keyof typeof PAGES].ALERTES;
      const texte = [a.texte, a.mention, a.champs.familleAide, ...a.points].join(' ').toLowerCase();
      for (const m of morceaux) expect(texte).toContain(m.toLowerCase());
    }
  });

  it('aucune fréquence fixe ni notification immédiate promise', () => {
    for (const c of Object.values(PAGES)) {
      const a = c.ALERTES;
      const texte = [a.titre, a.texte, a.bouton, a.optin, a.mention, ...a.points, a.confirmation.inscrit].join(' ');
      expect(texte).not.toMatch(/dès que|immédiat|chaque semaine|chaque mois|hebdomadaire|mensuel|as soon as|immediately|instant|weekly|monthly|sofort|umgehend|wöchentlich|monatlich/i);
    }
  });

  it('liste fermée : le formulaire annonce qu’aucune inscription n’est enregistrée (inchangé)', () => {
    expect(FR.ALERTES.fermee).toContain("aucune inscription n'est enregistrée");
    expect(EN.ALERTES.fermee).toContain('no subscription is recorded');
    expect(DE_CH.ALERTES.fermee).toContain('keine Anmeldung gespeichert');
  });
});

describe('Consentement des alertes : un texte et une version par langue', () => {
  it('versions distinctes ; texte de la case affiché = texte versionné', () => {
    const versions = LANGUES_OCCASION.map((l) => OPTIN[l].version);
    expect(new Set(versions).size).toBe(3);
    for (const l of LANGUES_OCCASION) {
      expect(TEXTES_OPTIN[OPTIN[l].version]).toBe(OPTIN[l].texte);
      expect(contenuOccasion(l).ALERTES.optin).toBe(`${OPTIN[l].texte} *`);
      expect(OPTIN[l].texte).toMatch(/newsletter/i);
    }
  });

  it('la version doit être celle de la langue de la page', () => {
    const base = { email: 'a@b.fr', famille: '', consentement: true };
    expect(requeteAlerteSchema.safeParse({ ...base, langue: 'en', versionConsentement: OPTIN.en.version }).success).toBe(true);
    expect(requeteAlerteSchema.safeParse({ ...base, langue: 'en', versionConsentement: OPTIN.fr.version }).success).toBe(false);
    expect(requeteAlerteSchema.safeParse({ ...base, langue: 'de-ch', versionConsentement: OPTIN['de-ch'].version }).success).toBe(true);
    expect(requeteAlerteSchema.safeParse({ ...base, langue: 'it', versionConsentement: OPTIN.fr.version }).success).toBe(false);
  });
});

describe('E-mails au visiteur dans sa langue ; notification interne en français', () => {
  const fin = Date.parse('2026-10-13T12:00:00Z');

  it('confirmation des alertes : objet, lien vers la page de la langue, date locale', () => {
    const en = composerConfirmationAlerte({ lien: lienConfirmation('https://e.test', 'abc', 'en'), famille: FAMILLES[3], expireLe: fin, langue: 'en' });
    expect(en.objet).toBe('Confirm your subscription to new pre-owned Orbitvu offers');
    expect(en.texte).toContain('https://e.test/en/studios-photo-automatises/opportunites#confirmer-alerte=abc');
    expect(en.texte).toContain('Specialised studios (fashion, furniture, bike)');
    expect(en.texte).toContain('13 October 2026');
    const de = composerConfirmationAlerte({ lien: lienConfirmation('https://e.test', 'abc', 'de-ch'), famille: '', expireLe: fin, langue: 'de-ch' });
    expect(de.objet).toBe('Bitte bestätigen Sie Ihre Anmeldung für neue Orbitvu-Occasionsangebote');
    expect(de.texte).toContain('/de-ch/studios-photo-automatises/opportunites#confirmer-alerte=abc');
    expect(de.texte).toContain('alle Familien');
    expect(de.texte).toContain('13. Oktober 2026');
    for (const c of [en, de]) expect(c.texte).not.toMatch(/€|CHF|price|Preis/i);
  });

  it("confirmation des alertes : sans lien de désinscription, elle ne promet ce lien que pour les futurs e-mails d'offres", () => {
    for (const langue of ['fr', 'en', 'de-ch'] as const) {
      const c = composerConfirmationAlerte({ lien: lienConfirmation('https://e.test', 'abc', langue), famille: '', expireLe: fin, langue });
      expect(c.texte, langue).not.toContain('#desinscrire-alerte=');
      expect(c.html, langue).not.toContain('#desinscrire-alerte=');
    }
    const de = composerConfirmationAlerte({ lien: lienConfirmation('https://e.test', 'abc', 'de-ch'), famille: '', expireLe: fin, langue: 'de-ch' });
    expect(de.texte).toContain('Jede künftige E-Mail mit neuen Angeboten enthält einen Abmeldelink.');
    expect(de.texte).not.toContain('Jede Nachricht enthält einen Abmeldelink');
  });

  it('accusé de la recherche : langue de la page, politique FR ou EN, aucune promesse', () => {
    const en = composerAccuseOccasion({ firstName: '<i>Ann</i>', langue: 'en' });
    expect(en.objet).toBe('Your search for a pre-owned Orbitvu studio');
    expect(en.texte).toContain('neither an offer nor a confirmation of availability');
    expect(en.texte).toContain('https://www.packshot-creator.com/en/confidentialite');
    expect(en.html).toContain('&lt;i&gt;Ann&lt;/i&gt;');
    const de = composerAccuseOccasion({ firstName: 'Anna', langue: 'de-ch' });
    expect(de.texte).toContain('weder ein Angebot noch eine Bestätigung der Verfügbarkeit');
    expect(de.texte).toContain('https://www.packshot-creator.com/fr/confidentialite');
    for (const c of [en, de]) expect(c.texte).not.toMatch(/€|CHF|price|Preis|within \d|innert \d/i);
  });

  it('notification interne : en français, avec la langue de la page', () => {
    const lignes = lignesFicheOccasion({
      firstName: 'Anna', email: 'anna@firma.ch', company: 'Firma AG', besoin: 'Schmuck', famille: '', telephone: '', budget: '',
      horizon: '', commentaire: '', reference: '', requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b', recueLe: '2026-10-11T12:00:00.000Z',
      pageSource: 'occasion_studios_orbitvu', langue: 'de-ch',
    });
    expect(lignes).toContain('Langue de la page : allemand (Suisse) (accusé de réception dans cette langue)');
    expect(lignes[0]).toBe("[Occasion] Recherche d'un studio Orbitvu d'occasion");
  });

  it('requête de recherche : langue facultative (français par défaut), langue inconnue refusée', () => {
    const base = { firstName: 'A', email: 'a@b.ch', company: 'C', besoin: 'Uhren', requestId: '3f1d2c4b-5a6e-4f70-8a9b-0c1d2e3f4a5b' };
    const r = requeteRechercheSchema.safeParse(base);
    expect(r.success && r.data.langue).toBe('fr');
    expect(requeteRechercheSchema.safeParse({ ...base, langue: 'de-ch' }).success).toBe(true);
    expect(requeteRechercheSchema.safeParse({ ...base, langue: 'es' }).success).toBe(false);
  });
});

describe('Routes, sélecteur de langue et liens de navigation', () => {
  const P = '/studios-photo-automatises/opportunites' as const;

  it('même chemin dans les trois locales, déclaré dans routing (pas de segment localisé, pas de redirection)', () => {
    expect(routing.pathnames[P]).toBe(P);
    expect(routing.pathnames['/studios-photo-automatises/opportunites/exemples-fictifs']).toBe('/studios-photo-automatises/opportunites/exemples-fictifs');
    for (const l of LANGUES_OCCASION) expect(cheminOccasion(l)).toBe(`/${l}${P}`);
  });

  it('page couverte en de-ch ; plus de repli vers /fr', () => {
    expect(isDeChCovered(P)).toBe(true);
    expect(navPinLocale('de-ch', P)).toBeUndefined();
    expect(navPinLocale('en', P)).toBeUndefined();
  });

  it('sélecteur de langue : chaque locale mène à sa propre page', () => {
    for (const cible of LANGUES_OCCASION) {
      expect(localeSwitchHref(P, undefined, 'fr', cible)).toEqual({ href: P, locale: cible });
      expect(localeSwitchHref(P, undefined, 'de-ch', cible)).toEqual({ href: P, locale: cible });
    }
  });

  it('lien du menu et du pied de page : libellé par langue, même cible', () => {
    expect(LIEN_OCCASION.href).toBe(P);
    expect(libelleLienOccasion('fr')).toBe("Offres d'occasion");
    expect(libelleLienOccasion('en')).toBe('Pre-owned offers');
    expect(libelleLienOccasion('de-ch')).toBe('Occasionen');
  });

  it('politique de confidentialité citée : FR ou EN (pas de version de-ch servie)', () => {
    expect(urlConfidentialite('fr')).toBe('https://www.packshot-creator.com/fr/confidentialite');
    expect(urlConfidentialite('en')).toBe('https://www.packshot-creator.com/en/confidentialite');
    expect(urlConfidentialite('de-ch')).toBe('https://www.packshot-creator.com/fr/confidentialite');
    expect(navPinLocale('de-ch', '/confidentialite')).toBe('fr');
  });

  it('les deux pages déclarent les trois locales et gardent noindex, sans alternates ni canonique', () => {
    for (const f of ['app/[lang]/studios-photo-automatises/opportunites/page.tsx', 'app/[lang]/studios-photo-automatises/opportunites/exemples-fictifs/page.tsx']) {
      // Code seul : les commentaires citent canonique et hreflang pour dire qu'ils sont absents.
      const source = readFileSync(join(process.cwd(), f), 'utf8')
        .split('\n')
        .filter((l) => !/^\s*(\*|\/\/|\/\*\*)/.test(l))
        .join('\n');
      expect(source).toContain('LANGUES_OCCASION.map((lang) => ({ lang }))');
      expect(source).toContain('robots: { index: false, follow: false }');
      expect(source).not.toMatch(/alternates|canonical|hreflang|application\/ld\+json/);
    }
  });

  it('la landing n’entre pas dans le sitemap', () => {
    expect(readFileSync(join(process.cwd(), 'app/sitemap.ts'), 'utf8')).not.toContain('opportunites');
  });
});

describe('Politique de confidentialité : finalité « offres d’occasion » dans les trois fichiers de messages', () => {
  it('collecte, finalité et article 9 présents, sans durée de conservation inventée', () => {
    for (const l of ['fr', 'en', 'de-ch']) {
      const m = JSON.parse(readFileSync(join(process.cwd(), `messages/${l}.json`), 'utf8')).privacy;
      expect(m.article2.occasionSearch.title, l).toBeTruthy();
      expect(m.article2.occasionAlerts.description, l).toMatch(/e-?mail/i);
      expect(m.article3.purpose7, l).toBeTruthy();
      const art9 = [m.article9.p1, m.article9.p2, m.article9.p3, m.article9.p4].join(' ');
      expect(art9, l).toMatch(/Resend/);
      expect(art9, l).toMatch(/newsletter/i);
      expect(art9, l).not.toMatch(/\d+\s*(ans|mois|years|months|Jahre|Monate)/);
    }
  });
});
