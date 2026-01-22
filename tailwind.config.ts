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
              fontFamily: 'var(--font-inter)',
            },
            h2: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-inter)',
            },
            h3: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-inter)',
            },
            h4: {
              color: 'var(--heading-dark)',
              fontFamily: 'var(--font-inter)',
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
