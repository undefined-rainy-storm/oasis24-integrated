import Image from 'next/image'
import variables from '@/app/variables.module.scss'
import { CardGrid } from '@/lib/components/CardView/CardGrid'
import { Card } from '@/lib/components/CardView/Card'
import { CourseCard } from '@/lib/components/CardView/Hero/CourseCard'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row-reverse items-center">
      {/* Application Wrapper */}
      <div className="w-full h-screen" style={{
        backgroundColor: variables.primaryColor
      }}>
        {/* Application Upper Part */}
        <div className="h-1/6 flex flex-col items-center justify-center text-white">
          <h1 className="text-3xl" style={{
            fontFamily: variables.highlightFonts,
            fontWeight: 'normal',
          }}>PathPainter</h1>
        </div>
        {/* Application Body Part */}
        <div className="w-full h-5/6 rounded-t-2xl bg-white self-end b-0 p-5">
          {/* Body: Search */}

          {/* Body: Cours */}
          <h2>추천 코스</h2>
          <CardGrid>
            <CourseCard
              data={{
                identify: 1,
                name: 'name',
                course: {
                  duration: [1, 1],
                  length: 1.3
                }
              }}
            ></CourseCard>
          </CardGrid>
          {/* Body: Gallery */}
          {/* Body: Logs */}
        </div>
      </div>
    </main>
  )
}
