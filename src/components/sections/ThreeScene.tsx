'use client'
import { useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function MetallicSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<any>(null)
  const { size } = useThree()

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.15

    if (matRef.current) {
      matRef.current.distort = 0.2 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1
    }
  })

  const scale = size.width < 768 ? 1.4 : 2.2

  return (
    <Float speed={1.4} rotationIntensity={0.3} floatIntensity={1.6}>
      <mesh ref={meshRef} scale={scale} castShadow>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshDistortMaterial
          ref={matRef}
          color="#1a1a1f"
          envMapIntensity={18}
          clearcoat={1}
          clearcoatRoughness={0.02}
          metalness={1}
          roughness={0.05}
          distort={0.25}
          speed={1.8}
        />
      </mesh>
    </Float>
  )
}

function SceneLight() {
  const lightRef = useRef<THREE.DirectionalLight>(null)

  useFrame((state) => {
    if (!lightRef.current) return
    lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 5
    lightRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.2) * 3 + 3
  })

  return (
    <>
      <directionalLight ref={lightRef} position={[5, 5, 5]} intensity={1.5} color="#D4B98A" />
      <directionalLight position={[-5, -3, -5]} intensity={0.4} color="#00F5D4" />
      <ambientLight intensity={0.04} />
    </>
  )
}

export default function ThreeScene() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const text = textRef.current
    const canvasWrap = canvasWrapRef.current
    if (!section || !text || !canvasWrap) return

    const ctx = gsap.context(() => {
      // Text reveal on scroll
      const words = text.querySelectorAll('.three-word')
      gsap.fromTo(
        words,
        { y: 60, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          stagger: 0.15,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Sphere scale on scroll
      ScrollTrigger.create({
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        onUpdate: (self) => {
          const p = self.progress
          if (canvasWrap) {
            gsap.set(canvasWrap, {
              scale: 0.85 + p * 0.3,
              rotation: p * 8,
            })
          }
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-void"
      style={{
        background: 'radial-gradient(ellipse 80% 80% at 70% 50%, rgba(15,10,25,1) 0%, #030303 60%)',
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(184,151,90,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(184,151,90,0.8) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Three.js Canvas */}
      <div
        ref={canvasWrapRef}
        className="absolute inset-0 will-change-transform"
        style={{ transformOrigin: 'center center' }}
      >
        <Canvas
          camera={{ position: [0, 0, 6], fov: 42 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2,
          }}
          dpr={[1, 2]}
        >
          <Environment preset="studio" />
          <SceneLight />
          <MetallicSphere />
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-8 lg:px-16">
        <div ref={textRef} className="max-w-2xl">
          <p className="eyebrow mb-8 three-word">What We Forge</p>

          <div className="space-y-0">
            {['WE BUILD', 'DIGITAL', 'LEGENDS.'].map((line) => (
              <div key={line} className="three-word overflow-hidden">
                <h2
                  className="font-display leading-[0.88]"
                  style={{ fontSize: 'clamp(3.5rem, 9vw, 11rem)' }}
                >
                  {line.split('').map((char, i) =>
                    char === ' ' ? (
                      <span key={i}>&nbsp;</span>
                    ) : (
                      <span key={i} className={i % 3 === 2 ? 'text-gold-gradient' : ''}>
                        {char}
                      </span>
                    )
                  )}
                </h2>
              </div>
            ))}
          </div>

          <div className="mt-12 three-word">
            <div className="accent-line mb-6" />
            <p className="text-[#FAFAFA]/45 font-serif italic text-lg leading-relaxed max-w-md">
              Every pixel, every frame, every campaign—crafted to make your brand
              impossible to ignore in a world that never stops scrolling.
            </p>
          </div>
        </div>
      </div>

      {/* Gradient fade to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #030303)' }}
      />
    </section>
  )
}
