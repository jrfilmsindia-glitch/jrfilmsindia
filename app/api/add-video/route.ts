import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, youtube_id, category, thumbnail_url } = body

  console.log('Adding video:', { title, youtube_id, category, thumbnail_url })

  const { error, data } = await supabase.from('videos').insert({
    title,
    description,
    youtube_id,
    category,
    thumbnail_url,
    visibility: 'public'
  })

  if (error) {
    console.log('Error:', error)
    return NextResponse.json({ error: error.message })
  }
  return NextResponse.json({ success: true, data })
}
