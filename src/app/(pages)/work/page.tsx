import type { Metadata } from 'next'
import WorkPage from '@/components/WorkPage'

export const metadata: Metadata = {
  title: 'Work',
  description: 'Five brands rebuilt from the inside. Social media, content, web, identity, and performance — delivered by CREO Creative Agency, Beirut.',
  openGraph: {
    title: 'Work — CREO Creative Agency',
    description: 'Five brands rebuilt from the inside. The archive of brands that orbit around CREO.',
  },
}

export default function Work() {
  return <WorkPage />
}
