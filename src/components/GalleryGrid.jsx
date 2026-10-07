import { useState } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import MediaImage from "./MediaImage";
import { galleryItems } from "../data/gallery";

export default function GalleryGrid() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      <div className="mt-10 grid auto-rows-[9rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] md:grid-cols-4">
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className={`group relative cursor-pointer overflow-hidden rounded-2xl bg-forest shadow-sm ${item.colSpan}`}
          >
            <MediaImage
              src={item.image}
              alt={item.alt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {item.isVideo && (
              <span className="absolute inset-0 grid place-items-center bg-black/15 transition-colors group-hover:bg-black/25">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-deep shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-5 w-5 fill-current ml-0.5" />
                </span>
              </span>
            )}
            <div className="absolute inset-0 bg-forest/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal with intentional smooth animations */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedItem(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-deep/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-forest p-2 shadow-2xl"
            >
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-deep/80 text-white transition hover:bg-gold hover:text-deep"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
              <img
                src={selectedItem.image}
                alt={selectedItem.alt}
                className="max-h-[80vh] w-auto rounded-xl object-contain"
              />
              <div className="p-3 text-center text-sm font-medium text-white/90">
                {selectedItem.alt}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
