'use client'

import { useState, useRef, useEffect, CSSProperties, useImperativeHandle, forwardRef } from 'react'
import Script from 'next/script'
import { MapType } from '@/lib/definitions/commons/map'
import { Position } from '@/lib/definitions/commons/position'
import { NCP_CLIENT_ID, MAP_WRAPPER_ELEMENT_DEFAULT_ID, MAP_WRAPPER_POLYFILL_NAVER_INIT_ZOOM } from '@/src/config'

interface IMap {
  mapType: MapType,
  wrapperId?: string,
  center?: Position,
  zoom?: number,
  wrapperStyle?: CSSProperties,
  ref?: any
}

export type MapRef = {
  createPath: (key: string) => void,
  getPath: (key: string) => Array<Position>,
  setPath: (key: string, value: Array<Position>) => void,
  addPath: (key: string, value: Array<Position> | Position) => void,
  getCenter: () => naver.maps.LatLng | undefined,
  setCenter: (coords: Position) => void,
}

export const Map = forwardRef<MapRef, IMap>((props, ref) => {
  const [mapState, setMapState] = useState<naver.maps.Map>()
  const [pathState, setPathState] = useState<{[key: string]: Array<Position>}>()

  const wrapperId = props.wrapperId ?? MAP_WRAPPER_ELEMENT_DEFAULT_ID
  const zoom = props.zoom ?? MAP_WRAPPER_POLYFILL_NAVER_INIT_ZOOM
  const dynCenterEnabled = props.center === undefined
  const center: Position = props.center ?? { lat: 35.14770, lng: 126.9119 }

  useEffect(() => {
    if (dynCenterEnabled) {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(({ coords }) => {
          setCenter({ lat: coords.latitude, lng: coords.longitude })
        })
      }
    }
  }, [dynCenterEnabled])

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
    return pathState![key]
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
    mapState?.setCenter(new naver.maps.LatLng(coords.lat, coords.lng))
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

  useImperativeHandle(ref, () => ({
    createPath,
    getPath,
    setPath,
    addPath,
    getCenter,
    setCenter,
  }), [pathState])

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
        style={props?.wrapperStyle}
        id={wrapperId}
      ></div>
    </>
  )
})
