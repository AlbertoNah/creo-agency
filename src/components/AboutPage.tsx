'use client'
import Link from 'next/link'
import Reveal from '@/components/Reveal'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const AMBER = '#FFA060'
const HS    = '0 0 60px rgba(0,0,0,0.98), 0 0 20px rgba(0,0,0,0.90)'
const WA    = 'https://wa.me/96176924105?text=Hello%20CREO%2C%20I%20would%20like%20to%20book%20a%20strategy%20call'

// ── Philosophy pillars ────────────────────────────────────────────────────────

const PILLARS = [
  {
    num: '01',
    title: 'Restraint is power.',
    body: 'Most brands say too much. We build silence into our work — the pause that makes the next word land harder.',
  },
  {
    num: '02',
    title: 'Craft over convenience.',
    body: "Every template we could have used, we didn't. Every shortcut we could have taken, we walked past. The work shows.",
  },
  {
    num: '03',
    title: 'Results are the only story.',
    body: "Beautiful work that doesn't perform is a luxury we don't sell. Everything we make is built to be seen and to convert.",
  },
]

// ── Process steps ─────────────────────────────────────────────────────────────

const PROCESS = [
  { step: '1', label: 'Immerse', body: 'We learn your business, your market, your enemies, and your ambitions. No brief is too long.' },
  { step: '2', label: 'Define', body: 'We crystallize a creative direction that is singular, ownable, and backed by strategy.' },
  { step: '3', label: 'Create', body: 'We build. Fast, precise, iterative. Every decision is made against your objective — not aesthetics for their own sake.' },
  { step: '4', label: 'Launch', body: 'We deliver, deploy, and stay in the room. Every project includes a post-launch review.' },
]

// ── Brand mark decoration ─────────────────────────────────────────────────────

function OrbitMark() {
  return (
    <svg viewBox="0 0 220 220" width="220" height="220" aria-hidden fill="none"
      style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}>
      <circle cx="110" cy="110" r="96" stroke="rgba(255,104,32,0.06)" strokeWidth="0.7" strokeDasharray="5 9" />
      <circle cx="110" cy="110" r="64" stroke="rgba(255,104,32,0.10)" strokeWidth="0.7" />
      <circle cx="110" cy="110" r="38" stroke="rgba(255,104,32,0.16)" strokeWidth="0.7" />
      <circle cx="110" cy="110" r="14" fill="rgba(255,160,96,0.18)" />
      <circle cx="110" cy="110" r="5"  fill="rgba(255,160,96,0.55)" />
      {/* Orbit marker dot */}
      <circle cx="110" cy="14" r="3.5" fill="rgba(255,104,32,0.45)" />
    </svg>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="page-enter" style={{ background: '#000' }}>

      {/* ── MANIFESTO ──────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(5rem, 10vh, 8rem) 0 clamp(4rem, 8vh, 6.5rem)',
        borderBottom: '1px solid rgba(255,104,32,0.07)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Background mark */}
        <div style={{ position: 'absolute', right: '-4rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.6, pointerEvents: 'none' }}>
          <OrbitMark />
        </div>

        <div className="inner-container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.24em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.45)', marginBottom: '2rem' }}>
              Who We Are
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ ...D, fontSize: 'clamp(3rem, 7vw, 9.5rem)', lineHeight: 0.86, letterSpacing: '-0.04em', color: '#fff', textShadow: HS, marginBottom: 'clamp(2rem, 4vh, 3.5rem)' }}>
              Built in<br />Lebanon.
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.3rem, 2.2vw, 3rem)', color: AMBER, lineHeight: 1.3, maxWidth: '22ch', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              For brands that want to be impossible to ignore.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <p style={{ ...I, fontSize: 'clamp(1rem, 1.3vw, 1.4rem)', color: 'rgba(255,255,255,0.30)', lineHeight: 1.80, maxWidth: '58ch' }}>
              CREO is a creative agency born in Beirut — a city that has always known how to build meaning under pressure. We work with ambitious brands across the Middle East and beyond, building identities, content systems, digital experiences, and performance engines that make people stop, feel, and act.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── THE STORY ──────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'clamp(220px, 25%, 300px) 1fr', gap: 'clamp(4rem, 8vw, 8rem)', alignItems: 'start' }}>
            <Reveal>
              <p style={{ ...I, fontSize: 'clamp(2rem, 3vw, 4rem)', color: 'rgba(255,255,255,0.10)', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                The<br />Story.
              </p>
            </Reveal>
            <div>
              <Reveal delay={60}>
                <p style={{ ...I, fontSize: 'clamp(1rem, 1.3vw, 1.4rem)', color: 'rgba(255,255,255,0.36)', lineHeight: 1.80, marginBottom: '1.5rem', maxWidth: '58ch' }}>
                  We started CREO because we were tired of seeing great brands get average creative. In Lebanon — where every business has survived things most markets never face — the brands that rise are not the ones with the biggest budgets. They're the ones with the sharpest identity.
                </p>
              </Reveal>
              <Reveal delay={100}>
                <p style={{ ...I, fontSize: 'clamp(1rem, 1.3vw, 1.4rem)', color: 'rgba(255,255,255,0.36)', lineHeight: 1.80, marginBottom: '1.5rem', maxWidth: '58ch' }}>
                  We built CREO as the studio we wished existed: one that treats every brand as a universe — with its own gravity, its own light, its own orbit. We don't serve industries. We serve ambition.
                </p>
              </Reveal>
              <Reveal delay={140}>
                <p style={{ ...I, fontSize: 'clamp(1rem, 1.3vw, 1.4rem)', color: 'rgba(255,255,255,0.36)', lineHeight: 1.80, maxWidth: '58ch' }}>
                  Today, CREO works with brands across hospitality, wellness, fashion, real estate, and retail — delivering identity, content, web, and performance at a level that most agencies reserve only for their biggest retainers.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY ─────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal>
            <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.45)', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              Philosophy
            </p>
          </Reveal>
          <div className="philosophy-grid">
            {PILLARS.map((p, i) => (
              <Reveal key={p.num} delay={i * 90}>
                <div style={{ borderTop: '1px solid rgba(255,104,32,0.10)', paddingTop: 'clamp(1.5rem, 3vh, 2.2rem)' }}>
                  <p style={{ ...M, fontSize: '0.55rem', letterSpacing: '0.20em', color: 'rgba(255,104,32,0.40)', marginBottom: '0.9rem' }}>
                    {p.num}
                  </p>
                  <p style={{ ...D, fontSize: 'clamp(1.1rem, 1.5vw, 1.6rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.8rem', lineHeight: 1.2 }}>
                    {p.title}
                  </p>
                  <p style={{ ...I, fontSize: 'clamp(0.92rem, 1.1vw, 1.15rem)', color: 'rgba(255,255,255,0.30)', lineHeight: 1.70 }}>
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal>
            <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.45)', marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              How We Work
            </p>
          </Reveal>
          <div className="process-grid">
            {PROCESS.map((s, i) => (
              <Reveal key={s.step} delay={i * 80}>
                <div>
                  <p style={{ ...D, fontSize: 'clamp(3.5rem, 6vw, 8rem)', lineHeight: 0.9, letterSpacing: '-0.06em', color: 'rgba(255,104,32,0.10)', marginBottom: '1rem' }}>
                    {s.step}
                  </p>
                  <p style={{ ...D, fontSize: 'clamp(1.1rem, 1.5vw, 1.7rem)', color: '#fff', letterSpacing: '-0.02em', marginBottom: '0.7rem' }}>
                    {s.label}
                  </p>
                  <p style={{ ...I, fontSize: 'clamp(0.92rem, 1.1vw, 1.15rem)', color: 'rgba(255,255,255,0.28)', lineHeight: 1.70 }}>
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ─────────────────────────────────────── */}
      <section style={{
        padding: 'clamp(6rem, 12vh, 10rem) 0',
        borderBottom: '1px solid rgba(255,104,32,0.07)',
        textAlign: 'center',
      }}>
        <div className="inner-container">
          <Reveal>
            <span style={{ ...M, fontSize: '0.55rem', letterSpacing: '0.22em', color: 'rgba(255,104,32,0.30)' }}>
              — The CREO Principle
            </span>
          </Reveal>
          <Reveal delay={60}>
            <blockquote style={{
              ...I,
              fontSize: 'clamp(1.8rem, 3.5vw, 5rem)',
              lineHeight: 1.1, letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.55)',
              margin: 'clamp(1.2rem, 2.5vh, 1.8rem) auto',
              maxWidth: '18ch',
            }}>
              "Every brand has a center of gravity. We find it. Then we make everything orbit it."
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ── FINAL CTA ──────────────────────────────────────── */}
      <section style={{ padding: 'clamp(7rem, 14vh, 11rem) 0', textAlign: 'center' }}>
        <div className="inner-container">
          <Reveal>
            <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, transparent, rgba(255,104,32,0.28))', margin: '0 auto 2.5rem' }} />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ ...I, fontSize: 'clamp(1.3rem, 2.2vw, 3rem)', color: 'rgba(255,255,255,0.25)', marginBottom: '0.1em' }}>
              If you've read this far,
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.4rem, 2.5vw, 3.4rem)', color: AMBER, marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              you already know if we're right for each other.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center', alignItems: 'center' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-era"
                aria-label="Book a strategy call via WhatsApp">
                Book a Strategy Call
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <Link href="/work" style={{
                ...M, fontSize: '0.60rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.22)', textDecoration: 'none',
              }}>
                See the Work →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
