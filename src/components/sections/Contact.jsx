/* EmailJS template variables: from_name, from_email, subject, and message. */
import emailjs from '@emailjs/browser'
import { FiCheck, FiCopy, FiGithub, FiLinkedin, FiLoader, FiMail, FiMapPin, FiSend } from 'react-icons/fi'
import { useEffect, useRef, useState } from 'react'
import profile from '../../data/profile'
import Button from '../ui/Button'
import Card from '../ui/Card'
import Chip from '../ui/Chip'
import Reveal from '../ui/Reveal'
import SectionHeading from '../ui/SectionHeading'
import Toast from '../ui/Toast'

const initialForm = { name: '', email: '', subject: '', message: '', website: '' }
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function Contact() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [toast, setToast] = useState(null)
  const [copied, setCopied] = useState(false)
  const [cooldown, setCooldown] = useState(0)
  const formRef = useRef(null)

  useEffect(() => {
    if (cooldown <= 0) return undefined
    const timer = window.setInterval(() => setCooldown((value) => Math.max(value - 1, 0)), 1000)
    return () => window.clearInterval(timer)
  }, [cooldown])

  function updateField(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
  }

  function validate() {
    const nextErrors = {}
    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) nextErrors.email = 'Please enter your email.'
    else if (!emailPattern.test(form.email)) nextErrors.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) nextErrors.subject = 'Please enter a subject.'
    if (!form.message.trim()) nextErrors.message = 'Please enter a message.'
    else if (form.message.trim().length < 10) nextErrors.message = 'Please use at least 10 characters.'
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  async function handleSubmit(event) {
    event.preventDefault()
    if (form.website || !validate() || status === 'sending' || cooldown > 0) return

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    const templateParams = { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message }

    if (!serviceId || !templateId || !publicKey) {
      console.warn('EmailJS keys are missing. Falling back to a pre-filled mailto link.')
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`
      return
    }

    setStatus('sending')
    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      setStatus('success')
      setCooldown(30)
      setForm(initialForm)
      setToast({ type: 'success', message: 'Thanks for reaching out. Your message has been sent.' })
    } catch (error) {
      console.error('EmailJS submission failed:', error)
      setStatus('idle')
      setToast({ type: 'error', message: 'Something went wrong. Please try again or email me directly.' })
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setToast({ type: 'error', message: 'Unable to copy the email address.' })
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section border-b border-border/60">
      <Reveal><SectionHeading label="06. Contact" title="Let's Work Together" titleId="contact-title" /></Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal direction="left">
          <div>
            <p className="max-w-xl text-base leading-8 text-muted">{profile.contact.intro}</p>
            <div className="mt-7 space-y-3">
              <ContactCard icon={FiMail} label="Email" value={profile.email} href={profile.socials.email} onCopy={copyEmail} copied={copied} />
              <ContactCard icon={FiLinkedin} label="LinkedIn" value="Connect on LinkedIn" href={profile.socials.linkedin} external />
              <ContactCard icon={FiGithub} label="GitHub" value="Explore my code" href={profile.socials.github} external />
              <ContactCard icon={FiMapPin} label="Location" value={profile.location} />
              {profile.showPhone && <ContactCard icon={FiMail} label="Phone" value={profile.phone} href={`tel:${profile.phone}`} />}
            </div>
            <div className="mt-7 flex flex-wrap gap-2">{profile.contact.openTo.map((role) => <Chip key={role}>{role}</Chip>)}</div>
            <Button as="a" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-7">View Resume</Button>
          </div>
        </Reveal>

        <Reveal direction="right" delay={0.1}>
          <Card className="p-6 md:p-8">
            <form ref={formRef} onSubmit={handleSubmit} noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label={profile.contact.form.name} name="name" value={form.name} onChange={updateField} error={errors.name} className="!mt-0" />
                <Field label={profile.contact.form.email} name="email" type="email" value={form.email} onChange={updateField} error={errors.email} className="!mt-0" />
              </div>
              <Field label={profile.contact.form.subject} name="subject" value={form.subject} onChange={updateField} error={errors.subject} />
              <Field label={profile.contact.form.message} name="message" value={form.message} onChange={updateField} error={errors.message} textarea />
              <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" tabIndex="-1" autoComplete="off" value={form.website} onChange={updateField} />
              </div>
              <Button type="submit" magnetic disabled={status === 'sending' || cooldown > 0} className="mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70" icon={false}>
                {status === 'sending' ? <><FiLoader aria-hidden="true" className="animate-spin" />Sending...</> : status === 'success' ? <><FiCheck aria-hidden="true" />Sent successfully</> : <><FiSend aria-hidden="true" />{cooldown > 0 ? `Sent · retry in ${cooldown}s` : 'Send Message'}</>}
              </Button>
            </form>
          </Card>
        </Reveal>
      </div>
      <Toast message={toast?.message} type={toast?.type} onClose={() => setToast(null)} />
    </section>
  )
}

function ContactCard({ icon: Icon, label, value, href, external, onCopy, copied }) {
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-4">
      <Icon aria-hidden="true" className="shrink-0 text-accent" />
      <div className="min-w-0 flex-1"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{label}</p>{href ? <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined} className="mt-1 inline-flex min-h-11 max-w-full items-center truncate text-sm text-text hover:text-accent">{value}</a> : <p className="mt-1 text-sm text-text">{value}</p>}</div>
      {onCopy && <button type="button" onClick={onCopy} aria-label="Copy email address" className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted transition-colors hover:bg-surface-2 hover:text-accent">{copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}</button>}
    </div>
  )
}

function Field({ label, name, value, onChange, error, type = 'text', textarea = false, className = '' }) {
  const fieldId = `contact-${name}`
  const errorId = `${fieldId}-error`
  const Component = textarea ? 'textarea' : 'input'
  return (
    <div className={`relative mt-5 first:mt-0 ${className}`}>
      <Component id={fieldId} name={name} type={textarea ? undefined : type} value={value} onChange={onChange} required aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined} placeholder=" " rows={textarea ? 5 : undefined} className="peer w-full resize-none rounded-xl border border-border bg-bg/40 px-4 pb-3 pt-5 text-sm text-text outline-none transition-colors placeholder:text-transparent focus:border-primary" />
      <label htmlFor={fieldId} className="pointer-events-none absolute left-4 top-3 origin-left text-sm text-muted transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-focus:top-2 peer-focus:scale-90 peer-focus:text-accent peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-90">{label}</label>
      {error && <p id={errorId} className="mt-1 text-xs text-red-400" role="alert">{error}</p>}
    </div>
  )
}

export default Contact
