import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function BrowsePage() {
  const categories = ['All', 'Shorts', 'Series', 'Films', 'Behind the Scenes']

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        
        <h1 className="text-white text-3xl font-bold mb-8">Browse</h1>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              className="flex-shrink-0 px-4 py-2 rounded-full bg-gray-800 text-white text-sm hover:bg-amber-500 hover:text-black transition"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {[1,2,3,4,5,6,7,8,9,10].map((i) => (
            <Link key={i} href={`/watch/${i}`}>
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Video {i}</span>
                </div>
              </div>
              <p className="text-white text-sm mt-2 truncate">Video Title {i}</p>
              <p className="text-amber-500 text-xs mt-1">Shorts</p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
