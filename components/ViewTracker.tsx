'use client'
import { useEffect } from 'react'

interface ViewTrackerProps {
  videoId: string
  thumbnail?: string
  title?: string
  category?: string
  orientation?: string
}

export default function ViewTracker({ videoId, thumbnail, title, category, orientation }: ViewTrackerProps) {
  useEffect(() => {
    fetch('/api/increment-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: videoId })
    }).catch(() => {})

    if (title && thumbnail !== undefined) {
      try {
        const key = 'jrf_recently_watched'
        const existing: { id: string; title: string; thumbnail_url: string; category: string; orientation: string }[] =
          JSON.parse(localStorage.getItem(key) || '[]')
        const filtered = existing.filter((v) => v.id !== videoId)
        const updated = [
          { id: videoId, title: title || '', thumbnail_url: thumbnail || '', category: category || '', orientation: orientation || 'landscape' },
          ...filtered,
        ].slice(0, 10)
        localStorage.setItem(key, JSON.stringify(updated))
      } catch {}
    }
  }, [videoId, title, thumbnail, category, orientation])

  return null
}
