import { cookies } from 'next/headers';
import { verifySessionCookieValue, ROI_SESSION_COOKIE } from '@/lib/roiChat/auth';
import RoiChat from '@/components/roiChat/RoiChat';
import LoginForm from '@/components/roiChat/LoginForm';

export const dynamic = 'force-dynamic';

export default async function RoiProPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const cookieStore = await cookies();
  const session = verifySessionCookieValue(cookieStore.get(ROI_SESSION_COOKIE)?.value);
  const { erreur } = await searchParams;

  if (!session) {
    return <LoginForm erreur={erreur} />;
  }

  return <RoiChat userEmail={session.email} />;
}
