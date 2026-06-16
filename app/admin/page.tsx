'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [category, setCategory] = useState('shorts')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [message, setMessage] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  function extractYoutubeId(url: string) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    if (match && match[7].length === 11) return match[7]
    const shortsMatch = url.match(/shorts\/([^#&?]*)/)
    if (shortsMatch) return shortsMatch[1]
    return null
  }

  async function fetchVideoDetails(url: string) {
    const youtubeId = extractYoutubeId(url)
    if (!youtubeId) return
    setFetching(true)
    try {
      const res = await fetch(`/api/youtube-details?id=${youtubeId}`)
      const data = await res.json()
      if (data.title) {
        setTitle(data.title)
        setDescription(data.description)
        setThumbnail(data.thumbnail)
      }
    } catch (e) {}
    setFetching(false)
  }

  async function handleSubmit() {
    setLoading(true)
    setMessage('')
    const youtubeId = extractYoutubeId(youtubeUrl)
    if (!youtubeId) {
      setMessage('Invalid YouTube URL.')
      setLoading(false)
      return
    }
    const response = await fetch('/api/add-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, youtube_id: youtubeId, category, thumbnail_url: thumbnail })
    })
    const data = await response.json()
    if (data.error) {
      setMessage('Error: ' + data.error)
    } else {
      setMessage('Video added successfully!')
      setTitle('')
      setDescription('')
      setYoutubeUrl('')
      setThumbnail('')
      setCategory('shorts')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <h1 className="text-white text-2xl font-bold mb-2">Admin — Add Video</h1>
      <p className="text-gray-400 text-sm mb-8">Paste a YouTube URL — details will auto-fill</p>
      
      <div className="max-w-lg space-y-4">
        <div className="flex gap-2">
          <input
            className="flex-1 bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500"
            placeholder="YouTube URL"
            value={youtubeUrl}
            onChange={e => setYoutubeUrl(e.target.value)}
          />
          <button
            onClick={() => fetchVideoDetails(youtubeUrl)}
            disabled={fetching}
            className="bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-gray-600 transition"
          >
            {fetching ? '...' : 'Fetch'}
          </button>
        </div>

        {thumbnail && (
          <img src={thumbnail} alt="thumbnail" className="w-full rounded-lg" />
        )}

        <input
          className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500"
          placeholder="Video title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <textarea
          className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500"
          placeholder="Description"
          rows={3}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <select
          className="w-full bg-gray-800 text-white p-3 rounded-lg"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="shorts">Shorts</option>
          <option value="series">Series</option>
          <option value="films">Films</option>
          <option value="songs">Songs</option>
          <option value="behind the scenes">Behind the Scenes</option>
        </select>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-amber-500 text-black font-bold p-3 rounded-lg hover:bg-amber-400 transition"
        >
          {loading ? 'Saving...' : 'Add Video'}
        </button>
        {message && <p className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>{message}</p>}
      </div>
    </main>
  )
}
