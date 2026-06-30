'use client'
import { useRef } from 'react'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const AMBER = '#FFA060'
const HS    = '0 0 60px rgba(0,0,0,0.98), 0 0 20px rgba(0,0,0,0.90)'
const WA    = 'https://wa.me/96176924105?text=Hello%20CREO%2C%20I%20would%20like%20to%20book%20a%20strategy%20call'

// ── Service SVG Icons ─────────────────────────────────────────────────────────

function IconIdentity() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden fill="none">
      <circle cx="40" cy="40" r="28" stroke="rgba(255,104,32,0.18)" strokeWidth="0.8" />
      <circle cx="40" cy="40" r="18" stroke="rgba(255,104,32,0.28)" strokeWidth="0.8" />
      <circle cx="40" cy="40" r="7"  fill="rgba(255,160,96,0.22)" />
      <line x1="40" y1="12" x2="40" y2="8"  stroke="rgba(255,104,32,0.40)" strokeWidth="1" />
      <line x1="40" y1="68" x2="40" y2="72" stroke="rgba(255,104,32,0.40)" strokeWidth="1" />
      <line x1="12" y1="40" x2="8"  y2="40" stroke="rgba(255,104,32,0.40)" strokeWidth="1" />
      <line x1="68" y1="40" x2="72" y2="40" stroke="rgba(255,104,32,0.40)" strokeWidth="1" />
      <circle cx="40" cy="40" r="38" stroke="rgba(255,104,32,0.06)" strokeWidth="0.5" strokeDasharray="4 6" />
    </svg>
  )
}

function IconContent() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden fill="none">
      <rect x="12" y="20" width="56" height="40" rx="3" stroke="rgba(255,104,32,0.18)" strokeWidth="0.8" />
      <line x1="20" y1="32" x2="60" y2="32" stroke="rgba(255,104,32,0.35)" strokeWidth="0.8" />
      <line x1="20" y1="40" x2="48" y2="40" stroke="rgba(255,104,32,0.22)" strokeWidth="0.8" />
      <line x1="20" y1="48" x2="55" y2="48" stroke="rgba(255,104,32,0.22)" strokeWidth="0.8" />
      <circle cx="62" cy="22" r="10" fill="#060504" stroke="rgba(255,104,32,0.35)" strokeWidth="0.8" />
      <circle cx="62" cy="22" r="4"  fill="rgba(255,160,96,0.30)" />
    </svg>
  )
}

function IconWeb() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden fill="none">
      <rect x="8" y="16" width="64" height="48" rx="4" stroke="rgba(255,104,32,0.18)" strokeWidth="0.8" />
      <rect x="8" y="16" width="64" height="12" rx="4" fill="rgba(255,104,32,0.04)" />
      <circle cx="20" cy="22" r="3" fill="rgba(255,104,32,0.22)" />
      <circle cx="30" cy="22" r="3" fill="rgba(255,104,32,0.14)" />
      <circle cx="40" cy="22" r="3" fill="rgba(255,104,32,0.10)" />
      <rect x="16" y="34" width="30" height="22" rx="2" stroke="rgba(255,104,32,0.18)" strokeWidth="0.6" />
      <rect x="52" y="34" width="14" height="8"  rx="2" stroke="rgba(255,104,32,0.18)" strokeWidth="0.6" />
      <rect x="52" y="46" width="14" height="10" rx="2" stroke="rgba(255,104,32,0.18)" strokeWidth="0.6" />
    </svg>
  )
}

function IconPerformance() {
  return (
    <svg viewBox="0 0 80 80" width="64" height="64" aria-hidden fill="none">
      <polyline points="12,58 28,42 40,50 52,28 68,22"
        stroke="rgba(255,104,32,0.40)" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="68" cy="22" r="4" fill="rgba(255,160,96,0.35)" />
      <line x1="12" y1="62" x2="68" y2="62" stroke="rgba(255,104,32,0.14)" strokeWidth="0.7" />
      <line x1="12" y1="18" x2="12" y2="62" stroke="rgba(255,104,32,0.14)" strokeWidth="0.7" />
    </svg>
  )
}

// ── Single service chapter ────────────────────────────────────────────────────

type Chapter = {
  index: string
  title: string
  subtitle: string
  description: string
  items: string[]
  note: string
  icon: React.ReactNode
}

const CHAPTERS: Chapter[] = [
  {
    index: '01',
    title: 'Identity',
    subtitle: 'Who you are before anyone speaks.',
    description: 'We build the visual and verbal language your brand lives in — the mark, the palette, the type, the tone. Identity is not a logo. It is the entire atmosphere that surrounds your name.',
    items: ['Logo & Mark System', 'Color & Typography', 'Brand Voice & Tone', 'Brand Guidelines', 'Visual Identity Rollout'],
    note: 'Identity projects begin with a 2-day brand immersion.',
    icon: <IconIdentity />,
  },
  {
    index: '02',
    title: 'Content',
    subtitle: 'Every frame is a decision.',
    description: 'We produce and direct content that lives at the intersection of editorial quality and commercial performance. Not just content — creative assets that command attention and drive action.',
    items: ['Social Media Strategy', 'Content Production', 'Photography Direction', 'Copywriting & Scripts', 'Monthly Content Systems'],
    note: 'Content retainers include weekly creative reviews.',
    icon: <IconContent />,
  },
  {
    index: '03',
    title: 'Web',
    subtitle: 'Your best salesperson never sleeps.',
    description: 'We design and develop digital experiences that convert — landing pages, full websites, and campaign microsites built with the same cinematic care we bring to everything. Pixel-perfect. Performance-first.',
    items: ['UX & UI Design', 'Website Development', 'Landing Pages', 'Campaign Microsites', 'Speed & Core Web Vitals'],
    note: 'Web projects are scoped after a discovery call.',
    icon: <IconWeb />,
  },
  {
    index: '04',
    title: 'Performance',
    subtitle: 'Growth is engineered, not hoped for.',
    description: 'Media buying and paid social treated as creative work, not an afterthought. We test fast, optimize ruthlessly, and report transparently — so every dirham spent moves the needle.',
    items: ['Paid Social (Meta, TikTok)', 'Creative Testing Frameworks', 'Funnel Strategy', 'Analytics & Attribution', 'Monthly Performance Reports'],
    note: 'Performance campaigns require minimum 3-month commitment.',
    icon: <IconPerformance />,
  },
]

function ChapterSection({ ch, flip }: { ch: Chapter; flip: boolean }) {
  return (
    <section style={{
      padding: 'clamp(6rem, 12vh, 10rem) 0',
      borderBottom: '1px solid rgba(255,104,32,0.07)',
    }}>
      <div className="inner-container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: flip ? '1fr clamp(280px, 40%, 480px)' : 'clamp(280px, 40%, 480px) 1fr',
          gap: 'clamp(4rem, 8vw, 8rem)',
          alignItems: 'start',
        }}>
          {/* Text column — always same order in DOM, flip via justifySelf */}
          <div style={{ order: flip ? 1 : 0 }}>
            <Reveal>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
                <span style={{ ...M, fontSize: '0.55rem', letterSpacing: '0.24em', color: 'rgba(255,104,32,0.45)' }}>
                  {ch.index}
                </span>
                <span style={{ display: 'block', flex: 1, height: '1px', background: 'rgba(255,104,32,0.14)' }} />
              </div>
            </Reveal>

            <Reveal delay={60}>
              <h2 style={{ ...D, fontSize: 'clamp(3rem, 6vw, 7rem)', lineHeight: 0.88, letterSpacing: '-0.04em', color: '#fff', textShadow: HS, marginBottom: '0.6rem' }}>
                {ch.title}
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p style={{ ...I, fontSize: 'clamp(1rem, 1.5vw, 1.6rem)', color: AMBER, marginBottom: 'clamp(1.5rem, 3vh, 2.2rem)' }}>
                {ch.subtitle}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p style={{ ...I, fontSize: 'clamp(0.95rem, 1.2vw, 1.25rem)', color: 'rgba(255,255,255,0.35)', lineHeight: 1.75, maxWidth: '48ch', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
                {ch.description}
              </p>
            </Reveal>

            {/* Service items */}
            <Reveal delay={180}>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 clamp(1.5rem, 3vh, 2rem) 0', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {ch.items.map(item => (
                  <li key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ display: 'block', width: '14px', height: '1px', background: 'rgba(255,104,32,0.30)', flexShrink: 0 }} />
                    <span style={{ ...M, fontSize: '0.60rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.40)' }}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={220}>
              <p style={{ ...M, fontSize: '0.54rem', letterSpacing: '0.12em', color: 'rgba(255,160,96,0.30)', fontStyle: 'italic' }}>
                {ch.note}
              </p>
            </Reveal>
          </div>

          {/* Visual column */}
          <div style={{
            order: flip ? 0 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '320px',
            position: 'relative',
          }}>
            <Reveal delay={80}>
              {/* Giant ghost number */}
              <span style={{
                ...D,
                position: 'absolute',
                fontSize: 'clamp(10rem, 18vw, 20rem)',
                lineHeight: 1, letterSpacing: '-0.06em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(255,104,32,0.04)',
                userSelect: 'none', pointerEvents: 'none',
                left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)',
              }}>
                {ch.index}
              </span>
              <div style={{ position: 'relative', zIndex: 1 }}>
                {ch.icon}
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="page-enter" style={{ background: '#000' }}>

      {/* Hero */}
      <section style={{
        padding: 'clamp(4rem, 8vh, 7rem) 0 clamp(3rem, 6vh, 5rem)',
        borderBottom: '1px solid rgba(255,104,32,0.07)',
      }}>
        <div className="inner-container">
          <Reveal>
            <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.45)', marginBottom: '1.8rem' }}>
              What We Do
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ ...D, fontSize: 'clamp(3.5rem, 8vw, 11rem)', lineHeight: 0.86, letterSpacing: '-0.04em', color: '#fff', textShadow: HS, marginBottom: 'clamp(1.5rem, 3vh, 2.5rem)' }}>
              Four<br />Disciplines.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.1rem, 1.8vw, 2.4rem)', color: 'rgba(255,255,255,0.30)', maxWidth: '52ch', lineHeight: 1.55 }}>
              Each one built for brands that refuse to blend in.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Chapter sections */}
      {CHAPTERS.map((ch, i) => (
        <ChapterSection key={ch.index} ch={ch} flip={i % 2 === 1} />
      ))}

      {/* Final CTA */}
      <section style={{ padding: 'clamp(7rem, 14vh, 11rem) 0', textAlign: 'center' }}>
        <div className="inner-container">
          <Reveal>
            <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, transparent, rgba(255,104,32,0.28))', margin: '0 auto 2.5rem' }} />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ ...I, fontSize: 'clamp(1.4rem, 2.5vw, 3.5rem)', color: 'rgba(255,255,255,0.25)', marginBottom: '0.1em' }}>
              All four. One at a time.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.5rem, 2.8vw, 3.8rem)', color: AMBER, marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              Or wherever your brand needs to grow.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.4rem', justifyContent: 'center', alignItems: 'center' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-era"
                aria-label="Book a strategy call via WhatsApp">
                Start a Project
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link href="/about" style={{
                ...M, fontSize: '0.60rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)', textDecoration: 'none',
              }}>
                About CREO →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
