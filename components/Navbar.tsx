'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

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
          <Link href="/" className="text-white text-sm">Home</Link>
          <Link href="/browse" className="text-white text-sm">Browse</Link>
          <Link href="/series" className="text-white text-sm">Series</Link>
          <Link href="/shorts" className="text-white text-sm">Shorts</Link>
        </div>
      )}
    </nav>
  )
}
