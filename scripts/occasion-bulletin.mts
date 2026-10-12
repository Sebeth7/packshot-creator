/**
 * Bulletin d'arrivage « Nouvelles occasions Orbitvu disponibles » (PR #129,
 * décision du 12/10/2026) : un bulletin par nouvel arrivage vérifié, validé par
 * Sébastien, jamais périodique ni automatique. Aucune route, aucun cron, aucun n8n.
 *
 * Trois étapes, dans cet ordre :
 *
 *   npx tsx scripts/occasion-bulletin.mts apercu [--refs OCC-2026-01,OCC-2026-02]
 *     Sans réseau. Contenu du bulletin dans les trois langues, pour « toutes les
 *     familles » et pour chaque famille concernée, depuis le registre
 *     data/occasion/machines.ts. Registre vide : « aucun bulletin ».
 *
 *   npx tsx scripts/occasion-bulletin.mts plan [--refs …]
 *     LECTURE SEULE chez Resend (inscrits confirmés du segment et du topic
 *     Occasion). Brouillon complet à faire valider : lots, nombre de
 *     destinataires, exclusions, contenu exact, EMPREINTE.
 *
 *   npx tsx scripts/occasion-bulletin.mts envoyer --empreinte <empreinte> --valide-par "<nom>" [--refs …]
 *
 *   --test a@exemple.fr,b@exemple.fr (avec plan et envoyer) : bulletin de TEST,
 *     reçu seulement par ces inscrits confirmés ; publication non exigée (fenêtre
 *     de test des alertes en Preview) ; aucune machine marquée annoncée.
 *     Recalcule le brouillon et n'envoie que si son empreinte est celle validée
 *     ET si BULLETIN_ENVOI_AUTORISE, ALERTES_REELLES_AUTORISEES et
 *     PUBLICATION_AUTORISEE sont vrais (lib/occasion/activation.ts). Sinon :
 *     refus, aucun appel d'envoi. Après l'envoi : renseigner `annonce` dans le
 *     registre pour chaque machine annoncée (commit).
 *
 * Variables lues dans l'environnement du shell (jamais écrites dans le dépôt) :
 * RESEND_API_KEY, RESEND_FROM_EMAIL, OCCASION_ALERTES_SEGMENT_ID,
 * OCCASION_ALERTES_TOPIC_ID, OCCASION_ALERTES_SECRET, OCCASION_ALERTES_URL_BASE.
 * Les aperçus sont écrits dans le dossier temporaire du système, hors du dépôt.
 */

import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const { MACHINES_OCCASION } = await import('../data/occasion/machines');
const { FAMILLES } = await import('../lib/occasion/formulaires');
const { LANGUES_OCCASION } = await import('../lib/occasion/langues');
const { machinesAnnoncables } = await import('../lib/occasion/bulletin/selection');
const { composerBulletin } = await import('../lib/occasion/bulletin/courriel');
const { apercuBulletin, identifiantBulletin, lienDesinscriptionApercu, machinesPourFamille, preparerBulletin } = await import(
  '../lib/occasion/bulletin/plan'
);
const { qualifierAbonnes } = await import('../lib/occasion/bulletin/abonnes');

const args = process.argv.slice(2);
const mode = args[0] ?? 'apercu';
const option = (nom: string) => {
  const i = args.indexOf(`--${nom}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const refs = option('refs')?.split(',').map((r) => r.trim()).filter(Boolean);
const destinatairesTest = option('test')?.split(',').map((r) => r.trim()).filter(Boolean);
const maintenant = new Date();
const BASE_PRODUCTION = 'https://www.packshot-creator.com';

function exiger(nom: string): string {
  const v = process.env[nom]?.trim();
  if (!v) {
    console.error(`Variable manquante : ${nom}`);
    process.exit(2);
  }
  return v;
}

function ecrire(id: string, fichiers: Record<string, string>): string {
  const dossier = join(tmpdir(), 'occasion-bulletin', id);
  mkdirSync(dossier, { recursive: true });
  for (const [nom, contenu] of Object.entries(fichiers)) writeFileSync(join(dossier, nom), contenu, 'utf8');
  return dossier;
}

if (mode === 'apercu') {
  const selection = machinesAnnoncables(MACHINES_OCCASION, maintenant, refs);
  for (const e of selection.ecartees) console.log(`Écartée : ${e.ref} (${e.raison})`);
  if (selection.machines.length === 0) {
    console.log('Aucun nouvel arrivage vérifié : aucun bulletin.');
    process.exit(0);
  }
  const base = process.env.OCCASION_ALERTES_URL_BASE?.trim() || BASE_PRODUCTION;
  const id = identifiantBulletin(selection.machines.map((m) => m.ref), maintenant);
  const fichiers: Record<string, string> = {};
  for (const langue of LANGUES_OCCASION) {
    for (const famille of ['', ...FAMILLES] as const) {
      const machines = machinesPourFamille(selection.machines, famille);
      if (machines.length === 0) continue;
      const c = composerBulletin({ machines, langue, famille, base, lienDesinscription: lienDesinscriptionApercu(base, langue) });
      const nom = `${langue}-${famille ? FAMILLES.indexOf(famille) + 1 : 'toutes'}`;
      fichiers[`${nom}.txt`] = `Objet : ${c.objet}\n\n${c.texte}\n`;
      fichiers[`${nom}.html`] = c.html;
    }
  }
  console.log(`Bulletin ${id} : ${selection.machines.length} machine(s). Aperçus : ${ecrire(id, fichiers)}`);
  process.exit(0);
}

if (mode === 'plan' || mode === 'envoyer') {
  const { Resend } = await import('resend');
  const { clientBulletinResend, lireContactsOccasion } = await import('../lib/occasion/bulletin/resend');
  const client = clientBulletinResend(new Resend(exiger('RESEND_API_KEY')));
  const base = exiger('OCCASION_ALERTES_URL_BASE');
  const contacts = await lireContactsOccasion(client, {
    segmentId: exiger('OCCASION_ALERTES_SEGMENT_ID'),
    topicId: exiger('OCCASION_ALERTES_TOPIC_ID'),
  });
  const prep = preparerBulletin({ source: MACHINES_OCCASION, abonnes: qualifierAbonnes(contacts), base, maintenant, refs, destinatairesTest });
  const apercu = apercuBulletin(prep, MACHINES_OCCASION);

  if (mode === 'plan') {
    console.log(apercu);
    if (prep.statut === 'pret') console.log(`\nAperçu écrit dans : ${ecrire(prep.id, { 'brouillon.md': apercu })}`);
    process.exit(0);
  }

  if (prep.statut !== 'pret') {
    console.log(apercu);
    process.exit(1);
  }
  const { envoyerBulletin } = await import('../lib/occasion/bulletin/envoi');
  const rapport = await envoyerBulletin(prep, {
    client,
    expediteur: exiger('RESEND_FROM_EMAIL'),
    secret: exiger('OCCASION_ALERTES_SECRET'),
    source: MACHINES_OCCASION,
    autorisation: { empreinte: option('empreinte') ?? '', valideePar: option('valide-par') ?? '' },
    maintenant,
  });
  console.log(JSON.stringify({ ...rapport, identifiants: 'identifiants' in rapport ? rapport.identifiants.length : undefined }, null, 2));
  if (rapport.statut === 'envoye' && rapport.aMarquer.length > 0) {
    console.log(`\nÀ faire maintenant : annonce: { bulletin: '${rapport.bulletin}', envoyeLe: '${maintenant.toISOString().slice(0, 10)}' } pour ${rapport.aMarquer.join(', ')}, puis commit.`);
  }
  process.exit(rapport.statut === 'envoye' ? 0 : 1);
}

console.error('Usage : apercu | plan | envoyer --empreinte <empreinte> --valide-par "<nom>" [--refs A,B] [--test a@x,b@y]');
process.exit(2);
