import ProjectMedia from "./ProjectMedia";

export default function ProjectCard({
  project,
  isFeatured = false,
  compact = false,
}) {
  const { title, location, description, tag } = project;

  /* ── Featured: large image with text below ── */
  if (isFeatured) {
    return (
      <article className="group h-full">
        <div className="relative aspect-[2/1] overflow-hidden rounded-3xl bg-forest shadow-sm">
          <ProjectMedia project={project} />
          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest shadow-xs">
            {tag}
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-forest transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm mt-0.5">{location}</p>
        {description && (
          <p className="text-muted/80 text-sm mt-1.5 leading-relaxed">
            {description}
          </p>
        )}
      </article>
    );
  }

  /* ── Compact: horizontal thumbnail + text (used in home section sidebar) ── */
  if (compact) {
    return (
      <article className="group flex gap-4 items-start">
        <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl bg-forest shadow-sm">
          <ProjectMedia project={project} playable={false} />
        </div>
        <div className="flex flex-col justify-center min-w-0 py-0.5">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-forest mb-1">
            {tag}
          </span>
          <h3 className="text-base font-bold text-ink group-hover:text-forest transition-colors leading-snug">
            {title}
          </h3>
          <p className="text-muted text-xs mt-0.5">{location}</p>
        </div>
      </article>
    );
  }

  /* ── Default: standard card with image on top ── */
  return (
    <article className="group h-full">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-forest shadow-sm">
        <ProjectMedia project={project} />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest shadow-xs">
          {tag}
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-forest transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm mt-0.5">{location}</p>
      {description && (
        <p className="text-muted/80 text-sm mt-1.5 leading-relaxed">
          {description}
        </p>
      )}
    </article>
  );
}