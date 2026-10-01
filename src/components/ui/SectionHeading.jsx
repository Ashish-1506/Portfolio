import { motion, useReducedMotion } from 'framer-motion'
import WordReveal from './WordReveal'

/** Props: label, title, optional titleId, and alignment className. */
function SectionHeading({ label, title, titleId, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={`space-y-3 ${className}`}>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{label}</p>
      <h2 id={titleId} className="text-3xl font-semibold tracking-tight text-text md:text-4xl"><WordReveal text={title} /></h2>
      <motion.div
        className="h-1 w-16 origin-left rounded-full bg-gradient-to-r from-primary via-secondary to-accent"
        initial={reduceMotion ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      />
    </div>
  )
}

export default SectionHeading
