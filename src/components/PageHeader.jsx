import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "./Navbar";
import { ChevronRight } from "lucide-react";

export default function PageHeader({
  badge = "ALPACO Diversified Development",
  title,
  italicTitle,
  subtitle,
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <header className="p-3 sm:p-4">
      <div className="relative isolate flex min-h-[340px] flex-col overflow-hidden rounded-[1.75rem] bg-deep sm:rounded-[2rem] lg:min-h-[380px]">
        {/* Background gradient & decorative ambient light */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-forest/40 via-deep to-deep" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-mid/20 blur-3xl" />

        {/* Floating Navbar */}
        <Navbar />

        {/* Header content */}
        <motion.div
          initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 mx-auto mt-auto flex w-full max-w-7xl flex-col px-5 pb-10 pt-16 sm:px-8 sm:pb-12"
        >
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-2 text-xs font-medium text-white/70">
            <Link to="/" className="transition hover:text-gold">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-white/40" />
            <span className="text-white">{title}</span>
          </nav>

          {/* Badge */}
          {badge && (
            <div className="mb-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-gold backdrop-blur-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                {badge}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {title} {italicTitle && <span className="it">{italicTitle}</span>}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-3 max-w-2xl text-base text-white/80 sm:text-lg">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </header>
  );
}
