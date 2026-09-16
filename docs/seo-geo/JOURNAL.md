# JOURNAL

Une entrée par intervention. **Plus récent en haut. On n'efface jamais.**

Un contrôle d'intégration refuse toute pull request modifiant le site sans
ajouter d'entrée ici.

---

## Gabarit — à copier

```markdown
## AAAA-MM-JJ · <titre court> · <Claude de Laurent | Claude de Sébastien>

**Chantier** : <référence 06-CHANTIERS, ex. C5> | **PR** : #<n> | **Commit** : `<sha>`

**Quoi** — ce qui a changé, en deux lignes maximum.

**Pourquoi** — le constat ou la mesure qui le justifie. Chiffré si possible.

**Fichiers** — `chemin/a.ts`, `chemin/b.json`

**Effet attendu** — ce qui devrait bouger, et sous quel délai.

**Vérifié** — commandes lancées, URL contrôlées, résultat.
**Supposé** — ce qui est tenu pour vrai sans contrôle, et pourquoi.
**Non regardé** — ce qui sort du champ de ce chantier. Ne pas laisser vide sans raison.

**Suite** — ce que ça ouvre, ce que ça bloque, ce qu'il reste.
```

Les trois rubriques **Vérifié / Supposé / Non regardé** ne sont pas
décoratives : le silence sur une dimension laisse croire qu'elle a été couverte.

---

## 2026-09-16 · Clôture de C1 et piège de la traduction Chrome · Claude de Sébastien

**Chantier** : C1 | **PR** : #4

**Quoi** — Trois suites du déploiement de C1. `/fr/outil-financement` passe
d'« écart attendu » à **contrôle ferme** dans `smoke.mjs` : le `noindex` étant
en production, une page redevenue indexable serait désormais une régression.
Nouveau piège **B5** sur la traduction automatique de Chrome. `ETAT.md` clôturé.

**Pourquoi** — Une attente qu'on ne referme pas devient un contrôle qui ne
contrôle plus rien. Et le piège B5 a coûté un faux diagnostic dans l'heure : il
en coûtera d'autres à qui fera une recette `de-ch` sans le savoir.

**Vérifié** — Smoke test post-déploiement, 17 pages, 3 ressources, 0 écart.
HTML serveur de `/de-ch/branchen/schmuck` : 314 Ko, zéro marqueur français,
barre de traduction Chrome confirmée par `find`.

**Non regardé** — Le rendu mobile de la nouvelle colonne de footer. Les
redirections du Worker, qui ne sont couvertes par aucun de ces contrôles.

---

## 2026-09-16 · Correctifs de l'audit du 03/09 — sélecteur de langue, rich results, footer · Claude de Sébastien

**Chantier** : C1 | **PR** : #3 | **Commit** : `0e8949f`, livré le 04/09, mergé le 16/09

**Quoi** — Mise en production des correctifs de l'audit SEO du 03/09, livrés en
branche le 04/09 et restés douze jours sans merge.

● **Sélecteur de langue**, article par article via `alternates.json` : une ancre
  DE-CH ne pointe plus jamais vers `/en`, et aucune ancre ne pointe vers une page
  `/en` en `noindex` — repli sur le hub EN indexable
● `resolveNavHref` réécrit les 8 secteurs traduits en slug allemand
● Couverture `de-ch` blog et guides dérivée d'`alternates.json`, ce qui répare
  les « articles liés » en DE
● `besoins-photographie-produit` et `PackshotLandingTemplate` passés en `NavLink`
  — c'étaient les `Link` bruts à l'origine des chaînes 307→404 sur les secteurs
  DE-CH et du 404 sur `/de-ch/academy`
● Messages blog `de-ch` et listing des guides en allemand, au lieu de copies FR
● `price` au niveau `Offer` sur 42 fiches — mensualité de leasing, décision D7
● E-Comm Studio+ à 130 000 € HT dans les deux catalogues
● Product isolé retiré de la page d'accueil
● Footer : colonne « Nos studios », 13 fiches machines plus le sélecteur
● `/fr/outil-financement` en `noindex,follow` et hors sitemap

**Pourquoi** — L'audit du 03/09 identifie le sélecteur de langue comme **cause
structurelle n°1** du recul : il déversait le Link Score sur des pages `/en` en
`noindex`. 20 pages `/en` à 99-100 contre 86 pour `/fr`, et des fiches machines
à 5-30. Trafic organique : 1 857 clics/mois en janvier, 524 en août.

**Fichiers** — 16 : `i18n/deChCoverage.ts`, `components/seo/SchemaOrg.tsx`,
`app/sitemap.ts`, `components/layout/{Footer,NavLink}.tsx`,
`components/blog/RelatedArticles.tsx`,
`components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/page.tsx`,
`app/[lang]/besoins-photographie-produit/page.tsx`, `app/[lang]/guide/page.tsx`,
`app/[lang]/outil-financement/layout.tsx`, les 2 catalogues de machines, et
`messages/{fr,en,de-ch}.json`.

**Effet attendu** — Link Score `/fr` supérieur à `/en` au prochain crawl
Screaming Frog. Position sur « packshot creator » : `/fr` à 28,9 contre `/en` à
1,9 aujourd'hui, à mesurer sur 4 à 6 semaines. Retour des rich results Product
avec un `Offer` valide. Fin des 404 sur les secteurs DE-CH.

**Vérifié** — `tsc` vert, 183 JSON valides, merge de `main` sans conflit, CI de
la PR vert avant merge. 23 URL avaient été contrôlées en local à la livraison du
04/09. Smoke test sur l'origine après déploiement.

**Supposé** — Que les 23 URL contrôlées le 04/09 couvrent les cas de bord du
sélecteur. Le diff n'a pas été relu ligne à ligne dans cette session.

**Non regardé** — Le rendu visuel de la nouvelle colonne de footer sur mobile.
L'effet réel sur le Link Score, qui dépend du prochain crawl de Laurent.

**Résultat du contrôle post-déploiement, 16/09** — `smoke.mjs` sur l'origine de
production, les quatre signaux attendus sont là :

| Signal | Avant | Après |
|---|---|---|
| `/fr/outil-financement` | `index` | **`noindex`** |
| Sitemap | 323 URL | **322 URL** |
| JSON-LD page d'accueil | 26 blocs | **24 blocs** (Product isolé retiré) |
| Écarts attendus | 1 | **0** |

17 pages témoins vertes sur les trois locales. Contrôle visuel de
`/de-ch/branchen/schmuck` en production : rendu allemand correct — voir le piège
B5, la traduction automatique de Chrome a d'abord fait croire à une dégradation
vers le français.

**Suite** — Laurent doit lancer le contrôle post-déploiement L.3 : recrawl
Screaming Frog (liens d'en-tête non-200 ramenés à 0, Link Score `/fr` > `/en`)
et inspection d'URL sur les 17 URL de l'annexe L.1. C'est son test, il l'attend
depuis le 04/09.

---

## 2026-09-16 · Vérification au dashboard — le diagnostic bots IA était faux · Claude de Sébastien

**Chantier** : C2 | **PR** : #2

**Quoi** — Contrôle de la configuration Cloudflare et GitHub avant de prescrire
quoi que ce soit à Laurent. Deux corrections.

**① Le correctif « allowlist des 7 bots IA, 10 minutes » ne s'applique pas.**
Les AI bot policies sont **déjà toutes sur Allow** (Search, Agent, Training),
AI Labyrinth désactivé. Le blocage vient de Super Bot Fight Mode — « Definitely
automated traffic » → Managed Challenge, avec Javascript Detections actif : un
crawler IA n'exécute pas de JS, donc il est classé automated et reçoit un
challenge insoluble. La règle WAF n°1 ne fait un Skip que sur `Known Bots`, la
liste vérifiée par IP de Cloudflare, où les crawlers IA ne figurent pas tous.
Le vrai correctif est une règle WAF de Skip, sur le modèle de la règle n°4
« Skip SBFM videos R2 ».

**② Le jeton `psc-n8n-publisher` est bien expiré** — confirmé au dashboard
GitHub, dernier usage il y a moins de trois semaines. Le pipeline n8n de Laurent
est à l'arrêt. Quatre autres jetons (Jade) n'ont aucune date d'expiration.

**Pourquoi** — Règle R7 : une instruction humaine se vérifie contre le réel.
Laurent a écrit cette prescription sans accès au dashboard. Envoyer son Claude
ouvrir une allowlist déjà ouverte lui aurait fait perdre une session.

**Vérifié** — Au dashboard, le 16/09 : AI bot policies (3 sur Allow), AI
Labyrinth off, Bot Preference Sync off, Super Bot Fight Mode (Definitely
automated = Managed Challenge, JS Detections on, Static resource protection off,
Verified bots on), les 4 règles WAF personnalisées avec leur ordre et leur état,
et l'expiration du jeton GitHub.

**Supposé** — Que les taux de blocage mesurés par Laurent le 04/09 valent
encore. Les AI bot policies étant aujourd'hui permissives, elles ont pu changer
depuis.

**Non regardé** — Les analytics de bots de Cloudflare sur les 7 derniers jours,
qui trancheraient. C'est le premier geste du chantier C2 : remesurer.

**Suite** — Aucune règle WAF n'a été modifiée. C'est une modification de règle
WAF qui a cassé toutes les vidéos produit le 23/07 : ce geste demande une mesure
fraîche et une main humaine.

---

## 2026-09-16 · Reprise du mandat — de la permission à la conséquence · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #2

**Quoi** — Le cadre passe d'un modèle de permissions à un modèle de
conséquences. `01-PERIMETRE.md` (zones verte, orange, rouge) devient
`01-RAYON-ACTION.md` : une carte des dépendances. Le contrôle
`garde-perimetre`, qui bloquait des fichiers, devient `garde-consequences`, qui
affiche ce qui dépend de ce qui est touché et exige que la PR le déclare.

**Pourquoi** — Correction de Sébastien : « Laurent est l'ancien propriétaire de
la société, c'est une personne de confiance. Le seul risque qu'il faut ôter est
celui d'une dégradation de l'existant par des actions dont les pleines
conséquences n'auraient pas été prises en compte. Pour le reste il a quartier
libre. »

La première version était calibrée sur un prestataire extérieur inconnu et
interdisait des fichiers qui sont, en pratique, du cœur du SEO :
`i18n/routing.ts` porte l'architecture des URL, `middleware.ts` le routage de
langue, `next.config.ts` le bloc `images` qui est la piste n°1 des 504. Les
fermer revenait à interdire le diagnostic en même temps que le risque.

**Fichiers** — `docs/seo-geo/01-RAYON-ACTION.md` (remplace `01-PERIMETRE.md`),
`scripts/seo/verifier-consequences.mjs` (remplace `verifier-perimetre.mjs`),
`.github/workflows/garde-consequences.yml`, `.github/pull_request_template.md`,
`.github/CODEOWNERS`, `CLAUDE.md` (règle R8), et les 8 documents qui s'y
référaient.

**Effet attendu** — Laurent peut instruire les 504 et l'architecture d'URL, qui
étaient fermés par erreur. Le seul point de passage est la déclaration des
conséquences, qui est justement ce que Sébastien demande.

**Vérifié** — `garde-consequences` testé sur trois scénarios : diff local
(passe sans rien exiger), rayon large sans déclaration (bloque en affichant la
carte), rayon large déclaré (passe). Plus aucune référence aux zones dans la
documentation, hors l'historique de `DECISIONS.md` qui doit la garder.

**Supposé** — Que la section « Rayon d'action » sera remplie de bonne foi. Le
contrôle vérifie qu'elle existe et qu'elle a de la substance, pas qu'elle est
juste. C'est assumé : le but est de faire poser la question, pas de noter la
réponse.

**Non regardé** — L'avis de Laurent sur ce cadre, toujours pas sollicité.

**Suite** — D13 consigne l'arbitrage. D12 est réécrite dans ses termes.

---

## 2026-09-16 · Mise en place de la gouvernance SEO/GEO · Claude de Sébastien

**Chantier** : gouvernance | **PR** : à ouvrir | **Commit** : branche `docs/gouvernance-seo-geo`

**Quoi** — Création du cadre permettant à Laurent et à son Claude de conduire le
SEO/GEO en autonomie : `CLAUDE.md` à la racine, huit documents dans
`docs/seo-geo/`, quatre fichiers de passerelle vivants, trois workflows
d'intégration continue, un gabarit de pull request, un script de contrôle de
production.

**Pourquoi** — `main` n'avait pas bougé depuis le 04/09/2026, soit douze jours,
alors que le correctif de la cause structurelle n°1 attendait en branche. Le
goulot n'était ni la compétence ni les idées, mais la disponibilité de
Sébastien pour relire et merger. Le trafic organique est passé de 1 857 à
524 clics par mois entre janvier et août, soit -71,8 %.

**Fichiers** — `CLAUDE.md`, `docs/seo-geo/**` (13 fichiers),
`.github/workflows/**` (3), `.github/pull_request_template.md`,
`.github/CODEOWNERS`, `scripts/seo/smoke.mjs`, `playwright.config.ts`

**Effet attendu** — Laurent peut livrer sans attendre Sébastien sur la zone
verte. Les régressions mécaniques sont interceptées avant la production. Les
deux Claude restent synchronisés sans échange de mails.

**Vérifié** — Périmètre technique établi par lecture directe du dépôt et de
l'API GitHub : `origin/main` figé à `ff5658b` depuis le 04/09 · branche
`feat/audit-laurent-0309` poussée et non mergée · `lwainberg` dispose du droit
d'écriture · le ruleset `protect-main` ne bloque que la suppression et le
force-push, sans exiger de PR ni de contrôle · aucun workflow d'intégration
continue n'existait · aucun `CLAUDE.md` n'existait · 26 des 30 documents suivis
à la racine datent de janvier à mars 2026 · Vercel déploie automatiquement, en
Production sur `main` et en Preview sur branche · `lib/supabase.ts` lève au
chargement du module sans `NEXT_PUBLIC_SUPABASE_URL`, donc le build échoue sans
variables d'environnement · `lib/seo-config.ts` est importé par sept fichiers ·
aucun `loading.tsx` n'existe dans `app/` · `alternates.json` contient 61 entrées
pour le blog et 22 pour les guides.

**Supposé** — Le jeton `psc-n8n-publisher` a expiré le 10/09 (date issue de
l'historique projet, non vérifiable via l'API avec les droits actuels) · la
production du Worker diverge encore du dépôt (dernier constat du 03/09) · les
taux de blocage des bots IA sont ceux mesurés par Laurent le 04/09 · les taux de
504 proviennent de `cf_traffic_daily`, base à laquelle cette session n'a pas
accès.

**Non regardé** — L'état réel de la production ce jour (aucun test en ligne
n'a été fait) · le contenu détaillé de la branche `feat/audit-laurent-0309`,
non relu ligne à ligne · la configuration Cloudflare actuelle, WAF, bots et
Worker déployé · la base Supabase de Laurent · le comportement réel des trois
workflows d'intégration continue, qui ne peuvent s'exécuter qu'une fois la
première pull request ouverte.

**Suite** — Le document `06-CHANTIERS.md` liste treize chantiers, dont trois en
P0.

---

### Complément du 16/09 — le cadre a été testé sur lui-même

La PR #2 a servi de premier passage. **Les trois workflows sont verts** :
garde-périmètre 8 s, garde-journal 7 s, contrôles de PR 1 min 48 s — `npm ci`,
`tsc`, intégrité des 186 JSON, lint et `next build` complet avec variables
d'environnement factices.

Deux protections ont été découvertes en écrivant, et closes :

**1. Cloudflare bloque les scripts par empreinte TLS.** Sur
`www.packshot-creator.com`, 17 pages HTML sur 17 répondent 403 malgré un
user-agent Chrome complet ; seuls les fichiers statiques passent, ce qui donne
l'illusion que le site répond. La cible de contrôle automatisé est donc
`https://sysnext.vercel.app`, origine du déploiement de production — même HTML,
sans l'étage Cloudflare.

**2. Les Preview Vercel sont protégés par SSO.** 20 requêtes sur 20 redirigées
vers `vercel.com/sso-api`. Sans jeton de contournement, la porte « Preview
contrôlée » de la procédure ne peut pas être franchie. Le smoke test accepte
désormais `VERCEL_AUTOMATION_BYPASS_SECRET` et reconnaît les deux protections
au lieu de les signaler comme des pannes.

Trois gestes deviennent des prérequis à l'autonomie de Laurent, inscrits dans
`ETAT.md` : créer le jeton de contournement Vercel, ajouter `lwainberg` à
l'équipe Vercel, créer le libellé `zone-rouge-autorisee`.

**Écart réel remonté par le premier contrôle** : `/fr/outil-financement` n'est
pas en `noindex` en production — le correctif attend dans
`feat/audit-laurent-0309` (chantier C1). Marqué comme écart attendu dans le
script, à repasser en contrôle ferme au merge de C1.
