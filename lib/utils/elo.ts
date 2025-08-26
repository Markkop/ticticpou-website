import { ELO_CONFIG } from '@/lib/constants/game';

export function getEloRank(elo: number) {
  const { RANKS } = ELO_CONFIG;
  
  if (elo >= RANKS.MASTER.min) return RANKS.MASTER;
  if (elo >= RANKS.DIAMOND.min) return RANKS.DIAMOND;
  if (elo >= RANKS.GOLD.min) return RANKS.GOLD;
  if (elo >= RANKS.SILVER.min) return RANKS.SILVER;
  return RANKS.BRONZE;
}

export function getEloColor(elo: number): string {
  return getEloRank(elo).color;
}

export function getEloRankName(elo: number): string {
  return getEloRank(elo).name;
}

export function calculateWinRate(wins: number, losses: number): number {
  const totalGames = wins + losses;
  return totalGames > 0 ? (wins / totalGames) * 100 : 0;
}