import { motion, useReducedMotion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

// Parent: staggers whatever is inside it, one after another
export const group = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

// Standalone card/tile: pass custom={index} for a left-to-right cascade
export const cardIn = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: EASE, delay: i * 0.12 },
  }),
};

// Photo wipes open from the top down
export const imageReveal = {
  hidden: { clipPath: "inset(0 0 100% 0)" },
  show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1, ease: EASE } },
};

// Word-by-word rise for headings (normal) and long paragraphs (fast)
export const wordsGroup = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
export const wordsGroupFast = {
  hidden: {},
  show: { transition: { staggerChildren: 0.025 } },
};
const wordRise = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.7, ease: EASE } },
};

// Splits text into words that rise out of a mask, one after another
export function Words({ text, className = "" }) {
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

// Spread on an element to play its "show" variant once when scrolled into view.
// Respects reduced-motion (shows immediately).
export function useInViewProps(amount = 0.2) {
  const reduce = useReducedMotion();
  return {
    initial: reduce ? "show" : "hidden",
    whileInView: "show",
    viewport: { once: true, amount },
  };
}