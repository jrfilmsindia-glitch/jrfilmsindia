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
      className={`font-bold px-6 py-3 rounded-lg transition ${
        inWatchlist
          ? 'bg-purple-500 text-black hover:bg-purple-400'
          : 'bg-gray-800 text-white hover:bg-gray-700'
      }`}
    >
      {inWatchlist ? '✓ In Watchlist' : '+ Watchlist'}
    </button>
  )
}
