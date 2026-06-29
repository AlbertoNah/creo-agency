import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,104,32,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Planet */}
        <div
          style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, rgba(255,104,32,0.6) 0%, rgba(255,50,5,0.3) 40%, rgba(0,0,0,0.9) 100%)',
            boxShadow: '0 0 80px rgba(255,104,32,0.25), 0 0 160px rgba(255,50,5,0.10)',
            marginBottom: '48px',
          }}
        />

        {/* CREO wordmark */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            color: '#FFFFFF',
            letterSpacing: '-4px',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          CREO
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 22,
            color: 'rgba(255,160,96,0.75)',
            letterSpacing: '4px',
            textTransform: 'uppercase',
          }}
        >
          Creative Agency · Beirut
        </div>

        {/* Bottom rule */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            width: '80px',
            height: '1px',
            background: 'rgba(255,104,32,0.35)',
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
