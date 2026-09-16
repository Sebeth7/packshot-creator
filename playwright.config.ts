import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright configuration for PackshotCreator E2E tests
 * @see https://playwright.dev/docs/test-configuration
 *
 * Cible par défaut : le serveur de dev local, démarré automatiquement.
 *
 * Pour viser un déploiement distant (Preview Vercel avant merge, ou l'origine
 * de production), définir PLAYWRIGHT_BASE_URL — le serveur local n'est alors
 * pas démarré :
 *
 *   PLAYWRIGHT_BASE_URL=https://<preview>.vercel.app \
 *     npx playwright test e2e/seo.spec.ts --project=chromium
 *
 * Ne pas viser https://www.packshot-creator.com : Cloudflare renvoie 403 aux
 * clients dont l'empreinte TLS n'est pas celle d'un navigateur réel.
 * Voir docs/seo-geo/07-VERIFICATION.md.
 */
const BASE_URL_DISTANTE = process.env.PLAYWRIGHT_BASE_URL;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: BASE_URL_DISTANTE ?? 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  // Aucun serveur local à démarrer quand la cible est distante.
  webServer: BASE_URL_DISTANTE
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 300 * 1000,
      },
});
