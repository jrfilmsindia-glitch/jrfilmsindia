'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setMenuOpen(false)
      setQuery('')
    }
  }

  const links = [
    { href: '/', label: 'Home' },
    { href: '/browse', label: 'Browse' },
    { href: '/series', label: 'Series' },
    { href: '/shorts', label: 'Shorts' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-black/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/50'
        : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent'
    }`}>
      <div className="px-6 md:px-12 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <Image src="/jrf-logo.png" alt="JR Films" width={140} height={89} className="h-9 w-auto object-contain" priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                pathname === l.href
                  ? 'text-white bg-white/10'
                  : 'text-gray-300 hover:text-white hover:bg-white/8'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center gap-2">
          <form
            onSubmit={handleSearch}
            className={`flex items-center transition-all duration-300 overflow-hidden rounded-full border ${
              searchOpen
                ? 'bg-white/10 border-white/20 px-4 py-1.5 w-52'
                : 'bg-transparent border-transparent w-9'
            }`}
          >
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="text-gray-300 hover:text-white flex-shrink-0 w-5 h-5 flex items-center justify-center"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
            </button>
            {searchOpen && (
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search..."
                className="bg-transparent text-white text-sm placeholder-gray-400 outline-none ml-2 w-full"
              />
            )}
          </form>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[9px]' : ''}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-72' : 'max-h-0'}`}>
        <div className="px-6 pb-4 bg-black/95 backdrop-blur-xl border-t border-white/5">
          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-xl px-4 py-2.5 mt-4 mb-3">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 flex-shrink-0">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="bg-transparent text-white text-sm placeholder-gray-400 outline-none ml-3 w-full"
            />
          </form>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center py-3 border-b border-white/5 text-sm font-medium transition ${
                pathname === l.href ? 'text-white' : 'text-gray-400 hover:text-white'
              }`}
            >
              {l.label}
              {pathname === l.href && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400" />}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
