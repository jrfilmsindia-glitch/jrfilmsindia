import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-4">Featured</p>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight">
            {videos && videos[0] ? videos[0].title : 'JR Films India'}
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            {videos && videos[0] ? videos[0].description : 'Watch exclusive short films, series and vertical videos from India\'s best creators.'}
          </p>
          <div className="flex gap-4">
            {videos && videos[0] && (
              <Link href={`/watch/${videos[0].id}`} className="bg-amber-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition">
                ▶ Watch Now
              </Link>
            )}
            <button className="bg-gray-700/80 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-600 transition">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Latest Videos Row */}
      <div className="px-6 md:px-16 py-8">
        <h2 className="text-white text-xl font-bold mb-4">Latest Videos</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {videos && videos.length > 0 ? videos.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`} className="flex-shrink-0 w-36 md:w-48">
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                <img
                  src={`https://img.youtube.com/vi/${video.youtube_id}/maxresdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-white text-sm mt-2 truncate">{video.title}</p>
              <p className="text-amber-500 text-xs mt-1">{video.category}</p>
            </Link>
          )) : (
            <p className="text-gray-500">No videos yet. Add some from the admin panel.</p>
          )}
        </div>
      </div>

    </main>
  )
}
