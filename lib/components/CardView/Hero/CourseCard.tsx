'use client'

import { Card } from '@/lib/components/CardView/Card'
import { useEffect, useState } from 'react'

interface ICourseCard {
  identify: number,
  name: string,
  course: {
    duration: [number | null, number | null],
    length: number
  }
}

export const CourseCard = ({ data }: { data: ICourseCard }) => {
  const [durationStringState, setDurationStringState] = useState<string>()
  useEffect(() => {
    const durationStringBuilder: Array<string> = []
    if (data.course.duration[0] !== null) { durationStringBuilder.push(`${data.course.duration[0]}시간`) }
    if (data.course.duration[1] !== null) { durationStringBuilder.push(`${data.course.duration[1]}분`) }
    setDurationStringState(durationStringBuilder.join(' '))
  })
  return (
    <Card>
      <h3>{ data.identify }. { data.name }</h3>
      <div className="grid grid-3">
        <table className="table-auto border-spacing-x-2">
          <tbody>
            <tr>
              <td className="border">소요시간</td>
              <td className="border">{ durationStringState }</td>
            </tr>
            <tr>
              <td className="border">총 거리</td>
              <td className="border">{ data.course.length } km</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  )
}
