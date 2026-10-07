import MediaImage from "./MediaImage";

export default function ProjectCard({ project, isFeatured = false }) {
  const { title, location, image, alt } = project;

  if (isFeatured) {
    return (
      <article className="lg:row-span-2 group">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-forest lg:aspect-auto lg:h-[29rem] shadow-sm">
          <MediaImage
            src={image}
            alt={alt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest shadow-xs">
            Placeholder project
          </span>
        </div>
        <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-forest transition-colors">
          {title}
        </h3>
        <p className="text-muted text-sm mt-0.5">{location}</p>
      </article>
    );
  }

  return (
    <article className="group">
      <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-forest shadow-sm">
        <MediaImage
          src={image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-forest shadow-xs">
          Placeholder project
        </span>
      </div>
      <h3 className="mt-4 text-xl font-bold text-ink group-hover:text-forest transition-colors">
        {title}
      </h3>
      <p className="text-muted text-sm mt-0.5">{location}</p>
    </article>
  );
}
