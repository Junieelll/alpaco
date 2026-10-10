import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../Navbar";
import Button from "../Button";
import VideoCard from "../VideoCard";
import { Lightbox } from "../GalleryGrid";
import { siteConfig } from "../../data/site";
import { galleryItems } from "../../data/gallery";

const EASE = [0.22, 1, 0.36, 1];

// Gallery video the hero card opens. Change this id to feature a different clip.
const HERO_VIDEO_ID = "field-video-equipment-motion";
const GALLERY_VIDEOS = galleryItems.filter((item) => item.kind === "video");
const HERO_VIDEO = GALLERY_VIDEOS.find((item) => item.id === HERO_VIDEO_ID);

// Headline pieces — the italic accent keeps its serif style while being typed
const HEADLINE = [
  { text: "Materials, site works and hauling, ", className: "" },
  { text: "from one company", className: "it" },
];
const HEADLINE_FULL = HEADLINE.map((s) => s.text).join("");

// Each segment's start/end index inside the full string, computed once (no mutation during render)
const HEADLINE_RANGES = HEADLINE.reduce((acc, seg) => {
  const start = acc.length ? acc[acc.length - 1].end : 0;
  return [...acc, { ...seg, start, end: start + seg.text.length }];
}, []);

// Everything below the tags is timed explicitly (seconds from page load)
const TIMING = {
  tags: 0.2,
  typingStart: 600, // ms
  description: 1.3,
  ctaPrimary: 1.6,
  ctaSecondary: 1.75,
  video: 0.7,
  caption: 1.2,
};

const containerVariants = { hidden: {}, visible: {} };

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: 48, scale: 0.97 },
  visible: (delay = 0) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

const tagRow = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: { delayChildren: delay, staggerChildren: 0.09 },
  }),
};

const tagChip = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EASE },
  },
};

/**
 * Types the headline character by character.
 * The full text is always rendered (the not-yet-typed part is invisible),
 * so the layout never jumps while it types.
 */
function TypedHeading({ reduce }) {
  const total = HEADLINE_FULL.length;
  const [count, setCount] = useState(reduce ? total : 0);
  const [caretOn, setCaretOn] = useState(!reduce);

  useEffect(() => {
    if (reduce) return undefined;

    let timer;
    let n = 0;

    const tick = () => {
      n += 1;
      setCount(n);
      if (n < total) {
        // Natural rhythm: slight jitter, and a beat after the comma
        const pause = HEADLINE_FULL[n - 1] === "," ? 280 : 0;
        timer = setTimeout(tick, 36 + Math.random() * 34 + pause);
      } else {
        // Let the caret blink a little longer, then remove it
        timer = setTimeout(() => setCaretOn(false), 2200);
      }
    };

    timer = setTimeout(tick, TIMING.typingStart);
    return () => clearTimeout(timer);
  }, [reduce, total]);

  return (
    <h1
      aria-label={HEADLINE_FULL}
      className="max-w-3xl text-[2.5rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
    >
      <span aria-hidden="true">
        {HEADLINE_RANGES.map((seg, i) => {
          const { start, end } = seg;
          const typedLen = Math.max(0, Math.min(count - start, seg.text.length));
          const typed = seg.text.slice(0, typedLen);
          const rest = seg.text.slice(typedLen);
          const isLast = i === HEADLINE_RANGES.length - 1;
          const showCaret =
            caretOn && count >= start && (count < end || (isLast && count === end));

          return (
            <span key={seg.text} className={seg.className}>
              {typed}
              {showCaret && (
                <span className="relative inline-block h-0 w-0 align-baseline">
                  <motion.span
                    className="absolute -bottom-[0.14em] left-[0.05em] block h-[0.95em] w-[3px] rounded-sm bg-gold sm:w-[4px]"
                    animate={{ opacity: [1, 1, 0, 0] }}
                    transition={{
                      duration: 0.9,
                      repeat: Infinity,
                      times: [0, 0.5, 0.5, 1],
                    }}
                  />
                </span>
              )}
              <span className="invisible">{rest}</span>
            </span>
          );
        })}
      </span>
    </h1>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const [activeVideoId, setActiveVideoId] = useState(null);

  // Plain left-click opens the modal; ctrl/cmd/middle-click still follows the /gallery link
  const openVideo = (event) => {
    if (!HERO_VIDEO) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    setActiveVideoId(HERO_VIDEO.id);
  };

  return (
    <>
    <header className="p-3 sm:p-4">
      <div className="relative isolate flex min-h-[calc(100svh-1.5rem)] sm:min-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-[1.75rem] bg-deep sm:rounded-[2rem]">
        {/* Background Image — slow settle from a slight zoom */}
        <motion.img
          src="/images/hero.jpg"
          alt="Excavation work in progress"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          initial={reduce ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
        {/* Deep Green Gradient Overlay */}
        <motion.div
          className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/60 to-deep/30"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />

        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content */}
        <motion.div
          id="top"
          variants={containerVariants}
          initial={reduce ? "visible" : "hidden"}
          animate="visible"
          className="relative z-10 mx-auto mt-auto grid w-full max-w-7xl gap-8 px-5 pb-8 pt-24 sm:px-8 sm:pb-12 lg:grid-cols-[1.5fr_1fr] lg:items-end"
        >
          <div>
            {/* Tag chips — pop in one after another */}
            <motion.div
              variants={tagRow}
              custom={TIMING.tags}
              className="mb-5 flex flex-wrap gap-2 text-xs font-medium text-white"
            >
              {siteConfig.heroTags.map((tag) => (
                <motion.span
                  key={tag}
                  variants={tagChip}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 backdrop-blur-xs"
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Headline — typed out with a blinking caret */}
            <TypedHeading reduce={reduce} />

            {/* Description */}
            <motion.p
              variants={rise}
              custom={TIMING.description}
              className="mt-5 max-w-xl text-base text-white/85 sm:text-lg"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTAs — each button lands separately */}
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <motion.div variants={rise} custom={TIMING.ctaPrimary}>
                <Button to="/request-a-quote" variant="primary">
                  Request a Quote
                </Button>
              </motion.div>
              <motion.div variants={rise} custom={TIMING.ctaSecondary}>
                <Button to="/services" variant="text-white">
                  View Our Services
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Video Card slides in, caption follows */}
          <div className="lg:justify-self-end">
            <motion.div variants={slideIn} custom={TIMING.video}>
              <VideoCard
                thumbnail="/images/truck-preview.jpg"
                alt="Hauling dump truck"
                videoSrc={HERO_VIDEO?.src}
                videoPoster={HERO_VIDEO?.poster}
                subtitle={HERO_VIDEO?.alt}
                href="/gallery"
                onClick={openVideo}
              />
            </motion.div>
            <motion.p
              variants={rise}
              custom={TIMING.caption}
              className="mt-3 text-right text-xs text-white/70 max-lg:text-left"
            >
              {siteConfig.categorySubtitle}
            </motion.p>
          </div>
        </motion.div>
      </div>
    </header>

    {/* Rendered outside the animated hero so the modal is positioned against the viewport */}
    <Lightbox
      items={GALLERY_VIDEOS}
      activeId={activeVideoId}
      onClose={() => setActiveVideoId(null)}
      onSelect={setActiveVideoId}
    />
    </>
  );
}