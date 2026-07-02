export function Hero() {
  return (
    <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center md:py-32">
      <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground">
        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        New drop every Friday
      </span>

      <h1 className="max-w-3xl text-balance text-5xl font-extrabold leading-tight tracking-tight md:text-7xl">
        Wear Rare. Own the Street.
      </h1>

      <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
        Premium thrift fashion, limited drops, and one-of-one pieces at prices that
        actually make sense.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <a
          href="#shop"
          className="rounded-xl bg-primary px-7 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
        >
          Shop Now
        </a>
        <a
          href="#shop"
          className="rounded-xl border border-border px-7 py-3 font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          Explore Collection
        </a>
      </div>
    </section>
  )
}
