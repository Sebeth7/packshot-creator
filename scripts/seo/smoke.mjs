#!/usr/bin/env node
/**
 * Smoke test SEO — contrôle post-déploiement.
 *
 * À lancer dans les 15 minutes qui suivent un merge, et sur un Preview Vercel
 * avant de merger.
 *
 *   node scripts/seo/smoke.mjs https://www.packshot-creator.com
 *   node scripts/seo/smoke.mjs https://<preview>.vercel.app
 *
 * Contrôle, sur un jeu d'URL témoins : statut HTTP, canonical, hreflang,
 * présence ou absence de noindex, sitemap et robots.txt.
 *
 * LIMITE À CONNAÎTRE : un Preview ne passe pas par le Worker Cloudflare. Les
 * redirections legacy, les 410 et les sous-domaines ne s'y testent pas
 * (cf docs/seo-geo/03-PIEGES.md, piège E5).
 *
 * AUTRE LIMITE : la production répond 403 à curl (challenge Cloudflare). Ce
 * script envoie un user-agent de navigateur, ce qui suffit en général. Si un
 * résultat paraît anormal, ouvrir la page dans Chrome avant de conclure
 * (piège B1).
 */

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

/**
 * Les déploiements Preview sont protégés par le SSO Vercel : sans jeton, toute
 * page répond 302 vers vercel.com/sso-api. Le jeton se crée dans le dashboard
 * Vercel, projet sysnext → Settings → Deployment Protection → Protection Bypass
 * for Automation. Voir docs/seo-geo/05-INFRA.md.
 */
const BYPASS = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

const ENTETES = {
  'user-agent': UA,
  accept: 'text/html',
  ...(BYPASS
    ? { 'x-vercel-protection-bypass': BYPASS, 'x-vercel-set-bypass-cookie': 'true' }
    : {}),
};

/**
 * Les URL témoins. Couvrent les trois locales, les six familles de gabarit
 * (home, hub, secteur, machine, article, page suisse) et les pathnames
 * localisés de-ch.
 */
const TEMOINS = [
  { url: '/fr',                                  attendu: 200, indexable: true },
  { url: '/en',                                  attendu: 200, indexable: true },
  { url: '/de-ch',                               attendu: 200, indexable: true },
  { url: '/fr/studios-photo-automatises',        attendu: 200, indexable: true },
  { url: '/fr/industrie',                        attendu: 200, indexable: true },
  { url: '/fr/industrie/bijoux-joaillerie',      attendu: 200, indexable: true },
  { url: '/fr/industrie/horlogerie',             attendu: 200, indexable: true },
  { url: '/fr/blog',                             attendu: 200, indexable: true },
  { url: '/fr/guide',                            attendu: 200, indexable: true },
  { url: '/fr/contact',                          attendu: 200, indexable: true },
  { url: '/fr/distributeur-orbitvu-suisse',      attendu: 200, indexable: true },
  { url: '/fr/ia-photo-produit',                 attendu: 200, indexable: true },
  { url: '/fr/academy',                          attendu: 200, indexable: true },
  { url: '/de-ch/branchen/schmuck',              attendu: 200, indexable: true },
  { url: '/de-ch/kontakt',                       attendu: 200, indexable: true },
  { url: '/en/blog',                             attendu: 200, indexable: true },
  // Pages volontairement non indexables — un « indexable: false » qui devient
  // indexable est une régression aussi grave que l'inverse.
  // Noindex posé par le chantier C1, en production depuis le 16/09/2026.
  // Contrôle ferme : si cette page redevient indexable, c'est une régression.
  { url: '/fr/outil-financement',                attendu: 200, indexable: false },
];

const RESSOURCES = ['/sitemap.xml', '/robots.txt', '/llms.txt'];

const base = (process.argv[2] ?? '').replace(/\/$/, '');
if (!base.startsWith('http')) {
  console.error('Usage : node scripts/seo/smoke.mjs <url-de-base>');
  console.error('  ex. : node scripts/seo/smoke.mjs https://www.packshot-creator.com');
  process.exit(2);
}

const estProduction = base.includes('packshot-creator.com');
const estOrigine = /^https:\/\/sysnext\.vercel\.app$/.test(base);
const mode = estProduction ? 'production' : estOrigine ? 'origine' : 'preview';

function extraire(html, regex) {
  const m = html.match(regex);
  return m ? m[1] : null;
}

const echecs = [];
const avertissements = [];
const attentes = [];
const bloques = [];
const protegees = [];

async function controler({ url, attendu, indexable, enAttenteDe }) {
  /** Un écart attendu tant qu'un chantier n'est pas livré n'est pas un échec. */
  const signaler = (message) =>
    enAttenteDe
      ? attentes.push(`${message}  [attendu tant que ${enAttenteDe} n'est pas livré]`)
      : echecs.push(message);
  const complet = `${base}${url}`;
  let reponse;
  try {
    reponse = await fetch(complet, {
      headers: ENTETES,
      redirect: 'manual',
    });
  } catch (e) {
    echecs.push(`${url} — requête impossible : ${e.message}`);
    return;
  }

  if (reponse.status === 403) {
    bloques.push(url);
    return;
  }
  if (reponse.status === 302 && (reponse.headers.get('location') ?? '').includes('vercel.com/sso-api')) {
    protegees.push(url);
    return;
  }
  if (reponse.status !== attendu) {
    signaler(`${url} — statut ${reponse.status}, attendu ${attendu}`);
    return;
  }

  const html = await reponse.text();

  const robots = extraire(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const aNoindex = /noindex/i.test(robots ?? '');

  if (indexable && aNoindex) {
    signaler(`${url} — NOINDEX inattendu (robots: "${robots}")`);
  }
  if (!indexable && !aNoindex) {
    signaler(`${url} — devrait être en noindex, ne l'est pas (robots: "${robots ?? 'absent'}")`);
  }

  const canonical = extraire(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
  if (!canonical) {
    echecs.push(`${url} — canonical absent`);
  } else if (!canonical.startsWith('https://www.packshot-creator.com')) {
    echecs.push(`${url} — canonical hors domaine : ${canonical}`);
  }

  const hreflangs = [...html.matchAll(/<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["']/gi)].map(
    (m) => m[1],
  );
  if (indexable && hreflangs.length === 0) {
    avertissements.push(`${url} — aucun hreflang (légitime pour une page mono-langue)`);
  } else if (hreflangs.length > 0 && !hreflangs.includes('x-default')) {
    echecs.push(`${url} — hreflang sans x-default (${hreflangs.join(', ')})`);
  }

  const titre = extraire(html, /<title[^>]*>([^<]+)<\/title>/i);
  if (!titre || titre.trim().length < 10) {
    echecs.push(`${url} — title absent ou trop court : "${titre ?? ''}"`);
  }

  const description = extraire(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  if (!description || description.trim().length < 40) {
    avertissements.push(`${url} — meta description absente ou courte (${description?.length ?? 0} car.)`);
  }

  const jsonld = (html.match(/application\/ld\+json/g) ?? []).length;

  console.log(
    `  OK  ${url}  ${reponse.status}  ${hreflangs.length} hreflang  ` +
      `${jsonld} JSON-LD  ${aNoindex ? 'noindex' : 'index'}`,
  );
}

async function controlerRessource(chemin) {
  const complet = `${base}${chemin}`;
  try {
    const reponse = await fetch(complet, { headers: ENTETES, redirect: 'manual' });
    if (reponse.status === 302 && (reponse.headers.get('location') ?? '').includes('vercel.com/sso-api')) {
      protegees.push(chemin);
      return;
    }
    if (reponse.status === 403) {
      bloques.push(chemin);
      return;
    }
    if (!reponse.ok) {
      echecs.push(`${chemin} — statut ${reponse.status}`);
      return;
    }
    const corps = await reponse.text();
    if (corps.length < 50) {
      echecs.push(`${chemin} — corps suspect (${corps.length} octets)`);
      return;
    }
    if (chemin === '/sitemap.xml') {
      const n = (corps.match(/<loc>/g) ?? []).length;
      if (n < 100) echecs.push(`/sitemap.xml — seulement ${n} URL, attendu bien davantage`);
      else console.log(`  OK  /sitemap.xml  ${n} URL`);
      return;
    }
    console.log(`  OK  ${chemin}  ${corps.length} octets`);
  } catch (e) {
    echecs.push(`${chemin} — requête impossible : ${e.message}`);
  }
}

const LEGENDE = {
  production: '(Production, derrière Cloudflare — susceptible de renvoyer 403 à un script)',
  origine: "(Origine Vercel, hors Cloudflare — le Worker n'est PAS dans la chaîne)",
  preview: "(Preview Vercel — le Worker n'est PAS dans la chaîne)",
};

console.log(`\nSmoke test SEO — ${base}`);
console.log(`${LEGENDE[mode]}\n`);

console.log('Pages témoins :');
for (const temoin of TEMOINS) {
  await controler(temoin);
}

console.log('\nRessources :');
for (const ressource of RESSOURCES) {
  await controlerRessource(ressource);
}

if (protegees.length >= 3) {
  console.error(`\nDÉPLOIEMENT PROTÉGÉ — ${protegees.length} page(s) redirigée(s) vers le SSO Vercel.\n`);
  console.error("Ce n'est pas une panne : la protection de déploiement Vercel est");
  console.error('active sur les Preview. Toute requête sans jeton est renvoyée');
  console.error('vers vercel.com/sso-api.\n');
  console.error('Deux façons de contrôler un Preview :');
  console.error('  · Dans un navigateur, connecté au compte Vercel de l\'équipe');
  console.error('  · En script, avec le jeton de contournement :\n');
  console.error('      VERCEL_AUTOMATION_BYPASS_SECRET=<jeton> \\');
  console.error('        node scripts/seo/smoke.mjs <url-du-preview>\n');
  console.error('Le jeton se crée dans Vercel → projet sysnext → Settings →');
  console.error('Deployment Protection → Protection Bypass for Automation.');
  console.error('Voir docs/seo-geo/05-INFRA.md.');
  process.exit(2);
}

if (bloques.length >= 3) {
  console.error(`\nCLOUDFLARE BLOQUE CE SCRIPT — ${bloques.length} page(s) en 403.\n`);
  console.error("Ce n'est pas une panne du site : Cloudflare identifie le client");
  console.error("par son empreinte TLS, qui n'est pas celle d'un navigateur.");
  console.error('Les fichiers statiques (robots.txt, llms.txt) passent, pas les pages.\n');
  console.error('Cibles utilisables pour un contrôle automatisé :');
  console.error('  · https://sysnext.vercel.app          (origine de production, hors Cloudflare)');
  console.error('  · https://<preview>.vercel.app        (avant merge)\n');
  console.error('Pour contrôler la production telle que la voit un visiteur,');
  console.error('ouvrir les pages dans Chrome. Voir docs/seo-geo/07-VERIFICATION.md.');
  process.exit(2);
}

if (attentes.length > 0) {
  console.log(`\nÉcarts attendus (${attentes.length}) — liés à un chantier non livré :`);
  for (const a of attentes) console.log(`  · ${a}`);
}

if (avertissements.length > 0) {
  console.log(`\nAvertissements (${avertissements.length}) :`);
  for (const a of avertissements) console.log(`  · ${a}`);
}

if (echecs.length > 0) {
  console.error(`\nÉCHEC — ${echecs.length} problème(s) :\n`);
  for (const e of echecs) console.error(`  ✗ ${e}`);
  console.error('\nSi un résultat paraît anormal, ouvrir la page dans Chrome');
  console.error('avant de conclure : la production répond 403 à certains clients.');
  process.exit(1);
}

console.log(`\nTout est vert — ${TEMOINS.length} pages, ${RESSOURCES.length} ressources.\n`);
if (mode !== 'production') {
  console.log("Rappel : les redirections du Worker Cloudflare ne sont PAS couvertes ici.");
  console.log('Elles ne se testent qu\'en production. Voir docs/seo-geo/05-INFRA.md.\n');
}
