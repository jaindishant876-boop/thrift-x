export type Product = {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  image: string
  condition: string
  description: string
  tags?: string[]
  isNew?: boolean
}

export const products: Product[] = [
  {
    id: "denim-jacket",
    name: "Vintage Washed Denim Jacket",
    brand: "Levi's",
    category: "Outerwear",
    price: 68,
    originalPrice: 120,
    image: "/products/denim-jacket.png",
    condition: "Excellent",
    description:
      "Classic mid-wash denim trucker jacket with a broken-in feel. One-of-one thrifted piece.",
    tags: ["Vintage", "Streetwear"],
  },
  {
    id: "graphic-tee",
    name: "Oversized Graphic Tee",
    brand: "Nike",
    category: "Oversized T-Shirts",
    price: 24,
    originalPrice: 40,
    image: "/products/graphic-tee.png",
    condition: "Good",
    description:
      "Boxy fit vintage print tee in soft cotton. A staple layer for any fit.",
    tags: ["Oversized", "Streetwear", "Nike"],
  },
  {
    id: "cargo-pants",
    name: "Tactical Cargo Pants",
    brand: "Carhartt",
    category: "Cargo Pants",
    price: 52,
    originalPrice: 85,
    image: "/products/cargo-pants.png",
    condition: "Excellent",
    description:
      "Khaki utility cargos with roomy pockets and an adjustable hem. Street-ready.",
    tags: ["Streetwear"],
  },
  {
    id: "hoodie",
    name: "Faded Pullover Hoodie",
    brand: "Nike",
    category: "Hoodies",
    price: 45,
    originalPrice: 70,
    image: "/products/hoodie.png",
    condition: "Good",
    description:
      "Heavyweight faded black hoodie with a relaxed drape and worn-in softness.",
    tags: ["Oversized", "Streetwear", "Nike"],
  },
  {
    id: "bomber-jacket",
    name: "Olive Bomber Jacket",
    brand: "Alpha Industries",
    category: "Outerwear",
    price: 74,
    originalPrice: 110,
    image: "/products/bomber-jacket.png",
    condition: "Excellent",
    description:
      "Military-inspired olive bomber with ribbed cuffs and a clean silhouette.",
    tags: ["Vintage", "Streetwear"],
    isNew: true,
  },
  {
    id: "sneakers",
    name: "Retro Chunky Sneakers",
    brand: "Adidas",
    category: "Sneakers",
    price: 89,
    originalPrice: 140,
    image: "/products/sneakers.png",
    condition: "Very Good",
    description:
      "Chunky-soled retro runners in white and grey. Rare pair, barely worn.",
    tags: ["Streetwear", "Adidas"],
    isNew: true,
  },
  {
    id: "flannel-shirt",
    name: "Checked Flannel Shirt",
    brand: "Ralph Lauren",
    category: "Shirts",
    price: 38,
    originalPrice: 65,
    image: "/products/flannel-shirt.png",
    condition: "Very Good",
    description:
      "Cozy red and black checked flannel with an oversized cut. Perfect layering piece.",
    tags: ["Vintage", "Oversized"],
    isNew: true,
  },
  {
    id: "accessories",
    name: "Streetwear Accessory Pack",
    brand: "Adidas",
    category: "Accessories",
    price: 29,
    originalPrice: 55,
    image: "/products/accessories.png",
    condition: "Excellent",
    description:
      "Curated bundle of a cap, beanie and sling bag to finish off any fit.",
    tags: ["Streetwear", "Adidas"],
    isNew: true,
  },
]

export type Category = {
  name: string
  image: string
  href: string
}

export const categories: Category[] = [
  { name: "Oversized T-Shirts", image: "/products/graphic-tee.png", href: "#shop" },
  { name: "Hoodies", image: "/products/hoodie.png", href: "#shop" },
  { name: "Shirts", image: "/products/flannel-shirt.png", href: "#shop" },
  { name: "Cargo Pants", image: "/products/cargo-pants.png", href: "#shop" },
  { name: "Sneakers", image: "/products/sneakers.png", href: "#shop" },
  { name: "Accessories", image: "/products/accessories.png", href: "#shop" },
]

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)

export const getProductById = (id: string) => products.find((p) => p.id === id)

export const getRelatedProducts = (product: Product, limit = 4) => {
  const sameCategory = products.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
  const others = products.filter(
    (p) => p.id !== product.id && p.category !== product.category,
  )
  return [...sameCategory, ...others].slice(0, limit)
}

export const discountPercent = (product: Product) =>
  product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0
