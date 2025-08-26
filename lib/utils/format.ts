import { RANK_MEDALS } from '@/lib/constants/game';

export function formatRank(rank: number): string {
  return RANK_MEDALS[rank as keyof typeof RANK_MEDALS] || `#${rank}`;
}

export function formatWinRate(wins: number, losses: number): string {
  const total = wins + losses;
  if (total === 0) return '0.0%';
  return `${((wins / total) * 100).toFixed(1)}%`;
}

export function formatMatchRecord(wins: number, losses: number): string {
  return `${wins}V / ${losses}D`;
}

export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('pt-BR');
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('pt-BR');
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}