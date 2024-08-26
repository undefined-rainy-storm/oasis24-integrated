'use client'

import { useState, useRef, useEffect } from 'react'
import Script from 'next/script'
import { MapType } from '@/lib/definitions/commons/map'
import { Position } from '@/lib/definitions/commons/position'
import { NCP_CLIENT_ID, MAP_WRAPPER_ELEMENT_DEFAULT_ID, MAP_WRAPPER_POLYFILL_NAVER_INIT_ZOOM } from '@/src/config'

interface IMap {
  mapType: MapType,
  wrapperId?: string,
  center?: Position,
  zoom?: number,
}

export const Map: React.FC<IMap> = ({ ...props }) => {
  const [mapState, setMapState] = useState<naver.maps.Map>()
  const [pathState, setPathState] = useState<{[key: string]: Array<Position>}>()
  const ref = useRef()

  const wrapperId = props.wrapperId ?? MAP_WRAPPER_ELEMENT_DEFAULT_ID
  const zoom = props.zoom ?? MAP_WRAPPER_POLYFILL_NAVER_INIT_ZOOM
  const dynCenterEnabled = props.center === undefined
  const center: Position = props.center ?? { lat: 35.14770, lng: 126.9119 }

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        console.log(coords)
        setCenter({ lat: coords.latitude, lng: coords.longitude })
      })
    }
  })

  const initPath = () => {
    if (pathState === undefined) {
      setPathState({})
    }
  }
  const createPath = (key: string) => {
    initPath()
    pathState![key] = []
  }
  const getPath = (key: string) => {
    initPath()
    return pathState![key] = []
  }
  const setPath = (key: string, value: Array<Position>) => {
    initPath()
    pathState![key] = value
  }
  const addPath = (key: string, value: Array<Position> | Position) => {
    initPath()
    if (typeof value === typeof Array<Position>)
      pathState![key] = pathState![key].concat(value)
    else
      pathState![key].push(value as Position)
  }
  initPath()

  const getCenter = () => {
    mapState?.getCenter()
  }
  const setCenter = (coords: Position) => {
    mapState?.setCenter(new naver.maps.Point(coords.lat, coords.lng))
  }

  const initElementOnLoad = () => {
    setMapState(new naver.maps.Map(
      wrapperId,
      {
        center: new naver.maps.LatLng(center.lat, center.lng),
        zoom: zoom
      }
    ))
  }

  return (
    <>
      {
        props.mapType == MapType.naver && <Script
          strategy='afterInteractive'
          type='text/javascript'
          src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NCP_CLIENT_ID}`}
          onReady={initElementOnLoad}
        />
      }
      <div
        style={{
          width: '100%',
          height: '100%',
        }}
        id={wrapperId}
      ></div>
    </>
  )
}
