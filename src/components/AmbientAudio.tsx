'use client'
import { useRef, useState, useEffect, useCallback } from 'react'

export default function AmbientAudio() {
  const [active, setActive] = useState(false)
  const ctxRef    = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const bootedRef = useRef(false)

  const boot = useCallback(() => {
    if (bootedRef.current) return
    bootedRef.current = true

    const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)()
    ctxRef.current = ctx

    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    masterRef.current = master

    // Deep sine drone — A1 (55 Hz)
    const osc1 = ctx.createOscillator()
    osc1.type = 'sine'
    osc1.frequency.value = 55
    const g1 = ctx.createGain()
    g1.gain.value = 0.14
    osc1.connect(g1)
    g1.connect(master)
    osc1.start()

    // Perfect fifth — E2 (82.4 Hz)
    const osc2 = ctx.createOscillator()
    osc2.type = 'sine'
    osc2.frequency.value = 82.4
    const g2 = ctx.createGain()
    g2.gain.value = 0.06
    osc2.connect(g2)
    g2.connect(master)
    osc2.start()

    // Sub octave — A0 (27.5 Hz)
    const osc3 = ctx.createOscillator()
    osc3.type = 'sine'
    osc3.frequency.value = 27.5
    const g3 = ctx.createGain()
    g3.gain.value = 0.10
    osc3.connect(g3)
    g3.connect(master)
    osc3.start()

    // Filtered brown noise — deep spatial texture
    const bufLen  = ctx.sampleRate * 4
    const buf     = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const data    = buf.getChannelData(0)
    let lastOut   = 0
    for (let i = 0; i < bufLen; i++) {
      const white = Math.random() * 2 - 1
      lastOut = (lastOut + 0.02 * white) / 1.02
      data[i] = lastOut * 3.5
    }
    const noise = ctx.createBufferSource()
    noise.buffer = buf
    noise.loop   = true

    const lpf = ctx.createBiquadFilter()
    lpf.type = 'lowpass'
    lpf.frequency.value = 90
    lpf.Q.value = 0.4

    const ng = ctx.createGain()
    ng.gain.value = 0.038
    noise.connect(lpf)
    lpf.connect(ng)
    ng.connect(master)
    noise.start()

    // Very slow LFO on the drone — creates imperceptible swell
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.06
    const lfoG = ctx.createGain()
    lfoG.gain.value = 0.018
    lfo.connect(lfoG)
    lfoG.connect(g1.gain)
    lfo.start()
  }, [])

  const toggle = useCallback(() => {
    boot()
    const ctx    = ctxRef.current
    const master = masterRef.current
    if (!ctx || !master) return

    if (ctx.state === 'suspended') ctx.resume()

    const next = !active
    setActive(next)
    master.gain.setTargetAtTime(next ? 0.55 : 0, ctx.currentTime, next ? 0.8 : 0.5)
  }, [active, boot])

  useEffect(() => () => { ctxRef.current?.close() }, [])

  return (
    <button
      onClick={toggle}
      aria-label={active ? 'Mute ambient audio' : 'Enable ambient audio'}
      data-cursor="hover"
      style={{
        position: 'fixed',
        bottom: 'clamp(1.4rem, 3vw, 2.5rem)',
        left: 'clamp(1.6rem, 3.5vw, 3.5rem)',
        zIndex: 500,
        background: 'none',
        border: 'none',
        padding: '0.4rem 0',
        cursor: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '0.55rem',
        opacity: active ? 0.65 : 0.32,
        transition: 'opacity 0.5s ease',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.80' }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = active ? '0.65' : '0.32' }}
    >
      <svg width="13" height="11" viewBox="0 0 13 11" fill="none" aria-hidden="true">
        {/* Speaker cone */}
        <path d="M1 3.5H3.2L6 1V10L3.2 7.5H1V3.5Z"
          stroke="rgba(255,160,96,0.7)" strokeWidth="0.75" fill="none" strokeLinejoin="round"/>
        {active ? (
          <>
            {/* Wave 1 */}
            <path d="M8 3.5C8.7 4.2 9.1 4.8 9.1 5.5C9.1 6.2 8.7 6.8 8 7.5"
              stroke="rgba(255,160,96,0.55)" strokeWidth="0.75" fill="none" strokeLinecap="round"/>
            {/* Wave 2 */}
            <path d="M9.8 2C11 3.2 11.7 4.3 11.7 5.5C11.7 6.7 11 7.8 9.8 9"
              stroke="rgba(255,160,96,0.32)" strokeWidth="0.75" fill="none" strokeLinecap="round"/>
          </>
        ) : (
          /* Muted X */
          <>
            <line x1="8.5" y1="3.5" x2="11.5" y2="7.5" stroke="rgba(255,160,96,0.45)" strokeWidth="0.75" strokeLinecap="round"/>
            <line x1="11.5" y1="3.5" x2="8.5" y2="7.5" stroke="rgba(255,160,96,0.45)" strokeWidth="0.75" strokeLinecap="round"/>
          </>
        )}
      </svg>
      <span style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.50rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(255,160,96,0.55)',
      }}>
        {active ? 'On' : 'Sound'}
      </span>
    </button>
  )
}
