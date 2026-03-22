# Recherche factuelle : Orbitvu / PackshotCreator / BlendAI

> Date de collecte : 22 mars 2026
> Agent : Recherche documentaire (sources internes + web)

---

## 1. GAMME ORBITVU 2025-2026

### 1.1 Vue d'ensemble

Orbitvu est un fabricant polonais de studios photo automatises. Plus de 150 employes, 4 000 m2 d'installations de production en Europe. PackshotCreator (societe Sysnext) est le distributeur exclusif Orbitvu pour la France et la Suisse francophone depuis 2023.

La gamme actuelle comprend **16 systemes** repartis en 5 categories de taille.

Source interne : `components/calculators/ROICalculator/lib/machines.ts`

---

### 1.2 Gamme Petits Produits (< 30 cm)

| Modele | Prix HT | Capacite/jour | Taille max produit | Poids max | Fonctions | Automatisation |
|--------|---------|---------------|-------------------|-----------|-----------|----------------|
| Alphashot 360 | 12 450 EUR | 200 | 30x30x30 cm | 3 kg | Packshot, 360 | Full-auto |
| Alphashot Micro Pro v2 | 15 450 EUR | 200 | 18x15x16 cm | 1 kg | Packshot, 360, Video | Full-auto |
| Alphashot G2 | 15 450 EUR | 200 | 30x30x30 cm | 3 kg | Packshot, 360, Video | Full-auto |
| **Alphashot Pro G2** | **20 450 EUR** | **250** | **35x35x40 cm** | **10 kg** | **Packshot, 360, Video** | **Full-auto (IA)** |

**Alphashot Pro G2 - Details techniques (best-seller)**
- Premier studio photo dote d'intelligence artificielle au monde
- 74 sources lumineuses virtuelles (37 panneaux LED, chacun avec 2 sections independantes)
- Controle individuel : intensite 0-100% par pas de 1%, temperature couleur 3200-6500K, CRI > 95
- IA Photo Assistant : detecte forme, matiere, brillance, transparence du produit et propose les reglages optimaux
- Plateau tournant motorise de 60 cm avec encodeur pour precision de positionnement
- Laser de centrage integre
- Auto-calibration
- Temps par produit : environ 2 minutes
- Dimensions du studio : 112 x 71 x 72 cm, poids 48 kg
- Formats export : JPEG, PNG, TIFF, AVIF, WEBP (images), HTML5 (360), MP4 (video)
- Financement a partir de 344 EUR/mois (leasing)

Sources : [Orbitvu Alphashot Pro G2](https://orbitvu.com/product/alphashot-pro-g2/), [PackshotCreator Alphashot G2](https://packshot-creator.com/en/photo-studio/alphashot-g2), [Orbitvu NL](https://orbitvu.nl/en/machines/alphashot-pro-g2/)

**Alphashot Micro Pro v2 - Specialiste bijouterie**
- Specialise bijoux, montres, pierres precieuses
- IQ Mask (detourage automatique)
- Macro et Super Focus (focus stacking) pour les details fins
- Dimensions studio : 83 x 52 x 72 cm (se pose sur un bureau)

Source : [Orbitvu Alphashot Micro v2](https://orbitvu.com/product/alphashot-micro-v2/)

---

### 1.3 Gamme Produits Moyens (30-60 cm)

| Modele | Prix HT | Capacite/jour | Taille max produit | Poids max | Fonctions | Automatisation |
|--------|---------|---------------|-------------------|-----------|-----------|----------------|
| Alphashot XL v2 | 18 950 EUR | 200 | 50x30x70 cm | 25 kg | Packshot, 360, Video | Semi-auto |
| Alphashot XL Wine v2 | 20 450 EUR | 200 | Bouteilles vin/spiritueux | 5 kg | Packshot, 360, Video | Full-auto |
| Alphashot XL Pro v2 | 22 450 EUR | 200 | 50x70x30 cm | 25 kg | Packshot, 360, Video | Full-auto |

**Alphashot XL v2**
- Polyvalent pour chaussures, sacs, jouets, electronique
- Support multi-cameras (jusqu'a 5 cameras simultanees)
- Kit suspension optionnel pour prises de vue en levitation
- Eclairage : 6 panneaux LED haute puissance, controle individuel
- Dimensions studio : 142 x 87 x 176 cm (au sol)

**Alphashot XL Wine v2**
- Specialise bouteilles de vin et spiritueux
- Eclairage optimise pour le verre et les etiquettes
- Elimination des reflets indesirables
- Restitution fidele des couleurs de robe et d'etiquettes

**Alphashot XL Pro v2**
- Version professionnelle avec eclairages coulissants
- Laser de centrage + portes coulissantes des deux cotes
- Controle multi-cameras (jusqu'a 5 simultanees)

Source interne : `machines.ts`, Source web : [Orbitvu Alphashot XL](https://orbitvu.com/product/alphashot-xl/)

---

### 1.4 Gamme Flat-Lay (Vue de dessus)

| Modele | Prix HT | Capacite/jour | Taille max surface | Poids max | Fonctions | Automatisation |
|--------|---------|---------------|--------------------|-----------|-----------|----------------|
| Alphadesk v2 | 17 450 EUR | 300 | 85x70x5 cm | 10 kg | Packshot, Flat-lay, Video | Semi-auto |
| Alphatable v2 | 46 450 EUR | 300 | 165x112x5 cm | 80 kg | Packshot, Flat-lay, Video | Full-auto |

**Alphadesk v2**
- Specialise vetements a plat, tissus, accessoires, objets plats
- Boutons de capture instantanee physiques
- Outils Ghost Image pour alignement parfait
- Detourage immediat pour textile
- Dimensions studio : 137 x 123 x 155 cm (bureau)

**Alphatable v2**
- Grand format : manteaux, robes, tapis, carrelage, tissus d'ameublement
- Guidage laser pour positionnement precis
- Zoom motorise via logiciel
- Dimensions studio : 338 x 191 x 268 cm (au sol, environ 8-10 m2)

---

### 1.5 Gamme Grands Produits (60-150 cm)

| Modele | Prix HT | Capacite/jour | Taille max produit | Poids max | Fonctions | Automatisation |
|--------|---------|---------------|-------------------|-----------|-----------|----------------|
| Alphastudio Compact Pro v2 | 36 350 EUR | 180 | 100x70x190 cm | 100 kg | Packshot, 360, Video | Full-auto |
| Alphastudio XXL Pro v2 | 45 450 EUR | 150 | 100x70x190 cm | 100 kg | Packshot, 360, Video, Ghost mannequin, Lifestyle | Full-auto |

**Alphastudio Compact Pro v2**
- Valises, petits meubles, sacs, outils
- Magic Table pour suspendre les objets sans fond visible
- Charge admissible 100 kg sur plateau tournant
- Dimensions studio : 178 x 136 x 183 cm (espace studio ~4-5 m2)

**Alphastudio XXL Pro v2**
- Solution tout-en-un pour la mode : plat, ghost, porte
- 5 types de contenu : packshot, 360, video, ghost mannequin, lifestyle
- Mannequins vivants possibles
- Eclairage LED surdimensionne (qualite impression)
- Detourage automatique IQ-Mask meme pour modeles
- Plateau tournant motorise de 120 cm de diametre
- Dimensions studio : 277 x 190 x 273 cm (8-10 m2)
- Produits jusqu'a 190 cm de haut, 100 cm de large

Sources : [Orbitvu Alphastudio XXL](https://orbitvu.com/product/alphastudio-xxl/), [PackshotCreator Alphastudio XXL](https://packshot-creator.com/en/photo-studio/alphastudio-xxl), [PackshotCreator Alphastudio Compact](https://www.packshot-creator.com/en/photo-studio/alphastudio-compact)

---

### 1.6 Gamme Tres Grands Produits (> 150 cm)

| Modele | Prix HT | Capacite/jour | Taille max | Poids max | Fonctions | Specialisation |
|--------|---------|---------------|-----------|-----------|-----------|----------------|
| Fashion Studio Basic | 56 450 EUR | 80 | Mannequin taille reelle | N/A | Packshot, 360, Video, Ghost, Lifestyle | Mode portee |
| Fashion Studio Pro v2 | 84 450 EUR | 100 | Espace scenique 3x3 m | 200 kg/m2 | Packshot, 360, Video, Ghost, Lifestyle | Mode portee pro |
| Bike Studio | 89 450 EUR | 70 | 200x100x200 cm | 35 kg | Packshot, 360, Video | Velos/Cycles |
| Furniture Studio | 119 450 EUR | 60 | 250x200x180 cm | 500 kg | Packshot, 360, Video | Mobilier XXL |
| E-Comm Studio+ | 150 000 EUR | 150 | 300x300x200 cm | 1 000 kg (option 4 t) | Packshot, 360, Video | Industriel |

**Fashion Studio Pro v2**
- Miroir virtuel pour interaction mannequin
- Kick lights pour effets de mode
- Espace scenique 3x3 m (9 m2)
- Emprise totale : 847 x 301 x 292 cm (>30 m2)

**Bike Studio**
- Unique solution mondiale specialisee velos
- Systeme de suspension brevete (velo en l'air, pas de support visible)
- 12 panneaux LED totalisant 190 000 lumens
- Support multi-cameras (jusqu'a 5)

**Furniture Studio**
- Plateau tournant haute capacite 500 kg
- Dimensions studio : 500 x 400 x 300 cm (25-30 m2)
- Ideal canapes, lits, armoires

**E-Comm Studio+**
- Plateforme rotative de 5 m de diametre
- 1 tonne de charge (option 4 tonnes)
- Puissance electrique 9 000 W
- Dimensions studio : 670 x 588 x 302 cm (40-50 m2)

---

### 1.7 Logiciels Orbitvu

#### Orbitvu Station (logiciel desktop, inclus avec chaque machine)
- Application desktop de capture et post-production
- Controle synchronise camera + eclairage + plateau tournant
- **IQ MASK 2** : Detourage automatique de l'arriere-plan (background removal instantane)
- **SuperFocus** (focus stacking) : etend la profondeur de champ sans perte de qualite
- **Focus Peaking** : visualisation en temps reel de la zone de mise au point
- Edition non destructive (images originales preservees, effets appliques a la volee)
- Export multi-formats : JPEG, PNG, PSD (calques), BMP, GIF, TIFF, MP4, MOV
- Publication multi-destinations (local + online simultane)
- Naming patterns personnalises, recadrage, alignement
- Ajout reflection ou ombre portee en post-production
- Integration e-commerce directe via plugins : Magento, PrestaShop, WooCommerce, Shopware, Shopify
- Scan code-barres pour workflow automatise

Source : [Orbitvu Station](https://orbitvu.com/software/orbitvu-station/)

#### Orbitvu Sun (plateforme cloud)
- Hebergement et distribution de contenus 360 et images
- Embed codes ultra-legers (2 kB) pour integration web
- Viewer HTML5 integre (pas de telechargement necessaire)
- Deep Zoom et chargement dynamique des fragments d'images
- Compatible PC, tablette, mobile
- Personnalisation du viewer (branding custom)
- Gestion des assets : 2D, 360/3D, videos, Orbittours
- Integration automatique avec les e-shops
- Compatible Facebook, Twitter et reseaux sociaux

Source : [Orbitvu Sun Cloud](https://orbitvu.co/), [Orbitvu 360 Guide](https://orbitvu.com/blog/360-product-photography-ultimate-guide/)

#### Orbitvu Viewer (visionneuse)
- Visionneuse HTML5 pour presentations 360
- Telechargement selectif des fragments d'image (ultra-rapide)
- Personnalisation de l'apparence (licence viewer custom)
- Compatible avec tous les navigateurs modernes

---

## 2. BLENDAI.STUDIO

### 2.1 Description

BlendAI.studio est la solution propriétaire d'IA photo produit developpee par PackshotCreator. Ce n'est PAS un outil generique : c'est une plateforme developpee et amelioree en continu par l'equipe PackshotCreator.

### 2.2 Philosophie / Positionnement

- **"L'IA ne remplace pas la photo, elle la prolonge"**
- Part d'un packshot professionnel de qualite studio (idealement Orbitvu) comme base
- L'IA ne touche JAMAIS au produit : elle cree le decor autour
- Fidelite produit 100% — zero hallucination
- Textures, couleurs, proportions : identiques a la photo originale
- Conforme aux exigences luxe, cosmetiques, bijouterie

### 2.3 Comparaison avec la concurrence (selon le site)

| | IA generative pure (Photoroom, Claid, Flair, Pebblely) | Packshot pro + IA (BlendAI.studio) |
|---|---|---|
| Methode | Genere le produit de zero | Part d'un packshot studio |
| Fidelite | Approximations possibles | Fidelite 100% |
| Hallucinations | Possibles sur les details | Zero |
| Verification | Humaine necessaire a chaque visuel | Automatisee |
| Cible | Prototypes, e-commerce basique | Fabricants, marques >500 visuels/an |

### 2.4 Fonctionnalites

1. **Mises en scene lifestyle** : Transforme un packshot en visuel lifestyle contextualise (interieur, exterieur, ambiance). Le produit reste intact.
2. **Arrieres-plans sur mesure** : Fonds professionnels adaptes a la marque et au canal de diffusion.
3. **Retouche IA + experte** : Corrections automatiques (couleurs, defauts) + retouche humaine pour les cas complexes (bijoux, lunettes, reflets). Garantie qualite.
4. **Traitement par lots** : Application d'un style a des milliers de produits en quelques minutes. Meme rendu, meme qualite, a l'echelle.

### 2.5 Specificites techniques

- **Zero complexite** : Upload, choix de style, generation. Pas de prompts, pas de competences IA requises.
- **100+ styles professionnels** : Bibliotheque de styles prets a l'emploi. Creation de styles personnalises.
- **Retouche experte incluse** : Pour produits complexes, livraison 4K en 24-72h.
- **Developpement sur mesure** : Workflows post-prod, traitements par lots personnalises, integrations API specifiques.
- **Vitesse** : Quelques secondes par image. Centaines de produits en quelques minutes en batch.

### 2.6 Tarification

- **A partir de 75 EUR/mois**
- 3 credits offerts pour tester (sans engagement)
- Offre speciale : systeme Orbitvu + 6 mois BlendAI offerts
- Un acces BlendAI inclus pendant les formations + 30 jours apres

### 2.7 Donnees de traction (du site)

- 100+ marques utilisatrices
- 5 000+ visuels crees
- Note satisfaction : 4.9/5
- Co-fondateur : Sebastien Jourdan (fondateur PackshotCreator)
- Lancement : 2024

Source interne : `messages/fr.json` section `iaPhotoProduit`, `app/[lang]/ia-photo-produit/page.tsx`

---

## 3. PACKSHOTCREATOR COMME ENTREPRISE

### 3.1 Historique

- **Fondation** : 2003 par Laurent Wainberg, via la societe Sysnext
- **Innovation** : A introduit le premier systeme de photographie automatisee de produits en Europe
- **Croissance** : Presence dans plus de 35 pays, environ 8 000 entreprises equipees historiquement (chiffre PackshotCreator originel)
- **CA 2011** : 4 millions d'euros (+11%), puis +20% l'annee suivante
- **Partenariat Orbitvu** : 2023, devient distributeur officiel Orbitvu France et pays francophones
- **BlendAI** : Lancement en 2024 de la solution IA proprietaire

### 3.2 Chiffres cles actuels (du site)

- 25 ans d'expertise (depuis 2001 pour l'activite historique, 2003 pour la marque)
- 500+ entreprises equipees (chiffre affiche actuellement)
- 3 secondes par packshot
- 60-85% de reduction des couts photo

### 3.3 Clients references (mentionnes sur le site/web)

PackshotCreator : Louis Vuitton, L'Oreal, Philips, Chanel, Amazon
Orbitvu : Bosch, Clarks, Mercedes-Benz, Seiko, Chanel, Jagermeister

### 3.4 Localisation

- **Showroom Lyon** : 22 Rue des Freres Lumiere DELTAPARK, 69720 Saint-Bonnet-de-Mure
- **Telephone** : +33 (0)1 47 42 66 66
- **Horaires** : Lun-Ven 9h-18h
- Experience Center Orbitvu a Levallois-Perret (region parisienne)

### 3.5 Offre de services

1. **Vente de studios Orbitvu** : 16 systemes, du bureau a l'entrepot industriel
2. **BlendAI.studio** : IA photo produit (SaaS)
3. **Academy certifiee Qualiopi** : Formations photo produit et IA
   - Formation Packshot Professionnel : 2 jours (14h), tous niveaux
   - Formation IA Photo Produit : 1 jour (7h), intermediaire
   - Financement OPCO jusqu'a 100%
   - Formateur : Sebastien Jourdan (20 ans d'experience, 500+ professionnels formes)
   - Clients formation : Cartier, Rolex, Van Cleef & Arpels (marques de luxe)
4. **Support technique FR** inclus avec les solutions

### 3.6 Arguments commerciaux cles (extraits du site)

**Pain points adresses :**
- Trop lent : photographe fait 30 photos/jour, concurrents en font 300
- Trop cher : 15 a 50 EUR par image en prestation externe. A 5 000 produits = 75 000 a 250 000 EUR/an
- Trop dependant : externalisation = perte de controle, delais, savoir-faire hors entreprise

**Approche hybride Hardware + IA :**
- Capture parfaite : studios Orbitvu (3 sec, 360, video, detourage auto, ombres reelles)
- Multiplication IA : BlendAI transforme 1 packshot en 10+ visuels lifestyle
- Autonomie totale : formations Qualiopi, savoir-faire internalise

**Arguments d'automatisation :**
- Resultats pro sans competences photo (1h de formation)
- Montee en volume instantanee (templates logiciels, 10x plus productif)
- Savoir-faire capitalise dans l'entreprise (independance des prestataires)

Source : `messages/fr.json` sections `home`, `iaPhotoProduit`, `formation`, `contact`

---

## 4. FOURCHETTES DE PRIX

### 4.1 Prix des systemes Orbitvu (source : machines.ts, HT)

| Segment | Fourchette | Exemples |
|---------|-----------|----------|
| Entree de gamme | 12 450 - 15 450 EUR | Alphashot 360, Alphashot G2 |
| Milieu de gamme | 17 450 - 22 450 EUR | Alphadesk, Alphashot XL, Alphashot Pro G2 |
| Grand format | 36 350 - 46 450 EUR | Alphastudio Compact, Alphatable, Alphastudio XXL |
| Mode / Specialise | 56 450 - 89 450 EUR | Fashion Studio, Bike Studio |
| Industriel | 119 450 - 150 000 EUR | Furniture Studio, E-Comm Studio+ |

**Note importante** : Les prix dans `machines.ts` sont utilises pour les calculs ROI mais ne sont PAS affiches publiquement. Le site indique "Contactez-nous pour un devis personnalise".

### 4.2 Financement

- **Leasing** : A partir de 344 EUR/mois pour l'Alphashot Pro G2 (source : page produit PackshotCreator)
- Options : leasing 36 ou 60 mois, location avec option d'achat, acquisition directe
- Cout journalier d'un studio entree de gamme : environ 15 EUR/jour sur 3 ans (221 jours ouvrables/an)
- Maintenance annuelle : 0 EUR pour toutes les machines
- Consommables annuels : 400 a 2 500 EUR selon le modele

### 4.3 Prix des prestataires photo (marche francais)

Source : [Packshot Paris](https://packshot-paris.fr/tarif-photographe-packshot-paris), [La Photo Prod](https://www.la-photo-prod.com/tarif-des-photos-packshot-comment-cela-se-calcule/)

| Type de prestation | Prix unitaire |
|-------------------|---------------|
| Photo packshot standard (fond blanc, sans difficulte) | 19 EUR HT |
| Photo packshot premium (reflets, fond couleur, eclairage sur mesure) | 29 EUR HT |
| Gros volumes (>100 photos) | A partir de 5 EUR HT/photo |
| Detourage seul | A partir de 3 EUR HT |
| Tarif horaire photographe | ~100 EUR HT/heure |
| Forfait installation studio | 75 EUR HT par seance |
| Forfait 10 photos | 149 EUR HT (1h shooting + 1h prep + 2h retouche) |

**Fourchette globale du marche** (mentionnee sur le site PackshotCreator) :
- **15 a 50 EUR par image** en prestation externe
- A 5 000 produits/an : 75 000 a 250 000 EUR/an

---

## 5. ROI ET ARGUMENTS ECONOMIQUES

### 5.1 Logique du calculateur ROI (source : calculations.ts, constants.ts)

**Constantes du modele :**
- Salaire mensuel cout employeur : 4 000 EUR (brut + charges)
- Semaines de travail/an : 46 (52 - 6 conges)
- Heures/semaine : 35h
- Jours de production/an : 230 (46 x 5)
- Duree d'amortissement : 5 ans
- Budget equipement par defaut : 3 000 EUR/an
- Taux IS : 25% (avantage fiscal amortissement)

**Methode de calcul :**

1. **Situation actuelle** : Cout employeur annuel + cout equipement + cout solution externe = cout total actuel
2. **Situation avec machine** : TCO annuel (prix machine / 5 ans + maintenance + consommables) + cout operateur reduit = cout total machine
3. **Economies** : Difference entre les deux, incluant l'avantage fiscal (amortissement deductible a 25%)
4. **Break-even** : Prix machine / (economies annuelles / 12) = nombre de mois pour rentabiliser

**Valeurs par defaut du formulaire :**
- 1 operateur, 80% du temps
- 30 photos/jour/operateur (sans machine)
- 5 000 photos/an objectif
- Budget equipement actuel : 3 000 EUR/an

### 5.2 Seuils de rentabilite (arguments du site)

| Metrique | Valeur | Source |
|----------|--------|--------|
| ROI moyen | 6-12 mois | Page d'accueil, FAQ |
| ROI gros volumes (>1 000 visuels/an) | Des le 4eme mois | FAQ |
| Reduction couts photo | 60-85% | Page d'accueil |
| Cout par image divise par | 5x | Temoignage client |
| Gain de productivite | 10x (30 -> 300 packshots/jour) | Page d'accueil |
| Gain de temps production | 65% | Temoignage client |
| Prises de vue internalisees | 90% | Temoignage client |
| Prise en main | 1 heure de formation | Arguments automation |
| Reproductibilite qualite | 100% | Arguments automation |

### 5.3 Scenarios de rentabilite types

**Scenario 1 : PME e-commerce (5 000 photos/an)**
- Machine recommandee : Alphashot Pro G2 (20 450 EUR)
- Cout actuel estime : 1 operateur x 80% x 4 000 EUR x 12 = 38 400 EUR/an + 3 000 EUR equipement = 41 400 EUR
- Cout avec machine : TCO ~4 590 EUR/an (20 450/5 + 0 + 500) + operateur reduit
- Capacite machine : 250/jour x 230 jours = 57 500 photos/an (potentiel de croissance enorme)
- Break-even : typiquement 8-12 mois

**Scenario 2 : Grand retailer (>15 000 photos/an)**
- Machine recommandee : Alphastudio XXL (45 450 EUR) ou Fashion Studio
- Cout actuel estime : prestation externe 15 000 x 20 EUR = 300 000 EUR/an
- TCO machine : ~10 090 EUR/an + operateur
- Break-even : potentiellement des le 4eme mois

**Scenario 3 : Prestation externe comparee a Alphashot 360 (entree de gamme)**
- Prix machine : 12 450 EUR
- Si 2 000 photos/an a 20 EUR/photo externalisee = 40 000 EUR/an
- TCO machine : ~2 990 EUR/an (12 450/5 + 500)
- Economie annuelle brute : ~37 000 EUR (hors operateur)
- Break-even : <6 mois

### 5.4 Cout moyen par photo : interne vs externe

| Mode | Cout moyen par photo |
|------|---------------------|
| Prestataire externe (petits volumes) | 19-50 EUR |
| Prestataire externe (gros volumes) | 5-15 EUR |
| Studio automatise Orbitvu (amorti) | 0,50-3 EUR |
| Photographe interne sans automatisation | 5-15 EUR |

Le calculateur ROI du site permet une estimation personnalisee basee sur les donnees reelles de l'utilisateur.

Source : `components/calculators/ROICalculator/lib/calculations.ts`, `constants.ts`, `messages/fr.json`

---

## 6. DONNEES SUPPLEMENTAIRES POUR LES ARTICLES

### 6.1 Statistiques e-commerce et photo produit

(Mentionnees dans le site PackshotCreator) :
- Packshots de qualite augmentent le taux de conversion de 30% en moyenne
- Packshots de qualite reduisent les retours produit de 22%
- Un packshot est le premier contact visuel entre le produit et le client

### 6.2 Formats de contenu supportes

- **Packshot** (photo fond blanc/couleur)
- **Vue 360** (rotation interactive HTML5)
- **Video** (MP4, MOV)
- **Ghost mannequin** (vetement sans mannequin visible)
- **Flat-lay** (vue de dessus)
- **Lifestyle** (mise en scene)

### 6.3 Sectors couverts (12 secteurs dans le site)

Chaussures, Bijoux et Joaillerie, Mobilier et Deco, Food et Alimentaire, Cosmetiques et Beaute, Mode et Textile, Electronique et High-Tech, Pieces Techniques, Vins et Spiritueux, Optique et Lunetterie, Sport et Outdoor, Objets d'Art.

Deux secteurs supplementaires a creer : Industrie, Defense.

### 6.4 Integration e-commerce

Orbitvu Station supporte l'export direct vers : Magento, PrestaShop, WooCommerce, Shopware, Shopify.
Orbitvu Sun permet l'embed 360 avec codes de 2 kB seulement.
