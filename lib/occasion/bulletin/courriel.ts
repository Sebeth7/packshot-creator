import type { MachineOccasion } from '@/data/occasion/machines';
import { contenuOccasion } from '@/components/landings/occasion/contenu';
import { libelleFamille, type Famille } from '../formulaires';
import { cheminOccasion, type LangueOccasion } from '../langues';
import { nomModele } from '../stock';

/**
 * Bulletin d'arrivage « Nouvelles occasions Orbitvu disponibles » : UN SEUL
 * modèle, pour une ou plusieurs machines (décision du 12/10/2026). Aucun
 * récapitulatif périodique.
 *
 * Tout vient du registre (`data/occasion/machines.ts`) et des libellés de la
 * landing : modèle, référence, origine, usage, date de la dernière confirmation.
 * Le registre n'a pas de prix : aucun prix, aucun délai, aucune remise n'est
 * écrit. La garantie est « précisée par écrit », comme sur la page. Les fiches
 * EN et DE-CH utilisent les `traductions` exigées pour toute machine disponible.
 *
 * Pas d'image : les photos du site sont en AVIF, mal lu par les messageries ; le
 * lien mène aux cartes de la page, photos comprises.
 */

const TEXTES: Record<
  LangueOccasion,
  {
    objet: (n: number, modele: string) => string;
    titre: string;
    salutation: string;
    tous: string;
    intro: (n: number, famille: string) => string;
    separateur: string;
    disponibilite: (d: string) => string;
    conditions: string;
    lien: string;
    bouton: string;
    raison: string;
    desinscription: string;
    signature: string;
    locale: string;
  }
> = {
  fr: {
    objet: (n, modele) => `Nouvelles occasions Orbitvu disponibles : ${n === 1 ? modele : `${n} machines`}`,
    titre: 'Nouvelles occasions Orbitvu disponibles',
    salutation: 'Bonjour,',
    tous: 'toutes les familles',
    intro: (n, f) =>
      `${n === 1 ? "Une nouvelle machine Orbitvu d'occasion est disponible" : `${n} nouvelles machines Orbitvu d'occasion sont disponibles`}, correspondant à votre inscription (${f}).`,
    separateur: ' : ',
    disponibilite: (d) => `Disponibilité confirmée le ${d}, sous réserve de vente entre-temps.`,
    conditions: 'Les conditions propres à chaque machine (garantie, logiciel, installation) vous sont précisées par écrit avec la proposition.',
    lien: 'Voir les machines et faire une demande :',
    bouton: 'Voir les machines',
    raison:
      "Vous recevez ce message parce que vous avez confirmé votre inscription aux nouvelles offres de studios Orbitvu d'occasion de PackshotCreator. Cette liste est distincte de la newsletter.",
    desinscription: 'Se désinscrire de ces e-mails :',
    signature: 'PackshotCreator',
    locale: 'fr-FR',
  },
  en: {
    objet: (n, modele) => `New pre-owned Orbitvu machines available: ${n === 1 ? modele : `${n} machines`}`,
    titre: 'New pre-owned Orbitvu machines available',
    salutation: 'Hello,',
    tous: 'all families',
    intro: (n, f) =>
      `${n === 1 ? 'A new pre-owned Orbitvu machine is available' : `${n} new pre-owned Orbitvu machines are available`}, matching your subscription (${f}).`,
    separateur: ': ',
    disponibilite: (d) => `Availability confirmed on ${d}, subject to prior sale.`,
    conditions: 'The terms specific to each machine (warranty, software, installation) are provided in writing with the proposal.',
    lien: 'View the machines and send a request:',
    bouton: 'View the machines',
    raison:
      'You are receiving this message because you confirmed your subscription to new offers on pre-owned Orbitvu studios from PackshotCreator. This list is separate from the newsletter.',
    desinscription: 'Unsubscribe from these emails:',
    signature: 'PackshotCreator',
    locale: 'en-GB',
  },
  'de-ch': {
    objet: (n, modele) => `Neue Orbitvu-Occasionen verfügbar: ${n === 1 ? modele : `${n} Maschinen`}`,
    titre: 'Neue Orbitvu-Occasionen verfügbar',
    salutation: 'Guten Tag',
    tous: 'alle Familien',
    intro: (n, f) =>
      `${n === 1 ? 'Eine neue Orbitvu-Maschine als Occasion ist verfügbar' : `${n} neue Orbitvu-Maschinen als Occasion sind verfügbar`}, passend zu Ihrer Anmeldung (${f}).`,
    separateur: ': ',
    disponibilite: (d) => `Verfügbarkeit bestätigt am ${d}, Zwischenverkauf vorbehalten.`,
    conditions: 'Die Bedingungen der einzelnen Maschinen (Garantie, Software, Installation) erhalten Sie schriftlich mit der Offerte.',
    lien: 'Maschinen ansehen und Anfrage senden:',
    bouton: 'Maschinen ansehen',
    raison:
      'Sie erhalten diese Nachricht, weil Sie Ihre Anmeldung für neue Angebote für Orbitvu-Studios als Occasion von PackshotCreator bestätigt haben. Diese Liste ist vom Newsletter unabhängig.',
    desinscription: 'Von diesen E-Mails abmelden:',
    signature: 'PackshotCreator',
    locale: 'de-CH',
  },
};

export interface CourrielBulletin {
  objet: string;
  texte: string;
  html: string;
  /** En-têtes de l'envoi : désinscription lisible par la messagerie. */
  entetes: Record<string, string>;
}

function echapper(v: string): string {
  return v.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function dateConfirmee(iso: string, locale: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { timeZone: 'UTC', dateStyle: 'long' });
}

/** Lignes d'une machine, dans la langue du bulletin (textes du registre seulement). */
export function lignesMachine(m: MachineOccasion, langue: LangueOccasion): string[] {
  const t = TEXTES[langue];
  const c = contenuOccasion(langue);
  const tr = langue === 'fr' ? { origineDetail: m.origineDetail, usage: m.usage } : m.traductions?.[langue];
  if (!tr) throw new Error(`Traduction ${langue} absente pour ${m.ref}`);
  const s = t.separateur;
  return [
    `${nomModele(m) ?? m.modeleId} — ${c.MACHINES.reference} ${m.ref}`,
    `${c.MACHINES.libelles.origine}${s}${c.ORIGINES[m.origine].carte} — ${tr.origineDetail}`,
    `${c.MACHINES.libelles.usage}${s}${tr.usage}`,
    `${c.MACHINES.libelles.garantie}${s}${c.MACHINES.garantieCarte}`,
    t.disponibilite(dateConfirmee(m.statutConfirmeLe, t.locale)),
  ];
}

export function composerBulletin(p: {
  machines: readonly MachineOccasion[];
  langue: LangueOccasion;
  /** Famille de l'inscrit (« » : toutes). */
  famille: Famille | '';
  /** Origine des liens, ex. `https://www.packshot-creator.com`. */
  base: string;
  /** Lien de désinscription personnel de l'inscrit. */
  lienDesinscription: string;
}): CourrielBulletin {
  if (p.machines.length === 0) throw new Error('Bulletin sans machine : rien à annoncer');
  const t = TEXTES[p.langue];
  const n = p.machines.length;
  const famille = p.famille ? libelleFamille(p.famille, p.langue) : t.tous;
  const page = `${p.base.replace(/\/+$/, '')}${cheminOccasion(p.langue)}#machines`;
  const blocs = p.machines.map((m) => lignesMachine(m, p.langue));

  const texte = [
    t.salutation,
    '',
    t.intro(n, famille),
    '',
    ...blocs.flatMap((b) => [...b, '']),
    t.conditions,
    '',
    t.lien,
    page,
    '',
    '—',
    t.raison,
    t.desinscription,
    p.lienDesinscription,
    '',
    t.signature,
  ].join('\n');

  const html = [
    `<h1 style="font-size:20px">${echapper(t.titre)}</h1>`,
    `<p>${echapper(t.salutation)}</p>`,
    `<p>${echapper(t.intro(n, famille))}</p>`,
    ...blocs.map(
      ([titre, ...reste]) =>
        `<div style="margin:16px 0;padding:12px 16px;border:1px solid #e3e3f3;border-radius:10px"><p style="margin:0 0 6px"><strong>${echapper(titre)}</strong></p>${reste
          .map((l) => `<p style="margin:2px 0">${echapper(l)}</p>`)
          .join('')}</div>`,
    ),
    `<p>${echapper(t.conditions)}</p>`,
    `<p><a href="${echapper(page)}">${echapper(t.bouton)}</a></p>`,
    `<hr><p style="font-size:12px;color:#5b6070">${echapper(t.raison)}<br><a href="${echapper(p.lienDesinscription)}">${echapper(
      t.desinscription.replace(/\s*:$/, ''),
    )}</a></p>`,
    `<p>${echapper(t.signature)}</p>`,
  ].join('\n');

  return {
    objet: t.objet(n, nomModele(p.machines[0]) ?? p.machines[0].modeleId),
    texte,
    html,
    entetes: { 'List-Unsubscribe': `<${p.lienDesinscription}>` },
  };
}
