import { useTranslations } from 'next-intl';

export default function TailorMadeSection() {
  const t = useTranslations('home');

  const solutions = [
    { iconKey: 'ecommerce', titleKey: 'tailorMade.ecommerce.title', descriptionKey: 'tailorMade.ecommerce.description' },
    { iconKey: 'digital', titleKey: 'tailorMade.digital.title', descriptionKey: 'tailorMade.digital.description' },
    { iconKey: 'quality', titleKey: 'tailorMade.quality.title', descriptionKey: 'tailorMade.quality.description' },
    { iconKey: 'studio', titleKey: 'tailorMade.studio.title', descriptionKey: 'tailorMade.studio.description' },
    { iconKey: 'creative', titleKey: 'tailorMade.creative.title', descriptionKey: 'tailorMade.creative.description' },
    { iconKey: 'manufacturers', titleKey: 'tailorMade.manufacturers.title', descriptionKey: 'tailorMade.manufacturers.description' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl lg:text-5xl text-neutral-dark mb-2">
            A <span className="underline decoration-secondary-orbitvu decoration-2 underline-offset-8">tailor-made solution</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Cards (gauche) */}
          <div className="space-y-4">
            {solutions.map((solution, idx) => (
              <div
                key={idx}
                className="border border-neutral-light rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  {/* Icon placeholder - you can add SVG icons here */}
                  <div className="w-12 h-12 flex-shrink-0 bg-secondary-orbitvu/10 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-secondary-orbitvu rounded"></div>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-neutral-dark mb-2">
                      {t(solution.titleKey)}
                    </h3>
                    <p className="text-sm text-neutral-medium">
                      {t(solution.descriptionKey)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Image (droite) */}
          <div className="relative h-[500px] lg:h-[600px]">
            <img
              src="https://cdn.prod.website-files.com/6682a557f105555299d5aeae/66c5d754fa02ad5dbebd4999_image_working_on_ortery.webp"
              alt="Professional working on PackshotCreator studio"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
