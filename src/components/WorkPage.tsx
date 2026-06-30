'use client'
import Link from 'next/link'
import Reveal from '@/components/Reveal'
import { projects } from '@/lib/projects'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const AMBER = '#FFA060'
const HS = '0 0 60px rgba(0,0,0,0.98), 0 0 20px rgba(0,0,0,0.90)'

// ── Abstract SVG visuals (one per project) ───────────────────────────────────

function QueenVertVisual() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ maxWidth: 320 }} aria-hidden>
      <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(255,104,32,0.06)" strokeWidth="0.5" />
      <circle cx="120" cy="120" r="78" fill="none" stroke="rgba(255,104,32,0.10)" strokeWidth="0.5" />
      {[0,60,120,180,240,300].map((a, i) => (
        <ellipse key={i} cx="120" cy="87" rx="10" ry="26"
          fill="rgba(255,104,32,0.045)" stroke="rgba(255,104,32,0.28)" strokeWidth="0.7"
          transform={`rotate(${a} 120 120)`} />
      ))}
      <circle cx="120" cy="120" r="16" fill="rgba(255,104,32,0.08)" stroke="rgba(255,104,32,0.30)" strokeWidth="0.7" />
      <circle cx="120" cy="120" r="5"  fill="rgba(255,160,96,0.55)" />
    </svg>
  )
}

function HorseHeadTeaVisual() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ maxWidth: 320 }} aria-hidden>
      <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(255,104,32,0.06)" strokeWidth="0.5" />
      {/* Cup body */}
      <path d="M55 175 Q120 160 185 175 L178 215 Q120 228 62 215 Z"
        fill="rgba(255,104,32,0.04)" stroke="rgba(255,104,32,0.28)" strokeWidth="0.8" />
      {/* Rim ellipse */}
      <ellipse cx="120" cy="175" rx="65" ry="9"
        fill="rgba(255,104,32,0.03)" stroke="rgba(255,104,32,0.18)" strokeWidth="0.6" />
      {/* Steam */}
      <path d="M88 168 C84 155 92 142 86 128" fill="none" stroke="rgba(255,104,32,0.20)" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M120 162 C116 148 124 134 118 118" fill="none" stroke="rgba(255,104,32,0.24)" strokeWidth="0.9" strokeLinecap="round" />
      <path d="M152 168 C148 154 156 140 150 126" fill="none" stroke="rgba(255,104,32,0.18)" strokeWidth="0.9" strokeLinecap="round" />
      {/* Leaf */}
      <ellipse cx="196" cy="128" rx="8" ry="20"
        fill="rgba(255,104,32,0.04)" stroke="rgba(255,104,32,0.22)" strokeWidth="0.7"
        transform="rotate(-28 196 128)" />
      {/* Saucer */}
      <ellipse cx="120" cy="218" rx="52" ry="6"
        fill="none" stroke="rgba(255,104,32,0.12)" strokeWidth="0.5" />
    </svg>
  )
}

function RestaurantVisual() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ maxWidth: 320 }} aria-hidden>
      <circle cx="120" cy="120" r="108" fill="rgba(255,104,32,0.02)" stroke="rgba(255,104,32,0.09)" strokeWidth="0.6" />
      <circle cx="120" cy="120" r="88"  fill="none" stroke="rgba(255,104,32,0.12)" strokeWidth="0.5" />
      <circle cx="120" cy="120" r="64"  fill="rgba(255,104,32,0.03)" stroke="rgba(255,104,32,0.20)" strokeWidth="0.7" />
      <circle cx="120" cy="120" r="28"  fill="rgba(255,104,32,0.05)" stroke="rgba(255,104,32,0.28)" strokeWidth="0.7" />
      {/* Axis lines */}
      <line x1="120" y1="12" x2="120" y2="228" stroke="rgba(255,104,32,0.05)" strokeWidth="0.4" />
      <line x1="12" y1="120" x2="228" y2="120" stroke="rgba(255,104,32,0.05)" strokeWidth="0.4" />
      {/* Center */}
      <circle cx="120" cy="120" r="4" fill="rgba(255,160,96,0.50)" />
    </svg>
  )
}

function RealEstateVisual() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ maxWidth: 320 }} aria-hidden>
      <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(255,104,32,0.06)" strokeWidth="0.5" />
      {/* Main tower */}
      <rect x="82" y="32" width="76" height="178" rx="2"
        fill="rgba(255,104,32,0.03)" stroke="rgba(255,104,32,0.22)" strokeWidth="0.8" />
      {/* Left wing */}
      <rect x="52" y="74" width="30" height="136" rx="1.5"
        fill="rgba(255,104,32,0.02)" stroke="rgba(255,104,32,0.14)" strokeWidth="0.6" />
      {/* Right wing */}
      <rect x="158" y="74" width="30" height="136" rx="1.5"
        fill="rgba(255,104,32,0.02)" stroke="rgba(255,104,32,0.14)" strokeWidth="0.6" />
      {/* Windows 3×5 in main tower */}
      {[0,1,2].map(col => [0,1,2,3,4].map(row => (
        <rect key={`${col}-${row}`}
          x={92 + col * 22} y={48 + row * 30} width="14" height="18" rx="1"
          fill="rgba(255,104,32,0.08)" stroke="rgba(255,104,32,0.18)" strokeWidth="0.4" />
      )))}
      {/* Ground */}
      <line x1="40" y1="210" x2="200" y2="210" stroke="rgba(255,104,32,0.18)" strokeWidth="0.6" />
      {/* Reflection dot */}
      <circle cx="120" cy="120" r="3" fill="rgba(255,160,96,0.30)" />
    </svg>
  )
}

function FashionBeautyVisual() {
  return (
    <svg viewBox="0 0 240 240" width="100%" height="100%" style={{ maxWidth: 320 }} aria-hidden>
      <circle cx="120" cy="120" r="108" fill="none" stroke="rgba(255,104,32,0.06)" strokeWidth="0.5" />
      {/* Overlapping circles — geometric luxury */}
      <circle cx="110" cy="110" r="68" fill="rgba(255,104,32,0.03)" stroke="rgba(255,104,32,0.22)" strokeWidth="0.7" />
      <circle cx="140" cy="90" r="50"  fill="rgba(255,104,32,0.03)" stroke="rgba(255,104,32,0.18)" strokeWidth="0.6" />
      <circle cx="105" cy="148" r="38" fill="rgba(255,104,32,0.03)" stroke="rgba(255,104,32,0.15)" strokeWidth="0.5" />
      {/* Accent points at intersections */}
      <circle cx="141" cy="137" r="2.5" fill="rgba(255,160,96,0.45)" />
      <circle cx="100" cy="76"  r="2"   fill="rgba(255,160,96,0.30)" />
      <circle cx="87"  cy="148" r="1.8" fill="rgba(255,160,96,0.25)" />
      {/* Corner marks */}
      <line x1="18"  y1="18"  x2="28"  y2="18"  stroke="rgba(255,104,32,0.14)" strokeWidth="0.5" />
      <line x1="18"  y1="18"  x2="18"  y2="28"  stroke="rgba(255,104,32,0.14)" strokeWidth="0.5" />
      <line x1="222" y1="222" x2="212" y2="222" stroke="rgba(255,104,32,0.14)" strokeWidth="0.5" />
      <line x1="222" y1="222" x2="222" y2="212" stroke="rgba(255,104,32,0.14)" strokeWidth="0.5" />
    </svg>
  )
}

const VISUALS = [QueenVertVisual, HorseHeadTeaVisual, RestaurantVisual, RealEstateVisual, FashionBeautyVisual]

// ── Single project section ────────────────────────────────────────────────────

function ProjectSection({ project, visual: Visual, reverse }: {
  project: typeof projects[0]
  visual: React.ComponentType
  reverse: boolean
}) {
  const idx = String(project.index).padStart(2, '0')

  return (
    <section style={{
      padding: 'clamp(5rem, 10vh, 8rem) 0',
      borderBottom: '1px solid rgba(255,104,32,0.06)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ghost number */}
      <span style={{
        ...D,
        position: 'absolute',
        fontSize: 'clamp(14rem, 30vw, 28rem)',
        lineHeight: 1,
        letterSpacing: '-0.06em',
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,104,32,0.028)',
        userSelect: 'none',
        pointerEvents: 'none',
        top: '50%', right: reverse ? 'auto' : '-2rem', left: reverse ? '-2rem' : 'auto',
        transform: 'translateY(-50%)',
        zIndex: 0,
      }}>
        {idx}
      </span>

      <div className="inner-container" style={{ position: 'relative', zIndex: 1 }}>
        <div className={`work-grid${reverse ? ' reverse' : ''}`}>

          {/* Text */}
          <div className="work-text">
            <Reveal>
              <p style={{ ...M, fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.55)', marginBottom: '1.4rem' }}>
                {idx} / {String(projects.length).padStart(2,'0')} · {project.industry}
              </p>
            </Reveal>

            <Reveal delay={60}>
              <h2 style={{ ...D, fontSize: 'clamp(2.6rem, 5.5vw, 7rem)', lineHeight: 0.88, letterSpacing: '-0.04em', color: '#fff', textShadow: HS, marginBottom: 'clamp(1rem, 2vh, 1.6rem)' }}>
                {project.name}
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <p style={{ ...I, fontSize: 'clamp(0.95rem, 1.2vw, 1.3rem)', color: 'rgba(255,255,255,0.22)', lineHeight: 1.65, maxWidth: '44ch', marginBottom: 'clamp(1.8rem, 3.5vh, 2.8rem)' }}>
                {project.description}
              </p>
            </Reveal>

            <Reveal delay={180}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: 'clamp(2rem, 4vh, 3.2rem)' }}>
                {project.services.map(s => (
                  <span key={s} style={{
                    ...M, fontSize: '0.55rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'rgba(255,160,96,0.65)',
                    border: '1px solid rgba(255,104,32,0.20)',
                    borderRadius: '100px', padding: '0.35em 0.85em',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={220}>
              <Link href={`/work/${project.slug}`} style={{
                ...M, fontSize: '0.60rem', letterSpacing: '0.18em', textTransform: 'uppercase',
                color: AMBER, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.55rem',
                borderBottom: '1px solid rgba(255,160,96,0.22)',
                paddingBottom: '0.25em',
                transition: 'color 0.35s ease, border-color 0.35s ease',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = '#fff'
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.35)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = AMBER
                  ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,160,96,0.22)'
                }}
              >
                View Case Study
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M1 9L9 1M9 1H4M9 1V6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </Link>
            </Reveal>
          </div>

          {/* Visual */}
          <div className="work-visual" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Reveal delay={80} style={{ width: '100%', maxWidth: 340, margin: '0 auto' }}>
              <Visual />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  )
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function WorkPage() {
  return (
    <div className="page-enter" style={{ background: '#000' }}>

      {/* ── Header ─────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(4rem, 8vh, 7rem) 0 clamp(3rem, 6vh, 5rem)', borderBottom: '1px solid rgba(255,104,32,0.07)' }}>
        <div className="inner-container">
          <Reveal>
            <p style={{ ...M, fontSize: '0.60rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.50)', marginBottom: '1.4rem' }}>
              The Archive
            </p>
          </Reveal>
          <Reveal delay={60}>
            <h1 style={{ ...D, fontSize: 'clamp(3.5rem, 8.5vw, 11rem)', lineHeight: 0.86, letterSpacing: '-0.04em', color: '#fff', marginBottom: 'clamp(1.2rem, 2.5vh, 2rem)' }}>
              Work
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1rem, 1.4vw, 1.6rem)', color: 'rgba(255,255,255,0.22)', maxWidth: '50ch', lineHeight: 1.65 }}>
              Five brands rebuilt from the inside. Each one given a centre of gravity, a visual language, and a reason to be impossible to ignore.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Projects ───────────────────────────────────────── */}
      {projects.map((project, i) => (
        <ProjectSection
          key={project.slug}
          project={project}
          visual={VISUALS[i]}
          reverse={i % 2 === 1}
        />
      ))}

      {/* ── CTA ────────────────────────────────────────────── */}
      <section style={{ padding: 'clamp(6rem, 12vh, 10rem) 0', textAlign: 'center' }}>
        <div className="inner-container">
          <Reveal>
            <p style={{ ...M, fontSize: '0.60rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.50)', marginBottom: '1.8rem' }}>
              Next
            </p>
          </Reveal>
          <Reveal delay={60}>
            <p style={{ ...I, fontSize: 'clamp(1.6rem, 3.5vw, 4rem)', color: 'rgba(255,255,255,0.28)', lineHeight: 1.2, marginBottom: '0.15em' }}>
              Your brand is not here yet.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ ...I, fontSize: 'clamp(1.6rem, 3.5vw, 4rem)', color: '#FFA060', lineHeight: 1.2, marginBottom: 'clamp(2.5rem, 5vh, 4rem)' }}>
              Let&apos;s change that.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <a
              href="https://wa.me/96176924105?text=Hello%20CREO%2C%20I%20would%20like%20to%20start%20a%20project"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-era"
              style={{ display: 'inline-flex', pointerEvents: 'auto' }}
            >
              Start a Project
              <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </Reveal>
        </div>
      </section>

    </div>
  )
}
