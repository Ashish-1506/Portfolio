import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'

/** Props: value, decimals, suffix, prefix, and duration in milliseconds. */
function AnimatedCounter({ value, decimals = 0, suffix = '', prefix = '', duration = 1400 }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.8 })
  const reduceMotion = useReducedMotion()
  const [count, setCount] = useState(reduceMotion ? value : 0)

  useEffect(() => {
    if (!isInView) return undefined
    if (reduceMotion) return undefined

    let frameId
    const startedAt = performance.now()
    const animate = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setCount(value * easedProgress)
      if (progress < 1) frameId = requestAnimationFrame(animate)
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [duration, isInView, reduceMotion, value])

  const displayedCount = reduceMotion ? value : count

  return <span ref={ref}>{prefix}{displayedCount.toFixed(decimals)}{suffix}</span>
}

export default AnimatedCounter
