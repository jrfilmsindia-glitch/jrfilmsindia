import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

function VideoRow({ title, videos }: { title: string, videos: any[] }) {
  if (!videos.length) return null
  return (
    <div className="px-6 md:px-16 py-6">
      <h2 className="text-white text-lg font-semibold mb-3">{title}</h2>
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`} className="flex-shrink-0 w-32 md:w-44 group">
            <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group-hover:ring-2 ring-amber-500 transition-all duration-200">
              {video.thumbnail_url 
                ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
              }
            </div>
            <p className="text-white text-xs mt-2 truncate font-medium">{video.title}</p>
            <p className="text-amber-500 text-xs mt-0.5 capitalize">{video.category}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default async function Home() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  const featured = videos?.find(v => v.featured) || videos?.[0]
  const films = videos?.filter(v => v.category === 'films') || []
  const shorts = videos?.filter(v => v.category === 'shorts') || []
  const series = videos?.filter(v => v.category === 'series') || []
  const songs = videos?.filter(v => v.category === 'songs') || []

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      {featured && (
        <div className="relative h-[85vh] flex items-end pb-16">
          {featured.thumbnail_url && (
            <img 
              src={featured.thumbnail_url} 
              alt={featured.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 px-6 md:px-16 max-w-xl">
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-3">Featured</p>
            <h1 className="text-white text-xl md:text-2xl font-bold mb-3 leading-snug line-clamp-2">{featured.title}</h1>
            <p className="text-gray-300 text-sm mb-6 line-clamp-2">{featured.description}</p>
            <div className="flex gap-3">
              <Link href={`/watch/${featured.id}`} className="bg-amber-500 text-black font-bold px-6 py-2.5 rounded-lg hover:bg-amber-400 transition text-sm">
                ▶ Watch Now
              </Link>
              <button className="bg-gray-700/80 text-white font-bold px-6 py-2.5 rounded-lg hover:bg-gray-600 transition text-sm">
                More Info
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Video Rows */}
      <div className="pb-12">
        <VideoRow title="Latest Videos" videos={videos || []} />
        <VideoRow title="Films" videos={films} />
        <VideoRow title="Series" videos={series} />
        <VideoRow title="Shorts" videos={shorts} />
        <VideoRow title="Songs" videos={songs} />
      </div>

    </main>
  )
}
