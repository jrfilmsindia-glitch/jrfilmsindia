import { createClient } from '@supabase/supabase-js'
import type { MetadataRoute } from 'next'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: videos } = await supabase.from('videos').select('id, created_at').eq('visibility', 'public')

  const videoUrls = (videos || []).map((v) => ({
    url: `https://jrfilmsindia.com/watch/${v.id}`,
    lastModified: new Date(v.created_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const staticUrls = [
    { url: 'https://jrfilmsindia.com', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: 'https://jrfilmsindia.com/browse', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://jrfilmsindia.com/series', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://jrfilmsindia.com/shorts', lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: 'https://jrfilmsindia.com/about', lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.5 },
  ]

  return [...staticUrls, ...videoUrls]
}
