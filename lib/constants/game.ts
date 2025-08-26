import type { GameMode } from '@/lib/types/match';

// Game Modes Configuration
export const GAME_MODE_CONFIG = {
  classic_4: { 
    name: 'Clássico', 
    players: 4, 
    classes: ['mago', 'samurai', 'padre', 'cangaceiro'],
    description: 'Partidas com 4 jogadores - formato tradicional'
  },
  normal_5: { 
    name: 'Normal', 
    players: 5, 
    classes: ['mago', 'samurai', 'padre', 'cangaceiro', 'assassino'],
    description: 'Partidas com 5 jogadores - inclui classe Assassino' 
  },
  free_6plus: { 
    name: 'Livre', 
    players: 6, 
    classes: ['all'],
    description: 'Partidas com 6+ jogadores - formato expandido'
  },
} as const satisfies Record<GameMode, {
  name: string;
  players: number;
  classes: string[];
  description: string;
}>;

// ELO Configuration
export const ELO_CONFIG = {
  DEFAULT_ELO: 1000,
  K_FACTOR: 32,
  RANKS: {
    BRONZE: { min: 0, max: 1199, name: 'Bronze', color: 'text-amber-600 dark:text-amber-400' },
    SILVER: { min: 1200, max: 1399, name: 'Prata', color: 'text-gray-500 dark:text-gray-400' },
    GOLD: { min: 1400, max: 1599, name: 'Ouro', color: 'text-yellow-600 dark:text-yellow-400' },
    DIAMOND: { min: 1600, max: 1799, name: 'Diamante', color: 'text-blue-600 dark:text-blue-400' },
    MASTER: { min: 1800, max: Infinity, name: 'Master', color: 'text-purple-600 dark:text-purple-400' },
  }
} as const;

// Match Result Medals  
export const RANK_MEDALS = {
  1: '🥇',
  2: '🥈', 
  3: '🥉',
} as const;

// Class Categories
export const CLASS_CATEGORIES = {
  base: { name: 'Base', color: 'bg-primary/20 text-primary' },
  extra: { name: 'Extra', color: 'bg-accent/20 text-accent-foreground' },
  team: { name: 'Equipe', color: 'bg-secondary/20 text-secondary-foreground' },
} as const;

// User Roles
export const USER_ROLES = {
  user: 'Usuário',
  ambassador: 'Embaixador', 
  'super-admin': 'Super Admin',
} as const;