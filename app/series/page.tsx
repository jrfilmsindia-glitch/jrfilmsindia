import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export default async function SeriesPage() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('category', 'series')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16 pb-12">
        <h1 className="text-white text-3xl font-bold mb-8">Series</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos?.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`} className="group">
              <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden group-hover:ring-2 ring-amber-500 transition-all duration-200">
                {video.thumbnail_url
                  ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                }
              </div>
              <div className="mt-3">
                <p className="text-white text-sm font-medium line-clamp-2 leading-snug">{video.title}</p>
                <p className="text-amber-500 text-xs mt-1">Series</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
