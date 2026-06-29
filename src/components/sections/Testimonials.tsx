'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TESTIMONIALS = [
  {
    quote: 'CREO didn\'t just redesign our brand — they transformed how our audience sees us. Our reservations tripled in 60 days.',
    name: 'Sarah K.',
    role: 'CEO',
    company: 'LUMA Restaurant',
    rating: 5,
    result: '+280% bookings',
  },
  {
    quote: 'The content they create is genuinely cinematic. Every reel feels like a film. Our Instagram went from 3K to 48K followers in 4 months.',
    name: 'Maya R.',
    role: 'Marketing Director',
    company: 'Petal Studio',
    rating: 5,
    result: '48K followers',
  },
  {
    quote: 'Their Meta Ads strategy is unlike anything we\'ve seen. 8.4x ROAS in month one. We scaled our budget 5x and the performance held.',
    name: 'Alex M.',
    role: 'Founder',
    company: 'NOIR Fashion',
    rating: 5,
    result: '8.4x ROAS',
  },
  {
    quote: 'The website they built converts at 4x our previous one. Every design decision was backed by data. True professionals.',
    name: 'Jean-Paul B.',
    role: 'CEO',
    company: 'Cedar Heights Real Estate',
    rating: 5,
    result: '4x CVR',
  },
  {
    quote: 'Working with CREO felt like having a world-class creative team dedicated entirely to our vision. Worth every penny.',
    name: 'Nour H.',
    role: 'Brand Manager',
    company: 'Serenity Beauty',
    rating: 5,
    result: '12% Engagement',
  },
  {
    quote: 'They understood our brand better than we did. The visual identity they created feels timeless, luxurious, and completely us.',
    name: 'Lara S.',
    role: 'Co-founder',
    company: 'Maison Verde',
    rating: 5,
    result: '3x Brand Value',
  },
]

function TestimonialCard({ t }: { t: typeof TESTIMONIALS[0] }) {
  return (
    <div
      className="flex-shrink-0 glass rounded-2xl p-8 lg:p-10 group hover:border-gold/20 transition-all duration-500"
      style={{ width: 'clamp(300px, 40vw, 500px)', marginRight: '1.5rem' }}
    >
      {/* Stars */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: t.rating }).map((_, i) => (
          <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#B8975A">
            <path d="M7 1l1.5 4.5H13l-3.75 2.75L10.75 13 7 10.25 3.25 13l1.5-4.75L1 5.5h4.5L7 1z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <blockquote className="text-white/70 font-serif italic text-base lg:text-lg leading-relaxed mb-8">
        &ldquo;{t.quote}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar placeholder */}
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-display"
            style={{ background: 'linear-gradient(135deg, rgba(184,151,90,0.2), rgba(184,151,90,0.05))', border: '1px solid rgba(184,151,90,0.2)' }}
          >
            {t.name.charAt(0)}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">{t.name}</p>
            <p className="text-white/40 text-xs">{t.role} · {t.company}</p>
          </div>
        </div>

        <span
          className="text-xs font-body tracking-wider py-1.5 px-3 rounded-full"
          style={{ background: 'rgba(184,151,90,0.08)', border: '1px solid rgba(184,151,90,0.15)', color: 'var(--gold)' }}
        >
          {t.result}
        </span>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const header = section.querySelector('.testimonials-header')
      if (header) {
        gsap.fromTo(
          header.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: header,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const firstHalf = TESTIMONIALS.slice(0, 3)
  const secondHalf = TESTIMONIALS.slice(3)

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden bg-void"
    >
      {/* Subtle separator at top */}
      <div className="sep mb-24 mx-8 lg:mx-16" />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16 mb-16">
        <div className="testimonials-header flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="accent-line" />
              <span className="eyebrow">Testimonials</span>
            </div>
            <h2
              className="font-display leading-[0.88]"
              style={{ fontSize: 'clamp(3rem, 7vw, 9rem)' }}
            >
              CLIENTS<br />
              <span className="text-gold-gradient">SPEAK UP.</span>
            </h2>
          </div>
          <p className="text-white/40 font-serif italic text-lg max-w-xs">
            Don&apos;t take our word for it. Here&apos;s what brands we&apos;ve transformed have to say.
          </p>
        </div>
      </div>

      {/* Marquee Row 1 — Left */}
      <div className="marquee-wrapper mb-5" ref={row1Ref}>
        <div className="marquee-track">
          {[...firstHalf, ...firstHalf].map((t, i) => (
            <TestimonialCard key={`r1-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — Right (reversed) */}
      <div className="marquee-wrapper" ref={row2Ref}>
        <div className="marquee-track-reverse">
          {[...secondHalf, ...secondHalf].map((t, i) => (
            <TestimonialCard key={`r2-${i}`} t={t} />
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="sep mt-24 mx-8 lg:mx-16" />
    </section>
  )
}
