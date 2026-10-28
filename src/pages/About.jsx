import { useRef } from "react";
import { HardHat } from "lucide-react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import MediaImage from "../components/MediaImage";
import { siteConfig } from "../data/site";

/* ------------------------------------------------------------------ */
/* Content. Edit here, not in the JSX below.                           */
/* ------------------------------------------------------------------ */

const STARTED_YEAR = 2013;

const timeline = [
  {
    year: "2013",
    name: "Pintor Marketing",
    text: "The start. A supply business selling gravel, sand, good lumber and coco lumber.",
  },
  {
    year: "2014",
    name: "Amali Builders",
    text: "A fresh start under a new name, with hardware, trucking and hollow blocks added to the line.",
  },
  {
    year: "2017",
    name: "Alpaco Trading",
    text: "Formally established on December 13, 2017. It is still operating and serving customers today.",
  },
  {
    year: "Now",
    name: "Alpaco Diversified Development OPC",
    text: "Supply, roofing, hauling, demolition and excavation under one registered company.",
    current: true,
  },
];

const materials = [
  ["Aggregates and fill", "Gravel, sand, boulders, base course, subbase and embankment materials."],
  ["Lumber and masonry", "Good lumber, coco lumber, plywood, cement and concrete hollow blocks."],
  ["Hardware and building supplies", "Steel and angle bars, G.I. and PVC pipes, doors and door jambs, electrical, plumbing and sanitary materials, and general hardware."],
  ["Roofing", "Roof and wall panels, plus installation support."],
];

const services = [
  ["Hauling and trucking", "Truck-based hauling to move materials where your project needs them."],
  ["Demolition and excavation", "Site work for projects that need clearing, digging or tearing down first."],
  ["Construction and renovation", "Building, renovation and related work, handled with the supply side already in the conversation."],
];

const steps = [
  ["Send your requirements", "Tell us the materials, hauling or site work you need."],
  ["We review and get in touch", "We look at what your project calls for and reach out to you."],
  ["Agree on the scope", "Settle what is supplied, delivered and done, then get moving."],
];

/* ------------------------------------------------------------------ */
/* Motion helpers                                                      */
/* ------------------------------------------------------------------ */

// One easing curve for the whole page so every movement feels related.
const ease = [0.22, 1, 0.36, 1];
const viewport = { once: true, margin: "0px 0px -12% 0px" };

/**
 * Headline reveal: each word rises out of its own clipped line.
 * Used for every heading so the page has one consistent "voice".
 */
function Words({ text, className = "", inView = false, delay = 0 }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  // The viewport trigger lives on the outer wrapper. The inner word starts
  // pushed out of its clipped line, and an observer can never see a fully
  // clipped element, so it must not be the one being watched.
  const trigger = inView
    ? { initial: reduce ? false : "hidden", whileInView: "visible", viewport }
    : { initial: reduce ? false : "hidden", animate: "visible" };
  return words.map((word, i) => (
    <span key={`${word}-${i}`} aria-hidden="true">
      <motion.span
        className="-my-[0.1em] inline-block overflow-hidden py-[0.1em] align-bottom"
        {...trigger}
      >
        <motion.span
          className={`inline-block ${className}`}
          variants={{
            hidden: { y: "112%" },
            visible: { y: 0, transition: { duration: 0.85, ease, delay: delay + i * 0.045 } },
          }}
        >
          {word}
        </motion.span>
      </motion.span>
      {i < words.length - 1 ? " " : null}
    </span>
  ));
}

/** Plain block that eases in once when it scrolls into view. */
function Rise({ children, delay = 0, y = 14, className = "", as = "div" }) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.7, ease, delay }}
    >
      {children}
    </Tag>
  );
}

/** Staggered list: rules draw first, then each row's text slides in. */
const listVariants = (delay) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: delay } },
});
const ruleVariants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.8, ease } },
};
const rowVariants = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease } },
};

function OfferList({ title, items, delay = 0 }) {
  const reduce = useReducedMotion();
  const state = reduce ? { initial: false } : { initial: "hidden" };
  return (
    <motion.div
      variants={listVariants(delay)}
      {...state}
      whileInView="visible"
      viewport={viewport}
    >
      <h3 className="pb-3 text-lg font-semibold text-forest">{title}</h3>
      <motion.span
        aria-hidden="true"
        variants={ruleVariants}
        className="block h-px origin-left bg-forest"
      />
      <dl>
        {items.map(([name, text], index) => (
          <motion.div key={name} variants={rowVariants} className="relative py-5">
            {index > 0 && (
              <motion.span
                aria-hidden="true"
                variants={ruleVariants}
                className="absolute inset-x-0 top-0 block h-px origin-left bg-forest/10"
              />
            )}
            <dt className="font-semibold text-ink">{name}</dt>
            <dd className="mt-1 text-sm leading-7 text-muted sm:text-base">{text}</dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
}

/** One stop on the timeline. Dims until the scroll reaches it, then lights up. */
function TimelineItem({ item }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const reached = useInView(ref, { once: true, margin: "0px 0px -45% 0px" });
  const active = reduce || reached;

  return (
    <li ref={ref} className="relative pl-8 sm:pl-10">
      <motion.span
        aria-hidden="true"
        className={`absolute left-2.5 top-[3px] z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 ${
          active
            ? item.current
              ? "border-forest bg-[#CDF077]"
              : "border-forest bg-forest"
            : "border-mid/40 bg-paper"
        }`}
        animate={reduce ? undefined : { scale: active ? [1, 1.6, 1] : 1 }}
        transition={{ duration: 0.6, ease }}
      />
      <motion.div
        animate={{ opacity: active ? 1 : 0.3, x: active ? 0 : 10 }}
        initial={false}
        transition={{ duration: 0.7, ease }}
      >
        <span className="text-sm font-semibold text-mid">{item.year}</span>
        <h3 className="mt-1 text-lg font-semibold tracking-tight text-ink sm:text-xl">{item.name}</h3>
        <p className="mt-1.5 max-w-md text-sm leading-7 text-muted sm:text-base">{item.text}</p>
      </motion.div>
    </li>
  );
}

/* ------------------------------------------------------------------ */

export default function About() {
  const reduce = useReducedMotion();
  const tel = `tel:${String(siteConfig.phone ?? "").replace(/[^\d+]/g, "")}`;

  // Hero image drifts slower than the page.
  const heroRef = useRef(null);
  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start end", "end start"],
  });
  const heroShift = useTransform(heroProgress, [0, 1], ["-7%", "7%"]);

  // Timeline spine fills as you scroll down it.
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 55%"],
  });

  // Rings in the closing card drift against the scroll.
  const ctaRef = useRef(null);
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "end start"],
  });
  const ringY = useTransform(ctaProgress, [0, 1], [-30, 30]);
  const ringScale = useTransform(ctaProgress, [0, 0.5, 1], [0.9, 1, 1.12]);

  return (
    <div className="min-h-screen bg-paper font-sans text-ink antialiased">
      <Navbar />

      <main>
        {/* Hero: the one orchestrated page-load moment */}
        <section className="mx-auto flex max-w-7xl flex-col justify-center px-5 pb-14 pt-10 sm:px-8 lg:min-h-[calc(100svh-6.5rem)] lg:pb-8 lg:pt-2">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <motion.p
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
                className="text-sm font-semibold text-mid"
              >
                About ALPACO Diversified Development OPC
              </motion.p>

              <h1
                aria-label="We started with gravel and lumber. Now we help supply and build the whole project."
                className="mt-3 max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-ink sm:text-5xl lg:mt-4 lg:text-[clamp(2.25rem,3.4vw+1.2svh,3.75rem)]"
              >
                <Words text="We started with gravel and lumber." delay={0.15} />{" "}
                <Words
                  text="Now we help supply and build the whole project."
                  className="it font-normal text-mid"
                  delay={0.5}
                />
              </h1>

              <motion.p
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 1.0 }}
                className="mt-5 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8 lg:mt-5"
              >
                Since {STARTED_YEAR}, our owner has been supplying builders with the materials they need. ALPACO brings that
                experience, along with hauling, roofing and site work, into one company you can talk to once.
              </motion.p>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease, delay: 1.15 }}
                className="mt-6 flex flex-wrap items-center gap-4 lg:mt-7"
              >
                <Button to="/request-a-quote" variant="primary">Request a Quote</Button>
                <Button to="/services" variant="text-forest">See what we offer</Button>
              </motion.div>
            </div>

            <div className="relative" ref={heroRef}>
              <div className="rounded-[1.75rem] shadow-lg shadow-deep/10">
                <motion.div
                  className="aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-sage sm:aspect-[4/3] lg:aspect-auto lg:h-[clamp(300px,calc(100svh-17rem),540px)]"
                  initial={reduce ? false : { clipPath: "inset(14% 10% 14% 10% round 1.75rem)" }}
                  animate={{ clipPath: "inset(0% 0% 0% 0% round 1.75rem)" }}
                  transition={{ duration: 1.2, ease, delay: 0.2 }}
                >
                  <motion.div
                    className="h-full w-full"
                    style={reduce ? undefined : { y: heroShift, scale: 1.14 }}
                  >
                    <MediaImage
                      src="/alpaco-logo.png"
                      alt="Construction materials and site operations"
                      className="h-full w-full object-contain pt-5"
                    />
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 140, damping: 16, delay: 1.1 }}
                className="absolute -bottom-5 left-4 flex items-center gap-3.5 rounded-2xl bg-deep/95 p-2.5 pr-5 shadow-xl shadow-deep/25 ring-1 ring-white/10 backdrop-blur sm:left-6"
              >
                <span
                  aria-hidden="true"
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#CDF077] text-deep"
                >
                  <HardHat className="h-6 w-6" strokeWidth={2} />
                </span>
                <span className="leading-tight">
                  <span className="block text-lg font-semibold tracking-tight text-white">Since {STARTED_YEAR}</span>
                  <span className="mt-0.5 block text-xs text-white/65">Supplying builders</span>
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Owner story + timeline */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2
                aria-label="Built one business at a time"
                className="max-w-lg text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl"
              >
                <Words text="Built one business at a time" inView />
              </h2>
              <div className="mt-6 max-w-xl space-y-4 text-base leading-8 text-muted sm:text-lg">
                <Rise delay={0.1}>
                  <p>
                    It began in {STARTED_YEAR} with Pintor Marketing, a small supply business selling gravel, sand, good lumber
                    and coco lumber. A year later it was reborn as Amali Builders, adding hardware, trucking and hollow blocks.
                  </p>
                </Rise>
                <Rise delay={0.2}>
                  <p>
                    Alpaco Trading followed and is still serving customers today. ALPACO Diversified Development OPC is the
                    latest step: a registered company that puts supply, roofing, hauling and site work under one name.
                  </p>
                </Rise>
              </div>

              <div className="relative mt-10 max-w-xl pl-6">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 block w-0.5 origin-top bg-gold"
                  initial={reduce ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={viewport}
                  transition={{ duration: 0.9, ease }}
                />
                <p
                  aria-label="From the first load of gravel to the last roof panel, you deal with one team."
                  className="text-2xl font-medium leading-snug tracking-tight text-forest sm:text-3xl"
                >
                  <Words text="From the first load of gravel to the last roof panel, you deal with one team." inView delay={0.3} />
                </p>
                <Rise delay={0.9} y={8} className="mt-3 text-sm leading-6 text-muted">
                  <p>Materials, hauling, roofing and site work, coordinated in a single conversation.</p>
                </Rise>
              </div>
            </div>

            <div ref={timelineRef} className="relative">
              <span
                aria-hidden="true"
                className="absolute left-2.5 top-[10px] bottom-2 w-px -translate-x-1/2 bg-forest/15"
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-2.5 top-[10px] bottom-2 w-px -translate-x-1/2 origin-top bg-forest"
                style={reduce ? undefined : { scaleY: timelineProgress }}
              />
              <ol className="space-y-10">
                {timeline.map((item) => (
                  <TimelineItem key={item.year} item={item} />
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* What you can get from us */}
        <section className="border-y border-forest/10 bg-white/70">
          <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
            <div className="max-w-2xl">
              <h2
                aria-label="What you can get from us"
                className="text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl"
              >
                <Words text="What you can get from us" inView />
              </h2>
              <Rise delay={0.15}>
                <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
                  Every project needs a different mix. Tell us what yours needs and we will confirm what we can supply and do.
                </p>
              </Rise>
            </div>

            <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
              <OfferList title="Materials" items={materials} />
              <OfferList title="Services" items={services} delay={0.25} />
            </div>
          </div>
        </section>

        {/* How to get started */}
        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
          <h2
            aria-label="Getting started takes one message"
            className="max-w-xl text-3xl font-semibold leading-[1.12] tracking-[-0.035em] sm:text-4xl"
          >
            <Words text="Getting started takes one message" inView />
          </h2>

          <motion.ol
            className="relative mt-10 grid gap-8 md:grid-cols-3 md:gap-6"
            initial={reduce ? false : "hidden"}
            whileInView="visible"
            viewport={viewport}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.28, delayChildren: 0.1 } } }}
          >
            {/* Line connecting the three steps (desktop) */}
            <span aria-hidden="true" className="absolute left-5 top-5 hidden h-px w-[calc(66.667%+1rem)] bg-forest/15 md:block" />
            <motion.span
              aria-hidden="true"
              className="absolute left-5 top-5 hidden h-px w-[calc(66.667%+1rem)] origin-left bg-forest md:block"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: { duration: 1.1, ease, delay: 0.2 } },
              }}
            />
            {steps.map(([title, text], index) => (
              <li key={title} className="relative flex gap-4 md:block">
                <motion.span
                  variants={{
                    hidden: { scale: 0.4, opacity: 0 },
                    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 220, damping: 16 } },
                  }}
                  className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#CDF077] text-base font-bold text-deep"
                >
                  {index + 1}
                </motion.span>
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
                  }}
                  className="md:mt-4"
                >
                  <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1.5 max-w-xs text-sm leading-7 text-muted sm:text-base">{text}</p>
                </motion.div>
              </li>
            ))}
          </motion.ol>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-7xl px-5 pb-16 sm:px-8 lg:pb-24" ref={ctaRef}>
          <motion.div
            className="relative overflow-hidden rounded-[1.75rem] bg-deep px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14"
            initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.9, ease }}
          >
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-20 h-64 w-64 rounded-full border border-white/10"
              style={reduce ? undefined : { y: ringY, scale: ringScale }}
            />
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -right-2 -top-10 h-44 w-44 rounded-full border border-white/10"
              style={reduce ? undefined : { y: ringY, scale: ringScale }}
            />
            <div className="relative grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div className="max-w-3xl">
                <h2
                  aria-label="Tell us what your project needs."
                  className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl"
                >
                  <Words text="Tell us what your project needs." inView delay={0.2} />
                </h2>
                <Rise delay={0.5}>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-white/75 sm:text-base sm:leading-8">
                    Share the materials, hauling or site work you are looking for. We will review your requirements and get in touch.
                  </p>
                </Rise>
              </div>
              <Rise delay={0.7} className="flex shrink-0 flex-wrap items-center gap-4">
                <Button to="/request-a-quote" variant="primary">Request a Quote</Button>
                {siteConfig.phone && (
                  <a
                    href={tel}
                    className="rounded-full border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#CDF077]"
                  >
                    Call {siteConfig.phone}
                  </a>
                )}
              </Rise>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
}