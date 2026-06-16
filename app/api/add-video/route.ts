import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, youtube_id, category } = body

  const { error } = await supabase.from('videos').insert({
    title,
    description,
    youtube_id,
    category,
    visibility: 'public'
  })

  if (error) return NextResponse.json({ error: error.message })
  return NextResponse.json({ success: true })
}
