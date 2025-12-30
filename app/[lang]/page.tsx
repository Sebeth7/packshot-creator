import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = await getTranslations({ locale: lang, namespace: 'home.meta' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function HomePage() {
  const t = useTranslations('home.hero');

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-warm-white">
      <div className="text-center max-w-4xl px-4">
        <h1 className="font-heading text-6xl text-heading-dark mb-4">
          {t('title')}
        </h1>
        <p className="text-xl text-text-dark mb-2 font-medium">
          {t('subtitle')}
        </p>
        <p className="text-lg text-text-dark mb-8">
          {t('description')}
        </p>

        <div className="mt-12">
          <h2 className="font-heading text-2xl text-heading-dark mb-6">
            Palette Orbitvu — Migration en cours...
          </h2>
          <div className="flex gap-4 justify-center flex-wrap">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-primary-coral rounded-lg shadow-lg mb-2"></div>
              <span className="text-sm font-medium">Primary Coral</span>
              <span className="text-xs text-text-dark/70">#EC3655</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-secondary-teal rounded-lg shadow-lg mb-2"></div>
              <span className="text-sm font-medium">Secondary Teal</span>
              <span className="text-xs text-text-dark/70">#24A1B4</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-bg-light-gray rounded-lg shadow-lg mb-2 border border-text-dark/10"></div>
              <span className="text-sm font-medium">BG Light Gray</span>
              <span className="text-xs text-text-dark/70">#F8FAFB</span>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div>
            <h3 className="font-heading text-xl text-heading-dark">
              Font Cairo (Headings)
            </h3>
          </div>
          <div>
            <p className="font-body text-base">
              Font Roboto (Body) — Regular 400
            </p>
          </div>
          <div>
            <p className="font-body text-base font-medium">
              Font Roboto (Body) — Medium 500
            </p>
          </div>
        </div>

        <div className="mt-12">
          <button className="px-8 py-3 bg-primary-coral text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
            {t('cta')}
          </button>
        </div>
      </div>
    </main>
  );
}
