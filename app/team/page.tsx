import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const team = [
  {
    name: 'Dhiraj Adik',
    role: 'Founder & Visionary',
    image: '/team-dhiraj.jpg',
    instagram: 'https://www.instagram.com/adik_dheeraj',
    handle: '@adik_dheeraj',
    bio: [
      'Dhiraj Adik is more than just the founder of JR Films—he is the driving force behind its vision, growth, and evolution. With a forward-thinking mindset and relentless determination, he has taken bold steps to elevate JR Films to the next level.',
      'His journey is defined by passion, risk-taking, and an unwavering belief in creating something impactful. Dhiraj\'s leadership goes beyond building a company; he is shaping a brand that stands for creativity, quality, and innovation.',
      'Through his strategic vision and hands-on approach, he has successfully transformed ideas into reality, constantly pushing boundaries and setting new benchmarks. His ability to identify opportunities and execute them with precision has been key to the company\'s continuous growth.',
      'Dhiraj Adik is not just leading JR Films—he is redefining its future.',
    ],
  },
  {
    name: 'Ashwini Bhande',
    role: 'Core Pillar',
    image: '/team-ashwini.jpg',
    instagram: 'https://www.instagram.com/ashwinibhande_official',
    handle: '@ashwinibhande_official',
    bio: [
      'Ashwini Bhande is not just a part of our organization—she is one of its strongest pillars and a true asset to our growth and success. With exceptional acting skills and a natural flair for expression, she brings creativity, authenticity, and life into everything she represents.',
      'Her talent goes beyond performance. Ashwini has a unique ability to connect with audiences, making every piece of content engaging, relatable, and impactful. Her presence has significantly contributed to strengthening our brand identity and enhancing our reach.',
      'Within the company, she plays a crucial role in driving creative direction and setting high standards for quality and execution. Her dedication, professionalism, and passion for her craft inspire the entire team to push boundaries and consistently deliver excellence.',
    ],
  },
]

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#08060f] text-white">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-16 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(124,58,237,0.3),transparent)] pointer-events-none" />
        <p className="text-purple-400 text-xs font-bold tracking-[0.3em] uppercase mb-4">The People Behind the Camera</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-white via-white to-purple-300 bg-clip-text text-transparent mb-4">
          Meet Our Team
        </h1>
        <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
          The creative minds and passionate hearts who bring JR Films India to life.
        </p>
      </section>

      {/* Team members */}
      <section className="max-w-5xl mx-auto px-6 pb-24 space-y-24">
        {team.map((member, i) => (
          <div
            key={member.name}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            {/* Photo */}
            <div className="flex-shrink-0 w-72 md:w-80">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-purple-900/30">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="320px"
                />
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <p className="text-purple-400 text-xs font-bold tracking-[0.25em] uppercase mb-2">{member.role}</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{member.name}</h2>

              {/* Instagram link */}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mb-6 text-sm font-medium text-pink-400 hover:text-pink-300 transition-colors"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  {member.handle}
                </a>
              )}

              {/* Bio */}
              <div className="space-y-4">
                {member.bio.map((para, j) => (
                  <p key={j} className="text-gray-400 text-base leading-relaxed">{para}</p>
                ))}
              </div>

              {/* CTA */}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-purple-900/30"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  Follow on Instagram
                </a>
              )}
            </div>
          </div>
        ))}

        {/* Coming soon placeholder */}
        <div className="text-center py-12 border border-white/5 rounded-2xl bg-white/[0.02]">
          <p className="text-gray-600 text-sm">More team members coming soon...</p>
        </div>
      </section>

      <Footer />
    </main>
  )
}
