import { stackServerApp } from '@/stack';
import { notFound } from 'next/navigation';
import { Navigation } from '@/components/navigation';
import ProfileClient from '../components/ProfileClient';
import { usersService, classesService, gameModesService } from '@/lib/db/services';

interface ProfilePageProps {
  params: Promise<{ pid: string }>;
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { pid } = await params;
  const currentUser = await stackServerApp.getUser();
  
  // Get the target user's profile data
  const [targetUserProfile, classes, gameModes, allUsers] = await Promise.all([
    usersService.findByStackId(pid),
    classesService.getAll(),
    gameModesService.getAll(),
    usersService.getRanking(1000) // Get all users to calculate rank
  ]);

  if (!targetUserProfile) {
    notFound();
  }

  // Fetch Stack Auth user data for the target user
  let targetStackUser;
  try {
    targetStackUser = await stackServerApp.getUser(pid);
    if (!targetStackUser) {
      notFound();
    }
  } catch (error) {
    console.error('Error fetching Stack Auth user:', error);
    notFound();
  }

  // Calculate user rank (1-based index)
  const userRank = allUsers.findIndex(u => u.stackId === pid) + 1;
  
  // Calculate total matches
  const totalMatches = targetUserProfile.wins + targetUserProfile.losses;
  
  // Calculate TTP years (years since account creation)
  const accountCreatedAt = targetUserProfile.createdAt;
  const now = new Date();
  const ttpYears = Math.floor((now.getTime() - accountCreatedAt.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  // Extract safe user data for client component  
  const safeUser = {
    id: targetStackUser.id,
    primaryEmail: targetStackUser.primaryEmail,
    displayName: targetStackUser.displayName,
    profileImageUrl: targetStackUser.profileImageUrl
  };

  // Check if current user is viewing their own profile
  const isOwnProfile = currentUser?.id === pid;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ProfileClient 
        user={safeUser}
        userProfile={targetUserProfile}
        classes={classes}
        gameModes={gameModes}
        userRank={userRank || 0}
        totalMatches={totalMatches}
        ttpYears={ttpYears}
        isOwnProfile={isOwnProfile}
      />
    </div>
  );
}