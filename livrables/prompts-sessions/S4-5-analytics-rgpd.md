# SESSION S4-5 - Google Analytics 4 + RGPD Cookie Banner

**Modele requis : Claude Opus 4.6**
**Duree estimee : ~1.5h**
**Prerequis : Reponses du PO (compte Google GA4 + choix solution cookies)**

---

## Contexte

Tu travailles sur le projet PackshotCreator (migration Webflow -> Next.js).
- **Working directory** : `/Users/photodif/Documents/SYSNEXT/SITE WEB/packshot-creator`
- **Stack** : Next.js 16.1.1, React 19, TypeScript, Tailwind CSS v4, next-intl (FR/EN)
- Le site est LIVE sur packshot-creator.com. Teste en local avant de committer.

## ETAT ACTUEL DU CODEBASE (mis a jour 8 fev 2026)

**IMPORTANT** : Plusieurs sessions ont deja modifie les fichiers que tu vas toucher. Lis-les AVANT de modifier.

- **`app/[lang]/layout.tsx`** : Contient deja `generateMetadata` avec OG/Twitter meta, `overflow-x-hidden` sur body, Header/Footer. Tu dois AJOUTER tes composants (GoogleAnalytics, CookieBanner) sans casser l'existant.
- **`components/layout/Footer.tsx`** : Existe. Tu y ajouteras le lien "Gerer les cookies".
- **`components/calculators/ROICalculator/lib/analytics.ts`** : Existe avec des events ROI (gtag calls). NE PAS ecraser.
- **`PipedriveContactForm.tsx`** : Charge en `next/dynamic` depuis les pages qui l'utilisent.
- **158 pages** au build, **366 tests Playwright** dans `e2e/`. Ne casse rien.
- **Traductions** : `messages/fr.json` et `messages/en.json` font ~750 lignes chacun. Les cles utilisent des objets imbriques (PAS de `.` dans les noms de cles, c'est le separateur next-intl).

## IMPORTANT : Variables a obtenir du PO

Avant de commencer cette session, le PO doit fournir :
1. **Measurement ID GA4** : `G-XXXXXXXXXX` (ou confirmer qu'il faut le creer)
2. **Choix solution cookies** : Tarteaucitron (recommande, gratuit) / Axeptio / CookieConsent / autre
3. Si Tarteaucitron ou Axeptio : URL du service ou cle API si applicable

**SI CES INFOS NE SONT PAS DISPONIBLES** : Implemente le code avec un placeholder `G-PLACEHOLDER` pour GA4 et Tarteaucitron comme solution cookies par defaut. Le PO pourra remplacer la valeur plus tard.

---

## TACHE 1 : Integrer GA4

### 1.1 Creer le composant GA4

Cree `components/analytics/GoogleAnalytics.tsx` :

```typescript
'use client';
// Composant GA4 qui ne se charge que si le consentement est donne
// Utilise @next/third-parties/google ou le composant Script de Next.js
```

**Implementation** :
- Utilise `next/script` avec strategy `afterInteractive`
- Le composant doit accepter un prop `measurementId: string`
- Le composant ne doit rendre le script GA4 QUE si le consentement analytics est donne
- Lis le consentement depuis un cookie (ex: `cookie-consent` ou celui defini par la solution choisie)

### 1.2 Integrer dans le layout

**Fichier** : `app/[lang]/layout.tsx`

- Importer et placer `<GoogleAnalytics />` dans le layout
- Le measurement ID doit venir d'une variable d'environnement : `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- Ajouter la variable dans `.env.local` (avec la valeur placeholder)
- Ajouter la variable dans `.env.example` si le fichier existe

### 1.3 Events personnalises

**Fichier** : `lib/analytics.ts` (creer ou completer)

Creer des fonctions utilitaires pour les events :

```typescript
export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

// Events specifiques
export function trackFormSubmit(formName: string) { ... }
export function trackCTAClick(ctaName: string, location: string) { ... }
export function trackROICalculatorStart() { ... }
export function trackROICalculatorComplete(machineName: string, roi: number) { ... }
export function trackOPCOSimulatorComplete() { ... }
export function trackLanguageSwitch(from: string, to: string) { ... }
```

**IMPORTANT** : Un fichier `components/calculators/ROICalculator/lib/analytics.ts` existe deja avec des events ROI. Verifie s'il utilise gtag et s'il est compatible. Si oui, n'ecrase pas -- ajoute les events manquants. S'il est incompatible, adapte-le pour utiliser la meme base.

### 1.4 Integrer les events dans les composants

Ajoute les appels `trackEvent` dans les composants existants (modification minimale) :

| Evenement | Fichier | Declencheur |
|-----------|---------|-------------|
| `form_submit_contact` | `components/forms/PipedriveContactForm.tsx` | onSubmit |
| `cta_click` | Composants avec CTA principaux (hero, etc.) | onClick |
| `language_switch` | Header (composant de switch langue) | onChange |

**Note** : Les events ROI sont probablement deja geres dans `ROICalculator/lib/analytics.ts`. Verifie et ne duplique pas.

---

## TACHE 2 : Cookie Banner RGPD

### 2.1 Solution recommandee : Tarteaucitron

Si le PO n'a pas de preference, utilise **Tarteaucitron.js** :
- Open source, gratuit
- Conforme CNIL/RGPD
- Bien documente en francais

### 2.2 Implementation

Cree `components/cookies/CookieBanner.tsx` :

**Fonctionnalites requises** :
- Bandeau au premier chargement avec 3 choix : Tout accepter / Personnaliser / Tout refuser
- Categories de cookies :
  - **Necessaires** (toujours actifs) : session, langue, preferences
  - **Analytiques** : GA4
  - **Marketing** : aucun pour l'instant (prevoir la categorie)
- Stocker le consentement dans un cookie (duree : 13 mois max, conformite CNIL)
- GA4 ne se charge QUE si consentement "Analytiques" donne
- Bouton "Gerer les cookies" accessible dans le footer

**Design** (brandbook) :
- Fond : `bg-white` avec `shadow-xl` et `border border-neutral-200`
- Position : fixed bottom
- Bouton accepter : `bg-very-peri-500 hover:bg-very-peri-600 text-white`
- Bouton refuser : `bg-transparent border border-future-dusk-300 text-future-dusk-600`
- Bouton personnaliser : `text-very-peri-600 underline`
- Texte : `text-future-dusk-600` pour le corps, `text-future-dusk-900` pour les titres
- Pas d'emojis, pas d'animations lourdes

### 2.3 Integration dans le layout

- Ajouter `<CookieBanner />` dans `app/[lang]/layout.tsx`
- Le composant doit etre client-side (`'use client'`)

### 2.4 Lien dans le footer

- Ajouter un lien "Gerer les cookies" dans le footer
- Identifier le composant footer : chercher dans `components/` (probablement `components/layout/Footer.tsx`)
- Le lien doit ouvrir le panneau de personnalisation des cookies

### 2.5 Mise a jour des pages legales

- **`app/[lang]/confidentialite/page.tsx`** : Ajouter une section listant les cookies utilises (Necessaires + Analytiques)
- **`app/[lang]/mentions-legales/page.tsx`** : Verifier si une mention cookies est necessaire

---

## Patterns CRITIQUES

- **'use client'** pour les composants interactifs (CookieBanner, GoogleAnalytics)
- **Link** : `@/i18n/routing`
- **Pas d'emojis**
- **Scripts tiers** : strategy `afterInteractive`
- **Variable d'env** : `NEXT_PUBLIC_` prefix pour les variables accessibles cote client

## Criteres de done

- [ ] GA4 integre dans layout (conditionne au consentement)
- [ ] Events personnalises dans `lib/analytics.ts`
- [ ] Cookie banner fonctionnel (accepter/refuser/personnaliser)
- [ ] Consentement persiste en cookie
- [ ] Bouton "Gerer les cookies" dans le footer
- [ ] Pages legales mises a jour
- [ ] `npm run build` passe sans erreur (158+ pages)
- [ ] `.env.local` contient `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- [ ] Les tests existants passent toujours : `npx playwright test e2e/seo.spec.ts` (au moins verifier que les pages retournent 200)
- [ ] Pas de `.` dans les cles de traduction (utiliser objets imbriques)
- [ ] Commits propres (1 pour GA4, 1 pour cookie banner)

## Compte-rendu

Ecris `/livrables/prompts-sessions/S4-5-RAPPORT.md` avec :
- Solution cookies implementee
- Liste des events GA4 integres
- Composants modifies
- Variable d'env a configurer en production
- Pages legales modifiees
