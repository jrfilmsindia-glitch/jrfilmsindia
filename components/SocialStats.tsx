'use client'
import { useState, useEffect } from 'react'

function formatNum(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

export default function SocialStats() {
  const [stats, setStats] = useState<{ subscribers: number, views: number, videoCount: number } | null>(null)

  useEffect(() => {
    fetch('/api/youtube-stats')
      .then(res => res.json())
      .then(data => {
        if (!data.error) setStats(data)
      })
      .catch(() => {})
  }, [])

  if (!stats) return null

  return (
    <div className="px-6 md:px-12 py-6 border-b border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FF0000"><path d="M23.5 6.2c-.3-1.1-1.1-1.9-2.2-2.2C19.4 3.5 12 3.5 12 3.5s-7.4 0-9.3.5c-1.1.3-1.9 1.1-2.2 2.2C0 8.1 0 12 0 12s0 3.9.5 5.8c.3 1.1 1.1 1.9 2.2 2.2 1.9.5 9.3.5 9.3.5s7.4 0 9.3-.5c1.1-.3 1.9-1.1 2.2-2.2.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z"/></svg>
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wide">Live from YouTube</span>
      </div>
      <div className="flex flex-wrap gap-8 md:gap-12">
        <div>
          <p className="text-white text-2xl md:text-3xl font-bold">{formatNum(stats.subscribers)}</p>
          <p className="text-gray-500 text-xs mt-1">Subscribers</p>
        </div>
        <div>
          <p className="text-white text-2xl md:text-3xl font-bold">{formatNum(stats.views)}</p>
          <p className="text-gray-500 text-xs mt-1">Total Views</p>
        </div>
        <div>
          <p className="text-white text-2xl md:text-3xl font-bold">{stats.videoCount}</p>
          <p className="text-gray-500 text-xs mt-1">Videos Published</p>
        </div>
      </div>
    </div>
  )
}
