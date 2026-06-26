'use client'
import { useState, useEffect } from 'react'

export default function LikeButton({ videoId }: { videoId: string }) {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(() => {
    try {
      const likes: Record<string, number> = JSON.parse(localStorage.getItem('jrf_likes') || '{}')
      setLiked(!!likes[videoId])
      setCount(likes[videoId] || 0)
    } catch {}
  }, [videoId])

  function toggle() {
    try {
      const likes: Record<string, number> = JSON.parse(localStorage.getItem('jrf_likes') || '{}')
      if (liked) {
        const newCount = Math.max(0, (likes[videoId] || 1) - 1)
        likes[videoId] = newCount
        setCount(newCount)
        setLiked(false)
      } else {
        const newCount = (likes[videoId] || 0) + 1
        likes[videoId] = newCount
        setCount(newCount)
        setLiked(true)
      }
      localStorage.setItem('jrf_likes', JSON.stringify(likes))
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      className={`flex-shrink-0 inline-flex items-center gap-1.5 px-3.5 md:px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-150 ${
        liked
          ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
          : 'bg-white/8 text-gray-300 border border-white/10 hover:bg-white/15 hover:text-white'
      }`}
    >
      <svg viewBox="0 0 20 20" fill={liked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 transition-transform duration-150 hover:scale-110">
        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-2.184C4.045 12.289 2 9.876 2 7a5 5 0 019.999-.028A5.003 5.003 0 0118 7c0 2.876-2.045 5.29-3.885 7.036a22.08 22.08 0 01-2.582 2.184 20.72 20.72 0 01-1.162.682l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
      </svg>
      {count > 0 ? count : 'Like'}
    </button>
  )
}
