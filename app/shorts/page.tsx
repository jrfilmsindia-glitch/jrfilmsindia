import Navbar from '@/components/Navbar'

export default function ShortsPage() {
  const shorts = [
    { id: 'IH7bIp6KoNU', title: 'Short Film 1' },
  ]

  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-24 px-6 md:px-16">
        
        <h1 className="text-white text-3xl font-bold mb-8">Shorts</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {shorts.map((short) => (
            <div key={short.id} className="flex flex-col">
              <div className="aspect-[9/16] rounded-lg overflow-hidden">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${short.id}`}
                  title={short.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="text-white text-sm mt-2 truncate">{short.title}</p>
              <p className="text-amber-500 text-xs mt-1">Short</p>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}
