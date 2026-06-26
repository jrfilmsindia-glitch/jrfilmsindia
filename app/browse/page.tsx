'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'

const PAGE_SIZE = 20

type Video = {
  id: string
  title: string
  category: string
  orientation: string
  thumbnail_url: string | null
  created_at: string
}

const CATEGORIES = ['All', 'Films', 'Series', 'Shorts', 'Songs', 'Reels']

function categoryFilter(video: Video, selected: string): boolean {
  if (selected === 'All') return true
  const cat = video.category?.toLowerCase() ?? ''
  const ori = video.orientation?.toLowerCase() ?? ''
  switch (selected) {
    case 'Films': return cat === 'film' || cat === 'films'
    case 'Series': return cat === 'series'
    case 'Shorts': return cat === 'short' || cat === 'shorts'
    case 'Songs': return cat === 'song' || cat === 'songs'
    case 'Reels': return ori === 'vertical' || cat === 'reel' || cat === 'reels'
    default: return true
  }
}

export default function BrowsePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [page, setPage] = useState(0)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const res = await fetch('/api/list-videos')
      const json = await res.json()
      setVideos(json.data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  // Reset to page 0 when category changes
  useEffect(() => {
    setPage(0)
  }, [selectedCategory])

  const filtered = videos.filter(v => categoryFilter(v, selectedCategory))
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  const landscapeVideos = paginated.filter(v => v.orientation !== 'vertical')
  const verticalVideos = paginated.filter(v => v.orientation === 'vertical')

  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 pb-12">
        <h1 className="text-white text-3xl font-bold mb-6">Browse</h1>

        <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === cat
                  ? 'bg-purple-500 text-black'
                  : 'bg-gray-800 text-white hover:bg-purple-500 hover:text-black'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-gray-400 text-center py-20">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="text-gray-400 text-center py-20">No videos found.</div>
        ) : (
          <>
            {landscapeVideos.length > 0 && (
              <div className="mb-12">
                <h2 className="text-white text-lg font-semibold mb-4">Films &amp; Series</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {landscapeVideos.map((video) => (
                    <Link key={video.id} href={`/watch/${video.id}`} className="group">
                      <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden group-hover:ring-2 ring-purple-500 transition-all duration-200 relative">
                        {video.thumbnail_url ? (
                          <Image
                            src={video.thumbnail_url}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-600 text-xs">No thumbnail</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-3">
                        <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{video.title}</p>
                        <p className="text-purple-400 text-xs mt-1 capitalize">{video.category}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {verticalVideos.length > 0 && (
              <div>
                <h2 className="text-white text-lg font-semibold mb-4">Reels &amp; Shorts</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                  {verticalVideos.map((video) => (
                    <Link key={video.id} href={`/watch/${video.id}`} className="group">
                      <div className="aspect-[9/16] bg-gray-800 rounded-xl overflow-hidden group-hover:ring-2 ring-pink-500 transition-all duration-200 relative">
                        {video.thumbnail_url ? (
                          <Image
                            src={video.thumbnail_url}
                            alt={video.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-200"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-gray-600 text-xs">No thumbnail</span>
                          </div>
                        )}
                      </div>
                      <p className="text-white text-sm mt-2 truncate font-medium">{video.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-5 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium disabled:opacity-40 hover:bg-gray-700 transition"
                >
                  ← Previous
                </button>
                <span className="text-gray-400 text-sm">
                  Page {page + 1} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page === totalPages - 1}
                  className="px-5 py-2 rounded-lg bg-gray-800 text-white text-sm font-medium disabled:opacity-40 hover:bg-gray-700 transition"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
