import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export async function POST(req: Request) {
  const body = await req.json()
  const { id, title, description, category, featured, series_name, episode_number } = body

  const updateData: any = {}
  if (title !== undefined) updateData.title = title
  if (description !== undefined) updateData.description = description
  if (category !== undefined) updateData.category = category
  if (featured !== undefined) updateData.featured = featured
  if (series_name !== undefined) updateData.series_name = series_name
  if (episode_number !== undefined) updateData.episode_number = episode_number

  const { data, error } = await supabase
    .from('videos')
    .update(updateData)
    .eq('id', id)
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}

export async function DELETE(req: Request) {
  const { id } = await req.json()
  const { error } = await supabase.from('videos').delete().eq('id', id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
