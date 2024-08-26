import { Map } from '@/lib/components/Map/Map.polyfill'
import { MapType } from '@/lib/definitions/commons/map'

const MovingInstancePage = () => {
  return (
    <>
      <Map
        mapType={MapType.naver}
      />
    </>
  )
}
export default MovingInstancePage
