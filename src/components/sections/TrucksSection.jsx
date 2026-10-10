import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Button from "../Button";

const EASE = [0.22, 1, 0.36, 1];

// Text choreography: parent staggers its children once the block scrolls into view
const textContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
};
const wordRise = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};
const headingWords = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
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

export default function TrucksSection() {
  const reduce = useReducedMotion();
  // Trigger lives on a plain, never-clipped wrapper so the reveal can't get stuck hidden
  const stageRef = useRef(null);
  const stageInView = useInView(stageRef, { once: true, amount: 0.1 });
  const showStage = reduce || stageInView;

  return (
    <section className="px-3 sm:px-4">
      {/*
        Mobile: stacked layout (text on top, full image below) so the whole photo is visible.
        sm and up: original full-bleed background layout.
      */}
      <div className="relative isolate mx-auto flex max-w-7xl flex-col overflow-hidden rounded-[1.75rem] bg-deep text-white sm:min-h-[500px] sm:flex-row sm:items-center sm:rounded-[2rem] lg:min-h-[540px]">
        {/* ── Desktop / tablet: full-bleed background image ── */}
        <motion.img
          src="/images/dump-truck.png"
          alt="ALPACO dump truck hauling materials"
          loading="lazy"
          className="absolute inset-0 -z-20 hidden h-full w-full object-cover sm:block sm:object-[95%_bottom] lg:object-[98%_bottom]"
          initial={reduce ? false : { scale: 1.08 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
        />

        {/* Left-side gradient for readable text (desktop / tablet only) */}
        <div className="absolute inset-0 -z-10 hidden sm:block sm:bg-gradient-to-r sm:from-black/75 sm:from-10% sm:via-black/50 sm:via-35% sm:to-transparent sm:to-58%" />

        {/* Curving road accent — draws itself in (desktop / tablet only) */}
        <svg
          className="pointer-events-none absolute -bottom-8 left-0 -z-10 hidden w-full max-w-none opacity-80 sm:block"
          viewBox="0 0 1200 240"
          fill="none"
          aria-hidden="true"
        >
          <motion.path
            d="M0 230C250 90 700 20 1200 60"
            stroke="#EDAA1C"
            strokeWidth="10"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
          />
          <motion.path
            d="M0 238C300 130 720 70 1200 100"
            stroke="#8FD16B"
            strokeWidth="5"
            strokeLinecap="round"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.8, ease: "easeInOut", delay: 0.5 }}
          />
        </svg>

        {/* ── Text content (staggered entrance) ── */}
        <motion.div
          className="relative z-10 max-w-md px-6 pb-0 pt-12 sm:px-10 sm:py-16 lg:max-w-lg lg:px-14"
          variants={textContainer}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.35 }}
        >
          {/* Eyebrow: dot pops in and pulses, label slides in */}
          <motion.p
            variants={fadeUp}
            className="mb-2.5 flex items-center gap-2 text-xs font-semibold text-gold"
          >
            <span className="relative flex h-2 w-2">
              {!reduce && (
                <motion.span
                  className="absolute inset-0 rounded-full bg-gold"
                  animate={{ scale: [1, 2.6], opacity: [0.6, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
              )}
              <span className="relative h-2 w-2 rounded-full bg-gold" />
            </span>
            Hauling & trucking
          </motion.p>

          {/* Heading: word-by-word rise, italic phrase last */}
          <motion.h2
            variants={headingWords}
            aria-label="Our trucks move your materials where they are needed"
            className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl lg:text-[2.65rem]"
          >
            <span aria-hidden="true">
              <Words text="Our trucks move your materials" />{" "}
              <Words text="where they are needed" className="it" />
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 max-w-sm text-sm leading-relaxed text-white/85 sm:max-w-md sm:text-base"
          >
            Dump trucks for gravel, sand, embankment materials and debris. We
            deliver supply orders and haul away excavation and demolition
            waste, so one team can handle both the delivery and the clearing.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6">
            <Button to="/contact" variant="forest">
              Inquire for Hauling
            </Button>
          </motion.div>
        </motion.div>

        {/* ── Mobile only: full image in its own stage, sliding in from the right ── */}
        <div ref={stageRef} className="relative mt-4 sm:hidden">
          <motion.div
            className="relative overflow-hidden"
            initial={false}
            animate={{ clipPath: showStage ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)" }}
            transition={{ duration: 1.1, ease: EASE }}
          >
            <motion.img
              src="/images/dump-truck.png"
              alt="ALPACO dump truck hauling materials"
              decoding="async"
              className="block h-auto w-full"
              initial={false}
              animate={showStage ? { x: 0, scale: 1 } : { x: 48, scale: 1.06 }}
              transition={{ duration: 1.3, ease: EASE }}
            />
            {/* Blend the top edge of the photo into the card */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-deep via-deep/70 to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}