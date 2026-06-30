import { MetadataRoute } from 'next'
import { projects } from '@/lib/projects'

const BASE = 'https://creo.agency'

export default function sitemap(): MetadataRoute.Sitemap {
  const projectRoutes = projects.map((p) => ({
    url: `${BASE}/work/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'monthly',  priority: 1.0 },
    { url: `${BASE}/work`,     lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.9 },
    { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.7 },
    ...projectRoutes,
  ]
}
