#!/usr/bin/env node
/**
 * Garde-conséquences.
 *
 * N'interdit rien. Rappelle, fichier par fichier, ce qui dépend de ce qui est
 * modifié — et refuse le merge si un changement à rayon large n'a pas déclaré
 * ses conséquences dans la PR.
 *
 * Le risque visé, formulé par Sébastien le 16/09/2026 : « dégrader l'existant
 * par une action dont les pleines conséquences n'auraient pas été prises en
 * compte ». Ce script ne juge pas la réponse : il s'assure que la question a été
 * posée.
 *
 * La carte fait foi dans docs/seo-geo/01-RAYON-ACTION.md ; ce fichier en est
 * l'application mécanique. S'ils divergent, le document a raison.
 *
 * Usage : node scripts/seo/verifier-consequences.mjs <fichier-liste>
 *         PR_BODY="<corps de la PR>" pour le contrôle de déclaration.
 */

import { readFileSync } from 'node:fs';

/** Fichiers dont l'effet dépasse le fichier lui-même. */
const RAYON_LARGE = [
  {
    motif: /^lib\/seo-config\.ts$/,
    depend: '7 fichiers : sitemap, lib/blog, deChCoverage et 4 gabarits de page',
    casse: 'une page réactivée ou désindexée partout à la fois (robots + sitemap + sélecteur)',
    delai: 'GSC bouge à J+3-14, la position revient en 2-8 semaines',
  },
  {
    motif: /^public\/robots\.txt$/,
    depend: 'tous les crawlers',
    casse: "un Disallow mal placé désindexe une branche entière",
    delai: 'J+3-14',
  },
  {
    motif: /^app\/sitemap\.ts$/,
    depend: 'ce que Google découvre',
    casse: 'pages absentes du sitemap, ou URL fantômes',
    delai: 'prochain crawl',
  },
  {
    motif: /^i18n\/routing\.ts$/,
    depend: 'le type de Link dans TOUT le projet, et la forme des URL localisées',
    casse: 'le build — cas favorable — ou une URL qui change de forme en silence : 404 en masse',
    delai: 'immédiat si le build casse, sinon au prochain crawl',
  },
  {
    motif: /^middleware\.ts$/,
    depend: 'la résolution de locale de chaque requête',
    casse: 'site entier inaccessible, ou boucle de redirection',
    delai: 'immédiat',
  },
  {
    motif: /^i18n\/deChCoverage\.ts$/,
    depend: 'le sélecteur de langue et la couverture de-ch',
    casse: "l'autorité se déverse sur des pages noindex (cause structurelle n°1 de l'audit du 03/09)",
    delai: 'visible au crawl Screaming Frog suivant',
  },
  {
    motif: /^lib\/hreflang\.ts$/,
    depend: 'les alternates de toutes les pages',
    casse: 'mauvaise langue servie, ciblage dilué',
    delai: 'J+7-30',
  },
  {
    motif: /^content\/(blog|guides)\/alternates\.json$/,
    depend: 'le sélecteur de langue et les alternates',
    casse: 'retirer une correspondance casse le sélecteur EN SILENCE',
    delai: 'invisible sans test ciblé',
  },
  {
    motif: /^cloudflare-worker\//,
    depend: '~1 000 redirections legacy, les 410, les sous-domaines, la racine /',
    casse: 'sous-domaine mort (23/07/2026 : toutes les vidéos produit cassées), backlinks perdus',
    delai: 'immédiat — et NON testable en Preview, le Worker n\'y est pas',
  },
  {
    motif: /^next\.config\.ts$/,
    depend: 'le bloc redirects() ET le bloc images (optimiseur Vercel, piste n°1 des 504)',
    casse: 'une boucle de redirection, ou une aggravation des 504 en cours de mesure',
    delai: 'cf_traffic_daily à J+2 pour les images',
  },
  {
    motif: /^components\/seo\/SchemaOrg\.tsx$/,
    depend: 'tous les rich results ; les @id sont partagés entre entités depuis le 08/05',
    casse: 'perte des rich results partout ; renuméroter les @id casse les liens entre entités',
    delai: 'J+7-21',
  },
  {
    motif: /^(app\/api\/|components\/forms\/)/,
    depend: 'la capture des leads',
    casse: 'UN LEAD PERDU NE LAISSE AUCUNE TRACE — pas d\'erreur, pas d\'alerte, pas de test',
    delai: 'jamais détecté automatiquement — envoyer un vrai formulaire depuis le Preview',
  },
  {
    motif: /^(lib\/analytics\.ts$|components\/analytics\/)/,
    depend: 'les rapports de mesure de Laurent lui-même',
    casse: 'il perd sa propre mesure, et s\'en aperçoit des semaines plus tard',
    delai: 'GA4 DebugView, immédiat si on pense à regarder',
  },
  {
    motif: /^lib\/(pipedrive|supabase|lead-enrichment)\.ts$/,
    depend: 'CRM et base',
    casse: "un lead qui n'arrive pas dans Pipedrive est un lead mort",
    delai: 'silencieux',
  },
  {
    motif: /^(lib\/roiChat\/|lib\/roiEngine\/|app\/(calculateur-roi|roi-pro|roi-preview)\/)/,
    depend: 'le coût API Anthropic par requête, et un tunnel de conversion',
    casse: 'une boucle de prompt fait dériver le coût sans erreur visible',
    delai: 'ROI_CHAT_MONTHLY_TOKEN_ALERT',
  },
  {
    motif: /^package(-lock)?\.json$/,
    depend: 'tout',
    casse: 'régression invisible en dev, visible en prod',
    delai: 'next build',
  },
  {
    motif: /^messages\/.*\.json$/,
    depend: '≈175 000 lignes, modifiées des deux côtés',
    casse: 'JSON cassé, ou conflit immergeable si reformatage global',
    delai: 'immédiat — annoncer le chantier dans ETAT.md',
  },
];

/** Le seul interdit absolu : le dépôt est public. */
const INTERDIT = [
  { motif: /(^|\/)\.env($|\.)/, raison: "le dépôt est PUBLIC — un secret poussé l'est pour toujours" },
];

const chemin = process.argv[2];
if (!chemin) {
  console.error('Usage : node scripts/seo/verifier-consequences.mjs <fichier-liste>');
  process.exit(2);
}

const fichiers = readFileSync(chemin, 'utf8').split('\n').map((l) => l.trim()).filter(Boolean);

if (fichiers.length === 0) {
  console.log('Aucun fichier modifié.');
  process.exit(0);
}

const interdits = [];
const concernes = [];

for (const fichier of fichiers) {
  for (const { motif, raison } of INTERDIT) {
    if (motif.test(fichier)) interdits.push({ fichier, raison });
  }
  for (const entree of RAYON_LARGE) {
    if (entree.motif.test(fichier)) concernes.push({ fichier, ...entree });
  }
}

if (interdits.length > 0) {
  console.error('INTERDIT — ce changement ne peut pas être poussé.\n');
  for (const { fichier, raison } of interdits) {
    console.error(`  ${fichier}\n    ${raison}\n`);
  }
  process.exit(1);
}

if (concernes.length === 0) {
  console.log(`Effet local — ${fichiers.length} fichier(s), rien qui déborde.`);
  console.log('Tu fais, tu journalises, tu merges.');
  process.exit(0);
}

console.log('RAYON LARGE — ce qui dépend de ce que tu touches :\n');
for (const { fichier, depend, casse, delai } of concernes) {
  console.log(`  ${fichier}`);
  console.log(`    en dépend  : ${depend}`);
  console.log(`    si erreur  : ${casse}`);
  console.log(`    visible en : ${delai}\n`);
}

const corps = process.env.PR_BODY ?? '';
const section = corps.match(/##\s*Rayon d'action([\s\S]*?)(?=\n##\s|$)/i);
const contenu = (section?.[1] ?? '')
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/[*_`\-\s]/g, '');

if (contenu.length >= 80) {
  console.log(`Conséquences déclarées dans la PR (${contenu.length} caractères). Rien ne bloque.`);
  process.exit(0);
}

console.error("Il manque la section « ## Rayon d'action » dans la description de la PR.\n");
console.error('Quatre questions, quelques lignes chacune :');
console.error('  · Ce qui dépend de ce que je touche');
console.error('  · Ce qui casserait si je me trompe');
console.error('  · Comment je le verrais, et sous quel délai');
console.error('  · Comment je reviens en arrière\n');
console.error("Ce contrôle ne juge pas ta réponse — il s'assure que la question a été");
console.error("posée. C'est le seul risque qu'on cherche à écarter : agir sans avoir");
console.error('regardé les conséquences.\n');
console.error("Édite la description : gh pr edit <n> --body-file <fichier>");
console.error('La carte complète est dans docs/seo-geo/01-RAYON-ACTION.md.');
process.exit(1);
