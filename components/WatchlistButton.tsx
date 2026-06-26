'use client'

import { useState, useEffect } from 'react'

export default function WatchlistButton({ videoId }: { videoId: string }) {
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    const wl: string[] = JSON.parse(localStorage.getItem('watchlist') || '[]')
    setInWatchlist(wl.includes(videoId))
  }, [videoId])

  function toggleWatchlist() {
    const wl: string[] = JSON.parse(localStorage.getItem('watchlist') || '[]')
    const updated = wl.includes(videoId)
      ? wl.filter((id) => id !== videoId)
      : [...wl, videoId]
    localStorage.setItem('watchlist', JSON.stringify(updated))
    setInWatchlist(!inWatchlist)
  }

  return (
    <button
      onClick={toggleWatchlist}
      className={`flex-shrink-0 inline-flex items-center gap-1.5 font-semibold px-3.5 md:px-5 py-2.5 rounded-full text-sm transition ${
        inWatchlist
          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/40 hover:bg-purple-500/30'
          : 'bg-white/8 text-gray-300 border border-white/10 hover:bg-white/15 hover:text-white'
      }`}
    >
      {inWatchlist ? '✓ In Watchlist' : '+ Watchlist'}
    </button>
  )
}
