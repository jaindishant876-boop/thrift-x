import Image from "next/image"
import Link from "next/link"
import { categories } from "@/lib/products"

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-10 flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-balance">
          Shop by Category
        </h2>
        <p className="text-muted-foreground">Find your fit across every corner of the rack.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_-6px_rgba(163,230,53,0.45)]"
          >
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-4">
              <h3 className="text-lg font-bold text-foreground text-balance">{category.name}</h3>
              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Shop
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
