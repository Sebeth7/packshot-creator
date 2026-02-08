import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import { FadeInView } from '@/components/animations';

interface ArticleCTAProps {
  lang: string;
}

export async function ArticleCTA({ lang }: ArticleCTAProps) {
  const t = await getTranslations({ locale: lang, namespace: 'blogArticle' });

  return (
    <FadeInView>
      <section className="py-16 bg-gradient-to-r from-very-peri-600 to-very-peri-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4">
            {t('ctaHeading')}
          </h2>
          <p className="text-lg text-very-peri-100 mb-8 max-w-2xl mx-auto">
            {t('ctaDescription')}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-very-peri-700 hover:bg-very-peri-50 rounded-xl shadow-lg">
              <Link href="/contact">
                {t('ctaDemo')} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white/10 rounded-xl">
              <Link href="/studios-photo-automatises#roi">
                <Calculator className="mr-2 h-4 w-4" /> {t('ctaRoi')}
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </FadeInView>
  );
}
