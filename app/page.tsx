import { supabase } from '@/lib/supabase'

export default async function Home() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .eq('visibility', 'public')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-black p-4">
      <h1 className="text-white text-2xl font-bold mb-6">JR Films India</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videos && videos.length > 0 ? (
          videos.map((video) => (
            <div key={video.id} className="bg-gray-900 rounded-lg overflow-hidden">
              <div className="aspect-[9/16] bg-gray-800 flex items-center justify-center">
                <span className="text-gray-500 text-sm">No thumbnail</span>
              </div>
              <div className="p-2">
                <p className="text-white text-sm font-medium truncate">{video.title}</p>
                <p className="text-gray-400 text-xs mt-1">{video.category}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No videos yet.</p>
        )}
      </div>
    </main>
  )
}