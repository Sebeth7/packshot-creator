import Image from 'next/image';
import SurveyForm from './SurveyForm';

type SearchParams = {
  email?: string;
  name?: string;
  company?: string;
  pid?: string;
};

export default async function EtudeClientsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;

  return (
    <main className="min-h-screen">
      <header className="border-b border-black/5 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-5 flex items-center">
          <Image
            src="/images/logos/packshot-creator-logo.png"
            alt="PackshotCreator"
            width={200}
            height={40}
            priority
            className="h-9 w-auto"
          />
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
        <SurveyForm
          initialEmail={sp.email || ''}
          initialName={sp.name || ''}
          initialCompany={sp.company || ''}
          initialPid={sp.pid || ''}
        />
      </section>

      <footer className="py-8 text-center border-t border-black/5 mt-10">
        <p className="text-xs text-[var(--neutral-medium)]">
          © {new Date().getFullYear()} PackshotCreator — Sysnext SAS · Une question ?{' '}
          <a href="mailto:contact@packshotcreator.com" className="underline hover:text-[var(--primary-orbitvu)]">
            contact@packshotcreator.com
          </a>
        </p>
      </footer>
    </main>
  );
}
