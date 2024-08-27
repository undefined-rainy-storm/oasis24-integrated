'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState, useRef } from 'react'
import { Map, MapRef } from '@/lib/components/Map/Map.polyfill'
import { MapType } from '@/lib/definitions/commons/map'
import { Position } from '@/lib/definitions/commons/position'
// import { NaverMapComponent } from '@/lib/components/Map/Map.lit.react'
import '@/lib/components/Map/Map.lit'
import { NaverMapReact, NaverMapRef } from '@/lib/components/Map/Map.lit.react'
import { sketches } from '@/src/dataFixed'
import { NaverMap } from '@/lib/components/Map/Map.lit'
import { v4 as uuid } from 'uuid'

const idState = 'dom-wrapper'

const MovingInstancePage = () => {
  const mapRef = useRef<NaverMapRef>(null)
  let element: NaverMap | null

  const init = () => {
    loadPath()
    initGeolocationApi()
  }
  const loadPath = () => {
    element = document.querySelector('naver-map')
    const selected = sketches[3]
    element?.setCenter(selected.basePoint)
    element?.addPath('BASE', selected.polyline)
    const path = element?.getPath('BASE')
    if (path) {
      path.setOptions({
        path: path.getPath(),
        strokeColor: '#4D4D4D',
      })
    }
  }
  const initGeolocationApi = () => {
    element = document.querySelector('naver-map')
    invokeGeolocationHandler()
    element?.addPath('LOC_LOG_STACK', [])
    const path = element?.getPath('LOC_LOG_STACK')
    if (path) {
      path.setOptions({
        path: path.getPath(),
        strokeColor: '#ff0000',
      })
    }
  }

  const invokeGeolocationHandler = () => {
    navigator.geolocation.watchPosition(getGeolocationOnSuccess)
  }
  const getGeolocationOnSuccess = (pos: GeolocationPosition) => {
    const { coords } = pos
    element?.addPath('LOC_LOG_STACK', { lat: coords.latitude, lng: coords.longitude })
    element?.setShape('LOC', new naver.maps.Circle({
      center: { lat: coords.latitude, lng: coords.longitude },
      radius: 1.5,
      fillColor: '#808080',
      strokeColor: 'white'
    }))
    element?.setCenter({ lat: coords.latitude, lng: coords.longitude })
  }
  useEffect(() => {
    // document.querySelector('naver-map')?.addEventListener('init-done', init)
    setTimeout(init, 1000)
  })

  return (
    <div style={{
      position: 'relative',
    }}>
      <naver-map
        mapType={MapType.naver}
        wrapperId={idState}
        center={{ lat: 37.5665, lng: 126.9780 }}
        zoom={19}
      />
      {/*
      <NaverMapReact
        ref={mapRef}
        mapType={MapType.naver}
        center={{ lat: 37.5665, lng: 126.9780 }}
        zoom={10}
        onReady={() => {onReadyHandler()}}
      />*/}
      {/*
      <button onClick={() => {
        mapRef.current?.createPath('somePath')
        mapRef.current?.addPath('somePath', [{lat: -1, lng: -1}])
        const center = mapRef.current?.getCenter()
        console.log(center)
      }}
      style={{zIndex: 10}}
      >asdf</button>*/}
    </div>
  )
}
export default MovingInstancePage
