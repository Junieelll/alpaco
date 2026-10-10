import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Layers,
  Truck,
  UserCheck,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MediaImage from "../components/MediaImage";
import Button from "../components/Button";
import { services } from "../data/services";

/* ════════════════════════════════════════════════════════════
   Motion language

   One easing everywhere, long and soft. Nothing bounces or spins.

   Entrance (on load)   eyebrow → headline rises out of a mask →
                        copy settles
   Reveal (on scroll)   text fades up · headlines rise from a mask ·
                        photos are unveiled by a wipe while the image
                        itself settles from a slight zoom
   Scroll-linked        photos drift inside their frames · the CTA card
                        grows into place · CTA tiles float at different
                        speeds

   Reduced motion is handled once by <MotionConfig reducedMotion="user">
   plus a few explicit checks where a non-transform property is animated.
   ════════════════════════════════════════════════════════════ */

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: "-80px" };
/* Photos use `amount` instead of a margin so tall frames always trigger on phones */
const IMAGE_VIEWPORT = { once: true, amount: 0.15 };

const passthrough = { hidden: {}, visible: {} };

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE, delay },
  }),
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: EASE } },
};

const slideIn = {
  hidden: { opacity: 0, x: -14 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Headline rises out of an overflow mask */
const rise = {
  hidden: { y: "110%" },
  visible: { y: 0, transition: { duration: 1.1, ease: EASE } },
};

/** Photo starts slightly zoomed and eases back to 1 as it is revealed */
const settle = {
  hidden: { scale: 1.3 },
  visible: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

const drawLine = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 1.2, ease: EASE, delay: 0.15 } },
};

const wipe = (fromLeft) => ({
  hidden: {
    clipPath: fromLeft
      ? "inset(0% 100% 0% 0% round 1rem)"
      : "inset(0% 0% 0% 100% round 1rem)",
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0% round 1rem)",
    transition: { duration: 1.3, ease: EASE },
  },
});

const stagger = (staggerChildren = 0.1, delayChildren = 0.05) => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren } },
});

/* ════════════════════════════════════════════════════════════
   Content
   ════════════════════════════════════════════════════════════ */

const categories = [
  {
    label: "Materials",
    description:
      "Construction materials sourced and delivered directly to your site using our own fleet.",
    ids: ["roofing", "gravel-sand", "embankment"],
  },
  {
    label: "Site Works",
    description:
      "On-site operations handled by experienced crews and heavy equipment.",
    ids: ["demolition", "excavation"],
  },
  {
    label: "Logistics",
    description:
      "Reliable hauling and transportation integrated with every project we handle.",
    ids: ["hauling-trucking"],
  },
];

/* Decorative tiles around the CTA headline (desktop only) */
const ctaTiles = [
  { serviceIndex: 0, position: "left-[6%] top-[22%]", tilt: "-rotate-12", depth: 50 },
  { serviceIndex: 1, position: "left-[16%] top-[52%]", tilt: "rotate-12", depth: 30 },
  { serviceIndex: 2, position: "left-[4%] top-[62%]", tilt: "rotate-6", depth: 70 },
  { serviceIndex: 3, position: "right-[7%] top-[16%]", tilt: "rotate-12", depth: 40 },
  { serviceIndex: 4, position: "right-[14%] top-[58%]", tilt: "-rotate-6", depth: 60 },
  { serviceIndex: 5, position: "right-[4%] top-[48%]", tilt: "-rotate-12", depth: 35 },
];

const ctaPoints = [
  { icon: UserCheck, text: "A real person reviews every request" },
  { icon: ClipboardList, text: "No automated quotes" },
  { icon: Truck, text: "Delivered with our own fleet" },
  { icon: Layers, text: "Supply, site works and hauling in one team" },
];

const pad = (n) => String(n).padStart(2, "0");

/* ════════════════════════════════════════════════════════════
   Reveal primitives
   ════════════════════════════════════════════════════════════ */

/** Plays once when scrolled into view. */
function Reveal({ as = "div", variants = fadeUp, delay, ...props }) {
  const Tag = motion[as];
  return (
    <Tag
      variants={variants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    />
  );
}

/** Plays once in view and staggers any `Item` / variant children. */
function Stagger({ as = "div", gap, delayChildren, ...props }) {
  const Tag = motion[as];
  return (
    <Tag
      variants={stagger(gap, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      {...props}
    />
  );
}

/** Plays when its `Stagger` / variant parent does. */
function Item({ as = "div", variants = fadeUp, ...props }) {
  const Tag = motion[as];
  return <Tag variants={variants} {...props} />;
}

/** Text that rises out of its own mask. Use inside a heading. */
function Masked({ children }) {
  return (
    <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em] pr-[0.1em]">
      <motion.span variants={rise} className="block">
        {children}
      </motion.span>
    </span>
  );
}

function Eyebrow({ children, tone = "light" }) {
  const gold = tone === "gold";
  return (
    <p
      className={`mb-3 inline-flex items-center gap-2 text-xs font-semibold ${
        gold ? "text-gold" : "text-forest"
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${gold ? "bg-gold" : "bg-mid"}`} />
      {children}
    </p>
  );
}

function SectionIntro({
  eyebrow,
  headingAs: Heading = "h2",
  headingClassName = "text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl",
  lead,
  accent,
  className,
  delayChildren = 0.1,
  children,
}) {
  return (
    <Stagger className={className} delayChildren={delayChildren}>
      <Item>
        <Eyebrow>{eyebrow}</Eyebrow>
      </Item>
      <Heading className={headingClassName}>
        <Masked>
          {lead} {accent && <span className="it">{accent}</span>}
        </Masked>
      </Heading>
      {children && (
        <Item as="p" className="mt-4 max-w-[58ch] text-base text-muted sm:text-lg">
          {children}
        </Item>
      )}
    </Stagger>
  );
}

/* ════════════════════════════════════════════════════════════
   Page
   ════════════════════════════════════════════════════════════ */

export default function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-paper font-sans text-[16px] leading-relaxed text-ink antialiased">
        <Navbar />
        <main>
          <IntroSection />
          <CardGridSection />
          <DetailsSection />
          <CategoriesSection />
          <CtaSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}

/* ─────────────── Intro ─────────────── */

function IntroSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 pt-12 sm:px-8 lg:pt-16">
      <SectionIntro
        className="max-w-3xl"
        delayChildren={0.15}
        eyebrow="What we do"
        headingAs="h1"
        headingClassName="text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl"
        lead="Supply, site works"
        accent="and hauling"
      >
        ALPACO handles materials supply, demolition, excavation, and hauling —
        so your project gets what it needs from one dependable team. We source,
        deliver, and work on-site, keeping your timeline moving.
      </SectionIntro>
    </section>
  );
}

/* ─────────────── Card grid ─────────────── */

function CardGridSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          /* Stagger within each row of three, not across the whole grid */
          <Reveal key={service.id} delay={(index % 3) * 0.12}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  const { id, title, description, tag, image, alt, icon: Icon } = service;

  return (
    <Link
      to={`/services#${id}`}
      className="group relative block h-[27rem] w-full overflow-hidden rounded-3xl bg-forest shadow-md transition duration-500 ease-out hover:-translate-y-1 hover:shadow-xl"
    >
      {/* `settle` eases the photo from a slight zoom as the card arrives */}
      <motion.div variants={settle} className="absolute inset-0">
        <MediaImage
          src={image}
          alt={alt || `Photo for ${title}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
        {tag}
      </span>
      <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-forest shadow-sm">
        {Icon && <Icon className="h-[18px] w-[18px]" strokeWidth={2.25} />}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="text-xl font-bold leading-tight transition-colors duration-200 group-hover:text-gold">
          {title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-white/80">{description}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-white py-1.5 pl-3.5 pr-1.5 text-[12.5px] font-bold text-deep transition-colors duration-200 group-hover:bg-sage">
          Learn More
          <span className="grid h-6.5 w-6.5 place-items-center rounded-full bg-deep text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight className="h-3 w-3" strokeWidth={2.5} />
          </span>
        </span>
      </div>
    </Link>
  );
}

/* ─────────────── Detailed breakdown ─────────────── */

function DetailsSection() {
  return (
    <section className="border-t border-forest/10 bg-sage/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <SectionIntro
          className="mb-14 max-w-2xl"
          eyebrow="Service details"
          lead="A closer look at"
          accent="each service"
        >
          Every service we offer is designed to work together. Materials supply
          feeds directly into site work, and our own trucks move everything — so
          there are fewer delays and fewer providers to coordinate.
        </SectionIntro>

        <div>
          {services.map((service, index) => (
            <div key={service.id}>
              {index > 0 && (
                <Reveal
                  variants={drawLine}
                  className="my-16 h-px origin-left bg-forest/20"
                />
              )}
              <ServiceDetailRow service={service} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceDetailRow({ service, index }) {
  const {
    id,
    title,
    longDescription,
    tag,
    image,
    alt,
    icon: Icon,
    features = [],
  } = service;

  const isEven = index % 2 === 0;
  const reduce = useReducedMotion();

  /* The photo drifts a few percent inside its frame as the row scrolls past */
  const triggerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["-5%", "5%"]
  );

  return (
    <div
      id={id}
      className={`flex scroll-mt-28 flex-col gap-8 lg:items-center lg:gap-14 ${
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      {/*
        The element that observes scroll is NOT the clipped one. A target whose
        own clip-path hides it entirely reports zero visibility, so on phones
        the reveal never fired. The outer wrapper stays unclipped and hands the
        "visible" signal down to the layers below it.
      */}
      <motion.div
        ref={triggerRef}
        variants={passthrough}
        initial="hidden"
        whileInView="visible"
        viewport={IMAGE_VIEWPORT}
        className="lg:w-1/2"
      >
        <motion.div
          variants={reduce ? fade : wipe(isEven)}
          className="overflow-hidden rounded-2xl"
        >
          <motion.div variants={settle}>
            <motion.div style={{ y: imageY, scale: reduce ? 1 : 1.12 }}>
              <MediaImage
                src={image}
                alt={alt || title}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <Stagger className="lg:w-1/2" delayChildren={0.3}>
        <Item className="flex items-center gap-3">
          <span className="text-sm font-semibold tabular-nums text-forest/70">
            {pad(index + 1)}
          </span>
          <motion.span
            variants={drawLine}
            className="h-px w-8 origin-left bg-forest/40"
          />
          <span className="rounded-full bg-sage px-3 py-1 text-xs font-medium text-forest">
            {tag}
          </span>
        </Item>

        <Item className="mt-5 flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-forest/20 text-forest">
            {Icon && <Icon className="h-5 w-5" strokeWidth={1.75} />}
          </span>
          <h3 className="text-2xl font-bold leading-tight tracking-tight text-deep sm:text-3xl">
            <Masked>{title}</Masked>
          </h3>
        </Item>

        <Item
          as="p"
          className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-muted"
        >
          {longDescription}
        </Item>

        {features.length > 0 && (
          <motion.ul
            variants={stagger(0.08, 0.05)}
            className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
          >
            {features.map((feature) => (
              <motion.li
                key={feature}
                variants={slideIn}
                className="flex items-start gap-2 text-sm text-ink"
              >
                <CheckCircle2
                  className="mt-0.5 h-4 w-4 shrink-0 text-mid"
                  strokeWidth={2}
                />
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        )}

        <Item className="mt-6">
          <Button to="/request-a-quote" variant="text-forest">
            Inquire about this service
          </Button>
        </Item>
      </Stagger>
    </div>
  );
}

/* ─────────────── Categories ─────────────── */

function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <SectionIntro
        className="mb-10 max-w-2xl"
        eyebrow="How it all connects"
        lead="Three capabilities,"
        accent="one team"
      />

      <Stagger className="grid gap-6 md:grid-cols-3" gap={0.14}>
        {categories.map((category, index) => (
          <CategoryCard key={category.label} category={category} index={index} />
        ))}
      </Stagger>
    </section>
  );
}

function CategoryCard({ category, index }) {
  const { label, description, ids } = category;
  const items = services.filter((s) => ids.includes(s.id));

  return (
    <motion.div
      variants={fadeUp}
      className="flex h-full flex-col rounded-2xl border border-forest/10 bg-white p-6 shadow-[0_0_70px_rgba(0,0,0,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-md"
    >
      <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-sage text-lg font-bold text-forest">
        {pad(index + 1)}
      </span>
      <h3 className="text-xl font-bold text-deep">{label}</h3>
      <p className="mt-2 text-sm text-muted">{description}</p>

      <motion.ul
        variants={stagger(0.09, 0.35)}
        className="mt-5 flex flex-col gap-2 border-t border-forest/10 pt-5"
      >
        {items.map(({ id, title, icon: Icon }) => (
          <motion.li
            key={id}
            variants={slideIn}
            className="flex items-center gap-2 text-sm text-ink"
          >
            <Icon className="h-4 w-4 shrink-0 text-mid" strokeWidth={2} />
            {title}
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

/* ─────────────── Call to action ─────────────── */

/** Decorative tile that floats at its own speed while the section scrolls. */
function CtaTile({ progress, icon: Icon, position, tilt, depth }) {
  const reduce = useReducedMotion();
  const y = useTransform(progress, [0, 1], reduce ? [0, 0] : [depth, -depth]);

  return (
    <Item aria-hidden="true" className={`absolute hidden md:block ${position}`}>
      <motion.div style={{ y }}>
        <div
          className={`grid h-16 w-16 place-items-center rounded-2xl border border-dashed border-white/25 bg-white/5 text-white/70 ${tilt}`}
        >
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </div>
      </motion.div>
    </Item>
  );
}

function CtaSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  /* The card grows into place as it enters the viewport */
  const cardScale = useTransform(
    scrollYProgress,
    [0, 0.3],
    reduce ? [1, 1] : [0.92, 1]
  );

  return (
    <section ref={sectionRef} className="p-3 sm:p-4">
      <Stagger
        delayChildren={0.15}
        style={{ scale: cardScale }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] bg-deep sm:rounded-[2rem]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest/50 via-deep to-deep" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gold/25 via-gold/5 to-transparent" />

        {ctaTiles.map(({ serviceIndex, ...tile }) => {
          const Icon = services[serviceIndex]?.icon;
          return Icon ? (
            <CtaTile
              key={serviceIndex}
              progress={scrollYProgress}
              icon={Icon}
              {...tile}
            />
          ) : null;
        })}

        <div className="relative mx-auto flex max-w-2xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pt-20 lg:pb-24 lg:pt-28">
          <h2 className="text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">
            <Masked>
              Tell us about <span className="it text-gold">your project</span>
            </Masked>
          </h2>
          <Item as="p" className="mt-5 max-w-lg text-base text-white/75 sm:text-lg">
            Send us your requirements and our team will review them and get in
            touch.
          </Item>
          <Item className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button to="/request-a-quote" variant="primary">
              Request a Quote
            </Button>
            <Button to="/projects" variant="text-white">
              View Our Projects
            </Button>
          </Item>
        </div>

        <motion.ul
          variants={stagger(0.1, 0.1)}
          className="relative grid border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4"
        >
          {ctaPoints.map(({ icon: Icon, text }) => (
            <motion.li
              key={text}
              variants={fadeUp}
              className="flex items-center gap-3 px-6 py-4 text-sm text-white/80"
            >
              <Icon className="h-4 w-4 shrink-0 text-gold" strokeWidth={2} />
              {text}
            </motion.li>
          ))}
        </motion.ul>
      </Stagger>
    </section>
  );
}