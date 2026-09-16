# 01 — Rayon d'action

**Ce document n'accorde pas des permissions. Il donne la carte des dépendances.**

Laurent connaît cette entreprise mieux que quiconque : il l'a dirigée avant
Sébastien. La question n'est donc pas ce qu'il a le droit de faire — c'est
quartier libre — mais **ce dont les conséquences dépassent le fichier qu'on
modifie**.

Le seul risque à écarter, formulé par Sébastien le 16/09/2026 :

> dégrader l'existant par une action dont les pleines conséquences n'auraient
> pas été prises en compte.

Un site web se dégrade rarement par une décision assumée. Il se dégrade par un
changement qui paraissait local et ne l'était pas.

---

## Trois niveaux de rayon

| Niveau | Ce que ça veut dire | Ce qu'on fait |
|---|---|---|
| **Local** | L'effet ne sort pas du fichier ou de la page. Un revert suffit et rien ne persiste | Tu fais, tu journalises |
| **Large** | D'autres choses en dépendent, ou l'effet survit au revert | Tu établis les conséquences AVANT, tu les déclares dans la PR |
| **Engage l'entreprise** | L'effet sort du site et engage Sysnext vis-à-vis d'un tiers | Arbitrage de Sébastien |

**La grande majorité du travail SEO/GEO est locale.** Corriger un titre, une
meta, une ancre, un lien mort, enrichir un schema, ajouter une redirection,
retravailler un maillage : tu fais, tu journalises, tu merges.

---

## Ce qui survit à un revert — le vrai critère

Un `git revert` ramène le code en trois minutes. Il ne ramène pas :

| Ce qui ne revient pas | Délai de réparation |
|---|---|
| Une page désindexée par un `noindex` ou un `robots.txt` | 3 à 14 jours pour que GSC bouge, 2 à 8 semaines pour retrouver la position |
| L'autorité d'un backlink envoyé vers une mauvaise cible | Parfois jamais |
| Un lead non capturé pendant que le formulaire était cassé | Jamais, et sans aucun signal |
| Un secret poussé sur un dépôt **public** | Jamais — l'historique est public |
| Une URL supprimée dont les liens externes pointaient dessus | Selon les backlinks |

C'est cette colonne qui définit le rayon large, pas la sensibilité apparente du
fichier.

---

## La carte des dépendances

Pour chaque fichier à rayon large : ce qui en dépend, ce qui casse, comment on
le voit, et sous quel délai. **C'est l'outil de travail de ce document.**

### Indexation

| Fichier | Ce qui en dépend | Si on se trompe | Comment on le voit |
|---|---|---|---|
| `lib/seo-config.ts` | **7 fichiers** : `app/sitemap.ts`, `lib/blog.ts`, `i18n/deChCoverage.ts`, et les gabarits `blog/[slug]`, `industrie/[slug]`, `academy/[slug]`, `solutions/[slug]` | Une page réactivée ou désindexée **partout à la fois** : balise robots, sitemap et sélecteur de langue | `node scripts/seo/smoke.mjs` compare noindex attendu et réel. Effet GSC à J+3-14 |
| `public/robots.txt` | Tous les crawlers | Un `Disallow` mal placé désindexe une branche entière du site | Vérifier l'impact **rendu** de chaque ligne, pas sa syntaxe |
| `app/sitemap.ts` | Ce que Google découvre | Pages absentes du sitemap, ou URL fantômes | Le smoke test compte les URL (323 au 16/09) |

### Routage et langues

| Fichier | Ce qui en dépend | Si on se trompe | Comment on le voit |
|---|---|---|---|
| `i18n/routing.ts` (`pathnames`) | **Le type de `Link` dans tout le projet.** Et la forme de toutes les URL localisées | Soit le build casse — cas favorable — soit une URL change de forme en silence : 404 en masse et autorité perdue | `npx tsc --noEmit` pour le type. Le sitemap et le smoke pour les URL |
| `middleware.ts` | La résolution de locale de **chaque requête** | Site entier inaccessible, ou boucle de redirection | Preview : la home doit répondre 200 dans les 3 locales |
| `i18n/deChCoverage.ts` | Le sélecteur de langue, la couverture `de-ch` | Cause structurelle n°1 identifiée par l'audit du 03/09 : l'autorité se déversait sur des pages `noindex` | Se teste **article par article** contre `alternates.json`, jamais par règle globale |
| `lib/hreflang.ts` | Les alternates de toutes les pages | Mauvaise langue servie, ciblage dilué | Le smoke contrôle hreflang et `x-default` |
| `content/blog/alternates.json` (61), `content/guides/alternates.json` (22) | Le sélecteur, les alternates | Retirer une correspondance casse le sélecteur **en silence** | `verifier-json.mjs` pour la forme ; le sélecteur en Preview pour le fond |

### Redirections

| Fichier | Ce qui en dépend | Si on se trompe | Comment on le voit |
|---|---|---|---|
| `cloudflare-worker/src/index.js` | ~1 000 redirections legacy, les 410, **les sous-domaines**, la racine `/` | Le 23/07/2026 : un passthrough vide a 301-é `videos.` vers `www` — **toutes les vidéos produit cassées**. Et les backlinks legacy perdent leur cible | **Non testable en Preview** : le Worker n'y est pas. Témoins en production après déploiement, avec query string neuve |
| `next.config.ts`, bloc `redirects()` | Les URL à préfixe de langue | Une boucle, ou une chaîne 301→301 qui dilue | `e2e/redirections.spec.ts` |

### Rendu et performance

| Fichier | Ce qui en dépend | Si on se trompe | Comment on le voit |
|---|---|---|---|
| `next.config.ts`, bloc `images` | L'optimiseur Vercel — **piste n°1 des 504** (8 à 23 %/jour) | On aggrave ou on masque le problème qu'on cherche à mesurer | `cf_traffic_daily` à J+2, jamais avant |
| `components/seo/SchemaOrg.tsx` | **Tous** les rich results du site. Les `@id` sont partagés entre entités depuis le 08/05 | Perte des rich results partout à la fois. Renuméroter les `@id` casse les liens entre entités | Test des résultats enrichis de Google. Le smoke compte les blocs JSON-LD |
| `package.json` | Tout | Régression invisible en dev, visible en prod | `npx next build` |

### Ce qui ne fait aucun bruit en cassant

| Fichier | Ce qui en dépend | Si on se trompe |
|---|---|---|
| `app/api/**`, `components/forms/**` | La capture des leads | **Un lead perdu ne laisse aucune trace.** Pas d'erreur, pas d'alerte, pas de test automatique. Se vérifie en envoyant un vrai formulaire depuis le Preview |
| `lib/analytics.ts`, `components/analytics/**` | **Les rapports de Laurent lui-même** | Il perd sa propre mesure, et s'en aperçoit des semaines plus tard. GA4 DebugView |
| `lib/pipedrive.ts`, `lib/supabase.ts` | CRM et base | Un lead qui n'arrive pas dans Pipedrive est un lead mort |
| Calculateur ROI : `lib/roiChat/**`, `lib/roiEngine/**`, `app/calculateur-roi`, `roi-pro`, `roi-preview` | Coût API Anthropic **par requête**, et un tunnel de conversion | Une boucle de prompt fait dériver le coût sans erreur visible. `ROI_CHAT_MONTHLY_TOKEN_ALERT` est le garde-fou |

### Fichiers partagés avec Sébastien

Rayon large pour une autre raison : la collision.

| Fichier | Il y fait | Toi | Protocole |
|---|---|---|---|
| `messages/fr.json` / `en.json` / `de-ch.json` (≈ 175 000 lignes) | Contenu de pages, textes marketing | Metas, titres | **Annonce-le dans `ETAT.md` avant d'ouvrir le chantier.** Modifications chirurgicales — un reformatage global rend le fichier immergeable |
| `content/blog/**` | Crée et rédige | Metas, tags, maillage | Ne touche pas `content`, `body`, `faqs` : c'est sa prose |
| `data/content-maillage.ts` | Ajoute les tunnels de ses articles | Maillage global | Rebase avant de pousser ; en conflit, garde ses ajouts |

**`ETAT.md` sert de réservation coopérative** : un chantier qui y nomme ses
fichiers les réserve. Ce n'est pas un verrou technique, c'est une convention qui
marche parce que les deux côtés la respectent.

---

## Ce qui engage l'entreprise — la liste courte

Quatre choses seulement. Elles ne sont pas « sensibles », elles **sortent du
site**.

| Sujet | Pourquoi Sébastien tranche |
|---|---|
| **Prix affichés** — fiches, `Offer`, `priceSpecification` | Conformité distributeur Orbitvu. Une violation a dû être corrigée sur ~9 articles le 30/06/2026. Laurent a lui-même changé d'avis sur ce point en 24 h le 24/07 |
| **Copywriting français client-facing** | Sébastien écrit la voix de la marque. Tu produis la structure, il produit la prose |
| **Suppression définitive d'une URL portant des backlinks** | Irréversible côté autorité |
| **Un secret dans le dépôt** | Le dépôt est **public**. Un jeton poussé est public pour toujours. Seul interdit absolu, et il n'a rien à voir avec la confiance |

Tout le reste — y compris `middleware.ts`, `i18n/routing.ts`, le calculateur, le
bloc `images` — n'est pas interdit. C'est du rayon large : tu établis les
conséquences, tu les déclares, tu fais.

---

## Déclarer le rayon dans une PR

Quand le diff touche un fichier à rayon large, la PR porte une section
**Rayon d'action** qui répond à quatre questions :

```markdown
## Rayon d'action

**Ce qui dépend de ce que je touche** — …
**Ce qui casserait si je me trompe** — …
**Comment je le verrais, et sous quel délai** — …
**Comment je reviens en arrière** — …
```

Le contrôle `garde-consequences` rappelle, fichier par fichier, ce qui en dépend,
et refuse le merge si cette section est absente. **Il ne juge pas la réponse** —
il s'assure que la question a été posée. C'est exactement le risque que Sébastien
a demandé d'écarter : non pas l'action, mais l'action dont les conséquences
n'ont pas été regardées.

Un diff purement local n'a pas besoin de cette section.
