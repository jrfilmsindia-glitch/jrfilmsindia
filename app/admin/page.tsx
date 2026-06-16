'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [category, setCategory] = useState('shorts')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  function extractYoutubeId(url: string) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
    const match = url.match(regExp)
    if (match && match[7].length === 11) return match[7]
    const shortsMatch = url.match(/shorts\/([^#&?]*)/)
    if (shortsMatch) return shortsMatch[1]
    return null
  }

  async function handleSubmit() {
    setLoading(true)
    setMessage('')

    const youtubeId = extractYoutubeId(youtubeUrl)
    if (!youtubeId) {
      setMessage('Invalid YouTube URL. Please check and try again.')
      setLoading(false)
      return
    }

    const response = await fetch('/api/add-video', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, youtube_id: youtubeId, category })
    })

    const data = await response.json()
    if (data.error) {
      setMessage('Error: ' + data.error)
    } else {
      setMessage('Video added successfully!')
      setTitle('')
      setDescription('')
      setYoutubeUrl('')
      setCategory('shorts')
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <h1 className="text-white text-2xl font-bold mb-2">Admin — Add Video</h1>
      <p className="text-gray-400 text-sm mb-8">Paste a YouTube URL to add it to your portal</p>
      
      <div className="max-w-lg space-y-4">
        <input className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500" placeholder="Video title" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500" placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        <input className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500" placeholder="YouTube URL" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} />
        <select className="w-full bg-gray-800 text-white p-3 rounded-lg" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="shorts">Shorts</option>
          <option value="series">Series</option>
          <option value="films">Films</option>
          <option value="behind the scenes">Behind the Scenes</option>
        </select>
        <button onClick={handleSubmit} disabled={loading} className="w-full bg-amber-500 text-black font-bold p-3 rounded-lg hover:bg-amber-400 transition">
          {loading ? 'Saving...' : 'Add Video'}
        </button>
        {message && <p className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>{message}</p>}
      </div>
    </main>
  )
}
