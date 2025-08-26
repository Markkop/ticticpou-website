import { NextRequest, NextResponse } from 'next/server';
import { stackServerApp } from '@/stack';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    // Fetch user by Stack ID using server app
    const user = await stackServerApp.getUser(id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Only return safe public fields
    return NextResponse.json({
      id: user.id,
      displayName: user.displayName ?? null,
      profileImageUrl: user.profileImageUrl ?? null,
      primaryEmail: user.primaryEmail ?? null,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}