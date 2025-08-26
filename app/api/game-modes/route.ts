import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { gameModes } from '@/lib/db/schema';

export async function GET() {
  try {
    const allGameModes = await db.select({
      name: gameModes.name,
      description: gameModes.description,
    }).from(gameModes);
    
    return NextResponse.json(allGameModes);
  } catch (error) {
    console.error('Error fetching game modes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}