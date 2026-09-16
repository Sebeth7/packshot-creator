#!/usr/bin/env node
/**
 * Garde-périmètre — refuse une pull request qui touche la zone rouge.
 *
 * Le périmètre est défini dans docs/seo-geo/01-PERIMETRE.md. Ce script en est
 * l'application mécanique : si les deux divergent, le document fait foi et le
 * script doit être corrigé.
 *
 * Usage : node scripts/seo/verifier-perimetre.mjs <fichier-liste>
 *         LABELS="zone-rouge-autorisee" lève la garde (libellé posé par Sébastien).
 */

import { readFileSync } from 'node:fs';

const LIBELLE_DEROGATION = 'zone-rouge-autorisee';

/** Zone rouge : chemins interdits au chantier SEO/GEO. */
const ZONE_ROUGE = [
  { motif: /^lib\/roiChat\//,                 raison: 'Calculateur ROI conversationnel' },
  { motif: /^lib\/roiEngine\//,               raison: 'Moteur de calcul ROI' },
  { motif: /^app\/calculateur-roi\//,         raison: 'Interface du calculateur ROI' },
  { motif: /^app\/roi-pro\//,                 raison: 'Calculateur ROI interne' },
  { motif: /^app\/roi-preview\//,             raison: 'Calculateur ROI, prévisualisation' },
  { motif: /^app\/api\//,                     raison: 'Routes serveur : leads, mails, CRM' },
  { motif: /^app\/etude-clients-2026\//,      raison: 'Questionnaire client, données personnelles' },
  { motif: /^components\/forms\//,            raison: 'Formulaires de capture de leads' },
  { motif: /^components\/analytics\//,        raison: 'Mesure GA4 — Laurent en dépend' },
  { motif: /^lib\/(pipedrive|supabase|lead-enrichment|rate-limit|analytics)\.ts$/, raison: 'Intégrations CRM, base, mesure' },
  { motif: /^middleware\.ts$/,                raison: 'Routage de locale — casse le site entier' },
  { motif: /^i18n\/routing\.ts$/,             raison: 'pathnames retype Link dans tout le projet' },
  { motif: /^package(-lock)?\.json$/,         raison: 'Dépendances' },
  { motif: /^app\/globals\.css$/,             raison: 'Design system' },
  { motif: /^(DESIGN_SYSTEM|design-system|CHARTE_GRAPHIQUE)\.md$/, raison: 'Design system' },
  { motif: /^\.env/,                          raison: 'Secrets' },
];

/**
 * next.config.ts est partiellement autorisé : le bloc redirects() est en zone
 * verte, le reste (images, remotePatterns) en zone rouge. Le script ne sait pas
 * lire un diff intra-fichier — il signale pour relecture au lieu de bloquer.
 */
const A_RELIRE = [
  { motif: /^next\.config\.ts$/, raison: 'Seul le bloc redirects() est en zone verte — vérifier que images/remotePatterns ne bougent pas' },
];

const chemin = process.argv[2];
if (!chemin) {
  console.error('Usage : node scripts/seo/verifier-perimetre.mjs <fichier-liste>');
  process.exit(2);
}

const fichiers = readFileSync(chemin, 'utf8')
  .split('\n')
  .map((l) => l.trim())
  .filter(Boolean);

if (fichiers.length === 0) {
  console.log('Aucun fichier modifié.');
  process.exit(0);
}

const derogation = (process.env.LABELS ?? '')
  .split(',')
  .map((l) => l.trim())
  .includes(LIBELLE_DEROGATION);

const violations = [];
const relectures = [];

for (const fichier of fichiers) {
  for (const { motif, raison } of ZONE_ROUGE) {
    if (motif.test(fichier)) violations.push({ fichier, raison });
  }
  for (const { motif, raison } of A_RELIRE) {
    if (motif.test(fichier)) relectures.push({ fichier, raison });
  }
}

if (relectures.length > 0) {
  console.log('À RELIRE — zone mixte :');
  for (const { fichier, raison } of relectures) {
    console.log(`  ${fichier}\n    ${raison}`);
  }
  console.log('');
}

if (violations.length === 0) {
  console.log(`Périmètre respecté (${fichiers.length} fichier(s) contrôlé(s)).`);
  process.exit(0);
}

console.error('ZONE ROUGE TOUCHÉE — cette pull request ne peut pas être mergée.\n');
for (const { fichier, raison } of violations) {
  console.error(`  ${fichier}`);
  console.error(`    ${raison}\n`);
}

if (derogation) {
  console.error(`Le libellé « ${LIBELLE_DEROGATION} » est posé sur la PR : la garde est levée.`);
  console.error('Ce libellé ne se pose que par Sébastien, après arbitrage explicite.\n');
  process.exit(0);
}

console.error('Que faire :');
console.error('  1. Retirer ces changements de la PR, ou');
console.error('  2. Écrire la demande dans docs/seo-geo/BOITE-AUX-LETTRES.md et attendre.');
console.error('');
console.error('Le périmètre est défini dans docs/seo-geo/01-PERIMETRE.md.');
process.exit(1);
