import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Badge from '@/components/shared/Badge';
import { Camera, Sparkles, GraduationCap } from 'lucide-react';

export default function ThreePillarsSection({
  variant = 'studios'
}: {
  variant?: 'homepage' | 'studios'
}) {
  const namespace = variant === 'homepage'
    ? 'home.threePillars'
    : 'studiosHardware.threePillars';

  const t = useTranslations(namespace);

  const pillars = [
    {
      key: 'capture',
      href: '/studios-photo-automatises',
      color: 'turquoise' as const,
      Icon: Camera,
    },
    {
      key: 'creation',
      href: '/ia-photo-produit',
      color: 'purple' as const,
      Icon: Sparkles,
    },
    {
      key: 'formation',
      href: '/academy',
      color: 'green' as const,
      Icon: GraduationCap,
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-dark mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-neutral-medium max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Three Pillars Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <Link
              key={pillar.key}
              href={pillar.href}
              className="group bg-neutral-lighter rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-secondary-orbitvu"
            >
              {/* Icon */}
              <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                <pillar.Icon className="w-12 h-12 text-neutral-dark stroke-[1.5]" />
              </div>

              {/* Badge */}
              <div className="mb-4">
                <Badge variant={pillar.color}>
                  {t(`${pillar.key}.badge`)}
                </Badge>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-3 group-hover:text-secondary-orbitvu transition-colors">
                {t(`${pillar.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-neutral-medium leading-relaxed">
                {t(`${pillar.key}.description`)}
              </p>

              {/* Arrow indicator */}
              <div className="mt-6 flex items-center text-secondary-orbitvu font-semibold group-hover:translate-x-2 transition-transform duration-300">
                <span className="mr-2">En savoir plus</span>
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
