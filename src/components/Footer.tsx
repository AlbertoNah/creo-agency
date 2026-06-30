import Link from 'next/link'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }

const WA    = 'https://wa.me/96176924105'
const EMAIL = 'mailto:growthcreo@gmail.com'
const YEAR  = new Date().getFullYear()

export default function Footer() {
  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid rgba(255,104,32,0.07)',
      padding: 'clamp(4rem, 8vh, 6rem) clamp(1.6rem, 5vw, 4.5rem) clamp(2rem, 4vh, 3rem)',
    }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '3rem', marginBottom: 'clamp(3rem, 6vh, 5rem)' }}>

          {/* Brand */}
          <div>
            <p style={{ ...D, fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>
              CREO
            </p>
            <p style={{ ...I, fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', color: 'rgba(255,255,255,0.22)', marginTop: '0.6rem' }}>
              Built in Beirut, built to orbit.
            </p>
          </div>

          {/* Nav cols */}
          <div style={{ display: 'flex', gap: 'clamp(3rem, 6vw, 6rem)', flexWrap: 'wrap' }}>
            <div>
              <p style={{ ...M, fontSize: '0.56rem', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.50)', marginBottom: '1.2rem' }}>
                Pages
              </p>
              {[
                { href: '/work',     label: 'Work'     },
                { href: '/services', label: 'Services' },
                { href: '/about',    label: 'About'    },
              ].map(({ href, label }) => (
                <div key={href} style={{ marginBottom: '0.65rem' }}>
                  <Link href={href} style={{ ...M, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                    {label}
                  </Link>
                </div>
              ))}
            </div>

            <div>
              <p style={{ ...M, fontSize: '0.56rem', letterSpacing: '0.20em', textTransform: 'uppercase', color: 'rgba(255,104,32,0.50)', marginBottom: '1.2rem' }}>
                Contact
              </p>
              <div style={{ marginBottom: '0.65rem' }}>
                <a href={EMAIL} style={{ ...M, fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                  growthcreo@gmail.com
                </a>
              </div>
              <div style={{ marginBottom: '0.65rem' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer" style={{ ...M, fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>
                  WhatsApp
                </a>
              </div>
              <div>
                <span style={{ ...M, fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.18)' }}>
                  Beirut, Lebanon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,104,32,0.07)', marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ ...M, fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.12)' }}>
            © {YEAR} CREO. All rights reserved.
          </p>
          <p style={{ ...M, fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.08)' }}>
            Creative Agency · Beirut, Lebanon
          </p>
        </div>

      </div>
    </footer>
  )
}
