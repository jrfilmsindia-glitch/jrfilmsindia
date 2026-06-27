import Link from 'next/link'
import Navbar from '@/components/Navbar'
import VideoThumbnail from '@/components/VideoThumbnail'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

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
              <div className="relative aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 hover:ring-2 ring-purple-500">
                <VideoThumbnail src={video.thumbnail_url} alt={video.title} fill sizes="200px" category="shorts" />
              </div>
              <p className="text-white text-sm mt-2 truncate font-medium">{video.title}</p>
              <p className="text-purple-500 text-xs mt-1">Short</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
