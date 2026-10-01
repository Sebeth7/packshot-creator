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

## 2026-10-01 · Cluster AI Act — pilier A : contrôle final éditorial avant Sébastien · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `80489cf`, `main` `8ec89c1`

**Quoi** — Passe de sortie éditoriale (audit, corrections, tests, Preview) avant envoi à Sébastien. Dans `content/blog/fr/ai-act-images-produit.json` seulement :
- ouverture : « Vérifié le 28 septembre » devient « Sources vérifiées du 28 au 30 septembre », comme le corps (plateformes et mesure du 30/09) ;
- tableau « qui doit quoi », ligne agence : point 14 cité en entier (une entreprise reste déployeur lorsque des prestataires opèrent le système pour son compte, sous sa responsabilité et son contrôle), comme dans l'article Suisse (#60) ; le cas d'une marque qui impose ou encadre l'usage de l'IA reste non tranché ;
- ligne marketplace : renvoi au point 16 ;
- « la version finale du 20 juillet 2026 » devient « la version publiée le 20 juillet 2026 » ;
- Google, mention visible : « Google peut en ajouter lui-même dans certains cas » ;
- mesure WebP : condition de la mesure (navigateur acceptant WebP) ;
- renvoi vers l'article Suisse : titre réel, toujours sans lien actif ;
- sources classées par nature (cadre européen, droit français, Suisse, plateformes, standards), sans la trace de production « ajoutés » ; cinq sources déjà utilisées par le texte ajoutées à la liste : Google 6324350 (refus du produit), Google 17231950 (libellé IA), projet de lignes directrices du 8 mai 2026, texte adopté par le Sénat le 18/02/2026 et projet de loi n° 2518 de l'Assemblée nationale (organisation du contrôle en France) ;
- en-têtes de trois tableaux raccourcis (« Ce que cela change », « Rôle selon l'AI Act », « Marquage par l'outil ? », « Mention visible par la marque ? », « À faire ») : à 1440 px, les en-têtes insécables (`white-space: nowrap`, `app/globals.css`) faisaient déborder 3 tableaux sur 4 et tronquaient leur dernière colonne.
Aucune qualification de cas modifiée. FAQ, title, meta, H1, slug, canonical, date, visuels, alt et légende inchangés.

**Pourquoi** — Mission « contrôle final éditorial » du 01/10/2026 : Sébastien ne reçoit que ce qui exige son arbitrage. Constats : date d'ouverture contredite par le corps ; ligne agence moins complète que l'article Suisse sur le même point 14 ; deux affirmations Google, le projet du 8 mai et le calendrier parlementaire français sans source listée ; dernière colonne de trois tableaux masquée sur ordinateur.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié** —
- Fresh-check : tête `80489cf` et `main` `8ec89c1` conformes à la mission ; PR ouvertes listées ; aucune autre session n'a écrit dans #59 depuis `80489cf`.
- Sources relues le 01/10 : lignes directrices C(2026) 5054 (PDF, points 10, 12, 13, 14, 16, 92, 113, 114, 116, 117, 127, 129, 154) ; projet du 8 mai 2026 (PDF, point 86 : suppression ou masquage d'arrière-plans parmi les modifications à marquer) ; Google 14743464, 14572008, 6324350 (conservation des métadonnées IA parmi les conditions minimales, dont le non-respect entraîne le refus du produit), 17231950 (paramètre de libellé IA facultatif ; libellés ajoutés par Google dans certains cas) ; Zalando, mise à jour du 31/08/2026 (mentions visibles refusées, marquage invisible « required by December 2026 ») ; Chancellerie fédérale, page « Intelligence artificielle » ; liste des points de contact de la Commission (France : DGCCRF) ; Sénat, texte adopté le 18/02/2026 (titre « systèmes d'intelligence artificielle », art. 55-1 et suivants) ; Assemblée nationale, projet de loi n° 2518 déposé le 20/02/2026.
- Mesure WebP : preuve au JOURNAL de #63 (30/09, 06:27 UTC, `sysnext.vercel.app`, `/images/hero/hero-studios-wide.avif` : original servi en `w=640` et `w=1080`, WebP sans XMP ni EXIF en `w=1920` pour un en-tête `Accept` annonçant WebP).
- Liens externes (22 URL distinctes) : 17 en 200 ; EUR-Lex (2) en 202 et Légifrance (3) en 403, défis anti-robots non concluants.
- `verifier-json` 181 valides ; `tsc` vert ; Vitest 346/346 ; `next build` vert, variables factices de la CI.
- `next start` local, Chromium, 1440 et 390 px : 200 ; title 57 car., description 155 car., canonical inchangé, aucune balise `robots` ; JSON-LD Organization, BreadcrumbList, Article, FAQPage 7 ; hero 848 × 477 et 358 × 201, A3 662 × 372 et 358 × 201, ratio 16:9, légende présente ; 4 tableaux sans défilement à 1024, 1280 et 1440 px (avant : 3 sur 4 tronqués), défilement interne à 390 px ; 0 débordement de page ; 0 erreur de console ; 0 ancre cassée ; 0 marqueur ; 0 lien vers `/fr/packshot-e-commerce`.
- e2e (`seo`, `internal-links-all`, `anchors`, `responsive`, `mobile-overflow`, Chromium, serveur local, 2 workers) : 307 tests, 24 échecs, liste identique à un build local de `main` `8ec89c1` (0 en plus, 0 en moins) : titles et descriptions hors bornes (dont `/fr/academy`), hreflang de `/fr/packshot-bijoux`, débordements de `/fr`, `/fr/studios-photo-automatises`, `/fr/ia-photo-produit`, `/fr/industrie-defense`, ancre `#calculateur-roi`. Ces specs ne visent pas l'article lui-même : son contrôle est celui de la ligne précédente.
- Premier passage e2e de la branche écarté : 82 dépassements de délai sur des pages sans lien avec l'article (`/fr/ia-photo-produit`, `/fr/packshot-amazon`…), serveur local bloqué après des contrôles concurrents (même cause que dans #63) ; relance complète sur un serveur redémarré : 0 dépassement.

**Supposé** — [Inférence] EUR-Lex et Légifrance servent les mêmes textes que ceux lus les 29 et 30/09 (Cellar, conversion). Cela repose sur des schémas observés.

**Non regardé** — Preview (SSO) par script ; `www` (R4) ; pages Amazon (rendu JavaScript), relues le 30/09 pour #63 seulement.
Hors périmètre, rien de modifié :
- gabarit du blog : le fil d'Ariane est rendu dans le `h1` (tous les articles) ;
- `globals.css` : en-têtes de tableau insécables, risque de colonne masquée sur d'autres articles ;
- deux articles publiés affichés en « articles liés » sous A, dont la phrase sur l'AI Act diverge du pilier : `generer-images-produit-ia` et `migrer-ancien-packshotcreator`.

**Suite** — Envoi à Sébastien sur la Preview de la nouvelle tête. À la publication coordonnée (D38) : lien actif vers `/fr/blog/images-ia-ecommerce-suisse`, `date` du jour de publication.

---

## 2026-09-30 · Cluster AI Act — pilier A : passe éditoriale (cadre de rédaction de Sébastien) · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `de7289f`, puis fusion de `main` `a8c85ca` (#69, conflit du JOURNAL résolu en gardant les deux entrées)

**Quoi** — Réécriture de la prose pour la lisibilité, qualifications juridiques inchangées. Ouverture qui répond puis dit ce que le lecteur saura décider ; les 34 mentions « Niveau : … » intégrées aux phrases (« la Commission cite », « probablement », « à notre lecture », « les textes consultés ne tranchent pas »), avec un paragraphe de lecture unique avant les cas ; titres des cas sans la numérotation héritée des 20 cas de #43 ; tableau des autres cas reconstruit (réponse pour l'outil et pour la marque, puis degré de certitude, repris de #43 et #61) ; tableaux « qui doit quoi », calendrier et plateformes tournés vers l'action ; listes pour la mise en forme standard et les critères de l'hypertrucage ; 14 tirets cadratins retirés ; 2 liens de sources placés près des affirmations (lignes directrices, article L121-2). FAQ, title, meta, slug, canonical et visuels inchangés ; `readingTime` 20 → 22.

**Pourquoi** — Retour de Sébastien du 30/09 (textes « durs à lire ») et kit `TRANSMISSION_REDACTION_BLOG_2026-09-30` (prompt prioritaire, SKILL, règles d'écriture, style maison, repères SEO/GEO), transmis par Laurent.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38).

**Vérifié**
- Sens juridique : chaque niveau (Texte, Exemple direct Commission, Interprétation, Non tranché) retrouvé dans la nouvelle phrase ; points 10 à 16, 113 à 117 des lignes directrices C(2026) 5054 relus sur le PDF de la Commission le 30/09 pour les deux précisions de sens listées dans la PR (agence : critère des points 12 et 14, cas toujours non tranché ; exemple de produit hypertrucage : « dans une publicité ou sur un emballage »).
- Suisse : « aucune obligation suisse d'étiquetage » devient « aucune obligation suisse générale d'étiquetage », aligné sur l'article Suisse (#60).
- Mots : corps 4 078 → 4 527, total avec FAQ et H1 4 655 → 5 104 (même méthode que la PR) ; hausse due surtout au tableau des autres cas, qui donne désormais la réponse et plus seulement le niveau.
- `verifier-json` 187 valides ; `tsc` vert ; Vitest 342/342 ; `next build` vert, 384 pages.
- `next start` local, 1440 et 390 px : 200, title et description inchangés, canonical inchangé, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article, FAQPage 7 = 7 visibles ; hero 848 × 477 et 358 × 201, A3 662 × 372 et 358 × 201, légende présente ; 0 débordement ; 0 erreur de page ; 0 lien interne, 0 lien vers `/fr/packshot-e-commerce` ; aucun « Niveau : » ni tiret cadratin au rendu.
- `e2e/seo.spec.ts` + `internal-links-all.spec.ts` en local : 243 réussis et 8 échecs avant la fusion de #71. Correction : la comparaison annoncée d'abord avec `https://sysnext.vercel.app` n'était pas valable (erreurs TLS du proxy, puis délais dépassés depuis le conteneur). Comparaison refaite après fusion de `main` `8ec89c1` : 235 réussis, 9 échecs, liste identique à celle d'un build local de `main` `8ec89c1` (titles et descriptions hors bornes, dont `/fr/academy`, et hreflang de `/fr/packshot-bijoux`).
- Après fusion de `main` `8ec89c1` (#71) : `verifier-json` 181 valides ; `tsc` vert ; Vitest 346/346 ; `next build` vert, 372 pages ; rendu de l'article inchangé en 1440 et 390 px.
**Supposé** — [Inférence] Le retour de Sébastien se limite à ce que cite la mission (« durs à lire », « meilleur des deux mondes », « reprends les quatre articles comme un ensemble éditorial ») : aucun autre écrit de sa part n'a été transmis. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO) ; `www` (R4) ; EN et de-ch (D38) ; relecture par un autre lecteur : aucune ; « quatre articles » : non établi, seuls A et S traités, #61 à #63 non touchées.

**Suite** — Seconde passe de Sébastien sur la Preview ; deux précisions de sens à valider (voir PR #59).

---

## 2026-09-30 · Academy réduite au catalogue Qualiopi, textes formation alignés · Claude de Sébastien

**Chantier** : hors chantier, demande directe de Sébastien (audit de surveillance Qualiopi du 16/10/2026) | **PR** : #71 | **Commit** : `fc6c9c6`

**Quoi** — `/fr/academy` devient une page simple qui renvoie au catalogue de formation (deux boutons Essential / Master, un lien catalogue, la mention de certification). Elle est servie en FR uniquement. Les sous-pages, le simulateur OPCO et deux articles consacrés à l'ancienne offre sont supprimés et redirigés en 301 vers `/fr/academy`. Les textes du reste du site sont alignés sur l'offre réelle : aucune formation IA ou e-learning, aucune formation incluse à l'achat, plus de prix ni de niveaux, plus de promesse « OPCO 100 % ».

**Pourquoi** — l'auditeur compare le site au catalogue (https://packshotcreator.catalogueformpro.com/), qui fait foi. Le site affichait 6 formations, des durées de 14 h et 21 h et des prix (850 € HT pour 7 h, 1 100 à 1 800 €) qui contredisent les deux seules offres du catalogue : Essential, 4 h à distance, 850 € HT ; Master, 7 h en présentiel, 1 500 € HT. Il annonçait aussi des formations IA et e-learning retirées, et des formations « incluses » alors qu'elles sont toujours facturées à part (Sébastien, 30/09). Trafic GSC sur 90 jours de toutes les pages academy : 7 clics, soit environ 28 par an. Les deux articles redirigés : 0 clic.

**Fichiers** —
- **Page et redirections :** `app/[lang]/academy/page.tsx` (réécrite) et `next.config.ts` (9 redirections 301 ajoutées, 1 réorientée).
- **Supprimés :**
  - pages academy : `app/[lang]/academy/{[slug],calendrier,formations-ia,formations-packshot,simulateur-opco}` ;
  - données et simulateur : `components/simulators/opco/`, `content/formations/`, `lib/formations.ts` ;
  - articles : `app/[lang]/blog/{financement-formation-opco-…,formation-photo-produit-professionnelle-…}`.
- **Navigation et SEO :** `components/layout/{Header,Footer}.tsx`, `i18n/{routing,deChCoverage}.ts`, `app/sitemap.ts`, `lib/{seo-config,blog}.ts`, `components/seo/SchemaOrg.tsx` (`courseSchema` retiré), `public/llms.txt`.
- **Textes :**
  - libellés d'interface : `messages/{fr,en,de-ch}.json` ;
  - FAQ formation des fiches machines : `components/calculators/ROICalculator/lib/machines.ts` (texte seul, aucun calcul touché) ;
  - pages : `app/[lang]/studio-photo/[slug]`, `ia-photo-produit`, `industrie`, `guide`, `not-found`, `layout`, et `blog/page.tsx` ;
  - articles : 7 à page dédiée et 23 fichiers JSON ;
  - `data/secteurs.ts`, `components/landings/PackshotEcommerce.tsx`.
- **Tests :** `lib/__tests__/academy-fr-only.test.ts` (nouveau), `e2e/{anchors,cta-destinations,redirections,seo}.spec.ts`, `e2e/opco-simulator.spec.ts` (supprimé).

**Effet attendu** — dès le déploiement, plus rien sur le site ne contredit le catalogue. Google remplacera les anciennes URL en quelques jours à quelques semaines. D'ici là, un extrait de recherche peut encore afficher un ancien titre, mais le clic mène à `/fr/academy`.

**Vérifié** :
- Build et tests : `npx tsc --noEmit` et `npx next build` verts ; Vitest 346 tests sur 346, dont 4 nouveaux sur l'épinglage FR.
- Redirections sur `next start` local : 25 anciennes URL (FR, EN, DE-CH, sous-pages, fiches, les deux articles, `/en/trainings-product-photography`) répondent en 301 vers `/fr/academy` en un saut, query string conservée. Test e2e `redirections.spec.ts` : bloc academy 12 sur 12.
- Page : hreflang limité à `fr`, `fr-CH` et `x-default`, canonical `/fr/academy`, aucun noindex, JSON-LD Organization + BreadcrumbList.
- Liens et contenu rendu :
  - dans les 359 pages HTML prérendues, aucun lien vers `/en/academy`, `/de-ch/academy`, `/fr/academy/*` ou vers les articles supprimés ; 869 liens pointent directement sur `/fr/academy` ;
  - dans leur texte, aucune occurrence de « formation incluse », « OPCO 100 % », « formations IA », e-learning ou blended ;
  - sitemap : 308 URL, `/fr/academy` seule pour la section.
- Catalogue et rendu visuel : les trois liens catalogue ouvrent la bonne fiche (vérifié le 30/09 : titres « Essential Training Distanciel - Version 2026 » et « Master Training Présentiel - Version 2026 ») ; rendu Playwright à 1440 et 390 px, sans débordement horizontal.

**Supposé** : l'entité certifiée est Sysnext (Sébastien, 30/09). La mention « La certification qualité a été délivrée au titre de la catégorie d'action suivante : ACTIONS DE FORMATION » est reprise telle que fournie. Aucun logo Qualiopi n'est affiché, Sysnext n'en a pas le droit.

**Non regardé** :
- **Cloudflare :** le Worker n'a pas été modifié. `/academy/<x>` sans langue fait deux sauts (Worker vers `/fr/academy/<x>`, puis Next vers `/fr/academy`), comme les anciennes URL legacy qui visent `/en/academy`. Le comportement sur www n'est pas contrôlé avant déploiement.
- **Pages légales (hors périmètre) :** les CGU (article 1, article 4, article 5 « PackshotCreator Academy est certifié Qualiopi ») et la politique de confidentialité citent encore le simulateur OPCO ou l'Academy comme entité certifiée.
- **Formulation « formation(s) certifiée(s) Qualiopi » :** une vingtaine d'occurrences au moins, alors que c'est l'organisme qui est certifié ; à arbitrer avec la consultante.
- **Garde-fous e2e :** les specs nécessitant un navigateur n'ont pas été lancées (navigateurs Playwright non installés).

**Suite** :
- Sébastien : corriger la fiche Master du catalogue, qui dit « souhaitant se former à distance » pour une formation en présentiel.
- À trancher :
  - le « suivi post-formation » du guide d'achat (hotline, session de suivi, accès formateur) ;
  - « Formateurs experts 10+ ans » et les témoignages Marie D. et Camille R. (comparatif Orbitvu) ;
  - l'écart « 5 000+ entreprises » (accueil) contre « plus de 500 entreprises » (guide budget).

---

## 2026-09-30 · Articles de blog centrés sur grand écran · Claude de Sébastien

**Chantier** : hors chantier, demande directe de Sébastien | **PR** : #69 | **Commit** : `d570218`

**Quoi** — `lg:justify-center` sur le conteneur flex du gabarit d'article : le bloc colonne de lecture + sommaire est centré au lieu d'être collé à gauche. Largeur de lecture (65ch) inchangée.

**Pourquoi** — vide à droite de l'article, mesuré : 377 px à 1440, 617 px à 1920, contre 104 et 344 px à gauche. Le `lg:mx-0` d'origine (90f5d81, 08/02) alignait la colonne à gauche du conteneur de 1280 px.

**Fichiers** — `app/[lang]/blog/[slug]/page.tsx`

**Effet attendu** — marges symétriques dès le déploiement : 240 / 240 px à 1440, 480 / 480 à 1920.

**Vérifié** — `npx next build` vert en local. Mesure Playwright avant (sysnext.vercel.app) / après (build local), 5 articles FR / EN / DE-CH × 7 largeurs de 390 à 1920 : largeur de colonne, largeur du sommaire, hauteur de l'article, bannière identiques ; aucun débordement horizontal ; rendu identique sous 1024 px. Aucun article JSON n'est aujourd'hui sans h2 / h3, donc sans sommaire.
**Supposé** — les ~120 autres articles JSON se comportent comme les 5 mesurés : même gabarit, la largeur de colonne ne dépend pas du contenu (`flex-1` + `min-w-0` + `max-w-prose`).
**Non regardé** — les 12 articles à `page.tsx` dédiée (hors gabarit, mises en page propres) ; le hub `/blog` ; le rendu derrière Cloudflare sur www.

**Suite** — rien.

---

## 2026-09-30 · Cluster AI Act — pilier A : visuels A1 (hero) et A3 intégrés · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `be1f8ae`

**Quoi** — A1 devient l'image principale de l'article (champ `image`) ; A3 est inséré dans « Cas 11 + 12 », après le paragraphe sur l'exemple de la Commission (produit réel, environnement généré), avec l'alt et la légende fixés par la mission. A2 n'est pas intégré. Aucune prose modifiée.

**Pourquoi** — Sélection visuelle verrouillée par Laurent le 30/09 (`AI_ACT_VISUAL_FINAL_REVIEW_2026-09-30.md` : A1 et A3 KEEP, A2 REJECT), en vue de la passe de Sébastien sur la Preview.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `public/images/blog/ai-act-images-produit/cover.avif`, `public/images/blog/ai-act-images-produit/produit-reel-decor-genere.avif`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38). Sur la Preview : hero, `og:image` et image de l'`Article` JSON-LD renseignés.

**Vérifié**
- Pack `AI_ACT_VISUAL_HANDOFF_2026-09-30.zip` : SHA-256 et tailles des PNG identiques au rapport (A1 `e5a4cf6d…4437b`, 1 615 385 octets ; A3 `f2f57220…8b7b2`, 1 329 657 octets). PNG sources conservés hors dépôt, non modifiés.
- Pipeline réel : le hero et les images du corps sont servis tels quels (balise `img`, sans optimiseur) ; le corpus utilise l'AVIF (112 champs `image` sur 126) et la convention `/images/blog/<slug>/cover.avif`. Dérivés AVIF 1600 × 900 sans recadrage, qualité 70, 4:4:4 : A1 78 992 octets (PSNR 43,6 dB), A3 73 246 octets (PSNR 43,9 dB) ; comparaison à 1:1 sans différence visible.
- `next start` local : les deux images en 200 `image/avif`, ratio 16:9 complet en 1440 px (hero 848 × 477, A3 662 × 372) et en 390 px (358 × 201 chacune), 0 débordement, 0 erreur de page ; 7 FAQ = FAQPage 7 ; 4 tableaux ; canonical et absence de balise `robots` inchangés ; `og:image` = URL absolue de `cover.avif` ; `Article.image` = `/images/blog/ai-act-images-produit/cover.avif`.
- `verifier-json` 187 valides ; `tsc` vert ; Vitest 342/342 ; `next build` vert, 384 pages ; `e2e/seo.spec.ts` + `internal-links-all.spec.ts` : 243 réussis, les 8 échecs préexistants de `main`, inchangés.

**Supposé** — [Inférence] Provenance : illustrations générées par IA, enregistrées `model_generated=true` le 30/09/2026 selon le rapport (source fournie, non vérifiable dans les fichiers) ; modèle, identifiant de génération et prompt non embarqués ; aucune métadonnée XMP, IPTC ou C2PA dans les PNG ni dans les AVIF. Cela repose sur des schémas observés.

**Non regardé** — Alt du hero : le gabarit impose le titre de l'article (`app/[lang]/blog/[slug]/page.tsx`) ; l'alt demandé pour A1 n'est pas applicable sans modifier ce gabarit commun, non touché. `twitter:image` : le gabarit du blog n'en émet pas par article (image générique du layout, comme tous les articles). Prise en charge de l'AVIF en `og:image` par les réseaux sociaux : non vérifiée, comportement identique au reste du corpus. Preview (SSO). EN et de-ch (D38).

**Suite** — Preview de la nouvelle tête à transmettre à Sébastien (passe finale) ; S1, S2, S3 sur #60 ; alt de hero configurable : PR de gabarit séparée si Laurent le décide.

---

## 2026-09-30 · Cluster AI Act — satellites B, C, D non créés (D16), matière indispensable réintégrée dans le pilier A · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : tête `91e96a8`

**Quoi** — Décision de pilotage de Laurent du 30/09 : `B_D16_FINAL = NO`, `C_D16_FINAL = NO`, `D_D16_FINAL = NO`. Le pilier A reprend seulement la matière indispensable au lecteur : recolorisation (nouvelle H3 « Cas 8 + 9 », section renommée « Sept situations »), phrase sur la correction de couleur « mineure », rayure et usure (cas 14), personnes réelles et synthétiques (cas 16), plateformes et métadonnées (tableau Google Merchant Center, Amazon, Zalando ; point 117 ; métadonnées perdues au réencodage WebP ; C2PA), 2 questions de FAQ, sources correspondantes. Les trois renvois à des « dossiers » futurs sont retirés ; les lignes 8 et 9 de l'index, désormais traitées en H3, aussi.

**Pourquoi** — D16/D27 appliqués par Laurent : critère 2 non rempli pour B et C (aucune demande mesurée sur l'intention réglementaire, requêtes génériques ou d'outils non assimilées) ; critère 3 non rempli pour D. Objectif : un pilier autonome suffisant, sans revenir à la version longue de #43.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée (D38). La PR n'est pas à fusionner en l'état.

**Vérifié**
- Corps 3 437 → 4 258 mots ; FAQ 5 → 7 questions ; total 4 838 mots ; `readingTime` 17 → 20 (ratio des articles longs du blog).
- Textes repris des branches de #61, #62 et #63, déjà relus sur sources primaires le 30/09, avec leurs niveaux (Texte, Exemple direct Commission, Interprétation, Non tranché) ; aucune qualification nouvelle.
- Sérialisation JSON identique à l'original (indentation 2, UTF-8, sans retour final) ; 0 lien interne ; 0 lien vers `/fr/packshot-e-commerce` (D37).
- Contrôles : voir la PR #59 (verifier-json, tsc, Vitest, `next build`, rendu local).
**Supposé** — [Inférence] Le constat sur l'optimiseur d'images (AVIF servi avec métadonnées en 640 et 1 080 px, WebP sans métadonnées en 1 920 px) reste valable à la publication ; il date du 30/09 et vaut pour notre configuration seulement. Cela repose sur des schémas observés.
**Non regardé** — Visuels A1 et A3 : fichiers et rapport `AI_ACT_VISUAL_FINAL_REVIEW_2026-09-30.md` introuvables dans le dépôt, les branches, les artifacts et le stockage Supabase ; article Suisse (#60) inchangé, sans renvoi aux satellites ; EN et de-ch (D38) ; Preview (SSO).

**Suite** — Fermeture sans fusion recommandée pour #61, #62 et #63 ; intégration des visuels A1, A3, S1, S2 et S3 dès transmission des fichiers et du rapport ; passe finale de Sébastien.

---

## 2026-09-29 · Cluster AI Act — pilier A restructuré, PR brouillon · Claude de Laurent

**Chantier** : cluster éditorial AI Act / images produit, pilier européen (A) | **PR** : #59, brouillon, `DO_NOT_MERGE` | **Branche** : `seo/ai-act-images-produit-pilier-2026-09-29` | **Base** : `main` `e2e1027` (post-#55 et #58 ; `37146c2` au début de la mission)

**Quoi** — Création de `content/blog/fr/ai-act-images-produit.json` depuis `main`, à partir du texte restructuré transmis par Laurent le 29/09 (≈ 3 644 mots FAQ comprise, 5 FAQ), qui remplace éditorialement la version longue de #43. Balisage adapté au format du corpus (`tldr`, `table-wrap`, FAQ dans `faqs`). Micro-corrections seulement : 6 renvois au document de travail (« article source », « article actuel ») ; section « Et en Suisse ? » réduite à une passerelle prudente (art. 2(1)(c)), sans lien actif vers l'article Suisse non publié ; 4 précisions exigées par les sources primaires (art. 3(3) « ou en service » ; art. 3(60) liste fermée ; lignes directrices §92, changements extrêmes « qui modifient le sens » ; Code, interopérabilité « des mécanismes de détection »). Liens ajoutés sur les 8 sources officielles déjà nommées.

**Pourquoi** — Mission « cluster AI Act » de Laurent (29/09) : le pilier se recentre sur l'article 50 ; les cas 3-10, 15, 17-20 et les plateformes relèvent des futurs satellites B, C et D.

**Fichiers** — `content/blog/fr/ai-act-images-produit.json` (création), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Aucun avant la publication coordonnée FR, EN et de-ch (D38). La PR n'est pas à fusionner en l'état.

**Vérifié**
- Sources primaires relues le 29/09 : règlement (UE) 2024/1689 et 2026/1744 (texte du JO via le Cellar, EUR-Lex renvoyant 202 aux scripts), lignes directrices C(2026) 5054 et projet du 8 mai 2026 (PDF), FAQ article 50, Code de bonnes pratiques (PDF), liste des autorités de surveillance (7/09/2026), dossiers Sénat et Assemblée nationale, L121-1 et L121-2 (lus par conversion, Légifrance renvoyant 403 aux scripts). A1 à A10 confirmés sur le fond ; qualifications de cas inchangées.
- `verifier-json` 187 fichiers valides ; `tsc` vert ; Vitest 342/342 ; ESLint 258 erreurs et 68 avertissements sur tout le projet, identiques à `main` (les fichiers modifiés ne sont pas analysés par ESLint) ; `next build` vert, 384 pages, après rebase sur `e2e1027`.
- `next start` local : article en 200, canonical `https://www.packshot-creator.com/fr/blog/ai-act-images-produit`, aucune balise `robots`, JSON-LD Organization, BreadcrumbList, Article (`datePublished` = `dateModified` = 2026-09-28) et FAQPage (5 = 5 visibles), URL présente au sitemap (326 URL), 0 débordement en 1440 et 390 px ; comportement identique à `generer-images-produit-ia` (pas de hreflang sans entrée `alternates.json`, pas d'image).
- Liens : 0 interne ; 9 externes, 7 en 200, EUR-Lex 202 et Légifrance 403 (défis anti-robots, non concluants depuis le conteneur).
- `e2e/seo.spec.ts` et `e2e/internal-links-all.spec.ts` sur le serveur local : 243 réussis, 8 échecs préexistants (title ou description hors bornes et hreflang de `/fr/packshot-bijoux`), métadonnées identiques à `sysnext.vercel.app`.
- Aucun lien vers `/fr/packshot-e-commerce` (D37). #43, #53 et #55 non modifiées.
**Supposé** — [Inférence] Les lignes directrices restent citables comme « publiées le 20 juillet 2026, non contraignantes » : le communiqué de la Commission parle de publication, alors que la communication C(2026) 5054 annonce une adoption formelle ultérieure, une fois toutes les versions linguistiques disponibles. Cela repose sur des schémas observés.
**Non regardé** — Preview Vercel (SSO) ; `www.packshot-creator.com` (R4) ; versions EN et de-ch (D38) ; visuels ; relecture de la prose et de la signature par Sébastien (`01-RAYON-ACTION.md`, `content/blog/**`).

**Passe éditoriale du 30/09** (relecture humaine de Laurent, #59) — deux micro-corrections, sans changement de qualification ni de structure : introduction des sources (« Sources utilisées pour cette analyse, vérifiées au 28 septembre 2026. ») ; FAQ « Qu’est-ce qu’un hypertrucage pour une image produit ? », « notamment » retiré au profit de l'énumération fermée de l'art. 3(60) déjà employée dans le corps. `verifier-json`, `tsc` et `next build` rejoués.

**Micro-correction du 30/09, mission « fermeture D16 et micro-corrections A/S »** — section « Quand une image produit devient-elle un hypertrucage ? » : « quatre éléments » devient « quatre critères cumulatifs », avec renvoi au point 113 des lignes directrices C(2026) 5054 (« four cumulative criteria », PDF relu le 30/09). Une phrase ajoutée signale que la FAQ de la Commission (mise à jour le 24/07/2026, relue le 30/09) présente les mêmes exigences en trois critères cumulatifs, en regroupant l’objet représenté avec le critère d’existence. Aucune qualification, aucun cas et aucune structure modifiés. Le verdict D16 de B, C et D reste en attente de mesure : aucune matière n’est réintégrée dans A.

**Suite** — Passe terrain de Sébastien, revue visuelle, maillage final et traductions avant toute publication coordonnée ; liens vers les satellites B, C, D et vers l'article Suisse à activer à leur publication.

---

## 2026-09-30 · R01 / #58 fusionnée — clôture documentaire · Claude de Laurent

**Chantier** : R01 de l'audit de maillage du 29/09 | **PR** : #58, fusionnée | **Commit de fusion** : `e2e1027` (`main`), le 29/09/2026 à 18:48:26 UTC | **Consigné dans** : #57

**Quoi** — Mise à jour documentaire seulement :
- la ligne R01 de `ETAT.md` indiquait encore « PR #58, brouillon, non fusionnée » ; elle passe à « TERMINÉ — FUSIONNÉ » ;
- aucun code, aucun test fonctionnel refait.

**Vérifié** — `main` = `e2e1027` : commit de fusion de #58, parents `e88e528` et `0e232c2`, daté du 29/09/2026 à 18:48:26 UTC (`git log`).

**Supposé** — Constats de production de #58, rapportés par Laurent le 30/09 d'après la session de #58, et non recontrôlés ici sur sa consigne :
- `sysnext.vercel.app` sert le build de `e2e1027` ;
- `smoke.mjs` vert ;
- les 8 hubs `/de-ch/branchen/*` sont conformes ;
- 0 lien en 404 et 0 redirection dans le sélecteur de langue (26 et 6 avant) ;
- suivi GitHub et rappel de #58 supprimés.

**Non regardé** — `www` (R4). R02 à R19, D9, D29, D33, D36 : non concernés, rien de modifié.

**Suite** — Contrôle Chrome sur `www` de `/de-ch/branchen/uhren`, côté Laurent, comme indiqué dans la « Suite » de l'entrée R01 ci-dessous.

---

## 2026-09-29 · #55 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique « corrections JSON-LD » (A, B, D) | **PR** : #55, fusionnée sur GO de Laurent | **Commit de fusion** : `e88e528` (`main`), le 29/09/2026 à 18:35:25 UTC | **Tête fusionnée** : `1ceb42a` | **Base avant fusion** : `37146c2`

**Quoi** — Fusion de #55 sur GO de Laurent, après ces contrôles :
- tête `1ceb42a` et `main` `37146c2` inchangés ;
- 4 checks verts ;
- aucun fil ni avis de revue ;
- PR fusionnable.

La PR est sortie du brouillon puis fusionnée par commit de fusion. Aucune autre modification de code. C (Organization distributeur), D32, D33, D36, R01 (sélecteur de langue de-ch), maillage, AI Act et Suisse non touchés.

**Vérifié** —
- `main` = `e88e528`, parents `37146c2` et `1ceb42a` ; arbre identique à celui de `1ceb42a`, la tête testée.
- `sysnext.vercel.app` sert le nouveau build à partir de 18:37:00 UTC : première observation d'un relevé toutes les 10 s, témoin `dateModified` `2026-05-02` sur l'article FR. Avant fusion, la production servait encore `/de-ch/studio-photo/…` dans le fil d'Ariane et `dateModified` = `datePublished`.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 18:37 UTC : vert, 17 pages et 3 ressources.
- `/de-ch/fotostudio/alphashot-pro-g2` : 200. `BreadcrumbList` : `/de-ch`, `/de-ch/studios-photo-automatises`, `/de-ch/fotostudio/alphashot-pro-g2`, tous en 200 sans redirection.
- `/fr/solutions/documentation-technique-visuelle` : 200. `BreadcrumbList` à 2 éléments, `/fr` et la page elle-même, en 200. Plus d'étape `/fr/solutions`.
- `Article` : `datePublished` `2024-01-08T00:00:00.000Z` et `dateModified` `2026-05-02` sur les 3 pages qui portent la valeur source (FR, EN, de-ch). Leurs éléments de fil d'Ariane répondent 200.
- Éléments de fil d'Ariane contrôlés en 404 ou en redirection : 0.
- `/fr` et `/en/distributeur-orbitvu-suisse` : Organization inchangée, soit la variante de la page (téléphones à tirets, sans `email`, `ContactPoint` CH en `French`/`English`).

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour les PR précédentes.

**Non regardé** — `www` (R4) ; crawl complet de production, non demandé ; rapport « Fils d'Ariane » de GSC, pas encore lisible.

**Suite** — Laurent, dans Chrome sur `www` : `/de-ch/fotostudio/alphashot-pro-g2` et `/fr/solutions/documentation-technique-visuelle`, JSON-LD du fil d'Ariane. GSC, rapport « Fils d'Ariane », à J+7-14. Backlog inchangé, dans `ETAT.md` : Product/Offer de-ch, `Service.url` `branchen`, `author.url` de-ch, Organization distributeur (D33).

---

## 2026-09-29 · R01 — sélecteur de langue des 8 hubs de-ch · Claude de Laurent

**Chantier** : R01 de l'audit de maillage du 29/09 (seul P0 du rapport) | **PR** : #58, brouillon, branche `claude/gracious-dijkstra-efzyen`, non fusionnée | **Base** : `main` `37146c2`

**Quoi** — `localeSwitchHref` (`i18n/deChCoverage.ts`) : en de-ch seulement, le chemin concret `/industrie/<slug>` est ramené au motif `/industrie/[slug]` avant résolution. La table existante `DE_CH_TO_FR_SECTOR` fait le reste : aucun mapping ajouté. Test de non-régression `lib/__tests__/locale-switch-de-ch.test.ts` (47 cas).

**Pourquoi** — Sur les 8 hubs `/de-ch/branchen/<slug allemand>`, le sélecteur recopiait le slug allemand sous `/fr/industrie/` et `/en/industrie/` : 26 liens vers 13 URL en 404, 6 liens vers 3 URL en 301 (`/fr/industrie/mode`, `schoenheit`, `sport`). Cause vérifiée avant modification : la page est prérendue sous son chemin interne réécrit (charge utile `"c":["","de-ch","industrie","schmuck"]`). `usePathname()` de next-intl 4.6.1 ne rattache pas ce chemin au motif de-ch `/branchen/[slug]` (`getRoute`) et renvoie `/industrie/schmuck`, sans slug. Le sélecteur passait alors par la branche des pages statiques.

**Fichiers** — `i18n/deChCoverage.ts`, `lib/__tests__/locale-switch-de-ch.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Sur les 8 hubs, « FR » mène au hub FR du secteur, la même cible que leur hreflang `fr`. « EN » mène à `/en/studios-photo-automatises` : c'est la règle existante, les 17 hubs `/en/industrie/*` étant `noindex` (D9, non modifiée), et le bouton EN des hubs FR fait déjà de même.

**Vérifié** —
- Avant, sur le build local de `main` `37146c2`, Worker du dépôt rejoué en local : 8 hubs, 2 sélecteurs par page (desktop, mobile), 26 liens en 404, 6 en 301. Identique à l'audit.
- Après, même méthode : 16 cibles sur 16 en 200, 0 lien en 404, 0 redirection.
- Correspondances : `schmuck` → `bijoux-joaillerie`, `uhren` → `horlogerie`, `brillen` → `lunetterie`, `schoenheit` → `cosmetiques-beaute`, `elektronik` → `electronique-hightech`, `sport` → `sport-outdoor`, `mode` → `mode-textile`, `wein` → `vin-spiritueux`.
- HTML prérendu, `main` contre branche : 371 fichiers, 8 diffèrent (les 8 hubs), et seules les 4 balises `<a>` du sélecteur y changent. Sélecteur et hreflang identiques sur les 359 autres pages.
- Chromium, après hydratation : `/de-ch/branchen/schmuck` et `/uhren` conformes. Échantillon hors secteurs (`/de-ch/fotostudio/alphashot-360`, `/de-ch/kontakt`, `/de-ch/blog/altes-packshotcreator-studio-migrieren`, `/fr/industrie/horlogerie`, `/en/studios-photo-automatises`) identique à `main`. 0 erreur de page. Clic réel : « FR » sur `uhren` mène à `/fr/industrie/horlogerie`, « EN » sur `schmuck` à `/en/studios-photo-automatises`.
- Le nouveau test échoue sur le code de `main` (16 cas : 8 hubs × FR et EN, chemin concret) et passe sur la branche.
- `npx tsc --noEmit` vert ; Vitest 337/337 (290 sur `main`) ; `verifier-json` : 186 JSON valides ; ESLint : 0 problème sur les 2 fichiers, 0 sur la version `main` ; `npx next build` vert.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`. Le Worker déployé correspond au Worker du dépôt (R5) pour les 16 cibles.

**Non regardé** — `www` (R4), Preview Vercel (SSO), Safari et appareils réels. Les autres recommandations du rapport de maillage (R02 à R19).

**Suite** — GO de Laurent, fusion, `smoke.mjs` sur `sysnext.vercel.app`, contrôle Chrome sur `www` de `/de-ch/branchen/uhren`. Backlog, hors périmètre, rien de modifié :
- [Inférence] `GoogleAnalytics.tsx` (`page_path`) et `ContactForm.tsx` (`pageSource`) lisent le même `usePathname()` et pourraient recevoir le chemin interne sur les 29 pages de-ch localisées ;
- en local, `next start` répond 307 vers lui-même sur ces 29 chemins, alors que `sysnext.vercel.app` répond 200 : outillage de contrôle seulement.

---

## 2026-09-29 · #55 — périmètre ajusté par Laurent : correction C (Organization distributeur) retirée · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique « corrections JSON-LD » | **PR** : #55, brouillon, non fusionnée, branche `ccr-28357f20-j8452h` | **Base** : `main` `2854c27`

**Quoi** — Sur consigne de Laurent, avant fusion, la correction C est retirée de #55 :
- `app/[lang]/distributeur-orbitvu-suisse/page.tsx` est restauré à l'identique de `main` `2854c27` ; `distributorOrganizationSchema` y est de nouveau émis ;
- les 2 tests Organization sont retirés de `lib/seo/__tests__/json-ld-techniques.test.ts`.

A (fils d'Ariane de-ch), B (étape « Solutions » en 404 retirée) et D (`dateModified` des sources) sont conservés sans changement. Cette entrée remplace, pour C, l'entrée ci-dessous.

**Pourquoi** — Arbitrage de Laurent du 29/09. Aucune donnée source n'était modifiée, mais la sortie publiée sur les 2 pages distributeur changeait sur plusieurs attributs : format des téléphones, `email`, `German` dans le `ContactPoint` CH. Cela relève du chantier D33, pas encore validé.

**Fichiers** — `app/[lang]/distributeur-orbitvu-suisse/page.tsx` (retour à `main`), `lib/seo/__tests__/json-ld-techniques.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Identique à l'entrée ci-dessous pour A, B et D. Aucun effet sur les 2 pages distributeur : leur JSON-LD reste celui de `main`, soit 2 variantes d'`Organization`.

**Vérifié** —
- `git diff 2854c27` sur le fichier distributeur : vide.
- `npx tsc --noEmit` vert. Vitest 295/295 : 290 sur `main` et 5 nouveaux, pour A, B et D. `verifier-json` : 186 JSON valides.
- ESLint complet : 326 messages sur `main` (258 erreurs, 68 alertes) comme sur la branche ; 0 nouveau, 0 disparu.
- `npx next build` vert pour `main` et pour la branche, variables factices de la CI.
- Mesure sur les 402 pages, `main` → branche :
  - pages de-ch à élément de fil d'Ariane redirigé : 21 → 0 ;
  - pages à élément 404 : 6 → 0 ;
  - variantes d'`Organization` : 2 → 2, inchangé ;
  - `Article` émettant le `dateModified` de la source : 0 → 3.
- Comparaison page par page : 30 différences JSON-LD, toutes classées (A 21, B 6, D 3), 0 non classée. JSON-LD des 2 pages distributeur identique à `main`. HTML hors scripts, `<head>`, statuts, `sitemap.xml`, `robots.txt` et `llms.txt` identiques.
- Crawl ciblé : les 32 pages concernées (30 corrigées et les 2 pages distributeur) répondent 200, et tous leurs éléments de fil d'Ariane répondent 200.
- `smoke.mjs` local vert sur `main` et sur la branche, 17 pages et 3 ressources. `e2e/seo.spec.ts`, Chromium : 235 réussis ; 8 échecs, les mêmes 8 sur `main`.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`.

**Non regardé** — Preview Vercel (SSO) et `www` (R4).

**Suite** — La variante d'`Organization` de la page distributeur rejoint le backlog D33. GO de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et relevé des fils d'Ariane d'une fiche `fotostudio` et d'une page `solutions`.

---

## 2026-09-29 · JSON-LD techniques — fils d'Ariane de-ch et solutions, Organization distributeur, `dateModified` · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique « corrections JSON-LD », périmètre strict | **PR** : #55, brouillon, non fusionnée, branche `ccr-28357f20-j8452h` | **Base** : `main` `2854c27`

**Quoi** — Quatre corrections de données structurées, rien d'autre :
- A. `BreadcrumbList` de-ch : l'élément qui visait un segment FR est résolu par `getPathname` (`i18n/routing.ts`) dans 9 fichiers. Aucune table ajoutée.
- B. `solutions/[slug]` : l'étape « Solutions » (`/fr/solutions`, `/en/solutions`, en 404) est retirée. Aucune page créée.
- C. `distributeur-orbitvu-suisse` : la variante `distributorOrganizationSchema` est supprimée ; la page émet `organizationSchema()`. `SchemaOrg.tsx` n'est pas modifié.
- D. `blog/[slug]` transmet à `articleSchema` le `dateModified` du fichier source quand il existe. `datePublished` inchangé ; aucune date générée ; repli existant sur `datePublished` conservé.

**Pourquoi** — Mesure AVANT sur un build local de `main` `2854c27`, 402 pages : les 325 du sitemap et les routes prérendues. Statuts relevés sans suivre les redirections.
- 21 pages de-ch avec un élément de fil d'Ariane en 307. La consigne en annonçait 22 ; j'en mesure 21, soit les pages de l'annexe 2.e du rapport maître du 26/09 : 13 fiches `fotostudio`, `maschinen-finder`, `branchen`, `kontakt`, `packshot-industrie`, `produktfotografie-bedarf`, `roi-rechner`, `wer-sind-wir`, `wichtige-fragen-produktfotografie`.
- 6 pages avec un élément en 404, et non 4 : 3 slugs (`documentation-technique-visuelle`, `documentation-qualite-produit`, `documentation-probatoire`) en FR, dans le sitemap, et en EN, `noindex, follow`, hors sitemap.
- 2 variantes d'`Organization` : la commune sur 289 pages, la divergente sur `/fr` et `/en/distributeur-orbitvu-suisse`.
- 3 fichiers source portent `dateModified` (`2026-05-02`) : le même article en FR, EN et de-ch. Aucun `Article` ne l'émettait : sur les 149 `Article`, `dateModified` = `datePublished`.

**Fichiers** — `app/[lang]/studio-photo/[slug]/page.tsx`, `app/[lang]/studio-photo/selecteur-machines/page.tsx`, `app/[lang]/a-propos/page.tsx`, `app/[lang]/besoins-photographie-produit/page.tsx`, `app/[lang]/calculateur-roi/layout.tsx`, `app/[lang]/contact/page.tsx`, `app/[lang]/industrie/page.tsx`, `app/[lang]/questions-cles-photographie-produit/page.tsx`, `components/templates/PackshotLandingTemplate.tsx` (type de `slug` restreint aux 3 pathnames déclarés), `app/[lang]/solutions/[slug]/page.tsx`, `app/[lang]/distributeur-orbitvu-suisse/page.tsx`, `app/[lang]/blog/[slug]/page.tsx`, `lib/content.ts` (champ optionnel `dateModified`), `lib/seo/__tests__/json-ld-techniques.test.ts` (nouveau), `vitest.config.ts` (`next-intl` transformé par Vite), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Les fils d'Ariane des 27 pages ne visent plus que des URL en 200 direct ; une seule `Organization` sur le site ; les 3 articles déclarent leur date de modification. Aucun effet sur le contenu visible, canonical, hreflang, `lang`, robots ou sitemap. [Inférence] Effet lisible dans GSC, rapport « Fils d'Ariane », après recrawl, soit une à deux semaines.

**Vérifié** —
- `main` distant = `2854c27` avant modification ; branche partie de ce commit.
- Mesure APRÈS, build local de la branche, mêmes 402 pages : pages de-ch à élément redirigé 21 → 0 ; pages à élément 404 6 → 0 ; toutes locales, éléments non 200 : 27 pages → 0 ; variantes d'`Organization` 2 → 1 (291 pages, dont les 2 pages distributeur, identiques au nœud de `/fr`) ; `Article` émettant le `dateModified` de la source : 0 → 3 sur 3.
- Comparaison `main` / branche, page par page, 402 pages :
  - 32 différences JSON-LD, toutes classées : A 21, B 6, C 2, D 3 ; 0 non classée ;
  - HTML hors scripts identique sur les 402 pages, identifiant de build neutralisé ;
  - `<head>` identique : canonical, alternates, robots, `lang`, `title`, description, `og:*` ;
  - statuts et redirections identiques ; `sitemap.xml` (`lastmod` neutralisé), `robots.txt` et `llms.txt` identiques.
- Crawl ciblé des 32 pages concernées : 32 en 200, tous leurs éléments de fil d'Ariane en 200 sans redirection.
- `npx tsc --noEmit` vert. Correction : au premier push (`fa16b1c`), la CI a échoué sur `tsc` : erreur de type dans le fichier de test, écrit après mon passage local de `tsc`. Corrigé au commit suivant ; `tsc`, Vitest, ESLint et build relancés en local avant de pousser. Vitest 297/297 (290 sur `main`, 7 nouveaux). Rejoués contre les sources de `main`, 3 des nouveaux tests échouent et signalent les 9 défauts (8 fichiers de-ch et l'étape « Solutions ») et la variante d'`Organization`. Avertissement de source map du Worker à l'identique sur `main`.
- `verifier-json` : 186 JSON valides. ESLint complet : 326 messages sur `main` (258 erreurs, 68 alertes), 326 sur la branche, 0 nouveau, 0 disparu.
- `npx next build` vert, variables factices de la CI.
- `smoke.mjs` sur `next start` local de `main` et de la branche : vert, 17 pages et 3 ressources, sorties identiques hors URL.
- `e2e/seo.spec.ts`, Chromium : 235 réussis et 8 échecs, les mêmes 8 sur `main` (longueur de `title` et de description, hreflang de `/fr/packshot-bijoux`) ; 0 nouvel échec. Exécuté avec le Chromium préinstallé du conteneur (`executablePath`), Playwright 1.58 attendant une version de navigateur absente.
- `verifier-consequences.mjs` sur la liste des fichiers : « Effet local ».

**Écart émis sur la page distributeur (C)** — La page émet désormais le nœud commun. Par rapport à la variante supprimée :
- `description` : « … pour la France et la Suisse. … » → « … France & Suisse. … » ;
- téléphones : mêmes numéros, format E.164 sans séparateurs (`+33147426666`, `+41445804384`) ;
- `email` `sales@sysnext.com` ajouté aux deux `ContactPoint` ;
- `availableLanguage` du `ContactPoint` CH : `German` ajouté, valeur centrale que D33 conserve.

Aucune donnée n'est modifiée dans `SchemaOrg.tsx`.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour les PR précédentes.

**Non regardé** — Preview Vercel (SSO) et `www` (R4). Test des résultats enrichis de Google : non lancé. Le contrôle source des fils d'Ariane ne couvre pas un suffixe réduit à `/${…}` ; le gabarit des landings est couvert par le test `getPathname` et par le type de `slug`.

**Backlog** — Relevé pendant la PR, rien corrigé, consigne « BACKLOG seulement » :
- `Product.url` et `Offer.url` des 13 fiches de-ch visent encore `/de-ch/studio-photo/<slug>` (307) : zone Product/Offer exclue ;
- `Service.url` des 8 pages `branchen/*` en `/de-ch/industrie/<slug>` (301) et `author.url` en `/fr/a-propos` sur les articles de-ch (annexe 2.e du rapport maître) : hors des 4 défauts ;
- `ia-photo-produit` : nœud `provider` `Organization` réduit à `name`, sans `@id`, dans le bloc `SoftwareApplication` à `AggregateRating` : zone exclue ;
- `ETAT.md` présente encore #54 comme non fusionnée, alors que `main` `2854c27` en est la fusion.

**Suite** — GO de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et relevé des fils d'Ariane d'une fiche `fotostudio`, d'une page `solutions` et de la page distributeur.

---

## 2026-09-29 · #52 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : phase 2A du blog | **PR** : #52, fusionnée sur GO final de Laurent | **Commit de fusion** : `9ced920` (`main`), le 29/09/2026 à 15:25:54 UTC | **Tête fusionnée** : `4ff2f07` | **Base avant fusion** : `06483a3`

**Quoi** — La PR #52 a été sortie du brouillon puis fusionnée par commit de fusion, après CI verte sur `4ff2f07` (4 checks et Vercel) et sans fil de revue. Corrections embarquées, au rendu seulement :
- les 5 shortcodes `[embed]` YouTube passent en façade avec consentement (#44) ;
- les liens `target="_blank"` des articles sont normalisés : les 41 internes s'ouvrent dans le même onglet, les 266 externes sans protection reçoivent `rel="noopener noreferrer"`.

Aucune autre correction SEO/GEO n'est embarquée, et aucun fichier de `content/**` n'est modifié. Les 6 `<img src="*.mp4">` restent volontairement hors périmètre (backlog « intégrations legacy à traiter avec preuve »).

**Vérifié** —
- `main` = `9ced920`, parents `06483a3` et `4ff2f07` ; l'arbre de `main` est identique à celui de `4ff2f07`, la tête testée.
- Production hors Cloudflare : `sysnext.vercel.app` sert le nouveau build à partir de 15:27:22 UTC (relevé toutes les 10 s). À 15:27:01 UTC, l'ancien build était encore servi.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 15:27:26 UTC : vert, 17 pages et 3 ressources (sitemap 325 URL).
- Les 125 articles, récupérés par `curl` : 125 réponses 200 ; le contenu de l'article est identique à celui du build testé sur les 125. Les mesures Chromium faites sur ce build (125 articles, 1440 et 390 px) valent donc pour la production.
- HTML de production, 125 articles :
  - 0 shortcode et 62 façades, 0 iframe YouTube ;
  - 1 078 liens hors façades ;
  - 0 lien interne en `_blank` ; 294 liens externes en `_blank`, dont 0 sans protection ;
  - 2 `target="_new"` et 6 balises `img` vers un `.mp4`, inchangés.
- Chromium sur `sysnext.vercel.app`, les réponses de production étant relayées par `curl` : le transport de Chromium échouait par intermittence dans le conteneur (`ERR_TOO_MANY_RETRIES`), alors que `curl` ne donnait aucune erreur.
  - 3 pages à shortcode, en 1440 et 390 px : débordement 0 ; façades 662×372 et 358×201 ; 0 requête YouTube au chargement et après le clic sur la façade ; fenêtre d'information ouverte, aucun nouvel onglet.
  - `/fr/a-propos` (lien relatif) et `https://www.packshot-creator.com/fr/ia-photo-produit` (lien absolu) : navigation dans l'onglet courant.
  - Deux liens externes (`lesnumeriques.com`, `shotflow.com`) : nouvel onglet. Un premier essai, avec une interception limitée à la page, n'avait observé aucun onglet ; il a été refait avec une interception au niveau du contexte.
- Aucune régression constatée.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app` (même projet, le Worker relaie le HTML sans le réécrire).

**Non regardé** — `www` (R4) ; Safari et appareils réels ; balayage Chromium des 125 articles directement en production, remplacé par l'identité du contenu avec le build testé.

**Suite** — Laurent, dans Chrome sur `www`, desktop puis mobile : deux pages à shortcode, un lien interne et un lien externe d'article (détail dans `ETAT.md`). Backlog inchangé : MP4, saasphoto, Sketchfab, F10, `alt` Webflow, traductions.

---

## 2026-09-29 · `llms.txt` — « officiel » (D6), assertion de date retirée, 16 secteurs · Claude de Laurent

**Chantier** : audit SEO/GEO du 29/09, PR technique 1 (constat P0-1) | **PR** : #54, brouillon, non fusionnée | **Base** : `main` `9ced920`

**Quoi** — Trois modifications dans `public/llms.txt`, rien d'autre :
- l. 3 : « Distributeur exclusif France & Suisse » → « Distributeur officiel France & Suisse » ;
- l. 5 : « Packshot Creator existe depuis 2004, » retiré ; aucune date ni ancienneté ajoutée ;
- l. 27 : « 15 secteurs » → « 16 secteurs », soit le nombre d'entrées listées l. 29-44.

**Pourquoi** — D6 proscrit « exclusif » dans toute revendication de distribution. La date de création est contradictoire dans le dépôt : 2004 dans le schéma `Organization` et sur `/a-propos`, 2001 dans D33, « 20 ans » et « 25 ans » dans les textes. Aucune date n'est choisie ici. Le fichier listait 16 secteurs et en annonçait 15.

**Fichiers** — `public/llms.txt`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Après fusion, `/llms.txt` ne revendique plus d'exclusivité ni de date de création. Aucun effet sur les pages, le sitemap, `robots.txt` ou les données structurées.

**Vérifié** —
- `main` distant = `9ced920` avant modification ; branche partie de ce commit.
- Diff : 1 fichier du site, 3 lignes remplacées. `git diff --word-diff` : seuls « exclusif » → « officiel », « Packshot Creator existe depuis 2004, » retiré et « 15 » → « 16 ».
- Mesures sur le fichier : « exclusi » 1 → 0 ; année, « depuis » ou « N ans » 1 → 0 ; secteurs annoncés 15 → 16, secteurs listés 16.
- `npx tsc --noEmit` vert ; `verifier-json` : 186 JSON valides ; `npx next build` vert, variables factices.
- `next start` local : `/llms.txt` en 200 `text/plain; charset=UTF-8`, identique octet pour octet au fichier ; `smoke.mjs http://localhost:3031` vert, 17 pages et 3 ressources (`llms.txt` 3 779 octets).
- `verifier-consequences.mjs` sur la liste des fichiers : « Effet local ».
- `sysnext.vercel.app/llms.txt` était identique au dépôt avant modification (relevé du 29/09).

**Supposé** — [Inférence] `www` sert le même `llms.txt` que `sysnext.vercel.app` ; non contrôlable depuis le conteneur (R4).

**Non regardé** — Preview Vercel (SSO) et `www` (R4). Hors périmètre de cette PR, sans modification : les autres occurrences de « exclusive » du dépôt (`lib/lead-enrichment.ts`, articles) et la date de création ailleurs (schéma `Organization`, `/a-propos`, textes), suivies par l'audit du 29/09 (D33).

**Suite** — GO de Laurent, fusion, `smoke.mjs` sur `sysnext.vercel.app`, puis `https://www.packshot-creator.com/llms.txt` dans Chrome. Aucune date de création ne sera réintroduite dans `llms.txt` avant l'alignement D33 du schéma et de `/a-propos`.

---

## 2026-09-29 · Phase 2A — règle UX finale : liens internes dans le même onglet · Claude de Laurent

**Chantier** : phase 2A du blog | **PR** : #52, brouillon, non fusionnée | **Base** : `main` `06483a3`

**Quoi** — `addRelToBlankTargets` (`lib/blog-utils.ts`) applique la règle UX finale de Laurent du 29/09, qui remplace l'arbitrage précédent (`noopener` seul sur les liens internes) :
- lien interne (`isInternalHref`) en `target="_blank"` : `target` retiré, ouverture dans le même onglet ; aucun `rel` ajouté, un `rel` existant conservé tel quel ;
- lien externe en `_blank` sans protection : `target` conservé, `rel="noopener noreferrer"` ajouté ;
- lien externe déjà protégé, et toute autre cible (`_new`, `_self`…) : inchangés.

Liens internes : `/…`, `#…`, `?…`, et URL absolues vers `packshot-creator.com` ou `www.packshot-creator.com`. Les sous-domaines, `mailto:`, `tel:` et les liens sans `href` sont externes. Aucun de ces cas n'existe dans le corpus : aucun `mailto:` ni `tel:`, même hors `_blank`.

**Pourquoi** — Règle UX de Laurent du 29/09 : un lien interne PackshotCreator reste dans le même onglet ; les liens externes gardent `_blank`, protégés.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Les 41 liens internes des articles s'ouvrent dans l'onglet courant. Les liens externes gardent leur comportement, avec la protection `window.opener`.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest 290/290 (260 sur `main`) ; `verifier-json` : 186 JSON valides ; `npx next build` vert ; ESLint : seules les 2 alertes `no-explicit-any` de `getBlockText`, déjà présentes sur `main`.
- HTML prérendu, `main` contre branche, 375 fichiers : 83 articles modifiés, rien d'autre. `fr/blog/generer-images-produit-ia` s'ajoute aux 82 précédents : c'est la page du lien interne absolu qui portait déjà `rel="noopener"`.
- Sur les 125 articles, 0 différence non classée. La transformation attendue a été réappliquée à `main` par un code Python indépendant : 41 `target` retirés, 266 `rel` ajoutés.
- Liens des articles, façades exclues, de `main` à la branche :
  - 1 078 liens des deux côtés : aucun lien supprimé ;
  - 0 `href`, 0 texte de lien et 0 autre attribut modifié ;
  - `_blank` : 335 → 294 ; internes en `_blank` : 41 → 0 ; externes en `_blank` : 294 → 294, dont 0 sans `rel` (266 sur `main`) ;
  - les 28 externes déjà en `rel="noopener"` sont identiques ; l'interne en `rel="noopener"` perd `target` et garde son `rel` ;
  - 2 `target="_new"`, 6 balises `img` vers un `.mp4` et 62 façades inchangés.
- E2E : 6 specs, build local de la branche, Chromium et Pixel 5, résolution DNS externe coupée : 557 réussis et 25 échecs, les mêmes 25 que sur `main` ; 0 nouvel échec.
- Chromium, 125 articles, 1440 et 390 px, comparés aux mesures de `main` : aucune différence hors champs attendus ; 250 réponses 200 ; 0 lien interne relatif en `_blank` ; 0 lien `_blank` sans `rel` ; 0 requête YouTube au chargement ; débordement à 390 : 0 page.
- Clic réel, Chromium : « À propos » (`/fr/a-propos`, `focus-sur-lhyperfocus`) et le lien absolu `https://www.packshot-creator.com/fr/ia-photo-produit` (`generer-images-produit-ia`) naviguent dans l'onglet courant, sans nouvel onglet ; un lien externe (`lesnumeriques.com`) ouvre un nouvel onglet.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`.

**Non regardé** — `www` (R4), Preview Vercel (SSO), Safari et appareils réels. MP4 : aucune modification (`MP4_SAFE_TO_FIX = NO`), backlog « intégrations legacy à traiter avec preuve ».

**Suite** — GO final de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et contrôle Chrome sur `www`. Sur `www`, vérifier qu'un lien interne d'article, par exemple « À propos » dans `/fr/blog/focus-sur-lhyperfocus`, s'ouvre dans le même onglet.

---

## 2026-09-29 · Phase 2A — arbitrage F22 de Laurent : `noopener` seul sur les liens internes · Claude de Laurent

**Chantier** : phase 2A du blog | **PR** : #52, brouillon, non fusionnée | **Base** : `main` `06483a3`

**Quoi** — `addRelToBlankTargets` distingue désormais la cible du lien (`isInternalHref`, `lib/blog-utils.ts`) :
- lien `target="_blank"` interne sans `rel` : `rel="noopener"` seul ;
- lien externe sans `rel` : `rel="noopener noreferrer"`, inchangé par rapport à l'entrée précédente ;
- `rel` contenant déjà `noopener` ou `noreferrer` : lien inchangé.

Interne signifie : `href` résolu depuis `https://www.packshot-creator.com/` vers `packshot-creator.com` ou `www.packshot-creator.com`, en http ou https. Cela couvre les chemins relatifs, les ancres, les requêtes et les URL absolues du site. Tout le reste est externe : autres domaines, sous-domaines (`videos.`, `trail.`…), `mailto:`, `tel:`, `href` absent. Aucun `mailto:`, `tel:`, sous-domaine ni lien sans `href` dans le corpus.

**Pourquoi** — Arbitrage de Laurent du 29/09 sur les deux points laissés ouverts :
- les 29 liens `rel="noopener"` restent tels quels : `noopener` protège déjà `window.opener` en conservant le Referer ;
- les 40 liens internes n'ont pas besoin de `noreferrer`, qui supprimerait le Referer d'une navigation interne sans nécessité.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Identique à l'entrée précédente, sauf pour les 40 liens internes `_blank`, qui gardent leur Referer.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest 289/289 (260 sur `main`) ; `verifier-json` : 186 JSON valides ; `npx next build` vert ; ESLint : seules les 2 alertes `no-explicit-any` de `getBlockText`, déjà présentes sur `main`.
- HTML prérendu, `main` contre branche, 375 fichiers : seuls les 82 articles déjà attendus diffèrent. Sur les 125 articles, 0 différence non classée. Les 306 `rel` ajoutés sont conformes à la règle, vérifiée par un classement indépendant du code (`urllib` Python) : 40 internes en `noopener`, 266 externes en `noopener noreferrer`.
- Corpus rendu, façades exclues :
  - 335 liens `_blank`, dont 0 sans `rel` (306 sur `main`) ;
  - 41 internes, tous en `noopener`, aucun en `noreferrer` : les 40 corrigés et 1 déjà en `rel="noopener"` ;
  - 294 externes : 266 en `noopener noreferrer` et 28 déjà en `rel="noopener"` ;
  - les 29 liens `rel` existants identiques octet pour octet ;
  - 62 façades, 2 `target="_new"` et 6 balises `img` vers un `.mp4` inchangés.
- E2E : mêmes 6 specs, build local de la branche, Chromium et Pixel 5, résolution DNS externe coupée : 557 réussis et 25 échecs, les mêmes 25 que sur `main` (passage précédent, mêmes conditions) ; 0 nouvel échec.
- Chromium, 125 articles, 1440 et 390 px, comparés aux mesures de `main` : aucune différence hors champs attendus ; 250 réponses 200 ; 40 liens internes relatifs en `noopener`, aucun en `noreferrer` ; liens `rel="noopener"` seul : 29 → 69 ; 0 lien `_blank` sans `rel` ; 0 requête YouTube au chargement ; débordement à 390 : 0 page.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`.

**Non regardé** — `www` (R4), Preview Vercel (SSO), Safari et appareils réels. MP4 : aucune modification (`MP4_SAFE_TO_FIX = NO`). Ils rejoignent, sur décision de Laurent, le backlog « intégrations legacy à traiter avec preuve », avec saasphoto, Sketchfab, F10, les `alt` Webflow et les traductions.

**Suite** — GO final de Laurent, puis fusion, `smoke.mjs` sur `sysnext.vercel.app` et contrôle Chrome sur `www` des 3 pages à shortcode.

---

## 2026-09-29 · Phase 2A — shortcodes `[embed]` YouTube en façade et `rel` des liens `target="_blank"` (F22), au rendu · Claude de Laurent

**Chantier** : phase 2A du blog, correctifs runtime des anciens contenus Webflow, sur consigne de Laurent du 29/09 | **PR** : #52, brouillon, branche `claude/awesome-dirac-j9uvw1`, non fusionnée | **Base** : `main` `06483a3`

**Quoi** —
- **Shortcodes** : `transformEmbedShortcodes` (`lib/blog-utils.ts`) remplace au rendu chaque `[embed]<URL YouTube>[/embed]` d'un paragraphe par la façade de #44 (`renderFacade`, désormais exportée de `lib/youtube.ts`, sans autre changement). Aucune iframe, aucun appel YouTube avant accord ; le texte du paragraphe autour du shortcode reste dans un paragraphe aux mêmes attributs, une partie vide n'est pas émise. Le compteur vidéo inclut ces façades : `YouTubeConsent` est monté sur les 3 pages concernées.
- **F22** : `addRelToBlankTargets` ajoute `rel="noopener noreferrer"` aux liens `target="_blank"` sans `rel`. Un `rel` existant garde ses jetons, ses guillemets et sa place ; s'il contient déjà `noopener` ou `noreferrer`, le lien est inchangé, sinon les deux jetons sont ajoutés à la suite. `target`, `href` et texte intacts, jamais de second `rel`.
- **MP4** : non traités (`MP4_SAFE_TO_FIX = NO`, voir « Non regardé »).

**Pourquoi** — Audit phase 2 : 5 shortcodes affichés en texte brut sur 3 pages, avec 19 px de débordement horizontal à 390 px ; 306 liens `target="_blank"` sans `rel` sur 79 pages.

**Micro-audit avant code** —
- 5 shortcodes, tous `https://youtu.be/<id>` : `HVmUF6Mjan8` ×3 et `xZ_lJM-ClSs` ×2, dans `content/blog/fr/photographie-2d-de-produits.json`, `content/blog/en/photographie-2d-de-produits.json` (2 chacun, paragraphe seul) et `content/blog/fr/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter.json` (1, en fin de paragraphe après du texte). Aucune iframe YouTube sur ces 3 pages avant correction.
- 6 `<img src="*.mp4">` sur 6 pages, 4 fichiers présents (235 à 301 Ko, piste vidéo seule, aucune piste audio, 1,8 à 2,4 s, 7 à 19 images). Ce ne sont pas des vidéos Webflow : balisage Webflow `data-rt-type="image"`, et le script de migration historique (`scripts/extract-webflow-content.mjs`, lu dans `061e05d`, l. 380-393) convertissait tout GIF en MP4 par ffmpeg sans changer la balise `<img>`.

**Fichiers** — `lib/blog-utils.ts`, `lib/youtube.ts` (mot-clé `export` sur `renderFacade` et `FacadeInput`), `lib/__tests__/blog-utils.test.ts`, `lib/__tests__/youtube.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Aucun fichier de `content/**`, `messages/*`, #27, #43, ni Cloudflare touché.

**Effet attendu** — Dès la mise en production : 3 pages sans shortcode visible ni débordement mobile, 5 vidéos lisibles après accord ; 306 liens protégés contre `window.opener`. Aucun effet SEO direct attendu : textes, titres, `href`, JSON-LD et sitemap inchangés.

**Vérifié** —
- `npx tsc --noEmit` vert ; Vitest 284/284 (14 fichiers) ; `verifier-json` : 186 JSON valides ; `npx next build` vert (valeurs factices de la CI) ; ESLint sur les fichiers modifiés : 2 alertes `no-explicit-any` de `getBlockText`, déjà présentes sur `main`.
- Test corpus de #44 (`youtube.test.ts`) adapté sans affaiblissement : 57 façades issues d'iframes (inchangé), 5 issues de shortcodes, total 62, aucune iframe YouTube.
- HTML prérendu, build de `main` contre build de la branche, 125 articles (DOM et flux RSC), identifiants de build neutralisés, chaque différence classée automatiquement :
  - 82 pages modifiées : 79 par F22 seul, 3 par les shortcodes seuls ;
  - 306 attributs `rel="noopener noreferrer"` ajoutés, rien d'autre sur ces liens ;
  - 5 shortcodes remplacés par 5 façades ; 4 paragraphes réduits au shortcode retirés, 1 paragraphe conservé avec son texte ;
  - hors article, sur les 3 pages à shortcode : `<dialog>` de `YouTubeConsent` inséré, identique octet pour octet à celui des pages vidéo existantes, et sa référence dans le flux RSC ;
  - 0 différence non classée. Hors articles : 375 fichiers prérendus comparés, seules différences les 82 articles et les `lastmod` du sitemap (heure de build, 325 URL des deux côtés).
- Comptages sur les articles rendus, `main` → branche : shortcodes 5 → 0 ; liens `target="_blank"` sans `rel` 306 → 0 ; liens `_blank` hors façades 335 → 335 ; 29 liens `rel="noopener"` identiques ; façades 57 → 62 ; iframes YouTube 0 → 0 ; `<img src="*.mp4">` 6 → 6 ; `__wf_reserved_inherit` 167 → 167 ; iframes sans `title` 3 → 3 ; `h2` 706, `h3` 838, `h4` 147, `li` 2 232, `ul` 647, `ol` 30, `.tldr` 7 : inchangés ; `p` 2 465 → 2 461.
- Chromium, 1440 et 390 px, `main` contre branche :
  - 3 pages à shortcode : débordement 19 px → 0 à 390 px ; façades 662×372 et 358×201 (ratio 1,78), écart de 32 px avant et après, comme les façades existantes ; styles de paragraphes et de listes identiques ; 0 requête YouTube au chargement ; au clic, fenêtre d'information, toujours 0 requête ; « Autoriser et lire la vidéo » : lecteur `youtube-nocookie.com/embed/<id>?autoplay=1&rel=0`, `title` et `referrerpolicy="strict-origin-when-cross-origin"`, comme sur une façade existante.
  - 125 articles, 1440 et 390 : 250 réponses 200 par cible ; aucune différence hors champs attendus (texte hors shortcodes, titres, listes, TL;DR, liens du sommaire, Vimeo, Sketchfab, saasphoto, scripts Orbitvu, images, MP4) ; 0 requête YouTube ; débordement à 390 : 3 pages sur `main`, 0 sur la branche.
- E2E : 6 specs (`anchors`, `seo`, `mobile-overflow`, `external-links`, `youtube-consent`, `cookie-banner`), builds locaux de `main` et de la branche, Chromium et Pixel 5, résolution DNS externe coupée : 557 réussis et 25 échecs de chaque côté, les mêmes 25 qu'à la phase 1 (SEO 16, bandeau cookies 5, ancre `#calculateur-roi` 2, débordement de `/fr` 2), aucun sur un article ; 0 nouvel échec.
  - Premier passage écarté : 91 échecs sur `main`, 108 sur la branche, presque tous des dépassements de délai. Cause établie : 3 requêtes `/_next/image` (logos `.avif`) bloquées sur le serveur local de la branche après l'interruption d'un passage, les 17 échecs supplémentaires portant sur `/fr` et `/en/studios-photo-automatises`, dont le HTML est identique entre `main` et la branche. Relance complète après redémarrage des deux serveurs.

**Supposé** — [Inférence] `www` sert le même HTML que `sysnext.vercel.app`, comme pour #44 et #50.

**Non regardé** —
- **MP4 (`MP4_SAFE_TO_FIX = NO`)** : origine GIF établie, mais le nombre de boucles du GIF d'origine est perdu à la conversion et les GIF ne sont pas dans le dépôt (archive web injoignable depuis le conteneur : 429 puis connexion réinitialisée). Le nom accessible des 4 vidéos dont l'`alt` vaut `__wf_reserved_inherit` relève de l'arbitrage réservé à ces `alt`. Aucune modification.
- F10, `alt="__wf_reserved_inherit"`, saasphoto, Sketchfab, Vimeo, consentement Orbitvu, sommaire mobile, traductions : hors périmètre sur consigne de Laurent.
- 2 liens `target="_new"` (gnpp.wordpress.com, FR et EN) : hors du périmètre `_blank`, inchangés.
- `www` (R4), Preview Vercel (SSO), Safari et appareils réels.

**Suite** — Deux interprétations à confirmer par Laurent avant fusion :
- les 29 liens `rel="noopener"` sont laissés inchangés, alors que la consigne « ajouter les jetons manquants » donnerait `noopener noreferrer`, comme l'exige `e2e/external-links.spec.ts` sur les pages hors blog ;
- les 40 liens internes `target="_blank"` reçoivent `rel` (condition de « WITHOUT_REL = 0 »), sans changement de `target` ni de `href`.
Après fusion : `smoke.mjs` sur `sysnext.vercel.app`, puis contrôle Chrome sur `www` des 3 pages à shortcode.

---

## 2026-09-29 · #50 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : phase 1 structurelle du blog (F1, F16, F19, F11, F2 limité aux 2 Vimeo) | **PR** : #50, fusionnée sur GO final de Laurent | **Commit de fusion** : `28a1169` (`main`), le 29/09/2026 à 10:33:42 UTC | **Tête fusionnée** : `a9aae77` | **Base avant fusion** : `2de576a`

**Quoi** — GO final donné par Laurent après son contrôle visuel du Preview : desktop validé ; contrôle mobile complet « PASS_WITH_NOTES », 18 combinaisons page × profil sans débordement ni régression de #50.

Contrôles préalables à 10:33 UTC :
- `main` inchangé (`2de576a`) ;
- tête #50 `a9aae77`, 1 commit ;
- PR fusionnable (`clean`) ;
- 4 checks et Vercel en succès ;
- #48 fermée sans fusion.

La PR a été sortie du brouillon, puis fusionnée par commit de fusion. Aucune autre modification de code. #43, #27, `content/**` et Cloudflare non touchés.

**Vérifié** —
- `main` = `28a1169`, parents `2de576a` et `a9aae77` ; l'arbre de `main` est identique à celui de `a9aae77`, la tête testée.
- Production hors Cloudflare : `sysnext.vercel.app` sert le nouveau build à partir de 10:35:02 UTC (première observation, relevé toutes les 10 s : classe `blog-article` présente). À 10:34:52 UTC, l'ancien build était encore servi.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 10:35:07 UTC : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- Chromium sur `sysnext.vercel.app`, 125 articles en 1440 et 390 px (10:35 à 10:37 UTC) :
  - 250 réponses 200 ;
  - 57 façades YouTube par largeur, 0 iframe YouTube brute ;
  - 0 paragraphe vide dans le DOM ;
  - 0 « &amp; » dans le sommaire ;
  - débordement horizontal : les 3 mêmes pages à 19 px en 390 qu'avant #50 (`boostez-votre-taux-de-conversion…` FR, `photographie-2d-de-produits` FR et EN), aucune nouvelle.
- Tous les indicateurs mesurés sont identiques à ceux du build testé avant fusion : statut, paragraphes vides, façades, iframes, sommaire, classe, styles calculés et figures.
  - Seule différence : la hauteur totale de page, sur 41 relevés sur 250. Elle vient du chargement différé des images au moment du relevé : `avantages-toplight-photographie-produits` (FR) mesure 9 490 px en local comme en production dans les mêmes conditions, et l'écart de 2 706 px observé correspond à la hauteur de ses images.
- Pages demandées, en 1440 et 390 :
  - `/en/blog/8-steps-to-professional-jewelry-photography` : paragraphes 20 px, puces `disc` et retrait 26 px, listes imbriquées `circle`, liens soulignés, façade 662×372 et 358×201 ;
  - `/fr/blog/optimiser-collaboration-equipe-success-story-shotflow` et `/en/blog/optimize-team-collaboration-success-story-shotflow` : Vimeo 662×373 et 358×202, vide 0 ;
  - `/fr/blog/generer-images-produit-ia` : paragraphe du `.tldr` à 0 px, inchangé ; listes et liens corrigés ;
  - `/en/blog/5-cameras-realistic-3d-animation` : 2 façades intactes (662×372 et 358×201), 0 débordement.

**Supposé** — `www` sert le même HTML que `sysnext.vercel.app` (même projet, le Worker relaie le HTML sans le réécrire).

**Non regardé** — `www` (R4) ; e2e contre la production (les specs ont été passées avant fusion sur les builds locaux de `main` et de la branche, d'arbre identique à la production : mêmes 25 échecs préexistants, aucun nouveau).

**Suite** —
- Laurent, dans Chrome sur `www`, desktop puis mobile : un article Webflow, un natif et un article Vimeo.
- Anomalie séparée, signalée par le contrôle mobile de Laurent et présente à l'identique sur `main` avant #50 : à 390 px, après un clic dans le sommaire, le `h2` visé reste partiellement masqué. Ce n'est pas une régression de #50, qui ne l'a pas corrigée ; je ne l'ai pas reproduite moi-même.
- Restent hors phase : F10, F22, saasphoto, Sketchfab, rendu des guides, chantier éditorial et traductions des anciens articles Webflow.

---

## 2026-09-29 · Phase 1 structurelle du blog — typographie, paragraphes vides, sommaire, 2 figures Vimeo · Claude de Laurent

**Chantier** : phase 1 structurelle du blog (F1, F16, F19, F11, F2 limité aux 2 Vimeo), GO d'implémentation de Laurent du 29/09 | **PR** : brouillon, branche `fix/blog-structure-phase1-2026-09`, non fusionnée | **Base** : `main` `2de576a` | Remplace le seul correctif encore utile de #48

**Quoi** —
- **F1 et F16** : règles CSS limitées au gabarit `app/[lang]/blog/[slug]` (classe `blog-article` sur `<article>`), en `@layer components` et `:where()`.
  - Paragraphes : marges de 20 px.
  - Listes : puces et numéros, retrait de 26 px, listes imbriquées en `circle` ou `lower-alpha`.
  - Liens : soulignés, couleur `--very-peri-6`.
  - Titres : `h4` 18 px/600, `h5` 16 px/600, `h6` 14 px/600 en majuscules.
  - Inchangés : `h2`, `h3`, `.tldr` (paragraphe et puces exclus explicitement), `.table-wrap`, `.article-signature`, `.pkc-yt*`, crédits Sketchfab.
- **F19** : `removeEmptyParagraphs`, appliquée au rendu dans `processHtmlContent`, retire les `<p>` sans attribut (ou avec `id=""` seul), sans balise, faits seulement d'espaces ou de caractères invisibles. 998 paragraphes retirés sur 107 pages (984 ZWJ, 14 espaces). Aucun JSON modifié.
- **F11** : texte du sommaire décodé (`decodeHtmlEntities`). 7 titres concernés ; l'`id` reste calculé sur la source, les ancres ne bougent pas.
- **F2** : la règle de #48 « figure vidéo Webflow sans légende, `padding-bottom` renseigné », reprise à l'identique, préfixe `.prose` remplacé par `.blog-article`. Elle ne cible aujourd'hui que les 2 figures Vimeo.

**Pourquoi** —
- Le plugin `@tailwindcss/typography` n'est pas chargé (Tailwind v4 ignore `tailwind.config.ts` sans `@config` ni `@plugin`). Résultat mesuré sur `main` : paragraphes sans marge, listes sans puce ni retrait, liens de la couleur du texte, `h4` à `h6` rendus comme le texte courant (16 px, graisse 400).
- Les 2 figures Vimeo laissent 373 px de vide en 1440 et 201 px en 390.
- Le sommaire affiche « Gad &amp; Co ».

**Fichiers** — `app/globals.css`, `app/[lang]/blog/[slug]/page.tsx` (1 ligne), `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. `lib/blog-html.ts` n'a pas été créé : sans F22, il ne resterait que deux fonctions, placées avec les autres transformations HTML de `lib/blog-utils.ts`, qu'aucune PR ouverte ne modifie. Aucun fichier de `content/**`, de #44 (`lib/youtube.ts`, `YouTubeConsent.tsx`, règles `.pkc-yt*`), `CookieBanner.tsx`, `messages/*`, #43, #27 ni Cloudflare touché.

**Effet attendu** — Dès la mise en production, sur les 125 articles du gabarit (natifs compris) : paragraphes espacés, listes lisibles, liens visibles ; les 2 vidéos Vimeo sans vide dessous. Aucun effet SEO direct : textes, liens, balises et JSON-LD sont identiques dans le HTML servi, hors transformations visées.

**Vérifié** —
- `npx tsc --noEmit` vert.
- Vitest : 260/260, dont 10 nouveaux tests.
- ESLint sur les fichiers modifiés : 3 alertes, toutes déjà présentes sur `main` (2 `no-explicit-any` dans `getBlockText`, import `HeadingData` inutilisé).
- `verifier-json` : 186 JSON valides.
- `npx next build` vert (valeurs factices de la CI).
- CSS compilé (lecture par postcss) : règles F1 dans `@layer components` ; règle Vimeo, `.tldr`, `.pkc-yt` et `.article-signature` hors couche.
- HTML servi des 125 pages, build de `main` contre build de la branche : identique après les seules transformations visées :
  - 998 paragraphes vides retirés ;
  - 7 titres du sommaire décodés ;
  - classe `blog-article` sur les 125 `<article>`.
- Chromium, 1440 et 390 px, 125 pages :
  - 250 réponses 200 ;
  - 0 paragraphe vide dans le DOM (1 996 sur `main`) ;
  - 57 façades et 0 iframe YouTube brute par largeur ;
  - 0 « &amp; » dans le sommaire (7 par largeur sur `main`) ;
  - débordement horizontal : 3 pages à 19 px en 390, identiques sur `main` (`boostez-votre-taux-de-conversion…` FR, `photographie-2d-de-produits` FR et EN).
- Styles calculés, `main` → branche :

  | Élément | `main` | Branche |
  |---|---|---|
  | Paragraphe | marges 0 px | marges 20 px |
  | `ul` | pas de puce, retrait 0 px | `disc`, retrait 26 px |
  | Liste imbriquée | pas de puce | `circle` |
  | `ol` | pas de numéro | `decimal` |
  | Lien | rgb(13,23,26), non souligné | rgb(82,82,185), souligné |
  | `h2`, `h3` | — | identiques |
  | `h4` | 16/400 | 18/600 |
  | `h5` | 16/400 | 16/600 |
  | `h6` | 16/400 | 14/600, majuscules |

- Vimeo, FR et EN :

  | Largeur | `main` | Branche |
  |---|---|---|
  | 1440 | 662×523, iframe 300×150, vide 373 | 662×373, vide 0 |
  | 390 | 358×352, vide 201 | 358×202, vide 0 |

  Paragraphe suivant à 20 px.
- Inchangés, par mesure :
  - les 40 autres figures des pages détaillées : façades pleine largeur 662×372 et 358×201, façades centrées 576×324, légendes Orbitvu, saasphoto 662×174 avec iframe 300×150, Sketchfab 662×175 avec iframe 300×150 ;
  - encadrés `.tldr` (225, 377 et 353 px), signature (111 px), crédits Sketchfab (#1CAAD9, sans soulignement, graisse 700), couleurs de `h2` et `h3`, comparés à `sysnext.vercel.app`.
- Specs e2e (`anchors`, `seo`, `mobile-overflow`, `external-links`, `youtube-consent`, `cookie-banner`), sur le build local, en Chromium et Pixel 5 : 557 réussies et 25 échecs, les mêmes 25 que sur `main`, aucun sur un article :
  - SEO title, description et hreflang : 16 ;
  - bandeau cookies : 5 ;
  - ancre `#calculateur-roi` : 2 ;
  - débordement de `/fr` : 2.

**Supposé** — [Non vérifié] Les navigateurs récents appliquent `:has()` (règle Vimeo) et `:not()` avec sélecteur complexe (exclusions de F1). Sinon, la règle concernée est ignorée et le rendu reste celui d'aujourd'hui.

**Non regardé** —
- `www` (R4), Preview Vercel (SSO), Safari et appareils réels.
- Les autres usages de `.prose` (guides, CGU, mentions légales, distributeur, articles statiques, `Callout`) : hors périmètre, « blog uniquement ».
- F10, F22, saasphoto et Sketchfab : hors phase 1, sur décision de Laurent.

**Suite** —
- Espacement autour des blocs : les paragraphes vides servaient d'espaceurs ; les marges normales les remplacent.
  - Sous une façade : 32 px avant un paragraphe, un `h3` ou une liste, 48 px avant un `h2` (marge actuelle du titre).
  - Sous Sketchfab : le `h2` suivant est à 73 px du bas de l'iframe en 1440 (92 px en 390), sans le paragraphe vide intercalé.
- #48 fermée sans fusion après l'ouverture de cette PR : rendue obsolète par #44 pour YouTube, son correctif Vimeo est repris ici.
- Après fusion :
  - `node scripts/seo/smoke.mjs https://sysnext.vercel.app` ;
  - contrôle Chrome sur `www` d'un article Webflow, d'un natif et d'un article Vimeo.
- Restent hors phase : F10 (3 iframes sans `title`), F22 (306 liens `_blank` sans `rel`), saasphoto (302 puis 402 depuis le conteneur), Sketchfab (iframe 300×150), rendu des guides.

---

## 2026-09-29 · #44 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : vidéos YouTube des articles, façade locale et consentement contextuel | **PR** : #44, fusionnée sur GO final de Laurent | **Commit de fusion** : `b10bb5e` (`main`), le 29/09/2026 à 08:17:25 UTC | **Tête fusionnée** : `cfb271d` | **Base avant fusion** : `a1771be`

**Quoi** — Laurent a validé le Preview et le texte de la page de confidentialité. Contrôles préalables à 08:17 UTC :
- `main` inchangé (`a1771be`) ;
- tête #44 `cfb271d` ;
- PR fusionnable (`clean`) ;
- 4 checks et Vercel en succès ;
- 4 commits, tous connus.

La PR a été sortie du brouillon, « NE PAS FUSIONNER » retiré du titre et de la description, puis fusionnée par commit de fusion. PR #48 non touchée, phase 1 non lancée, aucun changement dans `content/**` ni côté Cloudflare.

**Vérifié** —
- `main` = `b10bb5e`, parents `a1771be` et `cfb271d` ; l'arbre de `main` est identique à celui de `cfb271d`, la tête testée.
- Production hors Cloudflare : `sysnext.vercel.app` sert les façades à partir de 08:18:53 UTC (première observation, relevé toutes les 10 s). À 08:16:49 UTC, avant fusion, l'article cible avait encore 2 iframes YouTube brutes.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 08:18:58 UTC : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- Les 49 articles à vidéo répondent 200 : 57 façades (FR 29, EN 28), 0 iframe YouTube brute.
- `/fr/confidentialite` et `/en/confidentialite` répondent 200. Le nouveau texte de l'article 6 (« Vidéos YouTube ») est présent, et l'ancienne phrase « Aucun cookie marketing n'est utilisé actuellement sur ce site. » ne l'est plus. `/de-ch/confidentialite` répond 404 : les pages légales sont en français seulement (`DE_CH_PIN_FR` dans `i18n/deChCoverage.ts`), et #44 ne modifie pas ce fichier.

**Supposé** — `www` sert le même HTML que `sysnext.vercel.app` (même projet, le Worker relaie le HTML sans le réécrire).

**Non regardé** — `www` (R4 : 403 de challenge Cloudflare pour les scripts, certificat du proxy refusé par le Chromium du conteneur) ; parcours de consentement en production réelle ; Safari et appareils réels.

**Suite** —
- Laurent, dans Chrome sur `www`, un article à vidéo, desktop puis mobile :
  - aucune requête YouTube avant le clic ;
  - fenêtre d'information, puis « Autoriser et lire la vidéo » : lecture sans erreur 153 ;
  - catégorie « Vidéos YouTube » dans le bandeau cookies.
- Points restés ouverts : vide Webflow sous les 2 figures Vimeo ; clic « Personnaliser » en Pixel 5 (existe déjà sur `main`) ; 3 iframes sans `title` (saasphoto 2, Vimeo 1) ; audit de la carte Google Maps de `/contact` ; garde `addYouTubeReferrerPolicy` retirable sur décision ; #48 ne concerne plus que les 2 figures Vimeo.

---

## 2026-09-29 · #44 — reprise technique sur `main` (vidéos YouTube en façade, correctif 153 de #46 conservé) · Claude de Laurent

**Chantier** : vidéos YouTube des articles, façade locale et consentement contextuel | **PR** : #44, brouillon, non fusionnée | **Branche** : `claude/admiring-hypatia-7pir8f` | **Tête avant reprise** : `c304f5d` | **Base intégrée** : `main` `a1771be`, par commit de fusion (pas de rebase)

**Quoi** — Fusion de `main` dans la branche de #44, avec trois conflits résolus :
- `lib/blog-utils.ts` : dans `processHtmlContent`, `transformYouTubeEmbeds` (#44) est conservé et `addYouTubeReferrerPolicy` (#46) est appliquée ensuite sur sa sortie ; le retour garde `videoCount`. `addYouTubeReferrerPolicy` est exportée pour être testée directement.
- `docs/seo-geo/ETAT.md` et `docs/seo-geo/JOURNAL.md` : entrées de `main` (#45, #46, #47) conservées intégralement ; ligne et entrée de #44 conservées, dans l'ordre chronologique.

Tests de #46 (`lib/__tests__/blog-utils.test.ts`), adaptés sans suppression :
- 7 tests vérifiaient la sortie brute de `processHtmlContent`, où l'iframe YouTube est désormais une façade. Les 8 premiers cas portent maintenant directement sur `addYouTubeReferrerPolicy`, avec les mêmes attentes ; les cas « iframes non YouTube » et « liens » vérifient toujours aussi `processHtmlContent`.
- Le 9e (mots et sommaire) est reformulé : la sortie retraitée contient désormais le texte visible de la façade, la comparaison se fait donc entre le contenu avec et sans vidéo.
- 5 tests d'intégration ajoutés : aucune iframe YouTube brute en sortie (5 variantes, dont `referrerpolicy` préexistant), identifiant illisible retiré, aucun `referrerpolicy` en double, deux passages identiques, mots et sommaire inchangés.

**Pourquoi — relation #46 / #44** — Après #44, aucune iframe YouTube ne sort de `processHtmlContent`. `transformYouTubeEmbeds` la remplace par une façade, ou la retire si l'identifiant est illisible. Ses hôtes reconnus couvrent ceux de #46. `addYouTubeReferrerPolicy` ne modifie donc plus rien : 0 iframe YouTube brute mesurée sur les articles du build. Elle reste en garde, conformément à la consigne de ne supprimer aucune modification de `main` venue de #46. Le correctif 153 des vidéos est porté par le lecteur créé après accord (`components/blog/YouTubeConsent.tsx`, `referrerPolicy = 'strict-origin-when-cross-origin'`). Aucun double `referrerpolicy` n'est possible : aucune iframe YouTube n'est rendue côté serveur, et la fonction ne touche pas une iframe qui en porte déjà un.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts`, `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Aucun fichier de `content/**`, de #48 ni de la phase 1 touché.

**Effet attendu** — Aucun à ce stade : PR en brouillon, non fusionnée.

**Vérifié** —
- `npx tsc --noEmit` OK ; `npx vitest run` 250/250 (14 fichiers, dont `lib/__tests__/youtube.test.ts` de #44) ; `node scripts/seo/verifier-json.mjs` 186 fichiers valides ; `npx next build` vert (valeurs factices de la CI). eslint : aucune erreur nouvelle ; les 2 `no-explicit-any` de `getBlockText` existent déjà sur `main`.
- E2E : configuration temporaire hors dépôt, `next start` local, Chromium du conteneur, Desktop Chrome et Pixel 5.
  - `e2e/youtube-consent.spec.ts` : 16/16.
  - `e2e/cookie-banner.spec.ts` : 17/22. La même spec de `main`, jouée sur le build de `main`, donne 16/20 avec les mêmes 4 échecs : GA4 ×2 (`NEXT_PUBLIC_GA_MEASUREMENT_ID` absente au build local) et clic « Personnaliser » en Pixel 5 ×2. Le 5e échec est le test `externalMedia` ajouté par #44 : il bute sur ce même clic en Pixel 5 et réussit en Desktop Chrome.
- Inventaire du HTML prérendu (articles du blog) :
  - 57 façades (FR 29, EN 28, de-ch 0), dont 53 `pkc-yt--fullwidth` et 4 `pkc-yt--center` : les 2 figures à `padding-bottom:33.72%` (`ai-virtual-lights…` FR et EN) et les 2 YouTube à `padding-bottom:` vide (`photographie-de-produits-a-360…` FR et EN) ;
  - 0 iframe YouTube brute ;
  - iframes restantes dans les articles : 6 (Vimeo 2, Sketchfab 2, saasphoto 2), dont 3 sans `title` (saasphoto 2, Vimeo 1), aucune YouTube ;
  - façades : 57/57 avec `aria-label`. 23 portent le titre de l'iframe ou de la légende ; 34 un libellé générique (« Lire la vidéo YouTube », « Play the YouTube video » ou équivalent de-ch). Le lecteur créé après accord porte un `title` : le titre, sinon « Vidéo YouTube » ou « YouTube video ».
- Mesures Chromium, 1440 et 390 px, 9 articles :
  - façades pleine largeur 662 × 372 et 358 × 201, centrées 576 × 324 (plafond 36rem) et 358 × 201, ratio 1,78, 0 px de vide sous les façades ;
  - 6 légendes sous la vidéo ;
  - débordement horizontal 0 ;
  - Vimeo : figure Webflow inchangée, iframe 300 × 150 et 373 px de vide en 1440 (201 en 390), identique à `main` ; saasphoto : 300 × 150, inchangé.
- Consentement et erreur 153 : HTML du build #44 servi sous `sysnext.vercel.app` avec `Referrer-Policy: same-origin` ajouté, EN et FR, desktop 1440 et Pixel 7.
  - 0 requête YouTube avant le clic.
  - Après « Autoriser et lire » : lecteur `youtube-nocookie.com/embed/VssNUk1qsXg?autoplay=1&rel=0` avec `title` et `referrerpolicy="strict-origin-when-cross-origin"`, Referer `https://sysnext.vercel.app/`, lecteur en `playing-mode` dans les 4 cas. 3 cas ont été relancés, YouTube restant injoignable depuis le conteneur au premier passage.

**Supposé** — `www` sert le même HTML que l'origine Vercel (R4).

**Non regardé** — `www` ; Safari et WebKit réels ; appareils réels ; Preview Vercel (SSO) ; cause du clic « Personnaliser » en Pixel 5 (existe déjà sur `main`) ; vide sous les 2 figures Vimeo (hors périmètre de #44) ; F10 (non lancé).

**Suite** — Validation de Laurent : diff, mesures, texte de politique de confidentialité (commit `5c0b785`), puis décision de fusion. Points ouverts :
- vide sous les figures Vimeo ;
- clic « Personnaliser » en Pixel 5 (existe déjà sur `main`) ;
- 3 iframes sans `title` ;
- garde `addYouTubeReferrerPolicy`, retirable plus tard sur décision ;
- recouvrement avec #48 : après #44, seules les 2 figures Vimeo restent concernées par ses règles.

---

## 2026-09-29 · YouTube 153 — #46 fusionnée et contrôlée en production (hors Cloudflare) · Claude de Laurent

**Chantier** : correctif ponctuel de l'erreur YouTube 153 | **PR** : #46, fusionnée sur GO de Laurent | **Commit de fusion** : `cd17aeb` (`main`), le 29/09/2026 à 05:31:57 UTC | **Tête fusionnée** : `870b3a1` | **Base avant fusion** : `e3197e0`

**Quoi** — La PR #46 est sortie du brouillon, puis fusionnée par commit de fusion, après CI verte sur `870b3a1` (types, build et intégrité des données ; journal ; conséquences ; Vercel) et une PR sans conflit. PR #44 non touchée. Cloudflare non modifié.

**Décision de Laurent (29/09)** — #46 d'abord, comme correctif ponctuel. Ensuite, #44 sera remise à jour depuis `main` en conservant son architecture façade et consentement, et en retirant le traitement de #46 s'il est devenu inutile. #44 n'est pas fusionnée maintenant.

**Vérifié** —
- `main` = `cd17aeb` ; `870b3a1` en est un ancêtre ; `addYouTubeReferrerPolicy` est présent dans `lib/blog-utils.ts` de `main`.
- `sysnext.vercel.app` sert le HTML corrigé à partir de 05:33:29 UTC (première observation, relevé toutes les 10 s). Avant fusion, à 05:31:49 UTC, les iframes n'avaient pas l'attribut.
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 05:33:35 UTC, moins de 2 minutes après la fusion : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- `sysnext.vercel.app`, 51 articles portant une iframe (26 FR, 25 EN), tous en 200 : iframes YouTube avec `referrerpolicy="strict-origin-when-cross-origin"` FR 29/29 et EN 28/28 ; 0 attribut en double ; les 6 iframes non YouTube sans attribut.
- Reproduction Playwright sur le HTML de production réel (`sysnext.vercel.app`), servi avec l'en-tête `Referrer-Policy: same-origin` ajouté comme devant `www`. Pages : `/en/blog/5-cameras-realistic-3d-animation` et son équivalent FR. Profils : desktop 1440 px, iPhone 13 et Pixel 7 (émulation, moteur Chromium). Pour la vidéo `VssNUk1qsXg` :
  - Referer présent (`https://sysnext.vercel.app/`) dans les 6 cas ; erreur 153 dans aucun cas ;
  - lecteur prêt dans les 6 cas, `playing-mode` après clic en desktop EN et FR et en Pixel 7 EN et FR ;
  - en iPhone 13, le clic émulé ne lance pas la lecture ;
  - desktop EN et Pixel 7 FR ont été relancés une fois, le lecteur restant illisible au premier passage (réseau du conteneur).

**Supposé** — `www.packshot-creator.com` sert le même HTML que `sysnext.vercel.app` (même projet `sysnext`, le Worker relaie le HTML sans le réécrire). Le Referer envoyé depuis `www` sera `https://www.packshot-creator.com/`.

**Non regardé** — `www.packshot-creator.com` (R4) :
- `curl` reçoit un 403 de challenge Cloudflare ;
- le Chromium du conteneur refuse le certificat du proxy (`ERR_CERT_AUTHORITY_INVALID`, y compris avec les erreurs HTTPS ignorées) ; la vérification TLS n'a pas été désactivée.

La disparition de l'erreur 153 sur `www` n'est donc pas constatée : contrôle dans Chrome à faire par Laurent. Non regardés non plus : Safari et WebKit réels, appareils mobiles réels, rendu effectif des images vidéo (`currentTime` à 0).

**Suite** —
- Laurent, dans Chrome sur `www`, sur les deux articles, desktop puis mobile réel :
  - onglet Réseau, requête `youtube.com/embed/VssNUk1qsXg` : en-tête `Referer: https://www.packshot-creator.com/` ;
  - lecteur affiché, lecture après clic, aucune erreur 153 ;
  - en-tête `referrer-policy` de la page, pour confirmer la source.
- Cloudflare : vérification séparée de la Managed Transform « Add security headers », sans modification.
- #44 : reprise séparée sur le nouveau `main`.

---

## 2026-09-29 · YouTube erreur 153 — `referrerpolicy` sur les iframes YouTube du blog · Claude de Laurent

**Chantier** : correctif ponctuel, hors `06-CHANTIERS.md` (erreur YouTube 153 signalée par Laurent) | **PR** : #46, brouillon (branche `claude/youtube-153-referrer-policy-ykjqx9`) | **Commit** : `7e4b5cb` | **Base** : `96489d9` (`main`) | **Merge et déploiement** : aucun sans GO explicite de Laurent

**Quoi** — `processHtmlContent` (`lib/blog-utils.ts`) ajoute `referrerpolicy="strict-origin-when-cross-origin"` aux seules iframes d'embed YouTube (`youtube.com` ou `youtube-nocookie.com`, avec ou sans `www`, chemin `/embed/`) qui n'en portent pas déjà. Aucun JSON de contenu, aucune URL de vidéo, aucun texte, aucun en-tête global ni réglage Cloudflare modifiés.

**Pourquoi** — Erreur 153 (« Erreur de configuration du lecteur vidéo ») constatée par Laurent sur plusieurs articles en production, dont `/en/blog/5-cameras-realistic-3d-animation`. YouTube exige le Referer pour identifier le site intégrant (Required Minimum Functionality : https://developers.google.com/youtube/terms/required-minimum-functionality). Chaîne établie :
- la réponse de `www` porte `referrer-policy: same-origin` ; l'origine Vercel (`sysnext.vercel.app`) n'envoie ni cet en-tête ni balise `<meta name="referrer">`, et le Worker déployé (`packshot-router`, lu par l'API Cloudflare) ne contient aucune occurrence de « referrer » ;
- avec `same-origin`, le navigateur n'envoie aucun Referer vers YouTube ;
- les 57 iframes issues de Webflow n'ont aucun `referrerpolicy` et héritent de la politique de la page ;
- les deux façades qui portaient déjà ce correctif (07/08, `components/video/YouTubeFacade.tsx`, `components/media/VideoFacade.tsx`) ne sont importées nulle part.

**Fichiers** — `lib/blog-utils.ts`, `lib/__tests__/blog-utils.test.ts` (nouveau), `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`

**Effet attendu** — Dès la mise en production : lecture des vidéos YouTube de 49 articles (25 FR, 24 EN, 57 iframes) sans erreur 153 sur `www`. Aucun effet SEO direct attendu : texte, liens, balises meta, canonical, hreflang et JSON-LD inchangés. [Inférence] Effet indirect possible sur l'engagement de ces pages, non mesurable séparément.

**Vérifié** —
- `npx tsc --noEmit` : OK. `npx vitest run` : 232/232, dont 9 nouveaux (Vitest n'est pas lancé par la CI). Les 9 nouveaux tests, lancés contre la version `main` de `blog-utils.ts` : 5 échouent, 4 passent (ce sont les invariants « inchangé »). `npx eslint --max-warnings=0` sur les 2 fichiers : aucune erreur nouvelle ; 2 erreurs `no-explicit-any` préexistantes dans `getBlockText`, non touchée (étape Lint de la CI en `continue-on-error`). `node scripts/seo/verifier-json.mjs` : 186 fichiers valides. `npx next build` (valeurs factices de la CI) : vert.
- HTML prérendu du build :
  - FR : 29/29 iframes YouTube avec l'attribut, sur 25 pages ;
  - EN : 28/28, sur 24 pages ;
  - de-ch : 0 iframe YouTube sur 48 pages ;
  - aucun attribut en double ; les 6 iframes non YouTube (Vimeo, Sketchfab, saasphoto, 1 FR et 1 EN chacune) sans attribut.
- De-ch : les vidéos affichées sont des MP4 servis par `videos.packshot-creator.com` (fiches produit, article Alphashot XL G2) ou par le site (`/images/gallery-ia/*.mp4`), hors YouTube. Elles ne dépendent pas du Referer, ce qui explique qu'elles fonctionnent. Aucun embed YouTube de-ch à corriger.
- Sortie de `processHtmlContent`, `main` contre branche, sur les 125 JSON de `content/` qui portent un champ `content` : 76 identiques ; 49 qui ne diffèrent que par l'attribut (29 FR, 28 EN) ; iframes non YouTube, sommaire et nombre de mots identiques.
- Playwright (Chromium du conteneur). Page servie sous l'origine `sysnext.vercel.app` avec l'en-tête `Referrer-Policy: same-origin` ajouté, comme devant `www`. Cas A : HTML de production, sans correctif. Cas B : HTML du build local, avec correctif. Pages : l'article EN ci-dessus et son équivalent FR. Profils : desktop 1440 px, iPhone 13 et Pixel 7 (émulation, moteur Chromium).
  - Referer reçu par `youtube.com/embed/VssNUk1qsXg` : absent dans tous les passages A, `https://sysnext.vercel.app/` dans tous les passages B.
  - État du lecteur, lu dans le DOM de l'iframe YouTube (`.ytp-error`, classes de `#movie_player`) :

    | Profil | Page | A, sans correctif | B, avec correctif |
    |---|---|---|---|
    | desktop 1440 | EN | erreur 153 | lecteur prêt, puis `playing-mode` après clic |
    | desktop 1440 | FR | erreur 153 | lecteur prêt, puis `playing-mode` après clic |
    | iPhone 13 | EN | erreur 153 | lecteur prêt (titre et chaîne affichés) |
    | iPhone 13 | FR | erreur 153 | lecteur prêt |
    | Pixel 7 | EN | erreur 153 | lecteur prêt, puis `playing-mode` après clic |
    | Pixel 7 | FR | erreur 153 | lecteur prêt, puis `playing-mode` après clic |

  - Erreur 153 jamais affichée en B. Certains passages ont été relancés : YouTube restait injoignable depuis le conteneur (page d'erreur réseau de Chromium, ou lecteur absent). Ces passages sont écartés du tableau, pas comptés comme des succès. En iPhone 13, le clic émulé ne lance pas la lecture : lecteur prêt, sans erreur. `currentTime` reste à 0 dans tous les cas B : la lecture effective des images n'est pas vérifiée (Chromium sans affichage, réseau du conteneur).

**Supposé** — La source de `referrer-policy: same-origin` : [Inférence] la Managed Transform Cloudflare « Add security headers ». Sa documentation liste exactement `referrer-policy: same-origin`, `x-frame-options: SAMEORIGIN` et `x-content-type-options: nosniff`, relevés devant `www` (https://developers.cloudflare.com/rules/transform/managed-transforms/reference/). Non vérifié : les réglages de la zone ne sont pas lisibles depuis la session, et le relevé a été fait sur une réponse 403 de challenge (R4).

**Non regardé** — Réglages Cloudflare (Managed Transforms, Transform Rules) : rien modifié, à vérifier séparément. Safari et WebKit réels : l'émulation iPhone tourne sur le moteur Chromium. Appareils mobiles réels. Preview Vercel : protégé par le SSO, jeton non transmis ; l'erreur n'y est de toute façon pas reproductible, Cloudflare n'étant pas devant. `www` dans Chrome (R4). Champ `introMedia` des guides (10 iframes embedly Orbitvu), non rendu par le site. Autres tiers soumis au même en-tête `same-origin`.

**Suite** — GO de Laurent pour sortir la PR du brouillon et fusionner. Après fusion :
- `smoke.mjs` sur `sysnext.vercel.app` ;
- dans Chrome sur `www` : en-tête `Referer: https://www.packshot-creator.com/` sur la requête `embed/…`, lecture sans erreur 153, desktop puis Safari iOS et Chrome Android réels ;
- vérification séparée de la Managed Transform « Add security headers » ; aucune modification Cloudflare décidée.

Chevauchement avec la PR #44 (brouillon, `claude/admiring-hypatia-7pir8f`, vue après l'ouverture de #46). #44 remplace les mêmes 57 iframes par une façade locale dans `processHtmlContent`. Son lecteur, créé après « Autoriser et lire la vidéo », porte déjà `referrerPolicy = 'strict-origin-when-cross-origin'` (`components/blog/YouTubeConsent.tsx`).
- Les deux PR modifient les mêmes lignes de `lib/blog-utils.ts` : conflit textuel pour la seconde fusionnée.
- Si #44 est fusionnée, #46 devient sans objet sur le blog.
- La réservation de `lib/blog-utils.ts` par #44 n'existe que sur sa branche, pas sur `main` : elle n'était pas visible au rituel de lecture.

---

## 2026-09-29 · F5 — contrôle visuel sur `www` et retour de Sébastien · Claude de Laurent

**Chantier** : substitution de page, page témoin `/packshot-e-commerce` (F5) | **PR** : #39 (fusionnée le 28/09, `04919f8`) | **Commit** : voir PR

**Quoi** — Clôture du point « contrôle Chrome sur `www` » de l'entrée du 28/09. Aucun fichier du site modifié.

**Vérifié** — Déclarations reçues, non contrôlées par script :
- Laurent a ouvert le 29/09/2026 les trois URL sur `www.packshot-creator.com` (`/fr/packshot-e-commerce`, `/en/packshot-e-commerce`, `/de-ch/packshot-e-commerce`). Son retour, verbatim : « j'ai ouvert rapidement les 3 pages, cela semble ok ». Navigateur non précisé.
- Sébastien a répondu par courriel au message de Laurent du 28/09/2026 à 21:01 (« Mise en ligne de la nouvelle page Packshot e-commerce ») : « c'est parfait !! à suivre pour voir les retombées, la page est canon ! ». Date et heure de sa réponse non transmises. Ce retour ne précise pas quelles langues il a consultées.

**Supposé** — Les balises vues sur `sysnext.vercel.app` le 28/09 (canonical, hreflang, OG, données structurées) sont servies à l'identique par `www` : même projet Vercel, et le Worker du dépôt n'a aucune règle sur ces URL [non vérifié sur `www`].

**Non regardé** — Canonical, hreflang, données structurées et console côté `www` (R4 : pas de contrôle par script ; le contrôle de Laurent a été visuel et rapide).

**Suite** — Relevé GSC sur la landing FR à J+28 (26/10/2026) et J+56 (23/11/2026) ; point de départ GSC du jour de la fusion à figer par Laurent ; aucun lien entrant vers F5 avant J+56.

---

## 2026-09-28 · Vidéos YouTube des articles — façade locale et consentement contextuel · Claude de Laurent

**Chantier** : résidu de l'audit de nettoyage #40/#41 (iframes YouTube chargées sans consentement) | **PR** : brouillon, **non fusionnée** | **Branche** : `claude/admiring-hypatia-7pir8f` | **Base** : `96489d9`

**Quoi** — Au rendu, les 57 iframes `youtube.com/embed` des 49 articles (FR/EN) deviennent une façade locale : lien vers la page YouTube (utilisable sans JavaScript), vignette locale ou fond neutre, icône de lecture générique. Au clic, sans accord, une fenêtre d'information s'ouvre avant tout appel tiers ; le lecteur `youtube-nocookie.com` n'est créé qu'après « Autoriser et lire la vidéo », ou directement si la nouvelle catégorie « Vidéos YouTube » du gestionnaire de cookies (champ interne `externalMedia`) est acceptée. Aucun fichier `content/` modifié.

**Pourquoi** — Mesure « avant » du 28/09 (build local, 6 articles témoins) : toutes les mesures appelaient `www.youtube.com` dès l'affichage, cookies refusés compris ; en nouvelle visite, 12 mesures : 132 requêtes `youtube.com`, 26 `doubleclick.net`, 40 cookies YouTube. Iframe de 300 × 150 px dans une figure de 662 × 570 px.

**Fichiers** — `lib/youtube.ts` (nouveau), `lib/blog-utils.ts`, `components/blog/YouTubeConsent.tsx` (nouveau), `components/cookies/CookieBanner.tsx`, `app/[lang]/blog/[slug]/page.tsx`, `app/[lang]/confidentialite/page.tsx`, `app/globals.css`, `messages/{fr,en,de-ch}.json` (`cookies`, `externalVideo`, `privacy.article6`), `lib/__tests__/youtube.test.ts` (nouveau), `e2e/youtube-consent.spec.ts` (nouveau), `e2e/cookie-banner.spec.ts`.

**Choix de conception** — L'accord donné dans la fenêtre vaut pour la vidéo cliquée, sans être mémorisé ; l'accord durable passe par le gestionnaire (lien dans la fenêtre). « Tout accepter » inclut désormais les vidéos YouTube, « Tout refuser » les exclut ; un cookie de consentement antérieur sans la catégorie vaut refus. Retirer la catégorie retire les lecteurs ouverts et remet les façades. Tout clic sur la façade, clic du milieu compris, passe par la fenêtre ; seul le menu contextuel du navigateur ouvre encore le lien directement. Titre de la vidéo : attribut `title` de l'iframe (17), sinon texte de la légende (6), sinon nom accessible générique (34). Vignette locale pour la seule vidéo déjà illustrée sur le site (`tR-6RBucmWw`, affiche de la fiche Alphashot Pro G2) ; aucune vignette téléchargée depuis YouTube.

**Vérifié** —
- `npx tsc --noEmit` vert ; `npx next build` vert ; `node scripts/seo/verifier-json.mjs` : 186 JSON valides ; ESLint sur les fichiers touchés : aucune nouvelle alerte (3 erreurs et 1 avertissement préexistants dans `CookieBanner.tsx`, `lib/blog-utils.ts` et la page article).
- Vitest : 13 tests YouTube sur le corpus réel — 57 intégrations, 49 fichiers, 23 vidéos ; 0 iframe YouTube restante ; 8 `start` conservés (1, 1, 5, 5, 5, 5, 8, 8) ; 6 légendes identiques ; 17 titres d'iframe ; alignement centré ou pleine largeur ; titres h2/h3 et nombre de mots inchangés ; aucune référence ytimg, Google ou DoubleClick.
- Playwright `e2e/youtube-consent.spec.ts` : 16/16 (Desktop Chrome et Pixel 5) — façades, fenêtre, Annuler, Échap, croix, lecteur et attributs, accord non mémorisé, catégorie acceptée, retrait, clavier (Espace sans défilement, Entrée), sans JavaScript.
- Playwright `cookie-banner` + `seo` sur le build final : 245 réussis, 9 échecs. Les 9 mêmes échouent sur un build local de `origin/main` (`96489d9`) : test GA4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID` absente au build local, `GoogleAnalytics.tsx:47`) et 8 contrôles de longueur de title / meta description ou de hreflang sur des pages non touchées.
- Preuve réseau, build local, réseau réel, 51 mesures (6 articles à vidéos, `/fr/contact` et un article sans vidéo en témoins) : en nouvelle visite (1440 et 390 px), cookies refusés, analytics accepté et vidéos YouTube refusées, vidéos YouTube acceptées sans clic : 0 requête `youtube.com`, `youtube-nocookie.com`, `ytimg.com`/`ggpht.com`, `doubleclick.net`, `googlevideo.com` ; 0 cookie YouTube ou Google ; CLS 0 ; débordement horizontal 0. Clic sans accord : fenêtre affichée, 0 requête YouTube pendant son affichage ; Annuler : 0.
- Après « Autoriser et lire » (4 mesures dédiées, 1440 et 390 px) : iframe `https://www.youtube-nocookie.com/embed/<id>?autoplay=1&rel=0[&start=N]`, `referrerpolicy="strict-origin-when-cross-origin"`, `allowfullscreen`, titre ; domaines contactés : `www.youtube-nocookie.com`, `i.ytimg.com`, `yt3.ggpht.com`, `*.googlevideo.com`, `jnn-pa.googleapis.com`, `www.google.com`, `www.gstatic.com`, `ssl.gstatic.com`, `fonts.gstatic.com` ; 0 requête `youtube.com`, 0 `doubleclick.net` ; 0 cookie tiers relevé ; aucune erreur console hors visionneuses 360 Orbitvu (préexistantes).
- Géométrie : façade 662 × 372 px (pleine largeur) et 576 × 324 px (centrée) à 1440 px ; 358 × 201 px à 390 px ; fenêtre d'information contenue dans l'écran aux deux largeurs.

**Supposé** — Le comportement mesuré sur Chromium local vaut pour la production (même code, même build) ; non contrôlé sur Preview ni sur `www`.

**Non regardé** — Lecture effective : YouTube affiche « Video unavailable » dans le conteneur (4/4 après activation) ; lecture automatique, départ à `start`, cookies et stockage après une lecture réelle : non mesurés, à contrôler dans Chrome sur le Preview. Firefox et Safari. `www.packshot-creator.com` (R4). Qualification juridique du texte de politique de confidentialité et de la fenêtre : aucune.

**Suite** —
- Texte de la politique de confidentialité (article 6, « Vidéos YouTube ») : proposition à valider par Laurent avant fusion ; il remplace « Aucun cookie marketing n'est utilisé actuellement sur ce site. » en FR, EN et de-ch.
- Corrections du 29/09 après relecture de Laurent : libellé de la catégorie « Contenus externes » remplacé par « Vidéos YouTube » (FR), « YouTube videos » (EN), « YouTube-Videos » (de-ch), la catégorie ne gouvernant que YouTube ; « vignette locale » remplacé par « façade locale » dans la politique (une seule vidéo a une vignette) ; information contextuelle complétée (finalités, autres traitements possibles) ; lien vers les règles de confidentialité de Google dans la langue de la page (`hl=fr`, `hl=en`, `hl=de`).
- **GOOGLE_MAPS_PRIVACY_AUDIT_REQUIRED = YES** : iframe Google Maps de `/contact` chargée à l'affichage (`app/[lang]/contact/page.tsx:154`), audit séparé.
- 6 autres iframes tierces se chargent à l'affichage : Vimeo (2), Sketchfab (2), saasphoto.com (2) ; non couvertes par la catégorie, qui ne vise que YouTube.
- Contenu : deux paragraphes vides (`<p>‍</p>`) hérités de Webflow séparent certaines figures (prose de Sébastien, non touchée).

---

## 2026-09-28 · F5 — #39 fusionnée et contrôlée en production (FR, EN, de-ch) · Claude de Laurent

**Chantier** : substitution de page, page témoin `/packshot-e-commerce` (F5) | **PR** : #39 fusionnée ; #24 fermée | **Commit de fusion** : `04919f8` (`main`), le 28/09/2026 à 18:42:03 UTC | **Tête fusionnée** : `55ea992` | **Base avant fusion** : `b26f6e9`

**Quoi** — Fusion de #39 par commit de fusion (méthode de #40 et #41), après sortie du brouillon. Avant fusion : CI verte sur `55ea992` (types, build et intégrité des données ; journal ; conséquences ; Vercel), Preview « Ready », PR sans conflit. PR #24 fermée sans fusion, commentaire « SUPERSEDED BY #39 ». PR #27 non touchée.

**J0 de mesure F5** — Nouvelle landing servie par `https://sysnext.vercel.app` à partir du 28/09/2026 à 18:43:35 UTC (première observation, contrôle toutes les 15 s depuis la fusion). J+28 = 26/10/2026 ; J+56 = 23/11/2026. Aucun lien entrant vers F5 avant J+56 (D37).

**Vérifié** —
- `node scripts/seo/smoke.mjs https://sysnext.vercel.app` à 18:43:51 UTC, moins de 2 minutes après la fusion : vert, 17 pages et 3 ressources (sitemap 325 URL, robots.txt, llms.txt).
- `/fr`, `/en` et `/de-ch/packshot-e-commerce` sur `sysnext.vercel.app`, contrôle HTTP du HTML servi : statut 200, `lang` correct, un H1 (nouveau), title et canonical de la langue, 5 hreflang (fr, fr-CH, en, de-CH, x-default), OG (`fr_FR`, `en_US`, `de_CH`) et Twitter localisés, fil d'Ariane à la bonne locale, FAQ visible = JSON-LD (9/9, identiques), aucun claim interdit, alt de la photo de studio sans nom de modèle ; liens internes 21 (FR), 21 (EN), 20 (de-ch), tous en 200. Les seuls textes identiques au FR trouvés en EN et de-ch sont des libellés de portée composés de noms propres (« Amazon, Google Merchant Center »).
- Dépôt : le Worker Cloudflare (`cloudflare-worker/src/index.js`) ne porte que des redirections d'anciennes URL vers ces pages, aucune règle sur les trois URL.

**Supposé** — La version servie par `www.packshot-creator.com` est celle de `sysnext.vercel.app` (même projet `sysnext`) ; le Worker déployé n'a pas re-divergé du dépôt sur ces URL (R5, non resynchronisé ici).

**Non regardé** — `www.packshot-creator.com` : aucun contrôle par script (R4, Cloudflare renvoie 403 aux clients non navigateurs) ; contrôle à faire dans Chrome. Rendu navigateur en production : Chromium de l'environnement ne reconnaît pas l'autorité du proxy et la vérification TLS n'a pas été désactivée ; le rendu (console, 4xx des ressources, débordement, captures) a été contrôlé sur le build local identique avant fusion. Point de départ GSC du jour de la fusion : à figer par Laurent dans Supabase.

**Suite** — Contrôle Chrome des trois URL sur `www` ; relevé GSC à J+28 et J+56 sur la landing FR ; D38 à appliquer aux prochains articles, dont l'article AI Act.

---

## 2026-09-28 · F5 — landing traduite en EN et de-ch, publication trilingue · Claude de Laurent

**Chantier** : substitution de page, page témoin `/packshot-e-commerce` (F5) | **PR** : #39 | **Commit** : voir PR | **Décisions** : D37 (périmètre trilingue), D38 (règle de traduction)

**Changement de périmètre** — Le brief F5 prévoyait le FR seulement. Laurent décide le 28/09 une publication simultanée en FR, EN et de-ch (D37), sans nouvelle validation de Sébastien. La mesure principale reste celle de la landing FR ; J0 = mise en production ; gel des liens entrants jusqu'à J+56.

**Quoi** — `PackshotEcommerceFr.tsx` devient `PackshotEcommerce.tsx`, servi dans les trois langues ; `page.tsx` n'utilise plus `PackshotLandingTemplate` (non modifié, toujours utilisé par les autres landings). Blocs `packshotEcommerce` de `messages/en.json` et `messages/de-ch.json` remplacés par la traduction du FR du commit `315bc5c` : 309 messages, structure de clés identique. Métadonnées complètes dans les trois langues (canonical, hreflang, OG `fr_FR` / `en_US` / `de_CH`, Twitter) ; le traitement « FR seulement » est supprimé.

**Pourquoi** — Les anciennes versions EN et de-ch affichaient 500+ produits/jour, -80 % de coûts, ROI 4-8 mois, moins de 1 € par image, « all marketplaces » / « alle Marktplätze », un témoignage non validé. Ils disparaissent avec les anciens namespaces.

**Fichiers** — `components/landings/PackshotEcommerce.tsx` (renommé), `app/[lang]/packshot-e-commerce/page.tsx`, `messages/en.json` et `messages/de-ch.json` (bloc `packshotEcommerce` seul), `docs/seo-geo/DECISIONS.md`, `JOURNAL.md`, `ETAT.md`.

**Choix de traduction** — EN américain (usage du dépôt : color, catalog, jewelry), « packshot » gardé pour le concept de la page. de-ch sans « ß », séparateur de milliers en espace insécable (usage majoritaire de `de-ch.json`), guillemets « ». Portées conservées : Qualiopi et OPCO présentés comme français, « support en français » traduit tel quel (aucun claim sur l'allemand, D33), leasing suisse tel que le FR le formule. Repères de terrain de Sébastien traduits avec leurs conditions et leur attribution ; `session.avif` sans nom de modèle. Dates : `September 28, 2026` en EN, `28.09.2026` en de-ch.

**Liens et sources** — En de-ch, cibles non traduites épinglées sur /en par `navPinLocale` (Academy, simulateur OPCO) ; articles au slug de chaque langue (`alternates.json`), avec repli vers l'anglais, signalé « (auf Englisch) », pour « prestataire » et le guide « collection ». Sources : URL inchangées pour Amazon (amazon.fr, libellé explicite), NN/g, Baymard, Zalando, Orbitvu ; Google `6324350?hl=en` (EN et de-ch) et `16989427?hl=en` / `?hl=de`, Shopify `/en/` : versions contrôlées le 28/09 (`6324350?hl=de` : 429, non utilisée).

**Vérifié** — Parité des clés : `MISSING_KEYS_EN = 0`, `EXTRA_KEYS_EN = 0`, `MISSING_KEYS_DE_CH = 0`, `EXTRA_KEYS_DE_CH = 0` ; 309 × 3 messages ICU compilés ; `npx tsc --noEmit` ; eslint des 2 fichiers de code ; `verifier-json.mjs` (186) ; vitest 223/223 ; `npx next build` (3 routes pré-rendues). Build local, 3 langues × 1440 et 390 px : statut 200, 1 H1, `lang` correct, canonical, 5 hreflang, OG et Twitter localisés, fil d'Ariane à la bonne locale, FAQ visible = JSON-LD (9/9), 0 texte FR résiduel en EN et de-ch, 0 clé manquante, 0 claim interdit, 0 erreur console, 0 réponse 4xx, 0 ancre cassée, 0 débordement, images chargées, formulaire en type « demo » masqué ; liens internes : 21 (FR, EN) et 20 (de-ch) en 200. Recherche de claims dans les 3 namespaces : seules occurrences restantes, identiques dans les trois langues, « moins d'une seconde » (déclenchement), « 15 secondes par packshot » (unité Orbitvu), 200 à 300 photos par jour (passage attribué et FAQ 5).
**Supposé** — Aucun.
**Non regardé** — Relecture par un locuteur natif EN et germanophone suisse ; Preview (SSO) ; rendu derrière Cloudflare.

**Suite** — Fusion de #39 si CI verte et Preview prête, puis contrôle de production (entrée suivante).

---

## 2026-09-28 · F5 — photo de studio : modèle retiré de l'alt et de la légende · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR

**Quoi** — Alt et légende de `machines/alphashot-pro-g2/session.avif` dans `#automatisation` : « Alphashot Pro G2 » retiré. Alt : « Une opératrice positionne une paire de lunettes de soleil dans un studio photo automatisé Orbitvu ». Légende : « Au poste de prise de vue, l'opératrice place le produit dans le studio Orbitvu, qui enchaîne ensuite les angles prévus. » Fichier ni renommé ni déplacé.

**Pourquoi** — Décision de Laurent : le chemin du fichier et son usage sur la fiche Pro G2 ne suffisent pas à identifier visuellement le modèle photographié.

**Fichiers** — `messages/fr.json` (2 lignes, `packshotEcommerce.r5.imageAlt` et `imageCaption`).

**Vérifié** — `npx tsc --noEmit` ; `node scripts/seo/verifier-json.mjs` (186) ; 309 messages ICU compilés ; `npx next build` ; rendu local du bloc à 1440 × 900 et 390 × 844 : image chargée, nouveaux alt et légende, aucune mention « Pro G2 » dans le bloc, 0 débordement, 0 erreur console. Attribution du passage de terrain inchangée : « photographe » figure dans la proposition d'attribution du fichier de passation transmis pour Sébastien et dans deux articles du dépôt.
**Supposé** — Rien.
**Non regardé** — Preview (SSO) ; rendu derrière Cloudflare.

**Rectificatif de compte rendu (hors page)** — Mesures de longueur mobile établies : nouvelle page complète 38,4 écrans ; ancienne page complète 32,9 écrans ; nouvelle page avant formulaire 32,4 écrans ; ancienne page avant formulaire non mesurée (≈ 26 écrans selon l'observation de Sébastien, estimation non comparable). HTML local de la nouvelle version : 626 243 octets ; hausse d'environ 47 à 49 Ko selon la référence, méthode de l'ancienne mesure non entièrement vérifiable. Les marquages des lunettes apparaissent sur les photos et ne sont lisibles que sur le fichier pleine résolution agrandi.

---

## 2026-09-28 · F5 — intégration du retour de Sébastien sur `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR | **Base** : `main` `b26f6e9` (post-#40/#41), fusionnée dans la branche en `4683dfa`

**Quoi** — Retour de Sébastien (fichier `2026-09-28-instructions-claude-packshot-e-commerce.md` et 5 photos) intégré dans la version FR : nouveau H1, hero local (texte avant galerie sur mobile), repères « En bref », sommaire reformulé avec retour au sommaire par section, galerie des 5 vues de lunettes dans `#fiche-produit`, section interne / prestataire réécrite (IA transversale, option mixte), passage de terrain validé dans `#automatisation` avec photo de studio en situation, exports (export, module, abonnement, configuration), unités de cadence, budget, FAQ (9 questions), bouton de démonstration relié au formulaire de la page. Correction ciblée de l'Alphastudio Compact dans les données machines.

**Pourquoi** — Retour de Sébastien du 28/09 sur la Preview ; consignes de Laurent (« GO — reprise F5 après fusion #40 et #41 ») : aucune caricature du prestataire, chiffres de terrain attribués et conditionnés, « Google Merchant Center » en toutes lettres, règle Amazon `contains-synthetic-performer` limitée aux personnes photoréalistes entièrement synthétiques.

**Fichiers** — `messages/fr.json` (bloc `packshotEcommerce` seul, lignes 1219-1741), `components/landings/PackshotEcommerceFr.tsx`, `components/forms/ContactForm.tsx` (prop optionnelle `hideRequestType`, défaut `false`), `components/calculators/ROICalculator/lib/machines.ts` et `components/machine-selector/lib/machines.ts` (entrée `alphastudio-compact-v2` seule), `components/calculators/ROICalculator/lib/machineSelector.ts` (commentaire), `public/images/packshot-e-commerce/` (5 AVIF, 70 Ko au total).

**Décisions sur le retour** —
- Passage de terrain repris mot pour mot, une seule substitution demandée par Laurent : « studio PackshotCreator-Orbitvu » devient « studio automatisé Orbitvu ». Attribution : « photographe et président de Sysnext (PackshotCreator) » ; « directeur » ne figure nulle part dans le dépôt, « Président » figure dans les mentions légales. Aucune relecture de toute la page n'est attribuée à Sébastien.
- 5 photos : une seule monture ; trois quarts en vue principale, puis face, profil, branches repliées, gros plan de la charnière. Lazy, aucun préchargement.
- Étude De, Hu et Rahman retirée (corrélation sans décision applicable) ; la source et le compteur passent de 5 à 4.
- Sommaire compact fixe écarté : l'en-tête du site est déjà `sticky` ; un lien « Retour au sommaire » par section le remplace.
- Formulaire : type de demande fixé à « démonstration » par une prop optionnelle ; les autres usages de `ContactForm` sont inchangés (valeur par défaut `false`).

**Corrections factuelles** —
- Alphastudio Compact : 80 × 70 × 130 cm et 150 produits par jour (orbitvu.com et orbitvu.fr, relevé du 28/09) au lieu de 100 × 70 × 190 cm (plus haut que l'appareil, 183 cm) et 180. Axes non précisés par Orbitvu : ordre de publication conservé dans `dimensionsMax` (l, w, h). Rayon : fiche `/studio-photo/alphastudio-compact-v2` FR, EN, de-ch (FAQ visible et JSON-LD, statistiques clés), sélecteur `/studio-photo/selecteur-machines`, moteur et assistant ROI (`capaciteJour`), `lib/roiChat/*`, pages `/solutions/[slug]` et `/industrie-defense` qui lisent `machines.ts`. La catégorie « grand » du sélecteur reste compatible (comparaison triée : [80, 70, 60] contre [130, 80, 70]).
- Amazon : le minimum de 500 px vaut pour toutes les images (G1881), le fond blanc et les 85 % pour l'image principale ; « bordures de l'image principale » retiré (page US G75, non citée). FAQ : « plusieurs images en plus de l'image principale, ainsi qu'une vidéo » (G1881 FR : « au moins six images supplémentaires » ; blog US : « at least six » au total).
- Zalando (mis à jour le 31/08/2026) : fond gris clair ajouté par Zalando, 20 Mo, exception marques de créateurs (1 800 × 2 600 px). Shopify : jusqu'à 5 000 × 5 000 px, « pas de minimum » retiré (non écrit par la source).
- Modules Orbitvu (manuel mis à jour le 11/09/2026) : Magento 2 ≥ 2.2.0, PrestaShop 1.7.x, WooCommerce en SUN ou auto-hébergé ; Shopware 6 et Shopify en SUN seulement ; modules SUN inclus dès la formule 6G, Shopify payant à part ; auto-hébergé sans vidéo, licence du lecteur ou version de base gratuite.

**Vérifié** — `npx tsc --noEmit` ; eslint des 6 fichiers modifiés ; `node scripts/seo/verifier-json.mjs` (186 fichiers) ; 309 messages ICU compilés ; vitest 223/223 ; `npx next build`. Build local (Chromium, 1440 × 900 et 390 × 844) : un H1, ordre mobile H1 → intro → galerie, 0 ancre cassée, 9 titres ciblés visibles sous l'en-tête, FAQ visible = JSON-LD (9/9), 0 erreur console, 0 réponse 4xx, CLS 0, aucun débordement, cibles ≥ 24 px, contrastes ≥ 5,9:1, aucun claim interdit. Performance (médiane de 3) : desktop LCP 340 ms (324 avant), mobile bridé 1 408 ms (1 448 avant), poids initial mobile 618 Ko (606 avant). e2e : 11 échecs sur des pages non touchées (titres et descriptions EN, `/fr/industrie`, hreflang `packshot-bijoux`, débordement de `/fr`), plus `machine-selector.spec.ts` qui attend des textes absents du code.
**Supposé** — Le libellé « président » convient pour une attribution éditoriale [non vérifié auprès de Sébastien, qui n'est pas sollicité] ; la page Shopify FR (403 au script) dit la même chose que la page EN contrôlée.
**Non regardé** — Rendu derrière Cloudflare ; Preview (SSO) ; envoi réel du formulaire ; versions EN et de-ch de la landing (gabarit partagé non modifié).

**Suite** — Ouverts hors périmètre : Alphastudio XXL affiché 100 × 70 × 190 cm dans `machines.ts` et `messages/*.json` contre 190 × 90 × 100 cm chez Orbitvu (non corrigé par analogie) ; fiche Compact : « Hauteur un peu juste pour mannequins vivants adultes » et « retour sur investissement en 12 à 18 mois » inchangés ; le sélecteur affiche `capaciteJour` en « photos/j » alors qu'Orbitvu parle de produits par jour ; Zalando publie aussi une politique d'étiquetage des contenus générés par IA, non ajoutée (consigne : aucun autre contenu IA modifié).

---

## 2026-09-28 · #40 fusionnée et contrôlée en production (intégrations obsolètes) · Claude de Laurent

**Chantier** : nettoyage, hors chantier numéroté | **PR** : #40 fusionnée | **Commit de fusion** : `15469e5` (`main`), le 28/09/2026 à 15:51:29 UTC | **Base avant fusion** : `809f61f`

**Quoi** — Fusion de #40 (commit de fusion, méthode habituelle du dépôt), puis contrôle de la production sur `sysnext.vercel.app`. PR #39 (F5) non touchée : tête `dc01234` inchangée.

**Pourquoi** — Consigne de Laurent du 28/09 : finaliser, fusionner et contrôler #40 avant la reprise de F5.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`.

**Effet attendu** — Plus aucun appel à `app.lemlist.com` ni à `iframe.packshot-creator.com` sur le site ; GA4 inchangé.

**Vérifié**
- Avant fusion : `main` toujours sur `809f61f`, aucune review, CI verte sur `252ba17` (4 contrôles), `mergeable_state` `clean` ; recontrôle local : `tsc`, 186 JSON, Vitest 223/223, build 383 pages.
- Déploiement : la production sert le nouveau code à partir de 15:53:14 UTC (disparition du marqueur `lemlist` du HTML de `/fr`, sondage toutes les 10 s). Le SHA servi n'est pas exposé par la réponse ; identifiant Vercel de la requête de contrôle : `iad1::cf6p7-1790610795146-76af8128c9eb`.
- `smoke.mjs https://sysnext.vercel.app` à 15:53:42 UTC : tout vert, 17 pages, 3 ressources, sitemap 325 URL (identique au relevé d'avant fusion).
- Réseau, `sysnext.vercel.app`, 11 pages × 3 scénarios (nouvelle visite, analytics accepté, cookies refusés), Chromium ; requêtes vers les collecteurs GA4 et vers Lemlist enregistrées puis abandonnées, pour n'envoyer aucun hit ni aucune visite. Avant → après fusion : requêtes Lemlist (`/api/visitors/tracking`) 33 → 0 ; balises `#lemlist-tracker` 33 → 0 ; requêtes `iframe.packshot-creator.com` 21 → 0 ; `webforms.pipedrive.com` 0 → 0 ; hôtes Webflow 0 → 0 ; 33/33 chargements en 200 des deux côtés.
- GA4 : script chargé sur les 9 pages `[lang]` avec consentement analytics, sur 0 page sans consentement ou après refus, avant comme après. `/calculateur-roi` et `/etude-clients-2026` ne le chargent dans aucun cas, avant comme après.
- Formulaire natif sur `/fr/contact`, `/fr/studio-photo/alphashot-pro-g2`, `/fr/packshot-e-commerce` : affiché, 14 à 15 champs, envoi à vide bloqué (6 messages), aucun appel à `/api/contact` (interception de sécurité), aucune trace WebForms.
- Blog et guides : 191 URL du sitemap, 191 en 200. Redirections historiques de `next.config.ts` : 7 témoins, 7 en 301 vers la cible attendue.
- Chargement de page : dans le conteneur, Chromium perd une partie des requêtes parallèles vers `sysnext.vercel.app` (`ERR_TOO_MANY_RETRIES` du proxy) ; les requêtes vers l'hôte contrôlé ont été relayées par Node avec relance, sans quoi la page ne s'hydrate pas et GA4 paraît absent à tort.
**Supposé** — [Inférence] Que `www.packshot-creator.com` sert le même déploiement que `sysnext.vercel.app` : le Worker proxifie vers `NEXTJS_ORIGIN`. Cela repose sur des schémas observés.
**Non regardé** — `www.packshot-creator.com` : 403 `cf-mitigated: challenge` depuis le conteneur (R4), contrôle à faire dans Chrome. Redirections du Worker (non modifiées, non redéployées). Envoi réel du formulaire : non déclenché. Double `page_view` GA4 : hors périmètre, chantier séparé.

**Anomalie hors périmètre** — `/fr/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques` contient une balise `<img>` dont la source est une vidéo (`/images/blog/67dbae80b8c0e26556f4ebeb.mp4`, servie en 200) : elle ne peut pas s'afficher. Balise identique dans `809f61f`, héritée de Webflow, non modifiée par #40.

**Corrections de l'entrée précédente (28/09)** — Correction : affirmations non vérifiées, qui auraient dû être étiquetées. « Les iframes pointaient vers un hôte injoignable » : constaté depuis le conteneur seulement (502 du proxy) ; [Non vérifié] depuis un navigateur ordinaire. « `trail.` est le domaine de suivi des e-mails Lemlist » : seul le domaine personnalisé Lemlist est vérifié ; [Inférence] l'usage e-mail. « `WEBFLOW_ORIGIN` reste dans la configuration du Worker déployé » : [Non vérifié] au 28/09, tiré du relevé du 23-25/09. Le message du commit `85cfdbe` affirme que la mention « aucun cookie marketing » de la politique de confidentialité « reste exacte » : [Non vérifié], 57 intégrations `youtube.com/embed` et une carte Google Maps restent sur le site.

**Suite**
- Laurent, dans Chrome sur `www` : `/fr`, `/fr/contact`, `/fr/studio-photo/alphashot-pro-g2`, `/calculateur-roi`, `/etude-clients-2026` et les 5 articles nettoyés ; onglet Réseau : aucune requête `lemlist` ni `iframe.packshot-creator.com`.
- Hors dépôt, non exécuté : variables `WEBFLOW_*` du projet Vercel `sysnext` (à vérifier, puis supprimer si elles existent) ; clé API Webflow à révoquer si elle existe ; tracking visiteurs Lemlist à désactiver côté compte ; enregistrement DNS `iframe.` à vérifier, puis supprimer s'il existe. `trail.packshot-creator.com` conservé tant que l'usage e-mail de Lemlist n'est pas explicitement abandonné.
- `.env.example` : 4 lignes `WEBFLOW_*` à retirer par une PR dédiée, avec l'accord du propriétaire du garde-conséquences.
- F5 (#39) peut reprendre : conflits attendus uniquement dans `JOURNAL.md` et `ETAT.md`.

---

## 2026-09-28 · Suppression des intégrations obsolètes : Lemlist, Pipedrive WebForms, iframes legacy, Webflow API · Claude de Laurent

**Chantier** : nettoyage, hors chantier numéroté (décision métier du 28/09/2026 : les quatre éléments sont obsolètes) | **PR** : #40 (branche `claude/admiring-hypatia-7pir8f`) | **Base** : `809f61f` | **Non fusionnée, non déployée**

**Quoi** — Supprimés le 28/09/2026 : le tracking visiteurs Lemlist (composant et 3 montages), le composant legacy Pipedrive WebForms, les 7 iframes `iframe.packshot-creator.com` de 5 articles, l'intégration API Webflow (clients, scripts d'extraction, `WEBFLOW_ORIGIN`, CDN autorisé, dépendances `puppeteer` et `dotenv`). Catégorie `marketing` retirée du bandeau cookies.

**Pourquoi** — Lemlist chargeait `app.lemlist.com` sur toutes les pages, **sans condition de consentement**, alors que le bandeau annonçait « aucun cookie marketing ». Les iframes pointaient vers un hôte injoignable. WebForms et le client Webflow n'étaient plus importés nulle part. L'audit `AUDIT_TRACEURS_CODES_INJECTES_2026-09-28.md` cité par la demande n'est pas dans le dépôt : inventaire refait par `git grep`.

**Fichiers**
- Supprimés : `components/analytics/LemlistTracker.tsx`, `components/forms/PipedriveContactForm.tsx`, `lib/webflow.ts`, `lib/webflow-guides.ts`, `scripts/extract-webflow-content.mjs`, `extract-guides.js`, `extract-guides-puppeteer.cjs`, `QUICK_START_FORMS.md`, `FORMS_MIGRATION_GUIDE.md`, `FORMS_SUMMARY.md`, `Webflow_Forms_Inventory.md`.
- Code : `app/[lang]/layout.tsx`, `app/calculateur-roi/layout.tsx`, `app/etude-clients-2026/layout.tsx`, `components/forms/index.ts`, `components/cookies/CookieBanner.tsx`, `lib/content.ts` (commentaire), `next.config.ts` (`cdn.prod.website-files.com` retiré de `remotePatterns`), `cloudflare-worker/wrangler.toml` (`WEBFLOW_ORIGIN`), `package.json`, `package-lock.json` (81 paquets retirés, aucune version modifiée).
- Contenu : 4 articles FR et 1 article EN (liste ci-dessous) ; `messages/{fr,en,de-ch}.json` : clés `cookies.marketing` et `cookies.marketingDesc` seulement.
- Tests et documentation : `e2e/cookie-banner.spec.ts` (2 catégories), `cloudflare-worker/README.md` (réécrit : il décrivait un routage vers Webflow), note datée en tête de `docs/README.md`, `docs/02-technical-developer/README.md`, `docs/03-cms-content/README.md`, `docs/05-architecture-integrations/README.md`, `docs/06-seo-performance/README.md`, `PROJECT_GUIDELINES.md` ; note sous l'exemple de logo de `docs/01-design-branding/README.md`.

**Articles nettoyés de `iframe.packshot-creator.com`** — la `<figure>` entière est retirée (iframe, conteneur, légende vide), aucun texte réécrit : aucune transition ne dépendait du média.
- `/fr/blog/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` : 2 (animations `saw_hemispherical`, `Gold_bag_hemispherical`)
- `/en/blog/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre` : 2 (mêmes animations)
- `/fr/blog/oscaro-com-reduit-ses-retours-darticles-commandes-en-ligne-grace-aux-visuels-a-360deg` : 1 (animation 360° `Motor_360`)
- `/fr/blog/boostez-votre-taux-de-conversion-grace-aux-visuels-produits-4-erreurs-a-eviter` : 1 (`MarbleStatue_Hemispherical` ; l'exemple Orbitvu qui suit reste en place)
- `/fr/blog/taux-de-conversion-boostez-le-grace-aux-visuels-en-6-pratiques` : 1 (`couch_360`, en fin d'article)

**Effet attendu** — Au déploiement : plus aucun appel à `app.lemlist.com` ni à `iframe.packshot-creator.com` ; bandeau cookies à deux catégories ; installation des dépendances sans `puppeteer` (qui télécharge un Chromium à l'installation). Aucun effet sur GA4, les formulaires, le blog ni les guides.

**Vérifié**
- `git grep` : `LemlistTracker`, `app.lemlist.com`, `lemlist-tracker`, `/api/visitors`, `iframe.packshot-creator.com` = 0. `webforms.pipedrive.com` (4) et `PipedriveContactForm` (21) ne subsistent que dans des archives datées (`livrables/`, `sessions/`, `PROMPT_SESSION_PHASE2*.md`, `PLAN_ACTION_MASTER.md`, audit du 26/09), non réécrites.
- Aucun import de `lib/webflow.ts` ni de `lib/webflow-guides.ts` avant suppression ; `lib/content.ts` lit uniquement `content/**`. `env.WEBFLOW_ORIGIN` n'est lu nulle part dans `cloudflare-worker/src/index.js`. Aucun contenu ne référence `cdn.prod.website-files.com`.
- `npx tsc --noEmit` vert ; `verifier-json.mjs` : 186 JSON valides ; Vitest 223/223 ; `npx next build` vert, 383 pages, table des routes identique à la base ; `npm ci` vert sur le nouveau lockfile ; ESLint : 267 → 258 erreurs, 70 → 68 avertissements, écart dû aux seuls fichiers supprimés (l'erreur `set-state-in-effect` de `CookieBanner.tsx` préexiste).
- Réseau, build local, 11 pages × 2 scénarios de consentement (Chromium, certificats du proxy acceptés) : requêtes Lemlist 38 → 0 (dont 16 `POST /api/visitors`), requêtes `iframe.packshot-creator.com` 14 → 0, balises `#lemlist-tracker` 22 → 0, `webforms.pipedrive.com` 0 → 0. GA4 : chargé sur les 9 pages `[lang]` après consentement et absent sans consentement, avant comme après ; `/calculateur-roi` et `/etude-clients-2026` n'ont jamais monté GA4.
- Playwright en local sur build de production (Chromium) : `cookie-banner` 10/10 et `contact-form` 11/11 sur la branche. Sur la base `809f61f`, l'ancienne spec `contact-form` échouait déjà sur ses 5 tests `.pipedriveWebForms` (conteneur absent depuis le passage au formulaire natif) : ils visent désormais le formulaire natif. `roi-calculator` (23 échecs), `seo` (8) et `language-switch` (1) : échecs identiques, test par test, sur la base et sur la branche, donc sans lien avec cette PR.
- Formulaire natif sur `/fr/contact`, une fiche machine et `/fr/packshot-e-commerce` : affiché, envoi à vide bloqué (6 messages, aucun appel à `/api/contact`), à l'identique de la base ; `/api/contact` rejette un envoi invalide à l'identique. Aucun envoi réel (il aurait déclenché des appels sortants sans secrets).
- Captures d'écran avant/après de 3 articles : le vide de 150 à 200 px laissé par chaque iframe cassée a disparu ; aucun conteneur ni légende orphelins. Blog et guides : 202 routes prérendues, identiques à la base.
- `trail.packshot-creator.com` répond la page « Custom domain check » de Lemlist : c'est le domaine de suivi des e-mails Lemlist, pas le tracker du site (qui appelait `app.lemlist.com`).
**Supposé** — Que les campagnes e-mail Lemlist peuvent encore utiliser `trail.` : d'où son maintien dans `PASSTHROUGH_HOSTS`.
**Non regardé** — La production derrière Cloudflare (R4) ; les variables d'environnement Vercel `WEBFLOW_*` (dashboard) ; le compte Lemlist ; le DNS de `iframe.` et `trail.`. Les erreurs console des pages portant un visualiseur Orbitvu (CORS vers `cdn360v2.orbitvu.cloud`), identiques avant et après, hors périmètre.

**Suite**
- Hors dépôt, non exécuté : supprimer les variables `WEBFLOW_API_KEY`, `WEBFLOW_SITE_ID`, `WEBFLOW_BLOG_COLLECTION_ID`, `WEBFLOW_GUIDE_COLLECTION_ID` du projet Vercel `sysnext` si elles existent, et révoquer la clé côté Webflow ; désactiver le tracking visiteurs dans Lemlist.
- `trail.packshot-creator.com` : si Lemlist est abandonné aussi pour l'e-mail, retirer le domaine personnalisé dans Lemlist, l'enregistrement DNS `trail.`, puis l'entrée de `PASSTHROUGH_HOSTS` (resynchronisation R5 d'abord).
- `iframe.packshot-creator.com` : enregistrement DNS à supprimer s'il existe encore.
- `.env.example` conserve ses 4 lignes `WEBFLOW_*` (sans valeur réelle) : le contrôle `garde-consequences` interdit toute modification d'un fichier `.env*`. À retirer par une PR dédiée, avec l'accord du propriétaire du garde.
- `WEBFLOW_ORIGIN` reste dans la configuration du Worker déployé jusqu'au prochain déploiement depuis le dépôt ; sans effet, le code ne la lit pas.

---

## 2026-09-28 · F5 — audit exhaustif de la Preview de `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR

**Quoi** — Audit contenu, SEO, GEO, UX, visuels et technique du commit `5070d6a` (build local ; Preview protégée par SSO), corrections appliquées.

**Problèmes trouvés et corrigés** —
1. Hero : 2 visuels sur 4 absents des fiches orbitvu.com (sac jaune, fauteuil jaune) et manteau en doublon avec la série R1. Remplacés par des visuels présents sur les fiches Orbitvu du modèle cité : mascara et palette (Alphashot Pro G2), nettoyeur haute pression (Alphastudio Compact), fauteuil rouge (Furniture Studio) ; légende nommant chaque modèle.
2. R1 : légende « photographiés avec un Alphatable » invérifiable pour 3 vêtements sur 4 (seul le manteau figure sur la fiche Alphatable) ; attribution retirée.
3. R7 : Alphatable complété selon la fiche Orbitvu (165 × 112 × 5 cm, 80 kg).
4. R8 : « formation Packshot professionnel de deux jours (14 heures) » non établie : 2 jours sur `/academy`, niveau 1 à 14 h sur `/academy/formations-packshot`, 7 h dans `content/formations/`. Durée retirée.
5. FAQ : Q1 « Qu'est-ce qu'un packshot e-commerce ? » remplacée par « Quel studio Orbitvu choisir pour ses produits e-commerce ? » (intention décisionnelle ; la définition relève du guide `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`, lié depuis « En bref ») ; Q7 et Q8 rendues autonomes (sujet explicite).
6. Petites contradictions : « investissement de départ » face au leasing ; démonstration en visioconférence « avec vos produits » ; « formations certifiées Qualiopi » (c'est l'organisme qui l'est) ; « article livré » et « article vendu ».
7. Métadonnées FR : `og:url`, `og:locale`, `og:type` absents (l'openGraph de la page remplace celui du layout) et `twitter:title` hérité du titre générique sans accents. Ajoutés pour le FR seulement.
8. Hiérarchie : les 3 cartes H3 « Explorez » tombaient sous le H2 du CTA ; le libellé devient un H2.
9. Accessibilité : 3 cibles tactiles sous 24 px (sources, liens formation) portées à 24 px.
10. Maillage : le bloc « Pour aller plus loin » affichait l'article « Taux de conversion » (+35 % de conversion avec le 360°, -35 % de retours) et « Les 10 astuces infaillibles ». Exclus de cette page seulement, par une prop optionnelle `exclure` ajoutée à `MoneyPageResources` (valeur par défaut vide : aucun changement pour les autres pages ni pour EN et de-ch).

**Vérifié** — Fiches orbitvu.com des 8 studios (dimensions, poids, unités, cadences, noms actuels ; aucun modèle délisté cité) ; orbitvu.com/software/ai (assistant photo IA : Pro G2 et XL G2) ; manuel Orbitvu « Subscriptions & Billing » (plan Free sans IA ni mises à jour) ; manuel des plateformes e-commerce (Magento 2, PrestaShop 1.7.x, WooCommerce, Shopware 6 et Shopify via SUN) ; provenance des visuels par comparaison avec les médias des fiches Orbitvu ; calculateur ROI (économie directe annuelle, temps interne libéré, seuil de rentabilité). Aucune duplication avec le guide définitionnel (1 6-gramme commun sur 3 093). Contrôles : `tsc`, eslint sur 3 fichiers, JSON (186), vitest 223/223, `next build`, `e2e/seo.spec.ts` 13/13 sur la page et 51/51 sur 4 autres money pages utilisant `MoneyPageResources`, CLS 0, aucune réponse 4xx, 36 images avec alt, 22 liens internes en 200, 10 externes conformes, FAQPage (8), claims interdits absents du rendu (texte, meta, JSON-LD, bloc `packshotEcommerce` du RSC) et du code de la page.
**Supposé** — L'erreur console `ERR_CERT_AUTHORITY_INVALID` vient du traceur lemlist, bloqué par le proxy de l'environnement de test ; non reproductible hors de ce bac à sable [non vérifié].
**Non regardé** — Rendu derrière Cloudflare ; Preview SSO ; versions EN et de-ch.

**Ouverts, hors périmètre** — `organizationSchema()` (partagé) publie `foundingDate` 2004, contraire à D33 (2001) ; le layout sérialise tout `fr.json` dans le RSC (≈ 370 Ko, anciens claims d'autres pages, HTML de 580 Ko) ; le guide définitionnel lié contient « ROI typique entre 6 et 12 mois » et « 60 à 80 % » ; incohérence des durées de formation entre `/academy`, `/academy/formations-packshot` et `content/formations/`.

---

## 2026-09-28 · F5 — audit final de la version FR de `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : #39 (brouillon) | **Commit** : voir PR

**Quoi** — Audit éditorial, factuel, SEO/GEO, UX et performance du commit `074189a`, corrections appliquées dans le même composant page-scopé et le même bloc `packshotEcommerce` de `messages/fr.json`.

**Pourquoi** — Formulations trop absolues ou non démontrées relevées par Laurent (photographe, recolorisation, « règles qui ne changent pas », principes marketplaces non attribués, prestataire, IA générative) ; claims à revérifier sur source primaire ; 9 préchargements d'images inutiles.

**Corrections** —
1. R1 : « workflow manuel documenté » face à « procédé enregistré », sans opposer le photographe.
2. R2 : variantes fidèles, recolorisation acceptable si la fidélité est contrôlée (Orbitvu documente la recolorisation sélective) ; étude De, Hu et Rahman ramenée à son périmètre exact (consultation du zoom et des photos alternatives, marque de vêtements pour femmes, corrélation) ; 5 sources UX dans un bloc repliable.
3. R3 : titre « les principes durables et les seuils à vérifier » ; chaque principe porte sa portée (toutes plateformes, Amazon, Google, Zalando) ; « six semaines » retiré, remplacé dans le tableau Google par le cadrage conseillé de 75 à 90 %.
4. R4 : prestataire « peut impliquer » envoi et attente ; IA générative décrite par le contrôle de fidélité, sans formule rhétorique.
5. R5 : formation de base attribuée à Orbitvu. R6 : astuce « nouvelle URL » retirée. R7 : Alphastudio XXL à 150 produits/jour (fiche Orbitvu).
6. R8 : financement limité à l'achat et au leasing (60 mois, dès 36 mois) ; « location avec option d'achat » retirée (seule source : FAQ de `machines.ts`, non validée).
7. FAQ : 360° Amazon (arrêt des ajouts le 14/12/2023, images déjà en ligne conservées sauf ajout d'un modèle 3D) ; vue 360° Google réservée aux marchands basés aux États-Unis ; durée d'installation « selon le système et la configuration » (le « un à trois jours » ne venait que de l'article migration) ; nuance bijoux d'Orbitvu.
8. Logos clients en chargement différé ; contrastes WCAG des petits textes (portée, notes, sources, numéros).

**Performance, build local, 3 passages** — Desktop 1440 : LCP médian 440 → 292 ms, élément LCP = H1 (texte) ; 67 → 66 requêtes. Mobile 390, réseau bridé à 1,6 Mbit/s et CPU ×4 : LCP médian 1 456 → 1 408 ms (H1) ; 54 → 45 requêtes, 661 → 605 Ko, images au chargement initial 14 → 5 (84 → 29 Ko), logos 9 → 0. Préchargements d'images dans le `<head>` : 12 → 3. Les écarts de LCP restent dans la variabilité entre passages ; le gain mesurable porte sur les requêtes, le poids et les préchargements. Variante « une seule image prioritaire » dans le hero mesurée (mobile 1 468 ms, desktop 332 ms) : pas de gain, deux images prioritaires conservées.

**Vérifié** — Sources relues le 28/09 : Amazon G1881 FR et EN (six images supplémentaires et une vidéo recommandées, 500 px, zoom à 1 000 px, 85 %, formats, fond RVB 255, une seule unité, allégations et badges, marquage des personnes générées par IA), Amazon G75PWC4THA8J269P (bordures), annonce Amazon Seller Central du 14/12/2023 (360°), Google Merchant Center 6324350 (500 × 500 au 31/01/2027, 1 500 × 1 500, produit entier sans mise en scène, éléments promotionnels, bordures, métadonnées IA, 75 à 90 %, six semaines), 13671720 (vue 360° : États-Unis), résumé Crossref de De, Hu et Rahman 2013, orbitvu.com (Alphastudio XXL, Micro Pro v2, Orbitvu Station, how-it-works). Contrôles : `tsc`, eslint `--max-warnings=0` sur les 2 fichiers TSX, JSON (186), vitest 223/223, `next build` vert, `e2e/seo.spec.ts` 13/13 sur la page, 1 H1, 36 images avec alt, 0 débordement, 0 ancre cassée, 24 liens internes en 200, 10 externes en `_blank` + `noopener noreferrer`, Organization + BreadcrumbList + FAQPage (8), libellés du formulaire à 18,86:1 sur desktop et mobile. `messages/en.json`, `messages/de-ch.json`, `PackshotLandingTemplate.tsx`, `components/forms/` et `app/[lang]/layout.tsx` inchangés par rapport à `main`.
**Supposé** — Les 4 packshots de vêtements du dossier `alphatable-alphadesk/` ont été réalisés sur Alphatable (visuels d'exemple de la fiche). La page Amazon sur le 360° est une annonce du forum vendeurs d'Amazon.com ; son application à Amazon.fr n'est pas documentée séparément.
**Non regardé** — Rendu derrière Cloudflare ; Preview Vercel protégée par SSO (contrôle visuel sur le build local) ; articles liés par `MoneyPageResources`.

**Constat hors périmètre** — `app/[lang]/layout.tsx` passe tout `messages/fr.json` à `NextIntlClientProvider` : environ 370 Ko de messages, dont les anciens claims d'autres pages (500+, -80 %, « 20 systèmes », « sans abonnement »…), figurent dans le flux RSC du HTML de chaque page. Le bloc `packshotEcommerce` qu'il contient est bien le nouveau. Chantier transversal à ouvrir (rayon large : toutes les pages).

**Écarts Orbitvu / données PSC, toujours non corrigés** (chantier transversal séparé) — Alphashot 360 (vidéo, cadence) ; Alphastudio Compact (dimensions) ; Alphastudio XXL (dimensions) ; Furniture Studio (charge) ; Orbitvu Station (« sans abonnement » contre plan gratuit sans IA ni mises à jour) ; garantie (12 mois extensible à 3 ans contre 2 ans extensible à 5) ; livraison et installation « incluses » (`fr.json:900`, contraire à D32). Détail dans l'entrée F5 précédente.

**Suite** — Validation de Sébastien sur la Preview ; réécriture EN et de-ch ; chantier transversal sur les écarts ci-dessus et sur les messages sérialisés dans le RSC.

---

## 2026-09-28 · F5 — nouvelle version FR de la landing `/fr/packshot-e-commerce` · Claude de Laurent

**Chantier** : substitution de page, page témoin `/fr/packshot-e-commerce` (F5) | **PR** : voir PR (brouillon) | **Commit** : voir PR

**Quoi** — Version FR réécrite en entier : chapeau citable, 8 H2 (série, fiche produit, marketplaces, choix prestataire / IA / studio interne, automatisé et opérateur, workflow, studio par gabarit, coût complet et accompagnement), FAQ de 8 questions, tableaux et cartes. Rendue par un composant page-scopé ; EN et de-ch restent sur le gabarit partagé, non modifié.

**Pourquoi** — Brief sourcé du 28/09 (`PSC_BRIEF_SOURCES_PACKSHOT_ECOMMERCE_2026-09-28.md`, hors dépôt) : 603 mots, 109 impressions et 0 clic en 120 jours ; chiffres contradictoires avec le reste du site (500+ produits/jour, -80 %, ROI 4-8 mois) ; FAQ Amazon fausse (« 1000px minimum ») ; Alphashot G2 délistée citée ; intention « définition » déjà couverte par `/fr/blog/guide-photographie-packshot-pourquoi-faire-packshots`. La landing prend l'intention « produire en série en interne ».

**Fichiers** — `components/landings/PackshotEcommerceFr.tsx` (nouveau), `app/[lang]/packshot-e-commerce/page.tsx` (FR vers le nouveau composant), `messages/fr.json` (bloc `packshotEcommerce` seul, lignes 1219-1298 d'origine ; aller-retour JSON identique à l'octet hors de ce bloc).

**Claims retirés de la version FR** — 500+ produits/jour, -80 % de coûts, ROI 4-8 mois et tout délai de retour générique, « moins de 1 € par image », « le 360° augmente les conversions », « toutes les marketplaces », « zéro compétence photo », « élimine le photographe et le retoucheur », « Amazon exige 1000px minimum, format JPEG », « IQ Mask garantit un fond blanc conforme », Alphashot G2, témoignage « Marie L. », bandeau de statistiques. Aucun prix en prose (D7, D13, D25).

**Écarts Orbitvu / données PSC, non corrigés ici (rayon large)** — La prose suit Orbitvu (fiches relevées le 28/09) ; `machines.ts` et les autres pages ne sont pas modifiés :
1. Alphashot 360 : vidéo annoncée par Orbitvu, absente de `machines.ts` (`['packshot','360']`) ; 150 produits/jour (Orbitvu) contre 200 (`capaciteJour`).
2. Alphastudio Compact : 80 × 70 × 130 cm (Orbitvu) contre 100 × 70 × 190 cm (PSC, « Compact Pro v2 »).
3. Alphastudio XXL : 190 × 90 × 100 cm (Orbitvu) contre 100 × 70 × 190 cm (PSC).
4. Furniture Studio : plateforme 1 000 kg, version 4 000 kg (Orbitvu) contre 500 kg (PSC).
5. Nombre de systèmes : 14 au catalogue Orbitvu, « 20 systèmes » sur le site PSC, 13 fiches PSC actives.
6. Abonnement : `fr.json:2397` dit Orbitvu Station « sans abonnement … toutes les mises à jour » ; la documentation Orbitvu décrit un plan gratuit sans IA ni mises à jour.
7. Garantie : 12 mois extensible à 3 ans (Orbitvu) contre 2 ans extensible à 5 ans (guide d'achat PSC).
8. `fr.json:900` : « livraison, installation … incluses », contraire à D32.

**Effet attendu** — Sortie de la cannibalisation avec l'article définition ; positions sur « packshot e-commerce », « studio photo e-commerce », « photo produit e-commerce en interne » à mesurer à J+28 et J+56 après mise en production. Aucun lien entrant ajouté (gel J+56).

**Vérifié** — `npx tsc --noEmit` OK ; eslint `--max-warnings=0` OK sur les 2 fichiers TSX ; `node scripts/seo/verifier-json.mjs` OK (186 fichiers) ; `npx vitest run` 223/223 ; `npx next build` vert (variables factices de la CI), `/fr`, `/en`, `/de-ch/packshot-e-commerce` prérendues ; `e2e/seo.spec.ts` filtré sur la page, 13/13, contre `next start` local. Rendu local desktop 1440 px et mobile 390 px : 1 H1, hiérarchie H2/H3, 36 images chargées avec alt, 0 débordement horizontal, 0 ancre cassée, JSON-LD Organization + BreadcrumbList + FAQPage (8 questions), 24 liens internes en 200, 10 liens externes en `target="_blank"` et `rel="noopener noreferrer"`. Recherche des claims retirés et des prix dans le texte, la meta et le JSON-LD : aucun (seuls restent les titres d'articles de `MoneyPageResources`, inchangés).
**Supposé** — Les sources DOI (INFORMS) et Shopify FR répondent 403 à `curl` mais sont publiques dans un navigateur (brief du 28/09). Les valeurs marketplaces sont celles du 28/09 : bloc daté, à revalider à la mise en ligne.
**Non regardé** — Versions EN et de-ch (anciens claims toujours présents) ; rendu derrière Cloudflare ; Preview Vercel protégée par SSO (contrôle visuel fait en local) ; les articles liés par `MoneyPageResources`, dont « Taux de conversion : boostez-le… », non relus.

**Suite** — Validation de Sébastien sur la Preview. Puis : réécriture EN et de-ch ; arbitrage des 8 écarts ci-dessus dans `machines.ts` et `fr.json` ; mise à jour de la FAQ de `/fr/packshot-amazon` si elle porte encore le « 1000px » ; J0 de mesure F5 = date de mise en production.

---

## 2026-09-25 · Correctif : slug EN de l'article migration renvoyé en 410 par le Worker · Claude de Sébastien

**Chantier** : correctif de la PR #36 | **PR** : #37 | **Commit** : voir PR

**Quoi** — Le slug EN `migrate-old-packshotcreator-studio` devient `migrate-legacy-packshotcreator-studio` (fichier, `alternates.json`, `CONTENT_PRODUCT_MAP`).

**Pourquoi** — Sur www, la page EN répondait 410 « Gone » alors que sysnext.vercel.app la servait en 200 : `shouldReturn410()` du Worker renvoie 410 pour tout chemin contenant `-old-` (nettoyage de l'ancien site). Signalé par Sébastien le 25/09, constaté dans Chrome (status 410, titre « Gone | PackshotCreator »).

**Fichiers** — `content/blog/en/migrate-legacy-packshotcreator-studio.json` (renommé), `content/blog/alternates.json`, `data/content-maillage.ts`.

**Effet attendu** — Page EN en 200 sur www dès le déploiement ; hreflang croisés FR/EN/DE-CH vers la nouvelle URL.

**Vérifié** — Nouveau slug et slugs FR/DE-CH testés contre la fonction `shouldReturn410` extraite de `cloudflare-worker/src/index.js` (main) : ancien slug `true`, nouveau `false`, FR et DE-CH `false`. Plus aucune référence à l'ancien slug dans le dépôt (hors journal).
**Supposé** — Qu'aucune autre règle du Worker (redirections, GONE_PATHS) ne touche le nouveau chemin : le slug n'apparaît nulle part dans le Worker.
**Non regardé** — La version du Worker réellement déployée (le dépôt fait foi mais la prod peut avoir divergé, R5) ; le Worker n'est pas modifié ici.

**Suite** — Avant tout nouveau slug, le tester contre `shouldReturn410` : le motif `-old-` et le suffixe `-mod` sont réservés au nettoyage de l'ancien site. L'ancienne URL EN n'a été servie en 410 qu'environ une heure, sans lien entrant externe connu : pas de redirection prévue (elle serait de toute façon interceptée par le 410).

---

## 2026-09-25 · Article blog « Migrer un ancien studio PackshotCreator vers Orbitvu » (FR, EN, DE-CH) · Claude de Sébastien

**Chantier** : contenu blog (hors chantier numéroté) | **PR** : #36 | **Commit** : `b60f7b1`

**Quoi** — Nouvel article natif en trois langues (FR rédigé par Sébastien, EN et DE-CH adaptés), 5 visuels AVIF, entrée hreflang, tunnel Alphashot Pro G2 et liens entrants depuis 2 hubs secteurs et 1 money page.

**Pourquoi** — Les utilisateurs historiques de PackshotCreator appellent chaque semaine sur la fin de support des anciens logiciels (31/12/2024) ; aucune page ne traitait la migration vers la gamme Orbitvu actuelle.

**Fichiers** — `content/blog/{fr,en,de-ch}/*.json` (3 nouveaux), `content/blog/alternates.json` (1 entrée ajoutée), `data/content-maillage.ts` (ajouts seulement : CONTENT_PRODUCT_MAP ×3, SECTOR_RESOURCES_MAP cosmetiques-beaute + jouets-puericulture, MONEY_PAGE_RESOURCES_MAP studios-photo-automatises), `public/images/blog/migrer-ancien-packshotcreator/` (5 AVIF, 236 Ko).

**Effet attendu** — Indexation des 3 URL sous quelques jours ; requêtes « ancien studio PackshotCreator », « logiciel PackshotCreator Windows 11 » et équivalents EN/DE.

**Vérifié** — `next build` vert, 3 pages prérendues ; en local : HTTP 200, canonical, hreflang (fr, fr-CH, en, de-CH, x-default) croisés, FAQPage, tunnel « Studio recommandé » dans les 3 langues, listing blog, sitemap, liens entrants sur les 2 hubs et la money page, 5 images servies. Prix leasing recalculés contre `lib/leasing.ts` (EUR et CHF).
**Supposé** — Rendu mobile de l'image portrait XL G2 (limitée à 60 % de largeur) : seul l'affichage bureau a été contrôlé.
**Non regardé** — Test détecteur IA et relecture native des versions EN et DE-CH (à faire par Sébastien avant fusion) ; rendu derrière Cloudflare.

**Suite** — Couverture à remplacer par une photo du showroom (Sébastien) ; transmettre URL et date de mise en ligne à Laurent ; supprimer l'ancien brouillon non suivi du 04/09 dans le checkout principal.

---

## 2026-09-25 · P0-K — resynchronisation documentaire P0 ; P0-J différé · Claude de Laurent

**Chantier** : P0-K (et état de P0-J) | **PR** : #35 (documentation seule) | **Non fusionnée**

**Quoi** — `ETAT.md` remis dans l'état réel, sans aucun changement en base, dans n8n ni sur le site :
- P0-I passe à **APPLIED / PASS**, P0-H à **APPLIED / MEASUREMENT WINDOW OPEN** jusqu'au 08/10, et P0-F à **DEFERRED_BLOCKED_ACCESS**.
- P0-J (device + watchdog) et P0-K entrent dans le tableau P0. P0-J est aussi ajouté aux chantiers ouverts, en **OPEN, différé**.
- P0-A et D31, appliqués, sortent des chantiers ouverts. Le contrôle post-déploiement de #29 et #32 est scindé :
  - `smoke.mjs` et `sysnext.vercel.app` : faits le 24/09 ;
  - contrôle visuel Chrome sur `www` : seul restant.
- La ligne « déploiement du Worker portant uniquement #16 » est retirée : ce déploiement a eu lieu le 20/09. La mesure « Canonique des 3 landings après #16 » est datée : déployée le 20/09, lisible vers le 04/10.
- #31 figure explicitement en **CLOSED / NOT MERGED**.
- P0-C et P0-G sont signalés hors de cette resynchronisation : aucune source du dépôt n'établit leur état.

**Pourquoi** — Contrôle final ciblé P0-J / P0-K du 25/09. Laurent a décidé de faire P0-K maintenant et de différer P0-J après la fenêtre P0-H. Modifier M5 et `gsc_pull_bornes` pendant la mesure P0-H, dont le critère est « 0 échec de M5 », affaiblirait cette preuve.

**Fichiers** — `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun sur le site. À la fusion de #35, `main` décrit l'état réel pendant la fenêtre de mesure.

**Vérifié** (le 25/09, lecture seule) —
- *P0-J* :
  - `gsc_metrics_device` : dernière `data_date` au 20/06/2026 pour les sites 2 et 3, dernière récupération le 23/06. `gsc_metrics` est à jour au 22/09.
  - M5 (`Sqdk2jygOSt9XEjL`, actif, dernière modification le 21/07) ne collecte que les dimensions `query`, `country` et `page`. `gsc_pull_bornes()` ne renvoie aucune borne `device`.
  - La fonction `upsert_gsc_device(jsonb)` existe, mais aucun workflow n8n ne l'appelle : la recherche « device » ne renvoie rien.
  - Watchdog M0 (`Uxpnp2YDkYVAq52L`, actif, tous les jours à 08h) : il lit `data_freshness_expected`, qui liste 14 sources dont `gsc_metrics_device` ne fait pas partie. `m0_watchdog_json`, `data_freshness` et `gsc_freshness` ne mentionnent pas le device.
- *#16* : Worker déployé le 20/09 à 06:40:14 UTC, version `167d7a15` (entrée du 20/09).
- *Cohérence* :
  - `DECISIONS.md` et la boîte aux lettres ne mentionnent aucun P0 et ne contredisent pas l'ETAT ;
  - seule Q10 est ouverte ;
  - Q16 à Q18 ne sont pas reconstituées ;
  - D29, D30 et D31 sont conformes.

**Supposé** — Rien.

**Non regardé** — Le contrôle visuel Chrome sur `www`, fait par Laurent. Les définitions de P0-C et P0-G dans le Master, qui est hors dépôt.

**Suite** —
- Contrôle visuel Chrome sur `www` (`/fr`, `/en`, `/de-ch`), par Laurent.
- Fusion de #35 sur GO.
- Après le 08/10, P0-J sur GO :
  - dimension device dans M5 ;
  - borne device dans `gsc_pull_bornes` ;
  - reprise de l'historique depuis le 21/06 ;
  - inscription de `gsc_metrics_device` dans `data_freshness_expected`.
- Ensuite, une dernière PR documentaire fermera le P0.

## 2026-09-25 · P0-I — filtre pollution GSC appliqué (8 fonctions SQL) · Claude de Laurent

**Chantier** : P0-I | **Supabase** : `gsc-crawl-seo`, migration `20260925061338` `p0i_filtre_pollution_gsc_site_20260925` | **PR** : documentation seule | **P0-I = APPLIED**

**Quoi** — Le 25/09/2026 à 06:13:38 UTC, sur `GO_P0_I` de Laurent : dans les 8 fonctions, le littéral `amazon` est retiré des motifs d'exclusion et remplacé par `(^|\s)site:`. Aucun autre changement. Les 8 fonctions :
- `app_blog_reconversion_list`
- `app_gsc_opportunities`
- `app_gsc_top_queries`
- `app_kpi_loop`
- `app_page_conversion_loop`
- `gsc_candidates_vertical`
- `gsc_quick_wins_json`
- `gsc_tracking_weekly_json`

Motifs modifiés, 10 occurrences :
- `vercel|todovirtual|amazon|orbitvu.nl` (ou `orbitvu\.nl`) devient `vercel|todovirtual|(^|\s)site:|orbitvu.nl` ;
- dans `gsc_quick_wins_json`, `p_brand_regex` `(creator|ortery|orbitvu|vercel|todovirtual|amazon)` devient `(creator|ortery|orbitvu|vercel|todovirtual|(^|\s)site:)`.

Application en une seule transaction, gardée par md5 avant et après écriture. Aucun changement n8n, applicatif ni Cloudflare.

**Pourquoi** — P0-I, dry-run validé. La marque `amazon` écartait des requêtes légitimes, alors que les requêtes opérateur `site:` gonflaient les impressions.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. En base : les 8 fonctions ci-dessus.

**Effet attendu** — Immédiat dans les RPC de pilotage :
- les requêtes contenant « amazon » sans autre motif de pollution sont réadmises ;
- les requêtes `site:` sont exclues ;
- aucun clic n'est gagné ni perdu.

**Vérifié** —
- *Snapshot avant écriture* :
  - les 8 définitions sont relues par `pg_get_functiondef` et sont dans l'état audité le 24/09 (`amazon` présent, 0 `site:`) ;
  - elles sont copiées hors dépôt, et les 8 copies sont identiques à la production par md5 ;
  - une seule version de chaque fonction.
- *Dry-run rejoué avant écriture*, logique identique à la validation, fenêtre `data_date >= ancre − 90`, 0 clic dans chaque cas :

| Mesure | Ancre du dry-run (21/09) | Ancre actuelle (22/09) |
|---|---|---|
| PSC, requêtes réadmises | 40 / 1 694 impressions | 41 / 1 684 |
| PSC, nouvelles filtrées `site:` | 3 / 2 239 | 3 / 2 239 |
| PSC, pollution filtrée après changement | 71 / 5 595 | 71 / 5 608 |
| Orbitvu, requêtes Amazon réadmises | 15 / 45 | 15 / 45 |

  Les valeurs du dry-run sont reproduites **exactement**. L'écart avec l'ancre actuelle ne vient que du jour de données du 22/09, récupéré le 25/09. Aucune ligne antérieure n'a été réécrite : chaque jour n'est récupéré qu'une fois.
- *Après écriture* :
  - 8/8 md5 conformes, 0 occurrence d'`amazon`, 10 occurrences de `(^|\s)site:` ;
  - propriétaire, droits, `SECURITY DEFINER`, `search_path`, volatilité et commentaires inchangés ;
  - aucune fonction dupliquée ;
  - le remplacement inverse redonne exactement les md5 d'origine.
- *Contrôle fonctionnel avant/après* :
  - **clics inchangés partout** (452, 314 + 127, 17, 16, 99, 7, 2), conversions et `global_web` inchangés ;
  - `app_gsc_top_queries` et `app_gsc_opportunities` inchangés ;
  - `gsc_quick_wins_json` : 2 requêtes Amazon ajoutées (+279 impressions), aucune requête `site:` avant ni après ;
  - `gsc_candidates_vertical` : 2 requêtes Amazon ajoutées (+14) ;
  - `gsc_tracking_weekly_json` : `site:www.packshot-creator.com` exclue, « 360 images for amazon » réadmise ;
  - écarts d'impressions **égaux au calcul attendu** : `app_page_conversion_loop` −864, `app_kpi_loop` −307 et −557, `app_blog_reconversion_list` +23.
- *Dépendants* :
  - `app_recommendations` (appelle `app_gsc_opportunities`) s'exécute sans erreur ;
  - `r3_measure_article` (appelle `gsc_tracking_weekly_json`) écrit en base : non appelé, sa dépendance a été testée directement.
- *n8n, lecture seule* : le nœud `Init` de « M6 · Scoring MICRO » (`3FtFKh8649fi03TZ`) ne porte que le lexique, pas le filtre de pollution : aucune synchronisation n'est requise. Workflow non modifié (dernière mise à jour le 02/07).

**Écart avec la référence du dry-run** — Orbitvu : la référence annonçait « 1 requête Amazon reste filtrée ». En réalité, les 15 requêtes Amazon sont réadmises. La seule requête Orbitvu qui reste filtrée est `orbitvu.nl` (8 impressions), sans « amazon », et elle l'était déjà avant. C'est un écart de formulation, pas de logique.

**Supposé** — Que les workflows n8n appelant ces RPC par REST gardent le même contrat : les signatures et types de retour sont inchangés.

**Non regardé** — Les prochaines exécutions des workflows consommateurs, dont M6, et de `r3_measure_article`. L'effet sur les tableaux de bord au-delà des RPC testées.

**Suite** — Rollback disponible. Le bloc ci-dessous restaure exactement les 8 définitions d'origine. Il est gardé par md5 et refuse de s'exécuter si une fonction a divergé depuis le 25/09. Les 8 définitions d'origine en clair ont aussi été transmises à Laurent, hors dépôt.

```sql
-- ROLLBACK P0-I · restaure exactement les 8 définitions d'avant le 25/09/2026.
-- Remplacement inverse '(^|\s)site:' → 'amazon', gardé par md5 avant et après : tout écart annule la transaction.
DO $p0i_rb$
DECLARE
  r record;
  v_actuel constant jsonb := '{
    "app_blog_reconversion_list":"1e6d513cd29a0369b5d67caff8f7b2e5",
    "app_gsc_opportunities":"ed590889d54f3acd785f425585fa851a",
    "app_gsc_top_queries":"6611063a0688c1a5c5ad947f60cc3ec1",
    "app_kpi_loop":"b521c4aaca83e47ffbae9dd6c346cde0",
    "app_page_conversion_loop":"0136e49c080af368be89a38332cdddb7",
    "gsc_candidates_vertical":"3b97141a28ccd1026ab264c96e707a3a",
    "gsc_quick_wins_json":"0c01cf57a4b7ba7f30ca8159e9341e05",
    "gsc_tracking_weekly_json":"f7f648bcaae09f184067621525e459c0"}';
  v_origine constant jsonb := '{
    "app_blog_reconversion_list":"f14f0f4f0310e5ae48a826d3a4337915",
    "app_gsc_opportunities":"84453d8df1589d76ff897c9685edff46",
    "app_gsc_top_queries":"b9f3268c367be551bf3f8f92ae1374a6",
    "app_kpi_loop":"b409b2fab018d311740a0320ed85e6bd",
    "app_page_conversion_loop":"d9865c4fd75347825070a496d13e1118",
    "gsc_candidates_vertical":"03e1ef08dc09627520004f6e70100513",
    "gsc_quick_wins_json":"7a7716d53582b70f5e6b099c476b1e4a",
    "gsc_tracking_weekly_json":"44a01ea21784b5eaedc79025002a2261"}';
  n int := 0;
BEGIN
  FOR r IN SELECT p.oid, p.proname, md5(pg_get_functiondef(p.oid)) AS m
           FROM pg_proc p JOIN pg_namespace ns ON ns.oid = p.pronamespace
           WHERE ns.nspname = 'public' AND p.proname IN (SELECT jsonb_object_keys(v_actuel))
  LOOP
    IF r.m IS DISTINCT FROM v_actuel->>r.proname THEN
      RAISE EXCEPTION 'Rollback P0-I refusé : % a divergé (md5 %)', r.proname, r.m;
    END IF;
    EXECUTE replace(pg_get_functiondef(r.oid), '(^|\s)site:', 'amazon');
    n := n + 1;
  END LOOP;
  IF n <> 8 THEN RAISE EXCEPTION 'Rollback P0-I : % fonctions au lieu de 8', n; END IF;
  FOR r IN SELECT p.proname, md5(pg_get_functiondef(p.oid)) AS m
           FROM pg_proc p JOIN pg_namespace ns ON ns.oid = p.pronamespace
           WHERE ns.nspname = 'public' AND p.proname IN (SELECT jsonb_object_keys(v_origine))
  LOOP
    IF r.m IS DISTINCT FROM v_origine->>r.proname THEN
      RAISE EXCEPTION 'Rollback P0-I : md5 inattendu pour % (%)', r.proname, r.m;
    END IF;
  END LOOP;
END
$p0i_rb$;
```

## 2026-09-25 · Arbitrages de Laurent — Q2, Q4, Q6, Q12 à Q15 · Claude de Laurent

**Chantier** : gouvernance | **PR** : #34, branche `claude/lucid-mayer-tz2mk8` (documentation seule) | **Non fusionnée**

**Quoi** — Sept questions de la boîte aux lettres sont closes sur décision de Laurent du 25/09. Quatre deviennent des décisions nouvelles (D32, D33, D35, D36), une en clôt une ancienne (D34 clôt D8), et deux confirment des décisions existantes :

| Question | Réponse | Consignée en |
|---|---|---|
| Q13 | Aucune politique de retour B2B ; livraison et installation facturées en supplément ; délai indicatif d'environ 10 jours, jamais présenté comme une garantie contractuelle ; même règle en France et en Suisse | D32 |
| Q15 | Allemand un peu parlé : accompagnement commercial en allemand possible en Suisse, équipe ni bilingue ni germanophone native ; espagnol non parlé ; `twitter.com/packshot` à Sysnext, inactif ; date de création 2001, `foundingDate` à aligner | D33 |
| Q4 | D8 close comme devenue sans objet | D34, statut de D8 |
| Q14 | Requête française → page FR ; article EN inchangé ; mesure F5 conservée | D35 |
| Q12 | `noindex` de `sysnext.vercel.app` validé, à exécuter puis à vérifier | D36 |
| Q6 | Aucune objection reçue avant le 25/09 : décision prévue conservée | D22 |
| Q2 | Close selon le régime tacite prévu au 24/09 | D15, désormais « en vigueur » |

`ETAT.md` :
- les questions closes sortent de « Balle chez Sébastien » ;
- les actions à exécuter entrent dans « Prochaines actions » ;
- seule Q10 reste ouverte.

**Précisions de Laurent du 25/09, avant fusion** — D33 : « allemand non parlé » est remplacé par « un peu parlé ». L'accompagnement commercial en allemand en Suisse est possible, sans présenter l'équipe comme bilingue ni germanophone native, et les mentions actuelles sont conservées. D32 : la règle est la même pour la France et la Suisse. L'écart R7 sur l'allemand, consigné dans une première version de cette PR, est levé.

**Pourquoi** — Arbitrages rendus par Laurent le 25/09, à consigner avant toute mise en œuvre.

**Fichiers** — `docs/seo-geo/BOITE-AUX-LETTRES.md`, `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun sur le site : aucun fichier applicatif touché, aucune règle Cloudflare modifiée.

**Vérifié** (le 25/09, R7) —
- `components/seo/SchemaOrg.tsx:72` : `foundingDate: '2004'`.
- `components/seo/SchemaOrg.tsx:69-71` : le `sameAs` de l'organisation ne contient que LinkedIn, pas `twitter.com/packshot`.
- Mentions d'accompagnement en allemand, compatibles avec D33 et conservées : `messages/fr.json:189`, `messages/de-ch.json:167`, `messages/en.json:93` et `app/[lang]/distributeur-orbitvu-suisse/page.tsx:36`, et `components/seo/SchemaOrg.tsx:66` (`availableLanguage` avec `German` sur le `ContactPoint` commercial suisse).
- Recherche de formulations « bilingue », « germanophone », « natif », « couramment », et de leurs équivalents allemands et anglais, dans `messages/`, `app/`, `components/` et `content/` : aucune ne vise la langue de l'équipe. Les quatre textes ci-dessus annoncent en allemand l'ensemble du service, formation et SAV compris : ils sont signalés pour une relecture ultérieure.
- `https://sysnext.vercel.app/fr` : ni en-tête `X-Robots-Tag` ni balise `robots`, l'origine est indexable.
- `scripts/seo/smoke.mjs` ne lit que la balise `robots`.
- Aucun texte d'origine perdu dans `BOITE-AUX-LETTRES.md` : 0 ligne manquante après déplacement.

**Supposé** — Les faits commerciaux et d'entreprise (Q13, Q15) sont ceux déclarés par Laurent ; le dépôt ne permet pas de les vérifier. L'absence d'objection avant le 25/09 (Q6) et au 24/09 (Q2) est tenue pour acquise sur la déclaration de Laurent.

**Non regardé** — La fiche Google elle-même, en particulier ses mentions « Espagnol » et « Allemand non parlé ». Les règles WAF actuelles (P0-F sans accès).

**Suite** —
- Q10 est la seule question encore ouverte.
- Relecture éventuelle des quatre textes qui annoncent en allemand l'ensemble du service (D33), sans modification dans cette PR.
- Mises en œuvre distinctes, hors de cette PR : D32 (données structurées des fiches) ; D33 (`foundingDate` 2001) ; D36 (`noindex` de l'origine) ; D22 (règle WAF PerplexityBot).
- P0-I et P1 ne sont pas touchés.

## 2026-09-25 · Déploiement du Worker — P0-D/E · Claude de Laurent

**Chantier** : P0-D/E | **PR** : #30, fusionnée (`665f5ef`) | **Commit déployé** : `69cd647` (`main`) | **Version Cloudflare** : `27b0153c-5516-432a-91a4-20cddce250ca` | **P0-D/E WORKER = CLOSED**

**Quoi** — `packshot-router` déployé depuis `main` par `wrangler deploy` (wrangler 4.136.3), le 25/09/2026 à 05:07:25 UTC, sur GO de Laurent (`GO_WORKER_DEPLOY`). Le déploiement porte la PR #30 et rien d'autre. Aucune édition au dashboard (D4, R5). Ni P0-I, ni P1.

**Pourquoi** — P0-D/E, fusionné le 24/09 : héritage `/de` → `/de-ch`, chaînes `/industrie/*` et `/studio-photo/*` à un saut, doublon « -22 », `packshot-mannequin`. Vercel ne déploie pas le Worker.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`. Déployé : `cloudflare-worker/src/index.js` de `69cd647`.

**Effet attendu** — Immédiat côté Worker : 30 chemins changent de premier saut (60 avec la barre finale), vers une page 200 à canonique auto-référente. Lisible dans la couverture GSC et les pages de destination à J+14 (09/10).

**Vérifié** —
- *Contrôle post-fusion du 24/09*, sur `sysnext.vercel.app` : Vercel, P0-A et D31 PASS ; `smoke.mjs` vert, 17 pages et 3 ressources.
- *Avant déploiement* :
  - code de production relu par l'API, identique octet pour octet aux relevés du 24/09 : **aucune divergence** ;
  - version `05c5c47c-4b60-41af-9acd-b3778be1e508` à 100 % (déploiement `3c88c9cb` du 23/09) ;
  - routes (`www.packshot-creator.com/*`, `packshot-creator.com/*`, `*.packshot-creator.com/*`) et réglages (`compatibility_date` 2024-01-01, `NEXTJS_ORIGIN`, `WEBFLOW_ORIGIN`) identiques à `wrangler.toml` ;
  - bundle construit à blanc depuis `main` : 0 écart de comportement avec le source sur 5 530 chemins ;
  - écart production → `main` : 30 premiers sauts (60 avec la barre finale), la liste validée dans la PR #30 ; 0 chemin Alphashot XL ; variante `/amp` du « -22 » en 410 ; 30 destinations finales sur 30 en 200, en un saut, canonique auto-référente, sur `sysnext.vercel.app` ;
  - `npm run test:unit` : 223/223.
- *Après déploiement, par l'API* :
  - déploiement `80f41b94-d560-4a9a-91a1-60f577ef4535`, version `27b0153c` à 100 % ;
  - code relu identique octet pour octet au bundle de `main`, 0 écart de comportement avec `main` sur 5 530 chemins ;
  - par rapport à `05c5c47c`, exactement les 30 changements validés ;
  - routes et réglages identiques avant et après.
- *Témoins en production*, depuis le poste de Laurent : `curl.exe` sous PowerShell, chaîne `v=p0de-5`, 16 témoins et 3 variantes avec barre finale. **Verdict de Laurent : PASS, aucun rollback.**
  - Redirections P0-D/E → destinations finales en 200, canoniques cohérentes.
  - `/amp` du « -22 » : 410 avec et sans barre finale.
  - `/de/fotostudio/alphashot-xl` → `/de-ch/fotostudio/maschinen-finder` : D29 non réintroduite.
  - `/de/studio-photo/alphashot-xl` → XL G2 : comportement antérieur, `REVIEW_PRODUCT_MAPPING`, inchangé par ce déploiement.
  - `videos.` : 404, sans redirection vers `www`. `books.` : 302 sur le même hôte puis 200, sans redirection vers `www`. `trail.` : 200.
- *Depuis le conteneur* : `www.` et `videos.` en 403 `cf-mitigated: challenge` (R4) ; `books.` et `trail.` en 200, sans redirection vers `www`.

**Supposé** — Que le 404 de la racine de `videos.` vient de son origine : le Worker laisse passer cet hôte (`PASSTHROUGH_HOSTS`), et la simulation donne le même passage avant et après ce déploiement.

**Non regardé** — L'état de la racine de `videos.` avant ce déploiement, depuis le poste de Laurent. Les 30 chemins un par un en production (19 témoins seulement). GSC, à J+14.

**Suite** —
- Mesure à J+14 (09/10), dans GSC.
- Rollback si besoin, depuis `cloudflare-worker/` : `npx wrangler@4.136.3 rollback 05c5c47c-4b60-41af-9acd-b3778be1e508`. Jamais au dashboard.
- Mappings XL existants maintenus en `REVIEW_PRODUCT_MAPPING` (D29 suspendue) : aucun changement XL avant validation du mapping produit.
- P0-I : opération indépendante, sur GO séparé, avec son rollback SQL.
- Hors P0, nettoyage ultérieur (classement de Laurent) :
  - phrase anglaise en dur sur `/de-ch/wichtige-fragen-produktfotografie` ;
  - deux chaînes de satisfaction dans `messages/de-ch.json`, non rendues.

## 2026-09-24 · Gouvernance P0 — D29 à D31, état des P0 · Claude de Laurent

**Chantier** : clôture technique P0 du 24/09 | **PR** : #33, branche `docs/gouvernance-p0-2026-09-24` (documentation seule) | **Fusionnée en dernier**, après #29, #30 et #32

**Quoi** — `DECISIONS.md` : D29 (`SUSPENDED / REVIEW_PRODUCT_MAPPING` — mapping produit Alphashot XL v2 / XL G2 à valider, aucun changement XL d'ici là), D30 (mensualités de-ch hors périmètre, aucun changement), D31 (aucun témoignage ni avis client sur `/de-ch`, `Review` et `aggregateRating` compris ; l'`aggregateRating` de `/de-ch/ia-photo-produit` est retiré dans la PR #32, `1c52eb7`). `ETAT.md` : lignes P0-A, P0-D/E, D29, D31, P0-I, P0-F ; lot F fusionné et déployé le 23/09 ; P0-H en attente de mesure ; nouvelle section « P0 du 24/09 — état ».

**Pourquoi** — Contrôle de clôture du 24/09 : aucun des points P0 du jour n'était reflété sur `main` dans `ETAT.md`, `DECISIONS.md`, `JOURNAL.md` ou `BOITE-AUX-LETTRES.md`, et `ETAT.md` présentait encore le lot F comme non déployé.

**Fichiers** — `docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun sur le site.

**Vérifié** (le 24/09, en lecture seule) —
- *P0-H* :
  - migration `20260924135212_p0h_gsc_pull_bornes_index_backward_20260924` présente ; la fonction déployée est identique à son texte ;
  - sortie identique à l'ancienne requête, rejouée en `SELECT` ; `EXPLAIN ANALYZE` 2,9 ms ; bornes au 21/09 sur les 6 couples ;
  - M5 #3399 en succès le 24/09 à 13:52 UTC ; la définition précédente est conservée dans la migration `20260721144023`.
- *P0-I* : les 8 fonctions (`gsc_quick_wins_json`, `gsc_tracking_weekly_json`, `gsc_candidates_vertical`, `app_gsc_top_queries`, `app_kpi_loop`, `app_page_conversion_loop`, `app_gsc_opportunities`, `app_blog_reconversion_list`) excluent encore `amazon` ; aucune ne filtre `site:`. Aucune migration P0-I.
- *P1-Q* : 0 commit touchant `content/blog` sur `main` depuis le 01/08, 0 fichier supprimé.
- *Workflow n8n `mXBXhmlutu26YMTY`* (jetable du test SERP) :
  - l'historique ne garde que « TEMP P0-B » (14:03) et « Restauration jsCode 23/09 » (14:05) ;
  - les 53 tâches générées par le code restauré sont identiques, par lecture élément par élément, à la sortie de l'exécution #3379 du 23/09 faite avec la version d'origine ;
  - le workflow est inactif et non archivé.
- *Test SERP* : exécution #3400 (5 requêtes sur 10). AI Overview sur 3, PSC hors top 10 sur 5, orbitvu.fr dans le top 10 sur 3 et devant PSC à chaque fois.
- *Worker de production* : comportement identique à `main` sur 3 691 chemins ; P0-D/E non déployé.
- *Origine de production* (`sysnext.vercel.app`) : `/de-ch` sort encore `inLanguage` `en-US` et rend les témoignages.
- *D29, XL v2* : `/de-ch/fotostudio/alphashot-xl-v2` répond 200, titre et H1 « Alphashot XL v2 », canonique auto-référente, aucune balise `robots`, absente du sitemap (`delisted: true`). Worker de `main` : 13 entrées sont passées de `alphashot-xl-v2` à `alphashot-xl-g2` entre le 17/09 et le 23/09, et 0 entrée ne vise plus `alphashot-xl-v2`. `next.config.ts` de `main` : 2 règles vers `alphashot-xl-v2`.

**Correction du 24/09 — D29 suspendue** — Laurent : l'Alphashot XL ancienne génération et l'Alphashot XL G2 coexistent. En conséquence :
- D29 passe de « en vigueur » à `SUSPENDED / REVIEW_PRODUCT_MAPPING` ;
- la PR #31 est fermée sans fusion ;
- la redirection `/de/fotostudio/alphashot-xl` → XL G2 est retirée de la PR #30 (`e112460`) ;
- les 13 redirections en production vers XL G2 et les 2 règles de `next.config.ts` vers XL v2 sont laissées en l'état, sans rollback automatique.

**Fusion du 24/09** — GO de Laurent, ordre strict, `main` fusionnée dans chaque PR suivante avant sa fusion ; seul conflit rencontré : `JOURNAL.md`, résolu en gardant toutes les entrées :
- #29 (P0-A) → `6c16108` ;
- #30 (P0-D/E) → `665f5ef` ; le Worker de production **n'est pas déployé** ;
- #32 (D31) → `c9f8aa5` ;
- #31 reste fermée sans fusion ; aucun de ses commits n'est sur `main`.
P0-I non appliqué. `ETAT.md` mis à jour dans cette PR pour refléter cet état.

**Supposé** — Le verdict `MIXED` de P0-B et les constats de marque de P0-C, tels que déclarés par Laurent : leurs livrables ne sont pas dans le dépôt.

**Non regardé** — `BOITE-AUX-LETTRES.md` n'est pas modifié : le texte de Q16 à Q18 n'a pas été transmis et n'est pas reconstitué. Les 5 autres requêtes du test SERP. Les Security Events Cloudflare (P0-F, pas d'accès).

**Suite** — Contrôle post-déploiement de #29 et #32 (`smoke.mjs`, `sysnext.vercel.app`, Chrome). Déploiement du Worker de #30 sur GO séparé de Laurent, après resynchronisation. GO P0-I. Validation du mapping produit XL v2 / XL G2 avant tout changement de redirection XL. Q16 à Q18 : absence acceptée par Laurent, aucune entrée reconstituée. Archiver le workflow jetable ; à l'avenir, dupliquer un workflow avant tout usage temporaire.

## 2026-09-24 · D31 — aucun témoignage ni avis client sur `/de-ch` · Claude de Laurent

**Chantier** : D31 (décision de Laurent du 24/09 : aucun témoignage ou avis client sur `/de-ch` ; les avis français ne sont ni traduits ni remplacés) | **PR** : branche `fix/de-ch-masquer-temoignages-2026-09` | **Commits** : `ba7b0fe`, `06f493c`, `9f6ca60` | **Non fusionnée** — fusion sur GO de Laurent

**Quoi** — Sur `/de-ch` uniquement, plus aucun des éléments suivants n'est rendu :
- `TestimonialsSection` (avis Google et leurs JSON-LD `Review`) ;
- la section témoignages de la home et son micro-témoignage ;
- le carrousel de `/ia-photo-produit` ;
- la citation des landings `packshot-*`.

Les clés correspondantes sont retirées de `messages/de-ch.json`. Patch `PSC_PATCH_DECH_TEMOIGNAGES_2026-09-24.patch` (3 commits) appliqué tel quel par `git am`, empreinte SHA-256 `170c377f…b09492c5a` vérifiée.

**Pourquoi** — Relevé sur `sysnext.vercel.app` le 24/09 : `/de-ch` rendait « What our clients say », « Reviews published on Google », 6 avis Google en français et 8 blocs JSON-LD `Review`. `TestimonialsSection` n'acceptait que `'fr' | 'en'`.

**Fichiers** — `components/testimonials/TestimonialsSection.tsx`, `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/page.tsx`, `app/[lang]/studios-photo-automatises/page.tsx`, `app/[lang]/academy/page.tsx`, `app/[lang]/ia-photo-produit/page.tsx`, `messages/de-ch.json`

**Effet attendu** — À la fusion (Vercel, ~3 min) : plus aucun texte FR ou EN de témoignage sur `/de-ch`, plus aucun bloc `Review` en de-ch. `/fr` et `/en` inchangés.

**Vérifié** —
- Tests et build : `npx vitest run` 186/186 ; `npx tsc --noEmit` 0 erreur ; `node scripts/seo/verifier-json.mjs` 183 fichiers valides ; `npx next build` vert (R1), 380 pages, **0 `MISSING_MESSAGE`**.
- *`/fr` et `/en` inchangés* : les 316 pages prérendues sont comparées au build de `main`, après neutralisation de l'identifiant de build et des empreintes des ressources `/_next/static`.
  - DOM (HTML hors charge utile RSC) identique sur **316/316**.
  - Charge utile RSC identique sur 314/316.
  - Écart sur `/fr` et `/en/studios-photo-automatises` : numérotation et ordre des références de composants client (`$L61`/`$L62`), dans un sens opposé entre `/fr` et `/en`. [Inférence] Ordre de sérialisation d'un build à l'autre, sans rapport avec le patch. Cela repose sur des schémas observés.
  - **F5 `/fr/packshot-e-commerce` : identique, DOM et charge utile RSC.**
- *48 pages `/de-ch`*, recherche de 22 fragments (titres, sources, auteurs et JSON-LD des témoignages et avis). Sur `main` : 7 pages concernées, dont 16 blocs `Review`. Après : 0 texte de témoignage, 0 bloc `Review`. Restent deux occurrences :
  - « Kundenstudie PackshotCreator 2025 » : source d'une statistique de la home, pas un témoignage ;
  - le JSON-LD `SoftwareApplication` de `/de-ch/ia-photo-produit`, qui porte `aggregateRating` (4,9, `reviewCount` 100), comme en `/fr` et `/en`. Non traité par le patch.

**Supposé** — Que les données agrégées d'avis de BlendAI (`aggregateRating`) relèvent ou non de D31 : question laissée à Laurent.

**Non regardé** — Le Preview Vercel : jeton de contournement non transmis. Le rendu dans Chrome sur `www` (R4).

**Suite** — Fusion sur GO de Laurent. Contrôle visiteur dans Chrome (traduction automatique désactivée, piège B5) sur `/de-ch`, `/de-ch/studios-photo-automatises`, `/de-ch/ia-photo-produit` et une landing de-ch. Décision de Laurent sur l'`aggregateRating` de `/de-ch/ia-photo-produit`.

**Ajout du 24/09 — `aggregateRating` retiré sur `/de-ch`** — Décision de Laurent : l'`aggregateRating` de BlendAI (4,9, `reviewCount` 100) relève aussi des avis clients (D31). Dans `app/[lang]/ia-photo-produit/page.tsx`, la propriété n'est plus émise dans le JSON-LD `SoftwareApplication` quand `lang === 'de-ch'`. En `/fr` et `/en`, même objet, mêmes clés, même ordre.
- *Vérifié* : `npx vitest run` 186/186 ; `npx tsc --noEmit` 0 erreur ; `npx next build` vert (R1), 380 pages, 0 `MISSING_MESSAGE`.
- *48 pages `/de-ch`*, HTML complet charge utile RSC comprise : 0 bloc `Review`, 0 `aggregateRating`, `AggregateRating`, `reviewCount` ou `ratingValue`, 0 texte de témoignage.
- *`/fr` et `/en`*, comparés au build de `main` : DOM identique sur 316/316. `/fr/packshot-e-commerce`, `/fr/ia-photo-produit` et `/en/ia-photo-produit` sont identiques, charge utile RSC comprise, et l'`aggregateRating` y est toujours émis.

## 2026-09-24 · P0-D/E — héritage `/de` → `/de-ch`, chaînes à un saut, doublon « -22 » · Claude de Laurent

**Chantier** : P0-D/E (Master SEO/GEO V3, hors dépôt) | **PR** : branche `fix/p0-de-ch-heritage-chaines-2026-09` | **Commit** : `c5eaa86` | **Circuit** : (a) | **Non fusionnée**, **Worker non déployé** — deux GO séparés de Laurent (D4, R5)

**Quoi** — `cloudflare-worker/src/index.js` : 17 clés ajoutées à `DE_CH_MAP` ; 2 clés ajoutées à `LEGACY_REDIRECTS` (doublon « -22 », `packshot-mannequin`) ; 1 clé retirée de `GONE_PATHS` (« -22 ») ; préfixes `/industrie/` et `/studio-photo/` : la cible `/fr<chemin>` est d'abord cherchée dans `LEGACY_REDIRECTS`, un saut au lieu de deux. Nouveau test `p0-de-ch-heritage.test.ts` (32 cas). Patch V2 appliqué tel quel par `git am`, empreinte SHA-256 `8d3017ed…894e68b` vérifiée avant application.

**Pourquoi** — Sur `main`, 17 URL `/de/*` tombent sur un hub (`/de-ch`, `/de-ch/blog`, `/de-ch/guide`, `/de-ch/branchen`, `maschinen-finder`) alors qu'un équivalent exact ou un successeur documenté existe en de-ch ; `packshot-mannequin` tombe sur `/fr` ; les chaînes `/industrie/<x>` → `/fr/industrie/<x>` → cible font deux sauts ; `/blog/…-22` répond 410 alors que `/…-22` redirige vers l'article (l. 1519).

**Fichiers** — `cloudflare-worker/src/index.js`, `cloudflare-worker/test/p0-de-ch-heritage.test.ts` (nouveau)

**Effet attendu** — Après déploiement du Worker seulement : 30 chemins changent de premier saut (60 avec la barre finale). Lisible dans la couverture GSC et les pages de destination à J+14.

**Vérifié** —
- `node --check` vert. `npx vitest run` : 11 fichiers, **218/218** ; `lot-f` 44/44, `unicite-tables` 20/20, `legacy-redirects` 31/31, `p0-de-ch-heritage` 32/32.
- *Contrôle négatif* : le nouveau test lancé sur le Worker de `main` donne 23 rouges (13 EXACT_EQUIVALENT, 5 DOCUMENTED_SUCCESSOR, 5 déterministes) et 9 verts (8 REVIEW, `/industrie/lunetterie`).
- *Simulation différentielle `main` → branche* (import des deux modules, origine interceptée) sur 3 691 chemins : toutes les chaînes du fichier commençant par `/`, plus les variantes `/industrie/<x>` et `/studio-photo/<x>` dérivées des clés `/fr/…`, avec et sans barre finale. **30 chemins** changent de premier saut : 17 `/de/*`, `packshot-mannequin`, « -22 », **10** chaînes `/industrie/*`, **1** chaîne `/studio-photo/*`. Chaînes raccourcies : destination finale identique dans les 22 cas (11 avec et sans barre finale), 2 sauts → 1.
- *REVIEW* : les 8 chemins, avec et sans barre finale, gardent premier saut et chaîne complète.
- *Cibles* : `next build` puis `next start` (build de la branche P0-A, pages cibles identiques à `main`) : 28 cibles sur 28 en 200, canonique auto-référente, aucune balise `robots`.
- `git status` avant commit : aucun fichier sous `node_modules`, aucun cache de test.

**Écarts entre la consigne et le patch (R7)** — patch appliqué sans correction, conformément à la consigne.
1. La consigne annonce 23 changements, dont 4 chaînes `/industrie/*`. La règle du patch est générique : elle raccourcit **toute** chaîne `/industrie/<x>` dont `/fr/industrie/<x>` est une clé de `LEGACY_REDIRECTS`. La simulation en relève 10, soit 30 changements au total. [Inférence] L'échantillon de 637 URL du bac à sable n'en contenait que 4. Cela repose sur des schémas observés.
2. Le patch modifie aussi le préfixe `/studio-photo/`, absent de la consigne : 1 chaîne raccourcie, `/studio-photo/360-draaitafels` → `/fr/studio-photo/selecteur-machines`, destination inchangée.
3. La consigne parle de 6 mappings REVIEW ; le patch en teste 8 (7 lignes du tableau, la dernière couvrant 2 URL). Les 8 sont inchangés.

**Supposé** — Que la production porte encore `main` au 23/09 (`29ca657`, version `05c5c47c`) : la resynchronisation reste à faire avant déploiement (D4, R5, `05-INFRA.md`). Que le comportement simulé se reproduit en production (R4, B1).

**Non regardé** — Variante `/amp` : `/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp` passait en 410 via `shouldReturn410` ; elle fera 301 vers `/fr/blog/…-22/amp`, qui répond 404 sur `next start`. Même nature que le constat du lot F sur les clés retirées de `GONE_PATHS`. Les requêtes GSC citées par la consigne (« weinflaschen fotografieren », « brille fotografieren », « packshot mannequin ») : non relevées ici. Backlinks des 30 chemins. `ETAT.md` : non modifié, pour ne pas créer de conflit avec la PR P0-A ouverte le même jour.

**Suite** — Fusion sur GO de Laurent. Puis GO séparé de déploiement du Worker : resynchronisation, `wrangler deploy` depuis `main`, témoins `curl.exe` listés dans la PR, résultat à reporter ici.

**Ajout du 24/09, seconde passe (batch final P0)** — Deux changements sur la même branche, sur consigne de Laurent.
- *Variante `/amp` du « -22 »* : `"/blog/utilisez-votre-studio-photo-pour-faire-de-la-realite-virtuelle-22/amp"` est ajoutée à `GONE_PATHS`, selon la convention des 9 entrées `/amp` déjà présentes. `/amp` et `/amp/` répondent de nouveau 410, comme sur `main`. Le « Non regardé » ci-dessus est levé.
- *D29* : `"/de/fotostudio/alphashot-xl": "/de-ch/fotostudio/alphashot-xl-g2"` est ajoutée à `DE_CH_MAP`. Ce chemin sort de REVIEW, qui compte désormais 7 chemins.
- *Vérifié* : `node --check` vert ; `npx vitest run` 220/220, dont `p0-de-ch-heritage` 34/34 (+2 cas `/amp`, +1 cas D29, −1 cas REVIEW), `lot-f` 44/44, `legacy-redirects` 31/31, `unicite-tables` 20/20. Simulation différentielle sur 5 533 chemins, dont les variantes `/amp` : 4 écarts avec la tête précédente `699872d` (les 2 variantes `/amp`, `/de/fotostudio/alphashot-xl` avec et sans barre finale) ; 31 chemins modifiés par rapport à `main` (62 avec la barre finale), aucune variante `/amp`. Cible `/de-ch/fotostudio/alphashot-xl-g2` sur `sysnext.vercel.app` : 200, canonique auto-référente, aucune balise `robots`. Worker de production : 0 écart de comportement avec `main`.

**Correction du 24/09 — D29 annulée** — Correction de Laurent : l'Alphashot XL ancienne génération (« Alphashot XL v2 ») et l'Alphashot XL G2 coexistent. La redirection `/de/fotostudio/alphashot-xl` → `/de-ch/fotostudio/alphashot-xl-g2` est retirée de `DE_CH_MAP` ; le chemin retrouve son état de `main` (301 vers `/de-ch/fotostudio/maschinen-finder`) et passe en **REVIEW_PRODUCT_MAPPING**.
- *Vérifié* :
  - `node --check` vert ; `npx vitest run` 220/220, dont `p0-de-ch-heritage` 34/34 (le cas D29 devient un cas REVIEW_PRODUCT_MAPPING), `lot-f` 44/44, `legacy-redirects` 31/31, `unicite-tables` 20/20.
  - Simulation différentielle sur 5 533 chemins : 2 écarts avec la tête précédente `c8385ed` (`/de/fotostudio/alphashot-xl` avec et sans barre finale) ; 30 chemins modifiés par rapport à `main` (60 avec la barre finale), aucun `alphashot-xl`, aucune variante `/amp`.
  - `/de-ch/fotostudio/alphashot-xl-v2` existe sur `sysnext.vercel.app` : 200, titre et H1 « Alphashot XL v2 », canonique auto-référente, aucune balise `robots`, absente du sitemap (`delisted: true`).
- *Non modifié* : les 13 entrées du Worker déjà en production qui sont passées de `alphashot-xl-v2` à `alphashot-xl-g2` entre le 17/09 et le 23/09, et les 2 redirections de `next.config.ts` vers `alphashot-xl-v2`. À instruire en REVIEW_PRODUCT_MAPPING.

## 2026-09-24 · P0-A — `WebSite.inLanguage` en `de-CH` sur `/de-ch` · Claude de Laurent

**Chantier** : P0-A (Master SEO/GEO V3, hors dépôt) | **PR** : branche `fix/de-ch-inlanguage-2026-09` | **Commit** : `3b254c3` | **Circuit** : (a) | **Non fusionnée** — fusion sur GO de Laurent

**Quoi** — Le bloc JSON-LD `WebSite` de la home déclare `inLanguage: "de-CH"` sur `/de-ch` au lieu de `en-US`. `/fr` (`fr-FR`) et `/en` (`en-US`) inchangés. Patch V2 appliqué tel quel par `git am`, empreinte SHA-256 `f75dd2bb…bcc197db4` vérifiée avant application.

**Pourquoi** — Sur `main`, `websiteSchema()` ne connaît que `'fr' | 'en'` et calcule `lang === 'fr' ? 'fr-FR' : 'en-US'` (`components/seo/SchemaOrg.tsx` l. 83) : `/de-ch` sort `en-US`, en contradiction avec `<html lang="de-ch">`.

**Fichiers** — `lib/seo/locale-schema.ts` (nouveau), `lib/seo/__tests__/locale-schema.test.ts` (nouveau), `components/seo/SchemaOrg.tsx`, `app/[lang]/page.tsx`

**Effet attendu** — Données structurées de `/de-ch` cohérentes avec la langue servie, dès le déploiement Vercel. [Inférence] Aucun effet de classement mesurable isolément ; lisible au test des résultats enrichis de Google.

**Vérifié** —
- `npx vitest run` : 11 fichiers, **189/189** (186 sur `main`, + 3 cas `locale-schema`).
- `npx tsc --noEmit` : 0 erreur.
- `npx next build` vert (R1), variables factices de la CI, **sans stub de police** : Google Fonts joignable depuis cet environnement, 14 fichiers `woff2` téléchargés. 380 pages générées.
- `next start` (port 3024, arrêté ensuite) : JSON-LD `WebSite` rendu `/fr` → `fr-FR`, `/en` → `en-US`, `/de-ch` → `de-CH`. Un seul bloc `WebSite` par home, `@id` inchangé (`/#website`), 12 blocs JSON-LD par home.
- Textes FR/EN relevés par le bac à sable sur `/de-ch`, recherchés dans le HTML prérendu : présents sur `/de-ch` et `/de-ch/studios-photo-automatises` (« What our clients say », « A selection of reviews published on Google by our clients. », « Reviews published on Google », avis Rogozyk, Altunkaya, Facon) et sur `/de-ch/questions-cles-photographie-produit` (« Answers to all your questions to make the right choice. »). Non touchés.

**Supposé** — [Inférence] Que Google accepte `de-CH` comme valeur `inLanguage` : conforme à la spécification schema.org (code IETF BCP 47), non testé dans l'outil de test des résultats enrichis.

**Non regardé** — `courseSchema` (`inLanguage: 'fr'` en dur, l. 396 de `SchemaOrg.tsx`), hors périmètre. Le relevé heuristique complet des 48 pages `/de-ch` : seules les chaînes listées dans la consigne ont été recherchées. Le Preview Vercel : jeton de contournement non transmis. `ETAT.md` : non modifié, pour ne pas créer de conflit avec la PR P0-D/E ouverte le même jour.

**Suite** — Fusion sur GO de Laurent. Après fusion : `node scripts/seo/smoke.mjs https://sysnext.vercel.app`, lecture du JSON-LD de `/de-ch` sur `sysnext.vercel.app`, puis contrôle dans Chrome sur `www`. Décision éditoriale de Sébastien sur `TestimonialsSection` (`'fr' | 'en'` seulement).

## 2026-09-23 · Chantier marque — mesures M1, M2, M6 · Claude de Laurent
**Quoi** — Relevés GSC (propriété de domaine) et Google Maps du 23/09,
en lecture seule ; modification de la fiche Google France par Laurent.
**Vérifié** — M1 : /fr indexée, canonique Google = canonique déclarée ;
/ non indexée (« Page avec redirection »), canonique /fr. La 301 du
14/07 est consolidée (H1 écartée). M2, France, P1 = 01/04-30/06,
P2 = 01/07-20/09 : « packshot creator » impressions 321 → 191, clics
90 → 43, page servie /en (position 1,2), /fr à 23,6 ; « packshotcreator »
impressions 417 → 104, clics 38 → 19, /fr position 1. Total marque
France : impressions -60 % (738 → 295), clics 128 → 62. M6 : fiche
France « PackshotCreator - Orbitvu », bouton Site Web vers la racine /
(redirigée). Fiche modifiée par Laurent le 23/09 : Site Web → /fr,
téléphone principal → 01 47 42 66 66, en attente de validation Google.
Fiche « Location du packshot creator » (Lausanne) : n'appartient pas à
Sysnext ; décision de Laurent : aucune action.
**Supposé** — [Inférence] La baisse de la marque vient d'abord d'une
baisse de la demande (recherches), que le SEO ne recrée pas ; Google
préfère /en sur la requête en deux mots (H3).
**Non regardé** — M5 (lecture du correctif C1, 14-28/10) ; anomalie
« Erreur de traitement temporaire » sur la ligne Sitemaps des deux URL.
**Suite** — Q15 ; correction du chiffrage du chantier marque dans ETAT ;
Q10 mise à jour.

## 2026-09-23 · Déploiement du Worker — lot F · Claude de Laurent

**Chantier** : C4 (lot F) | **PR** : #26, fusionnée (`29ca657`) | **Commit déployé** : `29ca657` | **Version Cloudflare** : `05c5c47c-4b60-41af-9acd-b3778be1e508`

**Quoi** — `packshot-router` déployé depuis `main` par `wrangler deploy` (wrangler 4.136.3), le 23/09/2026 à 07:41:22 UTC, sur GO de Laurent du 23/09. Le déploiement porte la PR #26 et rien d'autre. Aucune édition au dashboard (D4, R5). Ni pilote C6, ni règle WAF ou de cache.

**Pourquoi** — PR #26 : annexe K, lot C, 10 redirections `alphashot-xl-v2` → `alphashot-xl-g2`, doublon D21. La partie `next.config.ts` de la PR est en production depuis la fusion, par Vercel.

**Fichiers** — `cloudflare-worker/src/index.js` (déployé) ; `docs/seo-geo/JOURNAL.md` (cette entrée)

**Effet attendu** — Immédiat côté Worker : 14 chemins de l'annexe K et 1 du lot C qui finissaient en 404, et 4 en 410, redirigent en 301 vers une page 200 ; 4 bascules `/en` → `/fr` ; plus aucune redirection vers `alphashot-xl-v2`. Lisible dans la couverture GSC à J+14.

**Vérifié** —
- `wrangler whoami` : compte Sysnext, `a51802d1e09d29095ca7ba45d63bf0f2`.
- *Resynchronisation (05-INFRA)* : code de production lu par l'API avant déploiement, identique octet pour octet au relevé du 23/09 matin. Écart production → `main` sur les 11 tables : 38 lignes, **identiques ligne à ligne au diff de la PR #26** (`1ee8cfb` → `29ca657`) : `LEGACY_REDIRECTS` 19 ajouts et 12 cibles, `GONE_PATHS` 4 retraits, `PRODUCT_REDIRECTS` 1 cible, `LANG_SPECIFIC_REDIRECTS` 2 cibles. Hors tables : commentaires retirés par esbuild et une couche `__name22` de wrapper de bundle. Aucune règle n'existait en production sans exister dans `main`.
- Avant déploiement : version `167d7a15-c673-4cd2-a538-bd65f8e80145` à 100 %. `node --check` vert ; `npm run test:unit` : 186 tests verts.
- Après déploiement : `wrangler deployments status` donne `05c5c47c-4b60-41af-9acd-b3778be1e508` à 100 % : **versionId = activeVersionId**. Code relu par l'API : 0 écart avec `main` sur les 1 780 entrées des 11 tables. Routes relues par l'API avant et après, identiques : `www.packshot-creator.com/*`, `packshot-creator.com/*`, `*.packshot-creator.com/*`. Variables relues avant et après, identiques : `NEXTJS_ORIGIN`, `WEBFLOW_ORIGIN` ; `compatibility_date` 2024-01-01, aucun drapeau.

**Supposé** — Que le comportement simulé en test (import du module, 38 chemins) se reproduit en production : le Worker n'est pas testable par script sur `www` (R4, B1).

**Non regardé** — Contrôle `curl.exe` depuis le poste de Laurent, à faire : les 4 chemins par catégorie, le chemin de-ch et les 5 témoins obligatoires listés dans la PR #26, chaîne de requête neuve (B2).

**Suite** — `curl.exe` par Laurent, résultat à reporter ici. Révocation du jeton Cloudflare fourni pour ce seul déploiement. Rollback si besoin : redéploiement de la version `167d7a15`. Pilote C6 au cycle suivant.

## 2026-09-23 · Lot F — annexe K, lot C, `alphashot-xl-v2`, doublon D21, verticale de-ch · Claude de Laurent

**Chantier** : C4 (lot F) | **PR** : branche `fix/worker-lot-f` | **Circuit** : (a) | **Worker non déployé** — le déploiement attend un GO séparé de Laurent (D4)

**Quoi** — `cloudflare-worker/src/index.js` : `LEGACY_REDIRECTS` (19 clés ajoutées, 12 cibles corrigées), `GONE_PATHS` (4 clés retirées) ; puis, sur accord de Laurent du 23/09, 1 cible dans `PRODUCT_REDIRECTS` et 2 dans `LANG_SPECIFIC_REDIRECTS` (`alphashot-xl-v2` → `alphashot-xl-g2`). `next.config.ts` : `/de-ch/industrie/<slug>` → `/de-ch/branchen/<slug allemand>` en 301, repli sur `/de-ch/branchen`. Deux fichiers de test.

**Pourquoi** — Inventaire du 19/09 : annexe K à 1 conforme, 2 à corriger, 14 absentes, 4 en 410 ; lot C à 1 URL sans règle ; 10 entrées du Worker vers `alphashot-xl-v2` (`delisted: true`, hors sitemap et pied de page) ; doublon `GONE_PATHS` / `LEGACY_REDIRECTS` relevé par D21. Sur de-ch, `/de-ch/industrie/mode-textile` répond 307 vers `/de-ch/branchen/mode-textile`, qui répond 404 (relevé sur `sysnext.vercel.app` le 23/09).

**Fichiers** — `cloudflare-worker/src/index.js`, `next.config.ts`, `cloudflare-worker/test/lot-f.test.ts` (nouveau), `cloudflare-worker/test/unicite-tables.test.ts` (nouveau)

**Effet attendu** — Après fusion (Vercel, ~3 min) : les 16 URL `/de-ch/industrie/<slug FR ou allemand>` des 8 secteurs suisses mènent à leur page `branchen` en un saut 301 ; les autres à `/de-ch/branchen`. Après déploiement du Worker (GO séparé) : 14 chemins de l'annexe K qui finissaient en 404 et 4 chemins en 410 redirigent en 301 vers une page 200 ; 2 bascules `/en` → `/fr` sur l'annexe K et 2 sur le lot C ; les 10 redirections du Worker qui visaient la fiche `delisted` pointent vers `alphashot-xl-g2`. Lisible dans la couverture GSC à J+14.

**Vérifié** —
- *Resynchronisation (05-INFRA)* : code de `packshot-router` lu le 23/09 par l'API Cloudflare. Comparé à `main` (`1ee8cfb`) : 11 tables, 1 765 entrées de chaque côté, **0 clé ajoutée, 0 retirée, 0 valeur différente**. Diff textuel restant : commentaires retirés par esbuild et une couche `__name22` de wrapper de bundle — même nature que le constat du 20/09. Aucune règle n'existe en production sans exister dans `main`.
- *Ordre d'évaluation, `/commun/presse-details.html/3`* : ce chemin n'était pas dans `GONE_PATHS` ; son 410 venait du préfixe `/commun/` de `shouldReturn410`. `LEGACY_REDIRECTS` est consultée (l. 1595) **avant** `shouldReturn410` (l. 1967) : la clé suffit, aucune exception à la règle de préfixe n'est nécessaire. Test : `/commun/presse-details.html/3` → 301, `/commun/presse-details.html/4` → 410.
- *Simulation du Worker* (import du module, origine interceptée) sur 38 chemins, avant et après : 0 écart à l'attendu ; `/`, `/de/studio-photo/alphashot-xl`, `/industrie-defense` inchangés. Comparaison des tables avant/après : seules `LEGACY_REDIRECTS`, `GONE_PATHS` et, après l'accord du 23/09, `PRODUCT_REDIRECTS` (1 valeur) et `LANG_SPECIFIC_REDIRECTS` (2 valeurs) bougent. Plus aucune occurrence de `alphashot-xl-v2` dans le Worker.
- *Cibles* : `next build` puis `next start` (port 3021, arrêté par PID) — **30 cibles sur 30 en 200**, canonique auto-référente, aucune balise `robots`. Aucune cible absente.
- *de-ch sur le serveur local* : 8 slugs FR et 8 slugs allemands → 301 vers `/de-ch/branchen/<slug allemand>` ; `chaussures`, `defense-securite`, slug inexistant → 301 `/de-ch/branchen`. Inchangés : `/de-ch/industrie` (307 next-intl vers `/de-ch/branchen`), `/fr/industrie/mode-textile` et `/en/industrie/mode-textile` (200).
- *Unicité* : 0 doublon intra-table sur les 11 tables ; 0 clé partagée entre deux tables de redirection ; doublons `GONE_PATHS` × redirection : 60 avant, 59 après, aucun nouveau. Contrôles négatifs : les nouveaux tests échouent sur le fichier de `main`, et sur une clé injectée à la fois dans `LEGACY_REDIRECTS` et `PRODUCT_REDIRECTS` ou `GONE_PATHS`.
- `node --check` vert. `npx tsc --noEmit` vert. `npm run test:unit` : 10 fichiers, **186 tests** verts (122 avant). `npx next build` vert (R1), relancé après l'accord du 23/09. `/en/studio-photo/alphashot-xl-g2` : 200 sur `next start`, canonique auto-référente, sans balise `robots`.

**Écarts entre la consigne et le dépôt (R7)** —
1. « Les 10 entrées dont la cible est `alphashot-xl-v2` » : 7 sont dans `LEGACY_REDIRECTS` et ont été corrigées. Les 3 autres étaient dans des tables que la consigne interdisait de toucher : `PRODUCT_REDIRECTS` (`/product/photo-studio-r3`) et `LANG_SPECIFIC_REDIRECTS` (`/es/studio-photo/alphashot-xl`, `/nl/studio-photo/alphashot-xl`). Signalées, puis **corrigées sur accord de Laurent du 23/09**, cible `/en/studio-photo/alphashot-xl-g2`.
2. « Doublon `GONE_PATHS` / `LEGACY_REDIRECTS` » : la consigne et D21 en visent un (`/en/blog/orbitvu-vs-ortery-vs-styleshoots-2026`), retiré. Le dépôt en compte **24**, et 36 autres entre `GONE_PATHS` et `PRODUCT_REDIRECTS`, `HOWTO_REDIRECTS` ou `LANG_SPECIFIC_REDIRECTS`. Les 59 restants sont recensés dans `unicite-tables.test.ts`, non retirés : côté chemin exact, l'entrée `GONE_PATHS` est morte, mais elle fait encore répondre 410 aux variantes `/amp` via `shouldReturn410`.
3. `/packshot-creator-new-photo-software-2018/` (avec barre finale) est une clé distincte qui ciblait aussi `/en` : corrigée avec la forme sans barre, sinon la bascule n'était que partielle.
4. `/de-ch/industrie/<slug allemand>` (ex. `schmuck`) : lu comme couvert par « selon `DE_CH_SECTOR_MAP` », dont les clés sont les slugs allemands. Il mène à sa propre page, comme le 307 actuel. L'appliquer au repli aurait dégradé ces 8 URL vers le hub.

**Supposé** — Que le code lu par l'API est celui de la version active (`167d7a15`) : l'identifiant de version n'a pas pu être relu, le jeton de cette session n'a pas le droit de lecture des déploiements Workers. Que le contrôle PS1/PS2 du 20/09 est conforme : déclaré par Laurent, non consigné dans le dépôt. Que les règles `redirects()` de `next.config.ts` passent avant le middleware next-intl sur Vercel comme en local.

**Non regardé** — Les backlinks des 21 sources de l'annexe K. Les variantes `/amp` des 4 clés retirées de `GONE_PATHS` : elles passent de 410 à l'origine (404). `next.config.ts` renvoie encore `/en/photo-studio/alphashot-xl` et `/en/studio-photo/alphashot-xl` vers `alphashot-xl-v2` : hors des 10 entrées du Worker, non touché. Le commentaire du bloc `images` de `next.config.ts` que `05-INFRA` prévoit de corriger « dans la prochaine PR qui touche ce fichier » : laissé, la consigne excluant les règles de cache. `/de-ch/industrie/<slug>/` avec barre finale : 308 puis 301, deux sauts, comportement Next.js commun à tout le site. Le Preview Vercel : le Worker n'y passe pas (E5), et le jeton de contournement n'est toujours pas transmis.

**Suite** — GO de Laurent pour le déploiement du Worker, puis `curl.exe` sur les témoins listés dans la PR. Pilote C6 au cycle suivant.

## 2026-09-20 · Accents du français restaurés — `fr.json`, `machines.ts`, meta `alphashot-360` · Claude de Laurent

**Chantier** : accents et champs marchands (C14) | **PR** : #23 | **Aucun déploiement**

**Quoi** — 425 chaînes réaccentuées, sans une reformulation : 265 dans les sept sections désaccentuées de `messages/fr.json` (cookies, blogPrestataire, blogComparatif, besoinsPhoto, questionsCles, packshotIndustriel, packshotAmazon), 159 valeurs `fr` de `machines.ts` (questions et réponses des `faqItems`, chaînes FR visibles), et la meta description FR d'`alphashot-360`. Aucune clé, aucun ordre, aucun prix, aucun slug, aucun `delisted` touché.

**Pourquoi** — `PSC_PLAN_SOLUTIONS_2026-09-19.md` §1.8. Sept sections de `fr.json` étaient à 0 – 4 ‰ d'accents quand les sections saines sont à 16 – 48 ‰ ; les titres et descriptions concernés partent tels quels en SERP et dans les données structurées des fiches.

**Fichiers** — `messages/fr.json`, `components/calculators/ROICalculator/lib/machines.ts`, `app/[lang]/studio-photo/[slug]/page.tsx`

**Effet attendu** — Titres et descriptions correctement accentués en SERP à J+14 ; FAQ et JSON-LD `FAQPage` des fiches machines corrigés, lisible sur les « Fiches marchand » à J+21.

**Vérifié** — Garde mécanique sur les trois fichiers : une fois les accents retirés (NFD, plus œ/Œ), le contenu est identique au caractère près à celui de `HEAD`. Aucune reformulation n'est donc possible. Ensemble des clés de `fr.json` : 1848 avant, 1848 après, identique. Taux d'accents des sept sections : cookies 0,0 → 15,5 ‰ ; blogPrestataire 0,0 → 21,3 ; blogComparatif 0,1 → 25,4 ; besoinsPhoto 0,9 → 20,5 ; questionsCles 2,0 → 20,1 ; packshotIndustriel 3,6 → 33,0 ; packshotAmazon 4,1 → 16,9. Les 22 sections hors périmètre sont inchangées. Homographes tranchés en contexte : les 64 « a » de `machines.ts` sont tous la préposition, un seul « des » était « dès », les 37 « ou » sont tous la conjonction ; `utilise`, `assure`, `capture`, `forme`, `publie`, `verrouille`, `dispense` restés sans accent comme formes verbales. `npx tsc --noEmit`, `npm run test:unit` (122 tests) et `npx next build` verts.

**Supposé** — Que les sept sections listées au §1.8 sont bien les seules à traiter dans `fr.json`, et que le seuil de 15 ‰ est le bon critère de sortie.

**Non regardé** — `de-ch.json` et `en.json`, hors périmètre. Les sections `blog` (8,3 ‰) et `blogArticle` (12,1 ‰), également sous le seuil mais non listées au §1.8. Le contrôle du Preview Vercel, à faire par Laurent dans Chrome.

**Suite** — CC3, données structurées (`priceValidUntil` glissant, `sku`).

## 2026-09-20 · Données structurées des fiches — `priceValidUntil` glissant et `sku` · Claude de Laurent

**Chantier** : données structurées des fiches | **PR** : #22, fusionnée le 20/09 à 07:20 UTC (`f529bd5`) | **Circuit** : (a) — aucun texte visible, aucun prix, aucune devise, aucune mensualité

**Quoi** — (1) `PRICE_VALID_UNTIL` n'est plus la constante `'2026-12-31'` : elle vaut le 31 décembre de l'année suivant celle du build, calculée au chargement du module. (2) Le `productSchema` porte désormais `sku`, alimenté par l'`id` de la machine dans `machines.ts`. Pas de `mpn` ni de `gtin`.

**Pourquoi** — Google signale 10 fiches marchand non valides (relevé du 19/09, Q13). `sku` est l'un des quatre champs manquants et ne dépend d'aucun fait commercial. La date de validité, elle, serait tombée le 31/12/2026 sans que rien ne le signale : 51 blocs `Product` seraient passés en avertissement le 1er janvier.

**Fichiers** — `lib/leasing.ts`, `components/seo/SchemaOrg.tsx`, `app/[lang]/studio-photo/[slug]/page.tsx`

**Constat incident, sans rapport avec ce changement** — En production, `/de-ch/studio-photo/<slug>` répond **307** vers `/de-ch/fotostudio/<slug>` : le segment de chemin est localisé sur la verticale suisse. Comportement préexistant, hors du champ de ce chantier, mais à connaître avant tout contrôle par script sur de-ch — testé sur la mauvaise URL, il conclut à tort à un écart.

**Effet attendu** — Deux des quatre champs manquants comblés sur les 51 blocs `Product` des fiches (3 locales × 17 machines). Lisible dans Search Console, rapport « Fiches marchand », à J+7 à J+14 après le merge. Les deux champs restants (`hasMerchantReturnPolicy`, `shippingDetails`) restent suspendus à la réponse de Sébastien sur Q13.

**Vérifié** — *Avant le merge* : `npx tsc --noEmit` vert. `npx next build` vert (R1). Sur le HTML prérendu du build : 51 blocs `Product`, **0 sans `sku`**, et une seule valeur de `priceValidUntil` sur l'ensemble — `2027-12-31`. `npm run test:unit` : 122 tests passés. `node scripts/seo/verifier-json.mjs` : 183 fichiers valides. Absence de champ de référence constructeur confirmée dans l'interface `Machine` de `components/calculators/ROICalculator/lib/types.ts` : `mpn` ne pouvait donc pas être renseigné sans l'inventer. AVANT/APRÈS du bloc `Offer` relevé sur deux builds réels (`bc81d9a` contre `6bbf5d3`) : `price` 445 → 445, `priceCurrency` EUR → EUR, `priceSpecification` inchangé, seul `priceValidUntil` bouge.

*Après le merge, contrôle post-déploiement du 20/09 à 07:22-07:32 UTC sur `https://sysnext.vercel.app`* : `node scripts/seo/smoke.mjs` **tout vert — 17 pages, 3 ressources**. Relevé exhaustif des **51 fiches en production** (17 machines × 3 locales) : **51/51 portent `sku` égal au slug et `priceValidUntil` = `2027-12-31`**, mensualités et devises inchangées (`CHF` sur de-ch, `EUR` ailleurs). Deux URL ont d'abord échoué sur un `curl: (28) Connection timed out` : re-testées une à une, conformes toutes les deux — c'étaient des délais réseau, pas des écarts.

**Supposé** — Que les fiches sont redéployées au moins une fois tous les douze mois. Les pages sont prérendues (SSG) : la date est figée au build. Un site non déployé pendant plus d'un an verrait la date expirer de nouveau — le risque passe de « certain au 31/12/2026 » à « conditionné à une année sans déploiement ».

**Non regardé** — `productWithRatingSchema`, qui n'alimente aucune fiche machine et n'a pas été touché. Les champs `gtin*` : hors sujet sans code fabricant. L'effet des `sku` sur le flux Merchant Center, qui n'est pas alimenté depuis ce dépôt. Le contrôle dans Chrome sur `www.packshot-creator.com`, Worker et WAF compris, reste à faire par Laurent (R4) : un script n'atteint pas le domaine de production. Le test des résultats enrichis de Google sur 3 fiches n'a pas pu être lancé — outil interactif, et le Preview répondait 302 vers le SSO Vercel faute du jeton de contournement, non transmis à ce jour.

**Suite** — Q13 pour les deux champs restants (`hasMerchantReturnPolicy`, `shippingDetails`). CC2 (accents) touche le même fichier `app/[lang]/studio-photo/[slug]/page.tsx` : rebaser CC2 sur `main` après ce merge. Relever le rapport « Fiches marchand » de Search Console à J+7 et J+14.


## 2026-09-20 · Déploiement du Worker — #16 seul, canonique des 3 landings · Claude de Laurent

**Chantier** : déploiement du Worker portant uniquement #16 | **Commit déployé** : `287caee` | **Version Cloudflare** : `167d7a15-c673-4cd2-a538-bd65f8e80145`

**Quoi** — `packshot-router` déployé depuis `main` par `wrangler deploy`, le 20/09/2026 à 06:40:14 UTC. Le déploiement porte **#16 et rien d'autre** : 3 landings `packshot-*` rendues à leur page d'offre, `alphashot-xl` pointant vers la fiche G2 sur les trois entrées (`/fr/studio-photo/`, `/studio-photo/`, `DE_CH_MAP`), 5 clés `/industrie/` ajoutées, 2 clés dupliquées retirées. Aucune édition au dashboard (D4, R5). Ni lot F, ni pilote C6, ni règle WAF ou de cache.

**Pourquoi** — `PSC_PLAN_SOLUTIONS_2026-09-19.md` §2.1, S2. La PR de notification préalable à Sébastien (#21) est fusionnée depuis 06:11 UTC ; GO explicite de Laurent reçu le 20/09.

**Fichiers** — `cloudflare-worker/src/index.js`

**Effet attendu** — Canonique des 3 landings restaurée, lisible à J+14 (GSC, inspection d'URL).

**Vérifié** — Procédure de resynchronisation de `05-INFRA` exécutée avant déploiement : le diff production ↔ `main` donne 11 lignes `+` et 8 lignes `−`, soit **exactement** le jeu de `git diff a117848^1 a117848` (#16), ligne pour ligne. Aucune règle n'existait en production sans exister dans `main` ; le reste du diff était des commentaires retirés par esbuild et une couche de wrapper de bundle. `node --check` vert sur les deux fichiers. Unicité des clés sur les 6 tables : `main` 1058 entrées, 0 doublon, contre 1055 et 2 doublons en production. `npm run test:unit` : 122 tests passés. Après déploiement, `wrangler deployments status` donne la version `167d7a15-c673-4cd2-a538-bd65f8e80145` à 100 % : **versionId = activeVersionId**. Le `modified_on` du service, lu par un second accès indépendant, est passé de `2026-07-24T05:20:47Z` à `2026-09-20T06:40:15Z`.

**Supposé** — Aucun autre écart entre la production d'avant déploiement et `main` que ceux de #16.

**Non regardé** — Contrôle post-déploiement sur URL témoins, à faire par Laurent via `curl.exe` depuis son poste (R4, D23) : le Preview Vercel ne passe pas par le Worker (piège E5) et la chaîne de requête doit être neuve (piège B2). Inclure la racine, un sous-domaine proxifié et une bascule `/de/*`.

**Suite** — PS2, puis lot F.

## 2026-09-19 · Plan de solutions — quick wins, chantiers de fond, D27-D28 · Claude de Laurent

**Chantier** : pilotage | **PR** : docs/plan-solutions-2026-09-19 | **Aucun déploiement**

**Quoi** — Dépôt du plan de solutions issu de l'audit : 20 quick wins en trois groupes, 4 chantiers de fond, décisions D27 (critère de similarité de D16 mesuré sur le brief) et D28 (C6 reclassé en hygiène, chantier « choix de page sur la marque » ouvert), question Q13 (champs marchands), élément nouveau sur Q10, deux pièges. **Notification préalable à Sébastien** : un déploiement du Worker portant uniquement #16 est prévu cette semaine ; un second cycle (lot F, puis pilote C6 de 25 URL) suivra séparément, après contrôle du premier.

**Pourquoi** — L'audit est clos (bilan v5). Le chiffrage montre que les quick wins rapportent 5 à 50 clics FR+CH par mois contre un écart de 60 à 160 pour atteindre D24 ; côté français, la marque est passée de 50-118 clics par mois (février-juin) à 16 en juillet et 5 en août.

**Fichiers** — `docs/seo-geo/{JOURNAL,ETAT,BOITE-AUX-LETTRES,DECISIONS,03-PIEGES,06-CHANTIERS}.md`

**Effet attendu** — Aucun sur le site. Sébastien est informé des déploiements avant qu'ils aient lieu.

**Vérifié** — Supabase (SELECT) ; code de production du Worker lu le 19/09 : les mappings `/fr/blog/orbitvu-vs-ortery-vs-styleshoots-2026` et `/fr/blog/optimize-team-collaboration-success-story-shotflow` → FR sont en production ; #16 ne l'est pas (`/fr/studio-photo/alphashot-xl` cible encore `alphashot-xl-v2`). Mesure d'embedding des 53 idées (0,466 à 0,720 ; workflow jetable archivé). Consolidation du cluster comparatif débloquée : 0 backlink sur 8 URL, témoin à 20 backlinks, mesure du 19/09 16h28 UTC postérieure à la ligne d'ETAT qui la disait bloquée.

**Supposé** — Clics de marque en tous pays ; la part française est à relever dans l'interface (mesure M2).

**Non regardé** — Addendum Suisse A1-A6 ; causes de l'absence de `/en` en mai 2026 sur la marque.

**Suite** — CC2 (accents `fr.json` + `machines.ts`), CC3 (données structurées), déploiement du Worker #16 (GO Laurent), mesures M1-M5 du chantier marque.

## 2026-09-19 · Chantier — substitution de page sur les requêtes commerciales · Claude de Laurent

**Chantier** : substitution de page (nouveau) | **Aucun déploiement**

**Quoi** — Ouverture d'un chantier de fond : sur 71 requêtes commerciales à plus de 100 impressions, 51 sont servies par un article (65 064 impressions) et 7 par une page d'offre (1 886). Page témoin : `/fr/packshot-e-commerce`, portée de 711 à environ 2 200 mots.

**Pourquoi** — Les landings font 640 à 734 mots ; les articles qui les devancent, 2 903 à 3 460. Le Link Score de 84 des landings est identique sur les six : il vient du pied de page. Sur « packshot e-commerce », l'article EN tient la position 2,0 à 2,8 : 1 351 impressions, 0 clic en 120 jours.

**Fichiers** — aucun à ce stade (brief CC5).

**Effet attendu** — [Inférence] 10 à 35 clics FR+CH par mois si la substitution réussit, lisible à 8-12 semaines. Critère de succès unique : la landing devance l'article EN en position pondérée sur les trois variantes à J+56 ; sinon arrêt. Cela repose sur des schémas observés.

**Vérifié** — `sf_pages` (mots, Link Score, liens entrants) et `gsc_metrics` (page servie par requête), le 19/09.

**Supposé** — Part FR+CH de 40 % sur ces requêtes (mesurée sur l'ensemble du site, pas sur elles).

**Non regardé** — Présence d'AI Overview au-delà de la liste du 17/09.

**Suite** — CC5 ; question Q14 sur l'article EN.

## 2026-09-19 · Chantier marque — mesures M3 et M4 ; valeur de départ substitution de page ; inventaire du lot F · Claude de Laurent

**Chantier** : marque (D28), substitution de page, lot F | **Aucun déploiement**

**Quoi** — (1) SERP de marque France et Suisse (DataForSEO, 7 tâches, 0,0215 $, workflow jetable archivé). (2) Chronologie de la racine dans l'historique du Worker. (3) Valeur de départ de la page témoin. (4) Inventaire de l'annexe K, du lot C et des verticales de-ch contre `main`.

**Pourquoi** — Instruire le chantier marque avant toute action (D28) ; figer la mesure de la page témoin ; préparer le lot F.

**Fichiers** — aucun.

**Effet attendu** — Aucun sur le site.

**Vérifié** — Du 01/05 au 14/07, `/` faisait une 302 selon `Accept-Language` (Googlebot → `/en`) ; 301 vers `/fr` depuis `b778a88` (14/07). « packshotcreator » : `/fr` n°1 en France. « packshot creator » : `/en` n°1 en France et en Suisse. La fiche d'établissement du pack local suisse pointe vers la racine. Landing `packshot-e-commerce` absente des trois variantes sur 28 jours ; article EN en 3,2. Annexe K : 1 conforme, 2 à corriger, 14 absentes, 4 en 410. Lot C : 1 URL sans règle, pas 3.

**Supposé** — Consolidation de la 301 en cours (tendance de `/fr` : 28,9 → 19,8 → 12,8).

**Non regardé** — M1, M2, M5, M6 ; requête « packshot creator avis » France (tâche en erreur).

**Suite** — CH1 (M1, M2), M6, lecture de C1 (14/10-28/10), CC6, CC7.

## 2026-09-19 · Nettoyage du suivi — 5 PR fusionnées, D21 à D26, 10 lignes fermées, 11 branches supprimées · Claude de Laurent

**Chantier** : transverse | **PR** : #20

**Quoi** — Fusion des cinq PR restées en brouillon depuis le 17/09. Dépôt des décisions D21 à D26 et des questions Q6, Q10 et Q12, qui étaient citées par le suivi sans exister. Réécriture d'`ETAT.md`, requalification de `06-CHANTIERS.md` (C1, C2, C3, C12, C13 clos ; C4 renommé en lot F ; C5 gelé sous D17 ; C8 fusionné avec le chantier accents ; C14 et C15 créés). Suppression de 11 branches distantes.

**Pourquoi** — Cinq PR terminées, vertes et fusionnables dormaient en brouillon, et `main` annonçait « aucun chantier ouvert ». Dix lignes de suivi étaient périmées, faites, ou sans objet depuis les arbitrages du 19/09. Six renvois pointaient vers des décisions et des questions inexistantes.

**Fichiers** — `docs/seo-geo/{DECISIONS,BOITE-AUX-LETTRES,ETAT,06-CHANTIERS,JOURNAL}.md`

**Effet attendu** — Aucun sur le site. L'état du dépôt redevient lisible par les deux Claude. Priorité 1 rendue visible : la liste du lot pilote C6, ouverte depuis le 04/09.

**Vérifié** — Relevé GitHub du 19/09 14:02 UTC : 5 PR ouvertes, toutes `MERGEABLE` / `clean`, 0 commit de retard sur `main`, CI verte (15 workflows, 5 déploiements Vercel), **toutes en brouillon**. Aucune issue dans le dépôt. 21 branches distantes : 7 de PR fusionnée non supprimées (0 d'avance), 1 de PR abandonnée, 3 sans PR entièrement dans `main`, 5 sans PR portant des commits absents de `main` (399, 372, 51, 5, 2 — toutes de Sébastien). Les 11 branches supprimées étaient toutes à 0 commit d'avance sur `main` : rien n'est perdu ; `claude/claude-mastery-skills-gqkl1j` pointait sur `fd112ce`, la base de la PR #1, le commit des skills n'y étant déjà plus. Réglage « Automatically delete head branches » **désactivé** : constaté directement, les branches des PR #15 à #19 sont restées en place après fusion. `alphashot-xl-v2` porte `delisted: true` dans `machines.ts:347`, le type documentant ce drapeau par « exclue de tout affichage/recommandation ; la page produit reste servie » — page servie en 200 mais exclue du sitemap et du pied de page, d'où la correction de `DE_CH_MAP` vers `alphashot-xl-g2` (`38345f3`), 122 tests verts. 10 autres entrées du Worker ciblent encore `alphashot-xl-v2` (6 vers `/en`, 4 vers `/fr`) : hors périmètre de #16, reportées au lot F. **Table des routes de `next build` du 19/09** : `blog/[slug]`, `industrie/[slug]` et `studio-photo/[slug]` en `●` SSG — #15 a produit son effet ; seul `academy/[slug]` reste en `ƒ`, faute de `generateStaticParams` sur sa feuille. L'hypothèse `setRequestLocale` est écartée : absent des cinq gabarits, y compris des quatre prérendus et du témoin `guide/[slug]`. Smoke test sur `sysnext.vercel.app` après #19 et #15 : 17 pages, 322 URL au sitemap, tout vert.

**Supposé** — Que les 5 branches sans PR de Sébastien relèvent d'une divergence d'historique plutôt que de travaux en attente : leurs diffs n'ont pas été lus.

**Non regardé** — Diffs des 5 branches de Sébastien. Labels des PR (champ non exposé par la voie utilisée). Le `x-vercel-cache` des trois gabarits après déploiement complet : le relevé de 14:24 montrait encore `MISS`, trois minutes après la fusion, ce qui n'est pas un signal exploitable — le cache est purgé à chaque déploiement, et c'est la table des routes qui tranche.

**Suite** — Lot accents et champs marchands (C14), liste du lot pilote C6, lot F (C4). Déploiement du Worker en porte séparée (D4). Réponse attendue : Q10.

---

## 2026-09-17 · Redirections legacy — landings `packshot-*` et anciens slugs FR · Claude de Laurent

**Chantier** : C6 | **PR** : #16 | **Aucun déploiement** — porte séparée (D4)

**Quoi** — `cloudflare-worker/src/index.js` : table `LEGACY_REDIRECTS` — 5 valeurs corrigées, 5 clés ajoutées, 2 doublons de clés préexistants retirés sans changement de comportement ; table `DE_CH_MAP` — 1 valeur corrigée (ajout du 19/09). Test unitaire sur les deux tables. `GONE_PATHS`, les routes et `robots.txt` ne sont pas touchés. **Le Worker n'est pas déployé** : le déploiement attend le GO de Laurent.

**Pourquoi** — Constat du 17/09 : trois landings commerciales sont vues par Google comme des doublons de leur URL racine legacy, parce que la racine redirigeait vers un article ou un guide au lieu de la page commerciale.

**Fichiers** — `cloudflare-worker/src/index.js`, `cloudflare-worker/test/legacy-redirects.test.ts` (nouveau), `vitest.config.ts`

**Ajout du 19/09 — `DE_CH_MAP`** — `/de/studio-photo/alphashot-xl` ciblait `/de-ch/fotostudio/alphashot-xl-v2`. Vérifié contre le code : `alphashot-xl-v2` porte `delisted: true` dans `components/calculators/ROICalculator/lib/machines.ts` (l. 347). Le commentaire du type dit « exclue de tout affichage/recommandation ; la page produit reste servie » — la cible répond donc 200, mais elle est absente d'`app/sitemap.ts` et du pied de page (`components/layout/Footer.tsx`, qui liste `alphashot-xl-g2`). La cible devient `/de-ch/fotostudio/alphashot-xl-g2`, même motif que la correction `/fr/studio-photo/alphashot-xl` de ce lot. `DE_CH_MAP` est consultée avant `LEGACY_REDIRECTS` pour tout chemin commençant par `/de`.

**Effet attendu** — Après déploiement du Worker : les trois URL racine `packshot-*` cessent d'être des doublons canoniques des landings ; les anciens slugs FR sortent des statistiques d'exploration en 200. Lisible dans la couverture GSC à J+14.

**Vérifié** — `npm run test:unit` : 8 fichiers, 120 tests verts, dont 29 nouveaux sur la table. Contrôle négatif : un doublon injecté fait bien échouer le test (« ligne 1266 puis ligne 1267 — la première est silencieusement écrasée »), fichier restauré ensuite. `npx next build` vert. Cibles contrôlées contre le code : les 6 slugs secteurs cibles sont dans `data/secteurs.ts`, les 5 ids machines cibles dans `components/calculators/ROICalculator/lib/machines.ts`, les 3 landings ont leur route dans `app/[lang]/`.

**Écart entre la consigne et le dépôt (R7)** — 17 des 22 entrées demandées à l'ajout **existaient déjà** dans le dépôt, avec la cible demandée. Seules 5 manquaient, toutes des variantes sans préfixe : `/industrie/{beautes, meubles, sports, high-tech-electromenager-informatique, simplifiez-production-de-vos-visuels-optique-lunetterie}`. Le symptôme observé en production (200 + `noindex`) n'est donc pas explicable par le dépôt : [Inférence] il pointe vers une divergence entre le Worker déployé et le dépôt, que R5 annonce comme possible. À resynchroniser avant déploiement.

Une entrée demandée **contredisait** le dépôt : `/fr/studio-photo/alphashot-xl` et `/studio-photo/alphashot-xl` ciblaient `alphashot-xl-v2`, la consigne demande `alphashot-xl-g2`. Les deux machines existent dans `machines.ts` et répondent 200 ; `alphashot-xl-v2` est absent de `app/sitemap.ts`, `alphashot-xl-g2` y figure. La consigne a été appliquée.

**Supposé** — Que les cibles répondent 200 en production, sur la foi du crawl du 17/09 ; le Worker n'est pas testable en Preview (piège E5). Que retirer la première occurrence d'une clé dupliquée ne change rien : en JavaScript c'est la dernière qui gagne, et c'est elle qui est conservée.

**Non regardé** — L'état réel de la table dans le Worker déployé (resync à faire). Les 10 autres entrées du Worker qui ciblent encore `alphashot-xl-v2` après ce lot (6 vers `/en`, 4 vers `/fr`) : même motif, hors périmètre de ce lot. `/fr/industrie/objets-art-antiquite` et `/fr/studio-photo/orbitvu-kit-mini-midi` : laissés tels quels faute d'équivalent établi. Les variantes `/en` et `/de-ch` de ces slugs. Les backlinks pointant vers les anciennes cibles.

**Suite** — Resynchroniser le Worker déployé avec le dépôt, puis déployer après GO de Laurent. Contrôle post-déploiement : crawl en mode liste des 14 URL, attendu 301 vers la cible, avec query string neuve.
## 2026-09-17 · Maillage contextuel des hubs et money pages vers le blog et les guides · Claude de Laurent

**Chantier** : maillage interne | **PR** : #18 | **Circuit** : (a) — les ancres reprennent les titres existants des contenus, lus dans leur JSON ; aucune prose nouvelle

**Quoi** — Extension du dispositif de maillage existant : `SECTOR_RESOURCES_MAP` passe de 8 à **17 hubs** secteurs, et une table `MONEY_PAGE_RESOURCES_MAP` couvre **6 money pages** (les 4 landings `packshot-*`, `/studios-photo-automatises`, `/ia-photo-produit`). Le rendu est extrait dans un composant partagé `ResourcesSection`. Aucune prose, aucune page, aucune URL créée.

**Pourquoi** — Crawl du 17/09 : Link Score du blog = 1 sur 74 pages et des guides = 1 sur 22 pages, contre 84 à 89 pour les hubs, fiches machines et money pages ; 5,8 et 6,9 liens entrants uniques en moyenne contre 165 à 188. Le blog et les guides produisent l'essentiel des clics FR et ne reçoivent presque aucun lien interne.

**Fichiers** — `data/content-maillage.ts`, `components/maillage/MaillageSections.tsx`, `components/templates/PackshotLandingTemplate.tsx`, `app/[lang]/studios-photo-automatises/page.tsx`, `app/[lang]/ia-photo-produit/page.tsx`, `app/[lang]/industrie/[slug]/page.tsx`

**Effet attendu** — **78 liens internes FR** ajoutés vers 43 contenus, dont 41 qui n'en recevaient aucun depuis un hub ou une money page. Link Score du blog et des guides attendu en hausse au prochain crawl ; effet sur les positions à 2 à 6 semaines.

**Vérifié** — `npx tsc --noEmit` vert. `npx next build` vert. `npx eslint` sur les fichiers modifiés : 0 problème (la référence sur `main` en compte 318, inchangée). Table validée **avant écriture** par un script de contrôle : existence du contenu dans chaque locale, absence des clés de `LEGACY_REDIRECTS` et de `GONE_PATHS`, absence de `NOINDEX_EN_BLOG_SLUGS`, absence des 11 URL du lot `/en/blog` en 404. Comptage des liens réellement rendus sur les 23 pages × 3 locales : **FR 78 · EN 73 · de-ch 4**, conforme à la table. Contrôle final des cibles : **86 URL distinctes, toutes en 200 et indexables**. `node scripts/seo/smoke.mjs` : 17 pages, 3 ressources, tout vert.

**Deux correctifs apportés en cours de route** : les tables sont indexées par slug FR, or (1) les slugs EN et de-ch des contenus sont différents — la résolution passe désormais par `alternates.json`, la même source que le sélecteur de langue, au lieu de supposer un slug identique ; (2) le hub `/de-ch/branchen/<slug-allemand>` passait son slug allemand au composant, qui ne trouvait donc jamais d'entrée. Sans ces deux correctifs, le bloc était vide hors FR.

**Supposé** — Que les 6 « money pages » du relevé de crawl sont bien les 4 landings `packshot-*`, `/studios-photo-automatises` et `/ia-photo-produit` : le relevé les compte sans les nommer. L'association secteur → contenus est un choix éditorial de pertinence thématique, pas une mesure.

**Non regardé** — Les fiches machines (Link Score 84, déjà irriguées). Les hubs `/en/industrie/*`, tous `noindex` : le bloc s'y affiche et pointe vers des cibles indexables, mais l'apport d'autorité y est nul. La couverture de-ch reste très mince (4 liens au total) faute de contenus traduits. L'effet sur le temps de rendu des 23 pages.

**Suite** — Recrawl Screaming Frog à J+7 pour mesurer le Link Score du blog et des guides. Étendre la couverture de-ch quand des traductions arriveront.
## 2026-09-17 · URL `/en/blog/` en 404 dans GSC — cartographie du mécanisme d'exposition · Claude de Laurent

**Chantier** : couverture / budget d'exploration | **PR** : #17

**Quoi** — Recherche de la source d'exposition des 11 URL `/en/blog/…` listées « Introuvable (404) » par GSC au 17/09, plus `/fr/solutions`, `/en/solutions/niveau-1-fondation-presentiel` et `/de-ch/industrie/mode-textile`. **Aucune des 14 n'est exposée par le code actuel.** Une seule correction appliquée, hors de ce lot de 14 : un lien de la page d'accueil vers un slug machine inexistant.

**Pourquoi** — Consigne du lot : corriger la source de l'exposition, pas le symptôme. Il fallait d'abord établir s'il y avait une source dans le code.

**Fichiers** — `app/[lang]/page.tsx` (ligne 500)

**Effet attendu** — Un lien de moins, depuis les trois pages d'accueil, vers une URL qui n'existe pas et que seul le Worker rattrape en 301. Lisible au prochain crawl.

**Vérifié** — Build local puis `next start` sur le port 3018, crawl des 322 URL du sitemap plus 12 pages de listing, collecte de tous les `<a href>` et de tous les `<link rel="alternate">`. Pour chacune des 14 URL : **absente du sitemap** (322 `<loc>`, aucune correspondance), **aucun lien interne**, **aucun hreflang**, absente de `llms.txt`. `content/blog/alternates.json` : 4 des 11 slugs y figurent, mais toujours du **côté `fr` ou `de-ch`** de la correspondance, jamais du côté `en` — ils ne peuvent donc pas produire d'URL `/en/blog/<slug>`. Pas de pagination sur `/en/blog`.

Comportement réel du Worker du dépôt, simulé en important `cloudflare-worker/src/index.js` et en interceptant le proxy d'origine : 5 URL en **410** (`GONE_PATHS`), 5 en **301** vers leur équivalent anglais réel (`LEGACY_REDIRECTS`), 4 passent à l'origine Next.js dont 3 y répondent 404 et 1 en 307. Onze des quatorze sont donc déjà traitées **dans le dépôt**.

Le crawl a par ailleurs relevé 7 liens internes vers des non-200 : 6 sont rattrapés en 301 par le Worker, 1 seul vient du code (`app/[lang]/page.tsx:500`, slug `alphatable-v2` au lieu d'`alphatable`, présent dans `machines.ts` et au sitemap). C'est la seule correction appliquée.

**Supposé** — [Inférence] Que GSC range un 410 sous « Introuvable (404) ». [Inférence] Que l'écart entre le comportement du Worker du dépôt (410 ou 301 sur 11 des 14) et le symptôme rapporté (404) s'explique par une divergence entre le Worker déployé et le dépôt — même constat que dans le lot des redirections legacy, et exactement ce que R5 annonce comme possible.

**Non regardé** — L'historique : anciens sitemaps, liens externes, soumissions manuelles. Ce sont des sources d'exposition plausibles qu'aucune lecture du dépôt ne peut confirmer. Les 6 liens internes cassés qui vivent dans `content/**` (`introText`, `content`) : c'est la prose de Sébastien, et le Worker les rattrape déjà. La date d'entrée des 14 URL dans GSC. Le 307 de `/de-ch/industrie/mode-textile` vers `/de-ch/branchen/mode-textile`, qui aboutit lui-même à un 404.

**Suite** — Resynchroniser le Worker déployé avec le dépôt, puis recontrôler ces 14 URL : la majorité devrait sortir d'elle-même. Trois points restent ouverts et sont décrits dans la PR : `/en/blog/produkt-vorstellen-leitfaden-packshot-fotografie`, `/fr/solutions` et `/en/solutions/niveau-1-fondation-presentiel`, qui tombent en 404 sans règle Worker.
## 2026-09-17 · Prérendu des gabarits `[slug]` — retrait des `not-found.tsx` de segment · Claude de Laurent

**Chantier** : rendu / budget d'exploration | **PR** : #15

**Quoi** — Suppression des quatre `not-found.tsx` placés au niveau du segment `[slug]` de `blog`, `industrie`, `studio-photo` et `academy`. Chacun ne contenait qu'un ré-export d'une ligne du `not-found` parent. Aucun `generateStaticParams`, `dynamic`, `revalidate` ou `dynamicParams` modifié.

**Pourquoi** — Mesure du 17/09 en production : ces quatre gabarits répondent `Cache-Control: private, no-cache, no-store`, `x-vercel-cache: MISS` aux deux passages, exécution `iad1`, alors que leurs paramètres sont connus à la compilation. 87 000 requêtes CDN en MISS sur 30 jours.

**Fichiers** — `app/[lang]/blog/[slug]/not-found.tsx`, `app/[lang]/industrie/[slug]/not-found.tsx`, `app/[lang]/studio-photo/[slug]/not-found.tsx`, `app/[lang]/academy/[slug]/not-found.tsx` (supprimés)

**Effet attendu** — Prérendu et mise en cache CDN de `blog/[slug]`, `industrie/[slug]` et `studio-photo/[slug]` : baisse des MISS et du temps de réponse vu par Googlebot. Lisible dans les statistiques d'exploration GSC et le cache Vercel à J+7 à J+14.

**Vérifié** — `npx next build` vert avant et après. Tableau des routes dans la sortie du build :

| Route | Avant | Après |
|---|---|---|
| `/[lang]/blog/[slug]` | `ƒ` Dynamic | `●` SSG |
| `/[lang]/industrie/[slug]` | `ƒ` Dynamic | `●` SSG |
| `/[lang]/studio-photo/[slug]` | `ƒ` Dynamic | `●` SSG |
| `/[lang]/academy/[slug]` | `ƒ` Dynamic | `ƒ` Dynamic — inchangé |
| `/[lang]/guide/[slug]` (témoin, n'avait pas de `not-found.tsx`) | `●` SSG | `●` SSG |

Serveur `next start` local (port 3017, PID écrit dans un fichier, arrêté par ce PID) :
`/fr/industrie/vin-spiritueux` 200 · `/fr/industrie/slug-inexistant-xyz` **404** ·
`/fr/blog/generer-images-produit-ia` 200 · `/fr/studio-photo/alphashot-360` 200 ·
`/fr/blog/slug-inexistant-xyz` 404 · `/fr/studio-photo/slug-inexistant-xyz` 404 ·
`/fr/academy/elearning-autonome-niveau-1` 200 · `/fr/academy/slug-inexistant-xyz` 404.
Le corps du 404 rend bien `app/[lang]/not-found.tsx` (`<h1>Page introuvable</h1>`).
`node scripts/seo/smoke.mjs http://localhost:3017` : 17 pages, 3 ressources, tout vert, 322 URL au sitemap.
`node scripts/seo/verifier-consequences.mjs` : effet local, rien qui déborde.

**Supposé** — Que le comportement de cache observé en local (`next start`) se reproduira sur Vercel. Seul le classement `●` du build est directement vérifiable ici ; les en-têtes `x-vercel-cache` ne se contrôlent qu'en Preview ou en production.

**Non regardé** — `academy/[slug]` reste dynamique : ce gabarit n'a pas de `generateStaticParams` sur sa feuille, et la consigne du lot interdit d'en ajouter un. Le `Cache-Control` réel en Preview. Le rendu `de-ch` des trois gabarits passés en SSG. L'effet sur le temps de build.

**Suite** — Contrôler `x-vercel-cache` sur le Preview de la branche, puis sur `sysnext.vercel.app` après fusion. Ouvrir séparément la question du `generateStaticParams` d'`academy/[slug]`.
## 2026-09-17 — Diagnostic de la baisse de trafic : requalifications et socle de mots clés

**Quoi** — Mesures Cloudflare GraphQL, relevés GSC, Vercel et Cloudflare, crawl Screaming Frog,
exports de couverture, SERP DataForSEO et référentiel de mots clés France et Suisse.

**Pourquoi** — Le diagnostic reposait sur des constats non vérifiés : 504 subis, blocage de
Googlebot et des crawlers IA, pénalité de liens.

**Fichiers** — aucun fichier de code modifié dans cette PR.

**Effet attendu** — un diagnostic reposant sur des mesures, et un plan hiérarchisé.

**Vérifié**
- 504 : 213 490 réponses sur 30 jours, toutes avec la source de requête `earlyHintsCache`.
  0 réponse 504 pour les visiteurs et robots réels, chacun des 30 jours. GSC ne montre
  aucune ligne 5xx sur 90 jours.
- Googlebot AS15169 : 2 réponses 403 sur 17 210 requêtes.
- Les 34 620 réponses 403 « amazonbot » portent à 94 % l'user-agent Amzn-SearchBot, dont
  aucune IP ne figure dans la liste publiée par Amazon ; trafic concentré du 27 au 29/08.
- Amazonbot authentique (AS14618) : 0 réponse 403, action `skip`.
- PerplexityBot authentique : 9 IP sur 9 dans la liste publiée, 383 challenges managés
  sur 519 requêtes.
- Browser Integrity Check : 13 réponses 403 sur 30 jours.
- Vercel : aucun blocage, aucun 5xx, plan Pro sans limite approchée ; 4 gabarits `[slug]`
  rendus dynamiquement, 87 000 requêtes en MISS sur 30 jours, exécution `iad1`.
- Crawl du 17/09 : liens d'en-tête vers des non-200 546 → 0 ; pages 404/410 39 → 1 ;
  Link Score blog et guides = 1 contre 84 à 89 pour les pages commerciales.
- Trois landings `packshot-*` ont une canonique Google pointant vers l'URL racine legacy.
- Référentiel de mots clés France : 554 mots clés pertinents ; intention d'achat
  d'équipement = 1 620 recherches/mois ; univers packshot = 4 810 ; marque = 80.
- Suisse : 2 630 recherches/mois en français, 8 110 en allemand, CPC médian 2,20 et 3,36 $,
  pointes à 20 et 35 $.

**Supposé**
- Le trafic Amzn-SearchBot n'est pas authentique : la liste d'IP consultée date du 08/09 et
  le trafic observé du 27/08.
- L'origine des 403 sans action Cloudflare (54 728 sur 30 jours) n'est pas établie.

**Non regardé**
- Règles WAF actuelles et règle d'accès IP du 20/06.
- Demandes de devis Pipedrive sur la période.

**Suite** — PR de prérendu, de redirections legacy, de maillage, puis mesure à J+14.

---

## 2026-09-17 · C2, C3 — Requalification par la mesure 403 × ASN et 504 × client · Claude de Laurent

**Chantier** : C2, C3 | **PR** : #14

**Quoi** — Mesure en lecture seule du 18/08 au 16/09 (hôtes www, apex et fr) : 403 des crawlers par ASN, origine des 403, 504 par chemin et par client, par un workflow n8n jetable non publié (`0aTm18tNM4FhZX1P`, exécutions 3256 et 3257, archivé). Contrôle des en-têtes de production sur `sysnext.vercel.app`. Mise à jour des textes C2, C3, Amazonbot et planificateur n8n. Aucune modification de code, de Cloudflare, de Vercel ni de workflow en production.

**Pourquoi** — Mesure 403 × ASN exigée avant toute règle WAF (entrées C2 du 17/09) ; rétention GraphQL de 31 jours ; les 504 étaient présentés comme piste n°1 du recul de trafic sans identification des clients touchés.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/00-BRIEFING.md`, `docs/seo-geo/05-INFRA.md`

**Effet attendu** — Aucun sur le site. Le dépôt cesse de présenter les 504 et le blocage des crawlers IA comme causes démontrées de la baisse.

**Vérifié** — GraphQL `httpRequestsAdaptiveGroups`, 210 requêtes, aucune erreur. **504** : 213 490 en 30 jours, **100 % avec le user-agent `nginx-ssl early hints`** (requêtes internes de Cloudflare liées à Early Hints) ; sur 9 pages HTML témoins, navigateurs déclarés 45 951 requêtes et 0 réponse 504 ; Googlebot, Bingbot et robots déclarés : 0 réponse 504. **Googlebot** depuis AS15169 (Google) : 17 210 requêtes, 2 réponses 403, 0 réponse 504 ; les 403 « Googlebot » viennent d'autres ASN (user-agents usurpés). **Crawlers IA** : 403 concentrés sur AS396982 (Google Cloud) ; depuis les ASN des éditeurs, 0 à 2 % de 403 — ChatGPT-User (Microsoft) 0 sur 2 002, OAI-SearchBot (Microsoft) 68 sur 3 216, ClaudeBot (Amazon) 0 sur 506, Claude-SearchBot (Amazon) 0 sur 2 429, Applebot (Apple) 0 sur 4 655 ; exception : PerplexityBot depuis AS14618 (Amazon) 383 sur 519. **Origine des 403** des crawlers IA : action de sécurité Cloudflare présente sur 99,9 % (26 exceptions sur 21 970) ; le constat « environ 20 % des 403 laissent un événement » venait de la rétention de 3 jours de `firewallEventsAdaptiveGroups`. **Amazonbot** : depuis AS14618, 0 réponse 403 sur 2 626 requêtes au libellé exact « Amazonbot » ; 34 620 réponses 403 sur l'ensemble des variantes du libellé, dont 21 656 sans action Cloudflare, ASN non ventilé. Le Worker du dépôt ne contient aucune règle 403 par user-agent. **Rendu en production** (`sysnext.vercel.app`, 17/09, deux passages par URL) : `/fr/industrie/bijoux-joaillerie`, `/fr/studio-photo/alphashot-360`, `/fr/blog/generer-images-produit-ia`, `/de-ch/branchen/schmuck` → `Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate`, `x-vercel-cache: MISS` aux deux passages, `x-vercel-id: cdg1::iad1::…` ; `/fr`, `/fr/cgu`, guide bijoux → `public, max-age=0, must-revalidate`, `HIT` ou `PRERENDER`. Build local : les 4 gabarits `[slug]` possédant un `not-found.tsx` de segment sont classés dynamiques ; retrait du fichier sur `industrie/[slug]` → prérendu. **Planificateur n8n** : exécutions planifiées reprises le 17/09 à 07:00 UTC ; `cf_traffic_daily` complète jusqu'au 16/09 ; données GSC disponibles jusqu'au 14/09 après la reprise du 17/09.
**Supposé** — Que l'ASN distingue le trafic authentique des user-agents usurpés (plages d'IP officielles non comparées). Que `nginx-ssl early hints` désigne les requêtes internes Early Hints (documentation Cloudflare et fil communautaire Cloudflare, signature identique : statut d'origine 0, cache miss). Que les 32 166 réponses 403 « amazonbot » hors libellé exact portent une variante de casse.
**Non regardé** — Période antérieure au 18/08 (hors rétention). Firewall et protection anti-bots Vercel. IP des PerplexityBot AS14618. ASN des 34 620 réponses 403 « amazonbot ». Date d'activation d'Early Hints. Temps de réponse vu par Googlebot (statistiques d'exploration GSC).

**Suite** — Lectures en cours (statistiques d'exploration GSC, Vercel, Cloudflare dont Early Hints et journal d'audit). Mesure complémentaire : Amazonbot par ASN, PerplexityBot par IP. Exclure le user-agent `nginx-ssl early hints` des mesures de 504. Aucune règle WAF justifiée par la mesure en l'état, hors cas PerplexityBot à qualifier. La prémisse de D8 (« tant que durent les 504 ») est à réexaminer par la voie de D11.

---

## 2026-09-17 · C2 — Cohérence du texte du chantier avec la mesure du 17/09 · Claude de Laurent

**Chantier** : C2 | **PR** : #13

**Quoi** — Mise en cohérence de la section C2 de `06-CHANTIERS.md` avec la mesure du 17/09 déposée par la PR #12. Aucune mesure nouvelle, aucun chiffre modifié.

**Pourquoi** — Deux énoncés du fichier contredisaient la mesure qu'il portait déjà : le diagnostic Super Bot Fight Mode du 16/09 en tête de section, et « Amazonbot reste bloqué » en fin de section.

**Fichiers** — `docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun. Lisibilité du chantier pour les deux Claude.

**Vérifié** — `06-CHANTIERS.md` : la phrase « Le blocage vient de Super Bot Fight Mode (« Definitely automated » → Managed Challenge, avec Javascript Detections actif), et le vrai correctif est une règle WAF de Skip. » devient « Diagnostic du 16/09 (Super Bot Fight Mode) infirmé par la mesure du 17/09 : les challenges viennent d'une règle managée — voir ci-dessous. » Le reste du paragraphe est conservé : AI bot policies déjà sur Allow, renvoi vers `05-INFRA.md`. En fin de section, « Amazonbot reste bloqué (décision du 04/09). » devient « Amazonbot : D8 (04/09) prévoit son blocage tant que durent les 504 ; mesuré à 31,4 % de 403 le 17/09. » Le paragraphe Amazonbot de la PR #12, redondant avec ce texte, est retiré : le chiffre de 583 réponses 200 reste consigné dans l'entrée C2 du 17/09.

**Supposé** — Rien.

**Non regardé** — `05-INFRA.md`, dont la section bots reprend le même diagnostic Super Bot Fight Mode et reste à réviser.

**Suite** — Réviser la section bots de `05-INFRA.md`. Mesure 403 × ASN, puis décision de Laurent sur la règle WAF.

---

## 2026-09-17 · C3 — Effet de `images.minimumCacheTTL` sur les 504 (mesure) · Claude de Laurent

**Chantier** : C3 | **PR** : #12

**Quoi** — Lecture de `cf_traffic_daily` (www) du 05/07 au 13/09, complétée par GraphQL Cloudflare du 14 au 16/09, et répartition horaire des 5xx sur 7 jours. Aucune modification de code, de Cloudflare ni de workflow en production.

**Pourquoi** — Correctif `images.minimumCacheTTL` = 1 an déployé le 04/09, lisible depuis le 05/09, jamais lu.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/06-CHANTIERS.md`

**Effet attendu** — Aucun (mesure).

**Vérifié** — Jours de crawl exclus : dimanches (crawl hebdomadaire `sf_crawl_snapshots`), 22/07, 22/08, 02/09 (exports `sf_*`). Avant (26-29 et 31/08, 5 j) : 12,6 % pondéré, médiane 10,9 %, min 9,0, max 16,7. Après (05-16/09 hors dimanches, 10 j) : 14,4 % pondéré, médiane 11,0 %, min 6,9, max 23,8 ; sans le 09/09 : 11,2 %, médiane 10,9 %. **Aucun effet mesurable sur le taux.** Totaux GraphQL du 10 au 13/09 identiques à `cf_traffic_daily`. Horaire (10-16/09, 5xx = 504) : taux de 4,4 à 15,3 % selon l'heure, sans heure dominante. Crawl Screaming Frog du dimanche 13/09 (00-03h UTC) : 2,0 %. Fenêtre n8n du lundi 14/09 (04-10h UTC) : 10,1 %, au niveau du socle de 9,2 %. Épisode du 14/09 17h UTC au 15/09 13h UTC : 18,2 %, sans tâche planifiée correspondante.
**Supposé** — Que `cf_traffic_daily.data_date` est un jour UTC (cohérent avec les totaux GraphQL). Que le pic du 09/09 (95 353 requêtes, 23,8 %) relève d'une charge de type crawl non enregistrée en base.
**Non regardé** — Vercel Observability (erreurs par route, durées). Répartition des 504 par chemin. Hôtes apex et fr. Données du 23/07 au 25/08, absentes de `cf_traffic_daily`.

**Suite** — Correctif `minimumCacheTTL` à conserver sans lui attribuer d'effet. Instruction C3 par Vercel Observability et par les 504 par chemin, en priorité sur l'épisode du 14-15/09. Le trou du 23/07 au 25/08 dans `cf_traffic_daily` n'est pas récupérable (rétention GraphQL de 31 jours).

---

## 2026-09-17 · C2 — Remesure des 403 des crawlers IA · Claude de Laurent

**Chantier** : C2 | **PR** : #12

**Quoi** — Remesure sur 7 jours (10-16/09) des 403 par user-agent et des actions de sécurité, par un workflow n8n jetable non publié (`Dr0FVkUVD1Pdqom7`, exécution 3249, archivé). Aucune modification Cloudflare.

**Pourquoi** — Préalable exigé par `05-INFRA.md` avant toute règle WAF : chiffres du 04/09 potentiellement périmés.

**Fichiers** — `docs/seo-geo/JOURNAL.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/06-CHANTIERS.md`

**Effet attendu** — Aucun (mesure).

**Vérifié** — Hôtes www, apex et fr. Taux de 403 (hors redirections 3xx) : GPTBot 77,9 % (96,3), Perplexity-User 75,7 % (95,0), PerplexityBot 74,9 % (91,9), ChatGPT-User 64,6 % (80,1), ClaudeBot 59,1 % (86,8), OAI-SearchBot 51,0 % (60,9), Claude-SearchBot 45,9 % (59,8), Googlebot 11,7 % (18,3), Amazonbot 31,4 % (43,3). Rétention `firewallEventsAdaptiveGroups` de 3 jours, donc événements lus sur les 15-16/09 seulement : challenges = règle managée `874a3e31…`, blocages = règle personnalisée `8d1512b8…`, skips = `5affda26…` + `e1bc7d73…` ; aucun événement de source Super Bot Fight Mode.
**Supposé** — Que la règle `5affda26…` est la règle 1 « Known Bots » et `8d1512b8…` la règle 3 (identifiants non rapprochés du dashboard). Que la mesure du 04/09 est comparable (méthode non documentée).
**Non regardé** — ASN des requêtes en 403 (part de user-agents usurpés). Origine des 403 sans événement de sécurité (GPTBot et Perplexity-User : environ 20 % tracés). Hôtes hors production.

**Suite** — Mesure 403 × ASN, puis règle WAF à décider par Laurent (GO). Écart à D8 constaté : Amazonbot n'est plus bloqué qu'à 31,4 %, avec 583 réponses 200 en 7 jours. Diagnostic Super Bot Fight Mode de `05-INFRA.md` à réviser : les challenges observés viennent d'une règle managée.

---

## 2026-09-17 · Jeton n8n `psc-n8n-publisher` renouvelé et testé · Claude de Laurent

**Chantier** : infrastructure n8n | **PR** : #11

**Quoi** — Le jeton régénéré le 16/09 est installé par Laurent dans le credential n8n « PSC - GitHub site (SJ) » et testé. Nettoyage d'`ETAT.md` : la demande de transmission disparaît, les deux lignes du chantier C2 fusionnent.

**Pourquoi** — L'ancien jeton avait expiré le 10/09 ; l'état du credential GitHub de n8n n'avait pas été vérifié depuis.

**Fichiers** — `docs/seo-geo/ETAT.md`, `docs/seo-geo/05-INFRA.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet SEO. Credential GitHub de n8n de nouveau utilisable.

**Vérifié** — `M0 · Test connexions` (`HPZw7pblQrhFQTLc`), exécution `3244` du 17/09/2026 06:45 (manuel) : 17/17 OK. Nœud `GitHub` : `executionStatus: success`, `error: null`, `full_name = Sebeth7/packshot-creator`, `permissions.push: true`, `default_branch: main`. Cloudflare, seul KO du run du 04/09, repasse OK. Aucune exécution n'avait échoué faute de ce jeton depuis le 10/09 : son unique consommateur est manuel et n'avait pas tourné depuis le 04/09.

**Supposé** — Qu'aucun workflow de publication n'existe : recherche sur les noms et descriptions des 37 workflows, sans ouverture un à un.

**Non regardé** — Portée exacte du jeton fine-grained (les `permissions` lues sont celles de l'identité appelante sur le dépôt). Date d'expiration et statut HTTP : non capturés par le nœud M0 (pas de `fullResponse`).

**Suite** — Relever la date d'expiration du jeton lors d'une prochaine intervention sur n8n (option `fullResponse` du nœud GitHub de M0). Aucune action côté Sébastien.

---

## 2026-09-17 · C4 — Worker synchronisé entre dépôt et production (constat) · Claude de Laurent

**Chantier** : C4 | **PR** : #10

**Quoi** — Constat de synchronisation entre `cloudflare-worker/src/index.js` et
le code déployé. Aucune modification du Worker, aucun déploiement. `ETAT.md` et
`06-CHANTIERS.md` nettoyés en conséquence.

**Pourquoi** — C4 était bloqué depuis le 03/09 sur un « fichier Worker de
production » promis et jamais transmis. La lecture directe du code déployé par
le connecteur Cloudflare rend ce fichier inutile : le blocage n'a plus d'objet.

**Fichiers** — `docs/seo-geo/05-INFRA.md`, `docs/seo-geo/06-CHANTIERS.md`,
`docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet en production : rien n'est déployé ni modifié
hors documentation. L'annexe K est débloquée.

**Vérifié** — Le 17/09/2026, par lecture seule via le connecteur Cloudflare
Developer Platform. Worker `packshot-router`, id `dba3dfacdbc14d698ecd8033e2cb79ca`,
`modified_on` au 2026-07-24T05:20:47Z. Comptes de clés identiques en production
et sur `main` pour les 11 tables :

| Table | Clés |
|---|---|
| `LEGACY_REDIRECTS` | 749 |
| `GONE_PATHS` | 648 |
| `LANG_SPECIFIC_REDIRECTS` | 139 |
| `HOWTO_REDIRECTS` | 118 |
| `DE_CH_MAP` | 33 |
| `BLOG_EN_REDIRECTS` | 33 |
| `HOST_HOME_MAP` | 19 |
| `PRODUCT_REDIRECTS` | 12 |
| `GUIDE_EN_REDIRECTS` | 4 |
| `PRODUIT_REDIRECTS` | 4 |
| `PASSTHROUGH_HOSTS` | 3 |

Comparaison intégrale des deux fichiers : **7 blocs de différence, tous
cosmétiques** — commentaires français retirés au bundling, plus les helpers
`__defProp22` / `__name22` d'un double bundling. Aucune différence de règle, de
table ni de logique. Les deux fichiers sont des bundles esbuild ; la source non
bundlée ne vit pas dans le dépôt.

**Supposé** — Que le compte Cloudflare lu est bien
`a51802d1e09d29095ca7ba45d63bf0f2` : le connecteur n'expose aucun identifiant de
compte, et `packshot-router` y est le seul Worker visible.

**Non regardé** — L'identifiant du déploiement actif, non exposé par le
connecteur. Les règles WAF. L'unicité des clés dans les tables (piège E4) : le
comptage porte sur les entrées écrites, pas sur les clés distinctes — un doublon
passerait inaperçu des deux côtés à la fois.

**Suite** — Établir la procédure de déploiement du Worker avant d'ouvrir la PR
de l'annexe K ; puis l'annexe K ; puis C6.

---

## 2026-09-17 · Allègement de la charge de Sébastien, D17, correction de date · Claude de Laurent

**Chantier** : gouvernance | **PR** : #9

**Quoi** — Q1 close : tranchée par Laurent, consignée en **D17** (C5 après C1 à
C4 et C6). Q3 close : les quatre écarts sont corrigés directement. Q2 passe en
régime tacite au 24/09. Les dates de la PR #8 sont ramenées du 18/09 au 17/09.

**Pourquoi** — Sébastien est surchargé et la PR #8 lui laissait trois réponses à
fournir ; il n'en reste aucune. La PR #8 datait ses ajouts du 18/09 sur la foi
de son prompt, alors que la date réelle est le 17/09.

**Fichiers** — `docs/seo-geo/BOITE-AUX-LETTRES.md`,
`docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`,
`docs/seo-geo/06-CHANTIERS.md`, `docs/seo-geo/README.md`, `CLAUDE.md`

**Effet attendu** — Aucun effet SEO : documentation seule. Zéro action requise
côté Sébastien, hors objection éventuelle sur Q2 avant le 24/09.

**Vérifié** — Les quatre écarts de Q3, corrigés ligne à ligne :

| Écart | Avant | Après |
|---|---|---|
| `06-CHANTIERS.md` C1, ligne 17 | « Livrée, poussée, **non mergée depuis le 04/09/2026** » | « Mergée le 16/09/2026 (PR #3), en production — mesure en attente » |
| `ETAT.md`, « Balle chez Sébastien » | 2 lignes d'accès Vercel (équipe, jeton de contournement) | retirées — faites, section « Accès de Laurent » du même fichier |
| `CLAUDE.md` ligne 18, `README.md` ligne 60 | « sept règles dures » | « huit règles dures » — R1 à R8, `CLAUDE.md` lignes 23 à 78 |
| `README.md` ligne 7 | « rachetée en janvier 2026 » | « rachetée fin 2025 » |

Dates : les cinq titres datés du 18/09 par la PR #8 (Q1, Q2, Q3, D15, D16) plus
l'en-tête et les lignes d'`ETAT.md` et l'entrée de journal correspondante sont
au 17/09. Aucune autre date du dépôt n'est touchée. D1 à D14 ne sont pas
modifiées, D9 non plus : D17 ne change que le rang de C5 dans l'ordre d'attaque.

**Supposé** — La date de cession de la société, « fin 2025 » selon Laurent :
fait externe, non vérifiable dans le dépôt.

**Non regardé** — Les fichiers de cadre non cités : `00-BRIEFING.md`,
`01-RAYON-ACTION.md`, `02-PROCEDURE.md`, `03-PIEGES.md`, `04-SURFACES-SEO.md`,
`05-INFRA.md`, `07-VERIFICATION.md`.

**Suite** — Réponse courte de Laurent au mail de Sébastien du 16/09 ; mesures C2
et C3 côté données.

---

## 2026-09-17 · Cadrage du pilotage SEO/GEO — questions Q1-Q3, décisions D15-D16 · Claude de Laurent

**Chantier** : gouvernance | **PR** : #8

**Quoi** — Dépôt de Q1 (priorité de C5), Q2 (production et validation du
contenu) et Q3 (écarts de documentation) dans la boîte aux lettres. D16 en
vigueur (amende D5), D15 proposée, en attente de confirmation de Sébastien.

**Pourquoi** — Cadrage de Laurent du 17/09, après le transfert du pilotage
SEO/GEO annoncé par le mail de Sébastien du 16/09.

**Fichiers** — `docs/seo-geo/BOITE-AUX-LETTRES.md`,
`docs/seo-geo/DECISIONS.md`, `docs/seo-geo/ETAT.md`, `docs/seo-geo/JOURNAL.md`

**Effet attendu** — Aucun effet SEO : documentation seule. Réponses de Sébastien
attendues sous quelques jours.

**Vérifié** — Numérotation libre avant dépôt : `BOITE-AUX-LETTRES.md` ne
contenait aucune question (« *(aucune)* », ligne 70) et `DECISIONS.md` s'arrêtait
à D14 (ligne 28). Les écarts de Q3 constatés dans les fichiers sur `main` à la
date du dépôt :

| Écart | Où |
|---|---|
| C1 « non mergée depuis le 04/09/2026 » | `06-CHANTIERS.md` ligne 17, contre `JOURNAL.md` (PR #3, 16/09) et `ETAT.md` ligne 17 |
| Accès Vercel demandés alors que faits | `ETAT.md` lignes 27 et 28, contre les lignes 63 et 64 du même fichier |
| « sept règles dures » pour huit règles | `CLAUDE.md` ligne 18 et `README.md` ligne 60, contre `CLAUDE.md` lignes 23 à 78 (R1 à R8) |

**Supposé** — La date de cession de la société (décembre 2025, selon Laurent,
contre « janvier 2026 » au `README.md` ligne 7) : fait externe, non vérifiable
dans le dépôt.

**Non regardé** — `00-BRIEFING.md`, `02-PROCEDURE.md`, `04-SURFACES-SEO.md`,
`07-VERIFICATION.md`.

**Suite** — Réponse de Laurent au mail de Sébastien du 16/09 ; mesures C2 et C3
côté données.

---

## 2026-09-16 · Audit des accès de Laurent, GitHub et Vercel · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #7

**Quoi** — Contrôle du périmètre réel des accès de Laurent, sur les deux
systèmes. Décision **D14** consignée.

**GitHub — rien à corriger.** `Sebeth7` est un compte personnel : l'accès
collaborateur y est strictement par dépôt, sans appartenance globale qui
pourrait fuir. Sur les 9 dépôts, `lwainberg` n'a que `packshot-creator`, en
écriture. Aucune invitation en attente.

**Vercel — exposition réelle, assumée.** L'équipe `sebs-projects-ca1e93a7`
héberge 8 projets et le rôle `Member` porte sur tous. Le cloisonnement par
projet est réservé au plan Enterprise. Trois sorties existaient — passer en
`Viewer`, migrer `sysnext` dans une équipe dédiée, ou retirer l'accès —
aucune retenue. Arbitrage de Sébastien, consigné en D14.

**Pourquoi** — Question posée par Sébastien sur GitHub. La réponse y était
nette, mais la même préoccupation valait sur Vercel sans avoir été posée. Un
périmètre d'accès qu'on croit cloisonné et qui ne l'est pas vaut mieux su.

**Vérifié** — Collaborateurs et invitations des 9 dépôts via l'API GitHub. Liste
des projets de l'équipe Vercel et rôles disponibles, au dashboard.

**Non regardé** — Si le rôle `Viewer` donne accès à Observability sur le plan
Pro. Sans objet tant que D14 tient.

---

## 2026-09-16 · Dénombrement des pièges corrigé · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #6

**Quoi** — Le `README.md` annonçait « 26 pièges ». Il y en a **32**. Corrigé, et
le décompte est désormais posé dans l'en-tête de `03-PIEGES.md` avec les sept
familles, pour qu'un écart se voie.

**Pourquoi** — Chiffre écrit de mémoire, jamais compté. Repéré en rédigeant le
mail à Laurent, qui annonçait encore un troisième chiffre. Un document qui donne
un nombre faux sur lui-même entame la confiance dans les autres nombres qu'il
donne — et celui-ci en donne beaucoup.

**Vérifié** — `grep -cE "^### [A-G][0-9]+ —"` sur `03-PIEGES.md` : 32.
Répartition : A1-A5, B1-B5, C1-C5, D1-D3, E1-E6, F1-F5, G1-G3.

**Non regardé** — Les autres chiffres de la documentation n'ont pas été
re-comptés un à un.

---

## 2026-09-16 · Accès de Laurent vérifiés — deux prérequis n'en étaient pas · Claude de Sébastien

**Chantier** : gouvernance | **PR** : #5

**Quoi** — Contrôle au dashboard des accès listés comme prérequis au démarrage
de Laurent. Deux des trois étaient déjà satisfaits.

| Prérequis annoncé | État réel |
|---|---|
| Ajouter `lwainberg` à l'équipe Vercel | **Déjà membre** — `laurent.wainberg@sysnext.com`, rôle Member, 2FA active |
| Créer le jeton de contournement des Preview | **Créé** le 16/09 |
| Transmettre le jeton à Laurent | Reste à faire, canal privé |

**Pourquoi** — J'avais inscrit « ajouter `lwainberg` à l'équipe Vercel » sans
l'avoir vérifié. C'est la règle R7 retournée contre moi : une affirmation se
vérifie contre le réel, y compris quand c'est moi qui l'écris. Un `ETAT.md` qui
demande un geste déjà fait perd sa valeur de source de vérité.

**Vérifié** — Page Members de l'équipe Vercel, page Deployment Protection,
collaborateurs du dépôt GitHub.

**Non regardé** — Ce que le rôle « Member » de Vercel autorise exactement en
matière d'Observability sur le plan Pro. À confirmer avec Laurent quand il
ouvrira le chantier 504.

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
