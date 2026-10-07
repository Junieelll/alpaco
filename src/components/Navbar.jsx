import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import alpacoLogo from "../assets/alpaco-logo.png";
import { siteConfig } from "../data/site";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <div className="relative z-20 px-3 pt-3 sm:px-6 sm:pt-6">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between rounded-full bg-white py-3 pl-5 pr-2 shadow-lg"
        aria-label="Main navigation"
      >
        {/* Logo */}
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

        {/* Desktop Links */}
        <ul className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {siteConfig.navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <li key={link.label}>
                <Link
                  to={link.href}
                  className={`rounded-full px-4 py-2 transition-colors duration-200 ${
                    isActive
                      ? "bg-[#CDF077] font-semibold text-deep"
                      : "text-ink hover:bg-sage/70"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Call Now Chip */}
          <div className="hidden items-center gap-2.5 xl:flex">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#CDF077] text-forest">
              <Phone className="h-4 w-4" strokeWidth={2.2} />
            </span>
            <span className="text-xs leading-tight">
              <span className="block text-muted">Call now</span>
              <span className="font-semibold text-deep">{siteConfig.phone}</span>
            </span>
          </div>

          {/* Request a Quote CTA */}
          <Button to="/request-a-quote" variant="forest">
            Request a Quote
          </Button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="-mr-1 grid h-10 w-10 place-items-center rounded-full text-forest hover:bg-sage/50 lg:hidden"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2.2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown with smooth height animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-3xl bg-white p-3 shadow-xl lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {siteConfig.navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={handleNavClick}
                  className={`rounded-xl px-4 py-3 font-medium transition-colors ${
                    location.pathname === link.href
                      ? "bg-sage font-semibold text-forest"
                      : "hover:bg-sage/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-3 px-3 py-2 text-xs">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-sage text-forest">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <span className="block text-muted">Call now</span>
                    <span className="font-semibold text-forest">{siteConfig.phone}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
