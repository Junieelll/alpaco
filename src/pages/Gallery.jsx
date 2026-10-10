import { useMemo, useState } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
} from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GalleryGrid from "../components/GalleryGrid";
import {
  galleryCategories,
  galleryItems,
} from "../data/gallery";

const EASE = [0.22, 1, 0.36, 1];
const PAGE_SIZE = 12;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE, delay },
  }),
};

const rise = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 1.05, ease: EASE } },
};

function Masked({ children }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em] pr-[0.1em]">
      <motion.span variants={rise} className="block">
        {children}
      </motion.span>
    </span>
  );
}

export default function Gallery() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState("all");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    if (category === "all") return galleryItems;
    if (category === "photo" || category === "image") {
      return galleryItems.filter((item) => item.kind === "image");
    }
    if (category === "video") {
      return galleryItems.filter((item) => item.kind === "video");
    }
    return galleryItems;
  }, [category]);

  const visible = filtered.slice(0, visibleCount);
  const remaining = filtered.length - visible.length;

  const selectCategory = (id) => {
    setCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
        <Navbar />

        <main>
          <section className="mx-auto max-w-7xl px-5 pt-10 sm:px-8 lg:pt-14">
            <motion.div
              initial="hidden"
              animate="visible"
              className="max-w-3xl"
            >
              <motion.p
                variants={fadeUp}
                custom={0.05}
                className="mb-3 inline-flex items-center gap-2 text-xs font-semibold text-forest"
              >
                <span className="h-2 w-2 rounded-full bg-mid" />
                Field media
              </motion.p>
              <h1 className="text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
                <Masked>
                  Work from <span className="it">the field</span>
                </Masked>
              </h1>
              <motion.p
                variants={fadeUp}
                custom={0.2}
                className="mt-5 max-w-[58ch] text-base text-muted sm:text-lg"
              >
                Machinery, hauling, and site operations from ALPACO jobs. Filter
                by type, then open any still or clip. More field media is added
                as it is received.
              </motion.p>
            </motion.div>

            <motion.div
              role="tablist"
              aria-label="Gallery categories"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.35 }}
              className="sticky top-20 z-20 mt-10 flex gap-2 overflow-x-auto pb-1 scrollbar-none sm:top-24"
            >
              {galleryCategories.map((chip) => {
                const active = category === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectCategory(chip.id)}
                    className={`shrink-0 rounded-full px-4 py-2 text-[13px] font-medium transition ${
                      active
                        ? "bg-deep text-white shadow-sm"
                        : "bg-white text-ink ring-1 ring-forest/10 hover:bg-sage"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </motion.div>
          </section>

          <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
            <GalleryGrid items={visible} />

            {remaining > 0 && (
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                className="mt-10 flex flex-col items-center gap-2"
              >
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                  className="rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-deep"
                >
                  Load more
                </button>
                <p className="text-xs text-muted">
                  {remaining} more {remaining === 1 ? "item" : "items"} in this view
                </p>
              </motion.div>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </MotionConfig>
  );
}
