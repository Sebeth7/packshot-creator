# 08 — Preview Vercel et validation de Sébastien

Le circuit qui permet à Sébastien de voir la vraie page **avant** sa
publication, sans rien publier pour la lui montrer. Décision : D39.

```
branche ──> PR brouillon ──> CI verte ──> Preview « Ready »
        ──> contrôle du rendu (desktop, 390 px, SEO)
        ──> lien + dossier de validation court envoyés à Sébastien
        ──> GO ou corrections ──> fusion ──> production
```

Cinq états à ne jamais confondre :

| Ceci | N'est pas cela |
|---|---|
| Preview | Production |
| CI verte | Validation éditoriale |
| PR brouillon | Publication |
| URL accessible | URL indexée |
| Vercel « Ready » | Sébastien a accès |

---

## 1. Ce que Vercel fait à chaque push — mesuré le 30/09/2026

Sur #59, #60 et #64 (voir `JOURNAL.md`, entrée du 30/09) :

| Étape | Trace visible | Où la lire |
|---|---|---|
| Push sur la branche | Déploiement Preview du projet `sysnext` | — |
| Build terminé | Statut de commit `Vercel` sur le SHA de tête : `success`, « Deployment has completed », lien vers l'inspecteur Vercel | PR → onglet « Checks », ou pied de la PR |
| Commentaire | Commentaire `vercel[bot]` créé au premier déploiement, **mis à jour sur place** à chaque push (horodatage « Updated ») | PR → fil de conversation |

Le commentaire du robot porte le lien **Preview** : c'est l'alias de branche.

Aucun `vercel.json` ni `ignoreCommand` dans le dépôt. Un « Ignored Build Step »
réglé au dashboard n'est pas vérifiable d'ici : un push sans statut `Vercel`
sur sa tête est le signe à surveiller.

---

## 2. Quelle URL envoyer

| URL | Forme | Change à chaque push ? | Usage |
|---|---|---|---|
| **Alias de branche** | `sysnext-git-<branche tronquée + hash>-sebs-projects-ca1e93a7.vercel.app` | Non : pointe toujours sur le dernier déploiement de la branche | **Celle à envoyer à Sébastien** |
| URL de déploiement | `sysnext-<hash>-sebs-projects-ca1e93a7.vercel.app` | Oui : une par commit, figée | Preuve d'une version exacte ; lisible depuis l'inspecteur Vercel |
| Inspecteur | `vercel.com/sebs-projects-ca1e93a7/sysnext/<id>` | Oui | Dashboard, membres de l'équipe seulement. Ne pas envoyer comme lien de page |

Source : documentation Vercel, « Accessing Deployments through Generated URLs »
(<https://vercel.com/docs/deployments/generated-urls>) : l'URL de branche
« won't change if you push new commits to the branch ». Observé le 30/09 sur
#65 : deux pushes, deux déploiements, un seul alias.

L'alias est tronqué avec un hash quand le nom de branche est long
(`seo/ai-act-images-produit-pilier-2026-09-29` →
`sysnext-git-seo-ai-act-images-pro-f5e685-…`). **Il ne se calcule pas : il se
lit** dans le commentaire du robot.

**Règle d'envoi** : alias de branche + chemin de la page, **accompagné du SHA de
tête**. L'alias suit la branche : un GO vaut pour la tête indiquée. Aucun push
pendant la relecture ; si un push devient nécessaire, renvoyer le lien avec la
nouvelle tête et ce qui a changé.

---

## 3. Protection et accès

### Ce qui est mesuré

Toutes les Preview contrôlées le 30/09 (pages, `robots.txt`, fichiers
`/_next/static`) répondent sans authentification :

```
HTTP/2 302
location: https://vercel.com/sso-api?url=<page demandée>&nonce=…
set-cookie: _vercel_sso_nonce=…; Max-Age=3600; Secure; HttpOnly; SameSite=Lax
x-robots-tag: noindex
```

C'est **Vercel Authentication** (champ d'API `ssoProtection` : d'où « SSO » dans
cette documentation). Une valeur factice de `x-vercel-protection-bypass`, en
paramètre d'URL, ne passe pas. L'origine de production `sysnext.vercel.app` répond 200 sans
authentification. Le réglage exact (Standard Protection ou variante) n'est pas
lisible sans le dashboard ; une protection par mot de passe n'a pas été observée.

**Un 302 vers `vercel.com/sso-api` n'est pas une panne** (voir `07-VERIFICATION.md`).

### Qui peut ouvrir une Preview

D'après la documentation Vercel
(<https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication>) :

| Qui | Comment |
|---|---|
| Membre de l'équipe `sebs-projects-ca1e93a7` (Viewer et au-delà), connecté à Vercel dans le navigateur | Automatique : redirection, puis cookie posé pour cette URL |
| Utilisateur Vercel ayant demandé l'accès et l'ayant obtenu | Accès au dernier déploiement de la branche |
| Détenteur d'un lien partageable (« Anyone with the link ») | Sans compte Vercel |
| Script muni du jeton de contournement | En-tête `x-vercel-protection-bypass` |

Le cookie d'authentification vaut **pour une seule URL** : l'alias de branche et
l'URL de déploiement demandent chacun leur passage (automatique pour un membre
connecté).

### Sébastien

**Accès non établi par les sources du dépôt.** Le dépôt montre qu'il décide des
accès de l'équipe (D14 : c'est lui qui a arbitré le rôle de Laurent) et qu'un retour de
sa part a été rendu « sur la Preview » de F5 le 28/09 (`JOURNAL.md`), sans dire
comment il l'a ouverte. [Inférence] Connecté à Vercel avec son compte d'équipe,
il passe automatiquement.

**Vérification au premier envoi** : lui demander ce qu'il voit en ouvrant le
lien.

| Il voit | Conséquence |
|---|---|
| La page | Accès vérifié ; le noter dans `ETAT.md` |
| L'écran de connexion Vercel | Se connecter avec le compte de l'équipe |
| « Request access » | Son compte connecté n'a pas l'accès : **ne pas contourner**. Modification d'accès à décider par Laurent (section 6) |

### Ce que ce circuit ne fait jamais sans GO de Laurent

Désactiver ou modifier la protection, créer un lien partageable, approuver une
demande d'accès, inviter un membre, changer un domaine, toucher aux variables
d'environnement ou à Cloudflare. Désactiver Vercel Authentication **déprotège
tous les déploiements existants** (documentation Vercel).

---

## 4. Indexation et risques

**`PREVIEW_INDEXABLE = NO`** au 30/09 :
- sans authentification, un robot ne reçoit qu'un 302 vers `vercel.com` ;
- chaque réponse porte `X-Robots-Tag: noindex`. Vercel l'annonce sur toute
  Preview d'un domaine `.vercel.app` (<https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines>) ;
  sur une réponse 200 authentifiée, non observé faute de jeton ;
- le HTML émet un canonical absolu vers `www.packshot-creator.com`
  (`metadataBase`, `app/layout.tsx`), quel que soit l'hôte.

Aucune modification de configuration n'est justifiée par ce constat.

| Risque | État | Geste |
|---|---|---|
| Formulaires | `app/api/contact` appelle Resend et Pipedrive si les variables sont présentes dans l'environnement Preview — non vérifiable d'ici | Sébastien n'envoie pas de formulaire depuis une Preview, sauf test annoncé |
| Calculateur ROI | Appels API Anthropic facturés à la requête (`01-RAYON-ACTION.md`) | Pas de conversation de test sur une Preview sans raison |
| GA4 | Chargé si `NEXT_PUBLIC_GA_MEASUREMENT_ID` existe en Preview et si le visiteur consent — non vérifiable d'ici | Refuser les cookies d'analyse sur une Preview |
| Jeton de contournement | Secret ; dans une URL, il fuit dans l'historique et les journaux | Jamais dans un message, une PR ou le dépôt (public) |
| Lien partageable | Toute personne qui reçoit le lien voit la page, y compris par transfert | Seulement sur GO de Laurent, révoqué après usage |
| Marqueurs internes | Une Preview montre tout ce que contient la branche (`[TERRAIN …]`, `NON TRANCHÉ`…) | Les signaler dans le dossier comme attendus, ou les retirer avant envoi |
| Origine `sysnext.vercel.app` | Production, 200, ni `X-Robots-Tag` ni balise `robots` au 30/09 | Hors de ce circuit : D36, non exécutée |

---

## 5. Retrouver PR, tête, Preview et statut

**Dans le navigateur** (le plus simple) : la PR → commentaire `vercel[bot]` →
colonne « Preview » (alias de branche) et « Deployment » (« Ready ») ; la tête
dans l'onglet « Commits » ; le statut `Vercel` dans « Checks ».

**Claude de Laurent, session cloud** (outils GitHub MCP, vérifié le 30/09) :
`pull_request_read` avec `get` (tête), `get_status` (statut `Vercel` de la
tête), `get_comments` (commentaire `vercel[bot]`). La ligne `[vc]: #…:<base64>`
du commentaire se décode en JSON : `previewUrl`, `inspectorUrl`,
`nextCommitStatus`.

**Avec `gh`** — [Non vérifié] sur le poste de Laurent :

```bash
REPO=Sebeth7/packshot-creator; PR=59
SHA=$(gh pr view "$PR" --repo "$REPO" --json headRefOid -q .headRefOid); echo "$SHA"
gh api "repos/$REPO/commits/$SHA/status" \
  -q '.statuses[] | select(.context=="Vercel") | "\(.state) \(.description)"'
gh api "repos/$REPO/issues/$PR/comments" \
  -q '.[] | select(.user.login=="vercel[bot]") | .body' \
  | sed -n 's/^\[vc\]: #[^:]*:\(.*\)$/\1/p' | base64 -d \
  | jq -r '.projects[] | "\(.previewUrl) \(.nextCommitStatus)"'
```

Un script `scripts/seo/preview-pr.mjs` (Node, API GitHub publique, sans
dépendance) pourrait rendre `PR / HEAD / PREVIEW_URL / STATUS` : proposé, non
créé.

---

## 6. Le circuit

| # | Étape | Qui | Critère de sortie |
|---|---|---|---|
| 1 | Branche, PR brouillon | Claude de Laurent | PR ouverte |
| 2 | CI | GitHub Actions | 3 contrôles verts sur la tête |
| 3 | Preview | Vercel | Statut `Vercel` = `success` sur **la même tête** |
| 4 | Contrôle du rendu | Laurent dans le navigateur, ou script avec jeton | Checklist (section 8) passée |
| 5 | Envoi | Laurent | Dossier de validation (section 9) : lien, tête, 3 à 6 points |
| 6 | Retour | Sébastien | GO, ou liste courte de corrections |
| 7 | Corrections | Claude de Laurent | Nouvelle tête ; retour à 2 ; renvoi limité à ce qui a changé |
| 8 | Fusion | Laurent (D12) | Selon le régime ci-dessous |
| 9 | Contrôle de production | Claude de Laurent, puis Laurent sur `www` | `smoke.mjs` sur `sysnext.vercel.app`, Chrome sur `www` (R4) |

### Concerné

Nouvel article, nouvelle page ou landing, page commerciale, refonte visible
d'un gabarit, changement éditorial significatif (sens, promesse, chiffre,
section entière, structure). En cas de doute : envoyer.

### Non concerné

Correctifs techniques sans effet visible (JSON-LD, balises, redirections,
sélecteur de langue), corrections typographiques ponctuelles, documentation.
Ils restent sous D12 : CI verte et Preview contrôlée par Laurent.

### Le régime de validation ne change pas

| Nature | Validation de Sébastien | Source |
|---|---|---|
| Création de page ou d'article | **Explicite** : GO requis avant fusion | D15, D16 |
| Prix affichés, suppression d'URL à backlinks, engagement vis-à-vis d'un tiers | **Explicite** | D13, D15 |
| Réécriture de contenu existant | **Tacite** : 5 jours ouvrés sans objection. La Preview transmise lui donne de quoi objecter ; elle ne crée pas de GO obligatoire | D15 |
| Technique, non client-facing | Aucune transmission | D12 |

Aucun silence ne vaut GO hors du cas tacite de D15.

---

## 7. Nouvel article : FR, puis EN et de-ch (D38)

| Phase | Contenu | Preview | Sébastien |
|---|---|---|---|
| 1 | FR finalisé, faits et sources contrôlés | Preview FR | Valide prose, cas métier, rendu |
| 2 | EN et de-ch créés **depuis le FR validé** (tête citée) ; de-ch adapté au droit suisse, jamais transposé de l'UE | — | — |
| 3 | Trois langues : hreflang, `alternates.json`, données structurées, FAQ | Preview des trois URL, même branche | Contrôle final, puis publication simultanée |

Aucune traduction avant la validation du FR. Phase 3 : une seule branche, une
seule fusion, pour une publication coordonnée.

---

## 8. Checklist visuelle standard

**Desktop (1440 px)** — hero ; largeur de l'article ; tableaux ; images ;
espacements ; CTA ; footer.

**Mobile (≈ 390 px)** — aucun débordement horizontal ; images non recadrées à
tort ; tableaux défilables ; CTA lisibles ; FAQ correcte.

**SEO** (code source de la page) — `title` ; meta description ; canonical vers
`www` ; balise `robots` attendue ; hreflang quand applicable ; données
structurées (`Article`, `BreadcrumbList`, `FAQPage` = FAQ visible) ; image OG.
L'en-tête `X-Robots-Tag: noindex` de la Preview est normal et ne part pas en
production.

**Contenu** — aucun placeholder, aucun marqueur interne, aucun texte de
travail, aucun asset manquant. Exception : les marqueurs destinés à Sébastien
lors d'une passe terrain, listés comme tels dans le dossier.

---

## 9. Le dossier de validation — gabarit

Court. Sébastien regarde une page ; il ne lit pas un rapport.

```text
VALIDATION SÉBASTIEN

PAGE : <titre> — <chemin>
PR : #<n>
PREVIEW : https://<alias de branche>/<chemin>
HEAD : <sha court>

À REGARDER :
- <point 1>
- <point 2>
- <point 3>

DÉJÀ VALIDÉ :
- juridique / factuel : <oui, date | sans objet>
- technique : CI verte, rendu desktop et 390 px contrôlé
- sources : <oui | sans objet>

CE QUI T'ATTEND :
- prose
- cas métier
- rendu
- GO / corrections

RÉPONSE ATTENDUE :
GO
ou
liste courte de modifications

Note : ne pas envoyer de formulaire depuis cette page de test.
```

Trois à six points à regarder, pas davantage. Le reste vit dans la PR.
