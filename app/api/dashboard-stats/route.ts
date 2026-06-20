import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export async function GET() {
  const { data: videos, error } = await supabase.from('videos').select('*')
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const total = videos?.length || 0
  const byCategory: Record<string, number> = {}
  videos?.forEach(v => {
    byCategory[v.category] = (byCategory[v.category] || 0) + 1
  })

  const seriesNames = new Set(videos?.filter(v => v.series_name).map(v => v.series_name))
  const recent = [...(videos || [])]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5)

  return NextResponse.json({ total, byCategory, seriesCount: seriesNames.size, recent })
}
