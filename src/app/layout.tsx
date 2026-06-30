import type { Metadata, Viewport } from 'next'
import { Syne, Cormorant_Garamond, Space_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

const SITE_URL = 'https://creo.agency'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CREO — Creative Agency, Beirut',
    template: '%s — CREO',
  },
  description:
    'CREO is a creative agency based in Beirut, Lebanon. Identity, content, websites, ads, and growth — everything built to orbit around your brand.',
  keywords: ['creative agency', 'Beirut', 'Lebanon', 'branding', 'identity', 'web design', 'social media', 'marketing'],
  authors: [{ name: 'CREO', url: SITE_URL }],
  creator: 'CREO',
  publisher: 'CREO',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'CREO',
    title: 'CREO — Creative Agency, Beirut',
    description: 'Identity. Content. Websites. Ads. Growth. Everything built to orbit around your brand.',
    images: [
      {
        url: '/og-image',
        width: 1200,
        height: 630,
        alt: 'CREO — Creative Agency, Beirut',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CREO — Creative Agency, Beirut',
    description: 'Identity. Content. Websites. Ads. Growth. Everything built to orbit around your brand.',
    images: ['/og-image'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${cormorant.variable} ${spaceMono.variable}`}
    >
      <body className="bg-black text-white overflow-x-hidden">
        <Nav />
        {children}
      </body>
    </html>
  )
}
