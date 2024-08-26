import { Position } from '@/lib/definitions/commons/position'

export class GeolocationHandler {
  locLogStack: Array<Position> = []

  success = (pos: GeolocationPosition) => {
    const { coords } = pos
    this.locLogStack.push({ lat: coords.latitude, lng: coords.longitude })
  }
}
