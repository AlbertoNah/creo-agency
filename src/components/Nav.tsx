'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/work',     label: 'Work'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
]

const WA = 'https://wa.me/96176924105?text=Hello%20CREO%2C%20I%20would%20like%20to%20discuss%20a%20project'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      {/* ── Top bar ───────────────────────────────────────── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
        padding: 'clamp(1.2rem, 2.5vw, 1.6rem) clamp(1.6rem, 4vw, 3.5rem)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(0,0,0,0.90)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,104,32,0.07)' : '1px solid transparent',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease',
      }}>
        {/* Logo */}
        <Link href="/" style={{
          ...D, fontSize: 'clamp(0.75rem, 1vw, 0.88rem)',
          letterSpacing: '0.22em', color: 'rgba(255,255,255,0.90)',
          textDecoration: 'none',
        }}>
          CREO
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname.startsWith(href)
            return (
              <Link key={href} href={href} style={{
                ...M, fontSize: '0.60rem', letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                color: active ? 'rgba(255,160,96,0.92)' : 'rgba(255,255,255,0.38)',
                transition: 'color 0.35s ease',
                paddingBottom: active ? '0' : '0',
                borderBottom: active ? '1px solid rgba(255,104,32,0.40)' : '1px solid transparent',
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.75)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.38)' }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right side: CTA + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" className="nav-cta">
            Start a Project
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setOpen(o => !o)}
            className="nav-hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            style={{ background: 'none', border: 'none', padding: '4px', position: 'relative', width: '26px', height: '18px' }}
          >
            <span style={{
              position: 'absolute', top: 0, left: 0,
              display: 'block', width: '26px', height: '1px',
              background: 'rgba(255,255,255,0.72)',
              transform: open ? 'translateY(8.5px) rotate(45deg)' : 'none',
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            }} />
            <span style={{
              position: 'absolute', top: '8.5px', left: 0,
              display: 'block', width: '18px', height: '1px',
              background: 'rgba(255,255,255,0.72)',
              opacity: open ? 0 : 1,
              transition: 'opacity 0.25s ease',
            }} />
            <span style={{
              position: 'absolute', bottom: 0, left: 0,
              display: 'block', width: '26px', height: '1px',
              background: 'rgba(255,255,255,0.72)',
              transform: open ? 'translateY(-8.5px) rotate(-45deg)' : 'none',
              transition: 'transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            }} />
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ────────────────────────────────── */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 850,
        background: 'rgba(0,0,0,0.97)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '2.8rem',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.40s ease',
      }}>
        {NAV_LINKS.map(({ href, label }, i) => (
          <Link key={href} href={href} style={{
            ...D, fontSize: 'clamp(3rem, 11vw, 5rem)',
            letterSpacing: '-0.03em', textDecoration: 'none',
            color: pathname.startsWith(href) ? '#FFA060' : 'rgba(255,255,255,0.72)',
            transform: open ? 'translateY(0)' : 'translateY(20px)',
            opacity: open ? 1 : 0,
            transition: `transform 0.50s cubic-bezier(0.16,1,0.3,1) ${i * 70}ms, opacity 0.50s ease ${i * 70}ms`,
          }}>
            {label}
          </Link>
        ))}
        <a href={WA} target="_blank" rel="noopener noreferrer" style={{
          ...M, fontSize: '0.65rem', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(255,104,32,0.65)',
          textDecoration: 'none', marginTop: '0.8rem',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.5s ease 250ms',
        }}>
          Start a Project ↗
        </a>
      </div>
    </>
  )
}
