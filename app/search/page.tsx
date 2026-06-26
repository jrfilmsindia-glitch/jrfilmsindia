'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const CATEGORIES = ['All', 'Films', 'Series', 'Shorts', 'Songs'] as const
type Category = typeof CATEGORIES[number]

function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

function SkeletonGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-video bg-gray-800/60 rounded-lg" />
          <div className="mt-2 h-3 bg-gray-800/60 rounded w-4/5" />
          <div className="mt-1.5 h-2.5 bg-gray-800/40 rounded w-1/3" />
        </div>
      ))}
    </div>
  )
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <svg viewBox="0 0 48 48" fill="none" className="w-16 h-16 text-gray-700 mb-4">
        <circle cx="22" cy="22" r="14" stroke="currentColor" strokeWidth="2.5" />
        <path d="M32 32l8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M17 22h10M22 17v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <p className="text-gray-400 text-base font-medium mb-1">No results for &ldquo;{query}&rdquo;</p>
      <p className="text-gray-600 text-sm">Try different keywords or browse our collection</p>
      <Link href="/browse" className="mt-5 inline-flex items-center gap-2 bg-purple-500/20 text-purple-400 border border-purple-500/30 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-purple-500/30 transition">
        Browse All Videos
      </Link>
    </div>
  )
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState<Category>('All')

  useEffect(() => {
    setActiveCategory('All')
    if (!q.trim()) {
      setResults([])
      setLoading(false)
      return
    }
    setLoading(true)
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        setResults(data.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [q])

  const filtered = activeCategory === 'All'
    ? results
    : results.filter(v => v.category?.toLowerCase() === activeCategory.toLowerCase())

  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 pb-12">
        <h1 className="text-white text-2xl font-bold mb-1">
          {q ? `Search results for "${q}"` : 'Search'}
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          {loading ? 'Searching…' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}
        </p>

        {/* Category filter tabs */}
        {!loading && results.length > 0 && (
          <div className="flex gap-2 flex-wrap mb-6">
            {CATEGORIES.map((cat) => {
              const count = cat === 'All' ? results.length : results.filter(v => v.category?.toLowerCase() === cat.toLowerCase()).length
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                    activeCategory === cat
                      ? 'bg-purple-500 text-black'
                      : 'bg-white/8 text-gray-400 border border-white/10 hover:bg-white/15 hover:text-white'
                  }`}
                >
                  {cat} {count > 0 && <span className="opacity-70">({count})</span>}
                </button>
              )
            })}
          </div>
        )}

        {loading && <SkeletonGrid />}

        {!loading && results.length === 0 && q && <EmptyState query={q} />}

        {!loading && filtered.length === 0 && results.length > 0 && (
          <div className="py-16 text-center text-gray-500 text-sm">
            No {activeCategory.toLowerCase()} found in these results.
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((video) => (
              <Link key={video.id} href={`/watch/${video.id}`} className="group">
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
                  {/* Category badge overlay */}
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
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  )
}
