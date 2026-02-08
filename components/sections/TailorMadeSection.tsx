import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ShoppingCart, FolderOpen, ShieldCheck, Camera, Palette, Factory } from 'lucide-react';

const SOLUTIONS = [
  { key: 'ecommerce', Icon: ShoppingCart },
  { key: 'digital', Icon: FolderOpen },
  { key: 'quality', Icon: ShieldCheck },
  { key: 'studio', Icon: Camera },
  { key: 'creative', Icon: Palette },
  { key: 'manufacturers', Icon: Factory },
] as const;

export default function TailorMadeSection() {
  const t = useTranslations('tailorMade');

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h2 className="font-heading text-4xl lg:text-5xl text-future-dusk-900">
            {t('heading')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            {SOLUTIONS.map(({ key, Icon }) => (
              <div
                key={key}
                className="rounded-2xl border border-neutral-100 bg-white p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex-shrink-0 bg-very-peri-50 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-very-peri-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-xl text-future-dusk-900 mb-2">
                      {t(`${key}.title`)}
                    </h3>
                    <p className="text-sm text-future-dusk-600">
                      {t(`${key}.description`)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="relative h-[500px] lg:h-[600px]">
            <Image
              src="/images/illustrations/pillar-hardware.avif"
              alt="PackshotCreator studio photo professionnel"
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
