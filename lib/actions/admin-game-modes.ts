'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { gameModes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { checkAdminAccess } from '@/lib/auth-utils';

export interface GameModeFormData {
  name: string;
  description: string;
  minPlayers: number;
  maxPlayers?: number;
  category: 'casual' | 'competitivo';
  rankingType?: string;
}

export async function updateGameMode(id: string, formData: GameModeFormData) {
  const { authorized } = await checkAdminAccess(['super-admin']);
  
  if (!authorized) {
    throw new Error('Unauthorized - Super admin access required');
  }

  try {
    await db.update(gameModes)
      .set({
        name: formData.name,
        description: formData.description,
        minPlayers: formData.minPlayers,
        maxPlayers: formData.maxPlayers || null,
        category: formData.category,
        rankingType: formData.rankingType || null,
        updatedAt: new Date(),
      })
      .where(eq(gameModes.id, id));

    revalidatePath('/admin');
    revalidatePath('/modos');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating game mode:', error);
    throw new Error('Failed to update game mode');
  }
}

export async function createGameMode(formData: GameModeFormData) {
  const { authorized } = await checkAdminAccess(['super-admin']);
  
  if (!authorized) {
    throw new Error('Unauthorized - Super admin access required');
  }

  try {
    const [newGameMode] = await db.insert(gameModes).values({
      name: formData.name,
      description: formData.description,
      minPlayers: formData.minPlayers,
      maxPlayers: formData.maxPlayers || null,
      category: formData.category,
      rankingType: formData.rankingType || null,
    }).returning();

    revalidatePath('/admin');
    revalidatePath('/modos');
    
    return { success: true, gameMode: newGameMode };
  } catch (error) {
    console.error('Error creating game mode:', error);
    throw new Error('Failed to create game mode');
  }
}

export async function deleteGameMode(id: string) {
  const { authorized } = await checkAdminAccess(['super-admin']);
  
  if (!authorized) {
    throw new Error('Unauthorized - Super admin access required');
  }

  try {
    await db.delete(gameModes).where(eq(gameModes.id, id));
    
    revalidatePath('/admin');
    revalidatePath('/modos');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting game mode:', error);
    throw new Error('Failed to delete game mode');
  }
}