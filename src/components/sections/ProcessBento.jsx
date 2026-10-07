import { ClipboardList, SearchCheck, MessageCircle, MapPin, FileText } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../Button";
import MediaImage from "../MediaImage";
import Reveal from "../Reveal";

export default function ProcessBento() {
  return (
    <section className="mt-4 bg-paper py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal y={20}>
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-semibold text-forest">
                <span className="h-2 w-2 rounded-full bg-mid" />
                Our process
              </p>
              <h2 className="max-w-md text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                How a quote works, <span className="it">start to finish</span>
              </h2>
            </div>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <p className="max-w-xs text-sm text-muted">
              From your project details to a conversation with our team.
            </p>
          </Reveal>
        </div>

        {/* Bento Grid — 3 cols, 2 equal rows */}
        <div className="mt-10 grid grid-cols-1 gap-3.5 md:grid-cols-3 md:grid-rows-[minmax(0,1fr)_minmax(0,1fr)]">

          {/* ── Step 01: Left card (spans 2 rows) ── */}
          <Reveal
            y={24}
            duration={0.6}
            className="group overflow-hidden rounded-[1.25rem] bg-white md:row-span-2 flex flex-col"
            style={{
              boxShadow: "0 2px 4px rgba(18,64,44,0.06), 0 8px 24px rgba(18,64,44,0.10), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            {/* Text + icon on top */}
            <div className="p-6 pb-3">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-forest">
                <ClipboardList className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <span className="text-xs font-bold tracking-wide text-mid">Step 01</span>
              <h3 className="mt-1.5 text-xl font-semibold leading-snug">
                Send your project details
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                Tell us the service or material you need, the quantity and the
                project location.
              </p>
            </div>

            {/* Image on bottom — scaled up to be closer to text */}
            <div className="relative mt-auto h-[50%] overflow-hidden">
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-12 bg-gradient-to-b from-white to-transparent" />
              <MediaImage
                src="/images/process-site.jpg"
                alt="Site assessment and project planning"
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-110 object-cover object-top transition-transform duration-700 group-hover:scale-[1.15]"
              />
            </div>
          </Reveal>

          {/* ── Step 02: Top center card ── */}
          <Reveal
            y={24}
            duration={0.6}
            delay={0.1}
            className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-6 transition-shadow duration-300"
            style={{
              boxShadow: "0 2px 4px rgba(18,64,44,0.06), 0 8px 24px rgba(18,64,44,0.10), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-xs font-bold tracking-wide text-mid">Step 02</span>
            <h3 className="mt-1.5 text-xl font-semibold leading-snug">
              We review your requirements
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              Our team reviews what your project needs and prepares a detailed assessment.
            </p>

            {/* Visual — animated concentric review illustration */}
            <div className="relative mt-auto flex items-center justify-center pt-5">
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
            </div>
          </Reveal>

          {/* ── Step 03: Top right card ── */}
          <Reveal
            y={24}
            duration={0.6}
            delay={0.15}
            className="group flex flex-col overflow-hidden rounded-[1.25rem] bg-white p-6 transition-shadow duration-300"
            style={{
              boxShadow: "0 2px 4px rgba(18,64,44,0.06), 0 8px 24px rgba(18,64,44,0.10), 0 1px 2px rgba(0,0,0,0.04)",
            }}
          >
            <span className="text-xs font-bold tracking-wide text-mid">Step 03</span>
            <h3 className="mt-1.5 text-xl font-semibold leading-snug">
              We get in touch with you
            </h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
              We reach out using your preferred contact method to discuss next steps.
            </p>

            {/* Visual — animated mini quote card preview */}
            <div className="relative mt-auto flex justify-end pt-5">
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
            </div>
          </Reveal>

          {/* ── CTA Card: Bottom, spans 2 columns ── */}
          <Reveal
            y={24}
            duration={0.65}
            delay={0.2}
            className="md:col-span-2"
          >
            <div
              id="quote"
              className="relative flex h-full overflow-hidden rounded-[1.25rem] bg-forest"
              style={{
                boxShadow: "0 2px 4px rgba(10,42,29,0.06), 0 8px 24px rgba(10,42,29,0.10)",
              }}
            >
              {/* Background image — sits behind everything, aligned right */}
              <div className="absolute inset-0 hidden md:block">
                <MediaImage
                  src="/images/gallery-trucks.jpg"
                  alt="ALPACO trucks on the road"
                  loading="lazy"
                  className="absolute right-0 top-0 h-full w-3/5 object-cover"
                />
                {/* Full-width natural fade overlay */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: "linear-gradient(to right, #12402C 20%, #12402C 40%, #12402Cf0 50%, #12402Cbb 60%, #12402C55 75%, transparent 100%)",
                  }}
                />
              </div>

              {/* Text content — sits above the gradient */}
              <div className="relative z-20 flex flex-1 flex-col justify-center p-7 text-white md:max-w-[60%]">
                <div
                  className="pointer-events-none absolute -left-12 -top-16 h-44 w-44 rounded-full border-[28px] border-gold/10"
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <span className="text-xs font-semibold text-gold">
                    Ready when you are
                  </span>
                  <h3 className="mt-2 max-w-xs text-2xl font-bold leading-tight">
                    Have a project in mind?{" "}
                    <span className="it">Get in touch with us.</span>
                  </h3>
                  <p className="mt-2 max-w-xs text-[13px] text-white/75">
                    Tell us about your project and our team will review your
                    requirements and get in touch with you.
                  </p>
                  <div className="mt-5">
                    <Button to="/request-a-quote" variant="primary">
                      Request a Quote
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating badge — positioned in the visible image area */}
              <div
                className="absolute bottom-4 right-4 z-30 hidden rounded-xl bg-white/95 p-3 backdrop-blur-sm md:block"
                style={{
                  boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/20">
                    <FileText className="h-3.5 w-3.5 text-gold" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-forest">Project Quote</p>
                    <p className="text-[9px] text-muted">Ready for review</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
