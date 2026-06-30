import { test, expect } from '@playwright/test';

/**
 * Redirections 301 Tests - Validates all configured redirections in next.config.ts
 */

test.describe('Redirections 301 - Pages FR sans prefixe', () => {
  const redirections = [
    { from: '/contact', to: '/fr/contact' },
    { from: '/a-propos', to: '/fr/a-propos' },
    { from: '/mentions-legales', to: '/fr/mentions-legales' },
    { from: '/confidentialite', to: '/fr/confidentialite' },
    { from: '/cgu', to: '/fr/cgu' },
    { from: '/ia-photo-produit', to: '/fr/ia-photo-produit' },
    { from: '/studios-photo-automatises', to: '/fr/studios-photo-automatises' },
    { from: '/e-commerce', to: '/fr/blog' },
    { from: '/blog', to: '/fr/blog' },
    { from: '/industrie', to: '/fr/industrie' },
    { from: '/guide', to: '/fr/guide' },
    { from: '/academy', to: '/fr/academy' },
    { from: '/formation', to: '/fr/academy' },
    { from: '/formations', to: '/fr/academy' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});

test.describe('Redirections 301 - Anciennes URLs Webflow', () => {
  const redirections = [
    { from: '/packshot-secteur-chaussures', to: '/fr/industrie/chaussures' },
    { from: '/packshot-secteur-bijouterie', to: '/fr/industrie/bijoux-joaillerie' },
    { from: '/packshot-secteur-meuble', to: '/fr/industrie/mobilier-decoration' },
    { from: '/packshot-secteur-mode-accessoires', to: '/fr/industrie/mode-textile' },
    { from: '/packshot-secteur-pieces-techniques', to: '/fr/industrie/pieces-techniques-industrie' },
    { from: '/packshot-secteur-e-commerce', to: '/fr/blog' },
    { from: '/studio-photo', to: '/fr/studios-photo-automatises' },
    { from: '/blendai', to: '/fr/ia-photo-produit' },
    { from: '/logiciel', to: '/fr/ia-photo-produit' },
    { from: '/gestion-workflow-shotflow', to: '/fr/ia-photo-produit' },
    { from: '/ancien-studio-photo', to: '/fr/studios-photo-automatises' },
    { from: '/packshot-packshotcreator', to: '/fr' },
    { from: '/accessoires', to: '/fr/studios-photo-automatises' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});

test.describe('Redirections 301 - Machines EN (ancien photo-studio -> studio-photo)', () => {
  const redirections = [
    { from: '/en/photo-studio/alphashot-micro', to: '/en/studio-photo/alphashot-micro-v2' },
    { from: '/en/photo-studio/alphashot-xl', to: '/en/studio-photo/alphashot-xl-v2' },
    { from: '/en/photo-studio/alphastudio-compact', to: '/en/studio-photo/alphastudio-compact-v2' },
    { from: '/en/photo-studio/alphastudio-xxl', to: '/en/studio-photo/alphastudio-xxl-v2' },
    { from: '/en/photo-studio/e-comm-studio', to: '/en/studio-photo/e-comm-studio-plus' },
    { from: '/en/photo-studio/360-turntables', to: '/en/studios-photo-automatises' },
    // Catch-all: unchanged slugs
    { from: '/en/photo-studio/alphashot-360', to: '/en/studio-photo/alphashot-360' },
    { from: '/en/photo-studio/alphashot-g2', to: '/en/studio-photo/alphashot-g2' },
    // Direct access with old slugs
    { from: '/en/studio-photo/alphashot-micro', to: '/en/studio-photo/alphashot-micro-v2' },
    { from: '/en/studio-photo/alphashot-xl', to: '/en/studio-photo/alphashot-xl-v2' },
    { from: '/en/studio-photo/e-comm-studio', to: '/en/studio-photo/e-comm-studio-plus' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});

test.describe('Redirections 301 - DE/ES/NL individuelles (S1)', () => {
  const redirections = [
    // ES - Blog
    { from: '/es/blog/como-elige-mejor-objectivo-foto-paquete', to: '/en/blog/how-to-choose-best-lens-for-product-photography' },
    { from: '/es/blog/aprender-fotografia-joyas-ecommerce', to: '/en/blog/technique-photograph-jewelry-tutorial' },
    { from: '/es/blog/8-pasos-para-fotografiar-joyas-profesionalmente', to: '/en/blog/8-steps-to-professional-jewelry-photography' },
    // ES - Guides
    { from: '/es/guide/que-equipo-elegir-para-foto-joyas', to: '/en/guide/which-equipment-to-choose-for-jewelry-photo' },
    { from: '/es/guide/que-ajustes-para-fotografiar-joyas', to: '/en/guide/what-settings-to-photograph-jewelry' },
    { from: '/es/guide/como-fotografiar-gafas-para-e-commerce', to: '/en/guide/how-to-photograph-glasses-for-e-commerce' },
    { from: '/es/guide/como-posicionar-reloj-para-fotos-producto', to: '/en/guide/how-to-position-watch-before-shooting-photo' },
    // DE - Blog
    { from: '/de/blog/welches-bildformat-ist-das-beste-fur-das-web', to: '/en/blog/best-image-format-for-the-web' },
    { from: '/de/blog/8-schritte-zur-professionellen-schmuckfotografie', to: '/en/blog/8-steps-to-professional-jewelry-photography' },
    // DE - Guides
    { from: '/de/guide/welche-ausrustung-fur-schmuckfotografie-wahlen', to: '/en/guide/which-equipment-to-choose-for-jewelry-photo' },
    { from: '/de/guide/welche-einstellungen-zum-fotografieren-von-schmuck', to: '/en/guide/what-settings-to-photograph-jewelry' },
    // DE - Machines
    { from: '/de/fotostudio/alphashot-g2', to: '/en/studio-photo/alphashot-xl-g2' },
    // NL - Blog
    { from: '/nl/blog/8-stappen-voor-professionele-sieradenfotografie', to: '/en/blog/8-steps-to-professional-jewelry-photography' },
    // NL - Guides
    { from: '/nl/guide/welke-instellingen-om-sieraden-te-fotograferen', to: '/en/guide/what-settings-to-photograph-jewelry' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});

test.describe('Redirections 301 - DE/ES/NL catch-all', () => {
  const redirections = [
    { from: '/de', to: '/en' },
    { from: '/es', to: '/en' },
    { from: '/nl', to: '/en' },
    // Catch-all with arbitrary paths
    { from: '/de/some-random-page', to: '/en' },
    { from: '/es/otra-pagina', to: '/en' },
    { from: '/nl/willekeurige-pagina', to: '/en' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});

test.describe('Redirections 301 - Alphashot G2 remplacée par XL G2', () => {
  const redirections = [
    { from: '/fr/studio-photo/alphashot-g2', to: '/fr/studio-photo/alphashot-xl-g2' },
    { from: '/en/studio-photo/alphashot-g2', to: '/en/studio-photo/alphashot-xl-g2' },
    { from: '/de-ch/fotostudio/alphashot-g2', to: '/de-ch/fotostudio/alphashot-xl-g2' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});

test.describe('Redirections 301 - Contact variantes', () => {
  const redirections = [
    { from: '/fr/contact/demande-demo', to: '/fr/contact?subject=demo' },
    { from: '/en/contact/request-demo', to: '/en/contact?subject=demo' },
    { from: '/fr/contact/demande-devis-formation', to: '/fr/contact?subject=formation' },
    { from: '/en/contact/training-quote', to: '/en/contact?subject=training' },
  ];

  for (const { from, to } of redirections) {
    test(`${from} -> ${to}`, async ({ request }) => {
      const response = await request.get(from, { maxRedirects: 0 });
      expect(response.status()).toBe(301);
      const location = response.headers()['location'];
      expect(location).toContain(to);
    });
  }
});
