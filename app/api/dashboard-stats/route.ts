import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

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
