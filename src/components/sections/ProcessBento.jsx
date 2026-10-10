import {
  SearchCheck,
  MessageCircle,
  MapPin,
  Check,
  BadgeCheck,
  ClipboardList,
  Truck,
  Package,
  Send,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Button from "../Button";

// Step 01 visual — sample "project details" the form illustration cycles through
const DETAIL_FIELDS = [
  { icon: Truck, label: "Service", value: "Hauling & trucking" },
  { icon: Package, label: "Quantity", value: "20 cubic meters" },
  { icon: MapPin, label: "Location", value: "General Trias, Cavite" },
];

const EASE = [0.22, 1, 0.36, 1];

// Staggered entrance choreography
const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
// Card shell rises in; its contents then follow one after another
const cardIn = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: EASE,
      delay: i * 0.12,
      delayChildren: i * 0.12 + 0.25,
      staggerChildren: 0.09,
    },
  }),
};
const visualRise = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const popIn = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};
const slideIn = {
  hidden: { opacity: 0, x: 36 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } },
};
const wordsGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const wordRise = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};

// Splits text into words that rise out of a mask, one after another
function Words({ text, className = "" }) {
  return text.split(" ").map((word, i, arr) => (
    <span key={`${word}-${i}`}>
      <span className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
        <motion.span variants={wordRise} className={`inline-block ${className}`}>
          {word}
        </motion.span>
      </span>
      {i < arr.length - 1 ? " " : ""}
    </span>
  ));
}

export default function ProcessBento() {
  const reduce = useReducedMotion();
  // Spread on any element that should play its entrance when scrolled into view
  const inView = {
    initial: reduce ? "show" : "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <section className="mt-4 bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
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
              Our process
            </motion.p>
            <motion.h2
              variants={wordsGroup}
              aria-label="How a quote works, start to finish"
              className="max-w-md text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl"
            >
              <span aria-hidden="true">
                <Words text="How a quote works," />{" "}
                <Words text="start to finish" className="it" />
              </span>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} className="max-w-xs text-sm text-muted">
            From your project details to a conversation with our team.
          </motion.p>
        </motion.div>

        {/* Bento Grid — 3 cols, 2 equal rows */}
        <div className="mt-10 grid grid-cols-1 gap-3.5 md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">

          {/* ── Step 01: Left card (spans 2 rows) ── */}
          <motion.div
            variants={cardIn}
            custom={0}
            {...inView}
            className="group overflow-hidden rounded-[1.25rem] bg-white md:row-span-2 flex flex-col"
            style={{
              boxShadow: "0 2px 4px rgba(18,64,44,0.06), 0 8px 24px rgba(18,64,44,0.10), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            {/* Text + icon on top */}
            <div className="p-6 pb-3">
              <motion.span variants={fadeUp} className="block text-sm font-bold tracking-wide text-deep/80">Step 01</motion.span>
              <motion.h3 variants={fadeUp} className="mt-1.5 text-xl font-semibold leading-snug">
                Send your project details
              </motion.h3>
              <motion.p variants={fadeUp} className="mt-1.5 text-[13px] leading-relaxed text-muted">
                Tell us the service or material you need, the quantity and the
                project location.
              </motion.p>
            </div>

            {/* Visual — animated "project details" form, cropped by the card edge */}
            <motion.div
              variants={visualRise}
              className="relative mt-auto h-[55%] min-h-[330px] overflow-hidden bg-forest"
              aria-hidden="true"
            >
              {/* Fade from the white card into the green panel */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white to-transparent" />

              {/* Soft tonal shapes (same language as the CTA card) */}
              <div className="pointer-events-none absolute -right-16 -top-10 h-64 w-64 rounded-full bg-mid/30" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-60 w-60 rounded-full bg-deep/20" />
              <div className="pointer-events-none absolute -left-10 top-24 h-36 w-36 rounded-full border-[22px] border-white/10" />

              {/* Form card */}
              <motion.div
                className="absolute left-1/2 top-12 w-[84%] max-w-[300px] -translate-x-1/2"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div
                  className="rounded-2xl bg-white p-4"
                  style={{ boxShadow: "0 12px 28px rgba(10,42,29,0.28)" }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-forest text-white">
                      <ClipboardList className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[11px] font-bold leading-none text-forest">
                        Project details
                      </p>
                      <p className="mt-1 text-[9px] leading-none text-muted">
                        Tell us what you need
                      </p>
                    </div>
                  </div>

                  <div className="my-3 h-px bg-sage" />

                  {/* Fields — checks pop in one after another, then loop */}
                  <div className="space-y-2">
                    {DETAIL_FIELDS.map(({ icon: Icon, label, value }, i) => {
                      const t = 0.12 + i * 0.16;
                      return (
                        <div
                          key={label}
                          className="flex items-center gap-2.5 rounded-xl bg-sage/60 px-3 py-2"
                        >
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-forest">
                            <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="text-[8px] font-semibold uppercase leading-none tracking-widest text-muted">
                              {label}
                            </p>
                            <p className="mt-1 truncate text-[11px] font-semibold leading-none text-ink">
                              {value}
                            </p>
                          </div>
                          <motion.span
                            className="grid h-4 w-4 shrink-0 place-items-center rounded-full bg-forest text-white"
                            animate={{ scale: [0, 0, 1.15, 1, 1, 0, 0] }}
                            transition={{
                              duration: 6,
                              repeat: Infinity,
                              ease: "easeOut",
                              times: [0, t, t + 0.06, t + 0.1, 0.88, 0.94, 1],
                            }}
                          >
                            <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                          </motion.span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Send button */}
                  <motion.div
                    className="mt-3 flex items-center justify-center gap-2 rounded-full bg-gold py-2 text-[11px] font-bold text-ink"
                    animate={{ scale: [1, 1, 1.05, 1, 1] }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      times: [0, 0.6, 0.68, 0.76, 1],
                    }}
                  >
                    Send details
                    <Send className="h-3.5 w-3.5" strokeWidth={2.2} />
                  </motion.div>
                </div>
              </motion.div>

              {/* Floating chip */}
              <motion.div
                className="absolute bottom-5 right-4 flex items-center gap-2 rounded-xl bg-white p-2.5"
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                style={{ boxShadow: "0 4px 16px rgba(10,42,29,0.2)" }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-sage text-forest">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-none text-forest">Details received</p>
                  <p className="mt-1 text-[9px] leading-none text-muted">Ready for our review</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── Step 02: Top center card ── */}
          <motion.div
            variants={cardIn}
            custom={1}
            {...inView}
            className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-6 transition-shadow duration-300"
            style={{
              boxShadow: "0 2px 4px rgba(18,64,44,0.06), 0 8px 24px rgba(18,64,44,0.10), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <motion.span variants={fadeUp} className="block text-sm font-bold tracking-wide text-deep/80">Step 02</motion.span>
            <motion.h3 variants={fadeUp} className="mt-1.5 text-xl font-semibold leading-snug">
              We review your requirements
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-1.5 text-[13px] leading-relaxed text-muted">
              Our team reviews what your project needs and prepares a detailed assessment.
            </motion.p>

            {/* Visual — animated concentric review illustration */}
            <motion.div variants={popIn} className="relative mt-auto flex items-center justify-center pt-5">
              <div className="relative flex h-24 w-24 items-center justify-center">
                {/* Outer ring — slow spin */}
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-mid/20"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
                {/* Middle ring — pulse */}
                <motion.div
                  className="absolute inset-3 rounded-full border border-mid/30 bg-sage/40"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Center icon */}
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-forest text-white shadow-md">
                  <SearchCheck className="h-4.5 w-4.5" strokeWidth={2} />
                </div>
                {/* Floating dots — orbit */}
                <motion.span
                  className="absolute top-1.5 right-3 h-2 w-2 rounded-full bg-gold"
                  animate={{ y: [0, -3, 0], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.span
                  className="absolute bottom-3 left-1.5 h-1.5 w-1.5 rounded-full bg-mid/60"
                  animate={{ y: [0, 3, 0], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
                {/* Location pin — gentle float */}
                <motion.span
                  className="absolute -right-3 bottom-1 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                >
                  <MapPin className="h-3.5 w-3.5 text-forest" strokeWidth={2} />
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Step 03: Top right card ── */}
          <motion.div
            variants={cardIn}
            custom={2}
            {...inView}
            className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-6 transition-shadow duration-300"
            style={{
              boxShadow: "0 2px 4px rgba(18,64,44,0.06), 0 8px 24px rgba(18,64,44,0.10), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <motion.span variants={fadeUp} className="block text-sm font-bold tracking-wide text-deep/80">Step 03</motion.span>
            <motion.h3 variants={fadeUp} className="mt-1.5 text-xl font-semibold leading-snug">
              We get in touch with you
            </motion.h3>
            <motion.p variants={fadeUp} className="mt-1.5 text-[13px] leading-relaxed text-muted">
              We reach out using your preferred contact method to discuss next steps.
            </motion.p>

            {/* Visual — animated mini quote card preview */}
            <motion.div variants={slideIn} className="relative mt-auto flex justify-end pt-5">
              <motion.div
                className="w-40 rounded-xl bg-sage p-3.5"
                initial={{ rotate: -3 }}
                animate={{ rotate: [-3, 0, -3], y: [0, -4, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  boxShadow: "0 2px 8px rgba(18,64,44,0.08)",
                }}
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-forest text-white"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  >
                    <MessageCircle className="h-3 w-3" strokeWidth={2} />
                  </motion.div>
                  <div>
                    <p className="text-[10px] font-bold text-forest">Quote Ready</p>
                    <p className="text-[9px] text-muted">Sent to your inbox</p>
                  </div>
                </div>
                {/* Skeleton lines with staggered shimmer */}
                <div className="mt-2.5 space-y-1.5">
                  <motion.div
                    className="h-1.5 rounded-full bg-forest/15"
                    animate={{ width: ["100%", "90%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="h-1.5 rounded-full bg-forest/10"
                    animate={{ width: ["75%", "65%", "75%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                  />
                  <motion.div
                    className="h-1.5 rounded-full bg-forest/10"
                    animate={{ width: ["50%", "55%", "50%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                  />
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ── CTA Card: Bottom, spans 2 columns ── */}
          <motion.div variants={cardIn} custom={3} {...inView} className="md:col-span-2">
            <div
              id="quote"
              className="relative flex h-full min-h-[280px] overflow-hidden rounded-[1.25rem] bg-forest"
              style={{
                boxShadow: "0 2px 4px rgba(47,106,34,0.08), 0 8px 24px rgba(47,106,34,0.18)",
              }}
            >
              {/* Soft tonal shapes behind the visual */}
              <div
                className="pointer-events-none absolute -right-20 -top-28 hidden h-96 w-96 rounded-full bg-mid/30 md:block"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-32 right-48 hidden h-72 w-72 rounded-full bg-deep/20 md:block"
                aria-hidden="true"
              />

              {/* Text content */}
              <div className="relative z-20 flex flex-1 flex-col justify-center p-7 text-white md:max-w-[56%]">
                <div
                  className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full border-[28px] border-white/10"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <motion.span
                    variants={fadeUp}
                    className="block text-xs font-semibold text-sage"
                  >
                    Ready when you are
                  </motion.span>
                  <motion.h3
                    variants={wordsGroup}
                    aria-label="Have a project in mind? Get in touch with us."
                    className="mt-2 max-w-xs text-2xl font-bold leading-tight"
                  >
                    <span aria-hidden="true">
                      <Words text="Have a project in mind?" />{" "}
                      <Words text="Get in touch with us." className="it" />
                    </span>
                  </motion.h3>
                  <motion.p
                    variants={fadeUp}
                    className="mt-2 max-w-xs text-[13px] text-white/90"
                  >
                    Tell us about your project and our team will review your
                    requirements and get in touch with you.
                  </motion.p>
                  <motion.div variants={fadeUp} className="mt-5">
                    <Button to="/request-a-quote" variant="primary">
                      Request a Quote
                    </Button>
                  </motion.div>
                </div>
              </div>

              {/* Visual — quote document with checklist, cropped by the card edge */}
              <motion.div
                variants={slideIn}
                className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-[44%] md:block"
                aria-hidden="true"
              >
                {/* Back sheet */}
                <div className="absolute right-24 top-10 h-72 w-56 rotate-6 rounded-xl bg-white/35" />

                {/* Main document — paper sheet with folded corner */}
                <motion.div
                  className="absolute right-14 top-8 h-[19rem] w-60"
                  initial={{ rotate: -4 }}
                  animate={{ rotate: [-4, -2, -4], y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ filter: "drop-shadow(0 12px 20px rgba(10,42,29,0.28))" }}
                >
                  <div
                    className="h-full w-full bg-white rounded-2xl p-5"
                    style={{ clipPath: "polygon(0 0, calc(100% - 32px) 0, 100% 32px, 100% 100%, 0 100%)" }}
                  >
                    <p className="text-[9px] font-bold uppercase tracking-widest text-forest">ALPACO</p>
                    <p className="mt-1 text-xl font-bold leading-tight text-forest">Project Quote</p>
                    <p className="mt-0.5 text-[10px] text-muted">Based on your project details</p>
                    <div className="my-3 h-px bg-sage" />

                    {["Materials supply", "Demolition & excavation", "Hauling & trucking"].map((item) => (
                      <div key={item} className="mb-2.5 flex items-center gap-2.5">
                        <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-forest text-white">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold leading-none text-ink">{item}</p>
                          <p className="mt-1 text-[9px] leading-none text-muted">Included in review</p>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 space-y-1.5">
                      <div className="h-1.5 w-full rounded-full bg-sage" />
                      <div className="h-1.5 w-11/12 rounded-full bg-sage" />
                      <div className="h-1.5 w-2/3 rounded-full bg-sage" />
                    </div>
                    <div className="mt-6 h-px w-24 bg-ink/30" />
                  </div>

                  {/* Folded corner */}
                  <div
                    className="absolute right-0 top-0 h-8 w-8 bg-sage"
                    style={{ clipPath: "polygon(0 0, 0 100%, 100% 100%)" }}
                  />

                  {/* Seal */}
                  <span className="absolute -left-6 top-44 grid h-14 w-14 place-items-center rounded-full bg-gold text-ink shadow-lg ring-4 ring-white/70">
                    <BadgeCheck className="h-7 w-7" strokeWidth={2} />
                  </span>
                </motion.div>

                {/* Floating chip */}
                <motion.div
                  className="absolute bottom-5 right-4 flex items-center gap-2 rounded-xl bg-white p-3"
                  animate={{ y: [0, 3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                  style={{ boxShadow: "0 4px 16px rgba(10,42,29,0.2)" }}
                >
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sage text-forest">
                    <SearchCheck className="h-4 w-4" strokeWidth={2.2} />
                  </span>
                  <div>
                    <p className="text-[11px] font-bold text-forest">Reviewed by our team</p>
                    <p className="text-[9px] text-muted">Before we get in touch</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}