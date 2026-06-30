import Nav    from '@/components/Nav'
import Footer from '@/components/Footer'

export default function PagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: '#000', minHeight: '100vh', color: '#fff' }}>
      <Nav />
      <main style={{ paddingTop: 'clamp(5rem, 10vh, 6.5rem)' }}>
        {children}
      </main>
      <Footer />
    </div>
  )
}
