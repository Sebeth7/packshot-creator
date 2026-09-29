import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, '.'),
    },
  },
  test: {
    include: ['lib/**/__tests__/**/*.test.ts', 'cloudflare-worker/test/**/*.test.ts'],
    environment: 'node',
    // next-intl importe `next/navigation` sans extension : Node ESM ne le
    // résout pas. Transformé par Vite, il se résout (tests de getPathname).
    server: { deps: { inline: ['next-intl'] } },
  },
});
