'use server';

import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';
import { classes } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { checkAdminAccess } from '@/lib/auth-utils';

export interface ClassFormData {
  name: string;
  description: string;
  specialLoadSound?: string;
  specialUseSound?: string;
  specialLoadGesture?: string;
  specialUseGesture?: string;
  interactions?: string[];
  isBaseClass?: boolean;
  category?: 'base' | 'extra' | 'team';
  maxBullets?: number;
  heartNumber?: number;
  classIcon?: string;
  specialIcon?: string;
  specialText?: string;
  orderPriority?: number;
  imageUrl?: string;
}

export async function updateClass(id: string, formData: ClassFormData) {
  const { authorized } = await checkAdminAccess(['super-admin']);
  
  if (!authorized) {
    throw new Error('Unauthorized - Super admin access required');
  }

  try {
    await db.update(classes)
      .set({
        name: formData.name,
        description: formData.description,
        specialLoadSound: formData.specialLoadSound || null,
        specialUseSound: formData.specialUseSound || null,
        specialLoadGesture: formData.specialLoadGesture || null,
        specialUseGesture: formData.specialUseGesture || null,
        interactions: formData.interactions || null,
        isBaseClass: formData.isBaseClass || false,
        category: formData.category || null,
        maxBullets: formData.maxBullets ?? 0,
        heartNumber: formData.heartNumber || 1,
        classIcon: formData.classIcon || null,
        specialIcon: formData.specialIcon || null,
        specialText: formData.specialText || null,
        orderPriority: formData.orderPriority || 0,
        imageUrl: formData.imageUrl || null,
      })
      .where(eq(classes.id, id));

    revalidatePath('/admin');
    revalidatePath('/classes');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating class:', error);
    throw new Error('Failed to update class');
  }
}

export async function createClass(formData: ClassFormData) {
  const { authorized } = await checkAdminAccess(['super-admin']);
  
  if (!authorized) {
    throw new Error('Unauthorized - Super admin access required');
  }

  try {
    const [newClass] = await db.insert(classes).values({
      name: formData.name,
      description: formData.description,
      specialLoadSound: formData.specialLoadSound || null,
      specialUseSound: formData.specialUseSound || null,
      specialLoadGesture: formData.specialLoadGesture || null,
      specialUseGesture: formData.specialUseGesture || null,
      interactions: formData.interactions || null,
      isBaseClass: formData.isBaseClass || false,
      category: formData.category || null,
      maxBullets: formData.maxBullets ?? 1,
      heartNumber: formData.heartNumber || 1,
      classIcon: formData.classIcon || null,
      specialIcon: formData.specialIcon || null,
      specialText: formData.specialText || null,
      orderPriority: formData.orderPriority || 0,
      imageUrl: formData.imageUrl || null,
    }).returning();

    revalidatePath('/admin');
    revalidatePath('/classes');
    
    return { success: true, class: newClass };
  } catch (error) {
    console.error('Error creating class:', error);
    throw new Error('Failed to create class');
  }
}

export async function deleteClass(id: string) {
  const { authorized } = await checkAdminAccess(['super-admin']);
  
  if (!authorized) {
    throw new Error('Unauthorized - Super admin access required');
  }

  try {
    await db.delete(classes).where(eq(classes.id, id));
    
    revalidatePath('/admin');
    revalidatePath('/classes');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting class:', error);
    throw new Error('Failed to delete class');
  }
}