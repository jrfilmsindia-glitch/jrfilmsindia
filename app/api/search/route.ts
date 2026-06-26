import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { z } from 'zod'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
)

const SearchSchema = z.object({
  q: z.string().max(200).default(''),
})

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const parsed = SearchSchema.safeParse({ q: searchParams.get('q') ?? '' })

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const q = parsed.data.q.trim()

  if (!q) {
    return NextResponse.json({ data: [] })
  }

  const { data, error } = await supabase
    .from('videos')
    .select('*')
    .eq('visibility', 'public')
    .or(`title.ilike.%${q}%,series_name.ilike.%${q}%,description.ilike.%${q}%`)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ data })
}
