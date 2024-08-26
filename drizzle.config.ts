import { defineConfig } from 'drizzle-kit'
import { DB_FILENAME } from '@/src/config'

export default defineConfig({
  dialect: 'sqlite',
  schema: './lib/drizzle/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: `file:${DB_FILENAME}`
  }
})
