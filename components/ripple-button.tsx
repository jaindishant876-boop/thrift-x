"use client"

import { forwardRef, useState, type ButtonHTMLAttributes, type MouseEvent } from "react"

type Ripple = { id: number; x: number; y: number; size: number }

export const RippleButton = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function RippleButton({ className = "", onClick, children, ...props }, ref) {
    const [ripples, setRipples] = useState<Ripple[]>([])

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      const button = event.currentTarget
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const id = Date.now()
      const ripple: Ripple = {
        id,
        x: event.clientX - rect.left - size / 2,
        y: event.clientY - rect.top - size / 2,
        size,
      }
      setRipples((prev) => [...prev, ripple])
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 600)
      onClick?.(event)
    }

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={`relative overflow-hidden ${className}`}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            className="ripple-span"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
          />
        ))}
        {children}
      </button>
    )
  },
)
