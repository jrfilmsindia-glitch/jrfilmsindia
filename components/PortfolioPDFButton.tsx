'use client'
import { useState, useRef } from 'react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'


function formatViews(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M'
  if (count >= 1000) return (count / 1000).toFixed(1) + 'K'
  return count.toString()
}

export default function PortfolioPDFButton() {
  const [generating, setGenerating] = useState(false)
  const [progress, setProgress] = useState('')
  const [pdfData, setPdfData] = useState<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  async function generatePDF() {
    setGenerating(true)
    setProgress('Fetching data...')

    try {
      const res = await fetch('/api/portfolio-data')
      const data = await res.json()
      setPdfData(data)

      await new Promise(r => setTimeout(r, 500))

      const coverPages = containerRef.current?.querySelectorAll('.pdf-page')
      if (!coverPages || coverPages.length === 0) {
        setGenerating(false)
        return
      }

      const doc = new jsPDF({ unit: 'pt', format: 'a4' })
      const pageWidth = doc.internal.pageSize.getWidth()
      const pageHeight = doc.internal.pageSize.getHeight()

      for (let i = 0; i < coverPages.length; i++) {
        setProgress(`Rendering page ${i + 1} of ${coverPages.length}...`)
        const pageEl = coverPages[i] as HTMLElement
        const canvas = await html2canvas(pageEl, { scale: 2, useCORS: true, backgroundColor: null, logging: false })
        const imgData = canvas.toDataURL('image/jpeg', 0.92)
        if (i > 0) doc.addPage()
        doc.addImage(imgData, 'JPEG', 0, 0, pageWidth, pageHeight)
      }

      setProgress('Saving PDF...')
      doc.save(`JR-Films-India-Portfolio-${new Date().toISOString().slice(0, 10)}.pdf`)
    } catch (e) {
      console.error('PDF generation failed:', e)
    }

    setGenerating(false)
    setProgress('')
    setPdfData(null)
  }

  return (
    <>
      <button
        onClick={generatePDF}
        disabled={generating}
        className="bg-purple-500 text-purple-950 font-bold px-5 py-2.5 rounded-lg hover:bg-purple-400 transition text-sm disabled:opacity-60"
      >
        {generating ? (progress || 'Generating...') : '📄 Download Portfolio PDF'}
      </button>


      {pdfData && (
        <div ref={containerRef} style={{ position: 'fixed', top: -99999, left: 0, width: '595px' }}>
          {/* COVER PAGE */}
          <div className="pdf-page" style={{ width: '595px', height: '842px', background: 'linear-gradient(160deg, #0a0710 0%, #1a0f24 60%, #2d1840 100%)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ position: 'absolute', top: -100, right: -100, width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle, rgba(167,139,250,0.25), transparent 70%)' }} />
            <div style={{ position: 'absolute', bottom: -120, left: -80, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(236,72,153,0.15), transparent 70%)' }} />

            <img src="/jrf-logo.png" alt="" style={{ width: 130, marginBottom: 8, position: 'relative', zIndex: 2 }} />

            <p style={{ color: '#c4b5fd', fontSize: 12, letterSpacing: 3, fontWeight: 700, marginTop: 30, marginBottom: 8, position: 'relative', zIndex: 2 }}>CONTENT PORTFOLIO</p>
            <h1 style={{ color: 'white', fontSize: 38, fontWeight: 800, margin: 0, position: 'relative', zIndex: 2 }}>JR Films India</h1>
            <p style={{ color: '#a78bfa', fontSize: 15, marginTop: 10, position: 'relative', zIndex: 2 }}>Original Films, Series &amp; Digital Content</p>

            <div style={{ display: 'flex', gap: 28, marginTop: 70, position: 'relative', zIndex: 2 }}>
              {[
                { label: 'Total Videos', value: String(pdfData.totalVideos) },
                { label: 'Total Views', value: formatViews(pdfData.totalViews) },
                { label: 'Original Series', value: String(pdfData.seriesCount) },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: 'center', minWidth: 110, padding: '20px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: 12, border: '1px solid rgba(167,139,250,0.25)' }}>
                  <div style={{ color: '#c4b5fd', fontSize: 28, fontWeight: 800 }}>{s.value}</div>
                  <div style={{ color: '#9ca3af', fontSize: 9, letterSpacing: 1, marginTop: 6, textTransform: 'uppercase' }}>{s.label}</div>
                </div>
              ))}
            </div>

            <div style={{ position: 'absolute', bottom: 40, textAlign: 'center', color: '#6b7280', fontSize: 10 }}>
              <div>{new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
              <div style={{ marginTop: 4, color: '#a78bfa' }}>jrfilmsindia.com</div>
            </div>
          </div>

          {/* ABOUT PAGE */}
          <div className="pdf-page" style={{ width: '595px', height: '842px', background: '#0a0710', position: 'relative', padding: '70px 55px', fontFamily: 'Arial, sans-serif', boxSizing: 'border-box' }}>
            <p style={{ color: '#a78bfa', fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 10 }}>OUR STORY</p>
            <h1 style={{ color: 'white', fontSize: 28, fontWeight: 800, marginBottom: 30 }}>About JR Films India</h1>

            <p style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
              JR Films India is a family-run production house dedicated to telling authentic, heartfelt stories through short films, web series, and vertical digital content.
            </p>
            <p style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
              What started as a passion project has grown into a creative studio producing original Marathi and Hindi short films, horror and drama series, and quick-format reels — all crafted with the same care and attention to detail, regardless of length or format.
            </p>
            <p style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.8, marginBottom: 16 }}>
              Our work spans everything from emotional family dramas like <strong style={{ color: 'white' }}>Patharakha</strong> to spine-chilling horror series like <strong style={{ color: 'white' }}>School Ghost</strong>, alongside vertical-format stories that bring quick, engaging narratives to a new generation of viewers.
            </p>
            <p style={{ color: '#d1d5db', fontSize: 13, lineHeight: 1.8, marginBottom: 40 }}>
              We believe great stories don't need big budgets — just honesty, heart, and a willingness to experiment with new formats.
            </p>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24 }}>
              <p style={{ color: '#a78bfa', fontSize: 11, letterSpacing: 2, fontWeight: 700, marginBottom: 14 }}>CONNECT WITH US</p>
              <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>YouTube — youtube.com/@JR_Films2023</p>
              <p style={{ color: '#9ca3af', fontSize: 12, marginBottom: 8 }}>Instagram — instagram.com/jrfilms_india</p>
              <p style={{ color: '#9ca3af', fontSize: 12 }}>Facebook — facebook.com/jrfilmsindia</p>
            </div>

            <img src="/jrf-logo.png" alt="" style={{ width: 50, position: 'absolute', bottom: 50, right: 55, opacity: 0.5 }} />
          </div>
        </div>
      )}
    </>
  )
}
