export type Product = {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  condition: string
  description: string
}

export const products: Product[] = [
  {
    id: "denim-jacket",
    name: "Vintage Washed Denim Jacket",
    category: "Outerwear",
    price: 68,
    originalPrice: 120,
    image: "/products/denim-jacket.png",
    condition: "Excellent",
    description:
      "Classic mid-wash denim trucker jacket with a broken-in feel. One-of-one thrifted piece.",
  },
  {
    id: "graphic-tee",
    name: "Oversized Graphic Tee",
    category: "Tops",
    price: 24,
    originalPrice: 40,
    image: "/products/graphic-tee.png",
    condition: "Good",
    description:
      "Boxy fit vintage print tee in soft cotton. A staple layer for any fit.",
  },
  {
    id: "cargo-pants",
    name: "Tactical Cargo Pants",
    category: "Bottoms",
    price: 52,
    image: "/products/cargo-pants.png",
    condition: "Excellent",
    description:
      "Khaki utility cargos with roomy pockets and an adjustable hem. Street-ready.",
  },
  {
    id: "hoodie",
    name: "Faded Pullover Hoodie",
    category: "Tops",
    price: 45,
    originalPrice: 70,
    image: "/products/hoodie.png",
    condition: "Good",
    description:
      "Heavyweight faded black hoodie with a relaxed drape and worn-in softness.",
  },
  {
    id: "bomber-jacket",
    name: "Olive Bomber Jacket",
    category: "Outerwear",
    price: 74,
    originalPrice: 110,
    image: "/products/bomber-jacket.png",
    condition: "Excellent",
    description:
      "Military-inspired olive bomber with ribbed cuffs and a clean silhouette.",
  },
  {
    id: "sneakers",
    name: "Retro Chunky Sneakers",
    category: "Footwear",
    price: 89,
    originalPrice: 140,
    image: "/products/sneakers.png",
    condition: "Very Good",
    description:
      "Chunky-soled retro runners in white and grey. Rare pair, barely worn.",
  },
]

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value)
