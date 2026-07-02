"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingBag, Trash2, X, CheckCircle2 } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { formatPrice } from "@/lib/products"

type View = "cart" | "checkout" | "confirmed"

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
    subtotal,
  } = useCart()
  const [view, setView] = useState<View>("cart")

  const shipping = subtotal > 0 && subtotal < 100 ? 8 : 0
  const total = subtotal + shipping

  const handleClose = () => {
    closeCart()
    // reset to cart view after the drawer animates out
    setTimeout(() => setView("cart"), 200)
  }

  const handlePlaceOrder = (event: React.FormEvent) => {
    event.preventDefault()
    clearCart()
    setView("confirmed")
  }

  return (
    <>
      <div
        role="presentation"
        onClick={handleClose}
        className={`fixed inset-0 z-50 bg-black/60 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Shopping cart"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl transition-transform duration-200 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingBag className="h-5 w-5 text-primary" aria-hidden="true" />
            {view === "checkout" ? "Checkout" : view === "confirmed" ? "Order placed" : `Your Cart (${totalItems})`}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {view === "confirmed" ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary" aria-hidden="true" />
            <h3 className="text-xl font-bold">Thanks for your order!</h3>
            <p className="text-muted-foreground">
              A confirmation is on its way. Your rare finds are being packed with care.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              Keep Shopping
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">
              Add some rare pieces to get started.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="mt-2 rounded-xl border border-border px-6 py-3 font-semibold transition-colors hover:border-primary hover:text-primary"
            >
              Browse Drops
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {view === "cart" ? (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-snug">{item.name}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formatPrice(item.price)}
                        </p>
                        <div className="mt-auto flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-md border border-border p-1 transition-colors hover:border-primary"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-md border border-border p-1 transition-colors hover:border-primary"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <form id="checkout-form" onSubmit={handlePlaceOrder} className="flex flex-col gap-4">
                  <Field label="Full name" name="name" placeholder="Alex Rivera" />
                  <Field label="Email" name="email" type="email" placeholder="alex@example.com" />
                  <Field label="Shipping address" name="address" placeholder="123 Market St" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" name="city" placeholder="Brooklyn" />
                    <Field label="ZIP" name="zip" placeholder="11201" />
                  </div>
                  <Field label="Card number" name="card" placeholder="4242 4242 4242 4242" />
                </form>
              )}
            </div>

            <div className="border-t border-border px-6 py-4">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
              </div>
              <div className="mt-2 flex justify-between text-base font-semibold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>

              {view === "cart" ? (
                <button
                  type="button"
                  onClick={() => setView("checkout")}
                  className="mt-4 w-full rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  Checkout
                </button>
              ) : (
                <div className="mt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setView("cart")}
                    className="rounded-xl border border-border px-4 py-3 font-semibold transition-colors hover:border-primary hover:text-primary"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="flex-1 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
                  >
                    Place Order
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </aside>
    </>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
}) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input
        required
        name={name}
        type={type}
        placeholder={placeholder}
        className="rounded-lg border border-border bg-card px-3 py-2 text-sm outline-none transition-colors focus:border-primary"
      />
    </label>
  )
}
