// Shared mutable ref — updated by GSAP, read by Three.js useFrame
// No React state = no re-renders on scroll
export const scrollProgress = { current: 0 }
