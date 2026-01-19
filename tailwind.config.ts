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
              color: 'var(--secondary-orbitvu)',
              '&:hover': {
                color: 'var(--primary-orbitvu)',
              },
            },
            h1: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            h2: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            h3: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            h4: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-cairo)',
            },
            code: {
              color: 'var(--secondary-orbitvu)',
            },
            blockquote: {
              borderLeftColor: 'var(--secondary-orbitvu)',
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
