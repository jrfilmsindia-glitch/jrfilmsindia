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
    const fadeTimer = setTimeout(() => setFadeOut(true), 9500)
    const hideTimer = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('jrf_splash_shown', 'true')
    }, 10000)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center px-8 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <img src="/jrf-logo.png" alt="JR Films" className="w-full max-w-[280px] sm:max-w-[360px] md:max-w-[440px] lg:max-w-[520px] animate-pulse" />
    </div>
  )
}
