/**
 * Centralized Match Types
 * All match-related types should be defined here
 */

import type { MatchParticipant, MatchAmbassador } from './user';

// Core Match type from database
export interface Match {
  id: string;
  ambassadorId: string;
  gameMode: string;
  location: string | null;
  playedAt: Date;
  createdAt: Date;
  ambassador: MatchAmbassador | null;
  participants?: MatchParticipant[];
}

// For creating new matches
export interface CreateMatchData {
  ambassadorId: string;
  gameMode: string;
  location?: string;
  playedAt: Date;
  participants: Array<{
    userId: string;
    className: string;
    placement: number;
    isWinner: boolean;
    eloBefore: number;
    eloAfter: number;
    eloChange: number;
    eliminations?: number;
  }>;
}

// Match participant slot for the editor
export interface ParticipantSlot {
  userId?: string;
  displayName?: string;
  avatarUrl?: string | null;
  className?: string;
  eliminations: number;
  isWinner: boolean;
  placement?: number;
}

// Game mode types
export type GameMode = 'classic_4' | 'normal_5' | 'free_6plus';