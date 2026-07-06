import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Project } from "@/types/content";

function projectHref(project: Project) {
  return project.storyUrl ?? `/projects/${project.slug}`;
}

function isExternal(project: Project) {
  return Boolean(project.storyUrl);
}

function CardLink({
  project,
  className,
  children,
}: {
  project: Project;
  className?: string;
  children: ReactNode;
}) {
  const href = projectHref(project);
  if (isExternal(project)) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function VersionTrail({ versions }: { versions: Project["versions"] }) {
  if (!versions?.length) return null;
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1 sm:mt-3 sm:gap-1.5">
      {versions.map((v, i) => (
        <span key={v.name} className="flex max-w-full items-center gap-1 sm:gap-1.5">
          {i > 0 && <span className="shrink-0 text-border">→</span>}
          <span className="max-w-full truncate rounded-full border border-border bg-blush/40 px-2 py-0.5 sm:px-2.5 sm:py-1">
            <span className="text-[11px] font-medium text-coral sm:text-xs">{v.name}</span>
            <span className="text-[11px] text-muted sm:text-xs"> {v.stack}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const detailLabel = isExternal(project) ? "查看详情 ↗" : "查看详情 →";

  return (
    <article className="warm-card group transition-transform hover:-translate-y-0.5">
      <div className="flex gap-3 p-4 sm:gap-5 sm:p-6">
        <CardLink project={project} className="shrink-0">
          <div className="h-14 w-14 overflow-hidden rounded-xl border border-border bg-background sm:h-20 sm:w-20 sm:rounded-2xl">
            <Image
              src={project.cover}
              alt=""
              width={80}
              height={80}
              className="h-full w-full object-cover"
              aria-hidden
            />
          </div>
        </CardLink>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
            <CardLink project={project}>
              <h3 className="font-heading text-base leading-snug text-ink group-hover:text-link sm:text-xl">
                {project.title}
              </h3>
            </CardLink>
            {project.period && (
              <span className="shrink-0 text-[11px] text-muted sm:text-xs">{project.period}</span>
            )}
          </div>

          {project.highlight && (
            <p className="mt-1 text-[11px] font-medium text-coral sm:text-xs">{project.highlight}</p>
          )}

          <p className="mt-1.5 text-[13px] leading-relaxed text-muted sm:text-sm">
            {project.description}
          </p>

          <VersionTrail versions={project.versions} />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-start gap-x-3 gap-y-2 border-t border-border px-4 py-2.5 text-xs sm:justify-end sm:gap-4 sm:px-6 sm:py-3 sm:text-sm">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-link"
          >
            GitHub ↗
          </a>
        )}
        {project.links?.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-link"
          >
            {link.label} ↗
          </a>
        ))}
        <CardLink project={project} className="text-muted hover:text-link">
          {detailLabel}
        </CardLink>
      </div>
    </article>
  );
}
