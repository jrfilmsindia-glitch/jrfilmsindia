'use client'
import { useEffect } from 'react'

export default function ViewTracker({ videoId }: { videoId: string }) {
  useEffect(() => {
    fetch('/api/increment-view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: videoId })
    }).catch(() => {})
  }, [videoId])

  return null
}
