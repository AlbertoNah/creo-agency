'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '340%', label: 'Avg. Growth' },
  { value: '120+', label: 'Brands Built' },
  { value: '4.2M', label: 'Reach Generated' },
  { value: '98%', label: 'Client Retention' },
]

const WORDS = [
  { text: 'CREO', accent: false },
  { text: 'is', accent: false },
  { text: 'a', accent: false },
  { text: 'creative', accent: true },
  { text: 'growth', accent: false },
  { text: 'agency', accent: false },
  { text: 'based', accent: false },
  { text: 'in', accent: false },
  { text: 'Lebanon—', accent: false },
  { text: 'helping', accent: false },
  { text: 'ambitious', accent: true },
  { text: 'brands', accent: false },
  { text: 'dominate', accent: false },
  { text: 'digital', accent: true },
  { text: 'experiences.', accent: false },
]

const SCROLL_SPACE = WORDS.length * 90

export default function WhoWeAre() {
  const outerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const wordsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const wordsEl = wordsRef.current
    const stats = statsRef.current
    if (!outer || !wordsEl || !stats) return

    const words = Array.from(wordsEl.querySelectorAll<HTMLElement>('.who-word'))
    const statItems = Array.from(stats.querySelectorAll<HTMLElement>('.stat-item'))

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: `+=${SCROLL_SPACE}`,
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress

          // Reveal words progressively
          const revealed = p * words.length * 1.08
          words.forEach((word, i) => {
            if (i < revealed) {
              word.style.opacity = '1'
              word.style.filter = 'blur(0px)'
              word.style.transform = 'translateY(0px)'
            } else {
              word.style.opacity = '0.08'
              word.style.filter = 'blur(5px)'
              word.style.transform = 'translateY(10px)'
            }
          })

          // Reveal stats at the end
          const statsStart = 0.82
          if (p > statsStart) {
            const sp = (p - statsStart) / (1 - statsStart)
            statItems.forEach((item, i) => {
              const v = Math.max(0, Math.min(1, sp * 2.5 - i * 0.25))
              item.style.opacity = `${v}`
              item.style.transform = `translateY(${(1 - v) * 28}px)`
            })
          }
        },
      })
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    // Outer div provides scroll space; CSS sticky does the pinning — no GSAP DOM wrapping
    <div
      ref={outerRef}
      id="about"
      style={{ height: `calc(100vh + ${SCROLL_SPACE}px)` }}
    >
      <section
        ref={sectionRef}
        className="relative overflow-hidden bg-void"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        <div className="h-full flex flex-col justify-center px-8 lg:px-16 py-24 max-w-[1600px] mx-auto w-full">
          {/* Section label */}
          <div className="flex items-center gap-4 mb-14">
            <div className="accent-line" />
            <span className="eyebrow">Who We Are</span>
          </div>

          {/* Word-reveal text */}
          <div ref={wordsRef} className="mb-20">
            <p
              className="font-display leading-[1.0]"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 7rem)' }}
            >
              {WORDS.map((word, i) => (
                <span
                  key={i}
                  className="who-word inline-block mr-[0.24em]"
                  style={{
                    opacity: 0.08,
                    filter: 'blur(5px)',
                    transform: 'translateY(10px)',
                    transition: 'opacity 0.15s ease, filter 0.15s ease, transform 0.15s ease',
                    color: word.accent ? 'var(--gold)' : 'inherit',
                  }}
                >
                  {word.text}
                </span>
              ))}
            </p>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 border-t border-white/5 pt-12"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="stat-item"
                style={{ opacity: 0, transform: 'translateY(28px)', transition: 'opacity 0.2s ease, transform 0.2s ease' }}
              >
                <div
                  className="font-display text-gold leading-none mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
                >
                  {stat.value}
                </div>
                <p className="text-white/40 text-sm tracking-wide uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative ghost text */}
        <div
          className="absolute right-0 bottom-1/2 translate-y-1/2 pointer-events-none select-none overflow-hidden"
          aria-hidden="true"
        >
          <span
            className="font-display leading-none block text-white/[0.015]"
            style={{ fontSize: 'clamp(8rem, 20vw, 22rem)' }}
          >
            CREO
          </span>
        </div>
      </section>
    </div>
  )
}
