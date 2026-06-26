import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

const UpdateVideoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(2000).optional(),
  category: z.string().min(1).max(50).optional(),
  featured: z.boolean().optional(),
  series_name: z.string().max(200).nullable().optional(),
  episode_number: z.number().int().positive().nullable().optional(),
  orientation: z.enum(['landscape', 'vertical']).optional(),
})

const DeleteVideoSchema = z.object({
  id: z.string().uuid(),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = UpdateVideoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { id, title, description, category, featured, series_name, episode_number, orientation } = parsed.data

  const updateData: Record<string, unknown> = {}
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
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = DeleteVideoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { error } = await supabase.from('videos').delete().eq('id', parsed.data.id)
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
