import { useEffect, useState } from 'react'

export default function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0]

        if (visibleSection) setActiveSection(visibleSection.target.id)
      },
      { rootMargin: '-96px 0px -55% 0px', threshold: [0.1, 0.35, 0.7] },
    )
    const observedSections = new Set()
    const observeAvailableSections = () => {
      sectionIds
        .map((id) => document.getElementById(id))
        .filter((section) => section && !observedSections.has(section))
        .forEach((section) => {
          observedSections.add(section)
          observer.observe(section)
        })
    }

    observeAvailableSections()
    const mutationObserver = new MutationObserver(observeAvailableSections)
    mutationObserver.observe(document.getElementById('main') || document.body, { childList: true, subtree: true })
    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [sectionIds])

  return activeSection
}
