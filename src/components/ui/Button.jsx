import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'

/** Props: variant, size, as, href, icon, children, and standard button/link props. */
function Button({ variant = 'primary', size = 'md', as = 'button', href, icon = true, magnetic = false, children, className = '', ...props }) {
  const reduceMotion = useReducedMotion()
  const ref = useRef(null)
  const [magneticEnabled, setMagneticEnabled] = useState(false)
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 })
  const Component = href || as === 'a' ? motion.a : motion.button
  const sizeClasses = { sm: 'min-h-11 px-3 py-2 text-xs', md: 'min-h-11 px-4 py-2.5 text-sm', lg: 'min-h-11 px-5 py-3 text-base' }
  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary via-secondary to-accent text-white shadow-lg shadow-primary/20',
    secondary: 'glass text-text hover:border-primary/60',
    ghost: 'text-muted hover:bg-surface-2 hover:text-text',
  }

  useEffect(() => {
    if (!magnetic || reduceMotion) return undefined
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const update = () => setMagneticEnabled(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [magnetic, reduceMotion])

  function handlePointerMove(event) {
    if (!magneticEnabled || !ref.current) return
    const bounds = ref.current.getBoundingClientRect()
    x.set((event.clientX - (bounds.left + bounds.width / 2)) * 0.16)
    y.set((event.clientY - (bounds.top + bounds.height / 2)) * 0.16)
  }

  function resetMagnetic() {
    x.set(0)
    y.set(0)
  }

  return (
    <Component
      ref={ref}
      className={`group inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-colors duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      href={href}
      style={magneticEnabled ? { x, y } : undefined}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetMagnetic}
      whileHover={reduceMotion || magneticEnabled ? undefined : { y: -2 }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
      {...props}
    >
      {children}
      {icon && (icon === true ? <FiArrowUpRight aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /> : <span className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">{icon}</span>)}
    </Component>
  )
}

export default Button
