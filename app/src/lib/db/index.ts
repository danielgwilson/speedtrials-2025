import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';
import { config } from 'dotenv';
import { join } from 'path';

config({ path: join(__dirname, '..', '..', '.env') });

const sql = neon(process.env.POSTGRES_URL!);
export const db = drizzle(sql, { schema });
