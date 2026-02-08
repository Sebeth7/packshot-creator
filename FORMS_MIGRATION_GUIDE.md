# Guide de Migration des Formulaires - Webflow vers Next.js

**Projet** : PackshotCreator
**Date** : 29 janvier 2026
**Objectif** : Migration complète des formulaires du site Webflow vers Next.js

---

## Table des Matières

1. [Vue d'ensemble](#vue-densemble)
2. [Formulaire de Contact - Options d'implémentation](#formulaire-de-contact)
3. [Formulaire de Recherche](#formulaire-de-recherche)
4. [Gestion des Cookies RGPD](#gestion-des-cookies-rgpd)
5. [Stack technique recommandée](#stack-technique-recommandée)
6. [Plan d'implémentation](#plan-dimplémentation)

---

## Vue d'ensemble

### Formulaires à migrer

| Formulaire | Priorité | Complexité | Statut Next.js | Action requise |
|------------|----------|------------|----------------|----------------|
| Contact/Devis | 🔴 Haute | Moyenne | Placeholder | Intégration Pipedrive |
| Recherche | 🟡 Moyenne | Faible | ✅ Implémenté | Vérification |
| Cookies RGPD | 🔴 Haute | Moyenne | ❌ Manquant | À créer |

---

## Formulaire de Contact

### Option 1 : Intégration iframe Pipedrive (Recommandée pour MVP)

**Avantages** :
- ✅ Déploiement immédiat (copier-coller)
- ✅ Pas de backend à développer
- ✅ Continuité avec le système actuel
- ✅ Pipedrive gère automatiquement les leads
- ✅ Pas de maintenance du formulaire

**Inconvénients** :
- ❌ Moins de contrôle sur le design
- ❌ Dépendance externe
- ❌ Pas de customisation avancée
- ❌ Tracking analytics limité

**Implémentation** :

```tsx
// app/[lang]/contact/page.tsx

export default function ContactPage() {
  return (
    <div className="w-full">
      <iframe
        src="https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh"
        title="Formulaire de contact PackshotCreator"
        className="w-full border-0 rounded-lg shadow-md"
        style={{ height: '1239px' }}
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}
```

**CSS personnalisé (si nécessaire)** :

```css
/* app/[lang]/contact/contact.css */
.pipedriveWebForms {
  width: 100%;
  max-width: 100%;
}

.pipedriveWebForms iframe {
  min-height: 1200px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .pipedriveWebForms iframe {
    min-height: 1400px; /* Ajuster selon le responsive */
  }
}
```

---

### Option 2 : Formulaire React Custom + API Pipedrive (Recommandée pour production)

**Avantages** :
- ✅ Contrôle total du design
- ✅ Meilleure expérience utilisateur
- ✅ Validation personnalisée
- ✅ Analytics détaillés
- ✅ Pas de dépendance iframe
- ✅ SSR compatible

**Inconvénients** :
- ❌ Développement plus long
- ❌ Backend API à créer
- ❌ Maintenance continue
- ❌ Gestion des erreurs Pipedrive

**Stack recommandée** :
- `react-hook-form` - Gestion du formulaire
- `zod` - Validation de schéma
- `@tanstack/react-query` - Gestion des mutations API
- API Route Next.js - Backend
- Pipedrive API - Intégration CRM

**Structure du projet** :

```
app/[lang]/contact/
├── page.tsx                    # Page principale
├── ContactForm.tsx             # Composant formulaire
├── contactSchema.ts            # Schéma Zod validation
└── useContactForm.ts           # Hook custom

app/api/
└── contact/
    └── route.ts                # API Route pour Pipedrive
```

**Schéma de validation** :

```typescript
// app/[lang]/contact/contactSchema.ts
import { z } from 'zod';

export const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide'),
  company: z.string().min(2, 'Le nom de l\'entreprise est requis'),
  phone: z.string().optional(),
  sector: z.enum([
    'agroalimentaire',
    'chaussures',
    'high-tech',
    'horlogerie',
    'meubles',
    'mode',
    'objets-art',
    'optique',
    'pieces-techniques',
    'skincare',
    'sports',
    'vins-spiritueux',
    'autre'
  ]),
  message: z.string().optional(),
  privacyConsent: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter la politique de confidentialité'
  }),
  newsletterOptIn: z.enum(['yes', 'no'])
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

**Composant formulaire** :

```tsx
// app/[lang]/contact/ContactForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { contactSchema, type ContactFormData } from './contactSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup } from '@/components/ui/radio-group';

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }

      return response.json();
    },
    onSuccess: () => {
      reset();
      // Afficher message de succès
      alert('Merci ! Votre demande a été envoyée. Notre équipe vous contactera sous 24h.');
    },
    onError: (error) => {
      // Afficher message d'erreur
      console.error(error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Prénom */}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium mb-2">
          Prénom *
        </label>
        <Input
          id="firstName"
          {...register('firstName')}
          className={errors.firstName ? 'border-red-500' : ''}
        />
        {errors.firstName && (
          <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
        )}
      </div>

      {/* Nom */}
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium mb-2">
          Nom *
        </label>
        <Input
          id="lastName"
          {...register('lastName')}
          className={errors.lastName ? 'border-red-500' : ''}
        />
        {errors.lastName && (
          <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2">
          E-mail *
        </label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Entreprise */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2">
          Nom de l'entreprise *
        </label>
        <Input
          id="company"
          {...register('company')}
          className={errors.company ? 'border-red-500' : ''}
        />
        {errors.company && (
          <p className="text-red-500 text-sm mt-1">{errors.company.message}</p>
        )}
      </div>

      {/* Téléphone */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2">
          Téléphone (facultatif)
        </label>
        <Input
          id="phone"
          type="tel"
          {...register('phone')}
        />
      </div>

      {/* Secteur d'activité */}
      <div>
        <label htmlFor="sector" className="block text-sm font-medium mb-2">
          Secteur d'activité *
        </label>
        <Select {...register('sector')}>
          <option value="">Choisir dans le menu déroulant</option>
          <option value="agroalimentaire">Agroalimentaire, arts de la table</option>
          <option value="chaussures">Chaussures</option>
          <option value="high-tech">High-tech, électroménager, informatique</option>
          <option value="horlogerie">Horlogerie, bijouterie, joaillerie, orfèvrerie</option>
          <option value="meubles">Meubles</option>
          <option value="mode">Mode, accessoires</option>
          <option value="objets-art">Objets d'art, antiquités</option>
          <option value="optique">Optique, lunetterie</option>
          <option value="pieces-techniques">Pièces techniques</option>
          <option value="skincare">Skincare, cosmétiques</option>
          <option value="sports">Sports</option>
          <option value="vins-spiritueux">Vins, spiritueux</option>
          <option value="autre">Autre</option>
        </Select>
        {errors.sector && (
          <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Votre message (facultatif)
        </label>
        <Textarea
          id="message"
          {...register('message')}
          rows={4}
        />
      </div>

      {/* Consentement RGPD */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="privacyConsent"
          {...register('privacyConsent')}
          className={errors.privacyConsent ? 'border-red-500' : ''}
        />
        <label htmlFor="privacyConsent" className="text-sm text-neutral-medium">
          En cochant cette case, j'atteste avoir pris connaissance de la{' '}
          <a href="/confidentialite" className="text-secondary-orbitvu underline">
            Politique de confidentialité
          </a>{' '}
          et accepte que mes données personnelles soient traitées conformément à celle-ci. *
        </label>
      </div>
      {errors.privacyConsent && (
        <p className="text-red-500 text-sm">{errors.privacyConsent.message}</p>
      )}

      {/* Newsletter */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Abonnement à la newsletter *
        </label>
        <RadioGroup {...register('newsletterOptIn')}>
          <div className="flex items-center gap-2">
            <input type="radio" id="newsletter-yes" value="yes" {...register('newsletterOptIn')} />
            <label htmlFor="newsletter-yes">Oui</label>
          </div>
          <div className="flex items-center gap-2">
            <input type="radio" id="newsletter-no" value="no" {...register('newsletterOptIn')} />
            <label htmlFor="newsletter-no">Non</label>
          </div>
        </RadioGroup>
        <p className="text-xs text-neutral-medium mt-2">
          Je souhaite recevoir des informations et des conseils de la part de PackshotCreator par email.
          Vous pouvez vous désinscrire à tout moment via le lien de désinscription présent dans chaque email.
        </p>
      </div>

      {/* Bouton de soumission */}
      <Button
        type="submit"
        disabled={isSubmitting || mutation.isPending}
        className="w-full bg-secondary-orbitvu hover:bg-secondary-orbitvu/90"
      >
        {isSubmitting || mutation.isPending ? 'Envoi en cours...' : 'Obtenir mon offre'}
      </Button>
    </form>
  );
}
```

**API Route - Intégration Pipedrive** :

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/app/[lang]/contact/contactSchema';

const PIPEDRIVE_API_TOKEN = process.env.PIPEDRIVE_API_TOKEN;
const PIPEDRIVE_API_URL = 'https://api.pipedrive.com/v1';

export async function POST(request: NextRequest) {
  try {
    // Valider les données
    const body = await request.json();
    const data = contactSchema.parse(body);

    // 1. Créer ou trouver le contact (Person)
    const personResponse = await fetch(
      `${PIPEDRIVE_API_URL}/persons?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phone: data.phone || null,
          org_id: null // À associer si l'organisation existe
        })
      }
    );

    const person = await personResponse.json();

    if (!person.success) {
      throw new Error('Erreur création contact Pipedrive');
    }

    // 2. Créer le Deal (Affaire)
    const dealResponse = await fetch(
      `${PIPEDRIVE_API_URL}/deals?api_token=${PIPEDRIVE_API_TOKEN}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: `Demande de devis - ${data.company}`,
          person_id: person.data.id,
          // Champs personnalisés Pipedrive (à adapter selon votre configuration)
          // Par exemple, si vous avez un champ custom pour le secteur :
          // 'custom_field_sector': data.sector,
          value: null, // Valeur estimée du deal (optionnel)
          currency: 'EUR',
          status: 'open',
          stage_id: 1, // ID de l'étape "Nouveau lead" (à configurer)
          visible_to: '3', // Visible à toute l'équipe
        })
      }
    );

    const deal = await dealResponse.json();

    if (!deal.success) {
      throw new Error('Erreur création deal Pipedrive');
    }

    // 3. Ajouter une note avec le message et les détails
    if (data.message) {
      await fetch(
        `${PIPEDRIVE_API_URL}/notes?api_token=${PIPEDRIVE_API_TOKEN}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            content: `
              Message : ${data.message}

              Secteur : ${data.sector}
              Newsletter : ${data.newsletterOptIn === 'yes' ? 'Oui' : 'Non'}
            `,
            deal_id: deal.data.id,
            person_id: person.data.id
          })
        }
      );
    }

    // 4. Si newsletter opt-in, ajouter à la liste (selon votre système)
    if (data.newsletterOptIn === 'yes') {
      // Intégration avec votre système de newsletter (Mailchimp, SendGrid, etc.)
      // await addToNewsletter(data.email, data.firstName, data.lastName);
    }

    // 5. Envoyer email de confirmation (optionnel)
    // await sendConfirmationEmail(data.email, data.firstName);

    return NextResponse.json({
      success: true,
      message: 'Votre demande a été envoyée avec succès',
      dealId: deal.data.id
    });

  } catch (error) {
    console.error('Erreur API contact:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Une erreur est survenue lors de l\'envoi du formulaire'
      },
      { status: 500 }
    );
  }
}
```

**Variables d'environnement** :

```env
# .env.local
PIPEDRIVE_API_TOKEN=your_pipedrive_api_token_here
```

---

## Formulaire de Recherche

**Statut** : ✅ Déjà implémenté dans Next.js (Header)

**Vérifications à effectuer** :
1. Tester la fonctionnalité de recherche
2. S'assurer que la page `/search` existe et fonctionne
3. Vérifier l'indexation du contenu pour la recherche
4. Tester le responsive (mobile/desktop)

**Améliorations possibles** :
- Ajouter des suggestions de recherche (autocomplete)
- Implémenter une recherche côté serveur avec Algolia ou ElasticSearch
- Ajouter des filtres de recherche (par catégorie, type, etc.)

---

## Gestion des Cookies RGPD

**Statut** : ❌ Non implémenté dans Next.js

**Librairie recommandée** : `@cookie-consent/core` ou `react-cookie-consent`

### Option 1 : react-cookie-consent (Simple)

**Installation** :
```bash
npm install react-cookie-consent
```

**Implémentation** :

```tsx
// components/CookieConsent.tsx
'use client';

import CookieConsent from 'react-cookie-consent';

export default function CookieConsentBanner() {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accepter"
      declineButtonText="Refuser"
      enableDeclineButton
      cookieName="packshot-cookie-consent"
      style={{
        background: '#1a1a1a',
        padding: '20px'
      }}
      buttonStyle={{
        background: '#e32f2f',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '4px',
        padding: '10px 20px'
      }}
      declineButtonStyle={{
        background: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        fontSize: '14px',
        borderRadius: '4px',
        padding: '10px 20px'
      }}
      expires={365}
      onAccept={() => {
        // Activer les cookies analytics/marketing
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted'
          });
        }
      }}
      onDecline={() => {
        // Garder uniquement les cookies nécessaires
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied'
          });
        }
      }}
    >
      Nous utilisons des cookies pour vous offrir la meilleure expérience possible.
      Ils nous permettent également d'analyser le comportement des utilisateurs afin
      d'améliorer votre expérience.{' '}
      <a href="/confidentialite" className="underline">
        En savoir plus
      </a>
    </CookieConsent>
  );
}
```

**Utilisation dans layout** :

```tsx
// app/layout.tsx
import CookieConsentBanner from '@/components/CookieConsentBanner';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
```

### Option 2 : Solution personnalisée avec granularité (Avancée)

Pour reproduire exactement le système Webflow avec les 5 catégories :

```tsx
// components/CookieBanner.tsx
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

type CookiePreferences = {
  necessary: boolean; // Toujours true
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  personalization: boolean;
};

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
    personalization: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookie-consent', JSON.stringify(prefs));

    // Activer/désactiver les scripts selon les préférences
    if (prefs.analytics) {
      // Activer Google Analytics
      enableAnalytics();
    }
    if (prefs.marketing) {
      // Activer Facebook Pixel, etc.
      enableMarketing();
    }

    setShowBanner(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      personalization: true
    };
    savePreferences(allAccepted);
  };

  const rejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      personalization: false
    };
    savePreferences(onlyNecessary);
  };

  const saveCustom = () => {
    savePreferences(preferences);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-neutral-light p-6 z-50">
      {!showPreferences ? (
        // Bannière initiale
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-heading text-lg font-bold mb-2">
                Paramètres cookies
              </h3>
              <p className="text-sm text-neutral-medium">
                Nous utilisons des cookies pour vous offrir la meilleure expérience possible.
                Ils nous permettent également d'analyser le comportement des utilisateurs afin
                d'améliorer votre expérience.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={rejectAll}>
                Refuser
              </Button>
              <Button variant="outline" onClick={() => setShowPreferences(true)}>
                Préférences
              </Button>
              <Button onClick={acceptAll} className="bg-secondary-orbitvu">
                Accepter
              </Button>
            </div>
          </div>
        </div>
      ) : (
        // Panneau de préférences détaillé
        <div className="max-w-3xl mx-auto">
          <h3 className="font-heading text-xl font-bold mb-4">
            Préférences de cookies
          </h3>

          <div className="space-y-4 mb-6">
            {/* Fonctionnalités (toujours activé) */}
            <div className="flex items-start gap-3 p-4 bg-neutral-lighter/30 rounded">
              <Checkbox checked disabled />
              <div>
                <h4 className="font-medium">Fonctionnalités</h4>
                <p className="text-sm text-neutral-medium">
                  Cookies nécessaires au fonctionnement du site (toujours activés)
                </p>
              </div>
            </div>

            {/* Analyses */}
            <div className="flex items-start gap-3 p-4 border border-neutral-light rounded">
              <Checkbox
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, analytics: checked as boolean })
                }
              />
              <div>
                <h4 className="font-medium">Analyses</h4>
                <p className="text-sm text-neutral-medium">
                  Google Analytics pour comprendre l'utilisation du site
                </p>
              </div>
            </div>

            {/* Marketing */}
            <div className="flex items-start gap-3 p-4 border border-neutral-light rounded">
              <Checkbox
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, marketing: checked as boolean })
                }
              />
              <div>
                <h4 className="font-medium">Marketing</h4>
                <p className="text-sm text-neutral-medium">
                  Publicités ciblées et remarketing
                </p>
              </div>
            </div>

            {/* Données utilisateur */}
            <div className="flex items-start gap-3 p-4 border border-neutral-light rounded">
              <Checkbox
                checked={preferences.preferences}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, preferences: checked as boolean })
                }
              />
              <div>
                <h4 className="font-medium">Données utilisateur</h4>
                <p className="text-sm text-neutral-medium">
                  Mémorisation des préférences utilisateur
                </p>
              </div>
            </div>

            {/* Personnalisation */}
            <div className="flex items-start gap-3 p-4 border border-neutral-light rounded">
              <Checkbox
                checked={preferences.personalization}
                onCheckedChange={(checked) =>
                  setPreferences({ ...preferences, personalization: checked as boolean })
                }
              />
              <div>
                <h4 className="font-medium">Personnalisation</h4>
                <p className="text-sm text-neutral-medium">
                  Contenu personnalisé selon vos intérêts
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={rejectAll}>
              Rejeter tout
            </Button>
            <Button onClick={saveCustom} className="bg-secondary-orbitvu">
              Accepter certains
            </Button>
            <Button onClick={acceptAll} className="bg-secondary-orbitvu">
              Accepter tout
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// Fonctions helpers
function enableAnalytics() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    });
  }
}

function enableMarketing() {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      ad_storage: 'granted'
    });
  }
}
```

---

## Stack Technique Recommandée

### Dépendances à installer

```bash
# Gestion des formulaires
npm install react-hook-form @hookform/resolvers zod

# Gestion des requêtes API
npm install @tanstack/react-query

# Cookies RGPD
npm install react-cookie-consent
# OU pour une solution personnalisée
npm install js-cookie
npm install @types/js-cookie --save-dev

# UI Components (si pas déjà installé)
npm install @radix-ui/react-checkbox @radix-ui/react-select
```

### Configuration TypeScript

```typescript
// types/global.d.ts

// Augmenter Window pour Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export {};
```

---

## Plan d'Implémentation

### Phase 1 : MVP (1-2 jours)

**Objectif** : Avoir un site fonctionnel avec formulaires de base

- [x] ✅ Intégrer iframe Pipedrive sur page contact
- [ ] ❌ Implémenter bannière de cookies (solution simple)
- [ ] ❌ Vérifier fonctionnement du formulaire de recherche
- [ ] ❌ Tester sur mobile et desktop

**Livrable** : Site avec formulaire de contact fonctionnel

---

### Phase 2 : Amélioration (3-5 jours)

**Objectif** : Améliorer l'expérience utilisateur et le contrôle

- [ ] ❌ Créer formulaire React personnalisé pour le contact
- [ ] ❌ Implémenter API Route Next.js pour Pipedrive
- [ ] ❌ Ajouter validation Zod et messages d'erreur
- [ ] ❌ Implémenter bannière cookies avec préférences détaillées
- [ ] ❌ Ajouter analytics et tracking (Google Analytics 4)

**Livrable** : Formulaires entièrement personnalisés et RGPD compliant

---

### Phase 3 : Optimisation (2-3 jours)

**Objectif** : Optimiser performance et ajouter fonctionnalités avancées

- [ ] ❌ Ajouter formulaire newsletter dans le footer
- [ ] ❌ Créer formulaires "Demander une démo" sur pages produits
- [ ] ❌ Implémenter système de téléchargement de ressources
- [ ] ❌ Ajouter tests unitaires et d'intégration
- [ ] ❌ Optimiser performance (lazy loading, code splitting)

**Livrable** : Expérience formulaire complète et optimisée

---

## Checklist de Migration

### Avant de déployer

- [ ] ✅ Obtenir le token API Pipedrive
- [ ] ✅ Configurer les variables d'environnement
- [ ] ❌ Tester l'intégration Pipedrive en environnement de dev
- [ ] ❌ Vérifier que tous les champs sont correctement mappés
- [ ] ❌ Tester la création de deals dans Pipedrive
- [ ] ❌ Configurer les emails de confirmation
- [ ] ❌ Tester la bannière de cookies sur différents navigateurs
- [ ] ❌ Vérifier la conformité RGPD
- [ ] ❌ Tester le responsive sur mobile/tablette/desktop
- [ ] ❌ Valider les messages d'erreur et de succès
- [ ] ❌ Tester le formulaire avec des données invalides
- [ ] ❌ Vérifier les performances (Lighthouse)

### Après déploiement

- [ ] ❌ Monitorer les soumissions de formulaires
- [ ] ❌ Vérifier les deals créés dans Pipedrive
- [ ] ❌ Analyser le taux de conversion
- [ ] ❌ Collecter les retours utilisateurs
- [ ] ❌ Ajuster selon les besoins

---

## Ressources et Documentation

### APIs
- [Pipedrive API Documentation](https://developers.pipedrive.com/docs/api/v1)
- [Pipedrive Web Forms](https://www.pipedrive.com/en/features/web-forms)

### Librairies
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [React Cookie Consent](https://github.com/Mastermindzh/react-cookie-consent)

### RGPD
- [CNIL - Cookies et traceurs](https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi)
- [Guide RGPD formulaires](https://www.cnil.fr/fr/reglement-europeen-protection-donnees)

---

**Fin du guide de migration**
*Document créé le 29/01/2026*
