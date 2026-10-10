import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { MapPin, Phone, Mail, Copy, Check } from "lucide-react";
import { siteConfig } from "../data/site";
import { EASE, fadeUp, wordsGroup, Words, useInViewProps } from "./motionPresets";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Facebook02Icon,
  InstagramIcon,
  Linkedin02Icon,
} from "@hugeicons/core-free-icons";

/* Resting position of the green light (percent of the panel). */
const REST = { x: 100, y: 100 };

/* Panel rises in, then its contents follow one after another */
const panelIn = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.1, delayChildren: 0.25 },
  },
};
const socialsGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

/* Plus-sign tile, inline SVG so there is no extra file. */
const PLUS_PATTERN = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

/** One contact line: icon tile, small label, then the value. */
function ContactRow({ icon: Icon, label, children }) {
  return (
    <motion.div variants={fadeUp} className="flex items-start gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-white/90">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <dt className="text-xs font-medium uppercase tracking-widest text-white/60">
          {label}
        </dt>
        <dd className="mt-1 text-base text-white/90">{children}</dd>
      </div>
    </motion.div>
  );
}

const linkCls =
  "inline-block rounded py-0.5 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

export default function ContactPanel() {
  const reduce = useReducedMotion();
  const inView = useInViewProps(0.2);
  const panelRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Cursor position, smoothed so the light drifts instead of snapping.
  const x = useMotionValue(REST.x);
  const y = useMotionValue(REST.y);
  const sx = useSpring(x, { stiffness: 90, damping: 22, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 22, mass: 0.6 });

  const left = useMotionTemplate`${sx}%`;
  const top = useMotionTemplate`${sy}%`;

  const handleMove = (e) => {
    if (reduce || !panelRef.current) return;
    const r = panelRef.current.getBoundingClientRect();
    x.set(((e.clientX - r.left) / r.width) * 100);
    y.set(((e.clientY - r.top) / r.height) * 100);
  };
  const handleLeave = () => {
    x.set(REST.x);
    y.set(REST.y);
  };

  const tel = siteConfig.phone.replace(/\s/g, "");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      /* clipboard blocked: the mailto link still works */
    }
  };

  const socials = [
    { label: "Facebook", href: siteConfig.facebook, icon: Facebook02Icon },
    { label: "Instagram", href: siteConfig.instagram, icon: InstagramIcon },
    { label: "LinkedIn", href: siteConfig.linkedin, icon: Linkedin02Icon },
  ];

  return (
    <motion.div
      ref={panelRef}
      variants={panelIn}
      {...inView}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ backgroundColor: "#0A1A14" }}
      className="relative isolate overflow-hidden rounded-[32px] p-7 text-white sm:p-10"
    >
      {/* Background: faint plus pattern and a green light that follows the
          cursor (rests in the bottom-right corner). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: PLUS_PATTERN, opacity: 0.05 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 rounded-full"
        style={{
          left,
          top,
          x: "-50%",
          y: "-50%",
          width: 320,
          height: 320,
          backgroundColor: "rgba(47,143,91,0.35)",
          filter: "blur(64px)",
        }}
      />

      <motion.span
        variants={fadeUp}
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-sage"
      >
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ backgroundColor: "#8CC5A2" }}
        />
        Get in touch
      </motion.span>

      <motion.h2
        variants={wordsGroup}
        aria-label="Prefer to talk now?"
        className="mt-7 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
      >
        <span aria-hidden="true">
          <Words text="Prefer to talk" /> <Words text="now" className="it text-gold" />
          <Words text="?" />
        </span>
      </motion.h2>
      <motion.p
        variants={fadeUp}
        className="mt-4 max-w-sm text-base leading-relaxed text-white/70"
      >
        Call, email or visit us. Or send your details with the form and our team
        will get in touch.
      </motion.p>

      <dl className="mt-10 space-y-6">
        <ContactRow icon={MapPin} label="Address">
          <a href="#location" className={linkCls}>
            {siteConfig.address}
          </a>
        </ContactRow>

        <ContactRow icon={Phone} label="Mobile">
          <a href={`tel:${tel}`} className={linkCls}>
            {siteConfig.phone}
          </a>
        </ContactRow>

        <ContactRow icon={Mail} label="Email">
          <span className="flex flex-wrap items-center gap-x-2">
            <a
              href={`mailto:${siteConfig.email}`}
              className={`${linkCls} break-all`}
            >
              {siteConfig.email}
            </a>
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label={copied ? "Email copied" : "Copy email address"}
              className="grid h-11 w-11 place-items-center rounded-full text-white/60 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? "done" : "copy"}
                  initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
                  transition={{ duration: reduce ? 0 : 0.15 }}
                  className={copied ? "text-gold" : ""}
                >
                  {copied ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </motion.span>
              </AnimatePresence>
            </button>
          </span>
        </ContactRow>
      </dl>

      <motion.div
        variants={socialsGroup}
        className="mt-10 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 border-t border-white/10 pt-5"
      >
        {socials.map(({ label, href, icon }, i) => (
          <motion.div key={label} variants={fadeUp} className="flex items-center gap-5">
            {i > 0 && <span aria-hidden="true" className="h-5 w-px bg-white/20" />}
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2.5 text-sm font-medium uppercase tracking-wider text-white/70 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <HugeiconsIcon icon={icon} size={20} strokeWidth={1.7} />
                {label}
              </a>
            ) : (
              <span className="inline-flex min-h-11 items-center justify-center gap-2.5 text-sm font-medium uppercase tracking-wider text-white/50">
                <HugeiconsIcon
                  icon={icon}
                  size={20}
                  strokeWidth={1.7}
                  className="opacity-60"
                />
                {label}
              </span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}