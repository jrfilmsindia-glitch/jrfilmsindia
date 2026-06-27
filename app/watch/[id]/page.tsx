import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import VideoThumbnail from '@/components/VideoThumbnail'
import ViewTracker from '@/components/ViewTracker'
import ShareButton from '@/components/ShareButton'
import WatchlistButton from '@/components/WatchlistButton'
import LikeButton from '@/components/LikeButton'
import AutoPlayNext from '@/components/AutoPlayNext'
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

  // Fetch related videos from same category (excluding current)
  const { data: relatedData } = await supabase
    .from('videos')
    .select('id, title, thumbnail_url, view_count, category')
    .eq('category', video.category)
    .eq('visibility', 'public')
    .neq('id', video.id)
    .order('view_count', { ascending: false })
    .limit(6)

  const relatedVideos = relatedData || []

  return (
    <main className="min-h-screen bg-[#0a0710] relative overflow-hidden">
      {/* Cinematic blur background */}
      {video.thumbnail_url && (
        <div className="fixed inset-0 z-0 pointer-events-none">
          <Image
            src={video.thumbnail_url}
            alt=""
            fill
            className="object-cover opacity-[0.07] blur-3xl scale-110"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a0710]/60 via-[#0a0710]/80 to-[#0a0710]" />
        </div>
      )}
      <div className="relative z-10">
      <ViewTracker
        videoId={String(video.id)}
        title={video.title}
        thumbnail={video.thumbnail_url || ''}
        category={video.category || ''}
        orientation={video.orientation || 'landscape'}
      />
      <Navbar />
      <div className="pt-16 md:pt-20 px-3 md:px-12 pb-12">
        <div className="flex gap-8 max-w-7xl mx-auto">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Player */}
            <div className="aspect-video w-full rounded-xl overflow-hidden bg-black">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${video.youtube_id}`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Auto play next */}
            {nextEpisode && (
              <AutoPlayNext
                nextEpisodeId={String(nextEpisode.id)}
                nextEpisodeTitle={nextEpisode.title}
              />
            )}

            {/* Title & meta */}
            <div className="mt-5">
              {/* Category badge */}
              <span className="inline-block bg-purple-500/20 text-purple-400 text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-md mb-3">
                {video.category}
                {video.series_name && ` · ${video.series_name} · EP ${video.episode_number}`}
              </span>
              <h1 className="text-white text-2xl md:text-3xl font-bold leading-snug">{video.title}</h1>
              {/* View count */}
              <div className="flex items-center gap-1.5 mt-2 text-gray-400 text-sm">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-500">
                  <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                  <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
                </svg>
                <span>{formatViews(video.view_count || 0)} views</span>
              </div>
              <p className="text-gray-400 text-sm mt-3 leading-relaxed">{video.description}</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2 md:gap-3 mt-4 md:mt-5 overflow-x-auto scrollbar-hide pb-1">
              {nextEpisode ? (
                <Link
                  href={`/watch/${nextEpisode.id}`}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-purple-500 text-black font-bold px-4 md:px-5 py-2.5 rounded-full hover:bg-purple-400 transition text-sm"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Next Ep
                </Link>
              ) : (
                <span className="flex-shrink-0 inline-flex items-center gap-2 bg-white/8 text-gray-400 px-4 md:px-5 py-2.5 rounded-full text-sm border border-white/10">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                  Playing
                </span>
              )}
              <LikeButton videoId={String(video.id)} />
              <WatchlistButton videoId={String(video.id)} />
              <ShareButton title={video.title} url={`https://jrfilmsindia.com/watch/${video.id}`} />
            </div>

            {/* Episodes list */}
            {episodes.length > 0 && (
              <div className="mt-10">
                <h2 className="text-white text-lg font-bold mb-4">More Episodes — {video.series_name}</h2>
                <div className="space-y-3">
                  {episodes.map((ep) => (
                    <Link
                      key={ep.id}
                      href={`/watch/${ep.id}`}
                      className={`flex gap-4 p-3 rounded-xl transition ${ep.id === video.id ? 'bg-[#1a1020] ring-1 ring-purple-500/60' : 'bg-[#120d18] hover:bg-[#1a1020]'}`}
                    >
                      <div className="relative w-24 h-14 md:w-32 md:h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                        <VideoThumbnail src={ep.thumbnail_url} alt={ep.title} fill sizes="128px" category="series" />
                        <span className="absolute top-1 left-1 bg-purple-500 text-black text-xs font-bold px-1.5 py-0.5 rounded">
                          EP {ep.episode_number}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium line-clamp-2">{ep.title}</p>
                        {ep.id === video.id && <p className="text-purple-400 text-xs mt-1">Now Playing</p>}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related videos sidebar — desktop only */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <h2 className="text-white text-base font-semibold mb-4">Related Videos</h2>
            {relatedVideos.length === 0 ? (
              <p className="text-gray-500 text-sm">No related videos found.</p>
            ) : (
              <div className="space-y-3">
                {relatedVideos.map((rv) => (
                  <Link key={rv.id} href={`/watch/${rv.id}`} className="flex gap-3 group">
                    <div className="relative w-36 h-[76px] flex-shrink-0 rounded-lg overflow-hidden bg-gray-800">
                      <VideoThumbnail src={rv.thumbnail_url} alt={rv.title} fill sizes="144px" category={rv.category} className="object-cover group-hover:scale-105 transition-transform duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium line-clamp-2 group-hover:text-purple-300 transition-colors">{rv.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-gray-500 text-[11px]">
                        <svg viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                          <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                          <path fillRule="evenodd" d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41z" clipRule="evenodd" />
                        </svg>
                        {formatViews(rv.view_count || 0)} views
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile: related videos below episodes (rendered inside main col) */}
          </div>
        </div>

        {/* Mobile related videos — shown below everything on small screens */}
        {relatedVideos.length > 0 && (
          <div className="lg:hidden max-w-7xl mx-auto mt-10">
            <h2 className="text-white text-base font-semibold mb-4">Related Videos</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedVideos.map((rv) => (
                <Link key={rv.id} href={`/watch/${rv.id}`} className="group">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800">
                    <VideoThumbnail src={rv.thumbnail_url} alt={rv.title} fill sizes="200px" category={rv.category} className="object-cover group-hover:scale-105 transition-transform duration-200" />
                  </div>
                  <p className="text-white text-xs font-medium mt-2 line-clamp-2 group-hover:text-purple-300 transition-colors">{rv.title}</p>
                  <p className="text-gray-500 text-[11px] mt-0.5">{formatViews(rv.view_count || 0)} views</p>
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
