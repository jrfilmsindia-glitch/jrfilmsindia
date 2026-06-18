import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export const revalidate = 0

export default async function SeriesPage() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('category', 'series')
    .eq('visibility', 'public')
    .order('episode_number', { ascending: true })

  // Group by series_name
  const groups: Record<string, any[]> = {}
  const ungrouped: any[] = []

  videos?.forEach((video) => {
    if (video.series_name) {
      if (!groups[video.series_name]) groups[video.series_name] = []
      groups[video.series_name].push(video)
    } else {
      ungrouped.push(video)
    }
  })

  const seriesNames = Object.keys(groups)

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 pb-12">
        <h1 className="text-white text-3xl font-bold mb-8">Series</h1>

        {seriesNames.map((name) => {
          const episodes = groups[name]
          const firstEp = episodes[0]
          return (
            <div key={name} className="mb-12">
              <div className="flex items-baseline gap-3 mb-4">
                <h2 className="text-white text-xl font-bold">{name}</h2>
                <span className="text-gray-400 text-sm">{episodes.length} Episode{episodes.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {episodes.map((ep) => (
                  <Link key={ep.id} href={`/watch/${ep.id}`} className="group">
                    <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden group-hover:ring-2 ring-amber-500 transition-all duration-200 relative">
                      {ep.thumbnail_url
                        ? <img src={ep.thumbnail_url} alt={ep.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                        : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                      }
                      {ep.episode_number && (
                        <span className="absolute top-2 left-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                          EP {ep.episode_number}
                        </span>
                      )}
                    </div>
                    <p className="text-white text-sm font-medium line-clamp-2 leading-snug mt-2">{ep.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}

        {ungrouped.length > 0 && (
          <div className="mb-12">
            <h2 className="text-white text-xl font-bold mb-4">More</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {ungrouped.map((video) => (
                <Link key={video.id} href={`/watch/${video.id}`} className="group">
                  <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden group-hover:ring-2 ring-amber-500 transition-all duration-200">
                    {video.thumbnail_url
                      ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                      : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                    }
                  </div>
                  <p className="text-white text-sm font-medium line-clamp-2 leading-snug mt-2">{video.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
