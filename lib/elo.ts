export type GameMode = 'classic_4' | 'normal_5' | 'free_6plus';

export interface PlayerResult {
  userId: string;
  placement: number;
  eliminations: number;
  currentElo: number;
}

export interface EloChange {
  userId: string;
  eloBefore: number;
  eloAfter: number;
  eloChange: number;
}

const K_FACTOR = 32;
const ELIMINATION_BONUS = 3;

function calculateExpectedScore(playerElo: number, opponentElo: number): number {
  return 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
}

function getPlacementScore(placement: number, totalPlayers: number): number {
  const normalized = 1 - (placement - 1) / (totalPlayers - 1);
  return normalized;
}

export function calculateEloChanges(
  players: PlayerResult[]
): EloChange[] {
  const totalPlayers = players.length;
  const eloChanges: EloChange[] = [];

  for (const player of players) {
    let totalEloChange = 0;
    const avgOpponentElo = 
      players
        .filter(p => p.userId !== player.userId)
        .reduce((sum, p) => sum + p.currentElo, 0) / (totalPlayers - 1);

    const expectedScore = calculateExpectedScore(player.currentElo, avgOpponentElo);
    const actualScore = getPlacementScore(player.placement, totalPlayers);
    
    const baseEloChange = Math.round(K_FACTOR * (actualScore - expectedScore));
    
    const eliminationBonus = player.eliminations * ELIMINATION_BONUS;
    
    totalEloChange = baseEloChange + eliminationBonus;
    
    const newElo = Math.max(100, player.currentElo + totalEloChange);
    
    eloChanges.push({
      userId: player.userId,
      eloBefore: player.currentElo,
      eloAfter: newElo,
      eloChange: newElo - player.currentElo,
    });
  }

  return eloChanges;
}

export function calculateGlobalElo(
  eloByMode: Partial<Record<GameMode, number>>,
  matchCountByMode: Partial<Record<GameMode, number>>
): number {
  const modes = Object.keys(eloByMode) as GameMode[];
  if (modes.length === 0) return 1000;
  
  let weightedSum = 0;
  let totalWeight = 0;
  
  for (const mode of modes) {
    const elo = eloByMode[mode] || 1000;
    const matches = matchCountByMode[mode] || 0;
    const weight = Math.min(matches, 10);
    
    weightedSum += elo * weight;
    totalWeight += weight;
  }
  
  return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 1000;
}