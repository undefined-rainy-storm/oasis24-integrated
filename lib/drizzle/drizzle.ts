import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'
import { DB_FILENAME } from '@/src/config' 

const sqlite3 = new Database(DB_FILENAME)
export const db = drizzle(sqlite3)
