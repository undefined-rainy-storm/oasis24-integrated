import { Header } from '@/lib/components/Header/Header'

const MovingInstanceLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main className="flex min-h-screen flex-row-reverse items-center">
      <div className="w-full h-screen">
        <Header
          title={'추천 코스'}
        />
        <div className="w-full rounded-t-2xl bg-white self-end b-0" style={{
          height: '100%',
        }}>
          { children }
        </div>
      </div>
    </main>
  )
}
export default MovingInstanceLayout
