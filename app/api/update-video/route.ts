import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export async function POST(req: Request) {
  const body = await req.json()
  const { id, title, description, category, featured, series_name, episode_number, orientation } = body

  const updateData: any = {}
  if (title !== undefined) updateData.title = title
  if (description !== undefined) updateData.description = description
  if (category !== undefined) updateData.category = category
  if (featured !== undefined) updateData.featured = featured
  if (series_name !== undefined) updateData.series_name = series_name
  if (episode_number !== undefined) updateData.episode_number = episode_number
  if (orientation !== undefined) updateData.orientation = orientation

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
