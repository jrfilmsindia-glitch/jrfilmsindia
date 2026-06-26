import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
)

export const revalidate = 0

function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

export default async function FilmsPage() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('category', 'films')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold">Films</h1>
          <p className="text-gray-400 text-sm mt-2">Original short films from JR Films India</p>
        </div>
        {videos && videos.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {videos.map((video) => (
              <Link key={video.id} href={`/watch/${video.id}`}>
                <div className="group">
                  <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden hover:ring-2 ring-purple-500 transition-all duration-200">
                    {video.thumbnail_url ? (
                      <img
                        src={video.thumbnail_url}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-600 text-xs">No thumbnail</span>
                      </div>
                    )}
                  </div>
                  <p className="text-white text-sm mt-2 truncate font-medium">{video.title.split('|')[0].trim()}</p>
                  <p className="text-purple-400 text-xs mt-1">{formatViews(video.view_count || 0)} views</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-lg">No films available yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}
