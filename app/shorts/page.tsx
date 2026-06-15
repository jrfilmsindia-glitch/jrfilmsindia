import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function ShortsPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        
        <h1 className="text-white text-3xl font-bold mb-8">Shorts</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((i) => (
            <Link key={i} href={`/watch/${i}`}>
              <div className="aspect-[9/16] bg-gray-800 rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-600 text-xs">Short {i}</span>
                </div>
              </div>
              <p className="text-white text-sm mt-2 truncate">Short {i}</p>
              <p className="text-amber-500 text-xs mt-1">1 min</p>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
