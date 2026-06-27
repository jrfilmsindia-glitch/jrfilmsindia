'use client'
import { useState, useEffect } from 'react'

function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

function BarChart({ videos }: { videos: { title: string; view_count: number }[] }) {
  const max = Math.max(...videos.map((v) => v.view_count || 1))
  return (
    <div className="space-y-2">
      {videos.map((v, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-gray-400 text-xs w-28 truncate flex-shrink-0">{v.title.split('|')[0].trim()}</span>
          <div className="flex-1 bg-gray-800 rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
              style={{ width: `${Math.round((v.view_count / max) * 100)}%` }}
            />
          </div>
          <span className="text-purple-400 text-xs w-12 text-right flex-shrink-0">
            {v.view_count >= 1000 ? `${(v.view_count / 1000).toFixed(1)}k` : v.view_count}
          </span>
        </div>
      ))}
    </div>
  )
}

function FilmIcon() {
  return (
    <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  )
}

function ClapperIcon() {
  return (
    <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h18M3 16h18" />
    </svg>
  )
}

function TvIcon() {
  return (
    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  )
}

function PlusIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
    </svg>
  )
}

function ManageIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null)
  const [role, setRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedRole = sessionStorage.getItem('jrfilms_role')
    setRole(savedRole)
    loadStats()
  }, [])

  async function loadStats() {
    setLoading(true)
    const res = await fetch('/api/dashboard-stats')
    const data = await res.json()
    setStats(data)
    setLoading(false)
  }

  if (!role) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Please <a href="/admin" className="text-purple-500 underline">login</a> first.</p>
      </main>
    )
  }

  if (loading || !stats) return <main className="min-h-screen bg-black text-white p-8">Loading...</main>

  const total = stats.total || 0
  const films = stats.byCategory.films || 0
  const series = stats.byCategory.series || 0
  const shorts = stats.byCategory.shorts || 0
  const categoryTotal = films + series + shorts || 1

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-purple-500 capitalize">{role} access</span>
        </div>
        <div className="flex gap-3 items-center flex-wrap">
          <a
            href="/admin"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
          >
            <PlusIcon />
            Add Video
          </a>
          <a
            href="/admin/manage"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors border border-gray-700"
          >
            <ManageIcon />
            Manage Videos
          </a>
          <a
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium transition-colors border border-gray-700"
          >
            <ExternalIcon />
            View Site
          </a>
          <a
            href="/portfolio"
            target="_blank"
            className="bg-purple-500 text-black font-bold px-5 py-2.5 rounded-lg hover:bg-purple-400 transition text-sm"
          >
            📄 View Portfolio
          </a>
          <button
            onClick={() => { sessionStorage.removeItem('jrfilms_role'); window.location.href = '/admin' }}
            className="text-gray-400 hover:text-white text-sm px-3 py-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        {[
          { label: 'Total Videos', value: total, icon: <FilmIcon />, accent: 'purple' },
          { label: 'Total Views', value: formatViews(stats.totalViews || 0), icon: <EyeIcon />, accent: 'pink' },
          { label: 'Films', value: films, icon: <ClapperIcon />, accent: 'yellow' },
          { label: 'Series', value: series, icon: <TvIcon />, accent: 'blue', sub: `${stats.seriesCount} unique series` },
          { label: 'Shorts', value: shorts, icon: <PhoneIcon />, accent: 'green' },
        ].map((card, i) => (
          <div
            key={i}
            className="rounded-xl p-5 relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, #111827 0%, #1f2937 100%)',
              border: '1px solid transparent',
              backgroundClip: 'padding-box',
            }}
          >
            <div
              className="absolute inset-0 rounded-xl pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(236,72,153,0.15))',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'exclude',
                WebkitMaskComposite: 'xor',
                padding: '1px',
              }}
            />
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-400 text-xs uppercase font-semibold">{card.label}</p>
              {card.icon}
            </div>
            <p className="text-white text-3xl font-bold mt-1">{card.value}</p>
            {card.sub && <p className="text-purple-500 text-xs mt-1">{card.sub}</p>}
          </div>
        ))}
      </div>

      {/* Category Breakdown */}
      <div className="bg-gray-900 rounded-xl p-6 mb-8">
        <h2 className="text-white text-lg font-bold mb-4">Category Breakdown</h2>
        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Films', count: films, color: '#eab308' },
            { label: 'Series', count: series, color: '#3b82f6' },
            { label: 'Shorts', count: shorts, color: '#22c55e' },
          ].map((cat) => (
            <div key={cat.label} className="flex items-center gap-3 bg-gray-800 rounded-lg px-4 py-3">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: cat.color }} />
              <span className="text-gray-300 text-sm font-medium">{cat.label}</span>
              <span className="text-white font-bold text-sm">{cat.count}</span>
              <span className="text-gray-500 text-xs">({Math.round((cat.count / categoryTotal) * 100)}%)</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex h-3 rounded-full overflow-hidden gap-0.5">
          {films > 0 && (
            <div className="h-full bg-yellow-500 transition-all duration-700" style={{ width: `${(films / categoryTotal) * 100}%` }} />
          )}
          {series > 0 && (
            <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(series / categoryTotal) * 100}%` }} />
          )}
          {shorts > 0 && (
            <div className="h-full bg-green-500 transition-all duration-700" style={{ width: `${(shorts / categoryTotal) * 100}%` }} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Videos Bar Chart */}
        <div className="bg-gray-900 rounded-xl p-6">
          <h2 className="text-white text-lg font-bold mb-4">Views per Video (Top 10)</h2>
          {stats.topVideos?.length > 0 ? (
            <BarChart videos={stats.topVideos} />
          ) : (
            <p className="text-gray-500 text-sm">No data yet.</p>
          )}
        </div>

        <div>
          <h2 className="text-white text-lg font-bold mb-4">🔥 Top Performing Videos</h2>
          <div className="space-y-3">
            {stats.topVideos?.map((video: any, idx: number) => (
              <div key={video.id} className="bg-gray-900 rounded-lg p-4 flex gap-4 items-center">
                <span className="text-purple-500 font-bold text-lg w-5">{idx + 1}</span>
                <img src={video.thumbnail_url} alt="" className="w-24 h-14 object-cover rounded flex-shrink-0 bg-gray-800" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium line-clamp-1">{video.title}</p>
                  <p className="text-purple-500 text-xs mt-1">{formatViews(video.view_count || 0)} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-white text-lg font-bold mb-4">Recently Added</h2>
          <div className="space-y-3">
            {stats.recent.map((video: any) => (
              <div key={video.id} className="bg-gray-900 rounded-lg p-4 flex gap-4 items-center">
                <img src={video.thumbnail_url} alt="" className="w-24 h-14 object-cover rounded flex-shrink-0 bg-gray-800" />
                <div className="flex-1">
                  <p className="text-white text-sm font-medium line-clamp-1">{video.title}</p>
                  <p className="text-purple-500 text-xs mt-1 capitalize">{video.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
