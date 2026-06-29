'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    name: 'META ADS',
    sub: 'Reach millions. Convert them.',
    desc: 'Precision-targeted Facebook & Instagram campaigns that flood your funnel with qualified buyers and measurable ROI.',
    tags: ['Facebook', 'Instagram', 'Retargeting', 'ROAS'],
    color: '#0C0814',
    accent: '#B8975A',
  },
  {
    num: '02',
    name: 'WEB DESIGN',
    sub: 'Digital experiences that sell.',
    desc: 'Award-level websites and landing pages engineered to convert—built on Next.js and fine-tuned for performance.',
    tags: ['Next.js', 'UI/UX', 'CRO', 'Speed'],
    color: '#040C0C',
    accent: '#00F5D4',
  },
  {
    num: '03',
    name: 'BRANDING',
    sub: 'Identity that outlasts trends.',
    desc: 'From naming and visual identity to tone of voice—we build brands with the gravitas to dominate their market.',
    tags: ['Logo', 'Guidelines', 'Positioning', 'Strategy'],
    color: '#0C0B04',
    accent: '#B8975A',
  },
  {
    num: '04',
    name: 'CONTENT',
    sub: 'Stories that stop the scroll.',
    desc: 'Cinematic photography, viral reels, scroll-stopping graphics—content that makes your audience feel something.',
    tags: ['Reels', 'Photography', 'Copywriting', 'Design'],
    color: '#040C08',
    accent: '#00F5D4',
  },
  {
    num: '05',
    name: 'VIDEO',
    sub: 'Moving stories. Moving people.',
    desc: 'From commercial shoots to social reels, we produce video content that carries the emotional weight of a brand film.',
    tags: ['Production', 'Color Grade', 'Motion', 'Sound'],
    color: '#0C0404',
    accent: '#B8975A',
  },
  {
    num: '06',
    name: 'GOOGLE ADS',
    sub: 'Be there when they search.',
    desc: 'Search, display, and Performance Max campaigns that capture high-intent buyers exactly when they need you.',
    tags: ['Search', 'Display', 'PMax', 'Analytics'],
    color: '#04080C',
    accent: '#00F5D4',
  },
  {
    num: '07',
    name: 'SEO',
    sub: 'Found by the right people.',
    desc: 'Technical audits, content strategies, and link building that push you to page one—and keep you there.',
    tags: ['Technical', 'Content', 'Links', 'Local'],
    color: '#0C0814',
    accent: '#B8975A',
  },
  {
    num: '08',
    name: 'E-COMMERCE',
    sub: 'Stores that never sleep.',
    desc: 'Full-stack e-commerce solutions—Shopify, WooCommerce, custom builds—optimized for conversion at every click.',
    tags: ['Shopify', 'WooCommerce', 'UX', 'Payments'],
    color: '#080C04',
    accent: '#00F5D4',
  },
]

// Each panel is 100vw wide; scroll space = (n-1) panels × 100vw expressed as pixels on update
const PANEL_COUNT = SERVICES.length

export default function Services() {
  const outerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const currentNumRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    const progressBar = progressBarRef.current
    const currentNum = currentNumRef.current
    if (!outer || !track || !progressBar || !currentNum) return

    const getScrollWidth = () => track.scrollWidth - window.innerWidth

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress

          // Move track horizontally
          const x = -p * getScrollWidth()
          track.style.transform = `translateX(${x}px)`

          // Update progress bar
          progressBar.style.width = `${p * 100}%`

          // Update current number
          const idx = Math.min(PANEL_COUNT - 1, Math.floor(p * PANEL_COUNT))
          currentNum.textContent = SERVICES[idx].num
        },
      })
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    // Outer div provides scroll space; inner section is CSS sticky
    <div
      ref={outerRef}
      id="services"
      style={{ height: `calc(100vh + ${(PANEL_COUNT - 1) * 100}vw)` }}
    >
      <section
        ref={sectionRef}
        className="relative bg-void overflow-hidden"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        {/* Section header */}
        <div className="absolute top-8 left-8 lg:left-16 z-20 flex items-center gap-6">
          <div className="accent-line" />
          <span className="eyebrow">Services</span>
          <span className="text-white/20 font-display text-lg">
            <span ref={currentNumRef}>01</span> / 08
          </span>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5 z-20">
          <div
            ref={progressBarRef}
            className="h-full bg-gold"
            style={{ width: '0%', transition: 'none' }}
          />
        </div>

        {/* Horizontal track — moved via transform in onUpdate */}
        <div
          ref={trackRef}
          className="flex h-full"
          style={{ width: `${PANEL_COUNT * 100}vw`, willChange: 'transform' }}
        >
          {SERVICES.map((service) => (
            <div
              key={service.num}
              className="relative flex-shrink-0 w-screen h-full flex items-center overflow-hidden"
              style={{ background: service.color }}
            >
              {/* Giant ghost number */}
              <div className="service-number">{service.num}</div>

              {/* Vertical accent line */}
              <div
                className="absolute left-8 lg:left-16 top-1/2 -translate-y-1/2 w-px"
                style={{ height: '30vh', background: service.accent, opacity: 0.4 }}
              />

              <div className="relative z-10 w-full px-8 lg:px-16 pt-24">
                <p className="eyebrow mb-6" style={{ color: service.accent }}>
                  {service.num}
                </p>

                <h2
                  className="font-display leading-[0.85] mb-3"
                  style={{ fontSize: 'clamp(4rem, 11vw, 13rem)' }}
                >
                  {service.name}
                </h2>
                <p
                  className="font-serif italic text-xl lg:text-3xl mb-10"
                  style={{ color: service.accent }}
                >
                  {service.sub}
                </p>

                <div className="max-w-lg">
                  <p className="text-white/50 text-base lg:text-lg leading-relaxed mb-8">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="tag"
                        style={{ borderColor: `${service.accent}22`, color: service.accent }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Decorative corner */}
              <div className="absolute right-8 bottom-8 lg:right-16 lg:bottom-16">
                <div
                  className="w-20 h-20 border rounded-full opacity-10"
                  style={{ borderColor: service.accent }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
