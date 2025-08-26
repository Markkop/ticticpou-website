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
  
  // Get the target user's profile data by public ID
  const [targetUserProfile, classes, gameModes, allUsers] = await Promise.all([
    usersService.getByPublicId(pid),
    classesService.getAll(),
    gameModesService.getAll(),
    usersService.getRanking(1000) // Get all users to calculate rank
  ]);

  if (!targetUserProfile) {
    notFound();
  }

  // Get current user's profile if logged in
  const currentUserProfile = currentUser ? await usersService.findByStackId(currentUser.id) : null;

  // Calculate user rank (1-based index)
  const userRank = allUsers.findIndex(u => u.publicId === pid) + 1;
  
  // Calculate total matches
  const totalMatches = targetUserProfile.wins + targetUserProfile.losses;
  
  // Calculate TTP years (years since account creation)
  const accountCreatedAt = targetUserProfile.createdAt;
  const now = new Date();
  const ttpYears = Math.floor((now.getTime() - accountCreatedAt.getTime()) / (365.25 * 24 * 60 * 60 * 1000));

  // Use database fields for display
  const safeUser = {
    publicId: targetUserProfile.publicId,
    displayName: targetUserProfile.displayName,
    avatarUrl: targetUserProfile.avatarUrl
  };

  // Check if current user is viewing their own profile
  const isOwnProfile = currentUserProfile?.publicId === pid;

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