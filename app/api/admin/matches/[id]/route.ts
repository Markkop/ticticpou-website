import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { matches, matchParticipants, users } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { checkAdminAccess } from '@/lib/auth-utils';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { authorized } = await checkAdminAccess(['super-admin', 'ambassador']);
    
    if (!authorized) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { id: matchId } = await params;

    // Get all participants to reverse ELO changes
    const participants = await db
      .select()
      .from(matchParticipants)
      .where(eq(matchParticipants.matchId, matchId));

    // Reverse ELO changes and win/loss counts
    for (const participant of participants) {
      const currentUser = await db
        .select({ elo: users.elo, wins: users.wins, losses: users.losses })
        .from(users)
        .where(eq(users.id, participant.userId))
        .limit(1);

      if (currentUser[0]) {
        const restoredElo = participant.eloBefore;
        const newWins = participant.isWinner 
          ? Math.max(0, currentUser[0].wins - 1)
          : currentUser[0].wins;
        const newLosses = !participant.isWinner 
          ? Math.max(0, currentUser[0].losses - 1)
          : currentUser[0].losses;

        await db
          .update(users)
          .set({
            elo: restoredElo,
            wins: newWins,
            losses: newLosses,
            updatedAt: new Date(),
          })
          .where(eq(users.id, participant.userId));
      }
    }

    // Delete the match (participants will be deleted due to cascade)
    await db.delete(matches).where(eq(matches.id, matchId));
    
    return NextResponse.json({ message: 'Match deleted successfully' });
  } catch (error) {
    console.error('Error deleting match:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}