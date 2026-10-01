import { AnimatePresence, motion } from 'framer-motion'
import { FiGithub } from 'react-icons/fi'
import { lazy, Suspense } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import projects from '../../data/projects'
import profile from '../../data/profile'
import ProjectCard from '../ui/ProjectCard'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'

const ProjectModal = lazy(() => import('../ui/ProjectModal'))

const categories = ['All', ...new Set(projects.flatMap((project) => project.category))]

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)
  const triggerRef = useRef(null)
  const filteredProjects = selectedCategory === 'All' ? projects : projects.filter((project) => project.category.includes(selectedCategory))
  const closeModal = useCallback(() => setSelectedProject(null), [])

  useEffect(() => {
    function handleCommandProject(event) {
      const project = projects.find((item) => item.id === event.detail?.projectId)
      if (project) {
        triggerRef.current = null
        setSelectedProject(project)
      }
    }

    window.addEventListener('portfolio:open-project', handleCommandProject)
    return () => window.removeEventListener('portfolio:open-project', handleCommandProject)
  }, [])

  function openModal(project, trigger) {
    triggerRef.current = trigger
    setSelectedProject(project)
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className="section border-b border-border/60">
      <Reveal>
        <SectionHeading label="04. Projects" title="Things I Have Built" titleId="projects-title" />
      </Reveal>

      <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
        {categories.map((category) => (
          <button key={category} type="button" onClick={() => setSelectedCategory(category)} className="relative min-h-11 rounded-full border border-border px-4 py-2 text-sm text-muted transition-colors hover:text-text">
            {selectedCategory === category && <motion.span layoutId="project-filter-pill" className="absolute inset-0 -z-0 rounded-full bg-primary/15" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <span className="relative z-10">{category}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="sync" initial={false}>
          {filteredProjects.map((project) => <ProjectCard key={project.id} project={project} onViewDetails={openModal} />)}
        </AnimatePresence>
      </motion.div>

      <Reveal delay={0.15}>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-sm text-muted">
          <span>More projects and code on my GitHub</span>
          <a href={profile.socials.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 py-2 text-text transition-colors hover:border-primary hover:text-accent"><FiGithub aria-hidden="true" />GitHub</a>
        </div>
      </Reveal>

      <Suspense fallback={null}><ProjectModal project={selectedProject} onClose={closeModal} triggerRef={triggerRef} /></Suspense>
    </section>
  )
}

export default Projects
