import { createClient } from '@supabase/supabase-js'

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL as string, process.env.SUPABASE_SECRET_KEY as string)

export const revalidate = 0

function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

const categoryLabels: Record<string, string> = {
  films: 'Films',
  series: 'Series',
  shorts: 'Shorts & Reels',
  songs: 'Music Videos',
  'behind the scenes': 'Behind The Scenes',
}

export default async function PortfolioPDFPage() {
  const { data: videos } = await supabase.from('videos').select('*').eq('visibility', 'public')

  const totalViews = videos?.reduce((sum, v) => sum + (v.view_count || 0), 0) || 0
  const totalVideos = videos?.length || 0

  const seenSeries = new Set<string>()
  const byCategory: Record<string, any[]> = {}

  videos?.forEach(v => {
    if (v.category === 'series' && v.series_name) {
      if (seenSeries.has(v.series_name)) return
      seenSeries.add(v.series_name)
      const episodeCount = videos.filter(x => x.series_name === v.series_name).length
      const firstEp = videos
        .filter(x => x.series_name === v.series_name)
        .sort((a, b) => (a.episode_number || 0) - (b.episode_number || 0))[0]
      if (!byCategory['series']) byCategory['series'] = []
      byCategory['series'].push({ ...firstEp, _episodeCount: episodeCount })
    } else {
      if (!byCategory[v.category]) byCategory[v.category] = []
      byCategory[v.category].push(v)
    }
  })

  const seriesCount = seenSeries.size

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* PAGE 1 - COVER */}
      <div style={{
        width: '100%', minHeight: '297mm', background: 'linear-gradient(160deg, #0a0710 0%, #1a0f24 60%, #2d1840 100%)',
        position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', pageBreakAfter: 'always', padding: '40px',
      }}>
        <div style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.25), transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: -120, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)' }} />

        <img src="https://jrfilmsindia.com/jrf-logo.png" alt="" style={{ width: 150, marginBottom: 8, position: 'relative', zIndex: 2 }} />

        <p style={{ color: '#c4b5fd', fontSize: 13, letterSpacing: 3, fontWeight: 700, marginTop: 30, marginBottom: 8, position: 'relative', zIndex: 2 }}>CONTENT PORTFOLIO</p>
        <h1 style={{ color: 'white', fontSize: 44, fontWeight: 800, margin: 0, position: 'relative', zIndex: 2 }}>JR Films India</h1>
        <p style={{ color: '#a78bfa', fontSize: 17, marginTop: 10, position: 'relative', zIndex: 2 }}>Original Films, Series &amp; Digital Content</p>

        <div style={{ display: 'flex', gap: 32, marginTop: 80, position: 'relative', zIndex: 2 }}>
          {[
            { label: 'Total Videos', value: String(totalVideos) },
            { label: 'Total Views', value: formatViews(totalViews) },
            { label: 'Original Series', value: String(seriesCount) },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center', minWidth: 130, padding: '24px 18px', background: 'rgba(255,255,255,0.06)', borderRadius: 14, border: '1px solid rgba(167,139,250,0.25)' }}>
              <div style={{ color: '#c4b5fd', fontSize: 32, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: '#9ca3af', fontSize: 10, letterSpacing: 1, marginTop: 8, textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ position: 'absolute', bottom: 50, textAlign: 'center', color: '#6b7280', fontSize: 11 }}>
          <div>{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
          <div style={{ marginTop: 4, color: '#a78bfa' }}>jrfilmsindia.com</div>
        </div>
      </div>

      {/* PAGE 2 - ABOUT */}
      <div style={{
        width: '100%', minHeight: '297mm', background: '#0a0710', position: 'relative',
        padding: '60px 70px', boxSizing: 'border-box', pageBreakAfter: 'always',
      }}>
        <p style={{ color: '#a78bfa', fontSize: 12, letterSpacing: 2, fontWeight: 700, marginBottom: 10 }}>OUR STORY</p>
        <h1 style={{ color: 'white', fontSize: 32, fontWeight: 800, marginBottom: 35 }}>About JR Films India</h1>

        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.9, marginBottom: 18 }}>
          JR Films India is a family-run production house dedicated to telling authentic, heartfelt stories through short films, web series, and vertical digital content.
        </p>
        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.9, marginBottom: 18 }}>
          What started as a passion project has grown into a creative studio producing original Marathi and Hindi short films, horror and drama series, and quick-format reels — all crafted with the same care and attention to detail, regardless of length or format.
        </p>
        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.9, marginBottom: 18 }}>
          Our work spans everything from emotional family dramas like <strong style={{ color: 'white' }}>Patharakha</strong> to spine-chilling horror series like <strong style={{ color: 'white' }}>School Ghost</strong>, alongside vertical-format stories that bring quick, engaging narratives to a new generation of viewers.
        </p>
        <p style={{ color: '#d1d5db', fontSize: 14, lineHeight: 1.9, marginBottom: 50 }}>
          We believe great stories don't need big budgets — just honesty, heart, and a willingness to experiment with new formats.
        </p>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 28 }}>
          <p style={{ color: '#a78bfa', fontSize: 12, letterSpacing: 2, fontWeight: 700, marginBottom: 16 }}>CONNECT WITH US</p>
          <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 10 }}>YouTube — youtube.com/@JR_Films2023</p>
          <p style={{ color: '#9ca3af', fontSize: 13, marginBottom: 10 }}>Instagram — instagram.com/jrfilms_india</p>
          <p style={{ color: '#9ca3af', fontSize: 13 }}>Facebook — facebook.com/jrfilmsindia</p>
        </div>
      </div>

      {/* CONTENT SHOWCASE PAGES */}
      {Object.entries(byCategory).map(([category, vids]) => {
        const chunks = []
        for (let i = 0; i < vids.length; i += 6) chunks.push(vids.slice(i, i + 6))
        return chunks.map((chunk, pageIdx) => (
          <div key={`${category}-${pageIdx}`} style={{
            width: '100%', minHeight: '297mm', background: '#0a0710', position: 'relative',
            padding: '50px 60px', boxSizing: 'border-box', pageBreakAfter: 'always',
          }}>
            <p style={{ color: '#a78bfa', fontSize: 12, letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>CONTENT SHOWCASE</p>
            <h2 style={{ color: 'white', fontSize: 26, fontWeight: 800, marginBottom: 4 }}>
              {categoryLabels[category] || category}{pageIdx > 0 ? ' (cont.)' : ''}
            </h2>
            <p style={{ color: '#6b7280', fontSize: 12, marginBottom: 30 }}>
              {vids.length} {category === 'series' ? 'series' : 'video' + (vids.length !== 1 ? 's' : '')} in this category
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
              {chunk.map((v: any) => (
                <div key={v.id} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(167,139,250,0.15)' }}>
                  <div style={{ width: '100%', height: v.orientation === 'vertical' ? 240 : 160, background: '#1a1a1a', overflow: 'hidden' }}>
                    {v.thumbnail_url && (
                      <img src={v.thumbnail_url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    )}
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ color: 'white', fontSize: 12, fontWeight: 600, margin: 0, lineHeight: 1.4 }}>
                      {v._episodeCount ? v.series_name : (v.title || '').split('|')[0].trim().slice(0, 60)}
                    </p>
                    {v._episodeCount && (
                      <p style={{ color: '#a78bfa', fontSize: 10, marginTop: 6, marginBottom: 0 }}>{v._episodeCount} Episodes</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      })}

      {/* BY THE NUMBERS */}
      <div style={{
        width: '100%', minHeight: '297mm', background: '#0a0710', position: 'relative',
        padding: '60px 70px', boxSizing: 'border-box', pageBreakAfter: 'always',
      }}>
        <p style={{ color: '#a78bfa', fontSize: 12, letterSpacing: 2, fontWeight: 700, marginBottom: 6 }}>BY THE NUMBERS</p>
        <h2 style={{ color: 'white', fontSize: 26, fontWeight: 800, marginBottom: 40 }}>Our Reach &amp; Output</h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
          {[
            { label: 'Total Videos Produced', value: String(totalVideos) },
            { label: 'Total Views Across Platform', value: formatViews(totalViews) },
            { label: 'Original Series', value: String(seriesCount) },
            ...Object.entries(byCategory).map(([cat, vids]) => ({
              label: categoryLabels[cat] || cat,
              value: String(vids.length),
            })),
          ].map((stat, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: 12, padding: '22px 24px' }}>
              <div style={{ color: '#c4b5fd', fontSize: 30, fontWeight: 800 }}>{stat.value}</div>
              <div style={{ color: '#9ca3af', fontSize: 11, marginTop: 8 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CLOSING */}
      <div style={{
        width: '100%', minHeight: '297mm', background: 'linear-gradient(160deg, #0a0710 0%, #1a0f24 60%, #2d1840 100%)',
        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <img src="https://jrfilmsindia.com/jrf-logo.png" alt="" style={{ width: 100, marginBottom: 35 }} />
        <h2 style={{ color: 'white', fontSize: 30, fontWeight: 800, marginBottom: 14 }}>Let's Create Together</h2>
        <p style={{ color: '#a78bfa', fontSize: 16 }}>jrfilmsindia.com</p>
      </div>
    </div>
  )
}
