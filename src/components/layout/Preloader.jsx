import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const sessionKey = 'ashish-portfolio-preloader-seen'

function Preloader() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    if (window.sessionStorage.getItem(sessionKey)) return false
    return true
  })

  useEffect(() => {
    if (!visible) return undefined
    window.sessionStorage.setItem(sessionKey, 'true')
    const timer = window.setTimeout(() => setVisible(false), 1500)
    return () => window.clearTimeout(timer)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0B0F1A]" initial={{ y: 0 }} exit={{ y: '-100%' }} transition={{ duration: 0.55, ease: 'easeInOut' }} aria-label="Loading portfolio" role="status">
          <svg viewBox="0 0 160 100" className="h-28 w-44" aria-hidden="true">
            <defs>
              <linearGradient id="preloader-gradient" x1="0" x2="1">
                <stop offset="0" stopColor="#6366F1" />
                <stop offset="0.5" stopColor="#A855F7" />
                <stop offset="1" stopColor="#22D3EE" />
              </linearGradient>
            </defs>
            <path d="M22 74 47 22l23 52M31 54h31M83 74V22h20c17 0 17 26 0 26H83m20 0 20 26" fill="none" stroke="url(#preloader-gradient)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" pathLength="1" className="preloader-mark" />
          </svg>
          <div className="mt-4 h-px w-32 overflow-hidden bg-white/10"><motion.div className="h-full origin-left bg-gradient-to-r from-primary via-secondary to-accent" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.35, ease: 'easeInOut' }} /></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Preloader
