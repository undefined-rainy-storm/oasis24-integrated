import { sql } from 'drizzle-orm'
import { text, sqliteTable, blob } from 'drizzle-orm/sqlite-core'

import { Position } from '@/lib/definitions/commons/position'
import { MovingInstanceState } from '@/lib/definitions/movingInstance/movingInstance'

export const MovingInstance = sqliteTable('MovingInstance', {
  id: text('id').primaryKey(),
  state: text('state').$type<MovingInstanceState>().notNull().default(MovingInstanceState.generated),
  basePoint: blob('base_point').$type<Position>().notNull(),
  movedPath: blob('moved_path').$type<Array<Position>>(),
})
