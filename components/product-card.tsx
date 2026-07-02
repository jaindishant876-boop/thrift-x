"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Heart } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatPrice, type Product } from "@/lib/products"

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [wishlisted, setWishlisted] = useState(false)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_30px_-6px_rgba(163,230,53,0.45)]">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {discount > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-primary-foreground">
            -{discount}%
          </span>
        )}
        <button
          type="button"
          onClick={() => setWishlisted((v) => !v)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground backdrop-blur transition-colors hover:text-primary"
        >
          <Heart
            className={`h-4 w-4 transition-all ${wishlisted ? "fill-primary text-primary" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">
            {product.brand}
          </p>
          <span className="text-[10px] uppercase tracking-wide text-muted-foreground">
            {product.condition}
          </span>
        </div>
        <h3 className="mt-1 font-semibold leading-snug text-pretty">{product.name}</h3>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
            aria-label={`Add ${product.name} to cart`}
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
