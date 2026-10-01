import { FiActivity, FiAward, FiBookOpen, FiBriefcase, FiCheckCircle, FiCode, FiCpu, FiLayers, FiMapPin, FiServer, FiTarget } from 'react-icons/fi'
import about from '../../data/about'
import education from '../../data/education'
import Card from '../ui/Card'
import Chip from '../ui/Chip'
import Reveal, { Stagger } from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import AnimatedCounter from '../ui/AnimatedCounter'

const iconMap = {
  location: FiMapPin,
  degree: FiBookOpen,
  university: FiBriefcase,
  focus: FiTarget,
  status: FiCheckCircle,
  cgpa: FiAward,
  publication: FiBookOpen,
  projects: FiLayers,
  miou: FiActivity,
  'full-stack': FiCode,
  'ai-ml': FiCpu,
  backend: FiServer,
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section border-b border-border/60">
      <Reveal>
        <SectionHeading label={about.heading.label} title={about.heading.title} titleId="about-title" />
      </Reveal>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Reveal direction="left">
          <div className="space-y-5 text-base leading-8 text-muted md:text-lg">
            {about.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`about-paragraph-${paragraphIndex}`}>
                {paragraph.map(({ text, emphasis }, segmentIndex) => (
                  emphasis ? <strong key={`${text}-${segmentIndex}`} className="font-semibold text-primary">{text}</strong> : text
                ))}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <Card>
            <h3 className="text-xl font-semibold">{about.quickFactsTitle}</h3>
            <div className="mt-5 divide-y divide-border/70">
              {about.quickFacts.map(({ label, value, iconKey }) => {
                const Icon = iconMap[iconKey]
                return (
                  <div key={label} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                    <Icon aria-hidden="true" className="mt-1 shrink-0 text-accent" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>
                      <p className="mt-1 text-sm leading-6 text-text">{value}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Card>
        </Reveal>
      </div>

      <Stagger className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {about.stats.map(({ value, decimals, suffix, label, iconKey }) => {
          const Icon = iconMap[iconKey]
          return (
            <Reveal key={label}>
              <Card className="h-full">
                <Icon aria-hidden="true" className="text-accent" />
                <p className="mt-5 text-3xl font-semibold tracking-tight text-text md:text-4xl"><AnimatedCounter value={value} decimals={decimals} suffix={suffix} /></p>
                <p className="mt-2 text-sm leading-6 text-muted">{label}</p>
              </Card>
            </Reveal>
          )
        })}
      </Stagger>

      <div className="mt-16">
        <Reveal>
          <h3 className="font-heading text-2xl font-semibold md:text-3xl">{about.whatDoTitle}</h3>
        </Reveal>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {about.whatDo.map(({ title, description, iconKey }, index) => {
            const Icon = iconMap[iconKey]
            return (
              <Reveal key={title} direction="up" delay={index * 0.08}>
                <Card className="h-full">
                  <Icon aria-hidden="true" className="text-accent" size={24} />
                  <h4 className="mt-5 text-lg font-semibold">{title}</h4>
                  <p className="mt-2 text-sm leading-7 text-muted">{description}</p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </div>

      <Reveal direction="up" delay={0.1}>
        <div className="relative mt-8 border-l border-primary/40 pl-6 md:pl-8">
          <EducationEntry featured icon={FiBookOpen} title={`${education.degree}, ${education.field}`} institution={education.institution} meta={`${about.educationLabels.expected} ${education.expectedGraduation} · ${about.educationLabels.cgpa} ${education.cgpa}`}>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">{about.educationLabels.coursework}</p>
            <Stagger className="mt-3 flex flex-wrap gap-2" stagger={0.05}>
              {education.relevantCoursework.map((course) => <Reveal key={course}><Chip>{course}</Chip></Reveal>)}
            </Stagger>
          </EducationEntry>
          {education.schoolEducation.map((school) => <EducationEntry key={school.level} title={school.level} institution={school.institution} meta={school.year !== 'TODO' ? school.year : ''} percentage={school.percentage} />)}
        </div>
      </Reveal>
    </section>
  )
}

function EducationEntry({ featured = false, icon: Icon = FiBookOpen, title, institution, meta, percentage, children }) {
  return (
    <div className="relative pb-6 last:pb-0">
      <span className="absolute -left-[2rem] top-5 flex h-3 w-3 rounded-full border-2 border-bg bg-accent md:-left-[2.35rem]" aria-hidden="true" />
      <Card className={featured ? 'border-primary/40' : 'bg-surface/45'}>
        <div className="flex gap-4">
          {featured && <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary"><Icon aria-hidden="true" size={22} /></div>}
          <div className="min-w-0 flex-1">
            <h3 className={featured ? 'text-xl font-semibold' : 'text-lg font-medium'}>{title}</h3>
            <p className="mt-1 text-sm text-muted">{institution}</p>
            <div className="mt-3 flex flex-wrap items-center gap-3 font-mono text-xs text-accent">
              {meta && <span>{meta}</span>}
              {percentage !== undefined && <span><AnimatedCounter value={percentage} decimals={1} suffix="%" /></span>}
            </div>
            {children && <div className="mt-5">{children}</div>}
          </div>
        </div>
      </Card>
    </div>
  )
}

export default About
