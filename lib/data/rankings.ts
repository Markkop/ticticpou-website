'use server';

import { db } from '@/lib/db';
import { users, matchParticipants, matches } from '@/lib/db/schema';
import { desc, eq, and, sql } from 'drizzle-orm';
import { type GameMode } from '@/lib/elo';

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

export async function getRankingsByGameMode(
  gameMode: GameMode | 'global',
  limit: number = 100
): Promise<RankingEntry[]> {
  try {
    if (gameMode === 'global') {
      const allUsers = await db.select().from(users).orderBy(desc(users.elo));
      
      const rankings: RankingEntry[] = [];
      
      for (const user of allUsers) {
        const allParticipations = await db
          .select({
            gameMode: matches.gameMode,
            eliminations: matchParticipants.eliminations,
            isWinner: matchParticipants.isWinner,
          })
          .from(matchParticipants)
          .innerJoin(matches, eq(matches.id, matchParticipants.matchId))
          .where(eq(matchParticipants.userId, user.id));
        
        const matchCountByMode: Partial<Record<GameMode, number>> = {};
        let totalEliminations = 0;
        
        for (const participation of allParticipations) {
          const mode = participation.gameMode as GameMode;
          if (!matchCountByMode[mode]) {
            matchCountByMode[mode] = 0;
          }
          matchCountByMode[mode]!++;
          totalEliminations += participation.eliminations;
        }
        
        const totalMatches = user.wins + user.losses;
        const winRate = totalMatches > 0 ? (user.wins / totalMatches) * 100 : 0;
        const avgEliminations = totalMatches > 0 ? totalEliminations / totalMatches : 0;
        
        rankings.push({
          userId: user.id,
          userPublicId: user.publicId,
          displayName: user.displayName,
          avatarUrl: user.avatarUrl,
          elo: user.elo,
          wins: user.wins,
          losses: user.losses,
          winRate,
          totalMatches,
          eliminations: totalEliminations,
          avgEliminations,
          rank: 0,
        });
      }
      
      rankings.sort((a, b) => b.elo - a.elo);
      
      rankings.forEach((entry, index) => {
        entry.rank = index + 1;
      });
      
      return rankings.slice(0, limit);
    } else {
      const usersWithStats = await db
        .select({
          user: users,
          matchCount: sql<number>`COUNT(DISTINCT ${matchParticipants.matchId})`,
          totalEliminations: sql<number>`COALESCE(SUM(${matchParticipants.eliminations}), 0)`,
          modeWins: sql<number>`COUNT(CASE WHEN ${matchParticipants.isWinner} THEN 1 END)`,
          modeLosses: sql<number>`COUNT(CASE WHEN NOT ${matchParticipants.isWinner} THEN 1 END)`,
        })
        .from(users)
        .leftJoin(
          matchParticipants,
          eq(matchParticipants.userId, users.id)
        )
        .leftJoin(
          matches,
          and(
            eq(matches.id, matchParticipants.matchId),
            eq(matches.gameMode, gameMode)
          )
        )
        .groupBy(users.id)
        .having(sql`COUNT(DISTINCT ${matchParticipants.matchId}) > 0`)
        .orderBy(desc(users.elo))
        .limit(limit);
      
      const rankings: RankingEntry[] = usersWithStats.map((row, index) => {
        const totalMatches = Number(row.matchCount) || 0;
        const totalEliminations = Number(row.totalEliminations) || 0;
        const wins = Number(row.modeWins) || 0;
        const losses = Number(row.modeLosses) || 0;
        const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;
        const avgEliminations = totalMatches > 0 ? totalEliminations / totalMatches : 0;
        
        return {
          userId: row.user.id,
          userPublicId: row.user.publicId,
          displayName: row.user.displayName,
          avatarUrl: row.user.avatarUrl,
          elo: row.user.elo,
          wins,
          losses,
          winRate,
          totalMatches,
          eliminations: totalEliminations,
          avgEliminations,
          rank: index + 1,
        };
      });
      
      return rankings;
    }
  } catch (error) {
    console.error('Error fetching rankings:', error);
    return [];
  }
}

export async function getUserRankingStats(
  userId: string,
  gameMode: GameMode | 'global'
): Promise<RankingEntry | null> {
  try {
    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);
    
    if (!user.length) return null;
    
    const userData = user[0];
    
    if (gameMode === 'global') {
      const allParticipations = await db
        .select({
          eliminations: matchParticipants.eliminations,
        })
        .from(matchParticipants)
        .where(eq(matchParticipants.userId, userId));
      
      const totalEliminations = allParticipations.reduce((sum, p) => sum + p.eliminations, 0);
      const totalMatches = userData.wins + userData.losses;
      const winRate = totalMatches > 0 ? (userData.wins / totalMatches) * 100 : 0;
      const avgEliminations = totalMatches > 0 ? totalEliminations / totalMatches : 0;
      
      const rank = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(users)
        .where(sql`${users.elo} > ${userData.elo}`)
        .then(result => (result[0]?.count || 0) + 1);
      
      return {
        userId: userData.id,
        userPublicId: userData.publicId,
        displayName: userData.displayName,
        avatarUrl: userData.avatarUrl,
        elo: userData.elo,
        wins: userData.wins,
        losses: userData.losses,
        winRate,
        totalMatches,
        eliminations: totalEliminations,
        avgEliminations,
        rank,
      };
    } else {
      const modeParticipations = await db
        .select({
          eliminations: matchParticipants.eliminations,
          isWinner: matchParticipants.isWinner,
        })
        .from(matchParticipants)
        .innerJoin(matches, eq(matches.id, matchParticipants.matchId))
        .where(
          and(
            eq(matchParticipants.userId, userId),
            eq(matches.gameMode, gameMode)
          )
        );
      
      const totalEliminations = modeParticipations.reduce((sum, p) => sum + p.eliminations, 0);
      const wins = modeParticipations.filter(p => p.isWinner).length;
      const losses = modeParticipations.filter(p => !p.isWinner).length;
      const totalMatches = wins + losses;
      const winRate = totalMatches > 0 ? (wins / totalMatches) * 100 : 0;
      const avgEliminations = totalMatches > 0 ? totalEliminations / totalMatches : 0;
      
      const usersInMode = await db
        .select({ userId: matchParticipants.userId })
        .from(matchParticipants)
        .innerJoin(matches, eq(matches.id, matchParticipants.matchId))
        .where(eq(matches.gameMode, gameMode))
        .groupBy(matchParticipants.userId);
      
      const rank = await db
        .select({ count: sql<number>`COUNT(*)` })
        .from(users)
        .where(
          and(
            sql`${users.elo} > ${userData.elo}`,
            sql`${users.id} IN (${sql.raw(usersInMode.map(u => `'${u.userId}'`).join(','))})`
          )
        )
        .then(result => (result[0]?.count || 0) + 1);
      
      return {
        userId: userData.id,
        userPublicId: userData.publicId,
        displayName: userData.displayName,
        avatarUrl: userData.avatarUrl,
        elo: userData.elo,
        wins,
        losses,
        winRate,
        totalMatches,
        eliminations: totalEliminations,
        avgEliminations,
        rank,
      };
    }
  } catch (error) {
    console.error('Error fetching user ranking stats:', error);
    return null;
  }
}