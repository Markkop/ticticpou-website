import { redirect } from 'next/navigation';
import { AdminNav } from './components/AdminNav';
import { checkAdminAccess } from '@/lib/auth-utils';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { authorized, user, dbUser } = await checkAdminAccess(['super-admin', 'ambassador']);
  
  if (!user) {
    redirect('/auth/signin?redirectTo=/admin');
  }
  
  if (!authorized || !dbUser) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav userRole={dbUser.role} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}