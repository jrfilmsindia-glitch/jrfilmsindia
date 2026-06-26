import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SocialStats from '@/components/SocialStats'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export const revalidate = 0

function LandscapeRow({ title, videos, seeAllHref, accent }: { title: string, videos: any[], seeAllHref?: string, accent: 'purple' | 'pink' }) {
  if (!videos.length) return null
  const ringColor = accent === 'purple' ? 'group-hover:ring-purple-500/60' : 'group-hover:ring-pink-500/60'
  const textColor = accent === 'purple' ? 'text-purple-400' : 'text-pink-400'

  return (
    <div className="px-6 md:px-12 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-base font-semibold tracking-tight">{title}</h2>
        {seeAllHref && (
          <Link href={seeAllHref} className={`${textColor} text-xs font-medium hover:underline flex items-center gap-1`}>
            See all
            <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
          </Link>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`} className="group flex-shrink-0 w-[200px] md:w-[220px]">
            <div className={`relative aspect-video bg-[#1a1020] rounded-xl overflow-hidden ring-1 ring-white/5 group-hover:ring-2 ${ringColor} transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/60`}>
              {video.thumbnail_url
                ? <Image src={video.thumbnail_url} alt={video.title} fill className="object-cover" sizes="220px" />
                : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
              }
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 shadow-lg">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-black ml-0.5">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              {/* View count */}
              {video.view_count > 0 && (
                <div className="absolute top-1.5 right-1.5 bg-black/70 backdrop-blur-sm text-white text-[9px] font-medium px-1.5 py-0.5 rounded-md">
                  {video.view_count >= 1000 ? `${(video.view_count / 1000).toFixed(1)}k` : video.view_count} views
                </div>
              )}
            </div>
            <p className="text-gray-300 text-xs mt-2 truncate font-medium group-hover:text-white transition-colors">{video.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function VerticalRow({ title, videos, seeAllHref, episodeCount }: { title: string, videos: any[], seeAllHref?: string, episodeCount?: number }) {
  if (!videos.length) return null
  return (
    <div className="px-6 md:px-12 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-base font-semibold tracking-tight">{title}</h2>
        {episodeCount
          ? <span className="text-pink-400 text-xs font-medium">{episodeCount} episodes</span>
          : seeAllHref ? (
            <Link href={seeAllHref} className="text-pink-400 text-xs font-medium hover:underline flex items-center gap-1">
              See all
              <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
            </Link>
          ) : null}
      </div>
      <div className="flex gap-2.5 overflow-x-auto scrollbar-hide pb-2">
        {videos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`} className="group flex-shrink-0 w-[120px] md:w-[140px]">
            <div className="relative aspect-[9/16] bg-[#1f1318] rounded-xl overflow-hidden ring-1 ring-white/5 group-hover:ring-2 group-hover:ring-pink-500/60 transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/60">
              {video.thumbnail_url
                ? <Image src={video.thumbnail_url} alt={video.title} fill className="object-cover" sizes="140px" />
                : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-[10px]">No thumbnail</span></div>
              }
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-black ml-0.5">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SeriesPosterRow({ seriesList, accent }: { seriesList: { name: string, episodes: any[] }[], accent: 'purple' | 'pink' }) {
  if (!seriesList.length) return null
  const ringColor = accent === 'purple' ? 'group-hover:ring-purple-500/60' : 'group-hover:ring-pink-500/60'
  const gradientColor = accent === 'purple' ? 'from-purple-900/90' : 'from-pink-900/90'
  const textColor = accent === 'purple' ? 'text-purple-300' : 'text-pink-300'
  const textAccent = accent === 'purple' ? 'text-purple-400' : 'text-pink-400'

  return (
    <div className="px-6 md:px-12 py-3">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-base font-semibold tracking-tight">Series</h2>
        <Link href="/series" className={`${textAccent} text-xs font-medium hover:underline flex items-center gap-1`}>
          See all
          <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3"><path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" clipRule="evenodd"/></svg>
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {seriesList.map((s) => {
          const firstEp = s.episodes[0]
          const vertical = accent === 'pink'
          return (
            <Link key={s.name} href={`/watch/${firstEp.id}`} className="group flex-shrink-0" style={{ width: vertical ? '130px' : '200px' }}>
              <div className={`relative ${vertical ? 'aspect-[9/16]' : 'aspect-video'} bg-[#161118] rounded-xl overflow-hidden ring-1 ring-white/5 group-hover:ring-2 ${ringColor} transition-all duration-200 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-black/60`}>
                {firstEp.thumbnail_url
                  ? <Image src={firstEp.thumbnail_url} alt={s.name} fill className="object-cover" sizes="200px" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                }
                <div className={`absolute inset-0 bg-gradient-to-t ${gradientColor} via-transparent to-transparent`} />
                <div className="absolute bottom-0 left-0 right-0 p-2.5">
                  <p className="text-white text-xs font-semibold truncate leading-tight">{s.name}</p>
                  <p className={`text-[10px] mt-0.5 font-medium ${textColor}`}>{s.episodes.length} ep</p>
                </div>
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 scale-75 group-hover:scale-100 shadow-lg">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-black ml-0.5">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          )
        })}
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

  const featured = videos?.find(v => v.featured) || videos?.find(v => v.category === 'films') || videos?.[0]

  const films = videos?.filter(v => v.category === 'films') || []
  const shorts = videos?.filter(v => v.category === 'shorts') || []
  const songs = videos?.filter(v => v.category === 'songs') || []

  const seriesEpisodes = videos?.filter(v => v.category === 'series') || []
  const seriesGroups: Record<string, any[]> = {}
  seriesEpisodes.forEach(ep => {
    const key = ep.series_name || 'Untitled'
    if (!seriesGroups[key]) seriesGroups[key] = []
    seriesGroups[key].push(ep)
  })

  const cinemaSeries: { name: string, episodes: any[] }[] = []
  const reelsSeries: { name: string, episodes: any[] }[] = []

  Object.entries(seriesGroups).forEach(([name, episodes]) => {
    const sorted = episodes.sort((a, b) => (a.episode_number || 0) - (b.episode_number || 0))
    if (sorted[0]?.orientation === 'vertical') {
      reelsSeries.push({ name, episodes: sorted })
    } else {
      cinemaSeries.push({ name, episodes: sorted })
    }
  })

  const featuredTitle = featured ? featured.title.split('|')[0].trim() : ''

  return (
    <main className="min-h-screen bg-[#0a0710]" data-pdf-capture="homepage">
      <Navbar />

      {featured && (
        <div className="relative h-[75vh] md:h-[78vh] flex items-end pb-12">
          {featured.thumbnail_url && (
            <Image
              src={featured.thumbnail_url}
              alt={featured.title}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-[#0a0710]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0710]/90 via-[#0a0710]/40 to-transparent" />
          <div className="relative z-10 px-6 md:px-12 max-w-2xl">
            <p className="text-purple-400 text-xs font-medium uppercase tracking-[0.15em] mb-3">Featured Film</p>
            <h1 className="text-white text-3xl md:text-5xl font-semibold mb-4 leading-tight">{featuredTitle}</h1>
            <p className="text-gray-300 text-sm md:text-base mb-7 line-clamp-2 max-w-xl">{featured.description}</p>
            <div className="flex gap-3 flex-wrap">
              <Link href={"/watch/" + featured.id} className="inline-flex items-center gap-2 bg-white text-black font-bold px-7 py-3 rounded-xl hover:bg-gray-100 transition-all duration-150 text-sm shadow-lg shadow-black/30">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-0.5">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
                Watch Now
              </Link>
              <Link href={"/watch/" + featured.id} className="inline-flex items-center gap-2 bg-white/10 text-white font-semibold px-7 py-3 rounded-xl hover:bg-white/20 transition-all duration-150 text-sm backdrop-blur-sm border border-white/10">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
                More Info
              </Link>
            </div>
          </div>
        </div>
      )}

      <SocialStats />
      <div className="pt-8 pb-2">
        <div className="px-6 md:px-12 mb-1">
          <span className="text-purple-400 text-[11px] font-semibold uppercase tracking-[0.15em]">Cinema</span>
          <span className="text-gray-500 text-xs ml-2">Original films and story-driven series</span>
        </div>
        <SeriesPosterRow seriesList={cinemaSeries} accent="purple" />
        <LandscapeRow title="Films" videos={films} seeAllHref="/browse" accent="purple" />
        <LandscapeRow title="Songs" videos={songs} seeAllHref="/browse" accent="purple" />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-6 mx-6 md:mx-12" />

      <div className="pt-2 pb-12">
        <div className="px-6 md:px-12 mb-1">
          <span className="text-pink-400 text-[11px] font-semibold uppercase tracking-[0.15em]">Reels</span>
          <span className="text-gray-500 text-xs ml-2">Quick vertical stories</span>
        </div>
        <SeriesPosterRow seriesList={reelsSeries} accent="pink" />
        <VerticalRow title="Shorts" videos={shorts} seeAllHref="/shorts" />
      </div>

      <Footer />
    </main>
  )
}
