import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { MapPin, ArrowUpRight, Navigation } from "lucide-react";
import Navbar from "../components/Navbar";
import ContactPanel from "../components/ContactPanel";
import Footer from "../components/Footer";
import { siteConfig } from "../data/site";
import QuoteForm from "../components/QuoteForm";

const EASE = [0.22, 1, 0.36, 1];

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** One headline line, revealed from behind a mask. */
function Line({ children, delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
      <motion.span
        className="block"
        initial={{ y: reduce ? "0%" : "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: reduce ? 0 : 0.95, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Contact() {
  const reduce = useReducedMotion();

  const [mapActive, setMapActive] = useState(false);
  const mapRef = useRef(null);
  const mapInView = useInView(mapRef, { once: true, margin: "-80px" });
  const mapOpen = reduce || mapInView;

  // A pin needs exact coordinates. Add { lat, lng } to siteConfig (see notes).
  // Falls back to the street address, which may not resolve to a pin.
  const coords = siteConfig.coordinates;
  const mapTarget =
    coords?.lat && coords?.lng
      ? `${coords.lat},${coords.lng}`
      : siteConfig.address;
  const q = encodeURIComponent(mapTarget);
  const embedSrc =
    siteConfig.mapEmbedSrc ||
    `https://www.google.com/maps?q=${q}&z=17&output=embed`;
  const openUrl = `https://www.google.com/maps/search/?api=1&query=${q}`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

  return (
    <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 sm:pt-12 lg:px-8">
        {/* Header */}
        <header className="mb-10 sm:mb-14">

          <h1 className="text-5xl font-semibold leading-[1.04] tracking-tight text-ink sm:text-6xl">
            <Line delay={0.05}>Tell us about</Line>
            <Line delay={0.17}>
              <span className="it text-forest">your project</span>
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: reduce ? 1 : 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.9, delay: 0.45, ease: EASE }}
            className="mt-6 max-w-xl text-base text-muted sm:text-lg"
          >
            Share what you need and where. Our team reviews your requirements
            and gets in touch.
          </motion.p>
        </header>

        <div className="grid gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Form */}
          <div className="order-1 rounded-[32px] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_24px_80px_-24px_rgba(0,0,0,0.12)] sm:p-10 lg:order-2 lg:col-span-7">
            <QuoteForm />
          </div>

          {/* Contact panel */}
          <aside className="order-2 lg:sticky lg:top-28 lg:order-1 lg:col-span-5">
            <ContactPanel />
          </aside>
        </div>

        {/* Map: normal Google Maps colors, unveiled on scroll */}
        <section
          id="location"
          aria-label="Office location"
          className="mt-14 scroll-mt-28 lg:mt-20"
        >
          <div ref={mapRef}>
            <motion.div
              initial={false}
              animate={{
                clipPath: mapOpen
                  ? "inset(0% 0% 0% 0% round 32px)"
                  : "inset(0% 0% 100% 0% round 32px)",
              }}
              transition={{ duration: reduce ? 0 : 1.15, ease: EASE }}
              className="relative overflow-hidden rounded-[32px] bg-white"
            >
              <div
                className="relative h-[380px] overflow-hidden bg-sage sm:h-[520px] lg:h-[600px]"
                onMouseLeave={() => setMapActive(false)}
              >
                <motion.div
                  className="absolute inset-0"
                  initial={false}
                  animate={{ scale: mapOpen ? 1 : 1.1 }}
                  transition={{ duration: reduce ? 0 : 1.8, ease: EASE }}
                >
                  <iframe
                    title={`Map showing ${siteConfig.address}`}
                    src={embedSrc}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0 h-full w-full border-0"
                  />
                </motion.div>

                {/* Scroll guard: the page scrolls normally until the map is clicked */}
                <AnimatePresence>
                  {!mapActive && (
                    <motion.button
                      key="guard"
                      type="button"
                      aria-label="Activate map to pan and zoom"
                      onClick={() => setMapActive(true)}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: reduce ? 0 : 0.3 }}
                      className="absolute inset-0 cursor-pointer"
                    >
                      <span className="absolute right-4 top-4 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-deep shadow-md">
                        Click to explore the map
                      </span>
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              {/* Address card: below the map on mobile, over it on larger screens */}
              <motion.div
                initial={false}
                animate={{ opacity: mapOpen ? 1 : 0, y: mapOpen ? 0 : 14 }}
                transition={{
                  duration: reduce ? 0 : 0.8,
                  ease: EASE,
                  delay: reduce ? 0 : 0.9,
                }}
                className="bg-white p-6 sm:absolute sm:bottom-5 sm:left-5 sm:max-w-sm sm:rounded-3xl sm:shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
              >
                <div className="flex items-start gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sage text-forest">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-muted">
                      Main office &amp; dispatch
                    </p>
                    <p className="mt-0.5 text-base font-medium text-deep">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-deep"
                  >
                    <Navigation className="h-4 w-4" />
                    Get directions
                  </a>
                  <a
                    href={openUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition hover:text-mid"
                  >
                    Open in Google Maps
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}