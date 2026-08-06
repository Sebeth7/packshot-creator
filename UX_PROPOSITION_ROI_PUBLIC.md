# Calculateur ROI conversationnel — proposition UX/UI du mode client (public)

**Statut : proposition à valider par Seb — cadrage du chantier public (remplacement du wizard).**
Demandes actées le 06/08 : PDF téléchargeable contre email (comme le wizard), transparence
IA vs calculs codés en dur, expérience niveau grands comptes, pédagogie et réponses aux questions.

---

## 1. Positionnement : un « conseiller ROI », pas un chatbot

Le piège à éviter : la bulle de chat générique qui crie « gadget IA ». Pour des grands comptes,
l'outil doit ressembler à ce qu'il est : **un outil d'aide à la décision d'investissement**, animé
par une conversation.

- Pas de widget flottant : une **page de consultation dédiée**, pleine largeur, même standing
  qu'un configurateur premium.
- Accueil : une phrase de cadrage (« Décrivez votre production photo, notre conseiller construit
  votre analyse de rentabilité personnalisée »), 3 exemples de situations cliquables pour amorcer,
  et l'encart de transparence (cf. §3).
- Ton de l'IA : vouvoiement, sobre, expert — le style rédactionnel du site, pas de sur-enthousiasme.

## 2. Layout : conversation + dossier vivant (le cœur de la proposition)

Desktop en deux volets — c'est ce qui différencie une consultation d'un chat :

```
┌────────────────────────────────────────┬──────────────────────────────┐
│  CONVERSATION (≈60 %)                  │  VOTRE DOSSIER (≈40 %)       │
│                                        │                              │
│  Assistant : « Quel volume annuel      │  ✓ Secteur : cosmétique      │
│  visez-vous ? »                        │  ✓ Volume : 2 000/an         │
│                                        │  ✓ Contenu : packshot, 360°  │
│  [ ~500 ] [ ~2 000 ] [ ~10 000 ]       │  ○ Situation actuelle…       │
│  [ je précise en toutes lettres… ]     │  ○ Financement…              │
│                                        │                              │
│  ────────────────────────────────      │  ── RÉSULTATS (épinglés) ──  │
│  ⚙ Calcul par le moteur ROI…           │  [HeroMetrics] [Graphique]   │
│                                        │  [Break-even timeline]       │
│  Champ de saisie libre                 │  📄 Recevoir mon analyse PDF │
└────────────────────────────────────────┴──────────────────────────────┘
```

- **Panneau « Votre dossier »** : chaque information captée s'y matérialise en temps réel
  (cliquable pour corriger → l'IA reprend la donnée). Le client VOIT que la conversation
  construit quelque chose — c'est la réassurance du wizard (progression) dans la souplesse du chat.
- **Résultats épinglés** dans le panneau : ils survivent au défilement de la conversation,
  se mettent à jour à chaque recalcul (comparaisons possibles).
- Mobile : le dossier devient un tiroir dépliable au-dessus du champ de saisie, résultats en
  cartes plein écran.

## 3. Transparence : IA conversationnelle, calculs déterministes

Exigence actée : le client sait qu'il parle à une IA ET que les chiffres ne sortent pas de l'IA.

- **Badge permanent** en tête : « Conseiller virtuel PackshotCreator — assistant IA ».
- **Encart au premier résultat** (puis rappel discret sous chaque bloc de chiffres) :
  > « Les montants affichés ne sont pas générés par l'intelligence artificielle. L'IA recueille
  > vos informations ; les calculs sont exécutés par le moteur de calcul PackshotCreator
  > (règles déterministes et vérifiées, identiques pour tous les clients). »
- Chaque carte de résultat porte un badge `⚙ Calculé par le moteur ROI` + un lien
  « Comment ce chiffre est-il calculé ? » ouvrant la **méthodologie** (réutiliser MethodologyModal
  du wizard) avec les hypothèses du dossier affichées noir sur blanc.
- Pendant le calcul : état visuel distinct du « l'IA écrit » → « ⚙ Calcul par le moteur ROI… »
  (le client voit la séparation des rôles en action).

## 4. Guidage hybride : jamais un interrogatoire, jamais une page blanche

- **Chips de réponse rapide** sous chaque question de l'assistant (volumes types, types de contenu,
  achat/leasing) — un clic répond ; le champ libre reste toujours disponible.
- L'utilisateur pressé colle un paragraphe entier → l'IA capte tout, le dossier se remplit d'un coup.
- **Questions du client bienvenues à tout moment** (specs machines, méthodologie, délais) :
  l'assistant répond puis ramène élégamment vers l'analyse — périmètre déjà cadré par le CDC.
- Hors périmètre (SAV, juridique, prix d'achat directs) : réponse courtoise + **CTA humain**
  (« Je vous propose de voir cela avec un expert — être recontacté »), jamais de mur.

## 5. Résultats & pédagogie

- Réutiliser les composants validés (HeroMetrics, EvolutionChart, BreakEvenTimeline) — déjà
  fait techniquement dans le chat interne.
- Chaque métrique a un « ? » : explication en une phrase + renvoi méthodologie.
- **Hypothèses toujours visibles** sous les résultats (« Base : 230 j ouvrés/an, coût employeur
  4 000 €/mois, scénario prestataire 50 €/photo — modifier »), cliquables pour recalculer.
- Baselines contrefactuelles étiquetées (déjà verrouillé moteur) : « par rapport à un scénario
  prestataire à X €/photo » — la transparence EST l'argument face à un grand compte.

## 6. PDF et capture d'email (parité wizard, exigence actée)

- Au premier résultat complet : bouton **« Recevoir mon analyse en PDF »** → champ email
  (+ opt-in recontact), puis téléchargement immédiat + envoi du résumé par email.
- Pipeline identique au wizard : contact + deal Pipedrive stage « Calculs ROI » + **résumé
  qualifié de la conversation dans la note CRM** (décision CDC §2) + attribution first-touch.
- PDF côté client (generatePDF existant) enrichi : hypothèses du dossier + mention moteur.
- RGPD lisible : « Sans email, rien n'est conservé à la fin de votre session. »

## 7. Finitions « grands comptes »

- **Charte graphique stricte** (CHARTE_GRAPHIQUE.md) : Very Peri/Future Dusk, warm white pour
  les zones résultats, Inter pour les titres — zéro esthétique « chatbot SaaS violet générique ».
- Micro-interactions sobres : streaming du texte fluide, transitions des cartes, aucun confetti.
- États soignés : latence annoncée (« analyse en cours, ~15 s »), erreurs élégantes avec reprise,
  reconnexion transparente.
- Réassurance : badge « Orbitvu Official Partner », « vos données restent en Europe »,
  lien méthodologie public.
- FR impeccable d'abord ; architecture tri-locale prête pour EN/DE-CH (mécanique existante).
- Accessibilité : navigation clavier complète, contrastes AA, focus visibles.

## 8. Découpage proposé du chantier public

1. **Layout deux volets + dossier vivant** (nouveau composant, state partagé avec le fil).
2. **System prompt public** (registre client permanent : vendeur mais juste, jamais
   d'auto-sabotage — règle Seb du 06/08 ; réorientation gains qualité/agilité si ROI cash faible).
3. **Transparence** : badges, encart, états moteur, MethodologyModal branchée.
4. **Chips + hypothèses éditables** (aller-retour dossier ↔ conversation).
5. **Email → PDF → Pipedrive + transcript** (réutilisation roi-pdf).
6. **Anti-abus** : rate limiting déjà en place + cap tokens/session + budget mensuel d'alerte.
7. Bascule `/calculateur-roi` (remplacement direct, GO Seb) + route Worker CF.
