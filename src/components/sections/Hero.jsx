import { motion, useReducedMotion } from "framer-motion";
import Navbar from "../Navbar";
import Button from "../Button";
import VideoCard from "../VideoCard";
import { siteConfig } from "../../data/site";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <header className="p-3 sm:p-4">
      <div className="relative isolate flex min-h-[calc(100svh-1.5rem)] sm:min-h-[calc(100svh-2rem)] flex-col overflow-hidden rounded-[1.75rem] bg-deep sm:rounded-[2rem]">
        {/* Background Image */}
        <img
          src="/images/hero.jpg"
          alt="Excavation work in progress"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        {/* Deep Green Gradient Overlay */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-deep via-deep/60 to-deep/30" />

        {/* Floating Navbar */}
        <Navbar />

        {/* Hero Content - Exact original text layout */}
        <motion.div
          id="top"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto mt-auto grid w-full max-w-7xl gap-8 px-5 pb-8 pt-24 sm:px-8 sm:pb-12 lg:grid-cols-[1.5fr_1fr] lg:items-end"
        >
          <div>
            {/* Tag Chips */}
            <motion.div
              variants={itemVariants}
              className="mb-5 flex flex-wrap gap-2 text-xs font-medium text-white"
            >
              {siteConfig.heroTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/30 bg-white/10 px-3 py-1.5 backdrop-blur-xs"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* Headline with serif italic accent */}
            <motion.h1
              variants={itemVariants}
              className="max-w-3xl text-[2.5rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
            >
              Materials, site works and hauling,{" "}
              <span className="it">from one company</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-5 max-w-xl text-base text-white/85 sm:text-lg"
            >
              {siteConfig.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4"
            >
              <Button to="/request-a-quote" variant="primary">
                Request a Quote
              </Button>
              <Button to="/services" variant="text-white">
                View Our Services
              </Button>
            </motion.div>
          </div>

          {/* Right Column: Video Card */}
          <motion.div
            variants={itemVariants}
            className="lg:justify-self-end"
          >
            <VideoCard
              thumbnail="/images/truck-preview.jpg"
              alt="Hauling dump truck"
              href="/gallery"
            />
            <p className="mt-3 text-right text-xs text-white/70 max-lg:text-left">
              {siteConfig.categorySubtitle}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
}
