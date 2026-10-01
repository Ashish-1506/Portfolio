import BackToTop from './components/layout/BackToTop'
import CustomCursor from './components/layout/CustomCursor'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Preloader from './components/layout/Preloader'
import ScrollProgress from './components/layout/ScrollProgress'
import Hero from './components/sections/Hero'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import sectionLinks from './data/navLinks'
import config from './data/config'
import PlaceholderSection from './components/sections/PlaceholderSection'

const About = lazy(() => import('./components/sections/About'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Contact = lazy(() => import('./components/sections/Contact'))
const Experience = lazy(() => import('./components/sections/Experience'))
const Projects = lazy(() => import('./components/sections/Projects'))
const Skills = lazy(() => import('./components/sections/Skills'))
const ParticleBackground = lazy(() => import('./components/layout/ParticleBackground'))
const CommandPalette = lazy(() => import('./components/layout/CommandPalette'))

function SectionSkeleton() {
  return <div className="section min-h-[24rem] animate-pulse" aria-hidden="true"><div className="h-8 w-48 rounded-lg bg-surface-2/70" /><div className="mt-6 h-4 max-w-xl rounded bg-surface-2/50" /></div>
}

function App() {
  const reduceMotion = useReducedMotion()
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), [])
  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), [])

  useEffect(() => {
    function handleShortcut(event) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        openCommandPalette()
      }
    }

    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [openCommandPalette])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-bg text-text">
      <a className="skip-link" href="#main">Skip to content</a>
      {config.enablePreloader && <Preloader />}
      {config.enableCursor && <CustomCursor />}
      {config.enableParticles && !reduceMotion && <Suspense fallback={null}><ParticleBackground /></Suspense>}
      <ScrollProgress />
      <Navbar onOpenCommandPalette={openCommandPalette} />
      {commandPaletteOpen && <Suspense fallback={null}><CommandPalette open={commandPaletteOpen} onClose={closeCommandPalette} /></Suspense>}
      <div className="bg-grid pointer-events-none absolute inset-x-0 top-0 h-[42rem] opacity-80" aria-hidden="true" />
      <main id="main" className="relative pt-[4.5rem]">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          {sectionLinks.slice(1).map(({ id, label, title }) => (
            id === 'about' ? <About key={id} /> : id === 'skills' ? <Skills key={id} /> : id === 'experience' ? <Experience key={id} /> : id === 'projects' ? <Projects key={id} /> : id === 'certifications' ? <Certifications key={id} /> : id === 'contact' ? <Contact key={id} /> : <PlaceholderSection key={id} id={id} title={title || label} />
          ))}
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  )
}

export default App
