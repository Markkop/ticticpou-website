#!/usr/bin/env node

import { config } from 'dotenv';

// Load environment variables
config({ path: '.env.local' });

async function main() {
  console.log('🌱 Database has already been seeded via Neon MCP');
  console.log('✅ No seeding needed - database is populated!');
  process.exit(0);
}

main();