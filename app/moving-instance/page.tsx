'use client'

import { Map } from '@/lib/components/Map/Map.polyfill'
import { MapType } from '@/lib/definitions/commons/map'
import { Selector } from '@/lib/components/SelectSketch/Selector'

const MovingInstancePage = () => {
  return (
    <div style={{
      position: 'relative',
    }}>
      <Map
        mapType={MapType.naver}
        wrapperStyle={{
          width: '500px',
          height: '800px',
        }}
      />
      <div className="flex content-center justify-center" style={{
        width: '100%',
        height: '30%',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        borderRadius: '1em',
      }}>
        <Selector
          data={{
            identify: 1,
            name: 'name',
            course: {
              walk: {
                duration: [1, 1]
              },
              cycle: {
                duration: [1, 1]
              },
            },
            length: 10
          }}
        />
      </div>
    </div>
  )
}
export default MovingInstancePage
