import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export async function GET() {
  const { data: videos, error } = await supabase
    .from('videos')
    .select('*')
    .eq('visibility', 'public')
    .order('category', { ascending: true })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const totalViews = videos?.reduce((sum, v) => sum + (v.view_count || 0), 0) || 0

  // Build showcase items: series collapse to ONE card each, others stay individual
  const seenSeries = new Set<string>()
  const showcaseByCategory: Record<string, any[]> = {}

  videos?.forEach(v => {
    if (v.category === 'series' && v.series_name) {
      if (seenSeries.has(v.series_name)) return
      seenSeries.add(v.series_name)
      const episodeCount = videos.filter(x => x.series_name === v.series_name).length
      const firstEp = videos
        .filter(x => x.series_name === v.series_name)
        .sort((a, b) => (a.episode_number || 0) - (b.episode_number || 0))[0]
      if (!showcaseByCategory['series']) showcaseByCategory['series'] = []
      showcaseByCategory['series'].push({ ...firstEp, _episodeCount: episodeCount, _isSeriesCard: true })
    } else {
      if (!showcaseByCategory[v.category]) showcaseByCategory[v.category] = []
      showcaseByCategory[v.category].push(v)
    }
  })

  const seriesNames = new Set(videos?.filter(v => v.series_name).map(v => v.series_name))

  return NextResponse.json({
    totalViews,
    totalVideos: videos?.length || 0,
    byCategory: showcaseByCategory,
    seriesCount: seriesNames.size,
  })
}
