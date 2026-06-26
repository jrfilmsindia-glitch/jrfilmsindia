import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import ViewTracker from '@/components/ViewTracker'
import ShareButton from '@/components/ShareButton'
import WatchlistButton from '@/components/WatchlistButton'
import { createClient } from '@supabase/supabase-js'
import type { Metadata } from 'next'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export const revalidate = 0

function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const { data: video } = await supabase.from('videos').select('*').eq('id', id).single()

  if (!video) {
    return { title: 'Video Not Found - JR Films India' }
  }

  const cleanTitle = video.title.split('|')[0].trim()
  const pageTitle = `${cleanTitle} - JR Films India`
  const description = video.description?.slice(0, 160) || `Watch ${cleanTitle} on JR Films India.`

  return {
    title: pageTitle,
    description: description,
    openGraph: {
      title: pageTitle,
      description: description,
      images: video.thumbnail_url ? [video.thumbnail_url] : [],
      type: 'video.other',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageTitle,
      description: description,
      images: video.thumbnail_url ? [video.thumbnail_url] : [],
    },
  }
}

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
      <ViewTracker videoId={String(video.id)} />
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
            <p className="text-purple-500 text-sm mt-1">
              {video.category} {video.series_name && `· ${video.series_name} · Episode ${video.episode_number}`} · {formatViews(video.view_count || 0)} views
            </p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">{video.description}</p>
          </div>
          <div className="flex gap-4 mt-6">
            {nextEpisode ? (
              <Link href={`/watch/${nextEpisode.id}`} className="bg-purple-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-purple-400 transition">
                ▶ Next Episode
              </Link>
            ) : (
              <button className="bg-purple-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-purple-400 transition">▶ Play</button>
            )}
            <WatchlistButton videoId={String(video.id)} />
            <ShareButton title={video.title} url={`https://jrfilmsindia.com/watch/${video.id}`} />
          </div>

          {episodes.length > 0 && (
            <div className="mt-12">
              <h2 className="text-white text-lg font-bold mb-4">More Episodes — {video.series_name}</h2>
              <div className="space-y-3">
                {episodes.map((ep) => (
                  <Link
                    key={ep.id}
                    href={`/watch/${ep.id}`}
                    className={`flex gap-4 p-3 rounded-lg transition ${ep.id === video.id ? 'bg-gray-800 ring-1 ring-purple-500' : 'bg-gray-900 hover:bg-gray-800'}`}
                  >
                    <div className="relative w-32 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      {ep.thumbnail_url && (
                        <Image src={ep.thumbnail_url} alt={ep.title} fill className="object-cover" sizes="128px" />
                      )}
                      <span className="absolute top-1 left-1 bg-purple-500 text-black text-xs font-bold px-1.5 py-0.5 rounded">
                        EP {ep.episode_number}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium line-clamp-2">{ep.title}</p>
                      {ep.id === video.id && <p className="text-purple-500 text-xs mt-1">Now Playing</p>}
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
