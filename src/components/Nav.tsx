'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/work',     label: 'Work'     },
  { href: '/services', label: 'Services' },
  { href: '/about',    label: 'About'    },
]

const WA    = 'https://wa.me/96176924105?text=Hello%20CREO%2C%20I%20would%20like%20to%20discuss%20a%20project'
const IG    = 'https://www.instagram.com/creoagency/'
const LI    = 'https://www.linkedin.com/company/creoagency/'

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

  // Close mobile menu on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* ── Top bar ─────────────────────────────────────── */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
          padding: '0 clamp(1.6rem, 4vw, 3.5rem)',
          height: 'clamp(52px, 7vh, 64px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: scrolled ? 'rgba(4,3,2,0.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(1.2)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(1.2)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,104,32,0.06)' : '1px solid transparent',
          transition: 'background 0.6s ease, backdrop-filter 0.6s ease, border-color 0.6s ease',
        }}
      >
        {/* Logo */}
        <Link href="/" aria-label="CREO — Home" style={{
          ...D,
          fontSize: 'clamp(0.75rem, 0.9vw, 0.88rem)',
          letterSpacing: '0.22em',
          color: 'rgba(255,255,255,0.88)',
          textDecoration: 'none',
          flexShrink: 0,
        }}>
          CREO
        </Link>

        {/* Desktop links */}
        <div className="nav-desktop-links" role="list">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                role="listitem"
                className="nav-link"
                data-active={active}
                style={{
                  ...M,
                  fontSize: '0.60rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: active ? 'rgba(255,160,96,0.95)' : 'rgba(255,255,255,0.40)',
                  transition: 'color 0.35s ease',
                }}
              >
                {label}
              </Link>
            )
          })}
        </div>

        {/* Right: CTA pill + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexShrink: 0 }}>
          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
            aria-label="Start a project via WhatsApp"
          >
            Start a Project
          </a>

          <button
            onClick={() => setOpen(o => !o)}
            className="nav-hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px', position: 'relative', width: '28px', height: '20px',
            }}
          >
            {[
              { top: 0,      width: '28px', transform: open ? 'translateY(9px) rotate(45deg)' : 'none' },
              { top: '9px',  width: '18px', opacity: open ? 0 : 1 },
              { bottom: 0,   width: '28px', transform: open ? 'translateY(-9px) rotate(-45deg)' : 'none' },
            ].map((s, i) => (
              <span key={i} style={{
                position: 'absolute', left: 0,
                display: 'block', height: '1px',
                background: 'rgba(255,255,255,0.75)',
                transition: 'transform 0.38s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
                ...s,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* ── Mobile overlay ──────────────────────────────── */}
      <div
        id="mobile-menu"
        aria-hidden={!open}
        style={{
          position: 'fixed', inset: 0, zIndex: 850,
          background: 'rgba(2,1,1,0.97)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          gap: '0',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 0.42s ease',
        }}
      >
        {/* Nav links */}
        <nav aria-label="Mobile navigation" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', marginBottom: '3.5rem' }}>
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              style={{
                ...D,
                fontSize: 'clamp(3rem, 12vw, 5.5rem)',
                lineHeight: 1.05,
                letterSpacing: '-0.035em',
                textDecoration: 'none',
                color: (pathname === href || pathname.startsWith(href + '/')) ? '#FFA060' : 'rgba(255,255,255,0.75)',
                transform: open ? 'translateY(0)' : 'translateY(22px)',
                opacity: open ? 1 : 0,
                transition: `transform 0.55s cubic-bezier(0.16,1,0.3,1) ${i * 75}ms, opacity 0.55s ease ${i * 75}ms`,
                display: 'block',
              }}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div style={{
          width: '28px', height: '1px',
          background: 'rgba(255,104,32,0.18)',
          marginBottom: '2.5rem',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.5s ease 200ms',
        }} />

        {/* Social + CTA row */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.2rem',
          opacity: open ? 1 : 0,
          transition: 'opacity 0.5s ease 260ms',
        }}>
          <a href={WA} target="_blank" rel="noopener noreferrer" style={{
            ...M, fontSize: '0.62rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: 'rgba(255,104,32,0.72)',
            textDecoration: 'none',
          }}>
            Start a Project ↗
          </a>

          <div style={{ display: 'flex', gap: '2.4rem' }}>
            <a href={IG} target="_blank" rel="noopener noreferrer" style={{
              ...M, fontSize: '0.56rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
              textDecoration: 'none', transition: 'color 0.3s ease',
            }}>
              Instagram
            </a>
            <a href={LI} target="_blank" rel="noopener noreferrer" style={{
              ...M, fontSize: '0.56rem', letterSpacing: '0.16em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)',
              textDecoration: 'none', transition: 'color 0.3s ease',
            }}>
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
