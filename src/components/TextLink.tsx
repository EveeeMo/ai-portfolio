import Link from "next/link";
import type { ReactNode } from "react";

export function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="sketch-link text-sm font-medium text-ink">
      {children} →
    </Link>
  );
}
