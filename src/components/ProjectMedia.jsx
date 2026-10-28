import { useState } from "react";
import MediaImage from "./MediaImage";
import VideoModal from "./VideoModal";

const mediaClass =
  "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105";

function PlayIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

export default function ProjectMedia({ project, playable = true }) {
  const { image, alt, title } = project;
  // Supports either `videos: [...]` or the older single `video: "..."`
  const videos = project.videos?.length ? project.videos : project.video ? [project.video] : [];
  const [open, setOpen] = useState(false);

  // No video: plain image, same as before
  if (!videos.length) {
    return <MediaImage src={image} alt={alt} loading="lazy" className={mediaClass} />;
  }

  return (
    <>
      {/* Thumbnail: the image if provided, otherwise the first video's first frame */}
      {image ? (
        <MediaImage src={image} alt={alt} loading="lazy" className={mediaClass} />
      ) : (
        <video
          src={`${videos[0]}#t=0.1`}
          muted
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          className={`${mediaClass} pointer-events-none`}
        />
      )}

      {playable ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={
            videos.length > 1
              ? `Play videos: ${title} (${videos.length} videos)`
              : `Play video: ${title}`
          }
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors hover:bg-black/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-forest shadow-lg transition-transform duration-300 group-hover:scale-110">
            <PlayIcon className="h-7 w-7 translate-x-0.5" />
          </span>
        </button>
      ) : (
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-forest shadow">
            <PlayIcon className="h-4 w-4 translate-x-px" />
          </span>
        </span>
      )}

      {/* Video count badge (bottom-left, so it doesn't clash with the tag at top-left) */}
      {playable && videos.length > 1 && (
        <span className="pointer-events-none absolute bottom-3 left-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {videos.length} videos
        </span>
      )}

      {open && <VideoModal videos={videos} title={title} onClose={() => setOpen(false)} />}
    </>
  );
}