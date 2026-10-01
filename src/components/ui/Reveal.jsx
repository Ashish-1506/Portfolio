import { motion, useReducedMotion } from 'framer-motion'

const directions = {
  up: { y: 32 },
  down: { y: -32 },
  left: { x: 32 },
  right: { x: -32 },
}

/** Props: direction, delay, duration, distance, and children to reveal on scroll. */
function Reveal({ direction = 'up', delay = 0, duration = 0.6, distance, children, className = '' }) {
  const reduceMotion = useReducedMotion()
  const offset = distance ?? 32
  const initialOffset = directions[direction] || directions.up
  const initial = reduceMotion ? { opacity: 1 } : { opacity: 0, ...Object.fromEntries(Object.keys(initialOffset).map((key) => [key, (initialOffset[key] / 32) * offset])) }

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: reduceMotion ? 0 : duration, delay: reduceMotion ? 0 : delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function Stagger({ children, delay = 0, stagger = 0.1, className = '' }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { delayChildren: reduceMotion ? 0 : delay, staggerChildren: reduceMotion ? 0 : stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
