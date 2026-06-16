import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'

export default async function WatchPage({ params }: { params: { id: string } }) {
  const { data: video } = await supabase
    .from('videos')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!video) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white">Video not found</p>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 px-6 md:px-16">
        
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
            <h1 className="text-white text-2xl font-bold">{video.title}</h1>
            <p className="text-amber-500 text-sm mt-1">{video.category}</p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{video.description}</p>
          </div>

          <div className="flex gap-4 mt-6">
            <button className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition">
              ▶ Play
            </button>
            <button className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              + Watchlist
            </button>
            <button className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              ↗ Share
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}
