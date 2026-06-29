'use client'
import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function CTAParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()

    const observer = new ResizeObserver(resize)
    observer.observe(canvas)

    const count = 80
    const particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2.5 + 0.5,
      opacity: Math.random() * 0.7 + 0.1,
      pulse: Math.random() * Math.PI * 2,
      isTeal: Math.random() > 0.7,
    }))

    let animId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        p.pulse += 0.025

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        const op = p.opacity * (0.5 + 0.5 * Math.sin(p.pulse))
        const color = p.isTeal ? `rgba(0, 245, 212, ${op})` : `rgba(184, 151, 90, ${op})`

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
      })

      // Faint lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const lineOp = 0.06 * (1 - dist / 90)
            ctx.strokeStyle = particles[i].isTeal
              ? `rgba(0,245,212,${lineOp})`
              : `rgba(184,151,90,${lineOp})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animId)
      observer.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  const onMouseMove = useCallback((e: MouseEvent) => {
    const section = sectionRef.current
    const glow = glowRef.current
    if (!section || !glow) return
    const rect = section.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    gsap.to(glow, {
      background: `radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(184,151,90,0.1) 0%, transparent 70%)`,
      duration: 0.8,
      ease: 'power2.out',
    })
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const btn = btnRef.current
    if (!section || !text || !btn) return

    const ctx = gsap.context(() => {
      const lines = text.querySelectorAll('.cta-line')

      gsap.fromTo(
        lines,
        { y: 100, opacity: 0, skewY: 4 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          stagger: 0.1,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        btn,
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    }, section)

    section.addEventListener('mousemove', onMouseMove)

    return () => {
      ctx.revert()
      section.removeEventListener('mousemove', onMouseMove)
    }
  }, [onMouseMove])

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-void"
    >
      <CTAParticles />

      {/* Mouse-reactive glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(184,151,90,0.06) 0%, transparent 70%)' }}
      />

      {/* Bottom gradient from void */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, #030303, transparent)' }}
      />

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16 text-center">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-8 h-px bg-gold/40" />
          <span className="eyebrow">Start Your Project</span>
          <div className="w-8 h-px bg-gold/40" />
        </div>

        {/* Main CTA text */}
        <div ref={textRef}>
          <div className="cta-line overflow-hidden" style={{ opacity: 0 }}>
            <h2
              className="font-display leading-[0.85] text-white"
              style={{ fontSize: 'clamp(4rem, 13vw, 15rem)' }}
            >
              READY TO
            </h2>
          </div>
          <div className="cta-line overflow-hidden" style={{ opacity: 0 }}>
            <h2
              className="font-display leading-[0.85]"
              style={{ fontSize: 'clamp(4rem, 13vw, 15rem)' }}
            >
              <span className="text-gold-gradient">DOMINATE?</span>
            </h2>
          </div>
        </div>

        {/* Supporting text */}
        <p className="text-white/40 font-serif italic text-xl lg:text-2xl mt-10 mb-16 max-w-2xl mx-auto leading-relaxed">
          Let&apos;s build something extraordinary together. Your brand deserves more
          than ordinary—it deserves to be impossible to ignore.
        </p>

        {/* CTA Buttons */}
        <div ref={btnRef} className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ opacity: 0 }}>
          <button
            className="btn-primary text-sm py-4 px-10"
            style={{ background: 'var(--gold)', fontSize: '0.85rem' }}
          >
            Let&apos;s Build Something Extraordinary
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M4 14L14 4M14 4H7M14 4V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <a
            href="mailto:hello@creoagency.com"
            className="btn-outline text-sm py-4 px-10"
          >
            hello@creoagency.com
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-8 mt-16">
          {['Instagram', 'LinkedIn', 'TikTok', 'Behance'].map((platform) => (
            <button
              key={platform}
              className="text-white/25 hover:text-gold transition-colors duration-300 text-xs tracking-widest uppercase"
            >
              {platform}
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-16 py-8 flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-display text-xl tracking-[0.25em] text-white">CREO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
          <span className="text-white/25 text-xs">Lebanon</span>
        </div>

        <p className="text-white/20 text-xs">
          © 2025 CREO Agency. All rights reserved.
        </p>

        <div className="flex items-center gap-6 text-white/25 text-xs">
          <button className="hover:text-white/50 transition-colors">Privacy</button>
          <button className="hover:text-white/50 transition-colors">Terms</button>
        </div>
      </div>
    </section>
  )
}
