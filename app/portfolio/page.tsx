import { createClient } from '@supabase/supabase-js'
import PrintButton from '@/components/PrintButton'

export const revalidate = 3600

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
)

function formatViews(n: number) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M'
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K'
  return n.toString()
}

const CATEGORY_ORDER = ['films', 'series', 'shorts', 'songs', 'behind the scenes']
const CATEGORY_LABELS: Record<string, string> = {
  films: 'Short Films',
  series: 'Web Series',
  shorts: 'Shorts & Reels',
  songs: 'Songs',
  'behind the scenes': 'Behind the Scenes',
}

export default async function PortfolioPage() {
  const { data: videos } = await supabase
    .from('videos')
    .select('*')
    .order('view_count', { ascending: false })

  const all = videos || []
  const totalViews = all.reduce((s, v) => s + (v.view_count || 0), 0)
  const seriesNames = new Set(all.filter(v => v.series_name).map(v => v.series_name))

  const byCategory: Record<string, any[]> = {}
  const seenSeries = new Set<string>()
  all.forEach(v => {
    const cat = v.category || 'other'
    if (!byCategory[cat]) byCategory[cat] = []
    if (v.category === 'series' && v.series_name) {
      if (seenSeries.has(v.series_name)) return
      seenSeries.add(v.series_name)
      const eps = all.filter(x => x.series_name === v.series_name)
      byCategory[cat].push({ ...v, _episodeCount: eps.length })
    } else {
      byCategory[cat].push(v)
    }
  })

  const stats = [
    { label: 'Total Videos', value: all.length.toString() },
    { label: 'Total Views', value: formatViews(totalViews) },
    { label: 'Original Series', value: seriesNames.size.toString() },
    { label: 'Categories', value: Object.keys(byCategory).length.toString() },
  ]

  return (
    <>
      {/* Floating controls — hidden on print */}
      <div className="no-print fixed top-5 right-5 z-50 flex gap-3">
        <PrintButton />
        <a
          href="/"
          className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-5 py-2.5 rounded-full backdrop-blur-sm transition-all"
        >
          ← Back
        </a>
      </div>

      <main style={{ background: '#08060f', minHeight: '100vh', color: 'white', fontFamily: 'var(--font-outfit), Outfit, system-ui, sans-serif' }}>

        {/* ── HERO ── */}
        <section style={{ position: 'relative', minHeight: '52vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 60px', textAlign: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,58,237,0.4), transparent)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/jrf-logo.png" alt="JR Films India" style={{ width: 110, height: 'auto', marginBottom: 28, filter: 'drop-shadow(0 0 28px rgba(167,139,250,0.6))' }} />

            <p style={{ color: '#a78bfa', fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>Content Portfolio</p>

            <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 16, background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 50%, #c4b5fd 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              JR Films India
            </h1>

            <p style={{ color: '#9ca3af', fontSize: 16, maxWidth: 480, lineHeight: 1.7, marginBottom: 48 }}>
              Original short films, web series &amp; digital content — crafted with heart since 2023.
            </p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, width: '100%', maxWidth: 640 }}>
              {stats.map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: '20px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: 'white' }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: 6 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>
          <p style={{ color: '#a78bfa', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>Who We Are</p>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 24 }}>About JR Films India</h2>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
            JR Films India is a family-run production house dedicated to telling authentic, heartfelt stories through short films, web series, and vertical digital content. What started as a passion project has grown into a creative studio producing original Marathi and Hindi content — crafted with care and attention to detail, regardless of length or format.
          </p>
          <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.8, marginBottom: 40 }}>
            Our work spans emotional family dramas like <strong style={{ color: 'white' }}>Patharakha</strong>, spine-chilling horror series like <strong style={{ color: 'white' }}>School Ghost</strong>, and quick-format reels that bring engaging narratives to a new generation of viewers. We believe great stories don&apos;t need big budgets — just honesty, heart, and a willingness to experiment.
          </p>

          {/* Socials */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {[
              { icon: '▶', label: 'YouTube', value: '@JR_Films2023' },
              { icon: '◈', label: 'Instagram', value: '@jrfilms_india' },
              { icon: '⊞', label: 'Facebook', value: 'jrfilmsindia' },
              { icon: '🌐', label: 'Web', value: 'jrfilmsindia.com' },
            ].map(c => (
              <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: '10px 16px' }}>
                <span style={{ color: '#a78bfa', fontSize: 14 }}>{c.icon}</span>
                <div>
                  <div style={{ color: '#6b7280', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{c.label}</div>
                  <div style={{ color: 'white', fontSize: 13, fontWeight: 600 }}>{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '0 24px' }} />

        {/* ── SHOWCASE ── */}
        <section style={{ maxWidth: 1000, margin: '0 auto', padding: '56px 24px' }}>
          <p style={{ color: '#a78bfa', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>Our Work</p>
          <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 48 }}>Content Showcase</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 52 }}>
            {CATEGORY_ORDER.filter(cat => byCategory[cat]?.length).map(cat => (
              <div key={cat}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>{CATEGORY_LABELS[cat] || cat}</h3>
                  <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
                  <span style={{ color: '#4b5563', fontSize: 12 }}>{byCategory[cat].length} title{byCategory[cat].length > 1 ? 's' : ''}</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                  {byCategory[cat].slice(0, 6).map((v: any) => (
                    <div key={v.id}>
                      {/* Always 16:9 for uniform PDF layout */}
                      <div style={{
                        position: 'relative',
                        borderRadius: 12,
                        overflow: 'hidden',
                        background: '#1a1020',
                        border: '1px solid rgba(255,255,255,0.08)',
                        aspectRatio: '16/9',
                      }}>
                        {v.thumbnail_url && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={v.thumbnail_url}
                            alt={v.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center', display: 'block' }}
                          />
                        )}
                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)' }} />
                        {v._episodeCount && (
                          <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(124,58,237,0.92)', color: 'white', fontSize: 10, fontWeight: 700, padding: '4px 10px', borderRadius: 6 }}>
                            {v._episodeCount} eps
                          </div>
                        )}
                        {v.view_count > 0 && (
                          <div style={{ position: 'absolute', bottom: 8, right: 8, background: 'rgba(0,0,0,0.75)', color: 'white', fontSize: 10, fontWeight: 600, padding: '4px 10px', borderRadius: 6 }}>
                            {formatViews(v.view_count)} views
                          </div>
                        )}
                        {/* Title overlay at bottom */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px' }}>
                          <p style={{ color: 'white', fontSize: 11, fontWeight: 600, margin: 0, lineHeight: 1.3, textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}>
                            {v.series_name || v.title}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <p style={{ color: '#a78bfa', fontSize: 11, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', marginBottom: 12 }}>Let&apos;s Work Together</p>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: 'white', marginBottom: 16 }}>Interested in collaborating?</h2>
            <p style={{ color: '#9ca3af', fontSize: 15, lineHeight: 1.7, marginBottom: 36 }}>
              We&apos;re open to brand collaborations, sponsored content, commissioned films, and creative partnerships.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a href="mailto:jrfilmsindia@gmail.com" style={{ background: '#7c3aed', color: 'white', fontWeight: 700, fontSize: 14, padding: '14px 32px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}>
                Get in Touch
              </a>
              <a href="https://jrfilmsindia.com" style={{ border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontWeight: 500, fontSize: 14, padding: '14px 32px', borderRadius: 50, textDecoration: 'none', display: 'inline-block' }}>
                Visit Website
              </a>
            </div>
            <p style={{ color: '#4b5563', fontSize: 13, marginTop: 24 }}>jrfilmsindia@gmail.com · jrfilmsindia.com</p>
          </div>
        </section>

      </main>

      <style>{`
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        @media print {
          .no-print { display: none !important; }
          @page { margin: 10mm; size: A4; }
          body { margin: 0; }
        }
      `}</style>
    </>
  )
}
