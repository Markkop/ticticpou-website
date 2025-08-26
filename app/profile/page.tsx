import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';
import { usersService } from '@/lib/db/services';

export default async function ProfilePage() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  
  // Check if user profile exists, create if not
  const userProfile = await usersService.findByStackId(user.id);
  
  if (!userProfile) {
    // Create basic profile if it doesn't exist
    const newProfile = await usersService.create({
      stackId: user.id,
      email: user.primaryEmail || '',
      displayName: user.displayName || user.primaryEmail?.split('@')[0] || `User ${Date.now()}`,
      avatarUrl: null,
      favoriteClass: null,
      favoriteGameMode: null,
      elo: 1000,
      wins: 0,
      losses: 0,
      isAmbassador: false,
      role: 'user',
    });
    
    // Redirect to the new user's profile using their public ID
    redirect(`/profile/${newProfile.publicId}`);
  }
  
  // Redirect to the user's own profile page using their public ID
  redirect(`/profile/${userProfile.publicId}`);
}