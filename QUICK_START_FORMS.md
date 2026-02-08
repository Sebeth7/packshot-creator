# Quick Start - Intégration Formulaires PackshotCreator

**Pour une mise en production rapide** 🚀

---

## 🎯 Action Immédiate : Formulaire de Contact (5 minutes)

### Étape 1 : Remplacer le placeholder

**Fichier** : `/app/[lang]/contact/page.tsx`

**Remplacer** :
```tsx
{/* OPTION A : Embed Typeform/Tally (RECOMMANDÉ) */}
<div className="w-full h-[600px] bg-neutral-lighter/30 rounded-lg border-2 border-dashed border-neutral-light flex items-center justify-center">
  {/* ... placeholder ... */}
</div>
```

**Par** :
```tsx
<div className="w-full pipedriveWebForms">
  <iframe
    src="https://webforms.pipedrive.com/f/bYWdVxnLz0TYyp1nhD7ozQ4DfK9LrjLf0YPTVMKvZXFY3nxPmDO5cwGWNOis0hrlRh"
    title="Formulaire de contact PackshotCreator"
    className="w-full border-0 rounded-lg shadow-md"
    style={{ height: '1239px', minHeight: '1200px' }}
    scrolling="no"
    loading="lazy"
  />
</div>
```

### Étape 2 : Ajouter le CSS (optionnel)

Créer `/app/[lang]/contact/styles.css` :

```css
.pipedriveWebForms {
  width: 100%;
  max-width: 100%;
}

.pipedriveWebForms iframe {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .pipedriveWebForms iframe {
    min-height: 1400px;
  }
}
```

Et l'importer dans `page.tsx` :
```tsx
import './styles.css';
```

### ✅ C'est fait ! Le formulaire fonctionne.

---

## 🍪 Bannière de Cookies RGPD (15 minutes)

### Étape 1 : Installer la dépendance

```bash
npm install react-cookie-consent
```

### Étape 2 : Créer le composant

**Fichier** : `/components/CookieConsent.tsx`

```tsx
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
        padding: '20px',
        alignItems: 'center'
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
    >
      Nous utilisons des cookies pour vous offrir la meilleure expérience possible.
      Ils nous permettent également d'analyser le comportement des utilisateurs afin
      d'améliorer votre expérience.{' '}
      <a href="/confidentialite" className="underline text-white hover:text-gray-300">
        En savoir plus
      </a>
    </CookieConsent>
  );
}
```

### Étape 3 : Ajouter au layout

**Fichier** : `/app/layout.tsx`

```tsx
import CookieConsentBanner from '@/components/CookieConsent';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
```

### ✅ Bannière de cookies opérationnelle !

---

## 📊 Configuration Google Analytics (10 minutes)

### Étape 1 : Créer le composant Analytics

**Fichier** : `/components/GoogleAnalytics.tsx`

```tsx
'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Vérifier le consentement cookies
    const consent = localStorage.getItem('packshot-cookie-consent');

    if (consent === 'true' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  }, []);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Consent par défaut (refusé)
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied'
          });

          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
```

### Étape 2 : Ajouter au layout

```tsx
import GoogleAnalytics from '@/components/GoogleAnalytics';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <GoogleAnalytics />
        {children}
        <CookieConsentBanner />
      </body>
    </html>
  );
}
```

### Étape 3 : Ajouter la variable d'environnement

**Fichier** : `.env.local`

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### ✅ Analytics configuré avec consentement RGPD !

---

## 🔍 Vérifier le Formulaire de Recherche

### Vérification rapide

1. Tester la barre de recherche dans le header
2. Vérifier que `/search` fonctionne
3. Tester avec différents termes de recherche

### Si la recherche ne fonctionne pas

Créer `/app/[lang]/search/page.tsx` :

```tsx
import { redirect } from 'next/navigation';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  if (!query) {
    redirect('/');
  }

  // TODO: Implémenter la logique de recherche
  // Pour l'instant, redirection vers l'accueil

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-8">
        Résultats de recherche pour : "{query}"
      </h1>
      <p className="text-neutral-medium">
        La fonctionnalité de recherche sera bientôt disponible.
      </p>
    </div>
  );
}
```

---

## 🚨 Checklist Avant Mise en Production

### Formulaires
- [x] ✅ Formulaire de contact intégré (iframe Pipedrive)
- [ ] ❌ Bannière cookies RGPD fonctionnelle
- [ ] ❌ Google Analytics configuré avec consentement
- [ ] ❌ Recherche testée et fonctionnelle

### Tests
- [ ] ❌ Tester le formulaire de contact (soumission réelle)
- [ ] ❌ Vérifier la création de deal dans Pipedrive
- [ ] ❌ Tester la bannière cookies (accepter/refuser)
- [ ] ❌ Vérifier que GA ne charge pas sans consentement
- [ ] ❌ Tester sur mobile (iOS Safari, Android Chrome)
- [ ] ❌ Tester sur desktop (Chrome, Firefox, Safari)

### Sécurité & Performance
- [ ] ❌ Vérifier que les variables d'environnement sont configurées
- [ ] ❌ Tester le temps de chargement (< 3s)
- [ ] ❌ Vérifier l'accessibilité (a11y)
- [ ] ❌ Test Lighthouse (score > 90)

### RGPD
- [ ] ❌ Lien vers politique de confidentialité fonctionnel
- [ ] ❌ Mentions légales accessibles
- [ ] ❌ Consentement explicite pour newsletter
- [ ] ❌ Option de désinscription newsletter

---

## 📝 Variables d'Environnement Requises

Créer/Mettre à jour `.env.local` :

```env
# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Pipedrive (si formulaire custom - Phase 2)
# PIPEDRIVE_API_TOKEN=your_token_here

# Site URL
NEXT_PUBLIC_SITE_URL=https://packshot-creator.com
```

---

## 🆘 Dépannage Rapide

### Le formulaire Pipedrive ne s'affiche pas
- Vérifier que l'URL de l'iframe est correcte
- Vérifier la hauteur du conteneur (min-height: 1200px)
- Vérifier qu'il n'y a pas de CSP bloquant l'iframe
- Ouvrir la console pour voir les erreurs

### La bannière cookies ne s'affiche pas
- Vérifier que le composant est bien importé dans le layout
- Vider le localStorage : `localStorage.clear()`
- Recharger la page
- Vérifier la console pour les erreurs

### Google Analytics ne track pas
- Vérifier que le GA_MEASUREMENT_ID est correct
- Vérifier que les cookies sont acceptés
- Utiliser l'extension Chrome "Google Analytics Debugger"
- Vérifier dans Google Analytics (Real-time)

---

## 📚 Pour Aller Plus Loin

Après avoir implémenté ces 3 éléments essentiels, consulter :

1. **FORMS_MIGRATION_GUIDE.md** - Guide complet de migration
2. **Webflow_Forms_Inventory.md** - Inventaire détaillé des formulaires

Pour créer des formulaires personnalisés avec intégration API Pipedrive.

---

## 💡 Conseils Pro

### Performance
- Lazy load les iframes : `loading="lazy"`
- Utiliser `next/script` pour GA : `strategy="afterInteractive"`
- Minimiser les re-renders des composants clients

### UX
- Afficher un loader pendant la soumission du formulaire
- Messages de succès/erreur clairs
- Validation en temps réel (si formulaire custom)
- Auto-scroll vers le message d'erreur

### SEO
- Ajouter des meta descriptions aux pages de formulaires
- Utiliser des labels sémantiques
- Implémenter schema.org ContactPage

---

**Temps estimé total : 30 minutes**

✅ Formulaire de contact : 5 min
✅ Bannière cookies : 15 min
✅ Google Analytics : 10 min

**Besoin d'aide ?**
- Documentation Pipedrive : https://developers.pipedrive.com/
- Documentation Next.js : https://nextjs.org/docs
- CNIL RGPD : https://www.cnil.fr/

---

*Document créé le 29/01/2026*
