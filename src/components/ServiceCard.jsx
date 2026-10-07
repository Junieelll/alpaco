import { ArrowUpRight } from "lucide-react";
import MediaImage from "./MediaImage";

export default function ServiceCard({ service, ariaHidden = false }) {
  const { title, description, tag, image, alt, icon: Icon } = service;

  return (
    <a
      href="#quote"
      aria-hidden={ariaHidden || undefined}
      tabIndex={ariaHidden ? -1 : undefined}
      className="group relative h-[27rem] w-[17rem] shrink-0 snap-start overflow-hidden rounded-3xl bg-forest sm:w-80 shadow-md transition-shadow duration-300 hover:shadow-xl"
    >
      <MediaImage
        src={image}
        alt={alt || `Photo for ${title}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      {/* Dark gradient overlay for readable text */}
      <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/40 to-deep/15" />

      {/* Top category chip & icon badge */}
      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-deep/50 backdrop-blur-xs px-3 py-1 text-xs font-medium text-white">
        {tag}
      </span>
      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-forest shadow-sm">
        {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />}
      </span>

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-xl font-bold leading-tight group-hover:text-gold transition-colors duration-200">
          {title}
        </h3>
        <p className="mt-1.5 text-sm text-white/80 line-clamp-2">
          {description}
        </p>

        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-1.5 text-[12.5px] font-bold text-forest transition-colors duration-200 group-hover:bg-sage">
          Inquire Service
          <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-forest text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </span>
      </div>
    </a>
  );
}