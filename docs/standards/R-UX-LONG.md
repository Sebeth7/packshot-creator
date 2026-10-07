# R-UX-LONG — Navigation des pages longues

**Décision** : D44 (`docs/seo-geo/DECISIONS.md`), Laurent, 03/10/2026.
**Statut** : principe approuvé le 03/10/2026 ; inscrit par #87 (fusionnée le 03/10, `17a4248`) ; appliqué depuis la fusion des PR de mise en œuvre : #84 (forme B, fusionnée le 06/10 à 10:26 UTC, `1e0901b`), #85 (forme A, registre, fusionnée le 06/10 à 17:46 UTC, `30482a0`) ; contrôle en CI : #86 (fusionnée le 04/10 à 06:23 UTC, `0ac062b`). Horodatages : `merged_at` GitHub, relevé du 07/10.
**Périmètre de la forme A au 06/10** : 93 pages équipées de la barre commune par #85 (44 guides, 39 fiches, 4 articles dédiés, 3 IA photo produit, 3 solutions ; recompte sur build local de la tête `0d2633f`, description de #85). 3 pages Mode gardent leur barre d'origine.
**Portée** : toutes les pages du site, existantes et futures, FR, EN et de-ch, produites par les deux environnements Claude.
**Mise en œuvre** : registre `data/navigation/pages-longues.ts` ; composants `components/navigation/SommaireCollant.tsx` (forme A) et `components/blog/TableOfContents.tsx` (forme B).
**Mesures de référence** : audit du 03/10/2026, 309 URL à 1 440 et 390 px.

---

## 1. Principe

Toute page longue reçoit une navigation adaptée à sa structure et à son gabarit, **dès lors qu'elle améliore réellement l'accès aux sections**. La règle s'applique par famille de gabarits, pas URL par URL : elle n'impose pas un menu collant sur chaque page.

Trois comportements, jamais cumulés sur une page :

| Forme | Quoi | Composant | Où aujourd'hui |
|---|---|---|---|
| **A** | Sommaire horizontal collant sous l'en-tête, desktop | `components/navigation/SommaireCollant.tsx` | Guides, fiches machines, IA photo produit, solutions, deux articles dédiés (93 pages au 06/10, #85) ; Mode (composant d'origine jusqu'au 26/11). Studios (gamme) : HOLD, barre relevant du chantier commercial sous validation spécifique (arbitrage de Laurent du 03/10) |
| **B** | Sommaire latéral collant, utilisable sur toute la hauteur de l'écran | `components/blog/TableOfContents.tsx` | Articles du blog (gabarit commun) et quatre pages dédiées |
| **C** | Sommaire statique dans la page, ou pas de navigation persistante | — | F5 (choix délibéré), pages courtes, pages de liste, outils, pages légales |

**Une page ne cumule jamais deux navigations collantes.** Aucune barre A sur une page qui porte une colonne B.

---

## 2. Critères d'éligibilité

Écrits dans la PR qui ajoute, retire ou change une navigation.

| # | Critère | Mesure | Seuil indicatif |
|---|---|---|---|
| C1 | Longueur réellement rendue | `scrollHeight` à 1 440 × 900, après chargement différé | ≥ 7 200 px (huit écrans) |
| C2 | Sections navigables | Sections de contenu à titre, **hors** FAQ, CTA final, formulaire, témoignages, liens de fin | ≥ 4 (la FAQ s'ajoute comme entrée, elle ne compte pas pour le seuil) |
| C3 | Bénéfice utilisateur | Lecture non linéaire plausible, en une phrase | Jugement écrit |
| C4 | Compatibilité du gabarit | Libellés disponibles **sans texte nouveau** (titres de section, titres d'étape, sommaire existant) ; `id` ajoutables sans retrait | Oui / non |
| C5 | Absence de conflit | Aucun autre élément collant en haut d'écran au-dessus de 128 px ; pas de colonne B ; pas d'expérience SEO ni de PR éditoriale ouverte sur la page | Oui / non |

C1 et C2 déclenchent l'évaluation ; C3 à C5 la tranchent. Les seuils sont indicatifs : ils n'obligent pas.

Classement : **ADOPT** (intégration directe) ; **ADAPT** (gabarit à adapter : `id`, sommaire construit depuis les titres) ; **KEEP** (navigation existante conservée) ; **EXCLUDE** (bénéfice nul ou dégradation) ; **HOLD** (page gelée jusqu'à une date ou une décision).

---

## 3. Comportement

### 3.1 Forme A — barre horizontale

| Point | Règle |
|---|---|
| Largeurs | Rendue à partir de 1 024 px ; rien en dessous |
| Position | `fixed`, `top` = hauteur mesurée de `header.sticky` (65 px au 03/10), relue au redimensionnement ; `z-40`, sous l'en-tête (`z-50`) ; hauteur 48 px |
| Apparition | Quand le sommaire de la page (`ancreSommaire`) sort de l'écran ; à défaut, quand la première section atteint le bas de la barre |
| Disparition | Avant la zone finale (`ancreFin` : formulaire, CTA) ; à défaut, après la dernière entrée |
| Masquage | Opacité et `visibility: hidden` : non focalisable, aucun décalage du contenu |
| Section active | Numéro souligné, `aria-current="location"` ; libellé affiché dans un emplacement fixe à droite des numéros, tronqué au-delà de 28 rem. Les numéros ne bougent pas quand la section change (CLS de défilement nul) Décision de Laurent du 03/10 : emplacement fixe retenu ; le déplacement dynamique de la barre de Mode n'est pas repris. |
| Entrées | 4 à 12 ; numérotées `01`, `02`… dans l'ordre de la page |
| Ancres | Le composant fixe le `scroll-margin-top` des sections ciblées : en-tête + barre + 16 px (129 px au 03/10). Les pages portent seulement les `id`, et seulement si la barre est active (une page gelée reste identique) |
| Libellés | Titres existants de la page, jamais un texte nouveau ; titre de barre et nom accessible : « Sommaire / Contents / Inhalt », « Accès rapide aux sections / Quick access to sections / Schnellzugriff auf die Abschnitte » (valeurs validées sur Mode) |
| Sans JavaScript | Barre masquée ; le contenu reste entier |
| Mouvement réduit | Transition d'opacité désactivée |
| Tablette paysage (1 024 px tactile) | Barre rendue ; l'appui sur un numéro suit l'ancre ; le libellé actif reste visible |

**Réserve constatée le 07/10/2026 (QA `www` après la fusion de #85)** — La surbrillance de la section active est parfois décalée par rapport à la section lue. Diagnostic P2 **proposé**, non arbitré ; aucune correction autorisée à ce jour. Le comportement attendu ci-dessus (« Section active ») est inchangé : la réserve décrit un écart possible de la mise en œuvre, pas une modification de la règle.

### 3.2 Forme B — sommaire latéral du blog

| Point | Règle |
|---|---|
| Desktop | Colonne `sticky top-24` ; liste plafonnée à `calc(100vh - 10rem)` avec défilement interne ; entrée active gardée visible dans la liste |
| Mobile, tablette portrait | Sommaire repliable au-dessus de l'article ; le panneau se replie **avant** le défilement |
| Arrivée | Position du titre vérifiée en fin de défilement, jusqu'à trois corrections (images sans dimensions qui se chargent en route) |
| Ancres | `id` calculés par `processHtmlContent` (`slugify` du titre) : ancres historiques, à ne pas modifier |
| Accessibilité | `aria-current="location"`, `aria-expanded`, `aria-controls`, focus visible |
| Adresse | Inchangée au clic (aucun effet sur la mesure d'audience) |

### 3.3 Forme C

Sommaire de page éventuel, liens « Retour au sommaire » si la page en a. Aucun élément collant ajouté.

---

## 4. Exceptions permanentes et gels

| Cas | Traitement |
|---|---|
| Page sous expérience SEO (F5 jusqu'au 23/11/2026 ; Mode et hub mode-textile jusqu'au 26/11/2026 ; accueil et M5 jusqu'au 28/10/2026) | HOLD : aucune modification de la page, navigation comprise |
| Page touchée par une PR éditoriale ouverte | HOLD jusqu'à la clôture de la PR (registre au 07/10 : #27, #64). Exception temporaire, jamais permanente : à la clôture, contrôle sur `main` et retrait de l'exception si la page reste éligible. Exemple appliqué : les 3 exceptions de #91 retirées le 06/10 (`4b8c12a`), après la fusion de #91 (`3b427d7`) |
| Page d'un pilote commercial coordonné (Studios : Landings & Hubs, Maillage V2) | HOLD jusqu'à la validation spécifique du chantier commercial |
| Pages légales, de liste, d'outil, formulaires | EXCLUDE |
| `industrie-defense` | EXCLUDE (D10) |
| Libellés qui exigeraient un texte nouveau | EXCLUDE ou circuit éditorial D42 (copywriting de Sébastien) |
| Page sous le seuil C1 ou C2 | C par défaut ; réévaluation si la page change |

Le registre `data/navigation/pages-longues.ts` porte chaque exception avec son motif et sa condition de sortie. Un test Vitest refuse une exception sans motif.

---

## 5. Adoption dans un nouveau gabarit ou une nouvelle page

1. Mesurer C1 et C2 sur un build local (1 440 × 900).
2. Si la page appartient à une famille déjà active (guide, fiche, solution…), rien à faire : la barre s'applique.
3. Nouveau gabarit : ajouter la famille au registre (forme, statut, portée, note chiffrée), poser les `id` conditionnés à `barreActive()`, construire `entrees` depuis les titres existants, rendre `SommaireCollant`.
4. Ne jamais copier le composant ; ne jamais ajouter une seconde navigation collante.
5. Tests obligatoires (§ 6), dans la même PR.
6. Mode bascule sur le composant mutualisé après le 26/11/2026, avec contrôle de parité visuelle et décision de Laurent (le libellé actif change d'emplacement).

---

## 6. Tests obligatoires

| Test | Fichier | Exigence |
|---|---|---|
| Registre | `lib/navigation/__tests__/registre-pages-longues.test.ts` | Pages gelées jamais équipées ; familles B et C jamais équipées ; exceptions motivées |
| Barre | `e2e/navigation-pages-longues.spec.ts` | Masquée en haut ; visible et section active correcte sur chaque section ; collée sous l'en-tête ; liste dans le cadre ; Entrée au clavier → titre visible sous la barre ; masquée en fin de page ; une seule navigation collante ; rien sous 1 024 px ; pages gelées sans barre |
| Blog | `e2e/sommaire-blog.spec.ts` | Titre visé visible après toucher et Entrée à 390 px ; liste latérale dans la fenêtre et dernière entrée atteignable à 1 440 × 900 ; une entrée active ; pied de page non recouvert |
| Ancres | `e2e/anchors.spec.ts` | 0 ancre sans cible |
| QA manuelle avant publication | Preview, puis Chrome sur `www` (R4) | 360, 390, 768, 1 024, 1 280, 1 440, 1 920 px ; FR, EN, de-ch ; desktop, tablette, mobile (D42, arbitrage 4) ; hauteur de page et largeur des tableaux et illustrations inchangées ; CLS sans régression |
