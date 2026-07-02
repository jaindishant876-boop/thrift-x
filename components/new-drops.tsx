import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

export function NewDrops() {
  const drops = products.filter((product) => product.isNew).slice(0, 4)

  return (
    <section id="new-drops" className="border-y border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-balance">
              New Drops <span aria-hidden="true">🔥</span>
            </h2>
            <p className="text-muted-foreground">
              Freshly sourced pieces added to the rack this week.
            </p>
          </div>
          <Link
            href="#shop"
            className="inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            View All
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {drops.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
