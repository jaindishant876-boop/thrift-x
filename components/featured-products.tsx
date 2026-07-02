"use client"

import { useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

const FILTERS = ["Under ₹999", "Oversized", "Vintage", "Streetwear", "Nike", "Adidas"] as const
type Filter = (typeof FILTERS)[number]

const BUDGET_FILTER: Filter = "Under ₹999"
const BUDGET_MAX = 50

export function FeaturedProducts() {
  const [query, setQuery] = useState("")
  const [active, setActive] = useState<Filter[]>([])

  const toggleFilter = (filter: Filter) =>
    setActive((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter],
    )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return products.filter((product) => {
      const matchesQuery =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q)

      const matchesFilters =
        active.length === 0 ||
        active.every((filter) => {
          if (filter === BUDGET_FILTER) return product.price <= BUDGET_MAX
          return (product.tags ?? []).includes(filter)
        })

      return matchesQuery && matchesFilters
    })
  }, [query, active])

  return (
    <section id="shop" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-balance">
          Featured Products
        </h2>
        <p className="text-muted-foreground">
          Premium thrifted staples, hand-picked and priced to move.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative mb-5 max-w-xl">
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brands, styles, categories..."
          aria-label="Search products"
          className="w-full rounded-full border border-border bg-card py-3 pl-12 pr-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40"
        />
      </div>

      {/* Filter chips */}
      <div className="mb-10 flex flex-wrap items-center gap-2">
        {FILTERS.map((filter) => {
          const isActive = active.includes(filter)
          return (
            <button
              key={filter}
              type="button"
              onClick={() => toggleFilter(filter)}
              aria-pressed={isActive}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-foreground"
              }`}
            >
              {filter}
            </button>
          )
        })}
        {active.length > 0 && (
          <button
            type="button"
            onClick={() => setActive([])}
            className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-border bg-card px-6 py-16 text-center text-muted-foreground">
          No pieces match your search. Try clearing your filters.
        </p>
      )}
    </section>
  )
}
