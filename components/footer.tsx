export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div className="max-w-xs">
          <p className="text-2xl font-bold text-primary">Thrift.x</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Rare, curated streetwear. Sustainable style that doesn&apos;t break the bank.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 text-sm sm:grid-cols-3">
          <FooterCol title="Shop" links={["New Drops", "Outerwear", "Tops", "Footwear"]} />
          <FooterCol title="Company" links={["About", "Sustainability", "Careers", "Press"]} />
          <FooterCol title="Support" links={["Contact", "Shipping", "Returns", "FAQ"]} />
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-7xl px-6 py-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Thrift.x. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="font-semibold">{title}</p>
      <ul className="mt-3 flex flex-col gap-2 text-muted-foreground">
        {links.map((link) => (
          <li key={link}>
            <a href="#shop" className="transition-colors hover:text-primary">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
