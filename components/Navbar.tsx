'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setSearchOpen(false)
      setMenuOpen(false)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black to-transparent px-6 py-3">
      <div className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/jrf-logo.png" alt="JR Films" width={140} height={89} className="h-10 w-auto object-contain" priority />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-white hover:text-purple-300 text-sm transition">Home</Link>
          <Link href="/browse" className="text-white hover:text-purple-300 text-sm transition">Browse</Link>
          <Link href="/series" className="text-white hover:text-purple-300 text-sm transition">Series</Link>
          <Link href="/shorts" className="text-white hover:text-purple-300 text-sm transition">Shorts</Link>
          {searchOpen ? (
            <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-3 py-1.5">
              <input
                autoFocus
                value={query}
                onChange={e => setQuery(e.target.value)}
                onBlur={() => !query && setSearchOpen(false)}
                placeholder="Search videos..."
                className="bg-transparent text-white text-sm placeholder-gray-400 outline-none w-40"
              />
            </form>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-white hover:text-purple-300" aria-label="Search">
              🔍
            </button>
          )}
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-black p-4 rounded-lg">
          <form onSubmit={handleSearch} className="flex items-center bg-white/10 rounded-full px-3 py-2 mb-2">
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search videos..."
              className="bg-transparent text-white text-sm placeholder-gray-400 outline-none w-full"
            />
          </form>
          <Link href="/" className="text-white text-sm">Home</Link>
          <Link href="/browse" className="text-white text-sm">Browse</Link>
          <Link href="/series" className="text-white text-sm">Series</Link>
          <Link href="/shorts" className="text-white text-sm">Shorts</Link>
        </div>
      )}
    </nav>
  )
}
