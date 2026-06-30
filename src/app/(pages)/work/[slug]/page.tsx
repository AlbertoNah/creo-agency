import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { projects, getProject } from '@/lib/projects'
import CaseStudy from '@/components/CaseStudy'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProject(params.slug)
  if (!project) return {}
  return {
    title: `${project.name} — CREO`,
    description: project.description,
    openGraph: {
      title: `${project.name} — CREO Creative Agency`,
      description: project.description,
    },
  }
}

export default function CaseStudyPage({ params }: Props) {
  const project = getProject(params.slug)
  if (!project) notFound()
  return <CaseStudy project={project} />
}
