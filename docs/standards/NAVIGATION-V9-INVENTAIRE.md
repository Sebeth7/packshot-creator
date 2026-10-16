# Navigation V9 — inventaire pour un déploiement ultérieur

**Décision** : Laurent, 16/10/2026, « ADDENDUM PRIORITAIRE — DÉCISION LAURENT — NAVIGATION V9 » ; règle écrite dans `R-UX-LONG.md` § 2 bis ; entrée « Navigation V9 » de `docs/seo-geo/DECISIONS.md`.
**Statut** : inventaire seulement. **Rien n'est déployé hors de la landing Studios FR (#108).** Chaque lot ci-dessous demande une validation distincte de Laurent avant toute modification.
**Recompte** : build local du 16/10/2026 (`main` `c92740c` + branche de #108), HTML prérendu ; pages servies à la demande non comptées.

---

## 1. Écart de périmètre constaté

L'addendum cite « les 93 autres pages déjà équipées de la barre horizontale » : c'est le recompte de #85 au 06/10 (`R-UX-LONG.md`, en-tête). Le build du 16/10 en compte **111** qui portent la barre mutualisée, hors Studios FR et hors Mode :

| Famille (registre) | Gabarit | Pages au 16/10 | Au 06/10 |
|---|---|---|---|
| `guide` | `app/[lang]/guide/[slug]/page.tsx` | 44 (FR 19, EN 22, de-ch 3) | 44 |
| `fiche-machine` | `app/[lang]/studio-photo/[slug]/page.tsx` | 51 (17 par langue) | 39 |
| `blog-dedie-sans-sommaire` | 2 pages dédiées du blog | 4 (FR et EN) | 4 |
| `landing-ia` | `app/[lang]/ia-photo-produit/page.tsx` | 3 | 3 |
| `solution` | `app/[lang]/solutions/[slug]/page.tsx` | 6 (FR 3, EN 3) | 3 |
| hors registre | `app/[lang]/conversations-sebastien-jourdan/page.tsx` | 3 | — |
| **Total** | | **111** | **93** |

À part : Mode (3 pages, composant d'origine `components/landings/SommaireCollant.tsx`, gelée jusqu'au 26/11/2026).

Le hub « Conversations » rend `SommaireCollant` sans passer par `barreActive()` ; il n'est pas inscrit au registre. À régulariser dans le lot qui le concernera.

---

## 2. Pages à barre : ce que demanderait le sommaire vertical

Mise en œuvre commune : `components/navigation/NavigationSections.tsx` (aucune copie par page), entrée `lateral` de la famille dans `data/navigation/pages-longues.ts`, conteneurs de la zone avec `xl:pr-80`, tests du § 6 de `R-UX-LONG.md`.

| Famille | Mise en page actuelle | Conflit à traiter avant d'ajouter la colonne | Coût de largeur à 1 440 px |
|---|---|---|---|
| Guides | Colonne de texte `max-w-4xl mx-auto` (centrée) | Aucun élément collant ; recentrer la colonne à gauche de la zone ou l'élargir | Faible : 896 px de texte restent possibles dans 936 px |
| Fiches machines | `max-w-7xl`, grilles 12 et 5 colonnes ; colonne FAQ collante (`sticky top-32`) | Colonne FAQ collante à 128 px : deux colonnes collantes à droite | 1 232 → 936 px sur toutes les sections (grilles à revoir) |
| Articles dédiés sans sommaire | Colonnes `max-w-4xl` et `max-w-5xl` | Aucun | Faible à moyen (tableaux du comparatif : à mesurer) |
| IA photo produit | `max-w-7xl`, grilles 12 et 5 colonnes ; 2 éléments `sticky top-32` | Éléments collants à 128 px | 1 232 → 936 px |
| Solutions | `max-w-7xl`, grilles 5 et 3 colonnes ; 3 éléments `sticky top-32` | Éléments collants à 128 px | 1 232 → 936 px |
| Conversations | Colonnes `max-w-2xl` à `max-w-5xl` ; sommaire repliable sous 1 024 px déjà présent | Inscription au registre | Faible |

Rappel de D44 (contexte) : la variante latérale avait été écartée sur Mode parce qu'elle ramène le contenu de 1 232 à 928 px à 1 440 px. Sur Studios, la colonne V9 le ramène à 936 px à partir de 1 280 px ; de 1 024 à 1 279 px, le sommaire vertical est rendu repliable dans le flux et la largeur est conservée.

---

## 3. Pages à sommaire latéral (forme B) : ce que demanderait la barre

| Famille | Pages au 16/10 | État | Ce que V9 ajouterait |
|---|---|---|---|
| `blog-commun` (`app/[lang]/blog/[slug]/page.tsx`) | 148 pages HTML portent la liste latérale (FR 71, EN 65, de-ch 12) | Colonne de droite `sticky top-24`, repliable sous 1 024 px | La barre horizontale sur les articles longs (C1, C2 à mesurer article par article) ; la colonne descend alors sous la barre (`top-24` → hauteur en-tête + barre) |
| `blog-dedie-avec-sommaire` | 6 gabarits dédiés (leurs versions linguistiques sont comprises dans les 148) | HOLD (registre) | Idem, après levée du HOLD |

Le correctif du composant partagé (`TableOfContents`) s'applique déjà à ces pages ; les props ajoutées le 16/10 (`actif`, `libelle`, `classeListe`) sont facultatives et ne changent ni leur HTML ni leur comportement (contrôles : comparaison HTML et `e2e/sommaire-blog.spec.ts`).

---

## 4. Pages gelées ou exclues : aucun déploiement

| Page | Motif | Jusqu'au |
|---|---|---|
| Mode `/packshot-mode` et hub `mode-textile` | Mesure Mode (D39) | 26/11/2026 |
| F5 `/packshot-e-commerce` | Mesure F5 (D37), choix délibéré sans élément collant | 23/11/2026 |
| Accueil | Mesure M5 | 28/10/2026 |
| Studios EN et de-ch | Gabarit transitoire, sections sans `id` (arbitrage P2 du 16/10) | Traduction de la landing FR validée (D42, étape 7) |
| Familles `aucune` (pages courtes, listes, outils, légales, `industrie-defense`) | Critères C1/C2 non atteints ou D10 | Réévaluation si la page change |

---

## 5. Défaut latent relevé pendant la mise en œuvre

Section active de la barre : une section posée par un clic finit à une position fractionnaire (mesuré le 16/10 sur Studios : 129,375 px pour un seuil de 129 px) et la barre affiche encore la section précédente. Le défaut existe sur toutes les pages à barre ; il recoupe peut-être la réserve du 07/10 de `R-UX-LONG.md` § 3.1 (surbrillance parfois décalée), non arbitrée.

- Studios FR : tolérance d'arrivée de 1 px activée par `NavigationSections` (prop `tolerance` de `SommaireCollant`).
- Autres pages : **inchangées** (`tolerance` vaut 0 par défaut). Correction générale proposée, à valider avec la réserve du 07/10.

---

## 6. Ordre proposé, à valider

1. Correction générale de l'arrondi (§ 5), seule, avec la réserve du 07/10.
2. Guides et articles dédiés : pas d'élément collant concurrent, faible coût de largeur.
3. Conversations : inscription au registre, puis sommaire vertical.
4. Blog commun : barre sur les articles longs, colonne existante descendue sous la barre.
5. Fiches, IA photo produit, solutions : après décision sur les colonnes collantes à 128 px et sur la largeur des grilles.
6. Mode et F5 : après leur mesure (26/11 et 23/11), décision de Laurent.

Chaque lot : mesures C1/C2 sur build local, tests du § 6 de `R-UX-LONG.md`, comparaison HTML des pages hors lot, QA Preview aux 7 largeurs.
