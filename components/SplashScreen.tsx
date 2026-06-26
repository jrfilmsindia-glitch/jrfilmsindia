'use client'
import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('jrf_splash_shown')
    if (alreadyShown) { setShow(false); return }
    setStarted(true)
    const fadeTimer = setTimeout(() => setFadeOut(true), 2600)
    const hideTimer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('jrf_splash_shown', 'true')
    }, 3100)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  function skip() {
    setFadeOut(true)
    setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('jrf_splash_shown', 'true')
    }, 350)
  }

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      {/* Background subtle radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(120,60,200,0.15)_0%,_transparent_70%)]" />

      <div className="relative flex items-center justify-center">
        {started && (
          <>
            {/* Logo */}
            <img
              src="/jrf-logo.png"
              alt="JR Films"
              className="w-[70vw] max-w-[360px] object-contain animate-logo-reveal relative z-10"
            />
            {/* Light flare sweep */}
            <div
              className="absolute inset-0 w-full h-full z-20 animate-flare pointer-events-none"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.55) 50%, transparent 100%)',
                width: '60%',
                left: '20%',
              }}
            />
          </>
        )}
      </div>

      <button
        onClick={skip}
        className="absolute bottom-8 right-8 text-gray-500 text-sm hover:text-white transition-colors duration-200 flex items-center gap-1.5"
      >
        Skip
        <svg viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5">
          <path fillRule="evenodd" d="M6.22 4.22a.75.75 0 011.06 0l3.25 3.25a.75.75 0 010 1.06l-3.25 3.25a.75.75 0 01-1.06-1.06L9.19 8 6.22 5.03a.75.75 0 010-1.06z" clipRule="evenodd"/>
        </svg>
      </button>
    </div>
  )
}
