import { motion, useReducedMotion } from 'framer-motion'

/** Props: text to reveal, optional className, and stagger delay between words. */
function WordReveal({ text, className = '', stagger = 0.07 }) {
  const reduceMotion = useReducedMotion()
  const words = text.split(' ')

  return (
    <span className={className} aria-label={text}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.28em] inline-block"><motion.span initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12, filter: 'blur(5px)' }} whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * stagger, ease: 'easeOut' }}>{word}</motion.span>{index < words.length - 1 ? ' ' : ''}</span>
      ))}
    </span>
  )
}

export default WordReveal
