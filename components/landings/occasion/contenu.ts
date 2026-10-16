import type { LangueOccasion } from '@/lib/occasion/langues';
import { DE_CH } from './contenu-de-ch';
import { EN } from './contenu-en';
import { FR, type ContenuOccasion } from './contenu-fr';

/**
 * Textes de la landing « Studios Orbitvu d'occasion »
 * (/<langue>/studios-photo-automatises/opportunites), dans les trois langues du
 * site : `contenu-fr.ts` (source), `contenu-en.ts`, `contenu-de-ch.ts`, de même
 * structure (`ContenuOccasion`). Le bandeau et les annotations de l'aperçu sont
 * des outils internes, en français.
 */

export type { ContenuOccasion };

const CONTENUS: Record<LangueOccasion, ContenuOccasion> = { fr: FR, en: EN, 'de-ch': DE_CH };

export function contenuOccasion(langue: LangueOccasion): ContenuOccasion {
  return CONTENUS[langue];
}

/** Textes français, par section (compatibilité des imports existants). */
export const { META, HERO, MACHINES, MODELES, ALERTES, FICHE, GARANTIE, RECHERCHE, APERCU } = FR;

/** Espace insécable avant la ponctuation haute française (textes internes ci-dessous). */
const nb = (texte: string) => texte.replace(/ ([?!:;])/g, '\u00a0$1');

/** État de la collecte tel que la page l'affiche (calculé au rendu serveur, `collecteAffichee`). */
export interface CollecteAffichee {
  active: boolean;
  /** Fin de la fenêtre de test (ISO UTC), ou null. */
  jusqua: string | null;
}

/** « 2026-10-12 14:00 UTC » depuis une date ISO. */
export function heureUtc(iso: string): string {
  return `${iso.slice(0, 16).replace('T', ' ')} UTC`;
}

/**
 * Avis du formulaire pendant un test réel : jamais « aucune donnée transmise »
 * quand la route envoie (constat du JOURNAL de #82 du 09/10 : bandeau resté
 * « aucune demande envoyée » pendant le test).
 */
export function avisTestReel(c: CollecteAffichee): string {
  return nb(
    `Test réel en cours : cette demande envoie de vrais e-mails${c.jusqua ? `, jusqu'au ${heureUtc(c.jusqua)} (fermeture automatique ensuite)` : ''}.`,
  );
}

const FERMEE: CollecteAffichee = { active: false, jusqua: null };

/**
 * Titre et texte du bandeau de l'aperçu, selon la vue et l'état RÉEL des deux
 * collectes : recherche (`collecte`) et liste d'alerte (`alertes`), indépendantes.
 */
export function texteBandeau(
  vue: 'reel' | 'exemples',
  c: CollecteAffichee,
  alertes: CollecteAffichee = FERMEE,
): { titre: string; texte: string; test: boolean } {
  const prefixe = vue === 'exemples' ? 'Page non publiée · machines et photos d’illustration · ' : 'Page non publiée · ';
  const fin = (x: CollecteAffichee) => (x.jusqua ? ` jusqu'au ${heureUtc(x.jusqua)}, fermeture automatique ensuite` : '');
  if (c.active || alertes.active) {
    const recherche = c.active
      ? `la recherche envoie de vrais e-mails (notification interne, puis accusé au prospect)${fin(c)}`
      : 'recherche fermée (503)';
    const liste = alertes.active
      ? `liste d'alerte : l'inscription envoie un vrai e-mail de confirmation${fin(alertes)}`
      : "liste d'alerte non activée";
    return {
      titre: vue === 'exemples' ? 'Test réel en cours · exemples fictifs – aucune offre réelle' : 'Test réel en cours',
      texte: `${prefixe}${recherche} · ${liste}`,
      test: true,
    };
  }
  return {
    titre: vue === 'exemples' ? 'Exemples fictifs – aucune offre réelle' : 'Aperçu interne',
    texte: `${prefixe}recherche fermée (503) et liste d'alerte non activée : aucune donnée transmise ni enregistrée`,
    test: false,
  };
}

