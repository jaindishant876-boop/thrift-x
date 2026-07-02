import { CartProvider } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { ProductGrid } from "@/components/product-grid"
import { Footer } from "@/components/footer"
import { CartDrawer } from "@/components/cart-drawer"

export default function Home() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main>
          <Hero />
          <ProductGrid />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}
