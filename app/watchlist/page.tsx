'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

export default function WatchlistPage() {
  const [videos, setVideos] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ids: string[] = JSON.parse(localStorage.getItem('jrf_watchlist') || localStorage.getItem('watchlist') || '[]')
    if (ids.length === 0) {
      setLoading(false)
      return
    }
    fetch('/api/list-videos')
      .then(res => res.json())
      .then(data => {
        const all: any[] = data.data || []
        const filtered = ids
          .map(id => all.find(v => String(v.id) === String(id)))
          .filter(Boolean)
        setVideos(filtered)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  function remove(videoId: string) {
    // Remove from both possible keys for compatibility
    for (const key of ['jrf_watchlist', 'watchlist']) {
      const ids: string[] = JSON.parse(localStorage.getItem(key) || '[]')
      const updated = ids.filter(id => String(id) !== String(videoId))
      localStorage.setItem(key, JSON.stringify(updated))
    }
    setVideos(prev => prev.filter(v => String(v.id) !== String(videoId)))
  }

  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 pb-12">
        <h1 className="text-white text-2xl font-bold mb-1">My Watchlist</h1>
        <p className="text-gray-500 text-sm mb-8">
          {loading ? 'Loading…' : `${videos.length} video${videos.length !== 1 ? 's' : ''} saved`}
        </p>

        {!loading && videos.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg viewBox="0 0 48 48" fill="none" className="w-16 h-16 text-gray-700 mb-4">
              <path d="M24 41.5l-2.2-2C10.4 29.1 3 22.4 3 14.5 3 8.1 8.1 3 14.5 3c3.8 0 7.45 1.77 9.5 4.56C26.05 4.77 29.7 3 33.5 3 39.9 3 45 8.1 45 14.5c0 7.9-7.4 14.6-18.8 25L24 41.5z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
            </svg>
            <p className="text-gray-400 text-base font-medium mb-1">Your watchlist is empty</p>
            <p className="text-gray-600 text-sm mb-5">Save videos to watch later by tapping the heart icon</p>
            <Link
              href="/browse"
              className="inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-purple-500/30 transition"
            >
              Browse Videos
            </Link>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-800/60 rounded-lg" />
                <div className="mt-2 h-3 bg-gray-800/60 rounded w-4/5" />
                <div className="mt-1.5 h-2.5 bg-gray-800/40 rounded w-1/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && videos.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {videos.map((video) => (
              <div key={video.id} className="group relative">
                {/* Remove button */}
                <button
                  onClick={() => remove(String(video.id))}
                  className="absolute top-1.5 right-1.5 z-10 w-6 h-6 rounded-full bg-black/70 text-gray-400 hover:text-white hover:bg-red-600/80 flex items-center justify-center transition-all duration-150 opacity-0 group-hover:opacity-100"
                  aria-label="Remove from watchlist"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
                <Link href={`/watch/${video.id}`}>
                  <div className={`relative ${video.orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'} bg-gray-800 rounded-lg overflow-hidden group-hover:ring-2 ring-purple-500/60 transition-all duration-200`}>
                    {video.thumbnail_url ? (
                      <Image
                        src={video.thumbnail_url}
                        alt={video.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs">No thumbnail</span>
                      </div>
                    )}
                    <span className="absolute top-1.5 left-1.5 bg-black/70 backdrop-blur-sm text-purple-300 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded">
                      {video.category}
                    </span>
                  </div>
                  <p className="text-white text-sm mt-2 line-clamp-2 font-medium group-hover:text-purple-300 transition-colors">{video.title}</p>
                  <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                      <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                      <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
                    </svg>
                    {formatViews(video.view_count || 0)} views
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
