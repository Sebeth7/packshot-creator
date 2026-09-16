# 07 — Vérification

Comment prouver qu'un changement marche. Quatre niveaux, du moins cher au plus
cher, à parcourir dans l'ordre.

| Niveau | Outil | Coût | Ce qu'il prouve |
|---|---|---|---|
| 1 | `tsc` + `next build` | secondes à minutes | Le code compile et se génère |
| 2 | Playwright sur le Preview | minutes | Le rendu est correct |
| 3 | Navigateur sur le Preview | minutes | Ce qu'un test ne voit pas |
| 4 | Smoke test sur l'origine | minutes | Le déploiement réel est sain |

Deux protections se mettent en travers d'un contrôle automatisé. Aucune n'est
une panne, les deux se reconnaissent à leur signature :

| Symptôme | Cause | Cible à utiliser |
|---|---|---|
| **403** sur les pages, statiques OK | Cloudflare, empreinte TLS | `sysnext.vercel.app`, ou Chrome |
| **302** vers `vercel.com/sso-api` | Protection de déploiement Vercel | Jeton de contournement, ou navigateur connecté |

Puis la **mesure**, qui vient des semaines plus tard et n'est pas une
vérification : c'est un résultat.

---

## Niveau 1 — Local

```bash
npx tsc --noEmit

NEXT_PUBLIC_SUPABASE_URL=https://exemple.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=factice \
SUPABASE_SERVICE_ROLE_KEY=factice \
npx next build
```

Le build produit aussi le sitemap. S'il compile, `app/sitemap.ts` ne lève pas.

### Contrôler les JSON après édition

```bash
for f in messages/*.json content/blog/alternates.json content/guides/alternates.json; do
  python3 -c "import json,sys; json.load(open('$f'))" && echo "OK  $f" || echo "CASSÉ $f"
done
```

---

## Niveau 2 — Playwright sur le Preview

**Prérequis, une seule fois par machine** — les binaires de navigateur ne sont
pas installés par `npm ci` :

```bash
npx playwright install chromium
```

Sans cela : `browserType.launch: Executable doesn't exist`. Ce n'est pas une
panne du site ni des tests.

L'URL du Preview apparaît en commentaire de la pull request.

**Les Preview sont protégés par le SSO Vercel** (vérifié le 16/09/2026 :
20 requêtes sur 20 redirigées). Dans un navigateur connecté au compte de
l'équipe, cela se règle tout seul. En script, il faut le jeton de contournement
— voir `05-INFRA.md`.

```bash
PLAYWRIGHT_BASE_URL=https://<preview>.vercel.app \
  npx playwright test e2e/seo.spec.ts --project=chromium
```

### Les specs à lancer selon ce que tu touches

| Ce que tu as modifié | Specs |
|---|---|
| Metas, canonical, hreflang, schema | `seo.spec.ts` |
| Maillage, footer, header, ancres | `internal-links-all.spec.ts`, `anchors.spec.ts` |
| Redirections `next.config.ts` | `redirections.spec.ts` |
| Sélecteur de langue, `deChCoverage` | `language-switch.spec.ts` |
| CTA, tunnels de conversion | `cta-destinations.spec.ts` |
| Liens sortants | `external-links.spec.ts` |
| En cas de doute | tout : `npm run test:e2e` |

La configuration Playwright lit `PLAYWRIGHT_BASE_URL` si la variable est
définie, et retombe sur `http://localhost:3000` sinon — auquel cas elle démarre
un serveur de développement automatiquement.

---

## Niveau 3 — Navigateur sur le Preview

Ce qu'aucun test automatique ne voit :

● Le rendu visuel réel — un bloc de réponse directe qui s'affiche mal ne sert à
  rien pour le GEO
● Le rendu mobile
● Le JSON-LD tel que Google le lit : `view-source:` puis chercher
  `application/ld+json`, et le passer au test des résultats enrichis de Google
● La pertinence sémantique : une redirection 301 peut être techniquement
  parfaite et pointer vers la mauvaise page. **Aucun CI ne détecte cela.**

**Limite du Preview, à ne jamais oublier** : il ne passe pas par le Worker
Cloudflare. Les redirections legacy, les 410, les sous-domaines et la racine
`/` ne s'y testent pas.

---

## Niveau 4 — Smoke test en production

**Dans les 15 minutes qui suivent le merge.**

```bash
node scripts/seo/smoke.mjs https://sysnext.vercel.app
```

`sysnext.vercel.app` est **l'origine du déploiement de production** : le même
HTML que `www`, sans l'étage Cloudflare. C'est la seule cible de production
qu'un script peut atteindre.

Ne vise pas `https://www.packshot-creator.com` avec un script : Cloudflare
renvoie 403 à tout client dont l'empreinte TLS n'est pas celle d'un navigateur —
mesuré le 16/09/2026 : 17 pages sur 17 en 403, malgré un user-agent Chrome
complet. Le script le détecte et te le dit, mais tu n'en tireras aucune
information sur l'état du site.

Le script contrôle, sur un jeu d'URL témoins couvrant les trois locales :
statut HTTP, `canonical`, `hreflang`, présence ou absence de `noindex`,
accessibilité du `sitemap.xml` et du `robots.txt`. Il sort en code d'erreur au
premier écart.

Il sait aussi contrôler un Preview, avant le merge :

```bash
node scripts/seo/smoke.mjs https://<preview>.vercel.app
```

### Ce qu'un écart « attendu » veut dire

Certaines attentes du script sont liées à un chantier non encore livré. Le
script les affiche séparément, sous « Écarts attendus », et ne fait pas échouer
le contrôle. Exemple en cours : `/fr/outil-financement` devrait être en
`noindex`, mais le correctif attend dans la branche `feat/audit-laurent-0309`
(chantier C1).

Quand un chantier est livré, retire son marqueur `enAttenteDe` dans
`scripts/seo/smoke.mjs` : l'attente redevient un contrôle ferme.

### Le contrôle qui ne s'automatise pas

Deux choses échappent entièrement au script :

**1. La chaîne Cloudflare.** Redirections legacy, 410, sous-domaines
(`videos.`, `books.`, `trail.`), racine `/` → `/fr`, bascule `/de/*` →
`/de-ch/*`. Elles ne vivent que dans le Worker, et le Worker n'est ni sur le
Preview ni sur l'origine. **Seul un navigateur sur `www` les teste** — avec une
chaîne de requête neuve, sinon les 301 en cache mentent (piège B2).

**2. La pertinence sémantique.** Une redirection 301 peut être techniquement
parfaite et pointer vers la mauvaise page. Un `noindex` peut être posé sur la
bonne page pour la mauvaise raison. Aucun contrôle automatique ne voit cela :
c'est la part qui reste irréductiblement humaine, et c'est pourquoi la section
« Rayon d'action » d'une PR vaut mieux qu'un test de plus.

Si un résultat paraît anormal, **ouvre la page dans Chrome avant de conclure**.
Une page classée « cassée » par un outil a déjà été trouvée parfaitement
fonctionnelle (piège B1).

---

## La mesure — ce qui vient après

Ce n'est pas de la vérification. C'est le résultat, et il arrive tard.

| Signal | Délai | Où |
|---|---|---|
| Statut HTTP, rendu | immédiat | Smoke test |
| Recrawl Googlebot | 1 à 7 jours | GSC, inspection d'URL |
| Rapport de couverture GSC | 3 à 14 jours | GSC |
| Position, clics | 2 à 6 semaines | GSC, outillage de Laurent |
| Résultats enrichis | 1 à 3 semaines | GSC, rapport Rich Results |
| Visibilité GEO | 4 à 8 semaines | Sondes `geo-ultimate`, panel Perplexity |
| Link Score interne | prochain crawl hebdomadaire | Screaming Frog, Laurent |

**Ne conclus jamais avant le délai.** Une baisse à J+3 après un changement de
maillage n'est pas un signal — c'est du bruit de recrawl.

**Ne conclus jamais sur une fenêtre courte.** Le 04/09, sept articles marqués
comme publiés totalisaient 9 clics cumulés, ce qui a été lu comme « les articles
ne convertissent pas ». La fenêtre était de quelques jours, quatre des sept
articles étaient en `de-ch`, et l'indicateur pertinent n'est pas le clic mais
l'affaire créée.

---

## Le journal de vérification

Chaque entrée de `JOURNAL.md` porte une rubrique **Vérifié**. Elle distingue
trois états, et l'omission n'est pas une couverture :

| État | Sens |
|---|---|
| **Vérifié** | Contrôlé, avec la commande ou l'URL à l'appui |
| **Supposé** | Tenu pour vrai sans contrôle — dis lequel et pourquoi |
| **Non regardé** | Hors du champ de ce chantier — dis-le explicitement |

Une entrée qui ne dit rien d'une dimension laisse croire qu'elle a été couverte.
Écris ce que tu n'as pas regardé.
