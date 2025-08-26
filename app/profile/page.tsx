import { stackServerApp } from '@/stack';
import { redirect } from 'next/navigation';
import { usersService } from '@/lib/db/services';

export default async function ProfilePage() {
  const user = await stackServerApp.getUser({ or: "redirect" });
  
  // Check if user profile exists, create if not
  const userProfile = await usersService.findByStackId(user.id);
  
  if (!userProfile) {
    // Create basic profile if it doesn't exist
    await usersService.create({
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      stackId: user.id,
      email: user.primaryEmail || '',
      username: user.primaryEmail?.split('@')[0] || `user_${Date.now()}`,
      avatarUrl: null,
      favoriteClass: null,
      favoriteGameMode: null,
      elo: 1000,
      wins: 0,
      losses: 0,
      isAmbassador: false,
      role: 'user',
    });
  }
  
  // Redirect to the user's own profile page
  redirect(`/profile/${user.id}`);
}