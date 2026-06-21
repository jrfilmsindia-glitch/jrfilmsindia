import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0710]">
      <Navbar />
      <div className="pt-28 px-6 md:px-16 pb-16 max-w-3xl">
        <p className="text-purple-400 text-xs font-semibold uppercase tracking-[0.15em] mb-3">Our Story</p>
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-6">About JR Films India</h1>
        
        <div className="space-y-5 text-gray-300 text-base leading-relaxed">
          <p>
            JR Films India is a family-run production house dedicated to telling authentic, heartfelt stories through short films, web series, and vertical digital content.
          </p>
          <p>
            What started as a passion project has grown into a creative studio producing original Marathi and Hindi short films, horror and drama series, and quick-format reels — all crafted with the same care and attention to detail, regardless of length or format.
          </p>
          <p>
            Our work spans everything from emotional family dramas like <span className="text-white font-medium">Patharakha</span> to spine-chilling horror series like <span className="text-white font-medium">School Ghost</span>, alongside vertical-format stories that bring quick, engaging narratives to a new generation of viewers.
          </p>
          <p>
            We believe great stories don't need big budgets — just honesty, heart, and a willingness to experiment with new formats. This platform is our home for everything we create, all in one place.
          </p>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <h2 className="text-white text-lg font-semibold mb-3">Connect with us</h2>
          <div className="flex gap-4 text-sm">
            <a href="https://www.youtube.com/@JR_Films2023" target="_blank" className="text-purple-400 hover:underline">YouTube</a>
            <a href="https://www.instagram.com/jrfilms_india?igsh=dDRqamplNDg0NDQ0" target="_blank" className="text-purple-400 hover:underline">Instagram</a>
            <a href="https://www.facebook.com/share/1G6cE8i68Z/?mibextid=wwXIfr" target="_blank" className="text-purple-400 hover:underline">Facebook</a>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}
