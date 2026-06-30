'use client'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { type Project, getNextProject } from '@/lib/projects'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const AMBER = '#FFA060'
const HS  = '0 0 60px rgba(0,0,0,0.98), 0 0 20px rgba(0,0,0,0.90)'
const WA  = 'https://wa.me/96176924105?text=Hello%20CREO%2C%20I%20would%20like%20to%20book%20a%20strategy%20call'

// ── Mockup frames for gallery ─────────────────────────────────────────────────

function PhoneMockup({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 120 220" width="120" height="220" aria-hidden style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="116" height="216" rx="18"
        fill="#060504" stroke={accent} strokeWidth="0.8" />
      <rect x="43" y="6" width="34" height="6" rx="3"
        fill="#040302" stroke="rgba(255,160,96,0.12)" strokeWidth="0.5" />
      <rect x="8" y="20" width="104" height="186" rx="12" fill="#030201" />
      {/* Screen content lines */}
      <rect x="14" y="28" width="60" height="5" rx="2.5" fill="rgba(255,160,96,0.10)" />
      <rect x="14" y="38" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
      <rect x="14" y="54" width="92" height="70" rx="6" fill="rgba(255,104,32,0.06)" stroke="rgba(255,104,32,0.12)" strokeWidth="0.5" />
      <rect x="14" y="132" width="70" height="4" rx="2" fill="rgba(255,255,255,0.08)" />
      <rect x="14" y="141" width="50" height="3" rx="1.5" fill="rgba(255,255,255,0.05)" />
      <rect x="14" y="155" width="92" height="28" rx="4" fill="rgba(255,104,32,0.04)" stroke="rgba(255,104,32,0.10)" strokeWidth="0.5" />
      <rect x="40" y="208" width="40" height="2.5" rx="1.25" fill="rgba(255,255,255,0.14)" />
    </svg>
  )
}

function BrowserMockup({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 320 200" width="100%" height="auto" aria-hidden>
      <rect x="1" y="1" width="318" height="198" rx="10"
        fill="#060504" stroke={accent} strokeWidth="0.7" />
      {/* Browser chrome */}
      <rect x="1" y="1" width="318" height="28" rx="10" fill="rgba(255,104,32,0.04)" />
      <rect x="1" y="15" width="318" height="14" fill="rgba(255,104,32,0.04)" />
      <circle cx="16" cy="14" r="4" fill="rgba(255,255,255,0.08)" />
      <circle cx="28" cy="14" r="4" fill="rgba(255,255,255,0.06)" />
      <circle cx="40" cy="14" r="4" fill="rgba(255,255,255,0.05)" />
      <rect x="56" y="10" width="160" height="8" rx="4" fill="rgba(255,255,255,0.05)" />
      {/* Hero area */}
      <rect x="8" y="32" width="304" height="100" rx="4" fill="rgba(255,104,32,0.05)" stroke="rgba(255,104,32,0.10)" strokeWidth="0.5" />
      <rect x="20" y="52" width="100" height="8" rx="4" fill="rgba(255,255,255,0.10)" />
      <rect x="20" y="65" width="160" height="5" rx="2.5" fill="rgba(255,255,255,0.06)" />
      <rect x="20" y="75" width="130" height="5" rx="2.5" fill="rgba(255,255,255,0.05)" />
      <rect x="20" y="92" width="70" height="18" rx="9" fill="rgba(255,104,32,0.15)" stroke="rgba(255,104,32,0.30)" strokeWidth="0.6" />
      {/* Content grid */}
      <rect x="8"   y="140" width="92" height="50" rx="4" fill="rgba(255,104,32,0.04)" stroke="rgba(255,104,32,0.08)" strokeWidth="0.5" />
      <rect x="106" y="140" width="92" height="50" rx="4" fill="rgba(255,104,32,0.04)" stroke="rgba(255,104,32,0.08)" strokeWidth="0.5" />
      <rect x="204" y="140" width="108" height="50" rx="4" fill="rgba(255,104,32,0.04)" stroke="rgba(255,104,32,0.08)" strokeWidth="0.5" />
    </svg>
  )
}

function SquareMockup({ accent, label }: { accent: string; label: string }) {
  return (
    <svg viewBox="0 0 200 200" width="100%" height="auto" aria-hidden>
      <rect x="1" y="1" width="198" height="198" rx="8"
        fill="#060504" stroke={accent} strokeWidth="0.7" />
      {/* Instagram-like */}
      <circle cx="24" cy="18" r="8" fill="rgba(255,104,32,0.10)" stroke="rgba(255,104,32,0.20)" strokeWidth="0.6" />
      <rect x="36" y="12" width="50" height="4" rx="2" fill="rgba(255,255,255,0.12)" />
      <rect x="36" y="20" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.06)" />
      <rect x="8" y="34" width="184" height="130" rx="4" fill="rgba(255,104,32,0.05)" />
      {/* Centre mark */}
      <circle cx="100" cy="99" r="22" fill="none" stroke="rgba(255,104,32,0.15)" strokeWidth="0.6" />
      <circle cx="100" cy="99" r="5"  fill="rgba(255,160,96,0.30)" />
      <text x="100" y="185" textAnchor="middle"
        style={{ fontFamily: 'var(--font-mono)', fontSize: '8px' } as React.CSSProperties}
        fill="rgba(255,255,255,0.25)">
        {label}
      </text>
    </svg>
  )
}

// ── Section divider ───────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
      <span style={{ display: 'block', width: '28px', height: '1px', background: 'rgba(255,104,32,0.35)' }} />
      <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.55)' }}>
        {text}
      </p>
    </div>
  )
}

// ── Case Study ────────────────────────────────────────────────────────────────

export default function CaseStudy({ project }: { project: Project }) {
  const next    = getNextProject(project.slug)
  const accent  = 'rgba(255,104,32,0.25)'

  return (
    <div className="page-enter" style={{ background: '#000' }}>

      {/* ── HERO ───────────────────────────────────────────── */}
      <section style={{
        minHeight: '70vh', display: 'flex', alignItems: 'flex-end',
        padding: 'clamp(5rem, 10vh, 8rem) 0 clamp(3.5rem, 7vh, 5rem)',
        borderBottom: '1px solid rgba(255,104,32,0.07)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ghost project name backdrop */}
        <span style={{
          ...D, position: 'absolute', fontSize: 'clamp(12rem, 25vw, 24rem)',
          lineHeight: 1, letterSpacing: '-0.06em',
          color: 'transparent', WebkitTextStroke: '1px rgba(255,104,32,0.025)',
          userSelect: 'none', pointerEvents: 'none',
          right: '-2rem', bottom: '-0.2em', whiteSpace: 'nowrap',
        }}>
          {project.index.toString().padStart(2,'0')}
        </span>

        <div className="inner-container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal>
            <p style={{ ...M, fontSize: '0.60rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.55)', marginBottom: '1.4rem' }}>
              {project.industry} · {project.year}
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ ...D, fontSize: 'clamp(3rem, 8vw, 10rem)', lineHeight: 0.86, letterSpacing: '-0.04em', color: '#fff', textShadow: HS, marginBottom: 'clamp(1.2rem, 2.5vh, 2rem)' }}>
              {project.name}
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.1rem, 1.8vw, 2.2rem)', color: AMBER, lineHeight: 1.4, marginBottom: 'clamp(2rem, 4vh, 3rem)' }}>
              {project.tagline}
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {project.services.map(s => (
                <span key={s} style={{
                  ...M, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'rgba(255,160,96,0.60)',
                  border: '1px solid rgba(255,104,32,0.20)',
                  borderRadius: '100px', padding: '0.35em 0.85em',
                }}>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CHALLENGE ──────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal><SectionLabel text="The Challenge" /></Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'clamp(240px, 28%, 360px) 1fr', gap: 'clamp(3rem, 6vw, 6rem)', alignItems: 'start' }}>
            <Reveal delay={60}>
              <p style={{ ...I, fontSize: 'clamp(2rem, 3.5vw, 4.5rem)', lineHeight: 1.1, color: 'rgba(255,255,255,0.14)', letterSpacing: '-0.02em' }}>
                The<br />Problem.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p style={{ ...I, fontSize: 'clamp(1.1rem, 1.4vw, 1.5rem)', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75, maxWidth: '58ch' }}>
                {project.challenge}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STRATEGY ───────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal><SectionLabel text="The Strategy" /></Reveal>
          <Reveal delay={60}>
            <p style={{ ...I, fontSize: 'clamp(1.4rem, 2.2vw, 2.8rem)', color: 'rgba(255,255,255,0.55)', lineHeight: 1.55, maxWidth: '64ch' }}>
              {project.strategy}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── EXECUTION ──────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal><SectionLabel text="Execution" /></Reveal>
          <div className="execution-grid">
            {project.execution.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div style={{
                  padding: 'clamp(1.8rem, 3.5vh, 2.8rem)',
                  border: '1px solid rgba(255,104,32,0.09)',
                  borderRadius: '4px',
                  background: 'rgba(255,104,32,0.015)',
                }}>
                  <p style={{ ...M, fontSize: '0.56rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.50)', marginBottom: '0.9rem' }}>
                    {String(i + 1).padStart(2,'0')}
                  </p>
                  <p style={{ ...D, fontSize: 'clamp(1rem, 1.5vw, 1.4rem)', color: '#fff', letterSpacing: '-0.01em', marginBottom: '0.9rem' }}>
                    {item.title}
                  </p>
                  <p style={{ ...I, fontSize: 'clamp(0.9rem, 1.1vw, 1.15rem)', color: 'rgba(255,255,255,0.32)', lineHeight: 1.70 }}>
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS ────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal><SectionLabel text="Results" /></Reveal>
          <Reveal delay={60}>
            <div className="stat-grid" style={{ marginTop: '1rem' }}>
              {project.results.map((r, i) => (
                <div key={i} style={{
                  padding: 'clamp(2rem, 4vh, 3.2rem) clamp(1.8rem, 3vw, 2.8rem)',
                  borderRight: i < project.results.length - 1 ? '1px solid rgba(255,104,32,0.07)' : 'none',
                  background: 'rgba(255,104,32,0.012)',
                }}>
                  <p style={{ ...D, fontSize: 'clamp(2.4rem, 4.5vw, 5rem)', lineHeight: 0.9, letterSpacing: '-0.04em', color: AMBER, marginBottom: '0.6rem' }}>
                    {r.value}
                  </p>
                  <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', lineHeight: 1.5 }}>
                    {r.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(5rem, 10vh, 8rem) 0', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal><SectionLabel text="Visual Output" /></Reveal>

          {/* Row 1: phone + browser */}
          <Reveal delay={60}>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '2rem', alignItems: 'end', marginBottom: '2rem' }}>
              <PhoneMockup accent={accent} />
              <BrowserMockup accent={accent} />
            </div>
          </Reveal>

          {/* Row 2: two square posts */}
          <Reveal delay={120}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <SquareMockup accent={accent} label={project.services[0]} />
              <SquareMockup accent={accent} label={project.services[1] ?? ''} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(6rem, 12vh, 10rem) 0', textAlign: 'center', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal>
            <div style={{ width: '1px', height: '44px', background: 'linear-gradient(to bottom, transparent, rgba(255,104,32,0.28))', margin: '0 auto 2.5rem' }} />
          </Reveal>
          <Reveal delay={60}>
            <p style={{ ...I, fontSize: 'clamp(1.2rem, 2vw, 2.6rem)', color: 'rgba(255,255,255,0.35)', marginBottom: '0.12em' }}>
              Want your brand to become the center?
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.3rem, 2.2vw, 2.9rem)', color: AMBER, marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              Everything builds from one conversation.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.2rem', justifyContent: 'center', alignItems: 'center' }}>
              <a href={WA} target="_blank" rel="noopener noreferrer"
                className="btn-era"
                style={{ display: 'inline-flex', pointerEvents: 'auto' }}
                aria-label="Book a strategy call via WhatsApp">
                Book a Strategy Call
                <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a href="mailto:growthcreo@gmail.com" style={{
                ...M, fontSize: '0.62rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: 'rgba(255,160,96,0.45)', textDecoration: 'none',
              }}>
                growthcreo@gmail.com
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── NEXT PROJECT ───────────────────────────────────── */}
      {next && (
        <section style={{ padding: 'clamp(4rem, 8vh, 6rem) 0' }}>
          <div className="inner-container">
            <Reveal>
              <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.18)', marginBottom: '1.2rem' }}>
                Next Project
              </p>
            </Reveal>
            <Reveal delay={60}>
              <Link href={`/work/${next.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between', flexWrap: 'wrap' }}>
                  <div>
                    <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(255,104,32,0.50)', marginBottom: '0.4rem' }}>
                      {next.industry}
                    </p>
                    <h3 style={{ ...D, fontSize: 'clamp(1.8rem, 4vw, 5rem)', letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.65)', transition: 'color 0.35s ease', lineHeight: 0.9 }}>
                      {next.name}
                    </h3>
                  </div>
                  <span style={{ ...D, fontSize: 'clamp(2rem, 5vw, 5rem)', color: 'rgba(255,160,96,0.55)', letterSpacing: '-0.02em' }}>→</span>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

    </div>
  )
}
