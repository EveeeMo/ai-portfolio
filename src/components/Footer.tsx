import Link from "next/link";
import { Container } from "@/components/Container";
import { siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-paper/80">
      <Container className="flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted">
          {siteConfig.name} · {new Date().getFullYear()} · {siteConfig.footerNote}
        </p>
        <div className="flex gap-5 text-sm">
          <Link href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="sketch-link text-muted">
            GitHub
          </Link>
          <a href={`mailto:${siteConfig.email}`} className="sketch-link text-muted">
            Email
          </a>
        </div>
      </Container>
    </footer>
  );
}
