'use client'
import Link from 'next/link'

interface AutoPlayNextProps {
  nextEpisodeId: string
  nextEpisodeTitle: string
}

export default function AutoPlayNext({ nextEpisodeId, nextEpisodeTitle }: AutoPlayNextProps) {
  return (
    <div className="mt-4 rounded-xl bg-[#1a1020] border border-white/10 p-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-gray-400 text-xs uppercase tracking-widest mb-0.5">Up Next</p>
        <p className="text-white text-sm font-medium line-clamp-1">{nextEpisodeTitle}</p>
      </div>
      <Link
        href={`/watch/${nextEpisodeId}`}
        className="flex-shrink-0 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition flex items-center gap-1.5"
      >
        Next
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" clipRule="evenodd"/>
        </svg>
      </Link>
    </div>
  )
}
