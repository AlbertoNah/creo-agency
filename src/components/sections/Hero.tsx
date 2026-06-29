'use client'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const count = 120
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.3,
      opacity: Math.random() * 0.5 + 0.05,
      pulse: Math.random() * Math.PI * 2,
    }))

    let animId: number
    let time = 0

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.02

        if (p.x < -10) p.x = canvas.width + 10
        if (p.x > canvas.width + 10) p.x = -10
        if (p.y < -10) p.y = canvas.height + 10
        if (p.y > canvas.height + 10) p.y = -10

        const dynamicOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(184, 151, 90, ${dynamicOpacity})`
        ctx.fill()
      })

      // Draw subtle connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(184, 151, 90, ${0.06 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

const CREO_CHARS = ['C', 'R', 'E', 'O']

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollIndRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const parallaxRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2
    mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2

    if (parallaxRef.current) {
      gsap.to(parallaxRef.current, {
        x: mouseX.current * -18,
        y: mouseY.current * -10,
        duration: 1.2,
        ease: 'power2.out',
      })
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const line = lineRef.current
    const cta = ctaRef.current
    const scrollInd = scrollIndRef.current
    if (!section || !title || !subtitle || !line || !cta || !scrollInd) return

    const chars = title.querySelectorAll('.hero-char span')

    const tl = gsap.timeline({ delay: 2.0 })
    tl.fromTo(
      chars,
      { yPercent: 110, skewY: 3 },
      { yPercent: 0, skewY: 0, stagger: 0.08, duration: 1.1, ease: 'power4.out' }
    )
      .fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: 'power3.inOut' },
        '-=0.5'
      )
      .fromTo(
        subtitle,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        cta,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        scrollInd,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      )

    // Scroll-driven exit animation
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress
          if (parallaxRef.current) {
            gsap.set(parallaxRef.current, {
              y: p * 180,
              scale: 1 + p * 0.12,
              opacity: 1 - p * 1.5,
            })
          }
        },
      })

      return () => st.kill()
    }, section)

    window.addEventListener('mousemove', onMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void"
    >
      <ParticleCanvas />

      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 60%, rgba(184,151,90,0.06) 0%, transparent 70%)',
        }}
      />

      <div ref={parallaxRef} className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Eyebrow */}
        <div className="mb-8">
          <span className="eyebrow opacity-0 translate-y-4 inline-block"
            ref={(el) => {
              if (el) gsap.to(el, { opacity: 1, y: 0, duration: 0.7, delay: 2.0 })
            }}
          >
            Lebanon · Est. 2020
          </span>
        </div>

        {/* Giant CREO title */}
        <div ref={titleRef} className="overflow-hidden">
          <div className="flex" aria-label="CREO">
            {CREO_CHARS.map((char) => (
              <div
                key={char}
                className="hero-char overflow-hidden"
                style={{ lineHeight: 0.85 }}
              >
                <span
                  className="font-display block select-none"
                  style={{
                    fontSize: 'clamp(5rem, 22vw, 24rem)',
                    color: '#FAFAFA',
                    letterSpacing: '0.01em',
                  }}
                >
                  {char}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider + subtitle row */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-end gap-8 lg:gap-0">
          <div
            ref={lineRef}
            className="w-24 h-px bg-gold lg:mr-10 flex-shrink-0"
            style={{ transformOrigin: 'left center' }}
          />
          <p
            ref={subtitleRef}
            className="text-[#FAFAFA]/55 font-serif italic text-xl lg:text-2xl leading-relaxed max-w-lg opacity-0"
          >
            Building brands people can&apos;t ignore.
          </p>
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-14 flex items-center gap-6 opacity-0">
          <button className="btn-primary">
            Start a Project
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="btn-outline">
            View Our Work
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndRef}
        className="absolute bottom-10 right-10 flex flex-col items-center gap-3 opacity-0"
      >
        <span
          className="eyebrow"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          Scroll
        </span>
        <div className="w-px h-16 bg-white/10 overflow-hidden">
          <div
            className="w-full bg-gold"
            style={{
              height: '50%',
              animation: 'scrollLine 1.6s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      {/* Corner label */}
      <div className="absolute bottom-10 left-10 hidden lg:block">
        <p className="text-white/20 text-xs tracking-widest font-body">
          FULL-SERVICE CREATIVE AGENCY
        </p>
      </div>

    </section>
  )
}
