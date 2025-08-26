import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { classes } from '@/lib/db/schema';

export async function GET() {
  try {
    const allClasses = await db.select({
      name: classes.name,
      description: classes.description,
    }).from(classes);
    
    return NextResponse.json(allClasses);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}