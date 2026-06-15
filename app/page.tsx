import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      {/* Hero Section */}
      <div className="relative h-screen flex items-center">
        <div className="absolute inset-0 bg-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="relative z-10 px-6 md:px-16 max-w-2xl">
          <p className="text-amber-500 text-sm font-bold uppercase tracking-widest mb-4">Featured</p>
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 leading-tight">
            JR Films India
          </h1>
          <p className="text-gray-300 text-lg mb-8">
            Watch exclusive short films, series and vertical videos from India's best creators.
          </p>
          <div className="flex gap-4">
            <button className="bg-amber-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-amber-400 transition">
              ▶ Watch Now
            </button>
            <button className="bg-gray-700/80 text-white font-bold px-8 py-3 rounded-lg hover:bg-gray-600 transition">
              More Info
            </button>
          </div>
        </div>
      </div>

      {/* Latest Videos Row */}
      <div className="px-6 md:px-16 py-8">
        <h2 className="text-white text-xl font-bold mb-4">Latest Videos</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1,2,3,4,5,6].map((i) => (
            <Link key={i} href={`/watch/${i}`} className="flex-shrink-0 w-36 md:w-48">
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Video {i}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Shorts Row */}
      <div className="px-6 md:px-16 py-8">
        <h2 className="text-white text-xl font-bold mb-4">Shorts</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1,2,3,4,5,6].map((i) => (
            <Link key={i} href={`/watch/${i}`} className="flex-shrink-0 w-36 md:w-48">
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Short {i}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Series Row */}
      <div className="px-6 md:px-16 py-8">
        <h2 className="text-white text-xl font-bold mb-4">Series</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {[1,2,3,4,5,6].map((i) => (
            <Link key={i} href={`/watch/${i}`} className="flex-shrink-0 w-36 md:w-48">
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Series {i}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </main>
  )
}
