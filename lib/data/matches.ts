'use server';

import { db } from '@/lib/db';
import { matches, matchParticipants, users } from '@/lib/db/schema';
import { calculateEloChanges, type GameMode, type PlayerResult } from '@/lib/elo';
import { eq, sql, inArray } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export interface CreateMatchInput {
  ambassadorId: string;
  gameMode: GameMode;
  location?: string;
  playedAt: Date;
  participants: {
    userId: string;
    className: string;
    placement: number;
    eliminations: number;
  }[];
}

export async function createMatch(input: CreateMatchInput) {
  try {
    const participantUsers = await db
      .select()
      .from(users)
      .where(inArray(users.id, input.participants.map(p => p.userId)));

    const userEloMap = new Map(participantUsers.map(u => [u.id, u.elo]));

    const playerResults: PlayerResult[] = input.participants.map(p => ({
      userId: p.userId,
      placement: p.placement,
      eliminations: p.eliminations,
      currentElo: userEloMap.get(p.userId) || 1000,
    }));

    const eloChanges = calculateEloChanges(playerResults);
    const eloChangeMap = new Map(eloChanges.map(e => [e.userId, e]));

    // Create the match first
    const [match] = await db
      .insert(matches)
      .values({
        ambassadorId: input.ambassadorId,
        gameMode: input.gameMode,
        location: input.location,
        playedAt: input.playedAt,
      })
      .returning();

    // Create participant records
    const participantRecords = input.participants.map(p => {
      const eloChange = eloChangeMap.get(p.userId)!;
      return {
        matchId: match.id,
        userId: p.userId,
        className: p.className,
        placement: p.placement,
        eliminations: p.eliminations,
        isWinner: p.placement === 1,
        eloBefore: eloChange.eloBefore,
        eloAfter: eloChange.eloAfter,
        eloChange: eloChange.eloChange,
      };
    });

    // Insert participants
    await db.insert(matchParticipants).values(participantRecords);

    // Update user ELOs and win/loss records
    for (const eloChange of eloChanges) {
      const user = participantUsers.find(u => u.id === eloChange.userId);
      if (user) {
        const isWinner = input.participants.find(p => p.userId === eloChange.userId)?.placement === 1;
        await db
          .update(users)
          .set({
            elo: eloChange.eloAfter,
            wins: isWinner ? user.wins + 1 : user.wins,
            losses: !isWinner ? user.losses + 1 : user.losses,
            updatedAt: new Date(),
          })
          .where(eq(users.id, eloChange.userId));
      }
    }

    revalidatePath('/ranking');
    revalidatePath('/partidas');
    
    return { success: true };
  } catch (error) {
    console.error('Error creating match:', error);
    return { success: false, error: 'Failed to create match' };
  }
}

export async function updateMatch(
  matchId: string,
  updates: Partial<CreateMatchInput>
) {
  try {
    if (updates.participants) {
      const updatedParticipants = updates.participants;
      const participantUsers = await db
        .select()
        .from(users)
        .where(inArray(users.id, updatedParticipants.map(p => p.userId)));

      const oldParticipants = await db
        .select()
        .from(matchParticipants)
        .where(eq(matchParticipants.matchId, matchId));

      // Revert old participants' ELO changes
      for (const oldParticipant of oldParticipants) {
        await db
          .update(users)
          .set({
            elo: oldParticipant.eloBefore,
            wins: sql`${users.wins} - CASE WHEN ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
            losses: sql`${users.losses} - CASE WHEN NOT ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
            updatedAt: new Date(),
          })
          .where(eq(users.id, oldParticipant.userId));
      }

      // Delete old participants
      await db.delete(matchParticipants).where(eq(matchParticipants.matchId, matchId));

      // Calculate new ELO changes
      const userEloMap = new Map(participantUsers.map(u => [u.id, u.elo]));

      const playerResults: PlayerResult[] = updatedParticipants.map(p => ({
        userId: p.userId,
        placement: p.placement,
        eliminations: p.eliminations,
        currentElo: userEloMap.get(p.userId) || 1000,
      }));

      const eloChanges = calculateEloChanges(playerResults);
      const eloChangeMap = new Map(eloChanges.map(e => [e.userId, e]));

      // Create new participant records
      const participantRecords = updatedParticipants.map(p => {
        const eloChange = eloChangeMap.get(p.userId)!;
        return {
          matchId,
          userId: p.userId,
          className: p.className,
          placement: p.placement,
          eliminations: p.eliminations,
          isWinner: p.placement === 1,
          eloBefore: eloChange.eloBefore,
          eloAfter: eloChange.eloAfter,
          eloChange: eloChange.eloChange,
        };
      });

      // Insert new participants
      await db.insert(matchParticipants).values(participantRecords);

      // Apply new ELO changes
      for (const eloChange of eloChanges) {
        const user = participantUsers.find(u => u.id === eloChange.userId);
        if (user) {
          const isWinner = updatedParticipants.find(p => p.userId === eloChange.userId)?.placement === 1;
          await db
            .update(users)
            .set({
              elo: eloChange.eloAfter,
              wins: isWinner ? user.wins + 1 : user.wins,
              losses: !isWinner ? user.losses + 1 : user.losses,
              updatedAt: new Date(),
            })
            .where(eq(users.id, eloChange.userId));
        }
      }
    }

    revalidatePath('/ranking');
    revalidatePath('/partidas');
    
    return { success: true };
  } catch (error) {
    console.error('Error updating match:', error);
    return { success: false, error: 'Failed to update match' };
  }
}

export async function deleteMatch(matchId: string) {
  try {
    const oldParticipants = await db
      .select()
      .from(matchParticipants)
      .where(eq(matchParticipants.matchId, matchId));

    // Revert participants' ELO changes
    for (const oldParticipant of oldParticipants) {
      await db
        .update(users)
        .set({
          elo: oldParticipant.eloBefore,
          wins: sql`${users.wins} - CASE WHEN ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
          losses: sql`${users.losses} - CASE WHEN NOT ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
          updatedAt: new Date(),
        })
        .where(eq(users.id, oldParticipant.userId));
    }

    // Delete the match (participants will be deleted by cascade)
    await db.delete(matches).where(eq(matches.id, matchId));

    revalidatePath('/ranking');
    revalidatePath('/partidas');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting match:', error);
    return { success: false, error: 'Failed to delete match' };
  }
}