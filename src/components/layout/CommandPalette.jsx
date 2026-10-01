import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useId, useRef, useState } from 'react'
import { FiBookOpen, FiCommand, FiCopy, FiDownload, FiExternalLink, FiFolder, FiGrid, FiHome, FiLinkedin, FiMail, FiMoon, FiSun, FiUser } from 'react-icons/fi'
import projects from '../../data/projects'
import publications from '../../data/publications'
import navLinks from '../../data/navLinks'
import profile from '../../data/profile'
import useTheme from '../../hooks/useTheme'

const baseResumePath = `${import.meta.env.BASE_URL}resume.pdf`

const sectionIcons = {
  home: FiHome,
  about: FiUser,
  skills: FiGrid,
  experience: FiBookOpen,
  projects: FiFolder,
  certifications: FiBookOpen,
  contact: FiMail,
}

function matchesQuery(label, query) {
  const normalizedLabel = label.toLowerCase()
  const normalizedQuery = query.trim().toLowerCase()
  if (!normalizedQuery) return true
  if (normalizedLabel.includes(normalizedQuery)) return true

  let queryIndex = 0
  for (const character of normalizedLabel) {
    if (character === normalizedQuery[queryIndex]) queryIndex += 1
    if (queryIndex === normalizedQuery.length) return true
  }
  return false
}

function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return
  const top = target.getBoundingClientRect().top + window.scrollY - 88
  window.scrollTo({ top, behavior: 'smooth' })
  window.history.replaceState(null, '', `#${id}`)
}

function CommandPalette({ open, onClose }) {
  const { theme, toggleTheme } = useTheme()
  const reduceMotion = useReducedMotion()
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const paletteRef = useRef(null)
  const restoreFocusRef = useRef(null)
  const listId = useId()

  const commands = [
    ...navLinks.map(({ id, label }) => ({ id: `section-${id}`, label: `Go to ${label}`, group: 'Navigate', icon: sectionIcons[id] || FiGrid, action: () => scrollToSection(id) })),
    { id: 'download-resume', label: 'Download Resume', group: 'Actions', icon: FiDownload, action: () => window.location.assign(baseResumePath) },
    { id: 'open-github', label: 'Open GitHub', group: 'Actions', icon: FiExternalLink, action: () => window.open(profile.socials.github, '_blank', 'noopener,noreferrer') },
    { id: 'open-linkedin', label: 'Open LinkedIn', group: 'Actions', icon: FiLinkedin, action: () => window.open(profile.socials.linkedin, '_blank', 'noopener,noreferrer') },
    { id: 'copy-email', label: 'Copy Email', group: 'Actions', icon: FiCopy, action: copyEmail },
    { id: 'toggle-theme', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, group: 'Actions', icon: theme === 'dark' ? FiSun : FiMoon, action: toggleTheme },
    ...projects.map((project) => ({ id: `project-${project.id}`, label: `View ${project.title}`, group: 'Projects', icon: FiFolder, action: () => { scrollToSection('projects'); window.dispatchEvent(new CustomEvent('portfolio:open-project', { detail: { projectId: project.id } })) } })),
    ...publications.map((publication) => ({ id: `publication-${publication.doi}`, label: 'Read the Publication', group: 'Research', icon: FiBookOpen, action: () => window.open(publication.url, '_blank', 'noopener,noreferrer') })),
  ]

  const filteredCommands = commands.filter((command) => matchesQuery(command.label, query))
  const activeCommand = filteredCommands[activeIndex]
  const activeCommandRef = useRef(activeCommand)
  const filteredCountRef = useRef(filteredCommands.length)
  useEffect(() => {
    activeCommandRef.current = activeCommand
    filteredCountRef.current = filteredCommands.length
  }, [activeCommand, filteredCommands.length])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
    } catch {
      window.location.assign(`mailto:${profile.email}`)
    }
  }

  useEffect(() => {
    if (!open) return undefined
    restoreFocusRef.current = document.activeElement
    window.setTimeout(() => inputRef.current?.focus(), 0)
    document.body.style.overflow = 'hidden'

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((index) => Math.min(index + 1, Math.max(filteredCountRef.current - 1, 0)))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((index) => Math.max(index - 1, 0))
      } else if (event.key === 'Enter' && activeCommandRef.current) {
        event.preventDefault()
        activeCommandRef.current.action()
        onClose()
      }

      if (event.key !== 'Tab' || !paletteRef.current) return
      const focusable = paletteRef.current.querySelectorAll('input, button')
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
      document.removeEventListener('keydown', handleKeyDown)
      restoreFocusRef.current?.focus?.()
    }
  }, [onClose, open])

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose()
  }

  function selectCommand(command) {
    command.action()
    onClose()
  }

  const groupedCommands = filteredCommands.reduce((groups, command) => {
    if (!groups[command.group]) groups[command.group] = []
    groups[command.group].push(command)
    return groups
  }, {})

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-start justify-center bg-bg/70 p-4 pt-[10vh] backdrop-blur-md sm:p-6 sm:pt-[14vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={handleBackdropClick}>
          <motion.div ref={paletteRef} role="dialog" aria-modal="true" aria-labelledby="command-palette-title" className="w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-bg/50" initial={{ opacity: 0, y: -18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: reduceMotion ? 0 : 0.2 }}>
            <h2 id="command-palette-title" className="sr-only">Command palette</h2>
            <div className="flex items-center gap-3 border-b border-border px-4">
              <FiCommand aria-hidden="true" className="shrink-0 text-accent" />
              <input ref={inputRef} type="search" value={query} onChange={(event) => { setQuery(event.target.value); setActiveIndex(0) }} placeholder="Search commands..." aria-label="Search commands" aria-controls={listId} aria-activedescendant={activeCommand ? `${listId}-${activeCommand.id}` : undefined} className="h-14 min-w-0 flex-1 bg-transparent text-sm text-text outline-none placeholder:text-muted" />
              <kbd className="hidden rounded-md border border-border px-2 py-1 font-mono text-[10px] text-muted sm:inline">ESC</kbd>
            </div>
            <div id={listId} role="listbox" aria-label="Commands" className="max-h-[min(60vh,30rem)] overflow-y-auto p-2">
              {Object.entries(groupedCommands).map(([group, groupCommands], groupIndex) => (
                <div key={group}>
                  <p className="px-3 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{group}</p>
                  {groupCommands.map((command, commandIndex) => {
                    const currentIndex = Object.values(groupedCommands).slice(0, groupIndex).reduce((count, commandsInGroup) => count + commandsInGroup.length, commandIndex)
                    const Icon = command.icon
                    return <button key={command.id} id={`${listId}-${command.id}`} type="button" role="option" aria-selected={currentIndex === activeIndex} onMouseEnter={() => setActiveIndex(currentIndex)} onClick={() => selectCommand(command)} className={`flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors ${currentIndex === activeIndex ? 'bg-primary/15 text-text' : 'text-muted hover:bg-surface-2 hover:text-text'}`}><Icon aria-hidden="true" className="shrink-0 text-accent" /><span className="min-w-0 flex-1 truncate">{command.label}</span><span className="hidden font-mono text-[10px] text-muted sm:block">Enter</span></button>
                  })}
                </div>
              ))}
              {!filteredCommands.length && <p className="px-3 py-8 text-center text-sm text-muted">No matching commands.</p>}
            </div>
            <div className="flex items-center justify-between border-t border-border px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"><span>Navigate with arrows</span><span>Enter to select</span></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
