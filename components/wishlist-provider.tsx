"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

const STORAGE_KEY = "thriftx:wishlist"

type WishlistContextValue = {
  ids: string[]
  isWishlisted: (id: string) => boolean
  toggle: (id: string) => void
  remove: (id: string) => void
  count: number
}

const WishlistContext = createContext<WishlistContextValue | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Load persisted wishlist on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) setIds(JSON.parse(raw))
    } catch {
      // ignore malformed storage
    }
    setHydrated(true)
  }, [])

  // Persist whenever it changes (after initial hydration)
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      // ignore quota/security errors
    }
  }, [ids, hydrated])

  const toggle = (id: string) =>
    setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))

  const remove = (id: string) => setIds((prev) => prev.filter((x) => x !== id))

  const value: WishlistContextValue = {
    ids,
    isWishlisted: (id: string) => ids.includes(id),
    toggle,
    remove,
    count: ids.length,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider")
  return context
}
