import { useTranslations } from 'next-intl';
import { Camera, Sparkles, CheckCircle2 } from 'lucide-react';

export default function IAManifesteSection() {
  const t = useTranslations('iaPhotoProduit.manifeste');

  const principles = [
    {
      key: 'principle1',
      Icon: Camera,
      color: 'text-primary-turquoise',
      bgColor: 'bg-primary-turquoise/10',
    },
    {
      key: 'principle2',
      Icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-600/10',
    },
    {
      key: 'principle3',
      Icon: CheckCircle2,
      color: 'text-green-600',
      bgColor: 'bg-green-600/10',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-dark mb-6">
            {t('heading')}
          </h2>
          <p className="text-xl text-neutral-medium max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {principles.map((principle) => (
            <div
              key={principle.key}
              className="bg-neutral-lighter rounded-xl p-8 text-center hover:shadow-xl transition-shadow duration-300"
            >
              {/* Icon */}
              <div className="mb-6 flex justify-center">
                <div className={`${principle.bgColor} rounded-full p-6`}>
                  <principle.Icon
                    className={`w-12 h-12 ${principle.color} stroke-[1.5]`}
                  />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-heading font-bold text-neutral-dark mb-4">
                {t(`${principle.key}.title`)}
              </h3>

              {/* Description */}
              <p className="text-neutral-medium leading-relaxed">
                {t(`${principle.key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
