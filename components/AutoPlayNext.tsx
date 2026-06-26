'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface AutoPlayNextProps {
  nextEpisodeId: string
  nextEpisodeTitle: string
}

export default function AutoPlayNext({ nextEpisodeId, nextEpisodeTitle }: AutoPlayNextProps) {
  const router = useRouter()
  const [countdown, setCountdown] = useState(5)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    if (cancelled) return
    if (countdown <= 0) {
      router.push(`/watch/${nextEpisodeId}`)
      return
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, cancelled, nextEpisodeId, router])

  if (cancelled) return null

  const progress = ((5 - countdown) / 5) * 100

  return (
    <div className="mt-4 rounded-xl bg-[#1a1020] border border-white/10 p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-widest mb-0.5">Up Next</p>
          <p className="text-white text-sm font-medium line-clamp-1">{nextEpisodeTitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-purple-400 text-sm font-bold tabular-nums">{countdown}s</span>
          <button
            onClick={() => setCancelled(true)}
            className="text-gray-500 hover:text-white text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition"
          >
            Cancel
          </button>
        </div>
      </div>
      {/* Progress bar */}
      <div className="h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-500 transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
