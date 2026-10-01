import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'
import skills from '../../data/skills'
import { getSkillIcon } from '../../utils/skillIcons'
import Card from '../ui/Card'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

function SkillItem({ skill }) {
  const { icon: Icon, color } = getSkillIcon(skill.iconKey)

  return (
    <motion.div layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }}>
      <Card className="group h-full min-h-[8.5rem] p-5" style={{ '--skill-color': color }}>
        <Icon aria-hidden="true" size={28} className="text-muted transition-colors duration-300 group-hover:text-[var(--skill-color)]" />
        <p className="mt-5 text-sm font-medium leading-6 text-text">{skill.name}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{skill.category}</p>
      </Card>
    </motion.div>
  )
}

function MarqueeRow({ row, reverse = false }) {
  const reduceMotion = useReducedMotion()
  const loopedRow = [...row, ...row]

  return (
    <div className="skills-marquee">
      <div className={`skills-marquee-track ${reverse ? 'reverse' : ''}`} style={reduceMotion ? { animationPlayState: 'paused' } : undefined}>
        {loopedRow.map((skill, index) => {
          const { icon: Icon, color } = getSkillIcon(skill.iconKey)
          return (
            <div key={`${skill.name}-${index}`} className="mr-3 inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border bg-surface/60 px-3 py-2 font-mono text-xs text-muted">
              <Icon aria-hidden="true" style={{ color }} />
              {skill.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Skills() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredSkills = selectedCategory === 'All' ? skills : skills.filter((skill) => skill.category === selectedCategory)
  const midpoint = Math.ceil(skills.length / 2)

  return (
    <section id="skills" aria-labelledby="skills-title" className="section border-b border-border/60">
      <Reveal>
        <SectionHeading label={skills.heading.label} title={skills.heading.title} titleId="skills-title" />
        <p className="mt-5 max-w-2xl text-base leading-7 text-muted">{skills.coreStackNote}</p>
      </Reveal>

      <div className="skills-tab-scroll relative mt-10 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-1 rounded-2xl border border-border bg-surface/40 p-1">
          {skills.categories.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`relative min-h-11 rounded-xl px-4 py-2.5 text-sm transition-colors ${selectedCategory === category ? 'text-text' : 'text-muted hover:text-text'}`}>
              {selectedCategory === category && <motion.span layoutId="skills-category-pill" className="absolute inset-0 -z-0 rounded-xl bg-primary/15" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence mode="sync" initial={false}>
          {filteredSkills.map((skill) => <SkillItem key={skill.name} skill={skill} />)}
        </AnimatePresence>
      </motion.div>

      <div className="mt-12 space-y-3" aria-label="Technology marquee">
        <MarqueeRow row={skills.slice(0, midpoint)} />
        <MarqueeRow row={skills.slice(midpoint)} reverse />
      </div>
    </section>
  )
}

export default Skills
