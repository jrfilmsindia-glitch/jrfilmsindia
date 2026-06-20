'use client'
import { useState, useEffect } from 'react'

export default function SplashScreen() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem('jrf_splash_shown')
    if (alreadyShown) {
      setShow(false)
      return
    }
    const fadeTimer = setTimeout(() => setFadeOut(true), 4500)
    const hideTimer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('jrf_splash_shown', 'true')
    }, 5000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <img
        src="/jrf-logo.png"
        alt="JR Films"
        className="w-auto h-auto max-w-[90vw] max-h-[80vh] object-contain animate-pulse"
      />
    </div>
  )
}
