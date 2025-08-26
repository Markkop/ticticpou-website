import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL environment variable is not set. Please check your .env.local file.'
  );
}

const sql = neon(connectionString);
export const db = drizzle(sql, { schema });

export type User = typeof schema.users.$inferSelect;
export type NewUser = typeof schema.users.$inferInsert;
export type Match = typeof schema.matches.$inferSelect;
export type NewMatch = typeof schema.matches.$inferInsert;
export type MatchParticipant = typeof schema.matchParticipants.$inferSelect;
export type NewMatchParticipant = typeof schema.matchParticipants.$inferInsert;
export type Class = typeof schema.classes.$inferSelect;
export type NewClass = typeof schema.classes.$inferInsert;
export type Action = typeof schema.actions.$inferSelect;
export type NewAction = typeof schema.actions.$inferInsert;
export type GameMode = typeof schema.gameModes.$inferSelect;
export type NewGameMode = typeof schema.gameModes.$inferInsert;
export type ClassStats = typeof schema.classStats.$inferSelect;
export type NewClassStats = typeof schema.classStats.$inferInsert;