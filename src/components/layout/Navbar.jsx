import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { FiCommand, FiDownload, FiMenu, FiMoon, FiSun, FiX } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import navLinks from '../../data/navLinks'
import profile from '../../data/profile'
import useActiveSection from '../../hooks/useActiveSection'
import useTheme from '../../hooks/useTheme'

const sectionIds = navLinks.map(({ id }) => id)

function Navbar({ onOpenCommandPalette }) {
  const [scrolled, setScrolled] = useState(() => window.scrollY > 20)
  const [menuOpen, setMenuOpen] = useState(false)
  const drawerRef = useRef(null)
  const firstLinkRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const activeSection = useActiveSection(sectionIds)
  const { theme, toggleTheme } = useTheme()
  const ThemeIcon = theme === 'dark' ? FiSun : FiMoon

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) {
      document.body.style.overflow = ''
      return undefined
    }

    document.body.style.overflow = 'hidden'
    firstLinkRef.current?.focus()
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        return
      }

      if (event.key !== 'Tab' || !drawerRef.current) return
      const focusableElements = drawerRef.current.querySelectorAll('a, button')
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  function scrollToSection(event, id) {
    event.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const offset = 88
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
      window.history.replaceState(null, '', `#${id}`)
    }
    setMenuOpen(false)
  }

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) setMenuOpen(false)
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'glass border-b border-border shadow-lg shadow-bg/10' : 'bg-transparent'}`}>
        <nav className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-6 md:px-8" aria-label="Primary navigation">
          <a href="#home" onClick={(event) => scrollToSection(event, 'home')} className="group flex min-h-11 items-center gap-3" aria-label="Ashish Ranjan home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-secondary to-accent font-heading text-sm font-bold text-white shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:rotate-3">AR</span>
            <span className="hidden font-heading text-sm font-semibold text-text sm:block">{profile.name}</span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`} onClick={(event) => scrollToSection(event, id)} className={`relative inline-flex min-h-11 items-center rounded-lg px-3 py-2 text-xs font-medium transition-colors ${activeSection === id ? 'text-text' : 'text-muted hover:text-text'}`}>
                {activeSection === id && <motion.span layoutId="active-nav-pill" className="absolute inset-0 -z-10 rounded-lg bg-primary/15" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
                {label}
              </a>
            ))}
            <button type="button" onClick={onOpenCommandPalette} className="ml-2 hidden h-11 items-center gap-2 rounded-lg border border-border px-3 text-muted transition-colors hover:border-primary hover:text-text lg:inline-flex" aria-label="Open command palette" title="Open command palette"><FiCommand aria-hidden="true" /><kbd className="font-mono text-[10px]">Ctrl K</kbd></button>
            <button type="button" onClick={toggleTheme} className="ml-2 inline-flex h-11 w-11 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-accent" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={theme} initial={reduceMotion ? undefined : { rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <ThemeIcon aria-hidden="true" />
                </motion.span>
              </AnimatePresence>
            </button>
            <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="ml-2 inline-flex min-h-11 items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"><FiDownload aria-hidden="true" />Resume</a>
          </div>

          <button type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-text md:hidden" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} aria-controls="mobile-navigation">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={menuOpen ? 'close' : 'open'} initial={reduceMotion ? undefined : { rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                {menuOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={handleBackdropClick}>
            <motion.aside id="mobile-navigation" ref={drawerRef} role="dialog" aria-modal="true" className="ml-auto flex h-full w-[min(85vw,22rem)] flex-col border-l border-border bg-surface px-7 pb-8 pt-28 shadow-2xl" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }} aria-label="Mobile navigation">
              <div className="flex flex-1 flex-col gap-2">
                {navLinks.map(({ id, label }, index) => (
                  <motion.a key={id} ref={index === 0 ? firstLinkRef : undefined} href={`#${id}`} onClick={(event) => scrollToSection(event, id)} className={`rounded-xl px-4 py-3 font-heading text-2xl font-medium ${activeSection === id ? 'bg-primary/15 text-text' : 'text-muted'}`} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: reduceMotion ? 0 : index * 0.05 }}>
                    {label}
                  </motion.a>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-6">
                <button type="button" onClick={toggleTheme} className="inline-flex items-center gap-2 text-sm text-muted" aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}><ThemeIcon aria-hidden="true" /> {theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
                <a href={`${import.meta.env.BASE_URL}resume.pdf`} download className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-2.5 text-sm font-semibold text-white"><FiDownload aria-hidden="true" />Resume</a>
              </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
