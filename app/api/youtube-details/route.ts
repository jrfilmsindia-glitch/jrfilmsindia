import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${process.env.YOUTUBE_API_KEY}&part=snippet`
  )
  const data = await res.json()
  
  if (!data.items || data.items.length === 0) {
    return NextResponse.json({ error: 'Video not found' })
  }

  const snippet = data.items[0].snippet
  const t = snippet.thumbnails
  const thumbnail = t.maxres?.url || t.standard?.url || t.high?.url || t.medium?.url || t.default?.url || null
  return NextResponse.json({
    title: snippet.title,
    description: snippet.description,
    thumbnail,
  })
}
