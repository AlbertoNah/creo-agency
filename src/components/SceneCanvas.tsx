'use client'
import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollProgress } from '@/lib/scrollProgress'

function c01(x: number): number { return x < 0 ? 0 : x > 1 ? 1 : x }
function ss(x: number): number  { return x * x * (3 - 2 * x) }
function sr(p: number, a: number, b: number): number {
  return ss(c01((p - a) / (b - a)))
}

// ─────────────────────────────────────────────
// PLANET SHADER
// Real celestial body: FBM terrain, cloud layer, latitude temp gradient,
// atmospheric scattering, and a signature pulse (uSig).
// ─────────────────────────────────────────────

const planetVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPos.xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`

const planetFrag = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  uniform float uProgress;
  uniform float uTime;
  uniform float uTimeIntensity;
  uniform float uOrbitProgress;
  uniform float uLightShift;
  uniform float uSig;

  float h21(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
  float n21(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(h21(i),h21(i+vec2(1,0)),f.x),
               mix(h21(i+vec2(0,1)),h21(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p) {
    return n21(p)*0.500 + n21(p*2.01)*0.250
         + n21(p*4.13)*0.125 + n21(p*8.27)*0.063;
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewPosition);
    float NdotV = max(dot(n,v), 0.0);

    // Light direction shifts during Content beat
    vec3 dirA = normalize(vec3(0.6, 0.4, 0.65));
    vec3 dirB = normalize(vec3(-0.4, 0.55, 0.45));
    vec3 lightDir = normalize(mix(dirA, dirB, uLightShift));
    float lit = max(dot(vWorldNormal, lightDir), 0.0);

    // Spherical UV from world position
    vec3 wp = normalize(vWorldPosition);
    float lon = atan(wp.z + 0.001, wp.x);
    float lat = asin(clamp(wp.y, -0.9999, 0.9999));
    vec2 surfUv = vec2(lon * 0.15915, lat * 0.31831);

    // ── Surface base
    vec3 surface = vec3(0.003, 0.003, 0.009);
    surface += vec3(0.006, 0.003, 0.001) * lit * 0.25;
    surface += vec3(0.001, 0.001, 0.007) * uLightShift * 0.35;

    // ── Micro terrain: static pattern fixed to planet surface
    float terrain = fbm(surfUv * 5.2) - 0.50;
    surface += vec3(0.006, 0.003, 0.001) * terrain * (1.0 - NdotV * 0.7);

    // ── Latitude temperature: poles cool (blue), equator warm
    float latAbs = abs(wp.y);
    surface += vec3(-0.0012, -0.0008, 0.0032) * latAbs * (1.0 - NdotV);
    surface += vec3(0.0030, 0.0015, 0.0000) * (1.0 - latAbs) * lit * 0.12;

    // ── Cloud-like brightness drifting slowly (atmospheric, not surface)
    float clouds = fbm(surfUv * 1.7 - vec2(uTime * 0.00038, 0.0)) - 0.43;
    surface += vec3(0.009, 0.006, 0.003) * max(clouds, 0.0) * (1.0 - NdotV * 0.5);

    // ── Fresnel zones
    float rim  = pow(1.0 - NdotV, 2.5);
    float limb = pow(1.0 - NdotV, 6.0);
    float wire = pow(1.0 - NdotV, 13.0);

    float intensity = uTimeIntensity * (0.5 + uProgress * 0.95 + uOrbitProgress * 0.32);
    float breathe   = sin(uTime * 0.18) * 0.055 + sin(uTime * 0.073) * 0.018 + 1.0;

    // Signature: planet acknowledges the camera revealing its crown
    float sigBoost = 1.0 + uSig * 0.55;

    vec3 amber = mix(vec3(0.88, 0.24, 0.03), vec3(1.0, 0.54, 0.14), uProgress);

    vec3 col = surface;
    col += amber * rim  * intensity * breathe * sigBoost;
    col += amber * limb * (0.06 + uTimeIntensity * 1.84) * sigBoost;
    col += vec3(1.0, 0.84, 0.52) * wire * intensity * 1.6 * sigBoost;
    col += vec3(0.04, 0.014, 0.0) * lit * (1.0 - rim * 0.8);

    gl_FragColor = vec4(col, 1.0);
  }
`

// ─────────────────────────────────────────────
// ATMOSPHERE
// ─────────────────────────────────────────────

const sharedSphereVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vViewPosition = -mvPos.xyz;
    gl_Position = projectionMatrix * mvPos;
  }
`

const atmosFrag = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  uniform float uProgress;
  uniform float uTime;
  uniform float uTimeIntensity;
  uniform vec3  uColor;
  uniform float uPower;
  uniform float uMaxAlpha;
  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewPosition);
    float f = pow(1.0 - max(dot(n,v), 0.0), uPower);
    // Dual-frequency breathe: more organic, less mechanical
    float breathe = sin(uTime * 0.18 + 0.4) * 0.07 + sin(uTime * 0.077 + 1.1) * 0.025 + 1.0;
    float a = min(f * uMaxAlpha * (0.1 + uProgress * 0.9) * uTimeIntensity * breathe, 1.0);
    gl_FragColor = vec4(uColor, a);
  }
`

// ─────────────────────────────────────────────
// PARTICLE SHADERS
// ─────────────────────────────────────────────

const particleVert = /* glsl */ `
  attribute float aSize;
  uniform float uPixelRatio;
  uniform float uSizeMod;
  void main() {
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uSizeMod * uPixelRatio * (340.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

const particleFrag = /* glsl */ `
  uniform float uAlpha;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float d = length(c);
    if (d > 1.0) discard;
    float a = (1.0 - smoothstep(0.3, 1.0, d)) * uAlpha;
    gl_FragColor = vec4(1.0, 0.68, 0.26, a);
  }
`

// ─────────────────────────────────────────────
// STAR SHADERS — per-star twinkle + warm/cool temp
// ─────────────────────────────────────────────

const starVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  varying float vPhase;
  uniform float uPixelRatio;
  uniform float uSizeMod;
  void main() {
    vPhase = aPhase;
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uSizeMod * uPixelRatio * (340.0 / -mvPos.z);
    gl_Position = projectionMatrix * mvPos;
  }
`

const starFrag = /* glsl */ `
  uniform float uAlpha;
  uniform float uTime;
  varying float vPhase;
  void main() {
    vec2 c = gl_PointCoord * 2.0 - 1.0;
    float d = length(c);
    if (d > 1.0) discard;
    // Per-star twinkle: two slightly different frequencies
    float twinkle = 0.78 + 0.14 * sin(uTime * (1.3 + vPhase * 1.9) + vPhase * 6.28318)
                         + 0.08 * sin(uTime * (2.7 + vPhase * 0.9) + vPhase * 3.14159);
    // Warm/cool color per star (physically realistic: stellar temperature variation)
    float warmth = sin(vPhase * 5.82) * 0.5 + 0.5;
    vec3 col = mix(vec3(0.86, 0.88, 1.00), vec3(1.00, 0.93, 0.82), warmth);
    float a = (1.0 - smoothstep(0.2, 1.0, d)) * uAlpha * twinkle;
    gl_FragColor = vec4(col, a);
  }
`

// ─────────────────────────────────────────────
// HORIZON
// ─────────────────────────────────────────────

const horizonVert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`
const horizonFrag = /* glsl */ `
  varying vec2 vUv;
  uniform float uProgress;
  uniform float uScale;
  void main() {
    vec2 c = (vUv - 0.5) * vec2(2.0, 1.0);
    float d = length(c * vec2(1.0, 0.2));
    float g = pow(max(0.0, 1.0 - d / 0.7), 2.6);
    float a = g * uScale * (0.18 + uProgress * 0.82);
    gl_FragColor = vec4(0.94, 0.36, 0.06, a);
  }
`

// ─────────────────────────────────────────────
// CAMERA
//
// SIGNATURE  (p=0.72–0.79): orbits from below, FOV 40°→36°
// IDENTITY   (p=0.79–0.88): camera creeps toward planet — gravity
// CONTENT    (p=0.87–0.93): light shifts, camera drifts opposite axis
// WEBSITES   (p=0.92–0.96): camera drops below orbit, looks up
// PERFORMANCE(p=0.95–0.99): camera pulls back wide
// CTA        (p=0.97–1.00): float reduces to 8%, everything settles
// ─────────────────────────────────────────────

function Camera({ isMobile }: { isMobile: boolean }) {
  const { camera } = useThree()
  const lookY = useRef(-0.15)

  useFrame(({ clock }) => {
    const p = scrollProgress.current
    const t = clock.elapsedTime

    // Mobile keeps camera farther back so the planet stays within the
    // narrow portrait viewport throughout the entire scroll journey.
    let tz = isMobile ? 14.0 - p * 1.8 : 9.8 - p * 5.2
    let ty = isMobile ? 1.4 - p * 1.0  : 1.8 - p * 1.5
    let tx = Math.sin(p * Math.PI * 2.0) * (isMobile ? 0.25 : 1.55)
    let targetLookY = -0.15

    // Astronaut float — two frequencies for organic feel
    const floatX = Math.sin(t * 0.23) * 0.055 + Math.sin(t * 0.41) * 0.022
    const floatY = Math.sin(t * 0.17) * 0.038 + Math.sin(t * 0.29) * 0.016

    // ── SIGNATURE ──────────────────────────────────────────────────────
    const sig = sr(p, 0.72, 0.79)
    if (sig > 0.001) {
      const angle = sig * Math.PI * 0.44
      // Mobile: tighter orbit so planet stays centred on portrait screen
      tx = Math.sin(angle) * (isMobile ? 3.5 : 7.8)
      tz = Math.cos(angle) * (isMobile ? 5.5 : 7.8)
      ty = (isMobile ? -1.0 : -2.1) + sig * (isMobile ? 2.0 : 3.4)
      targetLookY = -0.1 + sig * 0.55
    }

    // FOV: wider on mobile (portrait aspect needs more horizontal field)
    // compresses slightly during signature for cinematic weight
    const baseFov   = isMobile ? 65 : 40
    const targetFov = baseFov - sig * (isMobile ? 3 : 4)
    ;(camera as THREE.PerspectiveCamera).fov +=
      (targetFov - (camera as THREE.PerspectiveCamera).fov) * 0.03
    ;(camera as THREE.PerspectiveCamera).updateProjectionMatrix()

    // ── IDENTITY ────────────────────────────────────────────────────────
    const identityFocus = sr(p, 0.79, 0.84) * (1 - sr(p, 0.86, 0.89))
    tz -= identityFocus * (isMobile ? 0.25 : 0.75)

    // ── CONTENT ─────────────────────────────────────────────────────────
    const contentDrift = sr(p, 0.87, 0.90) * (1 - sr(p, 0.91, 0.93))
    tx += contentDrift * (isMobile ? 0.18 : 0.6)

    // ── WEBSITES ─────────────────────────────────────────────────────────
    const webIn  = sr(p, 0.92, 0.94)
    const webOut = 1 - sr(p, 0.95, 0.97)
    const web    = webIn * webOut
    if (web > 0.001) {
      ty += ((isMobile ? -1.5 : -2.4) - ty) * web * (isMobile ? 0.5 : 0.8)
      targetLookY += (0.75 - targetLookY) * web * 0.75
    }

    // ── PERFORMANCE ──────────────────────────────────────────────────────
    const perfWide = sr(p, 0.95, 0.97) * (1 - sr(p, 0.984, 1.0))
    tz += perfWide * (isMobile ? 0.6 : 1.4)
    ty += perfWide * 0.38

    // ── CTA CALM ─────────────────────────────────────────────────────────
    // Float amplitude drops to near-zero; camera finally settles
    const ctaCalm  = sr(p, 0.97, 1.0)
    const floatAmp = 1 - ctaCalm * 0.92

    const floatW = 1 - c01(sig * 1.4) * 0.9 - c01(web * 1.4) * 0.7

    // Slightly slower lerp on Z for more physical weight
    camera.position.z += (tz - camera.position.z) * 0.014
    camera.position.y += ((ty + floatY * floatW * floatAmp) - camera.position.y) * 0.016
    camera.position.x += ((tx + floatX * floatW * floatAmp) - camera.position.x) * (sig > 0.01 ? 0.016 : 0.010)

    lookY.current += (targetLookY - lookY.current) * 0.038
    camera.lookAt(0, lookY.current, 0)
  })
  return null
}

// ─────────────────────────────────────────────
// PLANET
// ─────────────────────────────────────────────

function Planet({ isMobile }: { isMobile: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat  = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({
    uProgress:      { value: 0 },
    uTime:          { value: 0 },
    uTimeIntensity: { value: 0 },
    uOrbitProgress: { value: 0 },
    uLightShift:    { value: 0 },
    uSig:           { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    const p = scrollProgress.current
    const t = clock.elapsedTime
    if (mat.current) {
      mat.current.uniforms.uProgress.value      = p
      mat.current.uniforms.uTime.value          = t
      mat.current.uniforms.uTimeIntensity.value = c01((t - 0.4) / 5.5)
      mat.current.uniforms.uOrbitProgress.value = c01((t - 5.0) / 8.0)
      mat.current.uniforms.uLightShift.value    = sr(p, 0.87, 0.91) * (1 - sr(p, 0.93, 0.96))
      // Signature pulse: peaks at p=0.76, gone by p=0.80
      mat.current.uniforms.uSig.value           = sr(p, 0.72, 0.76) * (1 - sr(p, 0.76, 0.80))
    }
    if (mesh.current) {
      mesh.current.rotation.y += 0.00055
      // Subtle dual-frequency scale breathe — feels physical, not mechanical
      // Mobile: limit scroll-driven growth so planet stays within portrait viewport
      const breatheScale = (isMobile ? 0.70 : 1)
        + Math.sin(t * 0.18) * 0.005
        + Math.sin(t * 0.073) * 0.002
        + p * (isMobile ? 0.02 : 0.10)
      mesh.current.scale.setScalar(breatheScale)
    }
  })

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[3.0, 128, 128]} />
      <shaderMaterial ref={mat} vertexShader={planetVert} fragmentShader={planetFrag} uniforms={uniforms} />
    </mesh>
  )
}

// ─────────────────────────────────────────────
// ATMOSPHERE
// ─────────────────────────────────────────────

function AtmosLayer({ r, power, max, color, timeOffset = 0.8 }: {
  r: number; power: number; max: number; color: [number,number,number]; timeOffset?: number
}) {
  const mat = useRef<THREE.ShaderMaterial>(null)
  const uniforms = useMemo(() => ({
    uProgress:      { value: 0 },
    uColor:         { value: new THREE.Color(...color) },
    uPower:         { value: power },
    uMaxAlpha:      { value: max },
    uTime:          { value: 0 },
    uTimeIntensity: { value: 0 },
  }), [power, max, color])

  useFrame(({ clock }) => {
    const p = scrollProgress.current
    const t = clock.elapsedTime
    if (mat.current) {
      const growthBoost = sr(p, 0.97, 1.0) * 0.45
      mat.current.uniforms.uMaxAlpha.value      = max * (1 + growthBoost)
      mat.current.uniforms.uProgress.value      = p
      mat.current.uniforms.uTime.value          = t
      mat.current.uniforms.uTimeIntensity.value = c01((t - timeOffset) / 5.5)
    }
  })

  return (
    <mesh>
      <sphereGeometry args={[r, 48, 48]} />
      <shaderMaterial ref={mat}
        vertexShader={sharedSphereVert} fragmentShader={atmosFrag}
        uniforms={uniforms}
        transparent depthWrite={false} side={THREE.BackSide} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

// ─────────────────────────────────────────────
// PRIMARY ORBIT
// ─────────────────────────────────────────────

function DrawingRing({ radius, tiltX, speed, fillByProgress = 0.56 }: {
  radius: number; tiltX: number; speed: number; fillByProgress?: number
}) {
  const SEGS = 240
  const { line, geo, mat } = useMemo(() => {
    const pos = new Float32Array((SEGS + 1) * 3)
    for (let i = 0; i <= SEGS; i++) {
      const a = (i / SEGS) * Math.PI * 2
      pos[i*3]   = Math.cos(a) * radius
      pos[i*3+1] = 0
      pos[i*3+2] = Math.sin(a) * radius
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3))
    g.setDrawRange(0, 0)
    const m = new THREE.LineBasicMaterial({ color: 0xFFA060, transparent: true, opacity: 0 })
    return { line: new THREE.Line(g, m), geo: g, mat: m }
  }, [radius])

  useFrame(() => {
    const p = scrollProgress.current
    const eased = 1 - Math.pow(1 - c01(p / fillByProgress), 3)
    geo.setDrawRange(0, Math.ceil(eased * (SEGS + 1)))

    // Crown glow during signature moment
    const sigGlow = sr(p, 0.72, 0.76) * (1 - sr(p, 0.77, 0.82))
    mat.opacity = Math.min(eased * 1.1, 1) * (0.20 + sigGlow * 0.52)

    line.rotation.y += speed
  })
  return <primitive object={line} rotation={[tiltX, 0, 0]} />
}

function FadeRing({ radius, tube, tiltX, tiltZ = 0, speed, fromProgress = 0 }: {
  radius: number; tube: number; tiltX: number; tiltZ?: number; speed: number; fromProgress?: number
}) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat  = useRef<THREE.MeshBasicMaterial>(null)
  useFrame(() => {
    const p = scrollProgress.current
    const local = c01((p - fromProgress) / (1 - fromProgress))
    if (mesh.current) mesh.current.rotation.z += speed
    if (mat.current)
      mat.current.opacity += (Math.min(local * 1.6, 1) * 0.14 - mat.current.opacity) * 0.04
  })
  return (
    <mesh ref={mesh} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tube, 4, 280]} />
      <meshBasicMaterial ref={mat} color="#FFA060" transparent opacity={0}
        depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

function BeatRing({ radius, tube, tiltX, tiltZ, speed, fadeIn, fadeOut }: {
  radius: number; tube: number; tiltX: number; tiltZ: number
  speed: number; fadeIn: number; fadeOut: number
}) {
  const mesh = useRef<THREE.Mesh>(null)
  const mat  = useRef<THREE.MeshBasicMaterial>(null)
  useFrame(() => {
    const p = scrollProgress.current
    if (mesh.current) mesh.current.rotation.z += speed
    if (mat.current) {
      const alpha = Math.min(c01((p - fadeIn) / 0.018), 1 - c01((p - fadeOut) / 0.018)) * 0.10
      mat.current.opacity += (alpha - mat.current.opacity) * 0.08
    }
  })
  return (
    <mesh ref={mesh} rotation={[tiltX, 0, tiltZ]}>
      <torusGeometry args={[radius, tube, 4, 180]} />
      <meshBasicMaterial ref={mat} color="#FFA060" transparent opacity={0}
        depthWrite={false} blending={THREE.AdditiveBlending} />
    </mesh>
  )
}

// ─────────────────────────────────────────────
// PARTICLES
// CTA calm: rotation drops to near-zero as the universe settles
// ─────────────────────────────────────────────

function Particles({ count, isMobile }: { count: number; isMobile: boolean }) {
  const pts = useRef<THREE.Points>(null)
  const mat = useRef<THREE.ShaderMaterial>(null)

  const { initials, targets, sizes, captureTimes, driftPhase, driftAmp } = useMemo(() => {
    const init = new Float32Array(count * 3)
    const tgt  = new Float32Array(count * 3)
    const sz   = new Float32Array(count)
    const ct   = new Float32Array(count)
    const dp   = new Float32Array(count * 3)
    const da   = new Float32Array(count)
    const TILT = Math.PI / 2.4
    const R    = 3.6

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      const r     = 6 + Math.random() * 11
      init[i*3]   = r * Math.sin(phi) * Math.cos(theta)
      init[i*3+1] = r * Math.sin(phi) * Math.sin(theta)
      init[i*3+2] = r * Math.cos(phi)

      const a  = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.55
      const or = R + (Math.random() - 0.5) * 0.5
      const px = Math.cos(a) * or
      const py = Math.sin(a) * or
      tgt[i*3]   = px
      tgt[i*3+1] = py * Math.cos(TILT)
      tgt[i*3+2] = py * Math.sin(TILT)

      sz[i]      = 0.32 + Math.random() * 1.0
      ct[i]      = 5.0 + (i / count) * 6.5 + (Math.random() - 0.5) * 1.2
      dp[i*3]   = i * 1.732
      dp[i*3+1] = i * 2.318
      dp[i*3+2] = i * 0.971
      da[i]      = 0.7 + Math.random() * 0.9
    }
    return { initials: init, targets: tgt, sizes: sz, captureTimes: ct, driftPhase: dp, driftAmp: da }
  }, [count])

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(initials.slice(), 3))
    g.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))
    return g
  }, [initials, sizes])

  const uniforms = useMemo(() => ({
    uAlpha:      { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
    uSizeMod:    { value: 1.0 },
  }), [])

  useFrame(({ clock }) => {
    if (!pts.current) return
    const p = scrollProgress.current
    const t = clock.elapsedTime

    if (mat.current) {
      const orbitFraction = c01((t - 5.0) / 8.5)
      const chaosAlpha    = c01((t - 2.5) / 3.0) * (isMobile ? 0.040 : 0.065)
      const orbitAlpha    = orbitFraction * (isMobile ? 0.055 : 0.09)
      const growthAlpha   = sr(p, 0.97, 1.0) * (isMobile ? 0.012 : 0.018)
      mat.current.uniforms.uAlpha.value = chaosAlpha + orbitAlpha + growthAlpha + p * (isMobile ? 0.058 : 0.095)

      const identityBlend = sr(p, 0.79, 0.84) * (1 - sr(p, 0.88, 0.91))
      const adsBlend      = sr(p, 0.95, 0.965) * (1 - sr(p, 0.975, 0.985))
      mat.current.uniforms.uSizeMod.value = 1.0 - identityBlend * 0.38 + adsBlend * 0.45
    }

    const pos = pts.current.geometry.attributes.position.array as Float32Array
    const tX  = t * 0.22
    const tY  = t * 0.17
    const tZ  = t * 0.29

    for (let i = 0; i < count; i++) {
      const ix = i * 3
      const captureE  = ss(c01((t - captureTimes[i]) / 2.8))
      const scrollRaw = p < 0.5 ? 2*p*p : 1 - Math.pow(-2*p+2, 2)/2
      const e = Math.max(captureE, scrollRaw)

      const noiseAmp = driftAmp[i] * (1 - e)
      pos[ix]   = (initials[ix]   + Math.sin(tX + driftPhase[ix])   * noiseAmp) * (1-e) + targets[ix]   * e
      pos[ix+1] = (initials[ix+1] + Math.sin(tY + driftPhase[ix+1]) * noiseAmp) * (1-e) + targets[ix+1] * e
      pos[ix+2] = (initials[ix+2] + Math.sin(tZ + driftPhase[ix+2]) * noiseAmp) * (1-e) + targets[ix+2] * e
    }
    pts.current.geometry.attributes.position.needsUpdate = true

    const identityBlend = sr(p, 0.79, 0.84) * (1 - sr(p, 0.88, 0.91))
    const adsBlend      = sr(p, 0.95, 0.965) * (1 - sr(p, 0.975, 0.985))
    const growthBlend   = sr(p, 0.97, 1.0)
    const sigFreeze     = sr(p, 0.72, 0.75) * (1 - sr(p, 0.77, 0.82))

    const rotSpeed = 0.00042
      * (1 - identityBlend * 0.80)
      * (1 + adsBlend * 1.05)
      * (1 - growthBlend * 0.92)    // CTA: nearly stops — universe settles
      * (1 - sigFreeze * 0.90)      // Signature: time suspended
    pts.current.rotation.y += rotSpeed
  })

  return (
    <points ref={pts} geometry={geometry}>
      <shaderMaterial ref={mat}
        vertexShader={particleVert} fragmentShader={particleFrag}
        uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// ─────────────────────────────────────────────
// STARS — per-star twinkle + stellar temperature variation
// ─────────────────────────────────────────────

function Stars({ count = 300 }: { count?: number }) {
  const mat = useRef<THREE.ShaderMaterial>(null)

  const geometry = useMemo(() => {
    const pos   = new Float32Array(count * 3)
    const sz    = new Float32Array(count)
    const phase = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const t = Math.random() * Math.PI * 2
      const p = Math.acos(2 * Math.random() - 1)
      const r = 24 + Math.random() * 14
      pos[i*3]   = r * Math.sin(p) * Math.cos(t)
      pos[i*3+1] = r * Math.sin(p) * Math.sin(t)
      pos[i*3+2] = r * Math.cos(p)
      sz[i]    = 0.28 + Math.random() * 0.55
      phase[i] = Math.random() * Math.PI * 2
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos,   3))
    g.setAttribute('aSize',    new THREE.BufferAttribute(sz,    1))
    g.setAttribute('aPhase',   new THREE.BufferAttribute(phase, 1))
    return g
  }, [count])

  const uniforms = useMemo(() => ({
    uAlpha:      { value: 0 },
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
    uSizeMod:    { value: 1.0 },
    uTime:       { value: 0 },
  }), [])

  useFrame(({ clock }) => {
    if (mat.current) {
      const t = clock.elapsedTime
      mat.current.uniforms.uAlpha.value = c01((t - 0.5) / 7.0) * 0.044
      mat.current.uniforms.uTime.value  = t
    }
  })

  return (
    <points geometry={geometry}>
      <shaderMaterial ref={mat}
        vertexShader={starVert} fragmentShader={starFrag}
        uniforms={uniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  )
}

// ─────────────────────────────────────────────
// HORIZON
// ─────────────────────────────────────────────

function Horizon() {
  const m1 = useRef<THREE.ShaderMaterial>(null)
  const m2 = useRef<THREE.ShaderMaterial>(null)
  const u1 = useMemo(() => ({ uProgress: { value: 0 }, uScale: { value: 0.50 } }), [])
  const u2 = useMemo(() => ({ uProgress: { value: 0 }, uScale: { value: 0.24 } }), [])
  useFrame(() => {
    const p = scrollProgress.current
    if (m1.current) m1.current.uniforms.uProgress.value = p
    if (m2.current) m2.current.uniforms.uProgress.value = p
  })
  return (
    <>
      <mesh position={[0, -4.4, -0.5]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[34, 18]} />
        <shaderMaterial ref={m1} vertexShader={horizonVert} fragmentShader={horizonFrag}
          uniforms={u1} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh position={[0, -5.4, -2.0]} rotation={[-Math.PI/2, 0, 0]}>
        <planeGeometry args={[52, 26]} />
        <shaderMaterial ref={m2} vertexShader={horizonVert} fragmentShader={horizonFrag}
          uniforms={u2} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  )
}

// ─────────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────────

export default function SceneCanvas() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 769 || navigator.maxTouchPoints > 1)
  const particleCount = isMobile ? 160 : 380
  const starCount     = isMobile ? 100 : 280

  if (reducedMotion) {
    return (
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0,
        background: 'radial-gradient(ellipse 65% 75% at 50% 50%, #1c0600 0%, #0a0200 35%, #000 100%)',
      }} />
    )
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas
        camera={{ position: isMobile ? [0, 1.4, 14.0] : [0, 1.8, 9.8], fov: isMobile ? 65 : 40 }}
        gl={{
          antialias: !isMobile, alpha: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        dpr={[1, isMobile ? 1 : 1.5]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#000000']} />
        <Camera isMobile={isMobile} />
        <Stars count={starCount} />
        <Horizon />
        <Particles count={particleCount} isMobile={isMobile} />
        <Planet isMobile={isMobile} />
        <AtmosLayer r={3.30} power={1.6} max={isMobile ? 0.14 : 0.26} color={[1.0, 0.42, 0.08]} timeOffset={0.6} />
        <AtmosLayer r={4.10} power={1.1} max={isMobile ? 0.06 : 0.10} color={[0.88, 0.28, 0.04]} timeOffset={1.2} />
        {!isMobile && (
          <AtmosLayer r={5.80} power={0.7} max={0.05} color={[0.7, 0.20, 0.02]} timeOffset={2.2} />
        )}

        <DrawingRing radius={3.65} tiltX={Math.PI / 2.4} speed={0.00065} fillByProgress={0.56} />
        <FadeRing radius={4.7}  tube={0.004} tiltX={Math.PI/3.0} tiltZ={0.28}   speed={-0.00048} fromProgress={0.38} />
        <FadeRing radius={6.2}  tube={0.003} tiltX={Math.PI/1.9} tiltZ={-0.18}  speed={0.00032}  fromProgress={0.58} />

        <BeatRing radius={5.1} tube={0.003} tiltX={Math.PI/4.2}  tiltZ={0.85}   speed={0.00058}  fadeIn={0.950} fadeOut={0.984} />
        <BeatRing radius={4.0} tube={0.002} tiltX={Math.PI/1.55} tiltZ={-0.52}  speed={-0.00042} fadeIn={0.956} fadeOut={0.980} />
        <BeatRing radius={6.6} tube={0.003} tiltX={Math.PI/2.3}  tiltZ={1.35}   speed={0.00030}  fadeIn={0.963} fadeOut={0.990} />
      </Canvas>
    </div>
  )
}
