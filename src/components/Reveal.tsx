'use client'
import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  style?: React.CSSProperties
}

export default function Reveal({ children, delay = 0, y = 28, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
