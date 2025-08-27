import { NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';
import { usersService } from '@/lib/db/services';

export async function GET() {
  try {
    const user = await stackServerApp.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user profile from database
    const userProfile = await usersService.findByStackId(user.id);
    if (!userProfile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    // Return combined user data
    return NextResponse.json({
      displayName: userProfile.displayName,
      avatarUrl: userProfile.avatarUrl,
      publicId: userProfile.publicId,
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
