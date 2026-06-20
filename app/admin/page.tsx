'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ''
const EDITOR_PASSWORD = process.env.NEXT_PUBLIC_EDITOR_PASSWORD || ''

export default function AdminPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'admin' | 'editor' | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [category, setCategory] = useState('shorts')
  const [seriesName, setSeriesName] = useState('')
  const [episodeNumber, setEpisodeNumber] = useState('')
  const [orientation, setOrientation] = useState('landscape')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(false)
  const [message, setMessage] = useState('')
  const [thumbnail, setThumbnail] = useState('')

  useEffect(() => {
    const savedRole = sessionStorage.getItem('jrfilms_role')
    if (savedRole === 'admin' || savedRole === 'editor') setRole(savedRole)
  }, [])

  function tryLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('jrfilms_role', 'admin')
      router.push('/admin/dashboard')
    } else if (password === EDITOR_PASSWORD) {
      sessionStorage.setItem('jrfilms_role', 'editor')
      router.push('/admin/dashboard')
    } else {
      setPassword('')
    }
  }

  function logout() {
    setRole(null)
    sessionStorage.removeItem('jrfilms_role')
  }

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
      body: JSON.stringify({
        title, description, youtube_id: youtubeId, category, thumbnail_url: thumbnail,
        series_name: category === 'series' ? seriesName : null,
        episode_number: category === 'series' ? episodeNumber : null,
        orientation: category === 'shorts' ? 'vertical' : orientation
      })
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
      setSeriesName('')
      setEpisodeNumber('')
      setOrientation('landscape')
    }
    setLoading(false)
  }

  if (!role) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="bg-gray-900 p-8 rounded-xl w-full max-w-sm">
          <h1 className="text-white text-2xl font-bold mb-2 text-center">JR Films</h1>
          <p className="text-gray-400 text-sm text-center mb-6">Admin Access</p>
          <input
            type="password"
            className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500 mb-4"
            placeholder="Enter password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tryLogin()}
          />
          <button
            onClick={tryLogin}
            className="w-full bg-purple-500 text-black font-bold p-3 rounded-lg hover:bg-purple-400 transition"
          >
            Login
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">Admin — Add Video</h1>
          <p className="text-gray-400 text-sm">Paste a YouTube URL — details will auto-fill</p>
          <span className="inline-block mt-2 text-xs font-semibold px-2 py-1 rounded bg-gray-800 text-purple-500 capitalize">{role} access</span>
        </div>
        <div className="flex gap-4 items-center">
          <a href="/admin/dashboard" className="text-purple-500 text-sm hover:underline">Dashboard</a>
          <a href="/admin/manage" className="text-purple-500 text-sm hover:underline">Manage Videos</a>
          <button onClick={logout} className="text-gray-400 text-sm hover:text-white">
            Logout
          </button>
        </div>
      </div>
      
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

        {thumbnail && <img src={thumbnail} alt="thumbnail" className="w-full rounded-lg" />}

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

        {category === 'series' && (
          <div className="bg-gray-900 border border-purple-500/30 rounded-lg p-4 space-y-3">
            <p className="text-purple-500 text-xs font-semibold uppercase">Series Info</p>
            <input
              className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500"
              placeholder="Series name (e.g. School Ghost)"
              value={seriesName}
              onChange={e => setSeriesName(e.target.value)}
            />
            <input
              type="number"
              className="w-full bg-gray-800 text-white p-3 rounded-lg placeholder-gray-500"
              placeholder="Episode number (e.g. 1)"
              value={episodeNumber}
              onChange={e => setEpisodeNumber(e.target.value)}
            />
            <div>
              <p className="text-gray-400 text-xs mb-2">Video Orientation</p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOrientation('landscape')}
                  className={`flex-1 p-2 rounded-lg text-sm font-medium transition ${orientation === 'landscape' ? 'bg-purple-500 text-black' : 'bg-gray-800 text-gray-300'}`}
                >
                  ▭ Landscape (16:9)
                </button>
                <button
                  type="button"
                  onClick={() => setOrientation('vertical')}
                  className={`flex-1 p-2 rounded-lg text-sm font-medium transition ${orientation === 'vertical' ? 'bg-purple-500 text-black' : 'bg-gray-800 text-gray-300'}`}
                >
                  ▯ Vertical (9:16)
                </button>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-purple-500 text-black font-bold p-3 rounded-lg hover:bg-purple-400 transition"
        >
          {loading ? 'Saving...' : 'Add Video'}
        </button>
        {message && <p className={message.includes('Error') ? 'text-red-400' : 'text-green-400'}>{message}</p>}
      </div>
    </main>
  )
}
