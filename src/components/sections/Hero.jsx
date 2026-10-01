import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { FiAward, FiBookOpen, FiCloud, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import Button from '../ui/Button'
import Reveal from '../ui/Reveal'
import profile from '../../data/profile'

const socialLinks = [
  { label: 'GitHub', href: profile.socials.github, icon: FiGithub },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: FiLinkedin },
  { label: 'Email', href: profile.socials.email, icon: FiMail },
]

const highlightIcons = [FiAward, FiBookOpen, FiCloud]

function Hero() {
  const reduceMotion = useReducedMotion()
  const [photoFailed, setPhotoFailed] = useState(false)
  const [showScrollHint, setShowScrollHint] = useState(true)
  const parallaxX = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })
  const parallaxY = useSpring(useMotionValue(0), { stiffness: 80, damping: 20 })

  useEffect(() => {
    const handleScroll = () => setShowScrollHint(window.scrollY < 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (reduceMotion) return undefined

    const handlePointerMove = (event) => {
      parallaxX.set((event.clientX / window.innerWidth - 0.5) * 16)
      parallaxY.set((event.clientY / window.innerHeight - 0.5) * 12)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [parallaxX, parallaxY, reduceMotion])

  function scrollToSection(event, id) {
    event.preventDefault()
    const target = document.getElementById(id)
    if (!target) return
    const top = target.getBoundingClientRect().top + window.scrollY - 88
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
    window.history.replaceState(null, '', `#${id}`)
  }

  const typingSequence = profile.roles.flatMap((role) => [role, 1800])

  return (
    <section id="home" aria-labelledby="hero-title" className="relative flex min-h-[calc(100vh-4.5rem)] items-center overflow-hidden border-b border-border/60">
      <motion.div className="pointer-events-none absolute -left-32 top-16 h-72 w-72 rounded-full bg-primary/20 blur-3xl" animate={reduceMotion ? undefined : { x: [0, 80, 0], y: [0, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }} aria-hidden="true" />
      <motion.div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-secondary/15 blur-3xl" animate={reduceMotion ? undefined : { x: [0, -70, 0], y: [0, -50, 0] }} transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut', delay: 1 }} aria-hidden="true" />
      <motion.div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-3xl" animate={reduceMotion ? undefined : { x: [0, 60, 0], y: [0, -45, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 2 }} aria-hidden="true" />

      <div className="section relative z-10 grid items-center gap-14 !py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:!py-20">
        <div className="order-2 lg:order-1">
          <Reveal delay={0.05}>
            <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-7 font-heading text-lg text-muted md:text-xl">Hi, I am</p>
            <h1 id="hero-title" className="mt-2 text-[clamp(2.75rem,8vw,6rem)] font-semibold leading-[0.98] tracking-tight text-text">
              <span className="gradient-text">{profile.name}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.23}>
            <div className="mt-6 flex min-h-10 items-center font-heading text-xl font-medium text-text sm:text-2xl md:text-3xl" aria-label="Professional roles">
              {reduceMotion ? profile.roles[0] : <TypeAnimation sequence={typingSequence} wrapper="span" speed={55} repeat={Infinity} cursor />}
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted md:text-lg">{profile.tagline}</p>
          </Reveal>

          <Reveal delay={0.41}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button magnetic href="#projects" onClick={(event) => scrollToSection(event, 'projects')} size="lg">View My Work</Button>
              <Button magnetic as="a" href={`${import.meta.env.BASE_URL}resume.pdf`} download variant="secondary" size="lg" icon={<FiDownload aria-hidden="true" />}>Download Resume</Button>
              <Button magnetic href="#contact" onClick={(event) => scrollToSection(event, 'contact')} variant="ghost" size="lg">Let's Talk</Button>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a key={label} href={href} aria-label={label} title={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} className="glass inline-flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-accent">
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.58}>
            <div className="mt-10 grid max-w-2xl gap-2 sm:grid-cols-3">
              {profile.heroHighlights.map((highlight, index) => {
                const HighlightIcon = highlightIcons[index]
                return <div key={highlight} className="glass flex items-center gap-2 rounded-xl px-3 py-3 font-mono text-[10px] leading-5 text-muted sm:text-[11px]"><HighlightIcon aria-hidden="true" className="shrink-0 text-accent" />{highlight}</div>
              })}
            </div>
          </Reveal>
        </div>

        <motion.div className="relative order-1 mx-auto flex h-[22rem] w-full max-w-[25rem] items-center justify-center sm:h-[30rem] lg:order-2" style={reduceMotion ? undefined : { x: parallaxX, y: parallaxY }}>
          <div className="absolute h-64 w-64 rounded-full bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/20 blur-3xl sm:h-80 sm:w-80" aria-hidden="true" />
          <div className="relative rounded-[2rem] p-[2px] shadow-2xl shadow-primary/20">
            <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[conic-gradient(from_90deg,#6366F1,#A855F7,#22D3EE,#6366F1)]" aria-hidden="true" />
            <div className="relative flex h-64 w-64 items-center justify-center overflow-hidden rounded-[calc(2rem-2px)] bg-surface sm:h-80 sm:w-80">
              {photoFailed ? (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary via-secondary to-accent font-heading text-7xl font-bold text-white">AR</div>
              ) : (
                <img src={`${import.meta.env.BASE_URL}assets/images/Profile.jpeg`} alt="Ashish Ranjan" width="320" height="320" decoding="async" className="h-full w-full object-cover object-top" onError={() => setPhotoFailed(true)} />
              )}
            </div>
          </div>

          {profile.floatingTech.map((technology, index) => (
            <motion.span key={technology} className={`glass absolute rounded-xl px-3 py-2 font-mono text-xs text-text shadow-lg shadow-bg/20 ${['left-0 top-10', 'right-0 top-20', 'left-2 bottom-14', 'right-3 bottom-8', 'left-1/2 top-0 -translate-x-1/2'][index]}`} animate={reduceMotion ? undefined : { y: [0, -8, 0] }} transition={{ duration: 3.5 + index * 0.35, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }}>{technology}</motion.span>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showScrollHint && (
          <motion.div className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduceMotion ? 0 : 0.4 }}>
            <span className="flex h-7 w-4 justify-center rounded-full border border-accent/70 p-1" aria-hidden="true"><motion.span className="h-1.5 w-1.5 rounded-full bg-accent" animate={reduceMotion ? undefined : { y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }} /></span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em]">Scroll to explore</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default Hero
