import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { FiArrowUpRight, FiCpu, FiGithub, FiLayers, FiServer } from 'react-icons/fi'
import { useState } from 'react'
import Chip from './Chip'
import { isUsableLink } from '../../utils/projectLinks'

const fallbackStyles = {
  cogniflow: { gradient: 'from-primary/80 via-secondary/60 to-accent/60', icon: FiCpu },
  resilio: { gradient: 'from-accent/70 via-primary/60 to-secondary/70', icon: FiServer },
  interviewai: { gradient: 'from-secondary/80 via-primary/65 to-accent/60', icon: FiLayers },
}

/** Props: project data and onViewDetails callback for opening its modal. */
function ProjectCard({ project, onViewDetails }) {
  const reduceMotion = useReducedMotion()
  const [imageFailed, setImageFailed] = useState(false)
  const [pointer, setPointer] = useState({ x: 50, y: 50 })
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 18 })
  const tiltX = useTransform(rotateX, [-0.5, 0.5], ['6deg', '-6deg'])
  const tiltY = useTransform(rotateY, [-0.5, 0.5], ['-6deg', '6deg'])
  const fallback = fallbackStyles[project.id] || fallbackStyles.cogniflow
  const FallbackIcon = fallback.icon
  const visibleTech = project.tech.slice(0, 5)
  const remainingTech = project.tech.length - visibleTech.length
  const usableImage = isUsableLink(project.image) && !imageFailed
  const imageSource = project.image.startsWith('http') ? project.image : `${import.meta.env.BASE_URL}${project.image}`

  function handlePointerMove(event) {
    if (reduceMotion || event.pointerType === 'touch') return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height
    rotateY.set(x - 0.5)
    rotateX.set(y - 0.5)
    setPointer({ x: x * 100, y: y * 100 })
  }

  function resetPointer() {
    rotateX.set(0)
    rotateY.set(0)
    setPointer({ x: 50, y: 50 })
  }

  return (
    <motion.article
      layout
      className="project-card group h-full [perspective:1000px]"
      style={reduceMotion ? undefined : { rotateX: tiltX, rotateY: tiltY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
    >
      <div className="glass relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 transition-shadow duration-300 group-hover:shadow-2xl group-hover:shadow-primary/10">
        <div className={`relative h-48 shrink-0 overflow-hidden bg-gradient-to-br ${fallback.gradient}`}>
          {usableImage ? <img src={imageSource} alt={`${project.title} preview`} width="640" height="320" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" onError={() => setImageFailed(true)} /> : <div className="bg-grid flex h-full items-center justify-center opacity-90"><FallbackIcon aria-hidden="true" className="text-white/70" size={68} /></div>}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(circle at ${pointer.x}% ${pointer.y}%, rgba(255,255,255,0.18), transparent 34%)` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
          <div className="absolute bottom-4 left-5 flex flex-wrap gap-2">
            {project.category.map((category) => <span key={category} className="rounded-full border border-white/20 bg-bg/35 px-2.5 py-1 font-mono text-[10px] text-white backdrop-blur-sm">{category}</span>)}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-semibold leading-tight text-text">{project.title}</h3>
          <p className="mt-2 font-mono text-xs leading-5 text-accent">{project.tagline}</p>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">{project.description}</p>
          <div className="mt-5 flex min-h-8 flex-wrap gap-2">
            {visibleTech.map((technology) => <Chip key={technology}>{technology}</Chip>)}
            {remainingTech > 0 && <Chip>+{remainingTech}</Chip>}
          </div>
          <div className="mt-auto flex items-center gap-2 pt-6">
            {isUsableLink(project.github) && <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} GitHub repository`} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-accent"><FiGithub aria-hidden="true" /></a>}
            {isUsableLink(project.demo) && <a href={project.demo} target="_blank" rel="noreferrer" aria-label={`${project.title} live demo`} className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border text-muted transition-colors hover:border-primary hover:text-accent"><FiArrowUpRight aria-hidden="true" /></a>}
            <button type="button" onClick={(event) => onViewDetails(project, event.currentTarget)} className="ml-auto inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-3 py-2.5 text-xs font-semibold text-white transition-transform hover:-translate-y-0.5">View Details <FiArrowUpRight aria-hidden="true" /></button>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default ProjectCard
