import Navbar from '@/components/Navbar'

export default function WatchPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20 px-6 md:px-16">
        
        {/* Video Player */}
        <div className="max-w-2xl mx-auto">
          <div className="aspect-[9/16] bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center">
            <p className="text-gray-500">Video player will load here</p>
          </div>
          
          {/* Video Info */}
          <div className="mt-6">
            <h1 className="text-white text-2xl font-bold">Video Title</h1>
            <p className="text-amber-500 text-sm mt-1">Category</p>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">
              Video description will appear here.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <button className="bg-amber-500 text-black font-bold px-6 py-3 rounded-lg hover:bg-amber-400 transition flex items-center gap-2">
              ▶ Play
            </button>
            <button className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              + Watchlist
            </button>
            <button className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              ↗ Share
            </button>
          </div>
        </div>

        {/* Related Videos */}
        <div className="max-w-2xl mx-auto mt-12 mb-8">
          <h2 className="text-white text-xl font-bold mb-4">More Like This</h2>
          <div className="grid grid-cols-3 gap-3">
            {[1,2,3,4,5,6].map((i) => (
              <div key={i} className="cursor-pointer group">
                <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden group-hover:scale-105 transition-transform duration-200">
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-600 text-xs">Video {i}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  )
}