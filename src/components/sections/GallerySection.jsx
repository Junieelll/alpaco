import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import GalleryGrid from "../GalleryGrid";
import Reveal from "../Reveal";

export default function GallerySection() {
  return (
    <section id="gallery" className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-24">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Reveal y={20}>
          <div>
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest">
              <span className="h-2 w-2 rounded-full bg-mid" />
              Gallery
            </p>
            <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
              From <span className="it">the field</span>
            </h2>
          </div>
        </Reveal>
        <Reveal y={20} delay={0.1}>
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
        </Reveal>
      </div>

      {/* Grid */}
      <Reveal y={24} duration={0.7} delay={0.15}>
        <GalleryGrid />
      </Reveal>
    </section>
  );
}
