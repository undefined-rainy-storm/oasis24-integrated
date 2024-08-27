import { LitElement, html, css, PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { MapType } from '@/lib/definitions/commons/map'
import type { Position } from '@/lib/definitions/commons/position'
import { NCP_CLIENT_ID, MAP_WRAPPER_ELEMENT_DEFAULT_ID, MAP_WRAPPER_POLYFILL_NAVER_INIT_ZOOM } from '@/src/config'

@customElement('naver-map')
export class NaverMap extends LitElement {
  @property({ type: String }) mapType: MapType = MapType.naver
  @property({ type: String }) wrapperId: string = MAP_WRAPPER_ELEMENT_DEFAULT_ID
  @property({ type: Object }) center?: Position
  @property({ type: Number }) zoom: number = MAP_WRAPPER_POLYFILL_NAVER_INIT_ZOOM
  @property({ type: Object }) wrapperStyle?: Object
  @property({ type: Function }) onReady?: () => void

  @state() private mapState?: naver.maps.Map
  @state() private pathState: {[key: string]: naver.maps.Polyline} = {}
  @state() private shapeState: {[key: string]: naver.maps.AbstractShapeOverlay} = {}

  static styles = css`
    :host {
      display: block
    }
  `

  firstUpdated() {
    this.loadNaverMapsScript()
  }

  updated(changedProperties: PropertyValues) {
    if (changedProperties.has('center') && this.center === undefined) {
      this.getCurrentPosition()
    }
  }

  render() {
    return html`
      <div
        style='width: 500px; height: 800px; display: block'
        id=${this.wrapperId}
      ></div>
    `
  }

  private loadNaverMapsScript() {
    if (this.mapType === MapType.naver) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${NCP_CLIENT_ID}`
      script.onload = () => this.initElementOnLoad()
      document.body.appendChild(script)
    }
  }

  private initElementOnLoad() {
    const centerPosition = this.center ?? { lat: 35.14770, lng: 126.9119 }
    const mapBoxElement = this.shadowRoot!.getElementById(this.wrapperId)
    this.mapState = new naver.maps.Map(
      mapBoxElement!,
      {
        center: new naver.maps.LatLng(centerPosition.lat, centerPosition.lng),
        zoom: this.zoom
      }
    )
    if (this.onReady) {
      this.onReady()
    }
  }

  private getCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        this.setCenter({ lat: coords.latitude, lng: coords.longitude })
      })
    }
  }

  createPath(key: string) {
    this.pathState[key] = new naver.maps.Polyline({
      map: this.mapState,
      path: []
    })
    this.requestUpdate('pathState')
  }

  getPath(key: string): naver.maps.Polyline {
    return this.pathState[key]
  }

  setPath(key: string, value: naver.maps.Polyline) {
    this.pathState[key] = value
    this.requestUpdate('pathState')
  }

  getShape(key: string): naver.maps.AbstractShapeOverlay {
    return this.shapeState[key]
  }
  setShape(key: string, value: naver.maps.AbstractShapeOverlay) {
    value.setOptions({map: this.mapState})
    console.log(value)
    this.shapeState[key] = value
    this.requestUpdate('shapeState')
  }

  addPath(key: string, value: Array<Position> | Position) {
    if (!this.pathState[key]) {
      this.createPath(key)
    }
    
    const newPathArray = []
    if (Array.isArray(value)) {
      for (const each of value) {
        this.pathState[key].getPath().push(new naver.maps.LatLng(each.lat, each.lng))
      }
      newPathArray.push()
    } else {
      this.pathState[key].getPath().push(new naver.maps.LatLng(value.lat, value.lng))
    }
    this.requestUpdate('pathState')
  }

  getCenter(): naver.maps.LatLng | undefined {
    const coord = this.mapState?.getCenter()
    return new naver.maps.LatLng(coord?.x ?? -1, coord?.y ?? -1)
  }

  setCenter(coords: Position) {
    this.mapState?.setCenter(new naver.maps.LatLng(coords.lat, coords.lng))
  }
}

declare global {
  namespace JSX {
    interface IntrinsicElements extends HTMLElement {
      'naver-map': NaverMap
    }
  }
}