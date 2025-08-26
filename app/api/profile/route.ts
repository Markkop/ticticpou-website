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
    const { publicId, favoriteClass, favoriteGameMode, displayName, avatarUrl } = body;

    // Get current user's profile to verify ownership
    const currentUserProfile = await usersService.findByStackId(user.id);
    if (!currentUserProfile) {
      return NextResponse.json({ error: 'User profile not found' }, { status: 404 });
    }

    // Verify that the user is updating their own profile
    if (publicId && currentUserProfile.publicId !== publicId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Update user profile using Stack ID (since that's what we can verify)
    await usersService.updateProfileByStackId(user.id, {
      favoriteClass,
      favoriteGameMode,
      ...(displayName && { displayName }),
      ...(avatarUrl !== undefined && { avatarUrl })
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