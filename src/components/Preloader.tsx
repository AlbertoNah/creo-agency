'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

interface PreloaderProps {
  onComplete: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const planetRef    = useRef<HTMLDivElement>(null)
  const ringRef      = useRef<HTMLDivElement>(null)
  const particleRef  = useRef<HTMLDivElement>(null)
  const logoRef      = useRef<HTMLDivElement>(null)
  const labelRef     = useRef<HTMLParagraphElement>(null)
  const rafRef       = useRef<number>(0)
  const angleRef     = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const planet    = planetRef.current
    const ring      = ringRef.current
    const particle  = particleRef.current
    const logo      = logoRef.current
    const label     = labelRef.current
    if (!container || !planet || !ring || !particle || !logo || !label) return

    // Orbit animation: particle traces the ring
    const ORBIT_R = 72   // ring radius in px
    const animateOrbit = () => {
      angleRef.current += 0.022
      const x = Math.cos(angleRef.current) * ORBIT_R
      const y = Math.sin(angleRef.current) * ORBIT_R
      particle.style.transform = `translate(${x}px, ${y}px)`
      rafRef.current = requestAnimationFrame(animateOrbit)
    }

    const tl = gsap.timeline({ onComplete: () => cancelAnimationFrame(rafRef.current) })

    // 0.0s — black, nothing
    tl
    // 0.25s — single particle appears at 3 o'clock, glows
    .set(particle, { opacity: 0, x: ORBIT_R, y: 0 })
    .to(particle, {
      opacity: 1,
      duration: 0.45,
      ease: 'power2.out',
      delay: 0.25,
      onStart: () => { rafRef.current = requestAnimationFrame(animateOrbit) }
    })

    // 0.55s — ring border fades in around particle
    .to(ring, {
      opacity: 0.18,
      duration: 0.55,
      ease: 'power2.out',
    }, '-=0.25')

    // 0.80s — planet glow expands from center
    .to(planet, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power3.out',
    }, '-=0.40')

    // 1.35s — CREO logo rises in
    .to(logo, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power2.out',
    }, '-=0.55')

    // 1.60s — label appears
    .to(label, {
      opacity: 1,
      duration: 0.45,
      ease: 'power2.out',
    }, '-=0.40')

    // Hold: 0.30s
    .to({}, { duration: 0.30 })

    // Exit sequence
    .to([particle, ring, label], {
      opacity: 0,
      duration: 0.35,
      ease: 'power2.in',
      stagger: 0.04,
    })
    .to(planet, {
      opacity: 0,
      scale: 0.88,
      duration: 0.40,
      ease: 'power2.in',
    }, '-=0.22')
    .to(logo, {
      opacity: 0,
      y: -6,
      duration: 0.30,
      ease: 'power2.in',
    }, '-=0.28')
    .to(container, {
      yPercent: -100,
      duration: 0.85,
      ease: 'power4.inOut',
      onComplete,
    }, '-=0.05')

    return () => {
      tl.kill()
      cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {/* Planet glow — amber radial bloom */}
      <div
        ref={planetRef}
        style={{
          position: 'absolute',
          width: '280px',
          height: '280px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(165,48,8,0.32) 0%, rgba(80,22,4,0.14) 38%, transparent 68%)',
          opacity: 0,
          transform: 'scale(0.35)',
          pointerEvents: 'none',
        }}
      />

      {/* Orbit ring */}
      <div
        ref={ringRef}
        style={{
          position: 'absolute',
          width: '144px',
          height: '144px',
          borderRadius: '50%',
          border: '1px solid rgba(255,160,96,1)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Orbiting particle */}
      <div
        ref={particleRef}
        style={{
          position: 'absolute',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#FF6820',
          boxShadow: '0 0 14px 5px rgba(255,104,32,0.55)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      {/* CREO wordmark */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          textAlign: 'center',
          opacity: 0,
          transform: 'translateY(10px)',
          pointerEvents: 'none',
        }}
      >
        <span
          className="font-display"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            letterSpacing: '0.30em',
            color: 'rgba(255,255,255,0.82)',
            display: 'block',
          }}
        >
          CREO
        </span>
      </div>

      {/* Label */}
      <p
        ref={labelRef}
        className="font-mono"
        style={{
          position: 'absolute',
          bottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.16)',
          opacity: 0,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        Initializing the orbit
      </p>
    </div>
  )
}
