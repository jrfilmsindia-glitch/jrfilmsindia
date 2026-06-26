import { createClient } from '@supabase/supabase-js'
import type { MetadataRoute } from 'next'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { data: videos } = await supabase
    .from('videos')
    .select('id, created_at')
    .eq('visibility', 'public')

  const base = 'https://jrfilmsindia.com'
  const staticPages = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/browse`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/series`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/shorts`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/films`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/songs`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/watchlist`, lastModified: new Date(), changeFrequency: 'never' as const, priority: 0.3 },
  ]

  const videoPages = (videos || []).map((v) => ({
    url: `${base}/watch/${v.id}`,
    lastModified: new Date(v.created_at),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...videoPages]
}
