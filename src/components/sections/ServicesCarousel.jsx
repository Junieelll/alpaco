import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "../ServiceCard";
import { services } from "../../data/services";
import { EASE, group, fadeUp, wordsGroup, Words, useInViewProps } from "../MotionPresets";

// The scrolling track fades and rises in as one piece (cards inside keep their own snap layout)
const trackIn = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, delay: 0.2 } },
};

const AUTOPLAY_MS = 3500; // time between automatic moves
const IDLE_MS = 5000; // idle time before autoplay resumes
const n = services.length;
// 3 copies so there is always content on both sides; copy 1 is the "real" one
const looped = [0, 1, 2].flatMap((copy) => services.map((service) => ({ service, copy })));

export default function ServicesCarousel() {
  const headerInView = useInViewProps(0.3);
  const trackInView = useInViewProps(0.15);
  const trackRef = useRef(null);
  const lastTouch = useRef(0);

  const measure = () => {
    const t = trackRef.current;
    const c = t.children;
    return {
      t,
      setW: c[n].offsetLeft - c[0].offsetLeft, // width of one full set
      step: c[1].offsetLeft - c[0].offsetLeft, // card width + gap
      base: c[n].offsetLeft - parseFloat(getComputedStyle(t).paddingLeft), // middle set start
    };
  };

  // Instant jump that doesn't fight scroll-snap
  const jump = (t, x) => {
    t.style.scrollSnapType = "none";
    t.scrollLeft = x;
    requestAnimationFrame(() => requestAnimationFrame(() => (t.style.scrollSnapType = "")));
  };

  const scroll = (dir) => {
    const { t, step } = measure();
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const onArrow = (dir) => {
    lastTouch.current = Date.now();
    scroll(dir);
  };

  // Infinite loop: start in the middle copy, silently re-center once scrolling settles
  useEffect(() => {
    const { t, base } = measure();
    jump(t, base);

    let timer;
    const recenter = () => {
      const { setW, base } = measure();
      const d = t.scrollLeft - base;
      if (Math.abs(d) > setW / 2) jump(t, t.scrollLeft - Math.sign(d) * setW);
    };
    const onScroll = () => {
      clearTimeout(timer);
      timer = setTimeout(recenter, 120);
    };
    t.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      t.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Autoplay: advance when idle; pause on hover/focus and any user input
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = trackRef.current;
    let hover = false;
    const touch = () => (lastTouch.current = Date.now());
    const on = {
      pointerdown: touch,
      wheel: touch,
      keydown: touch,
      pointerenter: () => (hover = true),
      pointerleave: () => ((hover = false), touch()),
      focusin: () => (hover = true),
      focusout: () => ((hover = false), touch()),
    };
    Object.entries(on).forEach(([e, fn]) => t.addEventListener(e, fn, { passive: true }));

    const id = setInterval(() => {
      if (!hover && !document.hidden && Date.now() - lastTouch.current > IDLE_MS) scroll(1);
    }, AUTOPLAY_MS);

    return () => {
      clearInterval(id);
      Object.entries(on).forEach(([e, fn]) => t.removeEventListener(e, fn));
    };
  }, []);

  return (
    <section id="services" className="pb-20 lg:pb-24">
      <motion.div
        className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 sm:px-8"
        variants={group}
        {...headerInView}
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest"
          >
            <span className="h-2 w-2 rounded-full bg-mid" />
            Our services
          </motion.p>
          <motion.h2
            variants={wordsGroup}
            aria-label="Everything your site needs"
            className="max-w-md text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span aria-hidden="true">
              <Words text="Everything your" /> <Words text="site needs" className="it" />
            </span>
          </motion.h2>
        </div>

        <motion.div variants={fadeUp} className="hidden items-center gap-6 md:flex">
          <p className="max-w-[16rem] text-right text-sm text-muted">
            Supply, site works and hauling, handled by one team.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => onArrow(-1)}
              className="grid h-10 w-10 place-items-center rounded-full border border-forest/30 text-forest transition hover:bg-forest hover:text-white active:scale-95"
              aria-label="Previous service"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => onArrow(1)}
              className="grid h-10 w-10 place-items-center rounded-full bg-forest text-white transition hover:bg-deep active:scale-95"
              aria-label="Next service"
            >
              <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Infinite track: cards snap to the container's left edge (aligned with the heading) */}
      <motion.div
        ref={trackRef}
        variants={trackIn}
        {...trackInView}
        className="scrollbar-none relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 scroll-pl-5 sm:px-8 sm:scroll-pl-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))] lg:scroll-pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {looped.map(({ service, copy }) => (
          <ServiceCard key={`${copy}-${service.id}`} service={service} ariaHidden={copy !== 1} />
        ))}
      </motion.div>
    </section>
  );
}