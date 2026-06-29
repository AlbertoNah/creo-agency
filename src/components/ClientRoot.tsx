'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import SmoothScroll from './SmoothScroll'
import CustomCursor from './CustomCursor'

const Preloader    = dynamic(() => import('./Preloader'),    { ssr: false })
const AmbientAudio = dynamic(() => import('./AmbientAudio'), { ssr: false })

interface ClientRootProps {
  children: React.ReactNode
}

export default function ClientRoot({ children }: ClientRootProps) {
  const [preloaderDone, setPreloaderDone] = useState(false)

  return (
    <>
      {!preloaderDone && (
        <Preloader onComplete={() => setPreloaderDone(true)} />
      )}
      <SmoothScroll>
        <CustomCursor />
        <AmbientAudio />
        <div
          style={{
            opacity: preloaderDone ? 1 : 0,
            transition: 'opacity 0.9s ease 0.2s',
          }}
        >
          {children}
        </div>
      </SmoothScroll>
    </>
  )
}
