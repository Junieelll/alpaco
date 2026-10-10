import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import Button from "./Button";
import alpacoLogo from "../assets/alpaco-logo.png";
import { siteConfig } from "../data/site";

/**
 * Where an element sits on the page, from layout offsets only. Unlike
 * getBoundingClientRect this ignores transforms, so a page that animates in
 * with a transform can't throw the measurement off.
 */
function pagePosition(el) {
  let top = 0;
  let left = 0;
  for (let node = el; node; node = node.offsetParent) {
    top += node.offsetTop + (node === el ? 0 : node.clientTop);
    left += node.offsetLeft + (node === el ? 0 : node.clientLeft);
  }
  return { top, left };
}

const EASE = [0.22, 1, 0.36, 1];

// The entrance plays once per page load, not every time the route changes
let introPlayed = false;

// Bar drops in, then logo, links, phone chip and button follow one after another
const navVariants = {
  hidden: { opacity: 0, y: -28, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, staggerChildren: 0.07, delayChildren: 0.2 },
  },
};
const navItem = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};
const linkList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// Mobile dropdown: panel opens, then its rows slide in one by one
const menuVariants = {
  closed: { opacity: 0, y: -8, scale: 0.98, transition: { duration: 0.18, ease: "easeIn" } },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.22,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};
const menuItem = {
  closed: { opacity: 0, x: -12 },
  open: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE } },
};

/**
 * Floating navbar that stays pinned while you scroll, wherever it is placed.
 *
 * `position: sticky` stops working when a parent has overflow-hidden (the
 * hero cards do), and a fixed bar inside an `isolate` hero can be covered by
 * later sections. So the bar itself is rendered into a host element at the
 * start of <body>, while an empty "slot" stays in the page and reserves the
 * same space. At the top of the page the bar sits exactly where the slot is;
 * after scrolling it glides up and stays pinned.
 */
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [host, setHost] = useState(null); // element at the start of <body>
  const [place, setPlace] = useState(null); // where the bar sits at the top of the page
  const [navHeight, setNavHeight] = useState(0);
  const [stuck, setStuck] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const [playIntro] = useState(() => !introPlayed);

  const slotRef = useRef(null);
  const navRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const location = useLocation();

  useEffect(() => {
    introPlayed = true;
  }, []);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  // Host element first in <body>, so keyboard and screen reader order still
  // starts with the navigation.
  useLayoutEffect(() => {
    const el = document.createElement("div");
    document.body.prepend(el);
    setHost(el);
    return () => el.remove();
  }, []);

  // Measure where the slot is so the bar can start in the same spot.
  useLayoutEffect(() => {
    const slot = slotRef.current;
    if (!slot) return undefined;

    const measure = () => {
      const { top, left } = pagePosition(slot);
      const style = getComputedStyle(slot);
      const next = {
        top: top + parseFloat(style.paddingTop),
        left: left + parseFloat(style.paddingLeft),
        right:
          document.documentElement.clientWidth -
          (left + slot.offsetWidth) +
          parseFloat(style.paddingRight),
      };
      setPlace((prev) =>
        prev &&
        prev.top === next.top &&
        prev.left === next.left &&
        prev.right === next.right
          ? prev
          : next
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(slot);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Keep the slot exactly as tall as the bar so the page layout never shifts.
  const ready = Boolean(host && place);
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;
    const update = () => setNavHeight(nav.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(nav);
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bar =
    ready &&
    createPortal(
      <MotionConfig reducedMotion="user">
      <div
        className={`fixed z-50 font-sans text-[16px] leading-relaxed text-ink antialiased ${
          stuck ? "top-3 sm:top-4" : ""
        } ${reduceMotion ? "" : "transition-[top] duration-300 ease-out"}`}
        style={{
          left: place.left,
          right: place.right,
          ...(stuck ? null : { top: place.top }),
        }}
      >
        <motion.nav
          ref={navRef}
          variants={navVariants}
          initial={playIntro ? "hidden" : "show"}
          animate="show"
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white py-3 pl-5 pr-2 transition-shadow duration-300 ${
            stuck ? "shadow-xl ring-1 ring-black/5" : "shadow-lg"
          }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <motion.div variants={navItem} className="shrink-0">
            <Link
              to="/"
              onClick={handleNavClick}
              className="flex shrink-0 items-center transition-transform hover:opacity-95"
              aria-label="ALPACO home"
            >
              <img
                src={alpacoLogo}
                alt={siteConfig.name}
                className="h-9 w-auto"
              />
            </Link>
          </motion.div>

          {/* Desktop Links */}
          <motion.ul
            variants={linkList}
            onMouseLeave={() => setHoveredLink(null)}
            className="hidden items-center gap-1 text-sm font-medium lg:flex"
          >
            {siteConfig.navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <motion.li
                  key={link.label}
                  variants={navItem}
                  onMouseEnter={() => setHoveredLink(link.label)}
                >
                  <Link
                    to={link.href}
                    className={`relative inline-block rounded-full px-4 py-2 transition-colors duration-200 ${
                      isActive
                        ? "bg-[#CDF077] font-semibold text-deep"
                        : "text-ink"
                    }`}
                  >
                    {/* Hover highlight glides from link to link */}
                    {hoveredLink === link.label && !isActive && (
                      <motion.span
                        layoutId="nav-hover"
                        className="absolute inset-0 rounded-full bg-sage/70"
                        transition={{ type: "spring", stiffness: 500, damping: 38 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Call Now Chip */}
            <motion.div variants={navItem} className="hidden items-center gap-2.5 xl:flex">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#CDF077] text-forest">
                <Phone className="h-4 w-4" strokeWidth={2.2} />
              </span>
              <span className="text-xs leading-tight">
                <span className="block text-muted">Call now</span>
                <span className="font-semibold text-deep">
                  {siteConfig.phone}
                </span>
              </span>
            </motion.div>

            {/* Request a Quote CTA */}
            <motion.div variants={navItem}>
              <Button to="/request-a-quote" variant="forest">
                Request a Quote
              </Button>
            </motion.div>

            {/* Mobile Hamburger Toggle */}
            <motion.button
              variants={navItem}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="-mr-1 grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-sage/50 lg:hidden"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {/* Icon turns as it swaps between menu and close */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="grid place-items-center"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6" strokeWidth={2.2} />
                  ) : (
                    <Menu className="h-6 w-6" strokeWidth={2.2} />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </motion.nav>

        {/* Mobile Menu Dropdown. Floats over the page and scrolls if it is taller than the screen. */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-menu"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="mx-auto mt-2 max-h-[calc(100dvh-8rem)] max-w-7xl overflow-y-auto rounded-3xl bg-white p-3 shadow-xl lg:hidden"
            >
              <div className="flex flex-col gap-1">
                {siteConfig.navLinks.map((link) => (
                  <motion.div key={link.label} variants={menuItem}>
                    <Link
                      to={link.href}
                      onClick={handleNavClick}
                      className={`block rounded-xl px-4 py-3 font-medium transition-colors ${
                        location.pathname === link.href
                          ? "bg-sage font-semibold text-forest"
                          : "hover:bg-sage/60"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <motion.div variants={menuItem} className="mt-2 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-3 px-3 py-2 text-xs">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-sage text-forest">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="block text-muted">Call now</span>
                      <span className="font-semibold text-forest">
                        {siteConfig.phone}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      </MotionConfig>,
      host
    );

  return (
    <>
      {/* Reserves the bar's space in the page and marks where it starts */}
      <div ref={slotRef} className="px-3 pt-3 sm:px-6 sm:pt-6">
        <div style={{ height: navHeight }} />
      </div>
      {bar}
    </>
  );
}