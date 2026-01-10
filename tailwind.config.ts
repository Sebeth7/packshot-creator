import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'var(--neutral-dark)',
            a: {
              color: 'var(--primary-turquoise)',
              '&:hover': {
                color: 'var(--primary-dark)',
              },
            },
            h1: {
              color: 'var(--neutral-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            h2: {
              color: 'var(--neutral-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            h3: {
              color: 'var(--neutral-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            h4: {
              color: 'var(--neutral-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            code: {
              color: 'var(--primary-dark)',
            },
            blockquote: {
              borderLeftColor: 'var(--primary-turquoise)',
              color: 'var(--neutral-medium)',
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
