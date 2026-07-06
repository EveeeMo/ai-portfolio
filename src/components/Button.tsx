import Link from "next/link";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  external = false,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  variant?: "primary" | "secondary";
}) {
  const cls =
    variant === "secondary"
      ? "inline-flex items-center rounded-full border-2 border-border bg-paper px-4 py-2 text-sm font-medium text-ink shadow-sm transition-all hover:-translate-y-0.5 hover:border-coral/40 hover:bg-blush sm:px-5 sm:py-2.5"
      : "inline-flex items-center rounded-full bg-coral px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-coral-hover hover:shadow-md sm:px-5 sm:py-2.5";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return <Link href={href} className={cls}>{children}</Link>;
}
