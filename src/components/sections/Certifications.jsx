import { AnimatePresence, motion } from 'framer-motion'
import { FiArrowUpRight, FiBookOpen, FiCloud, FiCode, FiLock } from 'react-icons/fi'
import { FaGraduationCap } from 'react-icons/fa'
import { useState } from 'react'
import certifications from '../../data/certifications'
import { isUsableLink } from '../../utils/projectLinks'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const categories = ['All', 'Cloud & AI', 'Web Development', 'Programming', 'Security', 'Academic']
const categoryIcons = { 'Cloud & AI': FiCloud, 'Web Development': FiCode, Programming: FiCode, Security: FiLock, Academic: FiBookOpen }

function Certifications() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const filteredCertifications = selectedCategory === 'All' ? certifications : certifications.filter((certification) => certification.category === selectedCategory)

  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section border-b border-border/60">
      <Reveal>
        <SectionHeading label="05. Certifications" title="Certified Skills" titleId="certifications-title" />
      </Reveal>

      <div className="skills-tab-scroll relative mt-10 overflow-x-auto pb-2">
        <div className="flex min-w-max gap-1 rounded-2xl border border-border bg-surface/40 p-1">
          {categories.map((category) => (
            <button key={category} type="button" onClick={() => setSelectedCategory(category)} className={`relative min-h-11 rounded-xl px-4 py-2.5 text-sm transition-colors ${selectedCategory === category ? 'text-text' : 'text-muted hover:text-text'}`}>
              {selectedCategory === category && <motion.span layoutId="certification-category-pill" className="absolute inset-0 -z-0 rounded-xl bg-primary/15" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="mx-auto mt-8 grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="sync" initial={false}>
          {filteredCertifications.map((certification, index) => <CertificationCard key={`${certification.issuer}-${certification.title}`} certification={certification} delay={index * 0.06} />)}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

function CertificationCard({ certification, delay }) {
  const CategoryIcon = categoryIcons[certification.category] || FaGraduationCap
  const hasYear = certification.year && certification.year !== 'TODO'
  const hasScore = certification.score && certification.score !== 'TODO'
  const hasVerifyUrl = isUsableLink(certification.verifyUrl)

  return (
    <Reveal delay={delay}>
      <Card className="certification-card flex h-full min-h-[16rem] flex-col p-6 md:p-7">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary via-secondary to-accent text-white shadow-lg shadow-primary/20">
            <CategoryIcon aria-hidden="true" size={25} />
          </div>
          <div className="min-w-0">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-accent">{certification.category}</p>
            <h3 className="mt-2 text-lg font-semibold leading-tight">{certification.title}</h3>
            <p className="mt-2 text-sm text-muted">{certification.issuer}</p>
            {hasYear && <p className="mt-2 text-xs text-muted">{certification.year}</p>}
          </div>
        </div>
        {hasScore && <div className="mt-5"><Chip>{certification.score}</Chip></div>}
        <div className="mt-auto pt-6">
          {hasVerifyUrl && <Button as="a" href={certification.verifyUrl} target="_blank" rel="noopener noreferrer" size="sm" icon={<FiArrowUpRight aria-hidden="true" />}>View Certificate</Button>}
        </div>
      </Card>
    </Reveal>
  )
}

export default Certifications
