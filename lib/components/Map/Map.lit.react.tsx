import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react'
import { NaverMap } from './Map.lit'  // Import your Lit element
import { MapType } from '@/lib/definitions/commons/map'
import { Position } from '@/lib/definitions/commons/position'

export interface NaverMapProps {
  mapType: MapType
  wrapperId?: string
  center?: Position
  zoom?: number
  wrapperStyle?: React.CSSProperties
  onReady?: () => void
}

export interface NaverMapRef {
  createPath: (key: string) => void
  getPath: (key: string) => Array<Position>
  setPath: (key: string, value: Array<Position>) => void
  addPath: (key: string, value: Array<Position> | Position) => void
  getCenter: () => naver.maps.LatLng | undefined
  setCenter: (coords: Position) => void
}

export const NaverMapReact = forwardRef<NaverMapRef, NaverMapProps>((props, ref) => {
  const elementRef = useRef<NaverMap>()

  useEffect(() => {
    if (elementRef.current) {
      // Set properties
      elementRef.current.mapType = props.mapType
      if (props.wrapperId) elementRef.current.wrapperId = props.wrapperId
      if (props.center) elementRef.current.center = props.center
      if (props.zoom) elementRef.current.zoom = props.zoom
      if (props.wrapperStyle) elementRef.current.wrapperStyle = props.wrapperStyle
      if (props.onReady) elementRef.current.onReady = () => {
        console.log(false)
        props.onReady
      }
    }
  }, [props])

  useImperativeHandle(ref, () => ({
    createPath: (key: string) => elementRef.current?.createPath(key),
    getPath: (key: string) => elementRef.current?.getPath(key) || [],
    setPath: (key: string, value: Array<Position>) => elementRef.current?.setPath(key, value),
    addPath: (key: string, value: Array<Position> | Position) => elementRef.current?.addPath(key, value),
    getCenter: () => elementRef.current?.getCenter(),
    setCenter: (coords: Position) => elementRef.current?.setCenter(coords),
  }))

  return <naver-map ref={elementRef as any} />
})

NaverMapReact.displayName = 'NaverMapReact'
