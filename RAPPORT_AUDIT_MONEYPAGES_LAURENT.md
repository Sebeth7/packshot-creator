# Rapport Claude Code — Questionnaire audit tunnel/maillage/UX + Brief money pages

Réponses aux deux mails de Laurent du 27/06 et 30/06. Lecture de code factuelle (présence, fichier:ligne, cible des liens), pas de jugement sur l'efficacité — conformément au cadrage demandé.

---

## ⚠️ Constat hors périmètre — prix Orbitvu publiés en ligne

En vérifiant la contrainte anti-prix (question D17 du questionnaire), deux passes indépendantes ont confirmé la présence de **prix Orbitvu en euros publiés publiquement**, indexés (pas de noindex), présents dans le sitemap :

- `app/[lang]/blog/guide-achat-studio-2026/page.tsx` — grille tarifaire complète par modèle (8 000 € à 150 000 €)
- `app/[lang]/blog/orbitvu-vs-concurrents/page.tsx` — AlphaShot G2 « 15 000-20 000 € / 18 000 € »
- `app/[lang]/blog/comment-calculer-le-roi-d-un-studio-photo-automatise-en-2026-guide-complet/page.tsx` — grille de prix par gamme (Micro/G2/360/XXL)
- `app/[lang]/blog/blendai-vs-flair-ai-quelle-ia-pour-vos-campagnes-produits-en-2026/page.tsx` et `blendai-vs-photoroom-quel-outil-ia-pour-vos-visuels-produits-en-2026/page.tsx` — « Studio Orbitvu : 18 000 € »
- Plusieurs articles migrés Webflow (`content/blog/fr/` et `content/blog/en/`) — jusqu'à 170 000 €
- `data/solutions.ts:460` — fourchette « 10 000 à 40 000 € »
- `app/[lang]/ia-photo-produit/page.tsx` — JSON-LD avec prix BlendAI à 75 € (service IA, pas Orbitvu — probablement hors clause)

Les 5 articles « custom » datent du 06/04/2026. Les fonctions `productSchema()`/`productWithRatingSchema()` (`components/seo/SchemaOrg.tsx`) et les composants `MachineCard`/`MachineModal` ont un garde-fou (`showPrice`/`showPrices` désactivé par défaut côté pages publiques), donc le risque structurel est maîtrisé — mais ce contenu éditorial en clair ne l'est pas. **Correction en cours côté Sébastien**, distincte du présent chantier SEO/UX.

---

## BLOC A — Sélecteurs structurels

**1. Contenu éditorial dans `<main>` ?**
Oui. `app/[lang]/layout.tsx:88` : `<main>{children}</main>`, encadré par `<Header />` (l.86) et `<Footer />` (l.89). Layout racine commun à toutes les pages. Sélecteur : `main` (balise sémantique, pas de classe).

**2. Sélecteur du ContactForm ?**
`components/forms/ContactForm.tsx`. Le `<form>` n'a pas d'`id` propre (seulement la `className` passée par l'appelant). Sélecteur fiable sur les champs, tous préfixés `cf-` : `#cf-firstName`, `#cf-lastName`, `#cf-email`, `#cf-phone`, `#cf-company`, `#cf-sector`, `#cf-message` (l.316-372).

**3. Bouton devis/démo ?**
Pas de modale JS. Lien `<a href>` réel via `HeroSection` (`components/hero/HeroSection.tsx:255-269`), pointant systématiquement vers `/contact`. Exemples : `studio-photo/[slug]/page.tsx:545-546` (« Demander un devis » / « Demander une démo »), `industrie/[slug]/page.tsx:228-229` (« Demander un devis gratuit »). Bouton header desktop « Recevoir une offre » (`Header.tsx:541-545`) également `<Link href="/contact">`.

## BLOC B — CTA et tunnel de conversion

**4. Pages produit `/studio-photo/[slug]` :** CTA en haut (hero → `/contact`, l.544-547) ET en fin de page (`<ContactForm>` intégré directement, l.1270).

**5. Hubs secteur `/industrie/[slug]` :** même structure — hero CTA → `/contact` (l.228), `<ContactForm compact defaultRequestType="demo">` en fin de page (l.734).

**6. Guides/blog :** guides → CTA simple lien vers `/contact` en fin de page (`guide/[slug]/page.tsx:282-288`) + bloc maillage `RecommendedStudio`. Blog → composant `ArticleCTA` en fin d'article (deux boutons : Contact + Calculateur ROI), pas de ContactForm intégré.

**7. Composant CTA unique ou propre par type ?**
`ContactForm` est un composant unique réutilisé (props `compact`, `defaultRequestType`, `machineContext`), mais son intégration en fin de page est dupliquée section par section dans chaque template — pas de composant "FinalCTA" générique partagé.

**8. Popup/modale/sticky de conversion ?**
Aucun. Seules modales : `MachineModal` (fiche détail) et `MethodologyModal` (calculateur ROI) — pas des CTA commerciaux. Pas de bandeau sticky de conversion (seul le `<header>` est `sticky top-0`).

**9. CTA visible en mobile ?**
Partiellement. Header sticky toujours visible, mais bouton CTA texte « Recevoir une offre » est `hidden lg:flex` (`Header.tsx:539`) — masqué en mobile, accessible uniquement via le burger menu.

## BLOC C — Maillage interne

**10. Liens gabarit sur toutes les pages :**
Header (méga-menu Solutions, Academy, Blog, À propos, CTA contact) + Footer (Solutions, 16 secteurs nommément + lien "toutes", Documentation industrielle, Packshot par secteur, Academy, Company, Legal). Montés dans `app/[lang]/layout.tsx:86-89` → 100 % des pages.

**11. Liens contextuels dans le corps des guides/articles :**
Oui, présents en plus du maillage template. Ex. `content/guides/fr/quels-reglages-pour-photographier-bijoux.json` (lien inline vers `/fr/industrie/bijoux-joaillerie`), `content/guides/fr/comment-positionner-montre-avant-shooting-photo.json` (2 liens inline : hub + `alphashot-micro-v2`).

**12. Composant "articles liés"/"produits associés" :**
`RelatedArticles` (blog), `GuideRelated`/`SectorResources` (`components/maillage/MaillageSections.tsx`, guides et hubs). Tous dans `<section>` à l'intérieur de `<main>` — aucun dans `<aside>`/`<footer>`.

**13. Guides bijoux/horlogerie → alphashot-micro-v2 / hub ?**
Oui, avec une nuance bilingue : les guides FR ont des liens inline + un bloc template `RecommendedStudio` (`data/content-maillage.ts:59-60`) systématique. **Mais `CONTENT_PRODUCT_MAP`/`SECTOR_RESOURCES_MAP` sont codées en clés slug FR uniquement** → sur les pages EN (slugs différents), aucun bloc "Studio recommandé" ne s'affiche, et `SectorResources` sur le hub EN bijoux ne trouve pas les guides EN. Le maillage template P1 est donc FR-only ; seul le lien inline dans la prose subsiste en EN.

## BLOC D — Objection "budget" sans afficher de prix

**14. Calculateur ROI : page séparée ou embarqué ?**
Page séparée uniquement (`app/calculateur-roi/page.tsx`, `app/[lang]/calculateur-roi/page.tsx`). Aucune page produit/hub ne l'embarque (elles importent seulement les données machines, pas le widget).

**15. Liens vers calculateur ROI et /outil-financement :**
Vers `/calculateur-roi` : oui, systématique (fiches produit l.1290-1292, pages secteur l.753-754, hubs solutions, studios-photo-automatises). Vers `/outil-financement` : **aucun lien depuis les fiches produit ni pages secteur** — seul `academy/page.tsx:378-380` y lie. Trou de maillage identifié : le lien financement n'est présent que depuis l'Academy, pas depuis le parcours produit/secteur où se pose l'objection budget.

**16. Réassurance économique non tarifaire :**
Présente mais inégale. Coût par image (`data/solutions.ts:330,460`), ROI/délai de rentabilité (hub industrie l.144-148,201 ; hub studios-photo-automatises l.290-314), OPCO/Qualiopi (fiches produit l.1141-1191, mais uniquement en cross-link formation, pas comme argument financement machine — absent des pages `industrie/[slug]`).

**17. Vérification anti-prix : cf. section dédiée en tête de document.**

## BLOC E — Objection "inadaptation" et fiches produit

**18. Specs produit complètes / NaN ?**
Complètes sur les 16 fiches. `tailleMax`, `poidsMax`, `capaciteJour` non-vides sur toutes les entrées de `machines.ts`. `notFound()` empêche tout slug orphelin de produire une fiche vide. Aucun NaN ni champ vide trouvé.

**19. Source des données produit :**
Deux fichiers TypeScript statiques **dupliqués en parallèle** (pas de CMS/base externe) : `components/calculators/ROICalculator/lib/machines.ts` (897 lignes, avec FAQ/keyStats, utilisé par les pages publiques) et `components/machine-selector/lib/machines.ts` (537 lignes, sans FAQ, utilisé seulement par le widget sélecteur). Risque de désynchronisation entre les deux à surveiller.

**20. Description du fit produit/secteur :**
Oui, trois blocs systématiques sur chaque fiche (`studio-photo/[slug]/page.tsx:937-979`) : « Cas d'usage idéaux », « Secteurs idéaux », et « Points d'attention » (bloc ambre listant les limitations, ex. « Limité aux très petits objets (< 1kg) »). Fonctionnellement équivalent à un guide de choix, bien que non intitulé ainsi.

**21. Sélecteur de machines :**
Existe (`app/[lang]/studio-photo/selecteur-machines/page.tsx`), embarqué directement sur le hub `studios-photo-automatises`, lié depuis `solutions/[slug]`, `industrie/[slug]`, `distributeur-orbitvu-suisse`, et le footer. **Gap identifié** : aucun lien depuis le hub `industrie/page.tsx` ni depuis les guides blog (`guide-achat-studio-2026`, `comment-calculer-le-roi-...`).

## BLOC F — Défauts techniques

**22. Images cassées / .mp4 via next/image :**
Aucun cas trouvé. Garde-fou explicite `.endsWith('.mp4')` basculant sur `<video>` natif à 3 endroits (`BlogGrid.tsx:87-97`, `blog/page.tsx:98-108`, `blog/[slug]/page.tsx:164-176`). `remotePatterns` limité à `cdn.prod.website-files.com` et `res.cloudinary.com` ; vignettes YouTube gérées hors `next/image`.

**23. title vs H1 :**
Globalement alignés. Anomalie : `app/[lang]/outil-financement/page.tsx:511-515` — `<title>` SEO ("Outil de financement — Comparateur leasing vs crédit bancaire") mais H1 réel "Calculateur de taux leasing" avec sous-titre "Outil interne — Calcul du taux + comparatif financement." Page indexable (canonical actif, dans le sitemap) alors qu'elle se présente comme un outil interne.

**24. Twitter Cards :**
Fallback générique sans accents dans `app/[lang]/layout.tsx:44-51` ("Studios Photo Automatises", "automatisee"). **24 pages héritent de ce fallback** faute de champ `twitter` propre, dont des pages money/hub : articles blog dynamiques, `solutions/[slug]`, `packshot-bijoux`, `packshot-mode`, `selecteur-machines`, `calculateur-roi`, `outil-financement`. 21 pages mappent correctement (homepage, `studios-photo-automatises`, `ia-photo-produit`, `industrie/[slug]`, `studio-photo/[slug]`, `contact`...).

**25. Canonical :**
Présent partout. `/calculateur-roi` : auto-référent par langue (correct). `/outil-financement` : canonical **fixe vers la version FR quelle que soit la langue** (intentionnel et documenté en commentaire — "contenu FR-only" — mais factuellement pas auto-référent sur `/en/outil-financement`).

**26. Hreflang :**
Source unique confirmée : `lib/hreflang.ts:35-47`, émis uniquement en HTML (`alternates.languages`), aucune émission via en-tête HTTP. Langues : fr, fr-CH (= même URL que fr), en, de-CH, x-default (= fr).

**27. En-têtes HTTP en double :**
Aucun doublon. `next.config.ts` ne définit aucune fonction `headers()`. Le Worker ne définit que `X-Served-By` et la réécriture du header `link` (prefetch RSC, pas du hreflang). Si HSTS/X-Content-Type-Options apparaissent en prod, ils viennent de la config zone Cloudflare (hors repo).

## BLOC G — Rendu & infra

**28. SSR vs hydratation :**
Pages money/hubs vérifiées (`studio-photo/[slug]`, `industrie/[slug]`, `industrie/page.tsx`, homepage) sont des Server Components — contenu rendu serveur. Seule exception : `calculateur-roi/page.tsx` est `'use client'` mais reste SSR au premier rendu (pas de `ssr:false`).

**29. Contenu gated derrière une interaction :**
Aucun CTA ni specs structurants masqués par `useState`. Les FAQ utilisent `<details>/<summary>` HTML natif (toujours dans le DOM). Pas de composant `Tabs`/`Accordion` React trouvé.

---

## Brief money pages — résultat

**Repointage des liens obsolètes** (table 1a/1b/1c du brief) : **49 liens corrigés dans 30 fichiers de contenu**, + 3 ancres retirées (`industrie/objets-art-antiquite`, secteur abandonné, texte conservé). Bonus détecté en cours de route : 2 articles (`orbitvu-vs-concurrents`, `ia-photo-produit-guide-2026`) avaient de vraies URLs nues sans préfixe de locale dans des `<a href>` bruts (hors composant `Link` localisé next-intl) — corrigées (9 liens). Vérification finale : zéro lien résiduel vers les anciens slugs.

**Vérification en code (point 2 du brief) :**
- Narratif hero : pas de duplication — titre (`machine.nom`), sous-titre (`useCases`) et specs sont 100 % pilotés par les données machine, donc uniques par fiche.
- Meta description : unique par fiche (interpolation `machine.nom` + `useCases` + `keyAdvantages[0]`). Point faible : seule la fiche `alphashot-360` (override manuel) contient un CTA explicite ("Demandez une démo gratuite") dans sa description — les 15 autres fiches utilisent le template par défaut sans formule CTA.
- Title ≤ 60 caractères : confirmé sur les 16 fiches (max observé : 60 caractères pile, `Alphastudio Compact Pro v2`).
- H1 commercial unique : confirmé (= nom de la machine).
- JSON-LD `Product` : bloc `offers` **retiré** de `productSchema()` et `productWithRatingSchema()` (`components/seo/SchemaOrg.tsx`) — propagé à toutes les fiches produit et à la homepage. `Product` + `FAQPage` conservés.

**Arbitrage `orbitvu-kit-mini-midi` :** aucun lien vers ce slug n'existe dans le code actuel (content/, app/, components/), ni en FR ni en EN. Seuls vestiges : `/en/studio-photo/orbitvu-kit-mini-midi` en **410** côté Worker, et l'ancienne URL FR `/produit/orbitvu-kit-mini-midi` qui redirige déjà en 301 vers `/fr/studio-photo/selecteur-machines`. **Rien à corriger côté code** — les 4 liens EN détectés via `page_links` ne correspondent à aucun contenu présent dans le repo aujourd'hui. À vérifier de ton côté si ta donnée `page_links` est à jour sur ce point précis.

**Vérification finale :** `tsc --noEmit` sans erreur, 32 fichiers modifiés au total.
