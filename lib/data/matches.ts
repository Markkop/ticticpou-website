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

    await db.transaction(async (tx) => {
      const [match] = await tx
        .insert(matches)
        .values({
          ambassadorId: input.ambassadorId,
          gameMode: input.gameMode,
          location: input.location,
          playedAt: input.playedAt,
        })
        .returning();

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

      await tx.insert(matchParticipants).values(participantRecords);

      for (const eloChange of eloChanges) {
        const user = participantUsers.find(u => u.id === eloChange.userId);
        if (user) {
          const isWinner = input.participants.find(p => p.userId === eloChange.userId)?.placement === 1;
          await tx
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
    });

    revalidatePath('/ranking');
    revalidatePath('/matches');
    
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

      await db.transaction(async (tx) => {
        for (const oldParticipant of oldParticipants) {
          await tx
            .update(users)
            .set({
              elo: oldParticipant.eloBefore,
              wins: sql`${users.wins} - CASE WHEN ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
              losses: sql`${users.losses} - CASE WHEN NOT ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
              updatedAt: new Date(),
            })
            .where(eq(users.id, oldParticipant.userId));
        }

        await tx.delete(matchParticipants).where(eq(matchParticipants.matchId, matchId));

        const userEloMap = new Map(participantUsers.map(u => [u.id, u.elo]));

        const playerResults: PlayerResult[] = updatedParticipants.map(p => ({
          userId: p.userId,
          placement: p.placement,
          eliminations: p.eliminations,
          currentElo: userEloMap.get(p.userId) || 1000,
        }));

        const eloChanges = calculateEloChanges(playerResults);
        const eloChangeMap = new Map(eloChanges.map(e => [e.userId, e]));

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

        await tx.insert(matchParticipants).values(participantRecords);

        for (const eloChange of eloChanges) {
          const user = participantUsers.find(u => u.id === eloChange.userId);
          if (user) {
            const isWinner = updatedParticipants.find(p => p.userId === eloChange.userId)?.placement === 1;
            await tx
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
      });
    }

    revalidatePath('/ranking');
    revalidatePath('/matches');
    
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

    await db.transaction(async (tx) => {
      for (const oldParticipant of oldParticipants) {
        await tx
          .update(users)
          .set({
            elo: oldParticipant.eloBefore,
            wins: sql`${users.wins} - CASE WHEN ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
            losses: sql`${users.losses} - CASE WHEN NOT ${oldParticipant.isWinner} THEN 1 ELSE 0 END`,
            updatedAt: new Date(),
          })
          .where(eq(users.id, oldParticipant.userId));
      }

      await tx.delete(matches).where(eq(matches.id, matchId));
    });

    revalidatePath('/ranking');
    revalidatePath('/matches');
    
    return { success: true };
  } catch (error) {
    console.error('Error deleting match:', error);
    return { success: false, error: 'Failed to delete match' };
  }
}