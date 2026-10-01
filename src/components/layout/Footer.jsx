import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'
import navLinks from '../../data/navLinks'
import profile from '../../data/profile'

const socialLinks = [
  { label: 'GitHub', href: profile.socials.github, icon: FiGithub },
  { label: 'LinkedIn', href: profile.socials.linkedin, icon: FiLinkedin },
  { label: 'Email', href: profile.socials.email, icon: FiMail },
]

const currentYear = new Date().getFullYear()

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <p className="font-heading text-xl font-semibold">{profile.name}</p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-muted">{profile.tagline}</p>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Explore</p>
          <nav className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3" aria-label="Footer navigation">
            {navLinks.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="inline-flex min-h-11 items-center text-sm text-muted transition-colors hover:text-text">{label}</a>
            ))}
          </nav>
        </div>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Connect</p>
          <div className="mt-4 flex gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass inline-flex h-11 w-11 items-center justify-center rounded-xl text-muted transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-accent"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border px-6 py-5 text-center font-mono text-[11px] text-muted md:px-8">
        © {currentYear} {profile.name}. Built with React, Tailwind CSS and Framer Motion.
      </div>
    </footer>
  )
}

export default Footer
