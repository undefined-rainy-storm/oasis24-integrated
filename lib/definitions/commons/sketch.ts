import { Position } from '@/lib/definitions/commons/position'

export type Sketch = {
  id: string,
  name: string,
  basePoint: Position,
  polyline: Array<Position>,
}
