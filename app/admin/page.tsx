import { checkAdminAccess } from '@/lib/auth-utils';

export default async function AdminDashboard() {
  const { authorized, user, dbUser } = await checkAdminAccess(['super-admin', 'ambassador']);
  
  if (!authorized || !user || !dbUser) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.displayName}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <a
              href="/admin/matches/new"
              className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
            >
              Create New Match
            </a>
            {dbUser.role === 'super-admin' && (
              <a
                href="/admin/users"
                className="block w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
              >
                Manage Users
              </a>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activity</h3>
          <p className="text-sm text-gray-600">No recent activity</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Role</h3>
          <p className="text-sm text-gray-600 capitalize">{dbUser.role}</p>
          {dbUser.role === 'super-admin' && (
            <p className="text-xs text-gray-500 mt-1">Full administrative access</p>
          )}
          {dbUser.role === 'ambassador' && (
            <p className="text-xs text-gray-500 mt-1">Can create and manage matches</p>
          )}
        </div>
      </div>
    </div>
  );
}