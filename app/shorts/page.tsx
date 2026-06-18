import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export const revalidate = 0

export default async function ShortsPage() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('category', 'shorts')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        <h1 className="text-white text-3xl font-bold mb-8">Shorts</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {videos?.map((video) => (
            <Link key={video.id} href={`/watch/${video.id}`}>
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 hover:ring-2 ring-amber-500">
                {video.thumbnail_url
                  ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                }
              </div>
              <p className="text-white text-sm mt-2 truncate font-medium">{video.title}</p>
              <p className="text-amber-500 text-xs mt-1">Short</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
