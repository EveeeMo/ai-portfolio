import type { ProjectMetric } from "@/types/content";

export function ProjectMetrics({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className="rounded-2xl border border-border bg-blush/40 px-3 py-3 text-center sm:px-4 sm:py-4"
        >
          <p className="font-heading text-lg text-ink sm:text-xl">{m.value}</p>
          <p className="mt-1 text-xs text-muted">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
