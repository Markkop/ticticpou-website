'use server';

import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { ilike, or, eq } from 'drizzle-orm';

export async function searchUsers(query: string) {
  try {
    const results = await db
      .select({
        id: users.id,
        publicId: users.publicId,
        displayName: users.displayName,
        avatarUrl: users.avatarUrl,
      })
      .from(users)
      .where(
        or(
          ilike(users.displayName, `%${query}%`),
          ilike(users.email, `%${query}%`)
        )
      )
      .limit(10);
      
    return results;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
}

export async function getUserById(userId: number) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function getUserByStackId(stackId: string) {
  try {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.stackId, stackId))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching user by stack ID:', error);
    return null;
  }
}