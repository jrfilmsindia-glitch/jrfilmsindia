import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://udtjffrethhroxhvnvls.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkdGpmZnJldGhocm94aHZudmxzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTIwMDcxOCwiZXhwIjoyMDk2Nzc2NzE4fQ.rJQKymv9q3ywfIyGER0ZhlyYdoiHB2EK-SpxPZYUFuI'
)

export const revalidate = 0

function LandscapeRow({ title, videos, seeAllHref, accent }: { title: string, videos: any[], seeAllHref?: string, accent: 'purple' | 'pink' }) {
  if (!videos.length) return null
  const linkColor = accent === 'purple' ? 'text-purple-400' : 'text-pink-400'
  const ringColor = accent === 'purple' ? 'ring-purple-500' : 'ring-pink-500'
  return (
    <div className="px-6 md:px-12 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-[15px] md:text-base font-medium">{title}</h2>
        {seeAllHref && <Link href={seeAllHref} className={linkColor + " text-xs hover:underline"}>See all</Link>}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {videos.map((video) => (
          <Link key={video.id} href={"/watch/" + video.id} className="group">
            <div className={"aspect-video bg-[#161118] rounded-md overflow-hidden group-hover:ring-2 " + ringColor + " transition-all duration-150"}>
              {video.thumbnail_url
                ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
              }
            </div>
            <p className="text-gray-300 text-xs mt-1.5 truncate">{video.title}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

function VerticalRow({ title, videos, seeAllHref, episodeCount }: { title: string, videos: any[], seeAllHref?: string, episodeCount?: number }) {
  if (!videos.length) return null
  return (
    <div className="px-6 md:px-12 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-[15px] md:text-base font-medium">{title}</h2>
        {episodeCount ? (
          <span className="text-pink-400 text-xs">{episodeCount} episodes</span>
        ) : seeAllHref ? <Link href={seeAllHref} className="text-pink-400 text-xs hover:underline">See all</Link> : null}
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-2.5">
        {videos.map((video) => (
          <Link key={video.id} href={"/watch/" + video.id} className="group">
            <div className="aspect-[9/16] bg-[#1f1318] rounded-md overflow-hidden group-hover:ring-2 ring-pink-500 transition-all duration-150">
              {video.thumbnail_url
                ? <img src={video.thumbnail_url} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
              }
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SeriesPosterRow({ seriesList, accent }: { seriesList: { name: string, episodes: any[] }[], accent: 'purple' | 'pink' }) {
  if (!seriesList.length) return null
  const linkColor = accent === 'purple' ? 'text-purple-400' : 'text-pink-400'
  const ringColor = accent === 'purple' ? 'ring-purple-500' : 'ring-pink-500'
  return (
    <div className="px-6 md:px-12 py-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-white text-[15px] md:text-base font-medium">Series</h2>
        <Link href="/series" className={linkColor + " text-xs hover:underline"}>See all</Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {seriesList.map((s) => {
          const firstEp = s.episodes[0]
          const vertical = accent === 'pink'
          return (
            <Link key={s.name} href={"/watch/" + firstEp.id} className="group">
              <div className={"relative " + (vertical ? "aspect-[9/16]" : "aspect-video") + " bg-[#161118] rounded-md overflow-hidden group-hover:ring-2 " + ringColor + " transition-all duration-150"}>
                {firstEp.thumbnail_url
                  ? <img src={firstEp.thumbnail_url} alt={s.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                  : <div className="w-full h-full flex items-center justify-center"><span className="text-gray-600 text-xs">No thumbnail</span></div>
                }
                <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/90 to-transparent">
                  <p className="text-white text-xs font-medium truncate">{s.name}</p>
                  <p className={"text-[10px] mt-0.5 " + (accent === 'purple' ? 'text-purple-300' : 'text-pink-300')}>{s.episodes.length} episodes</p>
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
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      
      {featured && (
        <div className="relative h-[70vh] md:h-[78vh] flex items-end pb-12">
          {featured.thumbnail_url && (
            <img 
              src={featured.thumbnail_url} 
              alt={featured.title} 
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0710] via-[#0a0710]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0710]/90 via-[#0a0710]/40 to-transparent" />
          <div className="relative z-10 px-6 md:px-12 max-w-2xl">
            <p className="text-purple-400 text-xs font-medium uppercase tracking-[0.15em] mb-3">Featured Film</p>
            <h1 className="text-white text-3xl md:text-5xl font-semibold mb-4 leading-tight">{featuredTitle}</h1>
            <p className="text-gray-300 text-sm md:text-base mb-7 line-clamp-2 max-w-xl">{featured.description}</p>
            <div className="flex gap-3">
              <Link href={"/watch/" + featured.id} className="bg-purple-400 text-purple-950 font-semibold px-7 py-3 rounded-lg hover:bg-purple-300 transition text-sm">
                Watch Now
              </Link>
              <Link href={"/watch/" + featured.id} className="bg-white/10 text-white font-semibold px-7 py-3 rounded-lg hover:bg-white/15 transition text-sm backdrop-blur-sm">
                More Info
              </Link>
            </div>
          </div>
        </div>
      )}

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
