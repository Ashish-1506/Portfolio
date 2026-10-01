import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiArrowUpRight, FiCheck, FiGithub, FiX } from 'react-icons/fi'
import { useEffect, useRef } from 'react'
import Chip from './Chip'
import { isUsableLink } from '../../utils/projectLinks'

/** Props: project to display, onClose handler, and triggerRef for focus restoration. */
function ProjectModal({ project, onClose, triggerRef }) {
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!project) return undefined
    const trigger = triggerRef?.current
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = dialogRef.current.querySelectorAll('button, a')
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      trigger?.focus()
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose, project, triggerRef])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/70 p-4 backdrop-blur-md sm:items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border bg-surface p-6 shadow-2xl shadow-bg/40 md:p-8" initial={{ opacity: 0, y: 30, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.96 }} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
            <button ref={closeRef} type="button" onClick={onClose} aria-label="Close project details" className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-text"><FiX aria-hidden="true" /></button>
            <p className="pr-12 font-mono text-xs uppercase tracking-[0.16em] text-accent">{project.category.join(' · ')}</p>
            <h2 id="project-modal-title" className="mt-3 pr-12 text-3xl font-semibold leading-tight md:text-4xl">{project.title}</h2>
            <p className="mt-3 text-base text-muted">{project.tagline}</p>
            <ul className="mt-7 space-y-4">
              {project.highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-7 text-muted"><FiCheck aria-hidden="true" className="mt-1 shrink-0 text-accent" />{highlight}</li>)}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">{project.tech.map((technology) => <Chip key={technology}>{technology}</Chip>)}</div>
            <div className="mt-8 flex flex-wrap gap-3">
              {isUsableLink(project.github) && <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm text-muted transition-colors hover:border-primary hover:text-text"><FiGithub aria-hidden="true" />GitHub</a>}
              {isUsableLink(project.demo) && <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white"><FiArrowUpRight aria-hidden="true" />Live Demo</a>}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
