'use client'
import { useState, useEffect } from 'react'

export default function ManageVideos() {
  const [videos, setVideos] = useState<any[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [])

  async function loadVideos() {
    setLoading(true)
    const res = await fetch('/api/list-videos')
    const data = await res.json()
    setVideos(data.data || [])
    setLoading(false)
  }

  function startEdit(video: any) {
    setEditingId(video.id)
    setEditTitle(video.title || '')
    setEditDescription(video.description || '')
    setEditCategory(video.category || '')
  }

  async function saveEdit(id: number) {
    await fetch('/api/update-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, title: editTitle, description: editDescription, category: editCategory })
    })
    setEditingId(null)
    loadVideos()
  }

  async function setFeatured(id: number) {
    await fetch('/api/update-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, featured: true })
    })
    loadVideos()
  }

  async function deleteVideo(id: number) {
    if (!confirm('Delete this video permanently?')) return
    await fetch('/api/update-video', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    loadVideos()
  }

  if (loading) return <main className="min-h-screen bg-black text-white p-8">Loading...</main>

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold">Manage Videos ({videos.length})</h1>
        <a href="/admin" className="text-amber-500 text-sm hover:underline">+ Add New Video</a>
      </div>

      <div className="space-y-3">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-900 rounded-lg p-4 flex gap-4">
            <img src={video.thumbnail_url} alt="" className="w-32 h-20 object-cover rounded flex-shrink-0 bg-gray-800" />
            
            {editingId === video.id ? (
              <div className="flex-1 space-y-2">
                <input
                  className="w-full bg-gray-800 text-white p-2 rounded text-sm"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                  placeholder="Title"
                />
                <textarea
                  className="w-full bg-gray-800 text-white p-2 rounded text-sm"
                  value={editDescription}
                  onChange={e => setEditDescription(e.target.value)}
                  placeholder="Description"
                  rows={2}
                />
                <select
                  className="bg-gray-800 text-white p-2 rounded text-sm"
                  value={editCategory}
                  onChange={e => setEditCategory(e.target.value)}
                >
                  <option value="shorts">Shorts</option>
                  <option value="series">Series</option>
                  <option value="films">Films</option>
                  <option value="songs">Songs</option>
                  <option value="behind the scenes">Behind the Scenes</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(video.id)} className="bg-amber-500 text-black px-4 py-1.5 rounded text-sm font-semibold">Save</button>
                  <button onClick={() => setEditingId(null)} className="bg-gray-700 text-white px-4 py-1.5 rounded text-sm">Cancel</button>
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{video.title}</p>
                <p className="text-amber-500 text-xs mt-1 capitalize">{video.category} {video.featured && '⭐ Featured'}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => startEdit(video)} className="bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">Edit</button>
                  <button onClick={() => setFeatured(video.id)} className="bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">Set as Featured</button>
                  <button onClick={() => deleteVideo(video.id)} className="bg-red-900 text-white px-3 py-1 rounded text-xs hover:bg-red-800">Delete</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
