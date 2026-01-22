import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { Palette, Image, Sparkles, Zap } from 'lucide-react';

interface AIFeature {
  key: string;
  icon: string;
  Icon: typeof Palette;
  href: string;
}

const AI_FEATURES: AIFeature[] = [
  {
    key: 'lifestyle',
    icon: '🎨',
    Icon: Palette,
    href: '/blendai#lifestyle',
  },
  {
    key: 'background',
    icon: '🖼️',
    Icon: Image,
    href: '/blendai#background',
  },
  {
    key: 'retouche',
    icon: '✨',
    Icon: Sparkles,
    href: '/blendai#retouche',
  },
  {
    key: 'batch',
    icon: '⚡',
    Icon: Zap,
    href: '/blendai#batch',
  },
];

export default function AIFeaturesGrid() {
  const t = useTranslations('iaPhotoProduit.features');

  return (
    <section className="py-20 bg-gradient-to-br from-very-peri-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-neutral-medium max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Grid 2x2 */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {AI_FEATURES.map((feature) => (
            <Link
              key={feature.key}
              href={feature.href}
              className="group bg-white rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-primary-orbitvu"
            >
              {/* Icon avec emoji */}
              <div className="mb-6 flex items-center gap-4">
                <span className="text-5xl">{feature.icon}</span>
                <feature.Icon className="w-10 h-10 text-primary-orbitvu stroke-[1.5] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Name */}
              <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-3 group-hover:text-primary-orbitvu transition-colors">
                {t(`${feature.key}.name`)}
              </h3>

              {/* Description */}
              <p className="text-neutral-medium leading-relaxed mb-4">
                {t(`${feature.key}.description`)}
              </p>

              {/* Arrow indicator */}
              <div className="flex items-center text-primary-orbitvu font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span className="mr-2">Découvrir</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
