import { pgTable, text, timestamp, integer, boolean, uuid, json, jsonb, decimal } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Stack Auth ID
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  displayName: text('display_name').notNull(),
  avatarUrl: text('avatar_url'),
  favoriteClass: text('favorite_class'),
  favoriteGameMode: text('favorite_game_mode'),
  interests: json('interests').$type<string[]>(),
  elo: integer('elo').default(1000).notNull(),
  isAmbassador: boolean('is_ambassador').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const matches = pgTable('matches', {
  id: uuid('id').defaultRandom().primaryKey(),
  ambassadorId: text('ambassador_id').references(() => users.id).notNull(),
  gameMode: text('game_mode').notNull(),
  location: text('location'),
  playedAt: timestamp('played_at').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const matchParticipants = pgTable('match_participants', {
  id: uuid('id').defaultRandom().primaryKey(),
  matchId: uuid('match_id').references(() => matches.id, { onDelete: 'cascade' }).notNull(),
  userId: text('user_id').references(() => users.id).notNull(),
  className: text('class_name').notNull(),
  placement: integer('placement').notNull(),
  isWinner: boolean('is_winner').default(false).notNull(),
  eloBefore: integer('elo_before').notNull(),
  eloAfter: integer('elo_after').notNull(),
  eloChange: integer('elo_change').notNull(),
});

export const classStats = pgTable('class_stats', {
  className: text('class_name').primaryKey(),
  totalPicks: integer('total_picks').default(0).notNull(),
  totalWins: integer('total_wins').default(0).notNull(),
  winRate: decimal('win_rate', { precision: 5, scale: 2 }),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Static game data tables
export const classes = pgTable('classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  specialLoadSound: text('special_load_sound'),
  specialUseSound: text('special_use_sound'),
  specialLoadGesture: text('special_load_gesture'),
  specialUseGesture: text('special_use_gesture'),
  interactions: jsonb('interactions').$type<string[]>(), // Class interaction rules
  isBaseClass: boolean('is_base_class').default(false).notNull(),
  category: text('category'), // 'base', 'extra', 'team'
  maxBullets: integer('max_bullets').default(1),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const actions = pgTable('actions', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  sound: text('sound'),
  gesture: text('gesture'),
  category: text('category').notNull(), // 'basic', 'special', 'finisher'
  className: text('class_name'), // If action is class-specific
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const gameModes = pgTable('game_modes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').unique().notNull(),
  description: text('description').notNull(),
  rules: jsonb('rules').$type<Record<string, unknown>>(),
  minPlayers: integer('min_players').default(3).notNull(),
  maxPlayers: integer('max_players'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Relations
export const userRelations = relations(users, ({ many }) => ({
  ambassadorMatches: many(matches),
  participations: many(matchParticipants),
}));

export const matchRelations = relations(matches, ({ one, many }) => ({
  ambassador: one(users, {
    fields: [matches.ambassadorId],
    references: [users.id],
  }),
  participants: many(matchParticipants),
}));

export const matchParticipantRelations = relations(matchParticipants, ({ one }) => ({
  match: one(matches, {
    fields: [matchParticipants.matchId],
    references: [matches.id],
  }),
  user: one(users, {
    fields: [matchParticipants.userId],
    references: [users.id],
  }),
}));

export const classRelations = relations(classes, ({ many }) => ({
  actions: many(actions),
}));

export const actionRelations = relations(actions, ({ one }) => ({
  class: one(classes, {
    fields: [actions.className],
    references: [classes.name],
  }),
}));