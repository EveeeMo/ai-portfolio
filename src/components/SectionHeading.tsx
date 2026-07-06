export function SectionHeading({
  label,
  title,
  description,
}: {
  label?: string;
  title: string;
  description?: string;
}) {
  return (
    <div>
      {label && <p className="text-xs uppercase tracking-[0.15em] text-coral">{label}</p>}
      <h2 className="mt-1 font-heading text-2xl text-ink sm:text-3xl md:text-4xl">{title}</h2>
      {description && (
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:mt-3 sm:text-base">{description}</p>
      )}
    </div>
  );
}
