# Rapport Intermediaire S5A - Tests 1 a 5

**Date** : 8 fevrier 2026
**Environnement** : localhost:3333, Chrome MCP browser automation
**Modele** : Claude Opus 4.6

---

## Resume intermediaire
- Tests passes : **5/5**
- Bugs trouves : **0**
- Bugs corriges : **0**

---

## Detail par test

### TEST 1 : Cookie Banner - PASS

**URL** : `http://localhost:3333/fr`

| Critere | Resultat |
|---|---|
| Banner s'affiche au premier chargement | OK |
| "Tout accepter" ferme le banner + GA4 charge | OK - gtag/js G-3SDSW22JWZ charge, `window.gtag` et `window.dataLayer` actifs |
| "Tout refuser" ferme le banner + GA4 absent | OK - 0 scripts GA4, pas de `window.gtag` ni `dataLayer` |
| "Personnaliser" ouvre les options detaillees | OK - 3 categories (Essentiels toujours actif, Analytiques, Marketing) |
| Cookie persiste apres rechargement | OK - banner ne reapparait pas |
| "Gerer les cookies" dans le footer reouvre le banner | OK - banner se reouvre correctement |
| Pas de debordement visuel | OK |

**Bugs** : Aucun

---

### TEST 2 : Formulaire de Contact (Pipedrive) - PASS

**URL** : `http://localhost:3333/fr/contact`

| Critere | Resultat |
|---|---|
| Formulaire Pipedrive charge | OK - iframe WebForms Pipedrive charge |
| Champs visibles et interactifs | OK - Prenom*, Nom*, E-mail*, Entreprise*, Telephone, Secteur*, Message, Confidentialite*, Newsletter* |
| Responsive | Non teste (sera teste en TEST 8) |
| Informations de contact visibles | OK - telephone, horaires, Google Maps iframe showroom |
| CTA "Demander une demo" du header mene a /contact | OK |
| FAQ contact | OK - 3 questions/reponses |

**Limitation** : Le formulaire est dans une iframe Pipedrive cross-origin (`webforms.pipedrive.com`). Impossible de tester les validations de champs via JS depuis la page parente. Le parametre `?subject=demo` n'est pas applicable (iframe externe).

**Bugs** : Aucun

---

### TEST 3 : CTA principaux - PASS

**URL** : `http://localhost:3333/fr`

| CTA | Destination attendue | Resultat |
|---|---|---|
| "Demander une demo" (header) | /fr/contact | OK |
| "Demander une demo gratuite" (hero) | /fr/contact | OK - navigation confirmee |
| "Decouvrir nos studios" (hero) | /fr/studios-photo-automatises | OK - href verifie via JS |
| "Decouvrir toutes les industries" | /fr/industrie | OK - href verifie via JS |

**Note** : Les CTA des autres pages (Studios, IA, Academy, Fiches machines) n'ont pas ete testes exhaustivement dans ce test. Les pages studios et fiches machines ont ete verifiees partiellement lors du TEST 4.

**Bugs** : Aucun

---

### TEST 4 : Calculateur ROI (Parcours Complet) - PASS

**URL** : `http://localhost:3333/fr/studios-photo-automatises` (section ROI)

**Note** : Pas de page dediee `/fr/calculateur-roi` (404). Le calculateur est integre dans la page studios.

| Etape | Critere | Resultat |
|---|---|---|
| Step 1/3 "Situation actuelle" | Sliders : operateurs, cout, % temps, prestataire, photos/jour | OK - tous les sliders reagissent |
| Step 2/3 "Objectifs de production" | Photos/an, budget, taille produit (4 options) | OK - 4 tailles selectionnables |
| Step 3/3 "Votre analyse ROI" | Resultats affiches | OK |
| Metriques | Temps/photo, jours production, capacite annuelle | OK - 15min->5min (-85%), 167->25j (-142j), 5520->46000 (+820%) |
| Break-even | Timeline et projections financieres | OK - 8 mois, +5 360 EUR An 1, +121 550 EUR An 5 |
| Machine recommandee | Affichage avec details | OK - Alphashot XL v2, ROI 641% |
| Email capture | Formulaire "Recevoir le PDF" | OK - champ email present dans le DOM |

**Bugs** : Aucun

---

### TEST 5 : Simulateur OPCO - PASS

**URL** : `http://localhost:3333/fr/academy/simulateur-opco`

| Etape | Critere | Resultat |
|---|---|---|
| Step 1/4 "Profil" | 8 situations professionnelles | OK - "Salarie(e) en CDI" selectionne |
| Step 2/4 "Entreprise" | Effectif, Secteur, Cotisations | OK - "Moins de 11 salaries" -> message vert TPE, "E-commerce", cotisations "Oui" |
| Step 3/4 "Formation" | 6 formations, pertinence, modalite, badge Qualiopi | OK - "Packshot Initiation" (1200 EUR, 14h), "Oui directement lie", "Sur temps de travail" |
| Step 4/4 "Resultat" | Eligibilite + details financement | OK |
| Resultat eligibilite | Message de succes | OK - "Vous etes eligible au financement OPCO !" |
| OPCO identifie | Nom de l'OPCO | OK - "OPCO Entreprises de Proximite" |
| Montant financement | Prise en charge + reste a charge | OK - 1 200 EUR (100%), reste 0 EUR |
| Prochaines etapes | Guide etape par etape | OK - 6 etapes avec delais |
| Formulaire lead | Capture coordonnees | OK - Prenom*, Nom*, Email pro*, Telephone, Entreprise |
| Lien OPCO externe | Lien vers site OPCO | OK - "Visiter le site de OPCO Entreprises de Proximite" |
| Recommencer | Bouton reset | OK - "Recommencer la simulation" |

**Bugs** : Aucun

---

## Bilan intermediaire

Les 5 premiers tests sont **tous passes sans bug**. Les composants interactifs principaux (cookie banner, formulaire contact, CTA, calculateur ROI, simulateur OPCO) fonctionnent correctement.

**A tester ensuite (tests 6-10)** :
- TEST 6 : Selecteur de Machines
- TEST 7 : Switch de Langue FR/EN
- TEST 8 : Navigation Mobile (375px)
- TEST 9 : Liens Externes
- TEST 10 : Ancres (#)
