import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Critical styles are inline so the modal never depends on Tailwind generating
// a class, and always sits above the navbar (which is z-50).
const overlayStyle = {
  position: "fixed",
  inset: 0,
  zIndex: 2147483000,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem",
  padding: "1rem",
  background: "rgba(0, 0, 0, 0.88)",
  backdropFilter: "blur(4px)",
  WebkitBackdropFilter: "blur(4px)",
};

const videoStyle = {
  maxHeight: "calc(100vh - 11rem)",
  maxWidth: "100%",
  borderRadius: "1rem",
  background: "#000",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
};

const navBtn =
  "flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:scale-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

function Chevron({ dir }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
    </svg>
  );
}

/**
 * videos: array of urls. startIndex: which one to open first.
 */
export default function VideoModal({ videos = [], startIndex = 0, title, onClose }) {
  const closeRef = useRef(null);
  const activeThumbRef = useRef(null);
  const [index, setIndex] = useState(startIndex);
  const count = videos.length;

  const go = useCallback(
    (next) => setIndex((i) => Math.min(count - 1, Math.max(0, typeof next === "function" ? next(i) : next))),
    [count]
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go((i) => i + 1);
      else if (e.key === "ArrowLeft") go((i) => i - 1);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose, go]);

  useEffect(() => {
    activeThumbRef.current?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  if (!count) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={count > 1 ? `${title} (video ${index + 1} of ${count})` : title}
      onClick={onClose}
      style={overlayStyle}
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 text-ink shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {/* key resets the player whenever the video changes; autoplays the next one when one ends */}
      <video
        key={videos[index]}
        src={videos[index]}
        autoPlay
        controls
        playsInline
        onClick={(e) => e.stopPropagation()}
        onEnded={() => index < count - 1 && go(index + 1)}
        style={videoStyle}
      />

      {count > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex max-w-full items-center gap-3"
        >
          <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous video" className={`${navBtn} shrink-0`}>
            <Chevron dir="left" />
          </button>

          {/* Thumbnail strip: one small box per video, scrolls sideways if there are many */}
          <div
            className="flex min-w-0 items-center gap-2 overflow-x-auto p-1"
            role="tablist"
            aria-label="Project videos"
          >
            {videos.map((v, i) => {
              const active = i === index;
              return (
                <button
                  key={v}
                  ref={active ? activeThumbRef : null}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-label={`Video ${i + 1} of ${count}`}
                  onClick={() => go(i)}
                  className={`relative h-20 w-14 shrink-0 overflow-hidden rounded-lg bg-black transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${
                    active
                      ? "opacity-100 ring-2 ring-white"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <video
                    src={`${v}#t=0.1`}
                    muted
                    playsInline
                    preload="metadata"
                    aria-hidden="true"
                    tabIndex={-1}
                    className="pointer-events-none h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 rounded bg-black/65 px-1.5 text-[10px] font-semibold leading-4 text-white">
                    {i + 1}
                  </span>
                </button>
              );
            })}
          </div>

          <button type="button" onClick={() => go(index + 1)} disabled={index === count - 1} aria-label="Next video" className={`${navBtn} shrink-0`}>
            <Chevron dir="right" />
          </button>
        </div>
      )}
    </div>,
    document.body
  );
}