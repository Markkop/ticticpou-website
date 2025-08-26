import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { matches, matchParticipants, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { checkAdminAccess } from '@/lib/auth-utils';

export async function GET() {
  try {
    const { authorized } = await checkAdminAccess(['super-admin', 'ambassador']);
    
    if (!authorized) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const allMatches = await db
      .select({
        id: matches.id,
        gameMode: matches.gameMode,
        location: matches.location,
        playedAt: matches.playedAt,
        createdAt: matches.createdAt,
        ambassador: {
          username: users.username,
          email: users.email,
        },
      })
      .from(matches)
      .leftJoin(users, eq(matches.ambassadorId, users.id));

    // Get participant counts
    const matchesWithCounts = await Promise.all(
      allMatches.map(async (match) => {
        const participantCount = await db
          .select()
          .from(matchParticipants)
          .where(eq(matchParticipants.matchId, match.id));
        
        return {
          ...match,
          participantCount: participantCount.length,
        };
      })
    );
    
    return NextResponse.json(matchesWithCounts);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { authorized, dbUser } = await checkAdminAccess(['super-admin', 'ambassador']);
    
    if (!authorized || !dbUser) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { gameMode, location, playedAt, participants } = body;

    if (!gameMode || !playedAt || !participants || participants.length < 2) {
      return NextResponse.json({ error: 'Invalid match data' }, { status: 400 });
    }

    // Create the match
    const newMatch = await db
      .insert(matches)
      .values({
        ambassadorId: dbUser.id,
        gameMode,
        location: location || null,
        playedAt: new Date(playedAt),
      })
      .returning();

    const matchId = newMatch[0].id;

    // Create match participants with ELO calculation
    for (const participant of participants) {
      const participantUser = await db
        .select({ elo: users.elo })
        .from(users)
        .where(eq(users.id, participant.userId))
        .limit(1);

      const currentElo = participantUser[0]?.elo || 1000;
      const eloChange = participant.isWinner ? 25 : -15; // Simple ELO calculation
      const newElo = Math.max(0, currentElo + eloChange);

      await db.insert(matchParticipants).values({
        matchId,
        userId: participant.userId,
        className: participant.className,
        placement: participant.placement,
        isWinner: participant.isWinner,
        eloBefore: currentElo,
        eloAfter: newElo,
        eloChange,
      });

      // Update user's ELO and win/loss record
      const currentUserData = await db
        .select({ wins: users.wins, losses: users.losses })
        .from(users)
        .where(eq(users.id, participant.userId))
        .limit(1);

      if (participant.isWinner) {
        await db
          .update(users)
          .set({
            elo: newElo,
            wins: (currentUserData[0]?.wins || 0) + 1,
            updatedAt: new Date(),
          })
          .where(eq(users.id, participant.userId));
      } else {
        await db
          .update(users)
          .set({
            elo: newElo,
            losses: (currentUserData[0]?.losses || 0) + 1,
            updatedAt: new Date(),
          })
          .where(eq(users.id, participant.userId));
      }
    }
    
    return NextResponse.json(newMatch[0], { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}