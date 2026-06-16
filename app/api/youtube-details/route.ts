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
  return NextResponse.json({
    title: snippet.title,
    description: snippet.description,
    thumbnail: snippet.thumbnails.maxres?.url || snippet.thumbnails.high?.url
  })
}
