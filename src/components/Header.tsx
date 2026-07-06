import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

const navItems = [
  { href: "/", label: "首页" },
  { href: "/projects", label: "项目" },
  { href: "/about", label: "关于" },
];

export function Header() {
  return (
    <header className="border-b border-border/80 bg-paper/90 backdrop-blur-sm">
      <Container>
        <div className="flex min-h-14 items-center justify-between gap-3 py-2 sm:min-h-16 sm:py-0">
          <Link
            href="/"
            className="min-w-0 font-heading text-sm leading-snug text-ink sm:text-lg"
          >
            {siteConfig.brandName}
          </Link>
          <nav className="flex shrink-0 gap-0.5 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-blush hover:text-ink sm:px-3 sm:text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </Container>
    </header>
  );
}
