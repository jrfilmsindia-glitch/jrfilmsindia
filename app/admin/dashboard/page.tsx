'use client'
import { useState, useEffect } from 'react'

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

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-purple-500 capitalize">{role} access</span>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <a href="/admin" className="text-purple-500 hover:underline">+ Add Video</a>
          <a href="/admin/manage" className="text-purple-500 hover:underline">Manage Videos</a>
          <button onClick={() => { sessionStorage.removeItem("jrfilms_role"); window.location.href = "/admin" }} className="text-gray-400 hover:text-white">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <div className="bg-gray-900 rounded-xl p-5">
          <p className="text-gray-400 text-xs uppercase font-semibold">Total Videos</p>
          <p className="text-white text-3xl font-bold mt-2">{stats.total}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5">
          <p className="text-gray-400 text-xs uppercase font-semibold">Films</p>
          <p className="text-white text-3xl font-bold mt-2">{stats.byCategory.films || 0}</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5">
          <p className="text-gray-400 text-xs uppercase font-semibold">Series</p>
          <p className="text-white text-3xl font-bold mt-2">{stats.byCategory.series || 0}</p>
          <p className="text-purple-500 text-xs mt-1">{stats.seriesCount} unique series</p>
        </div>
        <div className="bg-gray-900 rounded-xl p-5">
          <p className="text-gray-400 text-xs uppercase font-semibold">Shorts</p>
          <p className="text-white text-3xl font-bold mt-2">{stats.byCategory.shorts || 0}</p>
        </div>
      </div>

      <h2 className="text-white text-lg font-bold mb-4">Recently Added</h2>
      <div className="space-y-3">
        {stats.recent.map((video: any) => (
          <div key={video.id} className="bg-gray-900 rounded-lg p-4 flex gap-4 items-center">
            <img src={video.thumbnail_url} alt="" className="w-24 h-14 object-cover rounded flex-shrink-0 bg-gray-800" />
            <div className="flex-1">
              <p className="text-white text-sm font-medium">{video.title}</p>
              <p className="text-purple-500 text-xs mt-1 capitalize">{video.category}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
