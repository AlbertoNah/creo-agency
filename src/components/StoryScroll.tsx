'use client'
import { useRef, useEffect, useState, type Ref } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { scrollProgress } from '@/lib/scrollProgress'

gsap.registerPlugin(ScrollTrigger)

// Scroll timing map — [fade-in-start, fully-visible, start-fade-out, gone]
const T = [
  [-0.01, 0.00, 0.11, 0.18], // 0  HERO
  [0.16,  0.20, 0.31, 0.37], // 1  ATTENTION
  [0.34,  0.38, 0.49, 0.55], // 2  ENGINEERED
  [0.52,  0.56, 0.65, 0.72], // 3  CREO REVEAL
  // gap 0.72–0.79 = SIGNATURE MOMENT + proof mockup visible
  [0.79,  0.82, 0.86, 0.88], // 4  IDENTITY
  [0.87,  0.89, 0.91, 0.93], // 5  CONTENT
  [0.92,  0.93, 0.95, 0.96], // 6  WEB
  [0.95,  0.96, 0.975, 0.985],// 7 PERFORMANCE
  [0.97,  0.985, 1.00, 1.00],// 8  CTA
]

const T_PROOF: [number, number, number, number] = [0.74, 0.78, 0.84, 0.89]

function opacity(p: number, [fi, ps, pe, fo]: number[]): number {
  if (p <= fi) return 0
  if (p <= ps) return (p - fi) / (ps - fi)
  if (p <= pe) return 1
  if (p <= fo) return 1 - (p - pe) / (fo - pe)
  return 0
}

function drift(p: number, [fi, ps, pe, fo]: number[]): number {
  if (p <= fi) return 18
  if (p <= ps) return 18 * (1 - (p - fi) / (ps - fi))
  if (p <= pe) return 0
  if (p <= fo) return -10 * ((p - pe) / (fo - pe))
  return -10
}

// Cinematic blur: 5px on fade-in, 0 at peak, 3px on fade-out
function blurAt(p: number, [fi, ps, pe, fo]: number[]): number {
  const inBlur  = p < ps ? (1 - Math.max(0, (p - fi) / (ps - fi))) * 5 : 0
  const outBlur = p > pe ? Math.max(0, (p - pe) / (fo - pe)) * 3 : 0
  return Math.max(inBlur, outBlur)
}

// ─── Style tokens ─────────────────────────────────
const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }

const AMBER = '#FFA060'
const GHOST = 'rgba(255,255,255,0.13)'

// Dark halo around headlines — ensures readability at any scroll position
const HS = '0 0 80px rgba(0,0,0,0.98), 0 0 28px rgba(0,0,0,0.90), 0 2px 10px rgba(0,0,0,0.80)'

const BOOKING_HREF = 'mailto:hello@creo.agency?subject=Strategy%20Call%20Request'
const WA_HREF = 'https://wa.me/96171000000'

// ─── BEAT 0 — HERO ────────────────────────────────
function Beat0({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'flex-end', justifyContent: 'flex-start' }}>
      <div style={{ padding: 'clamp(1.8rem, 4.5vw, 4.5rem)', paddingBottom: 'clamp(3rem, 7vh, 6rem)', maxWidth: 'clamp(300px, 62vw, 700px)' }}>

        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.4rem',
          animation: 'heroReveal 1.0s cubic-bezier(0.16, 1, 0.3, 1) both',
          animationDelay: '5.1s',
        }}>
          <span style={{ display: 'block', width: '20px', height: '1px', background: 'rgba(255,104,32,0.4)' }} />
          <span style={{ ...M, fontSize: 'clamp(0.60rem, 0.72vw, 0.74rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,160,96,0.55)' }}>
            Creative Agency · Beirut
          </span>
        </div>

        <h1 style={{
          ...D,
          fontSize: 'clamp(3rem, 9.5vw, 12rem)',
          lineHeight: 0.86,
          letterSpacing: '-0.04em',
          color: '#FFFFFF',
          textShadow: HS,
          marginBottom: 'clamp(1rem, 2vh, 2rem)',
          animation: 'heroReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) both',
          animationDelay: '5.9s',
        }}>
          CREO
        </h1>

        <p style={{
          ...I,
          fontSize: 'clamp(1rem, 1.4vw, 1.8rem)',
          color: 'rgba(255,255,255,0.22)',
          lineHeight: 1.55,
          textShadow: '0 0 40px rgba(0,0,0,0.92)',
          marginBottom: 'clamp(1.8rem, 4vh, 3.5rem)',
          animation: 'heroReveal 1.2s ease both',
          animationDelay: '7.5s',
        }}>
          Everything revolves around one thing.
        </p>

        <div style={{ animation: 'heroReveal 0.8s ease both', animationDelay: '8.9s' }}>
          <ScrollThread />
        </div>

      </div>
    </div>
  )
}

// ─── BEAT 1 — ATTENTION ───────────────────────────
function Beat1({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'center', justifyContent: 'flex-start', paddingLeft: 'clamp(2rem, 6vw, 8rem)' }}>
      <div>
        <p style={{ ...M, fontSize: 'clamp(0.60rem, 0.72vw, 0.74rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)', marginBottom: '1rem' }}>
          The problem
        </p>
        <h2 style={{ ...D, fontSize: 'clamp(2.4rem, 7vw, 9rem)', lineHeight: 0.87, letterSpacing: '-0.04em', color: '#FFFFFF', textShadow: HS }}>
          ATTENTION
        </h2>
      </div>
    </div>
  )
}

// ─── BEAT 2 — ENGINEERED ──────────────────────────
function Beat2({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
      <div style={{ padding: 'clamp(1.8rem, 4.5vw, 4.5rem)', paddingBottom: 'clamp(3rem, 8vh, 7rem)', textAlign: 'right', maxWidth: 'clamp(260px, 52vw, 600px)' }}>
        <p style={{ ...I, fontSize: 'clamp(1.2rem, 2.4vw, 3.4rem)', lineHeight: 1.14, color: 'rgba(255,255,255,0.28)', textShadow: HS, marginBottom: '0.08em' }}>
          is no longer given.
        </p>
        <p style={{ ...I, fontSize: 'clamp(1.2rem, 2.4vw, 3.4rem)', lineHeight: 1.14, color: AMBER, textShadow: HS }}>
          It is engineered.
        </p>
      </div>
    </div>
  )
}

// ─── BEAT 3 — CREO REVEAL ─────────────────────────
function Beat3({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 'clamp(5rem, 10vh, 12rem)' }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ ...M, fontSize: 'clamp(0.60rem, 0.72vw, 0.74rem)', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,160,96,0.42)', marginBottom: '1.2rem' }}>
          Beirut, Lebanon
        </p>
        <h2 style={{
          ...D,
          fontSize: 'clamp(2.4rem, 6.5vw, 9rem)',
          lineHeight: 0.86,
          letterSpacing: '-0.04em',
          color: AMBER,
          textShadow: HS,
          filter: 'drop-shadow(0 0 50px rgba(255,104,32,0.15))',
        }}>
          CREO.
        </h2>
        <p style={{ ...I, fontSize: 'clamp(0.9rem, 1.2vw, 1.6rem)', color: 'rgba(255,255,255,0.16)', textShadow: '0 0 40px rgba(0,0,0,0.95)', marginTop: '1.3rem', lineHeight: 1.6 }}>
          A creative force built to put your brand at the center.
        </p>
      </div>
    </div>
  )
}

// ─── PROOF OF WORK OVERLAY ───────────────────────
// Premium filled Instagram post inside a realistic phone frame.
// Materialises during the signature camera sweep (p=0.74→0.78).
// --draw CSS var (0→1) drives strokeDashoffset on all animated paths.
//
// Perimeter reference (for strokeDasharray):
//   Shell  rect 160×296 rx=22: 2*(116+252) + 2π×22  ≈ 875
//   Post   rect 154×154 no-rx: 2*(154+154)           = 616
//   Petal  ellipse rx=7 ry=18: Ramanujan             ≈ 83
//   Ring   circle r=32:        2π×32                 ≈ 201
//   Avatar circle r=9:         2π×9                  ≈ 57
//   Pill   capsule 30×7 rx=3.5:2×23 + π×7            ≈ 68
function ProofMockup({ r }: { r: React.RefObject<HTMLDivElement> }) {
  const SHELL_PERIM  = 875
  const POST_PERIM   = 616
  const PETAL_PERIM  = 83
  const RING_PERIM   = 201
  const AVATAR_PERIM = 57
  const PILL_PERIM   = 68

  return (
    <div
      ref={r}
      className="proof-overlay"
      style={{
        position: 'fixed',
        zIndex: 80,
        pointerEvents: 'none',
        opacity: 0,
        willChange: 'opacity',
        transition: 'filter 0.8s ease',
        right: 'clamp(6%, 16vw, 20%)',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <svg
        viewBox="0 0 164 300"
        width="164"
        height="300"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          {/* Barely-there amber bloom at flower centre — no hard gradient banding */}
          <radialGradient id="pmk-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="rgba(255,160,96,0.16)" />
            <stop offset="100%" stopColor="rgba(255,160,96,0)"    />
          </radialGradient>
        </defs>

        {/* ══ Phone shell ══════════════════════════════════ */}
        <rect
          x="2" y="2" width="160" height="296" rx="22"
          fill="#070604"
          stroke="rgba(255,160,96,0.18)"
          strokeWidth="1.2"
          strokeDasharray={SHELL_PERIM}
          style={{ strokeDashoffset: `calc((1 - var(--draw, 0)) * ${SHELL_PERIM})` }}
        />

        {/* Volume buttons — left */}
        <rect x="-0.6" y="82"  width="2.4" height="14" rx="1.2" fill="#0e0c0a" />
        <rect x="-0.6" y="102" width="2.4" height="22" rx="1.2" fill="#0e0c0a" />
        {/* Power — right */}
        <rect x="162.2" y="90" width="2.4" height="28" rx="1.2" fill="#0e0c0a" />

        {/* ══ Camera pill ════════════════════════════════ */}
        <rect
          x="67" y="6.5" width="30" height="7" rx="3.5"
          fill="#040302"
          stroke="rgba(255,160,96,0.09)"
          strokeWidth="0.5"
          strokeDasharray={PILL_PERIM}
          style={{ strokeDashoffset: `calc((1 - var(--draw, 0)) * ${PILL_PERIM})` }}
        />
        <circle cx="77" cy="10" r="1.6"
          fill="#030201" stroke="rgba(255,160,96,0.11)" strokeWidth="0.4" />
        <circle cx="82" cy="10" r="1.0" fill="#050403" />

        {/* ══ Screen ═════════════════════════════════════ */}
        <rect x="6" y="18" width="152" height="268" rx="18" fill="#030201" />

        {/* ── Status bar ── */}
        <text x="12" y="28" dominantBaseline="middle"
          style={{ ...M, fontSize: '5.8px' } as React.CSSProperties}
          fill="rgba(255,255,255,0.44)"
        >9:41</text>
        {/* Battery */}
        <rect x="135" y="24.2" width="12" height="5.6" rx="1.4"
          fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="0.6" />
        <rect x="147" y="25.5" width="1.8" height="3" rx="0.8"
          fill="rgba(255,255,255,0.26)" />
        <rect x="136" y="25" width="7.5" height="4" rx="0.7"
          fill="rgba(255,255,255,0.29)" />
        {/* Signal */}
        <circle cx="127" cy="27" r="2.4"
          fill="none" stroke="rgba(255,255,255,0.26)" strokeWidth="0.6" />
        <circle cx="127" cy="27" r="0.9" fill="rgba(255,255,255,0.26)" />

        {/* ── IG app nav ── */}
        <line x1="6" y1="34" x2="158" y2="34"
          stroke="rgba(255,160,96,0.05)" strokeWidth="0.4" />

        {/* Avatar — amber story ring draws in */}
        <circle cx="19" cy="47" r="9"
          fill="none"
          stroke="rgba(255,160,96,0.22)"
          strokeWidth="1"
          strokeDasharray={AVATAR_PERIM}
          style={{ strokeDashoffset: `calc((1 - var(--draw, 0)) * ${AVATAR_PERIM})` }}
        />
        <circle cx="19" cy="47" r="7.5" fill="#0d0b09" />
        {/* Brand micro-mark inside avatar: cross-in-circle */}
        <circle cx="19" cy="47" r="2.2"
          fill="none" stroke="rgba(255,160,96,0.22)" strokeWidth="0.45" />
        <line x1="19" y1="44.2" x2="19" y2="49.8"
          stroke="rgba(255,160,96,0.12)" strokeWidth="0.4" />
        <line x1="16.2" y1="47" x2="21.8" y2="47"
          stroke="rgba(255,160,96,0.12)" strokeWidth="0.4" />

        {/* Username */}
        <text x="32" y="43" dominantBaseline="middle"
          style={{ ...M, fontSize: '6.5px', letterSpacing: '0.03em' } as React.CSSProperties}
          fill="rgba(255,255,255,0.82)"
        >flora.maison</text>

        {/* Following label */}
        <text x="32" y="52" dominantBaseline="middle"
          style={{ ...M, fontSize: '5.4px', letterSpacing: '0.12em' } as React.CSSProperties}
          fill="rgba(255,160,96,0.44)"
        >FOLLOWING</text>

        {/* Three-dot menu */}
        {([140, 145.5, 151] as number[]).map((cx, i) => (
          <circle key={i} cx={cx} cy="47" r="1.2" fill="rgba(255,255,255,0.26)" />
        ))}

        {/* ══ Post image — 154×154, centre (82, 139) ═════ */}
        <rect
          x="5" y="62" width="154" height="154"
          fill="#0a0806"
          stroke="rgba(255,160,96,0.08)"
          strokeWidth="0.7"
          strokeDasharray={POST_PERIM}
          style={{ strokeDashoffset: `calc((1 - var(--draw, 0)) * ${POST_PERIM})` }}
        />

        {/* Rule-of-thirds compositional grid — barely perceptible */}
        <g stroke="rgba(255,160,96,0.023)" strokeWidth="0.35">
          <line x1="5"   y1="113" x2="159" y2="113" />
          <line x1="5"   y1="164" x2="159" y2="164" />
          <line x1="56"  y1="62"  x2="56"  y2="216" />
          <line x1="107" y1="62"  x2="107" y2="216" />
        </g>

        {/* ══ Floral composition — pivot (82, 139) ════════ */}

        {/* Outer containment ring */}
        <circle cx="82" cy="139" r="32"
          fill="none"
          stroke="rgba(255,160,96,0.065)"
          strokeWidth="0.4"
          strokeDasharray={RING_PERIM}
          style={{ strokeDashoffset: `calc((1 - var(--draw, 0)) * ${RING_PERIM})` }}
        />

        {/* 5 petals: cx=82 cy=115 puts inner edge 6 px from pivot, outer 42 px */}
        {([0, 72, 144, 216, 288] as number[]).map((angle, i) => (
          <ellipse
            key={i}
            cx="82" cy="115"
            rx="7" ry="18"
            fill="rgba(255,160,96,0.038)"
            stroke="rgba(255,160,96,0.22)"
            strokeWidth="0.65"
            transform={`rotate(${angle}, 82, 139)`}
            strokeDasharray={PETAL_PERIM}
            style={{ strokeDashoffset: `calc((1 - var(--draw, 0)) * ${PETAL_PERIM})` }}
          />
        ))}

        {/* Radial glow bloom at centre */}
        <circle cx="82" cy="139" r="15" fill="url(#pmk-glow)" />

        {/* Centre ring + pip */}
        <circle cx="82" cy="139" r="4.5"
          fill="none" stroke="rgba(255,160,96,0.22)" strokeWidth="0.55" />
        <circle cx="82" cy="139" r="1.6" fill="rgba(255,160,96,0.40)" />

        {/* ══ Post footer ════════════════════════════════ */}
        <line x1="5" y1="216" x2="159" y2="216"
          stroke="rgba(255,160,96,0.04)" strokeWidth="0.4" />

        {/* Heart */}
        <path
          d="M13 227 C13 223 15.6 220.5 18.8 220.5
             C20.6 220.5 22.3 221.4 23.5 222.7
             C24.7 221.4 26.4 220.5 28.2 220.5
             C31.4 220.5 34 223 34 227
             C34 230.5 30 234 23.5 238.5
             C17 234 13 230.5 13 227Z"
          fill="none"
          stroke="rgba(255,255,255,0.33)"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />

        {/* Comment bubble */}
        <path
          d="M37.5 221 L50 221 Q52 221 52 223
             L52 231.5 Q52 233.5 50 233.5
             L41 233.5 L38 237 L38 233.5
             Q36 233.5 36 231.5 L36 223
             Q36 221 37.5 221Z"
          fill="none"
          stroke="rgba(255,255,255,0.33)"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />

        {/* Send — minimal paper-plane */}
        <path
          d="M57 221 L70 229 L57 237 L59.5 229.5Z"
          fill="none"
          stroke="rgba(255,255,255,0.27)"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />
        <line x1="59.5" y1="229.5" x2="64" y2="229.5"
          stroke="rgba(255,255,255,0.25)" strokeWidth="0.85" />

        {/* Bookmark — flush right */}
        <path
          d="M145 221 L152 221 L152 238 L148.5 235 L145 238Z"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.85"
          strokeLinejoin="round"
        />

        {/* Likes */}
        <text x="13" y="248"
          style={{ ...M, fontSize: '7px' } as React.CSSProperties}
          fill="rgba(255,255,255,0.66)"
        >2,451 likes</text>

        {/* Caption */}
        <text x="13" y="261"
          style={{ ...M, fontSize: '6.5px', letterSpacing: '0.06em' } as React.CSSProperties}
          fill="rgba(255,255,255,0.34)"
        >The art of presence.</text>

        {/* Comments ghost — luxury accounts have quiet comment counts */}
        <text x="13" y="273"
          style={{ ...M, fontSize: '5.8px' } as React.CSSProperties}
          fill="rgba(255,255,255,0.13)"
        >View all 84 comments</text>

        {/* Home indicator */}
        <rect x="62" y="280" width="40" height="2.5" rx="1.25"
          fill="rgba(255,255,255,0.17)" />

        {/* Left-edge screen sheen — conveys glass without a gradient */}
        <rect x="6" y="18" width="34" height="268" rx="18"
          fill="rgba(255,255,255,0.005)" />
      </svg>

      <p style={{
        ...M,
        fontSize: '0.50rem',
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: 'rgba(255,160,96,0.22)',
        textAlign: 'center',
        marginTop: '0.9rem',
      }}>
        Brand · Identity
      </p>
    </div>
  )
}

// ─── SERVICE BEATS ────────────────────────────────

function Beat4({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
      <div style={{ padding: 'clamp(1.8rem, 4.5vw, 4.5rem)', paddingTop: 'clamp(3.5rem, 9vh, 9rem)' }}>
        <Label text="01 / 04" />
        <h3 style={{ ...D, fontSize: 'clamp(2rem, 4.8vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.035em', color: '#FFFFFF', textShadow: HS, marginBottom: '0.55rem' }}>
          IDENTITY
        </h3>
        <p style={{ ...I, fontSize: 'clamp(0.95rem, 1.25vw, 1.6rem)', color: GHOST, textShadow: '0 0 40px rgba(0,0,0,0.92)' }}>
          Creating gravity.
        </p>
      </div>
    </div>
  )
}

function Beat5({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
      <div style={{ padding: 'clamp(1.8rem, 4.5vw, 4.5rem)', textAlign: 'right' }}>
        <Label text="02 / 04" align="right" />
        <h3 style={{ ...D, fontSize: 'clamp(2rem, 4.8vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.035em', color: '#FFFFFF', textShadow: HS, marginBottom: '0.55rem' }}>
          CONTENT
        </h3>
        <p style={{ ...I, fontSize: 'clamp(0.95rem, 1.25vw, 1.6rem)', color: GHOST, textShadow: '0 0 40px rgba(0,0,0,0.92)' }}>
          Building attention.
        </p>
      </div>
    </div>
  )
}

function Beat6({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'flex-end', justifyContent: 'center', paddingBottom: 'clamp(2.5rem, 6vh, 7rem)' }}>
      <div style={{ textAlign: 'center' }}>
        <Label text="03 / 04" align="center" />
        <h3 style={{ ...D, fontSize: 'clamp(2rem, 4.8vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.035em', color: '#FFFFFF', textShadow: HS, marginBottom: '0.55rem' }}>
          WEB
        </h3>
        <p style={{ ...I, fontSize: 'clamp(0.95rem, 1.25vw, 1.6rem)', color: GHOST, textShadow: '0 0 40px rgba(0,0,0,0.92)' }}>
          Creating experiences.
        </p>
      </div>
    </div>
  )
}

function Beat7({ r }: { r: Ref<HTMLDivElement> }) {
  return (
    <div ref={r} className="beat" style={{ alignItems: 'flex-start', justifyContent: 'flex-end' }}>
      <div style={{ padding: 'clamp(1.8rem, 4.5vw, 4.5rem)', paddingTop: 'clamp(3.5rem, 9vh, 9rem)', textAlign: 'right' }}>
        <Label text="04 / 04" align="right" />
        <h3 style={{ ...D, fontSize: 'clamp(2rem, 4.8vw, 6.5rem)', lineHeight: 0.88, letterSpacing: '-0.035em', color: '#FFFFFF', textShadow: HS, marginBottom: '0.55rem' }}>
          PERFORMANCE
        </h3>
        <p style={{ ...I, fontSize: 'clamp(0.95rem, 1.25vw, 1.6rem)', color: GHOST, textShadow: '0 0 40px rgba(0,0,0,0.92)' }}>
          Scaling brands.
        </p>
      </div>
    </div>
  )
}

// ─── BEAT 8 — FINAL CTA ───────────────────────────
// Ghost CREO fills the frame. CTA floats in its own gravity well.
// Magnetic button: slight pull toward cursor.
function Beat8({ r }: { r: Ref<HTMLDivElement> }) {
  const btnRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const btn = btnRef.current
    if (!btn) return

    const onEnter = () => { btn.style.transition = 'border-color 0.55s ease, color 0.55s ease, box-shadow 0.55s ease' }
    const onMove  = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect()
      const dx = ((e.clientX - rect.left) / rect.width  - 0.5) * 14
      const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 7
      btn.style.transform = `translate(${dx}px, ${dy}px)`
    }
    const onLeave = () => {
      btn.style.transition = 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), border-color 0.55s ease, color 0.55s ease, box-shadow 0.55s ease'
      btn.style.transform = ''
    }

    btn.addEventListener('mouseenter', onEnter)
    btn.addEventListener('mousemove',  onMove)
    btn.addEventListener('mouseleave', onLeave)
    return () => {
      btn.removeEventListener('mouseenter', onEnter)
      btn.removeEventListener('mousemove',  onMove)
      btn.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div ref={r} className="beat" style={{
      alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.22) 55%, transparent 80%)',
    }}>
      {/* Ghost CREO — cinematic backdrop */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden', pointerEvents: 'none',
      }}>
        <span style={{
          ...D,
          fontSize: 'clamp(14rem, 34vw, 48rem)',
          letterSpacing: '-0.08em',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,104,32,0.040)',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          position: 'absolute',
        }}>
          CREO
        </span>
      </div>

      {/* CTA content */}
      <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', width: 'min(90vw, 480px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <div style={{ width: '1px', height: 'clamp(28px, 5vh, 44px)', background: 'linear-gradient(to bottom, transparent, rgba(255,104,32,0.28))', marginBottom: 'clamp(2rem, 4vh, 4rem)' }} />

        <p style={{ ...I, fontSize: 'clamp(1.15rem, 1.9vw, 2.6rem)', lineHeight: 1.22, color: 'rgba(255,255,255,0.42)', textShadow: HS, marginBottom: '0.10em' }}>
          The center has been found.
        </p>
        <p style={{ ...I, fontSize: 'clamp(1.25rem, 2.1vw, 2.9rem)', lineHeight: 1.22, color: AMBER, textShadow: HS, marginBottom: 'clamp(2.8rem, 5.5vh, 5.5rem)' }}>
          Now let&apos;s build your orbit.
        </p>

        <a
          ref={btnRef}
          href={BOOKING_HREF}
          className="btn-era"
          style={{ pointerEvents: 'auto', display: 'inline-flex' }}
          aria-label="Book a strategy call with CREO"
          data-cursor="hover"
        >
          Book a Strategy Call
          <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1.1rem', marginTop: '1.3rem',
          pointerEvents: 'auto',
        }}>
          <a
            href="mailto:hello@creo.agency"
            className="link-underline"
            style={{ ...M, fontSize: 'clamp(0.58rem, 0.70vw, 0.72rem)', letterSpacing: '0.13em', color: 'rgba(255,160,96,0.40)', textDecoration: 'none', transition: 'color 0.4s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,160,96,0.75)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,160,96,0.40)' }}
          >
            hello@creo.agency
          </a>
          <span style={{ color: 'rgba(255,255,255,0.10)', userSelect: 'none' }}>·</span>
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline"
            style={{ ...M, fontSize: 'clamp(0.58rem, 0.70vw, 0.72rem)', letterSpacing: '0.13em', color: 'rgba(255,160,96,0.40)', textDecoration: 'none', transition: 'color 0.4s ease' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,160,96,0.75)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,160,96,0.40)' }}
          >
            WhatsApp
          </a>
        </div>

        <p style={{ ...M, marginTop: 'clamp(3rem, 6vh, 6rem)', fontSize: 'clamp(0.50rem, 0.60vw, 0.62rem)', letterSpacing: '0.20em', color: 'rgba(255,255,255,0.07)' }}>
          CREO — Beirut, Lebanon — 2026
        </p>

      </div>
    </div>
  )
}

// ─── Sub-components ───────────────────────────────

function Label({ text, align = 'left' }: { text: string; align?: string }) {
  return (
    <p style={{
      ...M,
      fontSize: 'clamp(0.60rem, 0.72vw, 0.74rem)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'rgba(255,104,32,0.42)',
      marginBottom: '0.75rem',
      textAlign: align as 'left' | 'right' | 'center',
    }}>
      {text}
    </p>
  )
}

function ScrollThread() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
      <div style={{ position: 'relative', width: '1px', height: '36px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, left: 0,
          width: '1px', height: '50%',
          background: 'rgba(255,104,32,0.50)',
          animation: 'scrollLine 1.9s ease-in-out infinite',
        }} />
      </div>
      <span style={{ ...M, fontSize: 'clamp(0.58rem, 0.68vw, 0.70rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.20)' }}>
        Scroll
      </span>
    </div>
  )
}

function Chrome() {
  return (
    <>
      <div style={{
        position: 'fixed', zIndex: 500, pointerEvents: 'none',
        top: 'clamp(1.4rem, 3vw, 2.5rem)',
        left: 'clamp(1.6rem, 3.5vw, 3.5rem)',
      }}>
        <span style={{ ...D, fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)', letterSpacing: '0.20em', color: 'rgba(255,255,255,0.45)' }}>
          CREO
        </span>
      </div>

      <a href="mailto:hello@creo.agency" className="chrome-email" style={{
        position: 'fixed', zIndex: 500,
        top: 'clamp(1.4rem, 3vw, 2.5rem)',
        right: 'clamp(1.6rem, 3.5vw, 3.5rem)',
        ...M, fontSize: 'clamp(0.52rem, 0.65vw, 0.62rem)',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.18)', textDecoration: 'none',
        transition: 'color 0.5s ease',
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,160,96,0.65)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.18)' }}
      >
        hello@creo.agency
      </a>

      <div style={{
        position: 'fixed', zIndex: 500,
        right: 'clamp(1rem, 1.6vw, 1.6rem)',
        top: '50%', transform: 'translateY(-50%)',
        width: '1px', height: '14vh',
        background: 'rgba(255,255,255,0.04)',
      }}>
        <div id="progress-thumb" style={{
          position: 'absolute', top: 0, left: 0,
          width: '1px', height: '0%',
          background: 'rgba(255,104,32,0.28)',
        }} />
      </div>
    </>
  )
}

function StaticLayout() {
  return (
    <div className="static-layout" role="main">
      <header>
        <span style={{ ...D, fontSize: 'clamp(0.65rem, 0.9vw, 0.85rem)', letterSpacing: '0.20em', color: 'rgba(255,255,255,0.45)' }}>
          CREO
        </span>
      </header>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <p style={{ ...M, fontSize: 'clamp(0.60rem, 0.72vw, 0.74rem)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,160,96,0.55)', marginBottom: '1.2rem' }}>
          Creative Agency · Beirut
        </p>
        <h1 style={{ ...D, fontSize: 'clamp(3rem, 10vw, 9rem)', lineHeight: 0.88, letterSpacing: '-0.04em', color: '#fff', marginBottom: '1.2rem' }}>
          CREO
        </h1>
        <p className="tagline">Everything revolves around one thing.</p>
        <p style={{ ...I, fontSize: 'clamp(1rem, 1.6vw, 2rem)', color: 'rgba(255,255,255,0.30)', lineHeight: 1.3, maxWidth: '48ch', marginBottom: '2.4rem' }}>
          Attention is no longer given. It is engineered.
        </p>
        <div className="services" aria-label="Services">
          {['Identity', 'Content', 'Web', 'Performance'].map((s, i) => (
            <span key={s}>{String(i + 1).padStart(2, '0')} {s}</span>
          ))}
        </div>
      </div>

      <div className="static-cta">
        <p className="static-body">
          The center has been found.<br />
          <em>Now let&apos;s build your orbit.</em>
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <a href={BOOKING_HREF} className="btn-era" style={{ display: 'inline-flex' }}>
            Book a Strategy Call
            <svg width="10" height="10" viewBox="0 0 11 11" fill="none" aria-hidden="true" style={{ marginLeft: '0.85em' }}>
              <path d="M1 10L10 1M10 1H4M10 1V7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
            style={{ ...M, fontSize: '0.65rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,160,96,0.55)', textDecoration: 'none' }}>
            WhatsApp
          </a>
        </div>
        <p style={{ ...M, marginTop: '3rem', fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.07)' }}>
          CREO — Beirut, Lebanon — 2026
        </p>
      </div>
    </div>
  )
}

// ─── Orchestration ─────────────────────────────────
const BEATS = [Beat0, Beat1, Beat2, Beat3, Beat4, Beat5, Beat6, Beat7, Beat8]

export default function StoryScroll() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const refs      = useRef<(HTMLDivElement | null)[]>([])
  const proofRef  = useRef<HTMLDivElement>(null)
  const thumb     = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  useEffect(() => {
    if (reducedMotion) return

    thumb.current = document.getElementById('progress-thumb') as HTMLDivElement | null

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress
          scrollProgress.current = p
          if (thumb.current) thumb.current.style.height = `${p * 100}%`

          // Proof mockup: opacity + SVG draw + amber glow
          if (proofRef.current) {
            const op = opacity(p, T_PROOF)
            proofRef.current.style.opacity = String(op)

            // Draw progress: 0→1 as proof fades in
            const drawProg = Math.min(1, Math.max(0,
              (p - T_PROOF[0]) / (T_PROOF[1] - T_PROOF[0])
            ))
            proofRef.current.style.setProperty('--draw', String(drawProg))

            // Amber glow fires when fully drawn
            proofRef.current.style.filter = drawProg > 0.90
              ? 'drop-shadow(0 0 8px rgba(255,104,32,0.26)) drop-shadow(0 0 22px rgba(255,104,32,0.09))'
              : ''
          }

          // Beats: opacity + cinematic blur drift
          refs.current.forEach((el, i) => {
            if (!el) return
            const op   = opacity(p, T[i])
            const blur = blurAt(p, T[i])
            el.style.opacity   = String(op)
            el.style.transform = `translateY(${drift(p, T[i])}px)`
            el.style.filter    = blur > 0.05 ? `blur(${blur.toFixed(2)}px)` : ''
            if (i === 8) el.style.pointerEvents = op > 0.8 ? 'auto' : 'none'
          })
        },
      })
    }, container)

    return () => ctx.revert()
  }, [reducedMotion])

  if (reducedMotion) return <StaticLayout />

  return (
    <>
      <Chrome />
      <ProofMockup r={proofRef} />
      <div ref={container} style={{ height: '1000vh', position: 'relative', zIndex: 10 }}>
        {BEATS.map((Beat, i) => (
          <Beat key={i} r={(el: HTMLDivElement | null) => { refs.current[i] = el }} />
        ))}
      </div>
    </>
  )
}
