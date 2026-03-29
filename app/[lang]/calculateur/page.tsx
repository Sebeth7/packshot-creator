import { redirect } from 'next/navigation';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function CalculateurRedirect({ params }: PageProps) {
  const { lang } = await params;
  redirect(`/${lang}/calculateur-roi`);
}
