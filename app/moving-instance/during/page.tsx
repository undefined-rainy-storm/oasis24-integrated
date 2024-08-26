'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import { Map, MapRef } from '@/lib/components/Map/Map.polyfill'
import { MapType } from '@/lib/definitions/commons/map'
import { Position } from '@/lib/definitions/commons/position'
// import { NaverMapComponent } from '@/lib/components/Map/Map.lit.react'
import '@/lib/components/Map/Map.lit'
import { NaverMapReact, NaverMapRef } from '@/lib/components/Map/Map.lit.react'
import { sketches } from '@/src/dataFixed'

const MovingInstancePage = () => {
  const mapRef = useRef<NaverMapRef>(null)

  const loadPath = () => {
    const element = document.querySelector('naver-map')
    const selected = sketches[0]
    element.setCenter(selected.basePoint)
    console.log(selected.basePoint)
    console.log(element.getCenter())
    element.addPath('BASE', selected.polyline)
    console.log(element.getPath('BASE'))
  }

  useEffect(() => {
    loadPath()
  })

  return (
    <div style={{
      position: 'relative',
    }}>
      <naver-map
        center={{ lat: 37.5665, lng: 126.9780 }}
        zoom={17}
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
