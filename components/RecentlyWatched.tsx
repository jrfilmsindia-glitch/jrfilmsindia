'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface RecentItem {
  id: string
  title: string
  thumbnail_url: string
  category: string
}

export default function RecentlyWatched() {
  const [items, setItems] = useState<RecentItem[]>([])

  useEffect(() => {
    try {
      const stored: RecentItem[] = JSON.parse(localStorage.getItem('jrf_recently_watched') || '[]')
      setItems(stored.slice(0, 10))
    } catch {}
  }, [])

  if (items.length === 0) return null

  return (
    <div className="px-6 md:px-12 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-base font-semibold tracking-tight">Continue Watching</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {items.map((item) => (
          <Link key={item.id} href={`/watch/${item.id}`} className="group flex-shrink-0 w-[200px] md:w-[220px]">
            <div className="relative aspect-video bg-[#1a1020] rounded-xl overflow-hidden ring-1 ring-white/5 group-hover:ring-2 group-hover:ring-purple-500/60 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/60">
              {item.thumbnail_url ? (
                <Image src={item.thumbnail_url} alt={item.title} fill className="object-cover" sizes="220px" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">No thumbnail</span>
                </div>
              )}
              {/* Hover play button */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 shadow-lg">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-black ml-0.5">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/40">
                <div className="h-full bg-purple-500 w-[40%]" />
              </div>
            </div>
            <p className="text-gray-300 text-xs mt-2 truncate font-medium group-hover:text-white transition-colors">{item.title}</p>
            {item.category && (
              <p className="text-gray-600 text-[11px] mt-0.5 capitalize">{item.category}</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}
