/**
 * Centralized User Types
 * All user-related types should be defined here to ensure consistency across the application
 */

// Core User type from database schema
export interface User {
  id: string; // Internal database ID
  publicId: string; // Public-facing UUID
  stackId: string; // Stack Auth ID
  email: string;
  displayName: string; // The user's chosen display name
  avatarUrl: string | null;
  favoriteClass: string | null;
  favoriteGameMode: string | null;
  elo: number;
  wins: number;
  losses: number;
  isAmbassador: boolean;
  role: 'user' | 'ambassador' | 'super-admin';
  createdAt: Date;
  updatedAt: Date;
}

// For creating new users (omits auto-generated fields)
export interface CreateUserData {
  stackId: string;
  email: string;
  displayName: string;
  avatarUrl?: string | null;
  favoriteClass?: string | null;
  favoriteGameMode?: string | null;
  elo?: number;
  wins?: number;
  losses?: number;
  isAmbassador?: boolean;
  role?: 'user' | 'ambassador' | 'super-admin';
}

// For updating user profiles (omits system fields)
export interface UpdateUserData {
  displayName?: string;
  avatarUrl?: string | null;
  favoriteClass?: string | null;
  favoriteGameMode?: string | null;
  elo?: number;
  wins?: number;
  losses?: number;
  isAmbassador?: boolean;
  role?: 'user' | 'ambassador' | 'super-admin';
}

// Public user profile (safe for public display)
export interface PublicUserProfile {
  publicId: string;
  displayName: string;
  avatarUrl: string | null;
  elo: number;
  wins: number;
  losses: number;
  isAmbassador: boolean;
  favoriteClass: string | null;
  favoriteGameMode: string | null;
  createdAt: Date;
}

// User summary for lists/search results
export interface UserSummary {
  id: string;
  publicId: string;
  displayName: string;
  avatarUrl: string | null;
}

// User data for authenticated contexts
export interface AuthenticatedUserData {
  id: string;
  displayName: string;
  isAmbassador: boolean;
  role: 'user' | 'ambassador' | 'super-admin';
}

// Match participant data
export interface MatchParticipant {
  userId: string;
  userPublicId: string | null;
  displayName: string | null;
  avatarUrl: string | null;
  className: string;
  placement: number;
  isWinner: boolean;
  eliminations: number;
  eloChange: number;
  eloAfter: number;
}

// Ambassador info for matches
export interface MatchAmbassador {
  id: string;
  publicId: string;
  displayName: string;
}

// User statistics
export interface UserStats {
  wins: number;
  losses: number;
  totalMatches: number;
  winRate: number;
  averageEliminations?: number;
  totalEliminations?: number;
}

// Ranking entry
export interface RankingEntry {
  userId: string;
  userPublicId: string;
  displayName: string;
  avatarUrl: string | null;
  elo: number;
  wins: number;
  losses: number;
  winRate: number;
  totalMatches: number;
  eliminations: number;
  avgEliminations: number;
  rank: number;
}