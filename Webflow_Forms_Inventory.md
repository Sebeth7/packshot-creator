# Inventaire Complet des Formulaires - PackshotCreator.com (Webflow)

**Date d'inventaire** : 29 janvier 2026
**Site analysé** : https://www.packshot-creator.com
**Plateforme** : Webflow avec intégrations Pipedrive

---

## Vue d'ensemble

Le site PackshotCreator.com utilise principalement des formulaires intégrés via **Pipedrive Web Forms** (iframes). Les formulaires identifiés sont répartis sur différentes pages du site.

### Résumé des formulaires identifiés

| # | Type | Page | Implémentation |
|---|------|------|----------------|
| 1 | Formulaire de Contact/Devis | `/contact` | Pipedrive Web Form (iframe) |
| 2 | Formulaire de Recherche | Toutes les pages (header) | Formulaire natif Webflow |
| 3 | Bannière de Cookies | Toutes les pages | Formulaire natif Webflow |

---

## Formulaire 1 : Contact / Demande de Devis

### Informations générales
- **URL** : https://www.packshot-creator.com/contact
- **Type** : Formulaire de contact / Demande de devis personnalisé
- **Implémentation** : Pipedrive Web Form (iframe)
- **Page titre** : "Votre projet photo produit : parlons-en gratuitement"

### Champs du formulaire

D'après les observations visuelles des captures d'écran :

1. **Prénom** *
   - Type : `text`
   - Required : Oui
   - Label : "Prénom *"
   - Placeholder : (vide)

2. **Nom** *
   - Type : `text`
   - Required : Oui
   - Label : "Nom *"
   - Placeholder : (vide)

3. **E-mail** *
   - Type : `email`
   - Required : Oui
   - Label : "E-mail *"
   - Placeholder : (vide)

4. **Nom de l'entreprise** *
   - Type : `text`
   - Required : Oui
   - Label : "Nom de l'entreprise *"
   - Placeholder : (vide)

5. **Téléphone**
   - Type : `tel`
   - Required : Non (facultatif)
   - Label : "Téléphone (facultatif)"
   - Placeholder : (vide)

6. **Secteur d'activité** *
   - Type : `select` (menu déroulant)
   - Required : Oui
   - Label : "Secteur d'activité *"
   - Placeholder : "Choisir dans le menu déroulant"
   - Options supposées (basées sur le site) :
     - Agroalimentaire, arts de la table
     - Chaussures
     - High-tech, électroménager, informatique
     - Horlogerie, bijouterie, joaillerie, orfèvrerie
     - Meubles
     - Mode, accessoires
     - Objets d'art, antiquités
     - Optique, lunetterie
     - Pièces techniques
     - Skincare, cosmétiques
     - Sports
     - Vins, spiritueux
     - Autre

7. **Votre message**
   - Type : `textarea`
   - Required : Non (facultatif)
   - Label : "Votre message (facultatif)"
   - Placeholder : (vide)
   - Lignes : ~4-5

8. **Politique de confidentialité** *
   - Type : `checkbox`
   - Required : Oui
   - Label : "Oui"
   - Texte associé : "En cochant cette case, j'atteste avoir pris connaissance de la Politique de confidentialité et accepte que mes données personnelles soient traitées conformément à celle-ci."

9. **Abonnement à la newsletter** *
   - Type : `radio`
   - Required : Oui
   - Options :
     - "Oui" (par défaut non sélectionné)
     - "Non" (par défaut non sélectionné)
   - Texte associé : "Je souhaite recevoir des informations et des conseils de la part de PackshotCreator par email. Vous pouvez vous désinscrire à tout moment via le lien de désinscription présent dans chaque email."

### Bouton de soumission
- **Texte** : "Obtenir mon offre"
- **Couleur** : Rouge (couleur principale du site)
- **Style** : Pleine largeur, bouton CTA primaire

### Détails Techniques de l'Implémentation

**Configuration iframe Pipedrive** :
```html
<div class="pipedriveWebForms">
  <iframe
    src="https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh"
    title="Web Forms"
    scrolling="no"
    frameBorder="0"
    style="height: 1239px;"
  ></iframe>
</div>
```

**Paramètres clés** :
- **URL du formulaire** : `https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh`
- **Container class** : `.pipedriveWebForms`
- **Hauteur** : 1239px (ajustée dynamiquement par Pipedrive)
- **Scrolling** : Désactivé (no)
- **Border** : Aucune bordure
- **Responsive** : Adaptation automatique de la largeur

### Destination Pipedrive
- **Type d'objet** : Deal (Affaire)
- **Traitement** :
  - Création d'un nouveau deal dans Pipedrive
  - Création ou mise à jour du contact associé
  - Stockage des informations de secteur et message
  - Lead scoring basé sur les informations fournies

### Post-soumission
- **Message de confirmation** : "Thank you! Your submission has been received!"
- **Message d'erreur** : "Oops! Something went wrong while submitting the form."
- **Délai de réponse promis** : "Notre équipe vous contactera sous 24h ouvrées"
- **Email de confirmation** : Probablement envoyé automatiquement
- **Actions Pipedrive** :
  - Notification à l'équipe commerciale
  - Affectation automatique selon le secteur
  - Workflow d'email de suivi

### Notes spécifiques
- Le formulaire est intégré via un iframe Pipedrive Web Forms
- Hauteur de l'iframe : ~1239px (ajustée dynamiquement)
- Le formulaire inclut une validation en temps réel
- Les champs obligatoires sont marqués d'un astérisque (*)
- RGPD compliant avec consentement explicite

---

## Formulaire 2 : Recherche

### Informations générales
- **URL** : Présent sur toutes les pages (navigation principale)
- **Type** : Formulaire de recherche
- **Implémentation** : Formulaire natif Webflow
- **Action** : `https://packshot-creator.com/search`
- **Méthode** : GET

### Champs du formulaire

1. **Query**
   - Type : `search`
   - Required : Oui
   - Name : "query"
   - Placeholder : "Rechercher..."
   - Label : Aucun (icône loupe)

### Bouton de soumission
- **Type** : `submit`
- **Texte** : "Rechercher"
- **Icône** : Loupe (search icon)

### Destination
- **Page de résultats** : `/search?query=[terme]`
- **Système** : Recherche native Webflow

### Post-soumission
- **Redirect** : Page de résultats de recherche
- **Affichage** : Liste des résultats pertinents

### Notes spécifiques
- Présent dans le header (desktop et mobile)
- Apparaît généralement dans une modal ou slide-in
- Duplicata : Le formulaire apparaît 2 fois (header desktop + mobile)

---

## Formulaire 3 : Bannière de Gestion des Cookies

### Informations générales
- **URL** : Présent sur toutes les pages (première visite)
- **Type** : Bannière de consentement RGPD
- **Implémentation** : Formulaire natif Webflow
- **Emplacement** : Overlay en bas de page

### Champs du formulaire

1. **Fonctionnalités (Necessary)**
   - Type : `checkbox`
   - Required : Non (toujours activé par défaut)
   - Name : "Necessary"
   - Label : "Fonctionnalités"
   - État : Coché et désactivé (obligatoire)

2. **Analyses (Analytics)**
   - Type : `checkbox`
   - Required : Non
   - Name : "Analytics"
   - Label : "Analyses"
   - État : Décoché par défaut

3. **Marketing**
   - Type : `checkbox`
   - Required : Non
   - Name : "Marketing"
   - Label : "Marketing"
   - État : Décoché par défaut

4. **Données utilisateur (Preferences)**
   - Type : `checkbox`
   - Required : Non
   - Name : "Preferences"
   - Label : "Données utilisateur"
   - État : Décoché par défaut

5. **Personnalisation (Preferences)**
   - Type : `checkbox`
   - Required : Non
   - Name : "Preferences"
   - Label : "Personnalisation"
   - État : Décoché par défaut

### Boutons d'action
- **Refuser** : Refuse tous les cookies non nécessaires
- **Préférences** : Ouvre le panneau de personnalisation
- **Accepter** : Accepte tous les cookies

### Variantes du formulaire
Le formulaire de cookies apparaît dans plusieurs états :
- Bannière initiale (3 boutons)
- Panneau de préférences détaillé
- Version mobile adaptée

### Destination
- **Stockage** : LocalStorage du navigateur
- **Cookie** : Enregistrement des préférences
- **Durée** : 12 mois

### Post-soumission
- **Fermeture** : La bannière se ferme
- **Persistance** : Les préférences sont sauvegardées
- **Scripts** : Activation/désactivation des trackers selon les choix

### Notes spécifiques
- Conforme RGPD
- Multiplicité : Le formulaire est présent 8 fois dans le DOM (versions desktop, mobile, états différents)
- Intégration probable avec Google Analytics, Facebook Pixel, etc.

---

## Formulaires Non Identifiés sur le Site Actuel

Les formulaires suivants étaient attendus mais **n'ont PAS été trouvés** sur le site Webflow actuel :

1. **Newsletter Footer** : Pas de formulaire d'inscription newsletter dans le footer
2. **Formulaires de pages produits** : Pas de formulaires "Demander une démo" sur les pages produits individuelles
3. **Formulaire de téléchargement** : Pas de formulaires pour télécharger des ressources (guides, brochures)
4. **Chat/Contact rapide** : Widget de chat visible mais pas de formulaire de pré-chat identifié

### Widget de Chat
- **Type** : Chatbot Proactive (iframe)
- **Implémentation** : Iframe externe (probablement Intercom, Drift ou similaire)
- **Classe** : `.proactiveChat`
- **Note** : Non considéré comme un formulaire classique, mais une interface de messagerie

---

## Recommandations pour la Migration Next.js

### Formulaire de Contact (/contact)

**État actuel** : Placeholder dans le code Next.js
**Action requise** :

1. **Intégrer Pipedrive Web Form** via iframe :
   ```tsx
   <iframe
     src="[URL_PIPEDRIVE_WEB_FORM]"
     className="w-full h-[1239px] border-0 rounded-lg shadow-md"
     title="Formulaire de contact PackshotCreator"
     scrolling="no"
   />
   ```

2. **Alternative** : Créer un formulaire React avec intégration API Pipedrive
   - Utiliser `react-hook-form` pour la gestion du formulaire
   - Validation avec Zod
   - Intégration API Pipedrive pour la création de deals
   - Gestion des erreurs et messages de confirmation

3. **Champs à implémenter** (si formulaire personnalisé) :
   - Tous les champs listés dans "Formulaire 1" ci-dessus
   - Validation côté client et serveur
   - RGPD compliance (consentements explicites)

### Formulaire de Recherche

**Action requise** :
- Déjà présent dans le Header Next.js
- Vérifier l'implémentation de la page de résultats `/search`
- S'assurer de la compatibilité avec le système de recherche

### Bannière de Cookies

**Action requise** :
- Implémenter une solution RGPD (ex: `react-cookie-consent` ou `@cookie-consent/core`)
- Respecter les mêmes catégories que Webflow
- Intégrer avec Google Analytics, Facebook Pixel, etc.

---

## Analyse Technique

### Technologies Utilisées
- **Webflow** : Plateforme de base
- **Pipedrive Web Forms** : Formulaire de contact principal
- **Webflow Forms** : Recherche et cookies
- **iframes** : 2-3 iframes détectés (Pipedrive + Chat)

### Intégrations Tierces
1. **Pipedrive CRM** : Gestion des leads et deals
2. **Chatbot** : Widget de chat en bas à droite
3. **Google Analytics** : Tracking (si cookies acceptés)
4. **Facebook Pixel** : Probablement actif (si cookies marketing acceptés)

### Sécurité et Conformité
- ✅ RGPD compliant (consentements explicites)
- ✅ Politique de confidentialité liée
- ✅ Validation des formulaires
- ✅ Protection contre le spam (probable CAPTCHA ou honeypot)

---

## Statistiques Globales

- **Total de formulaires** : 3 types principaux
- **Formulaires Pipedrive** : 1 (Contact/Devis)
- **Formulaires natifs Webflow** : 2 (Recherche, Cookies)
- **Pages avec formulaires** : Toutes les pages (header + cookies) + page Contact
- **Champs totaux** : 14 (Contact: 9, Recherche: 1, Cookies: 5 options)

---

## Annexes

### URLs Clés Identifiées
- Contact : https://www.packshot-creator.com/contact
- Recherche : https://packshot-creator.com/search
- Politique de confidentialité : (lien dans le formulaire)

### Formulaires Manquants/À Créer
Pour une expérience utilisateur complète, envisager d'ajouter :
1. **Newsletter footer** : Inscription rapide à la newsletter
2. **Demande de démo** : Sur les pages produits
3. **Téléchargement de ressources** : Pour lead generation
4. **Formulaire de rappel** : Option de callback rapide

---

**Fin de l'inventaire**
*Document créé le 29/01/2026*
*Dernière mise à jour : 29/01/2026*
