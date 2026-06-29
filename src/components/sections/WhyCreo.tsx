'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LINES = [
  { text: 'We don\'t', accent: false },
  { text: 'create posts.', accent: false },
  { text: 'We create', accent: false },
  { text: 'brands.', accent: true },
]

const REASONS = [
  {
    num: '01',
    title: 'Strategy First',
    desc: 'Every creative decision is rooted in data, market research, and a deep understanding of your audience.',
  },
  {
    num: '02',
    title: 'Cinematic Quality',
    desc: 'We apply the same standards as luxury commercial production to every deliverable.',
  },
  {
    num: '03',
    title: 'Performance Obsessed',
    desc: 'Beautiful content is worthless if it doesn\'t convert. We measure everything.',
  },
  {
    num: '04',
    title: 'Full Ownership',
    desc: 'Your brand is yours. We build internal capabilities while delivering world-class results.',
  },
]

export default function WhyCreo() {
  const sectionRef = useRef<HTMLElement>(null)
  const statementRef = useRef<HTMLDivElement>(null)
  const reasonsRef = useRef<HTMLDivElement>(null)
  const bgTextRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const statement = statementRef.current
    const reasons = reasonsRef.current
    const bgText = bgTextRef.current
    if (!section || !statement || !reasons || !bgText) return

    const ctx = gsap.context(() => {
      const lines = statement.querySelectorAll('.statement-line')
      const reasonItems = reasons.querySelectorAll('.reason-item')

      // Statement word reveal
      gsap.fromTo(
        lines,
        { y: 80, opacity: 0, skewY: 2 },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          stagger: 0.12,
          duration: 1.1,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: statement,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Reasons reveal
      gsap.fromTo(
        reasonItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: reasons,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Scroll-driven background text
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
        onUpdate: (self) => {
          if (bgText) {
            gsap.set(bgText, { x: -self.progress * 200 })
          }
        },
      })

      // Parallax glow
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const glow = section.querySelector('.why-glow') as HTMLElement
          if (glow) {
            gsap.set(glow, { opacity: 0.04 + self.progress * 0.08 })
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-48 overflow-hidden bg-void"
    >
      {/* Animated glow */}
      <div
        className="why-glow absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(184,151,90,0.06) 0%, transparent 70%)',
          opacity: 0.04,
        }}
      />

      {/* Background scrolling text */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="font-display text-white/[0.02] leading-none"
          style={{ fontSize: 'clamp(8rem, 18vw, 20rem)' }}
        >
          WHY CREO WHY CREO WHY CREO
        </span>
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-8 lg:px-16">
        <div className="flex items-center gap-4 mb-20">
          <div className="accent-line" />
          <span className="eyebrow">Why CREO</span>
        </div>

        {/* Main statement */}
        <div ref={statementRef} className="mb-28">
          {LINES.map((line, i) => (
            <div key={i} className="statement-line overflow-hidden" style={{ opacity: 0 }}>
              <h2
                className="font-display leading-[0.85]"
                style={{
                  fontSize: 'clamp(3.5rem, 9vw, 12rem)',
                  color: line.accent ? 'var(--gold)' : '#FAFAFA',
                }}
              >
                {line.text}
              </h2>
            </div>
          ))}
        </div>

        {/* Reasons grid */}
        <div
          ref={reasonsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5"
        >
          {REASONS.map((reason) => (
            <div
              key={reason.num}
              className="reason-item bg-void p-10 lg:p-14 group hover:bg-surface transition-colors duration-500"
              style={{ opacity: 0 }}
            >
              <div className="flex items-start gap-6">
                <span className="font-display text-5xl text-white/10 group-hover:text-gold/20 transition-colors duration-500 flex-shrink-0 leading-none mt-1">
                  {reason.num}
                </span>
                <div>
                  <h3 className="font-display text-3xl lg:text-4xl mb-4 group-hover:text-gold transition-colors duration-400">
                    {reason.title}
                  </h3>
                  <p className="text-white/45 leading-relaxed text-base lg:text-lg">
                    {reason.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div className="mt-24 text-center">
          <p
            className="font-serif italic text-white/30 text-2xl lg:text-4xl"
            style={{ maxWidth: '700px', margin: '0 auto' }}
          >
            &ldquo;Mediocrity is easy. Domination takes courage. We choose courage.&rdquo;
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-8 h-px bg-gold/40" />
            <span className="eyebrow text-gold/60">CREO Agency</span>
            <div className="w-8 h-px bg-gold/40" />
          </div>
        </div>
      </div>
    </section>
  )
}
