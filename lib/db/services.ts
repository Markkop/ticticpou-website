import { db } from './index';
import { classes, actions, gameModes, users, matches, matchParticipants } from './schema';
import { eq, desc, sql, count, avg, sum, asc } from 'drizzle-orm';
import type { Class, Action, GameMode } from './index';
import type { User, CreateUserData, UpdateUserData } from '@/lib/types/user';

// Classes service
export const classesService = {
  async getAll(): Promise<Class[]> {
    return await db.select().from(classes).orderBy(asc(classes.orderPriority), classes.category, classes.name);
  },

  async getByCategory(category: 'base' | 'extra' | 'team'): Promise<Class[]> {
    return await db.select().from(classes).where(eq(classes.category, category)).orderBy(asc(classes.orderPriority), classes.name);
  },

  async getBaseClasses(): Promise<Class[]> {
    return await db.select().from(classes).where(eq(classes.isBaseClass, true)).orderBy(asc(classes.orderPriority), classes.name);
  },

  async getByName(name: string): Promise<Class | undefined> {
    const result = await db.select().from(classes).where(eq(classes.name, name)).limit(1);
    return result[0];
  }
};

// Actions service
export const actionsService = {
  async getAll(): Promise<Action[]> {
    return await db.select().from(actions).orderBy(actions.category, actions.name);
  },

  async getByCategory(category: 'basic' | 'special' | 'finisher'): Promise<Action[]> {
    return await db.select().from(actions).where(eq(actions.category, category));
  },

  async getByClass(className: string): Promise<Action[]> {
    return await db.select().from(actions).where(eq(actions.className, className));
  },

  async getBasicActions(): Promise<Action[]> {
    return await db.select().from(actions).where(eq(actions.category, 'basic'));
  },

  async search(term: string): Promise<Action[]> {
    return await db.select().from(actions).where(
      sql`LOWER(${actions.name}) LIKE ${`%${term.toLowerCase()}%`} OR 
          LOWER(${actions.description}) LIKE ${`%${term.toLowerCase()}%`} OR
          LOWER(${actions.sound}) LIKE ${`%${term.toLowerCase()}%`}`
    );
  }
};

// Game Modes service
export const gameModesService = {
  async getAll(): Promise<GameMode[]> {
    return await db.select().from(gameModes).orderBy(gameModes.name);
  },

  async getByName(name: string): Promise<GameMode | undefined> {
    const result = await db.select().from(gameModes).where(eq(gameModes.name, name)).limit(1);
    return result[0];
  }
};

// Users service
export const usersService = {
  async getAll(): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.elo));
  },

  async getById(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  },

  async getByPublicId(publicId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.publicId, publicId)).limit(1);
    return result[0];
  },

  async getByDisplayName(displayName: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.displayName, displayName)).limit(1);
    return result[0];
  },

  async getRanking(limit: number = 100): Promise<User[]> {
    return await db.select().from(users).orderBy(desc(users.elo)).limit(limit);
  },

  async findByStackId(stackId: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.stackId, stackId)).limit(1);
    return result[0];
  },

  async updateProfile(publicId: string, updates: UpdateUserData) {
    return await db.update(users).set({
      ...updates,
      updatedAt: new Date()
    }).where(eq(users.publicId, publicId));
  },

  async updateProfileByStackId(stackId: string, updates: UpdateUserData) {
    return await db.update(users).set({
      ...updates,
      updatedAt: new Date()
    }).where(eq(users.stackId, stackId));
  },

  async create(userData: CreateUserData): Promise<User> {
    // Generate a unique text ID for the current schema
    const uniqueId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create insert data with defaults
    const insertData = {
      id: uniqueId,
      stackId: userData.stackId,
      email: userData.email,
      displayName: userData.displayName,
      avatarUrl: userData.avatarUrl || null,
      favoriteClass: userData.favoriteClass || null,
      favoriteGameMode: userData.favoriteGameMode || null,
      elo: userData.elo || 1000,
      wins: userData.wins || 0,
      losses: userData.losses || 0,
      isAmbassador: userData.isAmbassador || false,
      role: userData.role || 'user',
    };
    
    const [result] = await db.insert(users).values(insertData).returning();
    return result;
  }
};

// Matches service
export const matchesService = {
  async getAll() {
    const matchesData = await db.select({
      id: matches.id,
      ambassadorId: matches.ambassadorId,
      gameMode: matches.gameMode,
      location: matches.location,
      playedAt: matches.playedAt,
      createdAt: matches.createdAt,
      ambassador: {
        id: users.id,
        publicId: users.publicId,
        displayName: users.displayName,
      }
    })
    .from(matches)
    .leftJoin(users, eq(matches.ambassadorId, users.id))
    .orderBy(desc(matches.playedAt));

    // Get participants for each match
    const enrichedMatches = await Promise.all(
      matchesData.map(async (match) => {
        const participants = await db.select({
          userId: matchParticipants.userId,
          userPublicId: users.publicId,
          displayName: users.displayName,
          avatarUrl: users.avatarUrl,
          className: matchParticipants.className,
          placement: matchParticipants.placement,
          isWinner: matchParticipants.isWinner,
          eliminations: matchParticipants.eliminations,
          eloChange: matchParticipants.eloChange,
          eloAfter: matchParticipants.eloAfter,
        })
        .from(matchParticipants)
        .leftJoin(users, eq(matchParticipants.userId, users.id))
        .where(eq(matchParticipants.matchId, match.id))
        .orderBy(matchParticipants.placement);

        return {
          ...match,
          participants
        };
      })
    );

    return enrichedMatches;
  },

  async getById(id: string) {
    const matchResult = await db.select({
      id: matches.id,
      ambassadorId: matches.ambassadorId,
      gameMode: matches.gameMode,
      location: matches.location,
      playedAt: matches.playedAt,
      createdAt: matches.createdAt,
      ambassador: {
        publicId: users.publicId,
        displayName: users.displayName,
      }
    })
    .from(matches)
    .leftJoin(users, eq(matches.ambassadorId, users.id))
    .where(eq(matches.id, id))
    .limit(1);

    if (!matchResult[0]) return null;

    const participantsResult = await db.select({
      id: matchParticipants.id,
      userId: matchParticipants.userId,
      className: matchParticipants.className,
      placement: matchParticipants.placement,
      isWinner: matchParticipants.isWinner,
      eloBefore: matchParticipants.eloBefore,
      eloAfter: matchParticipants.eloAfter,
      eloChange: matchParticipants.eloChange,
      user: {
        publicId: users.publicId,
        displayName: users.displayName,
      }
    })
    .from(matchParticipants)
    .leftJoin(users, eq(matchParticipants.userId, users.id))
    .where(eq(matchParticipants.matchId, id))
    .orderBy(matchParticipants.placement);

    return {
      ...matchResult[0],
      participants: participantsResult
    };
  },

  async create(matchData: {
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
    }>;
  }) {
    // Insert match
    const [newMatch] = await db.insert(matches).values({
      ambassadorId: matchData.ambassadorId,
      gameMode: matchData.gameMode,
      location: matchData.location,
      playedAt: matchData.playedAt,
      createdAt: new Date()
    }).returning();

    // Insert participants
    const participants = await db.insert(matchParticipants).values(
      matchData.participants.map(p => ({
        matchId: newMatch.id,
        userId: p.userId,
        className: p.className,
        placement: p.placement,
        isWinner: p.isWinner,
        eloBefore: p.eloBefore,
        eloAfter: p.eloAfter,
        eloChange: p.eloChange
      }))
    ).returning();

    // Update user ELOs
    for (const participant of matchData.participants) {
      await db.update(users)
        .set({ 
          elo: participant.eloAfter,
          updatedAt: new Date()
        })
        .where(eq(users.id, participant.userId));
    }

    return { match: newMatch, participants };
  }
};

// Stats service
export const statsService = {
  async getGlobalStats() {
    const [
      totalUsersResult,
      totalMatchesResult,
      avgEloResult,
      topClassResult
    ] = await Promise.all([
      db.select({ count: count() }).from(users),
      db.select({ count: count() }).from(matches),
      db.select({ avg: avg(users.elo) }).from(users),
      db.select({
        className: matchParticipants.className,
        picks: count()
      })
      .from(matchParticipants)
      .groupBy(matchParticipants.className)
      .orderBy(desc(count()))
      .limit(1)
    ]);

    return {
      totalPlayers: totalUsersResult[0]?.count || 0,
      totalMatches: totalMatchesResult[0]?.count || 0,
      averageElo: Math.round(Number(avgEloResult[0]?.avg || 1000)),
      topClass: topClassResult[0]?.className || 'N/A'
    };
  },

  async getClassStats() {
    return await db.select({
      className: matchParticipants.className,
      totalPicks: count(),
      totalWins: sum(sql`CASE WHEN ${matchParticipants.isWinner} THEN 1 ELSE 0 END`),
      winRate: sql`ROUND(
        (SUM(CASE WHEN ${matchParticipants.isWinner} THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*)), 
        2
      )`
    })
    .from(matchParticipants)
    .groupBy(matchParticipants.className)
    .orderBy(desc(count()));
  },

  async getUserStats(userId: string) {
    const [wins, losses, totalMatches] = await Promise.all([
      db.select({ count: count() })
        .from(matchParticipants)
        .where(sql`${matchParticipants.userId} = ${userId} AND ${matchParticipants.isWinner} = true`),
      db.select({ count: count() })
        .from(matchParticipants)
        .where(sql`${matchParticipants.userId} = ${userId} AND ${matchParticipants.isWinner} = false`),
      db.select({ count: count() })
        .from(matchParticipants)
        .where(eq(matchParticipants.userId, userId))
    ]);

    const winsCount = wins[0]?.count || 0;
    const lossesCount = losses[0]?.count || 0;
    const totalCount = totalMatches[0]?.count || 0;

    return {
      wins: winsCount,
      losses: lossesCount,
      totalMatches: totalCount,
      winRate: totalCount > 0 ? Number(((winsCount / totalCount) * 100).toFixed(1)) : 0
    };
  }
};

export const databaseService = {
  classes: classesService,
  actions: actionsService,
  gameModes: gameModesService,
  users: usersService,
  matches: matchesService,
  stats: statsService
};