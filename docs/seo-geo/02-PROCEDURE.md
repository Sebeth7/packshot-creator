# 02 — Procédure

La séquence complète, du départ au contrôle post-déploiement. Elle ne se
raccourcit pas.

```
main ──┬──> branche seo/<sujet>-<AAAA-MM-JJ>
       │       │
       │       ├──> push ──> Preview Vercel (URL auto) + CI GitHub Actions
       │       │
       │       ├──> Pull Request (gabarit imposé)
       │       │
       │       └──> CI verte + Preview contrôlée
       │                │
       └<── merge ──────┘
              │
              └──> PRODUCTION en ~3 min ──> smoke test ──> entrée JOURNAL
```

---

## Étape 0 — Se synchroniser

```bash
git fetch origin
git status                      # doit être propre ; sinon, voir la règle R6
git checkout main
git pull origin main
```

Puis les **quatre lectures** de `README.md` : `/CLAUDE.md`, `ETAT.md`,
`BOITE-AUX-LETTRES.md`, `JOURNAL.md`.

---

## Étape 1 — Réserver et brancher

```bash
git checkout -b seo/<sujet>-$(date +%Y-%m-%d)
```

Convention de nommage : `seo/<sujet>-<date>`.
Exemples : `seo/hreflang-secteurs-2026-09-20`, `seo/schema-offer-2026-10-02`.

Puis **inscris ton chantier dans `ETAT.md`** avec les fichiers que tu vas
toucher, commite et pousse tout de suite :

```bash
git add docs/seo-geo/ETAT.md
git commit -m "chore(seo): ouverture chantier <sujet>"
git push -u origin seo/<sujet>-<date>
```

Cette inscription est ta réservation. Elle évite la collision avec le Claude de
Sébastien (voir `01-PERIMETRE.md`).

---

## Étape 2 — Travailler

Pendant le travail, à répétition :

```bash
npx tsc --noEmit        # rapide, à lancer souvent
```

Avant de considérer le travail terminé :

```bash
npx next build          # OBLIGATOIRE — règle R1
```

Le build a besoin de variables d'environnement. Si tu n'as pas de `.env.local`,
des valeurs factices suffisent pour compiler :

```bash
NEXT_PUBLIC_SUPABASE_URL=https://exemple.supabase.co \
NEXT_PUBLIC_SUPABASE_ANON_KEY=factice \
SUPABASE_SERVICE_ROLE_KEY=factice \
npx next build
```

Sans `NEXT_PUBLIC_SUPABASE_URL`, `lib/supabase.ts` lève au chargement du module
et le build échoue — ce n'est pas ton code qui est en cause.

### Commits

Format : `type(portee): description en français`

```
fix(seo): hreflang manquant sur les 17 pages secteurs
feat(geo): bloc de réponse directe sur le hub industrie
fix(worker): 301 vers /fr/industrie/horlogerie au lieu du 404
chore(seo): ouverture chantier maillage machines
```

Types utilisés : `fix`, `feat`, `chore`, `docs`, `test`.

---

## Étape 3 — Le rituel de sortie

Avant d'ouvrir la PR, les **trois écritures** :

1. `JOURNAL.md` — une entrée en haut, gabarit dans le fichier
2. `ETAT.md` — mettre à jour la ligne du chantier
3. `DECISIONS.md` — seulement si un arbitrage structurant a été rendu

Le CI refuse la PR si `JOURNAL.md` n'a pas bougé alors que le site a changé.

---

## Étape 4 — Ouvrir la pull request

```bash
git push
gh pr create --fill
```

Le gabarit `.github/pull_request_template.md` se remplit automatiquement. Il
exige cinq rubriques :

| Rubrique | Ce qu'on attend |
|---|---|
| **Quoi** | Ce qui change, en une phrase |
| **Pourquoi** | Le constat ou la mesure qui le justifie |
| **Effet SEO attendu** | Ce qui devrait bouger, et sous quel délai |
| **Risque** | Ce qui peut casser, et comment on le verrait |
| **Rollback** | La commande exacte pour revenir en arrière |

Une PR sans « Effet SEO attendu » mesurable n'est pas prête. Si tu ne sais pas
ce que le changement doit produire, tu ne sais pas non plus s'il a marché.

---

## Étape 5 — Les deux portes

### Porte 1 : le CI

Trois workflows se déclenchent. Tous doivent être verts.

| Workflow | Ce qu'il vérifie |
|---|---|
| `pr-checks` | `tsc --noEmit`, `next build`, validité des JSON, lint |
| `garde-perimetre` | Le diff ne touche pas la zone rouge |
| `garde-journal` | `JOURNAL.md` a bien une entrée nouvelle |

Si `garde-perimetre` échoue : tu as touché la zone rouge. Ce n'est pas un bug du
CI. Retire le changement, ou écris dans `BOITE-AUX-LETTRES.md`.

### Porte 2 : le Preview Vercel

Vercel publie automatiquement une URL de prévisualisation sur chaque branche.
Le lien apparaît en commentaire de la PR.

**Contrôle obligatoire sur le Preview** — voir `07-VERIFICATION.md` pour le
détail. Au minimum :

```bash
npx playwright test e2e/seo.spec.ts --project=chromium
# avec PLAYWRIGHT_BASE_URL pointant sur l'URL du Preview
```

Plus un contrôle visuel dans le navigateur des pages que tu as touchées.

Le Preview a une limite qu'il faut connaître : **il ne passe pas par le Worker
Cloudflare**. Un changement de redirection dans le Worker n'y est donc pas
testable. Voir `05-INFRA.md`.

---

## Étape 6 — Merger

**Zone verte, CI verte, Preview contrôlée → tu merges toi-même.**

```bash
gh pr merge --squash --delete-branch
```

**Zone orange → tu ne merges pas.** Tu inscris dans `ETAT.md` :
`en attente d'arbitrage de Sébastien — PR #<n>`, et tu passes à autre chose.

Le merge déclenche la production. Il n'y a pas d'autre confirmation.

---

## Étape 7 — Le contrôle post-déploiement

**Dans les 15 minutes qui suivent le merge**, pas le lendemain.

```bash
node scripts/seo/smoke.mjs https://sysnext.vercel.app
```

`sysnext.vercel.app` est l'origine du déploiement de production — le même HTML
que `www`, sans l'étage Cloudflare. C'est la seule cible de production
atteignable par un script (règle R4).

Le script contrôle 17 URL témoins sur les trois locales : statut HTTP,
canonical, hreflang, `noindex`, `title`, `sitemap.xml`, `robots.txt`,
`llms.txt`.

Puis un contrôle **dans Chrome** sur `www.packshot-creator.com`, pour les pages
modifiées. C'est le seul moyen de voir ce que voit un visiteur, Worker et WAF
compris.

Enfin : complète l'entrée `JOURNAL.md` avec le résultat du contrôle.

---

## Rollback

Si le contrôle révèle une régression :

```bash
git checkout main && git pull
git revert <sha-du-merge> -m 1
git push origin main
```

Retour en production en ~3 minutes. **On revert d'abord, on comprend ensuite.**
Puis on note l'incident dans `JOURNAL.md` et, si c'est un piège nouveau, dans
`03-PIEGES.md`.

### Quand un revert ne suffit pas

Un revert ramène le code, pas l'index Google. Si un `noindex` ou un `robots.txt`
fautif est passé en production :

1. Revert immédiat
2. Demander à Laurent une inspection d'URL dans Search Console sur les pages
   touchées, avec demande de réindexation
3. Compter 3 à 14 jours avant que GSC reflète la correction

C'est la raison pour laquelle `noindex` et `robots.txt` méritent une relecture
de plus que le reste.

---

## Rythme et cadence

| Élément | Repère |
|---|---|
| Taille d'une PR | Un sujet, un chantier. Une PR de 40 fichiers n'est pas relisible |
| Fréquence | Plusieurs petites PR valent mieux qu'une grosse par mois |
| Délai de mesure d'un effet SEO | 2 à 6 semaines. Ne pas conclure avant |
| Délai d'une réponse dans la boîte aux lettres | Quelques jours |

**Ne jamais empiler plusieurs chantiers dans une seule PR** : si l'un régresse,
le revert emporte les autres.
