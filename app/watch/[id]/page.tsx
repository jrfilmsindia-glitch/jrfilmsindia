import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export const revalidate = 0

export default async function WatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', id)
    .single()

  if (!video) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Video not found</p>
      </main>
    )
  }

  let episodes: any[] = []
  let nextEpisode: any = null

  if (video.series_name) {
    const { data: seriesEpisodes } = await supabase
      .from('videos')
      .select('*')
      .eq('series_name', video.series_name)
      .order('episode_number', { ascending: true })

    episodes = seriesEpisodes || []
    const currentIndex = episodes.findIndex(ep => ep.id === video.id)
    if (currentIndex !== -1 && currentIndex < episodes.length - 1) {
      nextEpisode = episodes[currentIndex + 1]
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 px-6 md:px-16 pb-12">
        <div className="max-w-3xl mx-auto">
          <div className="aspect-video w-full rounded-xl overflow-hidden">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${video.youtube_id}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-6">
            <div className="flex items-center gap-3">
              <h1 className="text-white text-2xl font-bold">{video.title}</h1>
            </div>
            <p className="text-amber-500 text-sm mt-1">
              {video.category} {video.series_name && `· ${video.series_name} · Episode ${video.episode_number}`}
            </p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{video.description}</p>
          </div>
          <div className="flex gap-4 mt-6">
            {nextEpisode ? (
              <Link href={`/watch/${nextEpisode.id}`} className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition">
                ▶ Next Episode
              </Link>
            ) : (
              <button className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition">▶ Play</button>
            )}
            <button className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">+ Watchlist</button>
            <button className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">↗ Share</button>
          </div>

          {episodes.length > 0 && (
            <div className="mt-12">
              <h2 className="text-white text-lg font-bold mb-4">More Episodes — {video.series_name}</h2>
              <div className="space-y-3">
                {episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/watch/${ep.id}`}
                    className={`flex gap-4 p-3 rounded-lg transition ${ep.id === video.id ? 'bg-gray-800 ring-1 ring-amber-500' : 'bg-gray-900 hover:bg-gray-800'}`}
                  >
                    <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      {ep.thumbnail_url && <img src={ep.thumbnail_url} alt={ep.title} className="w-full h-full object-cover" />}
                      <span className="absolute top-1 left-1 bg-amber-500 text-black text-xs font-bold px-1.5 py-0.5 rounded">
                        EP {ep.episode_number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium line-clamp-2">{ep.title}</p>
                      {ep.id === video.id && <p className="text-amber-500 text-xs mt-1">Now Playing</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
