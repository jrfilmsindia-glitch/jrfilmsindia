'use client'
import { useState } from 'react'

export default function ShareButton({ title, url }: { title: string, url: string }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch (e) {
        // user cancelled, do nothing
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button onClick={handleShare} className="flex-shrink-0 inline-flex items-center gap-1.5 bg-white/8 text-gray-300 border border-white/10 font-semibold px-3.5 md:px-5 py-2.5 rounded-full text-sm hover:bg-white/15 hover:text-white transition">
      {copied ? '✓ Copied' : '↗ Share'}
    </button>
  )
}
