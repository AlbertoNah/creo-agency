'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { val: '4.2M+', label: 'Total Reach Generated', change: '+340%' },
  { val: '128K', label: 'New Followers (Avg/Client)', change: '+280%' },
  { val: '8.4x', label: 'Average ROAS', change: '+190%' },
  { val: '12.3%', label: 'Engagement Rate', change: 'Industry Avg: 1.2%' },
]

const PHONE_POSTS = [
  {
    account: '@lumabeirut',
    likes: '12.4K',
    comments: '284',
    gradient: 'linear-gradient(160deg, #2C1A08, #1A0E06)',
    type: 'Reel',
  },
  {
    account: '@petalbeirut',
    likes: '8.9K',
    comments: '156',
    gradient: 'linear-gradient(160deg, #0A1810, #06100C)',
    type: 'Story',
  },
  {
    account: '@noirfashion',
    likes: '24.1K',
    comments: '432',
    gradient: 'linear-gradient(160deg, #141414, #0A0A0A)',
    type: 'Reel',
  },
]

function PhoneMockup({ post, index }: { post: typeof PHONE_POSTS[0]; index: number }) {
  return (
    <div
      className="phone-mockup flex-shrink-0"
      style={{
        width: '220px',
        transform: `rotate(${(index - 1) * 4}deg)`,
        transformOrigin: 'bottom center',
      }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[2rem] overflow-hidden border border-white/10"
        style={{
          width: '220px',
          height: '420px',
          background: '#0A0A0A',
          boxShadow: '0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
        }}
      >
        {/* Notch */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#030303] rounded-full z-10" />

        {/* Screen content */}
        <div
          className="absolute inset-0"
          style={{ background: post.gradient }}
        >
          {/* Instagram UI */}
          <div className="absolute top-0 left-0 right-0 px-4 pt-10 pb-3 flex items-center gap-2 bg-gradient-to-b from-black/40 to-transparent">
            <div className="w-7 h-7 rounded-full bg-gold/60" />
            <div>
              <p className="text-white text-[10px] font-semibold leading-none">{post.account}</p>
              <p className="text-white/50 text-[9px]">{post.type}</p>
            </div>
            <div className="ml-auto">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="2" cy="7" r="1.2" fill="white" opacity="0.7" />
                <circle cx="7" cy="7" r="1.2" fill="white" opacity="0.7" />
                <circle cx="12" cy="7" r="1.2" fill="white" opacity="0.7" />
              </svg>
            </div>
          </div>

          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {post.type === 'Reel' && (
              <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                <svg width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path d="M2 2l12 7L2 16V2z" fill="white" />
                </svg>
              </div>
            )}
          </div>

          {/* Bottom interactions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
            <div className="flex items-end justify-between">
              <div className="text-white text-[10px] opacity-80">
                <span className="font-bold">{post.likes}</span> likes
                <br />
                <span className="opacity-60">{post.comments} comments</span>
              </div>
              <div className="flex flex-col gap-3 items-center">
                {['❤', '💬', '⚡'].map((icon, i) => (
                  <div key={i} className="w-8 h-8 flex items-center justify-center text-lg">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SocialMedia() {
  const sectionRef = useRef<HTMLElement>(null)
  const phonesRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const counterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const section = sectionRef.current
    const phones = phonesRef.current
    const metrics = metricsRef.current
    if (!section || !phones || !metrics) return

    const ctx = gsap.context(() => {
      // Phones reveal
      const phoneEls = phones.querySelectorAll('.phone-mockup')
      gsap.fromTo(
        phoneEls,
        { y: 120, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: phones,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Floating phones animation
      phoneEls.forEach((phone, i) => {
        gsap.to(phone, {
          y: i % 2 === 0 ? -20 : 20,
          duration: 2.5 + i * 0.4,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        })
      })

      // Metrics counter animation
      const metricItems = metrics.querySelectorAll('.metric-item')
      gsap.fromTo(
        metricItems,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: metrics,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Scroll-driven phones parallax
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          if (phones) {
            gsap.set(phones, { y: self.progress * -60 })
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-32 lg:py-40 overflow-hidden bg-void"
    >
      {/* Gradient bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,245,212,0.03) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-[1600px] mx-auto px-8 lg:px-16">
        {/* Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-0 justify-between items-start lg:items-end mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="accent-line" style={{ background: 'var(--teal)' }} />
              <span className="eyebrow">Social Media</span>
            </div>
            <h2
              className="font-display leading-[0.88]"
              style={{ fontSize: 'clamp(3rem, 7vw, 9rem)' }}
            >
              WE MAKE<br />
              <span style={{ color: 'var(--teal)' }}>FEEDS</span> STOP.
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-white/45 font-serif italic text-lg leading-relaxed">
              Content that converts curiosity into community, and community into customers.
            </p>
          </div>
        </div>

        {/* Phone mockups */}
        <div
          ref={phonesRef}
          className="flex items-end justify-center gap-8 mb-24"
          style={{ perspective: '800px' }}
        >
          {PHONE_POSTS.map((post, i) => (
            <PhoneMockup key={post.account} post={post} index={i} />
          ))}
        </div>

        {/* Metrics grid */}
        <div
          ref={metricsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="metric-item glass rounded-2xl p-6 lg:p-8"
              style={{ opacity: 0 }}
            >
              <div
                className="font-display leading-none mb-3"
                style={{ fontSize: 'clamp(2rem, 4vw, 4rem)', color: 'var(--teal)' }}
              >
                {m.val}
              </div>
              <p className="text-white/50 text-sm leading-snug mb-4">{m.label}</p>
              <div
                className="text-xs tracking-wider"
                style={{ color: 'var(--gold)' }}
              >
                {m.change}
              </div>
            </div>
          ))}
        </div>

        {/* Meta Ads dashboard preview */}
        <div className="mt-16 glass rounded-2xl p-8 lg:p-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="eyebrow mb-2">Campaign Performance</p>
              <h3 className="font-display text-3xl">META ADS OVERVIEW</h3>
            </div>
            <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 text-xs tracking-wider">LIVE</span>
            </div>
          </div>

          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Impressions', val: '2.4M', trend: '↑' },
              { label: 'Reach', val: '1.8M', trend: '↑' },
              { label: 'Clicks', val: '84K', trend: '↑' },
              { label: 'CTR', val: '3.5%', trend: '↑' },
              { label: 'Conv.', val: '4,200', trend: '↑' },
              { label: 'ROAS', val: '8.4x', trend: '↑' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.05)' }}
              >
                <p className="text-white/35 text-xs mb-2 uppercase tracking-wider">{stat.label}</p>
                <p className="font-display text-2xl text-white">{stat.val}</p>
                <p className="text-green-400 text-xs mt-1">{stat.trend} This Month</p>
              </div>
            ))}
          </div>

          {/* Mini graph */}
          <div className="mt-8 relative h-20">
            <svg viewBox="0 0 800 80" preserveAspectRatio="none" className="w-full h-full">
              <defs>
                <linearGradient id="graphGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 60 C100 55, 150 40, 200 45 S300 20, 350 25 S450 10, 500 15 S600 5, 650 8 S750 20, 800 10"
                fill="none"
                stroke="var(--teal)"
                strokeWidth="2"
                opacity="0.8"
              />
              <path
                d="M0 60 C100 55, 150 40, 200 45 S300 20, 350 25 S450 10, 500 15 S600 5, 650 8 S750 20, 800 10 L800 80 L0 80 Z"
                fill="url(#graphGrad)"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
