import dynamic from 'next/dynamic'
import ClientRoot from '@/components/ClientRoot'

const SceneCanvas = dynamic(() => import('@/components/SceneCanvas'), { ssr: false })
const StoryScroll = dynamic(() => import('@/components/StoryScroll'), { ssr: false })

export default function Home() {
  return (
    <ClientRoot>
      <SceneCanvas />
      <StoryScroll />
    </ClientRoot>
  )
}
