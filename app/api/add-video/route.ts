import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

const AddVideoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional().default(''),
  youtube_id: z.string().min(5).max(20),
  category: z.string().min(1).max(50),
  thumbnail_url: z.string().url().optional().nullable(),
  series_name: z.string().max(200).optional().nullable(),
  episode_number: z.union([z.string(), z.number()]).optional().nullable(),
  orientation: z.enum(['landscape', 'vertical']).optional().default('landscape'),
})

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = AddVideoSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { title, description, youtube_id, category, thumbnail_url, series_name, episode_number, orientation } = parsed.data

  const { data, error } = await supabase
    .from('videos')
    .insert({
      title,
      description,
      youtube_id,
      category,
      thumbnail_url: thumbnail_url ?? null,
      visibility: 'public',
      series_name: series_name || null,
      episode_number: episode_number ? parseInt(String(episode_number)) : null,
      orientation,
    })
    .select()

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
