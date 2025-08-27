import { checkAdminAccess } from '@/lib/auth-utils';
import { gameModesService } from '@/lib/db/services';
import AdminGameModesClient from './components/AdminGameModesClient';

export default async function AdminGameModesPage() {
  const { authorized, user, dbUser } = await checkAdminAccess(['super-admin']);
  
  if (!authorized || !user || !dbUser) return null;

  const gameModes = await gameModesService.getAll();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Gerenciar Modos de Jogo</h1>
        <p className="text-gray-600">
          Sistema de gerenciamento de conteúdo para modos de jogo
        </p>
      </div>

      <AdminGameModesClient gameModes={gameModes} />
    </div>
  );
}