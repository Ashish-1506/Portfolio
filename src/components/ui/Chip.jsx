import { motion, useReducedMotion } from 'framer-motion'

/** Props: children label and optional className. */
function Chip({ children, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.span
      className={`inline-flex rounded-full border border-border bg-surface/70 px-3 py-1.5 font-mono text-xs text-muted transition-colors ${className}`}
      whileHover={reduceMotion ? undefined : { y: -2, borderColor: 'var(--primary)', color: 'var(--text)' }}
    >
      {children}
    </motion.span>
  )
}

export default Chip
