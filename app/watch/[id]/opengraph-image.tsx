import { ImageResponse } from 'next/og'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!
)

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { data: video } = await supabase.from('videos').select('*').eq('id', id).single()

  const title = video ? video.title.split('|')[0].trim() : 'JR Films India'
  const category = video?.category || ''

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0a0710 0%, #1a0a2e 50%, #0a0710 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {video?.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={video.thumbnail_url}
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.35,
            }}
          />
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(10,7,16,0.95) 0%, rgba(10,7,16,0.6) 60%, transparent 100%)',
          }}
        />
        <div
          style={{
            position: 'relative',
            padding: '60px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <span
            style={{
              color: '#a855f7',
              fontSize: '18px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
            }}
          >
            JR Films India {category ? `· ${category}` : ''}
          </span>
          <h1
            style={{
              color: 'white',
              fontSize: '60px',
              fontWeight: 800,
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            {title}
          </h1>
          <span style={{ color: '#d1d5db', fontSize: '22px' }}>Watch on jrfilmsindia.com</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
