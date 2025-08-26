import { checkAdminAccess } from '@/lib/auth-utils';
import { classesService } from '@/lib/db/services';
import AdminClassesClient from './components/AdminClassesClient';

export default async function AdminClassesPage() {
  const { authorized, user, dbUser } = await checkAdminAccess(['super-admin']);
  
  if (!authorized || !user || !dbUser) return null;

  const classes = await classesService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Classes</h1>
        <p className="text-gray-600">
          Sistema de gerenciamento de conteúdo para classes do jogo
        </p>
      </div>

      <AdminClassesClient classes={classes} />
    </div>
  );
}