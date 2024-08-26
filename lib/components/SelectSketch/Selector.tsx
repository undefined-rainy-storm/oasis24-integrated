import { DirectionsBike, DirectionsWalk } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import '@/app/globals.scss'
import variables from '@/app/variables.module.scss'

export interface ISelector {
  identify: number,
  name: string,
  course: {
    walk: {
      duration: [number | null, number | null],
    },
    cycle: {
      duration: [number | null, number | null],
    }
  },
  length: number,
}

export const Selector = ({ data, onClick }: { data: ISelector, onClick: () => {} }) => {
  const [durationWalkStringState, setDurationWalkStringState] = useState<string>()
  const [durationCycleStringState, setDurationCycleStringState] = useState<string>()

  useEffect(() => {
    const durationWalkStringBuilder: Array<string> = []
    if (data.course.walk.duration[0] != null) {durationWalkStringBuilder.push(`${data.course.walk.duration[0]}시간`)}
    if (data.course.walk.duration[1] != null) {durationWalkStringBuilder.push(`${data.course.walk.duration[1]}분`)}
    setDurationWalkStringState(durationWalkStringBuilder.join(' '))

    const durationCycleStringBuilder: Array<string> = []
    if (data.course.cycle.duration[0] != null) {durationCycleStringBuilder.push(`${data.course.cycle.duration[0]}시간`)}
    if (data.course.cycle.duration[1] != null) {durationCycleStringBuilder.push(`${data.course.cycle.duration[1]}분`)}
    setDurationCycleStringState(durationCycleStringBuilder.join(' '))
  })

  const tableCss = {
    display: 'flex',
    gap: '1em',
  }

  return (
    <>
      <div className="rounded-t-xl" style={{
        width: '300px',
        height: '200px',
        backgroundColor: variables.primaryColor,
        color: 'white',
        padding: '1em',
        borderRadius: '1em',
      }}>
        <h3 className="mb-2">{data.identify}. {data.name}</h3>
        <div className="flex content-center justify-center">
          <table className="table-auto border-seperate border-spacing-y-1 border-spacing-x-2">
            <tbody className="flex flex-col" style={{
              gap: '1em',
            }}>
              <tr style={tableCss}>
                <td className="border">
                  <div><DirectionsWalk /> 도보</div>
                  <div>{durationWalkStringState}</div>
                </td>
                <td className="border">
                  <div><DirectionsBike /> 사이클</div>
                  <div>{durationCycleStringState}</div>
                </td>
              </tr>
              <tr style={tableCss}>
                <td colSpan={2}>
                  <div>총 거리</div>
                  <div>{data.length}km</div>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={onClick}>Start</button>
        </div>
      </div>
    </>
  )
}
