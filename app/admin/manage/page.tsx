'use client'
import { useState, useEffect } from 'react'

export default function ManageVideos() {
  const [videos, setVideos] = useState<any[]>([])
  const [role, setRole] = useState<'admin' | 'editor' | null>(null)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editCategory, setEditCategory] = useState('')
  const [editSeriesName, setEditSeriesName] = useState('')
  const [editEpisodeNumber, setEditEpisodeNumber] = useState('')
  const [editOrientation, setEditOrientation] = useState('landscape')
  const [editThumbnail, setEditThumbnail] = useState('')
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)
  const [saveError, setSaveError] = useState('')

  useEffect(() => {
    const savedRole = sessionStorage.getItem('jrfilms_role')
    if (savedRole === 'admin' || savedRole === 'editor') setRole(savedRole as 'admin' | 'editor')
    setAuthChecked(true)
    loadVideos()
  }, [])

  async function loadVideos() {
    setLoading(true)
    try {
      const res = await fetch('/api/list-videos')
      const data = await res.json()
      setVideos(data.data || [])
    } catch (e) {
      console.error('Failed to load videos', e)
    }
    setLoading(false)
  }

  function startEdit(video: any) {
    setEditingId(video.id)
    setEditTitle(video.title || '')
    setEditDescription(video.description || '')
    setEditCategory(video.category || '')
    setEditSeriesName(video.series_name || '')
    setEditEpisodeNumber(video.episode_number?.toString() || '')
    setEditOrientation(video.orientation || 'landscape')
    setEditThumbnail(video.thumbnail_url || '')
  }

  async function saveEdit(id: number) {
    setSaveError('')
    const res = await fetch('/api/update-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id,
        title: editTitle,
        description: editDescription,
        category: editCategory,
        series_name: editCategory === 'series' ? editSeriesName : null,
        episode_number: editCategory === 'series' && editEpisodeNumber ? parseInt(editEpisodeNumber) : null,
        orientation: editCategory === 'shorts' ? 'vertical' : editOrientation,
        thumbnail_url: editThumbnail || null,
      })
    })
    const data = await res.json()
    if (data.error) {
      setSaveError(typeof data.error === 'string' ? data.error : 'Save failed')
      return
    }
    setEditingId(null)
    loadVideos()
  }

  async function setFeatured(id: number, value: boolean) {
    await fetch('/api/update-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, featured: value })
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

  if (!authChecked || loading) return <main className="min-h-screen bg-black text-white p-8">Loading...</main>

  if (!role) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Please <a href="/admin" className="text-purple-500 underline">login</a> first.</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold">Manage Videos ({videos.length})</h1>
          <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-purple-500 capitalize">{role} access</span>
        </div>
        <div>
          <a href="/admin/dashboard" className="text-purple-500 text-sm hover:underline mr-4">Dashboard</a>
          <a href="/admin" className="text-purple-500 text-sm hover:underline">+ Add New Video</a>
        </div>
      </div>

      <div className="space-y-3">
        {videos.map((video) => (
          <div key={video.id} className="bg-gray-900 rounded-lg p-4 flex gap-4">
            <img
              src={video.thumbnail_url}
              alt=""
              className={`object-cover rounded flex-shrink-0 bg-gray-800 ${video.orientation === 'vertical' ? 'w-12 h-20' : 'w-32 h-20'}`}
            />
            
            {editingId === video.id ? (
              <div className="flex-1 space-y-2">
                <div>
                  <input
                    className="w-full bg-gray-800 text-white p-2 rounded text-sm"
                    value={editThumbnail}
                    onChange={e => setEditThumbnail(e.target.value)}
                    placeholder="Thumbnail URL (paste image URL)"
                  />
                  {editThumbnail && (
                    <img
                      src={editThumbnail}
                      alt="preview"
                      className={`mt-1.5 object-cover rounded bg-gray-800 ${editOrientation === 'vertical' ? 'w-20 h-32' : 'w-32 h-20'}`}
                    />
                  )}
                </div>
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

                {editCategory === 'series' && (
                  <>
                    <div className="flex gap-2">
                      <input
                        className="flex-1 bg-gray-800 text-white p-2 rounded text-sm"
                        placeholder="Series name"
                        value={editSeriesName}
                        onChange={e => setEditSeriesName(e.target.value)}
                      />
                      <input
                        type="number"
                        className="w-24 bg-gray-800 text-white p-2 rounded text-sm"
                        placeholder="Ep #"
                        value={editEpisodeNumber}
                        onChange={e => setEditEpisodeNumber(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setEditOrientation('landscape')}
                        className={`flex-1 p-2 rounded text-xs font-medium transition ${editOrientation === 'landscape' ? 'bg-purple-500 text-black' : 'bg-gray-800 text-gray-300'}`}
                      >
                        ▭ Landscape
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditOrientation('vertical')}
                        className={`flex-1 p-2 rounded text-xs font-medium transition ${editOrientation === 'vertical' ? 'bg-purple-500 text-black' : 'bg-gray-800 text-gray-300'}`}
                      >
                        ▯ Vertical
                      </button>
                    </div>
                  </>
                )}

                <div className="flex gap-2 items-center">
                  <button onClick={() => saveEdit(video.id)} className="bg-purple-500 text-black px-4 py-1.5 rounded text-sm font-semibold">Save</button>
                  <button onClick={() => { setEditingId(null); setSaveError('') }} className="bg-gray-700 text-white px-4 py-1.5 rounded text-sm">Cancel</button>
                  {saveError && <span className="text-red-400 text-xs">{saveError}</span>}
                </div>
              </div>
            ) : (
              <div className="flex-1">
                <p className="text-white text-sm font-medium">{video.title}</p>
                <p className="text-purple-500 text-xs mt-1 capitalize">
                  {video.category} {video.series_name && `· ${video.series_name} Ep ${video.episode_number}`} {video.orientation === 'vertical' && '· 9:16'} {video.featured && '⭐ Featured'}
                </p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => startEdit(video)} className="bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">Edit</button>
                  {role === 'admin' && (
                    <>
                      {video.featured ? (
                        <button onClick={() => setFeatured(video.id, false)} className="bg-purple-900 text-purple-200 px-3 py-1 rounded text-xs hover:bg-purple-800">★ Unfeature</button>
                      ) : (
                        <button onClick={() => setFeatured(video.id, true)} className="bg-gray-700 text-white px-3 py-1 rounded text-xs hover:bg-gray-600">Set as Featured</button>
                      )}
                      <button onClick={() => deleteVideo(video.id)} className="bg-red-900 text-white px-3 py-1 rounded text-xs hover:bg-red-800">Delete</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}
