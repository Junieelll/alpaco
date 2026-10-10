import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GalleryGrid from "../GalleryGrid";
import { featuredGalleryItems } from "../../data/gallery";
import { group, fadeUp, wordsGroup, Words, useInViewProps } from "../motionPresets";

export default function GallerySection() {
  const inView = useInViewProps(0.3);

  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-24">
      <motion.div
        className="flex flex-wrap items-end justify-between gap-6"
        variants={group}
        {...inView}
      >
        <div>
          <motion.p
            variants={fadeUp}
            className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest"
          >
            <span className="h-2 w-2 rounded-full bg-mid" />
            Gallery
          </motion.p>
          <motion.h2
            variants={wordsGroup}
            aria-label="From the field"
            className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
          >
            <span aria-hidden="true">
              <Words text="From" /> <Words text="the field" className="it" />
            </span>
          </motion.h2>
        </div>
        <motion.div variants={fadeUp}>
          <Link
            to="/gallery"
            className="group inline-flex items-center gap-1 border-b border-forest pb-0.5 text-sm font-semibold text-forest transition-colors hover:border-mid hover:text-mid"
          >
            <span>Open the gallery</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </Link>
        </motion.div>
      </motion.div>

      {/* Tiles already cascade in on their own inside GalleryGrid */}
      <div className="mt-10">
        <GalleryGrid items={featuredGalleryItems} masonry={false} />
      </div>
    </section>
  );
}