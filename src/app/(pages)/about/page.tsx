import type { Metadata } from 'next'
import AboutPage from '@/components/AboutPage'

export const metadata: Metadata = {
  title: 'About',
  description: 'Built in Lebanon for brands that want to be impossible to ignore. The story of CREO Creative Agency.',
  openGraph: {
    title: 'About — CREO Creative Agency',
    description: 'Built in Lebanon for brands that want to be impossible to ignore.',
  },
}

export default function About() {
  return <AboutPage />
}
