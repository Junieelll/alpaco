import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import MediaImage from "./MediaImage";
import { galleryItems as defaultItems } from "../data/gallery";

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, amount: 0.2 };

const CATEGORY_LABEL = {
  hauling: "Hauling",
  site: "Site work",
  materials: "Materials",
  video: "Video",
};

function PlaceholderFace({ item }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-br from-sage via-sage/70 to-forest/15 p-4">
      <span className="inline-flex w-fit rounded-full border border-forest/20 bg-white/60 px-2.5 py-0.5 text-[11px] font-semibold text-forest">
        {CATEGORY_LABEL[item.category] ?? item.category}
      </span>
      <p className="max-w-[16ch] text-sm font-medium leading-snug text-forest/80">
        {item.alt}
      </p>
    </div>
  );
}

function TileMedia({ item, eager, masonry }) {
  const mediaClass = masonry
    ? "block w-full rounded-2xl object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    : "absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]";

  if (item.placeholder && item.kind !== "video") {
    return <PlaceholderFace item={item} />;
  }

  if (item.kind === "video") {
    if (item.poster) {
      return (
        <MediaImage
          src={item.poster}
          alt={item.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className={mediaClass}
        />
      );
    }
    if (item.src && !item.placeholder) {
      return (
        <video
          src={`${item.src}#t=0.001`}
          preload="metadata"
          muted
          playsInline
          className={mediaClass}
        />
      );
    }
    return <PlaceholderFace item={item} />;
  }

  if (!item.src) {
    return <PlaceholderFace item={item} />;
  }

  return (
    <MediaImage
      src={item.src}
      alt={item.alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={mediaClass}
    />
  );
}

function GalleryTile({ item, index, onOpen, masonry }) {
  const reduce = useReducedMotion();
  const delay = reduce ? 0 : (index % 4) * 0.08;

  const tileClass = masonry
    ? "group relative mb-3 inline-block w-full overflow-hidden rounded-2xl bg-sage text-left shadow-sm outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2 md:mb-4"
    : "group relative aspect-[4/3] overflow-hidden rounded-2xl bg-sage text-left shadow-sm outline-none transition duration-300 hover:-translate-y-0.5 hover:shadow-md focus-visible:ring-2 focus-visible:ring-forest focus-visible:ring-offset-2";

  return (
    <motion.button
      type="button"
      onClick={() => onOpen(item.id)}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.7, ease: EASE, delay }}
      className={tileClass}
      aria-label={`Open ${item.alt}`}
    >
      <TileMedia item={item} eager={index < 2} masonry={masonry} />
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      {item.kind === "video" && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gold text-deep shadow-lg transition-transform duration-300 group-hover:scale-110 sm:h-14 sm:w-14">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        </span>
      )}
    </motion.button>
  );
}

export function Lightbox({ items, activeId, onClose, onSelect }) {
  const reduce = useReducedMotion();
  const index = items.findIndex((item) => item.id === activeId);
  const item = index >= 0 ? items[index] : null;

  const go = useCallback(
    (dir) => {
      if (!items.length) return;
      const next = (index + dir + items.length) % items.length;
      onSelect(items[next].id);
    },
    [index, items, onSelect]
  );

  useEffect(() => {
    if (!item) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [item, go, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 sm:p-6 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={item.alt}
        >
          {/* Close button outside image */}
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onClose();
            }}
            className="fixed right-3 top-3 sm:right-6 sm:top-6 z-30 grid h-10 w-10 sm:h-12 sm:w-12 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-ink active:scale-95"
            aria-label="Close"
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Previous / Next buttons outside image */}
          {items.length > 1 && (
            <>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(-1);
                }}
                className="fixed left-2 sm:left-6 md:left-8 top-1/2 z-30 grid h-11 w-11 sm:h-14 sm:w-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-ink active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  go(1);
                }}
                className="fixed right-2 sm:right-6 md:right-8 top-1/2 z-30 grid h-11 w-11 sm:h-14 sm:w-14 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-white/10 text-white shadow-xl backdrop-blur-md transition hover:scale-105 hover:bg-white hover:text-ink active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" />
              </button>
            </>
          )}

          {/* Modal image container */}
          <motion.div
            key={item.id}
            initial={reduce ? false : { scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="relative mx-auto w-fit max-w-[calc(100vw-5.5rem)] sm:max-w-[min(82vw,68rem)] overflow-hidden rounded-2xl bg-black shadow-2xl ring-1 ring-white/10"
          >
            <div className="flex items-center justify-center bg-black">
              {item.kind === "video" && !item.placeholder ? (
                <video
                  key={item.src}
                  src={item.src}
                  poster={item.poster}
                  controls
                  autoPlay
                  playsInline
                  preload="metadata"
                  className="max-h-[82vh] w-full max-w-[calc(100vw-5.5rem)] sm:max-w-[min(82vw,68rem)] object-contain"
                >
                  Your browser does not support this video.
                </video>
              ) : item.placeholder ? (
                <div className="flex aspect-video w-[min(calc(100vw-5.5rem),48rem)] flex-col items-center justify-center gap-2 bg-neutral-900 p-8 text-center">
                  <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/70">
                    {item.kind === "video" ? "Video coming soon" : "Photo coming soon"}
                  </span>
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="max-h-[82vh] max-w-[calc(100vw-5.5rem)] sm:max-w-[min(82vw,68rem)] object-contain"
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function GalleryGrid({ items = defaultItems, limit, masonry = true }) {
  const [activeId, setActiveId] = useState(null);
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;

  const containerClass = masonry
    ? "columns-2 gap-3 sm:columns-3 md:columns-4 md:gap-4"
    : "grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4";

  return (
    <>
      <div className={containerClass}>
        {visible.map((item, index) => (
          <GalleryTile
            key={item.id}
            item={item}
            index={index}
            onOpen={setActiveId}
            masonry={masonry}
          />
        ))}
      </div>
      <Lightbox
        items={visible}
        activeId={activeId}
        onClose={() => setActiveId(null)}
        onSelect={setActiveId}
      />
    </>
  );
}