'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeftIcon, ThreeBarsIcon } from '@primer/octicons-react'

interface IHeader {
  title: React.ReactNode
}

export const Header: React.FC<IHeader> = ({ ...props }) => {
  const router = useRouter()
  return (
    <div className="h-1/6 flex flex-row items-center justify-center">
      <div className="flex flex-row justify-start align-center m-8" style={{
        flex: .3,
        paddingLeft: '1em',
        cursor: 'pointer',
      }}
        onClick={() => router.back()}
      >
        <ChevronLeftIcon size={28}/>
      </div>
      <div className="flex justify-center grow align-center" style={{
        flex: 1,
        padding: '1.4em',
      }}>
        <h1 className="text-3xl text-center align-middle">{ props.title }</h1>
      </div>
      <div className="flex flex-row-reverse justify-end align-center" style={{
        flex: .3,
        paddingRight: '1.4em',
      }}>
        <ThreeBarsIcon size={28}/>
      </div>
    </div>
  )
}