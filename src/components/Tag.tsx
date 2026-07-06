export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blush px-3 py-1 text-xs font-medium text-ink">
      {label}
    </span>
  );
}
