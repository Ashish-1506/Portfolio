function PlaceholderSection({ id, title }) {
  return (
    <section id={id} className="section flex min-h-[70vh] items-center border-b border-border/60">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Portfolio section</p>
        <h2 className="mt-3 text-4xl font-semibold md:text-6xl">{title}</h2>
      </div>
    </section>
  )
}

export default PlaceholderSection