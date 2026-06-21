import { NextResponse } from 'next/server'

export const revalidate = 3600 // cache for 1 hour

export async function GET() {
  const channelId = 'UCjmV4fhdpCV2SMIhVTgzoLw'
  const apiKey = process.env.YOUTUBE_API_KEY

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    )
    const data = await res.json()
    const stats = data.items?.[0]?.statistics

    if (!stats) {
      return NextResponse.json({ error: 'No stats found' }, { status: 404 })
    }

    return NextResponse.json({
      subscribers: parseInt(stats.subscriberCount || '0'),
      views: parseInt(stats.viewCount || '0'),
      videoCount: parseInt(stats.videoCount || '0'),
    })
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}
