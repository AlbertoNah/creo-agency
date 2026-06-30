import type { Metadata } from 'next'
import ServicesPage from '@/components/ServicesPage'

export const metadata: Metadata = {
  title: 'Services',
  description: 'Identity, Content, Web, and Performance — each service built as a chapter, not a checklist. CREO Creative Agency, Beirut.',
  openGraph: {
    title: 'Services — CREO Creative Agency',
    description: 'Four disciplines. One studio. Built for brands that want to be impossible to ignore.',
  },
}

export default function Services() {
  return <ServicesPage />
}
