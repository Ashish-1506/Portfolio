import { motion, useInView, useReducedMotion, useScroll } from 'framer-motion'
import { FiAward, FiCheck, FiExternalLink } from 'react-icons/fi'
import { useRef } from 'react'
import Card from './Card'
import Chip from './Chip'
import Reveal from './Reveal'
import { isUsableLink } from '../../utils/projectLinks'

/** Props: entries with role, year, organization, highlights, and tech fields. */
function Timeline({ entries }) {
  const timelineRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 0.75', 'end 0.3'] })

  return (
    <div ref={timelineRef} className="relative mt-10">
      <div className="absolute bottom-0 left-4 top-0 w-px bg-border md:left-1/2 md:-translate-x-1/2" aria-hidden="true">
        <motion.div className="h-full w-full origin-top bg-gradient-to-b from-primary via-secondary to-accent" style={{ scaleY: reduceMotion ? 1 : scrollYProgress }} />
      </div>

      {entries.map((entry, index) => <TimelineEntry key={`${entry.role}-${entry.year}-${index}`} entry={entry} index={index} reduceMotion={reduceMotion} />)}
    </div>
  )
}

function TimelineEntry({ entry, index, reduceMotion }) {
  const entryRef = useRef(null)
  const reached = useInView(entryRef, { once: true, amount: 0.35 })
  const isLeft = index % 2 === 0

  return (
    <div ref={entryRef} className="relative grid pb-10 md:grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] md:gap-0 last:pb-0">
      <motion.div className="absolute left-4 top-7 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full border-2 border-bg bg-accent md:left-1/2" animate={reached && !reduceMotion ? { scale: [1, 1.25, 1], boxShadow: ['0 0 0 rgba(34,211,238,0)', '0 0 18px rgba(34,211,238,0.8)', '0 0 0 rgba(34,211,238,0)'] } : { scale: 1 }} transition={reached && !reduceMotion ? { duration: 2.2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0 }} aria-hidden="true" />
      <div className={`ml-10 md:ml-0 ${isLeft ? 'md:col-start-1 md:row-start-1 md:mr-8' : 'md:col-start-3 md:row-start-1 md:ml-8'}`}>
        <Reveal direction={isLeft ? 'left' : 'right'}>
          <Card className={entry.featured ? 'border-primary/50 shadow-lg shadow-primary/10' : ''}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                {entry.year && entry.year !== 'TODO' && <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{entry.year}</p>}
                <h3 className="mt-2 text-xl font-semibold">{entry.role}</h3>
              </div>
              <span className="rounded-full border border-border bg-surface-2/60 px-3 py-1 text-xs text-muted">{entry.type}</span>
            </div>
            <p className="mt-3 text-sm font-medium text-text">{entry.organization}</p>
            {entry.highlights?.filter((highlight) => highlight !== 'TODO').length > 0 && <ul className="mt-5 space-y-3">
              {entry.highlights.filter((highlight) => highlight !== 'TODO').map((highlight) => (
                <li key={highlight} className="flex gap-3 text-sm leading-6 text-muted"><FiCheck aria-hidden="true" className="mt-1 shrink-0 text-accent" />{highlight}</li>
              ))}
            </ul>}
            {entry.tech?.filter((technology) => technology !== 'TODO').length > 0 && <div className="mt-6 flex flex-wrap gap-2">
              {entry.tech.filter((technology) => technology !== 'TODO').map((technology) => <Chip key={technology}>{technology}</Chip>)}
            </div>}
            {entry.certificates && <div className="mt-6 flex flex-wrap gap-2">
              {isUsableLink(entry.certificates.research) && <a href={entry.certificates.research} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-primary hover:text-text"><FiExternalLink aria-hidden="true" />Research Internship Certificate</a>}
              {isUsableLink(entry.certificates.completion) && <a href={entry.certificates.completion} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-primary hover:text-text"><FiExternalLink aria-hidden="true" />Completion Certificate</a>}
              {isUsableLink(entry.certificates.appreciation) && <a href={entry.certificates.appreciation} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-primary hover:text-text"><FiExternalLink aria-hidden="true" />Appreciation Certificate</a>}
            </div>}
            {entry.appreciationReceived && <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 text-xs text-accent"><FiAward aria-hidden="true" />Appreciation received</span>}
          </Card>
        </Reveal>
      </div>
    </div>
  )
}

export default Timeline
