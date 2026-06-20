import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export async function POST(req: Request) {
  const body = await req.json()
  const { title, description, youtube_id, category, thumbnail_url, series_name, episode_number, orientation } = body

  const { data, error } = await supabase
    .from('videos')
    .insert({
      title,
      description,
      youtube_id,
      category,
      thumbnail_url,
      visibility: 'public',
      series_name: series_name || null,
      episode_number: episode_number ? parseInt(episode_number) : null,
      orientation: orientation || 'landscape'
    })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
