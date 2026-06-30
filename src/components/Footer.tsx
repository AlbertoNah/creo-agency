import Link from 'next/link'

const D: React.CSSProperties = { fontFamily: 'var(--font-display)', fontWeight: 800 }
const M: React.CSSProperties = { fontFamily: 'var(--font-mono)' }
const I: React.CSSProperties = { fontFamily: 'var(--font-serif)', fontWeight: 300, fontStyle: 'italic' }

const WA    = 'https://wa.me/96176924105'
const EMAIL = 'mailto:growthcreo@gmail.com'
const IG    = 'https://www.instagram.com/creoagency/'
const LI    = 'https://www.linkedin.com/company/creoagency/'
const YEAR  = new Date().getFullYear()

const LINK_STYLE: React.CSSProperties = {
  ...M,
  fontSize: '0.62rem',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.30)',
  textDecoration: 'none',
  display: 'block',
  paddingBottom: '0.65rem',
  transition: 'color 0.30s ease',
}

const COL_HEAD: React.CSSProperties = {
  ...M,
  fontSize: '0.54rem',
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: 'rgba(255,104,32,0.45)',
  marginBottom: '1.2rem',
}

export default function Footer() {
  return (
    <footer style={{
      background: '#000',
      borderTop: '1px solid rgba(255,104,32,0.07)',
      padding: 'clamp(4rem, 8vh, 6rem) clamp(1.6rem, 5vw, 4.5rem) clamp(2rem, 4vh, 3rem)',
    }}>
      <div style={{ maxWidth: '1360px', margin: '0 auto' }}>

        {/* Top: brand + columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 'clamp(3rem, 6vw, 6rem)',
          alignItems: 'start',
          marginBottom: 'clamp(3rem, 6vh, 5rem)',
          flexWrap: 'wrap',
        }}>
          {/* Brand */}
          <div>
            <Link href="/" style={{ textDecoration: 'none' }}>
              <p style={{ ...D, fontSize: 'clamp(2rem, 5vw, 4rem)', letterSpacing: '-0.04em', color: '#fff', lineHeight: 1 }}>
                CREO
              </p>
            </Link>
            <p style={{ ...I, fontSize: 'clamp(0.9rem, 1.1vw, 1.1rem)', color: 'rgba(255,255,255,0.20)', marginTop: '0.6rem' }}>
              Built in Beirut, built to orbit.
            </p>
          </div>

          {/* Link columns */}
          <div style={{ display: 'flex', gap: 'clamp(2.5rem, 5vw, 5rem)', flexWrap: 'wrap' }}>

            {/* Pages */}
            <div>
              <p style={COL_HEAD}>Pages</p>
              {[
                { href: '/work',     label: 'Work'     },
                { href: '/services', label: 'Services' },
                { href: '/about',    label: 'About'    },
              ].map(({ href, label }) => (
                <Link key={href} href={href} style={LINK_STYLE}>{label}</Link>
              ))}
            </div>

            {/* Social */}
            <div>
              <p style={COL_HEAD}>Social</p>
              <a href={IG} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>Instagram</a>
              <a href={LI} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>LinkedIn</a>
            </div>

            {/* Contact */}
            <div>
              <p style={COL_HEAD}>Contact</p>
              <a href={EMAIL} style={LINK_STYLE}>growthcreo@gmail.com</a>
              <a href={WA} target="_blank" rel="noopener noreferrer" style={LINK_STYLE}>WhatsApp</a>
              <p style={{ ...M, fontSize: '0.62rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.14)', paddingBottom: '0.65rem' }}>
                Beirut, Lebanon
              </p>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(255,104,32,0.06)', marginBottom: 'clamp(1.5rem, 3vh, 2rem)' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ ...M, fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.11)' }}>
            © {YEAR} CREO. All rights reserved.
          </p>
          <p style={{ ...M, fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.07)' }}>
            Creative Agency · Beirut, Lebanon
          </p>
        </div>

      </div>
    </footer>
  )
}
