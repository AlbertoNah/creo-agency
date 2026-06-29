'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    id: '01',
    title: 'LUMA',
    category: 'Fine Dining Restaurant',
    year: '2024',
    services: ['Branding', 'Social Media', 'Photography', 'Meta Ads'],
    result: '+280% reservations in 60 days',
    color1: '#1A0E06',
    color2: '#2C1A08',
    accentColor: '#B8975A',
    metrics: [
      { val: '280%', lbl: 'Reservations' },
      { val: '45K', lbl: 'New Followers' },
      { val: '3.2x', lbl: 'ROAS' },
    ],
  },
  {
    id: '02',
    title: 'PETAL',
    category: 'Luxury Floral Studio',
    year: '2024',
    services: ['Website', 'Content', 'SEO', 'Video'],
    result: '120K organic reach in 3 months',
    color1: '#06100C',
    color2: '#0A1810',
    accentColor: '#00F5D4',
    metrics: [
      { val: '120K', lbl: 'Organic Reach' },
      { val: '4.8★', lbl: 'Google Rating' },
      { val: '+190%', lbl: 'Website Traffic' },
    ],
  },
  {
    id: '03',
    title: 'NOIR',
    category: 'Fashion Label',
    year: '2025',
    services: ['Branding', 'E-commerce', 'Content', 'Meta Ads'],
    result: '$2.4M revenue in launch quarter',
    color1: '#0A0A0A',
    color2: '#141414',
    accentColor: '#B8975A',
    metrics: [
      { val: '$2.4M', lbl: 'Launch Revenue' },
      { val: '8.4x', lbl: 'ROAS' },
      { val: '220K', lbl: 'Impressions/Day' },
    ],
  },
  {
    id: '04',
    title: 'CEDAR HEIGHTS',
    category: 'Real Estate Developer',
    year: '2025',
    services: ['Website', 'Google Ads', 'SEO', 'Video'],
    result: '340 qualified leads in 90 days',
    color1: '#06090F',
    color2: '#080D18',
    accentColor: '#00F5D4',
    metrics: [
      { val: '340', lbl: 'Leads in 90 Days' },
      { val: '62%', lbl: 'Lower CPL' },
      { val: '94%', lbl: 'Close Rate' },
    ],
  },
  {
    id: '05',
    title: 'SERENITY',
    category: 'Beauty & Wellness Brand',
    year: '2025',
    services: ['Branding', 'Social Media', 'Photography', 'Meta Ads'],
    result: '85K followers in first 4 months',
    color1: '#100610',
    color2: '#180A18',
    accentColor: '#B8975A',
    metrics: [
      { val: '85K', lbl: 'New Followers' },
      { val: '12%', lbl: 'Engagement Rate' },
      { val: '5.1x', lbl: 'ROAS' },
    ],
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0]
  index: number
}) {
  return (
    <div
      className="project-card relative flex-shrink-0 h-[75vh] overflow-hidden rounded-2xl group"
      style={{
        width: 'clamp(300px, 65vw, 820px)',
        background: `linear-gradient(135deg, ${project.color1}, ${project.color2})`,
        border: '1px solid rgba(255,255,255,0.05)',
        marginRight: index < PROJECTS.length - 1 ? '2rem' : '0',
      }}
    >
      {/* Ghost number */}
      <div
        className="absolute top-0 right-0 font-display leading-none pointer-events-none select-none"
        style={{
          fontSize: 'clamp(8rem, 18vw, 20rem)',
          color: `${project.accentColor}08`,
          lineHeight: 0.85,
          transform: 'translate(5%, -5%)',
        }}
      >
        {project.id}
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between p-10 lg:p-14">
        <div>
          <div className="flex items-center justify-between mb-8">
            <span className="eyebrow" style={{ color: project.accentColor }}>
              {project.year}
            </span>
            <span className="tag">{project.category}</span>
          </div>

          <h3
            className="font-display leading-[0.88] mb-6"
            style={{ fontSize: 'clamp(3.5rem, 8vw, 9rem)' }}
          >
            {project.title}
          </h3>

          <p className="font-serif italic text-white/50 text-lg mb-6">
            &ldquo;{project.result}&rdquo;
          </p>

          <div className="flex flex-wrap gap-2">
            {project.services.map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-4 border-t pt-8"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
        >
          {project.metrics.map((m) => (
            <div key={m.lbl}>
              <div
                className="font-display leading-none mb-1"
                style={{
                  fontSize: 'clamp(1.8rem, 3.5vw, 3.5rem)',
                  color: project.accentColor,
                }}
              >
                {m.val}
              </div>
              <p className="text-white/35 text-xs uppercase tracking-widest">{m.lbl}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 60% at 50% 50%, ${project.accentColor}08 0%, transparent 70%)`,
        }}
      />

      {/* Hover arrow */}
      <div className="absolute top-10 right-10 lg:top-14 lg:right-14 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-400">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center border"
          style={{ borderColor: project.accentColor, color: project.accentColor }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
              d="M4 14L14 4M14 4H7M14 4V11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default function Portfolio() {
  const outerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const outer = outerRef.current
    const track = trackRef.current
    const header = headerRef.current
    if (!outer || !track || !header) return

    const getScrollWidth = () => Math.max(0, track.scrollWidth - window.innerWidth)

    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        Array.from(header.children),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Horizontal scroll driven by onUpdate (no GSAP pin)
      ScrollTrigger.create({
        trigger: outer,
        start: 'top top',
        end: () => `+=${getScrollWidth()}`,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const x = -self.progress * getScrollWidth()
          if (track) track.style.transform = `translateX(${x}px)`
        },
      })
    }, outer)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={outerRef}
      id="portfolio"
      style={{ height: `calc(100vh + ${(PROJECTS.length - 1) * 85}vw)` }}
    >
      <section
        ref={sectionRef}
        className="relative bg-void overflow-hidden flex flex-col justify-center"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          className="px-8 lg:px-16 py-10 flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-0 justify-between"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="accent-line" />
              <span className="eyebrow">Selected Work</span>
            </div>
            <h2
              className="font-display leading-[0.88]"
              style={{ fontSize: 'clamp(3rem, 7vw, 8rem)' }}
            >
              OUR<br />
              <span className="text-gold-gradient">PORTFOLIO</span>
            </h2>
          </div>
          <p className="text-white/40 font-serif italic text-lg max-w-xs lg:text-right">
            Scroll to navigate through our work.
          </p>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="flex items-center px-8 lg:px-16 pb-8"
          style={{ width: 'max-content', willChange: 'transform' }}
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
