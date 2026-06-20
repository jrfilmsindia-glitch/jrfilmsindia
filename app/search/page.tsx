'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [q])

  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 pb-12">
        <h1 className="text-white text-2xl font-bold mb-2">Search results for "{q}"</h1>
        <p className="text-gray-400 text-sm mb-8">{loading ? 'Searching...' : `${results.length} result${results.length !== 1 ? 's' : ''} found`}</p>

        {!loading && results.length === 0 && (
          <p className="text-gray-500 text-sm">No videos found. Try a different search term.</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`} className="group">
              <div className={`${video.orientation === 'vertical' ? 'aspect-[9/16]' : 'aspect-video'} bg-gray-800 rounded-lg overflow-hidden group-hover:ring-2 ring-purple-500 transition-all duration-200`}>
                {video.thumbnail_url
                  ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                }
              </div>
              <p className="text-white text-sm mt-2 truncate font-medium">{video.title}</p>
              <p className="text-purple-400 text-xs mt-1 capitalize">{video.category}</p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
