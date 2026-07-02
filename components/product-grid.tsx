import { products } from "@/lib/products"
import { ProductCard } from "@/components/product-card"

export function ProductGrid() {
  return (
    <section id="latest-drops" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Latest Drops</h2>
        <p className="text-muted-foreground">
          Hand-picked one-of-one pieces. Once they&apos;re gone, they&apos;re gone.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
