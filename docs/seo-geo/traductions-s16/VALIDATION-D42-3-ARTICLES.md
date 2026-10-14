# EN ATTENTE DE VALIDATION D42 — assainissement FR de 3 articles (S16)

**Date** : 2026-10-14 · Claude de Laurent · Base `main` `2ae6e15` · **GO_MERGE = NO · PUBLICATION = NO**
**Statut** : propositions éditoriales FR, **non publiables sans validation D42 de Sébastien**. Aucune traduction EN définitive n'est faite (D42 interdit de traduire depuis un brouillon non validé).

Objectif : neutraliser les affirmations commerciales non prouvées des 3 articles encore en français sous `/en`, pour que leur **seul** obstacle restant soit la validation des textes FR, avant traduction EN.

Périmètre strict : **suppression / neutralisation** de claims non établis. **Aucun fait ajouté**, aucun chiffre inventé, aucune nouvelle promesse. Informations techniques, médias, liens et structure **conservés**. `noindex` des 3 pages EN **conservé** (`NOINDEX_EN_BLOG_SLUGS`, `robots: index:false, follow:true`).

Articles (fichiers FR modifiés) :
- `content/blog/fr/photographie-2d-de-produits.json`
- `content/blog/fr/photographie-de-produits-a-360-degres-en-interne.json`
- `content/blog/fr/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre.json`

---

## 1. Tableau ancien texte → texte FR proposé

### Article 2D (`photographie-2d-de-produits`)
| # | Ancien | Proposé | Raison |
|---|---|---|---|
| 1 | « Nous sommes **le leader mondial** de la photographie fixe de produits, des… » | « Nous **concevons des systèmes** de photographie fixe de produits, des… » | Claim de leadership mondial non prouvé |
| 2 | « …le **meilleur de l'innovation**, afin… Nos studios automatisés **ont déjà convaincu plus de 20 000 utilisateurs dans 35 pays.** » | « …**des solutions innovantes**, afin… Nos studios automatisés **s'adressent aux entreprises de toutes tailles.** » | Superlatif + chiffre/géo non vérifiés (20 000 / 35 pays) |
| 3 | « **Les meilleurs systèmes** » (titre) | « **Nos systèmes** » | Superlatif |
| 4 | « le LiveStudio est **la solution de prise de vue la plus accessible du marché.** » | « le LiveStudio est **une solution de prise de vue accessible.** » | Superlatif de marché |
| 5 | « Ils **garantissent** donc des résultats consistants et homogènes… » | « Ils **favorisent** donc des résultats consistants et homogènes… » | Garantie → formulation prudente |
| 6 | « nos systèmes **garantissent** des éclairages constants et consistants… » | « nos systèmes **assurent** des éclairages constants et consistants… » | Garantie → prudente (fait technique conservé) |
| 7 | « **Le meilleur logiciel** pour la photographie de produits » (titre) | « **Le logiciel PackshotCreator** pour la photographie de produits » | Superlatif |
| 8 | « …est le logiciel de photographie de produits **le plus puissant et le plus unique du marché.** » | « …est **un logiciel de photographie de produits puissant.** » | Superlatif de marché |

### Article 360° (`photographie-de-produits-a-360-degres-en-interne`)
| # | Ancien | Proposé | Raison |
|---|---|---|---|
| 1 | « **Nos best-sellers**, les studios photo entièrement automatisés… » | « **Nos studios photo entièrement automatisés**… » | Claim de ventes non prouvé |
| 2 | « pour fournir **les meilleurs résultats dans les plus brefs délais.** » | « pour fournir **des résultats de qualité dans de courts délais.** » | Double superlatif |
| 3 | « les **meilleurs réglages** peuvent être réutilisés… » | « les **réglages peuvent être enregistrés et réutilisés**… » | Superlatif (sens fonctionnel conservé) |

### Article 3D (`…-logiciel-integre`)
| # | Ancien | Proposé | Raison |
|---|---|---|---|
| 1 | « nos logiciels dynamiques **garantissent le flux de travail le plus rapide et le plus productif possible.** » | « nos logiciels dynamiques **permettent un flux de travail rapide et productif.** » | Garantie + double superlatif |
| 2 | « une **qualité d'image exceptionnelle.** » | « une **qualité d'image élevée.** » | Superlatif |
| 3 | « …en réutilisant **les meilleurs paramètres.** » | « …en réutilisant **les paramètres.** » | Superlatif (sens fonctionnel conservé) |

---

## 2. Fiche de validation courte (par article)

Pour chacun : **conservé** = informations techniques (specs LED, formats, brevets, fonctionnalités logicielles), médias, liens internes/externes, structure Hn.

- **2D** — 8 neutralisations (leadership, 20 000/35 pays, superlatifs logiciel/LiveStudio, 2 garanties). **Fait non revérifié conservé** : « plus de 70 brevets » (figure concrète ; à confirmer par Sébastien, non modifiée). Technique conservé : « éclairage 100 % LED », « 1 à 100 % », « 5700 °K », « 50 000 heures ».
- **360°** — 3 neutralisations (best-sellers, superlatifs résultats/réglages). **À noter** : « **Depuis 2001** » conservé tel quel — relève de l'arbitrage de date (D33, 2001/2003/2004), **hors périmètre** de cette mission ; à trancher séparément.
- **3D** — 3 neutralisations (garantie flux « le plus rapide/productif », « exceptionnelle », « meilleurs paramètres »). Technique conservé : « jusqu'à 10 appareils », « 1024 images / 10 rangées », formats.

**Question unique pour Sébastien** : voir `docs/seo-geo/BOITE-AUX-LETTRES.md` (Q-S16-FR). Résumé : « Voici les 3 textes FR corrigés ; les affirmations commerciales sans preuve ont été supprimées ou neutralisées. Peux-tu valider ces versions, ou indiquer précisément les passages à modifier ? » (+ « Depuis 2001 » et « 70 brevets » à confirmer).

---

## 3. Traduction EN — étapes à exécuter APRÈS validation D42 (non faites ici)

À la validation des FR (et arbitrage des 2 faits ci-dessus) :
1. Traduire le champ `content` (et `description` si pertinent) de chaque fichier `content/blog/en/<slug>.json` depuis la **FR validée**, en conservant : le `slug` (URL inchangée), les `href` internes/externes, les balises HTML, les `alt` d'images, les `[embed]`/iframes, l'ordre des sections.
2. Ne traduire aucun claim retiré ; appliquer les arbitrages de claims de Sébastien à l'identique (aucun ajout).
3. Conserver `noindex` (ne pas retirer les slugs de `NOINDEX_EN_BLOG_SLUGS` — gate D9 distinct, `GO_LEVEE_NOINDEX = NO`).
4. Contrôles : `tsc`, `vitest`, `verifier-json`, `next build`, hreflang/canonical/alternates/sitemap inchangés, rendu Preview.
5. PR Draft dédiée (ou extension de celle-ci) ; GO_MERGE distinct.

**Fichiers EN cibles** (inchangés tant que non validé) :
- `content/blog/en/photographie-2d-de-produits.json`
- `content/blog/en/photographie-de-produits-a-360-degres-en-interne.json`
- `content/blog/en/photographie-3d-de-produits-une-serie-complete-dequipement-avec-logiciel-integre.json`

---

## 4. Contrôles de cette PR (préparation FR seule)

- JSON : 3 fichiers valides (parse OK).
- Aucun claim ciblé résiduel (`leader mondial`, `20.000 utilisateurs`, `best-seller`, `le plus … du marché`, `garanti*` dans les 3) — vérifié.
- URL / slugs / liens / médias / `alt` : inchangés (édition de texte intra-paragraphe uniquement).
- Métadonnées : `title`/`description` FR inchangés (aucun claim ciblé ne s'y trouvait).
- `noindex` EN : inchangé (`robots: index:false, follow:true` sur les 3).
- EN : **non traduit** (D42).
