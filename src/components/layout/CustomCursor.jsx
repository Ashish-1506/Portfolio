import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

function CustomCursor() {
  const reduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [projectHover, setProjectHover] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.35 })
  const ringY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.35 })

  useEffect(() => {
    if (reduceMotion) return undefined
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const updateEnabled = () => setEnabled(query.matches)
    updateEnabled()
    query.addEventListener('change', updateEnabled)
    return () => query.removeEventListener('change', updateEnabled)
  }, [reduceMotion])

  useEffect(() => {
    if (!enabled) return undefined
    const handleMove = (event) => {
      x.set(event.clientX)
      y.set(event.clientY)
      const target = event.target instanceof Element ? event.target.closest('a, button, article') : null
      setHovered(Boolean(target))
      setProjectHover(Boolean(event.target instanceof Element && event.target.closest('.project-card')))
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [enabled, x, y])

  if (!enabled) return null

  return (
    <>
      <motion.span className="pointer-events-none fixed left-0 top-0 z-[110] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" style={{ x, y }} aria-hidden="true" />
      <motion.span className="pointer-events-none fixed left-0 top-0 z-[109] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/70 text-[9px] font-medium uppercase tracking-widest text-accent" style={{ x: ringX, y: ringY, width: hovered ? 48 : 28, height: hovered ? 48 : 28 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} aria-hidden="true">{projectHover ? 'View' : ''}</motion.span>
    </>
  )
}

export default CustomCursor
