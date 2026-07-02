"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart-provider"

const links = [
  { label: "Home", href: "#" },
  { label: "Shop", href: "#shop" },
  { label: "Categories", href: "#categories" },
  { label: "New Drops", href: "#new-drops" },
  { label: "Contact", href: "#contact" },
]

export function Navbar() {
  const { totalItems, openCart } = useCart()

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-2xl font-bold tracking-tight text-primary">
          Thrift.x
        </a>

        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={openCart}
          className="relative inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-primary hover:text-primary"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          <span>Cart</span>
          {totalItems > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-xs font-bold text-primary-foreground">
              {totalItems}
            </span>
          )}
        </button>
      </nav>
    </header>
  )
}
