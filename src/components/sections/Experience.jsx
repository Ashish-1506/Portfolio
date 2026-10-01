import { motion, useReducedMotion } from 'framer-motion'
import { FiCheck, FiCopy, FiExternalLink } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import experience from '../../data/experience'
import publications from '../../data/publications'
import AnimatedCounter from '../ui/AnimatedCounter'
import Button from '../ui/Button'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Timeline from '../ui/Timeline'

function Experience() {
  const publication = publications[0]
  const orderedExperience = [...experience].sort((first, second) => {
    if (first.sortDate === 'TODO') return 1
    if (second.sortDate === 'TODO') return -1
    return second.sortDate.localeCompare(first.sortDate)
  })

  return (
    <section id="experience" aria-labelledby="experience-title" className="section border-b border-border/60">
      <Reveal>
        <SectionHeading label="03. Experience" title="Research & Experience" titleId="experience-title" />
      </Reveal>
      <Timeline entries={orderedExperience} />
      <Reveal delay={0.1}>
        <PublicationCard publication={publication} />
      </Reveal>
    </section>
  )
}

function PublicationCard({ publication }) {
  const reduceMotion = useReducedMotion()
  const [copied, setCopied] = useState(false)
  const copyTimeout = useRef(null)

  useEffect(() => () => clearTimeout(copyTimeout.current), [])

  async function copyDoi() {
    try {
      await navigator.clipboard.writeText(publication.doi)
      setCopied(true)
      clearTimeout(copyTimeout.current)
      copyTimeout.current = setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative mt-8 overflow-hidden rounded-3xl p-px">
      <motion.div className="absolute -inset-[60%] bg-[conic-gradient(from_90deg,#6366F1,#A855F7,#22D3EE,#6366F1)]" animate={reduceMotion ? undefined : { rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} aria-hidden="true" />
      <div className="glass relative overflow-hidden rounded-[calc(1.5rem-1px)] p-6 md:p-8">
        <NetworkDecoration reduceMotion={reduceMotion} />
        <div className="relative z-10 max-w-4xl">
          <p className="inline-flex rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">{publication.venue} · {publication.year}</p>
          <h3 className="mt-5 max-w-3xl text-2xl font-semibold leading-tight md:text-4xl">{publication.title}</h3>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-muted md:text-base">{publication.description}</p>

          <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-2">
            {publication.metrics.map(({ value, label, suffix }) => (
              <div key={label} className="rounded-2xl border border-border bg-surface/60 p-4">
                <p className="text-3xl font-semibold tracking-tight gradient-text"><AnimatedCounter value={value} decimals={2} suffix={suffix} /></p>
                <p className="mt-1 text-xs text-muted">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Chip>DOI: {publication.doi}</Chip>
            <Button as="a" href={publication.url} target="_blank" rel="noopener noreferrer" size="sm" icon={<FiExternalLink aria-hidden="true" />}>Read Paper</Button>
            <button type="button" onClick={copyDoi} className="group inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface/60 px-3 py-2 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-text" aria-label={copied ? 'DOI copied' : 'Copy DOI'}>
              {copied ? <FiCheck aria-hidden="true" className="text-accent" /> : <FiCopy aria-hidden="true" />}
              {copied ? 'Copied!' : 'Copy DOI'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function NetworkDecoration({ reduceMotion }) {
  return (
    <motion.svg viewBox="0 0 320 240" className="pointer-events-none absolute right-[-3rem] top-1/2 hidden h-64 w-80 -translate-y-1/2 text-accent/30 md:block" initial={{ opacity: 0.35 }} animate={reduceMotion ? undefined : { opacity: [0.25, 0.55, 0.25], y: [-6, 6, -6] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M28 62 106 28l86 40 82-32M28 62l84 88 80-82 82 84M106 28l6 122 86-82 0 126M28 190l84-40 80 42 82-68" />
      </g>
      <g fill="currentColor">
        <circle cx="28" cy="62" r="5" /><circle cx="106" cy="28" r="5" /><circle cx="192" cy="68" r="5" /><circle cx="274" cy="36" r="5" /><circle cx="112" cy="150" r="6" /><circle cx="192" cy="68" r="4" /><circle cx="192" cy="194" r="5" /><circle cx="274" cy="126" r="6" /><circle cx="28" cy="190" r="4" />
      </g>
    </motion.svg>
  )
}

export default Experience
