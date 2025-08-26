import { stackServerApp } from '@/stack';
import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function getUserWithRole(stackUserId: string) {
  try {
    const dbUser = await db
      .select()
      .from(users)
      .where(eq(users.stackId, stackUserId))
      .limit(1);
    
    return dbUser[0] || null;
  } catch (error) {
    console.error('Error fetching user role:', error);
    return null;
  }
}

export async function checkAdminAccess(requiredRoles: string[] = ['super-admin', 'ambassador']) {
  try {
    const user = await stackServerApp.getUser();
    
    if (!user) {
      return { authorized: false, user: null, dbUser: null };
    }

    const dbUser = await getUserWithRole(user.id);
    
    if (!dbUser || !requiredRoles.includes(dbUser.role)) {
      return { authorized: false, user, dbUser };
    }

    return { authorized: true, user, dbUser };
  } catch (error) {
    console.error('Error checking admin access:', error);
    return { authorized: false, user: null, dbUser: null };
  }
}