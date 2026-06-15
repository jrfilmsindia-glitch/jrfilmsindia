import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function SeriesPage() {
  const series = [
    { id: 1, title: 'Series 1', episodes: 6, category: 'Drama' },
    { id: 2, title: 'Series 2', episodes: 4, category: 'Comedy' },
    { id: 3, title: 'Series 3', episodes: 8, category: 'Thriller' },
    { id: 4, title: 'Series 4', episodes: 5, category: 'Romance' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        
        <h1 className="text-white text-3xl font-bold mb-8">Series</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {series.map((s) => (
            <Link key={s.id} href={`/watch/${s.id}`}>
              <div className="bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition-transform duration-200">
                <div className="aspect-video bg-gray-800 flex items-center justify-center">
                  <span className="text-gray-600 text-sm">{s.title}</span>
                </div>
                <div className="p-4">
                  <h2 className="text-white font-bold text-lg">{s.title}</h2>
                  <p className="text-amber-500 text-sm mt-1">{s.category}</p>
                  <p className="text-gray-400 text-sm mt-1">{s.episodes} Episodes</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  )
}
