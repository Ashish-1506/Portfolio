import { motion, useReducedMotion } from 'framer-motion'

/** Props: children and className for a reusable glass content card. */
function Card({ children, className = '', ...props }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      className={`glass relative overflow-hidden rounded-2xl p-6 transition-shadow duration-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-primary/20 before:via-transparent before:to-accent/10 before:opacity-0 before:transition-opacity hover:before:opacity-100 hover:shadow-xl hover:shadow-primary/10 ${className}`}
      {...props}
      whileHover={reduceMotion ? undefined : { y: -5 }}
    >
      <div className="relative z-10">{children}</div>
    </motion.article>
  )
}

export default Card
