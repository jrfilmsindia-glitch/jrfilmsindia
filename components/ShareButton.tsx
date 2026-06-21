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
    <button onClick={handleShare} className="bg-gray-800 text-white font-bold px-6 py-3 rounded-lg hover:bg-gray-700 transition">
      {copied ? '✓ Link Copied' : '↗ Share'}
    </button>
  )
}
