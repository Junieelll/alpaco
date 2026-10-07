import { Play } from "lucide-react";
import MediaImage from "./MediaImage";

export default function VideoCard({
  thumbnail = "/images/truck-preview.jpg",
  alt = "Hauling dump truck",
  title = "See our trucks at work",
  subtitle = "[CONTENT NEEDED: video]",
  href = "/gallery",
  className = "",
  onClick,
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`group flex items-center gap-4 rounded-2xl border border-white/15 bg-deep/70 p-3 text-white backdrop-blur-sm transition-all duration-300 hover:border-gold/40 hover:bg-deep/90 ${className}`}
    >
      <span className="relative block h-20 w-28 shrink-0 overflow-hidden rounded-xl bg-forest">
        <MediaImage
          src={thumbnail}
          alt={alt}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute inset-0 grid place-items-center bg-black/20">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gold text-deep shadow-md transition-transform duration-300 group-hover:scale-110">
            <Play className="h-3.5 w-3.5 fill-current ml-0.5" />
          </span>
        </span>
      </span>
      <span className="text-sm">
        <span className="block font-semibold text-white group-hover:text-gold transition-colors">
          {title}
        </span>
        <span className="text-white/65 text-xs">{subtitle}</span>
      </span>
    </a>
  );
}
