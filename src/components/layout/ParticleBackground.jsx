import { useEffect, useRef } from 'react'

function ParticleBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const context = canvas.getContext('2d')
    const particles = []
    const pointer = { x: -1000, y: -1000 }
    let animationFrame
    let width = 0
    let height = 0
    let visible = true

    function resize() {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * ratio
      canvas.height = height * ratio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      const count = width < 768 ? 25 : 60
      particles.length = 0
      for (let index = 0; index < count; index += 1) {
        particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22, radius: Math.random() * 1.5 + 0.7 })
      }
    }

    function draw() {
      if (!visible) return
      context.clearRect(0, 0, width, height)
      const primary = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim() || '#6366f1'
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#22d3ee'
      particles.forEach((particle) => {
        const dx = particle.x - pointer.x
        const dy = particle.y - pointer.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < 110 && distance > 0) {
          const force = (110 - distance) / 110
          particle.vx += (dx / distance) * force * 0.012
          particle.vy += (dy / distance) * force * 0.012
        }
        particle.x = (particle.x + particle.vx + width) % width
        particle.y = (particle.y + particle.vy + height) % height
        particle.vx *= 0.995
        particle.vy *= 0.995
        context.beginPath()
        context.fillStyle = `${accent}80`
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fill()
      })
      for (let first = 0; first < particles.length; first += 1) {
        for (let second = first + 1; second < particles.length; second += 1) {
          const dx = particles[first].x - particles[second].x
          const dy = particles[first].y - particles[second].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 125) {
            context.beginPath()
            context.strokeStyle = `${primary}${Math.max(10, Math.round((1 - distance / 125) * 45)).toString(16)}`
            context.lineWidth = 0.5
            context.moveTo(particles[first].x, particles[first].y)
            context.lineTo(particles[second].x, particles[second].y)
            context.stroke()
          }
        }
      }
      animationFrame = window.requestAnimationFrame(draw)
    }

    function handlePointerMove(event) {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    function handleVisibilityChange() {
      visible = !document.hidden
      if (visible && !animationFrame) animationFrame = window.requestAnimationFrame(draw)
      if (!visible && animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = undefined
      }
    }

    resize()
    draw()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 opacity-35" aria-hidden="true" />
}

export default ParticleBackground
