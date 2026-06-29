'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navLinks = [
  { label: 'Work', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
]

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const nav = navRef.current
    if (!nav) return

    gsap.fromTo(
      nav,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out', delay: 2.6 }
    )

    const onScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 120) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      lastScrollY.current = currentY
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-[900] px-8 lg:px-12 py-6 flex items-center justify-between"
        style={{
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-[0.25em] text-white">CREO</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold" />
        </div>

        <div className="hidden lg:flex items-center gap-12">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="eyebrow text-[#FAFAFA]/60 hover:text-gold transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('#contact')}
            className="btn-outline text-xs py-3 px-6"
          >
            Let's Talk
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden w-10 h-10 flex flex-col items-end justify-center gap-1.5"
          aria-label="Toggle menu"
        >
          <span
            className="block h-px bg-white transition-all duration-300"
            style={{ width: menuOpen ? '100%' : '100%', transform: menuOpen ? 'translateY(5px) rotate(45deg)' : 'none' }}
          />
          <span
            className="block h-px bg-white transition-all duration-300"
            style={{ width: '60%', opacity: menuOpen ? 0 : 1 }}
          />
          <span
            className="block h-px bg-white transition-all duration-300"
            style={{ width: menuOpen ? '100%' : '80%', transform: menuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none' }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className="fixed inset-0 z-[800] bg-void flex flex-col items-center justify-center lg:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? 'all' : 'none',
          transition: 'opacity 0.4s ease',
        }}
      >
        <div className="flex flex-col items-center gap-10">
          {[...navLinks, { label: "Let's Talk", href: '#contact' }].map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-display text-6xl text-white hover:text-gold transition-colors duration-300"
              style={{
                transitionDelay: `${i * 50}ms`,
                transform: menuOpen ? 'translateY(0)' : 'translateY(30px)',
                opacity: menuOpen ? 1 : 0,
                transition: `all 0.5s ease ${i * 80}ms`,
              }}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
