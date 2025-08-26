import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { usersService } from '@/lib/db/services';

export async function PATCH(request: NextRequest) {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { favoriteClass, favoriteGameMode } = body;

    // Update user profile
    await usersService.updateProfile(user.id, {
      favoriteClass,
      favoriteGameMode
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}